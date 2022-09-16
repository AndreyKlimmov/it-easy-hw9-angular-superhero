import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page.component';
import {RouterModule, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {HomeHederModule} from "../../components/home-heder/home-heder.module";

const routes: Routes = [
  {
    path: '',
    component: UserPageComponent
  }
]

@NgModule({
  declarations: [
    UserPageComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatTabsModule,
        HomeHederModule,
    ]
})
export class UserPageModule { }
