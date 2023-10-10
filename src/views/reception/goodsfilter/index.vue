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
      @clear-btn="clearBtn"
      @close-btn="closeBtn"
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
              <SvgIcon :name="svgIcon" class="sort-icon" />
            </div>
          </div>
          <p class="ammont">
            共找到 <i class="count">{{ loadData.itemList.length }}</i> 个南昌体检套餐
          </p>
        </div>
        <item-list :item="loadData.itemList"></item-list>
        <p class="bottom" v-if="loadData.isLast">{{ text }}</p>
      </div>
      <HotGoods></HotGoods>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue'

import ItemList from '@/components/baseUI/ItemList/index.vue'
import SearchRow from './SearchRow/index.vue'
import HotGoods from './HotGoods/index.vue'
import { filterSearch } from '@/services/api/goods'
import { useRouter } from 'vue-router'

/**
 * 筛选功能：
 * 当点击单个标签查询时，将该查询信息添加到表单中，当多个标签一起查询时，将之前保存的查询信息添加到表单中，返回的查询列表结果为请求结果返回结果
 * 当在此标签中继续下拉刷新时，查询列表为具有查询表单的查询返回的列表和之前的列表拼接
 * 当没有选中标签时，下拉刷新为查询数组和之前数组拼接而成
 */
type LoadType = {
  pass: number
  size: number
  isLast: boolean
  isFlag: boolean
  data: object
  itemList: any[]
}
const router = useRouter()
const radio = ref('最新')
const text = ref('已经见底啦~')
const svgIcon = ref('sort-default')
const loadData = reactive<LoadType>({
  pass: 0,
  size: 10,
  isLast: false, //判断是否触底
  isFlag: false, //判断是否刷新，
  itemList: [],
  data: {}
})

const selectPrice = () => {
  radio.value = ''
  if (svgIcon.value === 'sort-default') {
    svgIcon.value = 'sort-asc'
    loadList()
  } else if (svgIcon.value === 'sort-asc') {
    const data = {
      order: 'priceAsc'
    }
    loadList({ ...data, ...loadData.data })
    svgIcon.value = 'sort-desc'
  } else {
    const data = {
      order: 'priceDesc'
    }
    loadList({ ...data, ...loadData.data })
    svgIcon.value = 'sort-asc'
  }
}
const selectHandler = (value: any) => {
  svgIcon.value = 'sort-default'
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
    loadData.data = { ...loadData.data, type: item.type }
  } else if (item.value === 2) {
    loadData.data = { ...loadData.data, gender: item.name }
  } else {
    const itemPrice = item.name

    loadData.data = {
      ...loadData.data,
      topPrice: itemPrice.split('~')[1] + '.00',
      bottomPrice: itemPrice.split('~')[0] + '.00'
    }
  }
  if (Object.keys(loadData.data).length > 0) {
    loadData.pass = 0
    loadData.isFlag = false
    loadData.isLast = false
    text.value = '已经见底啦~'
    loadList(loadData.data)
  }
}
const priceHandle = (value: any) => {
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
  // if (loadData.itemList.length > 0 && result?.goodsList.length <= 0) {
  //   loadData.pass -= 10
  //   loadData.isLast = true
  //   setTimeout(() => {
  //     text.value = ''
  //   }, 3000)
  // }
  // if (!loadData.isFlag) {
  //   loadData.itemList = result.goodsList
  // } else {
  //   loadData.itemList = [...loadData.itemList, ...result?.goodsList]
  // }
}
const clearBtn = () => {
  loadList()
}
const closeBtn = (value: any) => {
  if (Object.values(value).length === 0) {
    loadList()
  } else {
    value.forEach((item: any) => {
      arrUtil(item)
    })
  }
}
onMounted(() => {
  window.scrollTo(0, 0)
})
watch(
  () => router.currentRoute.value.query,
  async (newValue) => {
    if (newValue.keyword) {
      const data = {
        pass: loadData.pass,
        size: loadData.size
      }
      const { data: result } = await filterSearch({ ...data })
      loadData.itemList = result.goodsList
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const load = () => {
  loadData.pass += 10
  loadData.isFlag = true
  loadList({ ...loadData.data })
}
loadList()
</script>
<style lang="less" scope>
@import url('./index.less');
</style>
