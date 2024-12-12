<script setup lang="ts">
defineProps<{
  tabs: string[]
  selectedCity: string
  setSelectedCity: (name) => void
}>()
</script>

<template>
  <div class="border-b border-gray-200 flex sm:flex-row space-x-8 mb-8 overflow-x-auto w-full">
    <div v-for="tab in tabs" :key="tab">
      <button
        :class="[
          selectedCity === tab
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
          'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium',
        ]"
        :aria-current="selectedCity === tab ? 'page' : undefined"
        @click="setSelectedCity(tab)"
      >
        {{ tab }}
      </button>
    </div>
  </div>
</template>
