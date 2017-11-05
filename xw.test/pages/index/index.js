const app = getApp()
const calendar = require('../index/calendar')
const initialTimeText = '20 : 00'
const initialMin = 20
const secondsPerMin = 60
const xPos = 0
const yPos = 1
const changeTimePoint = 1
const changeImagePoint = 5
const timeUplimit = 3660
const timeLowlimit = 0
const loop = '∞'
const trueOpacity = 1
const falseOpacity = 0.3
const host = 'http://10.0.0.100/noise/'
const nodeWater = {
  mark: '雨水',
  bgcolor: 'rgba(0, 255, 255, 0.12)',
  noise: `${host}water.m4a`,
  imageNode: 'WATER',
  waterPoint: trueOpacity,
  treePoint: falseOpacity,
  goldPoint: falseOpacity,
  firePoint: falseOpacity,
  soilPoint: falseOpacity
}
const nodeGold = {
  mark: '寺钟',
  bgcolor: 'rgba( 255, 255, 0, 0.12)',
  noise: `${host}gold.m4a`,
  imageNode: 'GOLD',
  waterPoint: falseOpacity,
  treePoint: falseOpacity,
  goldPoint: trueOpacity,
  firePoint: falseOpacity,
  soilPoint: falseOpacity
}
const nodeTree = {
  mark: '森林',
  bgcolor: 'rgba( 0, 255, 0, 0.12)',
  noise: `${host}tree.m4a`,
  imageNode: 'TREE',
  waterPoint: falseOpacity,
  treePoint: trueOpacity,
  goldPoint: falseOpacity,
  firePoint: falseOpacity,
  soilPoint: falseOpacity
}
const nodeFire = {
  mark: '篝火',
  bgcolor: 'rgba( 255, 0, 0, 0.12)',
  noise: `${host}fire.m4a`,
  imageNode: 'FIRE',
  waterPoint: falseOpacity,
  treePoint: falseOpacity,
  goldPoint: falseOpacity,
  firePoint: trueOpacity,
  soilPoint: falseOpacity
}
const nodeSoil = {
  mark: '浪潮',
  bgcolor: 'rgba( 238, 99, 99, 0.12)',
  noise: `${host}soil.m4a`,
  imageNode: 'SOIL',
  waterPoint: falseOpacity,
  treePoint: falseOpacity,
  goldPoint: falseOpacity,
  firePoint: falseOpacity,
  soilPoint: trueOpacity
}

