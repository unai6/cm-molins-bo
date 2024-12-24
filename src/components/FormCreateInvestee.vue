<script setup>
import { useTemplateRef, ref } from 'vue'

import FileUpload from 'primevue/fileupload'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import PrimeButton from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'

import ApiService from '@/services/apiService'
import apiEndpoints from '@/services/apiEndpoints'

import { useInvesteesAdditionStore } from '@/stores/investeesAddition'
import { storeToRefs } from 'pinia'

import config from '@/config'

const investeesAdditionStore = useInvesteesAdditionStore()
const { investee } = storeToRefs(investeesAdditionStore)

const fileuploadRef = useTemplateRef('fileuploadRef')

const availableTypes = config.availableInvesteeTypes

async function createInvestee () {
  const formData = new FormData()

  formData.append('investeeData', JSON.stringify(investee.value))
  formData.append('investeeFile', fileuploadRef.value.files[0])

  await ApiService.post(apiEndpoints.investees._, formData, {
    headers: {
     'Content-Type': 'multipart/form-data'
    },
  })
}

async function deleteInvestee (id) {
  await ApiService.delete(apiEndpoints.investees.id(id))
}
</script>

<template>
  <div class="form-create-investee">
    <FileUpload
      ref="fileuploadRef"
      chooseLabel="Escoger"
      mode="basic"
      accept="image/*"
    />
    <div class="form-create-investee__section">
      <InputText v-model="investee.name" placeholder="Nombre" />
      <Select v-model="investee.type" placeholder="Tipo" />
      <InputText v-model="investee.headquarters" placeholder="Sede" />
    </div>
    <div class="form-create-investee__section">
      <DatePicker v-model="investee.investedAt" placeholder="Año inversión" />
      <DatePicker v-model="investee.disinvestedAt" placeholder="Año desinversión" />
    </div>
    <div class="form-create-investee__section">
      <InputText v-model="investee.category" placeholder="Categoría" />
      <InputText v-model="investee.websiteUrl" placeholder="URL web" />
    </div>
    <div class="form-create-investee__section">
      <Textarea v-model="investee.description.es" placeholder="Descripción (castellano)" />
      <Textarea v-model="investee.description.ca" placeholder="Descripción (catalán)" />
      <Textarea v-model="investee.description.en" placeholder="Descripción (inglés)" />
    </div>
    <PrimeButton @click="createInvestee" label="Crear" />
    <PrimeButton @click="deleteInvestee('C14UQXRKVP')" label="Eliminar" />
  </div>
</template>

<style lang="scss">
.form-create-investee {
  display: flex;
  flex-direction: column;
  gap: tokens.$spacer;

  width: 100%;

  padding: tokens.$spacer;

  &__section {
    display: flex;
    gap: tokens.$spacer;
  }
}

.p-fileupload {
  justify-content: flex-start !important; // Override PrimeVue styles.
}
</style>