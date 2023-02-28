import { audio } from "./audioData.js";
import { Fireball } from "./fireball.js";

export class Emby {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('emby');
        this.x = 280;
        this.y = 325;
        this.maxFrame = 4;
        this.width = this.image.width / this.maxFrame;
        this.height = this.image.height;
        this.frame = 0;
        this.fps = 5;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.opacity = 1;
        this.health = 100;
        this.attacks = [
            {
                name: 'Tackle',
                type: 'Normal',
                color: 'black',
            },
            {
                name: 'Fireball',
                type: 'Fire',
                color: 'red',
            }
        ];
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.image, this.frame * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    update(deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            if (this.frame >= this.maxFrame - 1) this.frame = 0;
            else this.frame++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    attack(type, recipient) {
        document.querySelector('.dialogue').style.display = 'block';
        document.querySelector('.dialogue').innerHTML = `Emby use ${type}`;

        switch (type) {
            case 'Tackle':
                recipient.health -= 10;
                const tl = gsap.timeline();

                tl.to(this, {
                    x: this.x - 20
                }).to(this, {
                    x: this.x + 40,
                    duration: 0.1,
                    onComplete() {
                        audio.tackleHit.play();
                        gsap.to('#draggleHealth', {
                            width: `${recipient.health}%`
                        });
                        gsap.to(recipient, {
                            x: recipient.x + 10,
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08,
                        });
                    }
                }).to(this, {
                    x: this.x
                })
                break;
            case 'Fireball':
                audio.initFireball.play()
                this.game.fireball.push(new Fireball(this.game, this.x + this.width / 2, this.y + this.height / 2));
                recipient.health -= 20;
                gsap.to(this.game.fireball, {
                    x: recipient.x + recipient.width / 2,
                    y: recipient.y + recipient.height / 2,
                    onComplete: () => {
                        audio.fireballHit.play()
                        this.game.fireball = [];
                        gsap.to('#draggleHealth', {
                            width: `${recipient.health}%`
                        });

                        gsap.to(recipient, {
                            x: recipient.x + 10,
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08,
                        });
                    }
                })
                break;
        }
    }

    faint() {
        document.querySelector('.dialogue').innerHTML = 'Emby Fainted!';
        gsap.to(this, {
            y: this.y + 20,
            opacity: 0
        })
        audio.battle.pause();
        audio.victory.play();
    }
}