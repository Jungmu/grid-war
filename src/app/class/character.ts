import { Weapon } from './weapon';
import { WEAPONS } from '../service/weapon-data';
import { PlayerState } from '../const';
import { BaseComponent } from '../base/base.component';
import { ActionInfo } from './actionInfo';
import { CharacterImpl } from './characterImpl';

export class Character implements CharacterImpl{
    private status: PlayerState = PlayerState.chooseWeapon;
    private HP: number = 5;
    private weapon: Weapon = WEAPONS[0];
    private position: [number, number];
    private stage: number;
    private actionInfo: ActionInfo = new ActionInfo;

    chooseWeapon(): void {
        this.weapon = BaseComponent.selectedWeapon;
        if (this.status == PlayerState.chooseWeapon && this.weapon != WEAPONS[0]) {
            this.status = PlayerState.movePosition;
        }
    }

    movePosition(): void {
        // touch    
    }

    attackEnemy(): void {
        // touch
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
    }

}
