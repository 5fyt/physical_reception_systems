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
const data = reactive({
  name: '东方不败',
  sex: '男',
  tel: '13312345678',
  photo: '',
  createTime: '2024-06-01',
  count: 3,
  number: 3,
  amount: 3789
})
const updateHandle = () => {}
</script>
<style lang="less">
@import url('./index.less');
</style>
