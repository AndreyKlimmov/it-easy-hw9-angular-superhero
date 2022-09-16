import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHederComponent } from './home-heder.component';
import {MatButtonModule} from "@angular/material/button";
import {ButtonHeaderModule} from "../button-header/button-header.module";



@NgModule({
  declarations: [
    HomeHederComponent
  ],
  exports: [
    HomeHederComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    ButtonHeaderModule
  ]
})
export class HomeHederModule { }
