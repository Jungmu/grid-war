import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from '../character/character.component';
import { GridComponent } from '../grid/grid.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'home',  component: CharacterComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
