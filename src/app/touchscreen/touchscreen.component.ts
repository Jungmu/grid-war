import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AttackrangeComponent } from '../attackrange/attackrange.component';
import { playerState, gameState } from '../const';
import { GridInfo } from '../grid/grid.info';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'app-touchscreen',
  templateUrl: './touchscreen.component.html',
  styleUrls: ['./touchscreen.component.css']
})
export class TouchscreenComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  attackrangeComponent: AttackrangeComponent = new AttackrangeComponent;
  gridComponent: GridComponent = new GridComponent;
  gridInfo;
  private event: MouseEvent;
  private clientX = 0;
  private clientY = 0;

  private onEvent(event: MouseEvent): void {
    this.event = event;
  }

  private coordinates(event: MouseEvent): void {
    this.clientX = event.clientX;
    this.clientY = event.clientY;
  }

  getPosition() {
    this.gridInfo = this.gridComponent.calcGridSize();
    let afterPosition: [number, number] = [parseInt(((this.event.offsetY - this.gridInfo.gridOffset) / this.gridInfo.gridWidth + 1).toString()), parseInt(((this.event.offsetX -this.gridInfo.gridOffset) /this.gridInfo.gridWidth + 1).toString())];
    return afterPosition;
  }

  movePosition() {
    if (AppComponent.playerState != playerState.move) return;
    let clickPosition = this.getPosition();
    let beforePosition = AppComponent.player.getPosition();
    if (clickPosition[0] < 1 || clickPosition[0] > this.gridInfo.gridLineCount || clickPosition[1] < 1 || clickPosition[1] > this.gridInfo.gridLineCount) {
      console.log("화면밖");
    } else if (Math.abs(clickPosition[0] - beforePosition[0]) + Math.abs(clickPosition[1] - beforePosition[1]) > 1) {
      console.log("플레이어주변아님");
      console.log("clickPosition[0]:" + clickPosition[0] + "beforePosition[0]:" + beforePosition[0]);
      console.log("clickPosition[0]:" + clickPosition[1] + "beforePosition[0]:" + beforePosition[1]);
    } else {
      AppComponent.player.setPosition(clickPosition);
      AppComponent.playerState = playerState.attack;
    }
  }

  attackEnemy() {
    if (AppComponent.playerState != playerState.attack) return;
    let clickPosition = this.getPosition();
    let enemyPosition = AppComponent.enemy.getPosition();

    let attackarr = new Array<[number, number]>();

    attackarr = this.attackrangeComponent.getWeaponRange(AppComponent.player.getWeapon());

    attackarr.forEach(element => {
      if ((clickPosition[0] == parseInt((element[1] / this.gridInfo.gridWidth + 1).toString())) && (clickPosition[1] == parseInt((element[0] / this.gridInfo.gridWidth + 1).toString()))) {
        if (enemyPosition[0] == clickPosition[0] && enemyPosition[1] == clickPosition[1]) {
          AppComponent.enemy.decrimentHP(1);
        }
        AppComponent.playerState = playerState.wait;
      }
    });
  }
}
