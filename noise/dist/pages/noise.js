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
var initialMin = 20;
var secondsPerMin = 60;
var xPos = 0;
var yPos = 1;
var changeTimePoint = 1;
var changeImagePoint = 5;
var timeUplimit = 3660;
var timeLowlimit = 0;
var loop = '∞';
var trueOpacity = 1;
var falseOpacity = 0.3;
var nodeWater = {
  mark: '雨水',
  bgcolor: 'rgba(0, 255, 255, 0.12)',
  noise: 'http://10.0.0.100/noise/water.mp3',
  imageNode: 'WATER',
  waterPoint: trueOpacity,
  treePoint: falseOpacity,
  goldPoint: falseOpacity,
  firePoint: falseOpacity,
  soilPoint: falseOpacity
};
var nodeGold = {
  mark: '寺钟',
  bgcolor: 'rgba( 255, 255, 0, 0.12)',
  noise: 'http://10.0.0.100/noise/gold.mp3',
  imageNode: 'GOLD',
  waterPoint: falseOpacity,
  treePoint: falseOpacity,
  goldPoint: trueOpacity,
  firePoint: falseOpacity,
  soilPoint: falseOpacity
};
var nodeTree = {
  mark: '森林',
  bgcolor: 'rgba( 0, 255, 0, 0.12)',
  noise: 'http://10.0.0.100/noise/tree.mp3',
  imageNode: 'TREE',
  waterPoint: falseOpacity,
  treePoint: trueOpacity,
  goldPoint: falseOpacity,
  firePoint: falseOpacity,
  soilPoint: falseOpacity
};
var nodeFire = {
  mark: '篝火',
  bgcolor: 'rgba( 255, 0, 0, 0.12)',
  noise: 'http://10.0.0.100/noise/fire.mp3',
  imageNode: 'FIRE',
  waterPoint: falseOpacity,
  treePoint: falseOpacity,
  goldPoint: falseOpacity,
  firePoint: trueOpacity,
  soilPoint: falseOpacity
};
var noiseSoil = {
  mark: '浪潮',
  bgcolor: 'rgba( 238, 99, 99, 0.12)',
  noise: 'http://10.0.0.100/noise/soil.mp3',
  imageNode: 'SOIL',
  waterPoint: falseOpacity,
  treePoint: falseOpacity,
  goldPoint: falseOpacity,
  firePoint: falseOpacity,
  soilPoint: trueOpacity
};

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
      showImge: true,
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
      circlecolor: 'rgba( 0, 0, 0, 0)',
      animationData: {}
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
      start: function start() {
        var self = this;
        self.startButton = false;
        self.pauseOrContinue = true;
        self.touchmove = false;
        self.circlecolor = self.node.bgcolor;
        self.shadowcolor = self.node.bgcolor;
        if (self.tick === timeLowlimit) {} else {
          self.methods.playnoise(self);
          self.methods.listen(self);
        }
        if (self.tick > timeLowlimit && self.tick < timeUplimit) {
          self.methods.time(self);
        }
      },
      pause: function pause() {
        var self = this;
        self.pauseOrContinue = false;
        _wepy2.default.pauseBackgroundAudio();
        self.circlecolor = 'rgba( 0, 0, 0, 0)';
        clearInterval(self.listen);
        clearInterval(self.timer);
      },
      end: function end() {
        var self = this;
        self.startButton = true;
        self.touchmove = true;
        _wepy2.default.stopBackgroundAudio();
        self.circlecolor = 'rgba( 0, 0, 0, 0)';
        self.shadowcolor = '#333333';
        clearInterval(self.listen);
        clearInterval(self.timer);
        self.time = initialTimeText;
        self.tick = initialMin * secondsPerMin;
      },
      playnoise: function playnoise(self) {
        _wepy2.default.playBackgroundAudio({
          dataUrl: self.node.noise,
          title: '123'
        });
      },

      // 倒计时 时间到
      time: function time(self) {
        self.timer = setInterval(function () {
          self.tick--;
          self.methods.setTime(self);
          console.log(self.tick);
          if (self.tick === timeLowlimit) {
            self.setData({
              circlecolor: 'rgba( 0, 0, 0, 0)',
              shadowcolor: '#333333',
              time: initialTimeText,
              startButton: true,
              tick: initialMin * secondsPerMin,
              touchmove: true
            });
            self.startButton = true;
            self.touchmove = true;
            self.time = initialTimeText;
            self.tick = initialMin * secondsPerMin;
            self.circlecolor = 'rgba( 0, 0, 0, 0)';
            self.shadowcolor = '#333333';
            _wepy2.default.stopBackgroundAudio();
            clearInterval(self.listen);
            clearInterval(self.timer);
          }
        }, 1000);
      },

      // 监听 音频停止时再起一个音频
      listen: function listen(self) {
        self.listen = setInterval(function () {
          if (self.tick !== timeLowlimit) {
            _wepy2.default.getBackgroundAudioPlayerState({
              success: function success(res) {
                if (res.status !== 1) {
                  self.methods.playnoise(self);
                }
              }
            });
          }
        }, 50);
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
      timeChange: function timeChange(self) {
        var xchange = self.curPoint[xPos] - self.starPoint[xPos];
        var ychange = self.curPoint[yPos] - self.starPoint[yPos];
        if (Math.abs(xchange) < Math.abs(ychange)) {
          if (self.changePoint > changeTimePoint) {
            if (self.curPoint[yPos] > self.starPoint[yPos] && self.tick > timeLowlimit) {
              // 向下滑
              self.tick = self.tick - secondsPerMin;
              self.methods.setTime(self, self.tick);
              self.changePoint = 0;
            }
            if (self.curPoint[yPos] < self.starPoint[yPos] && self.tick < timeUplimit) {
              // 向上滑
              self.tick = self.tick + secondsPerMin;
              self.methods.setTime(self, self.tick);
              self.changePoint = 0;
            }
          }
        }
      },

      // 刷新时间
      setTime: function setTime(self) {
        var currentTime = self.methods.currentTime(self.tick);
        self.setData({
          time: currentTime
        });
        self.time = currentTime;
      },

      // 计算时间格式
      currentTime: function currentTime(tick) {
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
      imageChange: function imageChange(self) {
        var xchange = self.curPoint[xPos] - self.starPoint[xPos];
        var ychange = self.curPoint[yPos] - self.starPoint[yPos];
        if (Math.abs(xchange) > Math.abs(ychange)) {
          if (self.changePoint > changeImagePoint) {
            if (self.curPoint[xPos] > self.starPoint[xPos]) {
              // 向右划
              switch (self.node.imageNode) {
                case 'GOLD':
                  break;
                case 'TREE':
                  self.node = nodeGold;
                  break;
                case 'WATER':
                  self.node = nodeTree;
                  break;
                case 'FIRE':
                  self.node = nodeWater;
                  break;
                case 'SOIL':
                  self.node = nodeFire;
                  break;
              }
              self.changePoint = 0;
            } else if (self.curPoint[xPos] < self.starPoint[xPos]) {
              // 往左划
              switch (self.node.imageNode) {
                case 'GOLD':
                  self.node = nodeTree;
                  break;
                case 'TREE':
                  self.node = nodeWater;
                  break;
                case 'WATER':
                  self.node = nodeFire;
                  break;
                case 'FIRE':
                  self.node = noiseSoil;
                  break;
                case 'SOIL':
                  break;
              }
              self.changePoint = 0;
            }
          }
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
    key: 'onShow',
    value: function onShow() {
      var self = this;
      var animation = wx.createAnimation({
        duration: 8000,
        timingFunction: 'ease'
      });
      self.animation = animation;
      animation.translateY(200);
      self.setData({
        animationData: animation.export()
      });
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
      }, 5000);
      self.time = initialTimeText;
      self.tick = initialMin * secondsPerMin;
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/noise'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbImNhbGVuZGFyIiwicmVxdWlyZSIsImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxNaW4iLCJzZWNvbmRzUGVyTWluIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwidGltZVVwbGltaXQiLCJ0aW1lTG93bGltaXQiLCJsb29wIiwidHJ1ZU9wYWNpdHkiLCJmYWxzZU9wYWNpdHkiLCJub2RlV2F0ZXIiLCJtYXJrIiwiYmdjb2xvciIsIm5vaXNlIiwiaW1hZ2VOb2RlIiwid2F0ZXJQb2ludCIsInRyZWVQb2ludCIsImdvbGRQb2ludCIsImZpcmVQb2ludCIsInNvaWxQb2ludCIsIm5vZGVHb2xkIiwibm9kZVRyZWUiLCJub2RlRmlyZSIsIm5vaXNlU29pbCIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJzaG93SW1nZSIsInN0YXJ0QnV0dG9uIiwicGF1c2VPckNvbnRpbnVlIiwidG91Y2htb3ZlIiwibHVuYXIiLCJkYXRlcyIsInRpbWUiLCJ0aWNrIiwidGltZXIiLCJsaXN0ZW4iLCJzdGFyUG9pbnQiLCJjdXJQb2ludCIsInRvdWNoZXMiLCJjaGFuZ2VQb2ludCIsIm5vZGUiLCJzdGFydCIsInBhdXNlIiwiY29udGludWVzIiwiZW5kIiwic2hhZG93Y29sb3IiLCJjaXJjbGVjb2xvciIsImFuaW1hdGlvbkRhdGEiLCJtZXRob2RzIiwiZGF0ZSIsInNlbGYiLCJEYXRlIiwid2Vla3MiLCJ3ZWVrIiwiZ2V0VVRDRGF5Iiwid2Vla2QiLCJtb250aCIsImdldE1vbnRoIiwibW9udGhzIiwibW9uIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsImx1bmFyZGF0ZSIsInNvbGFyMmx1bmFyIiwibHVuYXJNb250aHMiLCJsdW5hckRheXMiLCJsRGF5IiwibHVuYXJEYXkiLCJsTW9udGgiLCJwbGF5bm9pc2UiLCJwYXVzZUJhY2tncm91bmRBdWRpbyIsImNsZWFySW50ZXJ2YWwiLCJzdG9wQmFja2dyb3VuZEF1ZGlvIiwicGxheUJhY2tncm91bmRBdWRpbyIsImRhdGFVcmwiLCJ0aXRsZSIsInNldEludGVydmFsIiwic2V0VGltZSIsImNvbnNvbGUiLCJsb2ciLCJzZXREYXRhIiwiZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUiLCJzdWNjZXNzIiwicmVzIiwic3RhdHVzIiwidG91Y2hzdGFydCIsImUiLCJwYWdlWCIsInBhZ2VZIiwidGltZUNoYW5nZSIsInRvdWNoZW5kIiwiaW1hZ2VDaGFuZ2UiLCJ4Y2hhbmdlIiwieWNoYW5nZSIsIk1hdGgiLCJhYnMiLCJjdXJyZW50VGltZSIsIm1pbiIsInNlYyIsImRlc2MiLCJwYXRoIiwiYW5pbWF0aW9uIiwid3giLCJjcmVhdGVBbmltYXRpb24iLCJkdXJhdGlvbiIsInRpbWluZ0Z1bmN0aW9uIiwidHJhbnNsYXRlWSIsImV4cG9ydCIsInNldFRpbWVvdXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsV0FBV0MsUUFBUSxzQkFBUixDQUFqQjtBQUNBLElBQU1DLGtCQUFrQixTQUF4QjtBQUNBLElBQU1DLGFBQWEsRUFBbkI7QUFDQSxJQUFNQyxnQkFBZ0IsRUFBdEI7QUFDQSxJQUFNQyxPQUFPLENBQWI7QUFDQSxJQUFNQyxPQUFPLENBQWI7QUFDQSxJQUFNQyxrQkFBa0IsQ0FBeEI7QUFDQSxJQUFNQyxtQkFBbUIsQ0FBekI7QUFDQSxJQUFNQyxjQUFjLElBQXBCO0FBQ0EsSUFBTUMsZUFBZSxDQUFyQjtBQUNBLElBQU1DLE9BQU8sR0FBYjtBQUNBLElBQU1DLGNBQWMsQ0FBcEI7QUFDQSxJQUFNQyxlQUFlLEdBQXJCO0FBQ0EsSUFBTUMsWUFBWTtBQUNoQkMsUUFBTSxJQURVO0FBRWhCQyxXQUFTLHlCQUZPO0FBR2hCQyxTQUFPLG1DQUhTO0FBSWhCQyxhQUFXLE9BSks7QUFLaEJDLGNBQVlQLFdBTEk7QUFN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QUtWLElBQUwsR0FBWXBCLFFBQVo7QUFDQTtBQUNGLHFCQUFLLE1BQUw7QUFDRThCLHVCQUFLVixJQUFMLEdBQVluQixTQUFaO0FBQ0E7QUFDRixxQkFBSyxNQUFMO0FBQ0U7QUFkSjtBQWdCQTZCLG1CQUFLWCxXQUFMLEdBQW1CLENBQW5CO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUEzTk8sSzs7Ozs7d0NBNk5VO0FBQ2xCLGFBQU87QUFDTHNDLGVBQU8sSUFERjtBQUVMd0IsY0FBTSxXQUZEO0FBR0xDLGNBQU07QUFIRCxPQUFQO0FBS0Q7Ozs2QkFDUTtBQUNQLFVBQUlwRCxPQUFPLElBQVg7QUFDQSxVQUFJcUQsWUFBWUMsR0FBR0MsZUFBSCxDQUFtQjtBQUNqQ0Msa0JBQVUsSUFEdUI7QUFFakNDLHdCQUFnQjtBQUZpQixPQUFuQixDQUFoQjtBQUlBekQsV0FBS3FELFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0FBLGdCQUFVSyxVQUFWLENBQXFCLEdBQXJCO0FBQ0ExRCxXQUFLZ0MsT0FBTCxDQUFhO0FBQ1huQyx1QkFBZXdELFVBQVVNLE1BQVY7QUFESixPQUFiO0FBR0Q7Ozs2QkFDUTtBQUNQLFVBQUkzRCxPQUFPLElBQVg7QUFDQUEsV0FBS0YsT0FBTCxDQUFhQyxJQUFiLENBQWtCQyxJQUFsQjtBQUNBNEQsaUJBQVcsWUFBTTtBQUNmNUQsYUFBS3hCLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQXdCLGFBQUtnQyxPQUFMLENBQWE7QUFDWHhELG9CQUFVO0FBREMsU0FBYjtBQUdELE9BTEQsRUFLRyxJQUxIO0FBTUF3QixXQUFLbEIsSUFBTCxHQUFZcEMsZUFBWjtBQUNBc0QsV0FBS2pCLElBQUwsR0FBWXBDLGFBQWFDLGFBQXpCO0FBQ0Q7Ozs7RUF2UmdDLGVBQUtpSCxJOztrQkFBbkJ6RixLIiwiZmlsZSI6Im5vaXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG5jb25zdCBjYWxlbmRhciA9IHJlcXVpcmUoJy4uL3BhZ2VzL2NhbGVuZGFyLmpzJylcbmNvbnN0IGluaXRpYWxUaW1lVGV4dCA9ICcyMCA6IDAwJ1xuY29uc3QgaW5pdGlhbE1pbiA9IDIwXG5jb25zdCBzZWNvbmRzUGVyTWluID0gNjBcbmNvbnN0IHhQb3MgPSAwXG5jb25zdCB5UG9zID0gMVxuY29uc3QgY2hhbmdlVGltZVBvaW50ID0gMVxuY29uc3QgY2hhbmdlSW1hZ2VQb2ludCA9IDVcbmNvbnN0IHRpbWVVcGxpbWl0ID0gMzY2MFxuY29uc3QgdGltZUxvd2xpbWl0ID0gMFxuY29uc3QgbG9vcCA9ICfiiJ4nXG5jb25zdCB0cnVlT3BhY2l0eSA9IDFcbmNvbnN0IGZhbHNlT3BhY2l0eSA9IDAuM1xuY29uc3Qgbm9kZVdhdGVyID0ge1xuICBtYXJrOiAn6Zuo5rC0JyxcbiAgYmdjb2xvcjogJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMTIpJyxcbiAgbm9pc2U6ICdodHRwOi8vMTAuMC4wLjEwMC9ub2lzZS93YXRlci5tcDMnLFxuICBpbWFnZU5vZGU6ICdXQVRFUicsXG4gIHdhdGVyUG9pbnQ6IHRydWVPcGFjaXR5LFxuICB0cmVlUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZ29sZFBvaW50OiBmYWxzZU9wYWNpdHksXG4gIGZpcmVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBzb2lsUG9pbnQ6IGZhbHNlT3BhY2l0eVxufVxuY29uc3Qgbm9kZUdvbGQgPSB7XG4gIG1hcms6ICflr7rpkp8nLFxuICBiZ2NvbG9yOiAncmdiYSggMjU1LCAyNTUsIDAsIDAuMTIpJyxcbiAgbm9pc2U6ICdodHRwOi8vMTAuMC4wLjEwMC9ub2lzZS9nb2xkLm1wMycsXG4gIGltYWdlTm9kZTogJ0dPTEQnLFxuICB3YXRlclBvaW50OiBmYWxzZU9wYWNpdHksXG4gIHRyZWVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBnb2xkUG9pbnQ6IHRydWVPcGFjaXR5LFxuICBmaXJlUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgc29pbFBvaW50OiBmYWxzZU9wYWNpdHlcbn1cbmNvbnN0IG5vZGVUcmVlID0ge1xuICBtYXJrOiAn5qOu5p6XJyxcbiAgYmdjb2xvcjogJ3JnYmEoIDAsIDI1NSwgMCwgMC4xMiknLFxuICBub2lzZTogJ2h0dHA6Ly8xMC4wLjAuMTAwL25vaXNlL3RyZWUubXAzJyxcbiAgaW1hZ2VOb2RlOiAnVFJFRScsXG4gIHdhdGVyUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgdHJlZVBvaW50OiB0cnVlT3BhY2l0eSxcbiAgZ29sZFBvaW50OiBmYWxzZU9wYWNpdHksXG4gIGZpcmVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBzb2lsUG9pbnQ6IGZhbHNlT3BhY2l0eVxufVxuY29uc3Qgbm9kZUZpcmUgPSB7XG4gIG1hcms6ICfnr53ngasnLFxuICBiZ2NvbG9yOiAncmdiYSggMjU1LCAwLCAwLCAwLjEyKScsXG4gIG5vaXNlOiAnaHR0cDovLzEwLjAuMC4xMDAvbm9pc2UvZmlyZS5tcDMnLFxuICBpbWFnZU5vZGU6ICdGSVJFJyxcbiAgd2F0ZXJQb2ludDogZmFsc2VPcGFjaXR5LFxuICB0cmVlUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZ29sZFBvaW50OiBmYWxzZU9wYWNpdHksXG4gIGZpcmVQb2ludDogdHJ1ZU9wYWNpdHksXG4gIHNvaWxQb2ludDogZmFsc2VPcGFjaXR5XG59XG5jb25zdCBub2lzZVNvaWwgPSB7XG4gIG1hcms6ICfmtarmva4nLFxuICBiZ2NvbG9yOiAncmdiYSggMjM4LCA5OSwgOTksIDAuMTIpJyxcbiAgbm9pc2U6ICdodHRwOi8vMTAuMC4wLjEwMC9ub2lzZS9zb2lsLm1wMycsXG4gIGltYWdlTm9kZTogJ1NPSUwnLFxuICB3YXRlclBvaW50OiBmYWxzZU9wYWNpdHksXG4gIHRyZWVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBnb2xkUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZmlyZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gIHNvaWxQb2ludDogdHJ1ZU9wYWNpdHlcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W9kuW/gydcbiAgfVxuICBkYXRhID0ge1xuICAgIHNob3dJbWdlOiB0cnVlLFxuICAgIHN0YXJ0QnV0dG9uOiB0cnVlLFxuICAgIHBhdXNlT3JDb250aW51ZTogdHJ1ZSxcbiAgICB0b3VjaG1vdmU6IHRydWUsXG4gICAgbHVuYXI6IG51bGwsXG4gICAgZGF0ZXM6IG51bGwsXG4gICAgdGltZTogbnVsbCxcbiAgICB0aWNrOiBudWxsLFxuICAgIHRpbWVyOiBudWxsLFxuICAgIGxpc3RlbjogbnVsbCxcbiAgICBzdGFyUG9pbnQ6IFswLCAwXSxcbiAgICBjdXJQb2ludDogWzAsIDBdLFxuICAgIHRvdWNoZXM6IFtdLFxuICAgIGNoYW5nZVBvaW50OiAwLFxuICAgIG5vZGU6IG5vZGVXYXRlcixcbiAgICBzdGFydDogJ+W8gOWniycsXG4gICAgcGF1c2U6ICfmmoLlgZwnLFxuICAgIGNvbnRpbnVlczogJ+e7p+e7rScsXG4gICAgZW5kOiAn57uT5p2fJyxcbiAgICBzaGFkb3djb2xvcjogJyMzMzMzMzMnLFxuICAgIGNpcmNsZWNvbG9yOiAncmdiYSggMCwgMCwgMCwgMCknLFxuICAgIGFuaW1hdGlvbkRhdGE6IHt9XG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBkYXRlKHNlbGYpIHtcbiAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgY29uc3Qgd2Vla3MgPSBbJ1N1bicsICdNb24nLCAnVHVlcycsICdXZWQnLCAnVGh1cicsICdGcmknLCAnU2F0J11cbiAgICAgIGNvbnN0IHdlZWsgPSBkYXRlLmdldFVUQ0RheSgpXG4gICAgICBjb25zdCB3ZWVrZCA9IHdlZWtzW3dlZWtdXG4gICAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICAgICAgY29uc3QgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWcnLCAnU2VwdCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgICBjb25zdCBtb24gPSBtb250aHNbbW9udGhdXG4gICAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICAgICAgc2VsZi5kYXRlcyA9IG1vbiArICcgJyArIGRheSArICcgJyArIHdlZWtkICsgJyAnICsgeWVhclxuICAgICAgbGV0IGx1bmFyZGF0ZSA9IGNhbGVuZGFyLnNvbGFyMmx1bmFyKHllYXIsIG1vbnRoICsgMSwgZGF5KVxuICAgICAgY29uc3QgbHVuYXJNb250aHMgPSBbJ+ato+aciCcsICfotLDmnIgnLCAn5Y+B5pyIJywgJ+iChuaciCcsICfkvI3mnIgnLCAn6ZmG5pyIJywgJ+S4g+aciCcsICfmjYzmnIgnLCAn546W5pyIJywgJ+aLvuaciCcsICfmi77lo7nmnIgnLCAn6IWK5pyIJ11cbiAgICAgIGNvbnN0IGx1bmFyRGF5cyA9IFsn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nLCAn5LiDJywgJ+WFqycsICfkuZ0nLCAn5Y2BJ11cbiAgICAgIGlmIChsdW5hcmRhdGUubERheSA8PSAxMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+WInScgKyBsdW5hckRheXNbbHVuYXJkYXRlLmxEYXkgLSAxXVxuICAgICAgfSBlbHNlIGlmIChsdW5hcmRhdGUubERheSA+IDEwICYmIGx1bmFyZGF0ZS5sRGF5IDwgMjApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICfljYEnICsgbHVuYXJEYXlzW2x1bmFyZGF0ZS5sRGF5IC0gMTFdXG4gICAgICB9IGVsc2UgaWYgKGx1bmFyZGF0ZS5sRGF5ID4gMjAgJiYgbHVuYXJkYXRlLmxEYXkgPCAzMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+W7vycgKyBsdW5hckRheXNbbHVuYXJkYXRlLmxEYXkgLSAyMV1cbiAgICAgIH0gZWxzZSBpZiAobHVuYXJkYXRlLmxEYXkgPT09IDIwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5LqM5Y2BJ1xuICAgICAgfSBlbHNlIGlmIChsdW5hcmRhdGUubERheSA9PT0gMzApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICfkuInljYEnXG4gICAgICB9XG4gICAgICBzZWxmLmx1bmFyID0gJ+WGnOWOhicgKyBsdW5hck1vbnRoc1tsdW5hcmRhdGUubE1vbnRoIC0gMV0gKyBzZWxmLmx1bmFyRGF5XG4gICAgfSxcbiAgICBzdGFydCgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5zdGFydEJ1dHRvbiA9IGZhbHNlXG4gICAgICBzZWxmLnBhdXNlT3JDb250aW51ZSA9IHRydWVcbiAgICAgIHNlbGYudG91Y2htb3ZlID0gZmFsc2VcbiAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSBzZWxmLm5vZGUuYmdjb2xvclxuICAgICAgc2VsZi5zaGFkb3djb2xvciA9IHNlbGYubm9kZS5iZ2NvbG9yXG4gICAgICBpZiAoc2VsZi50aWNrID09PSB0aW1lTG93bGltaXQpIHtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy5wbGF5bm9pc2Uoc2VsZilcbiAgICAgICAgc2VsZi5tZXRob2RzLmxpc3RlbihzZWxmKVxuICAgICAgfVxuICAgICAgaWYgKHNlbGYudGljayA+IHRpbWVMb3dsaW1pdCAmJiBzZWxmLnRpY2sgPCB0aW1lVXBsaW1pdCkge1xuICAgICAgICBzZWxmLm1ldGhvZHMudGltZShzZWxmKVxuICAgICAgfVxuICAgIH0sXG4gICAgcGF1c2UoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYucGF1c2VPckNvbnRpbnVlID0gZmFsc2VcbiAgICAgIHdlcHkucGF1c2VCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAwLCAwLCAwLCAwKSdcbiAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi5saXN0ZW4pXG4gICAgICBjbGVhckludGVydmFsKHNlbGYudGltZXIpXG4gICAgfSxcbiAgICBlbmQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhcnRCdXR0b24gPSB0cnVlXG4gICAgICBzZWxmLnRvdWNobW92ZSA9IHRydWVcbiAgICAgIHdlcHkuc3RvcEJhY2tncm91bmRBdWRpbygpXG4gICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDAsIDAsIDAsIDApJ1xuICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICcjMzMzMzMzJ1xuICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLmxpc3RlbilcbiAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi50aW1lcilcbiAgICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgICAgc2VsZi50aWNrID0gaW5pdGlhbE1pbiAqIHNlY29uZHNQZXJNaW5cbiAgICB9LFxuICAgIHBsYXlub2lzZShzZWxmKSB7XG4gICAgICB3ZXB5LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xuICAgICAgICBkYXRhVXJsOiBzZWxmLm5vZGUubm9pc2UsXG4gICAgICAgIHRpdGxlOiAnMTIzJ1xuICAgICAgfSlcbiAgICB9LFxuICAgIC8vIOWAkuiuoeaXtiDml7bpl7TliLBcbiAgICB0aW1lKHNlbGYpIHtcbiAgICAgIHNlbGYudGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi50aWNrLS1cbiAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZilcbiAgICAgICAgY29uc29sZS5sb2coc2VsZi50aWNrKVxuICAgICAgICBpZiAoc2VsZi50aWNrID09PSB0aW1lTG93bGltaXQpIHtcbiAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgY2lyY2xlY29sb3I6ICdyZ2JhKCAwLCAwLCAwLCAwKScsXG4gICAgICAgICAgICBzaGFkb3djb2xvcjogJyMzMzMzMzMnLFxuICAgICAgICAgICAgdGltZTogaW5pdGlhbFRpbWVUZXh0LFxuICAgICAgICAgICAgc3RhcnRCdXR0b246IHRydWUsXG4gICAgICAgICAgICB0aWNrOiBpbml0aWFsTWluICogc2Vjb25kc1Blck1pbixcbiAgICAgICAgICAgIHRvdWNobW92ZTogdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgc2VsZi5zdGFydEJ1dHRvbiA9IHRydWVcbiAgICAgICAgICBzZWxmLnRvdWNobW92ZSA9IHRydWVcbiAgICAgICAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICAgICAgICBzZWxmLnRpY2sgPSBpbml0aWFsTWluICogc2Vjb25kc1Blck1pblxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSggMCwgMCwgMCwgMCknXG4gICAgICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICcjMzMzMzMzJ1xuICAgICAgICAgIHdlcHkuc3RvcEJhY2tncm91bmRBdWRpbygpXG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLmxpc3RlbilcbiAgICAgICAgICBjbGVhckludGVydmFsKHNlbGYudGltZXIpXG4gICAgICAgIH1cbiAgICAgIH0sIDEwMDApXG4gICAgfSxcbiAgICAvLyDnm5HlkKwg6Z+z6aKR5YGc5q2i5pe25YaN6LW35LiA5Liq6Z+z6aKRXG4gICAgbGlzdGVuKHNlbGYpIHtcbiAgICAgIHNlbGYubGlzdGVuID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChzZWxmLnRpY2sgIT09IHRpbWVMb3dsaW1pdCkge1xuICAgICAgICAgIHdlcHkuZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUoe1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5tZXRob2RzLnBsYXlub2lzZShzZWxmKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSwgNTApXG4gICAgfSxcbiAgICB0b3VjaHN0YXJ0KGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5zdGFyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgfSxcbiAgICB0b3VjaG1vdmUoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLmN1clBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgICAgc2VsZi5jaGFuZ2VQb2ludCsrXG4gICAgICBpZiAoc2VsZi50b3VjaG1vdmUpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnRpbWVDaGFuZ2Uoc2VsZilcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvdWNoZW5kKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYgKHNlbGYudG91Y2htb3ZlKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy5pbWFnZUNoYW5nZShzZWxmKVxuICAgICAgfVxuICAgIH0sXG4gICAgdGltZUNoYW5nZShzZWxmKSB7XG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeFBvc10gLSBzZWxmLnN0YXJQb2ludFt4UG9zXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50W3lQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeVBvc11cbiAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA8IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID4gY2hhbmdlVGltZVBvaW50KSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeVBvc10gPiBzZWxmLnN0YXJQb2ludFt5UG9zXSAmJiBzZWxmLnRpY2sgPiB0aW1lTG93bGltaXQpIHtcbiAgICAgICAgICAgIC8vIOWQkeS4i+a7kVxuICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrIC0gc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeVBvc10gPCBzZWxmLnN0YXJQb2ludFt5UG9zXSAmJiBzZWxmLnRpY2sgPCB0aW1lVXBsaW1pdCkge1xuICAgICAgICAgICAgLy8g5ZCR5LiK5ruRXG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgKyBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5Yi35paw5pe26Ze0XG4gICAgc2V0VGltZShzZWxmKSB7XG4gICAgICBsZXQgY3VycmVudFRpbWUgPSBzZWxmLm1ldGhvZHMuY3VycmVudFRpbWUoc2VsZi50aWNrKVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgIH0pXG4gICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgIH0sXG4gICAgLy8g6K6h566X5pe26Ze05qC85byPXG4gICAgY3VycmVudFRpbWUodGljaykge1xuICAgICAgbGV0IG1pbiA9ICh0aWNrIC0gKHRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluXG4gICAgICBsZXQgc2VjID0gdGljayAlIHNlY29uZHNQZXJNaW5cbiAgICAgIGlmICh0aWNrID09PSB0aW1lVXBsaW1pdCkge1xuICAgICAgICByZXR1cm4gbG9vcFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1pbiA8IDEwKSB7XG4gICAgICAgICAgbWluID0gJzAnICsgbWluXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlYyA8IDEwKSB7XG4gICAgICAgICAgc2VjID0gJzAnICsgc2VjXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbiArICcgOiAnICsgc2VjXG4gICAgICB9XG4gICAgfSxcbiAgICBpbWFnZUNoYW5nZShzZWxmKSB7XG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeFBvc10gLSBzZWxmLnN0YXJQb2ludFt4UG9zXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50W3lQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeVBvc11cbiAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID4gY2hhbmdlSW1hZ2VQb2ludCkge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3hQb3NdID4gc2VsZi5zdGFyUG9pbnRbeFBvc10pIHtcbiAgICAgICAgICAgIC8vIOWQkeWPs+WIklxuICAgICAgICAgICAgc3dpdGNoIChzZWxmLm5vZGUuaW1hZ2VOb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgJ0dPTEQnOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ1RSRUUnOlxuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9IG5vZGVHb2xkXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnV0FURVInOlxuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9IG5vZGVUcmVlXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnRklSRSc6XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gbm9kZVdhdGVyXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnU09JTCc6XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gbm9kZUZpcmVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuY3VyUG9pbnRbeFBvc10gPCBzZWxmLnN0YXJQb2ludFt4UG9zXSkge1xuICAgICAgICAgICAgLy8g5b6A5bem5YiSXG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYubm9kZS5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnR09MRCc6XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gbm9kZVRyZWVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdUUkVFJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlV2F0ZXJcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdXQVRFUic6XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gbm9kZUZpcmVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdGSVJFJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2lzZVNvaWxcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdTT0lMJzpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5b2S5b+DJyxcbiAgICAgIGRlc2M6ICfpg73luILllqfpl7kg5L2V5aSE5b2S5b+DJyxcbiAgICAgIHBhdGg6ICcvcGFnZS9ub2lzZSdcbiAgICB9XG4gIH1cbiAgb25TaG93KCkge1xuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIHZhciBhbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xuICAgICAgZHVyYXRpb246IDgwMDAsXG4gICAgICB0aW1pbmdGdW5jdGlvbjogJ2Vhc2UnLFxuICAgIH0pXG4gICAgc2VsZi5hbmltYXRpb24gPSBhbmltYXRpb25cbiAgICBhbmltYXRpb24udHJhbnNsYXRlWSgyMDApXG4gICAgc2VsZi5zZXREYXRhKHtcbiAgICAgIGFuaW1hdGlvbkRhdGE6IGFuaW1hdGlvbi5leHBvcnQoKVxuICAgIH0pXG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIHNlbGYubWV0aG9kcy5kYXRlKHNlbGYpXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLnNob3dJbWdlID0gZmFsc2VcbiAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgIHNob3dJbWdlOiBmYWxzZVxuICAgICAgfSlcbiAgICB9LCA1MDAwKVxuICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgIHNlbGYudGljayA9IGluaXRpYWxNaW4gKiBzZWNvbmRzUGVyTWluXG4gIH1cbn1cbiJdfQ==