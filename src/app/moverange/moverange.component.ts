import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-moverange',
  templateUrl: './moverange.component.html',
  styleUrls: ['./moverange.component.css']
})
export class MoverangeComponent implements OnInit {


  constructor() { }

  ngOnInit() {  }

  drawMoveRage(context) {
    let nowPosition: [number, number] = [AppComponent.player.getPosition()[0] - 1, AppComponent.player.getPosition()[1] - 1];
    let offset: number = 0.1;
    let canvasWidth: number = document.getElementById("map").offsetWidth;
    let gridOffset: number = canvasWidth * offset;;
    let gridFullWidth: number = canvasWidth * (1 - offset * 2);;
    let gridWidth: number = gridFullWidth / AppComponent.gridLineCount;
    let fillStartPoint: [number, number];

    for(let i = -1 ; i <= 1 ; ++i){
      for(let j = -1 ; j <= 1 ;++j){
        if( (-i!=j && i!=j) || (i==0 && j==0) ){
          fillStartPoint = [(nowPosition[1] + i) * gridWidth + gridOffset, (nowPosition[0] + j) * gridWidth + gridOffset];
          context.fillStyle = "rgba(255, 255, 255, 0.5)";
          if (fillStartPoint[0] < gridOffset || fillStartPoint[1] < gridOffset || fillStartPoint[0] > gridFullWidth || fillStartPoint[1] > gridFullWidth) {
            // do nothing
          } else {
            context.fillRect(fillStartPoint[0], fillStartPoint[1], gridWidth, gridWidth);
          }
        }           
      }
    }

  }
}
