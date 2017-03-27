import { Component } from '@angular/core';
import { ViewChild } from "@angular/core";
import { AfterViewInit } from "@angular/core";
import { GridComponent } from './grid/grid.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  showGrid: boolean = false;
  context: CanvasRenderingContext2D;

  grid = new GridComponent;

  @ViewChild("myCanvas") myCanvas;

  ngAfterViewInit() {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");

    this.tick();
  }
  clicked() {
    if (this.showGrid) {
      this.showGrid = false;
    }
    else {
      this.showGrid = true;
    }
  }
  canvasResizing() {
    let canvas = this.myCanvas.nativeElement;
    canvas.width = document.getElementById("map").offsetWidth;
    canvas.height = canvas.width;
  }
  tick() {
    requestAnimationFrame(() => {
      this.canvasResizing();
      this.tick();
      if (this.showGrid) {
        this.grid.drawMap(4, this.context);
      }
    });
  }


}