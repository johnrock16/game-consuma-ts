import Game from "./Game";
import { IGameElements, IGameElementsThrowables } from '../interfaces/game';
import { tickFPS } from "./utils/gameUtils";

class GameElementThrowable implements IGameElements, IGameElementsThrowables {
    protected value = 10;
    protected position = [] as number[];
    protected speed = 7;
    protected scale = 1;
    protected width = 24;
    protected height = 24;
    protected canRemove = false;
    protected screenWidth = 0;
    protected screenHeight = 0;
    protected direction = "";
    protected color = "blue";

    constructor() {
        const { canvas } = Game.ctx;
        this.screenWidth = canvas.width;
        this.screenHeight = canvas.height;
        this.speed = tickFPS(Math.random() * (this.speed - (this.speed / 2)) + (this.speed / 2));
        this.value = this.value * this.scale;
        this.width = ((this.width * 100) / 1366) * (window.innerWidth/ 100);
        this.height = ((this.height * 100) / 1366) * (window.innerWidth/ 100);

        const directions = ["left", "right", "up", "down"];
        this.direction = directions[Math.floor(Math.random() * ((Math.floor(4) - Math.ceil(0)) + Math.ceil(0)))];

        switch (this.direction) {
            case "left":
                this.position = [canvas.width, Math.floor(Math.random() * ((Math.floor(canvas.height - this.height)) - Math.ceil(0)) + Math.ceil(0))];
                this.speed = -this.speed;
            break;
            case "right":
                this.position = [0, Math.floor(Math.random() * ((Math.floor(canvas.height - this.height)) - Math.ceil(0)) + Math.ceil(0))];
            break;
            case "down":
                this.position = [Math.floor(Math.random() * ((Math.floor(canvas.width - this.width)) - Math.ceil(0)) + Math.ceil(0)), 0];
            break;
            case "up":
                this.position = [Math.floor(Math.random() * ((Math.floor(canvas.width - this.width)) - Math.ceil(0)) + Math.ceil(0)), canvas.height];
                this.speed = -this.speed;
            break;
        }
    }

    onScreen() {
        return !this.canRemove;
    }

    getPosition() {
        return {
            x: this.position[0],
            y: this.position[1],
            width: this.width * this.scale,
            height: this.height * this.scale
        }
    }

    getValue() {
        return this.value;
    }

    getDirection() {
        return this.direction;
    }

    remove() {
        this.canRemove = true;
    }

    canBeRemoved() {
        return this.canRemove;
    }

    verifyIfCanRemove() {
        if (!this.canRemove) {
            this.canRemove = (this.position[0] < 0 || this.position[0] > this.screenWidth) || (this.position[1] < 0 || this.position[1] > this.screenHeight);
        }
    }

    movement() {
        if (this.direction === "left" || this.direction === "right") {
            this.position[0] += this.speed;
            return;
        }
        this.position[1] += this.speed;
    }

    draw() {
        Game.ctx.fillStyle = this.color;
        Game.ctx.fillRect(this.position[0], this.position[1], this.width * this.scale, this.height * this.scale);
    }

    update() {
        this.movement();
        this.verifyIfCanRemove();
    }
}

export default GameElementThrowable;
