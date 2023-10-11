import hyRequest from '..'
import type { payParams, orderParams } from '../types/goods'
/**
 *商品套餐分类列表
 * @returns
 */
export const getGoodsTypes = () => {
  return hyRequest.get({
    url: '/goods/sort'
  })
}
/**
 *套餐商品列表
 * @param sort
 * @param params
 * @returns
 */
export const getGoodsLists = (sort: number, params: { count: number }) => {
  return hyRequest.get({
    url: `/goods/recommend/${sort}`,
    params
  })
}
/**
 *商品筛选列表
 * @param data
 * @returns
 */
export const filterSearch = (data: any) => {
  return hyRequest.post({
    url: '/goods/search',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
/**
 * 商品套餐的全部类型
 * @returns
 */
export const getType = () => {
  return hyRequest.get({
    url: '/goods/type'
  })
}
/**
 * 查询商品详情
 * @param id
 * @returns
 */
export const getGoodsDetail = (id: string) => {
  return hyRequest.get({
    url: `/goods/${id}`
  })
}
/**
 * 查询折扣信息
 * @returns
 */
export const getSorts = () => {
  return hyRequest.get({
    url: '/discount/list'
  })
}
/**
 * 下单
 * @param data
 * @returns
 */
export const payApi = (data: payParams) => {
  return hyRequest.post({
    url: '/order/submit',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
/**
 * 查询下单结果
 */
export const searchPayResult = (id: string) => {
  return hyRequest.get({
    url: `/order/pay-result/${id}`
  })
}
/**
 * 搜索订单列表
 * @param data
 * @returns
 */
export const searchOrderLists = (data: orderParams) => {
  return hyRequest.post({
    url: '/order/search',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
/**
 * 退款订单
 * @param data
 * @returns
 */
export const refundGoods = (data: { orderId: string }) => {
  return hyRequest.post({
    url: '/order/refund',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
