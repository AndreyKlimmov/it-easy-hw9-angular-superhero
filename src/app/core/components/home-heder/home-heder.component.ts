import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-heder',
  templateUrl: './home-heder.component.html',
  styleUrls: ['./home-heder.component.scss']
})
export class HomeHederComponent implements OnInit {
  @Input() disableBtnFromLogin: boolean = false;
  @Input() disableBtnFromRegistration: boolean = false;
  public authUser: any = {'name': 'Log in'};
  public btnBattleText: string = 'Battle';
  public btnBattleClass: string = 'header-btn';

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  private initializeForm(): void {
    this.disableBtnFromLogin ? this.authUser = {'name': 'Registration'} : this.authUser;
    if (localStorage.getItem('session')) {
      this.authUser = JSON.parse(localStorage.getItem('session') || '')
    }
    if (this.disableBtnFromLogin || this.disableBtnFromRegistration) {
      this.disableBtnFromLogin ? this.authUser = {'name': 'Registration'} : this.authUser = {'name': 'Log in'};
    }
    //console.log(this.authUser);
  }

  public navToPage(pagePath: any): void {
    if (this.disableBtnFromLogin) {
      pagePath !== 'user' ? pagePath = 'login' : pagePath = 'registration'
    }
    if (this.disableBtnFromRegistration) {
      pagePath !== 'user' ? pagePath = 'registration' : pagePath = 'login'
    }
    this.router.navigate(['/' + pagePath] )
  }
}
