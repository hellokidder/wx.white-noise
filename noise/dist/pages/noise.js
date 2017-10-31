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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbImNhbGVuZGFyIiwicmVxdWlyZSIsImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxNaW4iLCJzZWNvbmRzUGVyTWluIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwidGltZVVwbGltaXQiLCJ0aW1lTG93bGltaXQiLCJsb29wIiwidHJ1ZU9wYWNpdHkiLCJmYWxzZU9wYWNpdHkiLCJub2RlV2F0ZXIiLCJtYXJrIiwiYmdjb2xvciIsIm5vaXNlIiwiaW1hZ2VOb2RlIiwid2F0ZXJQb2ludCIsInRyZWVQb2ludCIsImdvbGRQb2ludCIsImZpcmVQb2ludCIsInNvaWxQb2ludCIsIm5vZGVHb2xkIiwibm9kZVRyZWUiLCJub2RlRmlyZSIsIm5vaXNlU29pbCIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJzaG93SW1nZSIsInN0YXJ0QnV0dG9uIiwicGF1c2VPckNvbnRpbnVlIiwidG91Y2htb3ZlIiwibHVuYXIiLCJkYXRlcyIsInRpbWUiLCJ0aWNrIiwidGltZXIiLCJsaXN0ZW4iLCJzdGFyUG9pbnQiLCJjdXJQb2ludCIsInRvdWNoZXMiLCJjaGFuZ2VQb2ludCIsIm5vZGUiLCJzdGFydCIsInBhdXNlIiwiY29udGludWVzIiwiZW5kIiwic2hhZG93Y29sb3IiLCJjaXJjbGVjb2xvciIsIm1ldGhvZHMiLCJkYXRlIiwic2VsZiIsIkRhdGUiLCJ3ZWVrcyIsIndlZWsiLCJnZXRVVENEYXkiLCJ3ZWVrZCIsIm1vbnRoIiwiZ2V0TW9udGgiLCJtb250aHMiLCJtb24iLCJkYXkiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibHVuYXJkYXRlIiwic29sYXIybHVuYXIiLCJsdW5hck1vbnRocyIsImx1bmFyRGF5cyIsImxEYXkiLCJsdW5hckRheSIsImxNb250aCIsInBsYXlub2lzZSIsInBhdXNlQmFja2dyb3VuZEF1ZGlvIiwiY2xlYXJJbnRlcnZhbCIsInN0b3BCYWNrZ3JvdW5kQXVkaW8iLCJwbGF5QmFja2dyb3VuZEF1ZGlvIiwiZGF0YVVybCIsInRpdGxlIiwic2V0SW50ZXJ2YWwiLCJzZXRUaW1lIiwiY29uc29sZSIsImxvZyIsInNldERhdGEiLCJnZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSIsInN1Y2Nlc3MiLCJyZXMiLCJzdGF0dXMiLCJ0b3VjaHN0YXJ0IiwiZSIsInBhZ2VYIiwicGFnZVkiLCJ0aW1lQ2hhbmdlIiwidG91Y2hlbmQiLCJpbWFnZUNoYW5nZSIsInhjaGFuZ2UiLCJ5Y2hhbmdlIiwiTWF0aCIsImFicyIsImN1cnJlbnRUaW1lIiwibWluIiwic2VjIiwiZGVzYyIsInBhdGgiLCJzZXRUaW1lb3V0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVdDLFFBQVEsc0JBQVIsQ0FBakI7QUFDQSxJQUFNQyxrQkFBa0IsU0FBeEI7QUFDQSxJQUFNQyxhQUFhLEVBQW5CO0FBQ0EsSUFBTUMsZ0JBQWdCLEVBQXRCO0FBQ0EsSUFBTUMsT0FBTyxDQUFiO0FBQ0EsSUFBTUMsT0FBTyxDQUFiO0FBQ0EsSUFBTUMsa0JBQWtCLENBQXhCO0FBQ0EsSUFBTUMsbUJBQW1CLENBQXpCO0FBQ0EsSUFBTUMsY0FBYyxJQUFwQjtBQUNBLElBQU1DLGVBQWUsQ0FBckI7QUFDQSxJQUFNQyxPQUFPLEdBQWI7QUFDQSxJQUFNQyxjQUFjLENBQXBCO0FBQ0EsSUFBTUMsZUFBZSxHQUFyQjtBQUNBLElBQU1DLFlBQVk7QUFDaEJDLFFBQU0sSUFEVTtBQUVoQkMsV0FBUyx5QkFGTztBQUdoQkMsU0FBTyxtQ0FIUztBQUloQkMsYUFBVyxPQUpLO0FBS2hCQyxjQUFZUCxXQUxJO0FBTWhCUSxhQUFXUCxZQU5LO0FBT2hCUSxhQUFXUixZQVBLO0FBUWhCUyxhQUFXVCxZQVJLO0FBU2hCVSxhQUFXVjtBQVRLLENBQWxCO0FBV0EsSUFBTVcsV0FBVztBQUNmVCxRQUFN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bUIsQ0FBbkI7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQTNOTyxLOzs7Ozt3Q0E2TlU7QUFDbEIsYUFBTztBQUNMcUMsZUFBTyxJQURGO0FBRUx3QixjQUFNLFdBRkQ7QUFHTEMsY0FBTTtBQUhELE9BQVA7QUFLRDs7OzZCQUNRO0FBQ1AsVUFBSXBELE9BQU8sSUFBWDtBQUNBQSxXQUFLRixPQUFMLENBQWFDLElBQWIsQ0FBa0JDLElBQWxCO0FBQ0FxRCxpQkFBVyxZQUFNO0FBQ2ZyRCxhQUFLdkIsUUFBTCxHQUFnQixLQUFoQjtBQUNBdUIsYUFBS2dDLE9BQUwsQ0FBYTtBQUNYdkQsb0JBQVU7QUFEQyxTQUFiO0FBR0QsT0FMRCxFQUtHLElBTEg7QUFNQXVCLFdBQUtqQixJQUFMLEdBQVlwQyxlQUFaO0FBQ0FxRCxXQUFLaEIsSUFBTCxHQUFZcEMsYUFBYUMsYUFBekI7QUFDRDs7OztFQTFRZ0MsZUFBS3lHLEk7O2tCQUFuQmpGLEsiLCJmaWxlIjoibm9pc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmNvbnN0IGNhbGVuZGFyID0gcmVxdWlyZSgnLi4vcGFnZXMvY2FsZW5kYXIuanMnKVxuY29uc3QgaW5pdGlhbFRpbWVUZXh0ID0gJzIwIDogMDAnXG5jb25zdCBpbml0aWFsTWluID0gMjBcbmNvbnN0IHNlY29uZHNQZXJNaW4gPSA2MFxuY29uc3QgeFBvcyA9IDBcbmNvbnN0IHlQb3MgPSAxXG5jb25zdCBjaGFuZ2VUaW1lUG9pbnQgPSAxXG5jb25zdCBjaGFuZ2VJbWFnZVBvaW50ID0gNVxuY29uc3QgdGltZVVwbGltaXQgPSAzNjYwXG5jb25zdCB0aW1lTG93bGltaXQgPSAwXG5jb25zdCBsb29wID0gJ+KInidcbmNvbnN0IHRydWVPcGFjaXR5ID0gMVxuY29uc3QgZmFsc2VPcGFjaXR5ID0gMC4zXG5jb25zdCBub2RlV2F0ZXIgPSB7XG4gIG1hcms6ICfpm6jmsLQnLFxuICBiZ2NvbG9yOiAncmdiYSgwLCAyNTUsIDI1NSwgMC4xMiknLFxuICBub2lzZTogJ2h0dHA6Ly8xMC4wLjAuMTAwL25vaXNlL3dhdGVyLm1wMycsXG4gIGltYWdlTm9kZTogJ1dBVEVSJyxcbiAgd2F0ZXJQb2ludDogdHJ1ZU9wYWNpdHksXG4gIHRyZWVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBnb2xkUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZmlyZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gIHNvaWxQb2ludDogZmFsc2VPcGFjaXR5XG59XG5jb25zdCBub2RlR29sZCA9IHtcbiAgbWFyazogJ+WvuumSnycsXG4gIGJnY29sb3I6ICdyZ2JhKCAyNTUsIDI1NSwgMCwgMC4xMiknLFxuICBub2lzZTogJ2h0dHA6Ly8xMC4wLjAuMTAwL25vaXNlL2dvbGQubXAzJyxcbiAgaW1hZ2VOb2RlOiAnR09MRCcsXG4gIHdhdGVyUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgdHJlZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gIGdvbGRQb2ludDogdHJ1ZU9wYWNpdHksXG4gIGZpcmVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBzb2lsUG9pbnQ6IGZhbHNlT3BhY2l0eVxufVxuY29uc3Qgbm9kZVRyZWUgPSB7XG4gIG1hcms6ICfmo67mnpcnLFxuICBiZ2NvbG9yOiAncmdiYSggMCwgMjU1LCAwLCAwLjEyKScsXG4gIG5vaXNlOiAnaHR0cDovLzEwLjAuMC4xMDAvbm9pc2UvdHJlZS5tcDMnLFxuICBpbWFnZU5vZGU6ICdUUkVFJyxcbiAgd2F0ZXJQb2ludDogZmFsc2VPcGFjaXR5LFxuICB0cmVlUG9pbnQ6IHRydWVPcGFjaXR5LFxuICBnb2xkUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZmlyZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gIHNvaWxQb2ludDogZmFsc2VPcGFjaXR5XG59XG5jb25zdCBub2RlRmlyZSA9IHtcbiAgbWFyazogJ+evneeBqycsXG4gIGJnY29sb3I6ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMTIpJyxcbiAgbm9pc2U6ICdodHRwOi8vMTAuMC4wLjEwMC9ub2lzZS9maXJlLm1wMycsXG4gIGltYWdlTm9kZTogJ0ZJUkUnLFxuICB3YXRlclBvaW50OiBmYWxzZU9wYWNpdHksXG4gIHRyZWVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBnb2xkUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZmlyZVBvaW50OiB0cnVlT3BhY2l0eSxcbiAgc29pbFBvaW50OiBmYWxzZU9wYWNpdHlcbn1cbmNvbnN0IG5vaXNlU29pbCA9IHtcbiAgbWFyazogJ+a1qua9ricsXG4gIGJnY29sb3I6ICdyZ2JhKCAyMzgsIDk5LCA5OSwgMC4xMiknLFxuICBub2lzZTogJ2h0dHA6Ly8xMC4wLjAuMTAwL25vaXNlL3NvaWwubXAzJyxcbiAgaW1hZ2VOb2RlOiAnU09JTCcsXG4gIHdhdGVyUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgdHJlZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gIGdvbGRQb2ludDogZmFsc2VPcGFjaXR5LFxuICBmaXJlUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgc29pbFBvaW50OiB0cnVlT3BhY2l0eVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5b2S5b+DJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgc2hvd0ltZ2U6IHRydWUsXG4gICAgc3RhcnRCdXR0b246IHRydWUsXG4gICAgcGF1c2VPckNvbnRpbnVlOiB0cnVlLFxuICAgIHRvdWNobW92ZTogdHJ1ZSxcbiAgICBsdW5hcjogbnVsbCxcbiAgICBkYXRlczogbnVsbCxcbiAgICB0aW1lOiBudWxsLFxuICAgIHRpY2s6IG51bGwsXG4gICAgdGltZXI6IG51bGwsXG4gICAgbGlzdGVuOiBudWxsLFxuICAgIHN0YXJQb2ludDogWzAsIDBdLFxuICAgIGN1clBvaW50OiBbMCwgMF0sXG4gICAgdG91Y2hlczogW10sXG4gICAgY2hhbmdlUG9pbnQ6IDAsXG4gICAgbm9kZTogbm9kZVdhdGVyLFxuICAgIHN0YXJ0OiAn5byA5aeLJyxcbiAgICBwYXVzZTogJ+aaguWBnCcsXG4gICAgY29udGludWVzOiAn57un57utJyxcbiAgICBlbmQ6ICfnu5PmnZ8nLFxuICAgIHNoYWRvd2NvbG9yOiAnIzMzMzMzMycsXG4gICAgY2lyY2xlY29sb3I6ICdyZ2JhKCAwLCAwLCAwLCAwKSdcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGRhdGUoc2VsZikge1xuICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICBjb25zdCB3ZWVrcyA9IFsnU3VuJywgJ01vbicsICdUdWVzJywgJ1dlZCcsICdUaHVyJywgJ0ZyaScsICdTYXQnXVxuICAgICAgY29uc3Qgd2VlayA9IGRhdGUuZ2V0VVRDRGF5KClcbiAgICAgIGNvbnN0IHdlZWtkID0gd2Vla3Nbd2Vla11cbiAgICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpXG4gICAgICBjb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1ZycsICdTZXB0JywgJ09jdCcsICdOb3YnLCAnRGVjJ11cbiAgICAgIGNvbnN0IG1vbiA9IG1vbnRoc1ttb250aF1cbiAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpXG4gICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgICBzZWxmLmRhdGVzID0gbW9uICsgJyAnICsgZGF5ICsgJyAnICsgd2Vla2QgKyAnICcgKyB5ZWFyXG4gICAgICBsZXQgbHVuYXJkYXRlID0gY2FsZW5kYXIuc29sYXIybHVuYXIoeWVhciwgbW9udGggKyAxLCBkYXkpXG4gICAgICBjb25zdCBsdW5hck1vbnRocyA9IFsn5q2j5pyIJywgJ+i0sOaciCcsICflj4HmnIgnLCAn6IKG5pyIJywgJ+S8jeaciCcsICfpmYbmnIgnLCAn5LiD5pyIJywgJ+aNjOaciCcsICfnjpbmnIgnLCAn5ou+5pyIJywgJ+aLvuWjueaciCcsICfohYrmnIgnXVxuICAgICAgY29uc3QgbHVuYXJEYXlzID0gWyfkuIAnLCAn5LqMJywgJ+S4iScsICflm5snLCAn5LqUJywgJ+WFrScsICfkuIMnLCAn5YWrJywgJ+S5nScsICfljYEnXVxuICAgICAgaWYgKGx1bmFyZGF0ZS5sRGF5IDw9IDEwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5YidJyArIGx1bmFyRGF5c1tsdW5hcmRhdGUubERheSAtIDFdXG4gICAgICB9IGVsc2UgaWYgKGx1bmFyZGF0ZS5sRGF5ID4gMTAgJiYgbHVuYXJkYXRlLmxEYXkgPCAyMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+WNgScgKyBsdW5hckRheXNbbHVuYXJkYXRlLmxEYXkgLSAxMV1cbiAgICAgIH0gZWxzZSBpZiAobHVuYXJkYXRlLmxEYXkgPiAyMCAmJiBsdW5hcmRhdGUubERheSA8IDMwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5bu/JyArIGx1bmFyRGF5c1tsdW5hcmRhdGUubERheSAtIDIxXVxuICAgICAgfSBlbHNlIGlmIChsdW5hcmRhdGUubERheSA9PT0gMjApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICfkuozljYEnXG4gICAgICB9IGVsc2UgaWYgKGx1bmFyZGF0ZS5sRGF5ID09PSAzMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+S4ieWNgSdcbiAgICAgIH1cbiAgICAgIHNlbGYubHVuYXIgPSAn5Yac5Y6GJyArIGx1bmFyTW9udGhzW2x1bmFyZGF0ZS5sTW9udGggLSAxXSArIHNlbGYubHVuYXJEYXlcbiAgICB9LFxuICAgIHN0YXJ0KCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLnN0YXJ0QnV0dG9uID0gZmFsc2VcbiAgICAgIHNlbGYucGF1c2VPckNvbnRpbnVlID0gdHJ1ZVxuICAgICAgc2VsZi50b3VjaG1vdmUgPSBmYWxzZVxuICAgICAgc2VsZi5jaXJjbGVjb2xvciA9IHNlbGYubm9kZS5iZ2NvbG9yXG4gICAgICBzZWxmLnNoYWRvd2NvbG9yID0gc2VsZi5ub2RlLmJnY29sb3JcbiAgICAgIGlmIChzZWxmLnRpY2sgPT09IHRpbWVMb3dsaW1pdCkge1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnBsYXlub2lzZShzZWxmKVxuICAgICAgICBzZWxmLm1ldGhvZHMubGlzdGVuKHNlbGYpXG4gICAgICB9XG4gICAgICBpZiAoc2VsZi50aWNrID4gdGltZUxvd2xpbWl0ICYmIHNlbGYudGljayA8IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICBwYXVzZSgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5wYXVzZU9yQ29udGludWUgPSBmYWxzZVxuICAgICAgd2VweS5wYXVzZUJhY2tncm91bmRBdWRpbygpXG4gICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDAsIDAsIDAsIDApJ1xuICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLmxpc3RlbilcbiAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi50aW1lcilcbiAgICB9LFxuICAgIGVuZCgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5zdGFydEJ1dHRvbiA9IHRydWVcbiAgICAgIHNlbGYudG91Y2htb3ZlID0gdHJ1ZVxuICAgICAgd2VweS5zdG9wQmFja2dyb3VuZEF1ZGlvKClcbiAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSggMCwgMCwgMCwgMCknXG4gICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJyMzMzMzMzMnXG4gICAgICBjbGVhckludGVydmFsKHNlbGYubGlzdGVuKVxuICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLnRpbWVyKVxuICAgICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgICBzZWxmLnRpY2sgPSBpbml0aWFsTWluICogc2Vjb25kc1Blck1pblxuICAgIH0sXG4gICAgcGxheW5vaXNlKHNlbGYpIHtcbiAgICAgIHdlcHkucGxheUJhY2tncm91bmRBdWRpbyh7XG4gICAgICAgIGRhdGFVcmw6IHNlbGYubm9kZS5ub2lzZSxcbiAgICAgICAgdGl0bGU6ICcxMjMnXG4gICAgICB9KVxuICAgIH0sXG4gICAgLy8g5YCS6K6h5pe2IOaXtumXtOWIsFxuICAgIHRpbWUoc2VsZikge1xuICAgICAgc2VsZi50aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLnRpY2stLVxuICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmKVxuICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnRpY2spXG4gICAgICAgIGlmIChzZWxmLnRpY2sgPT09IHRpbWVMb3dsaW1pdCkge1xuICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICBjaXJjbGVjb2xvcjogJ3JnYmEoIDAsIDAsIDAsIDApJyxcbiAgICAgICAgICAgIHNoYWRvd2NvbG9yOiAnIzMzMzMzMycsXG4gICAgICAgICAgICB0aW1lOiBpbml0aWFsVGltZVRleHQsXG4gICAgICAgICAgICBzdGFydEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgIHRpY2s6IGluaXRpYWxNaW4gKiBzZWNvbmRzUGVyTWluLFxuICAgICAgICAgICAgdG91Y2htb3ZlOiB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICBzZWxmLnN0YXJ0QnV0dG9uID0gdHJ1ZVxuICAgICAgICAgIHNlbGYudG91Y2htb3ZlID0gdHJ1ZVxuICAgICAgICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgICAgICAgIHNlbGYudGljayA9IGluaXRpYWxNaW4gKiBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAwLCAwLCAwLCAwKSdcbiAgICAgICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJyMzMzMzMzMnXG4gICAgICAgICAgd2VweS5zdG9wQmFja2dyb3VuZEF1ZGlvKClcbiAgICAgICAgICBjbGVhckludGVydmFsKHNlbGYubGlzdGVuKVxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi50aW1lcilcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMClcbiAgICB9LFxuICAgIC8vIOebkeWQrCDpn7PpopHlgZzmraLml7blho3otbfkuIDkuKrpn7PpopFcbiAgICBsaXN0ZW4oc2VsZikge1xuICAgICAgc2VsZi5saXN0ZW4gPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHNlbGYudGljayAhPT0gdGltZUxvd2xpbWl0KSB7XG4gICAgICAgICAgd2VweS5nZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSh7XG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgIT09IDEpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm1ldGhvZHMucGxheW5vaXNlKHNlbGYpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LCA1MClcbiAgICB9LFxuICAgIHRvdWNoc3RhcnQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLnN0YXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICB9LFxuICAgIHRvdWNobW92ZShlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuY3VyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgICBzZWxmLmNoYW5nZVBvaW50KytcbiAgICAgIGlmIChzZWxmLnRvdWNobW92ZSkge1xuICAgICAgICBzZWxmLm1ldGhvZHMudGltZUNoYW5nZShzZWxmKVxuICAgICAgfVxuICAgIH0sXG4gICAgdG91Y2hlbmQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBpZiAoc2VsZi50b3VjaG1vdmUpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLmltYWdlQ2hhbmdlKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICB0aW1lQ2hhbmdlKHNlbGYpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt4UG9zXSAtIHNlbGYuc3RhclBvaW50W3hQb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeVBvc10gLSBzZWxmLnN0YXJQb2ludFt5UG9zXVxuICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpIDwgTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VUaW1lUG9pbnQpIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt5UG9zXSA+IHNlbGYuc3RhclBvaW50W3lQb3NdICYmIHNlbGYudGljayA+IHRpbWVMb3dsaW1pdCkge1xuICAgICAgICAgICAgLy8g5ZCR5LiL5ruRXG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgLSBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt5UG9zXSA8IHNlbGYuc3RhclBvaW50W3lQb3NdICYmIHNlbGYudGljayA8IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgICAgICAvLyDlkJHkuIrmu5FcbiAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayArIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDliLfmlrDml7bpl7RcbiAgICBzZXRUaW1lKHNlbGYpIHtcbiAgICAgIGxldCBjdXJyZW50VGltZSA9IHNlbGYubWV0aG9kcy5jdXJyZW50VGltZShzZWxmLnRpY2spXG4gICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICB0aW1lOiBjdXJyZW50VGltZVxuICAgICAgfSlcbiAgICAgIHNlbGYudGltZSA9IGN1cnJlbnRUaW1lXG4gICAgfSxcbiAgICAvLyDorqHnrpfml7bpl7TmoLzlvI9cbiAgICBjdXJyZW50VGltZSh0aWNrKSB7XG4gICAgICBsZXQgbWluID0gKHRpY2sgLSAodGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW5cbiAgICAgIGxldCBzZWMgPSB0aWNrICUgc2Vjb25kc1Blck1pblxuICAgICAgaWYgKHRpY2sgPT09IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgIHJldHVybiBsb29wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobWluIDwgMTApIHtcbiAgICAgICAgICBtaW4gPSAnMCcgKyBtaW5cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VjIDwgMTApIHtcbiAgICAgICAgICBzZWMgPSAnMCcgKyBzZWNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluICsgJyA6ICcgKyBzZWNcbiAgICAgIH1cbiAgICB9LFxuICAgIGltYWdlQ2hhbmdlKHNlbGYpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt4UG9zXSAtIHNlbGYuc3RhclBvaW50W3hQb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeVBvc10gLSBzZWxmLnN0YXJQb2ludFt5UG9zXVxuICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID4gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VJbWFnZVBvaW50KSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeFBvc10gPiBzZWxmLnN0YXJQb2ludFt4UG9zXSkge1xuICAgICAgICAgICAgLy8g5ZCR5Y+z5YiSXG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYubm9kZS5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnR09MRCc6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnVFJFRSc6XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gbm9kZUdvbGRcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdXQVRFUic6XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gbm9kZVRyZWVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdGSVJFJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlV2F0ZXJcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdTT0lMJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlRmlyZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5jdXJQb2ludFt4UG9zXSA8IHNlbGYuc3RhclBvaW50W3hQb3NdKSB7XG4gICAgICAgICAgICAvLyDlvoDlt6bliJJcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5ub2RlLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlICdHT0xEJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlVHJlZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ1RSRUUnOlxuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9IG5vZGVXYXRlclxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ1dBVEVSJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlRmlyZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ0ZJUkUnOlxuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9IG5vaXNlU29pbFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ1NPSUwnOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICflvZLlv4MnLFxuICAgICAgZGVzYzogJ+mDveW4guWWp+mXuSDkvZXlpITlvZLlv4MnLFxuICAgICAgcGF0aDogJy9wYWdlL25vaXNlJ1xuICAgIH1cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgc2VsZi5tZXRob2RzLmRhdGUoc2VsZilcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlbGYuc2hvd0ltZ2UgPSBmYWxzZVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgc2hvd0ltZ2U6IGZhbHNlXG4gICAgICB9KVxuICAgIH0sIDUwMDApXG4gICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgc2VsZi50aWNrID0gaW5pdGlhbE1pbiAqIHNlY29uZHNQZXJNaW5cbiAgfVxufVxuIl19