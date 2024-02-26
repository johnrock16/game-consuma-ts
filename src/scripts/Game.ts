class Game {
    static ctx: CanvasRenderingContext2D = null;
    static isRunning: boolean = false;
    static fps: number = 120;
    static currentLevel: number = 0;
    static levelName: string = "";
    static gameMode: string = "";
    static lastLevel: number = 0;
    static totalPoints: number = 0;
    static isFinished: boolean = false
}

export default Game;
