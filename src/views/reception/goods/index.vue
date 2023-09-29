<template>
  <div class="summary-container">
    <el-card class="box-card">
      <div class="info">
        <div class="left">
          <el-avatar :size="45" shape="circle" :src="data.photo">
            <el-icon size="25">
              <UserFilled />
            </el-icon>
          </el-avatar>
        </div>
        <div class="right">
          <div class="base">
            <span>姓名：{{ data.name }}</span>
            <span>性别：{{ data.sex }}</span>
            <span>电话号码：{{ data.tel }}</span>
            <div class="operate" @click="updateHandle">
              <el-icon :size="18">
                <Edit />
              </el-icon>
              <div>修改资料</div>
            </div>
          </div>
          <el-tag type="success"> 注册时间：{{ data.createTime }} </el-tag>
        </div>
      </div>

      <el-row :gutter="16">
        <el-col :span="6">
          <div class="statistic-card">
            <el-statistic :value="data.amount" suffix="元">
              <template #title>
                <div class="title">累计消费金额</div>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="statistic-card">
            <el-statistic :value="data.count" suffix="笔">
              <template #title>
                <div class="title">有效订单数量</div>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="statistic-card">
            <el-statistic :value="data.number" suffix="个">
              <template #title>
                <div class="title">体检套餐数量</div>
              </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import GoodsDetail from '../goods/goodsdetail/index.vue'
import initialData from '@/global/constant/goods/index'
const dataForm = reactive({
  number: 1
})
const constantData = reactive(initialData)
const data = reactive({
  initialPrice: 2249.0,
  currentPrice: 2142.0,
  ruleName: null,
  photo: '',
  name: '',
  sex: '',
  tel: '',
  createTime: '',
  amount: '',
  count: '',
  number: ''
})
const handleChange = () => {}
const updateHandle = () => {}
</script>
<style lang="less">
@import url('./index.less');
</style>
