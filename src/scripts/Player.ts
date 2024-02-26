import PLAYER_SPRITE from "../assets/sprites/player.png";
import PLAYER_SPRITE_CONFIGS from "../jsons/sprites/player.json";
import { IGameElements } from "../interfaces/game";
import Game from "./Game";
import { tickFPS } from "./utils/gameUtils";
import SFX_HURT from "../assets/sounds/sfx/hurt.wav";
import SFX_HEALTH from "../assets/sounds/sfx/collect.wav";

class Player implements IGameElements {
    health = 10;
    lives = 3;
    weight = 10;
    width = 32;
    height = 32;
    scale = 1.4;
    scaleMax = 4;
    position = [0, 0];
    speed = 7;
    speedDirection = [0, 0];
    delay = 2;
    delayCount = 0;
    delayActive = false;
    playerSpriteImage = null as HTMLImageElement;
    spriteManage = PLAYER_SPRITE_CONFIGS;
    spriteState = {
        type: "down",
        current: 0,
        count: 0,
    }
    sfx = {
        hurt: null as HTMLAudioElement,
        addHealth: {} as HTMLAudioElement
    };
    isBouncing = false;
    bounceDelay = 24;
    bounceCount = 2;
    isAlive = true;

    constructor() {
        const { canvas } = Game.ctx;
        this.width = ((this.width * 100) / 1366) * (window.innerWidth / 100);
        this.height = ((this.height * 100) / 1366) * (window.innerWidth / 100);

        this.position = [(canvas.width / 2) - (this.width / 2), (canvas.height / 2) - (this.height / 2)];
        this.speed = tickFPS(this.speed);

        this.playerSpriteImage = new Image();
        this.playerSpriteImage.src = PLAYER_SPRITE;

        this.sfx.hurt = new Audio();
        this.sfx.hurt.src = SFX_HURT;

        this.sfx.addHealth = new Audio();
        this.sfx.addHealth.src = SFX_HEALTH;

        document.addEventListener("keydown", (e) => {
            if(!this.isBouncing) {
                switch(e.code) {
                    case "ArrowUp":
                        this.speedDirection = [0, -this.speed];
                        this.spriteState.type = "up"
                        break;
                    case "ArrowDown":
                        this.speedDirection = [0, this.speed];
                        this.spriteState.type = "down"
                        break;
                    case "ArrowLeft":
                        this.speedDirection = [-this.speed, 0];
                        this.spriteState.type = "left"
                        break;
                    case "ArrowRight":
                        this.speedDirection = [this.speed, 0];
                        this.spriteState.type = "right"
                        break;
                }
            }
        });

        document.addEventListener("keyup", (e) => {
            if (e.code === "ArrowUp" || e.code === "ArrowDown") {
                this.speedDirection[1] = 0;
                return;
            }
            if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
                this.speedDirection[0] = 0
            }
        })
    }

    verifyEvolve() {
        if(this.health >= 100) {
            if (this.scale < this.scaleMax) {
                this.scale += 0.2;
            }
            this.health = 10;
        }
    }

    verifyIsAlive() {
        if (this.health <= 0) {
            this.health = 10;
            this.lives -= 1;
        }
        if (this.lives < 0) {
            this.isAlive = false;
            this.lives = 0;
        }
    }

    getIsAlive() {
        return this.isAlive;
    }

    getPosition() {
        return {
            x: this.position[0],
            y: this.position[1],
            width: this.width * this.scale,
            height: this.height * this.scale
        }
    }

    eatFood(value: number, isPoisonFruit: boolean) {
        if (!this.delayActive) {
            this.delayActive = true;
            if (!isPoisonFruit) {
                this.health += value;
                Game.totalPoints += value;
                this.weight += value;
                this.sfx.addHealth.play();
                return;
            }

            this.health -= value;
            Game.totalPoints -= value;
            this.sfx.hurt.play();

            if (this.weight > 10) {
                this.weight -= value;
            }
        }
    }

    bounce(direction:string, bounceSpeed: number) {
        this.isBouncing = true;
        this.bounceCount = 0;
        if (this.speedDirection[0] !== 0) {
            this.speedDirection[0] += this.speedDirection[0] * -bounceSpeed;
            return;
        }
        if (this.speedDirection[1] !== 0) {
            this.speedDirection[1] += this.speedDirection[1] * -bounceSpeed;
            return;
        }
        switch(direction) {
            case "right":
                this.speedDirection[0] -= this.speed * -bounceSpeed;
            break;
            case "left":
                this.speedDirection[0] += this.speed * -bounceSpeed;
            break;
            case "up":
                this.speedDirection[1] += this.speed * -bounceSpeed;
            break;
            case "down":
                this.speedDirection[1] -= this.speed * -bounceSpeed;
            break;
        }
    }

    manageColissionDelay() {
        this.delayCount = (this.delayActive && (this.delayCount < this.delay)) ? this.delayCount + 1 : 0;
        if (this.delayCount === 0) {
            this.delayActive = false;
        }
    }

    movementDirection(direction: number) {
        const sizeValue = direction === 0 ? "width" : "height";
        if ((this.position[direction] + this.speedDirection[direction]) > 0 && ((this.position[direction] + (this[sizeValue] * this.scale) + this.speedDirection[direction]) < Game.ctx.canvas[sizeValue])) {
            this.position[direction] += this.speedDirection[direction];
            return;
        }
        if (this.position[direction] < 0) {
            this.position[direction] = 0;
            return;
        }
        if (this.position[direction] > Game.ctx.canvas[sizeValue]) {
            this.position[direction] = Game.ctx.canvas[sizeValue];
            return;
        }
    }

    movement() {
        this.movementDirection(0);
        this.movementDirection(1);
    }

    manageAnimation() {
        if (this.speedDirection[0] !== 0 || this.speedDirection[1] !== 0) {
            if (this.spriteState.count < this.spriteManage.counterChange) {
                this.spriteState.count += 1;
                return;
            }

            this.spriteState.count = 0;

            if (this.spriteState.current < this.spriteManage.sprites[this.spriteState.type].quantity) {
                this.spriteState.current += 1
                return;
            }

            this.spriteState.current = 0;
            return;
        }
        this.spriteState.current = 0;
    }

    getHealth() {
        return this.health;
    }

    getWeight() {
        return this.weight;
    }

    getLives() {
        return this.lives;
    }

    draw() {
        Game.ctx.drawImage(this.playerSpriteImage, this.spriteManage.sprites[this.spriteState.type].x + (this.spriteManage.width * this.spriteState.current), this.spriteManage.sprites[this.spriteState.type].y, this.spriteManage.width, this.spriteManage.height, this.position[0], this.position[1], this.width * this.scale, this.height * this.scale)
    }

    manageBounceDelay() {
        if (this.isBouncing) {
            this.bounceCount += 1;

            if (this.bounceCount > this.bounceDelay) {
                this.isBouncing = false;
            }
        }
    }

    update() {
        this.verifyIsAlive();
        this.verifyEvolve();
        this.movement();
        this.manageColissionDelay();
        this.manageAnimation();
        this.manageBounceDelay();
    }

    destroy() {
        this.sfx.addHealth.pause();
        this.sfx.hurt.pause();
        this.sfx.addHealth = null;
        this.sfx.hurt = null;
    }
}

export default Player;
