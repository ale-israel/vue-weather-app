<script setup lang="ts">
import { Weather } from '../services/weather-service.ts'
import { kelvinToCelsius } from '../utils/kelvin-to-celsius.ts'

defineProps<{
  weather?: Weather | null
}>()

const getWeatherIconUrl = (icon: string) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}
</script>

<template>
  <div class="w-24 mx-auto flex flex-col items-center">
    <div>
      <div class="flex flex-row items-center justify-center" v-if="weather">
        <img
          class="w-24 h-24"
          v-if="getWeatherIconUrl(weather.weather[0].icon)"
          :src="getWeatherIconUrl(weather.weather[0].icon)"
          alt="{{weather.weather[0].main}}"
        />
      </div>
    </div>
    <div class="flex flex-row gap-x-0">
      <div>{{ kelvinToCelsius(weather.main.temp) }}</div>
      <div>ºC</div>
    </div>
    <div>
      <span class="text-blue-300">{{ weather.rain ? weather.rain['3h'] * 100 : 0 }} %</span>
    </div>
  </div>
</template>
