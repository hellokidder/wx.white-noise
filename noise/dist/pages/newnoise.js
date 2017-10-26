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
var noiseGold = 'http://localhost:5000/%E9%92%9F.mp3';
var noiseTree = 'http://localhost:5000/%E6%A3%AE.mp3';
var noiseWater = 'http://localhost:5000/%E9%9B%A8.mp3';
var noiseFire = 'http://localhost:5000/%E7%81%AB.mp3';
var noiseSoil = 'http://localhost:5000/%E6%BD%AE.mp3';
var trueOpacity = 1;
var falseOpacity = 0.3;
var loop = '∞';

var _timer = void 0;

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
      noise: 'http://localhost:5000/雨.mp3',
      text: '雨水',
      shadowcolor: '#333333',
      goldPoint: falseOpacity,
      treePoint: falseOpacity,
      waterPoint: trueOpacity,
      firePoint: falseOpacity,
      soilPoint: falseOpacity,
      loops: loop
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
          console.log('%%%%%%');
        }
      },

      // 计时器
      timer: function timer(self, loops) {
        self.touchmove = false;
        if (self.key === ksStart || self.key === ksContinue) {
          _timer = setInterval(function () {
            if (loops) {
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
                time: initialTimeText
              });
              _wepy2.default.stopBackgroundAudio();
              self.time = initialTimeText;
              self.tick = initialTime * secondsPerMin;
              self.touchmove = true;
              self.circlecolor = 'rgba(0, 0, 0, 0)';
              self.key = ksStart;
              clearInterval(_timer);
            }
          }, 1000);
          self.key = ksPause;
        } else {
          console.log(self.tick);
          _wepy2.default.pauseBackgroundAudio();
          self.methods.setTime(self, self.tick);
          clearInterval(_timer);
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
        clearInterval(_timer);
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
      playnoise: function playnoise(self) {
        _wepy2.default.playBackgroundAudio({
          dataUrl: self.noise
        });
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
      // self.calendar.solar2lunar()
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld25vaXNlLmpzIl0sIm5hbWVzIjpbImNhbGVuZGFyIiwicmVxdWlyZSIsImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxUaW1lIiwic2Vjb25kc1Blck1pbiIsInRpbWVVcGxpbWl0IiwidGltZUxvd2xpbWl0Iiwia3NTdGFydCIsImtzUGF1c2UiLCJrc0NvbnRpbnVlIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwiR09MRCIsIlRSRUUiLCJXQVRFUiIsIkZJUkUiLCJTT0lMIiwibm9pc2VHb2xkIiwibm9pc2VUcmVlIiwibm9pc2VXYXRlciIsIm5vaXNlRmlyZSIsIm5vaXNlU29pbCIsInRydWVPcGFjaXR5IiwiZmFsc2VPcGFjaXR5IiwibG9vcCIsInRpbWVyIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1hcmsiLCJkYXRlcyIsImx1bmFyIiwibHVuYXJEYXkiLCJzaG93SW1nZSIsInRpY2siLCJ0aW1lIiwia2V5Iiwia1N0YXR1cyIsImVuZEtleSIsInRvdWNobW92ZSIsImNoYW5nZVBvaW50IiwiaW1hZ2VOb2RlIiwiYmdjb2xvciIsImNpcmNsZWNvbG9yIiwic3RhclBvaW50IiwiY3VyUG9pbnQiLCJ0b3VjaGVzIiwibm9pc2UiLCJ0ZXh0Iiwic2hhZG93Y29sb3IiLCJnb2xkUG9pbnQiLCJ0cmVlUG9pbnQiLCJ3YXRlclBvaW50IiwiZmlyZVBvaW50Iiwic29pbFBvaW50IiwibG9vcHMiLCJtZXRob2RzIiwiZGF0ZSIsInNlbGYiLCJEYXRlIiwid2Vla3MiLCJ3ZWVrIiwiZ2V0VVRDRGF5Iiwid2Vla2QiLCJtb250aCIsImdldE1vbnRoIiwibW9udGhzIiwibW9uIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsImx1bmFyZGF0ZSIsInNvbGFyMmx1bmFyIiwibHVuYXJNb250aHMiLCJsdW5hckRheXMiLCJsRGF5IiwibE1vbnRoIiwibWluIiwiY2lyY2xlQ29sb3JDaGFuZ2UiLCJwbGF5bm9pc2UiLCJjb25zb2xlIiwibG9nIiwic2V0SW50ZXJ2YWwiLCJzZXRUaW1lIiwiZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUiLCJzdWNjZXNzIiwicmVzIiwic3RhdHVzIiwic2V0RGF0YSIsInN0b3BCYWNrZ3JvdW5kQXVkaW8iLCJjbGVhckludGVydmFsIiwicGF1c2VCYWNrZ3JvdW5kQXVkaW8iLCJjdXJyZW50VGltZSIsInRpbWVyRW5kIiwic2VjIiwidG91Y2hzdGFydCIsImUiLCJwYWdlWCIsInBhZ2VZIiwidGltZUNoYW5nZSIsInRvdWNoZW5kIiwiaW1hZ2VDaGFuZ2UiLCJ4Y2hhbmdlIiwieWNoYW5nZSIsIk1hdGgiLCJhYnMiLCJwbGF5QmFja2dyb3VuZEF1ZGlvIiwiZGF0YVVybCIsInRpdGxlIiwiZGVzYyIsInBhdGgiLCJzZXRUaW1lb3V0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVdDLFFBQVEsc0JBQVIsQ0FBakI7QUFDQSxJQUFNQyxrQkFBa0IsU0FBeEI7QUFDQSxJQUFNQyxjQUFjLEVBQXBCO0FBQ0EsSUFBTUMsZ0JBQWdCLEVBQXRCO0FBQ0EsSUFBTUMsY0FBYyxFQUFwQjtBQUNBLElBQU1DLGVBQWUsQ0FBckI7QUFDQSxJQUFNQyxVQUFVLENBQWhCO0FBQ0EsSUFBTUMsVUFBVSxDQUFoQjtBQUNBLElBQU1DLGFBQWEsQ0FBbkI7QUFDQSxJQUFNQyxPQUFPLENBQWI7QUFDQSxJQUFNQyxPQUFPLENBQWI7QUFDQSxJQUFNQyxrQkFBa0IsQ0FBeEI7QUFDQSxJQUFNQyxtQkFBbUIsQ0FBekI7QUFDQSxJQUFNQyxPQUFPLE1BQWI7QUFDQSxJQUFNQyxPQUFPLE1BQWI7QUFDQSxJQUFNQyxRQUFRLE9BQWQ7QUFDQSxJQUFNQyxPQUFPLE1BQWI7QUFDQSxJQUFNQyxPQUFPLE1BQWI7QUFDQSxJQUFNQyxZQUFZLHFDQUFsQjtBQUNBLElBQU1DLFlBQVkscUNBQWxCO0FBQ0EsSUFBTUMsYUFBYSxxQ0FBbkI7QUFDQSxJQUFNQyxZQUFZLHFDQUFsQjtBQUNBLElBQU1DLFlBQVkscUNBQWxCO0FBQ0EsSUFBTUMsY0FBYyxDQUFwQjtBQUNBLElBQU1DLGVBQWUsR0FBckI7QUFDQSxJQUFNQyxPQUFPLEdBQWI7O0FBRUEsSUFBSUMsZUFBSjs7SUFFcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxZQUFNLG9CQUREO0FBRUxDLGFBQU8sRUFGRjtBQUdMQyxhQUFPLEVBSEY7QUFJTEMsZ0JBQVUsRUFKTDtBQUtMQyxnQkFBVSxJQUxMO0FBTUxDLFlBQU0sQ0FORDtBQU9MQyxZQUFNLEVBUEQ7QUFRTEMsV0FBS2hDLE9BUkE7QUFTTGlDLGVBQVMsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsQ0FUSjtBQVVMQyxjQUFRLElBVkg7QUFXTEMsaUJBQVcsSUFYTjtBQVlMQyxtQkFBYSxDQVpSO0FBYUxDLGlCQUFXNUIsS0FiTjtBQWNMNkIsZUFBUyx5QkFkSjtBQWVMQyxtQkFBYSxrQkFmUjtBQWdCTEMsaUJBQVcsQ0FBQyxDQUFELEVBQUksQ0FBSixDQWhCTjtBQWlCTEMsZ0JBQVUsQ0FBQyxDQUFELEVBQUksQ0FBSixDQWpCTDtBQWtCTEMsZUFBUyxDQUFDLENBQUQsRUFBSSxDQUFKLENBbEJKO0FBbUJMQyxhQUFPLDZCQW5CRjtBQW9CTEMsWUFBTSxJQXBCRDtBQXFCTEMsbUJBQWEsU0FyQlI7QUFzQkxDLGlCQUFXNUIsWUF0Qk47QUF1Qkw2QixpQkFBVzdCLFlBdkJOO0FBd0JMOEIsa0JBQVkvQixXQXhCUDtBQXlCTGdDLGlCQUFXL0IsWUF6Qk47QUEwQkxnQyxpQkFBV2hDLFlBMUJOO0FBMkJMaUMsYUFBT2hDO0FBM0JGLEssUUE2QlBpQyxPLEdBQVU7QUFDUkMsVUFEUSxnQkFDSEMsSUFERyxFQUNHO0FBQ1QsWUFBSUQsT0FBTyxJQUFJRSxJQUFKLEVBQVg7QUFDQSxZQUFNQyxRQUFRLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxNQUFmLEVBQXVCLEtBQXZCLEVBQThCLE1BQTlCLEVBQXNDLEtBQXRDLEVBQTZDLEtBQTdDLENBQWQ7QUFDQSxZQUFNQyxPQUFPSixLQUFLSyxTQUFMLEVBQWI7QUFDQSxZQUFNQyxRQUFRSCxNQUFNQyxJQUFOLENBQWQ7QUFDQSxZQUFNRyxRQUFRUCxLQUFLUSxRQUFMLEVBQWQ7QUFDQSxZQUFNQyxTQUFTLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DLE1BQXBDLEVBQTRDLE1BQTVDLEVBQW9ELEtBQXBELEVBQTJELE1BQTNELEVBQW1FLEtBQW5FLEVBQTBFLEtBQTFFLEVBQWlGLEtBQWpGLENBQWY7QUFDQSxZQUFNQyxNQUFNRCxPQUFPRixLQUFQLENBQVo7QUFDQSxZQUFNSSxNQUFNWCxLQUFLWSxPQUFMLEVBQVo7QUFDQSxZQUFNQyxPQUFPYixLQUFLYyxXQUFMLEVBQWI7QUFDQWIsYUFBSzVCLEtBQUwsR0FBYXFDLE1BQU0sR0FBTixHQUFZQyxHQUFaLEdBQWtCLEdBQWxCLEdBQXdCTCxLQUF4QixHQUFnQyxHQUFoQyxHQUFzQ08sSUFBbkQ7QUFDQSxZQUFJRSxZQUFZM0UsU0FBUzRFLFdBQVQsQ0FBcUJILElBQXJCLEVBQTJCTixRQUFRLENBQW5DLEVBQXNDSSxHQUF0QyxDQUFoQjtBQUNBLFlBQU1NLGNBQWMsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsSUFBL0IsRUFBcUMsSUFBckMsRUFBMkMsSUFBM0MsRUFBaUQsSUFBakQsRUFBdUQsSUFBdkQsRUFBNkQsS0FBN0QsRUFBb0UsSUFBcEUsQ0FBcEI7QUFDQSxZQUFNQyxZQUFZLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CLEVBQW9DLEdBQXBDLEVBQXlDLEdBQXpDLEVBQThDLEdBQTlDLENBQWxCO0FBQ0EsWUFBSUgsVUFBVUksSUFBVixJQUFrQixFQUF0QixFQUEwQjtBQUN4QmxCLGVBQUsxQixRQUFMLEdBQWdCLE1BQU0yQyxVQUFVSCxVQUFVSSxJQUFWLEdBQWlCLENBQTNCLENBQXRCO0FBQ0QsU0FGRCxNQUVPLElBQUlKLFVBQVVJLElBQVYsR0FBaUIsRUFBakIsSUFBdUJKLFVBQVVJLElBQVYsR0FBaUIsRUFBNUMsRUFBZ0Q7QUFDckRsQixlQUFLMUIsUUFBTCxHQUFnQixNQUFNMkMsVUFBVUgsVUFBVUksSUFBVixHQUFpQixFQUEzQixDQUF0QjtBQUNELFNBRk0sTUFFQSxJQUFJSixVQUFVSSxJQUFWLEdBQWlCLEVBQWpCLElBQXVCSixVQUFVSSxJQUFWLEdBQWlCLEVBQTVDLEVBQWdEO0FBQ3JEbEIsZUFBSzFCLFFBQUwsR0FBZ0IsTUFBTTJDLFVBQVVILFVBQVVJLElBQVYsR0FBaUIsRUFBM0IsQ0FBdEI7QUFDRCxTQUZNLE1BRUEsSUFBSUosVUFBVUksSUFBVixLQUFtQixFQUF2QixFQUEyQjtBQUNoQ2xCLGVBQUsxQixRQUFMLEdBQWdCLElBQWhCO0FBQ0QsU0FGTSxNQUVBLElBQUl3QyxVQUFVSSxJQUFWLEtBQW1CLEVBQXZCLEVBQTJCO0FBQ2hDbEIsZUFBSzFCLFFBQUwsR0FBZ0IsSUFBaEI7QUFDRDtBQUNEMEIsYUFBSzNCLEtBQUwsR0FBYSxPQUFPMkMsWUFBWUYsVUFBVUssTUFBVixHQUFtQixDQUEvQixDQUFQLEdBQTJDbkIsS0FBSzFCLFFBQTdEO0FBQ0QsT0EzQk87O0FBNEJSO0FBQ0FHLFVBN0JRLGtCQTZCRDtBQUNMLFlBQUl1QixPQUFPLElBQVg7QUFDQSxZQUFJb0IsTUFBTSxDQUFDcEIsS0FBS3hCLElBQUwsR0FBYXdCLEtBQUt4QixJQUFMLEdBQVlqQyxhQUExQixJQUE0Q0EsYUFBdEQ7QUFDQXlELGFBQUtGLE9BQUwsQ0FBYXVCLGlCQUFiLENBQStCckIsSUFBL0I7QUFDQUEsYUFBS0YsT0FBTCxDQUFhd0IsU0FBYixDQUF1QnRCLElBQXZCO0FBQ0EsWUFBSW9CLE1BQU0zRSxZQUFOLElBQXNCMkUsT0FBTzVFLFdBQWpDLEVBQThDO0FBQzVDd0QsZUFBS0YsT0FBTCxDQUFhaEMsS0FBYixDQUFtQmtDLElBQW5CLEVBQXlCLEtBQXpCO0FBQ0QsU0FGRCxNQUVPO0FBQ0xBLGVBQUtGLE9BQUwsQ0FBYWhDLEtBQWIsQ0FBbUJrQyxJQUFuQixFQUF5QixJQUF6QjtBQUNBdUIsa0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0Q7QUFDRixPQXhDTzs7QUF5Q1I7QUFDQTFELFdBMUNRLGlCQTBDRmtDLElBMUNFLEVBMENJSCxLQTFDSixFQTBDVztBQUNqQkcsYUFBS25CLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxZQUFJbUIsS0FBS3RCLEdBQUwsS0FBYWhDLE9BQWIsSUFBd0JzRCxLQUFLdEIsR0FBTCxLQUFhOUIsVUFBekMsRUFBcUQ7QUFDbkRrQixtQkFBUTJELFlBQVksWUFBVztBQUM3QixnQkFBSTVCLEtBQUosRUFBVztBQUNURyxtQkFBS3hCLElBQUwsR0FBWSxDQUFDLENBQWI7QUFDRCxhQUZELE1BRU87QUFDTHdCLG1CQUFLeEIsSUFBTDtBQUNEO0FBQ0R3QixpQkFBS0YsT0FBTCxDQUFhNEIsT0FBYixDQUFxQjFCLElBQXJCLEVBQTJCQSxLQUFLeEIsSUFBaEM7QUFDQSwyQkFBS21ELDZCQUFMLENBQW1DO0FBQ2pDQyx1QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCLG9CQUFJQSxJQUFJQyxNQUFKLEtBQWUsQ0FBbkIsRUFBc0I7QUFDcEI5Qix1QkFBS0YsT0FBTCxDQUFhd0IsU0FBYixDQUF1QnRCLElBQXZCO0FBQ0Q7QUFDRjtBQUxnQyxhQUFuQztBQU9BLGdCQUFJQSxLQUFLeEIsSUFBTCxLQUFjL0IsWUFBbEIsRUFBZ0M7QUFDOUJ1RCxtQkFBSytCLE9BQUwsQ0FBYTtBQUNYbEQsMkJBQVcsSUFEQTtBQUVYSSw2QkFBYSxrQkFGRjtBQUdYUCxxQkFBS2hDLE9BSE07QUFJWDhCLHNCQUFNbEMsY0FBY0MsYUFKVDtBQUtYa0Msc0JBQU1wQztBQUxLLGVBQWI7QUFPQSw2QkFBSzJGLG1CQUFMO0FBQ0FoQyxtQkFBS3ZCLElBQUwsR0FBWXBDLGVBQVo7QUFDQTJELG1CQUFLeEIsSUFBTCxHQUFZbEMsY0FBY0MsYUFBMUI7QUFDQXlELG1CQUFLbkIsU0FBTCxHQUFpQixJQUFqQjtBQUNBbUIsbUJBQUtmLFdBQUwsR0FBbUIsa0JBQW5CO0FBQ0FlLG1CQUFLdEIsR0FBTCxHQUFXaEMsT0FBWDtBQUNBdUYsNEJBQWNuRSxNQUFkO0FBQ0Q7QUFDRixXQTlCTyxFQThCTCxJQTlCSyxDQUFSO0FBK0JBa0MsZUFBS3RCLEdBQUwsR0FBVy9CLE9BQVg7QUFDRCxTQWpDRCxNQWlDTztBQUNMNEUsa0JBQVFDLEdBQVIsQ0FBWXhCLEtBQUt4QixJQUFqQjtBQUNBLHlCQUFLMEQsb0JBQUw7QUFDQWxDLGVBQUtGLE9BQUwsQ0FBYTRCLE9BQWIsQ0FBcUIxQixJQUFyQixFQUEyQkEsS0FBS3hCLElBQWhDO0FBQ0F5RCx3QkFBY25FLE1BQWQ7QUFDQWtDLGVBQUt0QixHQUFMLEdBQVc5QixVQUFYO0FBQ0FvRCxlQUFLZixXQUFMLEdBQW1CLHNCQUFuQjtBQUNEO0FBQ0YsT0FyRk87O0FBc0ZSO0FBQ0F5QyxhQXZGUSxtQkF1RkExQixJQXZGQSxFQXVGTXhCLElBdkZOLEVBdUZZO0FBQ2xCLFlBQUkyRCxjQUFjbkMsS0FBS0YsT0FBTCxDQUFhcUMsV0FBYixDQUF5Qm5DLEtBQUt4QixJQUE5QixDQUFsQjtBQUNBd0IsYUFBSytCLE9BQUwsQ0FBYTtBQUNYdEQsZ0JBQU0wRDtBQURLLFNBQWI7QUFHQW5DLGFBQUt2QixJQUFMLEdBQVkwRCxXQUFaO0FBQ0QsT0E3Rk87QUE4RlJDLGNBOUZRLHNCQThGRztBQUNULFlBQUlwQyxPQUFPLElBQVg7QUFDQWlDLHNCQUFjbkUsTUFBZDtBQUNBLHVCQUFLa0UsbUJBQUw7QUFDQWhDLGFBQUt0QixHQUFMLEdBQVdoQyxPQUFYO0FBQ0FzRCxhQUFLeEIsSUFBTCxHQUFZbEMsY0FBY0MsYUFBMUI7QUFDQXlELGFBQUt2QixJQUFMLEdBQVlwQyxlQUFaO0FBQ0EyRCxhQUFLbkIsU0FBTCxHQUFpQixJQUFqQjtBQUNBbUIsYUFBS2YsV0FBTCxHQUFtQixrQkFBbkI7QUFDQWUsYUFBS1QsV0FBTCxHQUFtQixTQUFuQjtBQUNELE9BeEdPOztBQXlHUjtBQUNBNEMsaUJBMUdRLHVCQTBHSTNELElBMUdKLEVBMEdVO0FBQ2hCLFlBQUlBLE9BQU8sQ0FBWCxFQUFjO0FBQ1osaUJBQU9YLElBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxjQUFJdUQsTUFBTSxDQUFDNUMsT0FBUUEsT0FBT2pDLGFBQWhCLElBQWtDQSxhQUE1QztBQUNBLGNBQUk4RixNQUFNN0QsT0FBT2pDLGFBQWpCO0FBQ0EsY0FBSTZFLE1BQU01RSxXQUFWLEVBQXVCO0FBQ3JCLG1CQUFPcUIsSUFBUDtBQUNELFdBRkQsTUFFTztBQUNMLGdCQUFJdUQsTUFBTSxFQUFWLEVBQWM7QUFDWkEsb0JBQU0sTUFBTUEsR0FBWjtBQUNEO0FBQ0QsZ0JBQUlpQixNQUFNLEVBQVYsRUFBYztBQUNaQSxvQkFBTSxNQUFNQSxHQUFaO0FBQ0Q7QUFDRCxtQkFBT2pCLE1BQU0sS0FBTixHQUFjaUIsR0FBckI7QUFDRDtBQUNGO0FBQ0YsT0E1SE87QUE2SFJDLGdCQTdIUSxzQkE2SEdDLENBN0hILEVBNkhNO0FBQ1osWUFBSXZDLE9BQU8sSUFBWDtBQUNBQSxhQUFLZCxTQUFMLEdBQWlCLENBQUNxRCxFQUFFbkQsT0FBRixDQUFVLENBQVYsRUFBYW9ELEtBQWQsRUFBcUJELEVBQUVuRCxPQUFGLENBQVUsQ0FBVixFQUFhcUQsS0FBbEMsQ0FBakI7QUFDRCxPQWhJTztBQWlJUjVELGVBaklRLHFCQWlJRTBELENBaklGLEVBaUlLO0FBQ1gsWUFBSXZDLE9BQU8sSUFBWDtBQUNBQSxhQUFLYixRQUFMLEdBQWdCLENBQUNvRCxFQUFFbkQsT0FBRixDQUFVLENBQVYsRUFBYW9ELEtBQWQsRUFBcUJELEVBQUVuRCxPQUFGLENBQVUsQ0FBVixFQUFhcUQsS0FBbEMsQ0FBaEI7QUFDQXpDLGFBQUtsQixXQUFMO0FBQ0EsWUFBSWtCLEtBQUtuQixTQUFULEVBQW9CO0FBQ2xCbUIsZUFBS0YsT0FBTCxDQUFhNEMsVUFBYixDQUF3QjFDLElBQXhCO0FBQ0Q7QUFDRixPQXhJTztBQXlJUjJDLGNBeklRLG9CQXlJQ0osQ0F6SUQsRUF5SUk7QUFDVixZQUFJdkMsT0FBTyxJQUFYO0FBQ0EsWUFBSUEsS0FBS25CLFNBQVQsRUFBb0I7QUFDbEJtQixlQUFLRixPQUFMLENBQWE4QyxXQUFiLENBQXlCNUMsSUFBekI7QUFDRDtBQUNGLE9BOUlPOztBQStJUjtBQUNBMEMsZ0JBaEpRLHNCQWdKRzFDLElBaEpILEVBZ0pTO0FBQ2YsWUFBSTZDLFVBQVU3QyxLQUFLYixRQUFMLENBQWN0QyxJQUFkLElBQXNCbUQsS0FBS2QsU0FBTCxDQUFlckMsSUFBZixDQUFwQztBQUNBLFlBQUlpRyxVQUFVOUMsS0FBS2IsUUFBTCxDQUFjckMsSUFBZCxJQUFzQmtELEtBQUtkLFNBQUwsQ0FBZXBDLElBQWYsQ0FBcEM7QUFDQSxZQUFJaUcsS0FBS0MsR0FBTCxDQUFTSCxPQUFULElBQW9CRSxLQUFLQyxHQUFMLENBQVNGLE9BQVQsQ0FBeEIsRUFBMkM7QUFDekMsY0FBSTlDLEtBQUtsQixXQUFMLEdBQW1CL0IsZUFBdkIsRUFBd0M7QUFDdEMsZ0JBQUlpRCxLQUFLYixRQUFMLENBQWNyQyxJQUFkLElBQXNCa0QsS0FBS2QsU0FBTCxDQUFlcEMsSUFBZixDQUF0QixJQUE4Q2tELEtBQUt4QixJQUFMLEdBQVksQ0FBOUQsRUFBaUU7QUFDL0R3QixtQkFBS3hCLElBQUwsR0FBWXdCLEtBQUt4QixJQUFMLEdBQVlqQyxhQUF4QjtBQUNBeUQsbUJBQUtGLE9BQUwsQ0FBYTRCLE9BQWIsQ0FBcUIxQixJQUFyQixFQUEyQkEsS0FBS3hCLElBQWhDO0FBQ0F3QixtQkFBS2xCLFdBQUwsR0FBbUIsQ0FBbkI7QUFDRDtBQUNELGdCQUFJa0IsS0FBS2IsUUFBTCxDQUFjckMsSUFBZCxJQUFzQmtELEtBQUtkLFNBQUwsQ0FBZXBDLElBQWYsQ0FBMUIsRUFBZ0Q7QUFDOUNrRCxtQkFBS3hCLElBQUwsR0FBWXdCLEtBQUt4QixJQUFMLEdBQVlqQyxhQUF4QjtBQUNBeUQsbUJBQUtGLE9BQUwsQ0FBYTRCLE9BQWIsQ0FBcUIxQixJQUFyQixFQUEyQkEsS0FBS3hCLElBQWhDO0FBQ0F3QixtQkFBS2xCLFdBQUwsR0FBbUIsQ0FBbkI7QUFDRDtBQUNGO0FBQ0Y7QUFDRixPQWpLTzs7QUFrS1I7QUFDQThELGlCQW5LUSx1QkFtS0k1QyxJQW5LSixFQW1LVTtBQUNoQixZQUFJNkMsVUFBVTdDLEtBQUtiLFFBQUwsQ0FBY3RDLElBQWQsSUFBc0JtRCxLQUFLZCxTQUFMLENBQWVyQyxJQUFmLENBQXBDO0FBQ0EsWUFBSWlHLFVBQVU5QyxLQUFLYixRQUFMLENBQWNyQyxJQUFkLElBQXNCa0QsS0FBS2QsU0FBTCxDQUFlcEMsSUFBZixDQUFwQztBQUNBLFlBQUlpRyxLQUFLQyxHQUFMLENBQVNILE9BQVQsSUFBb0JFLEtBQUtDLEdBQUwsQ0FBU0YsT0FBVCxDQUF4QixFQUEyQztBQUN6QyxjQUFJOUMsS0FBS2xCLFdBQUwsR0FBbUI5QixnQkFBdkIsRUFBeUM7QUFDdkMsZ0JBQUlnRCxLQUFLYixRQUFMLENBQWN0QyxJQUFkLElBQXNCbUQsS0FBS2QsU0FBTCxDQUFlckMsSUFBZixDQUExQixFQUFnRDtBQUM5QyxzQkFBUW1ELEtBQUtqQixTQUFiO0FBQ0UscUJBQUs5QixJQUFMO0FBQ0U7QUFDRixxQkFBS0MsSUFBTDtBQUNFOEMsdUJBQUtWLElBQUwsR0FBWSxJQUFaO0FBQ0FVLHVCQUFLakIsU0FBTCxHQUFpQjlCLElBQWpCO0FBQ0ErQyx1QkFBS2hCLE9BQUwsR0FBZSwwQkFBZjtBQUNBZ0IsdUJBQUtYLEtBQUwsR0FBYS9CLFNBQWI7QUFDQTBDLHVCQUFLUixTQUFMLEdBQWlCN0IsV0FBakI7QUFDQXFDLHVCQUFLUCxTQUFMLEdBQWlCN0IsWUFBakI7QUFDQTtBQUNGLHFCQUFLVCxLQUFMO0FBQ0U2Qyx1QkFBS1YsSUFBTCxHQUFZLElBQVo7QUFDQVUsdUJBQUtqQixTQUFMLEdBQWlCN0IsSUFBakI7QUFDQThDLHVCQUFLaEIsT0FBTCxHQUFlLHdCQUFmO0FBQ0FnQix1QkFBS1gsS0FBTCxHQUFhOUIsU0FBYjtBQUNBeUMsdUJBQUtQLFNBQUwsR0FBaUI5QixXQUFqQjtBQUNBcUMsdUJBQUtOLFVBQUwsR0FBa0I5QixZQUFsQjtBQUNBO0FBQ0YscUJBQUtSLElBQUw7QUFDRTRDLHVCQUFLVixJQUFMLEdBQVksSUFBWjtBQUNBVSx1QkFBS2pCLFNBQUwsR0FBaUI1QixLQUFqQjtBQUNBNkMsdUJBQUtoQixPQUFMLEdBQWUseUJBQWY7QUFDQWdCLHVCQUFLWCxLQUFMLEdBQWE3QixVQUFiO0FBQ0F3Qyx1QkFBS04sVUFBTCxHQUFrQi9CLFdBQWxCO0FBQ0FxQyx1QkFBS0wsU0FBTCxHQUFpQi9CLFlBQWpCO0FBQ0E7QUFDRixxQkFBS1AsSUFBTDtBQUNFMkMsdUJBQUtWLElBQUwsR0FBWSxJQUFaO0FBQ0FVLHVCQUFLakIsU0FBTCxHQUFpQjNCLElBQWpCO0FBQ0E0Qyx1QkFBS2hCLE9BQUwsR0FBZSx3QkFBZjtBQUNBZ0IsdUJBQUtYLEtBQUwsR0FBYTVCLFNBQWI7QUFDQXVDLHVCQUFLTCxTQUFMLEdBQWlCaEMsV0FBakI7QUFDQXFDLHVCQUFLSixTQUFMLEdBQWlCaEMsWUFBakI7QUFDQTtBQWxDSjtBQW9DQW9DLG1CQUFLbEIsV0FBTCxHQUFtQixDQUFuQjtBQUNELGFBdENELE1Bc0NPLElBQUlrQixLQUFLYixRQUFMLENBQWN0QyxJQUFkLElBQXNCbUQsS0FBS2QsU0FBTCxDQUFlckMsSUFBZixDQUExQixFQUFnRDtBQUNyRCxzQkFBUW1ELEtBQUtqQixTQUFiO0FBQ0UscUJBQUs5QixJQUFMO0FBQ0UrQyx1QkFBS1YsSUFBTCxHQUFZLElBQVo7QUFDQVUsdUJBQUtqQixTQUFMLEdBQWlCN0IsSUFBakI7QUFDQThDLHVCQUFLaEIsT0FBTCxHQUFlLHdCQUFmO0FBQ0FnQix1QkFBS1gsS0FBTCxHQUFhOUIsU0FBYjtBQUNBeUMsdUJBQUtQLFNBQUwsR0FBaUI5QixXQUFqQjtBQUNBcUMsdUJBQUtSLFNBQUwsR0FBaUI1QixZQUFqQjtBQUNBO0FBQ0YscUJBQUtWLElBQUw7QUFDRThDLHVCQUFLVixJQUFMLEdBQVksSUFBWjtBQUNBVSx1QkFBS2pCLFNBQUwsR0FBaUI1QixLQUFqQjtBQUNBNkMsdUJBQUtoQixPQUFMLEdBQWUseUJBQWY7QUFDQWdCLHVCQUFLWCxLQUFMLEdBQWE3QixVQUFiO0FBQ0F3Qyx1QkFBS04sVUFBTCxHQUFrQi9CLFdBQWxCO0FBQ0FxQyx1QkFBS1AsU0FBTCxHQUFpQjdCLFlBQWpCO0FBQ0E7QUFDRixxQkFBS1QsS0FBTDtBQUNFNkMsdUJBQUtWLElBQUwsR0FBWSxJQUFaO0FBQ0FVLHVCQUFLakIsU0FBTCxHQUFpQjNCLElBQWpCO0FBQ0E0Qyx1QkFBS2hCLE9BQUwsR0FBZSx3QkFBZjtBQUNBZ0IsdUJBQUtYLEtBQUwsR0FBYTVCLFNBQWI7QUFDQXVDLHVCQUFLTCxTQUFMLEdBQWlCaEMsV0FBakI7QUFDQXFDLHVCQUFLTixVQUFMLEdBQWtCOUIsWUFBbEI7QUFDQTtBQUNGLHFCQUFLUixJQUFMO0FBQ0U0Qyx1QkFBS1YsSUFBTCxHQUFZLElBQVo7QUFDQVUsdUJBQUtqQixTQUFMLEdBQWlCMUIsSUFBakI7QUFDQTJDLHVCQUFLaEIsT0FBTCxHQUFlLDBCQUFmO0FBQ0FnQix1QkFBS1gsS0FBTCxHQUFhM0IsU0FBYjtBQUNBc0MsdUJBQUtKLFNBQUwsR0FBaUJqQyxXQUFqQjtBQUNBcUMsdUJBQUtMLFNBQUwsR0FBaUIvQixZQUFqQjtBQUNBO0FBQ0YscUJBQUtQLElBQUw7QUFDRTtBQWxDSjtBQW9DQTJDLG1CQUFLbEIsV0FBTCxHQUFtQixDQUFuQjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLE9BdlBPO0FBd1BSd0MsZUF4UFEscUJBd1BFdEIsSUF4UEYsRUF3UFE7QUFDZCx1QkFBS2lELG1CQUFMLENBQXlCO0FBQ3ZCQyxtQkFBU2xELEtBQUtYO0FBRFMsU0FBekI7QUFHRCxPQTVQTztBQTZQUmdDLHVCQTdQUSw2QkE2UFVyQixJQTdQVixFQTZQZ0I7QUFDdEIsZ0JBQVFBLEtBQUtqQixTQUFiO0FBQ0UsZUFBSzlCLElBQUw7QUFDRStDLGlCQUFLZixXQUFMLEdBQW1CLHlCQUFuQjtBQUNBZSxpQkFBS1QsV0FBTCxHQUFtQix1QkFBbkI7QUFDQTtBQUNGLGVBQUtyQyxJQUFMO0FBQ0U4QyxpQkFBS2YsV0FBTCxHQUFtQix1QkFBbkI7QUFDQWUsaUJBQUtULFdBQUwsR0FBbUIscUJBQW5CO0FBQ0E7QUFDRixlQUFLcEMsS0FBTDtBQUNFNkMsaUJBQUtmLFdBQUwsR0FBbUIsd0JBQW5CO0FBQ0FlLGlCQUFLVCxXQUFMLEdBQW1CLHNCQUFuQjtBQUNBO0FBQ0YsZUFBS25DLElBQUw7QUFDRTRDLGlCQUFLZixXQUFMLEdBQW1CLHVCQUFuQjtBQUNBZSxpQkFBS1QsV0FBTCxHQUFtQixxQkFBbkI7QUFDQTtBQUNGLGVBQUtsQyxJQUFMO0FBQ0UyQyxpQkFBS2YsV0FBTCxHQUFtQix5QkFBbkI7QUFDQWUsaUJBQUtULFdBQUwsR0FBbUIsdUJBQW5CO0FBQ0E7QUFwQko7QUFzQkQ7QUFwUk8sSzs7Ozs7d0NBc1JVO0FBQ2xCLGFBQU87QUFDTDRELGVBQU8sSUFERjtBQUVMQyxjQUFNLFdBRkQ7QUFHTEMsY0FBTTtBQUhELE9BQVA7QUFLRDs7OzZCQUNRO0FBQ1AsVUFBSXJELE9BQU8sSUFBWDtBQUNBQSxXQUFLRixPQUFMLENBQWFDLElBQWIsQ0FBa0JDLElBQWxCO0FBQ0E7QUFDQXNELGlCQUFXLFlBQU07QUFDZnRELGFBQUt6QixRQUFMLEdBQWdCLEtBQWhCO0FBQ0F5QixhQUFLK0IsT0FBTCxDQUFhO0FBQ1h4RCxvQkFBVTtBQURDLFNBQWI7QUFHRCxPQUxELEVBS0csSUFMSDtBQU1BeUIsV0FBS3ZCLElBQUwsR0FBWXBDLGVBQVo7QUFDQTJELFdBQUt4QixJQUFMLEdBQVlsQyxjQUFjQyxhQUExQjtBQUNEOzs7O0VBMVVnQyxlQUFLZ0gsSTs7a0JBQW5CeEYsSyIsImZpbGUiOiJuZXdub2lzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuY29uc3QgY2FsZW5kYXIgPSByZXF1aXJlKCcuLi9wYWdlcy9jYWxlbmRhci5qcycpXG5jb25zdCBpbml0aWFsVGltZVRleHQgPSAnMjAgOiAwMCdcbmNvbnN0IGluaXRpYWxUaW1lID0gMjBcbmNvbnN0IHNlY29uZHNQZXJNaW4gPSA2MFxuY29uc3QgdGltZVVwbGltaXQgPSA2MFxuY29uc3QgdGltZUxvd2xpbWl0ID0gMFxuY29uc3Qga3NTdGFydCA9IDBcbmNvbnN0IGtzUGF1c2UgPSAxXG5jb25zdCBrc0NvbnRpbnVlID0gMlxuY29uc3QgeFBvcyA9IDBcbmNvbnN0IHlQb3MgPSAxXG5jb25zdCBjaGFuZ2VUaW1lUG9pbnQgPSAxXG5jb25zdCBjaGFuZ2VJbWFnZVBvaW50ID0gNVxuY29uc3QgR09MRCA9ICdnb2xkJ1xuY29uc3QgVFJFRSA9ICd0cmVlJ1xuY29uc3QgV0FURVIgPSAnd2F0ZXInXG5jb25zdCBGSVJFID0gJ2ZpcmUnXG5jb25zdCBTT0lMID0gJ3NvaWwnXG5jb25zdCBub2lzZUdvbGQgPSAnaHR0cDovL2xvY2FsaG9zdDo1MDAwLyVFOSU5MiU5Ri5tcDMnXG5jb25zdCBub2lzZVRyZWUgPSAnaHR0cDovL2xvY2FsaG9zdDo1MDAwLyVFNiVBMyVBRS5tcDMnXG5jb25zdCBub2lzZVdhdGVyID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTklOUIlQTgubXAzJ1xuY29uc3Qgbm9pc2VGaXJlID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTclODElQUIubXAzJ1xuY29uc3Qgbm9pc2VTb2lsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTYlQkQlQUUubXAzJ1xuY29uc3QgdHJ1ZU9wYWNpdHkgPSAxXG5jb25zdCBmYWxzZU9wYWNpdHkgPSAwLjNcbmNvbnN0IGxvb3AgPSAn4oieJ1xuXG5sZXQgdGltZXJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W9kuW/gydcbiAgfVxuICBkYXRhID0ge1xuICAgIG1hcms6ICcuLi9pbWFnZS93YXRlci5wbmcnLFxuICAgIGRhdGVzOiAnJyxcbiAgICBsdW5hcjogJycsXG4gICAgbHVuYXJEYXk6ICcnLFxuICAgIHNob3dJbWdlOiB0cnVlLFxuICAgIHRpY2s6IDAsXG4gICAgdGltZTogJycsXG4gICAga2V5OiBrc1N0YXJ0LFxuICAgIGtTdGF0dXM6IFsn5byA5aeLJywgJ+aaguWBnCcsICfnu6fnu60nXSxcbiAgICBlbmRLZXk6ICfnu5PmnZ8nLFxuICAgIHRvdWNobW92ZTogdHJ1ZSxcbiAgICBjaGFuZ2VQb2ludDogMCxcbiAgICBpbWFnZU5vZGU6IFdBVEVSLFxuICAgIGJnY29sb3I6ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjEyKScsXG4gICAgY2lyY2xlY29sb3I6ICdyZ2JhKDAsIDAsIDAsIDApJyxcbiAgICBzdGFyUG9pbnQ6IFswLCAwXSxcbiAgICBjdXJQb2ludDogWzAsIDBdLFxuICAgIHRvdWNoZXM6IFswLCAwXSxcbiAgICBub2lzZTogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC/pm6gubXAzJyxcbiAgICB0ZXh0OiAn6Zuo5rC0JyxcbiAgICBzaGFkb3djb2xvcjogJyMzMzMzMzMnLFxuICAgIGdvbGRQb2ludDogZmFsc2VPcGFjaXR5LFxuICAgIHRyZWVQb2ludDogZmFsc2VPcGFjaXR5LFxuICAgIHdhdGVyUG9pbnQ6IHRydWVPcGFjaXR5LFxuICAgIGZpcmVQb2ludDogZmFsc2VPcGFjaXR5LFxuICAgIHNvaWxQb2ludDogZmFsc2VPcGFjaXR5LFxuICAgIGxvb3BzOiBsb29wXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBkYXRlKHNlbGYpIHtcbiAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgY29uc3Qgd2Vla3MgPSBbJ1N1bicsICdNb24nLCAnVHVlcycsICdXZWQnLCAnVGh1cicsICdGcmknLCAnU2F0J11cbiAgICAgIGNvbnN0IHdlZWsgPSBkYXRlLmdldFVUQ0RheSgpXG4gICAgICBjb25zdCB3ZWVrZCA9IHdlZWtzW3dlZWtdXG4gICAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICAgICAgY29uc3QgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWcnLCAnU2VwdCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgICBjb25zdCBtb24gPSBtb250aHNbbW9udGhdXG4gICAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICAgICAgc2VsZi5kYXRlcyA9IG1vbiArICcgJyArIGRheSArICcgJyArIHdlZWtkICsgJyAnICsgeWVhclxuICAgICAgbGV0IGx1bmFyZGF0ZSA9IGNhbGVuZGFyLnNvbGFyMmx1bmFyKHllYXIsIG1vbnRoICsgMSwgZGF5KVxuICAgICAgY29uc3QgbHVuYXJNb250aHMgPSBbJ+ato+aciCcsICfotLDmnIgnLCAn5Y+B5pyIJywgJ+iChuaciCcsICfkvI3mnIgnLCAn6ZmG5pyIJywgJ+S4g+aciCcsICfmjYzmnIgnLCAn546W5pyIJywgJ+aLvuaciCcsICfmi77lo7nmnIgnLCAn6IWK5pyIJ11cbiAgICAgIGNvbnN0IGx1bmFyRGF5cyA9IFsn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nLCAn5LiDJywgJ+WFqycsICfkuZ0nLCAn5Y2BJ11cbiAgICAgIGlmIChsdW5hcmRhdGUubERheSA8PSAxMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+WInScgKyBsdW5hckRheXNbbHVuYXJkYXRlLmxEYXkgLSAxXVxuICAgICAgfSBlbHNlIGlmIChsdW5hcmRhdGUubERheSA+IDEwICYmIGx1bmFyZGF0ZS5sRGF5IDwgMjApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICfljYEnICsgbHVuYXJEYXlzW2x1bmFyZGF0ZS5sRGF5IC0gMTFdXG4gICAgICB9IGVsc2UgaWYgKGx1bmFyZGF0ZS5sRGF5ID4gMjAgJiYgbHVuYXJkYXRlLmxEYXkgPCAzMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+W7vycgKyBsdW5hckRheXNbbHVuYXJkYXRlLmxEYXkgLSAyMV1cbiAgICAgIH0gZWxzZSBpZiAobHVuYXJkYXRlLmxEYXkgPT09IDIwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5LqM5Y2BJ1xuICAgICAgfSBlbHNlIGlmIChsdW5hcmRhdGUubERheSA9PT0gMzApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICfkuInljYEnXG4gICAgICB9XG4gICAgICBzZWxmLmx1bmFyID0gJ+WGnOWOhicgKyBsdW5hck1vbnRoc1tsdW5hcmRhdGUubE1vbnRoIC0gMV0gKyBzZWxmLmx1bmFyRGF5XG4gICAgfSxcbiAgICAvLyDliKTmlq3mmK/lkKblvIDlkK/orqHml7blmahcbiAgICB0aW1lKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBsZXQgbWluID0gKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluXG4gICAgICBzZWxmLm1ldGhvZHMuY2lyY2xlQ29sb3JDaGFuZ2Uoc2VsZilcbiAgICAgIHNlbGYubWV0aG9kcy5wbGF5bm9pc2Uoc2VsZilcbiAgICAgIGlmIChtaW4gPiB0aW1lTG93bGltaXQgJiYgbWluIDw9IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lcihzZWxmLCBmYWxzZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lcihzZWxmLCB0cnVlKVxuICAgICAgICBjb25zb2xlLmxvZygnJSUlJSUlJylcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOiuoeaXtuWZqFxuICAgIHRpbWVyKHNlbGYsIGxvb3BzKSB7XG4gICAgICBzZWxmLnRvdWNobW92ZSA9IGZhbHNlXG4gICAgICBpZiAoc2VsZi5rZXkgPT09IGtzU3RhcnQgfHwgc2VsZi5rZXkgPT09IGtzQ29udGludWUpIHtcbiAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAobG9vcHMpIHtcbiAgICAgICAgICAgIHNlbGYudGljayA9IC0xXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYudGljay0tXG4gICAgICAgICAgfVxuICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICB3ZXB5LmdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLnN0YXR1cyAhPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlbGYubWV0aG9kcy5wbGF5bm9pc2Uoc2VsZilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKHNlbGYudGljayA9PT0gdGltZUxvd2xpbWl0KSB7XG4gICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgICB0b3VjaG1vdmU6IHRydWUsXG4gICAgICAgICAgICAgIGNpcmNsZWNvbG9yOiAncmdiYSgwLCAwLCAwLCAwKScsXG4gICAgICAgICAgICAgIGtleToga3NTdGFydCxcbiAgICAgICAgICAgICAgdGljazogaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluLFxuICAgICAgICAgICAgICB0aW1lOiBpbml0aWFsVGltZVRleHRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB3ZXB5LnN0b3BCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgICAgICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYudG91Y2htb3ZlID0gdHJ1ZVxuICAgICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDApJ1xuICAgICAgICAgICAgc2VsZi5rZXkgPSBrc1N0YXJ0XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMClcbiAgICAgICAgc2VsZi5rZXkgPSBrc1BhdXNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnRpY2spXG4gICAgICAgIHdlcHkucGF1c2VCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICAgIHNlbGYua2V5ID0ga3NDb250aW51ZVxuICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMjU1LCAyNTUsIDAsIDApJ1xuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5Yi35paw5pe26Ze0XG4gICAgc2V0VGltZShzZWxmLCB0aWNrKSB7XG4gICAgICBsZXQgY3VycmVudFRpbWUgPSBzZWxmLm1ldGhvZHMuY3VycmVudFRpbWUoc2VsZi50aWNrKVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgIH0pXG4gICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgIH0sXG4gICAgdGltZXJFbmQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICB3ZXB5LnN0b3BCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgc2VsZi5rZXkgPSBrc1N0YXJ0XG4gICAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgICAgc2VsZi50b3VjaG1vdmUgPSB0cnVlXG4gICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMCknXG4gICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJyMzMzMzMzMnXG4gICAgfSxcbiAgICAvLyDorqHnrpfml7bpl7Tlj4rovpPlh7rmoLzlvI9cbiAgICBjdXJyZW50VGltZSh0aWNrKSB7XG4gICAgICBpZiAodGljayA8IDApIHtcbiAgICAgICAgcmV0dXJuIGxvb3BcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBtaW4gPSAodGljayAtICh0aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pblxuICAgICAgICBsZXQgc2VjID0gdGljayAlIHNlY29uZHNQZXJNaW5cbiAgICAgICAgaWYgKG1pbiA+IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgICAgcmV0dXJuIGxvb3BcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAobWluIDwgMTApIHtcbiAgICAgICAgICAgIG1pbiA9ICcwJyArIG1pblxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VjIDwgMTApIHtcbiAgICAgICAgICAgIHNlYyA9ICcwJyArIHNlY1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWluICsgJyA6ICcgKyBzZWNcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICAgIHNlbGYuY2hhbmdlUG9pbnQrK1xuICAgICAgaWYgKHNlbGYudG91Y2htb3ZlKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lQ2hhbmdlKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICB0b3VjaGVuZChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGlmIChzZWxmLnRvdWNobW92ZSkge1xuICAgICAgICBzZWxmLm1ldGhvZHMuaW1hZ2VDaGFuZ2Uoc2VsZilcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOS4iuS4i+a7keWKqOiwg+iKguaXtumXtFxuICAgIHRpbWVDaGFuZ2Uoc2VsZikge1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50W3hQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeFBvc11cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt5UG9zXSAtIHNlbGYuc3RhclBvaW50W3lQb3NdXG4gICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPCBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA+IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3lQb3NdID4gc2VsZi5zdGFyUG9pbnRbeVBvc10gJiYgc2VsZi50aWNrID4gMCkge1xuICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrIC0gc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeVBvc10gPCBzZWxmLnN0YXJQb2ludFt5UG9zXSkge1xuICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrICsgc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOW3puWPs+a7keWKqOiwg+iKguWbvueJh1xuICAgIGltYWdlQ2hhbmdlKHNlbGYpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt4UG9zXSAtIHNlbGYuc3RhclBvaW50W3hQb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeVBvc10gLSBzZWxmLnN0YXJQb2ludFt5UG9zXVxuICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID4gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VJbWFnZVBvaW50KSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeFBvc10gPiBzZWxmLnN0YXJQb2ludFt4UG9zXSkge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlIEdPTEQ6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBUUkVFOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICflr7rpkp8nXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBHT0xEXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VHb2xkXG4gICAgICAgICAgICAgICAgc2VsZi5nb2xkUG9pbnQgPSB0cnVlT3BhY2l0eVxuICAgICAgICAgICAgICAgIHNlbGYudHJlZVBvaW50ID0gZmFsc2VPcGFjaXR5XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBXQVRFUjpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn5qOu5p6XJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gVFJFRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZVRyZWVcbiAgICAgICAgICAgICAgICBzZWxmLnRyZWVQb2ludCA9IHRydWVPcGFjaXR5XG4gICAgICAgICAgICAgICAgc2VsZi53YXRlclBvaW50ID0gZmFsc2VPcGFjaXR5XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBGSVJFOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfpm6jmsLQnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBXQVRFUlxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VXYXRlclxuICAgICAgICAgICAgICAgIHNlbGYud2F0ZXJQb2ludCA9IHRydWVPcGFjaXR5XG4gICAgICAgICAgICAgICAgc2VsZi5maXJlUG9pbnQgPSBmYWxzZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFNPSUw6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+evneeBqydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IEZJUkVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VGaXJlXG4gICAgICAgICAgICAgICAgc2VsZi5maXJlUG9pbnQgPSB0cnVlT3BhY2l0eVxuICAgICAgICAgICAgICAgIHNlbGYuc29pbFBvaW50ID0gZmFsc2VPcGFjaXR5XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfSBlbHNlIGlmIChzZWxmLmN1clBvaW50W3hQb3NdIDwgc2VsZi5zdGFyUG9pbnRbeFBvc10pIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBHT0xEOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfmo67mnpcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBUUkVFXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlVHJlZVxuICAgICAgICAgICAgICAgIHNlbGYudHJlZVBvaW50ID0gdHJ1ZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBzZWxmLmdvbGRQb2ludCA9IGZhbHNlT3BhY2l0eVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgVFJFRTpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn6Zuo5rC0J1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gV0FURVJcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlV2F0ZXJcbiAgICAgICAgICAgICAgICBzZWxmLndhdGVyUG9pbnQgPSB0cnVlT3BhY2l0eVxuICAgICAgICAgICAgICAgIHNlbGYudHJlZVBvaW50ID0gZmFsc2VPcGFjaXR5XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBXQVRFUjpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn56+d54GrJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gRklSRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZUZpcmVcbiAgICAgICAgICAgICAgICBzZWxmLmZpcmVQb2ludCA9IHRydWVPcGFjaXR5XG4gICAgICAgICAgICAgICAgc2VsZi53YXRlclBvaW50ID0gZmFsc2VPcGFjaXR5XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBGSVJFOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfmtarmva4nXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBTT0lMXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDIzOCwgOTksIDk5LCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VTb2lsXG4gICAgICAgICAgICAgICAgc2VsZi5zb2lsUG9pbnQgPSB0cnVlT3BhY2l0eVxuICAgICAgICAgICAgICAgIHNlbGYuZmlyZVBvaW50ID0gZmFsc2VPcGFjaXR5XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBTT0lMOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcGxheW5vaXNlKHNlbGYpIHtcbiAgICAgIHdlcHkucGxheUJhY2tncm91bmRBdWRpbyh7XG4gICAgICAgIGRhdGFVcmw6IHNlbGYubm9pc2VcbiAgICAgIH0pXG4gICAgfSxcbiAgICBjaXJjbGVDb2xvckNoYW5nZShzZWxmKSB7XG4gICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgIGNhc2UgR09MRDpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAwLjEpJ1xuICAgICAgICAgIHNlbGYuc2hhZG93Y29sb3IgPSAncmdiYSggMjU1LCAyNTUsIDAsIDEpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgVFJFRTpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4xKSdcbiAgICAgICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMSknXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBXQVRFUjpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMSknXG4gICAgICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAxKSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIEZJUkU6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMSknXG4gICAgICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDEpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgU09JTDpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDIzOCwgOTksIDk5LCAwLjEpJ1xuICAgICAgICAgIHNlbGYuc2hhZG93Y29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDEpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+W9kuW/gycsXG4gICAgICBkZXNjOiAn6YO95biC5Zan6Ze5IOS9leWkhOW9kuW/gycsXG4gICAgICBwYXRoOiAnL3BhZ2Uvbm9pc2UnXG4gICAgfVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBzZWxmLm1ldGhvZHMuZGF0ZShzZWxmKVxuICAgIC8vIHNlbGYuY2FsZW5kYXIuc29sYXIybHVuYXIoKVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2VsZi5zaG93SW1nZSA9IGZhbHNlXG4gICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICBzaG93SW1nZTogZmFsc2VcbiAgICAgIH0pXG4gICAgfSwgMjAwMClcbiAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgfVxufVxuIl19