<script setup>
import { useRouter } from 'vue-router'

import Button from 'primevue/button'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const router = useRouter()

async function logout () {
  authStore.logout()

  await router.push({ name: 'login' })
}
</script>

<template>
  <Button @click="logout()">Logout</Button>
</template>