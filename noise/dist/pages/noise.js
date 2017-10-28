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
var timeUplimit = 60;
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
      starPoint: [0, 0],
      curPoint: [0, 0],
      touches: [],
      changePoint: 0,
      node: nodeWater
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
        self.methods.playnoise(self);
      },
      pause: function pause() {
        var self = this;
        self.pauseOrContinue = false;
        _wepy2.default.pauseBackgroundAudio();
      },
      end: function end() {
        var self = this;
        self.startButton = true;
        _wepy2.default.stopBackgroundAudio();
      },
      playnoise: function playnoise(self) {
        _wepy2.default.playBackgroundAudio({
          dataUrl: self.node.noise,
          title: ''
        });
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
            if (self.curPoint[yPos] > self.starPoint[yPos] && self.tick > 0) {
              // 向下滑
              self.tick = self.tick - secondsPerMin;
              self.methods.setTime(self, self.tick);
              self.changePoint = 0;
            }
            if (self.curPoint[yPos] < self.starPoint[yPos] && self.tick < 3600) {
              // 向上滑
              self.tick = self.tick + secondsPerMin;
              self.methods.setTime(self, self.tick);
              self.changePoint = 0;
            }
          }
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
      },
      setTime: function setTime(self, tick) {
        var currentTime = self.methods.currentTime(self.tick);
        self.setData({
          time: currentTime
        });
        self.time = currentTime;
      },
      currentTime: function currentTime(tick) {
        if (tick < 0) {
          // return loop
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbImNhbGVuZGFyIiwicmVxdWlyZSIsImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxNaW4iLCJzZWNvbmRzUGVyTWluIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwidGltZVVwbGltaXQiLCJ0aW1lTG93bGltaXQiLCJsb29wIiwidHJ1ZU9wYWNpdHkiLCJmYWxzZU9wYWNpdHkiLCJub2RlV2F0ZXIiLCJtYXJrIiwiYmdjb2xvciIsIm5vaXNlIiwiaW1hZ2VOb2RlIiwid2F0ZXJQb2ludCIsInRyZWVQb2ludCIsImdvbGRQb2ludCIsImZpcmVQb2ludCIsInNvaWxQb2ludCIsIm5vZGVHb2xkIiwibm9kZVRyZWUiLCJub2RlRmlyZSIsIm5vaXNlU29pbCIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJzdGFydEJ1dHRvbiIsInBhdXNlT3JDb250aW51ZSIsInRvdWNobW92ZSIsImx1bmFyIiwiZGF0ZXMiLCJ0aW1lIiwidGljayIsInN0YXJQb2ludCIsImN1clBvaW50IiwidG91Y2hlcyIsImNoYW5nZVBvaW50Iiwibm9kZSIsIm1ldGhvZHMiLCJkYXRlIiwic2VsZiIsIkRhdGUiLCJ3ZWVrcyIsIndlZWsiLCJnZXRVVENEYXkiLCJ3ZWVrZCIsIm1vbnRoIiwiZ2V0TW9udGgiLCJtb250aHMiLCJtb24iLCJkYXkiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibHVuYXJkYXRlIiwic29sYXIybHVuYXIiLCJsdW5hck1vbnRocyIsImx1bmFyRGF5cyIsImxEYXkiLCJsdW5hckRheSIsImxNb250aCIsInN0YXJ0IiwicGxheW5vaXNlIiwicGF1c2UiLCJwYXVzZUJhY2tncm91bmRBdWRpbyIsImVuZCIsInN0b3BCYWNrZ3JvdW5kQXVkaW8iLCJwbGF5QmFja2dyb3VuZEF1ZGlvIiwiZGF0YVVybCIsInRpdGxlIiwidG91Y2hzdGFydCIsImUiLCJwYWdlWCIsInBhZ2VZIiwidGltZUNoYW5nZSIsInRvdWNoZW5kIiwiaW1hZ2VDaGFuZ2UiLCJ4Y2hhbmdlIiwieWNoYW5nZSIsIk1hdGgiLCJhYnMiLCJzZXRUaW1lIiwiY3VycmVudFRpbWUiLCJzZXREYXRhIiwibWluIiwic2VjIiwiY29uc29sZSIsImxvZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxXQUFXQyxRQUFRLHNCQUFSLENBQWpCO0FBQ0EsSUFBTUMsa0JBQWtCLFNBQXhCO0FBQ0EsSUFBTUMsYUFBYSxFQUFuQjtBQUNBLElBQU1DLGdCQUFnQixFQUF0QjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLGtCQUFrQixDQUF4QjtBQUNBLElBQU1DLG1CQUFtQixDQUF6QjtBQUNBLElBQU1DLGNBQWMsRUFBcEI7QUFDQSxJQUFNQyxlQUFlLENBQXJCO0FBQ0EsSUFBTUMsT0FBTyxHQUFiO0FBQ0EsSUFBTUMsY0FBYyxDQUFwQjtBQUNBLElBQU1DLGVBQWUsR0FBckI7QUFDQSxJQUFNQyxZQUFZO0FBQ2hCQyxRQUFNLElBRFU7QUFFaEJDLFdBQVMseUJBRk87QUFHaEJDLFNBQU8sMkNBSFM7QUFJaEJDLGFBQVcsT0FKSztBQUtoQkMsY0FBWVAsV0FMSTtBQU1oQlEsYUFBV1AsWUFOSztBQU9oQlEsYUFBV1IsWUFQSztBQVFoQlMsYUFBV1QsWUFSSztBQVNoQlUsYUFBV1Y7QUFUSyxDQUFsQjtBQVdBLElBQU1XLFdBQVc7QUFDZlQsUUFBTSxJQURTO0FBRWZDLFdBQVMsMEJBRk07QUFHZkMsU0FBTywwQ0FIUTtBQUlmQyxhQUFXLE1BSkk7QUFLZkMsY0FBWU4sWUFMRztBQU1mTyxhQUFXUCxZQU5JO0FBT2ZRLGFBQVdULFdBUEk7QUFRZlUsYUFBV1QsWUFSSTtBQVNmVSxhQUFXVjtBQVRJLENBQWpCO0FBV0EsSUFBTVksV0FBVztBQUNmVixRQUFNLElBRFM7QUFF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QUwsR0FBWW5DLGFBQWFDLGFBQXpCO0FBQ0F3RixjQUFRQyxHQUFSLENBQVkvQyxLQUFLVCxJQUFqQixFQUF1QlMsS0FBS1IsSUFBNUI7QUFDRDs7OztFQTNMZ0MsZUFBS3dELEk7O2tCQUFuQmxFLEsiLCJmaWxlIjoibm9pc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmNvbnN0IGNhbGVuZGFyID0gcmVxdWlyZSgnLi4vcGFnZXMvY2FsZW5kYXIuanMnKVxuY29uc3QgaW5pdGlhbFRpbWVUZXh0ID0gJzIwIDogMDAnXG5jb25zdCBpbml0aWFsTWluID0gMjBcbmNvbnN0IHNlY29uZHNQZXJNaW4gPSA2MFxuY29uc3QgeFBvcyA9IDBcbmNvbnN0IHlQb3MgPSAxXG5jb25zdCBjaGFuZ2VUaW1lUG9pbnQgPSAxXG5jb25zdCBjaGFuZ2VJbWFnZVBvaW50ID0gNVxuY29uc3QgdGltZVVwbGltaXQgPSA2MFxuY29uc3QgdGltZUxvd2xpbWl0ID0gMFxuY29uc3QgbG9vcCA9ICfiiJ4nXG5jb25zdCB0cnVlT3BhY2l0eSA9IDFcbmNvbnN0IGZhbHNlT3BhY2l0eSA9IDAuM1xuY29uc3Qgbm9kZVdhdGVyID0ge1xuICBtYXJrOiAn6Zuo5rC0JyxcbiAgYmdjb2xvcjogJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMTIpJyxcbiAgbm9pc2U6ICdodHRwOi8vd3d3LnNtYXJ0ZXN0ZWUuY29tL25vaXNlL3dhdGVyLm1wMycsXG4gIGltYWdlTm9kZTogJ1dBVEVSJyxcbiAgd2F0ZXJQb2ludDogdHJ1ZU9wYWNpdHksXG4gIHRyZWVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBnb2xkUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZmlyZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gIHNvaWxQb2ludDogZmFsc2VPcGFjaXR5XG59XG5jb25zdCBub2RlR29sZCA9IHtcbiAgbWFyazogJ+WvuumSnycsXG4gIGJnY29sb3I6ICdyZ2JhKCAyNTUsIDI1NSwgMCwgMC4xMiknLFxuICBub2lzZTogJ2h0dHA6Ly93d3cuc21hcnRlc3RlZS5jb20vbm9pc2UvZ29sZC5tcDMnLFxuICBpbWFnZU5vZGU6ICdHT0xEJyxcbiAgd2F0ZXJQb2ludDogZmFsc2VPcGFjaXR5LFxuICB0cmVlUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZ29sZFBvaW50OiB0cnVlT3BhY2l0eSxcbiAgZmlyZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gIHNvaWxQb2ludDogZmFsc2VPcGFjaXR5XG59XG5jb25zdCBub2RlVHJlZSA9IHtcbiAgbWFyazogJ+ajruaelycsXG4gIGJnY29sb3I6ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMTIpJyxcbiAgbm9pc2U6ICdodHRwOi8vd3d3LnNtYXJ0ZXN0ZWUuY29tL25vaXNlL3RyZWUubXAzJyxcbiAgaW1hZ2VOb2RlOiAnVFJFRScsXG4gIHdhdGVyUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgdHJlZVBvaW50OiB0cnVlT3BhY2l0eSxcbiAgZ29sZFBvaW50OiBmYWxzZU9wYWNpdHksXG4gIGZpcmVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBzb2lsUG9pbnQ6IGZhbHNlT3BhY2l0eVxufVxuY29uc3Qgbm9kZUZpcmUgPSB7XG4gIG1hcms6ICfnr53ngasnLFxuICBiZ2NvbG9yOiAncmdiYSggMjU1LCAwLCAwLCAwLjEyKScsXG4gIG5vaXNlOiAnaHR0cDovL3d3dy5zbWFydGVzdGVlLmNvbS9ub2lzZS9maXJlLm1wMycsXG4gIGltYWdlTm9kZTogJ0ZJUkUnLFxuICB3YXRlclBvaW50OiBmYWxzZU9wYWNpdHksXG4gIHRyZWVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBnb2xkUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZmlyZVBvaW50OiB0cnVlT3BhY2l0eSxcbiAgc29pbFBvaW50OiBmYWxzZU9wYWNpdHlcbn1cbmNvbnN0IG5vaXNlU29pbCA9IHtcbiAgbWFyazogJ+a1qua9ricsXG4gIGJnY29sb3I6ICdyZ2JhKCAyMzgsIDk5LCA5OSwgMC4xMiknLFxuICBub2lzZTogJ2h0dHA6Ly93d3cuc21hcnRlc3RlZS5jb20vbm9pc2Uvc29pbC5tcDMnLFxuICBpbWFnZU5vZGU6ICdTT0lMJyxcbiAgd2F0ZXJQb2ludDogZmFsc2VPcGFjaXR5LFxuICB0cmVlUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZ29sZFBvaW50OiBmYWxzZU9wYWNpdHksXG4gIGZpcmVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBzb2lsUG9pbnQ6IHRydWVPcGFjaXR5XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICcnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBzdGFydEJ1dHRvbjogdHJ1ZSxcbiAgICBwYXVzZU9yQ29udGludWU6IHRydWUsXG4gICAgdG91Y2htb3ZlOiB0cnVlLFxuICAgIGx1bmFyOiBudWxsLFxuICAgIGRhdGVzOiBudWxsLFxuICAgIHRpbWU6IG51bGwsXG4gICAgdGljazogbnVsbCxcbiAgICBzdGFyUG9pbnQ6IFswLCAwXSxcbiAgICBjdXJQb2ludDogWzAsIDBdLFxuICAgIHRvdWNoZXM6IFtdLFxuICAgIGNoYW5nZVBvaW50OiAwLFxuICAgIG5vZGU6IG5vZGVXYXRlclxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgZGF0ZShzZWxmKSB7XG4gICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIGNvbnN0IHdlZWtzID0gWydTdW4nLCAnTW9uJywgJ1R1ZXMnLCAnV2VkJywgJ1RodXInLCAnRnJpJywgJ1NhdCddXG4gICAgICBjb25zdCB3ZWVrID0gZGF0ZS5nZXRVVENEYXkoKVxuICAgICAgY29uc3Qgd2Vla2QgPSB3ZWVrc1t3ZWVrXVxuICAgICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKClcbiAgICAgIGNvbnN0IG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVnJywgJ1NlcHQnLCAnT2N0JywgJ05vdicsICdEZWMnXVxuICAgICAgY29uc3QgbW9uID0gbW9udGhzW21vbnRoXVxuICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKClcbiAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICAgIHNlbGYuZGF0ZXMgPSBtb24gKyAnICcgKyBkYXkgKyAnICcgKyB3ZWVrZCArICcgJyArIHllYXJcbiAgICAgIGxldCBsdW5hcmRhdGUgPSBjYWxlbmRhci5zb2xhcjJsdW5hcih5ZWFyLCBtb250aCArIDEsIGRheSlcbiAgICAgIGNvbnN0IGx1bmFyTW9udGhzID0gWyfmraPmnIgnLCAn6LSw5pyIJywgJ+WPgeaciCcsICfogobmnIgnLCAn5LyN5pyIJywgJ+mZhuaciCcsICfkuIPmnIgnLCAn5o2M5pyIJywgJ+eOluaciCcsICfmi77mnIgnLCAn5ou+5aO55pyIJywgJ+iFiuaciCddXG4gICAgICBjb25zdCBsdW5hckRheXMgPSBbJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJywgJ+S4gycsICflhasnLCAn5LmdJywgJ+WNgSddXG4gICAgICBpZiAobHVuYXJkYXRlLmxEYXkgPD0gMTApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICfliJ0nICsgbHVuYXJEYXlzW2x1bmFyZGF0ZS5sRGF5IC0gMV1cbiAgICAgIH0gZWxzZSBpZiAobHVuYXJkYXRlLmxEYXkgPiAxMCAmJiBsdW5hcmRhdGUubERheSA8IDIwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5Y2BJyArIGx1bmFyRGF5c1tsdW5hcmRhdGUubERheSAtIDExXVxuICAgICAgfSBlbHNlIGlmIChsdW5hcmRhdGUubERheSA+IDIwICYmIGx1bmFyZGF0ZS5sRGF5IDwgMzApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICflu78nICsgbHVuYXJEYXlzW2x1bmFyZGF0ZS5sRGF5IC0gMjFdXG4gICAgICB9IGVsc2UgaWYgKGx1bmFyZGF0ZS5sRGF5ID09PSAyMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+S6jOWNgSdcbiAgICAgIH0gZWxzZSBpZiAobHVuYXJkYXRlLmxEYXkgPT09IDMwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5LiJ5Y2BJ1xuICAgICAgfVxuICAgICAgc2VsZi5sdW5hciA9ICflhpzljoYnICsgbHVuYXJNb250aHNbbHVuYXJkYXRlLmxNb250aCAtIDFdICsgc2VsZi5sdW5hckRheVxuICAgIH0sXG4gICAgc3RhcnQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhcnRCdXR0b24gPSBmYWxzZVxuICAgICAgc2VsZi5wYXVzZU9yQ29udGludWUgPSB0cnVlXG4gICAgICBzZWxmLm1ldGhvZHMucGxheW5vaXNlKHNlbGYpXG4gICAgfSxcbiAgICBwYXVzZSgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5wYXVzZU9yQ29udGludWUgPSBmYWxzZVxuICAgICAgd2VweS5wYXVzZUJhY2tncm91bmRBdWRpbygpXG4gICAgfSxcbiAgICBlbmQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhcnRCdXR0b24gPSB0cnVlXG4gICAgICB3ZXB5LnN0b3BCYWNrZ3JvdW5kQXVkaW8oKVxuICAgIH0sXG4gICAgcGxheW5vaXNlKHNlbGYpIHtcbiAgICAgIHdlcHkucGxheUJhY2tncm91bmRBdWRpbyh7XG4gICAgICAgIGRhdGFVcmw6IHNlbGYubm9kZS5ub2lzZSxcbiAgICAgICAgdGl0bGU6ICcnXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICAgIHNlbGYuY2hhbmdlUG9pbnQrK1xuICAgICAgaWYgKHNlbGYudG91Y2htb3ZlKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lQ2hhbmdlKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICB0b3VjaGVuZChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGlmIChzZWxmLnRvdWNobW92ZSkge1xuICAgICAgICBzZWxmLm1ldGhvZHMuaW1hZ2VDaGFuZ2Uoc2VsZilcbiAgICAgIH1cbiAgICB9LFxuICAgIHRpbWVDaGFuZ2Uoc2VsZikge1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50W3hQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeFBvc11cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt5UG9zXSAtIHNlbGYuc3RhclBvaW50W3lQb3NdXG4gICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPCBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA+IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3lQb3NdID4gc2VsZi5zdGFyUG9pbnRbeVBvc10gJiYgc2VsZi50aWNrID4gMCkge1xuICAgICAgICAgICAgLy8g5ZCR5LiL5ruRXG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgLSBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt5UG9zXSA8IHNlbGYuc3RhclBvaW50W3lQb3NdICYmIHNlbGYudGljayA8IDM2MDApIHtcbiAgICAgICAgICAgIC8vIOWQkeS4iua7kVxuICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrICsgc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGltYWdlQ2hhbmdlKHNlbGYpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt4UG9zXSAtIHNlbGYuc3RhclBvaW50W3hQb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeVBvc10gLSBzZWxmLnN0YXJQb2ludFt5UG9zXVxuICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID4gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VJbWFnZVBvaW50KSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeFBvc10gPiBzZWxmLnN0YXJQb2ludFt4UG9zXSkge1xuICAgICAgICAgICAgLy8g5ZCR5Y+z5YiSXG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYubm9kZS5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnR09MRCc6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnVFJFRSc6XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gbm9kZUdvbGRcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdXQVRFUic6XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gbm9kZVRyZWVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdGSVJFJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlV2F0ZXJcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdTT0lMJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlRmlyZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5jdXJQb2ludFt4UG9zXSA8IHNlbGYuc3RhclBvaW50W3hQb3NdKSB7XG4gICAgICAgICAgICAvLyDlvoDlt6bliJJcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5ub2RlLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlICdHT0xEJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlVHJlZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ1RSRUUnOlxuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9IG5vZGVXYXRlclxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ1dBVEVSJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlRmlyZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ0ZJUkUnOlxuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9IG5vaXNlU29pbFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ1NPSUwnOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc2V0VGltZShzZWxmLCB0aWNrKSB7XG4gICAgICBsZXQgY3VycmVudFRpbWUgPSBzZWxmLm1ldGhvZHMuY3VycmVudFRpbWUoc2VsZi50aWNrKVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgIH0pXG4gICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgIH0sXG4gICAgY3VycmVudFRpbWUodGljaykge1xuICAgICAgaWYgKHRpY2sgPCAwKSB7XG4gICAgICAgIC8vIHJldHVybiBsb29wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgbWluID0gKHRpY2sgLSAodGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW5cbiAgICAgICAgbGV0IHNlYyA9IHRpY2sgJSBzZWNvbmRzUGVyTWluXG4gICAgICAgIGlmIChtaW4gPiB0aW1lVXBsaW1pdCkge1xuICAgICAgICAgIHRpY2sgPSAtMVxuICAgICAgICAgIHJldHVybiBsb29wXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG1pbiA8IDEwKSB7XG4gICAgICAgICAgICBtaW4gPSAnMCcgKyBtaW5cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlYyA8IDEwKSB7XG4gICAgICAgICAgICBzZWMgPSAnMCcgKyBzZWNcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1pbiArICcgOiAnICsgc2VjXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIHNlbGYubWV0aG9kcy5kYXRlKHNlbGYpXG4gICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgc2VsZi50aWNrID0gaW5pdGlhbE1pbiAqIHNlY29uZHNQZXJNaW5cbiAgICBjb25zb2xlLmxvZyhzZWxmLnRpbWUsIHNlbGYudGljaylcbiAgfVxufVxuIl19