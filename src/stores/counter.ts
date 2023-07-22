import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state:()=>({
    count:2
  }),
  actions:{
    increment(){
      this.count++
    }
  }
})
