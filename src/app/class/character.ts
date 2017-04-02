import { Weapon } from './weapon';

export class Character {
    private status: number;
    private HP: number = 10;
    private weapon: Weapon;
    private position: [number, number];
    private stage: number;
    private actionInfo: ActionInfo;

    chooseWeapon(weapon): void {
        this.weapon = weapon;
    }

    movePosition(position): void {
        this.actionInfo.afterPosition = position;
    }

    attackEnemy(position): void {
        this.actionInfo.attackPosition = position;
    }

    getActionInfo(): ActionInfo {
        return this.actionInfo;
    }

    setHp(hp: number): void {
        this.HP = hp;
    }

    getHp(): number {
        return this.HP;
    }

    decrimentHP(damage: number): void {
        this.HP -= damage;
    }

    incrementHP(damage: number): void {
        this.HP += damage;
    }

    getWeapon(): Weapon {
        return this.weapon;
    }
}

class ActionInfo {
    attackPosition: [number, number];
    afterPosition: [number, number];
    skill: number;
}