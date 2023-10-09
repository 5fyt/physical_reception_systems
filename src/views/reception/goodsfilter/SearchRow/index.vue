<template>
  <div class="search-rows">
    <el-row :gutter="0" class="row">
      <el-col :span="2"><span class="label">套餐类型</span></el-col>
      <el-radio-group v-model="type" size="large" @change="changeType">
        <template v-for="(one, index) in arr.typeData" :key="index">
          <el-radio-button :label="one.name" />
        </template>
      </el-radio-group>
    </el-row>
    <el-row :gutter="0" class="row">
      <el-col :span="2"><span class="label">适用人群</span></el-col>
      <el-radio-group v-model="gender" size="large" @change="changeGender">
        <template v-for="(one, index) in genderData" :key="index">
          <el-radio-button :label="one.name" />
        </template>
        <!-- <el-radio-button label="女性" /> -->
      </el-radio-group>
    </el-row>
    <el-row :gutter="0" class="row">
      <el-col :span="2"><span class="label">套餐价格</span></el-col>
      <el-radio-group v-model="price" size="large" @change="changePrice">
        <template v-for="(one, index) in priceData" :key="index">
          <el-radio-button :label="one.name" />
        </template> </el-radio-group
    ></el-row>
  </div>

  <div class="close_tag">
    <template v-for="(item, index) in tags" :key="index">
      <p>
        {{ item?.name }}<el-icon class="icon" @click="closeHandle(item?.value)"><Close /></el-icon>
      </p>
    </template>
    <a href="" @click="clear" v-if="tags?.length">清除</a>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { typeData, genderData, priceData } from '@/global/constant/goodsfilter/index'
import { getType } from '@/services/api/goods'
type TagType =
  | {
      name: string
      value: number
      id?: number
    }
  | undefined
type TypeArr<T> = {
  typeArr: T[]
  priceArr: T[]
  genderArr: T[]
  typeData: { name: string; type: number }[]
}

