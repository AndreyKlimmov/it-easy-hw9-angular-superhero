import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {HeroesService} from "../../services/heroes.service";
import {HeroesResponseInterfaces} from "../../interfaces/http-interfaces";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public authUser: any = {'name': 'Log in'};
  public alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  public searchControl!: FormControl;
  public pressedLetter: string = '';
  public keyboardHide: string = 'keyboard-hide';
  public highlightBtn: string = '';
  public heroes: any[] = [];

  constructor(
    private router: Router,
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.initializeForm()
    // this.getHeroes()
  }
  private initializeForm(): void {
    this.searchControl = new FormControl<any>('', [])
    if (!localStorage.getItem('session')) {
      this.router.navigate(['/login'])
    }
  }
  // private getHeroes(): void {
  //    this.heroesService.getHeroes().subscribe(
  //      (data: HeroesResponseInterfaces) => {
  //        this.heroes = data.results})
  // }

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
    this.heroesService.getHeroes(letter)
      .subscribe((response: HeroesResponseInterfaces) => {
        this.heroes = response.results
      })
    this.searchControl.reset()
  }

  public searchHeroes(): void {
    if (this.searchControl.value) {
      this.heroesService.getHeroes(this.searchControl.value)
        .subscribe((response: HeroesResponseInterfaces) => {
          this.heroes = response.results
        })
    }
    this.searchControl.reset()
  }

  public navToHeroDetailsPage(hero: any): void {
    if (hero.id) {
      this.router.navigate(['/hero-details', hero.id])
    }
  }
}
