import { audio } from "./audioData.js";
import { MoveDown, MoveLeft, MoveRight, MoveUp } from "./stateManager.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('playerDown');
        this.maxFrame = 4;
        this.width = this.image.width / this.maxFrame;
        this.height = this.image.height;
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height / 2 - this.height / 2;
        this.frame = 0;
        this.states = [new MoveDown(this.game), new MoveUp(this.game), new MoveRight(this.game), new MoveLeft(this.game)];
        this.currentState = null;
        this.fps = 15;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.frame * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(input, deltaTime) {
        if (this.game.battle.initiated) return;

        this.currentState.inputHandler(input);

        if (this.game.background.moving) {
            if (this.frameTimer > this.frameInterval) {
                if (this.frame >= this.maxFrame - 1) this.frame = 0;
                else this.frame++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
        } else {
            this.frame = 0;
        }

        //battle Activate
        if (input.keys.includes('ArrowLeft') ||
            input.keys.includes('ArrowRight') ||
            input.keys.includes('ArrowUp') ||
            input.keys.includes('ArrowDown')) {
            this.game.background.battleZoneBlocks.forEach(block => {
                const overlappingArea = (Math.min(this.x + this.width, block.x + block.width) - Math.max(this.x, block.x)) * (Math.min(this.y + this.height, block.y + block.height) - Math.max(this.y, block.y));

                if (this.game.checkCollision(this, block) &&
                    overlappingArea > (this.width * this.height) / 2 &&
                    Math.random() < 0.01) {
                    this.game.battle.initiated = true;
                    audio.map.pause();
                    audio.initBattle.play();
                    audio.battle.play();
                    gsap.to('#blackScreen', {
                        opacity: 1,
                        repeat: 3,
                        yoyo: true,
                        duration: 0.4,
                        callbackScope: this,
                        onComplete() {
                            gsap.to('#blackScreen', {
                                opacity: 1,
                                duration: 0.4,
                                callbackScope: this,
                                onComplete() {
                                    this.game.initBattle();
                                    cancelAnimationFrame(this.game.animate);
                                    this.game.animateBattle(0);
                                    gsap.to('#blackScreen', {
                                        opacity: 0,
                                        duration: 0.4,
                                    })
                                },
                            })
                        }
                    })
                }
            })
        }
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}