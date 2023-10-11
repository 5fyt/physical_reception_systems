import { defineStore } from 'pinia'
type StoreProp = {
  goodsId: string
  orderId: string
  payUrl: string
}
export const useGoodsStore = defineStore('goods', {
  state: (): StoreProp => ({
    goodsId: '',
    orderId: '',
    payUrl: ''
  }),
  actions: {
    getId(data: StoreProp) {
      this.orderId = data.orderId
      this.payUrl = data.payUrl
    },
    getGoodsId(data: string) {
      this.goodsId = data
    }
  }
})
