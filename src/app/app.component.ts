import { Component } from '@angular/core';
import { ViewChild } from "@angular/core";
import { AfterViewInit } from "@angular/core";
import { GridComponent } from './grid/grid.component';
import { CharacterComponent } from './character/character.component';
import { Character } from './character/character';

import { WeaponComponent } from './weapon/weapon.component';
import { MoveComponent } from './move/move.component';
import { AttackrangeComponent } from './attackrange/attackrange.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  static showGrid: boolean = false;
  static playerPosition: [number, number] = [4, 3];
  static enemyPosition: [number, number] = [1, 2];
  static player: Character = new Character(AppComponent.playerPosition);  
  static enemy: Character = new Character(AppComponent.enemyPosition);
  static gridLineCount: number = 4;

  context: CanvasRenderingContext2D;
  gridComponent:GridComponent = new GridComponent;

  attackrangeComponent: AttackrangeComponent = new AttackrangeComponent;
  characterComponent: CharacterComponent = new CharacterComponent;

  @ViewChild("myCanvas") myCanvas;

  ngAfterViewInit() {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");
    
    AppComponent.player.setWeapon("sword");

    this.tick();
  }
  tick() {
    requestAnimationFrame(() => {
      // this.setWeapon();
      this.canvasResizing();
      this.rander();
      this.tick();
    });
  }

  canvasResizing() {
    let canvas = this.myCanvas.nativeElement;
    canvas.width = document.getElementById("map").offsetWidth;
    canvas.height = canvas.width;
  }

  rander() {
    if (AppComponent.showGrid) {
      this.gridComponent.drawMap(AppComponent.gridLineCount, this.context);
      this.attackrangeComponent.drawRange(this.context, AppComponent.gridLineCount,AppComponent.player.weapon);

    }
    this.characterComponent.drawCharacter(AppComponent.gridLineCount, AppComponent.player, this.context);
    this.characterComponent.drawCharacter(AppComponent.gridLineCount, AppComponent.enemy, this.context);
  }
  clicked() {
    AppComponent.showGrid = true;
    setTimeout(() => {
      AppComponent.showGrid = false;
    }, 2500); 
  }
}