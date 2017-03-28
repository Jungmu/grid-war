import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  hp:number;
  weapon:string;
  position:[number,number];

  constructor(position:[number,number]) {
    this.position = position;
   }

  ngOnInit() {
    this.hp = 10;
    this.weapon = "none";
  }

}
