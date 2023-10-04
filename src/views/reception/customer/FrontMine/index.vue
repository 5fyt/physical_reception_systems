<template>
  <div class="summary-container">
    <el-card class="box-card">
      <div class="info">
        <div class="left">
          <el-avatar :size="45" shape="circle" :src="data.info.photo">
            <el-icon size="25">
              <UserFilled />
            </el-icon>
          </el-avatar>
        </div>
        <div class="right">
          <div class="base">
            <span>姓名：{{ data.info.name }}</span>
            <span>性别：{{ data.info.gender }}</span>
            <span>电话号码：{{ data.info.phone }}</span>
            <div class="operate" @click="updateHandle">
              <el-icon :size="18">
                <Edit />
              </el-icon>
              <div>修改资料</div>
            </div>
          </div>
          <el-tag type="success"> 注册时间：{{ data.info.createTime }} </el-tag>
        </div>
      </div>

      <el-row :gutter="16">
        <el-col :span="6">
          <div class="statistic-card">
            <el-statistic :value="Number(data.info.totalAmount)" :precision="2" suffix="元">
              <template #title>
                <div class="title">累计消费金额</div>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="statistic-card">
            <el-statistic :value="data.info.orderCount" suffix="笔">
              <template #title>
                <div class="title">有效订单数量</div>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="statistic-card">
            <el-statistic :value="data.info.goodsCount" suffix="个">
              <template #title>
                <div class="title">体检套餐数量</div>
              </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <UserUpdate ref="showRef" @refreshLoad="refreshLoad"></UserUpdate>
  </div>
</template>
<script lang="ts" setup>
import { getUserInfo } from '@/services/api/user'
import UserUpdate from './UserUpdate/index.vue'
import { reactive, ref } from 'vue'
interface ShowProps {
  show: () => void
}
const data = reactive({
  info: {
    name: '',
    gender: '',
    phone: '',
    photo: '',
    createTime: '',
    goodsCount: 0,
    orderCount: 0,
    totalAmount: '0'
  }
})
const showRef = ref<ShowProps>()
const getProfile = async () => {
  if (!data.info.gender) {
    const { data: result } = await getUserInfo()
    data.info = { ...result }
  }
}
getProfile()
const refreshLoad = async () => {
  const { data: result } = await getUserInfo()
  data.info = { ...result }
}
const updateHandle = () => {
  showRef.value?.show()
}
</script>
<style lang="less">
@import url('./index.less');
</style>
