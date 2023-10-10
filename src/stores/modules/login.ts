import { login, loginOut } from '@/services/api/login'
import type { loginParams } from '@/services/types/login'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state: () => ({
    token: JSON.parse(localStorage.getItem('login') as string)?.token || '',
    photo: JSON.parse(localStorage.getItem('login') as string)?.photo || '',
    name: JSON.parse(localStorage.getItem('login') as string)?.name || '',
    show: true
  }),
  actions: {
    async loginAsync(data: loginParams) {
      const { data: result, code } = await login(data)
      if (code === 200) {
        this.token = result.token
        this.photo = result.photo
        this.name = result.name
        this.show = false
      }
    },
    async loginoutAsync(callback: Function) {
      const { code } = await loginOut()
      if (code === 200) {
        callback()
      }
      this.show = true
      localStorage.clear()
    },
    updateProfile(data: any, type: string = 'all') {
      if (type === 'photo') {
        this.photo = data?.photo
      } else if (type === 'user') {
        this.name = data?.name
      } else {
        this.photo = data?.photo
        this.name = data?.name
      }
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
