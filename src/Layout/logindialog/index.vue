<template>
  <div class="login">
    <el-dialog
      v-model="ruleForm.visible"
      width="375px"
      class="dialog"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <template #header>
        <div class="my-header">
          <div class="phone">手机号码登录</div>
          <el-icon class="close" @click="close"><Close /></el-icon>
        </div>
      </template>
      <el-form ref="ruleFormRef" :model="ruleForm" class="demo-ruleForm">
        <el-form-item>
          <el-input
            v-model="ruleForm.phone"
            size="large"
            @blur="validatePhone"
            :focus-cursor-size="20"
            autocomplete="off"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <div class="imageInput">
          <el-form-item class="InputItem">
            <el-input
              v-model="ruleForm.imageCode"
              maxlength="5"
              size="large"
              @blur="validateImgCode"
              class="codeInput"
              placeholder="请输入验证码"
              autocomplete="off"
            />
          </el-form-item>
          <div class="imageCode">
            <img :src="imageData.imageUrl" mode="scaleToFill" />
            <span @click="changeImage">换一张</span>
          </div>
        </div>
        <div class="imageInput">
          <el-form-item class="InputItem">
            <el-input
              v-model="ruleForm.code"
              maxlength="6"
              size="large"
              class="codeInput"
              placeholder="请输入短信验证码"
              autocomplete="off"
            />
          </el-form-item>
          <div class="code" @click="sendSmsCode">
            <span>{{ codeMsg.message }}</span>
          </div>
        </div>
        <el-form-item>
          <el-button @click="login" class="loginBtn">登录</el-button>
        </el-form-item>
        <div class="footer">
          <p>
            登录即代表同意
            <a href="javascript:;">《大健康用户使用协议》</a>
          </p>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance, FormRules, MessageParams } from 'element-plus'
import { sendPicCode, sendCode } from '@/services/api/login'
import useloginStore from '@/stores/modules/login'

//110 28
const ruleFormRef = ref<FormInstance>()
const loginStore = useloginStore()
const ruleForm = reactive({
  visible: false,
  phone: '',
  imageCode: '',
  code: ''
})
const codeMsg = reactive({
  message: '获取验证码',
  count: 60
})

const imageData = reactive({
  imageUrl: '',
  key: ''
})

onMounted(() => {
  getImage()
})
const showDialog = () => {
  ruleForm.visible = true
  codeMsg.message = '获取验证码'
}
const close = () => {
  ruleForm.visible = false
}
const getImage = async () => {
  const params = {
    height: 50,
    width: 90
  }
  const { data } = await sendPicCode(params)
  const imageBase64 = 'data:image/png;base64,' + data?.imageBase64
  imageData.imageUrl = imageBase64
  imageData.key = data?.key
}

const changeImage = () => {
  getImage()
}

const validatePhone = () => {
  let flag = false
  if (ruleForm.phone === '') {
    ElMessage({ type: 'info', message: '手机号码不为空', offset: 375 })
  } else {
    if (!/^1[3-9]\d{9}$/.test(ruleForm.phone)) {
      ElMessage({ type: 'info', message: '手机号码格式错误', offset: 375 })
    } else {
      flag = true
    }
  }
  return flag
}
const validateImgCode = () => {
  let flag = false
  if (ruleForm.imageCode === '') {
    ElMessage({ type: 'info', message: '图形验证码不为空', offset: 375 })
  } else {
    flag = true
  }
  return flag
}
const validateCode = () => {
  let flag = false
  if (ruleForm.code === '') {
    ElMessage({ type: 'info', message: '短信验证码不为空', offset: 375 })
  } else {
    flag = true
  }
  return flag
}

const sendSmsCode = async () => {
  if (ruleForm.phone && ruleForm.imageCode) {
    const data = {
      phone: ruleForm.phone,
      key: imageData.key,
      code: ruleForm.imageCode
    }
    const { code, message } = await sendCode(data)
    if (code !== 200) {
      ElMessage.info(message)
      codeMsg.message = '重新发送'
    } else {
      const timer = setInterval(() => {
        if (codeMsg.count > 0) {
          codeMsg.message = `${codeMsg.count--}秒后重新发送`
        } else {
          clearInterval(timer)
          codeMsg.message = '重新发送'
          codeMsg.count = 60
        }
      }, 1000)
    }
  }
}
const login = async () => {
  const auth = validateImgCode() && validatePhone() && validateCode()
  if (auth) {
    const data = {
      phone: ruleForm.phone,
      code: ruleForm.code
    }
    await loginStore.loginAsync(data)
  }
}
defineExpose({ showDialog })
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
