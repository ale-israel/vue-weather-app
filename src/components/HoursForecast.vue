<script setup lang="ts">
import SpinnerLoader from '../components/SpinnerLoader.vue'
import { Forecast } from '../services/weather-service.ts'
import { kelvinToCelsius } from '../utils/kelvin-to-celsius.ts'
import { format12HourTime } from '../utils/format-12-hour-time.ts'

defineProps<{
  forecast: Forecast
  loading?: boolean
  error?: string | null
}>()

const getWeatherIconUrl = (icon: string) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}
</script>

<template>
  <div v-if="loading" class="p-4 flex justify-center">
    <SpinnerLoader />
  </div>
  <div v-if="error" class="bg-red-50 rounded p-4 text-red-500">{{ error }}</div>
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
            {{ format12HourTime(result.dt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
