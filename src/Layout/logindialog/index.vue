<template>
  <div class="login">
    <el-dialog v-model="loginForm.visible" title="手机快速登陆" width="400" class="dialog">
      <el-row>
        <el-col :span="24">
          <el-input
            v-model="loginForm.phone"
            placeholder="输入手机号，快捷登陆"
            size="large"
            maxlength="11"
            clearable
          >
            <template #prepend>
              <el-icon><Iphone /></el-icon>
            </template>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-input
            v-model="loginForm.code"
            placeholder="输入短信验证码"
            size="large"
            maxlength="6"
            clearable
          >
            <template #prepend>
              <el-icon><Message /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button
            size="large"
            class="receive-btn"
            type="primary"
            plain
            @click="sendSmsCode"
            :disabled="loginForm.disabled"
          >
            {{ loginForm.btnContent }}
          </el-button>
        </el-col>
      </el-row>
      <el-button type="primary" class="login-btn" size="large" @click="login"> 登陆系统 </el-button>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
const loginForm = reactive({
  visible: false,
  phone: null,
  code: null,
  disabled: false,
  btnContent: '发送验证码'
})
const showDialog = () => {
  loginForm.visible = true
}
const login = () => {}
const sendSmsCode = () => {}
defineExpose({ showDialog })
</script>
<style lang="less">
.dialog {
  .el-row {
    margin-bottom: 17px;
  }
  .receive-btn {
    width: 100%;
    outline: none;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
    height: 45px;
  }
}
</style>
