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
  isInGridByGridPosition(gridPosition): boolean{
      this.gridInfo = this.calcGridSize();
     if (gridPosition[0] < 1 || gridPosition[1] < 1 
     || gridPosition[0] > this.gridInfo.gridLineCount      
     || gridPosition[1] > this.gridInfo.gridLineCount) {
     return false;
    }
    else {
      return true;
    }
  } 

}