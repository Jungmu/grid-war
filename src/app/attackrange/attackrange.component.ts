import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-attackrange',
  templateUrl: './attackrange.component.html',
  styleUrls: ['./attackrange.component.css']
})
export class AttackrangeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  line = 4;

  drawRange(context, weapon) {
    let ctx = context;
    let offset = 0.1;
    let canvasWidth = document.getElementById("map").offsetWidth;
    let gridOffset = canvasWidth*offset;
    let gridFullWidth = canvasWidth*(1-offset*2);
    let gridWidth = gridFullWidth / this.line;

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    
    let nowPosition = [AppComponent.player.position[0]-1, AppComponent.player.position[1]-1];

    if(weapon == "sword") {
      ctx.fillRect((nowPosition[1])*gridWidth+gridOffset, (nowPosition[0]-1)*gridWidth+gridOffset, gridWidth, gridWidth);
      ctx.fillRect((nowPosition[1]-1)*gridWidth+gridOffset, (nowPosition[0])*gridWidth+gridOffset, gridWidth, gridWidth);
      ctx.fillRect((nowPosition[1])*gridWidth+gridOffset, (nowPosition[0]+1)*gridWidth+gridOffset, gridWidth, gridWidth);
      ctx.fillRect((nowPosition[1]+1)*gridWidth+gridOffset, (nowPosition[0])*gridWidth+gridOffset, gridWidth, gridWidth);
    } else if (weapon == "spear") {
      ctx.fillRect((nowPosition[1]+2)*gridWidth+gridOffset, (nowPosition[0])*gridWidth+gridOffset, gridWidth, gridWidth);
      ctx.fillRect((nowPosition[1]+1)*gridWidth+gridOffset, (nowPosition[0]+1)*gridWidth+gridOffset, gridWidth, gridWidth);
      ctx.fillRect((nowPosition[1])*gridWidth+gridOffset, (nowPosition[0]+2)*gridWidth+gridOffset, gridWidth, gridWidth);
      ctx.fillRect((nowPosition[1]-1)*gridWidth+gridOffset, (nowPosition[0]+1)*gridWidth+gridOffset, gridWidth, gridWidth);
      ctx.fillRect((nowPosition[1]-2)*gridWidth+gridOffset, (nowPosition[0])*gridWidth+gridOffset, gridWidth, gridWidth);
      ctx.fillRect((nowPosition[1]-1)*gridWidth+gridOffset, (nowPosition[0]-1)*gridWidth+gridOffset, gridWidth, gridWidth);
      ctx.fillRect((nowPosition[1])*gridWidth+gridOffset, (nowPosition[0]-2)*gridWidth+gridOffset, gridWidth, gridWidth);
      ctx.fillRect((nowPosition[1]+1)*gridWidth+gridOffset, (nowPosition[0]-1)*gridWidth+gridOffset, gridWidth, gridWidth);
    } else if (weapon == "arrow") {
      for(let i=-2; i<=2; i++) {
        for(let j=-2; j<=2; j++) {
          if(j == -2 || j == 2) {
            ctx.fillRect((nowPosition[1]+i)*gridWidth+gridOffset, (nowPosition[0]+j)*gridWidth+gridOffset, gridWidth, gridWidth);
          } else {
            if(i == -2 || i == 2) {
              ctx.fillRect((nowPosition[1]+i)*gridWidth+gridOffset, (nowPosition[0]+j)*gridWidth+gridOffset, gridWidth, gridWidth);
            }
          }
        }
      }
    }
  }
}