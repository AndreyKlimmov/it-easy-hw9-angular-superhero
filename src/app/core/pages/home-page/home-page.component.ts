import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public authUser: any = {'name': 'Log in'};
  public alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  public searchForm!: FormControl;
  public pressedLetter: string = '';
  public keyboardHide: string = 'keyboard-hide';
  public highlightBtn: string = '';

  constructor(

    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm()
  }
  private initializeForm(): void {
    this.searchForm = new FormControl<any>('', [])
    if (localStorage.getItem('session')) {
      this.authUser = JSON.parse(localStorage.getItem('session') || '')
    }
    console.log(this.authUser);
  }

  public navToPage(pagePath: any): void {
    this.router.navigate(['/' + pagePath])
  }

  public showKeys(): void {
    this.pressedLetter = '';
    if (this.keyboardHide) {
      this.keyboardHide = '';
      this.highlightBtn = 'highlight-btn'
    }  else {
      this.keyboardHide = 'keyboard-hide'
      this.highlightBtn = ''
    }
  }

  public getLetter(letter: string): void {
    this.pressedLetter = letter.toUpperCase();
    this.keyboardHide = 'keyboard-hide'
    this.highlightBtn = ''
  }

  public getClassSearch(search: string) {
    return undefined;
  }
}
