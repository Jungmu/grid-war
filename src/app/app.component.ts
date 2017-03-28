import { Component } from '@angular/core';
import { ViewChild } from "@angular/core";
import { AfterViewInit } from "@angular/core";
import { GridComponent } from './grid/grid.component';
import { CharacterComponent } from './character/character.component';

import { Character } from './character/character';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CharacterComponent]
})
export class AppComponent implements AfterViewInit {
  showGrid: boolean = false;
  context: CanvasRenderingContext2D;
  playerPosition: [number, number] = [4, 3];
  enemyPosition: [number, number] = [1, 2];
  gridLineCount: number = 4;

  gridComponent = new GridComponent;
  characterComponent = new CharacterComponent;
  player = new Character(this.playerPosition);
  enemy = new Character(this.enemyPosition);

  @ViewChild("myCanvas") myCanvas;

  ngAfterViewInit() {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");
    this.tick();
  }
  tick() {
    requestAnimationFrame(() => {
      this.setWeapon();
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

  setWeapon() {
    this.player.weapon = "sword";
    this.enemy.weapon = "none";
  }
  rander() {
    if (this.showGrid) {
      this.gridComponent.drawMap(this.gridLineCount, this.context);
    }
    this.characterComponent.drawCharacter(this.gridLineCount, this.player, this.context);
    this.characterComponent.drawCharacter(this.gridLineCount, this.enemy, this.context);
  }
  clicked() {
    if (this.showGrid) {
      this.showGrid = false;
    }
    else {
      this.showGrid = true;
    }
  }
}