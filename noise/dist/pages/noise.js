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
  noise: 'http://www.smartestee.com/noise/water.mp3',
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
  noise: 'http://www.smartestee.com/noise/gold.mp3',
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
  noise: 'http://www.smartestee.com/noise/tree.mp3',
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
  noise: 'http://www.smartestee.com/noise/fire.mp3',
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
  noise: 'http://www.smartestee.com/noise/soil.mp3',
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
      navigationBarTitleText: ''
    }, _this.data = {
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
      circlecolor: 'rgba( 0, 0, 0, 0)'
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
        console.log(self.tick);
        if (self.tick === timeLowlimit) {} else {
          self.methods.playnoise(self);
          self.methods.listen(self);
        }
        if (self.tick > timeLowlimit && self.tick < timeUplimit) {
          self.methods.time(self);
        }
        console.log('start');
      },
      pause: function pause() {
        var self = this;
        self.pauseOrContinue = false;
        _wepy2.default.pauseBackgroundAudio();
        self.circlecolor = 'rgba( 0, 0, 0, 0)';
        clearInterval(self.listen);
        clearInterval(self.timer);
        console.log('pause');
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
        console.log('end');
      },
      playnoise: function playnoise(self) {
        _wepy2.default.playBackgroundAudio({
          dataUrl: self.node.noise,
          title: ''
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
    key: 'onLoad',
    value: function onLoad() {
      var self = this;
      self.methods.date(self);
      self.time = initialTimeText;
      self.tick = initialMin * secondsPerMin;
      console.log(self.time, self.tick);
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/noise'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbImNhbGVuZGFyIiwicmVxdWlyZSIsImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxNaW4iLCJzZWNvbmRzUGVyTWluIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwidGltZVVwbGltaXQiLCJ0aW1lTG93bGltaXQiLCJsb29wIiwidHJ1ZU9wYWNpdHkiLCJmYWxzZU9wYWNpdHkiLCJub2RlV2F0ZXIiLCJtYXJrIiwiYmdjb2xvciIsIm5vaXNlIiwiaW1hZ2VOb2RlIiwid2F0ZXJQb2ludCIsInRyZWVQb2ludCIsImdvbGRQb2ludCIsImZpcmVQb2ludCIsInNvaWxQb2ludCIsIm5vZGVHb2xkIiwibm9kZVRyZWUiLCJub2RlRmlyZSIsIm5vaXNlU29pbCIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJzdGFydEJ1dHRvbiIsInBhdXNlT3JDb250aW51ZSIsInRvdWNobW92ZSIsImx1bmFyIiwiZGF0ZXMiLCJ0aW1lIiwidGljayIsInRpbWVyIiwibGlzdGVuIiwic3RhclBvaW50IiwiY3VyUG9pbnQiLCJ0b3VjaGVzIiwiY2hhbmdlUG9pbnQiLCJub2RlIiwic3RhcnQiLCJwYXVzZSIsImNvbnRpbnVlcyIsImVuZCIsInNoYWRvd2NvbG9yIiwiY2lyY2xlY29sb3IiLCJtZXRob2RzIiwiZGF0ZSIsInNlbGYiLCJEYXRlIiwid2Vla3MiLCJ3ZWVrIiwiZ2V0VVRDRGF5Iiwid2Vla2QiLCJtb250aCIsImdldE1vbnRoIiwibW9udGhzIiwibW9uIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsImx1bmFyZGF0ZSIsInNvbGFyMmx1bmFyIiwibHVuYXJNb250aHMiLCJsdW5hckRheXMiLCJsRGF5IiwibHVuYXJEYXkiLCJsTW9udGgiLCJjb25zb2xlIiwibG9nIiwicGxheW5vaXNlIiwicGF1c2VCYWNrZ3JvdW5kQXVkaW8iLCJjbGVhckludGVydmFsIiwic3RvcEJhY2tncm91bmRBdWRpbyIsInBsYXlCYWNrZ3JvdW5kQXVkaW8iLCJkYXRhVXJsIiwidGl0bGUiLCJzZXRJbnRlcnZhbCIsInNldFRpbWUiLCJzZXREYXRhIiwiZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUiLCJzdWNjZXNzIiwicmVzIiwic3RhdHVzIiwidG91Y2hzdGFydCIsImUiLCJwYWdlWCIsInBhZ2VZIiwidGltZUNoYW5nZSIsInRvdWNoZW5kIiwiaW1hZ2VDaGFuZ2UiLCJ4Y2hhbmdlIiwieWNoYW5nZSIsIk1hdGgiLCJhYnMiLCJjdXJyZW50VGltZSIsIm1pbiIsInNlYyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxXQUFXQyxRQUFRLHNCQUFSLENBQWpCO0FBQ0EsSUFBTUMsa0JBQWtCLFNBQXhCO0FBQ0EsSUFBTUMsYUFBYSxFQUFuQjtBQUNBLElBQU1DLGdCQUFnQixFQUF0QjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLGtCQUFrQixDQUF4QjtBQUNBLElBQU1DLG1CQUFtQixDQUF6QjtBQUNBLElBQU1DLGNBQWMsSUFBcEI7QUFDQSxJQUFNQyxlQUFlLENBQXJCO0FBQ0EsSUFBTUMsT0FBTyxHQUFiO0FBQ0EsSUFBTUMsY0FBYyxDQUFwQjtBQUNBLElBQU1DLGVBQWUsR0FBckI7QUFDQSxJQUFNQyxZQUFZO0FBQ2hCQyxRQUFNLElBRFU7QUFFaEJDLFdBQVMseUJBRk87QUFHaEJDLFNBQU8sMkNBSFM7QUFJaEJDLGFBQVcsT0FKSztBQUtoQkMsY0FBWVAsV0FMSTtBQU1oQlEsYUFBV1AsWUFOSztBQU9oQlEsYUFBV1IsWUFQSztBQVFoQlMsYUFBV1QsWUFSSztBQVNoQlUsYUFBV1Y7QUFUSyxDQUFsQjtBQVdBLElBQU1XLFdBQVc7QUFDZlQsUUFBTSxJQURTO0FBRWZDLFdBQVMsMEJBRk07QUFHZkMsU0FBTywwQ0FI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QUFMLEdBQVlsQixTQUFaO0FBQ0E7QUFDRixxQkFBSyxNQUFMO0FBQ0U7QUFkSjtBQWdCQTJCLG1CQUFLVixXQUFMLEdBQW1CLENBQW5CO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUEvTk8sSzs7Ozs7NkJBaU9EO0FBQ1AsVUFBSVUsT0FBTyxJQUFYO0FBQ0FBLFdBQUtGLE9BQUwsQ0FBYUMsSUFBYixDQUFrQkMsSUFBbEI7QUFDQUEsV0FBS2pCLElBQUwsR0FBWW5DLGVBQVo7QUFDQW9ELFdBQUtoQixJQUFMLEdBQVluQyxhQUFhQyxhQUF6QjtBQUNBdUUsY0FBUUMsR0FBUixDQUFZdEIsS0FBS2pCLElBQWpCLEVBQXVCaUIsS0FBS2hCLElBQTVCO0FBQ0Q7Ozs7RUFqUWdDLGVBQUttRSxJOztrQkFBbkI3RSxLIiwiZmlsZSI6Im5vaXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG5jb25zdCBjYWxlbmRhciA9IHJlcXVpcmUoJy4uL3BhZ2VzL2NhbGVuZGFyLmpzJylcbmNvbnN0IGluaXRpYWxUaW1lVGV4dCA9ICcyMCA6IDAwJ1xuY29uc3QgaW5pdGlhbE1pbiA9IDIwXG5jb25zdCBzZWNvbmRzUGVyTWluID0gNjBcbmNvbnN0IHhQb3MgPSAwXG5jb25zdCB5UG9zID0gMVxuY29uc3QgY2hhbmdlVGltZVBvaW50ID0gMVxuY29uc3QgY2hhbmdlSW1hZ2VQb2ludCA9IDVcbmNvbnN0IHRpbWVVcGxpbWl0ID0gMzY2MFxuY29uc3QgdGltZUxvd2xpbWl0ID0gMFxuY29uc3QgbG9vcCA9ICfiiJ4nXG5jb25zdCB0cnVlT3BhY2l0eSA9IDFcbmNvbnN0IGZhbHNlT3BhY2l0eSA9IDAuM1xuY29uc3Qgbm9kZVdhdGVyID0ge1xuICBtYXJrOiAn6Zuo5rC0JyxcbiAgYmdjb2xvcjogJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMTIpJyxcbiAgbm9pc2U6ICdodHRwOi8vd3d3LnNtYXJ0ZXN0ZWUuY29tL25vaXNlL3dhdGVyLm1wMycsXG4gIGltYWdlTm9kZTogJ1dBVEVSJyxcbiAgd2F0ZXJQb2ludDogdHJ1ZU9wYWNpdHksXG4gIHRyZWVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBnb2xkUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZmlyZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gIHNvaWxQb2ludDogZmFsc2VPcGFjaXR5XG59XG5jb25zdCBub2RlR29sZCA9IHtcbiAgbWFyazogJ+WvuumSnycsXG4gIGJnY29sb3I6ICdyZ2JhKCAyNTUsIDI1NSwgMCwgMC4xMiknLFxuICBub2lzZTogJ2h0dHA6Ly93d3cuc21hcnRlc3RlZS5jb20vbm9pc2UvZ29sZC5tcDMnLFxuICBpbWFnZU5vZGU6ICdHT0xEJyxcbiAgd2F0ZXJQb2ludDogZmFsc2VPcGFjaXR5LFxuICB0cmVlUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZ29sZFBvaW50OiB0cnVlT3BhY2l0eSxcbiAgZmlyZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gIHNvaWxQb2ludDogZmFsc2VPcGFjaXR5XG59XG5jb25zdCBub2RlVHJlZSA9IHtcbiAgbWFyazogJ+ajruaelycsXG4gIGJnY29sb3I6ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMTIpJyxcbiAgbm9pc2U6ICdodHRwOi8vd3d3LnNtYXJ0ZXN0ZWUuY29tL25vaXNlL3RyZWUubXAzJyxcbiAgaW1hZ2VOb2RlOiAnVFJFRScsXG4gIHdhdGVyUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgdHJlZVBvaW50OiB0cnVlT3BhY2l0eSxcbiAgZ29sZFBvaW50OiBmYWxzZU9wYWNpdHksXG4gIGZpcmVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBzb2lsUG9pbnQ6IGZhbHNlT3BhY2l0eVxufVxuY29uc3Qgbm9kZUZpcmUgPSB7XG4gIG1hcms6ICfnr53ngasnLFxuICBiZ2NvbG9yOiAncmdiYSggMjU1LCAwLCAwLCAwLjEyKScsXG4gIG5vaXNlOiAnaHR0cDovL3d3dy5zbWFydGVzdGVlLmNvbS9ub2lzZS9maXJlLm1wMycsXG4gIGltYWdlTm9kZTogJ0ZJUkUnLFxuICB3YXRlclBvaW50OiBmYWxzZU9wYWNpdHksXG4gIHRyZWVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBnb2xkUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZmlyZVBvaW50OiB0cnVlT3BhY2l0eSxcbiAgc29pbFBvaW50OiBmYWxzZU9wYWNpdHlcbn1cbmNvbnN0IG5vaXNlU29pbCA9IHtcbiAgbWFyazogJ+a1qua9ricsXG4gIGJnY29sb3I6ICdyZ2JhKCAyMzgsIDk5LCA5OSwgMC4xMiknLFxuICBub2lzZTogJ2h0dHA6Ly93d3cuc21hcnRlc3RlZS5jb20vbm9pc2Uvc29pbC5tcDMnLFxuICBpbWFnZU5vZGU6ICdTT0lMJyxcbiAgd2F0ZXJQb2ludDogZmFsc2VPcGFjaXR5LFxuICB0cmVlUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZ29sZFBvaW50OiBmYWxzZU9wYWNpdHksXG4gIGZpcmVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBzb2lsUG9pbnQ6IHRydWVPcGFjaXR5XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICcnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBzdGFydEJ1dHRvbjogdHJ1ZSxcbiAgICBwYXVzZU9yQ29udGludWU6IHRydWUsXG4gICAgdG91Y2htb3ZlOiB0cnVlLFxuICAgIGx1bmFyOiBudWxsLFxuICAgIGRhdGVzOiBudWxsLFxuICAgIHRpbWU6IG51bGwsXG4gICAgdGljazogbnVsbCxcbiAgICB0aW1lcjogbnVsbCxcbiAgICBsaXN0ZW46IG51bGwsXG4gICAgc3RhclBvaW50OiBbMCwgMF0sXG4gICAgY3VyUG9pbnQ6IFswLCAwXSxcbiAgICB0b3VjaGVzOiBbXSxcbiAgICBjaGFuZ2VQb2ludDogMCxcbiAgICBub2RlOiBub2RlV2F0ZXIsXG4gICAgc3RhcnQ6ICflvIDlp4snLFxuICAgIHBhdXNlOiAn5pqC5YGcJyxcbiAgICBjb250aW51ZXM6ICfnu6fnu60nLFxuICAgIGVuZDogJ+e7k+adnycsXG4gICAgc2hhZG93Y29sb3I6ICcjMzMzMzMzJyxcbiAgICBjaXJjbGVjb2xvcjogJ3JnYmEoIDAsIDAsIDAsIDApJ1xuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgZGF0ZShzZWxmKSB7XG4gICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIGNvbnN0IHdlZWtzID0gWydTdW4nLCAnTW9uJywgJ1R1ZXMnLCAnV2VkJywgJ1RodXInLCAnRnJpJywgJ1NhdCddXG4gICAgICBjb25zdCB3ZWVrID0gZGF0ZS5nZXRVVENEYXkoKVxuICAgICAgY29uc3Qgd2Vla2QgPSB3ZWVrc1t3ZWVrXVxuICAgICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKClcbiAgICAgIGNvbnN0IG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVnJywgJ1NlcHQnLCAnT2N0JywgJ05vdicsICdEZWMnXVxuICAgICAgY29uc3QgbW9uID0gbW9udGhzW21vbnRoXVxuICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKClcbiAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICAgIHNlbGYuZGF0ZXMgPSBtb24gKyAnICcgKyBkYXkgKyAnICcgKyB3ZWVrZCArICcgJyArIHllYXJcbiAgICAgIGxldCBsdW5hcmRhdGUgPSBjYWxlbmRhci5zb2xhcjJsdW5hcih5ZWFyLCBtb250aCArIDEsIGRheSlcbiAgICAgIGNvbnN0IGx1bmFyTW9udGhzID0gWyfmraPmnIgnLCAn6LSw5pyIJywgJ+WPgeaciCcsICfogobmnIgnLCAn5LyN5pyIJywgJ+mZhuaciCcsICfkuIPmnIgnLCAn5o2M5pyIJywgJ+eOluaciCcsICfmi77mnIgnLCAn5ou+5aO55pyIJywgJ+iFiuaciCddXG4gICAgICBjb25zdCBsdW5hckRheXMgPSBbJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJywgJ+S4gycsICflhasnLCAn5LmdJywgJ+WNgSddXG4gICAgICBpZiAobHVuYXJkYXRlLmxEYXkgPD0gMTApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICfliJ0nICsgbHVuYXJEYXlzW2x1bmFyZGF0ZS5sRGF5IC0gMV1cbiAgICAgIH0gZWxzZSBpZiAobHVuYXJkYXRlLmxEYXkgPiAxMCAmJiBsdW5hcmRhdGUubERheSA8IDIwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5Y2BJyArIGx1bmFyRGF5c1tsdW5hcmRhdGUubERheSAtIDExXVxuICAgICAgfSBlbHNlIGlmIChsdW5hcmRhdGUubERheSA+IDIwICYmIGx1bmFyZGF0ZS5sRGF5IDwgMzApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICflu78nICsgbHVuYXJEYXlzW2x1bmFyZGF0ZS5sRGF5IC0gMjFdXG4gICAgICB9IGVsc2UgaWYgKGx1bmFyZGF0ZS5sRGF5ID09PSAyMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+S6jOWNgSdcbiAgICAgIH0gZWxzZSBpZiAobHVuYXJkYXRlLmxEYXkgPT09IDMwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5LiJ5Y2BJ1xuICAgICAgfVxuICAgICAgc2VsZi5sdW5hciA9ICflhpzljoYnICsgbHVuYXJNb250aHNbbHVuYXJkYXRlLmxNb250aCAtIDFdICsgc2VsZi5sdW5hckRheVxuICAgIH0sXG4gICAgc3RhcnQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhcnRCdXR0b24gPSBmYWxzZVxuICAgICAgc2VsZi5wYXVzZU9yQ29udGludWUgPSB0cnVlXG4gICAgICBzZWxmLnRvdWNobW92ZSA9IGZhbHNlXG4gICAgICBzZWxmLmNpcmNsZWNvbG9yID0gc2VsZi5ub2RlLmJnY29sb3JcbiAgICAgIHNlbGYuc2hhZG93Y29sb3IgPSBzZWxmLm5vZGUuYmdjb2xvclxuICAgICAgY29uc29sZS5sb2coc2VsZi50aWNrKVxuICAgICAgaWYgKHNlbGYudGljayA9PT0gdGltZUxvd2xpbWl0KSB7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLm1ldGhvZHMucGxheW5vaXNlKHNlbGYpXG4gICAgICAgIHNlbGYubWV0aG9kcy5saXN0ZW4oc2VsZilcbiAgICAgIH1cbiAgICAgIGlmIChzZWxmLnRpY2sgPiB0aW1lTG93bGltaXQgJiYgc2VsZi50aWNrIDwgdGltZVVwbGltaXQpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnRpbWUoc2VsZilcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKCdzdGFydCcpXG4gICAgfSxcbiAgICBwYXVzZSgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5wYXVzZU9yQ29udGludWUgPSBmYWxzZVxuICAgICAgd2VweS5wYXVzZUJhY2tncm91bmRBdWRpbygpXG4gICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDAsIDAsIDAsIDApJ1xuICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLmxpc3RlbilcbiAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi50aW1lcilcbiAgICAgIGNvbnNvbGUubG9nKCdwYXVzZScpXG4gICAgfSxcbiAgICBlbmQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhcnRCdXR0b24gPSB0cnVlXG4gICAgICBzZWxmLnRvdWNobW92ZSA9IHRydWVcbiAgICAgIHdlcHkuc3RvcEJhY2tncm91bmRBdWRpbygpXG4gICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDAsIDAsIDAsIDApJ1xuICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICcjMzMzMzMzJ1xuICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLmxpc3RlbilcbiAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi50aW1lcilcbiAgICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgICAgc2VsZi50aWNrID0gaW5pdGlhbE1pbiAqIHNlY29uZHNQZXJNaW5cbiAgICAgIGNvbnNvbGUubG9nKCdlbmQnKVxuICAgIH0sXG4gICAgcGxheW5vaXNlKHNlbGYpIHtcbiAgICAgIHdlcHkucGxheUJhY2tncm91bmRBdWRpbyh7XG4gICAgICAgIGRhdGFVcmw6IHNlbGYubm9kZS5ub2lzZSxcbiAgICAgICAgdGl0bGU6ICcnXG4gICAgICB9KVxuICAgIH0sXG4gICAgLy8g5YCS6K6h5pe2IOaXtumXtOWIsFxuICAgIHRpbWUoc2VsZikge1xuICAgICAgc2VsZi50aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLnRpY2stLVxuICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmKVxuICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnRpY2spXG4gICAgICAgIGlmIChzZWxmLnRpY2sgPT09IHRpbWVMb3dsaW1pdCkge1xuICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICBjaXJjbGVjb2xvcjogJ3JnYmEoIDAsIDAsIDAsIDApJyxcbiAgICAgICAgICAgIHNoYWRvd2NvbG9yOiAnIzMzMzMzMycsXG4gICAgICAgICAgICB0aW1lOiBpbml0aWFsVGltZVRleHQsXG4gICAgICAgICAgICBzdGFydEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgIHRpY2s6IGluaXRpYWxNaW4gKiBzZWNvbmRzUGVyTWluLFxuICAgICAgICAgICAgdG91Y2htb3ZlOiB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICBzZWxmLnN0YXJ0QnV0dG9uID0gdHJ1ZVxuICAgICAgICAgIHNlbGYudG91Y2htb3ZlID0gdHJ1ZVxuICAgICAgICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgICAgICAgIHNlbGYudGljayA9IGluaXRpYWxNaW4gKiBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAwLCAwLCAwLCAwKSdcbiAgICAgICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJyMzMzMzMzMnXG4gICAgICAgICAgd2VweS5zdG9wQmFja2dyb3VuZEF1ZGlvKClcbiAgICAgICAgICBjbGVhckludGVydmFsKHNlbGYubGlzdGVuKVxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi50aW1lcilcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMClcbiAgICB9LFxuICAgIC8vIOebkeWQrCDpn7PpopHlgZzmraLml7blho3otbfkuIDkuKrpn7PpopFcbiAgICBsaXN0ZW4oc2VsZikge1xuICAgICAgc2VsZi5saXN0ZW4gPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHNlbGYudGljayAhPT0gdGltZUxvd2xpbWl0KSB7XG4gICAgICAgICAgd2VweS5nZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSh7XG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgIT09IDEpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm1ldGhvZHMucGxheW5vaXNlKHNlbGYpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LCA1MClcbiAgICB9LFxuICAgIHRvdWNoc3RhcnQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLnN0YXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICB9LFxuICAgIHRvdWNobW92ZShlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuY3VyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgICBzZWxmLmNoYW5nZVBvaW50KytcbiAgICAgIGlmIChzZWxmLnRvdWNobW92ZSkge1xuICAgICAgICBzZWxmLm1ldGhvZHMudGltZUNoYW5nZShzZWxmKVxuICAgICAgfVxuICAgIH0sXG4gICAgdG91Y2hlbmQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBpZiAoc2VsZi50b3VjaG1vdmUpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLmltYWdlQ2hhbmdlKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICB0aW1lQ2hhbmdlKHNlbGYpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt4UG9zXSAtIHNlbGYuc3RhclBvaW50W3hQb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeVBvc10gLSBzZWxmLnN0YXJQb2ludFt5UG9zXVxuICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpIDwgTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VUaW1lUG9pbnQpIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt5UG9zXSA+IHNlbGYuc3RhclBvaW50W3lQb3NdICYmIHNlbGYudGljayA+IHRpbWVMb3dsaW1pdCkge1xuICAgICAgICAgICAgLy8g5ZCR5LiL5ruRXG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgLSBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt5UG9zXSA8IHNlbGYuc3RhclBvaW50W3lQb3NdICYmIHNlbGYudGljayA8IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgICAgICAvLyDlkJHkuIrmu5FcbiAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayArIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDliLfmlrDml7bpl7RcbiAgICBzZXRUaW1lKHNlbGYpIHtcbiAgICAgIGxldCBjdXJyZW50VGltZSA9IHNlbGYubWV0aG9kcy5jdXJyZW50VGltZShzZWxmLnRpY2spXG4gICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICB0aW1lOiBjdXJyZW50VGltZVxuICAgICAgfSlcbiAgICAgIHNlbGYudGltZSA9IGN1cnJlbnRUaW1lXG4gICAgfSxcbiAgICAvLyDorqHnrpfml7bpl7TmoLzlvI9cbiAgICBjdXJyZW50VGltZSh0aWNrKSB7XG4gICAgICBsZXQgbWluID0gKHRpY2sgLSAodGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW5cbiAgICAgIGxldCBzZWMgPSB0aWNrICUgc2Vjb25kc1Blck1pblxuICAgICAgaWYgKHRpY2sgPT09IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgIHJldHVybiBsb29wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobWluIDwgMTApIHtcbiAgICAgICAgICBtaW4gPSAnMCcgKyBtaW5cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VjIDwgMTApIHtcbiAgICAgICAgICBzZWMgPSAnMCcgKyBzZWNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluICsgJyA6ICcgKyBzZWNcbiAgICAgIH1cbiAgICB9LFxuICAgIGltYWdlQ2hhbmdlKHNlbGYpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt4UG9zXSAtIHNlbGYuc3RhclBvaW50W3hQb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeVBvc10gLSBzZWxmLnN0YXJQb2ludFt5UG9zXVxuICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID4gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VJbWFnZVBvaW50KSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeFBvc10gPiBzZWxmLnN0YXJQb2ludFt4UG9zXSkge1xuICAgICAgICAgICAgLy8g5ZCR5Y+z5YiSXG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYubm9kZS5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnR09MRCc6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnVFJFRSc6XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gbm9kZUdvbGRcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdXQVRFUic6XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gbm9kZVRyZWVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdGSVJFJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlV2F0ZXJcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdTT0lMJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlRmlyZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5jdXJQb2ludFt4UG9zXSA8IHNlbGYuc3RhclBvaW50W3hQb3NdKSB7XG4gICAgICAgICAgICAvLyDlvoDlt6bliJJcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5ub2RlLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlICdHT0xEJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlVHJlZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ1RSRUUnOlxuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9IG5vZGVXYXRlclxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ1dBVEVSJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlRmlyZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ0ZJUkUnOlxuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9IG5vaXNlU29pbFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ1NPSUwnOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgc2VsZi5tZXRob2RzLmRhdGUoc2VsZilcbiAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICBzZWxmLnRpY2sgPSBpbml0aWFsTWluICogc2Vjb25kc1Blck1pblxuICAgIGNvbnNvbGUubG9nKHNlbGYudGltZSwgc2VsZi50aWNrKVxuICB9XG59XG4iXX0=