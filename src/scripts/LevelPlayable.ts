import Game from "./Game";
import Player from "./Player";
import Food from "./Food";
import Bouncer from "./Bouncer";
import LevelUI from "./LevelUI";
import GameElementThrowable from "./GameElementThrowable";
import { isRectsColliding } from "./utils/gameUtils";
import { ILevel } from "../interfaces/game";

class LevelPlayable implements ILevel {
    private player;
    private levelUI;
    private foods;
    private bouncers;
    private background;
    private scoreNeeded = 0;
    private musicTheme;
    name = ""
    isPlayable = true;
    levelEnded = false;

    constructor({backgroundSrc, musicSrc, scoreNeeded}:any) {
        this.scoreNeeded = scoreNeeded;
        this.player = new Player();
        this.levelUI = new LevelUI(this.player);
        this.foods = [] as Food[];
        this.bouncers = [] as Bouncer[];
        this.background = new Image();
        this.background.src = backgroundSrc;
        this.musicTheme = new Audio(musicSrc);
        this.musicTheme.loop = true;
        this.musicTheme.play();

        for (let i = 0; i < 20; i++) {
            this.foods[i] = new Food();
        }

        for (let i = 0; i < 4; i++) {
            this.bouncers[i] = new Bouncer();
        }
    }

    manageGameElementsThrowable(gameElementThrowables:GameElementThrowable[], {onRemove, onColliding} : any) {
        gameElementThrowables.forEach((gameElementThrowable, index) => {
            if (gameElementThrowable.onScreen()) {
                gameElementThrowable.draw();
                gameElementThrowable.update();
            } else {
                gameElementThrowable.remove();
            }

            if (isRectsColliding(this.player.getPosition(), gameElementThrowable.getPosition())) {
                gameElementThrowable.remove();
                onColliding(index);
            }

            if (gameElementThrowable.canBeRemoved()) {
                onRemove(index);
            }
        });
    }

    draw() {
        Game.ctx.drawImage(this.background, 0, 0, window.innerWidth, window.innerHeight);
        this.player.draw();
        this.levelUI.draw();
    }

    update() {
        this.verifyLevelEnded();
        this.stopGameIfPlayerDies();
        this.player.update();
        this.draw();
        this.manageGameElementsThrowable(this.foods, {
            onRemove: (index: number) => this.foods[index] = new Food(),
            onColliding: (index: number) => this.player.eatFood(this.foods[index].getValue(), this.foods[index].getIsPoisonFruit())
        });
        this.manageGameElementsThrowable(this.bouncers, {
            onRemove: (index: number) => this.bouncers[index] = new Bouncer(),
            onColliding: (index: number) => this.player.bounce(this.bouncers[index].getDirection(), this.bouncers[index].getBounceSpeed())
        });
    }

    verifyLevelEnded() {
        if (this.player.getWeight() > this.scoreNeeded) {
            this.levelEnded = true;
            Game.currentLevel += 1;
            if (Game.currentLevel > Game.lastLevel){
                if (Game.gameMode === "Infinity") {
                    Game.currentLevel = 1;
                    return;
                }
                Game.isFinished = true;
            }
        }
    }

    stopGameIfPlayerDies() {
        if (!this.player.getIsAlive()) {
            Game.isRunning = false;
        }
    }

    canNextLevel() {
        return this.levelEnded;
    }

    removeLevel() {
        this.musicTheme.pause();
        this.musicTheme = null;
        this.player.destroy();
    }
}

export default LevelPlayable;
