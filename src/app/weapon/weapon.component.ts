import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css']
})
export class WeaponComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  weaponByClick(weapon: string) {
    this.weaponChange(AppComponent.player, weapon);
  }

  weaponChange(myCharacter, weapon: string) {
    myCharacter.setWeapon(weapon);
    AppComponent.showGrid = true;
  }
}
