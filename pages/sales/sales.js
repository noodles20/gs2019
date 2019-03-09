//index.js
//获取应用实例

var wxCharts = require('../../utils/wxcharts.js'); //引入wxChart文件
var app = getApp();
var lineChart = null;

Page({
  data: {
    modalHidden: true,
    el: 0,
    oo1: 0,
    oo2: 0,
    oo3: 0,
    blll: 0, //纳税总额
    alll: 0, //全年到手
    ipt3: 0, //专项扣除
    ipt2: 0, //保险
    ipt1: 0, //月收入
    upt1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    upt2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    array: ['预填写', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    index: 1
  },

  onLoad: function() {
    // console.log('开始:')

    var windowWidth = '',
      windowHeight = ''; //定义宽高
    try {
      var res = wx.getSystemInfoSync(); //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 690; //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 400 //以设计图750为主进行比例算换

    } catch (e) {
      console.error('getSystemInfoSync failed!'); //如果获取失败
    }
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',

      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: '月份',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        format: function(val, name) {
          return val.toFixed(2) + '元';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '缴税额 (元)',
        //  format: function (val) {
        //   return val.toFixed(2);
        // },
        min: 0
      },
      width: windowWidth,
      height: windowHeight,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },

  touchHandler: function(e) {

    lineChart.showToolTip(e, {

      format: function(item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },

  jilu3: function(e) {

    //console.log(e.detail.value)
    this.setData({
      ipt3: e.detail.value

    });

  },
  jilu2: function(e) {
    var temp = 'upt2[' + this.data.index + ']'
    //console.log(e.detail.value)
    this.setData({
      ipt2: e.detail.value,
      [temp]: e.detail.value
    });
    if (this.data.index == 0) {
      for (var i = 1; i < 13; i++) {
        var temp1 = 'upt2[' + i + ']'
        //console.log(e.detail.value)
        this.setData({
          [temp1]: e.detail.value
        });
      }
    }
  },
  jilu1: function(e) {
    var temp = 'upt1[' + this.data.index + ']'
    //console.log(e.detail.value)
    this.setData({
      ipt1: e.detail.value,
      [temp]: e.detail.value

    });

    if (this.data.index == 0) {
      for (var i = 1; i < 13; i++) {
        var temp1 = 'upt1[' + i + ']'
        //console.log(e.detail.value)
        this.setData({
          [temp1]: e.detail.value
        });
      }
    }
    //console.log(this.data.upt1)
  },


  formSumit: function(e) {
    //console.log('发生提交数据为:', e.detail.value);
    var that = this;
    e.detail.value.zhuanx = that.data.ipt3
    e.detail.value.baox1 = that.data.ipt2
    e.detail.value.zong = that.data.ipt1

    var windowWidth = '',
      windowHeight = ''; //定义宽高
    try {
      var res = wx.getSystemInfoSync(); //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 690; //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 400 //以设计图750为主进行比例算换

    } catch (e) {
      console.error('getSystemInfoSync failed!'); //如果获取失败
    }
    //console.log('发生提交数据为:');
    e.detail.value.r = parseInt(e.detail.value.zong) - parseInt(e.detail.value.baox1) - parseInt(e.detail.value.zhuanx) - 5000 //判断数
    //console.log(e.detail.value.r)



    e.detail.value.r1 = parseInt(this.data.upt1[1]) - parseInt(this.data.upt2[1]) - parseInt(e.detail.value.zhuanx) - 5000
    e.detail.value.r2 = parseInt(this.data.upt1[2]) - parseInt(this.data.upt2[2]) - parseInt(e.detail.value.zhuanx) - 5000 + e.detail.value.r1
    e.detail.value.r3 = parseInt(this.data.upt1[3]) - parseInt(this.data.upt2[3]) - parseInt(e.detail.value.zhuanx) - 5000 + e.detail.value.r2
    e.detail.value.r4 = parseInt(this.data.upt1[4]) - parseInt(this.data.upt2[4]) - parseInt(e.detail.value.zhuanx) - 5000 + e.detail.value.r3
    e.detail.value.r5 = parseInt(this.data.upt1[5]) - parseInt(this.data.upt2[5]) - parseInt(e.detail.value.zhuanx) - 5000 + e.detail.value.r4
    e.detail.value.r6 = parseInt(this.data.upt1[6]) - parseInt(this.data.upt2[6]) - parseInt(e.detail.value.zhuanx) - 5000 + e.detail.value.r5
    e.detail.value.r7 = parseInt(this.data.upt1[7]) - parseInt(this.data.upt2[7]) - parseInt(e.detail.value.zhuanx) - 5000 + e.detail.value.r6
    e.detail.value.r8 = parseInt(this.data.upt1[8]) - parseInt(this.data.upt2[8]) - parseInt(e.detail.value.zhuanx) - 5000 + e.detail.value.r7
    e.detail.value.r9 = parseInt(this.data.upt1[9]) - parseInt(this.data.upt2[9]) - parseInt(e.detail.value.zhuanx) - 5000 + e.detail.value.r8
    e.detail.value.r10 = parseInt(this.data.upt1[10]) - parseInt(this.data.upt2[10]) - parseInt(e.detail.value.zhuanx) - 5000 + e.detail.value.r9
    e.detail.value.r11 = parseInt(this.data.upt1[11]) - parseInt(this.data.upt2[11]) - parseInt(e.detail.value.zhuanx) - 5000 + e.detail.value.r10
    e.detail.value.r12 = parseInt(this.data.upt1[12]) - parseInt(this.data.upt2[12]) - parseInt(e.detail.value.zhuanx) - 5000 + e.detail.value.r11


    e.detail.value.a1 = 0.03
    e.detail.value.b1 = 0
    if (e.detail.value.r1 > 36000) {
      e.detail.value.a1 = 0.1
      e.detail.value.b1 = 2520
      if (e.detail.value.r1 > 144000) {
        e.detail.value.a1 = 0.2
        e.detail.value.b1 = 16920
        if (e.detail.value.r1 > 300000) {
          e.detail.value.a1 = 0.25
          e.detail.value.b1 = 31920
          if (e.detail.value.r1 > 420000) {
            e.detail.value.a1 = 0.3
            e.detail.value.b1 = 52920
            if (e.detail.value.r1 > 660000) {
              e.detail.value.a1 = 0.35
              e.detail.value.b1 = 85920
              if (e.detail.value.r1 > 960000) {
                e.detail.value.a1 = 0.45
                e.detail.value.b1 = 181920
              }
            }
          }
        }
      }
    }

    e.detail.value.a2 = 0.03
    e.detail.value.b2 = 0
    if (e.detail.value.r2 > 36000) {
      e.detail.value.a2 = 0.1
      e.detail.value.b2 = 2520
      if (e.detail.value.r2 > 144000) {
        e.detail.value.a2 = 0.2
        e.detail.value.b2 = 16920
        if (e.detail.value.r2 > 300000) {
          e.detail.value.a2 = 0.25
          e.detail.value.b2 = 31920
          if (e.detail.value.r2 > 420000) {
            e.detail.value.a2 = 0.3
            e.detail.value.b2 = 52920
            if (e.detail.value.r2 > 660000) {
              e.detail.value.a2 = 0.35
              e.detail.value.b2 = 85920
              if (e.detail.value.r2 > 960000) {
                e.detail.value.a2 = 0.45
                e.detail.value.b2 = 181920
              }
            }
          }
        }
      }
    }

    e.detail.value.a3 = 0.03
    e.detail.value.b3 = 0
    if (e.detail.value.r3 > 36000) {
      e.detail.value.a3 = 0.1
      e.detail.value.b3 = 2520
      if (e.detail.value.r3 > 144000) {
        e.detail.value.a3 = 0.2
        e.detail.value.b3 = 16920
        if (e.detail.value.r3 > 300000) {
          e.detail.value.a3 = 0.25
          e.detail.value.b3 = 31920
          if (e.detail.value.r3 > 420000) {
            e.detail.value.a3 = 0.3
            e.detail.value.b3 = 52920
            if (e.detail.value.r3 > 660000) {
              e.detail.value.a3 = 0.35
              e.detail.value.b3 = 85920
              if (e.detail.value.r3 > 960000) {
                e.detail.value.a3 = 0.45
                e.detail.value.b3 = 181920
              }
            }
          }
        }
      }
    }

    e.detail.value.a4 = 0.03
    e.detail.value.b4 = 0
    if (e.detail.value.r4 > 36000) {
      e.detail.value.a4 = 0.1
      e.detail.value.b4 = 2520
      if (e.detail.value.r4 > 144000) {
        e.detail.value.a4 = 0.2
        e.detail.value.b4 = 16920
        if (e.detail.value.r4 > 300000) {
          e.detail.value.a4 = 0.25
          e.detail.value.b4 = 31920
          if (e.detail.value.r4 > 420000) {
            e.detail.value.a4 = 0.3
            e.detail.value.b4 = 52920
            if (e.detail.value.r4 > 660000) {
              e.detail.value.a4 = 0.35
              e.detail.value.b4 = 85920
              if (e.detail.value.r4 > 960000) {
                e.detail.value.a4 = 0.45
                e.detail.value.b4 = 181920
              }
            }
          }
        }
      }
    }

    e.detail.value.a5 = 0.03
    e.detail.value.b5 = 0
    if (e.detail.value.r5 > 36000) {
      e.detail.value.a5 = 0.1
      e.detail.value.b5 = 2520
      if (e.detail.value.r5 > 144000) {
        e.detail.value.a5 = 0.2
        e.detail.value.b5 = 16920
        if (e.detail.value.r5 > 300000) {
          e.detail.value.a5 = 0.25
          e.detail.value.b5 = 31920
          if (e.detail.value.r5 > 420000) {
            e.detail.value.a5 = 0.3
            e.detail.value.b5 = 52920
            if (e.detail.value.r5 > 660000) {
              e.detail.value.a5 = 0.35
              e.detail.value.b5 = 85920
              if (e.detail.value.r5 > 960000) {
                e.detail.value.a5 = 0.45
                e.detail.value.b5 = 181920
              }
            }
          }
        }
      }
    }

    e.detail.value.a6 = 0.03
    e.detail.value.b6 = 0
    if (e.detail.value.r6 > 36000) {
      e.detail.value.a6 = 0.1
      e.detail.value.b6 = 2520
      if (e.detail.value.r6 > 144000) {
        e.detail.value.a6 = 0.2
        e.detail.value.b6 = 16920
        if (e.detail.value.r6 > 300000) {
          e.detail.value.a6 = 0.25
          e.detail.value.b6 = 31920
          if (e.detail.value.r6 > 420000) {
            e.detail.value.a6 = 0.3
            e.detail.value.b6 = 52920
            if (e.detail.value.r6 > 660000) {
              e.detail.value.a6 = 0.35
              e.detail.value.b6 = 85920
              if (e.detail.value.r6 > 960000) {
                e.detail.value.a6 = 0.45
                e.detail.value.b6 = 181920
              }
            }
          }
        }
      }
    }

    e.detail.value.a7 = 0.03
    e.detail.value.b7 = 0
    if (e.detail.value.r7 > 36000) {
      e.detail.value.a7 = 0.1
      e.detail.value.b7 = 2520
      if (e.detail.value.r7 > 144000) {
        e.detail.value.a7 = 0.2
        e.detail.value.b7 = 16920
        if (e.detail.value.r7 > 300000) {
          e.detail.value.a7 = 0.25
          e.detail.value.b7 = 31920
          if (e.detail.value.r7 > 420000) {
            e.detail.value.a7 = 0.3
            e.detail.value.b7 = 52920
            if (e.detail.value.r7 > 660000) {
              e.detail.value.a7 = 0.35
              e.detail.value.b7 = 85920
              if (e.detail.value.r7 > 960000) {
                e.detail.value.a7 = 0.45
                e.detail.value.b7 = 181920
              }
            }
          }
        }
      }
    }

    e.detail.value.a8 = 0.03
    e.detail.value.b8 = 0
    if (e.detail.value.r8 > 36000) {
      e.detail.value.a8 = 0.1
      e.detail.value.b8 = 2520
      if (e.detail.value.r8 > 144000) {
        e.detail.value.a8 = 0.2
        e.detail.value.b8 = 16920
        if (e.detail.value.r8 > 300000) {
          e.detail.value.a8 = 0.25
          e.detail.value.b8 = 31920
          if (e.detail.value.r8 > 420000) {
            e.detail.value.a8 = 0.3
            e.detail.value.b8 = 52920
            if (e.detail.value.r8 > 660000) {
              e.detail.value.a8 = 0.35
              e.detail.value.b8 = 85920
              if (e.detail.value.r8 > 960000) {
                e.detail.value.a8 = 0.45
                e.detail.value.b8 = 181920
              }
            }
          }
        }
      }
    }

    e.detail.value.a9 = 0.03
    e.detail.value.b9 = 0
    if (e.detail.value.r9 > 36000) {
      e.detail.value.a9 = 0.1
      e.detail.value.b9 = 2520
      if (e.detail.value.r9 > 144000) {
        e.detail.value.a9 = 0.2
        e.detail.value.b9 = 16920
        if (e.detail.value.r9 > 300000) {
          e.detail.value.a9 = 0.25
          e.detail.value.b9 = 31920
          if (e.detail.value.r9 > 420000) {
            e.detail.value.a9 = 0.3
            e.detail.value.b9 = 52920
            if (e.detail.value.r9 > 660000) {
              e.detail.value.a9 = 0.35
              e.detail.value.b9 = 85920
              if (e.detail.value.r9 > 960000) {
                e.detail.value.a9 = 0.45
                e.detail.value.b9 = 181920
              }
            }
          }
        }
      }
    }

    e.detail.value.a10 = 0.03
    e.detail.value.b10 = 0
    if (e.detail.value.r10 > 36000) {
      e.detail.value.a10 = 0.1
      e.detail.value.b10 = 2520
      if (e.detail.value.r10 > 144000) {
        e.detail.value.a10 = 0.2
        e.detail.value.b10 = 16920
        if (e.detail.value.r10 > 300000) {
          e.detail.value.a10 = 0.25
          e.detail.value.b10 = 31920
          if (e.detail.value.r10 > 420000) {
            e.detail.value.a10 = 0.3
            e.detail.value.b10 = 52920
            if (e.detail.value.r10 > 660000) {
              e.detail.value.a10 = 0.35
              e.detail.value.b10 = 85920
              if (e.detail.value.r10 > 960000) {
                e.detail.value.a10 = 0.45
                e.detail.value.b10 = 181920
              }
            }
          }
        }
      }
    }

    e.detail.value.a11 = 0.03
    e.detail.value.b11 = 0
    if (e.detail.value.r11 > 36000) {
      e.detail.value.a11 = 0.1
      e.detail.value.b11 = 2520
      if (e.detail.value.r11 > 144000) {
        e.detail.value.a11 = 0.2
        e.detail.value.b11 = 16920
        if (e.detail.value.r11 > 300000) {
          e.detail.value.a11 = 0.25
          e.detail.value.b11 = 31920
          if (e.detail.value.r11 > 420000) {
            e.detail.value.a11 = 0.3
            e.detail.value.b11 = 52920
            if (e.detail.value.r11 > 660000) {
              e.detail.value.a11 = 0.35
              e.detail.value.b11 = 85920
              if (e.detail.value.r11 > 960000) {
                e.detail.value.a11 = 0.45
                e.detail.value.b11 = 181920
              }
            }
          }
        }
      }
    }

    e.detail.value.a12 = 0.03
    e.detail.value.b12 = 0
    if (e.detail.value.r12 > 36000) {
      e.detail.value.a12 = 0.1
      e.detail.value.b12 = 2520
      if (e.detail.value.r12 > 144000) {
        e.detail.value.a12 = 0.2
        e.detail.value.b12 = 16920
        if (e.detail.value.r12 > 300000) {
          e.detail.value.a12 = 0.25
          e.detail.value.b12 = 31920
          if (e.detail.value.r12 > 420000) {
            e.detail.value.a12 = 0.3
            e.detail.value.b12 = 52920
            if (e.detail.value.r12 > 660000) {
              e.detail.value.a12 = 0.35
              e.detail.value.b12 = 85920
              if (e.detail.value.r12 > 960000) {
                e.detail.value.a12 = 0.45
                e.detail.value.b12 = 181920
              }
            }
          }
        }
      }
    }


    //每个月所缴纳的税
    e.detail.value.s1 = e.detail.value.r1 * e.detail.value.a1 - e.detail.value.b1
    if (e.detail.value.s1 < 0) {
      e.detail.value.s1 = 0
    }
    e.detail.value.s2 = e.detail.value.r2 * e.detail.value.a2 - e.detail.value.b2 - e.detail.value.s1
    if (e.detail.value.s2 < 0) {
      e.detail.value.s2 = 0
    }
    e.detail.value.s3 = e.detail.value.r3 * e.detail.value.a3 - e.detail.value.b3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s3 < 0) {
      e.detail.value.s3 = 0
    }
    e.detail.value.s4 = e.detail.value.r4 * e.detail.value.a4 - e.detail.value.b4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s4 < 0) {
      e.detail.value.s4 = 0
    }
    e.detail.value.s5 = e.detail.value.r5 * e.detail.value.a5 - e.detail.value.b5 - e.detail.value.s4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s5 < 0) {
      e.detail.value.s5 = 0
    }
    e.detail.value.s6 = e.detail.value.r6 * e.detail.value.a6 - e.detail.value.b6 - e.detail.value.s5 - e.detail.value.s4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s6 < 0) {
      e.detail.value.s6 = 0
    }
    e.detail.value.s7 = e.detail.value.r7 * e.detail.value.a7 - e.detail.value.b7 - e.detail.value.s6 - e.detail.value.s5 - e.detail.value.s4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s7 < 0) {
      e.detail.value.s7 = 0
    }
    e.detail.value.s8 = e.detail.value.r8 * e.detail.value.a8 - e.detail.value.b8 - e.detail.value.s7 - e.detail.value.s6 - e.detail.value.s5 - e.detail.value.s4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s8 < 0) {
      e.detail.value.s8 = 0
    }
    e.detail.value.s9 = e.detail.value.r9 * e.detail.value.a9 - e.detail.value.b9 - e.detail.value.s8 - e.detail.value.s7 - e.detail.value.s6 - e.detail.value.s5 - e.detail.value.s4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s9 < 0) {
      e.detail.value.s9 = 0
    }
    e.detail.value.s10 = e.detail.value.r10 * e.detail.value.a10 - e.detail.value.b10 - e.detail.value.s9 - e.detail.value.s8 - e.detail.value.s7 - e.detail.value.s6 - e.detail.value.s5 - e.detail.value.s4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s10 < 0) {
      e.detail.value.s10 = 0
    }
    e.detail.value.s11 = e.detail.value.r11 * e.detail.value.a11 - e.detail.value.b11 - e.detail.value.s10 - e.detail.value.s9 - e.detail.value.s8 - e.detail.value.s7 - e.detail.value.s6 - e.detail.value.s5 - e.detail.value.s4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s11 < 0) {
      e.detail.value.s11 = 0
    }
    e.detail.value.s12 = e.detail.value.r12 * e.detail.value.a12 - e.detail.value.b12 - e.detail.value.s11 - e.detail.value.s10 - e.detail.value.s9 - e.detail.value.s8 - e.detail.value.s7 - e.detail.value.s6 - e.detail.value.s5 - e.detail.value.s4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s12 < 0) {
      e.detail.value.s12 = 0
    }
    //每个月所缴纳的税
    //全年纳税总额
    e.detail.value.sz = e.detail.value.s1 + e.detail.value.s2 + e.detail.value.s3 + e.detail.value.s4 + e.detail.value.s5 + e.detail.value.s6 + e.detail.value.s7 + e.detail.value.s8 + e.detail.value.s9 + e.detail.value.s10 + e.detail.value.s11 + e.detail.value.s12
    //全年纳税总额
    //全年到手

    e.detail.value.ds = parseInt(this.data.upt1[12]) + parseInt(this.data.upt1[1]) + parseInt(this.data.upt1[2]) + parseInt(this.data.upt1[3]) + parseInt(this.data.upt1[4]) + parseInt(this.data.upt1[5]) + parseInt(this.data.upt1[6]) + parseInt(this.data.upt1[7]) + parseInt(this.data.upt1[8]) + parseInt(this.data.upt1[9]) + parseInt(this.data.upt1[10]) + parseInt(this.data.upt1[11]) - (parseInt(this.data.upt2[12]) + parseInt(this.data.upt2[1]) + parseInt(this.data.upt2[2]) + parseInt(this.data.upt2[3]) + parseInt(this.data.upt2[4]) + parseInt(this.data.upt2[5]) + parseInt(this.data.upt2[6]) + parseInt(this.data.upt2[7]) + parseInt(this.data.upt2[8]) + parseInt(this.data.upt2[9]) + parseInt(this.data.upt2[10]) + parseInt(this.data.upt2[11])) - e.detail.value.sz
    console.log(this.data.upt1[12])
    // e.detail.value.slla = [0, e.detail.value.sz]
    //console.log(e.detail.value.sz)
    this.setData({

      blll: e.detail.value.sz,
      alll: e.detail.value.ds
    });
    var windowWidth = '',
      windowHeight = ''; //定义宽高
    try {
      var res = wx.getSystemInfoSync(); //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 690; //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 400 //以设计图750为主进行比例算换

    } catch (e) {
      console.error('getSystemInfoSync failed!'); //如果获取失败
    }
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: '月份',
        data: [e.detail.value.s1, e.detail.value.s2, e.detail.value.s3, e.detail.value.s4, e.detail.value.s5, e.detail.value.s6, e.detail.value.s7, e.detail.value.s8, e.detail.value.s9, e.detail.value.s10, e.detail.value.s11, e.detail.value.s12],
        format: function(val, name) {
          return val.toFixed(2) + '元';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '缴税额 (元)',
        //  format: function (val) {
        //   return val.toFixed(2);
        // },
        min: 0
      },
      width: windowWidth,
      height: windowHeight,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });



  },
  formReset: function() {
    //console.log('发生取消数据')
    this.setData({
      el: 0,
      oo1: 0,
      oo2: 0,
      oo3: 0,
      blll: 0, //纳税总额
      alll: 0, //全年到手
      ipt3: 0, //专项扣除
      ipt2: 0, //保险
      ipt1: 0, //月收入
      upt1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      upt2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      index: 1
    });
    var windowWidth = '',
      windowHeight = ''; //定义宽高
    try {
      var res = wx.getSystemInfoSync(); //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 690; //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 400 //以设计图750为主进行比例算换

    } catch (e) {
      console.error('getSystemInfoSync failed!'); //如果获取失败
    }
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: '月份',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        format: function(val, name) {
          return val.toFixed(2) + '元';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '缴税额 (元)',
        //  format: function (val) {
        //   return val.toFixed(2);
        // },
        min: 0
      },
      width: windowWidth,
      height: windowHeight,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },
  bindPickerChange: function(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    //var temp = 'upt1['+e.detail.value+']'

    this.setData({
      index: e.detail.value,
      // [temp]:this.data.ipt1,
      oo1: this.data.upt1[e.detail.value],
      oo2: this.data.upt2[e.detail.value]
    })


    //console.log('picker发送选择改变，携带值为', this.data.upt1[e.detail.value])
  },
  tishi: function() {
    wx.showModal({
      title: '提示',
      cancelText: "复制",
      cancelColor: '#3CC51F',
      confirmColor: '#000000',
      content: '按月输入工资和保险\r\n预填写：自动填充12个月\r\n专项扣除，只输一次即可\r\n\r\n 复制noodlestech搜索,关注更多',

      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')

          wx.setClipboardData({
            //准备复制的数据
            data: 'noodlestech',
            success: function(res) {
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
  modalChange: function() {
    this.setData({
      modalHidden: true
    });
  }
})