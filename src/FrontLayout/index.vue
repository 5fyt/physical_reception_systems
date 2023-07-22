<template>
  <div class="layout">
    <!-- 头部区域 -->
    <div class="main-right">
      <nav-bar></nav-bar>
      <!--key 值保证点击切换路由时，加载的是不同路由，以便加载出重复的缓存内容，二级路由  -->
      <router-view :key="router.currentRoute.value.query.random"></router-view>
    </div>
    <FooterBar></FooterBar>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import NavBar from './NavBar/NavBar.vue'
import FooterBar from './FooterBar/FooterBar.vue'
</script>
<style scope>
.main-right {
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
</style>
