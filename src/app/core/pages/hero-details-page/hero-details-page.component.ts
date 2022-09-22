import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-hero-details-page',
  templateUrl: './hero-details-page.component.html',
  styleUrls: ['./hero-details-page.component.scss']
})
export class HeroDetailsPageComponent implements OnInit {
  public allowedShowPage: boolean = false;
  public authUser: any = {'name': 'Log in'};
  public hero: any;
  public details!: any[];
  public cardClass: string = 'hero-details-page-'

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  private initializeForm(): void {
    if (!localStorage.getItem('session')) {
      this.router.navigate(['/login'])
    } else {this.allowedShowPage = true}
    this.activatedRoute.params.pipe(
      switchMap((gotHero) =>
          this.heroesService.getHeroById(gotHero.id)
      )
    ).subscribe(hero => this.hero = hero);
  }

  public navToPage(pagePath: any): void {
    this.router.navigate(['/' + pagePath])
  }



  public transformDetails(a: string) {
    const arrayDetails = []
    function capitalizeFirstLetter(str: any) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function removePyphen(string: any) {
      const b = [...string]
      const a = b.map(function(el) {if (el == '-') {return el = ' '} else {return el = el}})
      return a.join('')
    }
    function arrayToString (value: any) {
      if (Array.isArray(value)) {
        const a = [...value]
        return a.join(', ')
      } else {return value}
    }
    for (const [key, value] of Object.entries(a)) {
      const newKey = capitalizeFirstLetter(key)
      const newKey2 = removePyphen(newKey)
      const newValue = arrayToString (value)
      arrayDetails.push(newKey2 + ': ' + newValue);
    }
    return this.details = arrayDetails
  }



}
