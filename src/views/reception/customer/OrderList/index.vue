<template>
  <el-card class="card">
    <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="form">
      <el-form-item prop="keyword">
        <el-input
          v-model="dataForm.keyword"
          placeholder="套餐标题 / 订单编号"
          class="keyword"
          maxlength="30"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="searchHandle">查询</el-button>
      </el-form-item>
      <el-form-item class="mold">
        <el-radio-group v-model="dataForm.statusLabel" size="large" @change="searchHandle">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="待支付"></el-radio-button>
          <el-radio-button label="待预约"></el-radio-button>
          <el-radio-button label="已取消"></el-radio-button>
          <el-radio-button label="已退款"></el-radio-button>
          <el-radio-button label="已完成"></el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="order-list" v-show="!empty">
      <div class="order" v-for="one in data.dataList">
        <div class="header">
          <div class="datetime">{{ one.createTime }}</div>
          <div class="uuid">
            订单号：
            <span>{{ one.id }}</span>
          </div>
          <div class="detail" @click="searchDetailHandle()">查看商品详情</div>
        </div>
        <div class="content">
          <img :src="one.image" class="image" />
          <div class="info">
            <h4>{{ one.name }}</h4>
            <p>{{ one.description }}</p>
          </div>
          <div class="price">
            <span class="label">套餐单价</span>
            <span class="value">￥{{ one.unitPrice }}</span>
          </div>
          <div class="number">
            <span class="label">购买数量</span>
            <span class="value">×{{ one.count }}</span>
          </div>
          <div class="amount">
            <span class="label">合计</span>
            <span class="value">￥{{ one.total }}</span>
          </div>
          <div class="status">
            <span class="label">状态</span>
            <span class="value">{{ one.status }}</span>
          </div>
          <div class="operate">
            <el-button
              v-if="one.status === '待付款'"
              type="primary"
              @click="paymentHandle(one.id, one.count)"
            >
              付款
            </el-button>
            <el-button v-if="one.status === ' 待付款'" type="danger" @click="cancelOrderHandle">
              取消订单
            </el-button>
            <el-button v-if="one.status === '待预约'" plain type="primary" @click="appointHandle">
              预约体检
            </el-button>
            <el-button v-if="one.status == '已完成'">获取发票</el-button>
            <el-button
              plain
              v-if="one.status == '待预约'"
              type="danger"
              @click="refundHandle(one.id)"
            >
              退款
            </el-button>
          </div>
        </div>
      </div>
      <el-pagination
        class="pagination"
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="data.pageIndex"
        :page-sizes="[10, 20, 30]"
        :page-size="data.pageSize"
        :total="data.totalCount"
        layout="total, prev, pager, next, jumper"
      ></el-pagination>
    </div>
    <div class="empty" v-show="empty">
      <el-empty :image-size="200" description="无订单" />
    </div>
  </el-card>
  <PayDialog ref="payRef"></PayDialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { searchOrderLists, payApi, refundGoods, searchPayResult } from '@/services/api/goods'

import { ElMessageBox } from 'element-plus'
import PayDialog from '@/views/reception/goods/PayDialog/index.vue'
import { useGoodsStore } from '@/stores/modules/goods'
import { storeToRefs } from 'pinia'

interface ShowProps {
  showDialog: () => void
}
const goodsStore = useGoodsStore()
const { goodsId } = storeToRefs(goodsStore)
const empty = ref(false)
const payRef = ref<ShowProps>()
const dataForm = reactive({
  keyword: null,
  statusLabel: '全部'
})

const dataRule = reactive({
  keyword: [
    { required: false, pattern: '^[a-zA-Z0-9\u4e00-\u9fa5]{1,30}$', message: '关键字内容不正确' }
  ]
})

const data = reactive({
  dataList: [
    {
      createTime: '',
      id: '',
      image: '',
      name: '',
      description: '',
      unitPrice: 0,
      count: 2,
      total: 3600,
      status: ''
    }
  ],
  pageIndex: 1,
  pageSize: 4,
  totalCount: 0
})
const loadList = async (info?: { name?: string; code?: string; status?: number | null }) => {
  const dataInfo = {
    page: data.pageIndex,
    size: data.pageSize
  }
  const {
    data: { total, orders }
  } = await searchOrderLists({ ...dataInfo, ...info })
  console.log(total)
  if (total > 0) {
    data.totalCount = total
    data.dataList = orders.map((item: any) => {
      let obj = {}
      if (item.status === 1) {
        obj = { status: '待付款' }
      } else if (item.status === 2) {
        obj = { status: '已取消' }
      } else if (item.status === 3) {
        obj = { status: '已退款' }
      } else if (item.status === 4) {
        obj = { status: '待预约' }
      } else {
        obj = { status: '已完成' }
      }
      return { ...item, ...obj }
    })
  } else {
    empty.value = true
  }
}
loadList()
const sizeChangeHandle = (value: number) => {
  data.pageSize = value
  loadList()
}
const currentChangeHandle = (value: number) => {
  data.pageIndex = value
  loadList()
}
const searchHandle = () => {
  let data
  if (dataForm.statusLabel === '全部') {
    data = { status: null }
  } else if (dataForm.statusLabel === '待付款') {
    data = { status: 1 }
  } else if (dataForm.statusLabel === '已取消') {
    data = { status: 2 }
  } else if (dataForm.statusLabel === '已退款') {
    data = { status: 3 }
  } else if (dataForm.statusLabel === '待预约') {
    data = { status: 4 }
  } else {
    data = { status: 5 }
  }
  loadList(data)
}
//支付未支付的订单
const paymentHandle = (value: string, number: number) => {
  ElMessageBox.confirm('您确定购买该体检套餐?', '提示信息', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const dataInfo = {
      goodsId: goodsId.value,
      count: number
    }
    const { data } = await payApi(dataInfo)
    goodsStore.getId(data)
    payRef.value?.showDialog()
    const res = await searchPayResult(value)
    if (res.data) {
      loadList()
    }
  })
}
//查看商品细节
const searchDetailHandle = () => {}
//取消还为支付的订单
const cancelOrderHandle = () => {}
//预约体检
const appointHandle = () => {}
//商品退款
const refundHandle = (value: string) => {
  ElMessageBox.confirm('您确定要退款吗', '提示信息', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const data = {
      orderId: value
    }
    const { code } = await refundGoods(data)
    if (code === 200) {
      ElMessage({
        type: 'info',
        message: '退款成功，请查收退款金额',
        duration: 2000
      })
      loadList()
    } else {
      ElMessage.error('退款失败，请联系客服人员申请退款')
    }
  })
}
</script>
<style lang="less">
@import url('./index.less');
</style>
