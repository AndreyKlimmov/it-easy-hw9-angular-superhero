import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroDetailsPageComponent } from './hero-details-page.component';
import {RouterModule, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {HeroCardModule} from "../../components/hero-card/hero-card.module";
import {HomeHederModule} from "../../components/home-heder/home-heder.module";

const routes: Routes = [
  {
    path: '',
    component: HeroDetailsPageComponent
  }
]

@NgModule({
  declarations: [
    HeroDetailsPageComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        HeroCardModule,
        HomeHederModule,
    ]
})
export class HeroDetailsPageModule { }
