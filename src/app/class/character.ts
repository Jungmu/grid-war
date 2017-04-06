import { Skill } from './skill';
import { SKILLS } from '../service/skill-data';
import { PlayerState } from '../const';
import { BaseComponent } from '../base/base.component';
import { ActionInfo } from './actionInfo';
import { CharacterImpl } from './characterImpl';

export class Character implements CharacterImpl{
    private name: string;
    private status: PlayerState = PlayerState.chooseSkill;
    private HP: number = 120;
    private skill: Skill = SKILLS[0];
    private position: [number, number];
    private stage: number;
    private actionInfo: ActionInfo = new ActionInfo;

    chooseSkill(): void {
        this.skill = BaseComponent.selectedSkill;
        if (this.status == PlayerState.chooseSkill && this.skill != SKILLS[0]) {
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

    getSkill(): Skill {
        return this.skill;
    }

    setSkill(skill:Skill){
        this.skill = skill;
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
