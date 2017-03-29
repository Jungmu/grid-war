import { Component } from '@angular/core';
import { ViewChild } from "@angular/core";
import { AfterViewInit } from "@angular/core";
import { GridComponent } from './grid/grid.component';
import { CharacterComponent } from './character/character.component';
import { Character } from './character/character';

import { WeaponComponent } from './weapon/weapon.component';
import { MoveComponent } from './move/move.component';
import { AttackrangeComponent } from './attackrange/attackrange.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  static showGrid: boolean = false;
  static playerPosition: [number, number] = [4, 3];
  static enemyPosition: [number, number] = [1, 2];
  static player: Character = new Character(AppComponent.playerPosition);  
  static enemy: Character = new Character(AppComponent.enemyPosition);
  static gridLineCount: number = 4;
  
  context: CanvasRenderingContext2D;
  gridComponent:GridComponent = new GridComponent;

  attackrangeComponent: AttackrangeComponent = new AttackrangeComponent;
  characterComponent: CharacterComponent = new CharacterComponent;

  @ViewChild("myCanvas") myCanvas;

  ngAfterViewInit() {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");
    
    AppComponent.player.setWeapon("sword");

    this.tick();
  }
  tick() {
    requestAnimationFrame(() => {
      // this.setWeapon();
      this.canvasResizing();
      this.rander();
      this.tick();
    });
  }

  canvasResizing() {
    let canvas = this.myCanvas.nativeElement;
    canvas.width = document.getElementById("map").offsetWidth;
    canvas.height = canvas.width;
  }

  rander() {
    if (AppComponent.showGrid) {
      this.gridComponent.drawMap(AppComponent.gridLineCount, this.context);
      this.attackrangeComponent.drawRange(this.context, AppComponent.gridLineCount,AppComponent.player.weapon);

    }
    this.characterComponent.drawCharacter(AppComponent.gridLineCount, AppComponent.player, this.context);
    this.characterComponent.drawCharacter(AppComponent.gridLineCount, AppComponent.enemy, this.context);
  }
  clicked() {
    AppComponent.showGrid = true;
    setTimeout(() => {
      AppComponent.showGrid = false;
    }, 2500); 
  }

  // Which HTML element is the target of the event
	mouseTarget(e) {
		let targ;
		if (!e) e = window.event;
		if (e.target) targ = e.target;
		else if (e.srcElement) targ = e.srcElement;
		if (targ.nodeType == 3) // defeat Safari bug
			targ = targ.parentNode;
		return targ;
	}

	// Mouse position relative to the document
	// From http://www.quirksmode.org/js/events_properties.html
	mousePositionDocument(e) {
		let posx = 0;
		let posy = 0;
		if (!e) {
			e = window.event;
		}
		if (e.pageX || e.pageY) {
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) {
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return {
			x: posx,
			y: posy
		};
	}

	// Find out where an element is on the page
	// From http://www.quirksmode.org/js/findpos.html
	findPos(obj) {
		let curleft = 0;
		let curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}
		return {
			left: curleft,
			top: curtop
		};
	}

	// Mouse position relative to the element
	// not working on IE7 and below
	mousePositionElement(e) {
		var mousePosDoc = this.mousePositionDocument(e);
		var target = this.mouseTarget(e);
		var targetPos = this.findPos(target);
		var posx = mousePosDoc.x - targetPos.left;
		var posy = mousePosDoc.y - targetPos.top;
		console.log(posx);
		console.log(posy);
		return {
			x: posx,
			y: posy
		};
	}
}