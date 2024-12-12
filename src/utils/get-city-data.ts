import { loadCsv } from './load-csv'

interface City {
  city_id: string
  city_name: string
  state_code: string
  country_code: string
  country_full: string
  lat: string
  lon: string
}

export const getCityData = async (city: string) => {
  const csvFilePath = 'src/assets/cities_20000.csv'
  const data = (await loadCsv(csvFilePath)) as City[]

  const cityData = data.find(
    (csvCity) => (csvCity.city_name as string).toLowerCase() === city.toLowerCase(),
  )
  return cityData
}
