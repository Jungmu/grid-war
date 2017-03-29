import { AppComponent } from '../app.component';

export class Character {
  position: [number, number];
  hp: number;
  weapon: string;

  constructor(position:[number,number]){
      this.hp = 10;
      this.weapon = "none";
      this.position = position;
  }
  
    setWeapon(weapon: string) {
      this.weapon = weapon;
    }
    setPosition(position: [number, number]) {
      this.position = position;
    }
}