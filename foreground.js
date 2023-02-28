export class Foreground {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('foreground');
        this.x = -735;
        this.y = -615;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}