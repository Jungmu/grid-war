import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewChild } from "@angular/core";
import { AfterViewInit } from "@angular/core";

import { GridComponent } from '../grid/grid.component';
import { DrawComponent } from '../draw/draw.component';

import { GameState, PlayerState, LiveDrawState } from '../const';
import { Character } from '../class/character';
import { AI } from '../class/AI';

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
  // static selectedSkill: number = 0;
  static player;
  static enemy;

  skills: Skill[];

  playerHp: number;
  enemyHp: number;

  autoPlay: boolean = true;

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
        break;
      case 'multiPlay':
        BaseComponent.player = new Character;
        BaseComponent.enemy = new Character;
        break;
      case 'AIvsAI':
        BaseComponent.player = new AI;
        BaseComponent.enemy = new AI;
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
      this.loopCount ++;
      let FPS = this.loopCount * 1000 / (Date.now() - this.startTime);
      // console.log(FPS);

      this.resizeCanvas();
      this.rander();
      this.playGame();

      this.playerHp = BaseComponent.player.getHp();
      this.enemyHp = BaseComponent.enemy.getHp();
      if (this.playerHp <= 0 || this.enemyHp <= 0) {
        alert("누군가 승리!!!!! 내HP=" + this.playerHp + " : 적HP=" + this.enemyHp);
        location.href = 'http://localhost:8080/';
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
        this.randerForWaiting();
        break;
      case GameState.work:
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

    this.draw.drawCharacter(player, this.context, "");
    this.draw.drawCharacter(enemy, this.context, "2");
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
        // this.draw.drawAttackRange(BaseComponent.player, this.context);
        this.draw.drawLiveAttack(BaseComponent.player, this.context);
        // BaseComponent.drawState = LiveDrawState.attackEnemy;
        break;
      case LiveDrawState.attackEnemy:
        // this.draw.drawAttackRange(BaseComponent.enemy, this.context);
        this.draw.drawLiveAttack(BaseComponent.enemy, this.context);
        // BaseComponent.drawState = LiveDrawState.wait;
        // BaseComponent.gameState = GameState.work;
        break;
      default:
        //error

        // 공격은 동시에 진행해서 상쇄를 넣을건지 말건지는 다시결정해야할듯.
        // 오른쪽이나 왼쪽에 현재 플레이어들의 상태에 대한 로그를 찍어주면 좋을듯
        // ex) 누구누구가 누구누구를 어떤공격으로 어떻게 공격해서 체력이 얼마 달았다 등등

        break;
    }

  }

  setData(myCharacter: Character) {
    myCharacter.chooseSkill();
    myCharacter.movePosition();
    myCharacter.attackEnemy();

  }

  calc(player, enemy) {
    // if (player.getSkill() == 0) {
      if (player.getAttackPosition()[0] == enemy.getPosition()[0] && player.getAttackPosition()[1] == enemy.getPosition()[1]) {
        enemy.decrimentHP(player.getSkill().damage);
      }
    // } else {
    //   let skillRange: Array<[number, number]> = player.getSkill().skill[player.getSkill() - 1].range;
    //   skillRange.forEach(range => {
    //     if (player.getAttackPosition()[0]+range[0] == enemy.getPosition()[0] && player.getAttackPosition()[1]+range[1] == enemy.getPosition()[1]) {
    //       let damage = player.getSkill().skill[player.getSkill() - 1].damage;
    //       enemy.decrimentHP(damage);
    //     }
    //   });
    // }

    // 임시방편 무기초기화 및 선택된무기 초기화
    player.setSkill(SKILLS[0]);
    BaseComponent.selectedSkill = player.getSkill();
    BaseComponent.player.setStatus(PlayerState.chooseSkill);
  }

  onSelect(skill: Skill): void {
    if (BaseComponent.gameState == GameState.playerTurn) {
      BaseComponent.selectedSkill = skill;
    }
  }
  // onSelectSkill(skill) {
  //   if (BaseComponent.gameState == GameState.playerTurn) {
  //     BaseComponent.selectedSkill = skill.key;
  //   }
  // }

  isAutoPlay() {
    this.autoPlay = !this.autoPlay;
  }

  DoPlay() {
    if (BaseComponent.gameState == GameState.work) {
      BaseComponent.gameState = GameState.playerTurn;
    }
  }
}
