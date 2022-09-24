import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {Router} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCardComponent implements OnInit, OnChanges {
  @Input() hero: any;
  @Input() heroTrue: boolean = false;
  @Input() bonusesFlags!: {
    intelligence: boolean, strength: boolean, speed: boolean, durability: boolean, power: boolean, combat: boolean }
  //bonusesFlags: any
    //Observable<{
    //intelligence: boolean, strength: boolean, speed: boolean, durability: boolean, power: boolean, combat: boolean } >;
  @Input() trigger: boolean = true;
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
  public intelligence: string = '';
  public strength: string = '';
  public speed: string = '';
  public durability: string = '';
  public power: string = '';
  public combat: string = '';
  public intelligenceStat: number = 0;
  public strengthStat: number = 0;
  public speedStat: number = 0;
  public durabilityStat: number = 0;
  public powerStat: number = 0;
  public combatStat: number = 0;
  public intelligenceTemp: number = 0;
  public strengthTemp: number = 0;
  public speedTemp: number = 0;
  public durabilityTemp: number = 0;
  public powerTemp: number = 0;
  public combatTemp: number = 0;


  constructor(
    private router: Router,
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.initializeVar()

    this.intelligenceTemp = +this.hero.powerstats.intelligence
    this.strengthTemp = +this.hero.powerstats.strength
    this.speedTemp = +this.hero.powerstats.speed
    this.durabilityTemp = +this.hero.powerstats.durability
    this.powerTemp = +this.hero.powerstats.power
    this.combatTemp = +this.hero.powerstats.combat
    if (this.hero.powerstats.intelligence == 'null' || !this.hero.powerstats.intelligence) {
      this.intelligenceTemp = 0
    }
    if (this.hero.powerstats.strength == 'null' || !this.hero.powerstats.strength) {
      this.strengthTemp = 0
    }
    if (this.hero.powerstats.speed == 'null' || !this.hero.powerstats.speed) {
      this.speedTemp = 0
    }
    if (this.hero.powerstats.durability == 'null' || !this.hero.powerstats.durability) {
      this.durabilityTemp = 0
    }
    if (this.hero.powerstats.power == 'null' || !this.hero.powerstats.power) {
      this.powerTemp = 0
    }
    if (this.hero.powerstats.combat == 'null' || !this.hero.powerstats.combat) {
      this.combatTemp = 0
    }
    this.intelligenceStat = this.intelligenceTemp
    this.strengthStat = this.strengthTemp
    this.speedStat = this.speedTemp
    this.durabilityStat = this.durabilityTemp
    this.powerStat = this.powerTemp
    this.combatStat = this.combatTemp
  }

  ngOnChanges(changes: SimpleChanges): void {
    //let a = this.bonusesFlags.subscribe((obj) => !obj.intelligence ? this.intelligenceSpan = 'green' : null)
    //!this.bonusesFlags.intelligence ? this.intelligenceSpan = 'green' : null
    //console.log(changes.trigger.currentValue);
    if (this.heroTrue) {
      if (!this.bonusesFlags.intelligence) {
        this.intelligence = 'green'
        this.intelligenceStat = this.intelligenceTemp + 10
      } else {
        this.intelligence = ''
        this.intelligenceStat = this.intelligenceTemp
      }
      if (!this.bonusesFlags.strength) {
        this.strength = 'green'
        this.strengthStat = this.strengthTemp + 10
      } else {
        this.strength = ''
        this.strengthStat = this.strengthTemp
      }
      if (!this.bonusesFlags.speed) {
        this.speed = 'green'
        this.speedStat = this.speedTemp + 10
      } else {
        this.speed = ''
        this.speedStat = this.speedTemp
      }
      if (!this.bonusesFlags.durability) {
        this.durability = 'green'
        this.durabilityStat = this.durabilityTemp + 10
      } else {
        this.durability = ''
        this.durabilityStat = this.durabilityTemp
      }
      if (!this.bonusesFlags.power) {
        this.power = 'green'
        this.powerStat = this.powerTemp + 10
      } else {
        this.power = ''
        this.powerStat = this.powerTemp
      }
      if (!this.bonusesFlags.combat) {
        this.combat = 'green'
        this.combatStat = this.combatTemp + 10
      } else {
        this.combat = ''
        this.combatStat = this.combatTemp
      }
    }
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
