import hyRequest from '..'

import type { SendType, loginParams, passwordParams,picParams } from '../types/login'
/**
 * 运营端登入
 * @param data
 * @returns
 */
export const login = (data: loginParams) => {
  return hyRequest.post({
    url: `/user/login`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

/**
 *退出登入
 * @returns
 */
export const loginOut = () => {
  return hyRequest.post({
    url: `/user/logout`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
/**
 * 发送短信验证码
 * @param data
 * @returns
 */
export const sendCode = (data: SendType) => {
  return hyRequest.post({
    url: '/user/send-verification-code',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
/**
 * 发送图片验证码
 * @param params height ，width
 * @returns
 */
export const sendPicCode = (params:picParams) => {
  return hyRequest.get({
    url:'/user/generate-image-code',
    params
  })
}
/**
 * 更改密码
 * @param data
 * @returns
 */
export const updatePhone = (data: passwordParams) => {
  return hyRequest.post({
    url: `/user/change-password`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

