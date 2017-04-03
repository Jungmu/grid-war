import { Component, OnInit } from '@angular/core';
import { Character } from '../class/character';
import { BaseComponent } from '../base/base.component';
import { GridInfo } from '../grid/grid.info';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {

  gridComponent: GridComponent = new GridComponent;
  constructor() { }

  ngOnInit() { }

  drawMoveRage(context): void {
    let nowPosition: [number, number] = [BaseComponent.player.getPosition()[0] - 1, BaseComponent.player.getPosition()[1] - 1];
    let gridInfo = this.gridComponent.calcGridSize();
    let fillStartPoint: [number, number];

    for (let i = -1; i <= 1; ++i) {
      for (let j = -1; j <= 1; ++j) {
        if ((-i != j && i != j) || (i == 0 && j == 0)) {
          fillStartPoint = [(nowPosition[0] + i) * gridInfo.gridWidth + gridInfo.gridOffset, (nowPosition[1] + j) * gridInfo.gridWidth + gridInfo.gridOffset];
          context.fillStyle = "rgba(255, 255, 255, 0.5)";
          if (this.gridComponent.isInGrid(fillStartPoint)) {
            context.fillRect(fillStartPoint[0], fillStartPoint[1], gridInfo.gridWidth, gridInfo.gridWidth);
          }
        }
      }
    }
  }

  drawMap(context): void {
    let ctx = context;
    let gridInfo = this.gridComponent.calcGridSize();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";

    ctx.beginPath();
    ctx.moveTo(gridInfo.gridOffset, gridInfo.gridOffset);
    ctx.lineTo(gridInfo.gridOffset, gridInfo.canvasWidth - gridInfo.gridOffset);
    ctx.lineTo(gridInfo.canvasWidth - gridInfo.gridOffset, gridInfo.canvasWidth - gridInfo.gridOffset);
    ctx.lineTo(gridInfo.canvasWidth - gridInfo.gridOffset, gridInfo.gridOffset);
    ctx.closePath();
    ctx.stroke();

    for (let i: number = 1; i < gridInfo.gridLineCount; ++i) {
      ctx.beginPath();
      ctx.moveTo(gridInfo.gridOffset, gridInfo.gridWidth * i + gridInfo.gridOffset);
      ctx.lineTo(gridInfo.canvasWidth - gridInfo.gridOffset, gridInfo.gridWidth * i + gridInfo.gridOffset);
      ctx.closePath();
      ctx.stroke();
    }
    for (let i: number = 1; i < gridInfo.gridLineCount; ++i) {
      ctx.beginPath();
      ctx.moveTo(gridInfo.gridWidth * i + gridInfo.gridOffset, gridInfo.gridOffset);
      ctx.lineTo(gridInfo.gridWidth * i + gridInfo.gridOffset, gridInfo.canvasWidth - gridInfo.gridOffset);
      ctx.closePath();
      ctx.stroke();
    }
  }

  drawCharacter(character: Character, context): void {
    let img: HTMLImageElement = <HTMLImageElement>document.getElementById(character.getWeapon().name);
    let ctx = context;
    let gridInfo: GridInfo = this.gridComponent.calcGridSize();

    let x: number = (character.getPosition()[0] - 1) * gridInfo.gridWidth;
    let y: number = (character.getPosition()[1] - 1) * gridInfo.gridWidth;
    ctx.drawImage(img, x + gridInfo.gridOffset, y + gridInfo.gridOffset, gridInfo.gridWidth, gridInfo.gridWidth);
  }

}
