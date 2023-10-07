<template>
  <div class="goods_filter">
    <div class="header_crumb">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ name: 'FrontIndex' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>体检套餐列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <SearchRow></SearchRow>
    <div class="goods_card">
      <div class="goods_left" v-infinite-scroll="load">
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
import Item from '@/global/constant/goodsList/index'
import ItemList from '@/components/baseUI/ItemList/index.vue'
import SearchRow from './SearchRow/index.vue'

const radio = ref('最新')
const data=reactive({
  pass:0,
  size:10,
  itemList:[]
})
const changeHandler = (value: any) => {
  console.log(value)
}
const selectHandler = (value:any) => {
  console.log('value',value)
}
const load=()=>{
  console.log('华东了')
}
const selectPrice = () => {}
</script>
<style lang="less" scope>
@import url('./index.less');
</style>
