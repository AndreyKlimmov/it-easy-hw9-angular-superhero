import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetControlPipe } from './get-control.pipe';



@NgModule({
  declarations: [
    GetControlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GetControlPipe
  ]
})
export class GetControlModule { }
