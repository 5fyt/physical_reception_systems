<template>
  <div class="dialog">
    <el-dialog
      v-model="showVisible"
      :title="id ? '修改' : '新增'"
      width="750px"
      :close-on-click-modal="false"
    >
      <el-form :model="dialogForm" :rules="dialogRules" ref="dialogRef" label-width="80px">
        <el-form-item label="套餐名称" prop="title">
          <el-input v-model="dialogForm.title" maxlength="50" clearable />
        </el-form-item>
        <el-form-item label="套餐编号" prop="code">
          <el-input v-model="dialogForm.code" maxlength="20" clearable />
        </el-form-item>
        <el-form-item label="简介信息" prop="description">
          <el-input
            type="textarea"
            v-model="dialogForm.description"
            :rows="4"
            maxlength="200"
            clearable
          />
        </el-form-item>
        <el-form-item label="套餐原价" prop="initialPrice">
          <el-input
            v-model="dialogForm.initialPrice"
            placeholder="输入原价"
            class="price"
            maxlength="20"
            clearable
          >
            <template #append> 元 </template>
          </el-input>
          <span class="desc">提示：价格精确到分（小数点后两位）</span>
        </el-form-item>
        <el-form-item label="套餐现价" prop="currentPrice">
          <el-input
            v-model="dialogForm.currentPrice"
            placeholder="输入现价"
            class="price"
            maxlength="20"
            clearable
          >
            <template #append> 元 </template>
          </el-input>
          <span class="desc">提示：价格精确到分（小数点后两位）</span>
        </el-form-item>
        <el-form-item label="折扣列表">
          <el-select v-model="dialogForm.discount" placeholder="选择折扣信息" clearable>
            <el-option :label="one.name" :value="one.id" v-for="one in dialogForm.discountList" />
          </el-select>
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item label="封面图片" prop="image">
          <el-upload
            class="avatar-uploader"
            :action="uploadData.action"
            :headers="uploadData.headers"
            :data="uploadData.data"
            accept=".jpg,.jpeg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="dialogForm.imageUrl" :src="dialogForm.imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="套餐类别" prop="type">
          <el-select v-model="dialogForm.type" placeholder="检查类别" clearable>
            <el-option label="父母体检" value="父母体检" />
            <el-option label="入职体检" value="入职体检" />
            <el-option label="职场白领" value="职场白领" />
            <el-option label="个人高端" value="个人高端" />
            <el-option label="中青年体检" value="中青年体检" />
          </el-select>
        </el-form-item>
        <el-form-item label="特征标签">
          <div class="tag-row">
            <el-input v-model="dialogForm.tag" @keyup.enter="addTag" class="tag-input" clearable />
            <span class="desc">提示：输入标签后按回车键</span>
          </div>
          <div class="tags">
            <el-tag v-for="(tag, index) in dialogForm.tags" :key="index" closable>
              {{ tag }}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item label="展示区" prop="partId">
          <el-select v-model="dialogForm.exhibit" placeholder="选择展示区" clearable>
            <el-option label="活动专区" value="1" />
            <el-option label="热卖套餐" value="2" />
            <el-option label="新品推荐" value="3" />
            <el-option label="孝敬父母" value="4" />
            <el-option label="白领精英" value="5" />
          </el-select>
        </el-form-item>
        <!-- 体检内容可增加也可删除 -->
        <el-form-item label="体检内容">
          <el-row :gutter="10" v-for="(item, index) in dialogForm.examContent" :key="index">
            <el-col :span="6">
              <el-select v-model="item.type" placeholder="检查类别" clearable="clearable">
                <el-option label="科室检查" value="科室检查" />
                <el-option label="实验室检查" value="实验室检查" />
                <el-option label="医技检查" value="医技检查" />
                <el-option label="其他检查" value="其他检查" />
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-input v-model="item.title" placeholder="体检项目" maxlength="50" clearable />
            </el-col>
            <el-col :span="11">
              <el-input v-model="item.content" placeholder="体检内容" maxlength="500" clearable />
            </el-col>
            <el-col :span="1">
              <el-button type="primary" :icon="Delete" @click="deleteItem(index)" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="addProject">添加项目</el-button>
          <el-button @click="showVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, UploadProps } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
const showVisible = ref<boolean>(false)
const id = ref<number>(0)
const dialogRef = ref<FormInstance>()
//表单初始值
const dialogForm = reactive({
  id: null,
  title: null,
  code: null,
  description: null,
  initialPrice: null,
  currentPrice: null,
  discount: null,
  image: null,
  type: null,
  tag: null,
  exhibit: null,
  tags: [],
  examContent: [{}]
})
//上传图片数据初始化
const uploadData = reactive({
  action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
  headers: {
    token: localStorage.getItem('token')
  },
  data: {
    id: null
  }
})
//选择器初始值
const optionsList = reactive({
  discountList: []
})
//表单校验
const dialogRules = reactive({
  title: [
    { required: true, message: '名称不能为空' },
    { min: 2, message: '名称不能少于2个字符' },
    { pattern: '^[a-zA-Z0-9\u4e00-\u9fa5]{2,50}$', message: '名称格式错误' }
  ],
  code: [
    { required: true, message: '编号不能为空' },
    { min: 6, message: '编号不能少于6个字符' },
    { pattern: '^[a-zA-Z0-9]{6,20}$', message: '编号格式错误' }
  ],
  description: [{ required: true, message: '简介信息不能为空' }],
  initialPrice: [
    { required: true, message: '价格不能为空' },
    {
      pattern: '(^[1-9]([0-9]+)?(\\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\\.[0-9]([0-9])?$)',
      message: '价格不正确'
    }
  ],
  currentPrice: [
    { required: true, message: '价格不能为空' },
    {
      pattern: '(^[1-9]([0-9]+)?(\\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\\.[0-9]([0-9])?$)',
      message: '价格不正确'
    }
  ],
  image: [{ required: true, message: '没有上传封面图片' }],
  type: [{ required: true, message: '没有选择套餐类别' }]
})
//上传成功回调函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {}
//上传失败回调函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {}
//删除体检内容
const deleteItem = () => {}
//添加项目
const addProject = () => {}
const dialogFormSubmit = () => {}
const addTag = () => {}
</script>
<style lang="less" scope>
@import url('./index.less');
</style>
