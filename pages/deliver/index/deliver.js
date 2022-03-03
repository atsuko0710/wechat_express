import authRequest from "../../../utils/request"

const app = getApp();

Page({
  data: {
    isShowBottom: "",
    channelList: [],
    CustomBar: app.globalData.CustomBar,
    loadModal: false,
    expressInfo: [],
    order_info_id: 0
  },
  onChannelClick: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index

    wx.getStorage({
      key: 'expressInfo',
      success(res) {
        that.setData({
          expressInfo: res.data[0]
        })
      }
    })
    console.log(that.data.channelList[index])
    // that.setData({
    //   isShowBottom: "",
    // })
    // that.showModal("支付功能正在加速完善中，请联系客服下单！")

    authRequest({
      url: "https://money.atsukodan.cn/weapp/order",
      method: "POST",
      data: {
        channel: that.data.channelList[index].channel,
        price: that.data.channelList[index].price,
        freight: that.data.channelList[index].freight,
        temp_receive_address: that.data.expressInfo.temp_receive_address,
        temp_send_address: that.data.expressInfo.temp_send_address,
        remark: that.data.expressInfo.remark,
        channel_id: that.data.channelList[index].channelId,
        order_info_id: that.data.order_info_id,
      }
    }).then((res) => {
      console.log(res)
      if (res.data.code == 200) {
        wx.requestPayment({
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          paySign: res.data.data.paySign,
          signType: res.data.data.signType,
          timeStamp: res.data.data.timestamp,
          success: function (payRes) {
            that.setData({
              isShowBottom: "",
            })
            that.showModal("下单成功，请注意运单分配通知")
          },
          fail: function (err) {
            console.log(err)
            that.setData({
              isShowBottom: "",
            })
            that.showModal("下单失败，请联系客服下单！")
          }
        })
      }
    }).catch((err) => {
      console.log(err)
      that.setData({
        isShowBottom: "",
      })
      that.showModal("下单失败，请联系客服下单！")
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
      authRequest({
        url: "https://money.atsukodan.cn/weapp/order-search",
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
      }).then((res) => {
        console.log(res.data)
        that.setData({
          loadModal: false,
        })
        if (res.data.code == 200) {
          that.setData({
            isShowBottom: "show",
            channelList: res.data.data.channel,
            order_info_id: res.data.data.order_info_id,
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
      }).catch((err) => {

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