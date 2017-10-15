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

var initialTime = 20;
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
        self.tick = initialTime * secondsPerMin;
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
      self.tick = initialTime * secondsPerMin;
      self.time = self.tick / secondsPerMin + ' : 0' + self.tick % secondsPerMin;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbImluaXRpYWxUaW1lIiwic2Vjb25kc1Blck1pbiIsImNoYW5nZVRpbWVQb2ludCIsImNoYW5nZUltYWdlUG9pbnQiLCJ0aW1lVG9wUG9pbnQiLCJ0aW1lTG93UG9pbnQiLCJiaXRzUG9pbnQiLCJYcG9zIiwiWXBvcyIsInRpbWVyIiwiV2F0ZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInN3aXRjaCIsInNob3dJbWciLCJtYXJrIiwic3RhclBvaW50IiwiY3VyUG9pbnQiLCJiZ2NvbG9yIiwiaW1hZ2VOb2RlIiwidGljayIsImtleSIsImRhdGVzIiwiZW5kIiwiY2hhbmdlUG9pbnQiLCJ0aW1lIiwibWV0aG9kcyIsInRpbWVDaGFuZ2UiLCJzZWxmIiwiZSIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwieGNoYW5nZSIsInljaGFuZ2UiLCJjdXJyZW50VGltZSIsIk1hdGgiLCJhYnMiLCJjb25zb2xlIiwibG9nIiwic2V0RGF0YSIsImltYWdlQ2hhbmdlIiwidG91Y2hzdGFydCIsInRvdWNobW92ZSIsInRvdWNoZW5kIiwiZmxvb3IiLCJjbGVhckludGVydmFsIiwidGlja0NvdW50Iiwic2V0SW50ZXJ2YWwiLCJmbG9vckVuZCIsInRpdGxlIiwiZGVzYyIsInBhdGgiLCJkYXRlIiwiRGF0ZSIsIndlZWtzIiwid2VlayIsImdldFVUQ0RheSIsIndlZWtkIiwibW9udGgiLCJnZXRNb250aCIsIm1vbnRocyIsIm1vbiIsImRheSIsImdldERhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJzZXRUaW1lb3V0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGNBQWMsRUFBcEI7QUFDQSxJQUFNQyxnQkFBZ0IsRUFBdEI7QUFDQSxJQUFNQyxrQkFBa0IsQ0FBeEI7QUFDQSxJQUFNQyxtQkFBbUIsRUFBekI7QUFDQSxJQUFNQyxlQUFlLEVB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QUF0QixFQUE2QixLQUE3QixFQUFvQyxNQUFwQyxFQUE0QyxNQUE1QyxFQUFvRCxLQUFwRCxFQUEyRCxNQUEzRCxFQUFtRSxLQUFuRSxFQUEwRSxLQUExRSxFQUFpRixLQUFqRixDQUFmO0FBQ0EsVUFBTUMsTUFBTUQsT0FBT0YsS0FBUCxDQUFaO0FBQ0EsVUFBTUksTUFBTVYsS0FBS1csT0FBTCxFQUFaO0FBQ0EsVUFBTUMsT0FBT1osS0FBS2EsV0FBTCxFQUFiO0FBQ0F0QyxXQUFLTixLQUFMLEdBQWF3QyxNQUFNLEdBQU4sR0FBWUMsR0FBWixHQUFrQixHQUFsQixHQUF3QkwsS0FBeEIsR0FBZ0MsR0FBaEMsR0FBc0NPLElBQW5EO0FBQ0FyQyxXQUFLUixJQUFMLEdBQVlyQixjQUFjQyxhQUExQjtBQUNBNEIsV0FBS0gsSUFBTCxHQUFhRyxLQUFLUixJQUFMLEdBQVlwQixhQUFiLEdBQThCLE1BQTlCLEdBQXdDNEIsS0FBS1IsSUFBTCxHQUFZcEIsYUFBaEU7QUFDQW1FLGlCQUFXLFlBQU07QUFDZnZDLGFBQUtkLE9BQUwsR0FBZSxLQUFmO0FBQ0FjLGFBQUtZLE9BQUwsQ0FBYTtBQUNYMUIsbUJBQVM7QUFERSxTQUFiO0FBR0QsT0FMRCxFQUtHLElBTEg7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7OztFQWhSZ0MsZUFBS3NELEk7O2tCQUFuQjNELEsiLCJmaWxlIjoibm9pc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmNvbnN0IGluaXRpYWxUaW1lID0gMjBcbmNvbnN0IHNlY29uZHNQZXJNaW4gPSA2MFxuY29uc3QgY2hhbmdlVGltZVBvaW50ID0gNVxuY29uc3QgY2hhbmdlSW1hZ2VQb2ludCA9IDEwXG5jb25zdCB0aW1lVG9wUG9pbnQgPSA2MFxuY29uc3QgdGltZUxvd1BvaW50ID0gMFxuY29uc3QgYml0c1BvaW50ID0gMTBcbmNvbnN0IFhwb3MgPSAwXG5jb25zdCBZcG9zID0gMVxubGV0IHRpbWVyID0gbnVsbFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5b2S5b+DJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgc3dpdGNoOiB0cnVlLFxuICAgIHNob3dJbWc6IHRydWUsXG4gICAgbWFyazogJy4uL2ltYWdlL3dhdGVyLnBuZycsXG4gICAgc3RhclBvaW50OiBbMCwgMF0sXG4gICAgY3VyUG9pbnQ6IFswLCAwXSxcbiAgICBiZ2NvbG9yOiAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKScsXG4gICAgaW1hZ2VOb2RlOiAnd2F0ZXInLFxuICAgIHRpY2s6IDAsXG4gICAga2V5OiAn5byA5aeLJyxcbiAgICBkYXRlczogJycsXG4gICAgZW5kOiAn57uT5p2fJyxcbiAgICBjaGFuZ2VQb2ludDogMCxcbiAgICB0aW1lOiAnJ1xuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgdGltZUNoYW5nZShzZWxmLCBlKSB7XG4gICAgICBzZWxmLmN1clBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50W1hwb3NdIC0gc2VsZi5zdGFyUG9pbnRbWHBvc11cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFtZcG9zXSAtIHNlbGYuc3RhclBvaW50W1lwb3NdXG4gICAgICBsZXQgY3VycmVudFRpbWVcbiAgICAgIGlmIChzZWxmLmN1clBvaW50W1hwb3NdID49IHNlbGYuc3RhclBvaW50W1hwb3NdKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSBzZWxmLmNoYW5nZVBvaW50ICsgMVxuICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYuY2hhbmdlUG9pbnQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbWXBvc10gPj0gc2VsZi5zdGFyUG9pbnRbWXBvc10pIHtcbiAgICAgICAgICAgIGlmICgoc2VsZi50aWNrIC8gc2Vjb25kc1Blck1pbikgPiB0aW1lTG93UG9pbnQpIHtcbiAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IHNlbGYuY2hhbmdlUG9pbnQgKyAxXG4gICAgICAgICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID09PSBjaGFuZ2VUaW1lUG9pbnQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgLSBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICAgICAgY3VycmVudFRpbWUgPSAoc2VsZi50aWNrIC8gc2Vjb25kc1Blck1pbikgPj0gdGltZVRvcFBvaW50ID8gJ+KInicgOiAoKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikgPCBiaXRzUG9pbnQgPyAnMCcgKyAoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSA6ICgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pKSArICcgOiAnICsgKChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSA+PSBiaXRzUG9pbnQgPyAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikgOiAnMCcgKyAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpXG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICAgICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICB0aW1lOiBjdXJyZW50VGltZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKChzZWxmLnRpY2sgLyBzZWNvbmRzUGVyTWluKSA8IHRpbWVUb3BQb2ludCkge1xuICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gc2VsZi5jaGFuZ2VQb2ludCArIDFcbiAgICAgICAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPT09IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayArIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgICAgICBjdXJyZW50VGltZSA9IChzZWxmLnRpY2sgLyBzZWNvbmRzUGVyTWluKSA+PSB0aW1lVG9wUG9pbnQgPyAn4oieJyA6ICgoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSA8IGJpdHNQb2ludCA/ICcwJyArICgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pIDogKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikpICsgJyA6ICcgKyAoKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pID49IGJpdHNQb2ludCA/IChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSA6ICcwJyArIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSlcbiAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgICAgICAgIHNlbGYudGltZSA9IGN1cnJlbnRUaW1lXG4gICAgICAgICAgICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgIHRpbWU6IGN1cnJlbnRUaW1lXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnRpbWUsIGN1cnJlbnRUaW1lKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gc2VsZi5jaGFuZ2VQb2ludCArIDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFtZcG9zXSA+PSBzZWxmLnN0YXJQb2ludFtZcG9zXSkge1xuICAgICAgICAgICAgaWYgKChzZWxmLnRpY2sgLyBzZWNvbmRzUGVyTWluKSA+IHRpbWVMb3dQb2ludCkge1xuICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gc2VsZi5jaGFuZ2VQb2ludCArIDFcbiAgICAgICAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPT09IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayAtIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgICAgICBjdXJyZW50VGltZSA9IChzZWxmLnRpY2sgLyBzZWNvbmRzUGVyTWluKSA+PSB0aW1lVG9wUG9pbnQgPyAn4oieJyA6ICgoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSA8IGJpdHNQb2ludCA/ICcwJyArICgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pIDogKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikpICsgJyA6ICcgKyAoKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pID49IGJpdHNQb2ludCA/IChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSA6ICcwJyArIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSlcbiAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgICAgICAgIHNlbGYudGltZSA9IGN1cnJlbnRUaW1lXG4gICAgICAgICAgICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgIHRpbWU6IGN1cnJlbnRUaW1lXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoKHNlbGYudGljayAvIHNlY29uZHNQZXJNaW4pIDwgdGltZVRvcFBvaW50KSB7XG4gICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSBzZWxmLmNoYW5nZVBvaW50ICsgMVxuICAgICAgICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA9PT0gY2hhbmdlVGltZVBvaW50KSB7XG4gICAgICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrICsgc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lID0gKHNlbGYudGljayAvIHNlY29uZHNQZXJNaW4pID49IHRpbWVUb3BQb2ludCA/ICfiiJ4nIDogKCgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pIDwgYml0c1BvaW50ID8gJzAnICsgKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikgOiAoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSkgKyAnIDogJyArICgoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikgPj0gYml0c1BvaW50ID8gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pIDogJzAnICsgKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKVxuICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgICAgICAgc2VsZi50aW1lID0gY3VycmVudFRpbWVcbiAgICAgICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGltYWdlQ2hhbmdlKHNlbGYsIGUpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFtYcG9zXSAtIHNlbGYuc3RhclBvaW50W1hwb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbWXBvc10gLSBzZWxmLnN0YXJQb2ludFtZcG9zXVxuXG4gICAgICBpZiAoc2VsZi5jdXJQb2ludFtYcG9zXSA+PSBzZWxmLnN0YXJQb2ludFtYcG9zXSkge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA+IGNoYW5nZUltYWdlUG9pbnQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnZ29sZCc6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAndHJlZSc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2dvbGQucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJ2dvbGQnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ3dhdGVyJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvdHJlZS5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAndHJlZSdcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ2ZpcmUnOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnd2F0ZXInXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnc29pbCc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJ2ZpcmUnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYuY2hhbmdlUG9pbnQpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W1lwb3NdID49IHNlbGYuc3RhclBvaW50W1lwb3NdKSB7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID4gY2hhbmdlSW1hZ2VQb2ludCkge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlICdnb2xkJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvdHJlZS5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAndHJlZSdcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ3RyZWUnOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnd2F0ZXInXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnd2F0ZXInOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9maXJlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9ICdmaXJlJ1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnZmlyZSc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3NvaWwucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJ3NvaWwnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDIzOCwgOTksIDk5LCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ3NvaWwnOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFtZcG9zXSA+PSBzZWxmLnN0YXJQb2ludFtZcG9zXSkge1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRvdWNoc3RhcnQoZSkge1xuICAgICAgY29uc29sZS5sb2coJ3N0YXInKVxuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLnN0YXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICB9LFxuICAgIHRvdWNobW92ZShlKSB7XG4gICAgICBjb25zb2xlLmxvZygnbW92ZScpXG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGlmIChzZWxmLnN3aXRjaCkge1xuICAgICAgICBzZWxmLm1ldGhvZHMudGltZUNoYW5nZShzZWxmLCBlKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB0b3VjaGVuZChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnZW5kJylcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYgKHNlbGYuc3dpdGNoKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy5pbWFnZUNoYW5nZShzZWxmLCBlKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBmbG9vcigpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgbGV0IGN1cnJlbnRUaW1lXG4gICAgICBpZiAodGltZXIpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgIH1cbiAgICAgIGlmIChzZWxmLmtleSA9PT0gJ+W8gOWniycgfHwgc2VsZi5rZXkgPT09ICfnu6fnu60nKSB7XG4gICAgICAgIGxldCB0aWNrQ291bnQgPSBzZWxmLnRpY2tcbiAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgdGlja0NvdW50LS1cbiAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgdGljazogdGlja0NvdW50XG4gICAgICAgICAgfSlcbiAgICAgICAgICBzZWxmLnRpY2sgPSB0aWNrQ291bnRcblxuICAgICAgICAgIGlmIChzZWxmLnRpY2sgPT09IHRpbWVMb3dQb2ludCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coc2VsZi50aWNrKVxuICAgICAgICAgIGN1cnJlbnRUaW1lID0gKHNlbGYudGljayAvIHNlY29uZHNQZXJNaW4pID49IHRpbWVUb3BQb2ludCA/ICfiiJ4nIDogKCgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pIDwgYml0c1BvaW50ID8gJzAnICsgKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikgOiAoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSkgKyAnIDogJyArICgoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikgPj0gYml0c1BvaW50ID8gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pIDogJzAnICsgKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKVxuICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICB0aW1lOiBjdXJyZW50VGltZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgc2VsZi50aW1lID0gY3VycmVudFRpbWVcbiAgICAgICAgfSwgMTAwMClcbiAgICAgICAgc2VsZi5rZXkgPSAn5pqC5YGcJ1xuICAgICAgICBzZWxmLnN3aXRjaCA9IGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLmtleSA9ICfnu6fnu60nXG4gICAgICAgIGN1cnJlbnRUaW1lID0gKHNlbGYudGljayAvIHNlY29uZHNQZXJNaW4pID49IHRpbWVUb3BQb2ludCA/ICfiiJ4nIDogKCgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pIDwgYml0c1BvaW50ID8gJzAnICsgKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikgOiAoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSkgKyAnIDogJyArICgoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikgPj0gYml0c1BvaW50ID8gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pIDogJzAnICsgKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKVxuICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgIHRpbWU6IGN1cnJlbnRUaW1lXG4gICAgICAgIH0pXG4gICAgICAgIHNlbGYudGltZSA9IGN1cnJlbnRUaW1lXG4gICAgICAgIGNvbnNvbGUubG9nKHNlbGYudGltZSlcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgIH1cbiAgICB9LFxuICAgIGZsb29yRW5kKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgc2VsZi5rZXkgPSAn5byA5aeLJ1xuICAgICAgc2VsZi50aWNrID0gaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluXG4gICAgICBzZWxmLnRpbWUgPSAnMjAgOiAwMCdcbiAgICAgIHNlbGYuc3dpdGNoID0gdHJ1ZVxuICAgIH1cbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICflvZLlv4MnLFxuICAgICAgZGVzYzogJ+mDveW4guWWp+mXuSDkvZXlpITlvZLlv4MnLFxuICAgICAgcGF0aDogJy9wYWdlL25vaXNlJ1xuICAgIH1cbiAgfVxuXG4gIG9uTG9hZCgpIHtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBjb25zdCB3ZWVrcyA9IFsnU3VuJywgJ01vbicsICdUdWVzJywgJ1dlZCcsICdUaHVyJywgJ0ZyaScsICdTYXQnXVxuICAgIGNvbnN0IHdlZWsgPSBkYXRlLmdldFVUQ0RheSgpXG4gICAgY29uc3Qgd2Vla2QgPSB3ZWVrc1t3ZWVrXVxuICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpXG4gICAgY29uc3QgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWcnLCAnU2VwdCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgY29uc3QgbW9uID0gbW9udGhzW21vbnRoXVxuICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpXG4gICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICAgIHNlbGYuZGF0ZXMgPSBtb24gKyAnICcgKyBkYXkgKyAnICcgKyB3ZWVrZCArICcgJyArIHllYXJcbiAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgICBzZWxmLnRpbWUgPSAoc2VsZi50aWNrIC8gc2Vjb25kc1Blck1pbikgKyAnIDogMCcgKyAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbilcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlbGYuc2hvd0ltZyA9IGZhbHNlXG4gICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICBzaG93SW1nOiBmYWxzZVxuICAgICAgfSlcbiAgICB9LCAyMDAwKVxuICAgIC8vIHdlcHkucmVxdWVzdCh7XG4gICAgLy8gICB1cmw6ICdodHRwOi8vMTI3LjAuMC4xOjcwMDEvdm9pY2UvbGlzdCcsXG4gICAgLy8gICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2cocmVzKVxuICAgIC8vICAgfVxuICAgIC8vIH0pXG4gIH1cbn1cbiJdfQ==