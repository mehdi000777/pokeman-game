export class BattleBackground {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('battleBackground');
        this.x = 0;
        this.y = 0;
        this.width = this.game.canvas.width;
        this.height = this.game.canvas.height;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}