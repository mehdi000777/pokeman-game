import { audio } from "./audioData.js";
import { Background } from "./background.js";
import { BattleBackground } from "./battleBackground.js";
import { Draggle } from "./draggle.js";
import { Emby } from "./emby.js";
import { Foreground } from "./foreground.js";
import { InputHandler } from "./inputHandler.js";
import { Player } from "./Player.js";

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1024;
    canvas.height = 576;


    class Game {
        constructor(canvas) {
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.background = new Background(this);
            this.player = new Player(this);
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.foreground = new Foreground(this);
            this.battleBackground = new BattleBackground(this);
            this.draggle = new Draggle(this);
            this.emby = new Emby(this);
            this.input = new InputHandler(this);
            this.fireball = [];
            this.queue = [];
            this.debug = false;
            this.battle = {
                initiated: false,
            }
            this.battleAnimate = 0;
            this.animate = 0;
            this.lastTime = 0;
        }

        render(ctx, deltaTime) {
            this.background.draw(ctx);
            this.background.update(this.input);
            this.player.draw(ctx);
            this.player.update(this.input, deltaTime)
            this.foreground.draw(ctx);
        }

        checkCollision(object1, object2) {
            return (
                object1.x <= object2.x + object2.width &&
                object1.x + object1.width >= object2.x &&
                object1.y <= object2.y + object2.height &&
                object1.y + object1.height >= object2.y
            )
        }

        animateGame = (timeStamp) => {
            let deltaTime = timeStamp - this.lastTime;
            this.lastTime = timeStamp;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.render(ctx, deltaTime);
            let animate = requestAnimationFrame(this.animateGame);
            this.animate = animate;
        }

        animateBattle = (timeStamp) => {
            const sprites = [this.draggle, ...this.fireball, this.emby,];

            let deltaTime = timeStamp - this.lastTime;
            this.lastTime = timeStamp;

            ctx.clearRect(0, 0, this.width, this.height);
            this.battleBackground.draw(ctx);
            sprites.forEach(sprite => {
                sprite.draw(ctx);
                sprite.update(deltaTime);
            });
            let battleAnimate = requestAnimationFrame(this.animateBattle);
            this.battleAnimate = battleAnimate;
        }

        initBattle() {
            this.draggle = new Draggle(this);
            this.emby = new Emby(this);
            document.getElementById('userInterface').style.display = 'block';
            document.getElementById('draggleHealth').style.width = `${this.draggle.health}%`;
            document.getElementById('embyHealth').style.width = `${this.emby.health}%`;
            document.querySelector('.dialogue').style.display = 'none';
            document.getElementById('attacks').replaceChildren();
            this.queue = [];
            this.emby.attacks.forEach(attack => {
                const button = document.createElement('button');
                button.innerHTML = attack.name;
                document.getElementById('attacks').appendChild(button);
            })
            document.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', (e) => {
                    this.emby.attack(e.target.innerHTML, this.draggle);

                    if (this.draggle.health <= 0) {
                        this.queue.push(() => {
                            this.draggle.faint();
                        });
                        this.queue.push(() => {
                            gsap.to('#blackScreen', {
                                opacity: 1,
                                onComplete: () => {
                                    this.battle.initiated = false;
                                    cancelAnimationFrame(this.battleAnimate);
                                    this.animateGame(0);
                                    audio.map.play();
                                    document.getElementById('userInterface').style.display = 'none';
                                    gsap.to('#blackScreen', {
                                        opacity: 0,
                                    })
                                }
                            })
                        });

                        return
                    }

                    const randomAttack = this.draggle.attacks[Math.floor(Math.random() * this.draggle.attacks.length)];
                    this.queue.push(() => {
                        this.draggle.attack(randomAttack.name, this.emby);
                    });
                });

                button.addEventListener('mouseenter', (e) => {
                    const attack = this.emby.attacks.filter(item => item.name === e.target.innerHTML)[0]
                    document.getElementById('attackType').style.color = attack.color;
                    document.getElementById('attackType').innerHTML = attack.type;
                })
            });
        }
    }
    const game = new Game(canvas);
    game.animateGame(0);
})