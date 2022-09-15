export interface HeroesResponseInterfaces {
  response: string;
  results: any[];
  'results-for': string;
}
export interface HeroResponseInterfaces {
  response: string;
  id: string;
  name: string;
  powerstats: object;
  biography: object;
  appearance: object;
  work: object;
  connections: object;
  image: object
}

