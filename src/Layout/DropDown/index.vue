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
          <a href="javascript:;">
            <el-icon><List /></el-icon>
            <span>我的套餐</span>
          </a>
        </li>
        <li class="item">
          <a href="javascript:;">
            <el-icon><Tools /></el-icon>
            <span>个人设置</span>
          </a>
        </li>
        
      </ul>
    </div>
    <div class="bottom">
      <div class="logout">安全退出</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useLoginStore from '@/stores/modules/login'
import { storeToRefs } from 'pinia'
const loginStore = useLoginStore()
const { name, photo } = storeToRefs(loginStore)
</script>
<style scoped lang="less">
@import url('./index.less');
</style>
