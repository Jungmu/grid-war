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
  static player = new Character(AppComponent.playerPosition);  
  static enemy = new Character(AppComponent.enemyPosition);

  static context: CanvasRenderingContext2D;
  
  static gridLineCount: number = 4;
  static gridComponent = new GridComponent;

  static atcrag = new AttackrangeComponent;


  characterComponent = new CharacterComponent;

  @ViewChild("myCanvas") myCanvas;

  ngAfterViewInit() {
    let canvas = this.myCanvas.nativeElement;
    AppComponent.context = canvas.getContext("2d");
    
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
      AppComponent.gridComponent.drawMap(AppComponent.gridLineCount, AppComponent.context);
      AppComponent.atcrag.drawRange(AppComponent.context, AppComponent.player.weapon);

    }
    this.characterComponent.drawCharacter(AppComponent.gridLineCount, AppComponent.player, AppComponent.context);
    this.characterComponent.drawCharacter(AppComponent.gridLineCount, AppComponent.enemy, AppComponent.context);
  }
  clicked() {
    AppComponent.showGrid = true;
    setTimeout(() => {
      AppComponent.showGrid = false;
    }, 2500); 
  }
}