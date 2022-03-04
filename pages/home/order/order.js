// pages/home/order/order.js
import authRequest from "../../../utils/request"

// 获取应用实例
const app = getApp()

Page({
  data: {
    orderList: []
  },
  goToDetail: function (e) {
    var that = this
    //拿到点击的index下标
    var index = e.currentTarget.dataset.index
    //将对象转为string
    var queryBean = that.data.orderList[index]
    wx.navigateTo({
      url: '/pages/home/orderDetail/orderDetail?id=' + queryBean.id,
    })
  },
  onLoad() {
    this.getOrders()
  },
  getOrders() {
    var that = this;
    authRequest({
      url: 'https://money.atsukodan.cn/weapp/orders',
      method: "GET",
    }).then((res) => {
      if (res.data.code == 200) {
        that.setData({
          orderList: res.data.data,
        });
      }
    })
  },
})