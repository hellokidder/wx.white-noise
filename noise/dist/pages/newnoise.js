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

var initialTimeText = '20 分钟';
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
      bgcolor: 'rgba(0, 255, 255, 0.12)',
      circlecolor: 'rgba(0, 0, 0, 0)',
      starPoint: [0, 0],
      curPoint: [0, 0],
      touches: [0, 0],
      noise: 'http://localhost:5000/雨.mp3',
      text: '雨水'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld25vaXNlLmpzIl0sIm5hbWVzIjpbImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxUaW1lIiwic2Vjb25kc1Blck1pbiIsInRpbWVVcGxpbWl0IiwidGltZUxvd2xpbWl0Iiwia3NTdGFydCIsImtzUGF1c2UiLCJrc0NvbnRpbnVlIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwiR09MRCIsIlRSRUUiLCJXQVRFUiIsIkZJUkUiLCJTT0lMIiwibm9pc2VHb2xkIiwibm9pc2VUcmVlIiwibm9pc2VXYXRlciIsIm5vaXNlRmlyZSIsIm5vaXNlU29pbCIsInRpbWVyIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1hcmsiLCJkYXRlcyIsInNob3dJbWdlIiwidGljayIsInRpbWUiLCJrZXkiLCJrU3RhdHVzIiwiZW5kS2V5IiwidG91Y2htb3ZlIiwiY2hhbmdlUG9pbnQiLCJpbWFnZU5vZGUiLCJiZ2NvbG9yIiwiY2lyY2xlY29sb3IiLCJzdGFyUG9pbnQiLCJjdXJQb2ludCIsInRvdWNoZXMiLCJub2lzZSIsInRleHQiLCJtZXRob2RzIiwiZGF0ZSIsInNlbGYiLCJEYXRlIiwid2Vla3MiLCJ3ZWVrIiwiZ2V0VVRDRGF5Iiwid2Vla2QiLCJtb250aCIsImdldE1vbnRoIiwibW9udGhzIiwibW9uIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1pbiIsImNpcmNsZUNvbG9yQ2hhbmdlIiwicGxheW5vaXNlIiwic2V0SW50ZXJ2YWwiLCJzZXRUaW1lIiwiZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUiLCJzdWNjZXNzIiwicmVzIiwic3RhdHVzIiwic2V0RGF0YSIsInN0b3BCYWNrZ3JvdW5kQXVkaW8iLCJjbGVhckludGVydmFsIiwicGF1c2VCYWNrZ3JvdW5kQXVkaW8iLCJjdXJyZW50VGltZSIsInRpbWVyRW5kIiwic2VjIiwidG91Y2hzdGFydCIsImUiLCJwYWdlWCIsInBhZ2VZIiwidGltZUNoYW5nZSIsInRvdWNoZW5kIiwiaW1hZ2VDaGFuZ2UiLCJ4Y2hhbmdlIiwieWNoYW5nZSIsIk1hdGgiLCJhYnMiLCJwbGF5QmFja2dyb3VuZEF1ZGlvIiwiZGF0YVVybCIsInRpdGxlIiwiZGVzYyIsInBhdGgiLCJzZXRUaW1lb3V0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGtCQUFrQixPQUF4QjtBQUNBLElBQU1DLGNBQWMsRUFBcEI7QUFDQSxJQUFNQyxnQkFBZ0IsRUFBdEI7QUFDQSxJQUFNQyxjQUFjLEVBQXBCO0FBQ0EsSUFBTUMsZUFBZSxDQUFyQjtBQUNBLElBQU1DLFVBQVUsQ0FBaEI7QUFDQSxJQUFNQyxVQUFVLENBQWhCO0FBQ0EsSUFBTUMsYUFBYSxDQUFuQjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLGtCQUFrQixDQUF4QjtBQUNBLElBQU1DLG1CQUFtQixDQUF6QjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLFFBQVEsT0FBZDtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLFlBQVkscUNBQWxCO0FBQ0EsSUFBTUMsWUFBWSxxQ0FBbEI7QUFDQSxJQUFNQyxhQUFhLHFDQUFuQjtBQUNBLElBQU1DLFlBQVkscUNBQWxCO0FBQ0EsSUFBTUMsWUFBWSxxQ0FBbEI7O0FBRUEsSUFBSUMsZUFBSjs7SUFFcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxZQUFNLG9CQUREO0FBRUxDLGFBQU8sRUFGRjtBQUdMQyxnQkFBVSxLQUhMO0FBSUxDLFlBQU0sQ0FKRDtBQUtMQyxZQUFNLEVBTEQ7QUFNTEMsV0FBSzNCLE9BTkE7QUFPTDRCLGVB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akIsSUFBTCxHQUFZN0IsY0FBY0MsYUFBMUI7QUFDRDs7OztFQWpSZ0MsZUFBSzRGLEk7O2tCQUFuQnZFLEsiLCJmaWxlIjoibmV3bm9pc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmNvbnN0IGluaXRpYWxUaW1lVGV4dCA9ICcyMCDliIbpkp8nXG5jb25zdCBpbml0aWFsVGltZSA9IDIwXG5jb25zdCBzZWNvbmRzUGVyTWluID0gNjBcbmNvbnN0IHRpbWVVcGxpbWl0ID0gNjBcbmNvbnN0IHRpbWVMb3dsaW1pdCA9IDBcbmNvbnN0IGtzU3RhcnQgPSAwXG5jb25zdCBrc1BhdXNlID0gMVxuY29uc3Qga3NDb250aW51ZSA9IDJcbmNvbnN0IHhQb3MgPSAwXG5jb25zdCB5UG9zID0gMVxuY29uc3QgY2hhbmdlVGltZVBvaW50ID0gNVxuY29uc3QgY2hhbmdlSW1hZ2VQb2ludCA9IDVcbmNvbnN0IEdPTEQgPSAnZ29sZCdcbmNvbnN0IFRSRUUgPSAndHJlZSdcbmNvbnN0IFdBVEVSID0gJ3dhdGVyJ1xuY29uc3QgRklSRSA9ICdmaXJlJ1xuY29uc3QgU09JTCA9ICdzb2lsJ1xuY29uc3Qgbm9pc2VHb2xkID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTklOTIlOUYubXAzJ1xuY29uc3Qgbm9pc2VUcmVlID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTYlQTMlQUUubXAzJ1xuY29uc3Qgbm9pc2VXYXRlciA9ICdodHRwOi8vbG9jYWxob3N0OjUwMDAvJUU5JTlCJUE4Lm1wMydcbmNvbnN0IG5vaXNlRmlyZSA9ICdodHRwOi8vbG9jYWxob3N0OjUwMDAvJUU3JTgxJUFCLm1wMydcbmNvbnN0IG5vaXNlU29pbCA9ICdodHRwOi8vbG9jYWxob3N0OjUwMDAvJUU2JUJEJUFFLm1wMydcblxubGV0IHRpbWVyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflvZLlv4MnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBtYXJrOiAnLi4vaW1hZ2Uvd2F0ZXIucG5nJyxcbiAgICBkYXRlczogJycsXG4gICAgc2hvd0ltZ2U6IGZhbHNlLFxuICAgIHRpY2s6IDAsXG4gICAgdGltZTogJycsXG4gICAga2V5OiBrc1N0YXJ0LFxuICAgIGtTdGF0dXM6IFsn5byA5aeLJywgJ+aaguWBnCcsICfnu6fnu60nXSxcbiAgICBlbmRLZXk6ICfnu5PmnZ8nLFxuICAgIHRvdWNobW92ZTogdHJ1ZSxcbiAgICBjaGFuZ2VQb2ludDogMCxcbiAgICBpbWFnZU5vZGU6IFdBVEVSLFxuICAgIGJnY29sb3I6ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjEyKScsXG4gICAgY2lyY2xlY29sb3I6ICdyZ2JhKDAsIDAsIDAsIDApJyxcbiAgICBzdGFyUG9pbnQ6IFswLCAwXSxcbiAgICBjdXJQb2ludDogWzAsIDBdLFxuICAgIHRvdWNoZXM6IFswLCAwXSxcbiAgICBub2lzZTogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC/pm6gubXAzJyxcbiAgICB0ZXh0OiAn6Zuo5rC0J1xuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgZGF0ZShzZWxmKSB7XG4gICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIGNvbnN0IHdlZWtzID0gWydTdW4nLCAnTW9uJywgJ1R1ZXMnLCAnV2VkJywgJ1RodXInLCAnRnJpJywgJ1NhdCddXG4gICAgICBjb25zdCB3ZWVrID0gZGF0ZS5nZXRVVENEYXkoKVxuICAgICAgY29uc3Qgd2Vla2QgPSB3ZWVrc1t3ZWVrXVxuICAgICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKClcbiAgICAgIGNvbnN0IG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVnJywgJ1NlcHQnLCAnT2N0JywgJ05vdicsICdEZWMnXVxuICAgICAgY29uc3QgbW9uID0gbW9udGhzW21vbnRoXVxuICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKClcbiAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICAgIHNlbGYuZGF0ZXMgPSBtb24gKyAnICcgKyBkYXkgKyAnICcgKyB3ZWVrZCArICcgJyArIHllYXJcbiAgICB9LFxuICAgIC8vIOWIpOaWreaYr+WQpuW8gOWQr+iuoeaXtuWZqFxuICAgIHRpbWUoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGxldCBtaW4gPSAoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW5cbiAgICAgIHNlbGYubWV0aG9kcy5jaXJjbGVDb2xvckNoYW5nZShzZWxmKVxuICAgICAgc2VsZi5tZXRob2RzLnBsYXlub2lzZShzZWxmKVxuICAgICAgaWYgKG1pbiA+IHRpbWVMb3dsaW1pdCAmJiBtaW4gPD0gdGltZVVwbGltaXQpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnRpbWVyKHNlbGYpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLmtleSA9IGtzUGF1c2VcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOiuoeaXtuWZqFxuICAgIHRpbWVyKHNlbGYpIHtcbiAgICAgIHNlbGYudG91Y2htb3ZlID0gZmFsc2VcbiAgICAgIGlmIChzZWxmLmtleSA9PT0ga3NTdGFydCB8fCBzZWxmLmtleSA9PT0ga3NDb250aW51ZSkge1xuICAgICAgICB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYudGljay0tXG4gICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgIHdlcHkuZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUoe1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5tZXRob2RzLnBsYXlub2lzZShzZWxmKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBpZiAoc2VsZi50aWNrID09PSB0aW1lTG93bGltaXQpIHtcbiAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIHRvdWNobW92ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgY2lyY2xlY29sb3I6ICdyZ2JhKDAsIDAsIDAsIDApJyxcbiAgICAgICAgICAgICAga2V5OiBrc1N0YXJ0LFxuICAgICAgICAgICAgICB0aWNrOiBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW4sXG4gICAgICAgICAgICAgIHRpbWU6IGluaXRpYWxUaW1lVGV4dFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHdlcHkuc3RvcEJhY2tncm91bmRBdWRpbygpXG4gICAgICAgICAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICAgICAgICAgIHNlbGYudGljayA9IGluaXRpYWxUaW1lICogc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi50b3VjaG1vdmUgPSB0cnVlXG4gICAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMCknXG4gICAgICAgICAgICBzZWxmLmtleSA9IGtzU3RhcnRcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwKVxuICAgICAgICBzZWxmLmtleSA9IGtzUGF1c2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdlcHkucGF1c2VCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICAgIHNlbGYua2V5ID0ga3NDb250aW51ZVxuICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMjU1LCAyNTUsIDAsIDApJ1xuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5Yi35paw5pe26Ze0XG4gICAgc2V0VGltZShzZWxmLCB0aWNrKSB7XG4gICAgICBsZXQgY3VycmVudFRpbWUgPSBzZWxmLm1ldGhvZHMuY3VycmVudFRpbWUoc2VsZi50aWNrKVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgIH0pXG4gICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgIH0sXG4gICAgdGltZXJFbmQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICB3ZXB5LnN0b3BCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgc2VsZi5rZXkgPSBrc1N0YXJ0XG4gICAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgICAgc2VsZi50b3VjaG1vdmUgPSB0cnVlXG4gICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMCknXG4gICAgfSxcbiAgICAvLyDorqHnrpfml7bpl7Tlj4rovpPlh7rmoLzlvI9cbiAgICBjdXJyZW50VGltZSh0aWNrKSB7XG4gICAgICBsZXQgbWluID0gKHRpY2sgLSAodGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW5cbiAgICAgIGxldCBzZWMgPSB0aWNrICUgc2Vjb25kc1Blck1pblxuICAgICAgaWYgKG1pbiA+IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgIHJldHVybiAn4oieJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1pbiA8IDEwKSB7XG4gICAgICAgICAgbWluID0gJzAnICsgbWluXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlYyA8IDEwKSB7XG4gICAgICAgICAgc2VjID0gJzAnICsgc2VjXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbiArICcgOiAnICsgc2VjXG4gICAgICB9XG4gICAgfSxcbiAgICB0b3VjaHN0YXJ0KGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5zdGFyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgfSxcbiAgICB0b3VjaG1vdmUoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLmN1clBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgICAgc2VsZi5jaGFuZ2VQb2ludCsrXG4gICAgICBpZiAoc2VsZi50b3VjaG1vdmUpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnRpbWVDaGFuZ2Uoc2VsZilcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvdWNoZW5kKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYgKHNlbGYudG91Y2htb3ZlKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy5pbWFnZUNoYW5nZShzZWxmKVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5LiK5LiL5ruR5Yqo6LCD6IqC5pe26Ze0XG4gICAgdGltZUNoYW5nZShzZWxmKSB7XG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeFBvc10gLSBzZWxmLnN0YXJQb2ludFt4UG9zXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50W3lQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeVBvc11cbiAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA8IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID4gY2hhbmdlVGltZVBvaW50KSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeVBvc10gPiBzZWxmLnN0YXJQb2ludFt5UG9zXSAmJiBzZWxmLnRpY2sgPiAwKSB7XG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgLSBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt5UG9zXSA8IHNlbGYuc3RhclBvaW50W3lQb3NdKSB7XG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgKyBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5bem5Y+z5ruR5Yqo6LCD6IqC5Zu+54mHXG4gICAgaW1hZ2VDaGFuZ2Uoc2VsZikge1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50W3hQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeFBvc11cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt5UG9zXSAtIHNlbGYuc3RhclBvaW50W3lQb3NdXG4gICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPiBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA+IGNoYW5nZUltYWdlUG9pbnQpIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt4UG9zXSA+IHNlbGYuc3RhclBvaW50W3hQb3NdKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgR09MRDpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFRSRUU6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+WvuumSnydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IEdPTERcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAyNTUsIDAsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZUdvbGRcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFdBVEVSOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfmo67mnpcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBUUkVFXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlVHJlZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgRklSRTpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn6Zuo5rC0J1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gV0FURVJcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlV2F0ZXJcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFNPSUw6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+evneeBqydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IEZJUkVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VGaXJlXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfSBlbHNlIGlmIChzZWxmLmN1clBvaW50W3hQb3NdIDwgc2VsZi5zdGFyUG9pbnRbeFBvc10pIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBHT0xEOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfmo67mnpcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBUUkVFXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlVHJlZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgVFJFRTpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn6Zuo5rC0J1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gV0FURVJcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlV2F0ZXJcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFdBVEVSOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfnr53ngasnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBGSVJFXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlRmlyZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgRklSRTpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn5rWq5r2uJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gU09JTFxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyMzgsIDk5LCA5OSwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlU29pbFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgU09JTDpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHBsYXlub2lzZShzZWxmKSB7XG4gICAgICB3ZXB5LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xuICAgICAgICBkYXRhVXJsOiBzZWxmLm5vaXNlXG4gICAgICB9KVxuICAgIH0sXG4gICAgY2lyY2xlQ29sb3JDaGFuZ2Uoc2VsZikge1xuICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICBjYXNlIEdPTEQ6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAyNTUsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFRSRUU6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBXQVRFUjpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBGSVJFOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjMpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgU09JTDpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDIzOCwgOTksIDk5LCAwLjMpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+W9kuW/gycsXG4gICAgICBkZXNjOiAn6YO95biC5Zan6Ze5IOS9leWkhOW9kuW/gycsXG4gICAgICBwYXRoOiAnL3BhZ2Uvbm9pc2UnXG4gICAgfVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBzZWxmLm1ldGhvZHMuZGF0ZShzZWxmKVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2VsZi5zaG93SW1nZSA9IGZhbHNlXG4gICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICBzaG93SW1nZTogZmFsc2VcbiAgICAgIH0pXG4gICAgfSwgMjAwMClcbiAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgfVxufVxuIl19