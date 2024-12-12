<script setup lang="ts">
import { Forecast } from '../services/weather-service.ts'
import { kelvinToCelsius } from '../utils/kelvin-to-celsius.ts'

defineProps<{
  forecast: Forecast
  loading?: boolean
}>()

const getWeatherIconUrl = (icon: string) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}
</script>

<script lang="ts">
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const format12Hours = hours % 12 ? hours % 12 : 12

  return `${format12Hours}:${minutes} ${ampm}`
}
</script>

<template>
  <div v-if="loading">Loading..</div>
  <div v-if="forecast" class="flex flex-col">
    <div class="w-full justify-start">
      <h3 class="text-base font-normal text-gray-800">Next hours</h3>
    </div>
    <div class="flex flex-row overflow-x-auto gap-x-8 max-w-md py-8">
      <div v-for="result in forecast.list.slice(0, 5)" :key="result.dt">
        <div class="w-24 mx-auto flex flex-col items-center">
          <div class="flex flex-row gap-x-0">
            <div>{{ kelvinToCelsius(result.main.temp) }}</div>
            <div>ºC</div>
          </div>
          <div>
            <span class="text-blue-300">{{ result.rain ? result.rain['3h'] * 100 : 0 }} %</span>
          </div>
          <div>
            <img
              class="w-16 h-16"
              v-if="getWeatherIconUrl(result.weather[0].icon)"
              :src="getWeatherIconUrl(result.weather[0].icon)"
              alt="{{result.weather[0].main}}"
            />
          </div>
          <div class="flex">
            {{ formatTime(result.dt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
