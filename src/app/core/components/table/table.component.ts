import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {formatDate} from "@angular/common";

export interface PeriodicElement {
  date: string;
  hero: string;
  opponent: string;
  result: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: formatDate('2000-00-01T00:00:00', 'yyyy.MM.dd hh:mm:ss', 'en-US'),
    hero: 'no history yet', opponent: 'no history yet', result: 'no history yet'},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
  @Input() history: any[] = [];
  displayedColumns: string[] = ['date', 'hero-name', 'opponent-name', 'battle-result'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
  ) {}

  ngOnInit(): void {
    this.getTableArr()
  }

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

  public getTableArr(): void {
    if (this.history) {
      for (const [i, v] of this.history.entries()) {
        let a: any = v
        ELEMENT_DATA[i] = a
      }
    }
  }
}
