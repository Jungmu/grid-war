import { Component } from '@angular/core';
import { ViewChild } from "@angular/core";
import { AfterViewInit } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    ;
  context: CanvasRenderingContext2D;

  @ViewChild("myCanvas") myCanvas;

  ngAfterViewInit() {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");

    this.tick();
  }

  tick() {
    requestAnimationFrame(() => {
      let canvas = this.myCanvas.nativeElement;
      canvas.width = document.getElementById("map").offsetWidth;
      canvas.height = canvas.width;
      this.tick();
      this.drawMap();
    });

  }

  drawMap() {
    let ctx = this.context;
    let cavasWidth = document.getElementById("map").offsetWidth;
    let gridWidth = cavasWidth / 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, cavasWidth);
    ctx.lineTo(cavasWidth, cavasWidth);
    ctx.lineTo(cavasWidth, 0);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, gridWidth);
    ctx.lineTo(cavasWidth, gridWidth);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, gridWidth * 2);
    ctx.lineTo(cavasWidth, gridWidth * 2);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, gridWidth * 3);
    ctx.lineTo(cavasWidth, gridWidth * 3);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gridWidth, 0);
    ctx.lineTo(gridWidth, cavasWidth);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gridWidth * 2, 0);
    ctx.lineTo(gridWidth * 2, cavasWidth);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gridWidth * 3, 0);
    ctx.lineTo(gridWidth * 3, cavasWidth);
    ctx.closePath();
    ctx.stroke();
  }

}