import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import apiService from '@/services/apiService'
import apiEndpoints from '@/services/apiEndpoints'

export const useAccountStore = defineStore('accountStore', () => {
  const user = ref(null)

  async function fetchAccountData () {

  }

  function $reset () {
    user.value = null
  }

  return { 
    fetchAccountData,
    $reset,
    user,
  }
})