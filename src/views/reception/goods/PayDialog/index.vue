<template>
  <el-dialog
    title="购买体检套餐"
    :close-on-click-modal="false"
    :before-close="handleBeforeClose"
    @close="closeHandle"
    v-model="dialog.visible"
    width="415px"
    center
  >
    <img :src="dialog.qrCode" class="qrcode" v-if="!dialog.result && !dialog.show" />
    <div class="pay-success" v-if="dialog.result">
      <el-result icon="success" title="付款成功" subTitle="操作完成"></el-result>
    </div>
    <div class="pay-success" v-if="dialog.show">
      <el-result icon="error" title="付款失败" subTitle="重新支付"></el-result>
    </div>
    <div class="dialog-footer-style">
      <div class="cancelBtn" v-if="!dialog.result && !dialog.show" @click="closeHandle">
        取消支付
      </div>
      <div class="successBtn" v-if="!dialog.result && !dialog.show" @click="successHandle">
        支付成功
      </div>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import QRCode from 'qrcode'

import { searchPayResult } from '@/services/api/goods'
import { useGoodsStore } from '@/stores/modules/goods'
import { storeToRefs } from 'pinia'

const goodsStore = useGoodsStore()
const { payUrl, orderId } = storeToRefs(goodsStore)
type IProp = {
  result: boolean
  timer: any
  show: boolean
  qrCode: string
  visible: boolean
}

const dialog = reactive<IProp>({
  result: false,
  show: false,
  qrCode: '',
  timer: null,
  visible: false
})

const showDialog = () => {
  dialog.visible = true
  if (payUrl) {
    QRCode.toDataURL(payUrl.value as any).then((url: string) => {
      dialog.qrCode = url
    })
  }
  dialog.timer = setInterval(async () => {
    const { data } = await searchPayResult(orderId.value as any)
    if (data === true) {
      dialog.result = data
      clearInterval(dialog.timer)
      dialog.visible = false
    }
  }, 1500)
}
const successHandle = () => {
  if (dialog.result) {
    setTimeout(() => {
      dialog.visible = false
    }, 1000)
  } else {
    setTimeout(() => {
      dialog.show = true
      clearInterval(dialog.timer)
      setTimeout(() => {
        dialog.visible = false
      }, 3000)
    }, 1500)
  }
}
const closeHandle = () => {
  dialog.visible = false
}
const handleBeforeClose = () => {
  clearInterval(dialog.timer)
  dialog.visible = false
  return true
}

defineExpose({ showDialog })
</script>
<style scoped lang="less">
@import url('./index.less');
</style>
