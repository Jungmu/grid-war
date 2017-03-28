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

  setPosition(position:[number, number]) {
    let beforePosition = AppComponent.player.position;
    
    AppComponent.player.position = [beforePosition[0]+position[0], beforePosition[1]+position[1]];
    
  }

}
