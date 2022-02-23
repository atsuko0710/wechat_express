// pages/home/order/order.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    orderList: []
  },
  goToDetail: function (e) {
    wx.navigateTo({
      url: '/pages/home/orderDetail/orderDetail',
    })
  },
  onLoad() {
    this.getOrders()
  },
  getOrders() {
    var that = this;
    wx.request({
      url: 'https://money.atsukodan.cn/web/orders',
      header: {
        "headerSignature": app.globalData.signature
      },
      method: "GET",
      success(res) {
        console.log(res);
        that.setData({
          orderList: res.data.data,
        });
      }
    })
  },
})