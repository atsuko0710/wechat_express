import api from './api.js';

const loginUrl = "/weapp/authorizations";

export default function () {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        console.log(res.code)
        if (res.code) {
          var url = api.host + loginUrl
          wx.request({
            url: url,
            data: {
              code: res.code
            },
            method: 'POST',
            success: (result) => {
              // 成功之后储存token到本地
              wx.setStorageSync("access_token", result.data.data.token);
              wepy.setStorageSync('access_token_expired_at', new Date().getTime() + 3600);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail: (res) => {
        // 请求失败弹窗统一跳转到请求失败页面
        wx.showToast({
          icon: "none",
          title: "微信登录失败",
        });
      },
    })
  })
}