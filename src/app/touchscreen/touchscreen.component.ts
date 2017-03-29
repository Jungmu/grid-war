import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AttackrangeComponent } from '../attackrange/attackrange.component';

@Component({
  selector: 'app-touchscreen',
  templateUrl: './touchscreen.component.html',
  styleUrls: ['./touchscreen.component.css']
})
export class TouchscreenComponent implements OnInit {

  constructor() { }

  ngOnInit() {  }

  attackrangeComponent: AttackrangeComponent = new AttackrangeComponent;

  private event: MouseEvent;
  private clientX = 0;
  private clientY = 0;

  offset:number = 0.1;
  canvasWidth = document.getElementById("map").offsetWidth;
  gridOffset:number = this.canvasWidth*this.offset;
  gridFullWidth:number = this.canvasWidth*(1-this.offset*2);
  gridWidth:number = this.gridFullWidth / AppComponent.gridLineCount;

  private onEvent(event: MouseEvent): void {
      this.event = event;
  }

  private coordinates(event: MouseEvent):void {
      this.clientX = event.clientX;
      this.clientY = event.clientY;
  }

  getPosition() {

    // AppComponent.showGrid = false;
    
    let afterPosition:[number,number] = [parseInt(((this.event.offsetY-this.gridOffset)/this.gridWidth+1).toString()), parseInt(((this.event.offsetX-this.gridOffset)/this.gridWidth+1).toString())];    
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

    let attackarr = new Array<[number, number]>();

    attackarr = this.attackrangeComponent.getWeaponRange(AppComponent.player.getWeapon());
    
    attackarr.forEach(element => {
      if( ( nowPosition[0] == parseInt((element[1]/this.gridWidth+1).toString()) ) && ( nowPosition[1] == parseInt((element[0]/this.gridWidth+1).toString()) ) ) {
        if(enemyPosition[0]==nowPosition[0] && enemyPosition[1]==nowPosition[1]) {
          AppComponent.enemy.decrimentHP(1);
          AppComponent.showAttackRange = false;
          //턴넘김 설정
        } else {
          AppComponent.showMoveRange = false;
          AppComponent.showAttackRange = false;
        }
      }
    });
  }
}
