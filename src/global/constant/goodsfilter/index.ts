const filterArr = [
  {
    title:'分类',
    active:'不限',
    data: [
      { name: '不限' },
      { name: '父母体检' },
      { name: '入职体检' },
      { name: '职场白领' },
      { name: '个人高端' },
      { name: '中青年体检' }
    ]
  },
  {
    active:'不限',
    title:"性别",
    data: [{ name: '不限' }, { name: '男性' }, { name: '女性' }]
  },
  {
    active:'不限',
    title:"价格",
    data: [
      { name: '不限' },
      { name: '0~100', value: 1 },
      { name: '100~500', value: 2 },
      { name: '500~1000', value: 3 },
      { name: '1000以上', value: 4 }
    ]
  }
]
export default filterArr
