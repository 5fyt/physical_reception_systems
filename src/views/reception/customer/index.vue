<template>
  <div class="customer">
    <el-menu :default-active="menuActive || 'FrontMine'" class="menu" @select="selectHandle">
      <el-menu-item index="FrontMine" @click="router.push({ name: 'FrontMine' })">
        <el-icon>
          <User />
        </el-icon>
        <span>账户信息</span>
      </el-menu-item>
      <el-menu-item index="FrontOrderList" @click="router.push({ name: 'FrontOrderList' })">
        <el-icon>
          <Tickets />
        </el-icon>
        <span>我的订单</span>
      </el-menu-item>
      <el-menu-item
        index="FrontAppointmentList"
        @click="router.push({ name: 'FrontAppointmentList' })"
      >
        <el-icon>
          <Files />
        </el-icon>
        <span>体检预约</span>
      </el-menu-item>
      <el-menu-item index="FrontCustomerIm" @click="router.push({ name: 'FrontCustomerIm' })">
        <el-icon>
          <Collection />
        </el-icon>
        <span>客服咨询</span>
      </el-menu-item>
    </el-menu>
    <div class="content">
      <div><router-view></router-view></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
const menuActive = ref<any>('')
const route = useRoute()
const selectHandle = () => {}
watch(
  () => route.name,
  (newValue, oldValue) => {
    menuActive.value = newValue
  },
  { deep: true, immediate: true }
)
</script>
<style lang="less" scope>
.customer {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.menu {
  width: 200px;
  height: 800px;
  border-right: 1px solid #fff;
  background-color: #fff;
  padding-left: 15px;
}
.content {
  margin-left: 15px;
  flex-grow: 1;
}
</style>
