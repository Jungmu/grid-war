import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-attackrange',
  templateUrl: './attackrange.component.html',
  styleUrls: ['./attackrange.component.css']
})
export class AttackrangeComponent implements OnInit {

  fillColor = "rgba(255, 100, 100, 0.5)";
  nowPosition: [number, number];
  offset: number = 0.1;
  line: number;
  canvasWidth: number;
  gridOffset: number;
  gridFullWidth: number;
  gridWidth: number;

  constructor() { }
  ngOnInit() { }

  drawRange(context, line: number, weapon: string) {
    this.line = line;
    this.canvasWidth = document.getElementById("map").offsetWidth;
    this.gridOffset = this.canvasWidth * this.offset;
    this.gridFullWidth = this.canvasWidth * (1 - this.offset * 2);
    this.gridWidth = this.gridFullWidth / this.line;
    this.nowPosition = [AppComponent.player.getPosition()[0] - 1, AppComponent.player.getPosition()[1] - 1];

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
    let fillStartPoint: [number, number];
    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        if (j == -2 || j == 2 || i == -2 || i == 2) {
          fillStartPoint = [(this.nowPosition[1] + i) * this.gridWidth + this.gridOffset, (this.nowPosition[0] + j) * this.gridWidth + this.gridOffset];
          this.fillRectIfInGrid(context, fillStartPoint, this.gridWidth);
        }
      }
    }
  }

  drawSwordRage(context) {
    let fillStartPoint: [number, number];

    for(let i = -1 ; i <= 1 ; ++i){
      for(let j = -1 ; j <= 1 ;++j){
        if( -i != j && i != j ){
          fillStartPoint = [(this.nowPosition[1] + i) * this.gridWidth + this.gridOffset, (this.nowPosition[0] + j) * this.gridWidth + this.gridOffset];
          this.fillRectIfInGrid(context, fillStartPoint, this.gridWidth);    
        }           
      }
    }
  }

  drawSpearRage(context) {
    let fillStartPoint: [number, number];
    for (let i = -2; i <= 2; ++i) {
      for (let j = -2; j <= 2; ++j) {
        if (Math.abs(i - j) == 2 || (Math.abs(i) == 1 && Math.abs(j) == 1)) {
          fillStartPoint = [(this.nowPosition[1] + i) * this.gridWidth + this.gridOffset, (this.nowPosition[0] + j) * this.gridWidth + this.gridOffset];
          this.fillRectIfInGrid(context, fillStartPoint, this.gridWidth);
        }
      }
    }    
  }

  fillRectIfInGrid(context, fillStartPoint: [number, number], gridWidth: number) {
    let ctx = context;
    ctx.fillStyle = this.fillColor;
    if (fillStartPoint[0] < this.gridOffset || fillStartPoint[1] < this.gridOffset || fillStartPoint[0] > this.gridFullWidth || fillStartPoint[1] > this.gridFullWidth) {
      // do nothing
    } else {
      ctx.fillRect(fillStartPoint[0], fillStartPoint[1], this.gridWidth, this.gridWidth);
    }
  }

}