import { Component } from '@angular/core';
import { GridInfo } from './grid.info';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {

  calcGridSize():GridInfo {
        let gridInfo:GridInfo = new GridInfo
        gridInfo.canvasWidth = document.getElementById("map").offsetWidth;
        gridInfo.gridOffset = gridInfo.canvasWidth * gridInfo.offset;
        gridInfo.gridFullWidth = gridInfo.canvasWidth * (1 - gridInfo.offset * 2);
        gridInfo.gridWidth = gridInfo.gridFullWidth / gridInfo.gridLineCount;
        return gridInfo;
    }
  
  drawMap(line: number,context) {
    let ctx = context;
    let gridInfo = this.calcGridSize();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";

    ctx.beginPath();
    ctx.moveTo(gridInfo.gridOffset, gridInfo.gridOffset);
    ctx.lineTo(gridInfo.gridOffset, gridInfo.canvasWidth-gridInfo.gridOffset);
    ctx.lineTo(gridInfo.canvasWidth-gridInfo.gridOffset, gridInfo.canvasWidth-gridInfo.gridOffset);
    ctx.lineTo(gridInfo.canvasWidth-gridInfo.gridOffset, gridInfo.gridOffset);
    ctx.closePath();
    ctx.stroke();

    for (let i: number = 1; i < line; ++i) {
      ctx.beginPath();
      ctx.moveTo(gridInfo.gridOffset, gridInfo.gridWidth * i + gridInfo.gridOffset);
      ctx.lineTo(gridInfo.canvasWidth-gridInfo.gridOffset, gridInfo.gridWidth * i + gridInfo.gridOffset);
      ctx.closePath();
      ctx.stroke();
    }
    for (let i: number = 1; i < line; ++i) {
      ctx.beginPath();
      ctx.moveTo(gridInfo.gridWidth * i + gridInfo.gridOffset, gridInfo.gridOffset);
      ctx.lineTo(gridInfo.gridWidth * i + gridInfo.gridOffset, gridInfo.canvasWidth-gridInfo.gridOffset);
      ctx.closePath();
      ctx.stroke();
    }
  }

}