<template>
  <template v-for="(item, index) in goodsList" :key="index">
    <div class="goods-container">
      <nav v-if="show">
        <h3>{{ item.title }}</h3>
        <el-link :icon="Plus" :underline="false" @click="moreHandle" class="link">查看更多</el-link>
      </nav>
      <ul class="goods-list">
        <li class="item" v-for="one in item.part">
          <div class="card">
            <img src="" />
            <h4>{{ one.title }}</h4>
            <el-tooltip class="box-item" effect="dark" placement="top">
              <template #content>
                <div style="width: 260px">{{ one.description }}</div>
              </template>
              <p class="desc">
                <span>折</span>
                {{ one.description }}
              </p>
            </el-tooltip>
            <p class="price">
              <span class="current">￥{{ one.currentPrice }}</span>
              <span class="old">￥{{ one.initialPrice }}</span>
              <span class="sale">已售{{ one.salesVolume }}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </template>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import goodsListInitial from '@/global/constant/goodsList/index'
const props = defineProps({
  show: {
    type: Boolean,
    default: true
  }
})
const goodsList = reactive(goodsListInitial)
const moreHandle = () => {}
const buyHandle = () => {}
</script>
<style lang="less">
@import url('./index.less');
</style>
