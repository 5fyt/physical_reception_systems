<template>
  <div class="dialogExcel">
    <el-dialog v-model="dialogData.excelVisible" width="350px">
      <div class="message-content">
        <el-icon :size="18" class="icon">
          <WarningFilled />
          <p>
            请您选择【上传】或者【下载】体检内容文档？如果未上传体检内容文档，则体检套餐则无法上架
          </p>
        </el-icon>
      </div>
      <template #footer>
        <span class="document-dialog-footer">
          <el-upload
            class="avatar-uploader"
            :action="dialogData.action"
            :headers="dialogData.headers"
            :data="dialogData.data"
            accept=".xlms"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-button type="success" :icon="upload" class="uploadBtn"> 上传</el-button>
          </el-upload>
          <el-button
            type="primary"
            :icon="Download"
            :disabled="false"
            class="downloadBtn"
            @click="downloadHandler"
            >下载</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
const dialogData = reactive({
  excelVisible: false,
  excelData: {
    id: null
  },
  action: '',
  headers: {
    token: localStorage.getItem('token')
  }
})
const handleAvatarSuccess = () => {}
const beforeAvatarUpload = () => {}
const downloadHandler = () => {}
</script>
<style lang="less">
.message-content {
  display: flex;
  .icon {
    color: @bgc-17;
    margin-top: 3px;
  }
  p {
    margin: 0 10px 5px 10px;
    line-height: 1.7;
  }
}
.document-dialog-footer {
  display: flex;
  justify-content: right;
  .uploadBtn {
    margin-right: 10px;
  }
  .downloadBtn {
  }
}
</style>
