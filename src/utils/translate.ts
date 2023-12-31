export const objTransArrayObj = (type: string, objData: any) => {
  let arr = []
  for (let key in objData) {
    let item
    if (type === 'dept') {
      item = { id: objData[key], deptName: key }
    } else if (type === 'permission') {
      item = { key: objData[key], label: key }
    } else {
      item = { id: objData[key], roleName: key }
    }
    arr.push(item)
  }
  return arr
}
