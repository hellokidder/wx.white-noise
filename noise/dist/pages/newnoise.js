'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var calendar = require('./calendar.js');
var initialTimeText = '20 : 00';
var initialTime = 20;
var secondsPerMin = 60;
var timeUplimit = 60;
var timeLowlimit = 0;
var ksStart = 0;
var ksPause = 1;
var ksContinue = 2;
var xPos = 0;
var yPos = 1;
var changeTimePoint = 1;
var changeImagePoint = 5;
var GOLD = 'gold';
var TREE = 'tree';
var WATER = 'water';
var FIRE = 'fire';
var SOIL = 'soil';
var noiseGold = 'http://www.smartestee.com/noise/gold.mp3';
var noiseTree = 'http://www.smartestee.com/noise/tree.mp3';
var noiseWater = 'http://www.smartestee.com/noise/water.mp3';
var noiseFire = 'http://www.smartestee.com/noise/fire.mp3';
var noiseSoil = 'http://www.smartestee.com/noise/soil.mp3';
var trueOpacity = 1;
var falseOpacity = 0.3;
var loop = '∞';

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '归心'
    }, _this.data = {
      mark: '../image/water.png',
      dates: '',
      lunar: '',
      lunarDay: '',
      showImge: true,
      tick: 0,
      time: '',
      key: ksStart,
      kStatus: ['开始', '暂停', '继续'],
      endKey: '结束',
      touchmove: true,
      changePoint: 0,
      imageNode: WATER,
      bgcolor: 'rgba(0, 255, 255, 0.12)',
      circlecolor: 'rgba(0, 0, 0, 0)',
      starPoint: [0, 0],
      curPoint: [0, 0],
      touches: [0, 0],
      noise: 'http://www.smartestee.com/noise/water.mp3',
      text: '雨水',
      shadowcolor: '#333333',
      goldPoint: falseOpacity,
      treePoint: falseOpacity,
      waterPoint: trueOpacity,
      firePoint: falseOpacity,
      soilPoint: falseOpacity,
      loops: loop,
      timer: null
    }, _this.methods = {
      date: function date(self) {
        var date = new Date();
        var weeks = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
        var week = date.getUTCDay();
        var weekd = weeks[week];
        var month = date.getMonth();
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        var mon = months[month];
        var day = date.getDate();
        var year = date.getFullYear();
        self.dates = mon + ' ' + day + ' ' + weekd + ' ' + year;
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
        self.lunar = '农历' + lunarMonths[lunardate.lMonth - 1] + self.lunarDay;
      },

      // 判断是否开启计时器
      time: function time() {
        var self = this;
        var min = (self.tick - self.tick % secondsPerMin) / secondsPerMin;
        self.methods.circleColorChange(self);
        self.methods.playnoise(self);
        if (min > timeLowlimit && min <= timeUplimit) {
          self.methods.timer(self, false);
        } else {
          self.methods.timer(self, true);
        }
      },

      // 计时器
      timer: function timer(self, loops) {
        self.touchmove = false;
        if (self.key === ksStart || self.key === ksContinue) {
          self.timer = setInterval(function () {
            if (self.tick === -1) {
              self.tick = -1;
            } else {
              self.tick--;
            }
            self.methods.setTime(self, self.tick);
            _wepy2.default.getBackgroundAudioPlayerState({
              success: function success(res) {
                if (res.status !== 1) {
                  self.methods.playnoise(self);
                }
              }
            });
            if (self.tick === timeLowlimit) {
              self.setData({
                touchmove: true,
                circlecolor: 'rgba(0, 0, 0, 0)',
                key: ksStart,
                tick: initialTime * secondsPerMin,
                time: initialTimeText,
                shadowcolor: '#333333'
              });
              _wepy2.default.stopBackgroundAudio();
              self.time = initialTimeText;
              self.tick = initialTime * secondsPerMin;
              self.touchmove = true;
              self.circlecolor = 'rgba(0, 0, 0, 0)';
              self.shadowcolor = '#333333';
              self.key = ksStart;
              clearInterval(self.timer);
              // let interval = setInterval(function() {
              //   console.log('interval')
              //   wepy.getBackgroundAudioPlayerState({
              //     success: function(res) {
              //       if (res.status === 1) {
              //         console.log('1')
              //         wepy.pauseBackgroundAudio()
              //         clearInterval(interval)
              //       }
              //     }
              //   })
              // }, 100)
            }
          }, 1000);
          self.key = ksPause;
        } else {
          clearInterval(self.timer);
          // let interval = setInterval(function() {
          //   wepy.getBackgroundAudioPlayerState({
          //     success: function(res) {
          //       if (res.status === 1) {
          //         wepy.pauseBackgroundAudio()
          //         clearInterval(interval)
          //       }
          //     }
          //   })
          // }, 100)
          self.methods.setTime(self, self.tick);
          self.key = ksContinue;
          self.circlecolor = 'rgba(255, 255, 0, 0)';
        }
      },

      // 刷新时间
      setTime: function setTime(self, tick) {
        var currentTime = self.methods.currentTime(self.tick);
        self.setData({
          time: currentTime
        });
        self.time = currentTime;
      },
      timerEnd: function timerEnd() {
        var self = this;
        clearInterval(self.timer);
        _wepy2.default.stopBackgroundAudio();
        self.key = ksStart;
        self.tick = initialTime * secondsPerMin;
        self.time = initialTimeText;
        self.touchmove = true;
        self.circlecolor = 'rgba(0, 0, 0, 0)';
        self.shadowcolor = '#333333';
      },

      // 计算时间及输出格式
      currentTime: function currentTime(tick) {
        if (tick < 0) {
          return loop;
        } else {
          var min = (tick - tick % secondsPerMin) / secondsPerMin;
          var sec = tick % secondsPerMin;
          if (min > timeUplimit) {
            tick = -1;
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
        }
      },
      playnoise: function playnoise(self) {
        _wepy2.default.playBackgroundAudio({
          dataUrl: self.noise,
          title: '1234567'
        });
      },
      touchstart: function touchstart(e) {
        var self = this;
        self.starPoint = [e.touches[0].pageX, e.touches[0].pageY];
      },
      touchmove: function touchmove(e) {
        var self = this;
        self.curPoint = [e.touches[0].pageX, e.touches[0].pageY];
        self.changePoint++;
        if (self.touchmove) {
          self.methods.timeChange(self);
        }
      },
      touchend: function touchend(e) {
        var self = this;
        if (self.touchmove) {
          self.methods.imageChange(self);
        }
      },

      // 上下滑动调节时间
      timeChange: function timeChange(self) {
        var xchange = self.curPoint[xPos] - self.starPoint[xPos];
        var ychange = self.curPoint[yPos] - self.starPoint[yPos];
        if (Math.abs(xchange) < Math.abs(ychange)) {
          if (self.changePoint > changeTimePoint) {
            if (self.curPoint[yPos] > self.starPoint[yPos] && self.tick > 0) {
              self.tick = self.tick - secondsPerMin;
              self.methods.setTime(self, self.tick);
              self.changePoint = 0;
            }
            if (self.curPoint[yPos] < self.starPoint[yPos]) {
              self.tick = self.tick + secondsPerMin;
              self.methods.setTime(self, self.tick);
              self.changePoint = 0;
            }
          }
        }
      },

      // 左右滑动调节图片
      imageChange: function imageChange(self) {
        var xchange = self.curPoint[xPos] - self.starPoint[xPos];
        var ychange = self.curPoint[yPos] - self.starPoint[yPos];
        if (Math.abs(xchange) > Math.abs(ychange)) {
          if (self.changePoint > changeImagePoint) {
            if (self.curPoint[xPos] > self.starPoint[xPos]) {
              switch (self.imageNode) {
                case GOLD:
                  break;
                case TREE:
                  self.text = '寺钟';
                  self.imageNode = GOLD;
                  self.bgcolor = 'rgba( 255, 255, 0, 0.12)';
                  self.noise = noiseGold;
                  self.goldPoint = trueOpacity;
                  self.treePoint = falseOpacity;
                  break;
                case WATER:
                  self.text = '森林';
                  self.imageNode = TREE;
                  self.bgcolor = 'rgba( 0, 255, 0, 0.12)';
                  self.noise = noiseTree;
                  self.treePoint = trueOpacity;
                  self.waterPoint = falseOpacity;
                  break;
                case FIRE:
                  self.text = '雨水';
                  self.imageNode = WATER;
                  self.bgcolor = 'rgba(0, 255, 255, 0.12)';
                  self.noise = noiseWater;
                  self.waterPoint = trueOpacity;
                  self.firePoint = falseOpacity;
                  break;
                case SOIL:
                  self.text = '篝火';
                  self.imageNode = FIRE;
                  self.bgcolor = 'rgba( 255, 0, 0, 0.12)';
                  self.noise = noiseFire;
                  self.firePoint = trueOpacity;
                  self.soilPoint = falseOpacity;
                  break;
              }
              self.changePoint = 0;
            } else if (self.curPoint[xPos] < self.starPoint[xPos]) {
              switch (self.imageNode) {
                case GOLD:
                  self.text = '森林';
                  self.imageNode = TREE;
                  self.bgcolor = 'rgba( 0, 255, 0, 0.12)';
                  self.noise = noiseTree;
                  self.treePoint = trueOpacity;
                  self.goldPoint = falseOpacity;
                  break;
                case TREE:
                  self.text = '雨水';
                  self.imageNode = WATER;
                  self.bgcolor = 'rgba(0, 255, 255, 0.12)';
                  self.noise = noiseWater;
                  self.waterPoint = trueOpacity;
                  self.treePoint = falseOpacity;
                  break;
                case WATER:
                  self.text = '篝火';
                  self.imageNode = FIRE;
                  self.bgcolor = 'rgba( 255, 0, 0, 0.12)';
                  self.noise = noiseFire;
                  self.firePoint = trueOpacity;
                  self.waterPoint = falseOpacity;
                  break;
                case FIRE:
                  self.text = '浪潮';
                  self.imageNode = SOIL;
                  self.bgcolor = 'rgba( 238, 99, 99, 0.12)';
                  self.noise = noiseSoil;
                  self.soilPoint = trueOpacity;
                  self.firePoint = falseOpacity;
                  break;
                case SOIL:
                  break;
              }
              self.changePoint = 0;
            }
          }
        }
      },
      circleColorChange: function circleColorChange(self) {
        switch (self.imageNode) {
          case GOLD:
            self.circlecolor = 'rgba( 255, 255, 0, 0.1)';
            self.shadowcolor = 'rgba( 255, 255, 0, 1)';
            break;
          case TREE:
            self.circlecolor = 'rgba( 0, 255, 0, 0.1)';
            self.shadowcolor = 'rgba( 0, 255, 0, 1)';
            break;
          case WATER:
            self.circlecolor = 'rgba(0, 255, 255, 0.1)';
            self.shadowcolor = 'rgba(0, 255, 255, 1)';
            break;
          case FIRE:
            self.circlecolor = 'rgba( 255, 0, 0, 0.1)';
            self.shadowcolor = 'rgba( 255, 0, 0, 1)';
            break;
          case SOIL:
            self.circlecolor = 'rgba( 238, 99, 99, 0.1)';
            self.shadowcolor = 'rgba( 238, 99, 99, 1)';
            break;
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      return {
        title: '归心',
        desc: '都市喧闹 何处归心',
        path: '/page/noise'
      };
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var self = this;
      self.methods.date(self);
      setTimeout(function () {
        self.showImge = false;
        self.setData({
          showImge: false
        });
      }, 2000);
      self.time = initialTimeText;
      self.tick = initialTime * secondsPerMin;
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/newnoise'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld25vaXNlLmpzIl0sIm5hbWVzIjpbImNhbGVuZGFyIiwicmVxdWlyZSIsImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxUaW1lIiwic2Vjb25kc1Blck1pbiIsInRpbWVVcGxpbWl0IiwidGltZUxvd2xpbWl0Iiwia3NTdGFydCIsImtzUGF1c2UiLCJrc0NvbnRpbnVlIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwiR09MRCIsIlRSRUUiLCJXQVRFUiIsIkZJUkUiLCJTT0lMIiwibm9pc2VHb2xkIiwibm9pc2VUcmVlIiwibm9pc2VXYXRlciIsIm5vaXNlRmlyZSIsIm5vaXNlU29pbCIsInRydWVPcGFjaXR5IiwiZmFsc2VPcGFjaXR5IiwibG9vcCIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtYXJrIiwiZGF0ZXMiLCJsdW5hciIsImx1bmFyRGF5Iiwic2hvd0ltZ2UiLCJ0aWNrIiwidGltZSIsImtleSIsImtTdGF0dXMiLCJlbmRLZXkiLCJ0b3VjaG1vdmUiLCJjaGFuZ2VQb2ludCIsImltYWdlTm9kZSIsImJnY29sb3IiLCJjaXJjbGVjb2xvciIsInN0YXJQb2ludCIsImN1clBvaW50IiwidG91Y2hlcyIsIm5vaXNlIiwidGV4dCIsInNoYWRvd2NvbG9yIiwiZ29sZFBvaW50IiwidHJlZVBvaW50Iiwid2F0ZXJQb2ludCIsImZpcmVQb2ludCIsInNvaWxQb2ludCIsImxvb3BzIiwidGltZXIiLCJtZXRob2RzIiwiZGF0ZSIsInNlbGYiLCJEYXRlIiwid2Vla3MiLCJ3ZWVrIiwiZ2V0VVRDRGF5Iiwid2Vla2QiLCJtb250aCIsImdldE1vbnRoIiwibW9udGhzIiwibW9uIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsImx1bmFyZGF0ZSIsInNvbGFyMmx1bmFyIiwibHVuYXJNb250aHMiLCJsdW5hckRheXMiLCJsRGF5IiwibE1vbnRoIiwibWluIiwiY2lyY2xlQ29sb3JDaGFuZ2UiLCJwbGF5bm9pc2UiLCJzZXRJbnRlcnZhbCIsInNldFRpbWUiLCJnZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSIsInN1Y2Nlc3MiLCJyZXMiLCJzdGF0dXMiLCJzZXREYXRhIiwic3RvcEJhY2tncm91bmRBdWRpbyIsImNsZWFySW50ZXJ2YWwiLCJjdXJyZW50VGltZSIsInRpbWVyRW5kIiwic2VjIiwicGxheUJhY2tncm91bmRBdWRpbyIsImRhdGFVcmwiLCJ0aXRsZSIsInRvdWNoc3RhcnQiLCJlIiwicGFnZVgiLCJwYWdlWSIsInRpbWVDaGFuZ2UiLCJ0b3VjaGVuZCIsImltYWdlQ2hhbmdlIiwieGNoYW5nZSIsInljaGFuZ2UiLCJNYXRoIiwiYWJzIiwiZGVzYyIsInBhdGgiLCJzZXRUaW1lb3V0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVdDLFFBQVEsc0JBQVIsQ0FBakI7QUFDQSxJQUFNQyxrQkFBa0IsU0FBeEI7QUFDQSxJQUFNQyxjQUFjLEVBQXBCO0FBQ0EsSUFBTUMsZ0JBQWdCLEVBQXRCO0FBQ0EsSUFBTUMsY0FBYyxFQUFwQjtBQUNBLElBQU1DLGVBQWUsQ0FBckI7QUFDQSxJQUFNQyxVQUFVLENBQWhCO0FBQ0EsSUFBTUMsVUFBVSxDQUFoQjtBQUNBLElBQU1DLGFBQWEsQ0FBbkI7QUFDQSxJQUFNQyxPQUFPLENBQWI7QUFDQSxJQUFNQyxPQUFPLENBQWI7QUFDQSxJQUFNQyxrQkFBa0IsQ0FBeEI7QUFDQSxJQUFNQyxtQkFBbUIsQ0FBekI7QUFDQSxJQUFNQyxPQUFPLE1BQWI7QUFDQSxJQUFNQyxPQUFPLE1BQWI7QUFDQSxJQUFNQyxRQUFRLE9BQWQ7QUFDQSxJQUFNQyxPQUFPLE1BQWI7QUFDQSxJQUFNQyxPQUFPLE1BQWI7QUFDQSxJQUFNQyxZQUFZLDBDQUFsQjtBQUNBLElBQU1DLFlBQVksMENBQWxCO0FBQ0EsSUFBTUMsYUFBYSwyQ0FBbkI7QUFDQSxJ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QUFNQTBCLFdBQUt4QixJQUFMLEdBQVluQyxlQUFaO0FBQ0EyRCxXQUFLekIsSUFBTCxHQUFZakMsY0FBY0MsYUFBMUI7QUFDRDs7OztFQWpXZ0MsZUFBSzZHLEk7O2tCQUFuQnRGLEsiLCJmaWxlIjoibmV3bm9pc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmNvbnN0IGNhbGVuZGFyID0gcmVxdWlyZSgnLi4vcGFnZXMvY2FsZW5kYXIuanMnKVxuY29uc3QgaW5pdGlhbFRpbWVUZXh0ID0gJzIwIDogMDAnXG5jb25zdCBpbml0aWFsVGltZSA9IDIwXG5jb25zdCBzZWNvbmRzUGVyTWluID0gNjBcbmNvbnN0IHRpbWVVcGxpbWl0ID0gNjBcbmNvbnN0IHRpbWVMb3dsaW1pdCA9IDBcbmNvbnN0IGtzU3RhcnQgPSAwXG5jb25zdCBrc1BhdXNlID0gMVxuY29uc3Qga3NDb250aW51ZSA9IDJcbmNvbnN0IHhQb3MgPSAwXG5jb25zdCB5UG9zID0gMVxuY29uc3QgY2hhbmdlVGltZVBvaW50ID0gMVxuY29uc3QgY2hhbmdlSW1hZ2VQb2ludCA9IDVcbmNvbnN0IEdPTEQgPSAnZ29sZCdcbmNvbnN0IFRSRUUgPSAndHJlZSdcbmNvbnN0IFdBVEVSID0gJ3dhdGVyJ1xuY29uc3QgRklSRSA9ICdmaXJlJ1xuY29uc3QgU09JTCA9ICdzb2lsJ1xuY29uc3Qgbm9pc2VHb2xkID0gJ2h0dHA6Ly93d3cuc21hcnRlc3RlZS5jb20vbm9pc2UvZ29sZC5tcDMnXG5jb25zdCBub2lzZVRyZWUgPSAnaHR0cDovL3d3dy5zbWFydGVzdGVlLmNvbS9ub2lzZS90cmVlLm1wMydcbmNvbnN0IG5vaXNlV2F0ZXIgPSAnaHR0cDovL3d3dy5zbWFydGVzdGVlLmNvbS9ub2lzZS93YXRlci5tcDMnXG5jb25zdCBub2lzZUZpcmUgPSAnaHR0cDovL3d3dy5zbWFydGVzdGVlLmNvbS9ub2lzZS9maXJlLm1wMydcbmNvbnN0IG5vaXNlU29pbCA9ICdodHRwOi8vd3d3LnNtYXJ0ZXN0ZWUuY29tL25vaXNlL3NvaWwubXAzJ1xuY29uc3QgdHJ1ZU9wYWNpdHkgPSAxXG5jb25zdCBmYWxzZU9wYWNpdHkgPSAwLjNcbmNvbnN0IGxvb3AgPSAn4oieJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5b2S5b+DJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbWFyazogJy4uL2ltYWdlL3dhdGVyLnBuZycsXG4gICAgZGF0ZXM6ICcnLFxuICAgIGx1bmFyOiAnJyxcbiAgICBsdW5hckRheTogJycsXG4gICAgc2hvd0ltZ2U6IHRydWUsXG4gICAgdGljazogMCxcbiAgICB0aW1lOiAnJyxcbiAgICBrZXk6IGtzU3RhcnQsXG4gICAga1N0YXR1czogWyflvIDlp4snLCAn5pqC5YGcJywgJ+e7p+e7rSddLFxuICAgIGVuZEtleTogJ+e7k+adnycsXG4gICAgdG91Y2htb3ZlOiB0cnVlLFxuICAgIGNoYW5nZVBvaW50OiAwLFxuICAgIGltYWdlTm9kZTogV0FURVIsXG4gICAgYmdjb2xvcjogJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMTIpJyxcbiAgICBjaXJjbGVjb2xvcjogJ3JnYmEoMCwgMCwgMCwgMCknLFxuICAgIHN0YXJQb2ludDogWzAsIDBdLFxuICAgIGN1clBvaW50OiBbMCwgMF0sXG4gICAgdG91Y2hlczogWzAsIDBdLFxuICAgIG5vaXNlOiAnaHR0cDovL3d3dy5zbWFydGVzdGVlLmNvbS9ub2lzZS93YXRlci5tcDMnLFxuICAgIHRleHQ6ICfpm6jmsLQnLFxuICAgIHNoYWRvd2NvbG9yOiAnIzMzMzMzMycsXG4gICAgZ29sZFBvaW50OiBmYWxzZU9wYWNpdHksXG4gICAgdHJlZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gICAgd2F0ZXJQb2ludDogdHJ1ZU9wYWNpdHksXG4gICAgZmlyZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gICAgc29pbFBvaW50OiBmYWxzZU9wYWNpdHksXG4gICAgbG9vcHM6IGxvb3AsXG4gICAgdGltZXI6IG51bGxcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGRhdGUoc2VsZikge1xuICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICBjb25zdCB3ZWVrcyA9IFsnU3VuJywgJ01vbicsICdUdWVzJywgJ1dlZCcsICdUaHVyJywgJ0ZyaScsICdTYXQnXVxuICAgICAgY29uc3Qgd2VlayA9IGRhdGUuZ2V0VVRDRGF5KClcbiAgICAgIGNvbnN0IHdlZWtkID0gd2Vla3Nbd2Vla11cbiAgICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpXG4gICAgICBjb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1ZycsICdTZXB0JywgJ09jdCcsICdOb3YnLCAnRGVjJ11cbiAgICAgIGNvbnN0IG1vbiA9IG1vbnRoc1ttb250aF1cbiAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpXG4gICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgICBzZWxmLmRhdGVzID0gbW9uICsgJyAnICsgZGF5ICsgJyAnICsgd2Vla2QgKyAnICcgKyB5ZWFyXG4gICAgICBsZXQgbHVuYXJkYXRlID0gY2FsZW5kYXIuc29sYXIybHVuYXIoeWVhciwgbW9udGggKyAxLCBkYXkpXG4gICAgICBjb25zdCBsdW5hck1vbnRocyA9IFsn5q2j5pyIJywgJ+i0sOaciCcsICflj4HmnIgnLCAn6IKG5pyIJywgJ+S8jeaciCcsICfpmYbmnIgnLCAn5LiD5pyIJywgJ+aNjOaciCcsICfnjpbmnIgnLCAn5ou+5pyIJywgJ+aLvuWjueaciCcsICfohYrmnIgnXVxuICAgICAgY29uc3QgbHVuYXJEYXlzID0gWyfkuIAnLCAn5LqMJywgJ+S4iScsICflm5snLCAn5LqUJywgJ+WFrScsICfkuIMnLCAn5YWrJywgJ+S5nScsICfljYEnXVxuICAgICAgaWYgKGx1bmFyZGF0ZS5sRGF5IDw9IDEwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5YidJyArIGx1bmFyRGF5c1tsdW5hcmRhdGUubERheSAtIDFdXG4gICAgICB9IGVsc2UgaWYgKGx1bmFyZGF0ZS5sRGF5ID4gMTAgJiYgbHVuYXJkYXRlLmxEYXkgPCAyMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+WNgScgKyBsdW5hckRheXNbbHVuYXJkYXRlLmxEYXkgLSAxMV1cbiAgICAgIH0gZWxzZSBpZiAobHVuYXJkYXRlLmxEYXkgPiAyMCAmJiBsdW5hcmRhdGUubERheSA8IDMwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5bu/JyArIGx1bmFyRGF5c1tsdW5hcmRhdGUubERheSAtIDIxXVxuICAgICAgfSBlbHNlIGlmIChsdW5hcmRhdGUubERheSA9PT0gMjApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICfkuozljYEnXG4gICAgICB9IGVsc2UgaWYgKGx1bmFyZGF0ZS5sRGF5ID09PSAzMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+S4ieWNgSdcbiAgICAgIH1cbiAgICAgIHNlbGYubHVuYXIgPSAn5Yac5Y6GJyArIGx1bmFyTW9udGhzW2x1bmFyZGF0ZS5sTW9udGggLSAxXSArIHNlbGYubHVuYXJEYXlcbiAgICB9LFxuICAgIC8vIOWIpOaWreaYr+WQpuW8gOWQr+iuoeaXtuWZqFxuICAgIHRpbWUoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGxldCBtaW4gPSAoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW5cbiAgICAgIHNlbGYubWV0aG9kcy5jaXJjbGVDb2xvckNoYW5nZShzZWxmKVxuICAgICAgc2VsZi5tZXRob2RzLnBsYXlub2lzZShzZWxmKVxuICAgICAgaWYgKG1pbiA+IHRpbWVMb3dsaW1pdCAmJiBtaW4gPD0gdGltZVVwbGltaXQpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnRpbWVyKHNlbGYsIGZhbHNlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnRpbWVyKHNlbGYsIHRydWUpXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDorqHml7blmahcbiAgICB0aW1lcihzZWxmLCBsb29wcykge1xuICAgICAgc2VsZi50b3VjaG1vdmUgPSBmYWxzZVxuICAgICAgaWYgKHNlbGYua2V5ID09PSBrc1N0YXJ0IHx8IHNlbGYua2V5ID09PSBrc0NvbnRpbnVlKSB7XG4gICAgICAgIHNlbGYudGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoc2VsZi50aWNrID09PSAtMSkge1xuICAgICAgICAgICAgc2VsZi50aWNrID0gLTFcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi50aWNrLS1cbiAgICAgICAgICB9XG4gICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgIHdlcHkuZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUoe1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5tZXRob2RzLnBsYXlub2lzZShzZWxmKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBpZiAoc2VsZi50aWNrID09PSB0aW1lTG93bGltaXQpIHtcbiAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIHRvdWNobW92ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgY2lyY2xlY29sb3I6ICdyZ2JhKDAsIDAsIDAsIDApJyxcbiAgICAgICAgICAgICAga2V5OiBrc1N0YXJ0LFxuICAgICAgICAgICAgICB0aWNrOiBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW4sXG4gICAgICAgICAgICAgIHRpbWU6IGluaXRpYWxUaW1lVGV4dCxcbiAgICAgICAgICAgICAgc2hhZG93Y29sb3I6ICcjMzMzMzMzJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHdlcHkuc3RvcEJhY2tncm91bmRBdWRpbygpXG4gICAgICAgICAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICAgICAgICAgIHNlbGYudGljayA9IGluaXRpYWxUaW1lICogc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi50b3VjaG1vdmUgPSB0cnVlXG4gICAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMCknXG4gICAgICAgICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJyMzMzMzMzMnXG4gICAgICAgICAgICBzZWxmLmtleSA9IGtzU3RhcnRcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi50aW1lcilcbiAgICAgICAgICAgIC8vIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZygnaW50ZXJ2YWwnKVxuICAgICAgICAgICAgLy8gICB3ZXB5LmdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlKHtcbiAgICAgICAgICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIC8vICAgICAgIGlmIChyZXMuc3RhdHVzID09PSAxKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCcxJylcbiAgICAgICAgICAgIC8vICAgICAgICAgd2VweS5wYXVzZUJhY2tncm91bmRBdWRpbygpXG4gICAgICAgICAgICAvLyAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpXG4gICAgICAgICAgICAvLyAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gICB9KVxuICAgICAgICAgICAgLy8gfSwgMTAwKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMClcbiAgICAgICAgc2VsZi5rZXkgPSBrc1BhdXNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGVhckludGVydmFsKHNlbGYudGltZXIpXG4gICAgICAgIC8vIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAgIHdlcHkuZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUoe1xuICAgICAgICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIC8vICAgICAgIGlmIChyZXMuc3RhdHVzID09PSAxKSB7XG4gICAgICAgIC8vICAgICAgICAgd2VweS5wYXVzZUJhY2tncm91bmRBdWRpbygpXG4gICAgICAgIC8vICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbClcbiAgICAgICAgLy8gICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgIH0pXG4gICAgICAgIC8vIH0sIDEwMClcbiAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICBzZWxmLmtleSA9IGtzQ29udGludWVcbiAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKDI1NSwgMjU1LCAwLCAwKSdcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOWIt+aWsOaXtumXtFxuICAgIHNldFRpbWUoc2VsZiwgdGljaykge1xuICAgICAgbGV0IGN1cnJlbnRUaW1lID0gc2VsZi5tZXRob2RzLmN1cnJlbnRUaW1lKHNlbGYudGljaylcbiAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgIHRpbWU6IGN1cnJlbnRUaW1lXG4gICAgICB9KVxuICAgICAgc2VsZi50aW1lID0gY3VycmVudFRpbWVcbiAgICB9LFxuICAgIHRpbWVyRW5kKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBjbGVhckludGVydmFsKHNlbGYudGltZXIpXG4gICAgICB3ZXB5LnN0b3BCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgc2VsZi5rZXkgPSBrc1N0YXJ0XG4gICAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgICAgc2VsZi50b3VjaG1vdmUgPSB0cnVlXG4gICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMCknXG4gICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJyMzMzMzMzMnXG4gICAgfSxcbiAgICAvLyDorqHnrpfml7bpl7Tlj4rovpPlh7rmoLzlvI9cbiAgICBjdXJyZW50VGltZSh0aWNrKSB7XG4gICAgICBpZiAodGljayA8IDApIHtcbiAgICAgICAgcmV0dXJuIGxvb3BcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBtaW4gPSAodGljayAtICh0aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pblxuICAgICAgICBsZXQgc2VjID0gdGljayAlIHNlY29uZHNQZXJNaW5cbiAgICAgICAgaWYgKG1pbiA+IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgICAgdGljayA9IC0xXG4gICAgICAgICAgcmV0dXJuIGxvb3BcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAobWluIDwgMTApIHtcbiAgICAgICAgICAgIG1pbiA9ICcwJyArIG1pblxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VjIDwgMTApIHtcbiAgICAgICAgICAgIHNlYyA9ICcwJyArIHNlY1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWluICsgJyA6ICcgKyBzZWNcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcGxheW5vaXNlKHNlbGYpIHtcbiAgICAgIHdlcHkucGxheUJhY2tncm91bmRBdWRpbyh7XG4gICAgICAgIGRhdGFVcmw6IHNlbGYubm9pc2UsXG4gICAgICAgIHRpdGxlOiAnMTIzNDU2NydcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b3VjaHN0YXJ0KGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5zdGFyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgfSxcbiAgICB0b3VjaG1vdmUoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLmN1clBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgICAgc2VsZi5jaGFuZ2VQb2ludCsrXG4gICAgICBpZiAoc2VsZi50b3VjaG1vdmUpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnRpbWVDaGFuZ2Uoc2VsZilcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvdWNoZW5kKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYgKHNlbGYudG91Y2htb3ZlKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy5pbWFnZUNoYW5nZShzZWxmKVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5LiK5LiL5ruR5Yqo6LCD6IqC5pe26Ze0XG4gICAgdGltZUNoYW5nZShzZWxmKSB7XG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeFBvc10gLSBzZWxmLnN0YXJQb2ludFt4UG9zXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50W3lQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeVBvc11cbiAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA8IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID4gY2hhbmdlVGltZVBvaW50KSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeVBvc10gPiBzZWxmLnN0YXJQb2ludFt5UG9zXSAmJiBzZWxmLnRpY2sgPiAwKSB7XG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgLSBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt5UG9zXSA8IHNlbGYuc3RhclBvaW50W3lQb3NdKSB7XG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgKyBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5bem5Y+z5ruR5Yqo6LCD6IqC5Zu+54mHXG4gICAgaW1hZ2VDaGFuZ2Uoc2VsZikge1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50W3hQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeFBvc11cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt5UG9zXSAtIHNlbGYuc3RhclBvaW50W3lQb3NdXG4gICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPiBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA+IGNoYW5nZUltYWdlUG9pbnQpIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt4UG9zXSA+IHNlbGYuc3RhclBvaW50W3hQb3NdKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgR09MRDpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFRSRUU6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+WvuumSnydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IEdPTERcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAyNTUsIDAsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZUdvbGRcbiAgICAgICAgICAgICAgICBzZWxmLmdvbGRQb2ludCA9IHRydWVPcGFjaXR5XG4gICAgICAgICAgICAgICAgc2VsZi50cmVlUG9pbnQgPSBmYWxzZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFdBVEVSOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfmo67mnpcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBUUkVFXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlVHJlZVxuICAgICAgICAgICAgICAgIHNlbGYudHJlZVBvaW50ID0gdHJ1ZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBzZWxmLndhdGVyUG9pbnQgPSBmYWxzZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIEZJUkU6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+mbqOawtCdcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFdBVEVSXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZVdhdGVyXG4gICAgICAgICAgICAgICAgc2VsZi53YXRlclBvaW50ID0gdHJ1ZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBzZWxmLmZpcmVQb2ludCA9IGZhbHNlT3BhY2l0eVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgU09JTDpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn56+d54GrJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gRklSRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZUZpcmVcbiAgICAgICAgICAgICAgICBzZWxmLmZpcmVQb2ludCA9IHRydWVPcGFjaXR5XG4gICAgICAgICAgICAgICAgc2VsZi5zb2lsUG9pbnQgPSBmYWxzZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuY3VyUG9pbnRbeFBvc10gPCBzZWxmLnN0YXJQb2ludFt4UG9zXSkge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlIEdPTEQ6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+ajruaelydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFRSRUVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VUcmVlXG4gICAgICAgICAgICAgICAgc2VsZi50cmVlUG9pbnQgPSB0cnVlT3BhY2l0eVxuICAgICAgICAgICAgICAgIHNlbGYuZ29sZFBvaW50ID0gZmFsc2VPcGFjaXR5XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBUUkVFOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfpm6jmsLQnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBXQVRFUlxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VXYXRlclxuICAgICAgICAgICAgICAgIHNlbGYud2F0ZXJQb2ludCA9IHRydWVPcGFjaXR5XG4gICAgICAgICAgICAgICAgc2VsZi50cmVlUG9pbnQgPSBmYWxzZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFdBVEVSOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfnr53ngasnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBGSVJFXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlRmlyZVxuICAgICAgICAgICAgICAgIHNlbGYuZmlyZVBvaW50ID0gdHJ1ZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBzZWxmLndhdGVyUG9pbnQgPSBmYWxzZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIEZJUkU6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+a1qua9ridcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFNPSUxcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZVNvaWxcbiAgICAgICAgICAgICAgICBzZWxmLnNvaWxQb2ludCA9IHRydWVPcGFjaXR5XG4gICAgICAgICAgICAgICAgc2VsZi5maXJlUG9pbnQgPSBmYWxzZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFNPSUw6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBjaXJjbGVDb2xvckNoYW5nZShzZWxmKSB7XG4gICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgIGNhc2UgR09MRDpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAwLjEpJ1xuICAgICAgICAgIHNlbGYuc2hhZG93Y29sb3IgPSAncmdiYSggMjU1LCAyNTUsIDAsIDEpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgVFJFRTpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4xKSdcbiAgICAgICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMSknXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBXQVRFUjpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMSknXG4gICAgICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAxKSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIEZJUkU6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMSknXG4gICAgICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDEpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgU09JTDpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDIzOCwgOTksIDk5LCAwLjEpJ1xuICAgICAgICAgIHNlbGYuc2hhZG93Y29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDEpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+W9kuW/gycsXG4gICAgICBkZXNjOiAn6YO95biC5Zan6Ze5IOS9leWkhOW9kuW/gycsXG4gICAgICBwYXRoOiAnL3BhZ2Uvbm9pc2UnXG4gICAgfVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBzZWxmLm1ldGhvZHMuZGF0ZShzZWxmKVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2VsZi5zaG93SW1nZSA9IGZhbHNlXG4gICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICBzaG93SW1nZTogZmFsc2VcbiAgICAgIH0pXG4gICAgfSwgMjAwMClcbiAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgfVxufVxuIl19