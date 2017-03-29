import { Component } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  
  drawMap(line: number,context) {
    let ctx = context;
    let offset = 0.1;
    let canvasWidth = document.getElementById("map").offsetWidth;
    let gridOffset:number = canvasWidth*offset;
    let gridFullWidth:number = canvasWidth*(1-offset*2);
    let gridWidth:number = gridFullWidth / line;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";

    ctx.beginPath();
    ctx.moveTo(gridOffset, gridOffset);
    ctx.lineTo(gridOffset, canvasWidth-gridOffset);
    ctx.lineTo(canvasWidth-gridOffset, canvasWidth-gridOffset);
    ctx.lineTo(canvasWidth-gridOffset, gridOffset);
    ctx.closePath();
    ctx.stroke();

    for (let i: number = 1; i < line; ++i) {
      ctx.beginPath();
      ctx.moveTo(gridOffset, gridWidth * i + gridOffset);
      ctx.lineTo(canvasWidth-gridOffset, gridWidth * i + gridOffset);
      ctx.closePath();
      ctx.stroke();
    }
    for (let i: number = 1; i < line; ++i) {
      ctx.beginPath();
      ctx.moveTo(gridWidth * i + gridOffset, gridOffset);
      ctx.lineTo(gridWidth * i + gridOffset, canvasWidth-gridOffset);
      ctx.closePath();
      ctx.stroke();
    }
  }

}