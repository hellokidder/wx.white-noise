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
      touches: [0, 0]
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
            if (self.tick === timeLowlimit) {
              self.setData({
                touchmove: true,
                circlecolor: 'rgba(0, 0, 0, 0)',
                key: ksStart,
                tick: initialTime * secondsPerMin,
                time: initialTimeText
              });
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
        console.log('star');
        var self = this;
        self.starPoint = [e.touches[0].pageX, e.touches[0].pageY];
      },
      touchmove: function touchmove(e) {
        console.log('move');
        var self = this;
        self.curPoint = [e.touches[0].pageX, e.touches[0].pageY];
        self.changePoint++;
        if (self.touchmove) {
          self.methods.timeChange(self);
        }
      },
      touchend: function touchend(e) {
        console.log('end');
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
                  break;
                case WATER:
                  self.mark = '../image/tree.png';
                  self.imageNode = TREE;
                  self.bgcolor = 'rgba( 0, 255, 0, 0.3)';
                  break;
                case FIRE:
                  self.mark = '../image/water.png';
                  self.imageNode = WATER;
                  self.bgcolor = 'rgba(0, 255, 255, 0.3)';
                  break;
                case SOIL:
                  self.mark = '../image/fire.png';
                  self.imageNode = FIRE;
                  self.bgcolor = 'rgba( 255, 0, 0, 0.3)';
                  break;
              }
              self.changePoint = 0;
            } else if (self.curPoint[xPos] < self.starPoint[xPos]) {
              switch (self.imageNode) {
                case GOLD:
                  self.mark = '../image/tree.png';
                  self.imageNode = TREE;
                  self.bgcolor = 'rgba( 0, 255, 0, 0.3)';
                  break;
                case TREE:
                  self.mark = '../image/water.png';
                  self.imageNode = WATER;
                  self.bgcolor = 'rgba(0, 255, 255, 0.3)';
                  break;
                case WATER:
                  self.mark = '../image/fire.png';
                  self.imageNode = FIRE;
                  self.bgcolor = 'rgba( 255, 0, 0, 0.3)';
                  break;
                case FIRE:
                  self.mark = '../image/soil.png';
                  self.imageNode = SOIL;
                  self.bgcolor = 'rgba( 238, 99, 99, 0.3)';
                  break;
                case SOIL:
                  break;
              }
              self.changePoint = 0;
            }
          }
        }
      },
      playnoise: function playnoise() {
        _wepy2.default.playBackgroundAudio({
          dataUrl: '{{}}',
          title: '',
          coverImgUrl: ''
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld25vaXNlLmpzIl0sIm5hbWVzIjpbImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxUaW1lIiwic2Vjb25kc1Blck1pbiIsInRpbWVVcGxpbWl0IiwidGltZUxvd2xpbWl0Iiwia3NTdGFydCIsImtzUGF1c2UiLCJrc0NvbnRpbnVlIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwiR09MRCIsIlRSRUUiLCJXQVRFUiIsIkZJUkUiLCJTT0lMIiwidGltZXIiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibWFyayIsImRhdGVzIiwic2hvd0ltZ2UiLCJ0aWNrIiwidGltZSIsImtleSIsImtTdGF0dXMiLCJlbmRLZXkiLCJ0b3VjaG1vdmUiLCJjaGFuZ2VQb2ludCIsImltYWdlTm9kZSIsImJnY29sb3IiLCJjaXJjbGVjb2xvciIsInN0YXJQb2ludCIsImN1clBvaW50IiwidG91Y2hlcyIsIm1ldGhvZHMiLCJkYXRlIiwic2VsZiIsIkRhdGUiLCJ3ZWVrcyIsIndlZWsiLCJnZXRVVENEYXkiLCJ3ZWVrZCIsIm1vbnRoIiwiZ2V0TW9udGgiLCJtb250aHMiLCJtb24iLCJkYXkiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibWluIiwiY2lyY2xlQ29sb3JDaGFuZ2UiLCJzZXRJbnRlcnZhbCIsInNldFRpbWUiLCJzZXREYXRhIiwiY2xlYXJJbnRlcnZhbCIsImN1cnJlbnRUaW1lIiwidGltZXJFbmQiLCJzZWMiLCJ0b3VjaHN0YXJ0IiwiZSIsImNvbnNvbGUiLCJsb2ciLCJwYWdlWCIsInBhZ2VZIiwidGltZUNoYW5nZSIsInRvdWNoZW5kIiwiaW1hZ2VDaGFuZ2UiLCJ4Y2hhbmdlIiwieWNoYW5nZSIsIk1hdGgiLCJhYnMiLCJwbGF5bm9pc2UiLCJwbGF5QmFja2dyb3VuZEF1ZGlvIiwiZGF0YVVybCIsInRpdGxlIiwiY292ZXJJbWdVcmwiLCJkZXNjIiwi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LFdBQUtGLE9BQUwsQ0FBYUMsSUFBYixDQUFrQkMsSUFBbEI7QUFDQTJDLGlCQUFXLFlBQU07QUFDZjNDLGFBQUtoQixRQUFMLEdBQWdCLEtBQWhCO0FBQ0FnQixhQUFLa0IsT0FBTCxDQUFhO0FBQ1hsQyxvQkFBVTtBQURDLFNBQWI7QUFHRCxPQUxELEVBS0csSUFMSDtBQU1BZ0IsV0FBS2QsSUFBTCxHQUFZMUIsZUFBWjtBQUNBd0MsV0FBS2YsSUFBTCxHQUFZeEIsY0FBY0MsYUFBMUI7QUFDRDs7OztFQWpRZ0MsZUFBS2tGLEk7O2tCQUFuQmxFLEsiLCJmaWxlIjoibmV3bm9pc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmNvbnN0IGluaXRpYWxUaW1lVGV4dCA9ICcyMCA6IDAwJ1xuY29uc3QgaW5pdGlhbFRpbWUgPSAyMFxuY29uc3Qgc2Vjb25kc1Blck1pbiA9IDYwXG5jb25zdCB0aW1lVXBsaW1pdCA9IDYwXG5jb25zdCB0aW1lTG93bGltaXQgPSAwXG5jb25zdCBrc1N0YXJ0ID0gMFxuY29uc3Qga3NQYXVzZSA9IDFcbmNvbnN0IGtzQ29udGludWUgPSAyXG5jb25zdCB4UG9zID0gMFxuY29uc3QgeVBvcyA9IDFcbmNvbnN0IGNoYW5nZVRpbWVQb2ludCA9IDVcbmNvbnN0IGNoYW5nZUltYWdlUG9pbnQgPSA1XG5jb25zdCBHT0xEID0gJ2dvbGQnXG5jb25zdCBUUkVFID0gJ3RyZWUnXG5jb25zdCBXQVRFUiA9ICd3YXRlcidcbmNvbnN0IEZJUkUgPSAnZmlyZSdcbmNvbnN0IFNPSUwgPSAnc29pbCdcblxubGV0IHRpbWVyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflvZLlv4MnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBtYXJrOiAnLi4vaW1hZ2Uvd2F0ZXIucG5nJyxcbiAgICBkYXRlczogJycsXG4gICAgc2hvd0ltZ2U6IGZhbHNlLFxuICAgIHRpY2s6IDAsXG4gICAgdGltZTogJycsXG4gICAga2V5OiBrc1N0YXJ0LFxuICAgIGtTdGF0dXM6IFsn5byA5aeLJywgJ+aaguWBnCcsICfnu6fnu60nXSxcbiAgICBlbmRLZXk6ICfnu5PmnZ8nLFxuICAgIHRvdWNobW92ZTogdHJ1ZSxcbiAgICBjaGFuZ2VQb2ludDogMCxcbiAgICBpbWFnZU5vZGU6IFdBVEVSLFxuICAgIGJnY29sb3I6ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJyxcbiAgICBjaXJjbGVjb2xvcjogJ3JnYmEoMCwgMCwgMCwgMCknLFxuICAgIHN0YXJQb2ludDogWzAsIDBdLFxuICAgIGN1clBvaW50OiBbMCwgMF0sXG4gICAgdG91Y2hlczogWzAsIDBdXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBkYXRlKHNlbGYpIHtcbiAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgY29uc3Qgd2Vla3MgPSBbJ1N1bicsICdNb24nLCAnVHVlcycsICdXZWQnLCAnVGh1cicsICdGcmknLCAnU2F0J11cbiAgICAgIGNvbnN0IHdlZWsgPSBkYXRlLmdldFVUQ0RheSgpXG4gICAgICBjb25zdCB3ZWVrZCA9IHdlZWtzW3dlZWtdXG4gICAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICAgICAgY29uc3QgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWcnLCAnU2VwdCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgICBjb25zdCBtb24gPSBtb250aHNbbW9udGhdXG4gICAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICAgICAgc2VsZi5kYXRlcyA9IG1vbiArICcgJyArIGRheSArICcgJyArIHdlZWtkICsgJyAnICsgeWVhclxuICAgIH0sXG4gICAgLy8g5Yik5pat5piv5ZCm5byA5ZCv6K6h5pe25ZmoXG4gICAgdGltZSgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgbGV0IG1pbiA9IChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pblxuICAgICAgc2VsZi5tZXRob2RzLmNpcmNsZUNvbG9yQ2hhbmdlKHNlbGYpXG4gICAgICBpZiAobWluID4gdGltZUxvd2xpbWl0ICYmIG1pbiA8PSB0aW1lVXBsaW1pdCkge1xuICAgICAgICBzZWxmLm1ldGhvZHMudGltZXIoc2VsZilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYua2V5ID0ga3NQYXVzZVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g6K6h5pe25ZmoXG4gICAgdGltZXIoc2VsZikge1xuICAgICAgc2VsZi50b3VjaG1vdmUgPSBmYWxzZVxuICAgICAgaWYgKHNlbGYua2V5ID09PSBrc1N0YXJ0IHx8IHNlbGYua2V5ID09PSBrc0NvbnRpbnVlKSB7XG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi50aWNrLS1cbiAgICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgICAgaWYgKHNlbGYudGljayA9PT0gdGltZUxvd2xpbWl0KSB7XG4gICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgICB0b3VjaG1vdmU6IHRydWUsXG4gICAgICAgICAgICAgIGNpcmNsZWNvbG9yOiAncmdiYSgwLCAwLCAwLCAwKScsXG4gICAgICAgICAgICAgIGtleToga3NTdGFydCxcbiAgICAgICAgICAgICAgdGljazogaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluLFxuICAgICAgICAgICAgICB0aW1lOiBpbml0aWFsVGltZVRleHRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICAgICAgICAgIHNlbGYudGljayA9IGluaXRpYWxUaW1lICogc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi50b3VjaG1vdmUgPSB0cnVlXG4gICAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMCknXG4gICAgICAgICAgICBzZWxmLmtleSA9IGtzU3RhcnRcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwKVxuICAgICAgICBzZWxmLmtleSA9IGtzUGF1c2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgc2VsZi5rZXkgPSBrc0NvbnRpbnVlXG4gICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSgyNTUsIDI1NSwgMCwgMC4xKSdcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOWIt+aWsOaXtumXtFxuICAgIHNldFRpbWUoc2VsZiwgdGljaykge1xuICAgICAgbGV0IGN1cnJlbnRUaW1lID0gc2VsZi5tZXRob2RzLmN1cnJlbnRUaW1lKHNlbGYudGljaylcbiAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgIHRpbWU6IGN1cnJlbnRUaW1lXG4gICAgICB9KVxuICAgICAgc2VsZi50aW1lID0gY3VycmVudFRpbWVcbiAgICB9LFxuICAgIHRpbWVyRW5kKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgc2VsZi5rZXkgPSBrc1N0YXJ0XG4gICAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgICAgc2VsZi50b3VjaG1vdmUgPSB0cnVlXG4gICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMCknXG4gICAgfSxcbiAgICAvLyDorqHnrpfml7bpl7Tlj4rovpPlh7rmoLzlvI9cbiAgICBjdXJyZW50VGltZSh0aWNrKSB7XG4gICAgICBsZXQgbWluID0gKHRpY2sgLSAodGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW5cbiAgICAgIGxldCBzZWMgPSB0aWNrICUgc2Vjb25kc1Blck1pblxuICAgICAgaWYgKG1pbiA+IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgIHJldHVybiAn4oieJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1pbiA8IDEwKSB7XG4gICAgICAgICAgbWluID0gJzAnICsgbWluXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlYyA8IDEwKSB7XG4gICAgICAgICAgc2VjID0gJzAnICsgc2VjXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbiArICc6JyArIHNlY1xuICAgICAgfVxuICAgIH0sXG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnc3RhcicpXG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdtb3ZlJylcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICAgIHNlbGYuY2hhbmdlUG9pbnQrK1xuICAgICAgaWYgKHNlbGYudG91Y2htb3ZlKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lQ2hhbmdlKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICB0b3VjaGVuZChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnZW5kJylcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYgKHNlbGYudG91Y2htb3ZlKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy5pbWFnZUNoYW5nZShzZWxmKVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5LiK5LiL5ruR5Yqo6LCD6IqC5pe26Ze0XG4gICAgdGltZUNoYW5nZShzZWxmKSB7XG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeFBvc10gLSBzZWxmLnN0YXJQb2ludFt4UG9zXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50W3lQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeVBvc11cbiAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA8IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID4gY2hhbmdlVGltZVBvaW50KSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeVBvc10gPiBzZWxmLnN0YXJQb2ludFt5UG9zXSAmJiBzZWxmLnRpY2sgPiAwKSB7XG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgLSBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt5UG9zXSA8IHNlbGYuc3RhclBvaW50W3lQb3NdKSB7XG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgKyBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5bem5Y+z5ruR5Yqo6LCD6IqC5Zu+54mHXG4gICAgaW1hZ2VDaGFuZ2Uoc2VsZikge1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50W3hQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeFBvc11cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt5UG9zXSAtIHNlbGYuc3RhclBvaW50W3lQb3NdXG4gICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPiBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA+IGNoYW5nZUltYWdlUG9pbnQpIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt4UG9zXSA+IHNlbGYuc3RhclBvaW50W3hQb3NdKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgR09MRDpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFRSRUU6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2dvbGQucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gR09MRFxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFdBVEVSOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS90cmVlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFRSRUVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgRklSRTpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvd2F0ZXIucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gV0FURVJcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFNPSUw6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gRklSRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfSBlbHNlIGlmIChzZWxmLmN1clBvaW50W3hQb3NdIDwgc2VsZi5zdGFyUG9pbnRbeFBvc10pIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBHT0xEOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS90cmVlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFRSRUVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgVFJFRTpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvd2F0ZXIucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gV0FURVJcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFdBVEVSOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9maXJlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IEZJUkVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgRklSRTpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvc29pbC5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBTT0lMXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDIzOCwgOTksIDk5LCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgU09JTDpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHBsYXlub2lzZSgpIHtcbiAgICAgIHdlcHkucGxheUJhY2tncm91bmRBdWRpbyh7XG4gICAgICAgIGRhdGFVcmw6ICd7e319JyxcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBjb3ZlckltZ1VybDogJydcbiAgICAgIH0pXG4gICAgfSxcbiAgICBjaXJjbGVDb2xvckNoYW5nZShzZWxmKSB7XG4gICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgIGNhc2UgR09MRDpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgVFJFRTpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFdBVEVSOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIEZJUkU6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMyknXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBTT0lMOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDAuMyknXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5b2S5b+DJyxcbiAgICAgIGRlc2M6ICfpg73luILllqfpl7kg5L2V5aSE5b2S5b+DJyxcbiAgICAgIHBhdGg6ICcvcGFnZS9ub2lzZSdcbiAgICB9XG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIHNlbGYubWV0aG9kcy5kYXRlKHNlbGYpXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLnNob3dJbWdlID0gZmFsc2VcbiAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgIHNob3dJbWdlOiBmYWxzZVxuICAgICAgfSlcbiAgICB9LCAyMDAwKVxuICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgIHNlbGYudGljayA9IGluaXRpYWxUaW1lICogc2Vjb25kc1Blck1pblxuICB9XG59XG4iXX0=