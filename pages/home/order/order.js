// pages/home/order/order.js
Page({
  data: {

  },
  goToDetail: function (e) {
    wx.navigateTo({
      url: '/pages/home/orderDetail/orderDetail',
    })
  }
})