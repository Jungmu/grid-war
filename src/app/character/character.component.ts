import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html'
})
export class CharacterComponent implements OnInit {
  hp: number;
  weapon: string;
  position: [number, number];

  constructor(position: [number, number]) {
    this.position = position;
  }

  ngOnInit() {
    this.hp = 10;
    this.weapon = "none";
  }

  drawCharacter(line:number,context) {
    let img = <HTMLImageElement>document.getElementById(this.weapon);
    let ctx = context;
    let offset = 0.1;
    let cavasWidth = document.getElementById("map").offsetWidth;
    let gridOffset = cavasWidth*offset;
    let gridFullWidth = cavasWidth*(1-offset*2);
    let gridWidth = gridFullWidth / line;
    let x = (this.position[1]-1)*gridWidth;
    let y = (this.position[0]-1)*gridWidth;
    ctx.drawImage(img, x+gridOffset, y+gridOffset, gridWidth, gridWidth);
  }

}
