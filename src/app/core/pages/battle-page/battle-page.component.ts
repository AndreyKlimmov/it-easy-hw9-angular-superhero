import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";
import {interval, timeout} from "rxjs";

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle-page.component.html',
  styleUrls: ['./battle-page.component.scss']
})
export class BattlePageComponent implements OnInit {
  public cardClass: string = 'user-page-hero-list-'
  public hideBattleHeroBtn: string = '';
  public showOpponent: string = 'disabled-opponent';
  public showOpponentCard: string = '';
  public bonuses: any = {intelligence: 5, strength: 5, speed: 5, durability: 5, power: 5, combat: 5};
  public user: any;
  public hero: any;
  public opponent: any;
  public timerSpinner: any;
  public test1: number = 0
  public test2: number = 0
  public test3: any

  constructor(
    private router: Router,
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.initialize()
  }

  public initialize():void {
    if (!localStorage.getItem('session')) {
      this.router.navigate(['/login'])
    }
    if (localStorage.getItem('session')) {
      this.user = JSON.parse(localStorage.getItem('session') || '')
    }

    if (localStorage.getItem(`userId-${this.user.id}-heroFight`)) {
      const heroReadyId = JSON.parse(localStorage.getItem(`userId-${this.user.id}-heroFight`) || '')

      this.heroesService.getHeroById(heroReadyId).subscribe((hero: any) => {this.hero = hero})
    }

    if (localStorage.getItem(`userId-${this.user.id}-bonuses`) || '') {
      this.bonuses = JSON.parse(localStorage.getItem(`userId-${this.user.id}-bonuses`) || '')
      //console.log('heroesId:', this.heroesId);
      //this.searchHeroes()
    } else {localStorage.setItem(`userId-${this.user.id}-bonuses`, JSON.stringify(this.bonuses))}
    console.log('this.bonuses:', this.bonuses);
  }


  public updateList(): void {

  }

  public findOpponent(): void {
    this.hideBattleHeroBtn = 'hidden-battle-hero-btn'
    this.showOpponent = ''
    this.showOpponentCard = 'hidden-opponent'
    if (Math.floor(Math.random() * 733)) {
      this.test3 = this.heroesService.getHeroById(`${Math.floor(Math.random() * 733)}`).subscribe((hero: any) => {this.opponent = hero;
        this.timerSpinner.unsubscribe()

        console.log('opponent', this.test1++);})
    } else {
      this.findOpponent()
    }
    this.timerSpinner = interval(3000).subscribe(n => {
      this.showOpponentCard = '';
      console.log('stop', this.test2++)
    });
    //TIMER

  }

  public stopSearch(): void {
    this.hideBattleHeroBtn = ''
    this.timerSpinner.unsubscribe()
    this.test3.unsubscribe()
    this.showOpponent = 'disabled-opponent'

  }
}
