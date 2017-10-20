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
      bgcolor: 'rgba(0, 0, 255, 0.2)',
      circlecolor: 'rgba(0, 0, 0, 0)',
      starPoint: [0, 0],
      curPoint: [0, 0],
      touches: [0, 0],
      noise: 'http://localhost:5000/雨.mp3',
      text: '森林',
      timerrrrr: '20分钟'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld25vaXNlLmpzIl0sIm5hbWVzIjpbImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxUaW1lIiwic2Vjb25kc1Blck1pbiIsInRpbWVVcGxpbWl0IiwidGltZUxvd2xpbWl0Iiwia3NTdGFydCIsImtzUGF1c2UiLCJrc0NvbnRpbnVlIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwiR09MRCIsIlRSRUUiLCJXQVRFUiIsIkZJUkUiLCJTT0lMIiwibm9pc2VHb2xkIiwibm9pc2VUcmVlIiwibm9pc2VXYXRlciIsIm5vaXNlRmlyZSIsIm5vaXNlU29pbCIsInRpbWVyIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1hcmsiLCJkYXRlcyIsInNob3dJbWdlIiwidGljayIsInRpbWUiLCJrZXkiLCJrU3RhdHVzIiwiZW5kS2V5IiwidG91Y2htb3ZlIiwiY2hhbmdlUG9pbnQiLCJpbWFnZU5vZGUiLCJiZ2NvbG9yIiwiY2lyY2xlY29sb3IiLCJzdGFyUG9pbnQiLCJjdXJQb2ludCIsInRvdWNoZXMiLCJub2lzZSIsInRleHQiLCJ0aW1lcnJycnIiLCJtZXRob2RzIiwiZGF0ZSIsInNlbGYiLCJEYXRlIiwid2Vla3MiLCJ3ZWVrIiwiZ2V0VVRDRGF5Iiwid2Vla2QiLCJtb250aCIsImdldE1vbnRoIiwibW9udGhzIiwibW9uIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1pbiIsImNpcmNsZUNvbG9yQ2hhbmdlIiwicGxheW5vaXNlIiwic2V0SW50ZXJ2YWwiLCJzZXRUaW1lIiwiZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUiLCJzdWNjZXNzIiwicmVzIiwic3RhdHVzIiwic2V0RGF0YSIsInN0b3BCYWNrZ3JvdW5kQXVkaW8iLCJjbGVhckludGVydmFsIiwicGF1c2VCYWNrZ3JvdW5kQXVkaW8iLCJjdXJyZW50VGltZSIsInRpbWVyRW5kIiwic2VjIiwidG91Y2hzdGFydCIsImUiLCJwYWdlWCIsInBhZ2VZIiwidGltZUNoYW5nZSIsInRvdWNoZW5kIiwiaW1hZ2VDaGFuZ2UiLCJ4Y2hhbmdlIiwieWNoYW5nZSIsIk1hdGgiLCJhYnMiLCJwbGF5QmFja2dyb3VuZEF1ZGlvIiwiZGF0YVVybCIsInRpdGxlIiwiZGVzYyIsInBhdGgiLCJzZXRUaW1lb3V0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGtCQUFrQixTQUF4QjtBQUNBLElBQU1DLGNBQWMsRUFBcEI7QUFDQSxJQUFNQyxnQkFBZ0IsRUFBdEI7QUFDQSxJQUFNQyxjQUFjLEVBQXBCO0FBQ0EsSUFBTUMsZUFBZSxDQUFyQjtBQUNBLElBQU1DLFVBQVUsQ0FBaEI7QUFDQSxJQUFNQyxVQUFVLENBQWhCO0FBQ0EsSUFBTUMsYUFBYSxDQUFuQjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLGtCQUFrQixDQUF4QjtBQUNBLElBQU1DLG1CQUFtQixDQUF6QjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLFFBQVEsT0FBZDtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLFlBQVkscUNBQWxCO0FBQ0EsSUFBTUMsWUFBWSxxQ0FBbEI7QUFDQSxJQUFNQyxhQUFhLHFDQUFuQjtBQUNBLElBQU1DLFlBQVkscUNBQWxCO0FBQ0EsSUFBTUMsWUFBWSxxQ0FBbEI7O0FBRUEsSUFBSUMsZUFBSjs7SUFFcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxZQUFNLG9CQUREO0FBRUxDLGFBQU8sRUFGRjtBQUdMQyxnQkFBVSxLQUhMO0FBSUxDLFlBQU0sQ0FKRDtBQUtMQyxZQUFNLEVBTEQ7QUFNTEMsV0FBSzNCLE9B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QUFHRCxPQUxELEVBS0csSUFMSDtBQU1BbUIsV0FBS2pCLElBQUwsR0FBWS9CLGVBQVo7QUFDQWdELFdBQUtsQixJQUFMLEdBQVk3QixjQUFjQyxhQUExQjtBQUNEOzs7O0VBbFJnQyxlQUFLNkYsSTs7a0JBQW5CeEUsSyIsImZpbGUiOiJuZXdub2lzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuY29uc3QgaW5pdGlhbFRpbWVUZXh0ID0gJzIwIDogMDAnXG5jb25zdCBpbml0aWFsVGltZSA9IDIwXG5jb25zdCBzZWNvbmRzUGVyTWluID0gNjBcbmNvbnN0IHRpbWVVcGxpbWl0ID0gNjBcbmNvbnN0IHRpbWVMb3dsaW1pdCA9IDBcbmNvbnN0IGtzU3RhcnQgPSAwXG5jb25zdCBrc1BhdXNlID0gMVxuY29uc3Qga3NDb250aW51ZSA9IDJcbmNvbnN0IHhQb3MgPSAwXG5jb25zdCB5UG9zID0gMVxuY29uc3QgY2hhbmdlVGltZVBvaW50ID0gNVxuY29uc3QgY2hhbmdlSW1hZ2VQb2ludCA9IDVcbmNvbnN0IEdPTEQgPSAnZ29sZCdcbmNvbnN0IFRSRUUgPSAndHJlZSdcbmNvbnN0IFdBVEVSID0gJ3dhdGVyJ1xuY29uc3QgRklSRSA9ICdmaXJlJ1xuY29uc3QgU09JTCA9ICdzb2lsJ1xuY29uc3Qgbm9pc2VHb2xkID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTklOTIlOUYubXAzJ1xuY29uc3Qgbm9pc2VUcmVlID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTYlQTMlQUUubXAzJ1xuY29uc3Qgbm9pc2VXYXRlciA9ICdodHRwOi8vbG9jYWxob3N0OjUwMDAvJUU5JTlCJUE4Lm1wMydcbmNvbnN0IG5vaXNlRmlyZSA9ICdodHRwOi8vbG9jYWxob3N0OjUwMDAvJUU3JTgxJUFCLm1wMydcbmNvbnN0IG5vaXNlU29pbCA9ICdodHRwOi8vbG9jYWxob3N0OjUwMDAvJUU2JUJEJUFFLm1wMydcblxubGV0IHRpbWVyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflvZLlv4MnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBtYXJrOiAnLi4vaW1hZ2Uvd2F0ZXIucG5nJyxcbiAgICBkYXRlczogJycsXG4gICAgc2hvd0ltZ2U6IGZhbHNlLFxuICAgIHRpY2s6IDAsXG4gICAgdGltZTogJycsXG4gICAga2V5OiBrc1N0YXJ0LFxuICAgIGtTdGF0dXM6IFsn5byA5aeLJywgJ+aaguWBnCcsICfnu6fnu60nXSxcbiAgICBlbmRLZXk6ICfnu5PmnZ8nLFxuICAgIHRvdWNobW92ZTogdHJ1ZSxcbiAgICBjaGFuZ2VQb2ludDogMCxcbiAgICBpbWFnZU5vZGU6IFdBVEVSLFxuICAgIGJnY29sb3I6ICdyZ2JhKDAsIDAsIDI1NSwgMC4yKScsXG4gICAgY2lyY2xlY29sb3I6ICdyZ2JhKDAsIDAsIDAsIDApJyxcbiAgICBzdGFyUG9pbnQ6IFswLCAwXSxcbiAgICBjdXJQb2ludDogWzAsIDBdLFxuICAgIHRvdWNoZXM6IFswLCAwXSxcbiAgICBub2lzZTogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC/pm6gubXAzJyxcbiAgICB0ZXh0OiAn5qOu5p6XJyxcbiAgICB0aW1lcnJycnI6ICcyMOWIhumSnydcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGRhdGUoc2VsZikge1xuICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICBjb25zdCB3ZWVrcyA9IFsnU3VuJywgJ01vbicsICdUdWVzJywgJ1dlZCcsICdUaHVyJywgJ0ZyaScsICdTYXQnXVxuICAgICAgY29uc3Qgd2VlayA9IGRhdGUuZ2V0VVRDRGF5KClcbiAgICAgIGNvbnN0IHdlZWtkID0gd2Vla3Nbd2Vla11cbiAgICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpXG4gICAgICBjb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1ZycsICdTZXB0JywgJ09jdCcsICdOb3YnLCAnRGVjJ11cbiAgICAgIGNvbnN0IG1vbiA9IG1vbnRoc1ttb250aF1cbiAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpXG4gICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgICBzZWxmLmRhdGVzID0gbW9uICsgJyAnICsgZGF5ICsgJyAnICsgd2Vla2QgKyAnICcgKyB5ZWFyXG4gICAgfSxcbiAgICAvLyDliKTmlq3mmK/lkKblvIDlkK/orqHml7blmahcbiAgICB0aW1lKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBsZXQgbWluID0gKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluXG4gICAgICBzZWxmLm1ldGhvZHMuY2lyY2xlQ29sb3JDaGFuZ2Uoc2VsZilcbiAgICAgIHNlbGYubWV0aG9kcy5wbGF5bm9pc2Uoc2VsZilcbiAgICAgIGlmIChtaW4gPiB0aW1lTG93bGltaXQgJiYgbWluIDw9IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lcihzZWxmKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5rZXkgPSBrc1BhdXNlXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDorqHml7blmahcbiAgICB0aW1lcihzZWxmKSB7XG4gICAgICBzZWxmLnRvdWNobW92ZSA9IGZhbHNlXG4gICAgICBpZiAoc2VsZi5rZXkgPT09IGtzU3RhcnQgfHwgc2VsZi5rZXkgPT09IGtzQ29udGludWUpIHtcbiAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnRpY2stLVxuICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICB3ZXB5LmdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLnN0YXR1cyAhPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlbGYubWV0aG9kcy5wbGF5bm9pc2Uoc2VsZilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKHNlbGYudGljayA9PT0gdGltZUxvd2xpbWl0KSB7XG4gICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgICB0b3VjaG1vdmU6IHRydWUsXG4gICAgICAgICAgICAgIGNpcmNsZWNvbG9yOiAncmdiYSgwLCAwLCAwLCAwKScsXG4gICAgICAgICAgICAgIGtleToga3NTdGFydCxcbiAgICAgICAgICAgICAgdGljazogaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluLFxuICAgICAgICAgICAgICB0aW1lOiBpbml0aWFsVGltZVRleHRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB3ZXB5LnN0b3BCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgICAgICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYudG91Y2htb3ZlID0gdHJ1ZVxuICAgICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDApJ1xuICAgICAgICAgICAgc2VsZi5rZXkgPSBrc1N0YXJ0XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMClcbiAgICAgICAgc2VsZi5rZXkgPSBrc1BhdXNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3ZXB5LnBhdXNlQmFja2dyb3VuZEF1ZGlvKClcbiAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICBzZWxmLmtleSA9IGtzQ29udGludWVcbiAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKDI1NSwgMjU1LCAwLCAwLjEpJ1xuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5Yi35paw5pe26Ze0XG4gICAgc2V0VGltZShzZWxmLCB0aWNrKSB7XG4gICAgICBsZXQgY3VycmVudFRpbWUgPSBzZWxmLm1ldGhvZHMuY3VycmVudFRpbWUoc2VsZi50aWNrKVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgIH0pXG4gICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgIH0sXG4gICAgdGltZXJFbmQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICB3ZXB5LnN0b3BCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgc2VsZi5rZXkgPSBrc1N0YXJ0XG4gICAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgICAgc2VsZi50b3VjaG1vdmUgPSB0cnVlXG4gICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMCknXG4gICAgfSxcbiAgICAvLyDorqHnrpfml7bpl7Tlj4rovpPlh7rmoLzlvI9cbiAgICBjdXJyZW50VGltZSh0aWNrKSB7XG4gICAgICBsZXQgbWluID0gKHRpY2sgLSAodGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW5cbiAgICAgIGxldCBzZWMgPSB0aWNrICUgc2Vjb25kc1Blck1pblxuICAgICAgaWYgKG1pbiA+IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgIHJldHVybiAn4oieJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1pbiA8IDEwKSB7XG4gICAgICAgICAgbWluID0gJzAnICsgbWluXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlYyA8IDEwKSB7XG4gICAgICAgICAgc2VjID0gJzAnICsgc2VjXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbiArICc6JyArIHNlY1xuICAgICAgfVxuICAgIH0sXG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICAgIHNlbGYuY2hhbmdlUG9pbnQrK1xuICAgICAgaWYgKHNlbGYudG91Y2htb3ZlKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lQ2hhbmdlKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICB0b3VjaGVuZChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGlmIChzZWxmLnRvdWNobW92ZSkge1xuICAgICAgICBzZWxmLm1ldGhvZHMuaW1hZ2VDaGFuZ2Uoc2VsZilcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOS4iuS4i+a7keWKqOiwg+iKguaXtumXtFxuICAgIHRpbWVDaGFuZ2Uoc2VsZikge1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50W3hQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeFBvc11cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt5UG9zXSAtIHNlbGYuc3RhclBvaW50W3lQb3NdXG4gICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPCBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA+IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3lQb3NdID4gc2VsZi5zdGFyUG9pbnRbeVBvc10gJiYgc2VsZi50aWNrID4gMCkge1xuICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrIC0gc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeVBvc10gPCBzZWxmLnN0YXJQb2ludFt5UG9zXSkge1xuICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrICsgc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOW3puWPs+a7keWKqOiwg+iKguWbvueJh1xuICAgIGltYWdlQ2hhbmdlKHNlbGYpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt4UG9zXSAtIHNlbGYuc3RhclBvaW50W3hQb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeVBvc10gLSBzZWxmLnN0YXJQb2ludFt5UG9zXVxuICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID4gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VJbWFnZVBvaW50KSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeFBvc10gPiBzZWxmLnN0YXJQb2ludFt4UG9zXSkge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlIEdPTEQ6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBUUkVFOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9nb2xkLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IEdPTERcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlR29sZFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgV0FURVI6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gVFJFRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlVHJlZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgRklSRTpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvd2F0ZXIucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gV0FURVJcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VXYXRlclxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgU09JTDpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZmlyZS5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBGSVJFXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VGaXJlXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfSBlbHNlIGlmIChzZWxmLmN1clBvaW50W3hQb3NdIDwgc2VsZi5zdGFyUG9pbnRbeFBvc10pIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBHT0xEOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS90cmVlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFRSRUVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZVRyZWVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFRSRUU6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3dhdGVyLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFdBVEVSXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlV2F0ZXJcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFdBVEVSOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9maXJlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IEZJUkVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZUZpcmVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIEZJUkU6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3NvaWwucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gU09JTFxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyMzgsIDk5LCA5OSwgMC4zKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VTb2lsXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBTT0lMOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcGxheW5vaXNlKHNlbGYpIHtcbiAgICAgIHdlcHkucGxheUJhY2tncm91bmRBdWRpbyh7XG4gICAgICAgIGRhdGFVcmw6IHNlbGYubm9pc2VcbiAgICAgIH0pXG4gICAgfSxcbiAgICBjaXJjbGVDb2xvckNoYW5nZShzZWxmKSB7XG4gICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgIGNhc2UgR09MRDpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgVFJFRTpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFdBVEVSOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIEZJUkU6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMyknXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBTT0lMOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDAuMyknXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5b2S5b+DJyxcbiAgICAgIGRlc2M6ICfpg73luILllqfpl7kg5L2V5aSE5b2S5b+DJyxcbiAgICAgIHBhdGg6ICcvcGFnZS9ub2lzZSdcbiAgICB9XG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIHNlbGYubWV0aG9kcy5kYXRlKHNlbGYpXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLnNob3dJbWdlID0gZmFsc2VcbiAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgIHNob3dJbWdlOiBmYWxzZVxuICAgICAgfSlcbiAgICB9LCAyMDAwKVxuICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgIHNlbGYudGljayA9IGluaXRpYWxUaW1lICogc2Vjb25kc1Blck1pblxuICB9XG59XG4iXX0=