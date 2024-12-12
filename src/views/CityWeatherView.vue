<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import TabsMenu from '../components/TabsMenu.vue'
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

const fetchCurrentWeatherData = async (cityName) => {
  console.log(cityName)
  error.value = weather.value = null
  loading.value = true

  try {
    console.log(selectedCity.value)
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

setSelectedCity(cityTabs.value[0])
watchEffect(() => fetchCurrentWeatherData(cityTabs.value[0]))
watch(selectedCity, () => fetchCurrentWeatherData(selectedCity))
</script>

<template>
  <div class="page">
    <TabsMenu :tabs="cityTabs" :setSelectedCity="setSelectedCity" />
    <h1 class="title">{{ selectedCity }}</h1>
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

.title {
  margin-bottom: 12px;
}

.current-weather {
  background: white;
  color: black;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
}

.icon {
  height: 48px;
}
</style>
