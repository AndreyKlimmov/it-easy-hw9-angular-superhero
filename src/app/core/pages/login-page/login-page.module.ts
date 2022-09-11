import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import {RouterModule, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {GetControlModule} from "../../pipes/get-control.module";

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  }
]

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    GetControlModule
  ]
})
export class LoginPageModule { }
