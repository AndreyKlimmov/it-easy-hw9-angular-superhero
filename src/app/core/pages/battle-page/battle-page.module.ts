import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattlePageComponent } from './battle-page.component';
import {RouterModule, Routes} from "@angular/router";
import {UserPageComponent} from "../user-page/user-page.component";

const routes: Routes = [
  {
    path: '',
    component: BattlePageComponent
  }
]

@NgModule({
  declarations: [
    BattlePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class BattlePageModule { }
