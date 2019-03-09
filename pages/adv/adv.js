// pages/adv/adv.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blll: 0,//纳税总额
    alll: 0,
    ipt3: "",
    ipt2: "",
    ipt1: "",
    ipt4: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  jilu3: function (e) {

    //console.log(e.detail.value)
    this.setData({
      ipt3: e.detail.value

    });

  },
  jilu2: function (e) {

    //console.log(e.detail.value)
    this.setData({
      ipt2: e.detail.value

    });

  },
  jilu1: function (e) {

    //console.log(e.detail.value)
    this.setData({
      ipt1: e.detail.value

    });

  },

  jilu4: function (e) {

    //console.log(e.detail.value)
    this.setData({
      ipt4: e.detail.value

    });

  },


  formSumit: function (e){
    var that = this;
    

    e.detail.value.pds = parseInt(that.data.ipt2)/12
    if (e.detail.value.pds<=3000){
      e.detail.value.sl=0.03
        e.detail.value.sk=0
}
    else if (e.detail.value.pds <= 12000 & e.detail.value.pds>3000){
      e.detail.value.sl = 0.1
      e.detail.value.sk = 210
}
    else if (e.detail.value.pds <= 25000 & e.detail.value.pds > 12000) {
      e.detail.value.sl = 0.2
      e.detail.value.sk = 1410
    }
    else if (e.detail.value.pds <= 35000 & e.detail.value.pds > 25000) {
      e.detail.value.sl = 0.25
      e.detail.value.sk = 2660
    }
    else if (e.detail.value.pds <= 55000 & e.detail.value.pds > 35000) {
      e.detail.value.sl = 0.3
      e.detail.value.sk = 4410
    }
    else if (e.detail.value.pds <= 80000 & e.detail.value.pds > 55000) {
      e.detail.value.sl = 0.35
      e.detail.value.sk = 7160
    }
    else if (e.detail.value.pds > 80000) {
      e.detail.value.sl = 0.45
      e.detail.value.sk = 15160
    }
    
    e.detail.value.s1 = that.data.ipt2 * e.detail.value.sl - e.detail.value.sk
    




    //合并综合

    e.detail.value.pds1 = parseInt(that.data.ipt1) + parseInt(that.data.ipt2) - parseInt(that.data.ipt4) -parseInt(that.data.ipt3)*12-60000
    if (e.detail.value.pds1 <= 36000) {
      e.detail.value.sl1 = 0.03
      e.detail.value.sk1 = 0
    }
    else if (e.detail.value.pds1 <= 144000 & e.detail.value.pds1 > 36000) {
      e.detail.value.sl1 = 0.1
      e.detail.value.sk1 = 2520
    }
    else if (e.detail.value.pds1 <= 300000 & e.detail.value.pds1 > 144000) {
      e.detail.value.sl1 = 0.2
      e.detail.value.sk1 = 16920
    }
    else if (e.detail.value.pds1 <= 420000 & e.detail.value.pds1 > 300000) {
      e.detail.value.sl1 = 0.25
      e.detail.value.sk1 = 31920
    }
    else if (e.detail.value.pds1 <= 660000 & e.detail.value.pds1 > 420000) {
      e.detail.value.sl1 = 0.3
      e.detail.value.sk1 = 52920
    }
    else if (e.detail.value.pds1 <= 960000 & e.detail.value.pds1 > 660000) {
      e.detail.value.sl1 = 0.35
      e.detail.value.sk1 = 85920
    }
    else if (e.detail.value.pds1 > 960000) {
      e.detail.value.sl1 = 0.45
      e.detail.value.sk1 = 181920
    }
    //console.log(e.detail.value.pds1)
    //console.log(e.detail.value.sl1)
   // console.log(e.detail.value.sk1)

    e.detail.value.s2 = e.detail.value.pds1 * e.detail.value.sl1 - e.detail.value.sk1

    if (e.detail.value.s1 < 0) {
      e.detail.value.s1 = 0
    }
    if (e.detail.value.s2 < 0) {
      e.detail.value.s2 = 0
    }


    this.setData({

      blll: e.detail.value.s1,
      alll: e.detail.value.s2
    });
    

  },

  formReset: function () {

    this.setData({
      blll: 0,//纳税总额
      alll: 0,
      ipt3: "",
      ipt2: "",
      ipt1: "",
      ipt4: ""
    });
  },
  tishi: function () {
    wx.showModal({
      title: '提示',
      cancelText: "复制",
      cancelColor: '#3CC51F',
      confirmColor: '#000000',
      content: '2022年之前，公司可以选择单独计算或者并入全年所得两种方法缴纳年终奖税额；2022年以后，全部采用并入年终奖所得方法缴纳税额\r\n\r\n采用单独计算方法，只需输入年终奖税前(元)这一项即可\r\n\r\n 复制noodlestech搜索,关注更多',

      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')

          wx.setClipboardData({
            //准备复制的数据
            data: 'noodlestech',
            success: function (res) {
              wx.showToast({
                title: '复制成功',
              });
            }
          });

        }
      }
    })

    // this.setData({
    //   modalHidden: false
    // });

  },
})