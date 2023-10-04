<template>
  <div class="content">
    <div class="top">
      <div class="left_avatar">
        <a href="javascript:;">
          <img :src="photo" class="img" />
        </a>
      </div>
      <div class="right_name">
        <span>{{ name }}</span>
      </div>
    </div>
    <div class="container">
      <ul>
        <li class="item">
          <a href="" @click.prevent="router.push({ path: '/front/customer/order_list' })">
            <el-icon><List /></el-icon>
            <span>我的订单</span>
          </a>
        </li>
        <li class="item">
          <a href="" @click.prevent="router.push({ path: '/front/customer/mine' })">
            <el-icon class="icon"><Tools /></el-icon>
            <span>个人设置</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <div class="logout" @click="logout">安全退出</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useLoginStore from '@/stores/modules/login'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import router from '@/router/index'
const loginStore = useLoginStore()
const { name, photo } = storeToRefs(loginStore)

const logout = async () => {
  await loginStore.loginoutAsync(() => {
    ElMessage.success('成功退出')
  })
}
</script>
<style scoped lang="less">
@import url('./index.less');
</style>
