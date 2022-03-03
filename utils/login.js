const loginUrl = "https://money.atsukodan.cn/weapp/authorizations";

export default function () {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        console.log(res.code)
        if (res.code) {
          wx.request({
            url: loginUrl,
            data: {
              code: res.code
            },
            method: 'POST',
            success: (result) => {
              console.log(result)
              // 成功之后储存token到本地
              wx.setStorageSync("access_token", result.data.data.token);
              wx.setStorageSync('access_token_expired_at', Date.parse(new Date()) + 3600000);
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