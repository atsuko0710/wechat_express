// pages/deliver/home/home.js
Page({
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: '../../../images/kd.png'
    }],
  },
  getCurrentIndex: function (e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  onClick: function (e) {
    console.log(this.data.swiperList[this.data.cardCur])
  },
  goToDelever: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/deliver/index/deliver',
    })
  }
})