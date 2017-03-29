import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.css']
})
export class MoveComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  moveByClick(position:[number, number]) {
    this.positionChange(AppComponent.player, position);
  }

  positionChange(myCharacter, position:[number, number]) {
    let beforePosition = myCharacter.position;
    if (beforePosition[0] + position[0] <= 0 || beforePosition[1] + position[1] <= 0 || beforePosition[0] + position[0] > AppComponent.gridLineCount || beforePosition[1] + position[1] > AppComponent.gridLineCount) {
      console.log("can't move there");
      // console.log(beforePosition[0] + position[0]);
      // console.log(beforePosition[1] + position[1]);
    }
    else {
      myCharacter.setPosition([beforePosition[0] + position[0], beforePosition[1] + position[1]]);
    }
  }

}
