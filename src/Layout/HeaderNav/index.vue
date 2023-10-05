<template>
  <div class="header_container">
    <div class="header">
      <div class="left">
        <div class="logo-container">
          <img src="../../assets/front/index/logo.png" class="logo" />
        </div>
        <div class="tabs">
          <ul>
            <li class="index">首页</li>
            <li>体检预约</li>
            <li>报告查询</li>
            <li>活动热卖</li>
            <li>企业专区</li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="searchInput">
          <input
            type="text"
            placeholder="请输入关键词..."
            class="input"
            @focus="visible = false"
            @input="visible = false"
            @blur="visible = true"
          />
          <div class="tips" v-if="visible">套餐 编号</div>
          <el-icon size="20" class="icon"><Search /></el-icon>
        </div>
      </div>
      <div class="user">
        <div class="avatar" @mousemove="showDp = true" @mouseleave="showDp = false" v-if="!show">
          <img :src="photo" alt="" class="image" />
        </div>
        <DropDown
          v-if="showDp"
          :bind-visible="bindshow"
          @mousemove="showDp = true"
          @mouseleave="showDp = false"
          @show-bind="showBind"
        ></DropDown>
        <div class="name">
          <span>{{ name }}</span>
        </div>
      </div>
    </div>
    <RefreshBind ref="showBindRef" @bd-show="bdShow"></RefreshBind>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DropDown from '../DropDown/index.vue'
import RefreshBind from '@/components/RefreshBind/index.vue'
import useLoginStore from '@/stores/modules/login'
import { storeToRefs } from 'pinia'
interface ShowProps {
  showDialog: () => void
}
const showBindRef = ref<ShowProps>()
const loginStore = useLoginStore()
const { name, photo, show } = storeToRefs(loginStore)
const visible = ref(true)
const showDp = ref(false)
const bindshow = ref(false)
const showBind = () => {
  showBindRef.value?.showDialog()
}
//绑定成功后，将未绑定改成已绑定
const bdShow = () => {
  bindshow.value = true
}
</script>
<style scoped lang="less">
@import url('./index.less');
</style>
