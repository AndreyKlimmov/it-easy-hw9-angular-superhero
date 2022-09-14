import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HeroesResponseInterfaces} from "../interfaces/http-interfaces";

@Injectable({
  providedIn: 'root'
})

export class HeroesService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public getHeroes(heroName: string): Observable<HeroesResponseInterfaces> {
    return this.httpClient.get<HeroesResponseInterfaces>(`https://www.superheroapi.com/api.php/788682412583063/search/${heroName}`)
  }

}
