import Game from "./scripts/Game";
import LevelManager from "./scripts/LevelManager";

document.addEventListener("DOMContentLoaded", () => {
    const canvas =  <HTMLCanvasElement> document.getElementById('canvas');
    const ctx =  canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    Game.ctx = ctx;
    Game.isRunning = true;
    Game.gameMode = "Infinity";
    Game.fps = 120;

    const levelManager = new LevelManager(0);
    const LEVELS = levelManager.getLevels();
    let level = levelManager.getLevel();

    const interval = setInterval(() => {
        if (Game.isRunning) {
            if(!level.canNextLevel()) {
                level.update();
                return;
            }
            if (Game.currentLevel < LEVELS.length) {
                level = levelManager.changeLevel(level);
                return;
            }
            if (Game.isFinished) {
                Game.isRunning = false;
            }
            return;
        }
        clearInterval(interval);
    }, 1000 / Game.fps);
});
