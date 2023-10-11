export type payParams = {
  goodsId: string | string[]
  count: number
}
export type orderParams = {
  page: number
  size: number
  name?: string
  code?: string
  status?: number |null
}
