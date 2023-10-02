<template>
  <div class="login">
    <el-dialog v-model="ruleForm.visible" width="475px" class="dialog" :show-close="false">
      <template #header>
        <div class="my-header">
          <div class="phone">手机号码登录</div>
          <el-icon class="close" @click="close"><Close /></el-icon>
        </div>
      </template>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
        <el-form-item prop="phone">
          <el-input
            v-model="ruleForm.phone"
            type="password"
            size="large"
            :focus-cursor-size="20"
            autocomplete="off"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <div class="imageInput">
          <el-form-item class="InputItem" prop="imageCode">
            <el-input
              v-model.number="ruleForm.imageCode"
              type="password"
              maxlength="4"
              size="large"
              class="codeInput"
              placeholder="请输入验证码"
              autocomplete="off"
            />
          </el-form-item>
          <div class="imageCode">
            <img src="imageUrl" mode="scaleToFill" />
            <span>换一张</span>
          </div>
        </div>
        <div class="imageInput">
          <el-form-item class="InputItem" prop="code">
            <el-input
              v-model.number="ruleForm.code"
              type="password"
              maxlength="4"
              size="large"
              class="codeInput"
              placeholder="请输入短信验证码"
              autocomplete="off"
            />
          </el-form-item>
          <div class="code">
            <span>{{ codeMsg }}</span>
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
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { sendPicCode } from '@/services/api/login'
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
const codeMsg = ref('获取验证码')
const imageUrl = ref('')
const validatePhone = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入正确的手机号码'))
  } else {
    if (ruleForm.phone !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const rules = reactive<FormRules<typeof ruleForm>>({
  phone: [{ validator: validatePhone, trigger: 'blur' }],
  imageCode: [{ required: true, message: '图形验证码不能为空', trigger: 'blur' }],
  code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
})

const showDialog = () => {
  ruleForm.visible = true
}
const close = () => {
  ruleForm.visible = false
}
const getImage = async () => {
  const params = {
    height: 28,
    width: 110
  }
  const { data } = await sendPicCode(params)
  imageUrl.value = data
}
getImage()
const login = () => {
  ruleFormRef.value?.validate(async (isOk) => {
    if (isOk) {
      const data = {
        phone: ruleForm.phone,
        code: ruleForm.code
      }
      await loginStore.loginAsync(data)
    }
  })
}
const sendSmsCode = () => {}
defineExpose({ showDialog })
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
