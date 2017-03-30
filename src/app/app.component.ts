import { Component } from '@angular/core';
import { ViewChild } from "@angular/core";
import { AfterViewInit } from "@angular/core";

import { GridComponent } from './grid/grid.component';
import { CharacterComponent } from './character/character.component';
import { Character } from './character/character';
import { playerState, gameState } from './const';
import { GridInfo } from './grid/grid.info';
import { WeaponComponent } from './weapon/weapon.component';
import { AttackrangeComponent } from './attackrange/attackrange.component';
import { MoverangeComponent } from './moverange/moverange.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  static playerState: number = playerState.wait;
  static gameState: number = gameState.begine;
  static playerPosition: [number, number] = [3, 4];
  static enemyPosition: [number, number] = [2, 1];
  static player: Character = new Character(AppComponent.playerPosition);
  static enemy: Character = new Character(AppComponent.enemyPosition);

  playerHp: number;
  enemyHp: number;

  context: CanvasRenderingContext2D;
  gridComponent: GridComponent = new GridComponent;

  attackrangeComponent: AttackrangeComponent = new AttackrangeComponent;
  moverangeComponent: MoverangeComponent = new MoverangeComponent;
  characterComponent: CharacterComponent = new CharacterComponent;

  @ViewChild("myCanvas") myCanvas;

  ngAfterViewInit(): void {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");
    AppComponent.player.setWeapon("none");
    this.tick();
  }
  tick(): void {
    requestAnimationFrame(() => {
      this.canvasResizing();
      this.rander();
      this.tick();
      this.playerHp = AppComponent.player.getHp();
      this.enemyHp = AppComponent.enemy.getHp();
    });
  }

  canvasResizing(): void {
    let canvas = this.myCanvas.nativeElement;
    canvas.width = document.getElementById("map").offsetWidth;
    canvas.height = canvas.width;
  }

  rander(): void {
    if (AppComponent.playerState == playerState.wait) {
      this.gridComponent.drawMap(this.context);
    }
    if (AppComponent.playerState == playerState.move) {
      this.moverangeComponent.drawMoveRage(this.context);
    }
    if (AppComponent.playerState == playerState.attack) {
      this.attackrangeComponent.drawRange(this.context, AppComponent.player.getWeapon());
    }
    this.characterComponent.drawCharacter(AppComponent.player, this.context);
    this.characterComponent.drawCharacter(AppComponent.enemy, this.context);

  }
}