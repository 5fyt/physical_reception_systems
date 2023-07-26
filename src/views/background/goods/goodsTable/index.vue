<template>
  <search-form></search-form>
  <div class="goodsTable">
    <el-table
      :data="tableData.dataList"
      @selection-change="handleSelectionChange"
      v-loading="tableData.loading"
      style="width: 100%"
      border
      :header-cell-style="{ backgroundColor: '#f1f3f4' }"
    >
      <!-- 多选框 -->
      <el-table-column
        type="selection"
        header-algin="center"
        algin="center"
        width="50"
        :selectable="selectable"
      ></el-table-column>
      <!--序列号  -->
      <el-table-column type="index" header-algin="center" algin="center" width="100" label="序号">
        <template #default="scope">
          <span>{{ (tableData.pageIndex - 1) * tableData.pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        header-align="left"
        align="left"
        min-width="250"
        label="套餐名称"
      />
      <el-table-column
        prop="code"
        header-align="left"
        align="left"
        min-width="130"
        label="套餐编号"
      />
      <el-table-column header-align="center" align="center" min-width="80" label="现价">
        <template #default="scope">
          <span>￥{{ scope.row.currentPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" min-width="100" label="原价">
        <template #default="scope">
          <span>￥{{ scope.row.initialPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="ruleName"
        header-align="center"
        align="center"
        min-width="100"
        label="促销方案"
      />
      <el-table-column
        prop="salesVolume"
        header-align="center"
        align="center"
        min-width="100"
        label="销量"
      />
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        min-width="100"
        label="类型"
      />
      <el-table-column label="体检内容" algin="center" min-width="100" header-algin="center">
        <template #default="scope">
          <span
            :class="scope.row.hasWord ? 'link-blue' : 'link-red'"
            @click="documentHandler(scope.row.id, scope.row.hasWord)"
          >
            {{ scope.row.hasWord ? '有文档' : '无文档' }}
          </span>
        </template>
      </el-table-column>
      <!-- 上架和下架 -->
      <el-table-column label="状态" algin="center" header-algin="center" min-width="80">
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            active-text="上架"
            inactive-text="下架"
            @change="switchChangeHandler(scope.row.id, scope.row.status)"
          />
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" algin="center" header-align="center" min-width="150">
        <template #default="scope">
          <el-button :disabled="!scope.row.status" @click="perviewHandler(scope.row.id)" text
            >预览</el-button
          >
          <el-button :disabled="scope.row.status" @click="deleteHandler(scope.row.id)" text
            >删除</el-button
          >
          <el-button :disabled="scope.row.status" @click="updateHandler(scope.row.id)" text
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="tableData.pageIndex"
        v-model:page-size="tableData.pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <dialog-form></dialog-form>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import SearchForm from '../searchForm/index.vue'
import DialogForm from '../dialogForm/index.vue'
const tableData = reactive({
  loading: false,
  pageIndex: 1,
  pageSize: 10,
  totalCount: 0,
  dataList: [],
  selection: [] //选中行的数组
})
const handleSelectionChange = () => {}
const handleCurrentChange = () => {}
const selectable = () => {}
const documentHandler = () => {}
const handleSizeChange = () => {}
</script>
<style lang="less">
@import url('./index.less');
</style>
