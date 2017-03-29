import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-touchscreen',
  templateUrl: './touchscreen.component.html',
  styleUrls: ['./touchscreen.component.css']
})
export class TouchscreenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  private event: MouseEvent;
  private clientX = 0;
  private clientY = 0;

  private onEvent(event: MouseEvent): void {
      this.event = event;
  }

  private coordinates(event: MouseEvent):void {
      this.clientX = event.clientX;
      this.clientY = event.clientY;
  }

  getPosition() {
    let offset:number = 0.1;
    let canvasWidth = document.getElementById("map").offsetWidth;
    let gridOffset:number = canvasWidth*offset;
    let gridFullWidth:number = canvasWidth*(1-offset*2);
    let gridWidth:number = gridFullWidth / AppComponent.gridLineCount;

    // AppComponent.showGrid = false;
    
    let afterPosition:[number,number] = [parseInt(((this.event.offsetY-gridOffset)/gridWidth+1).toString()), parseInt(((this.event.offsetX-gridOffset)/gridWidth+1).toString())];    
    return afterPosition;
  }

  movePosition() {
    if(!AppComponent.showMoveRange) return;
    let nowPosition = this.getPosition();
    let beforePosition = AppComponent.player.getPosition();
    if (nowPosition[0] < 1 || nowPosition[0] > AppComponent.gridLineCount || nowPosition[1] < 1 || nowPosition[1] > AppComponent.gridLineCount) {
      console.log("화면밖");
    } else if(Math.abs(nowPosition[0]-beforePosition[0]) + Math.abs(nowPosition[1]-beforePosition[1]) > 1) {
      console.log("플레이어주변아님");
    } else {
      AppComponent.player.setPosition(nowPosition);
      AppComponent.showMoveRange = false;
      AppComponent.showAttackRange = true;
    }
  }

  attackEnemy() {
    if(!AppComponent.showAttackRange) return;
    let nowPosition = this.getPosition();
    let enemyPosition = AppComponent.enemy.getPosition();

    
  }
}
