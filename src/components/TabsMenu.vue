<script setup lang="ts">
defineProps<{
  tabs: string[]
  setSelectedCity: (name) => void
}>()
</script>

<template>
  <div class="tabs">
    <div v-for="tab in tabs" :key="tab">
      <button class="tab" @click="setSelectedCity(tab)">{{ tab }}</button>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  flex-direction: row;
  column-gap: 12px;
  margin-bottom: 24px;
}
</style>
