import { ref, computed } from 'vue'

import { defineStore } from 'pinia'

import ApiService from '@/services/apiService'
import apiEndpoints from '@/services/apiEndpoints'

export const useInvesteesStore = defineStore('useInvesteesStore', () => {
  const investees = ref(null)

  function $reset () {
    investees.value = null
  }

  async function fetchInvestees () {
    try {
      const { data } = await ApiService.get(apiEndpoints.investees._)

      console.info(data, 'data')
      investees.value = data
    } catch (err) {
      console.error('  !! Could not fetch investees', err)
      throw err
    }
  }

  return {
    investees,
    fetchInvestees,
    $reset,
  }
})