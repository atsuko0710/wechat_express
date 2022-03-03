import login from './login';

export default function (params) {
  let access_token = wx.getStorageSync('access_token');
  let access_token_expired_at = wx.getStorageSync('access_token_expired_at');
  let header = {
    "content-type": "application/json",
  };
  if (access_token && access_token_expired_at && access_token_expired_at > new Date().getTime()) {
    header["Authorization"] = "Bearer " + access_token;
    return new Promise((resolve, reject) => {
      wx.request({
        url: params.url,
        header: header,
        data: params.data,
        method: params.method,
        dataType: 'json',
        success: (res) => {
          console.log(res)
          resolve(res);
        },
        fail: (err) => {
          wx.showToast({
            icon: "none",
            title: "请求失败",
          });
        }
      })
    })
  } else {
    login().then(() => {
      return new Promise((resolve, reject) => {
        wx.request({
          url: params.url,
          header: header,
          data: params.data,
          method: params.method,
          dataType: 'json',
          success: (res) => {
            resolve(res.data);
          },
          fail: (err) => {
            wx.showToast({
              icon: "none",
              title: "请求失败",
            });
          }
        })
      })
    })
  }
}
