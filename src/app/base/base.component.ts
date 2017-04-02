import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ViewChild } from "@angular/core";
import { AfterViewInit } from "@angular/core";
import { GameState } from '../const';
import { Character } from '../class/character';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})

export class BaseComponent  implements AfterViewInit {
  @ViewChild("myCanvas") myCanvas;

  private context: CanvasRenderingContext2D;

  static gameState: number = GameState.playerTurn;
  static player;
  static enemy;

  constructor(private route: ActivatedRoute) {}


  ngAfterViewInit(): void {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");

    let mode: string;
    this.route.params.subscribe(params => {
       mode = params['mode'];
    });

    switch(mode) {
      case 'singlePlay':
        BaseComponent.player = new Character;
        // BaseComponent.enemy = new AI;
        break;
      case 'multiPlay':
        BaseComponent.player = new Character;
        BaseComponent.enemy = new Character;
        break;
      case 'AIvsAI':
        // BaseComponent.player = new AI;
        // BaseComponent.enemy = new AI;
        break;
      default:
        //error
        break;
    }

    this.tick();
  }

  tick(): void {
    requestAnimationFrame(() => {
      this.playGame();
      this.resizeCanvas();
      this.rander();
      this.tick();
    });
  }

  playGame(): void {
    switch(BaseComponent.gameState) {
      case GameState.playerTurn:
        this.setDate(BaseComponent.player);
        break;
      case GameState.enemyTurn:
        this.setDate(BaseComponent.enemy);
        break;
      case GameState.wait:
        // do render
        break;
      case GameState.work:
        this.calc();
        break;
      default:
        // error
        break;
    }
  }

  resizeCanvas(): void {
    let canvas = this.myCanvas.nativeElement;
    canvas.width = document.getElementById("map").offsetWidth;
    canvas.height = canvas.width;
  }

  rander(): void {

  }

  randerRange() {

  }

  setDate(myCharacter) {

    // myCharacter.chooseWeapon(
    //   //weapon 객체
    // );
    // myCharacter.movePosition(
    //   //position
    // );
    // myCharacter.attackEnemy(
    //   //position
    // );
  }

  calc() {
    let player = BaseComponent.player;
    let enemy = BaseComponent.enemy;
    if(player.getActionInfo().attackPosition == enemy.getActionInfo().afterPosition) {
      enemy.decrimentHP(this.getDamage(player.getWeapon()));
    }
  }

  getDamage(weapon) {
    let damage;
    return damage;
  }

  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
