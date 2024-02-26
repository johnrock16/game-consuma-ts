import Game from "./Game";
import LevelPlayable from "./LevelPlayable";
import Menu from "./Menu";
import LEVELS from "../constraints/LEVELS";

export class LevelManager {
    private level
    private currentLevel = 0;

    constructor(currentLevel: number) {
        this.currentLevel = currentLevel;
        this.level = LEVELS[this.currentLevel].isPlayable ? new LevelPlayable(LEVELS[this.currentLevel]) : new Menu();
        Game.currentLevel = 0;
        Game.levelName = this.level.name;
        Game.lastLevel = LEVELS.length - 1;
    }

    getLevel() {
        return this.level;
    }

    getLevels() {
        return LEVELS;
    }

    changeLevel(level: any) {
        if (level.removeLevel) {
            level.removeLevel();
        }
        level = new LevelPlayable(LEVELS[Game.currentLevel]);
        Game.levelName = LEVELS[Game.currentLevel].name;
        return level;
    }
}

export default LevelManager;