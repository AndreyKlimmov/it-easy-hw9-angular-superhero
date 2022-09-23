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
  public bonusesFlags: any = {intelligence: true, strength: true, speed: true, durability: true, power: true, combat: true};
  public bonusesSum: any = {intelligence: 0, strength: 0, speed: 0, durability: 0, power: 0, combat: 0};
  public user: any;
  public hero: any;
  public heroDiv: boolean = false;
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
  public counterOpp: number = 0;
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
        this.heroDiv = true
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

  public navToPage(pagePath: any): void {
    this.router.navigate(['/' + pagePath])
  }

  public updateList(): void {

  }

  public findOpponent(): void {
    this.counterOpp = 0
    //this.searchOpponentBtn = 'disabled'
    this.showOpponent = ''
    this.showOpponentCard = 'hidden'
    this.searchOpponentBtn = 'inactive'
    this.searchOpponentBonuses = 'disabled'

    if (Math.floor(Math.random() * 733)) {
      this.getHeroById = this.heroesService.getHeroById(`${Math.floor(Math.random() * 733)}`)
        .subscribe((hero: any) => {
          this.opponent = hero;
          if (this.countOpponent() == NaN) {
            this.counterOpp = 0
          } else {
            this.counterOpp += this.countOpponent()
          }

        console.log('opponent', this.test1++);})
    } else {
      this.findOpponent()
    }

    const timerFight = timer(1000,1000);
    this.timerSpinnerSearch = timerFight.pipe(take(3)).subscribe((count: number) =>
      {
        if (count == 2) {
          this.showOpponentCard = '';
          this.searchText = 'disabled'
          this.fightSwordsImg = ''
          this.stopSearchBtn = 'hidden'
          console.log('first');
        }
      });
    this.timerSpinnerFight = timerFight.pipe(take(5)).subscribe((count: number) => {
      if (count == 4) {
        this.fightSwordsImg = 'disabled'
        this.spinnerImg = 'disabled'
        this.resultText = ''
        //this.fightResultText = 'WIN'
        //this.colorText = 'green'
        console.log('second');
        if (!this.counterOpp) {
          this.fightResultText = 'Try again'
          this.colorText = 'red'
          this.unSetBonus()
          this.resetSum()
          this.setBonusesFlags(true)
        } else {
          if (this.countHero() >= this.counterOpp) {
            this.fightResultText = 'WIN'
            this.colorText = 'green'
            console.log('WIN');
            this.updateHeroBonuses()
            this.setBonusesFlags(true)
            this.resetSum()
            //localStorage.setItem(`userId-${this.user.id}-heroList`, JSON.stringify(this.heroList))
          } else {
            this.fightResultText = 'LOOSE'
            this.colorText = 'red'
            //this.setBonusesFlags(true)
            console.log('LOOSE');
          }
        }


      }
    });
    this.timerResult = timerFight.pipe(take(8)).subscribe((count: number) => {
      if (count == 7) {
        this.searchOpponentBtn = ''
        if (localStorage.getItem(`userId-${this.user.id}-heroFight`) && this.fightResultText == 'LOOSE') {
          localStorage.removeItem(`userId-${this.user.id}-heroFight`)
          const heroList = this.heroList.filter((hero) => (hero.id !== this.hero.id));
          this.heroList = heroList
          //localStorage.removeItem(`userId-${this.user.id}-heroList`)
          localStorage.setItem(`userId-${this.user.id}-heroList`, JSON.stringify(this.heroList))
          this.showText = true
          this.heroDiv = false
        }

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
    this.unSetBonus()
  }

  public applyBonus(bonus: string): void {
    if (true) {
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
    }

  }

  public setBonus(bonus: string): void {
    const heroList = this.heroList.map((hero) => {
        if (hero.id == this.hero.id) {
          if (hero.bonuses[bonus] > 0 && hero.bonuses[bonus] < 6 && this.bonusesFlags[bonus] == true) {
            hero.bonuses[bonus]--
            this.bonusesSum[bonus] += 10
            this.bonusesFlags[bonus] = false
            console.log('set this.bonuses', this.bonuses);
            console.log('set this.bonusesSum', this.bonusesSum);
          }
        }
      }

    );
    this.updateBonuses()
    //console.log('this.heroList', this.heroList);
  }

  public unSetBonus(): void {
     const heroList = this.heroList.map((hero) => {
        if (hero.id == this.hero.id) {
          for (let bonus in hero.bonuses) {
            console.log('unset bonus', bonus);
            if (hero.bonuses[bonus] >= 0 && hero.bonuses[bonus] < 5 && this.bonusesFlags[bonus] == false) {
              hero.bonuses[bonus]++
              this.bonusesSum[bonus] -= 10
              this.bonusesFlags[bonus] = true

              console.log('unset this.bonusesSum', this.bonusesSum);
            }
         }
        }
     }

    );
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

  public updateHeroBonuses(): void {
    const heroList = this.heroList.map((hero) => (
      hero.id === this.heroReadyId
        ? hero.bonuses = this.bonuses
        : hero
    ));
    localStorage.setItem(`userId-${this.user.id}-heroList`, JSON.stringify(this.heroList))
  }

  public setBonusesFlags(bool: boolean): void {
    this.bonusesFlags.intelligence = bool;
    this.bonusesFlags.strength = bool;
    this.bonusesFlags.speed = bool;
    this.bonusesFlags.durability = bool;
    this.bonusesFlags.power = bool;
    this.bonusesFlags.combat = bool;
  }

  public countOpponent() {
    let sum = 0;
    for (let key in this.opponent.powerstats) {
      if (this.opponent.powerstats[key] !== 'null') {
        sum += +this.opponent.powerstats[key];
      }
      //console.log('key', key);
      //console.log('this.opponent.powerstats[key]', this.opponent.powerstats[key]);
    }
    console.log('sumOpp', sum);
    return sum;
  }

  public countHero() {
    let sum = 0;
    for (let key in this.hero.powerstats) {
      sum += +this.hero.powerstats[key];
    }
    console.log('sumHero', sum);
    for (let key in this.bonusesSum) {
      !this.bonusesFlags[key] ?
      sum += this.bonusesSum[key] : null
      //console.log('key', key);
      //console.log('this.opponent.powerstats[key]', this.hero.powerstats[key]);
    }
    console.log('sumHero+Bonuses', sum);
    return sum;
  }

  public resetSum(): void {
    for (let key in this.bonusesSum) {
      this.bonusesSum[key] = 0
    }
  }






}
