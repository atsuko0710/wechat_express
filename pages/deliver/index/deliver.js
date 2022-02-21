const app = getApp();
Page({
  data: {
    isShowBottom: "",
    channelList: [],
    CustomBar: app.globalData.CustomBar,
    loadModal: false,
    expressInfo: []
  },
  onChannelClick: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index
    var expressInfo = [];
    console.log(that.data.channelList[index])

    wx.getStorage({
      key: 'expressInfo',
      success(res) {
        expressInfo = res.data[0]
      }
    })

    // that.setData({
    //   isShowBottom: "",
    // })
    // that.showModal("支付功能正在加速完善中，请联系客服下单！")

    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://money.atsukodan.cn/test',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "headerSignature": app.globalData.signature
            },
            method: "POST",
            data: {
              code: res.code,
              channel: that.data.channelList[index].channel,
              price: that.data.channelList[index].price,
              freight: that.data.channelList[index].freight,
              temp_receive_address: expressInfo.temp_receive_address,
              temp_send_address: expressInfo.temp_send_address,
              remark: expressInfo.remark,
            },
            success: function (payRes) {
              console.log(payRes.data)
              // wx.requestPayment({
              //   nonceStr: payRes.data.data.nonceStr,
              //   package: payRes.data.data.package,
              //   paySign: payRes.data.data.paySign,
              //   signType: payRes.data.data.signType,
              //   timeStamp: payRes.data.data.timestamp,
              //   success: function (res) {
              //     console.log('付款成功')
              //     console.log(res)
              //   },
              //   fail: function (res) {
              //     console.log('付款失败')
              //     console.log(res)
              //   }
              // })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  formSubmit: function (e) {
    var hintString = "";
    if (e.detail.value.temp_receive_address.length == 0 || e.detail.value.temp_send_address.length == 0) {
      hintString = "发件人和寄件人不能为空"
    } else if (e.detail.value.package_count.length == 0 || !(/(^[0-9]*$)/.test(e.detail.value.package_count))) {
      hintString = "包裹数量必须是数字"
    } else if (e.detail.value.weight.length == 0 || !(/(^[0-9]*$)/.test(e.detail.value.weight))) {
      hintString = "重量必须是数字"
    } else {
      var that = this;
      // 弹出加载框
      that.setData({
        loadModal: true
      });
      wx.request({
        url: 'https://money.atsukodan.cn/order-search',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "headerSignature": app.globalData.signature
        },
        method: "POST",
        data: {
          temp_receive_address: e.detail.value.temp_receive_address,
          temp_send_address: e.detail.value.temp_send_address,
          package_count: e.detail.value.package_count,
          weight: e.detail.value.weight,
          item_name: e.detail.value.item_name,
          vloum_long: e.detail.value.vloum_long,
          vloum_width: e.detail.value.vloum_width,
          vloum_height: e.detail.value.vloum_height,
          insured: e.detail.value.insured,
          remark: e.detail.value.remark,
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            loadModal: false,
          })
          if (res.data.code == 20000) {
            that.setData({
              isShowBottom: "show",
              channelList: res.data.data,
              'expressInfo.temp_receive_address': e.detail.value.temp_receive_address,
              'expressInfo.temp_send_address': e.detail.value.temp_send_address,
              'expressInfo.remark': e.detail.value.remark,
            })
            wx.setStorage({
              'key': "expressInfo",
              "data": [that.data.expressInfo]
            })
          } else {
            that.showModal("查询价格失败，请联系客服！")
          }
        }
      })
    }
    if (hintString) {
      this.showModal(hintString)
    }
  },
  showModal(s) {
    this.setData({
      isShow: "show",
      hintString: s
    })
  },
  hideModal() {
    this.setData({
      isShow: ""
    })
  },
  hideBottomModal() {
    this.setData({
      isShowBottom: ""
    })
  },
})