import { Weapon } from './weapon';
import { WEAPONS } from '../service/weapon-data';
import { PlayerState } from '../const';
import { BaseComponent } from '../base/base.component';

export class AI {    
    private status: number;
    private HP: number = 10;
    private weapon: Weapon = WEAPONS[0];
    private position: [number, number];
    private stage: number;
    private actionInfo: ActionInfo;

    getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    chooseWeapon(weapon): void {
        let weaponList:Array<Weapon> = WEAPONS;
        this.weapon = weaponList[this.getRandomArbitrary(0,weaponList.length)];
    }

    movePosition(position): void {
        let canMovePosition :Array<[number,number]> = [[-1,0],[1,0],[0,0],[0,1],[0,-1]];
        this.actionInfo.afterPosition = canMovePosition[this.getRandomArbitrary(0,5)];
    }

    attackEnemy(position): void {
        this.actionInfo.attackPosition = this.weapon.range[this.getRandomArbitrary(0,this.weapon.range.length-1)];
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
    }

    setWeapon(weapon:Weapon){
        this.weapon = weapon;
    }
}

class ActionInfo {
    attackPosition: [number, number];
    afterPosition: [number, number];
    skill: number;
}

