import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonHeaderComponent } from './button-header.component';
import {MatButtonModule} from "@angular/material/button";



@NgModule({
    declarations: [
        ButtonHeaderComponent
    ],
    exports: [
        ButtonHeaderComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule
    ]
})
export class ButtonHeaderModule { }
