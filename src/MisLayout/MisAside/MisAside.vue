<template>
  <aside class="site-sidebar site-sidebar--dark">
    <div class="site-sidebar__inner">
      <el-menu
        :default-active="siteContent.menuActiveName || 'Home'"
        :collapse="sidebar.isFold"
        :collapseTransition="false"
        class="site-sidebar__menu"
        background-color="#263238"
        active-text-color="#fff"
        text-color="#8a979e"
      >
        <el-menu-item index="Home" @click="$router.push({ name: 'MisHome' })">
          <SvgIcon name="home" class="icon-svg" />
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu
          index="组织管理"
          :popper-class="'site-sidebar--' + sidebar.sidebarSkin + '-popper'"
        >
          <template #title>
            <SvgIcon name="users_fill" class="icon-svg" />
            <span>组织管理</span>
          </template>
          <el-menu-item index="MisDept" @click="$router.push({ name: 'MisDept' })">
            <SvgIcon name="company_fill" class="icon-svg" />
            <span>部门管理</span>
          </el-menu-item>
          <el-menu-item index="MisRole" @click="$router.push({ name: 'MisRole' })">
            <SvgIcon name="role_fill" class="icon-svg" />
            <span>角色管理</span>
          </el-menu-item>
          <el-menu-item index="MisUser" @click="$router.push({ name: 'MisUser' })">
            <SvgIcon name="user_fill" class="icon-svg" />
            <span>用户管理</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu
          index="业务管理"
          :popper-class="'site-sidebar--' + sidebar.sidebarSkin + '-popper'"
        >
          <template #title>
            <SvgIcon name="trust_fill" class="icon-svg" />
            <span>业务管理</span>
          </template>
          <el-menu-item index="MisGoods" @click="$router.push({ name: 'MisGoods' })">
            <SvgIcon name="goods_fill" class="icon-svg" />
            <span>体检套餐</span>
          </el-menu-item>
          <el-menu-item index="MisRule" @click="$router.push({ name: 'MisRule' })">
            <SvgIcon name="rule_fill" class="icon-svg" />
            <span>促销规则</span>
          </el-menu-item>
          <el-menu-item index="MisCustomer" @click="$router.push({ name: 'MisCustomer' })">
            <SvgIcon name="customer_fill" class="icon-svg" />
            <span>客户档案</span>
          </el-menu-item>
          <el-menu-item index="MisOrder" @click="$router.push({ name: 'MisOrder' })">
            <SvgIcon name="order_fill" class="icon-svg" />
            <span>订单管理</span>
          </el-menu-item>
          <el-menu-item index="MisCustomerIm" @click="$router.push({ name: 'MisCustomerIm' })">
            <SvgIcon name="im_fill" class="icon-svg" />
            <span>客服IM</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu
          index="体检管理"
          :popper-class="'site-sidebar--' + sidebar.sidebarSkin + '-popper'"
        >
          <template #title>
            <SvgIcon name="night_fill" class="icon-svg" />
            <span>体检管理</span>
          </template>
          <el-menu-item index="MisAppointment" @click="$router.push({ name: 'MisAppointment' })">
            <SvgIcon name="appointment_fill" class="icon-svg" />
            <span>体检预约</span>
          </el-menu-item>
          <el-menu-item
            index="MisCustomerCheckin"
            @click="$router.push({ name: 'MisCustomerCheckin' })"
          >
            <SvgIcon name="checkin_fill" class="icon-svg" />
            <span>体检签到</span>
          </el-menu-item>
          <el-menu-item
            index="MisAppointmentRestriction"
            @click="$router.push({ name: 'MisAppointmentRestriction' })"
          >
            <SvgIcon name="setting_fill" class="icon-svg" />
            <span>预约设置</span>
          </el-menu-item>
          <el-menu-item index="MisCheckup" @click="$router.push({ name: 'MisCheckup' })">
            <SvgIcon name="doctor_fill" class="icon-svg" />
            <span>医生检查</span>
          </el-menu-item>
          <el-menu-item
            index="MisCheckupReport"
            @click="$router.push({ name: 'MisCheckupReport' })"
          >
            <SvgIcon name="file_fill" class="icon-svg" />
            <span>体检报告</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu
          index="系统设置"
          :popper-class="'site-sidebar--' + sidebar.sidebarSkin + '-popper'"
        >
          <template #title>
            <SvgIcon name="system_fill" class="icon-svg" />
            <span>系统设置</span>
          </template>
          <el-menu-item
            index="MisFlowRegulation"
            @click="$router.push({ name: 'MisFlowRegulation' })"
          >
            <SvgIcon name="people_fill" class="icon-svg" />
            <span>人员限流</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue'
const props = defineProps({
  siteContent: {
    type: Object,
    required: true
  }
})

const sidebar = reactive({
  //是否折叠左边栏
  isFold: false,
  sidebarSkin: 'dark'
})
//关闭侧边栏
const closeAside = () => {
  sidebar.isFold = !sidebar.isFold
}
watch(props, ({ siteContent }) => {
  props.siteContent.menuActiveName = siteContent.menuActiveName
})
defineExpose({ closeAside })
</script>
<style lang="scss">
@import url('../../assets/scss/index.scss');
</style>
