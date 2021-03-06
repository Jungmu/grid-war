import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewChild } from "@angular/core";
import { AfterViewInit } from "@angular/core";

import { GridComponent } from '../grid/grid.component';
import { DrawComponent } from '../draw/draw.component';

import { GameState, PlayerState, LiveDrawState, AdvantagePercent, DisadvantagePercent } from '../const';
import { Character } from '../class/character';
import { AI } from '../class/AI';
// import { WICC } from '../class/WICC'

import { Skill } from '../class/skill';
import { SKILLS } from '../service/skill-data';
import { SkillService } from '../service/skill.service';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css'],
    providers: [SkillService]
})

export class BaseComponent implements AfterViewInit {
    @ViewChild("myCanvas") myCanvas;

    private context: CanvasRenderingContext2D;
    private grid: GridComponent = new GridComponent;
    private draw: DrawComponent = new DrawComponent;

    static mode: string;

    static drawState: number = LiveDrawState.wait;

    static gameState: number = GameState.playerTurn;
    static selectedSkill: Skill = SKILLS[0];
    static player;
    static enemy;

    skills: Skill[];

    playerHp: number;
    enemyHp: number;

    autoPlay: boolean = true;
    hasAttackPosition: boolean = false;

    startTime = Date.now();
    loopCount = 0;

    constructor(private route: ActivatedRoute, private skillService: SkillService) { }

    getSkills(): void {
        this.skillService.getSkills().then(skills => this.skills = skills);
    }

    ngAfterViewInit(): void {
        let canvas = this.myCanvas.nativeElement;
        this.context = canvas.getContext("2d");

        this.route.params.subscribe(params => {
            BaseComponent.mode = params['mode'];
        });

        this.getSkills();

        switch (BaseComponent.mode) {
            case 'singlePlay':
                BaseComponent.player = new Character;
                BaseComponent.player.setStatus(PlayerState.chooseSkill);
                BaseComponent.enemy = new AI;
                // BaseComponent.enemy = new WICC;
                break;
            case 'multiPlay':
                BaseComponent.player = new Character;
                BaseComponent.enemy = new Character;
                break;
            case 'AIvsAI':
                BaseComponent.player = new AI;
                // BaseComponent.player = new WICC;
                BaseComponent.player.setName("AI_1");
                BaseComponent.enemy = new AI;
                BaseComponent.enemy.setName("AI_2");
                break;
            default:
                //error
                break;
        }

        BaseComponent.player.setPosition([3, 4]);
        BaseComponent.player.setAfterPosition([3, 4]);
        BaseComponent.enemy.setPosition([2, 1]);
        BaseComponent.enemy.setAfterPosition([2, 1]);

        this.tick();
    }

    tick(): void {
        requestAnimationFrame(() => {
            this.loopCount++;
            let FPS = this.loopCount * 1000 / (Date.now() - this.startTime);

            this.resizeCanvas();
            this.rander();
            this.playGame();

            this.playerHp = BaseComponent.player.getHp();
            this.enemyHp = BaseComponent.enemy.getHp();
            if (this.playerHp <= 0 && this.enemyHp <= 0) {
                alert("무승부!!!!!" + BaseComponent.player.getName() + " HP=" + this.playerHp + " : " +BaseComponent.enemy.getName() + "HP=" + this.enemyHp);
                window.history.back();
            } else if (this.playerHp <= 0) {
                alert(BaseComponent.enemy.getName() + " 승리!!!!!" + BaseComponent.player.getName() + " HP=" + this.playerHp + " : " +BaseComponent.enemy.getName() + "HP=" + this.enemyHp);
                window.history.back();
            } else if (this.enemyHp <= 0) {
                alert(BaseComponent.player.getName() + " 승리!!!!!" + BaseComponent.player.getName() + " HP=" + this.playerHp + " : " +BaseComponent.enemy.getName() + "HP=" + this.enemyHp);
                window.history.back();
            }

            this.tick();
        });
    }

    playGame(): void {
        switch (BaseComponent.gameState) {
            case GameState.playerTurn:
                this.setData(BaseComponent.player);
                if (BaseComponent.mode == 'AIvsAI') {
                    BaseComponent.gameState = GameState.enemyTurn;
                }
                break;
            case GameState.enemyTurn:
                this.setData(BaseComponent.enemy);
                BaseComponent.drawState = LiveDrawState.movePlayer;
                BaseComponent.gameState = GameState.wait;
                break;
            case GameState.wait:
                // do render
                BaseComponent.player.setStatus(PlayerState.wait);
                if (!this.hasAttackPosition) {
                    this.calcAttackRange(BaseComponent.player);
                    this.calcAttackRange(BaseComponent.enemy);
                    this.hasAttackPosition = true;
                }
                this.randerForWaiting();
                break;
            case GameState.work:
                this.hasAttackPosition = false;
                this.calc(BaseComponent.player, BaseComponent.enemy);
                this.calc(BaseComponent.enemy, BaseComponent.player);

                if (this.autoPlay) {
                    BaseComponent.gameState = GameState.playerTurn;
                }
                break;
            default:
                // error
                break;
        }
    }

    resizeCanvas(): void {
        let canvas = this.myCanvas.nativeElement;
        canvas.width = document.getElementById("map").offsetWidth;
        canvas.height = canvas.width;
    }

