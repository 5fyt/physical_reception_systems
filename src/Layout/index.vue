<template>
  <div class="layout">
    <!-- 头部区域 -->
    <nav-bar v-if="show"></nav-bar>
    <header-nav></header-nav>
    <div class="main-right">
      <!-- key 值保证点击切换路由时，加载的是不同路由，以便加载出重复的缓存内容，二级路由  -->
      <router-view :key="(router.currentRoute.value.name as string)"></router-view>
    </div>
    <FooterBar></FooterBar>
  </div>
</template>
<script setup lang="ts">

import router from '@/router'
import NavBar from './NavBar/NavBar.vue'
import FooterBar from './FooterBar/FooterBar.vue'
import HeaderNav from './HeaderNav/index.vue'
import useLoginStore from '@/stores/modules/login'
import { storeToRefs } from 'pinia'
const loginStore = useLoginStore()
const { show } = storeToRefs(loginStore)
</script>
<style scope>
.layout {
  background-color: #f0f2f5;
}
.main-right {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}
</style>
