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
  public heroesIdnew: any[] = [];
  public heroes: any[] = [];
  public heroesShow: any[] = [];
  public cardClass: string = 'user-page-hero-list-'
  public heroReadyId: string = '';
  public pageIndex: number = 0;
  public pageSize: number = 3;

   public intelligence: any;
   public strength: number = 5;
   public speed: any;
   public durability: any;
   public power: any;
   public combat: any;

  constructor(
    private router: Router,
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.initialize()
  }
  public initialize(): void {
    if (!localStorage.getItem('session')) {
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

  // public searchHeroes(): void {
  //   for (let id of this.heroesId) {
  //     //this.heroes = []
  //     this.heroesService.getHeroById(id).subscribe((hero: any) => {
  //       this.heroes.push(hero);
  //
  //       if (localStorage.getItem(`userId-${this.user.id}-heroFight`) && this.heroes.length == this.heroesId.length) {
  //         const heroReadyId = JSON.parse(localStorage.getItem(`userId-${this.user.id}-heroFight`) || '')
  //         //console.log('UUUUUUUUUUU', heroReadyId);
  //         let b = this.heroes
  //         b = a(heroReadyId)
  //         function a (heroReadyId: number): any[] {
  //           b.sort((a, b) => a.id - b.id)
  //           return [b.find(el => el.id === heroReadyId)].concat(b.filter(el => el.id != heroReadyId))
  //         }
  //         this.heroes = b
  //       }
  //       else {this.heroes.sort((a, b) => a.id - b.id)}
  //       if (this.heroes.length == this.heroesId.length) {
  //         this.heroesShow = this.showHeroes(this.heroes)
  //         //console.log('Show', this.heroesShow);
  //       }
  //     });
  //
  //   }
  //
  // }

  public searchHeroes(): void {
    if (localStorage.getItem(`userId-${this.user.id}-heroFight`)) {
      const heroReadyId = JSON.parse(localStorage.getItem(`userId-${this.user.id}-heroFight`) || '')
      //console.log('UUUUUUUUUUU', heroReadyId);
      let b = this.heroesId
      //console.log('b', b);
      b = sort(heroReadyId)
      function sort(heroReadyId: number): any[] {
        let c = b.slice(0)
        //console.log('c', c);
        if (c.find(el => el === heroReadyId)) {
          b.sort((a, b) => a - b)
          return [b.find(el => el === heroReadyId)].concat(b.filter(el => el != heroReadyId))
        } else {
          return b.sort((a, b) => a - b)
        }
      }
      this.heroesIdnew = b
      //console.log('heroes:', this.heroes);
    }
    else {this.heroesIdnew.sort((a, b) => a - b)}


    for (let i = this.pageIndex*this.pageSize; i < (this.pageIndex*this.pageSize + this.pageSize); i++) {
      console.log('i', i);
      this.heroesService.getHeroById(this.heroesIdnew[i]).subscribe((hero: any) => {
        this.heroes.push(hero);

        if (localStorage.getItem(`userId-${this.user.id}-heroFight`) && this.heroes.length == this.pageSize) {
          const heroReadyId = JSON.parse(localStorage.getItem(`userId-${this.user.id}-heroFight`) || '')
          //console.log('UUUUUUUUUUU', heroReadyId);
          let b = this.heroes
          b = a(heroReadyId)
          function a (heroReadyId: number): any[] {
            let c = b.slice(0)
            if (c.find(el => el.id === heroReadyId)) {
              b.sort((a, b) => a.id - b.id)
              return [b.find(el => el.id === heroReadyId)].concat(b.filter(el => el.id != heroReadyId))
            }
            else {
              return  b.sort((a, b) => a.id - b.id)
            }

          }
          this.heroes = b
        }
        else {this.heroes.sort((a, b) => a.id - b.id)}

        console.log('this.heroes', this.heroes);
        // if (this.heroes.length == this.heroesId.length) {
        //   this.heroesShow = this.showHeroes(this.heroes)
        //   //console.log('Show', this.heroesShow);
        // }
      });
    }
  }


  public showHeroes(heroes: any) {
    let resultArr: any[] = []
    //let startindex = (Math.trunc(heroes.length / this.pageSize)+1) * ( this.pageIndex + 1) - 1
    let startindex = this.pageIndex*this.pageSize

    resultArr = heroes.filter((el: any, index: any) => index >= startindex && index < startindex + this.pageSize)
    console.log('heroes', heroes.length);
    console.log('resultArr', resultArr);

    return resultArr
  }

  public updateList(): void {
    this.heroes = []
    this.searchHeroes()
  }

  public getPage($event: any): void {
    //console.log(typeof($event), '$event', $event);
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize
    this.heroesId ? this.updateList() : null
  }
}

