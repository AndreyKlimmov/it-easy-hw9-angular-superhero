import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattlePageComponent } from './battle-page.component';
import {RouterModule, Routes} from "@angular/router";
import {UserPageComponent} from "../user-page/user-page.component";
import {HomeHederModule} from "../../components/home-heder/home-heder.module";
import {HeroCardModule} from "../../components/hero-card/hero-card.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ButtonHeaderModule} from "../../components/button-header/button-header.module";

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
    HomeHederModule,
    HeroCardModule,
    MatProgressSpinnerModule,
    ButtonHeaderModule,
  ]
})
export class BattlePageModule { }
