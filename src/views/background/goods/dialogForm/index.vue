<template>
  <div class="dialog">
    <el-dialog v-model="showVisible"></el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
const showVisible = ref(false)
const dialogForm=reactive({})
const optionsList=reactive({
  discountList:[]
})
</script>
