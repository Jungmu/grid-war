import { Component } from '@angular/core';
import { ViewChild } from "@angular/core";
import { AfterViewInit } from "@angular/core";
import { GridComponent } from './grid/grid.component';
import { CharacterComponent } from './character/character.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  showGrid: boolean = false;
  context: CanvasRenderingContext2D;
  playerPosition:[number,number] = [4,3];
  enemyPosition:[number,number] = [1,2];

  grid = new GridComponent;
  player = new CharacterComponent(this.playerPosition);
  enemy = new CharacterComponent(this.enemyPosition);

  @ViewChild("myCanvas") myCanvas;

  ngAfterViewInit() {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");

    this.tick();
  }
  clicked() {
    if (this.showGrid) {
      this.showGrid = false;
    }
    else {
      this.showGrid = true;
    }
  }
  canvasResizing() {
    let canvas = this.myCanvas.nativeElement;
    canvas.width = document.getElementById("map").offsetWidth;
    canvas.height = canvas.width;
  }
  tick() {
    requestAnimationFrame(() => {
      this.player.weapon="sword";
      
      
      this.canvasResizing();
      this.tick();
      if (this.showGrid) {
        this.grid.drawMap(4, this.context);
      }
      this.grid.drawCharacter(this.player,this.context);
      //this.grid.drawCharacter(this.enemy,this.context);
    });
  }


}