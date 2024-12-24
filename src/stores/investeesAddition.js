import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useInvesteesAdditionStore = defineStore('useInvesteesAdditionStore', () => {
  const investee = ref({
    name: '',
    type: '',
    investedAt: '',
    disinvestedAt: '',
    category: '',
    websiteUrl: '',
    headquarters: '',
    description: {
      es: '',
      ca: '',
      en: '',
    },
  })

  function $reset () {
    investee.value = {
      name: '',
      type: '',
      investedAt: '',
      disinvestedAt: '',
      category: '',
      websiteUrl: '',
      headquarters: '',
      description: {
        es: '',
        ca: '',
        en: '',
      },
    }
  }

  return { 
    investee, 
    $reset,
   }
})