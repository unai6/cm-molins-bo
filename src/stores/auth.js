import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import ApiService from '@/services/apiService'
import endpoints from '@/services/apiEndpoints'
import { isTokenExpired } from '@/utils'

import { useAccountStore } from '@/stores/account'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const accountStore = useAccountStore()

  let initStatus

  const isReady = ref(false)

  const accessToken = ref(null)
  const refreshToken = ref(null)

  const isLoggedIn = computed(() => !!accessToken.value)

  function hasValidToken () {
    return !!accessToken.value && !isTokenExpired(accessToken.value)
  }

  function hasValidRefreshToken () {
    return !!refreshToken.value && !isTokenExpired(refreshToken.value)
  }

  function resetTokens () {
    accessToken.value = null
    refreshToken.value = null

    localStorage.removeItem(`${import.meta.env.VUE_APP_STORAGE_ROOT}.refreshToken`)

    ApiService.removeAuthHeader()
  }

  async function updateToken () {
    try {
      ApiService.removeAuthHeader()

      const { data } = await ApiService.post(endpoints.auth.refreshToken, { refreshToken: refreshToken.value })

      if (!data) { throw new Error('No data in response') }

      accessToken.value = data.token
      ApiService.setAuthHeader(data.token)

      console.info('** Token refreshed successfully.')

      return data.token
    } catch (err) {
      console.error(err)
      console.info('** No valid refresh token available. Clearing token info from state.')
      resetTokens()
    }
  }

  async function initAuth () {
    ApiService.setRequestInterceptor(
      async (config) => {
        const controller = new AbortController()
        const requestConfig = { ...config, signal: controller.signal }
        const requestUrl = config.url

        const isPublicRoute = router.currentRoute.value.meta.isPublic

        if (isPublicRoute) return requestConfig

        const isRefreshingToken = requestUrl === endpoints.auth.refreshToken && hasValidRefreshToken()

        if (isRefreshingToken) return requestConfig

        if (!hasValidToken() && !hasValidRefreshToken()) {
          controller.abort()
          return requestConfig
        }

        if (!hasValidToken() && hasValidRefreshToken()) {
          const newAccessToken = await updateToken()
          if (!newAccessToken) {
            controller.abort()
            return requestConfig
          }
          requestConfig.headers.Authorization = `Bearer ${newAccessToken}`
        }

        return requestConfig
      },
      (error) => Promise.reject(error),
    )

    ApiService.setResponseInterceptor(
      (response) => response,
      async (error) => {
        // We also need to re-check token expiration, because it may have expired between the time we check it in the
        // request interceptor and the time the API receives the request and checks the token in its auth middleware.
        if (error.code === 'ERR_CANCELED' || error.config.url === endpoints.auth.refreshToken) {
          resetTokens()
          // await is not used as for not mounted app it get freezed.
          router.push({ name: 'login' })
          error = new Error('Logged out due a token expiration.')
        } else if (error.code !== 'ERR_NETWORK' && hasValidRefreshToken() && !hasValidToken()) {
          const newAccessToken = await updateToken()
          if (newAccessToken) {
            error.config.headers.Authorization = `Bearer ${newAccessToken}`
            return ApiService.customRequest(error.config)
          }
        }

        return Promise.reject(error)
      },
    )

    try {
      refreshToken.value = localStorage.getItem(`${import.meta.env.VUE_APP_STORAGE_ROOT}.refreshToken`)

      if (!!accessToken.value && !isTokenExpired(accessToken.value)) {
        ApiService.setAuthHeader(accessToken.value)
      } else if (!!refreshToken.value && !isTokenExpired(refreshToken.value)) {
        await updateToken()
      } else {
        resetTokens()
      }

      if (hasValidToken()) {
        await fetchRequiredData()
      }
    } catch (err) {
      console.error('Init auth store error:', err)
    }
  }

  // This is a wrapper function used to avoid initializing the store more than once.
  function init () {
    if (!initStatus) {
      initStatus = initAuth().then(() => { isReady.value = true })
    }

    return initStatus
  }

  async function login ({ email, password }) {
    console.info(email, password)
    // Clean auth data before login process.
    logout()

    const { data } = await ApiService.post(endpoints.auth.login, { email, password })

    accessToken.value = data.token
    refreshToken.value = data.refreshToken

    localStorage.setItem(`${import.meta.env.VUE_APP_STORAGE_ROOT}.refreshToken`, data.refreshToken)

    ApiService.setAuthHeader(data.token)

    await fetchRequiredData()
  }

  function logout () {
    resetTokens()
    accountStore.$reset()
  }

  async function requestResetPassword (email) {
    await ApiService.put(endpoints.auth.requestPasswordReset, { email })
  }

  async function resetPassword ({ email, password, token }) {
    await ApiService.put(endpoints.auth.resetPassword, { email, password, token })
  }

  async function fetchRequiredData () {
    await accountStore.fetchAccountData()
  }

  return {
    isReady,
    isLoggedIn,
    init,
    login,
    logout,
    requestResetPassword,
    resetPassword,
  }
})
