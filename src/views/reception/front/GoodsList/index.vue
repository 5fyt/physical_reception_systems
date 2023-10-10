<template>
  <div
    class="goods-container"
    v-for="(item, index) in goodsList.list"
    :style="{ backgroundColor: index === 1 ? '#fff' : '' }"
    :key="index"
  >
    <nav>
      <h3>{{ item.title }}</h3>
      <el-link :icon="Plus" :underline="false" @click="moreHandle" class="link">查看更多</el-link>
    </nav>
    <ItemList :item="item?.part"></ItemList>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { getGoodsTypes, getGoodsLists } from '@/services/api/goods'
import ItemList from '@/components/baseUI/ItemList/index.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const goodsList = reactive<any>({
  list: [{}, {}, {}]
})

const getGoodsList = async () => {
  const flag = goodsList.list.some((item: any) => Object.values(item).length > 0)
  if (flag) {
    return
  }
  const { data } = await getGoodsTypes()
  let sorts = [...data.sorts]
  let newArr = []
  for (let item of sorts) {
    let obj = { title: item.name, part: [] }
    const { data } = await getGoodsLists(item.sort, { count: 8 })
    obj = { title: item.name, part: data.goodsList }
    newArr.push(obj)
    goodsList.list = [...newArr]
  }
}
getGoodsList()
const moreHandle = () => {
  router.push({ name: 'FrontGoodsList' })
}
</script>
<style lang="less">
@import url('./index.less');
</style>
