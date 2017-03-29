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
    let beforePosition = AppComponent.player.position;
    if (beforePosition[0] + position[0] <= 0 || beforePosition[1] + position[1] <= 0 || beforePosition[0] + position[0] > AppComponent.gridLineCount || beforePosition[1] + position[1] > AppComponent.gridLineCount) {
      // do nothing
    }
    else {
      AppComponent.player.setPosition([beforePosition[0] + position[0], beforePosition[1] + position[1]]);
    }
  }

}
