import { Component } from '@angular/core';
import { ViewChild } from "@angular/core";
import { AfterViewInit } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  showGrid: boolean = false;
  context: CanvasRenderingContext2D;

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
  tick() {
    requestAnimationFrame(() => {
      let canvas = this.myCanvas.nativeElement;
      canvas.width = document.getElementById("map").offsetWidth;
      canvas.height = canvas.width;
      this.tick();
      if (this.showGrid) {
        this.drawMap(4);
      }
    });
  }

  drawMap(line: number) {
    let ctx = this.context;
    let cavasWidth = document.getElementById("map").offsetWidth;
    let gridWidth = cavasWidth / line;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, cavasWidth);
    ctx.lineTo(cavasWidth, cavasWidth);
    ctx.lineTo(cavasWidth, 0);
    ctx.closePath();
    ctx.stroke();

    for (let i: number = 1; i < line; ++i) {
      ctx.beginPath();
      ctx.moveTo(0, gridWidth * i);
      ctx.lineTo(cavasWidth, gridWidth * i);
      ctx.closePath();
      ctx.stroke();
    }
    for (let i: number = 1; i < line; ++i) {
      ctx.beginPath();
      ctx.moveTo(gridWidth * i, 0);
      ctx.lineTo(gridWidth * i, cavasWidth);
      ctx.closePath();
      ctx.stroke();
    }
  }

}