import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle-page.component.html',
  styleUrls: ['./battle-page.component.scss']
})
export class BattlePageComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initialize()
  }

  public initialize():void {
    if (!localStorage.getItem('session')) {
      this.router.navigate(['/login'])
    }
  }




}
