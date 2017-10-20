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
      bgcolor: 'rgba(0, 255, 255, 0)',
      circlecolor: 'rgba(0, 0, 0, 0)',
      starPoint: [0, 0],
      curPoint: [0, 0],
      touches: [0, 0],
      noise: 'http://localhost:5000/雨.mp3',
      text: '森林'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld25vaXNlLmpzIl0sIm5hbWVzIjpbImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxUaW1lIiwic2Vjb25kc1Blck1pbiIsInRpbWVVcGxpbWl0IiwidGltZUxvd2xpbWl0Iiwia3NTdGFydCIsImtzUGF1c2UiLCJrc0NvbnRpbnVlIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwiR09MRCIsIlRSRUUiLCJXQVRFUiIsIkZJUkUiLCJTT0lMIiwibm9pc2VHb2xkIiwibm9pc2VUcmVlIiwibm9pc2VXYXRlciIsIm5vaXNlRmlyZSIsIm5vaXNlU29pbCIsInRpbWVyIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1hcmsiLCJkYXRlcyIsInNob3dJbWdlIiwidGljayIsInRpbWUiLCJrZXkiLCJrU3RhdHVzIiwiZW5kS2V5IiwidG91Y2htb3ZlIiwiY2hhbmdlUG9pbnQiLCJpbWFnZU5vZGUiLCJiZ2NvbG9yIiwiY2lyY2xlY29sb3IiLCJzdGFyUG9pbnQiLCJjdXJQb2ludCIsInRvdWNoZXMiLCJub2lzZSIsInRleHQiLCJtZXRob2RzIiwiZGF0ZSIsInNlbGYiLCJEYXRlIiwid2Vla3MiLCJ3ZWVrIiwiZ2V0VVRDRGF5Iiwid2Vla2QiLCJtb250aCIsImdldE1vbnRoIiwibW9udGhzIiwibW9uIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1pbiIsImNpcmNsZUNvbG9yQ2hhbmdlIiwicGxheW5vaXNlIiwic2V0SW50ZXJ2YWwiLCJzZXRUaW1lIiwiZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUiLCJzdWNjZXNzIiwicmVzIiwic3RhdHVzIiwic2V0RGF0YSIsInN0b3BCYWNrZ3JvdW5kQXVkaW8iLCJjbGVhckludGVydmFsIiwicGF1c2VCYWNrZ3JvdW5kQXVkaW8iLCJjdXJyZW50VGltZSIsInRpbWVyRW5kIiwic2VjIiwidG91Y2hzdGFydCIsImUiLCJwYWdlWCIsInBhZ2VZIiwidGltZUNoYW5nZSIsInRvdWNoZW5kIiwiaW1hZ2VDaGFuZ2UiLCJ4Y2hhbmdlIiwieWNoYW5nZSIsIk1hdGgiLCJhYnMiLCJwbGF5QmFja2dyb3VuZEF1ZGlvIiwiZGF0YVVybCIsInRpdGxlIiwiZGVzYyIsInBhdGgiLCJzZXRUaW1lb3V0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGtCQUFrQixTQUF4QjtBQUNBLElBQU1DLGNBQWMsRUFBcEI7QUFDQSxJQUFNQyxnQkFBZ0IsRUFBdEI7QUFDQSxJQUFNQyxjQUFjLEVBQXBCO0FBQ0EsSUFBTUMsZUFBZSxDQUFyQjtBQUNBLElBQU1DLFVBQVUsQ0FBaEI7QUFDQSxJQUFNQyxVQUFVLENBQWhCO0FBQ0EsSUFBTUMsYUFBYSxDQUFuQjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLGtCQUFrQixDQUF4QjtBQUNBLElBQU1DLG1CQUFtQixDQUF6QjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLFFBQVEsT0FBZDtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLFlBQVkscUNBQWxCO0FBQ0EsSUFBTUMsWUFBWSxxQ0FBbEI7QUFDQSxJQUFNQyxhQUFhLHFDQUFuQjtBQUNBLElBQU1DLFlBQVkscUNBQWxCO0FBQ0EsSUFBTUMsWUFBWSxxQ0FBbEI7O0FBRUEsSUFBSUMsZUFBSjs7SUFFcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxZQUFNLG9CQUREO0FBRUxDLGFBQU8sRUFGRjtBQUdMQyxnQkFBVSxLQUhMO0FBSUxDLFlBQU0sQ0FKRDtBQUtMQyxZQUFNLEVBTEQ7QUFNTEMsV0FBSzNCLE9BTkE7QUFPTDRCLGVB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LEdBQVkvQixlQUFaO0FBQ0ErQyxXQUFLakIsSUFBTCxHQUFZN0IsY0FBY0MsYUFBMUI7QUFDRDs7OztFQWpSZ0MsZUFBSzRGLEk7O2tCQUFuQnZFLEsiLCJmaWxlIjoibmV3bm9pc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmNvbnN0IGluaXRpYWxUaW1lVGV4dCA9ICcyMCA6IDAwJ1xuY29uc3QgaW5pdGlhbFRpbWUgPSAyMFxuY29uc3Qgc2Vjb25kc1Blck1pbiA9IDYwXG5jb25zdCB0aW1lVXBsaW1pdCA9IDYwXG5jb25zdCB0aW1lTG93bGltaXQgPSAwXG5jb25zdCBrc1N0YXJ0ID0gMFxuY29uc3Qga3NQYXVzZSA9IDFcbmNvbnN0IGtzQ29udGludWUgPSAyXG5jb25zdCB4UG9zID0gMFxuY29uc3QgeVBvcyA9IDFcbmNvbnN0IGNoYW5nZVRpbWVQb2ludCA9IDVcbmNvbnN0IGNoYW5nZUltYWdlUG9pbnQgPSA1XG5jb25zdCBHT0xEID0gJ2dvbGQnXG5jb25zdCBUUkVFID0gJ3RyZWUnXG5jb25zdCBXQVRFUiA9ICd3YXRlcidcbmNvbnN0IEZJUkUgPSAnZmlyZSdcbmNvbnN0IFNPSUwgPSAnc29pbCdcbmNvbnN0IG5vaXNlR29sZCA9ICdodHRwOi8vbG9jYWxob3N0OjUwMDAvJUU5JTkyJTlGLm1wMydcbmNvbnN0IG5vaXNlVHJlZSA9ICdodHRwOi8vbG9jYWxob3N0OjUwMDAvJUU2JUEzJUFFLm1wMydcbmNvbnN0IG5vaXNlV2F0ZXIgPSAnaHR0cDovL2xvY2FsaG9zdDo1MDAwLyVFOSU5QiVBOC5tcDMnXG5jb25zdCBub2lzZUZpcmUgPSAnaHR0cDovL2xvY2FsaG9zdDo1MDAwLyVFNyU4MSVBQi5tcDMnXG5jb25zdCBub2lzZVNvaWwgPSAnaHR0cDovL2xvY2FsaG9zdDo1MDAwLyVFNiVCRCVBRS5tcDMnXG5cbmxldCB0aW1lclxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5b2S5b+DJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbWFyazogJy4uL2ltYWdlL3dhdGVyLnBuZycsXG4gICAgZGF0ZXM6ICcnLFxuICAgIHNob3dJbWdlOiBmYWxzZSxcbiAgICB0aWNrOiAwLFxuICAgIHRpbWU6ICcnLFxuICAgIGtleToga3NTdGFydCxcbiAgICBrU3RhdHVzOiBbJ+W8gOWniycsICfmmoLlgZwnLCAn57un57utJ10sXG4gICAgZW5kS2V5OiAn57uT5p2fJyxcbiAgICB0b3VjaG1vdmU6IHRydWUsXG4gICAgY2hhbmdlUG9pbnQ6IDAsXG4gICAgaW1hZ2VOb2RlOiBXQVRFUixcbiAgICBiZ2NvbG9yOiAncmdiYSgwLCAyNTUsIDI1NSwgMCknLFxuICAgIGNpcmNsZWNvbG9yOiAncmdiYSgwLCAwLCAwLCAwKScsXG4gICAgc3RhclBvaW50OiBbMCwgMF0sXG4gICAgY3VyUG9pbnQ6IFswLCAwXSxcbiAgICB0b3VjaGVzOiBbMCwgMF0sXG4gICAgbm9pc2U6ICdodHRwOi8vbG9jYWxob3N0OjUwMDAv6ZuoLm1wMycsXG4gICAgdGV4dDogJ+ajruaelydcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGRhdGUoc2VsZikge1xuICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICBjb25zdCB3ZWVrcyA9IFsnU3VuJywgJ01vbicsICdUdWVzJywgJ1dlZCcsICdUaHVyJywgJ0ZyaScsICdTYXQnXVxuICAgICAgY29uc3Qgd2VlayA9IGRhdGUuZ2V0VVRDRGF5KClcbiAgICAgIGNvbnN0IHdlZWtkID0gd2Vla3Nbd2Vla11cbiAgICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpXG4gICAgICBjb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1ZycsICdTZXB0JywgJ09jdCcsICdOb3YnLCAnRGVjJ11cbiAgICAgIGNvbnN0IG1vbiA9IG1vbnRoc1ttb250aF1cbiAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpXG4gICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgICBzZWxmLmRhdGVzID0gbW9uICsgJyAnICsgZGF5ICsgJyAnICsgd2Vla2QgKyAnICcgKyB5ZWFyXG4gICAgfSxcbiAgICAvLyDliKTmlq3mmK/lkKblvIDlkK/orqHml7blmahcbiAgICB0aW1lKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBsZXQgbWluID0gKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluXG4gICAgICBzZWxmLm1ldGhvZHMuY2lyY2xlQ29sb3JDaGFuZ2Uoc2VsZilcbiAgICAgIHNlbGYubWV0aG9kcy5wbGF5bm9pc2Uoc2VsZilcbiAgICAgIGlmIChtaW4gPiB0aW1lTG93bGltaXQgJiYgbWluIDw9IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lcihzZWxmKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5rZXkgPSBrc1BhdXNlXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDorqHml7blmahcbiAgICB0aW1lcihzZWxmKSB7XG4gICAgICBzZWxmLnRvdWNobW92ZSA9IGZhbHNlXG4gICAgICBpZiAoc2VsZi5rZXkgPT09IGtzU3RhcnQgfHwgc2VsZi5rZXkgPT09IGtzQ29udGludWUpIHtcbiAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnRpY2stLVxuICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICB3ZXB5LmdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLnN0YXR1cyAhPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlbGYubWV0aG9kcy5wbGF5bm9pc2Uoc2VsZilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKHNlbGYudGljayA9PT0gdGltZUxvd2xpbWl0KSB7XG4gICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgICB0b3VjaG1vdmU6IHRydWUsXG4gICAgICAgICAgICAgIGNpcmNsZWNvbG9yOiAncmdiYSgwLCAwLCAwLCAwKScsXG4gICAgICAgICAgICAgIGtleToga3NTdGFydCxcbiAgICAgICAgICAgICAgdGljazogaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluLFxuICAgICAgICAgICAgICB0aW1lOiBpbml0aWFsVGltZVRleHRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB3ZXB5LnN0b3BCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgICAgICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYudG91Y2htb3ZlID0gdHJ1ZVxuICAgICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDApJ1xuICAgICAgICAgICAgc2VsZi5rZXkgPSBrc1N0YXJ0XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMClcbiAgICAgICAgc2VsZi5rZXkgPSBrc1BhdXNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3ZXB5LnBhdXNlQmFja2dyb3VuZEF1ZGlvKClcbiAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICBzZWxmLmtleSA9IGtzQ29udGludWVcbiAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKDI1NSwgMjU1LCAwLCAwLjEpJ1xuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5Yi35paw5pe26Ze0XG4gICAgc2V0VGltZShzZWxmLCB0aWNrKSB7XG4gICAgICBsZXQgY3VycmVudFRpbWUgPSBzZWxmLm1ldGhvZHMuY3VycmVudFRpbWUoc2VsZi50aWNrKVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgIH0pXG4gICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgIH0sXG4gICAgdGltZXJFbmQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICB3ZXB5LnN0b3BCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgc2VsZi5rZXkgPSBrc1N0YXJ0XG4gICAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgICAgc2VsZi50b3VjaG1vdmUgPSB0cnVlXG4gICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMCknXG4gICAgfSxcbiAgICAvLyDorqHnrpfml7bpl7Tlj4rovpPlh7rmoLzlvI9cbiAgICBjdXJyZW50VGltZSh0aWNrKSB7XG4gICAgICBsZXQgbWluID0gKHRpY2sgLSAodGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW5cbiAgICAgIGxldCBzZWMgPSB0aWNrICUgc2Vjb25kc1Blck1pblxuICAgICAgaWYgKG1pbiA+IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgIHJldHVybiAn4oieJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1pbiA8IDEwKSB7XG4gICAgICAgICAgbWluID0gJzAnICsgbWluXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlYyA8IDEwKSB7XG4gICAgICAgICAgc2VjID0gJzAnICsgc2VjXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbiArICc6JyArIHNlY1xuICAgICAgfVxuICAgIH0sXG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICAgIHNlbGYuY2hhbmdlUG9pbnQrK1xuICAgICAgaWYgKHNlbGYudG91Y2htb3ZlKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lQ2hhbmdlKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICB0b3VjaGVuZChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGlmIChzZWxmLnRvdWNobW92ZSkge1xuICAgICAgICBzZWxmLm1ldGhvZHMuaW1hZ2VDaGFuZ2Uoc2VsZilcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOS4iuS4i+a7keWKqOiwg+iKguaXtumXtFxuICAgIHRpbWVDaGFuZ2Uoc2VsZikge1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50W3hQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeFBvc11cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt5UG9zXSAtIHNlbGYuc3RhclBvaW50W3lQb3NdXG4gICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPCBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA+IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3lQb3NdID4gc2VsZi5zdGFyUG9pbnRbeVBvc10gJiYgc2VsZi50aWNrID4gMCkge1xuICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrIC0gc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeVBvc10gPCBzZWxmLnN0YXJQb2ludFt5UG9zXSkge1xuICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrICsgc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOW3puWPs+a7keWKqOiwg+iKguWbvueJh1xuICAgIGltYWdlQ2hhbmdlKHNlbGYpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt4UG9zXSAtIHNlbGYuc3RhclBvaW50W3hQb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeVBvc10gLSBzZWxmLnN0YXJQb2ludFt5UG9zXVxuICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID4gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VJbWFnZVBvaW50KSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeFBvc10gPiBzZWxmLnN0YXJQb2ludFt4UG9zXSkge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlIEdPTEQ6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBUUkVFOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9nb2xkLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IEdPTERcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlR29sZFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgV0FURVI6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gVFJFRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlVHJlZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgRklSRTpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvd2F0ZXIucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gV0FURVJcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VXYXRlclxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgU09JTDpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZmlyZS5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBGSVJFXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VGaXJlXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfSBlbHNlIGlmIChzZWxmLmN1clBvaW50W3hQb3NdIDwgc2VsZi5zdGFyUG9pbnRbeFBvc10pIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBHT0xEOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS90cmVlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFRSRUVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZVRyZWVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFRSRUU6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3dhdGVyLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFdBVEVSXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlV2F0ZXJcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFdBVEVSOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9maXJlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IEZJUkVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZUZpcmVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIEZJUkU6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3NvaWwucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gU09JTFxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyMzgsIDk5LCA5OSwgMC4zKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VTb2lsXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBTT0lMOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcGxheW5vaXNlKHNlbGYpIHtcbiAgICAgIHdlcHkucGxheUJhY2tncm91bmRBdWRpbyh7XG4gICAgICAgIGRhdGFVcmw6IHNlbGYubm9pc2VcbiAgICAgIH0pXG4gICAgfSxcbiAgICBjaXJjbGVDb2xvckNoYW5nZShzZWxmKSB7XG4gICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgIGNhc2UgR09MRDpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgVFJFRTpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFdBVEVSOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIEZJUkU6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMyknXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBTT0lMOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDAuMyknXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5b2S5b+DJyxcbiAgICAgIGRlc2M6ICfpg73luILllqfpl7kg5L2V5aSE5b2S5b+DJyxcbiAgICAgIHBhdGg6ICcvcGFnZS9ub2lzZSdcbiAgICB9XG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIHNlbGYubWV0aG9kcy5kYXRlKHNlbGYpXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLnNob3dJbWdlID0gZmFsc2VcbiAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgIHNob3dJbWdlOiBmYWxzZVxuICAgICAgfSlcbiAgICB9LCAyMDAwKVxuICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgIHNlbGYudGljayA9IGluaXRpYWxUaW1lICogc2Vjb25kc1Blck1pblxuICB9XG59XG4iXX0=