import { Component, OnInit } from '@angular/core';
import { Character } from './character';
import { GridInfo } from '../grid/grid.info';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html'
})
export class CharacterComponent {
  gridComponent:GridComponent = new GridComponent;

  drawCharacter(character:Character,context) {
    let img = <HTMLImageElement>document.getElementById(character.getWeapon());
    let ctx = context;
    let gridInfo = this.gridComponent.calcGridSize();

    let x = (character.getPosition()[1]-1)*gridInfo.gridWidth;
    let y = (character.getPosition()[0]-1)*gridInfo.gridWidth;
    ctx.drawImage(img, x+gridInfo.gridOffset, y+gridInfo.gridOffset, gridInfo.gridWidth, gridInfo.gridWidth);
  }

}
