<script setup>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'

import FormCreateInvestee from '@/components/FormCreateInvestee.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

import { useInvesteesStore } from '@/stores/investees'

const investeesStore = useInvesteesStore()
const { investees } =  storeToRefs(investeesStore)

const state = reactive({
  isCreatingInvestee: false,
})

async function fetchInvestees () {
  try {
    await investeesStore.fetchInvestees()
  } catch (err) {
    console.error(err)
  }
}

 fetchInvestees()
</script>

<template>
  <div class="investee-view">
    <h1 class="investee-view__title">
      Participadas
    </h1>
    <Dialog v-model:visible="state.isCreatingInvestee" class="investee-view__dialog">
      <FormCreateInvestee />
    </Dialog>
    <div class="investee-view__content">
      <Button @click="state.isCreatingInvestee = true" label="Crear participada" />
      <DataTable v-if="investees?.length > 0" :value="investees">
        <Column field="name" header="Nombre" />
        <Column field="type" header="Categoría" />
        <Column field="investedAt" header="Fecha de inversión" />
        <Column field="disinvestedAt" header="Fecha de desinversión" />
        <Column field="websiteUrl" header="URL web" />
        <Column field="headquarters" header="Sede" />
        <Column field="description.es" header="Descripción" />
        <Column field="description.ca" header="Descripción" />
        <Column field="description.en" header="Descripción" />
      </DataTable>
    </div>
  </div>
</template>

<style lang="scss">
.investee-view {
  display: flex;
  flex-direction: column;
  gap: tokens.$spacer-double;

  width: 100%;

  padding: tokens.$spacer;

  &__title {
    font-size: functions.ms(2);
    line-height: tokens.$font-lineheight-medium;
    font-weight: tokens.$font-weight-bold;
    color: tokens.$color-opacities-darkest;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: tokens.$spacer-double;
    align-items: flex-start;

    padding: tokens.$spacer;

    border-radius: tokens.$border-radius-md;

    background-color: tokens.$color-neutral-white;
  }

  &__dialog {
    width: 50vw;
  }
}
</style>