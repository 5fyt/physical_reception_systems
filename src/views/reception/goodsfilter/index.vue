<template>
  <div class="goods_filter">
    <div class="header_crumb">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ name: 'FrontIndex' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>体检套餐列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search-rows">
      <template v-for="(item, index) in filterArray" :key="index">
        <el-row :gutter="0" class="row">
          <el-col :span="2"
            ><span class="label">{{ item.title }}</span></el-col
          >
          <el-radio-group v-model="item.active" size="large" @change="changeHandler(item.title)">
            <template v-for="(one, index) in item.data" :key="index">
              <el-radio-button :label="one.name" />
            </template>
          </el-radio-group>
        </el-row>
      </template>
    </div>
    <div class="close_tag">
      <p>
        入职体检<el-icon class="icon"><Close /></el-icon>
      </p>
      <p>
        入职体检<el-icon class="icon"><Close /></el-icon>
      </p>
      <a href="">清除</a>
    </div>
    <div class="goods_card">
      <div class="goods_left">
        <div class="top_title">
          <div class="left">
            <el-radio-group v-model="radio" @change="selectHandler">
              <el-radio-button label="最新" size="large">最新</el-radio-button>
              <el-radio-button label="销量" size="large">销量优先</el-radio-button>
            </el-radio-group>
            <div class="sort-operate" @click="selectPrice">
              <span>价格</span>
              <SvgIcon :name="'sort-default'" class="sort-icon" />
            </div>
          </div>
          <p class="ammont">共找到 <i class="count">39</i> 个南昌体检套餐</p>
        </div>
        <item-list :item="Item"></item-list>
      </div>
      <div class="goods_notification"></div>
    </div>
    <div class="pagination">
      <el-pagination layout="prev, pager, next" :total="50" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import filterArr from '@/global/constant/goodsfilter/index'
import Item from '@/global/constant/goodsList/index'
import ItemList from '@/components/baseUI/ItemList/index.vue'
interface FilterItem {
  title: string
  active: string
  data: { name: string; value?: number }[]
}
const filterArray = reactive<FilterItem[]>(filterArr)
const radio = ref('最新')
const changeHandler = (value: any) => {
  console.log(value)
}
const selectHandler = () => {}
const selectPrice = () => {}
</script>
<style lang="less" scope>
@import url('./index.less');
</style>
