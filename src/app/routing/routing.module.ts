import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModeComponent } from '../mode/mode.component';
import { BaseComponent } from '../base/base.component';

const routes: Routes = [
  { path: '', redirectTo: '/mode', pathMatch: 'full' },
  { path: 'mode',  component: ModeComponent },
  { path: 'base/:mode',  component: BaseComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
