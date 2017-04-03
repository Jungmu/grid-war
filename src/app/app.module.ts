import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RoutingModule } from './routing/routing.module';

import { BaseComponent } from './base/base.component';
import { ModeComponent } from './mode/mode.component';
import { DrawComponent } from './draw/draw.component';
import { TouchscreenComponent } from './touchscreen/touchscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    ModeComponent,
    DrawComponent,
    TouchscreenComponent
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
