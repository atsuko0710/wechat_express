import authRequest from "../../utils/request"

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
    authRequest({
      url: 'https://money.atsukodan.cn/kuaidi?waybill=' + that.data.waybill,
      method: "GET",
    }).then((res) => {
      if (res.data.code == 200) {
        that.setData({
          infoList: res.data.data,
        });
      } else {
        that.setData({
          infoList: ['查无信息'],
        });
      }
    })
  }
})
