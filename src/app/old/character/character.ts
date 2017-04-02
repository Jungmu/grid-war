export class Character {
  private position: [number, number];
  private hp: number;
  private weapon: string;

  constructor(position: [number, number]) {
    this.hp = 10;
    this.weapon = "none";
    this.position = position;
  }

  setWeapon(weapon: string): void {
    this.weapon = weapon;
  }

  getWeapon(): string {
    return this.weapon;
  }

  setPosition(position: [number, number]): void {
    this.position = position;
  }

  getPosition(): [number, number] {
    return this.position;
  }

  setHp(hp: number): void {
    this.hp = hp;
  }

  getHp(): number {
    return this.hp;
  }

  decrimentHP(damage: number): void {
    this.hp -= damage;
  }

  incrementHP(damage: number): void {
    this.hp += damage;
  }

}