const { WEATHER_API_URL, WEATHER_API_ACCESS_KEY } = process.env

interface Weather {
  coord: {
    lon: number
    lat: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
    gust: number
  }
  rain?: {
    '1h': number
  }
  snow?: {
    '1h': number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

interface Forecast {
  cod: string
  message: number
  cnt: number
  list: {
    dt: number
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      sea_level: number
      grnd_level: number
      humidity: number
      temp_kf: number
    }
    weather: {
      id: number
      main: string
      description: string
      icon: string
    }[]
    clouds: {
      all: number
    }
    wind: {
      speed: number
      deg: number
      gust: number
    }
    visibility: number
    pop: number
    rain?: {
      '3h': number
    }
    snow?: {
      '3h': number
    }
    sys: {
      pod: 'd' | 'n'
    }
    dt_txt: string
  }[]
  city: {
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}

export const getCityWeather = async (lat: string | number, long: string | number) => {
  try {
    const url = `${WEATHER_API_URL}/data/2.5/weather` || ''
    const params = new URLSearchParams(`lat=${lat}&lon=${long}&appid=${WEATHER_API_ACCESS_KEY}`)
    const response = await fetch(`${url}?${params}`)

    if (!response.ok) {
      const errorResponse = await response.json()
      throw new Error(`Request failed with code ${response.status}: ${errorResponse.message}`)
    }

    const data = (await response.json()) as Weather
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getCityForecast = async (lat: string | number, long: string | number) => {
  try {
    const url = `${WEATHER_API_URL}/data/2.5/forecast` || ''
    const params = new URLSearchParams(`lat=${lat}&lon=${long}&appid=${WEATHER_API_ACCESS_KEY}`)
    const response = await fetch(`${url}?${params}`)

    if (!response.ok) {
      const errorResponse = await response.json()
      throw new Error(`Request failed with code ${response.status}: ${errorResponse.message}`)
    }

    const data = (await response.json()) as Forecast
    return data
  } catch (error) {
    console.error(error)
  }
}

const weatherService = {
  getCityWeather,
  getCityForecast,
}

export default weatherService
