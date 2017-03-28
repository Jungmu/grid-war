import { Component, OnInit } from '@angular/core';
import { Character } from './character';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html'
})
export class CharacterComponent {

  drawCharacter(line:number,character:Character,context) {
    let img = <HTMLImageElement>document.getElementById(character.weapon);
    let ctx = context;
    let offset = 0.1;
    let canvasWidth = document.getElementById("map").offsetWidth;
    let gridOffset = canvasWidth*offset;
    let gridFullWidth = canvasWidth*(1-offset*2);
    let gridWidth = gridFullWidth / line;
    let x = (character.position[1]-1)*gridWidth;
    let y = (character.position[0]-1)*gridWidth;
    ctx.drawImage(img, x+gridOffset, y+gridOffset, gridWidth, gridWidth);
  }

}
