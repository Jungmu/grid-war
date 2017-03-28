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
    let cavasWidth = document.getElementById("map").offsetWidth;
    let gridOffset = cavasWidth*offset;
    let gridFullWidth = cavasWidth*(1-offset*2);
    let gridWidth = gridFullWidth / line;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";

    ctx.beginPath();
    ctx.moveTo(gridOffset, gridOffset);
    ctx.lineTo(gridOffset, cavasWidth-gridOffset);
    ctx.lineTo(cavasWidth-gridOffset, cavasWidth-gridOffset);
    ctx.lineTo(cavasWidth-gridOffset, gridOffset);
    ctx.closePath();
    ctx.stroke();

    for (let i: number = 1; i < line; ++i) {
      ctx.beginPath();
      ctx.moveTo(gridOffset, gridWidth * i + gridOffset);
      ctx.lineTo(cavasWidth-gridOffset, gridWidth * i + gridOffset);
      ctx.closePath();
      ctx.stroke();
    }
    for (let i: number = 1; i < line; ++i) {
      ctx.beginPath();
      ctx.moveTo(gridWidth * i + gridOffset, gridOffset);
      ctx.lineTo(gridWidth * i + gridOffset, cavasWidth-gridOffset);
      ctx.closePath();
      ctx.stroke();
    }
  }

}