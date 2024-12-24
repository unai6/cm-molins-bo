<script setup>
import { useTemplateRef } from 'vue'

import FileUpload from 'primevue/fileupload'
import InputText from 'primevue/inputtext'
import PrimeButton from 'primevue/button'

import ApiService from '@/services/apiService'
import apiEndpoints from '@/services/apiEndpoints'

import { useInvesteesAdditionStore } from '@/stores/investeesAddition'
import { storeToRefs } from 'pinia'

const investeesAdditionStore = useInvesteesAdditionStore()
const { investee } = storeToRefs(investeesAdditionStore)

const fileuploadRef = useTemplateRef('fileuploadRef')

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
  <div class="create-investee-view">
    <FileUpload ref="fileuploadRef" mode="basic" name="demo[]" :url="apiEndpoints.investees" accept="image/*" :maxFileSize="1000000" @upload="onUpload" />
    <InputText v-model="investee.name" placeholder="Name" />
    <InputText v-model="investee.type" placeholder="Type" />
    <InputText v-model="investee.investedAt" placeholder="Invested At" />
    <InputText v-model="investee.disinvestedAt" placeholder="Disinvested At" />
    <InputText v-model="investee.category" placeholder="Category" />
    <InputText v-model="investee.websiteUrl" placeholder="Website URL" />
    <InputText v-model="investee.headquarters" placeholder="Headquarters" />
    <InputText v-model="investee.description.es" placeholder="Description es" />
    <InputText v-model="investee.description.ca" placeholder="Description ca" />
    <InputText v-model="investee.description.en" placeholder="Description en" />
    <PrimeButton @click="createInvestee" label="Create" />
    <PrimeButton @click="deleteInvestee('C14UQXRKVP')" label="Delete" />
  </div>
</template>

<style lang="scss">
.create-investee-view {
  display: flex;
  flex-direction: column;
  gap: tokens.$spacer;
}
</style>