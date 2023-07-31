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
  <div class="partner-container">
    <h3>—&nbsp;&nbsp;合作伙伴&nbsp;&nbsp;—</h3>
    <el-carousel height="220px" :autoplay="false">
      <el-carousel-item>
        <el-row :gutter="20">
          <el-col :span="6">
            <img class="logo" src="../../../assets/front/index/c1.png" />
          </el-col>
          <el-col :span="6">
            <img class="logo" src="../../../assets/front/index/c2.png" />
          </el-col>
          <el-col :span="6">
            <img class="logo" src="../../../assets/front/index/c3.png" />
          </el-col>
          <el-col :span="6">
            <img class="logo" src="../../../assets/front/index/c4.png" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <img class="logo" src="../../../assets/front/index/c5.png" />
          </el-col>
          <el-col :span="6">
            <img class="logo" src="../../../assets/front/index/c6.png" />
          </el-col>
          <el-col :span="6">
            <img class="logo" src="../../../assets/front/index/c7.png" />
          </el-col>
          <el-col :span="6">
            <img class="logo" src="../../../assets/front/index/c8.png" />
          </el-col>
        </el-row>
      </el-carousel-item>
      <el-carousel-item>
        <el-row :gutter="20">
          <el-col :span="6">
            <img class="logo" src="../../../assets/front/index/c9.png" />
          </el-col>
          <el-col :span="6">
            <img class="logo" src="../../../assets/front/index/c10.png" />
          </el-col>
          <el-col :span="6">
            <img class="logo" src="../../../assets/front/index/c11.png" />
          </el-col>
          <el-col :span="6">
            <img class="logo" src="../../../assets/front/index/c12.png" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <img class="logo" src="../../../assets/front/index/c13.png" />
          </el-col>
          <el-col :span="6">
            <img class="logo" src="../../../assets/front/index/c14.png" />
          </el-col>
          <el-col :span="6">
            <img class="logo" src="../../../assets/front/index/c15.png" />
          </el-col>
          <el-col :span="6">
            <img class="logo" src="../../../assets/front/index/c16.png" />
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
  </div>
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
.partner-container {
    h3 {
      font-size: 36px;
      text-align: center;
      margin-top: 70px;
      margin-bottom: 40px;
      color: @fc-1;
    }
    .el-row {
      margin-bottom: 50px;
    }
    .logo {
      margin-left: auto;
      margin-right: auto;
      display: block;
    }
  }
</style>
