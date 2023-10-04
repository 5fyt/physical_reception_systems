<template>
  <header class="nav">
    <div class="autoWidth">
      <div class="ps">
        <el-icon size="20"><Location /></el-icon>
        <span>南昌 [本地]</span>
      </div>
      <div class="login_title">
        <div class="login" @click="login">登入</div>
        <div class="solid"></div>
        <div class="register" @click="register">注册</div>
      </div>
    </div>
  </header>
  <login-dialog ref="dialogRef"></login-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import LoginDialog from '../logindialog/index.vue'
interface ShowProps {
  showDialog: () => void
}
const dialogRef = ref<ShowProps>()

const login = () => {
  dialogRef.value?.showDialog()
}
const register = () => {}
</script>
<style scoped lang="less">
@import url('./index.less');
</style>
