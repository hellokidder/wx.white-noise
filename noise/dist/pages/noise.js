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

var secondsPerMin = 60;
var changeTimePoint = 5;
var changeImagePoint = 10;
var timeTopPoint = 60;
var timeLowPoint = 0;
var bitsPoint = 10;
var Xpos = 0;
var Ypos = 1;
var timer = null;

var Water = function (_wepy$page) {
  _inherits(Water, _wepy$page);

  function Water() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Water);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Water.__proto__ || Object.getPrototypeOf(Water)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '归心'
    }, _this.data = {
      switch: true,
      showImg: true,
      mark: '../image/water.png',
      starPoint: [0, 0],
      curPoint: [0, 0],
      bgcolor: 'rgba(0, 255, 255, 0.3)',
      imageNode: 'water',
      tick: 0,
      key: '开始',
      dates: '',
      end: '结束',
      changePoint: 0,
      time: ''
    }, _this.methods = {
      timeChange: function timeChange(self, e) {
        self.curPoint = [e.touches[0].pageX, e.touches[0].pageY];
        var xchange = self.curPoint[Xpos] - self.starPoint[Xpos];
        var ychange = self.curPoint[Ypos] - self.starPoint[Ypos];
        var currentTime = void 0;
        if (self.curPoint[Xpos] >= self.starPoint[Xpos]) {
          if (Math.abs(xchange) >= Math.abs(ychange)) {
            self.changePoint = self.changePoint + 1;
            console.log(self.changePoint);
          } else {
            if (self.curPoint[Ypos] >= self.starPoint[Ypos]) {
              if (self.tick / secondsPerMin > timeLowPoint) {
                self.changePoint = self.changePoint + 1;
                if (self.changePoint === changeTimePoint) {
                  self.tick = self.tick - secondsPerMin;
                  currentTime = self.tick / secondsPerMin >= timeTopPoint ? '∞' : ((self.tick - self.tick % secondsPerMin) / secondsPerMin < bitsPoint ? '0' + (self.tick - self.tick % secondsPerMin) / secondsPerMin : (self.tick - self.tick % secondsPerMin) / secondsPerMin) + ' : ' + (self.tick % secondsPerMin >= bitsPoint ? self.tick % secondsPerMin : '0' + self.tick % secondsPerMin);
                  self.changePoint = 0;
                  self.time = currentTime;
                  self.setData({
                    time: currentTime
                  });
                }
              }
            } else {
              if (self.tick / secondsPerMin < timeTopPoint) {
                self.changePoint = self.changePoint + 1;
                if (self.changePoint === changeTimePoint) {
                  self.tick = self.tick + secondsPerMin;
                  currentTime = self.tick / secondsPerMin >= timeTopPoint ? '∞' : ((self.tick - self.tick % secondsPerMin) / secondsPerMin < bitsPoint ? '0' + (self.tick - self.tick % secondsPerMin) / secondsPerMin : (self.tick - self.tick % secondsPerMin) / secondsPerMin) + ' : ' + (self.tick % secondsPerMin >= bitsPoint ? self.tick % secondsPerMin : '0' + self.tick % secondsPerMin);
                  self.changePoint = 0;
                  self.time = currentTime;
                  self.setData({
                    time: currentTime
                  });
                  console.log(self.time, currentTime);
                }
              }
            }
          }
        } else {
          if (Math.abs(xchange) >= Math.abs(ychange)) {
            self.changePoint = self.changePoint + 1;
          } else {
            if (self.curPoint[Ypos] >= self.starPoint[Ypos]) {
              if (self.tick / secondsPerMin > timeLowPoint) {
                self.changePoint = self.changePoint + 1;
                if (self.changePoint === changeTimePoint) {
                  self.tick = self.tick - secondsPerMin;
                  currentTime = self.tick / secondsPerMin >= timeTopPoint ? '∞' : ((self.tick - self.tick % secondsPerMin) / secondsPerMin < bitsPoint ? '0' + (self.tick - self.tick % secondsPerMin) / secondsPerMin : (self.tick - self.tick % secondsPerMin) / secondsPerMin) + ' : ' + (self.tick % secondsPerMin >= bitsPoint ? self.tick % secondsPerMin : '0' + self.tick % secondsPerMin);
                  self.changePoint = 0;
                  self.time = currentTime;
                  self.setData({
                    time: currentTime
                  });
                }
              }
            } else {
              if (self.tick / secondsPerMin < timeTopPoint) {
                self.changePoint = self.changePoint + 1;
                if (self.changePoint === changeTimePoint) {
                  self.tick = self.tick + secondsPerMin;
                  currentTime = self.tick / secondsPerMin >= timeTopPoint ? '∞' : ((self.tick - self.tick % secondsPerMin) / secondsPerMin < bitsPoint ? '0' + (self.tick - self.tick % secondsPerMin) / secondsPerMin : (self.tick - self.tick % secondsPerMin) / secondsPerMin) + ' : ' + (self.tick % secondsPerMin >= bitsPoint ? self.tick % secondsPerMin : '0' + self.tick % secondsPerMin);
                  self.changePoint = 0;
                  self.time = currentTime;
                  self.setData({
                    time: currentTime
                  });
                }
              }
            }
          }
        }
      },
      imageChange: function imageChange(self, e) {
        var xchange = self.curPoint[Xpos] - self.starPoint[Xpos];
        var ychange = self.curPoint[Ypos] - self.starPoint[Ypos];

        if (self.curPoint[Xpos] >= self.starPoint[Xpos]) {
          if (Math.abs(xchange) >= Math.abs(ychange)) {
            if (self.changePoint > changeImagePoint) {
              switch (self.imageNode) {
                case 'gold':
                  break;
                case 'tree':
                  self.mark = '../image/gold.png';
                  self.imageNode = 'gold';
                  self.bgcolor = 'rgba( 255, 255, 0, 0.3)';
                  break;
                case 'water':
                  self.mark = '../image/tree.png';
                  self.imageNode = 'tree';
                  self.bgcolor = 'rgba( 0, 255, 0, 0.3)';
                  break;
                case 'fire':
                  self.mark = '../image/water.png';
                  self.imageNode = 'water';
                  self.bgcolor = 'rgba(0, 255, 255, 0.3)';
                  break;
                case 'soil':
                  self.mark = '../image/fire.png';
                  self.imageNode = 'fire';
                  self.bgcolor = 'rgba( 255, 0, 0, 0.3)';
                  break;
              }
              self.changePoint = 0;
              console.log(self.changePoint);
            }
          } else {
            if (self.curPoint[Ypos] >= self.starPoint[Ypos]) {} else {}
          }
        } else {
          if (Math.abs(xchange) >= Math.abs(ychange)) {
            if (self.changePoint > changeImagePoint) {
              switch (self.imageNode) {
                case 'gold':
                  self.mark = '../image/tree.png';
                  self.imageNode = 'tree';
                  self.bgcolor = 'rgba( 0, 255, 0, 0.3)';
                  break;
                case 'tree':
                  self.mark = '../image/water.png';
                  self.imageNode = 'water';
                  self.bgcolor = 'rgba(0, 255, 255, 0.3)';
                  break;
                case 'water':
                  self.mark = '../image/fire.png';
                  self.imageNode = 'fire';
                  self.bgcolor = 'rgba( 255, 0, 0, 0.3)';
                  break;
                case 'fire':
                  self.mark = '../image/soil.png';
                  self.imageNode = 'soil';
                  self.bgcolor = 'rgba( 238, 99, 99, 0.3)';
                  break;
                case 'soil':
                  break;
              }
              self.changePoint = 0;
            }
          } else {
            if (self.curPoint[Ypos] >= self.starPoint[Ypos]) {} else {}
          }
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
        if (self.switch) {
          self.methods.timeChange(self, e);
        }
      },
      touchend: function touchend(e) {
        console.log('end');
        var self = this;
        if (self.switch) {
          self.methods.imageChange(self, e);
        }
      },
      floor: function floor() {
        var self = this;
        var currentTime = void 0;
        if (timer) {
          clearInterval(timer);
        }
        if (self.key === '开始' || self.key === '继续') {
          var tickCount = self.tick;
          timer = setInterval(function () {
            tickCount--;
            self.setData({
              tick: tickCount
            });
            self.tick = tickCount;

            if (self.tick === timeLowPoint) {
              clearInterval(timer);
            }
            console.log(self.tick);
            currentTime = self.tick / secondsPerMin >= timeTopPoint ? '∞' : ((self.tick - self.tick % secondsPerMin) / secondsPerMin < bitsPoint ? '0' + (self.tick - self.tick % secondsPerMin) / secondsPerMin : (self.tick - self.tick % secondsPerMin) / secondsPerMin) + ' : ' + (self.tick % secondsPerMin >= bitsPoint ? self.tick % secondsPerMin : '0' + self.tick % secondsPerMin);
            self.setData({
              time: currentTime
            });
            self.time = currentTime;
          }, 1000);
          self.key = '暂停';
          self.switch = false;
        } else {
          self.key = '继续';
          currentTime = self.tick / secondsPerMin >= timeTopPoint ? '∞' : ((self.tick - self.tick % secondsPerMin) / secondsPerMin < bitsPoint ? '0' + (self.tick - self.tick % secondsPerMin) / secondsPerMin : (self.tick - self.tick % secondsPerMin) / secondsPerMin) + ' : ' + (self.tick % secondsPerMin >= bitsPoint ? self.tick % secondsPerMin : '0' + self.tick % secondsPerMin);
          self.setData({
            time: currentTime
          });
          self.time = currentTime;
          console.log(self.time);
          clearInterval(timer);
        }
      },
      floorEnd: function floorEnd() {
        var self = this;
        clearInterval(timer);
        self.key = '开始';
        self.tick = 20 * secondsPerMin;
        self.time = '20 : 00';
        self.switch = true;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Water, [{
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
      var date = new Date();
      var self = this;
      var weeks = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
      var week = date.getUTCDay();
      var weekd = weeks[week];
      var month = date.getMonth();
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      var mon = months[month];
      var day = date.getDate();
      var year = date.getFullYear();
      self.dates = mon + ' ' + day + ' ' + weekd + ' ' + year;
      self.tick = 20 * secondsPerMin;
      self.time = self.tick / 60 + ' : 0' + self.tick % 60;
      setTimeout(function () {
        self.showImg = false;
        self.setData({
          showImg: false
        });
      }, 2000);
      // wepy.request({
      //   url: 'http://127.0.0.1:7001/voice/list',
      //   success: function(res) {
      //     console.log(res)
      //   }
      // })
    }
  }]);

  return Water;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Water , 'pages/noise'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbInNlY29uZHNQZXJNaW4iLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwidGltZVRvcFBvaW50IiwidGltZUxvd1BvaW50IiwiYml0c1BvaW50IiwiWHBvcyIsIllwb3MiLCJ0aW1lciIsIldhdGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJzd2l0Y2giLCJzaG93SW1nIiwibWFyayIsInN0YXJQb2ludCIsImN1clBvaW50IiwiYmdjb2xvciIsImltYWdlTm9kZSIsInRpY2siLCJrZXkiLCJkYXRlcyIsImVuZCIsImNoYW5nZVBvaW50IiwidGltZSIsIm1ldGhvZHMiLCJ0aW1lQ2hhbmdlIiwic2VsZiIsImUiLCJ0b3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsInhjaGFuZ2UiLCJ5Y2hhbmdlIiwiY3VycmVudFRpbWUiLCJNYXRoIiwiYWJzIiwiY29uc29sZSIsImxvZyIsInNldERhdGEiLCJpbWFnZUNoYW5nZSIsInRvdWNoc3RhcnQiLCJ0b3VjaG1vdmUiLCJ0b3VjaGVuZCIsImZsb29yIiwiY2xlYXJJbnRlcnZhbCIsInRpY2tDb3VudCIsInNldEludGVydmFsIiwiZmxvb3JFbmQiLCJ0aXRsZSIsImRlc2MiLCJwYXRoIiwiZGF0ZSIsIkRhdGUiLCJ3ZWVrcyIsIndlZWsiLCJnZXRVVENEYXkiLCJ3ZWVrZCIsIm1vbnRoIiwiZ2V0TW9udGgiLCJtb250aHMiLCJtb24iLCJkYXkiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwic2V0VGltZW91dCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxnQkFBZ0IsRUFBdEI7QUFDQSxJQUFNQyxrQkFBa0IsQ0FBeEI7QUFDQSxJQUFNQyxtQkFBbUIsRUFBekI7QUFDQSxJQUFNQyxlQUFlLEVBQXJCO0FBQ0EsSUFBTUMsZUFBZSxDQUFyQjtBQUNBLElBQU1D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QTVDLEVBQW9ELEtBQXBELEVBQTJELE1BQTNELEVBQW1FLEtBQW5FLEVBQTBFLEtBQTFFLEVBQWlGLEtBQWpGLENBQWY7QUFDQSxVQUFNQyxNQUFNRCxPQUFPRixLQUFQLENBQVo7QUFDQSxVQUFNSSxNQUFNVixLQUFLVyxPQUFMLEVBQVo7QUFDQSxVQUFNQyxPQUFPWixLQUFLYSxXQUFMLEVBQWI7QUFDQXRDLFdBQUtOLEtBQUwsR0FBYXdDLE1BQU0sR0FBTixHQUFZQyxHQUFaLEdBQWtCLEdBQWxCLEdBQXdCTCxLQUF4QixHQUFnQyxHQUFoQyxHQUFzQ08sSUFBbkQ7QUFDQXJDLFdBQUtSLElBQUwsR0FBWSxLQUFLcEIsYUFBakI7QUFDQTRCLFdBQUtILElBQUwsR0FBYUcsS0FBS1IsSUFBTCxHQUFZLEVBQWIsR0FBbUIsTUFBbkIsR0FBNkJRLEtBQUtSLElBQUwsR0FBWSxFQUFyRDtBQUNBK0MsaUJBQVcsWUFBTTtBQUNmdkMsYUFBS2QsT0FBTCxHQUFlLEtBQWY7QUFDQWMsYUFBS1ksT0FBTCxDQUFhO0FBQ1gxQixtQkFBUztBQURFLFNBQWI7QUFHRCxPQUxELEVBS0csSUFMSDtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEOzs7O0VBaFJnQyxlQUFLc0QsSTs7a0JBQW5CM0QsSyIsImZpbGUiOiJub2lzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuY29uc3Qgc2Vjb25kc1Blck1pbiA9IDYwXG5jb25zdCBjaGFuZ2VUaW1lUG9pbnQgPSA1XG5jb25zdCBjaGFuZ2VJbWFnZVBvaW50ID0gMTBcbmNvbnN0IHRpbWVUb3BQb2ludCA9IDYwXG5jb25zdCB0aW1lTG93UG9pbnQgPSAwXG5jb25zdCBiaXRzUG9pbnQgPSAxMFxuY29uc3QgWHBvcyA9IDBcbmNvbnN0IFlwb3MgPSAxXG5sZXQgdGltZXIgPSBudWxsXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflvZLlv4MnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBzd2l0Y2g6IHRydWUsXG4gICAgc2hvd0ltZzogdHJ1ZSxcbiAgICBtYXJrOiAnLi4vaW1hZ2Uvd2F0ZXIucG5nJyxcbiAgICBzdGFyUG9pbnQ6IFswLCAwXSxcbiAgICBjdXJQb2ludDogWzAsIDBdLFxuICAgIGJnY29sb3I6ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJyxcbiAgICBpbWFnZU5vZGU6ICd3YXRlcicsXG4gICAgdGljazogMCxcbiAgICBrZXk6ICflvIDlp4snLFxuICAgIGRhdGVzOiAnJyxcbiAgICBlbmQ6ICfnu5PmnZ8nLFxuICAgIGNoYW5nZVBvaW50OiAwLFxuICAgIHRpbWU6ICcnXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICB0aW1lQ2hhbmdlKHNlbGYsIGUpIHtcbiAgICAgIHNlbGYuY3VyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbWHBvc10gLSBzZWxmLnN0YXJQb2ludFtYcG9zXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50W1lwb3NdIC0gc2VsZi5zdGFyUG9pbnRbWXBvc11cbiAgICAgIGxldCBjdXJyZW50VGltZVxuICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbWHBvc10gPj0gc2VsZi5zdGFyUG9pbnRbWHBvc10pIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IHNlbGYuY2hhbmdlUG9pbnQgKyAxXG4gICAgICAgICAgY29uc29sZS5sb2coc2VsZi5jaGFuZ2VQb2ludClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFtZcG9zXSA+PSBzZWxmLnN0YXJQb2ludFtZcG9zXSkge1xuICAgICAgICAgICAgaWYgKChzZWxmLnRpY2sgLyBzZWNvbmRzUGVyTWluKSA+IHRpbWVMb3dQb2ludCkge1xuICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gc2VsZi5jaGFuZ2VQb2ludCArIDFcbiAgICAgICAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPT09IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayAtIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgICAgICBjdXJyZW50VGltZSA9IChzZWxmLnRpY2sgLyBzZWNvbmRzUGVyTWluKSA+PSB0aW1lVG9wUG9pbnQgPyAn4oieJyA6ICgoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSA8IGJpdHNQb2ludCA/ICcwJyArICgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pIDogKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikpICsgJyA6ICcgKyAoKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pID49IGJpdHNQb2ludCA/IChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSA6ICcwJyArIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSlcbiAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgICAgICAgIHNlbGYudGltZSA9IGN1cnJlbnRUaW1lXG4gICAgICAgICAgICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgIHRpbWU6IGN1cnJlbnRUaW1lXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoKHNlbGYudGljayAvIHNlY29uZHNQZXJNaW4pIDwgdGltZVRvcFBvaW50KSB7XG4gICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSBzZWxmLmNoYW5nZVBvaW50ICsgMVxuICAgICAgICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA9PT0gY2hhbmdlVGltZVBvaW50KSB7XG4gICAgICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrICsgc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lID0gKHNlbGYudGljayAvIHNlY29uZHNQZXJNaW4pID49IHRpbWVUb3BQb2ludCA/ICfiiJ4nIDogKCgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pIDwgYml0c1BvaW50ID8gJzAnICsgKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikgOiAoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSkgKyAnIDogJyArICgoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikgPj0gYml0c1BvaW50ID8gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pIDogJzAnICsgKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKVxuICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgICAgICAgc2VsZi50aW1lID0gY3VycmVudFRpbWVcbiAgICAgICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYudGltZSwgY3VycmVudFRpbWUpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSBzZWxmLmNoYW5nZVBvaW50ICsgMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W1lwb3NdID49IHNlbGYuc3RhclBvaW50W1lwb3NdKSB7XG4gICAgICAgICAgICBpZiAoKHNlbGYudGljayAvIHNlY29uZHNQZXJNaW4pID4gdGltZUxvd1BvaW50KSB7XG4gICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSBzZWxmLmNoYW5nZVBvaW50ICsgMVxuICAgICAgICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA9PT0gY2hhbmdlVGltZVBvaW50KSB7XG4gICAgICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrIC0gc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lID0gKHNlbGYudGljayAvIHNlY29uZHNQZXJNaW4pID49IHRpbWVUb3BQb2ludCA/ICfiiJ4nIDogKCgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pIDwgYml0c1BvaW50ID8gJzAnICsgKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikgOiAoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSkgKyAnIDogJyArICgoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikgPj0gYml0c1BvaW50ID8gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pIDogJzAnICsgKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKVxuICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgICAgICAgc2VsZi50aW1lID0gY3VycmVudFRpbWVcbiAgICAgICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgoc2VsZi50aWNrIC8gc2Vjb25kc1Blck1pbikgPCB0aW1lVG9wUG9pbnQpIHtcbiAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IHNlbGYuY2hhbmdlUG9pbnQgKyAxXG4gICAgICAgICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID09PSBjaGFuZ2VUaW1lUG9pbnQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgKyBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICAgICAgY3VycmVudFRpbWUgPSAoc2VsZi50aWNrIC8gc2Vjb25kc1Blck1pbikgPj0gdGltZVRvcFBvaW50ID8gJ+KInicgOiAoKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikgPCBiaXRzUG9pbnQgPyAnMCcgKyAoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSA6ICgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pKSArICcgOiAnICsgKChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSA+PSBiaXRzUG9pbnQgPyAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikgOiAnMCcgKyAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpXG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICAgICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICB0aW1lOiBjdXJyZW50VGltZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaW1hZ2VDaGFuZ2Uoc2VsZiwgZSkge1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50W1hwb3NdIC0gc2VsZi5zdGFyUG9pbnRbWHBvc11cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFtZcG9zXSAtIHNlbGYuc3RhclBvaW50W1lwb3NdXG5cbiAgICAgIGlmIChzZWxmLmN1clBvaW50W1hwb3NdID49IHNlbGYuc3RhclBvaW50W1hwb3NdKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID4gY2hhbmdlSW1hZ2VQb2ludCkge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlICdnb2xkJzpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICd0cmVlJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZ29sZC5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnZ29sZCdcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnd2F0ZXInOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS90cmVlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9ICd0cmVlJ1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnZmlyZSc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3dhdGVyLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9ICd3YXRlcidcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdzb2lsJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZmlyZS5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnZmlyZSdcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi5jaGFuZ2VQb2ludClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbWXBvc10gPj0gc2VsZi5zdGFyUG9pbnRbWXBvc10pIHtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VJbWFnZVBvaW50KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgJ2dvbGQnOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS90cmVlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9ICd0cmVlJ1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAndHJlZSc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3dhdGVyLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9ICd3YXRlcidcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICd3YXRlcic6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJ2ZpcmUnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdmaXJlJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvc29pbC5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnc29pbCdcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnc29pbCc6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W1lwb3NdID49IHNlbGYuc3RhclBvaW50W1lwb3NdKSB7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnc3RhcicpXG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdtb3ZlJylcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYgKHNlbGYuc3dpdGNoKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lQ2hhbmdlKHNlbGYsIGUpXG4gICAgICB9XG4gICAgfSxcblxuICAgIHRvdWNoZW5kKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdlbmQnKVxuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBpZiAoc2VsZi5zd2l0Y2gpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLmltYWdlQ2hhbmdlKHNlbGYsIGUpXG4gICAgICB9XG4gICAgfSxcblxuICAgIGZsb29yKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBsZXQgY3VycmVudFRpbWVcbiAgICAgIGlmICh0aW1lcikge1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgfVxuICAgICAgaWYgKHNlbGYua2V5ID09PSAn5byA5aeLJyB8fCBzZWxmLmtleSA9PT0gJ+e7p+e7rScpIHtcbiAgICAgICAgbGV0IHRpY2tDb3VudCA9IHNlbGYudGlja1xuICAgICAgICB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICB0aWNrQ291bnQtLVxuICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICB0aWNrOiB0aWNrQ291bnRcbiAgICAgICAgICB9KVxuICAgICAgICAgIHNlbGYudGljayA9IHRpY2tDb3VudFxuXG4gICAgICAgICAgaWYgKHNlbGYudGljayA9PT0gdGltZUxvd1BvaW50KSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnRpY2spXG4gICAgICAgICAgY3VycmVudFRpbWUgPSAoc2VsZi50aWNrIC8gc2Vjb25kc1Blck1pbikgPj0gdGltZVRvcFBvaW50ID8gJ+KInicgOiAoKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikgPCBiaXRzUG9pbnQgPyAnMCcgKyAoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSA6ICgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pKSArICcgOiAnICsgKChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSA+PSBiaXRzUG9pbnQgPyAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikgOiAnMCcgKyAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpXG4gICAgICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgICAgIHRpbWU6IGN1cnJlbnRUaW1lXG4gICAgICAgICAgfSlcbiAgICAgICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgICAgICB9LCAxMDAwKVxuICAgICAgICBzZWxmLmtleSA9ICfmmoLlgZwnXG4gICAgICAgIHNlbGYuc3dpdGNoID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYua2V5ID0gJ+e7p+e7rSdcbiAgICAgICAgY3VycmVudFRpbWUgPSAoc2VsZi50aWNrIC8gc2Vjb25kc1Blck1pbikgPj0gdGltZVRvcFBvaW50ID8gJ+KInicgOiAoKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikgPCBiaXRzUG9pbnQgPyAnMCcgKyAoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSA6ICgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pKSArICcgOiAnICsgKChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSA+PSBiaXRzUG9pbnQgPyAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikgOiAnMCcgKyAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpXG4gICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgICAgfSlcbiAgICAgICAgc2VsZi50aW1lID0gY3VycmVudFRpbWVcbiAgICAgICAgY29uc29sZS5sb2coc2VsZi50aW1lKVxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgfVxuICAgIH0sXG4gICAgZmxvb3JFbmQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICBzZWxmLmtleSA9ICflvIDlp4snXG4gICAgICBzZWxmLnRpY2sgPSAyMCAqIHNlY29uZHNQZXJNaW5cbiAgICAgIHNlbGYudGltZSA9ICcyMCA6IDAwJ1xuICAgICAgc2VsZi5zd2l0Y2ggPSB0cnVlXG4gICAgfVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+W9kuW/gycsXG4gICAgICBkZXNjOiAn6YO95biC5Zan6Ze5IOS9leWkhOW9kuW/gycsXG4gICAgICBwYXRoOiAnL3BhZ2Uvbm9pc2UnXG4gICAgfVxuICB9XG5cbiAgb25Mb2FkKCkge1xuICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIGNvbnN0IHdlZWtzID0gWydTdW4nLCAnTW9uJywgJ1R1ZXMnLCAnV2VkJywgJ1RodXInLCAnRnJpJywgJ1NhdCddXG4gICAgY29uc3Qgd2VlayA9IGRhdGUuZ2V0VVRDRGF5KClcbiAgICBjb25zdCB3ZWVrZCA9IHdlZWtzW3dlZWtdXG4gICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKClcbiAgICBjb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1ZycsICdTZXB0JywgJ09jdCcsICdOb3YnLCAnRGVjJ11cbiAgICBjb25zdCBtb24gPSBtb250aHNbbW9udGhdXG4gICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKClcbiAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgc2VsZi5kYXRlcyA9IG1vbiArICcgJyArIGRheSArICcgJyArIHdlZWtkICsgJyAnICsgeWVhclxuICAgIHNlbGYudGljayA9IDIwICogc2Vjb25kc1Blck1pblxuICAgIHNlbGYudGltZSA9IChzZWxmLnRpY2sgLyA2MCkgKyAnIDogMCcgKyAoc2VsZi50aWNrICUgNjApXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLnNob3dJbWcgPSBmYWxzZVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgc2hvd0ltZzogZmFsc2VcbiAgICAgIH0pXG4gICAgfSwgMjAwMClcbiAgICAvLyB3ZXB5LnJlcXVlc3Qoe1xuICAgIC8vICAgdXJsOiAnaHR0cDovLzEyNy4wLjAuMTo3MDAxL3ZvaWNlL2xpc3QnLFxuICAgIC8vICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAvLyAgIH1cbiAgICAvLyB9KVxuICB9XG59XG4iXX0=