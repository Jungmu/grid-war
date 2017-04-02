export class Weapon {
    key:number;
    name:string;
    damage:number;
    range:Array<[number, number]>;
    skill:Array<Skill>;
}

class Skill {
    key:number;
    name:string;
    damage:number;
    range:Array<[number, number]>;
}