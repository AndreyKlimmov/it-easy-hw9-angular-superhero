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

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log('hero:', this.hero);
  }

  public navToPage(pagePath: any): void {
    this.router.navigate(['/' + pagePath])
  }

  public navToHeroDetailsPage(hero: any): void {
    if (hero.id) {
      this.router.navigate(['/hero-details', hero.id])
    }
  }
}
