import { defineStore } from 'pinia'
type StoreProp = {
  orderId: string
  payUrl: string
}
export const useGoodsStore = defineStore('goods', {
  state: (): StoreProp => ({
    orderId: '',
    payUrl: ''
  }),
  actions: {
    getId(data: StoreProp) {
      this.orderId = data.orderId
      this.payUrl = data.payUrl
    }
  }
})
