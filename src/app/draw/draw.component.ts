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
    private attackEffectNum: number = 30;
    private effectCount: number = 0;
    private drawCount: number = 0;
    private moveVector: [number, number] = [0, 0];
    private attackVector: [number, number] = [0, 0];
    private effectPosition: [number, number] = [0, 0];

    private meteoEffectArray: [[number, number]] = [
        [1.5, 0.5],[1.48, 0.52],[1.46, 0.54],[1.44, 0.56],[1.42, 0.58],
        [1.4, 0.6],[1.38, 0.62],[1.36, 0.64],[1.34, 0.66],[1.32, 0.68],
        [1.3, 0.7],[1.28, 0.72],[1.26, 0.74],[1.24, 0.76],[1.22, 0.78],
        [1.2, 0.8],[1.18, 0.82],[1.16, 0.84],[1.14, 0.86],[1.12, 0.88],
        [1.1, 0.9],[1.08, 0.92],[1.06, 0.94],[1.04, 0.96],[1.02, 0.98],
        [1.0, 1.0],[1.0, 1.0],[1.0, 1.0],[1.0, 1.0],[1.0, 1.0],
        [1.0, 1.0],[1.0, 1.0],[1.0, 1.0],[1.0, 1.0],[1.0, 1.0],
        [1.0, 1.0],[1.0, 1.0],[1.0, 1.0],[1.0, 1.0],[1.0, 1.0],
        [1.0, 1.0],[1.0, 1.0],[1.0, 1.0],[1.0, 1.0],[1.0, 1.0],
    ];

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

    drawCharacter(character, context): void {
        let skillName = character.getSkill().attribute;

        let img: HTMLImageElement = <HTMLImageElement>document.getElementById(skillName);
        let gridInfo: GridInfo = this.gridComponent.calcGridSize();

        this.drawImgOnGrid(img, character.getPosition(), gridInfo, context, 1);
        this.drawImgOnGrid(img, character.getAfterPosition(), gridInfo, context, 0.5);
        this.drawName(character.getName(), character.getPosition(), gridInfo, context);
    }

    private drawImgOnGrid(img, position: [number, number], gridInfo: GridInfo, context, alpha: number): void {
        let keepingAplha = context.globalAlpha;
        let x: number = (position[0] - 1) * gridInfo.gridWidth;
        let y: number = (position[1] - 1) * gridInfo.gridWidth;
        context.globalAlpha = alpha;
        context.drawImage(img, x + gridInfo.gridOffset, y + gridInfo.gridOffset, gridInfo.gridWidth, gridInfo.gridWidth);
        context.globalAlpha = keepingAplha;
    }

    private drawName(name, position: [number, number], gridInfo: GridInfo, context) {
        let x: number = (position[0] - 1) * gridInfo.gridWidth;
        let y: number = (position[1]) * gridInfo.gridWidth;
        context.shadowColor = "white";
        context.shadowBlur = 4;
        context.font = "15px Georgia";
        context.fillText(name, x + gridInfo.gridOffset, y + gridInfo.gridOffset);
        context.shadowBlur = 0;

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
        let gridInfo = this.gridComponent.calcGridSize();
        let fillStartPoint: [number, number];
        let attackRange = player.getAttackRange();
        console.log(attackRange);

        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        attackRange.forEach(element => {
            fillStartPoint = [(element[0] - 1) * gridInfo.gridWidth + gridInfo.gridOffset, (element[1] - 1) * gridInfo.gridWidth + gridInfo.gridOffset];
            if (this.gridComponent.isInGrid(fillStartPoint)) {
                context.fillRect(fillStartPoint[0], fillStartPoint[1], gridInfo.gridWidth, gridInfo.gridWidth);
            }
            this.drawEffect(player, fillStartPoint, gridInfo, context);
        });
        this.effectCount++;


    }

    private drawEffect(player, fillStartPoint, gridInfo: GridInfo, context): void {
        let skillName = player.getSkill().name;

        switch (skillName) {
            case "Meteo":
                this.meteoEffect(player, fillStartPoint, gridInfo, context);
                break;
            case "Water cannon":
            case "Poison seeds":
                this.randomPosAndSizeEffect(player, fillStartPoint, gridInfo, context);
                break;

            case "Fire wall":
            case "Tsunami":
            case "Heal":
                this.bounceEffect(player, fillStartPoint, gridInfo, context);
                break;

            default:
                break;
        }

    }

    private meteoEffect(player, fillStartPoint, gridInfo: GridInfo, context) {
        let img: HTMLImageElement = <HTMLImageElement>document.getElementById(player.getSkill().name);
        
        if (this.effectCount >= this.attackEffectNum) {
            this.endDrawEffect();
        }
        if (this.gridComponent.isInGrid(fillStartPoint)) {
            context.drawImage(
                img, fillStartPoint[0] + gridInfo.gridWidth * this.meteoEffectArray[this.effectCount % this.meteoEffectArray.length][0] - gridInfo.gridWidth
                , fillStartPoint[1] + gridInfo.gridWidth * this.meteoEffectArray[this.effectCount % this.meteoEffectArray.length][1] - gridInfo.gridWidth
                , gridInfo.gridWidth
                , gridInfo.gridWidth
            );
        }
        
    }

    private randomPosAndSizeEffect(player, fillStartPoint, gridInfo: GridInfo, context) {
        let img: HTMLImageElement = <HTMLImageElement>document.getElementById(player.getSkill().name);

        let randomFillstartPoint = [fillStartPoint[0] - gridInfo.gridWidth * Math.random() + gridInfo.gridWidth, fillStartPoint[1] - gridInfo.gridWidth * Math.random() + gridInfo.gridWidth]
        if (this.gridComponent.isInGrid(fillStartPoint)) {
            context.drawImage(img, randomFillstartPoint[0], randomFillstartPoint[1], gridInfo.gridWidth * Math.random(), gridInfo.gridWidth * Math.random());
        }
        if (this.effectCount > this.attackEffectNum) {
            this.endDrawEffect();
        }
    }

    private bounceEffect(player, fillStartPoint, gridInfo: GridInfo, context) {
        let img: HTMLImageElement = <HTMLImageElement>document.getElementById(player.getSkill().name);

        let rateOnTime = ((Date.now() % 5 - 2) / 10) + 1;
        let bounceFillStartPoint = [fillStartPoint[0], fillStartPoint[1] * rateOnTime];
        let bounceFillEndPoint = [fillStartPoint[0] + gridInfo.gridWidth, fillStartPoint[1] + gridInfo.gridWidth];
        if (this.gridComponent.isInGrid(fillStartPoint)) {
            context.drawImage(img, bounceFillStartPoint[0], bounceFillStartPoint[1], bounceFillEndPoint[0] - bounceFillStartPoint[0], bounceFillEndPoint[1] - bounceFillStartPoint[1]);
        }
        if (this.effectCount > this.attackEffectNum) {
            this.endDrawEffect();
        }
    }

    private endDrawEffect(): void {
        this.effectCount = 0;
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
