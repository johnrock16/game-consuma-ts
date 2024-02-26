import Game from "./Game";
import { writeOnCanvas } from "./utils/gameUtils";

class Menu {
    name = ""
    isPlayable = false;
    levelEnded = false;

    constructor () {
        document.addEventListener("keydown", (e) => {
            if (e.code === "Enter") {
                this.levelEnded = true;
                Game.currentLevel = 1;
            }
        });
    }

    canNextLevel() {
        return this.levelEnded;
    }

    draw() {
        Game.ctx.fillStyle = "black";
        Game.ctx.fillRect(0, 0, Game.ctx.canvas.width, Game.ctx.canvas.height);
        writeOnCanvas("Please, press enter to start the game", 40, "white", [(Game.ctx.canvas.width / 2) - (320), Game.ctx.canvas.height / 2]);
    }

    update() {
        this.draw();
    }
}

export default Menu;