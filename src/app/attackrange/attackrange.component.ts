import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-attackrange',
  templateUrl: './attackrange.component.html',
  styleUrls: ['./attackrange.component.css']
})
export class AttackrangeComponent implements OnInit {
  
  fillColor = "rgba(255, 255, 255, 0.5)";
  nowPosition:[number,number] = [AppComponent.player.position[0] - 1, AppComponent.player.position[1] - 1];
  offset: number = 0.1;
  line: number;
  canvasWidth:number;
  gridOffset:number;
  gridFullWidth:number;
  gridWidth:number;

  constructor() { }
  ngOnInit() { }

  drawRange(context, line: number, weapon: string) {
    this.line = line;
    this.canvasWidth = document.getElementById("map").offsetWidth;
    this.gridOffset = this.canvasWidth * this.offset;
    this.gridFullWidth = this.canvasWidth * (1 - this.offset * 2);
    this.gridWidth = this.gridFullWidth / this.line;

    switch (weapon) {
      case "sword":
        this.drawSwordRage(context);
        break;
      case "spear":
        this.drawSpearRage(context);
        break;
      case "arrow":
        this.drawArrowRage(context);
        break;
    }
  }

  drawArrowRage(context) {
    let ctx = context;
    ctx.fillStyle = this.fillColor;

    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        if (j == -2 || j == 2) {
          ctx.fillRect((this.nowPosition[1] + i) * this.gridWidth + this.gridOffset, (this.nowPosition[0] + j) * this.gridWidth + this.gridOffset, this.gridWidth, this.gridWidth);
        } else {
          if (i == -2 || i == 2) {
            ctx.fillRect((this.nowPosition[1] + i) * this.gridWidth + this.gridOffset, (this.nowPosition[0] + j) * this.gridWidth + this.gridOffset, this.gridWidth, this.gridWidth);
          }
        }
      }
    }
  }

  drawSwordRage(context) {
    let ctx = context;
    ctx.fillStyle = this.fillColor;

    ctx.fillRect((this.nowPosition[1]) * this.gridWidth + this.gridOffset, (this.nowPosition[0] - 1) * this.gridWidth + this.gridOffset, this.gridWidth, this.gridWidth);
    ctx.fillRect((this.nowPosition[1] - 1) * this.gridWidth + this.gridOffset, (this.nowPosition[0]) * this.gridWidth + this.gridOffset, this.gridWidth, this.gridWidth);
    ctx.fillRect((this.nowPosition[1]) * this.gridWidth + this.gridOffset, (this.nowPosition[0] + 1) * this.gridWidth + this.gridOffset, this.gridWidth, this.gridWidth);
    ctx.fillRect((this.nowPosition[1] + 1) * this.gridWidth + this.gridOffset, (this.nowPosition[0]) * this.gridWidth + this.gridOffset, this.gridWidth, this.gridWidth);
  }

  drawSpearRage(context) {
    let ctx = context;
    ctx.fillStyle = this.fillColor;

    ctx.fillRect((this.nowPosition[1] + 2) * this.gridWidth + this.gridOffset, (this.nowPosition[0]) * this.gridWidth + this.gridOffset, this.gridWidth, this.gridWidth);
    ctx.fillRect((this.nowPosition[1] + 1) * this.gridWidth + this.gridOffset, (this.nowPosition[0] + 1) * this.gridWidth + this.gridOffset, this.gridWidth, this.gridWidth);
    ctx.fillRect((this.nowPosition[1]) * this.gridWidth + this.gridOffset, (this.nowPosition[0] + 2) * this.gridWidth + this.gridOffset, this.gridWidth, this.gridWidth);
    ctx.fillRect((this.nowPosition[1] - 1) * this.gridWidth + this.gridOffset, (this.nowPosition[0] + 1) * this.gridWidth + this.gridOffset, this.gridWidth, this.gridWidth);
    ctx.fillRect((this.nowPosition[1] - 2) * this.gridWidth + this.gridOffset, (this.nowPosition[0]) * this.gridWidth + this.gridOffset, this.gridWidth, this.gridWidth);
    ctx.fillRect((this.nowPosition[1] - 1) * this.gridWidth + this.gridOffset, (this.nowPosition[0] - 1) * this.gridWidth + this.gridOffset, this.gridWidth, this.gridWidth);
    ctx.fillRect((this.nowPosition[1]) * this.gridWidth + this.gridOffset, (this.nowPosition[0] - 2) * this.gridWidth + this.gridOffset, this.gridWidth, this.gridWidth);
    ctx.fillRect((this.nowPosition[1] + 1) * this.gridWidth + this.gridOffset, (this.nowPosition[0] - 1) * this.gridWidth + this.gridOffset, this.gridWidth, this.gridWidth);
  }


}