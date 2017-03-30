import { Component } from '@angular/core';
import { GridInfo } from './grid.info';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  gridInfo: GridInfo = new GridInfo;

  calcGridSize(): GridInfo {
    this.gridInfo.canvasWidth = document.getElementById("map").offsetWidth;
    this.gridInfo.gridOffset = this.gridInfo.canvasWidth * this.gridInfo.offset;
    this.gridInfo.gridFullWidth = this.gridInfo.canvasWidth * (1 - this.gridInfo.offset * 2);
    this.gridInfo.gridWidth = this.gridInfo.gridFullWidth / this.gridInfo.gridLineCount;
    return this.gridInfo;
  }

  isInGrid(fillStartPoint): boolean {
    this.gridInfo = this.calcGridSize();
    if (fillStartPoint[0] < this.gridInfo.gridOffset
      || fillStartPoint[1] < this.gridInfo.gridOffset
      || fillStartPoint[0] > this.gridInfo.gridFullWidth
      || fillStartPoint[1] > this.gridInfo.gridFullWidth) {
      return false;
    }
    else {
      return true;
    }
  }

  drawMap(context): void {
    let ctx = context;
    this.gridInfo = this.calcGridSize();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";

    ctx.beginPath();
    ctx.moveTo(this.gridInfo.gridOffset, this.gridInfo.gridOffset);
    ctx.lineTo(this.gridInfo.gridOffset, this.gridInfo.canvasWidth - this.gridInfo.gridOffset);
    ctx.lineTo(this.gridInfo.canvasWidth - this.gridInfo.gridOffset, this.gridInfo.canvasWidth - this.gridInfo.gridOffset);
    ctx.lineTo(this.gridInfo.canvasWidth - this.gridInfo.gridOffset, this.gridInfo.gridOffset);
    ctx.closePath();
    ctx.stroke();

    for (let i: number = 1; i < this.gridInfo.gridLineCount; ++i) {
      ctx.beginPath();
      ctx.moveTo(this.gridInfo.gridOffset, this.gridInfo.gridWidth * i + this.gridInfo.gridOffset);
      ctx.lineTo(this.gridInfo.canvasWidth - this.gridInfo.gridOffset, this.gridInfo.gridWidth * i + this.gridInfo.gridOffset);
      ctx.closePath();
      ctx.stroke();
    }
    for (let i: number = 1; i < this.gridInfo.gridLineCount; ++i) {
      ctx.beginPath();
      ctx.moveTo(this.gridInfo.gridWidth * i + this.gridInfo.gridOffset, this.gridInfo.gridOffset);
      ctx.lineTo(this.gridInfo.gridWidth * i + this.gridInfo.gridOffset, this.gridInfo.canvasWidth - this.gridInfo.gridOffset);
      ctx.closePath();
      ctx.stroke();
    }
  }

}