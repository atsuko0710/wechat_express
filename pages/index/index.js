import login from "../../utils/login"

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
  onLoad() {
    var access_token = wx.getStorageSync('access_token');
    var access_token_expired_at = wx.getStorageSync('access_token_expired_at');

    if (!(access_token && access_token_expired_at && access_token_expired_at >= new Date().getTime())) {
      login().then().catch((err) => {
        //失败打日志传到后端  同样是封装  具体这个方法下面再讲
        Log({ route: '路由', data: err })
      });
    }
  }
})

