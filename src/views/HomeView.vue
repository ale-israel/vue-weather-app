<script setup lang="ts">
import { ref, watch } from 'vue'
import TabsMenu from '../components/TabsMenu.vue'
import CurrentWeather from '../components/CurrentWeather.vue'
import HoursForecast from '../components/HoursForecast.vue'
import weatherService, { Forecast } from '../services/weather-service.ts'
import { getCityData } from '../utils/get-city-data.ts'

const cityTabs = ref(['Rio de Janeiro', 'Beijing', 'Los Angeles'])

const selectedCity = ref(null)
const updatedAt = ref(new Date())

const cityData = ref(null)

const weatherLoading = ref(false)
const weatherError = ref(null)
const weather = ref(null)

const forecastLoading = ref(false)
const forecastError = ref(null)
const forecast = ref<Forecast | null>(null)

const weatherIconUrl = ref(null)

const setSelectedCity = (newCityValue) => {
  selectedCity.value = newCityValue
}

const setCityData = async () => {
  const cityDataValue = await getCityData('/cities_20000.csv', selectedCity.value || '')
  cityData.value = cityDataValue
}

const fetchCurrentWeatherData = async () => {
  weatherError.value = weather.value = null
  weatherLoading.value = true

  try {
    if (cityData.value) {
      const { lat, lon } = cityData.value
      const data = await weatherService.getCityWeather(lat, lon)
      weather.value = data
      weatherIconUrl.value = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      updatedAt.value = new Date()
    }
  } catch (err) {
    weatherError.value = err.toString()
  } finally {
    weatherLoading.value = false
  }
}

const fetchWeatherForecastData = async () => {
  forecastError.value = forecast.value = null
  forecastLoading.value = true

  try {
    const cityData = await getCityData('/cities_20000.csv', selectedCity.value || '')
    if (cityData) {
      const { lat, lon } = cityData
      const data = await weatherService.getCityForecast(lat, lon)
      forecast.value = data
      updatedAt.value = new Date()
    }
  } catch (err) {
    forecastError.value = err.toString()
  } finally {
    forecastLoading.value = false
  }
}

setSelectedCity(cityTabs.value[0])
watch(selectedCity, () => setCityData(selectedCity), { immediate: true })
watch(cityData, () => fetchCurrentWeatherData(), { immediate: true })
watch(cityData, () => fetchWeatherForecastData(), { immediate: true })
</script>

<template>
  <div class="p-12 flex flex-col justify-start items-center rounded max-w-md mx-auto bg-blue-50">
    <TabsMenu :tabs="cityTabs" :selectedCity="selectedCity" :setSelectedCity="setSelectedCity" />

    <div class="p-4 w-full bg-white rounded">
      <h1 class="text-2xl font-medium mb-2 w-full text-center">{{ selectedCity }}</h1>
      <CurrentWeather :weather="weather" :loading="weatherLoading" :error="weatherError" />
    </div>

    <div class="w-full my-2" />

    <div class="p-4 w-full bg-white rounded">
      <HoursForecast :forecast="forecast" :loading="forecastLoading" :error="forecastError" />
    </div>

    <div class="mt-12 -mb-8 flex flex-row justify-end text-xs w-full text-blue-400">
      Updated at: {{ updatedAt.toLocaleString() }}
    </div>
  </div>
</template>
