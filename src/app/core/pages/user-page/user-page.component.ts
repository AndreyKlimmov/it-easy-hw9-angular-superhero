import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  public authUser: any = {'name': 'Log in'};

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeForm()
  }
  private initializeForm(): void {
    if (localStorage.getItem('session')) {
      this.authUser = JSON.parse(localStorage.getItem('session') || '')
    }  else {
      this.router.navigate(['/login'])
    }
  }

  public navToPage(pagePath: any): void {
    this.router.navigate(['/' + pagePath])
  }


}
