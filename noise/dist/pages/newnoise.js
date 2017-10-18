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
      showImge: false,
      tick: 0,
      time: '',
      key: ksStart,
      kStatus: ['开始', '暂停', '继续'],
      endKey: '结束',
      touchmove: true,
      changePoint: 0,
      imageNode: WATER,
      bgcolor: 'rgba(0, 255, 255, 0.3)',
      circlecolor: 'rgba(0, 0, 0, 0)',
      starPoint: [0, 0],
      curPoint: [0, 0],
      touches: [0, 0],
      noise: 'http://localhost:5000/雨.mp3'
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
          self.circlecolor = 'rgba(255, 255, 0, 0.1)';
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
          return min + ':' + sec;
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
                  self.mark = '../image/gold.png';
                  self.imageNode = GOLD;
                  self.bgcolor = 'rgba( 255, 255, 0, 0.3)';
                  self.noise = noiseGold;
                  break;
                case WATER:
                  self.mark = '../image/tree.png';
                  self.imageNode = TREE;
                  self.bgcolor = 'rgba( 0, 255, 0, 0.3)';
                  self.noise = noiseTree;
                  break;
                case FIRE:
                  self.mark = '../image/water.png';
                  self.imageNode = WATER;
                  self.bgcolor = 'rgba(0, 255, 255, 0.3)';
                  self.noise = noiseWater;
                  break;
                case SOIL:
                  self.mark = '../image/fire.png';
                  self.imageNode = FIRE;
                  self.bgcolor = 'rgba( 255, 0, 0, 0.3)';
                  self.noise = noiseFire;
                  break;
              }
              self.changePoint = 0;
            } else if (self.curPoint[xPos] < self.starPoint[xPos]) {
              switch (self.imageNode) {
                case GOLD:
                  self.mark = '../image/tree.png';
                  self.imageNode = TREE;
                  self.bgcolor = 'rgba( 0, 255, 0, 0.3)';
                  self.noise = noiseTree;
                  break;
                case TREE:
                  self.mark = '../image/water.png';
                  self.imageNode = WATER;
                  self.bgcolor = 'rgba(0, 255, 255, 0.3)';
                  self.noise = noiseWater;
                  break;
                case WATER:
                  self.mark = '../image/fire.png';
                  self.imageNode = FIRE;
                  self.bgcolor = 'rgba( 255, 0, 0, 0.3)';
                  self.noise = noiseFire;
                  break;
                case FIRE:
                  self.mark = '../image/soil.png';
                  self.imageNode = SOIL;
                  self.bgcolor = 'rgba( 238, 99, 99, 0.3)';
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
            self.circlecolor = 'rgba( 255, 255, 0, 0.3)';
            break;
          case TREE:
            self.circlecolor = 'rgba( 0, 255, 0, 0.3)';
            break;
          case WATER:
            self.circlecolor = 'rgba(0, 255, 255, 0.3)';
            break;
          case FIRE:
            self.circlecolor = 'rgba( 255, 0, 0, 0.3)';
            break;
          case SOIL:
            self.circlecolor = 'rgba( 238, 99, 99, 0.3)';
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld25vaXNlLmpzIl0sIm5hbWVzIjpbImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxUaW1lIiwic2Vjb25kc1Blck1pbiIsInRpbWVVcGxpbWl0IiwidGltZUxvd2xpbWl0Iiwia3NTdGFydCIsImtzUGF1c2UiLCJrc0NvbnRpbnVlIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwiR09MRCIsIlRSRUUiLCJXQVRFUiIsIkZJUkUiLCJTT0lMIiwibm9pc2VHb2xkIiwibm9pc2VUcmVlIiwibm9pc2VXYXRlciIsIm5vaXNlRmlyZSIsIm5vaXNlU29pbCIsInRpbWVyIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1hcmsiLCJkYXRlcyIsInNob3dJbWdlIiwidGljayIsInRpbWUiLCJrZXkiLCJrU3RhdHVzIiwiZW5kS2V5IiwidG91Y2htb3ZlIiwiY2hhbmdlUG9pbnQiLCJpbWFnZU5vZGUiLCJiZ2NvbG9yIiwiY2lyY2xlY29sb3IiLCJzdGFyUG9pbnQiLCJjdXJQb2ludCIsInRvdWNoZXMiLCJub2lzZSIsIm1ldGhvZHMiLCJkYXRlIiwic2VsZiIsIkRhdGUiLCJ3ZWVrcyIsIndlZWsiLCJnZXRVVENEYXkiLCJ3ZWVrZCIsIm1vbnRoIiwiZ2V0TW9udGgiLCJtb250aHMiLCJtb24iLCJkYXkiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibWluIiwiY2lyY2xlQ29sb3JDaGFuZ2UiLCJwbGF5bm9pc2UiLCJzZXRJbnRlcnZhbCIsInNldFRpbWUiLCJnZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSIsInN1Y2Nlc3MiLCJyZXMiLCJzdGF0dXMiLCJzZXREYXRhIiwic3RvcEJhY2tncm91bmRBdWRpbyIsImNsZWFySW50ZXJ2YWwiLCJwYXVzZUJhY2tncm91bmRBdWRpbyIsImN1cnJlbnRUaW1lIiwidGltZXJFbmQiLCJzZWMiLCJ0b3VjaHN0YXJ0IiwiZSIsInBhZ2VYIiwicGFnZVkiLCJ0aW1lQ2hhbmdlIiwidG91Y2hlbmQiLCJpbWFnZUNoYW5nZSIsInhjaGFuZ2UiLCJ5Y2hhbmdlIiwiTWF0aCIsImFicyIsInBsYXlCYWNrZ3JvdW5kQXVkaW8iLCJkYXRhVXJsIiwidGl0bGUiLCJkZXNjIiwicGF0aCIsInNldFRpbWVvdXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsa0JBQWtCLFNBQXhCO0FBQ0EsSUFBTUMsY0FBYyxFQUFwQjtBQUNBLElBQU1DLGdCQUFnQixFQUF0QjtBQUNBLElBQU1DLGNBQWMsRUFBcEI7QUFDQSxJQUFNQyxlQUFlLENBQXJCO0FBQ0EsSUFBTUMsVUFBVSxDQUFoQjtBQUNBLElBQU1DLFVBQVUsQ0FBaEI7QUFDQSxJQUFNQyxhQUFhLENBQW5CO0FBQ0EsSUFBTUMsT0FBTyxDQUFiO0FBQ0EsSUFBTUMsT0FBTyxDQUFiO0FBQ0EsSUFBTUMsa0JBQWtCLENBQXhCO0FBQ0EsSUFBTUMsbUJBQW1CLENBQXpCO0FBQ0EsSUFBTUMsT0FBTyxNQUFiO0FBQ0EsSUFBTUMsT0FBTyxNQUFiO0FBQ0EsSUFBTUMsUUFBUSxPQUFkO0FBQ0EsSUFBTUMsT0FBTyxNQUFiO0FBQ0EsSUFBTUMsT0FBTyxNQUFiO0FBQ0EsSUFBTUMsWUFBWSxxQ0FBbEI7QUFDQSxJQUFNQyxZQUFZLHFDQUFsQjtBQUNBLElBQU1DLGFBQWEscUNBQW5CO0FBQ0EsSUFBTUMsWUFBWSxxQ0FBbEI7QUFDQSxJQUFNQyxZQUFZLHFDQUFsQjs7QUFFQSxJQUFJQyxlQUFKOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFlBQU0sb0JBREQ7QUFFTEMsYUFBTyxFQUZGO0FBR0xDLGdCQUFVLEtBSEw7QUFJTEMsWUFBTSxDQUpEO0FBS0xDLFlBQU0sRUFMRDtBQU1MQyxXQUFLM0IsT0FOQTtBQU9MNEIsZUFBUyxDQUFD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LEdBQVk3QixjQUFjQyxhQUExQjtBQUNEOzs7O0VBaFJnQyxlQUFLMkYsSTs7a0JBQW5CdEUsSyIsImZpbGUiOiJuZXdub2lzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuY29uc3QgaW5pdGlhbFRpbWVUZXh0ID0gJzIwIDogMDAnXG5jb25zdCBpbml0aWFsVGltZSA9IDIwXG5jb25zdCBzZWNvbmRzUGVyTWluID0gNjBcbmNvbnN0IHRpbWVVcGxpbWl0ID0gNjBcbmNvbnN0IHRpbWVMb3dsaW1pdCA9IDBcbmNvbnN0IGtzU3RhcnQgPSAwXG5jb25zdCBrc1BhdXNlID0gMVxuY29uc3Qga3NDb250aW51ZSA9IDJcbmNvbnN0IHhQb3MgPSAwXG5jb25zdCB5UG9zID0gMVxuY29uc3QgY2hhbmdlVGltZVBvaW50ID0gNVxuY29uc3QgY2hhbmdlSW1hZ2VQb2ludCA9IDVcbmNvbnN0IEdPTEQgPSAnZ29sZCdcbmNvbnN0IFRSRUUgPSAndHJlZSdcbmNvbnN0IFdBVEVSID0gJ3dhdGVyJ1xuY29uc3QgRklSRSA9ICdmaXJlJ1xuY29uc3QgU09JTCA9ICdzb2lsJ1xuY29uc3Qgbm9pc2VHb2xkID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTklOTIlOUYubXAzJ1xuY29uc3Qgbm9pc2VUcmVlID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTYlQTMlQUUubXAzJ1xuY29uc3Qgbm9pc2VXYXRlciA9ICdodHRwOi8vbG9jYWxob3N0OjUwMDAvJUU5JTlCJUE4Lm1wMydcbmNvbnN0IG5vaXNlRmlyZSA9ICdodHRwOi8vbG9jYWxob3N0OjUwMDAvJUU3JTgxJUFCLm1wMydcbmNvbnN0IG5vaXNlU29pbCA9ICdodHRwOi8vbG9jYWxob3N0OjUwMDAvJUU2JUJEJUFFLm1wMydcblxubGV0IHRpbWVyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflvZLlv4MnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBtYXJrOiAnLi4vaW1hZ2Uvd2F0ZXIucG5nJyxcbiAgICBkYXRlczogJycsXG4gICAgc2hvd0ltZ2U6IGZhbHNlLFxuICAgIHRpY2s6IDAsXG4gICAgdGltZTogJycsXG4gICAga2V5OiBrc1N0YXJ0LFxuICAgIGtTdGF0dXM6IFsn5byA5aeLJywgJ+aaguWBnCcsICfnu6fnu60nXSxcbiAgICBlbmRLZXk6ICfnu5PmnZ8nLFxuICAgIHRvdWNobW92ZTogdHJ1ZSxcbiAgICBjaGFuZ2VQb2ludDogMCxcbiAgICBpbWFnZU5vZGU6IFdBVEVSLFxuICAgIGJnY29sb3I6ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJyxcbiAgICBjaXJjbGVjb2xvcjogJ3JnYmEoMCwgMCwgMCwgMCknLFxuICAgIHN0YXJQb2ludDogWzAsIDBdLFxuICAgIGN1clBvaW50OiBbMCwgMF0sXG4gICAgdG91Y2hlczogWzAsIDBdLFxuICAgIG5vaXNlOiAnaHR0cDovL2xvY2FsaG9zdDo1MDAwL+mbqC5tcDMnXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBkYXRlKHNlbGYpIHtcbiAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgY29uc3Qgd2Vla3MgPSBbJ1N1bicsICdNb24nLCAnVHVlcycsICdXZWQnLCAnVGh1cicsICdGcmknLCAnU2F0J11cbiAgICAgIGNvbnN0IHdlZWsgPSBkYXRlLmdldFVUQ0RheSgpXG4gICAgICBjb25zdCB3ZWVrZCA9IHdlZWtzW3dlZWtdXG4gICAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICAgICAgY29uc3QgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWcnLCAnU2VwdCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgICBjb25zdCBtb24gPSBtb250aHNbbW9udGhdXG4gICAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICAgICAgc2VsZi5kYXRlcyA9IG1vbiArICcgJyArIGRheSArICcgJyArIHdlZWtkICsgJyAnICsgeWVhclxuICAgIH0sXG4gICAgLy8g5Yik5pat5piv5ZCm5byA5ZCv6K6h5pe25ZmoXG4gICAgdGltZSgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgbGV0IG1pbiA9IChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pblxuICAgICAgc2VsZi5tZXRob2RzLmNpcmNsZUNvbG9yQ2hhbmdlKHNlbGYpXG4gICAgICBzZWxmLm1ldGhvZHMucGxheW5vaXNlKHNlbGYpXG4gICAgICBpZiAobWluID4gdGltZUxvd2xpbWl0ICYmIG1pbiA8PSB0aW1lVXBsaW1pdCkge1xuICAgICAgICBzZWxmLm1ldGhvZHMudGltZXIoc2VsZilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYua2V5ID0ga3NQYXVzZVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g6K6h5pe25ZmoXG4gICAgdGltZXIoc2VsZikge1xuICAgICAgc2VsZi50b3VjaG1vdmUgPSBmYWxzZVxuICAgICAgaWYgKHNlbGYua2V5ID09PSBrc1N0YXJ0IHx8IHNlbGYua2V5ID09PSBrc0NvbnRpbnVlKSB7XG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi50aWNrLS1cbiAgICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgICAgd2VweS5nZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSh7XG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgIT09IDEpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm1ldGhvZHMucGxheW5vaXNlKHNlbGYpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChzZWxmLnRpY2sgPT09IHRpbWVMb3dsaW1pdCkge1xuICAgICAgICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgICAgICAgdG91Y2htb3ZlOiB0cnVlLFxuICAgICAgICAgICAgICBjaXJjbGVjb2xvcjogJ3JnYmEoMCwgMCwgMCwgMCknLFxuICAgICAgICAgICAgICBrZXk6IGtzU3RhcnQsXG4gICAgICAgICAgICAgIHRpY2s6IGluaXRpYWxUaW1lICogc2Vjb25kc1Blck1pbixcbiAgICAgICAgICAgICAgdGltZTogaW5pdGlhbFRpbWVUZXh0XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgd2VweS5zdG9wQmFja2dyb3VuZEF1ZGlvKClcbiAgICAgICAgICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgICAgICAgICAgc2VsZi50aWNrID0gaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICBzZWxmLnRvdWNobW92ZSA9IHRydWVcbiAgICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSgwLCAwLCAwLCAwKSdcbiAgICAgICAgICAgIHNlbGYua2V5ID0ga3NTdGFydFxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDApXG4gICAgICAgIHNlbGYua2V5ID0ga3NQYXVzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2VweS5wYXVzZUJhY2tncm91bmRBdWRpbygpXG4gICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgc2VsZi5rZXkgPSBrc0NvbnRpbnVlXG4gICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSgyNTUsIDI1NSwgMCwgMC4xKSdcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOWIt+aWsOaXtumXtFxuICAgIHNldFRpbWUoc2VsZiwgdGljaykge1xuICAgICAgbGV0IGN1cnJlbnRUaW1lID0gc2VsZi5tZXRob2RzLmN1cnJlbnRUaW1lKHNlbGYudGljaylcbiAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgIHRpbWU6IGN1cnJlbnRUaW1lXG4gICAgICB9KVxuICAgICAgc2VsZi50aW1lID0gY3VycmVudFRpbWVcbiAgICB9LFxuICAgIHRpbWVyRW5kKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgd2VweS5zdG9wQmFja2dyb3VuZEF1ZGlvKClcbiAgICAgIHNlbGYua2V5ID0ga3NTdGFydFxuICAgICAgc2VsZi50aWNrID0gaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluXG4gICAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICAgIHNlbGYudG91Y2htb3ZlID0gdHJ1ZVxuICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDApJ1xuICAgIH0sXG4gICAgLy8g6K6h566X5pe26Ze05Y+K6L6T5Ye65qC85byPXG4gICAgY3VycmVudFRpbWUodGljaykge1xuICAgICAgbGV0IG1pbiA9ICh0aWNrIC0gKHRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluXG4gICAgICBsZXQgc2VjID0gdGljayAlIHNlY29uZHNQZXJNaW5cbiAgICAgIGlmIChtaW4gPiB0aW1lVXBsaW1pdCkge1xuICAgICAgICByZXR1cm4gJ+KInidcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtaW4gPCAxMCkge1xuICAgICAgICAgIG1pbiA9ICcwJyArIG1pblxuICAgICAgICB9XG4gICAgICAgIGlmIChzZWMgPCAxMCkge1xuICAgICAgICAgIHNlYyA9ICcwJyArIHNlY1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaW4gKyAnOicgKyBzZWNcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvdWNoc3RhcnQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLnN0YXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICB9LFxuICAgIHRvdWNobW92ZShlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuY3VyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgICBzZWxmLmNoYW5nZVBvaW50KytcbiAgICAgIGlmIChzZWxmLnRvdWNobW92ZSkge1xuICAgICAgICBzZWxmLm1ldGhvZHMudGltZUNoYW5nZShzZWxmKVxuICAgICAgfVxuICAgIH0sXG4gICAgdG91Y2hlbmQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBpZiAoc2VsZi50b3VjaG1vdmUpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLmltYWdlQ2hhbmdlKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDkuIrkuIvmu5HliqjosIPoioLml7bpl7RcbiAgICB0aW1lQ2hhbmdlKHNlbGYpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt4UG9zXSAtIHNlbGYuc3RhclBvaW50W3hQb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeVBvc10gLSBzZWxmLnN0YXJQb2ludFt5UG9zXVxuICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpIDwgTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VUaW1lUG9pbnQpIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt5UG9zXSA+IHNlbGYuc3RhclBvaW50W3lQb3NdICYmIHNlbGYudGljayA+IDApIHtcbiAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayAtIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3lQb3NdIDwgc2VsZi5zdGFyUG9pbnRbeVBvc10pIHtcbiAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayArIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDlt6blj7Pmu5HliqjosIPoioLlm77niYdcbiAgICBpbWFnZUNoYW5nZShzZWxmKSB7XG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeFBvc10gLSBzZWxmLnN0YXJQb2ludFt4UG9zXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50W3lQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeVBvc11cbiAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID4gY2hhbmdlSW1hZ2VQb2ludCkge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3hQb3NdID4gc2VsZi5zdGFyUG9pbnRbeFBvc10pIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBHT0xEOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgVFJFRTpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZ29sZC5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBHT0xEXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZUdvbGRcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFdBVEVSOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS90cmVlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFRSRUVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZVRyZWVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIEZJUkU6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3dhdGVyLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFdBVEVSXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlV2F0ZXJcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFNPSUw6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gRklSRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlRmlyZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5jdXJQb2ludFt4UG9zXSA8IHNlbGYuc3RhclBvaW50W3hQb3NdKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgR09MRDpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvdHJlZS5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBUUkVFXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VUcmVlXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBUUkVFOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBXQVRFUlxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZVdhdGVyXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBXQVRFUjpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZmlyZS5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBGSVJFXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VGaXJlXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBGSVJFOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9zb2lsLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFNPSUxcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDAuMyknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlU29pbFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgU09JTDpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHBsYXlub2lzZShzZWxmKSB7XG4gICAgICB3ZXB5LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xuICAgICAgICBkYXRhVXJsOiBzZWxmLm5vaXNlXG4gICAgICB9KVxuICAgIH0sXG4gICAgY2lyY2xlQ29sb3JDaGFuZ2Uoc2VsZikge1xuICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICBjYXNlIEdPTEQ6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAyNTUsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFRSRUU6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBXQVRFUjpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBGSVJFOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjMpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgU09JTDpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDIzOCwgOTksIDk5LCAwLjMpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+W9kuW/gycsXG4gICAgICBkZXNjOiAn6YO95biC5Zan6Ze5IOS9leWkhOW9kuW/gycsXG4gICAgICBwYXRoOiAnL3BhZ2Uvbm9pc2UnXG4gICAgfVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBzZWxmLm1ldGhvZHMuZGF0ZShzZWxmKVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2VsZi5zaG93SW1nZSA9IGZhbHNlXG4gICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICBzaG93SW1nZTogZmFsc2VcbiAgICAgIH0pXG4gICAgfSwgMjAwMClcbiAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgfVxufVxuIl19