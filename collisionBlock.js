export class CollisionBlock {
    constructor(game, x, y) {
        this.game = game;
        this.width = 48;
        this.height = 48;
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        if (this.game.debug) {
            ctx.fillStyle = 'rgba(255,0,0,.5)';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}