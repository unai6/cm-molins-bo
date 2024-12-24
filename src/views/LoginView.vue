<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

const authStore = useAuthStore()

const router = useRouter()

const state = reactive({
  email: '',
  password: ''
})

async function login () {
  await authStore.login({ email: state.email, password: state.password })
  await router.push({ name: 'home' })
}
</script>

<template>
    <div class="login-view">
      <InputText v-model="state.email" placeholder="Email" />
      <Password v-model="state.password" placeholder="Password" />

      <Button @click="login({ email: state.email, password: state.password })">Login</Button>
    </div>
</template>

<style lang="scss">
.login-view {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: tokens.$spacer;

  height: 100vh;
}
</style>