    rander(): void {
        let player = BaseComponent.player;
        let enemy = BaseComponent.enemy;

        switch (player.getStatus()) {
            case PlayerState.chooseSkill:

                break;
            case PlayerState.movePosition:
                this.draw.drawMap(this.context);
                this.draw.drawMoveRange(this.context);
                break;
            case PlayerState.attackEnemy:
                this.draw.drawMap(this.context);
                this.draw.drawAttackRange(player, this.context);
                break;
            case PlayerState.wait:
                break;
            default:
                console.log("상태 없음");
                break;
        }

        this.draw.drawCharacter(player, this.context);
        this.draw.drawCharacter(enemy, this.context);
    }

    randerForWaiting() {
        switch (BaseComponent.drawState) {
            case LiveDrawState.movePlayer:
                this.draw.drawLiveMove(BaseComponent.player);
                break;
            case LiveDrawState.moveEnemy:
                this.draw.drawLiveMove(BaseComponent.enemy);
                break;
            case LiveDrawState.attackPlayer:
                this.draw.drawLiveAttack(BaseComponent.player, this.context);
                break;
            case LiveDrawState.attackEnemy:
                this.draw.drawLiveAttack(BaseComponent.enemy, this.context);
                break;
            default:
                //error

                // 오른쪽이나 왼쪽에 현재 플레이어들의 상태에 대한 로그를 찍어주면 좋을듯
                // ex) 누구누구가 누구누구를 어떤공격으로 어떻게 공격해서 체력이 얼마 달았다 등등

                break;
        }

    }

    setData(myCharacter) {
        myCharacter.chooseSkill();
        myCharacter.movePosition();
        myCharacter.attackEnemy();
    }

    calc(player, enemy) {
        let skill: Skill = player.getSkill();
        let rate = this.calcAttribute(skill.attribute, enemy.getSkill().attribute);

        player.getAttackRange().forEach(element => {
            if (element[0] == enemy.getPosition()[0] && element[1] == enemy.getPosition()[1]) {
                enemy.decrementHP(Math.floor(skill.damage * rate));
                if (skill.dotDamage != 0) {
                    enemy.pushDotDamage([skill.dotDamage, skill.dotTurn]);
                }
            } else if (skill.attackRange.length == 1
                && skill.attackRange[0][0] == 0 && skill.attackRange[0][1] == 0) {
                player.incrementHP(skill.damage);
                if (skill.dotDamage != 0) {
                    player.pushDotDamage([skill.dotDamage * -1, skill.dotTurn]);
                }

            }
        });
        for (let i = 0; i < enemy.getDotDamage().length; ++i) {
            if (enemy.getDotDamage()[i][1] == 0) {
                enemy.getDotDamage().splice(i, 1);
            }
        }
        enemy.getDotDamage().forEach(element => {
            if (element[1] > 0) {
                enemy.decrementHP(element[0]);
                element[1]--;
            }
        });


        // 임시방편 무기초기화 및 선택된무기 초기화
        player.setSkill(SKILLS[0]);
        BaseComponent.selectedSkill = player.getSkill();
        BaseComponent.player.setStatus(PlayerState.chooseSkill);
    }

    calcAttribute(playerAtt: string, enemyAtt: string): number {
        let rate: number = 1.0;
        switch (playerAtt) {
            case "fire":
                if (enemyAtt == "water") {
                    rate = DisadvantagePercent;
                } else if (enemyAtt == "grass") {
                    rate = AdvantagePercent;
                }
                break;
            case "water":
                if (enemyAtt == "grass") {
                    rate = DisadvantagePercent;
                } else if (enemyAtt == "fire") {
                    rate = AdvantagePercent;
                }
                break;
            case "grass":
                if (enemyAtt == "fire") {
                    rate = DisadvantagePercent;
                } else if (enemyAtt == "water") {
                    rate = AdvantagePercent;
                }
                break;
        }
        return rate;
    }
    calcAttackRange(character): void {
        let skill = character.getSkill();
        let tempRange: Array<[number, number]> = new Array<[number, number]>();
        let tempRandomArr = this.shuffleRandom(0, skill.skillRange.length - 1).splice(1, skill.randomCount);

        if (skill.randomCount != 0) {
            for (let i = 0; i < skill.randomCount; ++i) {
                let randomPosition = skill.skillRange[tempRandomArr[i]];
                tempRange.push([randomPosition[0] + character.getAttackPosition()[0], randomPosition[1] + character.getAttackPosition()[1]]);
            }
        } else {
            for (let i = 0; i < skill.skillRange.length; ++i) {
                tempRange.push([character.getAttackPosition()[0] + skill.skillRange[i][0], character.getAttackPosition()[1] + skill.skillRange[i][1]]);
            }
        }
        character.setAttackRange(tempRange);
    }

    onSelect(skill: Skill): void {
        if (BaseComponent.gameState == GameState.playerTurn) {
            BaseComponent.selectedSkill = skill;
        }
    }

    isAutoPlay() {
        this.autoPlay = !this.autoPlay;
    }

    DoPlay() {
        if (BaseComponent.gameState == GameState.work) {
            BaseComponent.gameState = GameState.playerTurn;
        }
    }

    shuffleRandom(min, max) {
        let ar = new Array();
        let temp;
        let rnum;

        for (let i = min; i <= max; i++) {
            ar.push(i);
        }

        for (let i = 0; i < ar.length; i++) {
            rnum = Math.floor(Math.random() * max); //난수발생
            temp = ar[i];
            ar[i] = ar[rnum];
            ar[rnum] = temp;
        }

        return ar;
    }

    getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
