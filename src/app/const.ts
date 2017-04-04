export enum GameState {
    playerTurn,
    enemyTurn,
    wait,
    work
}
export enum PlayerState {
    movePosition,
    chooseWeapon,
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
    showPlayerAttacRange,
    showEnemyAttacRange,
    showPlayerAttacSpot,
    showEnemyAttacSpot
}