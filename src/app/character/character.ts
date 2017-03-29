import { AppComponent } from '../app.component';

export class Character {
  private position: [number, number];
  private hp: number;
  private weapon: string;

  constructor(position:[number,number]){
      this.hp = 10;
      this.weapon = "none";
      this.position = position;
  }
  
    setWeapon(weapon: string) {
      this.weapon = weapon;
    }
    
    getWeapon() {
      return this.weapon;
    }

    setPosition(position: [number, number]) {
      this.position = position;
    }

    getPosition() {
      return this.position;
    }

    setHp(hp: number) {
      this.hp = hp;
    }

    getHp() {
      return this.hp;
    }

    decrimentHP(damage: number) {
      this.hp -= damage;
    }

    incrementHP(damage: number) {
      this.hp += damage;
    }

}