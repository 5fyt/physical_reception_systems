<template>
  <div class="searchForm">
    <el-form :inline="true" :model="searchForm" :rules="searchRule" ref="form">
      <el-form-item prop="keyword">
        <el-input
          v-model="searchForm.comboName"
          placeholder="套餐名称"
          maxlength="50"
          class="input"
          clearable="clearable"
        />
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="searchForm.comboCode"
          placeholder="套餐编号"
          class="input"
          maxlength="20"
          clearable="clearable"
        />
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.type" class="input" placeholder="类别" clearable="clearable">
          <el-option label="父母体检" value="父母体检" />
          <el-option label="入职体检" value="入职体检" />
          <el-option label="职场白领" value="职场白领" />
          <el-option label="个人高端" value="个人高端" />
          <el-option label="中青年体检" value="中青年体检" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="searchForm.exhibit"
          class="input"
          placeholder="展示区"
          clearable="clearable"
        >
          <el-option label="活动专区" value="1" />
          <el-option label="热卖套餐" value="2" />
          <el-option label="新品推荐" value="3" />
          <el-option label="孝敬父母" value="4" />
          <el-option label="白领精英" value="5" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
        <el-button type="primary" :disabled="auth(['root', 'goods:insert'])" @click="addHandle()">
          新增
        </el-button>
        <el-button
          type="danger"
          :disabled="auth(['root', 'goods:delete'])"
          @click="deleteHandle()"
        >
          批量删除
        </el-button>
      </el-form-item>
      <el-form-item class="mold">
        <el-radio-group v-model="searchForm.statusBtn" @change="searchHandle()">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="已上架"></el-radio-button>
          <el-radio-button label="已下架"></el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { auth } from '@/utils/auth.ts'
const searchForm = reactive({
  comboName: null,
  comboCode: null,
  type: null,
  exhibit: null,
  stautBtn: '全部'
})
const searchRule = reactive({
  comboName: [{ pattern: '^[a-zA-Z0-9\u4ea8-\u9fa5]{1,50}$', message: '关键文字不能为空' }],
  comboCode: [
    { min: 6, message: '编号不能少于六个字符' },
    { pattern: '^[a-zA-Z0-9]{6,20}$', message: '编码格式错误' }
  ]
})
</script>
<style lang="less">
@import url('./index.less');
</style>
