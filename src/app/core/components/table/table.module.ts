import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { TableComponent } from './table.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";



@NgModule({
    declarations: [
        TableComponent
    ],
    exports: [
        TableComponent
    ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [DatePipe]
})
export class TableModule { }
