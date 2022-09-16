import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroCardComponent } from './hero-card.component';
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    HeroCardComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    HeroCardComponent
  ]
})
export class HeroCardModule { }
