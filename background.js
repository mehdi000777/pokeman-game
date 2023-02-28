import { CollisionBlock } from "./collisionBlock.js";
import { battleZones, collistions } from "./mapData.js";

export class Background {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('background');
        this.x = -735;
        this.y = -615;
        this.speedX = 2.5;
        this.speedY = 2.5;
        this.collisions2d = [];
        this.battleZones2d = [];
        this.collisionBlocks = [];
        this.battleZoneBlocks = [];
        this.collisions2dData();
        this.addCollisionBlocks();
        this.moving = false;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
        this.collisionBlocks.forEach(block => block.draw(ctx));
        this.battleZoneBlocks.forEach(block => block.draw(ctx));
    }

    update(input) {
        const movable = [this, ...this.collisionBlocks, this.game.foreground, ...this.battleZoneBlocks];
        this.moving = false;

        if (this.game.battle.initiated) return;

        if (input.keys.includes('ArrowRight') && input.lastKey === 'ArrowRight') {
            this.moving = true;
            this.collisionBlocks.forEach(block => {
                if (this.game.checkCollision(this.game.player, { ...block, x: block.x - this.speedX })) {
                    this.moving = false;
                }
            });

            if (this.moving) {
                movable.forEach(item => {
                    item.x -= this.speedX
                });
            }
        }
        else if (input.keys.includes('ArrowLeft') && input.lastKey === 'ArrowLeft') {
            this.moving = true;
            this.collisionBlocks.forEach(block => {
                if (this.game.checkCollision(this.game.player, { ...block, x: block.x + this.speedX })) {
                    this.moving = false;
                }
            });

            if (this.moving) {
                movable.forEach(item => {
                    item.x += this.speedX
                });
            }
        }
        else if (input.keys.includes('ArrowDown') && input.lastKey === 'ArrowDown') {
            this.moving = true;
            this.collisionBlocks.forEach(block => {
                if (this.game.checkCollision(this.game.player, { ...block, y: block.y - this.speedY })) {
                    this.moving = false;
                }
            });

            if (this.moving) {
                movable.forEach(item => {
                    item.y -= this.speedY
                });
            }
        }
        else if (input.keys.includes('ArrowUp') && input.lastKey === 'ArrowUp') {
            this.moving = true;
            this.collisionBlocks.forEach(block => {
                if (this.game.checkCollision(this.game.player, { ...block, y: block.y + this.speedY })) {
                    this.moving = false;
                }
            });

            if (this.moving) {
                movable.forEach(item => {
                    item.y += this.speedY
                });
            }
        }
    }

    collisions2dData() {
        for (let i = 0; i < collistions.length; i += 70) {
            this.collisions2d.push(collistions.slice(i, i + 70));
        }

        for (let i = 0; i < battleZones.length; i += 70) {
            this.battleZones2d.push(battleZones.slice(i, i + 70));
        }
    }

    addCollisionBlocks() {
        this.collisions2d.forEach((row, y) => {
            row.forEach((block, x) => {
                if (block === 1025) this.collisionBlocks.push(new CollisionBlock(this.game, x * 48 + this.x, y * 48 + this.y))
            })
        })

        this.battleZones2d.forEach((row, y) => {
            row.forEach((block, x) => {
                if (block === 1025) this.battleZoneBlocks.push(new CollisionBlock(this.game, x * 48 + this.x, y * 48 + this.y))
            })
        })
    }
}