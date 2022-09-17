import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  public authUser: any = {'name': 'Log in'};
  public user: any;
  public heroesId: any[] = [];
  public heroes: any[] = [];
  public cardClass: string = 'user-page-hero-list-'
  public heroReadyId: string = '';

  constructor(
    private router: Router,
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.initialize()
  }
  public initialize(): void {
    //console.log('AAAAAAAAAAAAAAAAAAAA');
    if (localStorage.getItem('session')) {
      this.authUser = JSON.parse(localStorage.getItem('session') || '')
    }  else {
      this.router.navigate(['/login'])
    }

    if (localStorage.getItem('session')) {
      this.user = JSON.parse(localStorage.getItem('session') || '')
    }
    if (localStorage.getItem(`userId-${this.user.id}-heroList`) || '') {
      this.heroesId = JSON.parse(localStorage.getItem(`userId-${this.user.id}-heroList`) || '')
      //console.log('heroesId:', this.heroesId);
      this.searchHeroes()
    }

  }

  public navToPage(pagePath: any): void {
    this.router.navigate(['/' + pagePath])
  }

  public searchHeroes(): void {
    for (let id of this.heroesId) {
      this.heroesService.getHeroById(id).subscribe((hero: any) => {
        this.heroes.push(hero);
        if (localStorage.getItem(`userId-${this.user.id}-heroFight`) && this.heroes.length == this.heroesId.length) {
          const heroReadyId = JSON.parse(localStorage.getItem(`userId-${this.user.id}-heroFight`) || '')
          console.log('UUUUUUUUUUU', heroReadyId);
          let b = this.heroes
          //console.log('BBBBBB', b);
          b = a(heroReadyId)
          function a (heroReadyId: number): any[] {
            return [b.find(el => el.id === heroReadyId)].concat(b.filter(el => el.id != heroReadyId))
          }
          //console.log('CCCCCC', b);
          this.heroes = b
        }
      });
    }

  }
  public updateList(): void {
    this.heroes = []
    this.searchHeroes()
  }
}

