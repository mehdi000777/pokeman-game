import { audio } from './audioData.js';

export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.lastKey = '';
        this.clicked = false;

        window.addEventListener('keydown', (e) => {
            if ((e.key === 'ArrowRight' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowDown' ||
                e.key === 'ArrowUp'
            ) &&
                this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
            else if (e.key === 'd') this.game.debug = !this.game.debug;
            this.lastKey = e.key;
        });

        window.addEventListener('keyup', (e) => {
            this.keys.splice(this.keys.indexOf(e.key), 1);
        });

        document.querySelector('.dialogue').addEventListener('click', (e) => {
            if (this.game.emby.health <= 0) {
                this.game.queue.push(() => {
                    this.game.emby.faint();
                });
                this.game.queue.push(() => {
                    gsap.to('#blackScreen', {
                        opacity: 1,
                        onComplete: () => {
                            this.game.battle.initiated = false;
                            cancelAnimationFrame(this.game.battleAnimate);
                            this.game.animateGame(0);
                            audio.map.play();
                            document.getElementById('userInterface').style.display = 'none';
                            gsap.to('#blackScreen', {
                                opacity: 0,
                            })
                        }
                    })
                });
            }

            if (this.game.queue.length > 0) {
                this.game.queue[0]();
                this.game.queue.shift();
            } else e.target.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (!this.clicked) {
                audio.map.play();
                this.clicked = true;
            }
        })
    }
}