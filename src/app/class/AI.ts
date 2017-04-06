import { Skill } from './skill';
import { SKILLS } from '../service/skill-data';
import { PlayerState } from '../const';
import { BaseComponent } from '../base/base.component';
import { GridComponent } from '../grid/grid.component';
import { ActionInfo } from './actionInfo';
import { CharacterImpl } from './characterImpl';

export class AI implements CharacterImpl{
    private status: number = PlayerState.chooseSkill;
    private HP: number = 120;
    private skill: Skill = SKILLS[0];
    private position: [number, number];
    private stage: number;
    private actionInfo: ActionInfo = new ActionInfo;

    private grid: GridComponent = new GridComponent;

    getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    chooseSkill(): void {
        if (this.status != PlayerState.chooseSkill) return;
        let skillList: Array<Skill> = SKILLS;
        this.skill = skillList[this.getRandomArbitrary(1, skillList.length)];
        this.status = PlayerState.movePosition;
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
    }

    attackEnemy(): void {
        if (this.status != PlayerState.attackEnemy) return;
        let randomPosition: [number, number] = this.skill.attackRange[this.getRandomArbitrary(0, this.skill.attackRange.length - 1)];
        let attackPosition: [number, number] = [this.actionInfo.afterPosition[0] + randomPosition[0], this.actionInfo.afterPosition[1] + randomPosition[1]];
        if (this.grid.isInGridByGridPosition(attackPosition)) {
            this.actionInfo.attackPosition = attackPosition;
            this.status = PlayerState.chooseSkill;            
        } else {
            this.attackEnemy();            
        }
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

    getSkill(): Skill {
        return this.skill;
    }

    setSkill(skill: Skill) {
        this.skill = skill;
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


