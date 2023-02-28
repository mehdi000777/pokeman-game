const states = {
    MOVINGDOWN: 0,
    MOVINGUP: 1,
    MOVINGRIGHT: 2,
    MOVINGLEFT: 3,
}

class State {
    constructor(game) {
        this.game = game;
    }
}

export class MoveDown extends State {
    constructor(game) {
        super(game);
    }

    enter() {
        this.frame = 0;
        this.game.player.image = document.getElementById('playerDown');
    }

    inputHandler(input) {
        if (input.keys.includes('ArrowRight') && input.lastKey === 'ArrowRight') this.game.player.setState(states.MOVINGRIGHT);
        if (input.keys.includes('ArrowLeft') && input.lastKey === 'ArrowLeft') this.game.player.setState(states.MOVINGLEFT);
        if (input.keys.includes('ArrowUp') && input.lastKey === 'ArrowUp') this.game.player.setState(states.MOVINGUP);
    }
}

export class MoveRight extends State {
    constructor(game) {
        super(game);
    }

    enter() {
        this.frame = 0;
        this.game.player.image = document.getElementById('playerRight');
    }

    inputHandler(input) {
        if (input.keys.includes('ArrowDown') && input.lastKey === 'ArrowDown') this.game.player.setState(states.MOVINGDOWN);
        if (input.keys.includes('ArrowLeft') && input.lastKey === 'ArrowLeft') this.game.player.setState(states.MOVINGLEFT);
        if (input.keys.includes('ArrowUp') && input.lastKey === 'ArrowUp') this.game.player.setState(states.MOVINGUP);
    }
}

export class MoveUp extends State {
    constructor(game) {
        super(game);
    }

    enter() {
        this.frame = 0;
        this.game.player.image = document.getElementById('playerUp');
    }

    inputHandler(input) {
        if (input.keys.includes('ArrowRight') && input.lastKey === 'ArrowRight') this.game.player.setState(states.MOVINGRIGHT);
        if (input.keys.includes('ArrowLeft') && input.lastKey === 'ArrowLeft') this.game.player.setState(states.MOVINGLEFT);
        if (input.keys.includes('ArrowDown') && input.lastKey === 'ArrowDown') this.game.player.setState(states.MOVINGDOWN);
    }
}

export class MoveLeft extends State {
    constructor(game) {
        super(game);
    }

    enter() {
        this.frame = 0;
        this.game.player.image = document.getElementById('playerLeft');
    }

    inputHandler(input) {
        if (input.keys.includes('ArrowRight') && input.lastKey === 'ArrowRight') this.game.player.setState(states.MOVINGRIGHT);
        if (input.keys.includes('ArrowDown') && input.lastKey === 'ArrowDown') this.game.player.setState(states.MOVINGDOWN);
        if (input.keys.includes('ArrowUp') && input.lastKey === 'ArrowUp') this.game.player.setState(states.MOVINGUP);
    }
}