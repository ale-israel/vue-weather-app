<script setup lang="ts">
import { ref, watch } from 'vue'
import TabsMenu from '../components/TabsMenu.vue'
import CurrentWeather from '../components/CurrentWeather.vue'
import weatherService from '../services/weather-service.ts'
import { getCityData } from '../utils/get-city-data.ts'

const cityTabs = ref(['Rio de Janeiro', 'Beijing', 'Los Angeles'])

const selectedCity = ref(null)
const loading = ref(false)
const error = ref(null)
const weather = ref(null)
const weatherIconUrl = ref(null)

const setSelectedCity = (newCityValue) => {
  selectedCity.value = newCityValue
}

const fetchCurrentWeatherData = async () => {
  error.value = weather.value = null
  loading.value = true

  try {
    const cityData = await getCityData('/cities_20000.csv', selectedCity.value || '')
    if (cityData) {
      const { lat, lon } = cityData
      const data = await weatherService.getCityWeather(lat, lon)
      weather.value = data
      weatherIconUrl.value = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    }
  } catch (err) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}

setSelectedCity(cityTabs.value[0])
watch(selectedCity, () => fetchCurrentWeatherData(selectedCity), { immediate: true })
</script>

<template>
  <div class="p-12 flex flex-col justify-start items-center max-w-md mx-auto bg-blue-50">
    <TabsMenu :tabs="cityTabs" :selectedCity="selectedCity" :setSelectedCity="setSelectedCity" />
    <h1 class="text-2xl font-medium mb-8 w-full text-center">{{ selectedCity }}</h1>
    <div v-if="loading" class="p-4">Loading...</div>
    <div v-if="error" class="bg-red-50 rounded p-4 text-red-500">{{ error }}</div>
    <CurrentWeather :weather="weather" />
  </div>
</template>
