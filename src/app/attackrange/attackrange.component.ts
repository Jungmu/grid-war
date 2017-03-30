import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { GridInfo } from '../grid/grid.info';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'app-attackrange',
  templateUrl: './attackrange.component.html',
  styleUrls: ['./attackrange.component.css']
})
export class AttackrangeComponent implements OnInit {

  fillColor: string = "rgba(255, 100, 100, 0.5)";
  nowPosition: [number, number];
  gridComponent: GridComponent = new GridComponent;
  gridInfo: GridInfo = new GridInfo;

  constructor() { }
  ngOnInit() { }

  drawRange(context, weapon: string): void {
    this.init();

    switch (weapon) {
      case "sword":
        this.fillRectIfInGrid(context, this.getSwordRage(), this.gridInfo.gridWidth);
        break;
      case "spear":
        this.fillRectIfInGrid(context, this.getSpearRage(), this.gridInfo.gridWidth);
        break;
      case "arrow":
        this.fillRectIfInGrid(context, this.getArrowRage(), this.gridInfo.gridWidth);
        break;
      case "none":
        let rangeArr: Array<[number, number]>;
        rangeArr.push([0, 0]);
        this.fillRectIfInGrid(context, rangeArr, this.gridInfo.gridWidth);
        break;

    }
  }

  getWeaponRange(weapon: string): Array<[number, number]> {
    this.init();
    switch (weapon) {
      case "sword":
        return this.getSwordRage();
      case "spear":
        return this.getSpearRage();
      case "arrow":
        return this.getArrowRage();
      case "none":
        let rangeArr: Array<[number, number]>;
        rangeArr.push([0, 0]);
        return rangeArr;
    }
  }

  private init(): void {
    this.nowPosition = [AppComponent.player.getPosition()[0] - 1, AppComponent.player.getPosition()[1] - 1];
    this.gridInfo = this.gridComponent.calcGridSize();
  }

  private getArrowRage(): Array<[number, number]> {
    let rangeArr = new Array<[number, number]>();
    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        if (j == -2 || j == 2 || i == -2 || i == 2) {
          rangeArr.push([(this.nowPosition[0] + i) * this.gridInfo.gridWidth + this.gridInfo.gridOffset, (this.nowPosition[1] + j) * this.gridInfo.gridWidth + this.gridInfo.gridOffset]);
        }
      }
    }
    return rangeArr;
  }

  private getSwordRage(): Array<[number, number]> {
    let rangeArr = new Array<[number, number]>();
    for (let i = -1; i <= 1; ++i) {
      for (let j = -1; j <= 1; ++j) {
        if (-i != j && i != j) {
          rangeArr.push([(this.nowPosition[0] + i) * this.gridInfo.gridWidth + this.gridInfo.gridOffset, (this.nowPosition[1] + j) * this.gridInfo.gridWidth + this.gridInfo.gridOffset]);
        }
      }
    }
    return rangeArr;
  }

  private getSpearRage(): Array<[number, number]> {
    let rangeArr = new Array<[number, number]>();
    for (let i = -2; i <= 2; ++i) {
      for (let j = -2; j <= 2; ++j) {
        if (Math.abs(i - j) == 2 || (Math.abs(i) == 1 && Math.abs(j) == 1)) {
          rangeArr.push([(this.nowPosition[0] + i) * this.gridInfo.gridWidth + this.gridInfo.gridOffset, (this.nowPosition[1] + j) * this.gridInfo.gridWidth + this.gridInfo.gridOffset]);
        }
      }
    }
    return rangeArr;
  }
  private fillRectIfInGrid(context, rangeArr, gridWidth: number): void {
    let ctx = context;
    ctx.fillStyle = this.fillColor;
    for (let i = 0; i < rangeArr.length; i++) {
      let fillStartPoint = rangeArr[i];
      if (this.gridComponent.isInGrid(fillStartPoint)) {
        ctx.fillRect(fillStartPoint[0], fillStartPoint[1], this.gridInfo.gridWidth, this.gridInfo.gridWidth);
      }
    }
  }

}