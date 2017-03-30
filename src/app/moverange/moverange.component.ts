import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { GridInfo } from '../grid/grid.info';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'app-moverange',
  templateUrl: './moverange.component.html',
  styleUrls: ['./moverange.component.css']
})
export class MoverangeComponent implements OnInit {

  gridComponent:GridComponent = new GridComponent;
  constructor() { }

  ngOnInit() {  }

  drawMoveRage(context) {
    let nowPosition: [number, number] = [AppComponent.player.getPosition()[0] - 1, AppComponent.player.getPosition()[1] - 1];
    let gridInfo = this.gridComponent.calcGridSize();
    let fillStartPoint: [number, number];

    for(let i = -1 ; i <= 1 ; ++i){
      for(let j = -1 ; j <= 1 ;++j){
        if( (-i!=j && i!=j) || (i==0 && j==0) ){
          fillStartPoint = [(nowPosition[1] + i) * gridInfo.gridWidth + gridInfo.gridOffset, (nowPosition[0] + j) * gridInfo.gridWidth + gridInfo.gridOffset];
          context.fillStyle = "rgba(255, 255, 255, 0.5)";
          if (this.gridComponent.isInGrid(fillStartPoint)) {
            context.fillRect(fillStartPoint[0], fillStartPoint[1], gridInfo.gridWidth, gridInfo.gridWidth);
          }
        }           
      }
    }

  }
}
