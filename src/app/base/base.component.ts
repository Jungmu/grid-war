import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewChild } from "@angular/core";
import { AfterViewInit } from "@angular/core";

import { GridComponent } from '../grid/grid.component';
import { DrawComponent } from '../draw/draw.component';

import { GameState, PlayerState } from '../const';
import { Character } from '../class/character';
import { AI } from '../class/AI';

import { Weapon } from '../class/weapon';
import { WEAPONS } from '../service/weapon-data';
import { WeaponService } from '../service/weapon.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
  providers: [WeaponService]
})

export class BaseComponent implements AfterViewInit {
  @ViewChild("myCanvas") myCanvas;

  private context: CanvasRenderingContext2D;
  private grid: GridComponent = new GridComponent;
  private draw: DrawComponent = new DrawComponent;

  static gameState: number = GameState.playerTurn;
  static selectedWeapon: Weapon = WEAPONS[0];
  static player;
  static enemy;

  weapons: Weapon[];

  constructor(private route: ActivatedRoute, private weaponService: WeaponService) { }

  getWeapons(): void {
    this.weaponService.getWeapons().then(weapons => this.weapons = weapons);
  }

  ngAfterViewInit(): void {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");

    let mode: string;
    this.route.params.subscribe(params => {
      mode = params['mode'];
    });

    this.getWeapons();

    switch (mode) {
      case 'singlePlay':
        BaseComponent.player = new Character;
        BaseComponent.player.setStatus(PlayerState.chooseWeapon);
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
    BaseComponent.enemy.setPosition([2, 1]);

    this.tick();
  }

  tick(): void {
    requestAnimationFrame(() => {
      this.playGame();
      this.resizeCanvas();
      this.rander();
      this.tick();
    });
  }

  playGame(): void {
    switch (BaseComponent.gameState) {
      case GameState.playerTurn:
        this.setData(BaseComponent.player);
        break;
      case GameState.enemyTurn:
        this.setData(BaseComponent.enemy);
        break;
      case GameState.wait:
        // do render
        break;
      case GameState.work:
        this.calc();
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
      case PlayerState.chooseWeapon:
        break;
      case PlayerState.movePosition:
        this.draw.drawMap(this.context);
        this.draw.drawMoveRage(this.context);
        break;
      case PlayerState.attackEnemy:
        this.draw.drawMap(this.context);
        break;
      default:
        console.log("상태 없음");
        break;
    }
    this.draw.drawCharacter(player, this.context);
    this.draw.drawCharacter(enemy, this.context);    
  }

  randerRange() {

  }

  setData(myCharacter:Character) {
    myCharacter.chooseWeapon();
    myCharacter.movePosition();
    myCharacter.attackEnemy();
  }

  calc() {
    let player = BaseComponent.player;
    let enemy = BaseComponent.enemy;
    if (player.getActionInfo().attackPosition == enemy.getActionInfo().afterPosition) {
      enemy.decrimentHP(this.getDamage(player.getWeapon()));
    }
  }

  getDamage(weapon) {
    let damage;
    return damage;
  }
  onSelect(weapon: Weapon): void {
    BaseComponent.selectedWeapon = weapon;
  }

}
