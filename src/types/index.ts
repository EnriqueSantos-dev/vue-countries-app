export interface Country {
  name: {
    common: string
    official: string
  }
  region: string
  capital: string[]
  population: number
  flags: {
    alt: string
    svg: string
    png: string
  }
  subregion: string
  languages: {
    [key: string]: string
  }
  borders: string[]
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  tld: string
}
