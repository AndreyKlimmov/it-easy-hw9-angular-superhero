import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HeroesResponseInterfaces, HeroResponseInterfaces} from "../interfaces/http-interfaces";

@Injectable({
  providedIn: 'root'
})

export class HeroesService {
  public readyId = new Subject()

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public getHeroes(heroName: string): Observable<HeroesResponseInterfaces> {
    return this.httpClient.get<HeroesResponseInterfaces>
    (`https://www.superheroapi.com/api.php/788682412583063/search/${heroName}`)
  }

  public getHeroById(heroId: string): Observable<HeroResponseInterfaces> {
    return this.httpClient.get<HeroResponseInterfaces>
    (`https://www.superheroapi.com/api.php/788682412583063/${heroId}`)
  }


  // public getAddedHeroes(heroesId: any) {
  //   const heroesAdded: any[] = []
  //   for (let heroId in heroesId) {
  //     const heroAdded = this.httpClient.get<HeroResponseInterfaces>
  //     (`https://www.superheroapi.com/api.php/788682412583063/${heroId}`)
  //     heroesAdded.push(heroAdded)
  //     console.log('heroesId:', heroesId);
  //     console.log('heroesAdded:', heroesAdded);
  //   }
  //   return heroesAdded
  // }

}
