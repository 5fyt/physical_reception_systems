<template>
  <div class="goods-detail">
    <img :src="data.info.image" class="cover" />
    <div class="property">
      <h3 class="title">{{ data.info.name }} {{ data.info.code }}</h3>
      <p class="desc">{{ data.info.description }}</p>
      <div class="row">
        <label>官网价格：</label>
        <div class="info">
          <span class="current-price">{{ data.info.currentPrice }}</span>
          <span class="initial-price">￥{{ data.info.originalPrice }}</span>
        </div>
      </div>
      <div class="row">
        <label>享有折扣：</label>
        <div class="info">
          <img src="../../../assets/front/goods/discoun.png" class="discount-img" />
          <span class="discount">{{
            data.info.discountId != null ? data.info.discountId : '无'
          }}</span>
        </div>
      </div>
      <!--下面的标签是新添加的-->
      <div class="row">
        <label>商品类型：</label>
        <div class="info">虚拟卡（电子卡密）</div>
      </div>
      <div class="row">
        <label>适用人群：</label>
        <div class="info">{{ data.info.type }}</div>
      </div>
      <div class="row">
        <label>购买数量：</label>
        <div class="info">
          <el-input-number
            v-model="dataForm.number"
            size="small"
            :min="1"
            :max="15"
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
  <LoginDialog ref="dialogRef"></LoginDialog>
  <PayDialog ref="payRef" ></PayDialog>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { reactive, ref, watch, onMounted } from 'vue'
import GoodsDetail from '../goods/goodsdetail/index.vue'
import LoginDialog from '@/Layout/logindialog/index.vue'
import { useGoodsStore } from '@/stores/modules/goods'
import PayDialog from './PayDialog/index.vue'
import { getGoodsDetail, getType, getSorts, payApi } from '@/services/api/goods'
import { ElMessageBox } from 'element-plus'
interface ShowProps {
  showDialog: () => void
}
const route = useRoute()
const goodsStore = useGoodsStore()
const dialogRef = ref<ShowProps>()
const payRef = ref<ShowProps>()
const id = ref<string>('')
const qrcode = ref('')
const dataForm = reactive({
  number: 0
})
const data = reactive({
  info: {
    image: '',
    name: '',
    code: '',
    description: '',
    type: '',
    originalPrice: 0,
    currentPrice: 0,
    discountId: null
  }
})
const consultHandle = () => {}
const createPayment = () => {
  const token = JSON.parse(localStorage.getItem('login') as string)?.token
  if (!token) {
    dialogRef.value?.showDialog()
  } else {
    ElMessageBox.confirm('您确定购买该体检套餐?', '提示信息', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const dataInfo = {
        goodsId: id.value,
        count: dataForm.number
      }
      const { data} = await payApi(dataInfo)
      goodsStore.getId(data)

      payRef.value?.showDialog()
    })
  }
}

const handleChange = () => {}
onMounted(() => {
  window.scrollTo(0, 0)
}),
  watch(
    () => route.params.id,
    async (newValue) => {
      if (newValue) {
        id.value = newValue as string
        const {
          data: {
            type,
            tag,
            discountId,
            departmentCheckup,
            laboratoryCheckup,
            medicalCheckup,
            otherCheckup,
            ...otherInfo
          }
        } = await getGoodsDetail(newValue as string)
        data.info = { ...otherInfo }
        const {
          data: { types }
        } = await getType()
        types.forEach((item: any) => {
          if (item.type === type) {
            data.info.type = item.name
          }
        })
        const {
          data: { discounts }
        } = await getSorts()
        discounts.forEach((item: any) => {
          if (item.id === discountId) {
            data.info.discountId = item.name
          }
        })
      }
    },
    { deep: true, immediate: true }
  )
</script>
<style lang="less">
@import url('./index.less');
</style>
