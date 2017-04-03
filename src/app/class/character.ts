import { Weapon } from './weapon';
import { WEAPONS } from '../service/weapon-data';
import { PlayerState } from '../const';
import { BaseComponent } from '../base/base.component';

export class Character {
    private status: PlayerState;
    private HP: number = 10;
    private weapon: Weapon = WEAPONS[0];
    private position: [number, number];
    private stage: number;
    private actionInfo: ActionInfo;

    chooseWeapon(): void {
        this.weapon = BaseComponent.selectedWeapon;
        if (this.status == PlayerState.chooseWeapon && this.weapon != null) {
            this.status = PlayerState.movePosition;
        }
    }

    movePosition(): void {
        
    }

    attackEnemy(): void {
        //this.actionInfo.attackPosition = position;
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