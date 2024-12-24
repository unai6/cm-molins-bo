<script setup>
import AppNavbar from '@/components/AppNavbar.vue'

</script>

<template>
  <div class="app">
    <AppNavbar />
    <RouterView />
  </div>
</template>

<style lang="scss">
.app {
  display: flex;
  gap: tokens.$spacer;

  background-color: tokens.$color-primary-lightest;
}
</style>