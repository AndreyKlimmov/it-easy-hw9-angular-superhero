import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";
import {concatMap, delay, fromEvent, interval, map, switchMap, take, takeUntil, timer} from "rxjs";

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle-page.component.html',
  styleUrls: ['./battle-page.component.scss']
})
export class BattlePageComponent implements OnInit {
  public cardClass: string = 'user-page-hero-list-'
  public searchOpponentBtn: string = '';
  public showOpponent: string = 'disabled';
  public showOpponentCard: string = '';
  public bonuses: any = {intelligence: 5, strength: 5, speed: 5, durability: 5, power: 5, combat: 5};
  public user: any;
  public hero: any;
  public opponent: any;
  public timerSpinnerSearch: any;
  public timerSpinnerFight: any;
  public timerResult: any;
  public test1: number = 0
  public test2: number = 0
  public getHeroById: any
  public searchText: string = '';
  public resultText: string = 'disabled';
  public fightSwordsImg: string = 'disabled';
  public stopSearchBtn: string = '';
  public spinnerImg: string = '';
  public fightResultText: string = '';
  public colorText: string = '';
  public searchOpponentBonuses: string = '';

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
    //this.searchOpponentBtn = 'disabled'
    this.showOpponent = ''
    this.showOpponentCard = 'hidden'
    this.searchOpponentBtn = 'inactive'
    this.searchOpponentBonuses = 'disabled'

    if (Math.floor(Math.random() * 733)) {
      this.getHeroById = this.heroesService.getHeroById(`${Math.floor(Math.random() * 733)}`)
        .subscribe((hero: any) => {this.opponent = hero;
        console.log('opponent', this.test1++);})
    } else {
      this.findOpponent()
    }

    const timerFight = timer(1000,1000);
    this.timerSpinnerSearch = timerFight.pipe(take(6)).subscribe((count: number) =>
      {
        if (count == 5) {
          this.showOpponentCard = '';
          this.searchText = 'disabled'
          this.fightSwordsImg = ''
          this.stopSearchBtn = 'hidden'
          console.log('first');
        }
      });
    this.timerSpinnerFight = timerFight.pipe(take(12)).subscribe((count: number) => {
      if (count == 11) {
        this.fightSwordsImg = 'disabled'
        this.spinnerImg = 'disabled'
        this.resultText = ''
        this.fightResultText = 'WIN'
        this.colorText = 'green'
        console.log('second');
      }
    });
    this.timerResult = timerFight.pipe(take(18)).subscribe((count: number) => {
      if (count == 17) {
        this.searchOpponentBtn = ''


        this.searchOpponentBonuses = ''
        this.cardClass = 'user-page-hero-list-'
        this.searchOpponentBtn = '';
        this.showOpponent = 'disabled';
        this.showOpponentCard = '';
        this.searchText = '';
        this.resultText = 'disabled';
        this.fightSwordsImg = 'disabled';
        this.stopSearchBtn = '';
        this.spinnerImg = '';
        this.fightResultText = '';
        this.colorText = '';
        console.log('third');
      }
    });
  }

  public stopSearch(): void {
    //this.searchOpponentBtn = ''
    this.timerSpinnerSearch.unsubscribe()
    this.timerSpinnerFight.unsubscribe()
    this.timerResult.unsubscribe()
    this.getHeroById.unsubscribe()
    this.showOpponent = 'disabled'
    this.searchOpponentBonuses = ''

    this.searchOpponentBtn = ''
  }
}
