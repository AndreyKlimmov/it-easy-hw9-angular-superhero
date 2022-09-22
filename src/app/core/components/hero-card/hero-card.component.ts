import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";

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
  @Input() page: string = ''
  @Input() atUserPage: boolean = false;
  @Output() updateCardEvent: EventEmitter<void> = new EventEmitter<void>()
  public select: string = 'Select';
  public gotReady: boolean = false;
  public heroList: any[] = [];
  public heroReadyId: string = '';
  public user: any;


  constructor(
    private router: Router,
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.initializeVar()
    //console.log('hero:', this.hero);
  }

  private initializeVar(): void {

    this.getReady ? this.select = 'Get Ready' : this.select

    if (localStorage.getItem('session')) {
      this.user = JSON.parse(localStorage.getItem('session') || '')
    }
    if (localStorage.getItem(`userId-${this.user.id}-heroList`)) {
      this.heroList = JSON.parse(localStorage.getItem(`userId-${this.user.id}-heroList`) || '')
      const hero = this.heroList.find(
        (heroId: any) => heroId.id === this.hero.id);
      if (hero && !this.atUserPage) {
        this.disableSelectBtn == 'hideBtn' ? this.disableSelectBtn = 'hideBtn' : this.disableSelectBtn = 'selectedHero'
      }
    }
    if (localStorage.getItem(`userId-${this.user.id}-heroFight`) && this.getReady) {
      this.heroReadyId = JSON.parse(localStorage.getItem(`userId-${this.user.id}-heroFight`) || '')
      if (this.heroReadyId == this.hero.id) {
        this.disableSelectBtn == 'hideBtn' ? this.disableSelectBtn = 'hideBtn' : this.disableSelectBtn = 'readyHero';
        this.select = 'Ready'
      }
      else {
        this.disableSelectBtn == 'hideBtn' ? this.disableSelectBtn = 'hideBtn' : this.disableSelectBtn = '';
        this.select = 'Get Ready'}
    }


  }

  public selectHero(): void {
    this.updateCardEvent.emit()
    if (!this.atUserPage) {
      if (this.disableSelectBtn !== 'selectedHero') {
        if (localStorage.getItem(`userId-${this.user.id}-heroList`) || '') {
          this.heroList = JSON.parse(localStorage.getItem(`userId-${this.user.id}-heroList`) || '')
        }
        this.hero.bonuses = {intelligence: 5, strength: 5, speed: 5, durability: 5, power: 5, combat: 5}
        this.heroList.push(this.hero)
        localStorage.setItem(`userId-${this.user.id}-heroList`, JSON.stringify(this.heroList))
        this.disableSelectBtn = 'selectedHero'
      }
    }
    else {
      localStorage.setItem(`userId-${this.user.id}-heroFight`, JSON.stringify(this.hero.id))
      this.heroesService.readyId.next(this.hero.id)
      //this.currentId = this.hero.id
      //this.disableSelectBtn = 'readyHero'
      //this.select = 'Ready'
    }
  }

  public navToHeroDetailsPage(hero: any): void {
    if (hero.id) {
      this.router.navigate(['/hero-details', hero.id])
    }
  }
}
