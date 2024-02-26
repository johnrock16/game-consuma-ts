export interface IGameElements {
    draw(): void
    update(): void
}

export interface IGameElementsThrowables {
    onScreen(): boolean
    canBeRemoved(): boolean
}

export interface ILevel {
    name: string
    isPlayable: boolean;
    levelEnded: boolean;
    canNextLevel(): void
    draw(): void
    update(): void
}