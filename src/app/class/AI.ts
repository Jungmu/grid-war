import { Weapon } from './weapon';
import { WEAPONS } from '../service/weapon-data';
import { PlayerState } from '../const';
import { BaseComponent } from '../base/base.component';
import { TouchscreenComponent } from '../touchscreen/touchscreen.component';

class ActionInfo {
    attackPosition: [number, number];
    afterPosition: [number, number];
    skill: number;
}

export class AI {
    private status: number;
    private HP: number = 10;
    private weapon: Weapon = WEAPONS[0];
    private position: [number, number];
    private stage: number;
    private actionInfo: ActionInfo = new ActionInfo;

    private checkRange: TouchscreenComponent = new TouchscreenComponent;

    getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    chooseWeapon(weapon): void {
        let weaponList: Array<Weapon> = WEAPONS;
        this.weapon = weaponList[this.getRandomArbitrary(0, weaponList.length)];
    }

    movePosition(): void {
        let canMovePosition: Array<[number, number]> = [[-1, 0], [1, 0], [0, 0], [0, 1], [0, -1]];
        let tempPosition: [number, number] = canMovePosition[this.getRandomArbitrary(0, 5)];
        let afterPosition: [number, number] = [ this.position[0] + tempPosition[0], this.position[1] + tempPosition[1] ];
        this.actionInfo.afterPosition = afterPosition;
    }

    attackEnemy(position): void {
        this.actionInfo.attackPosition = this.weapon.range[this.getRandomArbitrary(0, this.weapon.range.length - 1)];
    }

    getActionInfo(): ActionInfo {
        return this.actionInfo;
    }

    getAfterPosition() {
        return this.actionInfo.afterPosition;
    }

    setAfterPosition(position){
        this.actionInfo.afterPosition = position;
    }

    getAttackPosition() {
        return this.actionInfo.attackPosition;
    }

    setAttackPosition(position) {
        this.actionInfo.attackPosition = position;
    }

    getHp(): number {
        return this.HP;
    }

    setHp(hp: number): void {
        this.HP = hp;
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

    setWeapon(weapon:Weapon){
        this.weapon = weapon;
    }
    
    getStatus(): PlayerState {
        return this.status;
    }

    setStatus(status: PlayerState) {
        this.status = status;
    }

    getPosition():[number,number]{
        return this.position;
    }

    setPosition(position:[number,number]){
        this.position = position;
        this.actionInfo.afterPosition = position;
    }
}


