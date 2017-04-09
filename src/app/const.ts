export enum GameState {
    playerTurn,
    enemyTurn,
    wait,
    work
}
export enum PlayerState {
    movePosition,
    chooseSkill,
    attackEnemy,
    wait
}
export enum Skill {
    normal,
    first
}
export enum LiveDrawState {
    wait,
    movePlayer,
    moveEnemy,
    attackPlayer,
    attackEnemy
}

export const AdvantagePercent : number = 1.3;
export const DisadvantagePercent : number = 0.7;