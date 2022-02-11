const app = getApp()

Page({
  data: {
    infoList: [],
    waybill: ""
  },

  waybillInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      'waybill': e.detail.value
    })
  },

  startSearch: function (e) {
    var that = this;
    console.log(this.data.waybill)
    wx.request({
      url: 'https://money.atsukodan.cn/kuaidi?waybill=' + this.data.waybill,
      header: {
        "headerSignature": app.globalData.signature
      },
      method: "GET",
      success(res) {
        console.log(res)
        if (res.data.code == 200) {
          that.setData({
            infoList: res.data.data,
          });
        } else {
          that.setData({
            infoList: ['查无信息'],
          });
        }
      }
    })
  }
})
