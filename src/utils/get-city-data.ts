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

export const getCityData = async (csvFileUrl: string, city: string) => {
  const data = (await loadCsv(csvFileUrl)) as City[]

  const cityData = data.find((csvCity) =>
    (csvCity.city_name as string).toLowerCase().includes(city.toLowerCase()),
  )
  console.log(city, cityData)
  return cityData
}
