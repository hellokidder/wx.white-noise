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
      noise: 'http://www.smartestee.com/noise/water.mp3',
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
        }
      },

      // 计时器
      timer: function timer(self, loops) {
        self.touchmove = false;
        if (self.key === ksStart || self.key === ksContinue) {
          _timer = setInterval(function () {
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
              clearInterval(_timer);
            }
          }, 1000);
          self.key = ksPause;
        } else {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld25vaXNlLmpzIl0sIm5hbWVzIjpbImNhbGVuZGFyIiwicmVxdWlyZSIsImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxUaW1lIiwic2Vjb25kc1Blck1pbiIsInRpbWVVcGxpbWl0IiwidGltZUxvd2xpbWl0Iiwia3NTdGFydCIsImtzUGF1c2UiLCJrc0NvbnRpbnVlIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwiR09MRCIsIlRSRUUiLCJXQVRFUiIsIkZJUkUiLCJTT0lMIiwibm9pc2VHb2xkIiwibm9pc2VUcmVlIiwibm9pc2VXYXRlciIsIm5vaXNlRmlyZSIsIm5vaXNlU29pbCIsInRydWVPcGFjaXR5IiwiZmFsc2VPcGFjaXR5IiwibG9vcCIsInRpbWVyIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1hcmsiLCJkYXRlcyIsImx1bmFyIiwibHVuYXJEYXkiLCJzaG93SW1nZSIsInRpY2siLCJ0aW1lIiwia2V5Iiwia1N0YXR1cyIsImVuZEtleSIsInRvdWNobW92ZSIsImNoYW5nZVBvaW50IiwiaW1hZ2VOb2RlIiwiYmdjb2xvciIsImNpcmNsZWNvbG9yIiwic3RhclBvaW50IiwiY3VyUG9pbnQiLCJ0b3VjaGVzIiwibm9pc2UiLCJ0ZXh0Iiwic2hhZG93Y29sb3IiLCJnb2xkUG9pbnQiLCJ0cmVlUG9pbnQiLCJ3YXRlclBvaW50IiwiZmlyZVBvaW50Iiwic29pbFBvaW50IiwibG9vcHMiLCJtZXRob2RzIiwiZGF0ZSIsInNlbGYiLCJEYXRlIiwid2Vla3MiLCJ3ZWVrIiwiZ2V0VVRDRGF5Iiwid2Vla2QiLCJtb250aCIsImdldE1vbnRoIiwibW9udGhzIiwibW9uIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsImx1bmFyZGF0ZSIsInNvbGFyMmx1bmFyIiwibHVuYXJNb250aHMiLCJsdW5hckRheXMiLCJsRGF5IiwibE1vbnRoIiwibWluIiwiY2lyY2xlQ29sb3JDaGFuZ2UiLCJwbGF5bm9pc2UiLCJzZXRJbnRlcnZhbCIsInNldFRpbWUiLCJnZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSIsInN1Y2Nlc3MiLCJyZXMiLCJzdGF0dXMiLCJzZXREYXRhIiwic3RvcEJhY2tncm91bmRBdWRpbyIsImNsZWFySW50ZXJ2YWwiLCJwYXVzZUJhY2tncm91bmRBdWRpbyIsImN1cnJlbnRUaW1lIiwidGltZXJFbmQiLCJzZWMiLCJ0b3VjaHN0YXJ0IiwiZSIsInBhZ2VYIiwicGFnZVkiLCJ0aW1lQ2hhbmdlIiwidG91Y2hlbmQiLCJpbWFnZUNoYW5nZSIsInhjaGFuZ2UiLCJ5Y2hhbmdlIiwiTWF0aCIsImFicyIsInBsYXlCYWNrZ3JvdW5kQXVkaW8iLCJkYXRhVXJsIiwidGl0bGUiLCJkZXNjIiwicGF0aCIsInNldFRpbWVvdXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsV0FBV0MsUUFBUSxzQkFBUixDQUFqQjtBQUNBLElBQU1DLGtCQUFrQixTQUF4QjtBQUNBLElBQU1DLGNBQWMsRUFBcEI7QUFDQSxJQUFNQyxnQkFBZ0IsRUFBdEI7QUFDQSxJQUFNQyxjQUFjLEVBQXBCO0FBQ0EsSUFBTUMsZUFBZSxDQUFyQjtBQUNBLElBQU1DLFVBQVUsQ0FBaEI7QUFDQSxJQUFNQyxVQUFVLENBQWhCO0FBQ0EsSUFBTUMsYUFBYSxDQUFuQjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLGtCQUFrQixDQUF4QjtBQUNBLElBQU1DLG1CQUFtQixDQUF6QjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLFFBQVEsT0FBZDtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLFlBQVksMENBQWxCO0FBQ0EsSUFBTUMsWUFBWSwwQ0FBbEI7QUFDQSxJ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ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuY29uc3QgY2FsZW5kYXIgPSByZXF1aXJlKCcuLi9wYWdlcy9jYWxlbmRhci5qcycpXG5jb25zdCBpbml0aWFsVGltZVRleHQgPSAnMjAgOiAwMCdcbmNvbnN0IGluaXRpYWxUaW1lID0gMjBcbmNvbnN0IHNlY29uZHNQZXJNaW4gPSA2MFxuY29uc3QgdGltZVVwbGltaXQgPSA2MFxuY29uc3QgdGltZUxvd2xpbWl0ID0gMFxuY29uc3Qga3NTdGFydCA9IDBcbmNvbnN0IGtzUGF1c2UgPSAxXG5jb25zdCBrc0NvbnRpbnVlID0gMlxuY29uc3QgeFBvcyA9IDBcbmNvbnN0IHlQb3MgPSAxXG5jb25zdCBjaGFuZ2VUaW1lUG9pbnQgPSAxXG5jb25zdCBjaGFuZ2VJbWFnZVBvaW50ID0gNVxuY29uc3QgR09MRCA9ICdnb2xkJ1xuY29uc3QgVFJFRSA9ICd0cmVlJ1xuY29uc3QgV0FURVIgPSAnd2F0ZXInXG5jb25zdCBGSVJFID0gJ2ZpcmUnXG5jb25zdCBTT0lMID0gJ3NvaWwnXG5jb25zdCBub2lzZUdvbGQgPSAnaHR0cDovL3d3dy5zbWFydGVzdGVlLmNvbS9ub2lzZS9nb2xkLm1wMydcbmNvbnN0IG5vaXNlVHJlZSA9ICdodHRwOi8vd3d3LnNtYXJ0ZXN0ZWUuY29tL25vaXNlL3RyZWUubXAzJ1xuY29uc3Qgbm9pc2VXYXRlciA9ICdodHRwOi8vd3d3LnNtYXJ0ZXN0ZWUuY29tL25vaXNlL3dhdGVyLm1wMydcbmNvbnN0IG5vaXNlRmlyZSA9ICdodHRwOi8vd3d3LnNtYXJ0ZXN0ZWUuY29tL25vaXNlL2ZpcmUubXAzJ1xuY29uc3Qgbm9pc2VTb2lsID0gJ2h0dHA6Ly93d3cuc21hcnRlc3RlZS5jb20vbm9pc2Uvc29pbC5tcDMnXG5jb25zdCB0cnVlT3BhY2l0eSA9IDFcbmNvbnN0IGZhbHNlT3BhY2l0eSA9IDAuM1xuY29uc3QgbG9vcCA9ICfiiJ4nXG5cbmxldCB0aW1lclxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5b2S5b+DJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbWFyazogJy4uL2ltYWdlL3dhdGVyLnBuZycsXG4gICAgZGF0ZXM6ICcnLFxuICAgIGx1bmFyOiAnJyxcbiAgICBsdW5hckRheTogJycsXG4gICAgc2hvd0ltZ2U6IHRydWUsXG4gICAgdGljazogMCxcbiAgICB0aW1lOiAnJyxcbiAgICBrZXk6IGtzU3RhcnQsXG4gICAga1N0YXR1czogWyflvIDlp4snLCAn5pqC5YGcJywgJ+e7p+e7rSddLFxuICAgIGVuZEtleTogJ+e7k+adnycsXG4gICAgdG91Y2htb3ZlOiB0cnVlLFxuICAgIGNoYW5nZVBvaW50OiAwLFxuICAgIGltYWdlTm9kZTogV0FURVIsXG4gICAgYmdjb2xvcjogJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMTIpJyxcbiAgICBjaXJjbGVjb2xvcjogJ3JnYmEoMCwgMCwgMCwgMCknLFxuICAgIHN0YXJQb2ludDogWzAsIDBdLFxuICAgIGN1clBvaW50OiBbMCwgMF0sXG4gICAgdG91Y2hlczogWzAsIDBdLFxuICAgIG5vaXNlOiAnaHR0cDovL3d3dy5zbWFydGVzdGVlLmNvbS9ub2lzZS93YXRlci5tcDMnLFxuICAgIHRleHQ6ICfpm6jmsLQnLFxuICAgIHNoYWRvd2NvbG9yOiAnIzMzMzMzMycsXG4gICAgZ29sZFBvaW50OiBmYWxzZU9wYWNpdHksXG4gICAgdHJlZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gICAgd2F0ZXJQb2ludDogdHJ1ZU9wYWNpdHksXG4gICAgZmlyZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gICAgc29pbFBvaW50OiBmYWxzZU9wYWNpdHksXG4gICAgbG9vcHM6IGxvb3BcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGRhdGUoc2VsZikge1xuICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICBjb25zdCB3ZWVrcyA9IFsnU3VuJywgJ01vbicsICdUdWVzJywgJ1dlZCcsICdUaHVyJywgJ0ZyaScsICdTYXQnXVxuICAgICAgY29uc3Qgd2VlayA9IGRhdGUuZ2V0VVRDRGF5KClcbiAgICAgIGNvbnN0IHdlZWtkID0gd2Vla3Nbd2Vla11cbiAgICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpXG4gICAgICBjb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1ZycsICdTZXB0JywgJ09jdCcsICdOb3YnLCAnRGVjJ11cbiAgICAgIGNvbnN0IG1vbiA9IG1vbnRoc1ttb250aF1cbiAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpXG4gICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgICBzZWxmLmRhdGVzID0gbW9uICsgJyAnICsgZGF5ICsgJyAnICsgd2Vla2QgKyAnICcgKyB5ZWFyXG4gICAgICBsZXQgbHVuYXJkYXRlID0gY2FsZW5kYXIuc29sYXIybHVuYXIoeWVhciwgbW9udGggKyAxLCBkYXkpXG4gICAgICBjb25zdCBsdW5hck1vbnRocyA9IFsn5q2j5pyIJywgJ+i0sOaciCcsICflj4HmnIgnLCAn6IKG5pyIJywgJ+S8jeaciCcsICfpmYbmnIgnLCAn5LiD5pyIJywgJ+aNjOaciCcsICfnjpbmnIgnLCAn5ou+5pyIJywgJ+aLvuWjueaciCcsICfohYrmnIgnXVxuICAgICAgY29uc3QgbHVuYXJEYXlzID0gWyfkuIAnLCAn5LqMJywgJ+S4iScsICflm5snLCAn5LqUJywgJ+WFrScsICfkuIMnLCAn5YWrJywgJ+S5nScsICfljYEnXVxuICAgICAgaWYgKGx1bmFyZGF0ZS5sRGF5IDw9IDEwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5YidJyArIGx1bmFyRGF5c1tsdW5hcmRhdGUubERheSAtIDFdXG4gICAgICB9IGVsc2UgaWYgKGx1bmFyZGF0ZS5sRGF5ID4gMTAgJiYgbHVuYXJkYXRlLmxEYXkgPCAyMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+WNgScgKyBsdW5hckRheXNbbHVuYXJkYXRlLmxEYXkgLSAxMV1cbiAgICAgIH0gZWxzZSBpZiAobHVuYXJkYXRlLmxEYXkgPiAyMCAmJiBsdW5hcmRhdGUubERheSA8IDMwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5bu/JyArIGx1bmFyRGF5c1tsdW5hcmRhdGUubERheSAtIDIxXVxuICAgICAgfSBlbHNlIGlmIChsdW5hcmRhdGUubERheSA9PT0gMjApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICfkuozljYEnXG4gICAgICB9IGVsc2UgaWYgKGx1bmFyZGF0ZS5sRGF5ID09PSAzMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+S4ieWNgSdcbiAgICAgIH1cbiAgICAgIHNlbGYubHVuYXIgPSAn5Yac5Y6GJyArIGx1bmFyTW9udGhzW2x1bmFyZGF0ZS5sTW9udGggLSAxXSArIHNlbGYubHVuYXJEYXlcbiAgICB9LFxuICAgIC8vIOWIpOaWreaYr+WQpuW8gOWQr+iuoeaXtuWZqFxuICAgIHRpbWUoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGxldCBtaW4gPSAoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW5cbiAgICAgIHNlbGYubWV0aG9kcy5jaXJjbGVDb2xvckNoYW5nZShzZWxmKVxuICAgICAgc2VsZi5tZXRob2RzLnBsYXlub2lzZShzZWxmKVxuICAgICAgaWYgKG1pbiA+IHRpbWVMb3dsaW1pdCAmJiBtaW4gPD0gdGltZVVwbGltaXQpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnRpbWVyKHNlbGYsIGZhbHNlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnRpbWVyKHNlbGYsIHRydWUpXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDorqHml7blmahcbiAgICB0aW1lcihzZWxmLCBsb29wcykge1xuICAgICAgc2VsZi50b3VjaG1vdmUgPSBmYWxzZVxuICAgICAgaWYgKHNlbGYua2V5ID09PSBrc1N0YXJ0IHx8IHNlbGYua2V5ID09PSBrc0NvbnRpbnVlKSB7XG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHNlbGYudGljayA9PT0gLTEpIHtcbiAgICAgICAgICAgIHNlbGYudGljayA9IC0xXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYudGljay0tXG4gICAgICAgICAgfVxuICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICB3ZXB5LmdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLnN0YXR1cyAhPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlbGYubWV0aG9kcy5wbGF5bm9pc2Uoc2VsZilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKHNlbGYudGljayA9PT0gdGltZUxvd2xpbWl0KSB7XG4gICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgICB0b3VjaG1vdmU6IHRydWUsXG4gICAgICAgICAgICAgIGNpcmNsZWNvbG9yOiAncmdiYSgwLCAwLCAwLCAwKScsXG4gICAgICAgICAgICAgIGtleToga3NTdGFydCxcbiAgICAgICAgICAgICAgdGljazogaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluLFxuICAgICAgICAgICAgICB0aW1lOiBpbml0aWFsVGltZVRleHQsXG4gICAgICAgICAgICAgIHNoYWRvd2NvbG9yOiAnIzMzMzMzMydcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB3ZXB5LnN0b3BCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgICAgICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYudG91Y2htb3ZlID0gdHJ1ZVxuICAgICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDApJ1xuICAgICAgICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICcjMzMzMzMzJ1xuICAgICAgICAgICAgc2VsZi5rZXkgPSBrc1N0YXJ0XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMClcbiAgICAgICAgc2VsZi5rZXkgPSBrc1BhdXNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3ZXB5LnBhdXNlQmFja2dyb3VuZEF1ZGlvKClcbiAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICBzZWxmLmtleSA9IGtzQ29udGludWVcbiAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKDI1NSwgMjU1LCAwLCAwKSdcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOWIt+aWsOaXtumXtFxuICAgIHNldFRpbWUoc2VsZiwgdGljaykge1xuICAgICAgbGV0IGN1cnJlbnRUaW1lID0gc2VsZi5tZXRob2RzLmN1cnJlbnRUaW1lKHNlbGYudGljaylcbiAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgIHRpbWU6IGN1cnJlbnRUaW1lXG4gICAgICB9KVxuICAgICAgc2VsZi50aW1lID0gY3VycmVudFRpbWVcbiAgICB9LFxuICAgIHRpbWVyRW5kKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgd2VweS5zdG9wQmFja2dyb3VuZEF1ZGlvKClcbiAgICAgIHNlbGYua2V5ID0ga3NTdGFydFxuICAgICAgc2VsZi50aWNrID0gaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluXG4gICAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICAgIHNlbGYudG91Y2htb3ZlID0gdHJ1ZVxuICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDApJ1xuICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICcjMzMzMzMzJ1xuICAgIH0sXG4gICAgLy8g6K6h566X5pe26Ze05Y+K6L6T5Ye65qC85byPXG4gICAgY3VycmVudFRpbWUodGljaykge1xuICAgICAgaWYgKHRpY2sgPCAwKSB7XG4gICAgICAgIHJldHVybiBsb29wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgbWluID0gKHRpY2sgLSAodGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW5cbiAgICAgICAgbGV0IHNlYyA9IHRpY2sgJSBzZWNvbmRzUGVyTWluXG4gICAgICAgIGlmIChtaW4gPiB0aW1lVXBsaW1pdCkge1xuICAgICAgICAgIHRpY2sgPSAtMVxuICAgICAgICAgIHJldHVybiBsb29wXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG1pbiA8IDEwKSB7XG4gICAgICAgICAgICBtaW4gPSAnMCcgKyBtaW5cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlYyA8IDEwKSB7XG4gICAgICAgICAgICBzZWMgPSAnMCcgKyBzZWNcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1pbiArICcgOiAnICsgc2VjXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHRvdWNoc3RhcnQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLnN0YXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICB9LFxuICAgIHRvdWNobW92ZShlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuY3VyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgICBzZWxmLmNoYW5nZVBvaW50KytcbiAgICAgIGlmIChzZWxmLnRvdWNobW92ZSkge1xuICAgICAgICBzZWxmLm1ldGhvZHMudGltZUNoYW5nZShzZWxmKVxuICAgICAgfVxuICAgIH0sXG4gICAgdG91Y2hlbmQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBpZiAoc2VsZi50b3VjaG1vdmUpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLmltYWdlQ2hhbmdlKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDkuIrkuIvmu5HliqjosIPoioLml7bpl7RcbiAgICB0aW1lQ2hhbmdlKHNlbGYpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt4UG9zXSAtIHNlbGYuc3RhclBvaW50W3hQb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeVBvc10gLSBzZWxmLnN0YXJQb2ludFt5UG9zXVxuICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpIDwgTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VUaW1lUG9pbnQpIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt5UG9zXSA+IHNlbGYuc3RhclBvaW50W3lQb3NdICYmIHNlbGYudGljayA+IDApIHtcbiAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayAtIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3lQb3NdIDwgc2VsZi5zdGFyUG9pbnRbeVBvc10pIHtcbiAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayArIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDlt6blj7Pmu5HliqjosIPoioLlm77niYdcbiAgICBpbWFnZUNoYW5nZShzZWxmKSB7XG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeFBvc10gLSBzZWxmLnN0YXJQb2ludFt4UG9zXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50W3lQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeVBvc11cbiAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID4gY2hhbmdlSW1hZ2VQb2ludCkge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3hQb3NdID4gc2VsZi5zdGFyUG9pbnRbeFBvc10pIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBHT0xEOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgVFJFRTpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn5a+66ZKfJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gR09MRFxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDI1NSwgMCwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlR29sZFxuICAgICAgICAgICAgICAgIHNlbGYuZ29sZFBvaW50ID0gdHJ1ZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBzZWxmLnRyZWVQb2ludCA9IGZhbHNlT3BhY2l0eVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgV0FURVI6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+ajruaelydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFRSRUVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VUcmVlXG4gICAgICAgICAgICAgICAgc2VsZi50cmVlUG9pbnQgPSB0cnVlT3BhY2l0eVxuICAgICAgICAgICAgICAgIHNlbGYud2F0ZXJQb2ludCA9IGZhbHNlT3BhY2l0eVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgRklSRTpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn6Zuo5rC0J1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gV0FURVJcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlV2F0ZXJcbiAgICAgICAgICAgICAgICBzZWxmLndhdGVyUG9pbnQgPSB0cnVlT3BhY2l0eVxuICAgICAgICAgICAgICAgIHNlbGYuZmlyZVBvaW50ID0gZmFsc2VPcGFjaXR5XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBTT0lMOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfnr53ngasnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBGSVJFXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlRmlyZVxuICAgICAgICAgICAgICAgIHNlbGYuZmlyZVBvaW50ID0gdHJ1ZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBzZWxmLnNvaWxQb2ludCA9IGZhbHNlT3BhY2l0eVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5jdXJQb2ludFt4UG9zXSA8IHNlbGYuc3RhclBvaW50W3hQb3NdKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgR09MRDpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn5qOu5p6XJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gVFJFRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZVRyZWVcbiAgICAgICAgICAgICAgICBzZWxmLnRyZWVQb2ludCA9IHRydWVPcGFjaXR5XG4gICAgICAgICAgICAgICAgc2VsZi5nb2xkUG9pbnQgPSBmYWxzZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFRSRUU6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+mbqOawtCdcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFdBVEVSXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZVdhdGVyXG4gICAgICAgICAgICAgICAgc2VsZi53YXRlclBvaW50ID0gdHJ1ZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBzZWxmLnRyZWVQb2ludCA9IGZhbHNlT3BhY2l0eVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgV0FURVI6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+evneeBqydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IEZJUkVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VGaXJlXG4gICAgICAgICAgICAgICAgc2VsZi5maXJlUG9pbnQgPSB0cnVlT3BhY2l0eVxuICAgICAgICAgICAgICAgIHNlbGYud2F0ZXJQb2ludCA9IGZhbHNlT3BhY2l0eVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgRklSRTpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn5rWq5r2uJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gU09JTFxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyMzgsIDk5LCA5OSwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlU29pbFxuICAgICAgICAgICAgICAgIHNlbGYuc29pbFBvaW50ID0gdHJ1ZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBzZWxmLmZpcmVQb2ludCA9IGZhbHNlT3BhY2l0eVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgU09JTDpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHBsYXlub2lzZShzZWxmKSB7XG4gICAgICB3ZXB5LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xuICAgICAgICBkYXRhVXJsOiBzZWxmLm5vaXNlXG4gICAgICB9KVxuICAgIH0sXG4gICAgY2lyY2xlQ29sb3JDaGFuZ2Uoc2VsZikge1xuICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICBjYXNlIEdPTEQ6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAyNTUsIDI1NSwgMCwgMC4xKSdcbiAgICAgICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAxKSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFRSRUU6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMSknXG4gICAgICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDEpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgV0FURVI6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjEpJ1xuICAgICAgICAgIHNlbGYuc2hhZG93Y29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMSknXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBGSVJFOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjEpJ1xuICAgICAgICAgIHNlbGYuc2hhZG93Y29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAxKSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFNPSUw6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAyMzgsIDk5LCA5OSwgMC4xKSdcbiAgICAgICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJ3JnYmEoIDIzOCwgOTksIDk5LCAxKSdcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICflvZLlv4MnLFxuICAgICAgZGVzYzogJ+mDveW4guWWp+mXuSDkvZXlpITlvZLlv4MnLFxuICAgICAgcGF0aDogJy9wYWdlL25vaXNlJ1xuICAgIH1cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgc2VsZi5tZXRob2RzLmRhdGUoc2VsZilcbiAgICAvLyBzZWxmLmNhbGVuZGFyLnNvbGFyMmx1bmFyKClcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlbGYuc2hvd0ltZ2UgPSBmYWxzZVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgc2hvd0ltZ2U6IGZhbHNlXG4gICAgICB9KVxuICAgIH0sIDIwMDApXG4gICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgc2VsZi50aWNrID0gaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluXG4gIH1cbn1cbiJdfQ==