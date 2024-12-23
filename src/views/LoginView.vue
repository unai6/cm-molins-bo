<script setup>
import { reactive } from 'vue'

import InputText from 'primevue/inputtext'

const state = reactive({
  email: '',
  password: ''
})
</script>

<template>
    <div class="login-view">
    <InputText v-model="state.email" placeholder="Email" />
    <InputText v-model="state.password" placeholder="Password" />
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
