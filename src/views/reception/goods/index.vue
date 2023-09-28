<template>
  <div class="goods-detail">
    <img :src="data.image" class="cover" />
    <div class="property">
      <h3 class="title">{{ initialData.title }} {{ initialData.code }}</h3>
      <p class="desc">{{ initialData.description }}</p>
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
          <img src="../../../assets/front/goods/discount.png" class="discount-img" />
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
          <img src="../../../assets/front/goods/property-icon-1.png" class="property-icon" />
          <span class="service-tag">专业品质</span>
          <img src="../../../assets/front/goods/property-icon-2.png" class="property-icon" />
          <span class="service-tag">官方直营</span>
          <img src="../../../assets/front/goods/property-icon-3.png" class="property-icon" />
          <span class="service-tag">随时改</span>
          <img src="../../../assets/front/goods/property-icon-4.png" class="property-icon" />
          <span class="service-tag">随时退</span>
        </div>
      </div>
      <div class="operate">
        <div class="consult-btn" @click="consultHandle">
          <img src="../../../assets/front/goods/consult.png" class="consult-icon" />
          <span>咨询客服</span>
        </div>
        <div class="buy-btn" @click="createPayment">立即付款</div>
      </div>
    </div>
  </div>
  <el-divider />
  <div class="goods-content">
    <el-descriptions title="商品摘要信息" :column="3" border>
      <el-descriptions-item label="体检名称" label-align="center"
        >{{ constantData.title }}{{ constantData.code }}</el-descriptions-item
      >
      <el-descriptions-item label="体检类型" label-align="center">{{
        constantData.type
      }}</el-descriptions-item>
      <el-descriptions-item label="适用人群" label-align="center">
        <span v-for="(tag, index) in constantData.tags" :key="index" class="tag">{{ tag }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="体检机构" label-align="center">
        泉州市神州大健康体检中心（东直门外大街234号）
      </el-descriptions-item>
      <el-descriptions-item label="体检项目" label-align="center">{{
        constantData.checkupCount
      }}</el-descriptions-item>
      <el-descriptions-item label="有效期" label-align="center"> 一年 </el-descriptions-item>
    </el-descriptions>
  </div>
  <div class="detail">
    <fieldset>
      <legend>体检项目明细</legend>
      <div v-if="constantData.count_1 > 0">
        <h4 class="detail-title">科室检查({{ constantData.count_1 }}项目)</h4>
        <table class="detail-table">
          <tr v-for="one in constantData.examineOne">
            <th>{{ one.title }}</th>
            <td>{{ one.content }}</td>
          </tr>
        </table>
      </div>
      <div v-if="constantData.count_2 > 0">
        <h4 class="detail-title">实验室检查({{ constantData.count_2 }}项目)</h4>
        <table class="detail-table">
          <tr v-for="one in constantData.examineTwo">
            <th>{{ one.title }}</th>
            <td>{{ one.content }}</td>
          </tr>
        </table>
      </div>
      <div v-if="constantData.count_3 > 0">
        <h4 class="detail-title">医技检查({{ constantData.count_3 }}项目)</h4>
        <table class="detail-table">
          <tr v-for="one in constantData.examineThree">
            <th>{{ one.title }}</th>
            <td>{{ one.content }}</td>
          </tr>
        </table>
      </div>
      <div v-if="constantData.count_4 > 0">
        <h4 class="detail-title">其他检查({{ constantData.count_4 }}项目)</h4>
        <table class="detail-table">
          <tr v-for="one in constantData.examineFour">
            <th>{{ one.title }}</th>
            <td>{{ one.content }}</td>
          </tr>
        </table>
      </div>
    </fieldset>
  </div>
  <goods-detail></goods-detail>
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
  image: '',
  type: ''
})
const handleChange = () => {}
const consultHandle = () => {}
const createPayment = () => {}
</script>
<style scope lang="less">
@import url('./index.less');
</style>
