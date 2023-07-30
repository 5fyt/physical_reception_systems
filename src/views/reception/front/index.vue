<template>
  <div class="front">
    <img src="../../../assets/front/index/banner.webp" class="banner" />
    <div class="service-container">
      <div class="service">
        <img src="../../../assets/front/index/service-icon-1.png" />
        <div>
          <h4>体检预约</h4>
          <p>一站式预约服务</p>
        </div>
      </div>
      <div class="service">
        <img src="../../../assets/front/index/service-icon-2.png" />
        <div>
          <h4>报告查询</h4>
          <p>体检报告快速查询</p>
        </div>
      </div>
      <div class="service">
        <img src="../../../assets/front/index/service-icon-3.png" />
        <div>
          <h4>活动热卖</h4>
          <p>当季推荐特惠商品</p>
        </div>
      </div>
      <div class="service">
        <img src="../../../assets/front/index/service-icon-4.png" />
        <div>
          <h4>企业专区</h4>
          <p>企业专属健康服务</p>
        </div>
      </div>
    </div>
  </div>
  <goods-list></goods-list>
</template>
<script setup lang="ts">
import GoodsList from '@/components/baseUI/GoodsList/index.vue'
</script>
<style lang="less" scope>
@import url('../../../styles/index.less');
.banner {
  width: 100%;
  margin-top: 25px;
  display: block;
}
.service-container {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  .service {
    width: 280px;
    height: 114px;
    background-color: @bgc-18;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: @bgc-15;
      transition-duration: 0.12s;
      transition-property: all;
    }
    img {
      width: 45px;
      height: 48px;
      display: block;
      margin-right: 10px;
    }
    h4 {
      margin: 0 0 4px 0;
      font-size: 22px;
      color: #fff;
      font-weight: normal;
    }
    p {
      margin: 0;
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>
