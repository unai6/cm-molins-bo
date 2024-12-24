<script setup>
import { ref } from 'vue'

import Avatar from 'primevue/avatar'

const selectedLink = ref()

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
    :class="{ 'app-navbar__link--active': navElement.route.name === $route.name }"
    @click="selectedLink = navElement.route.name"
    >
    {{ navElement.label }}
  </RouterLink>
  <Avatar label="P" size="large" class="app-navbar__avatar" />
  </div>
</template>

<style lang="scss">
.app-navbar {
  display: flex;
  flex-direction: column;

  width: fit-content;
  height: 100vh;

  background-color: tokens.$color-neutral-white;

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

  &__avatar {
    margin-inline: auto;
    margin-top: auto;
    margin-bottom: tokens.$spacer;
  }
}
</style>