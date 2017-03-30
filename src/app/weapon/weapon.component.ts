import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { playerState, gameState } from '../const';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css']
})
export class WeaponComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  weaponByClick(weapon: string): void {
    AppComponent.player.setWeapon(weapon);
    AppComponent.playerState = playerState.move;
  }
}
