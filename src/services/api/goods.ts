import hyRequest from '..'

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
