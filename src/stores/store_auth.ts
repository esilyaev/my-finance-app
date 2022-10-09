import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useLocalStorage('pinia/auth/token', null),
    refresh: useLocalStorage('pinia/auth/refresh', null),
  }),
  getters: {
    isAuthenticated: (state) => {
      return state.token != null && state.refresh != null
    }
  }
})