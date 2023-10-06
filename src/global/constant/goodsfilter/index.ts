const filterArr = [
  {
    title: '套餐类型',
    active: '',
    data: [
      { name: '父母体检' },
      { name: '入职体检' },
      { name: '职场白领' },
      { name: '个人高端' },
      { name: '中青年体检' }
    ]
  },
  {
    active: '',
    title: '适用人群',
    data: [{ name: '男性' }, { name: '女未婚' }, { name: '女已婚' }]
  },
  {
    active: '',
    title: '套餐价格',
    data: [
      { name: '0~100', value: 1 },
      { name: '100~500', value: 2 },
      { name: '500~1000', value: 3 },
      { name: '1000以上', value: 4 }
    ]
  }
]
export default filterArr
