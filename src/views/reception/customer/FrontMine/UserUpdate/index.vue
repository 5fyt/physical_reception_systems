<template>
  <el-dialog v-model="visible" width="400px" class="dialog" :close-on-click-modal="false">
    <el-form :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="用户性别">
        <el-select v-model="form.gender">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-change="handleChange"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :http-request="uploadRequest"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消修改</el-button>
        <el-button type="primary" @click="confirmHandle">确定修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { loadPhoto, updatePhoto, updateProfile } from '@/services/api/user'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import type { UploadProps, UploadRawFile } from 'element-plus'
const emits = defineEmits(['refreshLoad'])
type InfoType = {
  url: string
  raw: UploadRawFile | undefined
  path: string
}
const imageUrl = ref('')
const suffix = ref('')
const visible = ref(false)
const loadInfo = reactive<InfoType>({
  url: '',
  raw: undefined,
  path: ''
})
const form = reactive({
  gender: '',
  name: ''
})
const show = () => {
  visible.value = true
  imageUrl.value = ''
  form.gender = ''
  form.name = ''
}
const confirmHandle = async () => {
  visible.value = false
  if (imageUrl.value && !form.gender && !form.name) {
    const { code } = await updatePhoto({ path: loadInfo.path })
    if (code === 200) {
      // const { photo, ...other } = JSON.parse(localStorage.getItem('login') as string)
      // console.log(data)
      // localStorage.setItem('login', JSON.stringify({ photo: data, ...other }))
      emits('refreshLoad', 'photo')
      ElMessage.success('上传头像成功')
    }
  } else if (imageUrl.value && form.gender && form.name) {
    const data = { ...form }
    await updatePhoto({ path: loadInfo.path })
    const { code } = await updateProfile(data)
    if (code === 200) {
      emits('refreshLoad')
      ElMessage.success('修改用户信息成功')
      visible.value = false
    }
  } else {
    const data = { ...form }
    const { code } = await updateProfile(data)
    if (code === 200) {
      emits('refreshLoad', 'user')
      ElMessage.success('修改信息成功')
    }
  }
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}
const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  if (uploadFile.status === 'ready') {
    loadInfo.raw = uploadFile.raw
  }
}
//自定义上传图片
const uploadRequest = async () => {
  const dataObj = {
    suffix: suffix.value
  }
  const { data } = await loadPhoto(dataObj)
  loadInfo.url = data?.url
  loadInfo.path = data?.path
  axios.put(loadInfo.url, loadInfo.raw)
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const type = rawFile.type.split('/')[1]
  if (type === 'jepg' || type === 'jpg') {
    suffix.value = 'jepg'
  } else {
    suffix.value = type
  }
  if (rawFile.type === 'image/webp') {
    ElMessage.error('不支持webp的图片格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不超过2M!')
    return false
  }
  return true
}
defineExpose({ show })
</script>
<style scoped lang="less">
@import url('./index.less');
</style>
