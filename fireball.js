export class Fireball {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.maxFrame = 4;
        this.image = document.getElementById('fireball');
        this.width = this.image.width / this.maxFrame;
        this.height = this.image.height;
        this.frame = 0;
        this.fps = 5;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.angle = 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, this.frame * this.width, 0, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    update(deltaTime) {
        this.angle += 1;

        if (this.frameTimer > this.frameInterval) {
            if (this.frame >= this.maxFrame - 1) this.frame = 0;
            else this.frame++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
}