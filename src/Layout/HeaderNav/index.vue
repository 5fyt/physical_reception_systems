<template>
  <div class="header_container">
    <div class="header">
      <div class="left">
        <div class="logo-container">
          <img src="../../assets/front/index/logo.png" class="logo" />
          <p>南 昌 市 服 务 性 体 检 预 约 平 台</p>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')
const visible = ref(true)
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<style scoped lang="less">
@import url('./index.less');
</style>
