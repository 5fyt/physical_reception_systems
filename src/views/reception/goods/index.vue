<template>
  <div class="goods-detail">
    <img :src="data.image" class="cover" />
    <div class="property">
      <h3 class="title">{{ data.title }} {{ data.code }}</h3>
      <p class="desc">{{ data.description }}</p>
      <div class="row">
        <label>官网价格：</label>
        <div class="info">
          <span class="current-price">{{ data.currentPrice }}</span>
          <span class="initial-price">￥{{ data.initialPrice }}</span>
        </div>
      </div>
      <div class="row">
        <label>享有折扣：</label>
        <div class="info">
          <img src="../../../assets/front/goods/discoun.png" class="discount-img" />
          <span class="discount">{{ data.ruleName != null ? data.ruleName : '无' }}</span>
        </div>
      </div>
      <!--下面的标签是新添加的-->
      <div class="row">
        <label>商品类型：</label>
        <div class="info">虚拟卡（电子卡密）</div>
      </div>
      <div class="row">
        <label>适用人群：</label>
        <div class="info">{{ data.type }}</div>
      </div>
      <div class="row">
        <label>购买数量：</label>
        <div class="info">
          <el-input-number
            v-model="dataForm.number"
            size="small"
            :min="1"
            :max="10"
            @change="handleChange"
          />
        </div>
      </div>
      <div class="row">
        <label>服务承诺：</label>
        <div class="info">
          <img src="../../../assets/front/goods/tgcn_icon.png" class="property-icon" />
          <span class="service-tag">院方授权</span>
          <img src="../../../assets/front/goods/tjzd_icon.png" class="property-icon" />
          <span class="service-tag">退改承诺</span>
          <img src="../../../assets/front/goods/yfsq_icon.png" class="property-icon" />
          <span class="service-tag">体检指导</span>
        </div>
      </div>
      <div class="operate">
        <div class="consult-btn" @click="consultHandle">
          <span>咨询客服</span>
        </div>
        <div class="buy-btn" @click="createPayment">立即付款</div>
      </div>
    </div>
  </div>
  <GoodsDetail></GoodsDetail>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import GoodsDetail from '../goods/goodsdetail/index.vue'

const dataForm = reactive({
  number: 0
})
const data = reactive({
  image: '',
  title: '',
  code: '',
  description: '',
  type: '',
  initialPrice: 2249.0,
  currentPrice: 2142.0,
  ruleName: null
})
const consultHandle = () => {}
const createPayment = () => {}
const handleChange = () => {}
</script>
<style lang="less">
@import url('./index.less');
</style>
