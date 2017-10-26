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
var changeTimePoint = 5;
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
      soilPoint: falseOpacity
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
          self.methods.timer(self);
        } else {
          _timer = setInterval(function () {
            _wepy2.default.getBackgroundAudioPlayerState({
              success: function success(res) {
                if (res.status !== 1) {
                  self.methods.playnoise(self);
                }
              }
            });
          }, 1000);
          self.key = ksPause;
        }
      },

      // 计时器
      timer: function timer(self) {
        self.touchmove = false;
        if (self.key === ksStart || self.key === ksContinue) {
          _timer = setInterval(function () {
            self.tick--;
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
        var min = (tick - tick % secondsPerMin) / secondsPerMin;
        var sec = tick % secondsPerMin;
        if (min > timeUplimit) {
          return '∞';
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld25vaXNlLmpzIl0sIm5hbWVzIjpbImNhbGVuZGFyIiwicmVxdWlyZSIsImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxUaW1lIiwic2Vjb25kc1Blck1pbiIsInRpbWVVcGxpbWl0IiwidGltZUxvd2xpbWl0Iiwia3NTdGFydCIsImtzUGF1c2UiLCJrc0NvbnRpbnVlIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwiR09MRCIsIlRSRUUiLCJXQVRFUiIsIkZJUkUiLCJTT0lMIiwibm9pc2VHb2xkIiwibm9pc2VUcmVlIiwibm9pc2VXYXRlciIsIm5vaXNlRmlyZSIsIm5vaXNlU29pbCIsInRydWVPcGFjaXR5IiwiZmFsc2VPcGFjaXR5IiwidGltZXIiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibWFyayIsImRhdGVzIiwibHVuYXIiLCJsdW5hckRheSIsInNob3dJbWdlIiwidGljayIsInRpbWUiLCJrZXkiLCJrU3RhdHVzIiwiZW5kS2V5IiwidG91Y2htb3ZlIiwiY2hhbmdlUG9pbnQiLCJpbWFnZU5vZGUiLCJiZ2NvbG9yIiwiY2lyY2xlY29sb3IiLCJzdGFyUG9pbnQiLCJjdXJQb2ludCIsInRvdWNoZXMiLCJub2lzZSIsInRleHQiLCJzaGFkb3djb2xvciIsImdvbGRQb2ludCIsInRyZWVQb2ludCIsIndhdGVyUG9pbnQiLCJmaXJlUG9pbnQiLCJzb2lsUG9pbnQiLCJtZXRob2RzIiwiZGF0ZSIsInNlbGYiLCJEYXRlIiwid2Vla3MiLCJ3ZWVrIiwiZ2V0VVRDRGF5Iiwid2Vla2QiLCJtb250aCIsImdldE1vbnRoIiwibW9udGhzIiwibW9uIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsImx1bmFyZGF0ZSIsInNvbGFyMmx1bmFyIiwibHVuYXJNb250aHMiLCJsdW5hckRheXMiLCJsRGF5IiwibE1vbnRoIiwibWluIiwiY2lyY2xlQ29sb3JDaGFuZ2UiLCJwbGF5bm9pc2UiLCJzZXRJbnRlcnZhbCIsImdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlIiwic3VjY2VzcyIsInJlcyIsInN0YXR1cyIsInNldFRpbWUiLCJzZXREYXRhIiwic3RvcEJhY2tncm91bmRBdWRpbyIsImNsZWFySW50ZXJ2YWwiLCJwYXVzZUJhY2tncm91bmRBdWRpbyIsImN1cnJlbnRUaW1lIiwidGltZXJFbmQiLCJzZWMiLCJ0b3VjaHN0YXJ0IiwiZSIsInBhZ2VYIiwicGFnZVkiLCJ0aW1lQ2hhbmdlIiwidG91Y2hlbmQiLCJpbWFnZUNoYW5nZSIsInhjaGFuZ2UiLCJ5Y2hhbmdlIiwiTWF0aCIsImFicyIsInBsYXlCYWNrZ3JvdW5kQXVkaW8iLCJkYXRhVXJsIiwidGl0bGUiLCJkZXNjIiwicGF0aCIsInNldFRpbWVvdXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsV0FBV0MsUUFBUSxzQkFBUixDQUFqQjtBQUNBLElBQU1DLGtCQUFrQixTQUF4QjtBQUNBLElBQU1DLGNBQWMsRUFBcEI7QUFDQSxJQUFNQyxnQkFBZ0IsRUFBdEI7QUFDQSxJQUFNQyxjQUFjLEVBQXBCO0FBQ0EsSUFBTUMsZUFBZSxDQUFyQjtBQUNBLElBQU1DLFVBQVUsQ0FBaEI7QUFDQSxJQUFNQyxVQUFVLENBQWhCO0FBQ0EsSUFBTUMsYUFBYSxDQUFuQjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLGtCQUFrQixDQUF4QjtBQUNBLElBQU1DLG1CQUFtQixDQUF6QjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLFFBQVEsT0FBZDtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLFlBQVkscUNBQWxCO0FBQ0EsSUFBTUMsWUFBWSxxQ0FBbEI7QUFDQSxJQUFNQyxhQUFhLHFDQUFu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LGVBQUtwQyxJQUFMO0FBQ0U0QyxpQkFBS2QsV0FBTCxHQUFtQix1QkFBbkI7QUFDQWMsaUJBQUtSLFdBQUwsR0FBbUIscUJBQW5CO0FBQ0E7QUFDRixlQUFLbkMsS0FBTDtBQUNFMkMsaUJBQUtkLFdBQUwsR0FBbUIsd0JBQW5CO0FBQ0FjLGlCQUFLUixXQUFMLEdBQW1CLHNCQUFuQjtBQUNBO0FBQ0YsZUFBS2xDLElBQUw7QUFDRTBDLGlCQUFLZCxXQUFMLEdBQW1CLHVCQUFuQjtBQUNBYyxpQkFBS1IsV0FBTCxHQUFtQixxQkFBbkI7QUFDQTtBQUNGLGVBQUtqQyxJQUFMO0FBQ0V5QyxpQkFBS2QsV0FBTCxHQUFtQix5QkFBbkI7QUFDQWMsaUJBQUtSLFdBQUwsR0FBbUIsdUJBQW5CO0FBQ0E7QUFwQko7QUFzQkQ7QUFuUk8sSzs7Ozs7d0NBcVJVO0FBQ2xCLGFBQU87QUFDTHlELGVBQU8sSUFERjtBQUVMQyxjQUFNLFdBRkQ7QUFHTEMsY0FBTTtBQUhELE9BQVA7QUFLRDs7OzZCQUNRO0FBQ1AsVUFBSW5ELE9BQU8sSUFBWDtBQUNBQSxXQUFLRixPQUFMLENBQWFDLElBQWIsQ0FBa0JDLElBQWxCO0FBQ0E7QUFDQW9ELGlCQUFXLFlBQU07QUFDZnBELGFBQUt4QixRQUFMLEdBQWdCLEtBQWhCO0FBQ0F3QixhQUFLNkIsT0FBTCxDQUFhO0FBQ1hyRCxvQkFBVTtBQURDLFNBQWI7QUFHRCxPQUxELEVBS0csSUFMSDtBQU1Bd0IsV0FBS3RCLElBQUwsR0FBWW5DLGVBQVo7QUFDQXlELFdBQUt2QixJQUFMLEdBQVlqQyxjQUFjQyxhQUExQjtBQUNEOzs7O0VBeFVnQyxlQUFLNEcsSTs7a0JBQW5CckYsSyIsImZpbGUiOiJuZXdub2lzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuY29uc3QgY2FsZW5kYXIgPSByZXF1aXJlKCcuLi9wYWdlcy9jYWxlbmRhci5qcycpXG5jb25zdCBpbml0aWFsVGltZVRleHQgPSAnMjAgOiAwMCdcbmNvbnN0IGluaXRpYWxUaW1lID0gMjBcbmNvbnN0IHNlY29uZHNQZXJNaW4gPSA2MFxuY29uc3QgdGltZVVwbGltaXQgPSA2MFxuY29uc3QgdGltZUxvd2xpbWl0ID0gMFxuY29uc3Qga3NTdGFydCA9IDBcbmNvbnN0IGtzUGF1c2UgPSAxXG5jb25zdCBrc0NvbnRpbnVlID0gMlxuY29uc3QgeFBvcyA9IDBcbmNvbnN0IHlQb3MgPSAxXG5jb25zdCBjaGFuZ2VUaW1lUG9pbnQgPSA1XG5jb25zdCBjaGFuZ2VJbWFnZVBvaW50ID0gNVxuY29uc3QgR09MRCA9ICdnb2xkJ1xuY29uc3QgVFJFRSA9ICd0cmVlJ1xuY29uc3QgV0FURVIgPSAnd2F0ZXInXG5jb25zdCBGSVJFID0gJ2ZpcmUnXG5jb25zdCBTT0lMID0gJ3NvaWwnXG5jb25zdCBub2lzZUdvbGQgPSAnaHR0cDovL2xvY2FsaG9zdDo1MDAwLyVFOSU5MiU5Ri5tcDMnXG5jb25zdCBub2lzZVRyZWUgPSAnaHR0cDovL2xvY2FsaG9zdDo1MDAwLyVFNiVBMyVBRS5tcDMnXG5jb25zdCBub2lzZVdhdGVyID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTklOUIlQTgubXAzJ1xuY29uc3Qgbm9pc2VGaXJlID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTclODElQUIubXAzJ1xuY29uc3Qgbm9pc2VTb2lsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTYlQkQlQUUubXAzJ1xuY29uc3QgdHJ1ZU9wYWNpdHkgPSAxXG5jb25zdCBmYWxzZU9wYWNpdHkgPSAwLjNcblxubGV0IHRpbWVyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflvZLlv4MnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBtYXJrOiAnLi4vaW1hZ2Uvd2F0ZXIucG5nJyxcbiAgICBkYXRlczogJycsXG4gICAgbHVuYXI6ICcnLFxuICAgIGx1bmFyRGF5OiAnJyxcbiAgICBzaG93SW1nZTogdHJ1ZSxcbiAgICB0aWNrOiAwLFxuICAgIHRpbWU6ICcnLFxuICAgIGtleToga3NTdGFydCxcbiAgICBrU3RhdHVzOiBbJ+W8gOWniycsICfmmoLlgZwnLCAn57un57utJ10sXG4gICAgZW5kS2V5OiAn57uT5p2fJyxcbiAgICB0b3VjaG1vdmU6IHRydWUsXG4gICAgY2hhbmdlUG9pbnQ6IDAsXG4gICAgaW1hZ2VOb2RlOiBXQVRFUixcbiAgICBiZ2NvbG9yOiAncmdiYSgwLCAyNTUsIDI1NSwgMC4xMiknLFxuICAgIGNpcmNsZWNvbG9yOiAncmdiYSgwLCAwLCAwLCAwKScsXG4gICAgc3RhclBvaW50OiBbMCwgMF0sXG4gICAgY3VyUG9pbnQ6IFswLCAwXSxcbiAgICB0b3VjaGVzOiBbMCwgMF0sXG4gICAgbm9pc2U6ICdodHRwOi8vbG9jYWxob3N0OjUwMDAv6ZuoLm1wMycsXG4gICAgdGV4dDogJ+mbqOawtCcsXG4gICAgc2hhZG93Y29sb3I6ICcjMzMzMzMzJyxcbiAgICBnb2xkUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgICB0cmVlUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgICB3YXRlclBvaW50OiB0cnVlT3BhY2l0eSxcbiAgICBmaXJlUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgICBzb2lsUG9pbnQ6IGZhbHNlT3BhY2l0eVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgZGF0ZShzZWxmKSB7XG4gICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIGNvbnN0IHdlZWtzID0gWydTdW4nLCAnTW9uJywgJ1R1ZXMnLCAnV2VkJywgJ1RodXInLCAnRnJpJywgJ1NhdCddXG4gICAgICBjb25zdCB3ZWVrID0gZGF0ZS5nZXRVVENEYXkoKVxuICAgICAgY29uc3Qgd2Vla2QgPSB3ZWVrc1t3ZWVrXVxuICAgICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKClcbiAgICAgIGNvbnN0IG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVnJywgJ1NlcHQnLCAnT2N0JywgJ05vdicsICdEZWMnXVxuICAgICAgY29uc3QgbW9uID0gbW9udGhzW21vbnRoXVxuICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKClcbiAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICAgIHNlbGYuZGF0ZXMgPSBtb24gKyAnICcgKyBkYXkgKyAnICcgKyB3ZWVrZCArICcgJyArIHllYXJcbiAgICAgIGxldCBsdW5hcmRhdGUgPSBjYWxlbmRhci5zb2xhcjJsdW5hcih5ZWFyLCBtb250aCArIDEsIGRheSlcbiAgICAgIGNvbnN0IGx1bmFyTW9udGhzID0gWyfmraPmnIgnLCAn6LSw5pyIJywgJ+WPgeaciCcsICfogobmnIgnLCAn5LyN5pyIJywgJ+mZhuaciCcsICfkuIPmnIgnLCAn5o2M5pyIJywgJ+eOluaciCcsICfmi77mnIgnLCAn5ou+5aO55pyIJywgJ+iFiuaciCddXG4gICAgICBjb25zdCBsdW5hckRheXMgPSBbJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJywgJ+S4gycsICflhasnLCAn5LmdJywgJ+WNgSddXG4gICAgICBpZiAobHVuYXJkYXRlLmxEYXkgPD0gMTApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICfliJ0nICsgbHVuYXJEYXlzW2x1bmFyZGF0ZS5sRGF5IC0gMV1cbiAgICAgIH0gZWxzZSBpZiAobHVuYXJkYXRlLmxEYXkgPiAxMCAmJiBsdW5hcmRhdGUubERheSA8IDIwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5Y2BJyArIGx1bmFyRGF5c1tsdW5hcmRhdGUubERheSAtIDExXVxuICAgICAgfSBlbHNlIGlmIChsdW5hcmRhdGUubERheSA+IDIwICYmIGx1bmFyZGF0ZS5sRGF5IDwgMzApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICflu78nICsgbHVuYXJEYXlzW2x1bmFyZGF0ZS5sRGF5IC0gMjFdXG4gICAgICB9IGVsc2UgaWYgKGx1bmFyZGF0ZS5sRGF5ID09PSAyMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+S6jOWNgSdcbiAgICAgIH0gZWxzZSBpZiAobHVuYXJkYXRlLmxEYXkgPT09IDMwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5LiJ5Y2BJ1xuICAgICAgfVxuICAgICAgc2VsZi5sdW5hciA9ICflhpzljoYnICsgbHVuYXJNb250aHNbbHVuYXJkYXRlLmxNb250aCAtIDFdICsgc2VsZi5sdW5hckRheVxuICAgIH0sXG4gICAgLy8g5Yik5pat5piv5ZCm5byA5ZCv6K6h5pe25ZmoXG4gICAgdGltZSgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgbGV0IG1pbiA9IChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pblxuICAgICAgc2VsZi5tZXRob2RzLmNpcmNsZUNvbG9yQ2hhbmdlKHNlbGYpXG4gICAgICBzZWxmLm1ldGhvZHMucGxheW5vaXNlKHNlbGYpXG4gICAgICBpZiAobWluID4gdGltZUxvd2xpbWl0ICYmIG1pbiA8PSB0aW1lVXBsaW1pdCkge1xuICAgICAgICBzZWxmLm1ldGhvZHMudGltZXIoc2VsZilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgd2VweS5nZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSh7XG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgIT09IDEpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm1ldGhvZHMucGxheW5vaXNlKHNlbGYpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9LCAxMDAwKVxuICAgICAgICBzZWxmLmtleSA9IGtzUGF1c2VcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOiuoeaXtuWZqFxuICAgIHRpbWVyKHNlbGYpIHtcbiAgICAgIHNlbGYudG91Y2htb3ZlID0gZmFsc2VcbiAgICAgIGlmIChzZWxmLmtleSA9PT0ga3NTdGFydCB8fCBzZWxmLmtleSA9PT0ga3NDb250aW51ZSkge1xuICAgICAgICB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYudGljay0tXG4gICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgIHdlcHkuZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUoe1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5tZXRob2RzLnBsYXlub2lzZShzZWxmKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBpZiAoc2VsZi50aWNrID09PSB0aW1lTG93bGltaXQpIHtcbiAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIHRvdWNobW92ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgY2lyY2xlY29sb3I6ICdyZ2JhKDAsIDAsIDAsIDApJyxcbiAgICAgICAgICAgICAga2V5OiBrc1N0YXJ0LFxuICAgICAgICAgICAgICB0aWNrOiBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW4sXG4gICAgICAgICAgICAgIHRpbWU6IGluaXRpYWxUaW1lVGV4dFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHdlcHkuc3RvcEJhY2tncm91bmRBdWRpbygpXG4gICAgICAgICAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICAgICAgICAgIHNlbGYudGljayA9IGluaXRpYWxUaW1lICogc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi50b3VjaG1vdmUgPSB0cnVlXG4gICAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMCknXG4gICAgICAgICAgICBzZWxmLmtleSA9IGtzU3RhcnRcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwKVxuICAgICAgICBzZWxmLmtleSA9IGtzUGF1c2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdlcHkucGF1c2VCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICAgIHNlbGYua2V5ID0ga3NDb250aW51ZVxuICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMjU1LCAyNTUsIDAsIDApJ1xuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5Yi35paw5pe26Ze0XG4gICAgc2V0VGltZShzZWxmLCB0aWNrKSB7XG4gICAgICBsZXQgY3VycmVudFRpbWUgPSBzZWxmLm1ldGhvZHMuY3VycmVudFRpbWUoc2VsZi50aWNrKVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgIH0pXG4gICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgIH0sXG4gICAgdGltZXJFbmQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICB3ZXB5LnN0b3BCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgc2VsZi5rZXkgPSBrc1N0YXJ0XG4gICAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgICAgc2VsZi50b3VjaG1vdmUgPSB0cnVlXG4gICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMCknXG4gICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJyMzMzMzMzMnXG4gICAgfSxcbiAgICAvLyDorqHnrpfml7bpl7Tlj4rovpPlh7rmoLzlvI9cbiAgICBjdXJyZW50VGltZSh0aWNrKSB7XG4gICAgICBsZXQgbWluID0gKHRpY2sgLSAodGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW5cbiAgICAgIGxldCBzZWMgPSB0aWNrICUgc2Vjb25kc1Blck1pblxuICAgICAgaWYgKG1pbiA+IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgIHJldHVybiAn4oieJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1pbiA8IDEwKSB7XG4gICAgICAgICAgbWluID0gJzAnICsgbWluXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlYyA8IDEwKSB7XG4gICAgICAgICAgc2VjID0gJzAnICsgc2VjXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbiArICcgOiAnICsgc2VjXG4gICAgICB9XG4gICAgfSxcbiAgICB0b3VjaHN0YXJ0KGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5zdGFyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgfSxcbiAgICB0b3VjaG1vdmUoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLmN1clBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgICAgc2VsZi5jaGFuZ2VQb2ludCsrXG4gICAgICBpZiAoc2VsZi50b3VjaG1vdmUpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnRpbWVDaGFuZ2Uoc2VsZilcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvdWNoZW5kKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYgKHNlbGYudG91Y2htb3ZlKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy5pbWFnZUNoYW5nZShzZWxmKVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5LiK5LiL5ruR5Yqo6LCD6IqC5pe26Ze0XG4gICAgdGltZUNoYW5nZShzZWxmKSB7XG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeFBvc10gLSBzZWxmLnN0YXJQb2ludFt4UG9zXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50W3lQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeVBvc11cbiAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA8IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID4gY2hhbmdlVGltZVBvaW50KSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeVBvc10gPiBzZWxmLnN0YXJQb2ludFt5UG9zXSAmJiBzZWxmLnRpY2sgPiAwKSB7XG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgLSBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt5UG9zXSA8IHNlbGYuc3RhclBvaW50W3lQb3NdKSB7XG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgKyBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5bem5Y+z5ruR5Yqo6LCD6IqC5Zu+54mHXG4gICAgaW1hZ2VDaGFuZ2Uoc2VsZikge1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50W3hQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeFBvc11cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt5UG9zXSAtIHNlbGYuc3RhclBvaW50W3lQb3NdXG4gICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPiBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA+IGNoYW5nZUltYWdlUG9pbnQpIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt4UG9zXSA+IHNlbGYuc3RhclBvaW50W3hQb3NdKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgR09MRDpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFRSRUU6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+WvuumSnydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IEdPTERcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAyNTUsIDAsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZUdvbGRcbiAgICAgICAgICAgICAgICBzZWxmLmdvbGRQb2ludCA9IHRydWVPcGFjaXR5XG4gICAgICAgICAgICAgICAgc2VsZi50cmVlUG9pbnQgPSBmYWxzZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFdBVEVSOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfmo67mnpcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBUUkVFXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlVHJlZVxuICAgICAgICAgICAgICAgIHNlbGYudHJlZVBvaW50ID0gdHJ1ZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBzZWxmLndhdGVyUG9pbnQgPSBmYWxzZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIEZJUkU6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+mbqOawtCdcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFdBVEVSXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZVdhdGVyXG4gICAgICAgICAgICAgICAgc2VsZi53YXRlclBvaW50ID0gdHJ1ZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBzZWxmLmZpcmVQb2ludCA9IGZhbHNlT3BhY2l0eVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgU09JTDpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn56+d54GrJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gRklSRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZUZpcmVcbiAgICAgICAgICAgICAgICBzZWxmLmZpcmVQb2ludCA9IHRydWVPcGFjaXR5XG4gICAgICAgICAgICAgICAgc2VsZi5zb2lsUG9pbnQgPSBmYWxzZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuY3VyUG9pbnRbeFBvc10gPCBzZWxmLnN0YXJQb2ludFt4UG9zXSkge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlIEdPTEQ6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+ajruaelydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFRSRUVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VUcmVlXG4gICAgICAgICAgICAgICAgc2VsZi50cmVlUG9pbnQgPSB0cnVlT3BhY2l0eVxuICAgICAgICAgICAgICAgIHNlbGYuZ29sZFBvaW50ID0gZmFsc2VPcGFjaXR5XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBUUkVFOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfpm6jmsLQnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBXQVRFUlxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VXYXRlclxuICAgICAgICAgICAgICAgIHNlbGYud2F0ZXJQb2ludCA9IHRydWVPcGFjaXR5XG4gICAgICAgICAgICAgICAgc2VsZi50cmVlUG9pbnQgPSBmYWxzZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFdBVEVSOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfnr53ngasnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBGSVJFXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlRmlyZVxuICAgICAgICAgICAgICAgIHNlbGYuZmlyZVBvaW50ID0gdHJ1ZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBzZWxmLndhdGVyUG9pbnQgPSBmYWxzZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIEZJUkU6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+a1qua9ridcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFNPSUxcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZVNvaWxcbiAgICAgICAgICAgICAgICBzZWxmLnNvaWxQb2ludCA9IHRydWVPcGFjaXR5XG4gICAgICAgICAgICAgICAgc2VsZi5maXJlUG9pbnQgPSBmYWxzZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFNPSUw6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBwbGF5bm9pc2Uoc2VsZikge1xuICAgICAgd2VweS5wbGF5QmFja2dyb3VuZEF1ZGlvKHtcbiAgICAgICAgZGF0YVVybDogc2VsZi5ub2lzZVxuICAgICAgfSlcbiAgICB9LFxuICAgIGNpcmNsZUNvbG9yQ2hhbmdlKHNlbGYpIHtcbiAgICAgIHN3aXRjaCAoc2VsZi5pbWFnZU5vZGUpIHtcbiAgICAgICAgY2FzZSBHT0xEOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSggMjU1LCAyNTUsIDAsIDAuMSknXG4gICAgICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICdyZ2JhKCAyNTUsIDI1NSwgMCwgMSknXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBUUkVFOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjEpJ1xuICAgICAgICAgIHNlbGYuc2hhZG93Y29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAxKSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFdBVEVSOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4xKSdcbiAgICAgICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDEpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgRklSRTpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4xKSdcbiAgICAgICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMSknXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBTT0lMOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDAuMSknXG4gICAgICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICdyZ2JhKCAyMzgsIDk5LCA5OSwgMSknXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5b2S5b+DJyxcbiAgICAgIGRlc2M6ICfpg73luILllqfpl7kg5L2V5aSE5b2S5b+DJyxcbiAgICAgIHBhdGg6ICcvcGFnZS9ub2lzZSdcbiAgICB9XG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIHNlbGYubWV0aG9kcy5kYXRlKHNlbGYpXG4gICAgLy8gc2VsZi5jYWxlbmRhci5zb2xhcjJsdW5hcigpXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLnNob3dJbWdlID0gZmFsc2VcbiAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgIHNob3dJbWdlOiBmYWxzZVxuICAgICAgfSlcbiAgICB9LCAyMDAwKVxuICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgIHNlbGYudGljayA9IGluaXRpYWxUaW1lICogc2Vjb25kc1Blck1pblxuICB9XG59XG4iXX0=