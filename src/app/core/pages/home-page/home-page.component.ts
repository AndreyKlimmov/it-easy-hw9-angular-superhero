import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public authUser: any;
  public alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  public searchForm!: FormControl;
  public pressedLetter: string = '';
  public keyboardHide: string = 'keyboard-hide';
  highLightBtn: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm()
    this.authUser = JSON.parse(localStorage.getItem('session') || '')
  }
  private initializeForm(): void {
    this.searchForm = new FormControl<any>('', [])
  }

  public navToPage(pagePath: any): void {
    this.router.navigate(['/' + pagePath])
  }

  public showKeys(): void {
    this.pressedLetter = '';
    this.keyboardHide ? this.keyboardHide = '' : this.keyboardHide = 'keyboard-hide'
  }

  public getLetter(letter: string): void {
        this.pressedLetter = letter.toUpperCase();
  }

  public getClassSearch(search: string) {
    return undefined;
  }
}
