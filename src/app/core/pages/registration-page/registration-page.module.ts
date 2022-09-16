import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationPageComponent } from './registration-page.component';
import { RouterModule, Routes } from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {GetControlModule} from "../../pipes/get-control.module";
import {HomeHederModule} from "../../components/home-heder/home-heder.module";

const routes: Routes = [
  {
    path: '',
    component: RegistrationPageComponent
  }
]

@NgModule({
  declarations: [
    RegistrationPageComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        GetControlModule,
        HomeHederModule
    ]
})
export class RegistrationPageModule { }
