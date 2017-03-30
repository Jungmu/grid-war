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
  gridInfo: GridInfo = new GridInfo;
  private event: MouseEvent;
  private clientX: number = 0;
  private clientY: number = 0;

  private onEvent(event: MouseEvent): void {
    this.event = event;
  }

  private coordinates(event: MouseEvent): void {
    this.clientX = event.clientX;
    this.clientY = event.clientY;
  }

  private touchScreen(): void {
    this.attackEnemy();
    this.movePosition();
  }

  getPosition(): [number, number] {
    this.gridInfo = this.gridComponent.calcGridSize();
    let position: [number, number] = [this.event.offsetX, this.event.offsetY];
    return position;
  }
  movePosition(): void {
    if (AppComponent.playerState != playerState.move) return;
    let clickPositionOnGrid: [number, number] = this.clickPositionToGridPosition(this.getPosition());
    let beforePosition: [number, number] = AppComponent.player.getPosition();
    if (this.gridComponent.isInGridByGridPosition(clickPositionOnGrid) && this.isPlayerCanMove(clickPositionOnGrid, beforePosition)) {
      AppComponent.player.setPosition(clickPositionOnGrid);
      AppComponent.playerState = playerState.attack;
    }
  }

  attackEnemy(): void {
    if (AppComponent.playerState != playerState.attack) return;
    let clickPositionOnGrid: [number, number] = this.clickPositionToGridPosition(this.getPosition());
    let enemyPosition: [number, number] = AppComponent.enemy.getPosition();
    let attackarr: Array<[number, number]> = new Array<[number, number]>();

    attackarr = this.attackrangeComponent.getWeaponRange(AppComponent.player.getWeapon());

    attackarr.forEach(element => {
      if (this.isClickOnAttacRange(clickPositionOnGrid, element)) {
        if (enemyPosition[0] == clickPositionOnGrid[0] && enemyPosition[1] == clickPositionOnGrid[1]) {
          AppComponent.enemy.decrimentHP(1);
        }
        AppComponent.playerState = playerState.wait;
      }
    });
  }

  private isPlayerCanMove(clickPositionOnGrid, nowPosition): boolean {
    if (Math.abs(clickPositionOnGrid[0] - nowPosition[0]) + Math.abs(clickPositionOnGrid[1] - nowPosition[1]) > 1) {
      return false
    } else {
      return true;
    }
  }

  private clickPositionToGridPosition(position: [number, number]): [number, number] {
    this.gridInfo = this.gridComponent.calcGridSize();
    let gridPosition: [number, number];
    gridPosition = [Math.floor((position[0] - this.gridInfo.gridOffset) / this.gridInfo.gridWidth + 1)
      , Math.floor((position[1] - this.gridInfo.gridOffset) / this.gridInfo.gridWidth + 1)];
    return gridPosition;
  }

  private isClickOnAttacRange(clickPosition: [number, number], attackrange: [number, number]): boolean {
    if ((clickPosition[0] == Math.floor(attackrange[0] / this.gridInfo.gridWidth + 1))
      && (clickPosition[1] == Math.floor(attackrange[1] / this.gridInfo.gridWidth + 1))) {
      return true;
    } else {
      return false;
    }
  }
}
