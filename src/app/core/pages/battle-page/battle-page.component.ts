import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";
import {take, timer} from "rxjs";

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle-page.component.html',
  styleUrls: ['./battle-page.component.scss']
})
export class BattlePageComponent implements OnInit {
  public allowedShowPage: boolean = false;
  public showText: boolean = false;
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
  public heroReadyId: string = '';
  public counter: number = 0;
  public heroList: any[] = [0];

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
    } else {this.allowedShowPage = true}

    if (localStorage.getItem('session')) {
      this.user = JSON.parse(localStorage.getItem('session') || '')
    }
    if (localStorage.getItem(`userId-${this.user.id}-heroList`) || '') {
      this.heroList = JSON.parse(localStorage.getItem(`userId-${this.user.id}-heroList`) || '')
    }
    if (localStorage.getItem(`userId-${this.user.id}-heroFight`)) {
      this.heroReadyId = JSON.parse(localStorage.getItem(`userId-${this.user.id}-heroFight`) || '')

      this.heroesService.getHeroById(this.heroReadyId).subscribe((hero: any) => {
        this.hero = hero;
      })
      this.updateBonuses()
    } else {this.showText = true}

    // if (localStorage.getItem(`userId-${this.user.id}-bonuses`) || '') {
    //   this.bonuses = JSON.parse(localStorage.getItem(`userId-${this.user.id}-bonuses`) || '')
    //   //console.log('heroesId:', this.heroesId);
    //   //this.searchHeroes()
    // } else {localStorage.setItem(`userId-${this.user.id}-bonuses`, JSON.stringify(this.bonuses))}
    // console.log('this.bonuses:', this.bonuses);

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

  public applyBonus(bonus: string): void {
    this.counter++
    if (this.counter < 2) {
      switch (bonus) {
        case 'intelligence': {
          this.setBonus('intelligence')
          break
        }
        case 'strength': {
          this.setBonus('strength')
          break
        }
        case 'speed': {
          this.setBonus('speed')
          break
        }
        case 'durability': {
          this.setBonus('durability')
          break
        }
        case 'power': {
          this.setBonus('power')
          break
        }
        case 'combat': {
          this.setBonus('combat')
          break
        }
        default: {
          console.log('somthing wrong in switch case');
          break
        }
      }
      localStorage.setItem(`userId-${this.user.id}-heroList`, JSON.stringify(this.heroList))
    }

  }

  public setBonus(bonus: string): void {
    const heroList = this.heroList.map((hero) => (
      hero.id == this.hero.id ?
      hero.bonuses[bonus]-- :  null
    ));
    this.updateBonuses()
    //console.log('this.heroList', this.heroList);
  }

  public updateBonuses(): void {
    const heroList = this.heroList.map((hero) => (
      hero.id === this.heroReadyId
        ? this.bonuses = hero.bonuses
        : hero
    ));
  }
}
