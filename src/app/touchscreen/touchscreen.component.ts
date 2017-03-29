import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-touchscreen',
  templateUrl: './touchscreen.component.html',
  styleUrls: ['./touchscreen.component.css']
})
export class TouchscreenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  private event: MouseEvent;
  private clientX = 0;
  private clientY = 0;

  private onEvent(event: MouseEvent): void {
      this.event = event;
  }

  private coordinates(event: MouseEvent):void {
      this.clientX = event.clientX;
      this.clientY = event.clientY;
  }

  getPosition() {
    let offset:number = 0.1;
    let canvasWidth = document.getElementById("map").offsetWidth;
    let gridOffset:number = canvasWidth*offset;
    let gridFullWidth:number = canvasWidth*(1-offset*2);
    
    AppComponent.showGrid = false;
    console.log("X: "+this.clientX+"  Y: "+this.clientY);
  }
}
