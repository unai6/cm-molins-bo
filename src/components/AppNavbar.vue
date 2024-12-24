<script setup>
import { ref } from 'vue'

const selectedLink = ref('dashboard')

const navElements = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    route: { name: 'dashboard' }
  },
  {
    id: 'investees',
    label: 'Participadas',
    route: { name: 'investees' }
  }
]
</script>

<template>
  <div class="app-navbar">
    <RouterLink
      v-for="navElement in navElements" 
      :key="navElement.label" 
      :to="navElement.route"
      class="app-navbar__link"
      :class="{ 'app-navbar__link--active': selectedLink === navElement.id }"
      @click="selectedLink = navElement.id"
    >
      {{ navElement.label }}
  </RouterLink>
  </div>
</template>

<style lang="scss">
.app-navbar {
  display: flex;
  flex-direction: column;

  width: fit-content;
  height: 100vh;

  background-color: tokens.$color-primary-lightest;

  cursor: pointer;
  
  &__link {
    padding: tokens.$spacer;
    
    color: tokens.$color-primary;
    text-decoration: none;
    
    &--active {
      background-color: tokens.$color-primary;
      color: tokens.$color-neutral-white;
    }
  }
}
</style>