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
}