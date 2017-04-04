import { Weapon } from './weapon';
import { WEAPONS } from '../service/weapon-data';
import { PlayerState } from '../const';
import { BaseComponent } from '../base/base.component';
import { GridComponent } from '../grid/grid.component';
import { ActionInfo } from './actionInfo';
import { CharacterImpl } from './characterImpl';

export class AI implements CharacterImpl{
    private status: number = PlayerState.chooseWeapon;
    private HP: number = 10;
    private weapon: Weapon = WEAPONS[0];
    private position: [number, number];
    private stage: number;
    private actionInfo: ActionInfo = new ActionInfo;

    private grid: GridComponent = new GridComponent;

    getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    chooseWeapon(): void {
        if (this.status != PlayerState.chooseWeapon) return;
        let weaponList: Array<Weapon> = WEAPONS;
        this.weapon = weaponList[this.getRandomArbitrary(1, weaponList.length)];
        this.status = PlayerState.movePosition;
        console.log("chooseWeapon()");
        console.log(this);
    }

    movePosition(): void {
        if (this.status != PlayerState.movePosition) return;
        let canMovePosition: Array<[number, number]> = [[-1, 0], [1, 0], [0, 0], [0, 1], [0, -1]];
        let randomPosition: [number, number] = canMovePosition[this.getRandomArbitrary(0, 5)];
        let afterPosition: [number, number] = [this.position[0] + randomPosition[0], this.position[1] + randomPosition[1]];
        if (this.grid.isInGridByGridPosition(afterPosition)) {
            this.actionInfo.afterPosition = afterPosition;
            this.status = PlayerState.attackEnemy;
        } else {
            this.movePosition();

        }
        console.log("movePosition()");
        console.log(this);
    }

    attackEnemy(): void {
        if (this.status != PlayerState.attackEnemy) return;
        let randomPosition: [number, number] = this.weapon.range[this.getRandomArbitrary(0, this.weapon.range.length - 1)];
        let attackPosition: [number, number] = [this.position[0] + randomPosition[0], this.position[1] + randomPosition[1]];
        if (this.grid.isInGridByGridPosition(attackPosition)) {
            this.actionInfo.attackPosition = attackPosition;
            this.status = PlayerState.chooseWeapon;            
        } else {
            this.attackEnemy();            
        }
        console.log("attackEnemy()");
        console.log(this);
    }

    getActionInfo(): ActionInfo {
        return this.actionInfo;
    }

    getAfterPosition() {
        return this.actionInfo.afterPosition;
    }

    setAfterPosition(position) {
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

    setWeapon(weapon: Weapon) {
        this.weapon = weapon;
    }

    getStatus(): PlayerState {
        return this.status;
    }

    setStatus(status: PlayerState) {
        this.status = status;
    }

    getPosition(): [number, number] {
        return this.position;
    }

    setPosition(position: [number, number]) {
        this.position = position;
    }
}


