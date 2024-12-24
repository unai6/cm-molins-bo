<script setup>
import { useRouter } from 'vue-router'

import Button from 'primevue/button'
import Avatar from 'primevue/avatar'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const router = useRouter()

async function logout () {
  authStore.logout()

  await router.push({ name: 'login' })
}
</script>

<template>
  <div class="dashboard-view">
  </div>
</template>

<style lang="scss">
.dashboard-view {
  display: flex;
  flex-direction: column;
  height: 100vh;

  background-color: tokens.$color-primary-lightest;
}
</style>