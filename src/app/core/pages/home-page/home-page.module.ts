import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import {RouterModule, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {GetControlModule} from "../../pipes/get-control.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HeroCardModule} from "../../components/hero-card/hero-card.module";
import {HomeHederModule} from "../../components/home-heder/home-heder.module";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }
]

@NgModule({
    declarations: [
        HomePageComponent
    ],
    exports: [
        HomePageComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        GetControlModule,
        ReactiveFormsModule,
        HeroCardModule,
        HomeHederModule
    ]
})
export class HomePageModule { }
