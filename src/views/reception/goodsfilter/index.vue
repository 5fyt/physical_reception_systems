<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item :to="{ name: 'FrontIndex' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>体检套餐列表</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="search-rows">
    <template v-for="(item, index) in filterArray" :key="index">
      <el-row :gutter="0" class="row">
        <el-col :span="2"
          ><span class="label">【{{ item.title }}】</span></el-col
        >
        <el-radio-group v-model="item.active" size="large" @change="changeHandler(item.title)">
          <template v-for="(one, index) in item.data" :key="index">
            <el-radio-button :label="one.name" />
          </template>
        </el-radio-group>
      </el-row>
    </template>
  </div>
  <div class="search-filter">
    <el-radio-group v-model="radio" @change="selectHandler">
      <el-radio label="最新" size="large">最新</el-radio>
      <el-radio label="销量" size="large">销量</el-radio>
    </el-radio-group>
    <div class="sort-operate" @click="selectPrice">
      <span>价格</span>
      <SvgIcon :name="'sort-default'" class="sort-icon" />
    </div>
  </div>
  <goods-list :show="false"></goods-list>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import filterArr from '@/global/constant/goodsfilter/index.ts'
import GoodsList from '@/components/baseUI/GoodsList/index.vue'
interface FilterItem {
  title: string
  active: string
  data: { name: string; value?: number }[]
}
const filterArray = reactive<FilterItem[]>(filterArr)
const radio = ref(null)
const changeHandler = (value) => {
  console.log(value)
}
const selectHandler = () => {}
</script>
<style lang="less" scope>
@import url('./index.less');
</style>
