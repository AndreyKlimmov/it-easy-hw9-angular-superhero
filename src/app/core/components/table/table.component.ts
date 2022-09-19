import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {formatDate} from "@angular/common";

export interface PeriodicElement {
  date: string;
  heroName: string;
  opponentName: string;
  battleResult: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: formatDate('2019-06-29T23:55:55', 'yyyy.MM.dd hh:mm:ss', 'en-US'), heroName: 'Hydrogen', opponentName: 'H', battleResult: 'WIN'},
  {date: formatDate('2022-09-15', 'yyyy.MM.dd', 'en-US'), heroName: 'Super', opponentName: 'S', battleResult: 'LOOSE'},
  //{date: date('2000'), heroName: 'Hydrogen', opponentName: 'H', battleResult: 'WIN'},

];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['date', 'hero-name', 'opponent-name', 'battle-result'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

@ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
