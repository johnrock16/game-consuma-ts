import Game from '../Game';

export function isRectsColliding(rect:any, rect2:any) {
    return !(
        rect.x > rect2.x + rect2.width ||
        rect.x + rect.width < rect2.x ||
        rect.y > rect2.y + rect2.height ||
        rect.y + rect.height < rect2.y
    );
}

export function tickFPS(speed:number) {
    return (((speed * 100) / 60) / ((speed * (Game.fps / 60)))) * speed;
}

export function writeOnCanvas(message: string, fontSize: number, fontColor: string, position: number[]) {
    Game.ctx.fillStyle = fontColor;
    Game.ctx.font = `${fontSize}px serif`;
    Game.ctx.fillText(message, position[0], position[1]);
}
