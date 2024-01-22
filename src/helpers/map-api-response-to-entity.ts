import type { Country } from '@/types'

export function mapApiResponseToEntity(country: any) {
  return {
    name: country.name,
    flags: country.flags,
    population: country.population,
    region: country.region,
    capital: country.capital ?? [],
    borders: country.borders ?? [],
    currencies: country.currencies ?? [],
    languages: country.languages ?? [],
    subregion: country.subregion ?? '',
    tld: country.tld
  } satisfies Country
}
