import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {
  @Input() hero: any;
  @Input() disableViewBtn: string = '';
  @Input() disableSelectBtn: string = '';
  @Input() disableName: string = '';
  @Input() getReady: boolean = false;
  public select: string = 'Select';
  public gotReady: boolean = false;
  public heroList: any[] = [];
  public user: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeVar()
    console.log('hero:', this.hero);
  }

  private initializeVar(): void {
    this.getReady ? this.select = 'Get Ready' : this.select

    if (localStorage.getItem('session')) {
      this.user = JSON.parse(localStorage.getItem('session') || '')
    }
    if (localStorage.getItem(`${this.user.email}`)) {
      this.heroList = JSON.parse(localStorage.getItem(`${this.user.email}`) || '')
      const hero = this.heroList.find(
        (heroId: any) => heroId === this.hero.id);
      if (hero) {this.disableSelectBtn = 'selectedHero'}
    }
  }

  public selectHero(): void {

    if (this.disableSelectBtn !== 'selectedHero') {
      if (localStorage.getItem(`${this.user.email}`) || '') {
        this.heroList = JSON.parse(localStorage.getItem(`${this.user.email}`) || '')
      }

      this.heroList.push(this.hero.id)
      localStorage.setItem(`${this.user.email}`, JSON.stringify(this.heroList))
      this.disableSelectBtn = 'selectedHero'
    }



  }

  public navToHeroDetailsPage(hero: any): void {
    if (hero.id) {
      this.router.navigate(['/hero-details', hero.id])
    }
  }
}
