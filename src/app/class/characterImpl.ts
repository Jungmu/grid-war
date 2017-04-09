export interface CharacterImpl {

    chooseSkill(): void;
    movePosition(): void;
    attackEnemy(): void;

    getActionInfo();
    getAfterPosition();
    setAfterPosition(position);
    getAttackPosition();
    setAttackPosition(position);

    getHp(): number;
    setHp(hp: number): void;
    decrementHP(damage: number): void;
    incrementHP(damage: number): void;

    getSkill();
    setSkill(skill);

    getStatus();
    setStatus(status);
    getPosition(): [number, number];
    setPosition(position: [number, number]);
}