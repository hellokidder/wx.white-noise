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
        if (self.tick === timeLowlimit) {} else {
          self.methods.playnoise(self);
          // self.methods.listen(self)
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
        // clearInterval(self.listen)
        clearInterval(self.timer);
        console.log('pause');
      },
      end: function end() {
        var self = this;
        self.startButton = true;
        self.touchmove = true;
        _wepy2.default.stopBackgroundAudio();
        // clearInterval(self.listen)
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
            self.setData({
              time: initialTimeText,
              startButton: true,
              tick: initialMin * secondsPerMin,
              touchmove: true
            });
            self.startButton = true;
            self.touchmove = true;
            self.time = initialTimeText;
            self.tick = initialMin * secondsPerMin;
            _wepy2.default.stopBackgroundAudio();
            clearInterval(self.timer);
          }
        }, 1000);
      },

      // listen(self) {
      //   self.listen = setInterval(function() {
      //     if (self.tick !== timeLowlimit) {
      //       wepy.getBackgroundAudioPlayerState({
      //         success: function(res) {
      //           if (res.status !== 1) {
      //             self.methods.playnoise(self)
      //           }
      //         }
      //       })
      //     }
      //     console.log('listen')
      //   }, 50)
      // },
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbImNhbGVuZGFyIiwicmVxdWlyZSIsImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxNaW4iLCJzZWNvbmRzUGVyTWluIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwidGltZVVwbGltaXQiLCJ0aW1lTG93bGltaXQiLCJsb29wIiwidHJ1ZU9wYWNpdHkiLCJmYWxzZU9wYWNpdHkiLCJub2RlV2F0ZXIiLCJtYXJrIiwiYmdjb2xvciIsIm5vaXNlIiwiaW1hZ2VOb2RlIiwid2F0ZXJQb2ludCIsInRyZWVQb2ludCIsImdvbGRQb2ludCIsImZpcmVQb2ludCIsInNvaWxQb2ludCIsIm5vZGVHb2xkIiwibm9kZVRyZWUiLCJub2RlRmlyZSIsIm5vaXNlU29pbCIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJzdGFydEJ1dHRvbiIsInBhdXNlT3JDb250aW51ZSIsInRvdWNobW92ZSIsImx1bmFyIiwiZGF0ZXMiLCJ0aW1lIiwidGljayIsInRpbWVyIiwibGlzdGVuIiwic3RhclBvaW50IiwiY3VyUG9pbnQiLCJ0b3VjaGVzIiwiY2hhbmdlUG9pbnQiLCJub2RlIiwibWV0aG9kcyIsImRhdGUiLCJzZWxmIiwiRGF0ZSIsIndlZWtzIiwid2VlayIsImdldFVUQ0RheSIsIndlZWtkIiwibW9udGgiLCJnZXRNb250aCIsIm1vbnRocyIsIm1vbiIsImRheSIsImdldERhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJsdW5hcmRhdGUiLCJzb2xhcjJsdW5hciIsImx1bmFyTW9udGhzIiwibHVuYXJEYXlzIiwibERheSIsImx1bmFyRGF5IiwibE1vbnRoIiwic3RhcnQiLCJjb25zb2xlIiwibG9nIiwicGxheW5vaXNlIiwicGF1c2UiLCJwYXVzZUJhY2tncm91bmRBdWRpbyIsImNsZWFySW50ZXJ2YWwiLCJlbmQiLCJzdG9wQmFja2dyb3VuZEF1ZGlvIiwicGxheUJhY2tncm91bmRBdWRpbyIsImRhdGFVcmwiLCJ0aXRsZSIsInNldEludGVydmFsIiwic2V0VGltZSIsInNldERhdGEiLCJ0b3VjaHN0YXJ0IiwiZSIsInBhZ2VYIiwicGFnZVkiLCJ0aW1lQ2hhbmdlIiwidG91Y2hlbmQiLCJpbWFnZUNoYW5nZSIsInhjaGFuZ2UiLCJ5Y2hhbmdlIiwiTWF0aCIsImFicyIsImN1cnJlbnRUaW1lIiwibWluIiwic2VjIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVdDLFFBQVEsc0JBQVIsQ0FBakI7QUFDQSxJQUFNQyxrQkFBa0IsU0FBeEI7QUFDQSxJQUFNQyxhQUFhLEVBQW5CO0FBQ0EsSUFBTUMsZ0JBQWdCLEVBQXRCO0FBQ0EsSUFBTUMsT0FBTyxDQUFiO0FBQ0EsSUFBTUMsT0FBTyxDQUFiO0FBQ0EsSUFBTUMsa0JBQWtCLENBQXhCO0FBQ0EsSUFBTUMsbUJBQW1CLENBQXpCO0FBQ0EsSUFBTUMsY0FBYyxJQUFwQjtBQUNBLElBQU1DLGVBQWUsQ0FBckI7QUFDQSxJQUFNQyxPQUFPLEdBQWI7QUFDQSxJQUFNQyxjQUFjLENBQXBCO0FBQ0EsSUFBTUMsZUFBZSxHQUFyQjtBQUNBLElBQU1DLFlBQVk7QUFDaEJDLFFBQU0sSUFEVTtBQUVoQkMsV0FBUyx5QkFGTztBQUdoQkMsU0FBTywyQ0FIUztBQUloQkMsYUFBVyxPQUpLO0FBS2hCQyxjQUFZUCxXQUxJO0FBTWhCUSxhQUFXUCxZQU5LO0FBT2hCUSxhQUFXUixZQVBLO0FBUWhCUyxhQUFXVCxZQVJLO0FBU2hCVSxhQUFXVjtBQVRLLENBQWxCO0FBV0EsSUFBTVcsV0FBVztBQUNmVCxRQUFNLElBRFM7QUFFZkMsV0FBUywwQkFGTTtBQUdmQyxTQUFPLDBDQUhRO0FBSWZDLGFBQVcsTUFKSTtBQUtmQyxjQUFZTixZQUxHO0FBTWZPLGFBQVdQLFlBTkk7QUFPZlEsYUFBV1QsV0FQSTtBQVFmVSxhQUFXVCxZQVJJO0FBU2ZVLGFBQVdW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LFFBQVo7QUFDQTtBQUNGLHFCQUFLLE1BQUw7QUFDRXNCLHVCQUFLSCxJQUFMLEdBQVlsQixTQUFaO0FBQ0E7QUFDRixxQkFBSyxNQUFMO0FBQ0U7QUFkSjtBQWdCQXFCLG1CQUFLSixXQUFMLEdBQW1CLENBQW5CO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUF2Tk8sSzs7Ozs7NkJBeU5EO0FBQ1AsVUFBSUksT0FBTyxJQUFYO0FBQ0FBLFdBQUtGLE9BQUwsQ0FBYUMsSUFBYixDQUFrQkMsSUFBbEI7QUFDQUEsV0FBS1gsSUFBTCxHQUFZbkMsZUFBWjtBQUNBOEMsV0FBS1YsSUFBTCxHQUFZbkMsYUFBYUMsYUFBekI7QUFDQWtFLGNBQVFDLEdBQVIsQ0FBWXZCLEtBQUtYLElBQWpCLEVBQXVCVyxLQUFLVixJQUE1QjtBQUNEOzs7O0VBblBnQyxlQUFLNEQsSTs7a0JBQW5CdEUsSyIsImZpbGUiOiJub2lzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuY29uc3QgY2FsZW5kYXIgPSByZXF1aXJlKCcuLi9wYWdlcy9jYWxlbmRhci5qcycpXG5jb25zdCBpbml0aWFsVGltZVRleHQgPSAnMjAgOiAwMCdcbmNvbnN0IGluaXRpYWxNaW4gPSAyMFxuY29uc3Qgc2Vjb25kc1Blck1pbiA9IDYwXG5jb25zdCB4UG9zID0gMFxuY29uc3QgeVBvcyA9IDFcbmNvbnN0IGNoYW5nZVRpbWVQb2ludCA9IDFcbmNvbnN0IGNoYW5nZUltYWdlUG9pbnQgPSA1XG5jb25zdCB0aW1lVXBsaW1pdCA9IDM2NjBcbmNvbnN0IHRpbWVMb3dsaW1pdCA9IDBcbmNvbnN0IGxvb3AgPSAn4oieJ1xuY29uc3QgdHJ1ZU9wYWNpdHkgPSAxXG5jb25zdCBmYWxzZU9wYWNpdHkgPSAwLjNcbmNvbnN0IG5vZGVXYXRlciA9IHtcbiAgbWFyazogJ+mbqOawtCcsXG4gIGJnY29sb3I6ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjEyKScsXG4gIG5vaXNlOiAnaHR0cDovL3d3dy5zbWFydGVzdGVlLmNvbS9ub2lzZS93YXRlci5tcDMnLFxuICBpbWFnZU5vZGU6ICdXQVRFUicsXG4gIHdhdGVyUG9pbnQ6IHRydWVPcGFjaXR5LFxuICB0cmVlUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZ29sZFBvaW50OiBmYWxzZU9wYWNpdHksXG4gIGZpcmVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBzb2lsUG9pbnQ6IGZhbHNlT3BhY2l0eVxufVxuY29uc3Qgbm9kZUdvbGQgPSB7XG4gIG1hcms6ICflr7rpkp8nLFxuICBiZ2NvbG9yOiAncmdiYSggMjU1LCAyNTUsIDAsIDAuMTIpJyxcbiAgbm9pc2U6ICdodHRwOi8vd3d3LnNtYXJ0ZXN0ZWUuY29tL25vaXNlL2dvbGQubXAzJyxcbiAgaW1hZ2VOb2RlOiAnR09MRCcsXG4gIHdhdGVyUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgdHJlZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gIGdvbGRQb2ludDogdHJ1ZU9wYWNpdHksXG4gIGZpcmVQb2ludDogZmFsc2VPcGFjaXR5LFxuICBzb2lsUG9pbnQ6IGZhbHNlT3BhY2l0eVxufVxuY29uc3Qgbm9kZVRyZWUgPSB7XG4gIG1hcms6ICfmo67mnpcnLFxuICBiZ2NvbG9yOiAncmdiYSggMCwgMjU1LCAwLCAwLjEyKScsXG4gIG5vaXNlOiAnaHR0cDovL3d3dy5zbWFydGVzdGVlLmNvbS9ub2lzZS90cmVlLm1wMycsXG4gIGltYWdlTm9kZTogJ1RSRUUnLFxuICB3YXRlclBvaW50OiBmYWxzZU9wYWNpdHksXG4gIHRyZWVQb2ludDogdHJ1ZU9wYWNpdHksXG4gIGdvbGRQb2ludDogZmFsc2VPcGFjaXR5LFxuICBmaXJlUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgc29pbFBvaW50OiBmYWxzZU9wYWNpdHlcbn1cbmNvbnN0IG5vZGVGaXJlID0ge1xuICBtYXJrOiAn56+d54GrJyxcbiAgYmdjb2xvcjogJ3JnYmEoIDI1NSwgMCwgMCwgMC4xMiknLFxuICBub2lzZTogJ2h0dHA6Ly93d3cuc21hcnRlc3RlZS5jb20vbm9pc2UvZmlyZS5tcDMnLFxuICBpbWFnZU5vZGU6ICdGSVJFJyxcbiAgd2F0ZXJQb2ludDogZmFsc2VPcGFjaXR5LFxuICB0cmVlUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgZ29sZFBvaW50OiBmYWxzZU9wYWNpdHksXG4gIGZpcmVQb2ludDogdHJ1ZU9wYWNpdHksXG4gIHNvaWxQb2ludDogZmFsc2VPcGFjaXR5XG59XG5jb25zdCBub2lzZVNvaWwgPSB7XG4gIG1hcms6ICfmtarmva4nLFxuICBiZ2NvbG9yOiAncmdiYSggMjM4LCA5OSwgOTksIDAuMTIpJyxcbiAgbm9pc2U6ICdodHRwOi8vd3d3LnNtYXJ0ZXN0ZWUuY29tL25vaXNlL3NvaWwubXAzJyxcbiAgaW1hZ2VOb2RlOiAnU09JTCcsXG4gIHdhdGVyUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgdHJlZVBvaW50OiBmYWxzZU9wYWNpdHksXG4gIGdvbGRQb2ludDogZmFsc2VPcGFjaXR5LFxuICBmaXJlUG9pbnQ6IGZhbHNlT3BhY2l0eSxcbiAgc29pbFBvaW50OiB0cnVlT3BhY2l0eVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgc3RhcnRCdXR0b246IHRydWUsXG4gICAgcGF1c2VPckNvbnRpbnVlOiB0cnVlLFxuICAgIHRvdWNobW92ZTogdHJ1ZSxcbiAgICBsdW5hcjogbnVsbCxcbiAgICBkYXRlczogbnVsbCxcbiAgICB0aW1lOiBudWxsLFxuICAgIHRpY2s6IG51bGwsXG4gICAgdGltZXI6IG51bGwsXG4gICAgbGlzdGVuOiBudWxsLFxuICAgIHN0YXJQb2ludDogWzAsIDBdLFxuICAgIGN1clBvaW50OiBbMCwgMF0sXG4gICAgdG91Y2hlczogW10sXG4gICAgY2hhbmdlUG9pbnQ6IDAsXG4gICAgbm9kZTogbm9kZVdhdGVyXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBkYXRlKHNlbGYpIHtcbiAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgY29uc3Qgd2Vla3MgPSBbJ1N1bicsICdNb24nLCAnVHVlcycsICdXZWQnLCAnVGh1cicsICdGcmknLCAnU2F0J11cbiAgICAgIGNvbnN0IHdlZWsgPSBkYXRlLmdldFVUQ0RheSgpXG4gICAgICBjb25zdCB3ZWVrZCA9IHdlZWtzW3dlZWtdXG4gICAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICAgICAgY29uc3QgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWcnLCAnU2VwdCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgICBjb25zdCBtb24gPSBtb250aHNbbW9udGhdXG4gICAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICAgICAgc2VsZi5kYXRlcyA9IG1vbiArICcgJyArIGRheSArICcgJyArIHdlZWtkICsgJyAnICsgeWVhclxuICAgICAgbGV0IGx1bmFyZGF0ZSA9IGNhbGVuZGFyLnNvbGFyMmx1bmFyKHllYXIsIG1vbnRoICsgMSwgZGF5KVxuICAgICAgY29uc3QgbHVuYXJNb250aHMgPSBbJ+ato+aciCcsICfotLDmnIgnLCAn5Y+B5pyIJywgJ+iChuaciCcsICfkvI3mnIgnLCAn6ZmG5pyIJywgJ+S4g+aciCcsICfmjYzmnIgnLCAn546W5pyIJywgJ+aLvuaciCcsICfmi77lo7nmnIgnLCAn6IWK5pyIJ11cbiAgICAgIGNvbnN0IGx1bmFyRGF5cyA9IFsn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nLCAn5LiDJywgJ+WFqycsICfkuZ0nLCAn5Y2BJ11cbiAgICAgIGlmIChsdW5hcmRhdGUubERheSA8PSAxMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+WInScgKyBsdW5hckRheXNbbHVuYXJkYXRlLmxEYXkgLSAxXVxuICAgICAgfSBlbHNlIGlmIChsdW5hcmRhdGUubERheSA+IDEwICYmIGx1bmFyZGF0ZS5sRGF5IDwgMjApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICfljYEnICsgbHVuYXJEYXlzW2x1bmFyZGF0ZS5sRGF5IC0gMTFdXG4gICAgICB9IGVsc2UgaWYgKGx1bmFyZGF0ZS5sRGF5ID4gMjAgJiYgbHVuYXJkYXRlLmxEYXkgPCAzMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+W7vycgKyBsdW5hckRheXNbbHVuYXJkYXRlLmxEYXkgLSAyMV1cbiAgICAgIH0gZWxzZSBpZiAobHVuYXJkYXRlLmxEYXkgPT09IDIwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5LqM5Y2BJ1xuICAgICAgfSBlbHNlIGlmIChsdW5hcmRhdGUubERheSA9PT0gMzApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICfkuInljYEnXG4gICAgICB9XG4gICAgICBzZWxmLmx1bmFyID0gJ+WGnOWOhicgKyBsdW5hck1vbnRoc1tsdW5hcmRhdGUubE1vbnRoIC0gMV0gKyBzZWxmLmx1bmFyRGF5XG4gICAgfSxcbiAgICBzdGFydCgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5zdGFydEJ1dHRvbiA9IGZhbHNlXG4gICAgICBzZWxmLnBhdXNlT3JDb250aW51ZSA9IHRydWVcbiAgICAgIHNlbGYudG91Y2htb3ZlID0gZmFsc2VcbiAgICAgIGNvbnNvbGUubG9nKHNlbGYudGljaylcbiAgICAgIGlmIChzZWxmLnRpY2sgPT09IHRpbWVMb3dsaW1pdCkge1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnBsYXlub2lzZShzZWxmKVxuICAgICAgICAvLyBzZWxmLm1ldGhvZHMubGlzdGVuKHNlbGYpXG4gICAgICB9XG4gICAgICBpZiAoc2VsZi50aWNrID4gdGltZUxvd2xpbWl0ICYmIHNlbGYudGljayA8IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lKHNlbGYpXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZygnc3RhcnQnKVxuICAgIH0sXG4gICAgcGF1c2UoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYucGF1c2VPckNvbnRpbnVlID0gZmFsc2VcbiAgICAgIHdlcHkucGF1c2VCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgLy8gY2xlYXJJbnRlcnZhbChzZWxmLmxpc3RlbilcbiAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi50aW1lcilcbiAgICAgIGNvbnNvbGUubG9nKCdwYXVzZScpXG4gICAgfSxcbiAgICBlbmQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhcnRCdXR0b24gPSB0cnVlXG4gICAgICBzZWxmLnRvdWNobW92ZSA9IHRydWVcbiAgICAgIHdlcHkuc3RvcEJhY2tncm91bmRBdWRpbygpXG4gICAgICAvLyBjbGVhckludGVydmFsKHNlbGYubGlzdGVuKVxuICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLnRpbWVyKVxuICAgICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgICBzZWxmLnRpY2sgPSBpbml0aWFsTWluICogc2Vjb25kc1Blck1pblxuICAgICAgY29uc29sZS5sb2coJ2VuZCcpXG4gICAgfSxcbiAgICBwbGF5bm9pc2Uoc2VsZikge1xuICAgICAgd2VweS5wbGF5QmFja2dyb3VuZEF1ZGlvKHtcbiAgICAgICAgZGF0YVVybDogc2VsZi5ub2RlLm5vaXNlLFxuICAgICAgICB0aXRsZTogJydcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0aW1lKHNlbGYpIHtcbiAgICAgIHNlbGYudGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi50aWNrLS1cbiAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZilcbiAgICAgICAgY29uc29sZS5sb2coc2VsZi50aWNrKVxuICAgICAgICBpZiAoc2VsZi50aWNrID09PSB0aW1lTG93bGltaXQpIHtcbiAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgdGltZTogaW5pdGlhbFRpbWVUZXh0LFxuICAgICAgICAgICAgc3RhcnRCdXR0b246IHRydWUsXG4gICAgICAgICAgICB0aWNrOiBpbml0aWFsTWluICogc2Vjb25kc1Blck1pbixcbiAgICAgICAgICAgIHRvdWNobW92ZTogdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgc2VsZi5zdGFydEJ1dHRvbiA9IHRydWVcbiAgICAgICAgICBzZWxmLnRvdWNobW92ZSA9IHRydWVcbiAgICAgICAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICAgICAgICBzZWxmLnRpY2sgPSBpbml0aWFsTWluICogc2Vjb25kc1Blck1pblxuICAgICAgICAgIHdlcHkuc3RvcEJhY2tncm91bmRBdWRpbygpXG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLnRpbWVyKVxuICAgICAgICB9XG4gICAgICB9LCAxMDAwKVxuICAgIH0sXG4gICAgLy8gbGlzdGVuKHNlbGYpIHtcbiAgICAvLyAgIHNlbGYubGlzdGVuID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIGlmIChzZWxmLnRpY2sgIT09IHRpbWVMb3dsaW1pdCkge1xuICAgIC8vICAgICAgIHdlcHkuZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUoe1xuICAgIC8vICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgLy8gICAgICAgICAgIGlmIChyZXMuc3RhdHVzICE9PSAxKSB7XG4gICAgLy8gICAgICAgICAgICAgc2VsZi5tZXRob2RzLnBsYXlub2lzZShzZWxmKVxuICAgIC8vICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgfSlcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBjb25zb2xlLmxvZygnbGlzdGVuJylcbiAgICAvLyAgIH0sIDUwKVxuICAgIC8vIH0sXG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICAgIHNlbGYuY2hhbmdlUG9pbnQrK1xuICAgICAgaWYgKHNlbGYudG91Y2htb3ZlKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lQ2hhbmdlKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICB0b3VjaGVuZChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGlmIChzZWxmLnRvdWNobW92ZSkge1xuICAgICAgICBzZWxmLm1ldGhvZHMuaW1hZ2VDaGFuZ2Uoc2VsZilcbiAgICAgIH1cbiAgICB9LFxuICAgIHRpbWVDaGFuZ2Uoc2VsZikge1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50W3hQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeFBvc11cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt5UG9zXSAtIHNlbGYuc3RhclBvaW50W3lQb3NdXG4gICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPCBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA+IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3lQb3NdID4gc2VsZi5zdGFyUG9pbnRbeVBvc10gJiYgc2VsZi50aWNrID4gdGltZUxvd2xpbWl0KSB7XG4gICAgICAgICAgICAvLyDlkJHkuIvmu5FcbiAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayAtIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3lQb3NdIDwgc2VsZi5zdGFyUG9pbnRbeVBvc10gJiYgc2VsZi50aWNrIDwgdGltZVVwbGltaXQpIHtcbiAgICAgICAgICAgIC8vIOWQkeS4iua7kVxuICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrICsgc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHNldFRpbWUoc2VsZikge1xuICAgICAgbGV0IGN1cnJlbnRUaW1lID0gc2VsZi5tZXRob2RzLmN1cnJlbnRUaW1lKHNlbGYudGljaylcbiAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgIHRpbWU6IGN1cnJlbnRUaW1lXG4gICAgICB9KVxuICAgICAgc2VsZi50aW1lID0gY3VycmVudFRpbWVcbiAgICB9LFxuICAgIGN1cnJlbnRUaW1lKHRpY2spIHtcbiAgICAgIGlmICh0aWNrIDwgMCkge1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IG1pbiA9ICh0aWNrIC0gKHRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluXG4gICAgICAgIGxldCBzZWMgPSB0aWNrICUgc2Vjb25kc1Blck1pblxuICAgICAgICBpZiAodGljayA9PT0gdGltZVVwbGltaXQpIHtcbiAgICAgICAgICAvLyB0aWNrID0gLTFcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aWNrKVxuICAgICAgICAgIHJldHVybiBsb29wXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG1pbiA8IDEwKSB7XG4gICAgICAgICAgICBtaW4gPSAnMCcgKyBtaW5cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlYyA8IDEwKSB7XG4gICAgICAgICAgICBzZWMgPSAnMCcgKyBzZWNcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1pbiArICcgOiAnICsgc2VjXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGltYWdlQ2hhbmdlKHNlbGYpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt4UG9zXSAtIHNlbGYuc3RhclBvaW50W3hQb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeVBvc10gLSBzZWxmLnN0YXJQb2ludFt5UG9zXVxuICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID4gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VJbWFnZVBvaW50KSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeFBvc10gPiBzZWxmLnN0YXJQb2ludFt4UG9zXSkge1xuICAgICAgICAgICAgLy8g5ZCR5Y+z5YiSXG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYubm9kZS5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnR09MRCc6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnVFJFRSc6XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gbm9kZUdvbGRcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdXQVRFUic6XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gbm9kZVRyZWVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdGSVJFJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlV2F0ZXJcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdTT0lMJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlRmlyZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5jdXJQb2ludFt4UG9zXSA8IHNlbGYuc3RhclBvaW50W3hQb3NdKSB7XG4gICAgICAgICAgICAvLyDlvoDlt6bliJJcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5ub2RlLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlICdHT0xEJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlVHJlZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ1RSRUUnOlxuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9IG5vZGVXYXRlclxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ1dBVEVSJzpcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSBub2RlRmlyZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ0ZJUkUnOlxuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9IG5vaXNlU29pbFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ1NPSUwnOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgc2VsZi5tZXRob2RzLmRhdGUoc2VsZilcbiAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICBzZWxmLnRpY2sgPSBpbml0aWFsTWluICogc2Vjb25kc1Blck1pblxuICAgIGNvbnNvbGUubG9nKHNlbGYudGltZSwgc2VsZi50aWNrKVxuICB9XG59XG4iXX0=