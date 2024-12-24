import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useInvesteesAdditionStore = defineStore('useInvesteesAdditionStore', () => {
  const investee = ref({
    name: 'test name',
    type: 'test type',
    investedAt: 'test investedAt',
    disinvestedAt: 'test disinvestedAt',
    category: 'test category',
    websiteUrl: 'test websiteUrl',
    headquarters: 'test headquarters',
    description: {
      es: 'test desc es',
      ca: 'test desc ca',
      en: 'test desc en',
    },
  })

  return { investee }
})