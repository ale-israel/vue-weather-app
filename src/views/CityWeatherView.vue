<script setup lang="ts">
import { ref, watch } from 'vue'
import weatherService from '../services/weather-service.ts'
import { getCityData } from '../utils/get-city-data.ts'

const selectedCity = ref('Rio de janeiro')
const loading = ref(false)
const error = ref(null)
const weather = ref(null)
const weatherIconUrl = ref(null)

watch(selectedCity, fetchData(selectedCity))
watch(selectedCity)

async function fetchData(cityName) {
  console.log(cityName)
  error.value = weather.value = null
  loading.value = true

  try {
    const cityData = await getCityData('/cities_20000.csv', selectedCity.value || '')
    if (cityData) {
      const { lat, lon } = cityData
      const data = await weatherService.getCityWeather(lat, lon)
      console.log({ data })
      weather.value = data
      weatherIconUrl.value = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    }
  } catch (err) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page">
    <h1>{{ selectedCity }}</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="current-weather" v-if="weather">
      <h2>
        {{ weather.weather[0].main }}
      </h2>
      <img
        class="icon"
        v-if="weatherIconUrl"
        :src="weatherIconUrl"
        alt="{{weather.weather[0].main}}"
      />
    </div>
  </div>
</template>

<style>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
}

.current-weather {
  display: flex;
  align-items: center;
}

.icon {
  height: 48px;
}
</style>
