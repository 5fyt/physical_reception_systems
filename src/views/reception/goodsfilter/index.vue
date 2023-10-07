<template>
  <div class="goods_filter">
    <div class="header_crumb">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ name: 'FrontIndex' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>体检套餐列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <SearchRow
      @price-handle="priceHandle"
      @gender-handle="genderHandle"
      @type-handle="typeHandle"
    ></SearchRow>
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
          <p class="ammont">
            共找到 <i class="count">{{ loadData.itemList.length }}</i> 个南昌体检套餐
          </p>
        </div>
        <item-list :item="loadData.itemList"></item-list>
        <p class="bottom" v-if="loadData.isLast">{{ text }}</p>
      </div>
      <div class="goods_notification"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'

import ItemList from '@/components/baseUI/ItemList/index.vue'
import SearchRow from './SearchRow/index.vue'
import { filterSearch } from '@/services/api/goods'

type LoadType = {
  pass: number
  size: number
  isLast: boolean
  data: object
  itemList: any[]
}
const radio = ref('最新')
const text = ref('已经见底了')
const loadData = reactive<LoadType>({
  pass: 0,
  size: 10,
  isLast: false,
  itemList: [],
  data: {}
})
const changeHandler = (value: any) => {
  console.log(value)
}
const selectHandler = (value: any) => {
  console.log('value', value)
  if (loadData.data !== null) {
    if (radio.value === '最新') {
      const data = {
        order: 'new'
      }
      loadList({ ...data, ...loadData.data })
    } else {
      const data = {
        order: 'sale'
      }
      loadList({ ...data, ...loadData.data })
    }
  }
}
const typeHandle = (value: any) => {
  arrUtil(value)
}
const arrUtil = (item: any) => {
  if (item.value === 1) {
    loadData.data = { ...loadData.data, name: item.name }
  } else if (item.value === 2) {
    loadData.data = { ...loadData.data, gender: item.name }
  } else {
    const itemPrice = item.name
    loadData.data = {
      ...loadData.data,
      topPrice: itemPrice.split('~')[1],
      bottomPrice: itemPrice.split('~')[0]
    }
  }
  if (loadData.data !== null) {
    loadList(loadData.data)
  }
}
const priceHandle = (value: any) => {
  console.log(value)
  arrUtil(value)
}
const genderHandle = (value: any) => {
  arrUtil(value)
}
const loadList = async (info?: any) => {
  // if (loadData.isLast) {
  //   return
  // }
  // const data = {
  //   pass: loadData.pass,
  //   size: loadData.size
  
  // }
  // const { data: result } = await filterSearch({ ...data, ...info })
  // if (result.goodsList.length <= 0) {
  //   loadData.pass -= 10
  //   loadData.isLast = true

  //   setTimeout(() => {
  //     text.value = ''
  //   }, 3000)
  // } else {
  //   loadData.itemList = [...loadData.itemList, ...result.goodsList]
  // }
}
onMounted(() => {
  window.scrollTo(0, 0)
})
const load = () => {
  loadData.pass += 10
  loadList()
}
// loadList()
const selectPrice = () => {}
</script>
<style lang="less" scope>
@import url('./index.less');
</style>
