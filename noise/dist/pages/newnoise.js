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
      shadowcolor: '#333333'
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
                  break;
                case WATER:
                  self.text = '森林';
                  self.imageNode = TREE;
                  self.bgcolor = 'rgba( 0, 255, 0, 0.12)';
                  self.noise = noiseTree;
                  break;
                case FIRE:
                  self.text = '雨水';
                  self.imageNode = WATER;
                  self.bgcolor = 'rgba(0, 255, 255, 0.12)';
                  self.noise = noiseWater;
                  break;
                case SOIL:
                  self.text = '篝火';
                  self.imageNode = FIRE;
                  self.bgcolor = 'rgba( 255, 0, 0, 0.12)';
                  self.noise = noiseFire;
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
                  break;
                case TREE:
                  self.text = '雨水';
                  self.imageNode = WATER;
                  self.bgcolor = 'rgba(0, 255, 255, 0.12)';
                  self.noise = noiseWater;
                  break;
                case WATER:
                  self.text = '篝火';
                  self.imageNode = FIRE;
                  self.bgcolor = 'rgba( 255, 0, 0, 0.12)';
                  self.noise = noiseFire;
                  break;
                case FIRE:
                  self.text = '浪潮';
                  self.imageNode = SOIL;
                  self.bgcolor = 'rgba( 238, 99, 99, 0.12)';
                  self.noise = noiseSoil;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld25vaXNlLmpzIl0sIm5hbWVzIjpbImNhbGVuZGFyIiwicmVxdWlyZSIsImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxUaW1lIiwic2Vjb25kc1Blck1pbiIsInRpbWVVcGxpbWl0IiwidGltZUxvd2xpbWl0Iiwia3NTdGFydCIsImtzUGF1c2UiLCJrc0NvbnRpbnVlIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwiR09MRCIsIlRSRUUiLCJXQVRFUiIsIkZJUkUiLCJTT0lMIiwibm9pc2VHb2xkIiwibm9pc2VUcmVlIiwibm9pc2VXYXRlciIsIm5vaXNlRmlyZSIsIm5vaXNlU29pbCIsInRpbWVyIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1hcmsiLCJkYXRlcyIsImx1bmFyIiwibHVuYXJEYXkiLCJzaG93SW1nZSIsInRpY2siLCJ0aW1lIiwia2V5Iiwia1N0YXR1cyIsImVuZEtleSIsInRvdWNobW92ZSIsImNoYW5nZVBvaW50IiwiaW1hZ2VOb2RlIiwiYmdjb2xvciIsImNpcmNsZWNvbG9yIiwic3RhclBvaW50IiwiY3VyUG9pbnQiLCJ0b3VjaGVzIiwibm9pc2UiLCJ0ZXh0Iiwic2hhZG93Y29sb3IiLCJtZXRob2RzIiwiZGF0ZSIsInNlbGYiLCJEYXRlIiwid2Vla3MiLCJ3ZWVrIiwiZ2V0VVRDRGF5Iiwid2Vla2QiLCJtb250aCIsImdldE1vbnRoIiwibW9udGhzIiwibW9uIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsImx1bmFyZGF0ZSIsInNvbGFyMmx1bmFyIiwibHVuYXJNb250aHMiLCJsdW5hckRheXMiLCJsRGF5IiwibE1vbnRoIiwibWluIiwiY2lyY2xlQ29sb3JDaGFuZ2UiLCJwbGF5bm9pc2UiLCJzZXRJbnRlcnZhbCIsImdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlIiwic3VjY2VzcyIsInJlcyIsInN0YXR1cyIsInNldFRpbWUiLCJzZXREYXRhIiwic3RvcEJhY2tncm91bmRBdWRpbyIsImNsZWFySW50ZXJ2YWwiLCJwYXVzZUJhY2tncm91bmRBdWRpbyIsImN1cnJlbnRUaW1lIiwidGltZXJFbmQiLCJzZWMiLCJ0b3VjaHN0YXJ0IiwiZSIsInBhZ2VYIiwicGFnZVkiLCJ0aW1lQ2hhbmdlIiwidG91Y2hlbmQiLCJpbWFnZUNoYW5nZSIsInhjaGFuZ2UiLCJ5Y2hhbmdlIiwiTWF0aCIsImFicyIsInBsYXlCYWNrZ3JvdW5kQXVkaW8iLCJkYXRhVXJsIiwidGl0bGUiLCJkZXNjIiwicGF0aCIsInNldFRpbWVvdXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsV0FBV0MsUUFBUSxzQkFBUixDQUFqQjtBQUNBLElBQU1DLGtCQUFrQixTQUF4QjtBQUNBLElBQU1DLGNBQWMsRUFBcEI7QUFDQSxJQUFNQyxnQkFBZ0IsRUFBdEI7QUFDQSxJQUFNQyxjQUFjLEVBQXBCO0FBQ0EsSUFBTUMsZUFBZSxDQUFyQjtBQUNBLElBQU1DLFVBQVUsQ0FBaEI7QUFDQSxJQUFNQyxVQUFVLENBQWhCO0FBQ0EsSUFBTUMsYUFBYSxDQUFuQjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLGtCQUFrQixDQUF4QjtBQUNBLElBQU1DLG1CQUFtQixDQUF6QjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLFFBQVEsT0FBZDtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLFlBQVkscUNBQWxCO0FBQ0EsSUFBTUMsWUFBWSxxQ0FBbEI7QUFDQSxJQUFNQyxhQUFhLHFDQUFuQjtBQUNBLElBQU1DLFlBQVkscUNBQWxCO0FBQ0EsSUFBTUMsWUFBWSxxQ0FBbEI7O0FBRUEsSUFBSUMsZUFBSjs7SUFFcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29M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Y29uc3QgY2FsZW5kYXIgPSByZXF1aXJlKCcuLi9wYWdlcy9jYWxlbmRhci5qcycpXG5jb25zdCBpbml0aWFsVGltZVRleHQgPSAnMjAgOiAwMCdcbmNvbnN0IGluaXRpYWxUaW1lID0gMjBcbmNvbnN0IHNlY29uZHNQZXJNaW4gPSA2MFxuY29uc3QgdGltZVVwbGltaXQgPSA2MFxuY29uc3QgdGltZUxvd2xpbWl0ID0gMFxuY29uc3Qga3NTdGFydCA9IDBcbmNvbnN0IGtzUGF1c2UgPSAxXG5jb25zdCBrc0NvbnRpbnVlID0gMlxuY29uc3QgeFBvcyA9IDBcbmNvbnN0IHlQb3MgPSAxXG5jb25zdCBjaGFuZ2VUaW1lUG9pbnQgPSA1XG5jb25zdCBjaGFuZ2VJbWFnZVBvaW50ID0gNVxuY29uc3QgR09MRCA9ICdnb2xkJ1xuY29uc3QgVFJFRSA9ICd0cmVlJ1xuY29uc3QgV0FURVIgPSAnd2F0ZXInXG5jb25zdCBGSVJFID0gJ2ZpcmUnXG5jb25zdCBTT0lMID0gJ3NvaWwnXG5jb25zdCBub2lzZUdvbGQgPSAnaHR0cDovL2xvY2FsaG9zdDo1MDAwLyVFOSU5MiU5Ri5tcDMnXG5jb25zdCBub2lzZVRyZWUgPSAnaHR0cDovL2xvY2FsaG9zdDo1MDAwLyVFNiVBMyVBRS5tcDMnXG5jb25zdCBub2lzZVdhdGVyID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTklOUIlQTgubXAzJ1xuY29uc3Qgbm9pc2VGaXJlID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTclODElQUIubXAzJ1xuY29uc3Qgbm9pc2VTb2lsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTYlQkQlQUUubXAzJ1xuXG5sZXQgdGltZXJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W9kuW/gydcbiAgfVxuICBkYXRhID0ge1xuICAgIG1hcms6ICcuLi9pbWFnZS93YXRlci5wbmcnLFxuICAgIGRhdGVzOiAnJyxcbiAgICBsdW5hcjogJycsXG4gICAgbHVuYXJEYXk6ICcnLFxuICAgIHNob3dJbWdlOiB0cnVlLFxuICAgIHRpY2s6IDAsXG4gICAgdGltZTogJycsXG4gICAga2V5OiBrc1N0YXJ0LFxuICAgIGtTdGF0dXM6IFsn5byA5aeLJywgJ+aaguWBnCcsICfnu6fnu60nXSxcbiAgICBlbmRLZXk6ICfnu5PmnZ8nLFxuICAgIHRvdWNobW92ZTogdHJ1ZSxcbiAgICBjaGFuZ2VQb2ludDogMCxcbiAgICBpbWFnZU5vZGU6IFdBVEVSLFxuICAgIGJnY29sb3I6ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjEyKScsXG4gICAgY2lyY2xlY29sb3I6ICdyZ2JhKDAsIDAsIDAsIDApJyxcbiAgICBzdGFyUG9pbnQ6IFswLCAwXSxcbiAgICBjdXJQb2ludDogWzAsIDBdLFxuICAgIHRvdWNoZXM6IFswLCAwXSxcbiAgICBub2lzZTogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC/pm6gubXAzJyxcbiAgICB0ZXh0OiAn6Zuo5rC0JyxcbiAgICBzaGFkb3djb2xvcjogJyMzMzMzMzMnXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBkYXRlKHNlbGYpIHtcbiAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgY29uc3Qgd2Vla3MgPSBbJ1N1bicsICdNb24nLCAnVHVlcycsICdXZWQnLCAnVGh1cicsICdGcmknLCAnU2F0J11cbiAgICAgIGNvbnN0IHdlZWsgPSBkYXRlLmdldFVUQ0RheSgpXG4gICAgICBjb25zdCB3ZWVrZCA9IHdlZWtzW3dlZWtdXG4gICAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICAgICAgY29uc3QgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWcnLCAnU2VwdCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgICBjb25zdCBtb24gPSBtb250aHNbbW9udGhdXG4gICAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICAgICAgc2VsZi5kYXRlcyA9IG1vbiArICcgJyArIGRheSArICcgJyArIHdlZWtkICsgJyAnICsgeWVhclxuICAgICAgbGV0IGx1bmFyZGF0ZSA9IGNhbGVuZGFyLnNvbGFyMmx1bmFyKHllYXIsIG1vbnRoICsgMSwgZGF5KVxuICAgICAgY29uc3QgbHVuYXJNb250aHMgPSBbJ+ato+aciCcsICfotLDmnIgnLCAn5Y+B5pyIJywgJ+iChuaciCcsICfkvI3mnIgnLCAn6ZmG5pyIJywgJ+S4g+aciCcsICfmjYzmnIgnLCAn546W5pyIJywgJ+aLvuaciCcsICfmi77lo7nmnIgnLCAn6IWK5pyIJ11cbiAgICAgIGNvbnN0IGx1bmFyRGF5cyA9IFsn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nLCAn5LiDJywgJ+WFqycsICfkuZ0nLCAn5Y2BJ11cbiAgICAgIGlmIChsdW5hcmRhdGUubERheSA8PSAxMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+WInScgKyBsdW5hckRheXNbbHVuYXJkYXRlLmxEYXkgLSAxXVxuICAgICAgfSBlbHNlIGlmIChsdW5hcmRhdGUubERheSA+IDEwICYmIGx1bmFyZGF0ZS5sRGF5IDwgMjApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICfljYEnICsgbHVuYXJEYXlzW2x1bmFyZGF0ZS5sRGF5IC0gMTFdXG4gICAgICB9IGVsc2UgaWYgKGx1bmFyZGF0ZS5sRGF5ID4gMjAgJiYgbHVuYXJkYXRlLmxEYXkgPCAzMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+W7vycgKyBsdW5hckRheXNbbHVuYXJkYXRlLmxEYXkgLSAyMV1cbiAgICAgIH0gZWxzZSBpZiAobHVuYXJkYXRlLmxEYXkgPT09IDIwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5LqM5Y2BJ1xuICAgICAgfSBlbHNlIGlmIChsdW5hcmRhdGUubERheSA9PT0gMzApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICfkuInljYEnXG4gICAgICB9XG4gICAgICBzZWxmLmx1bmFyID0gJ+WGnOWOhicgKyBsdW5hck1vbnRoc1tsdW5hcmRhdGUubE1vbnRoIC0gMV0gKyBzZWxmLmx1bmFyRGF5XG4gICAgfSxcbiAgICAvLyDliKTmlq3mmK/lkKblvIDlkK/orqHml7blmahcbiAgICB0aW1lKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBsZXQgbWluID0gKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluXG4gICAgICBzZWxmLm1ldGhvZHMuY2lyY2xlQ29sb3JDaGFuZ2Uoc2VsZilcbiAgICAgIHNlbGYubWV0aG9kcy5wbGF5bm9pc2Uoc2VsZilcbiAgICAgIGlmIChtaW4gPiB0aW1lTG93bGltaXQgJiYgbWluIDw9IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lcihzZWxmKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICB3ZXB5LmdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLnN0YXR1cyAhPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlbGYubWV0aG9kcy5wbGF5bm9pc2Uoc2VsZilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sIDEwMDApXG4gICAgICAgIHNlbGYua2V5ID0ga3NQYXVzZVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g6K6h5pe25ZmoXG4gICAgdGltZXIoc2VsZikge1xuICAgICAgc2VsZi50b3VjaG1vdmUgPSBmYWxzZVxuICAgICAgaWYgKHNlbGYua2V5ID09PSBrc1N0YXJ0IHx8IHNlbGYua2V5ID09PSBrc0NvbnRpbnVlKSB7XG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi50aWNrLS1cbiAgICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgICAgd2VweS5nZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSh7XG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgIT09IDEpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm1ldGhvZHMucGxheW5vaXNlKHNlbGYpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChzZWxmLnRpY2sgPT09IHRpbWVMb3dsaW1pdCkge1xuICAgICAgICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgICAgICAgdG91Y2htb3ZlOiB0cnVlLFxuICAgICAgICAgICAgICBjaXJjbGVjb2xvcjogJ3JnYmEoMCwgMCwgMCwgMCknLFxuICAgICAgICAgICAgICBrZXk6IGtzU3RhcnQsXG4gICAgICAgICAgICAgIHRpY2s6IGluaXRpYWxUaW1lICogc2Vjb25kc1Blck1pbixcbiAgICAgICAgICAgICAgdGltZTogaW5pdGlhbFRpbWVUZXh0XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgd2VweS5zdG9wQmFja2dyb3VuZEF1ZGlvKClcbiAgICAgICAgICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgICAgICAgICAgc2VsZi50aWNrID0gaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICBzZWxmLnRvdWNobW92ZSA9IHRydWVcbiAgICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSgwLCAwLCAwLCAwKSdcbiAgICAgICAgICAgIHNlbGYua2V5ID0ga3NTdGFydFxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDApXG4gICAgICAgIHNlbGYua2V5ID0ga3NQYXVzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2VweS5wYXVzZUJhY2tncm91bmRBdWRpbygpXG4gICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgc2VsZi5rZXkgPSBrc0NvbnRpbnVlXG4gICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSgyNTUsIDI1NSwgMCwgMCknXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDliLfmlrDml7bpl7RcbiAgICBzZXRUaW1lKHNlbGYsIHRpY2spIHtcbiAgICAgIGxldCBjdXJyZW50VGltZSA9IHNlbGYubWV0aG9kcy5jdXJyZW50VGltZShzZWxmLnRpY2spXG4gICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICB0aW1lOiBjdXJyZW50VGltZVxuICAgICAgfSlcbiAgICAgIHNlbGYudGltZSA9IGN1cnJlbnRUaW1lXG4gICAgfSxcbiAgICB0aW1lckVuZCgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgIHdlcHkuc3RvcEJhY2tncm91bmRBdWRpbygpXG4gICAgICBzZWxmLmtleSA9IGtzU3RhcnRcbiAgICAgIHNlbGYudGljayA9IGluaXRpYWxUaW1lICogc2Vjb25kc1Blck1pblxuICAgICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgICBzZWxmLnRvdWNobW92ZSA9IHRydWVcbiAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSgwLCAwLCAwLCAwKSdcbiAgICAgIHNlbGYuc2hhZG93Y29sb3IgPSAnIzMzMzMzMydcbiAgICB9LFxuICAgIC8vIOiuoeeul+aXtumXtOWPiui+k+WHuuagvOW8j1xuICAgIGN1cnJlbnRUaW1lKHRpY2spIHtcbiAgICAgIGxldCBtaW4gPSAodGljayAtICh0aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pblxuICAgICAgbGV0IHNlYyA9IHRpY2sgJSBzZWNvbmRzUGVyTWluXG4gICAgICBpZiAobWluID4gdGltZVVwbGltaXQpIHtcbiAgICAgICAgcmV0dXJuICfiiJ4nXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobWluIDwgMTApIHtcbiAgICAgICAgICBtaW4gPSAnMCcgKyBtaW5cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VjIDwgMTApIHtcbiAgICAgICAgICBzZWMgPSAnMCcgKyBzZWNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluICsgJyA6ICcgKyBzZWNcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvdWNoc3RhcnQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLnN0YXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICB9LFxuICAgIHRvdWNobW92ZShlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuY3VyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgICBzZWxmLmNoYW5nZVBvaW50KytcbiAgICAgIGlmIChzZWxmLnRvdWNobW92ZSkge1xuICAgICAgICBzZWxmLm1ldGhvZHMudGltZUNoYW5nZShzZWxmKVxuICAgICAgfVxuICAgIH0sXG4gICAgdG91Y2hlbmQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBpZiAoc2VsZi50b3VjaG1vdmUpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLmltYWdlQ2hhbmdlKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDkuIrkuIvmu5HliqjosIPoioLml7bpl7RcbiAgICB0aW1lQ2hhbmdlKHNlbGYpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt4UG9zXSAtIHNlbGYuc3RhclBvaW50W3hQb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeVBvc10gLSBzZWxmLnN0YXJQb2ludFt5UG9zXVxuICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpIDwgTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VUaW1lUG9pbnQpIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt5UG9zXSA+IHNlbGYuc3RhclBvaW50W3lQb3NdICYmIHNlbGYudGljayA+IDApIHtcbiAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayAtIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3lQb3NdIDwgc2VsZi5zdGFyUG9pbnRbeVBvc10pIHtcbiAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayArIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDlt6blj7Pmu5HliqjosIPoioLlm77niYdcbiAgICBpbWFnZUNoYW5nZShzZWxmKSB7XG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeFBvc10gLSBzZWxmLnN0YXJQb2ludFt4UG9zXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50W3lQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeVBvc11cbiAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID4gY2hhbmdlSW1hZ2VQb2ludCkge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3hQb3NdID4gc2VsZi5zdGFyUG9pbnRbeFBvc10pIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBHT0xEOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgVFJFRTpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn5a+66ZKfJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gR09MRFxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDI1NSwgMCwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlR29sZFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgV0FURVI6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+ajruaelydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFRSRUVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VUcmVlXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBGSVJFOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfpm6jmsLQnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBXQVRFUlxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VXYXRlclxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgU09JTDpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn56+d54GrJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gRklSRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZUZpcmVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuY3VyUG9pbnRbeFBvc10gPCBzZWxmLnN0YXJQb2ludFt4UG9zXSkge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlIEdPTEQ6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+ajruaelydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFRSRUVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VUcmVlXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBUUkVFOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfpm6jmsLQnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBXQVRFUlxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VXYXRlclxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgV0FURVI6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+evneeBqydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IEZJUkVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VGaXJlXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBGSVJFOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfmtarmva4nXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBTT0lMXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDIzOCwgOTksIDk5LCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VTb2lsXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBTT0lMOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcGxheW5vaXNlKHNlbGYpIHtcbiAgICAgIHdlcHkucGxheUJhY2tncm91bmRBdWRpbyh7XG4gICAgICAgIGRhdGFVcmw6IHNlbGYubm9pc2VcbiAgICAgIH0pXG4gICAgfSxcbiAgICBjaXJjbGVDb2xvckNoYW5nZShzZWxmKSB7XG4gICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgIGNhc2UgR09MRDpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAwLjEpJ1xuICAgICAgICAgIHNlbGYuc2hhZG93Y29sb3IgPSAncmdiYSggMjU1LCAyNTUsIDAsIDEpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgVFJFRTpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4xKSdcbiAgICAgICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMSknXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBXQVRFUjpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMSknXG4gICAgICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAxKSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIEZJUkU6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMSknXG4gICAgICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDEpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgU09JTDpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDIzOCwgOTksIDk5LCAwLjEpJ1xuICAgICAgICAgIHNlbGYuc2hhZG93Y29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDEpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+W9kuW/gycsXG4gICAgICBkZXNjOiAn6YO95biC5Zan6Ze5IOS9leWkhOW9kuW/gycsXG4gICAgICBwYXRoOiAnL3BhZ2Uvbm9pc2UnXG4gICAgfVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBzZWxmLm1ldGhvZHMuZGF0ZShzZWxmKVxuICAgIC8vIHNlbGYuY2FsZW5kYXIuc29sYXIybHVuYXIoKVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2VsZi5zaG93SW1nZSA9IGZhbHNlXG4gICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICBzaG93SW1nZTogZmFsc2VcbiAgICAgIH0pXG4gICAgfSwgMjAwMClcbiAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgfVxufVxuIl19