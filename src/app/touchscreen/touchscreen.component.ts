import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { PlayerState, GameState } from '../const';
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
    if(BaseComponent.player.getStatus() == PlayerState.movePosition) {
      this.movePosition();
    }
    if(BaseComponent.player.getStatus() == PlayerState.attackEnemy) {
      this.attackEnemy();
    }
  }

  getPosition(): [number, number] {
    this.gridInfo = this.gridComponent.calcGridSize();
    let position: [number, number] = [this.event.offsetX, this.event.offsetY];
    return position;
  }

  movePosition(): void {
    let clickPositionOnGrid: [number, number] = this.clickPositionToGridPosition(this.getPosition());
    let beforePosition: [number, number] = BaseComponent.player.getPosition();
    if (this.gridComponent.isInGridByGridPosition(clickPositionOnGrid) && this.isPlayerCanMove(clickPositionOnGrid, beforePosition)) {
      BaseComponent.player.setAfterPosition(clickPositionOnGrid);
      BaseComponent.player.setStatus(PlayerState.attackEnemy);
    }
  }

  attackEnemy(): void {
    let clickPositionOnGrid: [number, number] = this.clickPositionToGridPosition(this.getPosition());
    let nowPlayerPosition: [number, number] = BaseComponent.player.getAfterPosition();
    // let enemyPosition: [number, number] = BaseComponent.enemy.getPosition();
    let characterWeapon = BaseComponent.player.getWeapon();

    characterWeapon.range.forEach(element => {
      let myAttackRange: [number, number] = [ nowPlayerPosition[0]+element[0], nowPlayerPosition[1]+element[1] ];
      if (this.isClickOnAttacRange(clickPositionOnGrid, myAttackRange)) {
        BaseComponent.player.setAttackPosition(clickPositionOnGrid);
        BaseComponent.player.setStatus(PlayerState.chooseWeapon);
        BaseComponent.gameState = GameState.wait;
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
    if (clickPosition[0] == attackrange[0] && clickPosition[1] == attackrange[1]) {
      return true;
    } else {
      return false;
    }
  }
}
