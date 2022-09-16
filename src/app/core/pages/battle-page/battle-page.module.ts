import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattlePageComponent } from './battle-page.component';
import {RouterModule, Routes} from "@angular/router";
import {UserPageComponent} from "../user-page/user-page.component";
import {HomeHederModule} from "../../components/home-heder/home-heder.module";

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
    ]
})
export class BattlePageModule { }
