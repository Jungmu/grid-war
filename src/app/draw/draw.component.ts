import { Component, OnInit } from '@angular/core';
import { Character } from '../class/character';
import { BaseComponent } from '../base/base.component';
import { GridInfo } from '../grid/grid.info';
import { GridComponent } from '../grid/grid.component';

import { GameState, LiveDrawState } from '../const';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {

  gridComponent: GridComponent = new GridComponent;

  private moveSplitNum: number = 40;
  private attackSplitNum: number = 20;
  private drawCount: number = 0;
  private moveVector: [number, number] = [0, 0];
  private attackVector: [number, number] = [0, 0];
  private effectPosition: [number, number] = [0, 0];

  constructor() { }

  ngOnInit() { }

  drawAttackRange(player, context): void {
    let nowPosition: [number, number] = [player.getAfterPosition()[0] - 1, player.getAfterPosition()[1] - 1];
    let gridInfo = this.gridComponent.calcGridSize();
    let fillStartPoint: [number, number];

    player.getWeapon().range.forEach(element => {
      fillStartPoint = [(nowPosition[0] + element[0]) * gridInfo.gridWidth + gridInfo.gridOffset,
      (nowPosition[1] + element[1]) * gridInfo.gridWidth + gridInfo.gridOffset];
      context.fillStyle = "rgba(255, 0, 0, 0.25)";
      if (this.gridComponent.isInGrid(fillStartPoint)) {
        context.fillRect(fillStartPoint[0], fillStartPoint[1], gridInfo.gridWidth, gridInfo.gridWidth);
      }
    });
  }

  drawMoveRange(context): void {
    let nowPosition: [number, number] = [BaseComponent.player.getPosition()[0] - 1, BaseComponent.player.getPosition()[1] - 1];
    let gridInfo = this.gridComponent.calcGridSize();
    let fillStartPoint: [number, number];

    for (let i = -1; i <= 1; ++i) {
      for (let j = -1; j <= 1; ++j) {
        if ((-i != j && i != j) || (i == 0 && j == 0)) {
          fillStartPoint = [(nowPosition[0] + i) * gridInfo.gridWidth + gridInfo.gridOffset, (nowPosition[1] + j) * gridInfo.gridWidth + gridInfo.gridOffset];
          context.fillStyle = "rgba(255, 255, 255, 0.5)";
          if (this.gridComponent.isInGrid(fillStartPoint)) {
            context.fillRect(fillStartPoint[0], fillStartPoint[1], gridInfo.gridWidth, gridInfo.gridWidth);
          }
        }
      }
    }
  }

  drawMap(context): void {
    let ctx = context;
    let gridInfo = this.gridComponent.calcGridSize();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";

    ctx.beginPath();
    ctx.moveTo(gridInfo.gridOffset, gridInfo.gridOffset);
    ctx.lineTo(gridInfo.gridOffset, gridInfo.canvasWidth - gridInfo.gridOffset);
    ctx.lineTo(gridInfo.canvasWidth - gridInfo.gridOffset, gridInfo.canvasWidth - gridInfo.gridOffset);
    ctx.lineTo(gridInfo.canvasWidth - gridInfo.gridOffset, gridInfo.gridOffset);
    ctx.closePath();
    ctx.stroke();

    for (let i: number = 1; i < gridInfo.gridLineCount; ++i) {
      ctx.beginPath();
      ctx.moveTo(gridInfo.gridOffset, gridInfo.gridWidth * i + gridInfo.gridOffset);
      ctx.lineTo(gridInfo.canvasWidth - gridInfo.gridOffset, gridInfo.gridWidth * i + gridInfo.gridOffset);
      ctx.closePath();
      ctx.stroke();
    }
    for (let i: number = 1; i < gridInfo.gridLineCount; ++i) {
      ctx.beginPath();
      ctx.moveTo(gridInfo.gridWidth * i + gridInfo.gridOffset, gridInfo.gridOffset);
      ctx.lineTo(gridInfo.gridWidth * i + gridInfo.gridOffset, gridInfo.canvasWidth - gridInfo.gridOffset);
      ctx.closePath();
      ctx.stroke();
    }
  }

  drawCharacter(character, context, imgType: string): void {
    let weaponName = character.getWeapon().name + imgType
    let img: HTMLImageElement = <HTMLImageElement>document.getElementById(weaponName);
    let ctx = context;
    let gridInfo: GridInfo = this.gridComponent.calcGridSize();

    let x: number = (character.getPosition()[0] - 1) * gridInfo.gridWidth;
    let y: number = (character.getPosition()[1] - 1) * gridInfo.gridWidth;
    ctx.drawImage(img, x + gridInfo.gridOffset, y + gridInfo.gridOffset, gridInfo.gridWidth, gridInfo.gridWidth);

    ctx.globalAlpha = 0.5;

    let afterX: number = (character.getAfterPosition()[0] - 1) * gridInfo.gridWidth;
    let afterY: number = (character.getAfterPosition()[1] - 1) * gridInfo.gridWidth;
    ctx.drawImage(img, afterX + gridInfo.gridOffset, afterY + gridInfo.gridOffset, gridInfo.gridWidth, gridInfo.gridWidth);

    ctx.globalAlpha = 1;
  }

  drawLiveMove(player) {
    if (player.getPosition()[0] == player.getAfterPosition()[0] && player.getPosition()[1] == player.getAfterPosition()[1]) {
      this.endDrawLiveMove();      
    } else if (this.moveVector[0] == 0 && this.moveVector[1] == 0) {
      this.moveVector = [(player.getAfterPosition()[0] - player.getPosition()[0]) / this.moveSplitNum, (player.getAfterPosition()[1] - player.getPosition()[1]) / this.moveSplitNum];
      player.setPosition([this.moveVector[0] + player.getPosition()[0], this.moveVector[1] + player.getPosition()[1]]);
      this.drawCount++;
    } else {
      if (this.drawCount > this.moveSplitNum) {        
        this.endDrawLiveMove();        
        player.setPosition(player.getAfterPosition());
      }
      player.setPosition([this.moveVector[0] + player.getPosition()[0], this.moveVector[1] + player.getPosition()[1]]);
      this.drawCount++;
    }
  }
  private endDrawLiveMove() {
    this.drawCount = 0;
    if (BaseComponent.drawState == LiveDrawState.movePlayer) {
      BaseComponent.drawState = LiveDrawState.moveEnemy;
    } else if (BaseComponent.drawState == LiveDrawState.moveEnemy) {
      BaseComponent.drawState = LiveDrawState.attackPlayer;
    }
    this.moveVector = [0, 0];
  }

  drawLiveAttack(player, context) {
    let attackPosition: [number, number] = [player.getAttackPosition()[0] - 1, player.getAttackPosition()[1] - 1];
    let gridInfo = this.gridComponent.calcGridSize();
    let fillStartPoint: [number, number];

    fillStartPoint = [attackPosition[0] * gridInfo.gridWidth + gridInfo.gridOffset,
    attackPosition[1] * gridInfo.gridWidth + gridInfo.gridOffset];
    context.fillStyle = "rgba(255, 0, 0, 0.5)";
    if (this.gridComponent.isInGrid(fillStartPoint)) {
      context.fillRect(fillStartPoint[0], fillStartPoint[1], gridInfo.gridWidth, gridInfo.gridWidth);
    }
    //여기다 때리는 모션을 넣는거지
    this.drawEffect(player, attackPosition, gridInfo, context);
  }

  private drawEffect(player, attackPosition, gridInfo, context) {
    let img: HTMLImageElement = <HTMLImageElement>document.getElementById('effect');

    if (this.attackVector[0] == 0 && this.attackVector[1] == 0) {
      this.attackVector = [(player.getAttackPosition()[0] - player.getAfterPosition()[0]) / this.attackSplitNum, (player.getAttackPosition()[1] - player.getAfterPosition()[1]) / this.attackSplitNum];
      this.effectPosition = [player.getAfterPosition()[0] + this.attackVector[0] - 1, player.getAfterPosition()[1] + this.attackVector[1] - 1];
      context.drawImage(img, (this.effectPosition[0] * gridInfo.gridWidth) + gridInfo.gridOffset, (this.effectPosition[1] * gridInfo.gridWidth) + gridInfo.gridOffset, gridInfo.gridWidth, gridInfo.gridWidth);
      this.drawCount++;
    } else {
      this.effectPosition = [this.effectPosition[0] + this.attackVector[0], this.effectPosition[1] + this.attackVector[1]];
      context.drawImage(img, (this.effectPosition[0] * gridInfo.gridWidth) + gridInfo.gridOffset, (this.effectPosition[1] * gridInfo.gridWidth) + gridInfo.gridOffset, gridInfo.gridWidth, gridInfo.gridWidth);
      if (this.drawCount > this.attackSplitNum) {
        this.drawCount = 0;
        if (BaseComponent.drawState == LiveDrawState.attackPlayer) {
          BaseComponent.drawState = LiveDrawState.attackEnemy;
        } else if (BaseComponent.drawState == LiveDrawState.attackEnemy) {
          BaseComponent.drawState = LiveDrawState.wait;
          BaseComponent.gameState = GameState.work;
        }
        this.attackVector = [0, 0];
        this.effectPosition = [0, 0];
      }
      this.drawCount++;
    }
  }
}
