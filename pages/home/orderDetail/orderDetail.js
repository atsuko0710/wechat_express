// pages/home/orderDetail/orderDetail.js
import authRequest from "../../../utils/request"

Page({
  data: {
    order: []
  },
  onLoad: function (options) {
    var that = this
    authRequest({
      url: 'https://money.atsukodan.cn/weapp/order?id=' + options.id,
      method: "GET",
    }).then((res) => {
      if (res.data.code == 200) {
        that.setData({
          order: res.data.data,
        });
      }
    })
  },
  toExpress() {
    var waybill = this.data.order.waybill
    // 跳转到物流信息页面
    wx.navigateTo({
      url: '/pages/express/express?waybill=' + waybill,
    })
  }
})