Page({
  data: {
    noticeShow: false,
    showImage: true,
    startButton: true,
    pauseOrContinue: true,
    touchmove: true,
    ifpool: true,
    lunar: null,
    dates: null,
    time: null,
    tick: null,
    timer: null,
    times: null,
    listen: null,
    listens: null,
    starPoint: [0, 0],
    curPoint: [0, 0],
    touches: [],
    changePoint: 0,
    node: nodeWater,
    start: '开始',
    pause: '暂停',
    continues: '继续',
    end: '结束',
    shadowcolor: 'rgba( 0, 0, 0, 0)',
    circlecolor: 'rgba( 0, 0, 0, 0)',
    animationData: {}
  },

  date: function (self) {
    var date = new Date();
    var weeks = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    var week = date.getUTCDay();
    var weekd = weeks[week];
    var month = date.getMonth();
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var mon = months[month];
    var day = date.getDate();
    var year = date.getFullYear();
    self.setData({
      dates: mon + ' ' + day + ' ' + weekd + ' ' + year
    })
    var lunardate = calendar.solar2lunar(year, month + 1, day);
    var lunarMonths = ['正月', '贰月', '叁月', '肆月', '伍月', '陆月', '七月', '捌月', '玖月', '拾月', '拾壹月', '腊月'];
    var lunarDays = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    if (lunardate.lDay <= 10) {
      self.lunarDay = '初' + lunarDays[lunardate.lDay - 1];
    } else if (lunardate.lDay > 10 && lunardate.lDay < 20) {
      self.lunarDay = '十' + lunarDays[lunardate.lDay - 11];
    } else if (lunardate.lDay > 20 && lunardate.lDay < 30) {
      self.lunarDay = '廿' + lunarDays[lunardate.lDay - 21];
    } else if (lunardate.lDay === 20) {
      self.lunarDay = '二十';
    } else if (lunardate.lDay === 30) {
      self.lunarDay = '三十';
    }
    self.setData({
      lunar: '农历' + lunarMonths[lunardate.lMonth - 1] + self.lunarDay
    })
  },
  // 开始
  start: function () {
    var self = this;
    self.setData({
      ifpool: true,
      circlecolor: self.data.node.bgcolor,
      shadowcolor: self.data.node.bgcolor,
      startButton: false,
      pauseOrContinue: true,
      touchmove: false
    })
    console.log(self.data.ifpool)
    if (self.tick === timeLowlimit) {} else {
      self.playnoise(self);
    }
    if (self.data.tick > timeLowlimit && self.data.tick < timeUplimit) {
      self.time(self);
    }
  },
  // 暂停
  pause: function () {
    var self = this;
    self.setData({
      pauseOrContinue: false,
      circlecolor: 'rgba( 0, 0, 0, 0)'
    })
    wx.pauseBackgroundAudio();
    clearInterval(self.data.times);
  },
  // 结束
  end: function () {
    var self = this;
    self.setData({
      ifpool: false,
      startButton: true,
      touchmove: true,
      shadowcolor: 'rgba( 0, 0, 0, 0)',
      circlecolor: 'rgba( 0, 0, 0, 0)',
      time: initialTimeText,
      tick: initialMin * secondsPerMin
    })
    wx.stopBackgroundAudio();
    wx.onBackgroundAudioStop((d) => {})
    clearInterval(self.data.times);
  },
  playnoise: function (self) {
    wx.playBackgroundAudio({
      dataUrl: self.data.node.noise,
      title: self.data.node.imageNode,
      complete: () => {
        wx.onBackgroundAudioStop(
          () => {
            if (!self.data.startButton && self.data.ifpool) {
              self.playnoise(self)
            }
          }
        )
      }
    });
  },
  // 一个倒计时,tick = 0 时停止
  time: function (self) {
    self.data.times = setInterval(function () {
      self.data.tick--;
      self.setTime(self);
      if (self.data.tick === timeLowlimit) {
        self.setData({
          ifpool: false,
          circlecolor: 'rgba( 0, 0, 0, 0)',
          shadowcolor: '#333333',
          time: initialTimeText,
          startButton: true,
          tick: initialMin * secondsPerMin,
          touchmove: true
        });
        wx.stopBackgroundAudio();
        clearInterval(self.data.times);
      }
    }, 1000);
    self.setData({
      timer: self.data.times
    });
  },
  // 触摸指令
  touchstart: function (e) {
    var self = this;
    self.setData({
      starPoint: [e.touches[0].pageX, e.touches[0].pageY]
    })
  },
  touchmove: function (e) {
    var self = this;
    self.setData({
      curPoint: [e.touches[0].pageX, e.touches[0].pageY],
      changePoint: self.data.changePoint + 1
    })
    if (self.data.touchmove) {
      self.timeChange(self);
    }
  },
  touchend: function (e) {
    var self = this;
    if (self.data.touchmove) {
      self.imageChange(self);
    }
  },
  // 上下滑动改变tick
  timeChange: function (self) {
    var xchange = self.data.curPoint[xPos] - self.data.starPoint[xPos];
    var ychange = self.data.curPoint[yPos] - self.data.starPoint[yPos];
    if (Math.abs(xchange) < Math.abs(ychange)) {
      if (self.data.changePoint > changeTimePoint) {
        if (self.data.curPoint[yPos] > self.data.starPoint[yPos] && self.data.tick > timeLowlimit + 60) {
          // 向下滑
          self.setData({
            tick: self.data.tick - secondsPerMin,
            changePoint: 0
          })
          self.setTime(self, self.data.tick);
        }
        if (self.data.curPoint[yPos] < self.data.starPoint[yPos] && self.data.tick < timeUplimit) {
          // 向上滑
          self.setData({
            tick: self.data.tick + secondsPerMin,
            changePoint: 0
          })
          self.setTime(self, self.data.tick);
        }
      }
    }
  },

  setTime: function (self) {
    var currentTime = self.currentTime(self.data.tick);
    self.setData({
      time: currentTime
    });
  },

  // 计算时间格式
  currentTime: function (tick) {
    var min = (tick - tick % secondsPerMin) / secondsPerMin;
    var sec = tick % secondsPerMin;
    if (tick === timeUplimit) {
      return loop;
    } else {
      if (min < 10) {
        min = '0' + min;
      }
      if (sec < 10) {
        sec = '0' + sec;
      }
      return min + ' : ' + sec;
    }
  },
  // 左右滑动改变图片及音频
  imageChange: function (self) {
    var xchange = self.data.curPoint[xPos] - self.data.starPoint[xPos];
    var ychange = self.data.curPoint[yPos] - self.data.starPoint[yPos];
    if (Math.abs(xchange) > Math.abs(ychange)) {
      if (self.data.changePoint > changeImagePoint) {
        if (self.data.curPoint[xPos] > self.data.starPoint[xPos]) {
          // 向右划
          switch (self.data.node.imageNode) {
            case 'GOLD':
              break;
            case 'TREE':
              self.setData({
                node: nodeGold
              })
              break;
            case 'WATER':
              self.setData({
                node: nodeTree
              })
              break;
            case 'FIRE':
              self.setData({
                node: nodeWater
              })
              break;
            case 'SOIL':
              self.setData({
                node: nodeFire
              })
              break;
          }
          self.data.changePoint = 0;
        } else if (self.data.curPoint[xPos] < self.data.starPoint[xPos]) {
          // 往左划
          switch (self.data.node.imageNode) {
            case 'GOLD':
              self.setData({
                node: nodeTree
              })
              break;
            case 'TREE':
              self.setData({
                node: nodeWater
              })
              break;
            case 'WATER':
              self.setData({
                node: nodeFire
              })
              break;
            case 'FIRE':
              self.setData({
                node: nodeSoil
              })
              break;
            case 'SOIL':
              break;
          }
          self.changePoint = 0;
        }
      }
    }
  },
  // 显示提示卡片
  showNotice: function () {
    let self = this
    self.setData({
      noticeShow: true
    })
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    self.animation = animation
    animation.opacity(1).translateY(-20).step()
    self.setData({
      animationData: animation.export()
    })
  },
  // 关闭提示卡片
  closeNotice: function () {
    let self = this
    self.setData({
      noticeShow: false,
      animationData: null
    })
  },
  // 分享
  onShareAppMessage() {
    return {
      title: '归心',
      desc: '都市喧闹 何处归心',
      path: '/pages/index'
    }
  },
  // 初始化
  onLoad: function () {
    var self = this;
    self.date(self);
    setTimeout(() => {
      self.showImage = false
      self.setData({
        showImage: false,
        time: initialTimeText
      })
    }, 3000)
    self.data.tick = initialMin * secondsPerMin;
  }
})
