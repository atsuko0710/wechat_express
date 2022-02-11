Page({
  data: {
    PageCur: 'deliver'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onShareAppMessage() {
    return {
      title: '便宜寄快递',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  },
})