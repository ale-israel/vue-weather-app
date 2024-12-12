<script setup lang="ts">
import { ref, watch } from 'vue'
import { Weather } from '../services/weather-service.ts'

const props = defineProps<{
  weather: Weather
}>()

const weatherIconUrl = ref(null)

const setWeatherIconUrl = () => {
  weatherIconUrl.value = `https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`
}

watch(props.weather, () => setWeatherIconUrl(props.weather), { immediate: true })
</script>

<template>
  <div class="flex flex-row items-center justify-center" v-if="weather">
    <h2 class="text-lg font-normal text-gray-800">
      {{ weather.weather[0].main }}
    </h2>
    <img
      class="w-16 h-16"
      v-if="weatherIconUrl"
      :src="weatherIconUrl"
      alt="{{weather.weather[0].main}}"
    />
  </div>
</template>
