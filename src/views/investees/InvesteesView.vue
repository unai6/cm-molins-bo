<script setup>
import { reactive } from 'vue'

import FormCreateInvestee from '@/components/FormCreateInvestee.vue'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

const state = reactive({
  isCreatingInvestee: false,
})
</script>

<template>
  <div class="investee-view">
    <Dialog v-model:visible="state.isCreatingInvestee" class="investee-view__dialog">
      <FormCreateInvestee />
    </Dialog>
    <div class="investee-view__content">
      <Button @click="state.isCreatingInvestee = true" label="Crear participada" />
    </div>
  </div>
</template>

<style lang="scss">
.investee-view {
  width: 100%;

  padding: tokens.$spacer;

  background-color: tokens.$color-primary-lightest;

  &__dialog {
    width: 50vw;
  }
}
</style>