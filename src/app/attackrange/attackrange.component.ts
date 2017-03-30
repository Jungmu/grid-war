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
  
  private init() {
    this.nowPosition = [AppComponent.player.getPosition()[0] - 1, AppComponent.player.getPosition()[1] - 1];
    this.canvasWidth = document.getElementById("map").offsetWidth;
    this.gridOffset = this.canvasWidth * this.offset;
    this.gridFullWidth = this.canvasWidth * (1 - this.offset * 2);
    this.gridWidth = this.gridFullWidth / AppComponent.gridLineCount;
  }

  drawRange(context, line: number, weapon: string) {
    this.init();

    switch (weapon) {
      case "sword":
        this.fillRectIfInGrid(context, this.getSwordRage(), this.gridWidth);
        break;
      case "spear":
        this.fillRectIfInGrid(context, this.getSpearRage(), this.gridWidth);
        break;
      case "arrow":
        this.fillRectIfInGrid(context, this.getArrowRage(), this.gridWidth);
        break;
    }
  }

  getWeaponRange(weapon:string) : Array<[number,number]> {
    this.init();
    switch (weapon) {
      case "sword":
        return this.getSwordRage();
      case "spear":
        return this.getSpearRage();
      case "arrow":
        return this.getArrowRage();
    }
  }
  
  private getArrowRage() {    
    let rangeArr = new Array<[number,number]>();
    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        if (j == -2 || j == 2 || i == -2 || i == 2) {
          rangeArr.push([(this.nowPosition[1] + i) * this.gridWidth + this.gridOffset, (this.nowPosition[0] + j) * this.gridWidth + this.gridOffset]);
        }
      }
    }
    return rangeArr;
  }

  private getSwordRage() : Array<[number,number]> {
    let rangeArr = new Array<[number,number]>();
    for(let i = -1 ; i <= 1 ; ++i){
      for(let j = -1 ; j <= 1 ;++j){
        if( -i != j && i != j ){
          rangeArr.push([(this.nowPosition[1] + i) * this.gridWidth + this.gridOffset, (this.nowPosition[0] + j) * this.gridWidth + this.gridOffset]);    
        }           
      }
    }
    return rangeArr;
  }

  private getSpearRage() {
    let rangeArr = new Array<[number,number]>();
    for (let i = -2; i <= 2; ++i) {
      for (let j = -2; j <= 2; ++j) {
        if (Math.abs(i - j) == 2 || (Math.abs(i) == 1 && Math.abs(j) == 1)) {
          rangeArr.push([(this.nowPosition[1] + i) * this.gridWidth + this.gridOffset, (this.nowPosition[0] + j) * this.gridWidth + this.gridOffset]);
        }
      }
    }
    return rangeArr;
  }

  private fillRectIfInGrid(context, rangeArr, gridWidth: number) {
    let ctx = context;
    ctx.fillStyle = this.fillColor;
    for(let i=0; i<rangeArr.length; i++) {
      let fillStartPoint = rangeArr[i];
      if (fillStartPoint[0] < this.gridOffset || fillStartPoint[1] < this.gridOffset || fillStartPoint[0] > this.gridFullWidth || fillStartPoint[1] > this.gridFullWidth) {
        // do nothing
      } else {
        ctx.fillRect(fillStartPoint[0], fillStartPoint[1], this.gridWidth, this.gridWidth);
      }
    }
  }

}