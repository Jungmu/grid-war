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
        player.getSkill().attackRange.forEach(element => {
            let pPosition = [(nowPosition[0] + element[0]), (nowPosition[1] + element[1])];
            this.drawRange(pPosition, "rgba(255, 0, 0, 0.25)", context);
        });
    }

    drawMoveRange(context): void {
        let nowPosition: [number, number] = [BaseComponent.player.getPosition()[0] - 1, BaseComponent.player.getPosition()[1] - 1];
        for (let i = -1; i <= 1; ++i) {
            for (let j = -1; j <= 1; ++j) {
                if ((-i != j && i != j) || (i == 0 && j == 0)) {
                    let pPosition = [nowPosition[0] + i, nowPosition[1] + j];
                    this.drawRange(pPosition, "rgba(255, 255, 255, 0.5)", context);
                }
            }
        }
    }

    drawRange(nowPosition, fillStyle, context): void {
        let gridInfo = this.gridComponent.calcGridSize();
        let fillStartPoint: [number, number];

        fillStartPoint = [(nowPosition[0]) * gridInfo.gridWidth + gridInfo.gridOffset, (nowPosition[1]) * gridInfo.gridWidth + gridInfo.gridOffset];
        if (this.gridComponent.isInGrid(fillStartPoint)) {
            context.fillStyle = fillStyle;
            context.fillRect(fillStartPoint[0], fillStartPoint[1], gridInfo.gridWidth, gridInfo.gridWidth);
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
        // let skillName = character.getSkill().name + imgType
        let skillName = "none"
        let img: HTMLImageElement = <HTMLImageElement>document.getElementById(skillName);
        let gridInfo: GridInfo = this.gridComponent.calcGridSize();

        this.drawImgOnGrid(img, character.getPosition(), gridInfo, context, 1);
        this.drawImgOnGrid(img, character.getAfterPosition(), gridInfo, context, 0.5);

    }

    private drawImgOnGrid(img, position: [number, number], gridInfo: GridInfo, context, alpha: number): void {
        let keepingAplha = context.globalAlpha;
        let x: number = (position[0] - 1) * gridInfo.gridWidth;
        let y: number = (position[1] - 1) * gridInfo.gridWidth;
        context.globalAlpha = alpha;
        context.drawImage(img, x + gridInfo.gridOffset, y + gridInfo.gridOffset, gridInfo.gridWidth, gridInfo.gridWidth);
        context.globalAlpha = keepingAplha;
    }

    drawLiveMove(player): void {
        if (player.getPosition()[0] == player.getAfterPosition()[0] && player.getPosition()[1] == player.getAfterPosition()[1]) {
            this.endDrawLiveMove(player);
        } else if (this.moveVector[0] == 0 && this.moveVector[1] == 0) {
            this.moveVector = [(player.getAfterPosition()[0] - player.getPosition()[0]) / this.moveSplitNum, (player.getAfterPosition()[1] - player.getPosition()[1]) / this.moveSplitNum];
            player.setPosition([this.moveVector[0] + player.getPosition()[0], this.moveVector[1] + player.getPosition()[1]]);
            this.drawCount++;
        } else {
            if (this.drawCount > this.moveSplitNum) {
                this.endDrawLiveMove(player);
            }
            player.setPosition([this.moveVector[0] + player.getPosition()[0], this.moveVector[1] + player.getPosition()[1]]);
            this.drawCount++;
        }
    }

    private endDrawLiveMove(player): void {
        this.drawCount = 0;
        if (BaseComponent.drawState == LiveDrawState.movePlayer) {
            BaseComponent.drawState = LiveDrawState.moveEnemy;
        } else if (BaseComponent.drawState == LiveDrawState.moveEnemy) {
            BaseComponent.drawState = LiveDrawState.attackPlayer;
        }
        this.moveVector = [0, 0];
        player.setPosition(player.getAfterPosition());
    }

    drawLiveAttack(player, context): void {
        let attackPosition: [number, number] = [player.getAttackPosition()[0] - 1, player.getAttackPosition()[1] - 1];
        let gridInfo = this.gridComponent.calcGridSize();
        let fillStartPoint: [number, number];

        fillStartPoint = [attackPosition[0] * gridInfo.gridWidth + gridInfo.gridOffset,
        attackPosition[1] * gridInfo.gridWidth + gridInfo.gridOffset];
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        if (this.gridComponent.isInGrid(fillStartPoint)) {
            context.fillRect(fillStartPoint[0], fillStartPoint[1], gridInfo.gridWidth, gridInfo.gridWidth);
        }
        this.drawEffect(player, attackPosition, gridInfo, context);
    }

    private drawEffect(player, attackPosition: [number, number], gridInfo: GridInfo, context): void {
        let img: HTMLImageElement = <HTMLImageElement>document.getElementById('effect');

        if (this.attackVector[0] == 0 && this.attackVector[1] == 0) {

            // 힐스킬 쓰면 진행안되는거 임시방편
            if (player.getAttackPosition()[1] - player.getAfterPosition()[1] == 0) {
                this.endDrawEffect();
            }

            this.attackVector = [(player.getAttackPosition()[0] - player.getAfterPosition()[0]) / this.attackSplitNum, (player.getAttackPosition()[1] - player.getAfterPosition()[1]) / this.attackSplitNum];
            this.effectPosition = [player.getAfterPosition()[0] + this.attackVector[0] - 1, player.getAfterPosition()[1] + this.attackVector[1] - 1];
            context.drawImage(img, (this.effectPosition[0] * gridInfo.gridWidth) + gridInfo.gridOffset, (this.effectPosition[1] * gridInfo.gridWidth) + gridInfo.gridOffset, gridInfo.gridWidth, gridInfo.gridWidth);
            this.drawCount++;
        } else {
            this.effectPosition = [this.effectPosition[0] + this.attackVector[0], this.effectPosition[1] + this.attackVector[1]];
            context.drawImage(img, (this.effectPosition[0] * gridInfo.gridWidth) + gridInfo.gridOffset, (this.effectPosition[1] * gridInfo.gridWidth) + gridInfo.gridOffset, gridInfo.gridWidth, gridInfo.gridWidth);
            if (this.drawCount > this.attackSplitNum) {
                this.endDrawEffect();
            }
            this.drawCount++;
        }
    }

    private endDrawEffect(): void {
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
}
