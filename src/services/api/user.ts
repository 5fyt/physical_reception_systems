import hyRequest from '..'
import type { photoParams, phoneParams,profileParams } from '../types/user'

/**
 *获取用户个人信息
 * @returns
 */
export const getUserInfo = () => {
  return hyRequest.get({
    url: '/user/profile'
  })
}
/**
 * 更换头像
 * @param data
 * @returns
 */
export const updatePhoto = (data: photoParams) => {
  return hyRequest.post({
    url: `/user/update-photo`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
/**
 * 上传头像
 * @param data formData 表单数据
 * @param type
 * @returns
 */
export const loadPhoto = (data: any) => {
  return hyRequest.post({
    url: `/user/apply-upload-photo`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

/**
 * 更新电话号码
 * @param data
 * @returns
 */
export const updatePhone = (data: phoneParams) => {
  return hyRequest.post({
    url: '/user/update-phone',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
/**
 * 更新个人信息
 * @param data
 * @returns
 */
export const updateProfile = (data: profileParams) => {
  return hyRequest.post({
    url: '/user/update-profile',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
