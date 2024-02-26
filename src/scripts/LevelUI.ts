import Game from "./Game";
import Player from "./Player";
import { writeOnCanvas } from "./utils/gameUtils";

class LevelUI {
    private player;
    private healthBarUI;
    private textUI;

    constructor(player:Player) {
        this.player = player;

        this.healthBarUI = {
            x: Game.ctx.canvas.width / 4,
            y: 8,
            width: Game.ctx.canvas.width / 2,
            height: ((36 * 100) / 1366) * (window.innerWidth/ 100)
        }

        this.textUI = {
            size: ((40 * 100) / 1366) * (window.innerWidth / 100),
            sizeAlt: ((80 * 100) / 1366) * (window.innerWidth / 100),
        }
    }

    draw() {
        Game.ctx.fillStyle = "gray";
        Game.ctx.fillRect(this.healthBarUI.x, this.healthBarUI.y, this.healthBarUI.width, this.healthBarUI.height);

        Game.ctx.fillStyle = "red";
        Game.ctx.fillRect((this.healthBarUI.width) - (((this.healthBarUI.width * this.player.getHealth()) / 100) / 2), this.healthBarUI.y, (this.healthBarUI.width * this.player.getHealth()) / 100, this.healthBarUI.height);

        writeOnCanvas(`${Game.levelName} ${this.player.getWeight()} lbs`, this.textUI.size, "white", [this.textUI.size, this.textUI.size]);
        writeOnCanvas(`x ${this.player.getLives()}`, this.textUI.size, "white", [Game.ctx.canvas.width - this.textUI.sizeAlt, this.textUI.size]);

        if (!this.player.getIsAlive()) {
            writeOnCanvas(`Game Over: ${Game.totalPoints > 0 ? Game.totalPoints : 0} points`, 40, "white", [(Game.ctx.canvas.width / 2) - (40 * 2), Game.ctx.canvas.height / 2]);
        }

        if (Game.isFinished) {
            writeOnCanvas(`You win! ${Game.totalPoints > 0 ? Game.totalPoints : 0} points`, 40, "white", [(Game.ctx.canvas.width / 2) - (40 * 2), Game.ctx.canvas.height / 2]);
        }
    }
}

export default LevelUI;
