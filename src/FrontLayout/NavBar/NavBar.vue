<template>
  <header class="header">
    <div class="logo-container">
      <img src="../../assets/front/index/logo.png" class="logo" />
      <div>
        <h3>神州大健康</h3>
        <p>www.chinahealty.com</p>
      </div>
    </div>
    <div class="search-container">
      <div>
        <el-input
          v-model="header.keyword"
          placeholder="请输入套餐名或者编号"
          size="large"
          maxlength="50"
          class="keyword-input"
          clearable
        >
          <template #append>
            <el-button>搜索</el-button>
          </template>
        </el-input>
      </div>
      <div>
        <el-tag
          v-for="item in header.tags"
          :key="item.label"
          :type="item.type"
          class="tag"
          effect="light"
          round
        >
          {{ item.label }}
        </el-tag>
      </div>
    </div>
    <div class="operate-container">
      <el-button type="primary" size="large" @click="login" v-if="header.status === 'loginout'">
        登录/注册
      </el-button>
      <div class="btn" v-if="header.status == 'login'" @click="router.push({ name: 'FrontMine' })">
        <el-icon><User /></el-icon>
        <span>个人中心</span>
      </div>
      <div class="btn" v-if="header.status == 'login'" @click="logout">
        <el-icon><SwitchButton /></el-icon>
        <span>退出系统</span>
      </div>
    </div>
  </header>
  <login-dialog ref="dialogRef"></login-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import LoginDialog from '../logindialog/index.vue'
const dialogRef = ref<FormInstance>()
const header = reactive({
  keyword: '',
  status: 'loginout',
  tags: [
    {
      label: '入职体检',
      type: 'success'
    },
    {
      label: '父母体检',
      type: 'success'
    },
    {
      label: '女士体检',
      type: 'success'
    }
  ]
})
const login = () => {
  dialogRef.value?.showDialog()
}
const logout = () => {}
</script>
<style>
@import url('./index.less');
</style>
