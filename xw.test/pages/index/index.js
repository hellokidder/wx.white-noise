//index.js
//获取应用实例
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
const nodeWater = {
  mark: '雨水',
  bgcolor: 'rgba(0, 255, 255, 0.12)',
  noise: 'http://10.0.0.100/noise/water.mp3',
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
  noise: 'http://10.0.0.100/noise/gold.mp3',
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
  noise: 'http://10.0.0.100/noise/tree.mp3',
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
  noise: 'http://10.0.0.100/noise/fire.mp3',
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
  noise: 'http://10.0.0.100/noise/soil.mp3',
  imageNode: 'SOIL',
  waterPoint: falseOpacity,
  treePoint: falseOpacity,
  goldPoint: falseOpacity,
  firePoint: falseOpacity,
  soilPoint: trueOpacity
}

Page({
  data: {
    showImage: true,
    startButton: true,
    pauseOrContinue: true,
    touchmove: true,
    lunar: null,
    dates: null,
    time: null,
    tick: null,
    timer: null,
    listen: null,
    starPoint: [0, 0],
    curPoint: [0, 0],
    touches: [],
    changePoint: 0,
    node: nodeWater,
    start: '开始',
    pause: '暂停',
    continues: '继续',
    end: '结束',
    shadowcolor: '#333333',
    circlecolor: 'rgba( 0, 0, 0, 0)'
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
  start: function () {
    var self = this;
    self.setData({
      circlecolor: self.data.node.bgcolor,
      shadowcolor: self.data.node.bgcolor,
      startButton: false,
      pauseOrContinue: true,
      touchmove: false
    })
    if (self.tick === timeLowlimit) {
    } else {
      self.playnoise(self);
      self.listen(self);
    }
    if (self.data.tick > timeLowlimit && self.data.tick < timeUplimit) {
      self.time(self);
    }
  },
  pause: function () {
    var self = this;
    self.setData({
      pauseOrContinue: false,
      circlecolor: 'rgba( 0, 0, 0, 0)'
    })
    wx.pauseBackgroundAudio();
    clearInterval(self.data.listen);
    clearInterval(self.data.timer);
  },
  end: function () {
    var self = this;
    self.setData({
      startButton: true,
      touchmove: true,
      circlecolor: 'rgba( 0, 0, 0, 0)',
      shadowcolor: '#333333',
      time: initialTimeText,
      tick: initialMin * secondsPerMin
    })
    wx.stopBackgroundAudio();
    clearInterval(self.data.listen);
    clearInterval(self.data.timer);
  },
  playnoise: function (self) {
    wx.playBackgroundAudio({
      dataUrl: self.data.node.noise,
      title: self.data.node.imageNode
    });
  },
  time: function (self) {
    self.data.timer = setInterval(function () {
      self.data.tick--;
      self.setTime(self);
      if (self.data.tick === timeLowlimit) {
        self.setData({
          circlecolor: 'rgba( 0, 0, 0, 0)',
          shadowcolor: '#333333',
          time: initialTimeText,
          startButton: true,
          tick: initialMin * secondsPerMin,
          touchmove: true
        });
        wx.stopBackgroundAudio();
        clearInterval(self.data.listen);
        clearInterval(self.data.timer);
      }
    }, 1000);
  },
  // 监听 音频停止时再起一个音频
  listen: function (self) {
    self.data.listen = setInterval(function () {
      if (self.data.tick !== timeLowlimit) {
        wx.getBackgroundAudioPlayerState({
          success: function success(res) {
            if (res.status !== 1) {
              self.playnoise(self);
            }
          }
        });
      }
    }, 50);
  },
  touchstart: function (e) {
    var self = this;
    self.data.starPoint = [e.touches[0].pageX, e.touches[0].pageY];
  },
  touchmove: function (e) {
    var self = this;
    self.data.curPoint = [e.touches[0].pageX, e.touches[0].pageY];
    self.data.changePoint++;
    if (self.data.touchmove) {
      self.timeChange(self);
    }
  },
  touchend: function (e) {
    var self = this;
    console.log()
    if (self.data.touchmove) {
      self.imageChange(self);
    }
  },
  timeChange: function (self) {
    var xchange = self.data.curPoint[xPos] - self.data.starPoint[xPos];
    var ychange = self.data.curPoint[yPos] - self.data.starPoint[yPos];
    if (Math.abs(xchange) < Math.abs(ychange)) {
      if (self.data.changePoint > changeTimePoint) {
        if (self.data.curPoint[yPos] > self.data.starPoint[yPos] && self.data.tick > timeLowlimit) {
          // 向下滑
          self.data.tick = self.data.tick - secondsPerMin;
          self.setTime(self, self.data.tick);
          self.data.changePoint = 0;
        }
        if (self.data.curPoint[yPos] < self.data.starPoint[yPos] && self.data.tick < timeUplimit) {
          // 向上滑
          self.data.tick = self.data.tick + secondsPerMin;
          self.setTime(self, self.data.tick);
          self.data.changePoint = 0;
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
  onShareAppMessage() {
    return {
      title: '归心',
      desc: '都市喧闹 何处归心',
      path: '/pages/index'
    }
  },
  
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
    // wx.getBackgroundAudioPlayerState({
    //   success: function success(res) {
    //     if (res.status === 1) {
          // clearInterval(self.data.listen);          
    //       setTimeout(() => {
    //         wx.stopBackgroundAudio();
    //       },100)
    //     }
    //   }
    // });
    self.data.tick = initialMin * secondsPerMin;
  },
  
})
