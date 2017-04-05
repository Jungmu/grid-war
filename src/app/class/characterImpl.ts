export interface CharacterImpl {

    chooseWeapon(): void;
    movePosition(): void;
    attackEnemy(): void;


    getActionInfo();
    getAfterPosition();
    setAfterPosition(position);
    getAttackPosition();
    setAttackPosition(position);

    getHp(): number;
    setHp(hp: number): void;
    decrimentHP(damage: number): void;
    incrementHP(damage: number): void;

    getWeapon();
    setWeapon(weapon);

    getStatus();
    setStatus(status);
    getPosition(): [number, number];
    setPosition(position: [number, number]);
    getSkill(): number;

}