const type = ref('')
const gender = ref('')
const price = ref('')
const flag = reactive({
  flagT: false,
  flagG: false,
  flagP: false
})
const arr = reactive<TypeArr<TagType>>({
  typeArr: [],
  priceArr: [],
  genderArr: [],
  typeData: []
})
const tags = ref<any[]>([])
const emits = defineEmits(['typeHandle', 'priceHandle', 'genderHandle', 'closeBtn', 'clearBtn'])
const changeType = (value: any) => {
  arr.typeArr = arr.typeData
    .map((item) => {
      if (value === item.name) {
        return { name: value, value: 1, id: item.type }
      }
    })
    .filter((item) => item !== undefined)

  if (
    tags.value.length <= 1 &&
    arr.typeArr.length > 0 &&
    arr.priceArr.length <= 0 &&
    arr.genderArr.length <= 0
  ) {
    tags.value = [...arr.typeArr]
  } else if (flag.flagT && tags.value.length == 2) {
    tags.value = [...arr.typeArr, ...arr.genderArr, ...arr.priceArr]
  } else if (tags.value.length === 1 && arr.genderArr.length > 0 && arr.priceArr.length <= 0) {
    tags.value = [...arr.genderArr, ...arr.typeArr]
  } else if (tags.value.length === 1 && arr.genderArr.length <= 0) {
    tags.value = [...tags.value, ...arr.typeArr]
  } else if (tags.value.length === 2 && arr.genderArr.length > 0 && arr.priceArr.length > 0) {
    tags.value = [...tags.value, ...arr.typeArr]
  } else if (tags.value.length > 2 && tags.value[0].value === 1) {
    tags.value = tags.value.filter((item) => item.value !== 1)
    tags.value = [...arr.typeArr, ...tags.value]
  } else if (tags.value.length > 2 && tags.value[0].value !== 1 && tags.value[2].value === 1) {
    tags.value = tags.value.filter((item) => item.value !== 1)
    tags.value = [...tags.value, ...arr.typeArr]
  } else if (tags.value.length > 2 && tags.value[1].value === 1) {
    tags.value = tags.value.filter((item) => item.value !== 1)
    tags.value = [tags.value[0], ...arr.typeArr, tags.value[1]]
  }
  emits('typeHandle', { name: arr.typeArr[0]?.name, type: arr.typeArr[0]?.id, value: 1 })
}
const changeGender = (value: any) => {
  arr.genderArr = genderData
    .map((item) => {
      if (value === item.name) {
        return { name: value, value: 2 }
      }
    })
    .filter((item) => item !== undefined)
  if (
    tags.value.length <= 1 &&
    arr.genderArr.length > 0 &&
    arr.priceArr.length <= 0 &&
    arr.typeArr.length <= 0
  ) {
    tags.value = [...arr.genderArr]
  } else if (flag.flagG && tags.value.length == 2) {
    tags.value = [...arr.genderArr, ...arr.typeArr, ...arr.priceArr]
  } else if (tags.value.length === 1 && arr.typeArr.length > 0 && arr.priceArr.length <= 0) {
    tags.value = [...tags.value, ...arr.genderArr]
  } else if (tags.value.length === 1 && arr.typeArr.length <= 0) {
    tags.value = [...tags.value, ...arr.genderArr]
  } else if (tags.value.length === 2 && arr.genderArr.length > 0) {
    tags.value = [...tags.value, ...arr.genderArr]
  } else if (tags.value.length > 2 && tags.value[0].value === 2) {
    tags.value = tags.value.filter((item) => item.value !== 2)
    tags.value = [...arr.genderArr, ...tags.value]
  } else if (tags.value.length > 2 && tags.value[2].value === 2) {
    tags.value = tags.value.filter((item) => item.value !== 2)
    tags.value = [...tags.value, ...arr.genderArr]
  } else if (tags.value.length > 2 && tags.value[1].value === 2) {
    tags.value = tags.value.filter((item) => item.value !== 2)
    tags.value = [tags.value[0], ...arr.genderArr, tags.value[1]]
  }
  emits('genderHandle', { name: gender.value, value: 2 })
}
const changePrice = (value: any) => {
  const prices = priceData.find((item) => item.name === value)
  arr.priceArr = [prices]
  if (
    tags.value.length <= 1 &&
    arr.priceArr.length > 0 &&
    arr.typeArr.length <= 0 &&
    arr.genderArr.length <= 0
  ) {
    tags.value = [...arr.priceArr]
  } else if (tags.value.length == 2 && arr.priceArr.length > 0) {
    tags.value = [...tags.value, ...arr.priceArr]
  } else if (flag.flagP && tags.value.length == 2) {
    tags.value = [...arr.priceArr, ...arr.genderArr, ...arr.typeArr]
  } else if (tags.value.length == 1 && arr.priceArr.length > 0 && arr.typeArr.length > 0) {
    tags.value = [...arr.typeArr, ...arr.priceArr]
  } else if (tags.value.length == 1 && arr.priceArr.length > 0 && arr.typeArr.length <= 0) {
    tags.value = [...arr.genderArr, ...arr.priceArr]
  } else if (tags.value.length > 2 && tags.value[0].value === 3) {
    tags.value = tags.value.filter((item) => item.value !== 3)
    tags.value = [...arr.priceArr, ...tags.value]
  } else if (tags.value.length > 2 && tags.value[2].value === 3) {
    tags.value = tags.value.filter((item) => item.value !== 3)
    tags.value = [...tags.value, ...arr.priceArr]
  } else if (tags.value.length > 2 && tags.value[1].value === 3) {
    tags.value = tags.value.filter((item) => item.value !== 3)
    console.log(tags.value)
    tags.value = [tags.value[0], ...arr.priceArr, tags.value[1]]
  }
  emits('priceHandle', { name: price.value, value: 3 })
}
const closeHandle = (id: number | undefined) => {
  tags.value = tags.value.filter((item) => item?.value !== id)
  emits('closeBtn', tags.value)
  if (id === 1) {
    type.value = ''
    arr.typeArr = []
  } else if (id === 2) {
    gender.value = ''
    arr.genderArr = []
  } else {
    price.value = ''
    arr.priceArr = []
  }
}
const clear = () => {
  emits('clearBtn', tags.value)
  tags.value = []
}
const getGoodsType = async () => {
  arr.typeData = typeData
  const { data } = await getType()
  arr.typeData = data.types
}
watch(type, (newValue, oldValue) => {
  console.log('执行了')
  if (oldValue !== '') {
    flag.flagT = true
  }
})
watch(gender, (newValue, oldValue) => {
  if (oldValue !== '') {
    flag.flagG = true
  }
})
watch(price, (newValue, oldValue) => {
  if (oldValue !== '') {
    flag.flagP = true
  }
})
getGoodsType()
</script>
