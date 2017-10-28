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
        self.touchmove = false;
        console.log(self.tick);
        if (self.tick === timeLowlimit) {
          self.methods.end();
        } else {
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
        clearInterval(self.listen);
        clearInterval(self.timer);
        console.log('pause');
      },
      end: function end() {
        var self = this;
        self.startButton = true;
        self.touchmove = true;
        _wepy2.default.stopBackgroundAudio();
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
      time: function time(self) {
        self.timer = setInterval(function () {
          self.tick--;
          self.methods.setTime(self);
          console.log(self.tick);
          if (self.tick === timeLowlimit) {
            self.methods.end();
            clearInterval(self.listen);
            clearInterval(self.timer);
          }
        }, 1000);
      },
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
          console.log('listen');
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
      setTime: function setTime(self) {
        var currentTime = self.methods.currentTime(self.tick);
        self.setData({
          time: currentTime
        });
        self.time = currentTime;
      },
      currentTime: function currentTime(tick) {
        if (tick < 0) {} else {
          var min = (tick - tick % secondsPerMin) / secondsPerMin;
          var sec = tick % secondsPerMin;
          if (tick === timeUplimit) {
            // tick = -1
            // console.log(tick)
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbImNhbGVuZGFyIiwicmVxdWlyZSIsImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxNaW4iLCJzZWNvbmRzUGVyTWluIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwidGltZVVwbGltaXQiLCJ0aW1lTG93bGltaXQiLCJsb29wIiwidHJ1ZU9wYWNpdHkiLCJmYWxzZU9wYWNpdHkiLCJub2RlV2F0ZXIiLCJtYXJrIiwiYmdjb2xvciIsIm5vaXNlIiwiaW1hZ2VOb2RlIiwid2F0ZXJQb2ludCIsInRyZWVQb2ludCIsImdvbGRQb2ludCIsImZpcmVQb2ludCIsInNvaWxQb2ludCIsIm5vZGVHb2xkIiwibm9kZVRyZWUiLCJub2RlRmlyZSIsIm5vaXNlU29pbCIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJzdGFydEJ1dHRvbiIsInBhdXNlT3JDb250aW51ZSIsInRvdWNobW92ZSIsImx1bmFyIiwiZGF0ZXMiLCJ0aW1lIiwidGljayIsInRpbWVyIiwibGlzdGVuIiwic3RhclBvaW50IiwiY3VyUG9pbnQiLCJ0b3VjaGVzIiwiY2hhbmdlUG9pbnQiLCJub2RlIiwibWV0aG9kcyIsImRhdGUiLCJzZWxmIiwiRGF0ZSIsIndlZWtzIiwid2VlayIsImdldFVUQ0RheSIsIndlZWtkIiwibW9udGgiLCJnZXRNb250aCIsIm1vbnRocyIsIm1vbiIsImRheSIsImdldERhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJsdW5hcmRhdGUiLCJzb2xhcjJsdW5hciIsImx1bmFyTW9udGhzIiwibHVuYXJEYXlzIiwibERheSIsImx1bmFyRGF5IiwibE1vbnRoIiwic3RhcnQiLCJjb25zb2xlIiwibG9nIiwiZW5kIiwicGxheW5vaXNlIiwicGF1c2UiLCJwYXVzZUJhY2tncm91bmRBdWRpbyIsImNsZWFySW50ZXJ2YWwiLCJzdG9wQmFja2dyb3VuZEF1ZGlvIiwicGxheUJhY2tncm91bmRBdWRpbyIsImRhdGFVcmwiLCJ0aXRsZSIsInNldEludGVydmFsIiwic2V0VGltZSIsImdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlIiwic3VjY2VzcyIsInJlcyIsInN0YXR1cyIsInRvdWNoc3RhcnQiLCJlIiwicGFnZVgiLCJwYWdlWSIsInRpbWVDaGFuZ2UiLCJ0b3VjaGVuZCIsImltYWdlQ2hhbmdlIiwieGNoYW5nZSIsInljaGFuZ2UiLCJNYXRoIiwiYWJzIiwiY3VycmVudFRpbWUiLCJzZXREYXRhIiwibWluIiwic2VjIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVdDLFFBQVEsc0JBQVIsQ0FBakI7QUFDQSxJQUFNQyxrQkFBa0IsU0FBeEI7QUFDQSxJQUFNQyxhQUFhLEVBQW5CO0FBQ0EsSUFBTUMsZ0JBQWdCLEVBQXRCO0FBQ0EsSUFBTUMsT0FBTyxDQUFiO0FBQ0EsSUFBTUMsT0FBTyxDQUFiO0FBQ0EsSUFBTUMsa0JBQWtCLENBQXhCO0FBQ0EsSUFBTUMsbUJBQW1CLENBQXpCO0FBQ0EsSUFBTUMsY0FBYyxJQUFwQjtBQUNBLElBQU1DLGVBQWUsQ0FBckI7QUFDQSxJQUFNQyxPQUFPLEdBQWI7QUFDQSxJQUFNQyxjQUFjLENBQXBCO0FBQ0EsSUFBTUMsZUFBZSxHQUFyQjtBQUNBLElBQU1DLFlBQVk7QUFDaEJDLFFBQU0sSUFEVTtBQUVoQkMsV0FBUyx5QkFGTztBQUdoQkMsU0FBTywyQ0FIUztBQUloQkMsYUFBVyxPQUpLO0FBS2hCQyxjQUFZUCxXQUxJO0FBTWhCUSxhQUFXUCxZQU5LO0FBT2hCUSxhQUFXUixZQVBLO0FBUWhCUyxhQUFXVCxZQVJLO0FBU2hCVSxhQUFXVjtBQVRLLENBQWxCO0FBV0EsSUFBTVcsV0FBVztBQUNmVCxRQUFNLElBRFM7QUFFZkMsV0FBUywwQkFGTTtBQUdmQyxTQUFPLDBDQUhRO0FBSWZDLGFBQVcsTUFKSTtBQUtmQyxjQUFZTixZQUxHO0FBTWZPLGFBQVdQLFlBTkk7QUFPZlEsYUFBV1QsV0FQSTtBQVFmVSxhQUFXVCxZQVJJO0FBU2ZVLGFBQVdWO0FBVEksQ0FBakI7QUFXQSxJQUFNWSxXQUFXO0FBQ2ZWLFFBQU0sSUFEUztBQUVmQyxXQUFTLHdCQUZNO0FBR2ZDLFNBQU8sMENBSFE7QUFJZkMsYUFBVyxNQUpJO0FBS2ZDLGNBQVlOLFlBTEc7QUFNZk8sYUFBV1IsV0FOSTtBQU9mUyxhQUFXUixZQVBJO0FBUWZTLGFBQVdULFlBUkk7QUFTZlUsYUFBV1Y7QUFUSSxDQUFqQjtBQVdBLElBQU1hLFdBQVc7QUFDZlgsUUFBTSxJQURTO0FBRWZDLFdBQVMsd0JBRk07QUFHZkMsU0FBTywwQ0FIUTtBQUlmQyxhQUFXLE1BSkk7QUFLZkMsY0FBWU4sWUFMRztBQU1mTyxhQUFXUCxZQU5JO0FBT2ZRLGFBQVdSLFlBUEk7QUFRZlMsYUFBV1YsV0FSSTtBQVNmVyxhQUFXVjtBQVRJLENBQWpCO0FBV0EsSUFBTWMsWUFBWTtBQUNoQlosUUFBTSxJQURVO0FBRWhCQyxXQUFTLDBCQUZPO0FBR2hCQyxTQUFPLDBDQUhTO0FBSWhCQyxhQUFXLE1BSks7QUFLaEJDLGNBQVlOLFlBTEk7QUFNaEJPLGFBQVdQLFlBTks7QUFPaEJRLGFBQVdSLFlBUEs7QUFRaEJTLGFBQVdULFlBUks7QUFTaEJVLGFBQVdYO0FBVEssQ0FBbEI7O0lBWXFCZ0IsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLG1CQUFhLElBRFI7QUFFTEMsdUJBQWlCLElBRlo7QUFHTEMsaUJBQVcsSUFITjtBQUlMQyxhQUFPLElBSkY7QUFLTEMsYUFBTyxJQUxGO0FBTUxDLFlBQU0sSUFORDtBQU9MQyxZQUFNLElBUEQ7QUFRTEMsYUFBTyxJQVJGO0FBU0xDLGNBQVEsSUFUSDtBQVVMQyxpQkFBVyxDQUFDLENBQUQsRUFBSSxDQUFKLENBVk47QUFXTEMsZ0JBQVUsQ0FBQyxDQUFELEVBQUksQ0FBSixDQVhMO0FBWUxDLGVBQVMsRUFaSjtBQWFMQyxtQkFBYSxDQWJSO0FBY0xDLFlBQU0vQjtBQWRELEssUUFnQlBnQyxPLEdBQVU7QUFDUkMsVUFEUSxnQkFDSEMsSUFERyxFQUNHO0FBQ1QsWUFBSUQsT0FBTyxJQUFJRSxJQUFKLEVBQVg7QUFDQSxZQUFNQyxRQUFRLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxNQUFmLEVBQXVCLEtBQXZCLEVBQThCLE1BQTlCLEVBQXNDLEtBQXRDLEVBQTZDLEtBQTdDLENBQWQ7QUFDQSxZQUFNQyxPQUFPSixLQUFLSyxTQUFMLEVBQWI7QUFDQSxZQUFNQyxRQUFRSCxNQUFNQyxJQUFOLENBQWQ7QUFDQSxZQUFNRyxRQUFRUCxLQUFLUSxRQUFMLEVBQWQ7QUFDQSxZQUFNQyxTQUFTLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DLE1BQXBDLEVBQTRDLE1BQTVDLEVBQW9ELEtBQXBELEVBQTJELE1BQTNELEVBQW1FLEtBQW5FLEVBQTBFLEtBQTFFLEVBQWlGLEtBQWpGLENBQWY7QUFDQSxZQUFNQyxNQUFNRCxPQUFPRixLQUFQLENBQVo7QUFDQSxZQUFNSSxNQUFNWCxLQUFLWSxPQUFMLEVBQVo7QUFDQSxZQUFNQyxPQUFPYixLQUFLYyxXQUFMLEVBQWI7QUFDQWIsYUFBS1osS0FBTCxHQUFhcUIsTUFBTSxHQUFOLEdBQVlDLEdBQVosR0FBa0IsR0FBbEIsR0FBd0JMLEtBQXhCLEdBQWdDLEdBQWhDLEdBQXNDTyxJQUFuRDtBQUNBLFlBQUlFLFlBQVk5RCxTQUFTK0QsV0FBVCxDQUFxQkgsSUFBckIsRUFBMkJOLFFBQVEsQ0FBbkMsRUFBc0NJLEdBQXRDLENBQWhCO0FBQ0EsWUFBTU0sY0FBYyxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixFQUFtQixJQUFuQixFQUF5QixJQUF6QixFQUErQixJQUEvQixFQUFxQyxJQUFyQyxFQUEyQyxJQUEzQyxFQUFpRCxJQUFqRCxFQUF1RCxJQUF2RCxFQUE2RCxLQUE3RCxFQUFvRSxJQUFwRSxDQUFwQjtBQUNBLFlBQU1DLFlBQVksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsR0FBMUIsRUFBK0IsR0FBL0IsRUFBb0MsR0FBcEMsRUFBeUMsR0FBekMsRUFBOEMsR0FBOUMsQ0FBbEI7QUFDQSxZQUFJSCxVQUFVSSxJQUFWLElBQWtCLEVBQXRCLEVBQTBCO0FBQ3hCbEIsZUFBS21CLFFBQUwsR0FBZ0IsTUFBTUYsVUFBVUgsVUFBVUksSUFBVixHQUFpQixDQUEzQixDQUF0QjtBQUNELFNBRkQsTUFFTyxJQUFJSixVQUFVSSxJQUFWLEdBQWlCLEVBQWpCLElBQXVCSixVQUFVSSxJQUFWLEdBQWlCLEVBQTVDLEVBQWdEO0FBQ3JEbEIsZUFBS21CLFFBQUwsR0FBZ0IsTUFBTUYsVUFBVUgsVUFBVUksSUFBVixHQUFpQixFQUEzQixDQUF0QjtBQUNELFNBRk0sTUFFQSxJQUFJSixVQUFVSSxJQUFWLEdBQWlCLEVBQWpCLElBQXVCSixVQUFVSSxJQUFWLEdBQWlCLEVBQTVDLEVBQWdEO0FBQ3JEbEIsZUFBS21CLFFBQUwsR0FBZ0IsTUFBTUYsVUFBVUgsVUFBVUksSUFBVixHQUFpQixFQUEzQixDQUF0QjtBQUNELFNBRk0sTUFFQSxJQUFJSixVQUFVSSxJQUFWLEtBQW1CLEVBQXZCLEVBQTJCO0FBQ2hDbEIsZUFBS21CLFFBQUwsR0FBZ0IsSUFBaEI7QUFDRCxTQUZNLE1BRUEsSUFBSUwsVUFBVUksSUFBVixLQUFtQixFQUF2QixFQUEyQjtBQUNoQ2xCLGVBQUttQixRQUFMLEdBQWdCLElBQWhCO0FBQ0Q7QUFDRG5CLGFBQUtiLEtBQUwsR0FBYSxPQUFPNkIsWUFBWUYsVUFBVU0sTUFBVixHQUFtQixDQUEvQixDQUFQLEdBQTJDcEIsS0FBS21CLFFBQTdEO0FBQ0QsT0EzQk87QUE0QlJFLFdBNUJRLG1CQTRCQTtBQUNOLFlBQUlyQixPQUFPLElBQVg7QUFDQUEsYUFBS2hCLFdBQUwsR0FBbUIsS0FBbkI7QUFDQWdCLGFBQUtmLGVBQUwsR0FBdUIsSUFBdkI7QUFDQWUsYUFBS2QsU0FBTCxHQUFpQixLQUFqQjtBQUNBb0MsZ0JBQVFDLEdBQVIsQ0FBWXZCLEtBQUtWLElBQWpCO0FBQ0EsWUFBSVUsS0FBS1YsSUFBTCxLQUFjNUIsWUFBbEIsRUFBZ0M7QUFDOUJzQyxlQUFLRixPQUFMLENBQWEwQixHQUFiO0FBQ0QsU0FGRCxNQUVPO0FBQ0x4QixlQUFLRixPQUFMLENBQWEyQixTQUFiLENBQXVCekIsSUFBdkI7QUFDQUEsZUFBS0YsT0FBTCxDQUFhTixNQUFiLENBQW9CUSxJQUFwQjtBQUNEO0FBQ0QsWUFBSUEsS0FBS1YsSUFBTCxHQUFZNUIsWUFBWixJQUE0QnNDLEtBQUtWLElBQUwsR0FBWTdCLFdBQTVDLEVBQXlEO0FBQ3ZEdUMsZUFBS0YsT0FBTCxDQUFhVCxJQUFiLENBQWtCVyxJQUFsQjtBQUNEO0FBQ0RzQixnQkFBUUMsR0FBUixDQUFZLE9BQVo7QUFDRCxPQTVDTztBQTZDUkcsV0E3Q1EsbUJBNkNBO0FBQ04sWUFBSTFCLE9BQU8sSUFBWDtBQUNBQSxhQUFLZixlQUFMLEdBQXVCLEtBQXZCO0FBQ0EsdUJBQUswQyxvQkFBTDtBQUNBQyxzQkFBYzVCLEtBQUtSLE1BQW5CO0FBQ0FvQyxzQkFBYzVCLEtBQUtULEtBQW5CO0FBQ0ErQixnQkFBUUMsR0FBUixDQUFZLE9BQVo7QUFDRCxPQXBETztBQXFEUkMsU0FyRFEsaUJBcURGO0FBQ0osWUFBSXhCLE9BQU8sSUFBWDtBQUNBQSxhQUFLaEIsV0FBTCxHQUFtQixJQUFuQjtBQUNBZ0IsYUFBS2QsU0FBTCxHQUFpQixJQUFqQjtBQUNBLHVCQUFLMkMsbUJBQUw7QUFDQUQsc0JBQWM1QixLQUFLUixNQUFuQjtBQUNBb0Msc0JBQWM1QixLQUFLVCxLQUFuQjtBQUNBUyxhQUFLWCxJQUFMLEdBQVluQyxlQUFaO0FBQ0E4QyxhQUFLVixJQUFMLEdBQVluQyxhQUFhQyxhQUF6QjtBQUNBa0UsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFaO0FBQ0QsT0EvRE87QUFnRVJFLGVBaEVRLHFCQWdFRXpCLElBaEVGLEVBZ0VRO0FBQ2QsdUJBQUs4QixtQkFBTCxDQUF5QjtBQUN2QkMsbUJBQVMvQixLQUFLSCxJQUFMLENBQVU1QixLQURJO0FBRXZCK0QsaUJBQU87QUFGZ0IsU0FBekI7QUFJRCxPQXJFTztBQXNFUjNDLFVBdEVRLGdCQXNFSFcsSUF0RUcsRUFzRUc7QUFDVEEsYUFBS1QsS0FBTCxHQUFhMEMsWUFBWSxZQUFXO0FBQ2xDakMsZUFBS1YsSUFBTDtBQUNBVSxlQUFLRixPQUFMLENBQWFvQyxPQUFiLENBQXFCbEMsSUFBckI7QUFDQXNCLGtCQUFRQyxHQUFSLENBQVl2QixLQUFLVixJQUFqQjtBQUNBLGNBQUlVLEtBQUtWLElBQUwsS0FBYzVCLFlBQWxCLEVBQWdDO0FBQzlCc0MsaUJBQUtGLE9BQUwsQ0FBYTBCLEdBQWI7QUFDQUksMEJBQWM1QixLQUFLUixNQUFuQjtBQUNBb0MsMEJBQWM1QixLQUFLVCxLQUFuQjtBQUNEO0FBQ0YsU0FUWSxFQVNWLElBVFUsQ0FBYjtBQVVELE9BakZPO0FBa0ZSQyxZQWxGUSxrQkFrRkRRLElBbEZDLEVBa0ZLO0FBQ1hBLGFBQUtSLE1BQUwsR0FBY3lDLFlBQVksWUFBVztBQUNuQyxjQUFJakMsS0FBS1YsSUFBTCxLQUFjNUIsWUFBbEIsRUFBZ0M7QUFDOUIsMkJBQUt5RSw2QkFBTCxDQUFtQztBQUNqQ0MsdUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQixvQkFBSUEsSUFBSUMsTUFBSixLQUFlLENBQW5CLEVBQXNCO0FBQ3BCdEMsdUJBQUtGLE9BQUwsQ0FBYTJCLFNBQWIsQ0FBdUJ6QixJQUF2QjtBQUNEO0FBQ0Y7QUFMZ0MsYUFBbkM7QUFPRDtBQUNEc0Isa0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0QsU0FYYSxFQVdYLEVBWFcsQ0FBZDtBQVlELE9BL0ZPO0FBZ0dSZ0IsZ0JBaEdRLHNCQWdHR0MsQ0FoR0gsRUFnR007QUFDWixZQUFJeEMsT0FBTyxJQUFYO0FBQ0FBLGFBQUtQLFNBQUwsR0FBaUIsQ0FBQytDLEVBQUU3QyxPQUFGLENBQVUsQ0FBVixFQUFhOEMsS0FBZCxFQUFxQkQsRUFBRTdDLE9BQUYsQ0FBVSxDQUFWLEVBQWErQyxLQUFsQyxDQUFqQjtBQUNELE9BbkdPO0FBb0dSeEQsZUFwR1EscUJBb0dFc0QsQ0FwR0YsRUFvR0s7QUFDWCxZQUFJeEMsT0FBTyxJQUFYO0FBQ0FBLGFBQUtOLFFBQUwsR0FBZ0IsQ0FBQzhDLEVBQUU3QyxPQUFGLENBQVUsQ0FBVixFQUFhOEMsS0FBZCxFQUFxQkQsRUFBRTdDLE9BQUYsQ0FBVSxDQUFWLEVBQWErQyxLQUFsQyxDQUFoQjtBQUNBMUMsYUFBS0osV0FBTDtBQUNBLFlBQUlJLEtBQUtkLFNBQVQsRUFBb0I7QUFDbEJjLGVBQUtGLE9BQUwsQ0FBYTZDLFVBQWIsQ0FBd0IzQyxJQUF4QjtBQUNEO0FBQ0YsT0EzR087QUE0R1I0QyxjQTVHUSxvQkE0R0NKLENBNUdELEVBNEdJO0FBQ1YsWUFBSXhDLE9BQU8sSUFBWDtBQUNBLFlBQUlBLEtBQUtkLFNBQVQsRUFBb0I7QUFDbEJjLGVBQUtGLE9BQUwsQ0FBYStDLFdBQWIsQ0FBeUI3QyxJQUF6QjtBQUNEO0FBQ0YsT0FqSE87QUFrSFIyQyxnQkFsSFEsc0JBa0hHM0MsSUFsSEgsRUFrSFM7QUFDZixZQUFJOEMsVUFBVTlDLEtBQUtOLFFBQUwsQ0FBY3JDLElBQWQsSUFBc0IyQyxLQUFLUCxTQUFMLENBQWVwQyxJQUFmLENBQXBDO0FBQ0EsWUFBSTBGLFVBQVUvQyxLQUFLTixRQUFMLENBQWNwQyxJQUFkLElBQXNCMEMsS0FBS1AsU0FBTCxDQUFlbkMsSUFBZixDQUFwQztBQUNBLFlBQUkwRixLQUFLQyxHQUFMLENBQVNILE9BQVQsSUFBb0JFLEtBQUtDLEdBQUwsQ0FBU0YsT0FBVCxDQUF4QixFQUEyQztBQUN6QyxjQUFJL0MsS0FBS0osV0FBTCxHQUFtQnJDLGVBQXZCLEVBQXdDO0FBQ3RDLGdCQUFJeUMsS0FBS04sUUFBTCxDQUFjcEMsSUFBZCxJQUFzQjBDLEtBQUtQLFNBQUwsQ0FBZW5DLElBQWYsQ0FBdEIsSUFBOEMwQyxLQUFLVixJQUFMLEdBQVk1QixZQUE5RCxFQUE0RTtBQUMxRTtBQUNBc0MsbUJBQUtWLElBQUwsR0FBWVUsS0FBS1YsSUFBTCxHQUFZbEMsYUFBeEI7QUFDQTRDLG1CQUFLRixPQUFMLENBQWFvQyxPQUFiLENBQXFCbEMsSUFBckIsRUFBMkJBLEtBQUtWLElBQWhDO0FBQ0FVLG1CQUFLSixXQUFMLEdBQW1CLENBQW5CO0FBQ0Q7QUFDRCxnQkFBSUksS0FBS04sUUFBTCxDQUFjcEMsSUFBZCxJQUFzQjBDLEtBQUtQLFNBQUwsQ0FBZW5DLElBQWYsQ0FBdEIsSUFBOEMwQyxLQUFLVixJQUFMLEdBQVk3QixXQUE5RCxFQUEyRTtBQUN6RTtBQUNBdUMsbUJBQUtWLElBQUwsR0FBWVUsS0FBS1YsSUFBTCxHQUFZbEMsYUFBeEI7QUFDQTRDLG1CQUFLRixPQUFMLENBQWFvQyxPQUFiLENBQXFCbEMsSUFBckIsRUFBMkJBLEtBQUtWLElBQWhDO0FBQ0FVLG1CQUFLSixXQUFMLEdBQW1CLENBQW5CO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsT0FySU87QUFzSVJzQyxhQXRJUSxtQkFzSUFsQyxJQXRJQSxFQXNJTTtBQUNaLFlBQUlrRCxjQUFjbEQsS0FBS0YsT0FBTCxDQUFhb0QsV0FBYixDQUF5QmxELEtBQUtWLElBQTlCLENBQWxCO0FBQ0FVLGFBQUttRCxPQUFMLENBQWE7QUFDWDlELGdCQUFNNkQ7QUFESyxTQUFiO0FBR0FsRCxhQUFLWCxJQUFMLEdBQVk2RCxXQUFaO0FBQ0QsT0E1SU87QUE2SVJBLGlCQTdJUSx1QkE2SUk1RCxJQTdJSixFQTZJVTtBQUNoQixZQUFJQSxPQUFPLENBQVgsRUFBYyxDQUNiLENBREQsTUFDTztBQUNMLGNBQUk4RCxNQUFNLENBQUM5RCxPQUFRQSxPQUFPbEMsYUFBaEIsSUFBa0NBLGFBQTVDO0FBQ0EsY0FBSWlHLE1BQU0vRCxPQUFPbEMsYUFBakI7QUFDQSxjQUFJa0MsU0FBUzdCLFdBQWIsRUFBMEI7QUFDeEI7QUFDQTtBQUNBLG1CQUFPRSxJQUFQO0FBQ0QsV0FKRCxNQUlPO0FBQ0wsZ0JBQUl5RixNQUFNLEVBQVYsRUFBYztBQUNaQSxvQkFBTSxNQUFNQSxHQUFaO0FBQ0Q7QUFDRCxnQkFBSUMsTUFBTSxFQUFWLEVBQWM7QUFDWkEsb0JBQU0sTUFBTUEsR0FBWjtBQUNEO0FBQ0QsbUJBQU9ELE1BQU0sS0FBTixHQUFjQyxHQUFyQjtBQUNEO0FBQ0Y7QUFDRixPQWhLTztBQWlLUlIsaUJBaktRLHVCQWlLSTdDLElBaktKLEVBaUtVO0FBQ2hCLFlBQUk4QyxVQUFVOUMsS0FBS04sUUFBTCxDQUFjckMsSUFBZCxJQUFzQjJDLEtBQUtQLFNBQUwsQ0FBZXBDLElBQWYsQ0FBcEM7QUFDQSxZQUFJMEYsVUFBVS9DLEtBQUtOLFFBQUwsQ0FBY3BDLElBQWQsSUFBc0IwQyxLQUFLUCxTQUFMLENBQWVuQyxJQUFmLENBQXBDO0FBQ0EsWUFBSTBGLEtBQUtDLEdBQUwsQ0FBU0gsT0FBVCxJQUFvQkUsS0FBS0MsR0FBTCxDQUFTRixPQUFULENBQXhCLEVBQTJDO0FBQ3pDLGNBQUkvQyxLQUFLSixXQUFMLEdBQW1CcEMsZ0JBQXZCLEVBQXlDO0FBQ3ZDLGdCQUFJd0MsS0FBS04sUUFBTCxDQUFjckMsSUFBZCxJQUFzQjJDLEtBQUtQLFNBQUwsQ0FBZXBDLElBQWYsQ0FBMUIsRUFBZ0Q7QUFDOUM7QUFDQSxzQkFBUTJDLEtBQUtILElBQUwsQ0FBVTNCLFNBQWxCO0FBQ0UscUJBQUssTUFBTDtBQUNFO0FBQ0YscUJBQUssTUFBTDtBQUNFOEIsdUJBQUtILElBQUwsR0FBWXJCLFFBQVo7QUFDQTtBQUNGLHFCQUFLLE9BQUw7QUFDRXdCLHVCQUFLSCxJQUFMLEdBQVlwQixRQUFaO0FBQ0E7QUFDRixxQkFBSyxNQUFMO0FBQ0V1Qix1QkFBS0gsSUFBTCxHQUFZL0IsU0FBWjtBQUNBO0FBQ0YscUJBQUssTUFBTDtBQUNFa0MsdUJBQUtILElBQUwsR0FBWW5CLFFBQVo7QUFDQTtBQWRKO0FBZ0JBc0IsbUJBQUtKLFdBQUwsR0FBbUIsQ0FBbkI7QUFDRCxhQW5CRCxNQW1CTyxJQUFJSSxLQUFLTixRQUFMLENBQWNyQyxJQUFkLElBQXNCMkMsS0FBS1AsU0FBTCxDQUFlcEMsSUFBZixDQUExQixFQUFnRDtBQUNyRDtBQUNBLHNCQUFRMkMsS0FBS0gsSUFBTCxDQUFVM0IsU0FBbEI7QUFDRSxxQkFBSyxNQUFMO0FBQ0U4Qix1QkFBS0gsSUFBTCxHQUFZcEIsUUFBWjtBQUNBO0FBQ0YscUJBQUssTUFBTDtBQUNFdUIsdUJBQUtILElBQUwsR0FBWS9CLFNBQVo7QUFDQTtBQUNGLHFCQUFLLE9BQUw7QUFDRWtDLHVCQUFLSCxJQUFMLEdBQVluQixRQUFaO0FBQ0E7QUFDRixxQkFBSyxNQUFMO0FBQ0VzQix1QkFBS0gsSUFBTCxHQUFZbEIsU0FBWjtBQUNBO0FBQ0YscUJBQUssTUFBTDtBQUNFO0FBZEo7QUFnQkFxQixtQkFBS0osV0FBTCxHQUFtQixDQUFuQjtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBL01PLEs7Ozs7OzZCQWlORDtBQUNQLFVBQUlJLE9BQU8sSUFBWDtBQUNBQSxXQUFLRixPQUFMLENBQWFDLElBQWIsQ0FBa0JDLElBQWxCO0FBQ0FBLFdBQUtYLElBQUwsR0FBWW5DLGVBQVo7QUFDQThDLFdBQUtWLElBQUwsR0FBWW5DLGFBQWFDLGFBQXpCO0FBQ0FrRSxjQUFRQyxHQUFSLENBQVl2QixLQUFLWCxJQUFqQixFQUF1QlcsS0FBS1YsSUFBNUI7QUFDRDs7OztFQTNPZ0MsZUFBS2dFLEk7O2tCQUFuQjFFLEsiLCJmaWxlIjoibm9pc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmNvbnN0IGNhbGVuZGFyID0gcmVxdWlyZSgnLi4vcGFnZXMvY2FsZW5kYXIuanMnKVxuY29uc3QgaW5pdGlhbFRpbWVUZXh0ID0gJzIwIDogMDAnXG5jb25zdCBpbml0aWFsTWluID0gMjBcbmNvbnN0IHNlY29uZHNQZXJNaW4gPSA2MFxuY29uc3QgeFBvcyA9IDBcbmNvbnN0IHlQb3MgPSAxXG5jb25zdCBjaGFuZ2VUaW1lUG9pbnQgPSAxXG5jb25zdCBjaGFuZ2VJbWFnZVBvaW50ID0gNVxuY29uc3QgdGltZVVwbGltaXQgPSAzNjYwXG5jb25zdCB0aW1lTG93bGltaXQgPSAwXG5jb25zdCBsb29wID0gJ+KInidcbmNvbnN0IHRydWVPcGFjaXR5ID0gMVxuY29uc3QgZmFsc2VPcGFjaXR5ID0gMC4zXG5jb25zdCBub2RlV2F0ZXIgPSB7XG4gIG1hcms6ICfpm6jmsLQnLFxuICBiZ2NvbG9yOiAncmdiYSgwLCAyNTUsIDI1NSwgMC4xMiknLFxuICBub2lzZTogJ2h0dHA6Ly93d3cuc21hcnRlc3RlZS5jb20vbm9pc2Uvd2F0ZXIubXAzJyxcbiAgaW1hZ2VOb2RlOiAnV0FURVInLFxuICB3YXRlclBvaW50OiB0cnVlT3BhY2l0eSxcbiAgdHJlZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gIGdvbGRQb2ludDogZmFsc2VPcGFjaXR5LFxuICBmaXJlUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgc29pbFBvaW50OiBmYWxzZU9wYWNpdHlcbn1cbmNvbnN0IG5vZGVHb2xkID0ge1xuICBtYXJrOiAn5a+66ZKfJyxcbiAgYmdjb2xvcjogJ3JnYmEoIDI1NSwgMjU1LCAwLCAwLjEyKScsXG4gIG5vaXNlOiAnaHR0cDovL3d3dy5zbWFydGVzdGVlLmNvbS9ub2lzZS9nb2xkLm1wMycsXG4gIGltYWdlTm9kZTogJ0dPTEQnLFxuICB3YXRlclBvaW50OiBmYWxzZU9wYWNpdHksXG4gIHRyZWVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBnb2xkUG9pbnQ6IHRydWVPcGFjaXR5LFxuICBmaXJlUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgc29pbFBvaW50OiBmYWxzZU9wYWNpdHlcbn1cbmNvbnN0IG5vZGVUcmVlID0ge1xuICBtYXJrOiAn5qOu5p6XJyxcbiAgYmdjb2xvcjogJ3JnYmEoIDAsIDI1NSwgMCwgMC4xMiknLFxuICBub2lzZTogJ2h0dHA6Ly93d3cuc21hcnRlc3RlZS5jb20vbm9pc2UvdHJlZS5tcDMnLFxuICBpbWFnZU5vZGU6ICdUUkVFJyxcbiAgd2F0ZXJQb2ludDogZmFsc2VPcGFjaXR5LFxuICB0cmVlUG9pbnQ6IHRydWVPcGFjaXR5LFxuICBnb2xkUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZmlyZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gIHNvaWxQb2ludDogZmFsc2VPcGFjaXR5XG59XG5jb25zdCBub2RlRmlyZSA9IHtcbiAgbWFyazogJ+evneeBqycsXG4gIGJnY29sb3I6ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMTIpJyxcbiAgbm9pc2U6ICdodHRwOi8vd3d3LnNtYXJ0ZXN0ZWUuY29tL25vaXNlL2ZpcmUubXAzJyxcbiAgaW1hZ2VOb2RlOiAnRklSRScsXG4gIHdhdGVyUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgdHJlZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gIGdvbGRQb2ludDogZmFsc2VPcGFjaXR5LFxuICBmaXJlUG9pbnQ6IHRydWVPcGFjaXR5LFxuICBzb2lsUG9pbnQ6IGZhbHNlT3BhY2l0eVxufVxuY29uc3Qgbm9pc2VTb2lsID0ge1xuICBtYXJrOiAn5rWq5r2uJyxcbiAgYmdjb2xvcjogJ3JnYmEoIDIzOCwgOTksIDk5LCAwLjEyKScsXG4gIG5vaXNlOiAnaHR0cDovL3d3dy5zbWFydGVzdGVlLmNvbS9ub2lzZS9zb2lsLm1wMycsXG4gIGltYWdlTm9kZTogJ1NPSUwnLFxuICB3YXRlclBvaW50OiBmYWxzZU9wYWNpdHksXG4gIHRyZWVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBnb2xkUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZmlyZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gIHNvaWxQb2ludDogdHJ1ZU9wYWNpdHlcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJydcbiAgfVxuICBkYXRhID0ge1xuICAgIHN0YXJ0QnV0dG9uOiB0cnVlLFxuICAgIHBhdXNlT3JDb250aW51ZTogdHJ1ZSxcbiAgICB0b3VjaG1vdmU6IHRydWUsXG4gICAgbHVuYXI6IG51bGwsXG4gICAgZGF0ZXM6IG51bGwsXG4gICAgdGltZTogbnVsbCxcbiAgICB0aWNrOiBudWxsLFxuICAgIHRpbWVyOiBudWxsLFxuICAgIGxpc3RlbjogbnVsbCxcbiAgICBzdGFyUG9pbnQ6IFswLCAwXSxcbiAgICBjdXJQb2ludDogWzAsIDBdLFxuICAgIHRvdWNoZXM6IFtdLFxuICAgIGNoYW5nZVBvaW50OiAwLFxuICAgIG5vZGU6IG5vZGVXYXRlclxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgZGF0ZShzZWxmKSB7XG4gICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIGNvbnN0IHdlZWtzID0gWydTdW4nLCAnTW9uJywgJ1R1ZXMnLCAnV2VkJywgJ1RodXInLCAnRnJpJywgJ1NhdCddXG4gICAgICBjb25zdCB3ZWVrID0gZGF0ZS5nZXRVVENEYXkoKVxuICAgICAgY29uc3Qgd2Vla2QgPSB3ZWVrc1t3ZWVrXVxuICAgICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKClcbiAgICAgIGNvbnN0IG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVnJywgJ1NlcHQnLCAnT2N0JywgJ05vdicsICdEZWMnXVxuICAgICAgY29uc3QgbW9uID0gbW9udGhzW21vbnRoXVxuICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKClcbiAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICAgIHNlbGYuZGF0ZXMgPSBtb24gKyAnICcgKyBkYXkgKyAnICcgKyB3ZWVrZCArICcgJyArIHllYXJcbiAgICAgIGxldCBsdW5hcmRhdGUgPSBjYWxlbmRhci5zb2xhcjJsdW5hcih5ZWFyLCBtb250aCArIDEsIGRheSlcbiAgICAgIGNvbnN0IGx1bmFyTW9udGhzID0gWyfmraPmnIgnLCAn6LSw5pyIJywgJ+WPgeaciCcsICfogobmnIgnLCAn5LyN5pyIJywgJ+mZhuaciCcsICfkuIPmnIgnLCAn5o2M5pyIJywgJ+eOluaciCcsICfmi77mnIgnLCAn5ou+5aO55pyIJywgJ+iFiuaciCddXG4gICAgICBjb25zdCBsdW5hckRheXMgPSBbJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJywgJ+S4gycsICflhasnLCAn5LmdJywgJ+WNgSddXG4gICAgICBpZiAobHVuYXJkYXRlLmxEYXkgPD0gMTApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICfliJ0nICsgbHVuYXJEYXlzW2x1bmFyZGF0ZS5sRGF5IC0gMV1cbiAgICAgIH0gZWxzZSBpZiAobHVuYXJkYXRlLmxEYXkgPiAxMCAmJiBsdW5hcmRhdGUubERheSA8IDIwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5Y2BJyArIGx1bmFyRGF5c1tsdW5hcmRhdGUubERheSAtIDExXVxuICAgICAgfSBlbHNlIGlmIChsdW5hcmRhdGUubERheSA+IDIwICYmIGx1bmFyZGF0ZS5sRGF5IDwgMzApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICflu78nICsgbHVuYXJEYXlzW2x1bmFyZGF0ZS5sRGF5IC0gMjFdXG4gICAgICB9IGVsc2UgaWYgKGx1bmFyZGF0ZS5sRGF5ID09PSAyMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+S6jOWNgSdcbiAgICAgIH0gZWxzZSBpZiAobHVuYXJkYXRlLmxEYXkgPT09IDMwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5LiJ5Y2BJ1xuICAgICAgfVxuICAgICAgc2VsZi5sdW5hciA9ICflhpzljoYnICsgbHVuYXJNb250aHNbbHVuYXJkYXRlLmxNb250aCAtIDFdICsgc2VsZi5sdW5hckRheVxuICAgIH0sXG4gICAgc3RhcnQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhcnRCdXR0b24gPSBmYWxzZVxuICAgICAgc2VsZi5wYXVzZU9yQ29udGludWUgPSB0cnVlXG4gICAgICBzZWxmLnRvdWNobW92ZSA9IGZhbHNlXG4gICAgICBjb25zb2xlLmxvZyhzZWxmLnRpY2spXG4gICAgICBpZiAoc2VsZi50aWNrID09PSB0aW1lTG93bGltaXQpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLmVuZCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLm1ldGhvZHMucGxheW5vaXNlKHNlbGYpXG4gICAgICAgIHNlbGYubWV0aG9kcy5saXN0ZW4oc2VsZilcbiAgICAgIH1cbiAgICAgIGlmIChzZWxmLnRpY2sgPiB0aW1lTG93bGltaXQgJiYgc2VsZi50aWNrIDwgdGltZVVwbGltaXQpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnRpbWUoc2VsZilcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKCdzdGFydCcpXG4gICAgfSxcbiAgICBwYXVzZSgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5wYXVzZU9yQ29udGludWUgPSBmYWxzZVxuICAgICAgd2VweS5wYXVzZUJhY2tncm91bmRBdWRpbygpXG4gICAgICBjbGVhckludGVydmFsKHNlbGYubGlzdGVuKVxuICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLnRpbWVyKVxuICAgICAgY29uc29sZS5sb2coJ3BhdXNlJylcbiAgICB9LFxuICAgIGVuZCgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5zdGFydEJ1dHRvbiA9IHRydWVcbiAgICAgIHNlbGYudG91Y2htb3ZlID0gdHJ1ZVxuICAgICAgd2VweS5zdG9wQmFja2dyb3VuZEF1ZGlvKClcbiAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi5saXN0ZW4pXG4gICAgICBjbGVhckludGVydmFsKHNlbGYudGltZXIpXG4gICAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICAgIHNlbGYudGljayA9IGluaXRpYWxNaW4gKiBzZWNvbmRzUGVyTWluXG4gICAgICBjb25zb2xlLmxvZygnZW5kJylcbiAgICB9LFxuICAgIHBsYXlub2lzZShzZWxmKSB7XG4gICAgICB3ZXB5LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xuICAgICAgICBkYXRhVXJsOiBzZWxmLm5vZGUubm9pc2UsXG4gICAgICAgIHRpdGxlOiAnJ1xuICAgICAgfSlcbiAgICB9LFxuICAgIHRpbWUoc2VsZikge1xuICAgICAgc2VsZi50aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLnRpY2stLVxuICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmKVxuICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnRpY2spXG4gICAgICAgIGlmIChzZWxmLnRpY2sgPT09IHRpbWVMb3dsaW1pdCkge1xuICAgICAgICAgIHNlbGYubWV0aG9kcy5lbmQoKVxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi5saXN0ZW4pXG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLnRpbWVyKVxuICAgICAgICB9XG4gICAgICB9LCAxMDAwKVxuICAgIH0sXG4gICAgbGlzdGVuKHNlbGYpIHtcbiAgICAgIHNlbGYubGlzdGVuID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChzZWxmLnRpY2sgIT09IHRpbWVMb3dsaW1pdCkge1xuICAgICAgICAgIHdlcHkuZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUoe1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5tZXRob2RzLnBsYXlub2lzZShzZWxmKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnbGlzdGVuJylcbiAgICAgIH0sIDUwKVxuICAgIH0sXG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICAgIHNlbGYuY2hhbmdlUG9pbnQrK1xuICAgICAgaWYgKHNlbGYudG91Y2htb3ZlKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lQ2hhbmdlKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICB0b3VjaGVuZChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGlmIChzZWxmLnRvdWNobW92ZSkge1xuICAgICAgICBzZWxmLm1ldGhvZHMuaW1hZ2VDaGFuZ2Uoc2VsZilcbiAgICAgIH1cbiAgICB9LFxuICAgIHRpbWVDaGFuZ2Uoc2VsZikge1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50W3hQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeFBvc11cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt5UG9zXSAtIHNlbGYuc3RhclBvaW50W3lQb3NdXG4gICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPCBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA+IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3lQb3NdID4gc2VsZi5zdGFyUG9pbnRbeVBvc10gJiYgc2VsZi50aWNrID4gdGltZUxvd2xpbWl0KSB7XG4gICAgICAgICAgICAvLyDlkJHkuIvmu5FcbiAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayAtIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3lQb3NdIDwgc2VsZi5zdGFyUG9pbnRbeVBvc10gJiYgc2VsZi50aWNrIDwgdGltZVVwbGltaXQpIHtcbiAgICAgICAgICAgIC8vIOWQkeS4iua7kVxuICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrICsgc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHNldFRpbWUoc2VsZikge1xuICAgICAgbGV0IGN1cnJlbnRUaW1lID0gc2VsZi5tZXRob2RzLmN1cnJlbnRUaW1lKHNlbGYudGljaylcbiAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgIHRpbWU6IGN1cnJlbnRUaW1lXG4gICAgICB9KVxuICAgICAgc2VsZi50aW1lID0gY3VycmVudFRpbWVcbiAgICB9LFxuICAgIGN1cnJlbnRUaW1lKHRpY2spIHtcbiAgICAgIGlmICh0aWNrIDwgMCkge1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IG1pbiA9ICh0aWNrIC0gKHRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluXG4gICAgICAgIGxldCBzZWMgPSB0aWNrICUgc2Vjb25kc1Blck1pblxuICAgICAgICBpZiAodGljayA9PT0gdGltZVVwbGltaXQpIHtcbiAgICAgICAgICAvLyB0aWNrID0gLTFcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aWNrKVxuICAgICAgICAgIHJldHVybiBsb29wXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG1pbiA8IDEwKSB7XG4gICAgICAgICAgICBtaW4gPSAnMCcgKyBtaW5cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlYyA8IDEwKSB7XG4gICAgICAgICAgICBzZWMgPSAnMCcgKyBzZWNcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1pbiArICcgOiAnICsgc2VjXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGltYWdlQ2hhbmdlKHNlbGYpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt4UG9zXSAtIHNlbGYuc3RhclBvaW50W3hQb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeVBvc10gLSBzZWxmLnN0YXJQb2ludFt5UG9zXVxuICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID4gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VJbWFnZVBvaW50KSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeFBvc10gPiBzZWxmLnN0YXJQb2ludFt4UG9zXSkge1xuICAgICAgICAgICAgLy8g5ZCR5Y+z5YiSXG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYubm9kZS5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnR09MRCc6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnVFJFRSc6XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gbm9kZUdvbGRcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdXQVRFUic6XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gbm9kZVRyZWVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdGSVJFJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlV2F0ZXJcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdTT0lMJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlRmlyZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5jdXJQb2ludFt4UG9zXSA8IHNlbGYuc3RhclBvaW50W3hQb3NdKSB7XG4gICAgICAgICAgICAvLyDlvoDlt6bliJJcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5ub2RlLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlICdHT0xEJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlVHJlZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ1RSRUUnOlxuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9IG5vZGVXYXRlclxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ1dBVEVSJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlRmlyZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ0ZJUkUnOlxuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9IG5vaXNlU29pbFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ1NPSUwnOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgc2VsZi5tZXRob2RzLmRhdGUoc2VsZilcbiAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICBzZWxmLnRpY2sgPSBpbml0aWFsTWluICogc2Vjb25kc1Blck1pblxuICAgIGNvbnNvbGUubG9nKHNlbGYudGltZSwgc2VsZi50aWNrKVxuICB9XG59XG4iXX0=