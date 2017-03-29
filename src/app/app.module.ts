import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { CharacterComponent } from './character/character.component';

import { RoutingModule }     from './routing/routing.module';
import { WeaponComponent } from './weapon/weapon.component';
import { AttackrangeComponent } from './attackrange/attackrange.component';
import { TouchscreenComponent } from './touchscreen/touchscreen.component';
import { MoverangeComponent } from './moverange/moverange.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    CharacterComponent,
    WeaponComponent,
    AttackrangeComponent,
    TouchscreenComponent,
    MoverangeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
