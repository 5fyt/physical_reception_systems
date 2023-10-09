<template>
  <ul class="goods-list">
    <p v-if="item.length <= 0" class="empty">商品空空如也</p>
    <li class="item" v-for="one in item" v-else>
      <div class="card">
        <img :src="one.image" />
        <h4>{{ one.name }}</h4>
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
          <span class="current">￥{{one.currentPrice.replace(/\.(.*\d)([1-9]*)\d+$/, '.$1')  }}</span>
          <span class="old">￥{{ one.originalPrice.replace(/\.(.*\d)([1-9]*)\d+$/, '.$1') }}</span>
          <span class="sale">已售{{ one.salesVolume }}</span>
        </p>
      </div>
    </li>
  </ul>
</template>
<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    default: true
  }
})
</script>
<style lang="less">
@import url('./index.less');
</style>
