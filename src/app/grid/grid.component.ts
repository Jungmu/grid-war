import { Component } from '@angular/core';
import { GridInfo } from './grid.info';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  gridInfo;

  calcGridSize(): GridInfo {
    let gridInfo: GridInfo = new GridInfo
    gridInfo.canvasWidth = document.getElementById("map").offsetWidth;
    gridInfo.gridOffset = gridInfo.canvasWidth * gridInfo.offset;
    gridInfo.gridFullWidth = gridInfo.canvasWidth * (1 - gridInfo.offset * 2);
    gridInfo.gridWidth = gridInfo.gridFullWidth / gridInfo.gridLineCount;
    return gridInfo;
  }

  isInGrid(fillStartPoint) {
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

  drawMap(context) {
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