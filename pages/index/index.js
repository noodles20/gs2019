//index.js
//获取应用实例

var wxCharts = require('../../utils/wxcharts.js'); //引入wxChart文件
var app = getApp();
var lineChart = null;

Page({
  data: {

    blll: 0 ,//纳税总额
    alll:0,
    ipt3:0,
    ipt2:0,
    ipt1:0
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

  jilu3:function(e){
    
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
    e.detail.value.r = parseInt(e.detail.value.zong) - parseInt(e.detail.value.baox1) - parseInt(e.detail.value.zhuanx) - 5000
    //console.log(e.detail.value.r)


    e.detail.value.a1 = 0.03
    e.detail.value.b1 = 0
    if (e.detail.value.r > 36000) {
      e.detail.value.a1 = 0.1
      e.detail.value.b1 = 2520
      if (e.detail.value.r > 144000) {
        e.detail.value.a1 = 0.2
        e.detail.value.b1 = 16920
        if (e.detail.value.r > 300000) {
          e.detail.value.a1 = 0.25
          e.detail.value.b1 = 31920
          if (e.detail.value.r > 420000) {
            e.detail.value.a1 = 0.3
            e.detail.value.b1 = 52920
            if (e.detail.value.r > 660000) {
              e.detail.value.a1 = 0.35
              e.detail.value.b1 = 85920
              if (e.detail.value.r > 960000) {
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
    if (2 * e.detail.value.r > 36000) {
      e.detail.value.a2 = 0.1
      e.detail.value.b2 = 2520
      if (2 * e.detail.value.r > 144000) {
        e.detail.value.a2 = 0.2
        e.detail.value.b2 = 16920
        if (2 * e.detail.value.r > 300000) {
          e.detail.value.a2 = 0.25
          e.detail.value.b2 = 31920
          if (2 * e.detail.value.r > 420000) {
            e.detail.value.a2 = 0.3
            e.detail.value.b2 = 52920
            if (2 * e.detail.value.r > 660000) {
              e.detail.value.a2 = 0.35
              e.detail.value.b2 = 85920
              if (2 * e.detail.value.r > 960000) {
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
    if (3 * e.detail.value.r > 36000) {
      e.detail.value.a3 = 0.1
      e.detail.value.b3 = 2520
      if (3 * e.detail.value.r > 144000) {
        e.detail.value.a3 = 0.2
        e.detail.value.b3 = 16920
        if (3 * e.detail.value.r > 300000) {
          e.detail.value.a3 = 0.25
          e.detail.value.b3 = 31920
          if (3 * e.detail.value.r > 420000) {
            e.detail.value.a3 = 0.3
            e.detail.value.b3 = 52920
            if (3 * e.detail.value.r > 660000) {
              e.detail.value.a3 = 0.35
              e.detail.value.b3 = 85920
              if (3 * e.detail.value.r > 960000) {
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
    if (4 * e.detail.value.r > 36000) {
      e.detail.value.a4 = 0.1
      e.detail.value.b4 = 2520
      if (4 * e.detail.value.r > 144000) {
        e.detail.value.a4 = 0.2
        e.detail.value.b4 = 16920
        if (4 * e.detail.value.r > 300000) {
          e.detail.value.a4 = 0.25
          e.detail.value.b4 = 31920
          if (4 * e.detail.value.r > 420000) {
            e.detail.value.a4 = 0.3
            e.detail.value.b4 = 52920
            if (4 * e.detail.value.r > 660000) {
              e.detail.value.a4 = 0.35
              e.detail.value.b4 = 85920
              if (4 * e.detail.value.r > 960000) {
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
    if (5 * e.detail.value.r > 36000) {
      e.detail.value.a5 = 0.1
      e.detail.value.b5 = 2520
      if (5 * e.detail.value.r > 144000) {
        e.detail.value.a5 = 0.2
        e.detail.value.b5 = 16920
        if (5 * e.detail.value.r > 300000) {
          e.detail.value.a5 = 0.25
          e.detail.value.b5 = 31920
          if (5 * e.detail.value.r > 420000) {
            e.detail.value.a5 = 0.3
            e.detail.value.b5 = 52920
            if (5 * e.detail.value.r > 660000) {
              e.detail.value.a5 = 0.35
              e.detail.value.b5 = 85920
              if (5 * e.detail.value.r > 960000) {
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
    if (6 * e.detail.value.r > 36000) {
      e.detail.value.a6 = 0.1
      e.detail.value.b6 = 2520
      if (6 * e.detail.value.r > 144000) {
        e.detail.value.a6 = 0.2
        e.detail.value.b6 = 16920
        if (6 * e.detail.value.r > 300000) {
          e.detail.value.a6 = 0.25
          e.detail.value.b6 = 31920
          if (6 * e.detail.value.r > 420000) {
            e.detail.value.a6 = 0.3
            e.detail.value.b6 = 52920
            if (6 * e.detail.value.r > 660000) {
              e.detail.value.a6 = 0.35
              e.detail.value.b6 = 85920
              if (6 * e.detail.value.r > 960000) {
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
    if (7 * e.detail.value.r > 36000) {
      e.detail.value.a7 = 0.1
      e.detail.value.b7 = 2520
      if (7 * e.detail.value.r > 144000) {
        e.detail.value.a7 = 0.2
        e.detail.value.b7 = 16920
        if (7 * e.detail.value.r > 300000) {
          e.detail.value.a7 = 0.25
          e.detail.value.b7 = 31920
          if (7 * e.detail.value.r > 420000) {
            e.detail.value.a7 = 0.3
            e.detail.value.b7 = 52920
            if (7 * e.detail.value.r > 660000) {
              e.detail.value.a7 = 0.35
              e.detail.value.b7 = 85920
              if (7 * e.detail.value.r > 960000) {
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
    if (8 * e.detail.value.r > 36000) {
      e.detail.value.a8 = 0.1
      e.detail.value.b8 = 2520
      if (8 * e.detail.value.r > 144000) {
        e.detail.value.a8 = 0.2
        e.detail.value.b8 = 16920
        if (8 * e.detail.value.r > 300000) {
          e.detail.value.a8 = 0.25
          e.detail.value.b8 = 31920
          if (8 * e.detail.value.r > 420000) {
            e.detail.value.a8 = 0.3
            e.detail.value.b8 = 52920
            if (8 * e.detail.value.r > 660000) {
              e.detail.value.a8 = 0.35
              e.detail.value.b8 = 85920
              if (8 * e.detail.value.r > 960000) {
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
    if (9 * e.detail.value.r > 36000) {
      e.detail.value.a9 = 0.1
      e.detail.value.b9 = 2520
      if (9 * e.detail.value.r > 144000) {
        e.detail.value.a9 = 0.2
        e.detail.value.b9 = 16920
        if (9 * e.detail.value.r > 300000) {
          e.detail.value.a9 = 0.25
          e.detail.value.b9 = 31920
          if (9 * e.detail.value.r > 420000) {
            e.detail.value.a9 = 0.3
            e.detail.value.b9 = 52920
            if (9 * e.detail.value.r > 660000) {
              e.detail.value.a9 = 0.35
              e.detail.value.b9 = 85920
              if (9 * e.detail.value.r > 960000) {
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
    if (10 * e.detail.value.r > 36000) {
      e.detail.value.a10 = 0.1
      e.detail.value.b10 = 2520
      if (10 * e.detail.value.r > 144000) {
        e.detail.value.a10 = 0.2
        e.detail.value.b10 = 16920
        if (10 * e.detail.value.r > 300000) {
          e.detail.value.a10 = 0.25
          e.detail.value.b10 = 31920
          if (10 * e.detail.value.r > 420000) {
            e.detail.value.a10 = 0.3
            e.detail.value.b10 = 52920
            if (10 * e.detail.value.r > 660000) {
              e.detail.value.a10 = 0.35
              e.detail.value.b10 = 85920
              if (10 * e.detail.value.r > 960000) {
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
    if (11 * e.detail.value.r > 36000) {
      e.detail.value.a11 = 0.1
      e.detail.value.b11 = 2520
      if (11 * e.detail.value.r > 144000) {
        e.detail.value.a11 = 0.2
        e.detail.value.b11 = 16920
        if (11 * e.detail.value.r > 300000) {
          e.detail.value.a11 = 0.25
          e.detail.value.b11 = 31920
          if (11 * e.detail.value.r > 420000) {
            e.detail.value.a11 = 0.3
            e.detail.value.b11 = 52920
            if (11 * e.detail.value.r > 660000) {
              e.detail.value.a11 = 0.35
              e.detail.value.b11 = 85920
              if (11 * e.detail.value.r > 960000) {
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
    if (12 * e.detail.value.r > 36000) {
      e.detail.value.a12 = 0.1
      e.detail.value.b12 = 2520
      if (12 * e.detail.value.r > 144000) {
        e.detail.value.a12 = 0.2
        e.detail.value.b12 = 16920
        if (12 * e.detail.value.r > 300000) {
          e.detail.value.a12 = 0.25
          e.detail.value.b12 = 31920
          if (12 * e.detail.value.r > 420000) {
            e.detail.value.a12 = 0.3
            e.detail.value.b12 = 52920
            if (12 * e.detail.value.r > 660000) {
              e.detail.value.a12 = 0.35
              e.detail.value.b12 = 85920
              if (12 * e.detail.value.r > 960000) {
                e.detail.value.a12 = 0.45
                e.detail.value.b12 = 181920
              }
            }
          }
        }
      }
    }


    //每个月所缴纳的税
    e.detail.value.s1 = e.detail.value.r * e.detail.value.a1 - e.detail.value.b1
    if (e.detail.value.s1 < 0) {
      e.detail.value.s1 = 0
    }
    e.detail.value.s2 = 2 * e.detail.value.r * e.detail.value.a2 - e.detail.value.b2 - e.detail.value.s1
    if (e.detail.value.s2 < 0) {
      e.detail.value.s2 = 0
    }
    e.detail.value.s3 = 3 * e.detail.value.r * e.detail.value.a3 - e.detail.value.b3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s3 < 0) {
      e.detail.value.s3 = 0
    }
    e.detail.value.s4 = 4 * e.detail.value.r * e.detail.value.a4 - e.detail.value.b4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s4 < 0) {
      e.detail.value.s4 = 0
    }
    e.detail.value.s5 = 5 * e.detail.value.r * e.detail.value.a5 - e.detail.value.b5 - e.detail.value.s4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s5 < 0) {
      e.detail.value.s5 = 0
    }
    e.detail.value.s6 = 6 * e.detail.value.r * e.detail.value.a6 - e.detail.value.b6 - e.detail.value.s5 - e.detail.value.s4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s6 < 0) {
      e.detail.value.s6 = 0
    }
    e.detail.value.s7 = 7 * e.detail.value.r * e.detail.value.a7 - e.detail.value.b7 - e.detail.value.s6 - e.detail.value.s5 - e.detail.value.s4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s7 < 0) {
      e.detail.value.s7 = 0
    }
    e.detail.value.s8 = 8 * e.detail.value.r * e.detail.value.a8 - e.detail.value.b8 - e.detail.value.s7 - e.detail.value.s6 - e.detail.value.s5 - e.detail.value.s4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s8 < 0) {
      e.detail.value.s8 = 0
    }
    e.detail.value.s9 = 9 * e.detail.value.r * e.detail.value.a9 - e.detail.value.b9 - e.detail.value.s8 - e.detail.value.s7 - e.detail.value.s6 - e.detail.value.s5 - e.detail.value.s4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s9 < 0) {
      e.detail.value.s9 = 0
    }
    e.detail.value.s10 = 10 * e.detail.value.r * e.detail.value.a10 - e.detail.value.b10 - e.detail.value.s9 - e.detail.value.s8 - e.detail.value.s7 - e.detail.value.s6 - e.detail.value.s5 - e.detail.value.s4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s10 < 0) {
      e.detail.value.s10 = 0
    }
    e.detail.value.s11 = 11 * e.detail.value.r * e.detail.value.a11 - e.detail.value.b11 - e.detail.value.s10 - e.detail.value.s9 - e.detail.value.s8 - e.detail.value.s7 - e.detail.value.s6 - e.detail.value.s5 - e.detail.value.s4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s11 < 0) {
      e.detail.value.s11 = 0
    }
    e.detail.value.s12 = 12 * e.detail.value.r * e.detail.value.a12 - e.detail.value.b12 - e.detail.value.s11 - e.detail.value.s10 - e.detail.value.s9 - e.detail.value.s8 - e.detail.value.s7 - e.detail.value.s6 - e.detail.value.s5 - e.detail.value.s4 - e.detail.value.s3 - e.detail.value.s2 - e.detail.value.s1
    if (e.detail.value.s12 < 0) {
      e.detail.value.s12 = 0
    }
    //每个月所缴纳的税
    //全年纳税总额
    e.detail.value.sz = e.detail.value.s1 + e.detail.value.s2 + e.detail.value.s3 + e.detail.value.s4 + e.detail.value.s5 + e.detail.value.s6 + e.detail.value.s7 + e.detail.value.s8 + e.detail.value.s9 + e.detail.value.s10 + e.detail.value.s11 + e.detail.value.s12
    //全年纳税总额
    
    e.detail.value.ds = (e.detail.value.zong - e.detail.value.baox1)*12 - e.detail.value.sz
    //console.log(e.detail.value.r)
   // e.detail.value.slla = [0, e.detail.value.sz]
    //console.log(e.detail.value.sz)
    this.setData({

      blll: e.detail.value.sz,
      alll:e.detail.value.ds
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
        data: [e.detail.value.s1, e.detail.value.s2 , e.detail.value.s3 ,e.detail.value.s4 ,e.detail.value.s5 , e.detail.value.s6 ,e.detail.value.s7 , e.detail.value.s8 , e.detail.value.s9 , e.detail.value.s10 , e.detail.value.s11 , e.detail.value.s12],
        format: function (val, name) {
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
      blll: 0,
      alll:0
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
  }

})