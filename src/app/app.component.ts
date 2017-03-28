import { Component } from '@angular/core';
import { ViewChild } from "@angular/core";
import { AfterViewInit } from "@angular/core";
import { GridComponent } from './grid/grid.component';
import { CharacterComponent } from './character/character.component';
import { Character } from './character/character';

import { WeaponComponent } from './weapon/weapon.component';
import { MoveComponent } from './move/move.component';

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

  context: CanvasRenderingContext2D;
  gridLineCount: number = 4;

  gridComponent = new GridComponent;
  characterComponent = new CharacterComponent;

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
      this.gridComponent.drawMap(this.gridLineCount, this.context);
    }
    this.characterComponent.drawCharacter(this.gridLineCount, AppComponent.player, this.context);
    this.characterComponent.drawCharacter(this.gridLineCount, AppComponent.enemy, this.context);
  }
  clicked() {
    AppComponent.showGrid = true;
    setTimeout(() => {
      AppComponent.showGrid = false;
    }, 2500); 
  }
}