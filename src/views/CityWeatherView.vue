<script setup lang="ts">
import { ref, watch } from 'vue'
import weatherService from '../services/weather-service.ts'
// import { getCityData } from '../utils/get-city-data.ts'

const selectedCity = ref('Rio de Janeiro')
const loading = ref(false)
const error = ref(null)
const weather = ref(null)
// const cityData = await getCityData(cityName)
// if (cityData) {
//   const { lat, lon } = cityData
//   const weather = await getCityForecast(lat, lon)
//   console.log({ weather })
// }

// -22.90278,-43.2075
// export default {
//   data() {
//     return {
//       cityName,
//       weather: null,
//     }
//   },
//   mounted() {
//     weatherService.getCityWeather(-22.90278, -43.2075).then((data) => {
//       console.log(data)
//       this.weather = data
//     })
//   },
// }

watch(selectedCity, fetchData(selectedCity))

async function fetchData(cityName) {
  console.log(cityName)
  error.value = weather.value = null
  loading.value = true

  try {
    const data = await weatherService.getCityWeather(-22.90278, -43.2075)
    console.log({ data })
    weather.value = data
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
    <!-- <div>{{ lat }}{{ lon }}</div> -->
    <div v-if="weather">{{ weather.weather[0].main }}</div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .page {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
