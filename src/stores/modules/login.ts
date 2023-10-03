import { login } from '@/services/api/login'
import type { loginParams } from '@/services/types/login'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state: () => ({
    token: JSON.parse(localStorage.getItem('login') as string).token || '',
    photo: JSON.parse(localStorage.getItem('login') as string).photo || '',
    name: JSON.parse(localStorage.getItem('login') as string).name || ''
  }),
  actions: {
    async loginAsync(data: loginParams) {
      const { data: result } = await login(data)
      this.token = result.token
      this.photo = result.photo
      this.name = result.name
    }
  },
  persist: {
    storage: {
      getItem(key) {
        return localStorage.getItem(key)
      },
      setItem(key, value) {
        localStorage.setItem(key, value)
      }
    }
  }
})
export default useLoginStore
