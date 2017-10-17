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
var initialTimeText = '20 : 00';
var secondsPerMin = 60;
var changeTimePoint = 5;
var changeImagePoint = 10;
var timeTopPoint = 60;
var timeLowPoint = 0;
var bitsPoint = 10;
var Xpos = 0;
var Ypos = 1;
var timer = null;
var ksStart = 0;
var ksPause = 1;
var ksContinue = 2;

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
      key: ksStart,
      dates: '',
      changePoint: 0,
      time: '',
      kStatus: ['开始', '暂停', '继续', '结束'],
      ksStop: 3
    }, _this.methods = {
      timeChange: function timeChange(self, e) {
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
        self.curPoint = [e.touches[0].pageX, e.touches[0].pageY];
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
        if (self.key === ksStart || self.key === ksContinue) {
          if (self.time === '∞') {
            self.key = ksPause;
            self.switch = false;
          } else {
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
            self.key = ksPause;
            self.switch = false;
          }
        } else {
          self.key = ksContinue;
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
        self.key = ksStart;
        self.tick = initialTime * secondsPerMin;
        self.time = initialTimeText;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbImluaXRpYWxUaW1lIiwiaW5pdGlhbFRpbWVUZXh0Iiwic2Vjb25kc1Blck1pbiIsImNoYW5nZVRpbWVQb2ludCIsImNoYW5nZUltYWdlUG9pbnQiLCJ0aW1lVG9wUG9pbnQiLCJ0aW1lTG93UG9pbnQiLCJiaXRzUG9pbnQiLCJYcG9zIiwiWXBvcyIsInRpbWVyIiwia3NTdGFydCIsImtzUGF1c2UiLCJrc0NvbnRpbnVlIiwiV2F0ZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInN3aXRjaCIsInNob3dJbWciLCJtYXJrIiwic3RhclBvaW50IiwiY3VyUG9pbnQiLCJiZ2NvbG9yIiwiaW1hZ2VOb2RlIiwidGljayIsImtleSIsImRhdGVzIiwiY2hhbmdlUG9pbnQiLCJ0aW1lIiwia1N0YXR1cyIsImtzU3RvcCIsIm1ldGhvZHMiLCJ0aW1lQ2hhbmdlIiwic2VsZiIsImUiLCJ4Y2hhbmdlIiwieWNoYW5nZSIsImN1cnJlbnRUaW1lIiwiTWF0aCIsImFicyIsImNvbnNvbGUiLCJsb2ciLCJzZXREYXRhIiwiaW1hZ2VDaGFuZ2UiLCJ0b3VjaHN0YXJ0IiwidG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJ0b3VjaG1vdmUiLCJ0b3VjaGVuZCIsImZsb29yIiwidGlja0NvdW50Iiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiZmxvb3JFbmQiLCJ0aXRsZSIsImRlc2MiLCJwYXRoIiwiZGF0ZSIsIkRhdGUiLCJ3ZWVrcyIsIndlZWsiLCJnZXRVVENEYXkiLCJ3ZWVrZCIsIm1vbnRoIiwiZ2V0TW9udGgiLCJtb250aHMiLCJtb24iLCJkYXkiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwic2V0VGltZW91dCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxjQUFjLEVBQXBCO0FBQ0EsSUFBTUMsa0JBQWtCLFNBQXhCO0FB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LEk7O2tCQUFuQjVELEsiLCJmaWxlIjoibm9pc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmNvbnN0IGluaXRpYWxUaW1lID0gMjBcbmNvbnN0IGluaXRpYWxUaW1lVGV4dCA9ICcyMCA6IDAwJ1xuY29uc3Qgc2Vjb25kc1Blck1pbiA9IDYwXG5jb25zdCBjaGFuZ2VUaW1lUG9pbnQgPSA1XG5jb25zdCBjaGFuZ2VJbWFnZVBvaW50ID0gMTBcbmNvbnN0IHRpbWVUb3BQb2ludCA9IDYwXG5jb25zdCB0aW1lTG93UG9pbnQgPSAwXG5jb25zdCBiaXRzUG9pbnQgPSAxMFxuY29uc3QgWHBvcyA9IDBcbmNvbnN0IFlwb3MgPSAxXG5sZXQgdGltZXIgPSBudWxsXG5jb25zdCBrc1N0YXJ0ID0gMFxuY29uc3Qga3NQYXVzZSA9IDFcbmNvbnN0IGtzQ29udGludWUgPSAyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflvZLlv4MnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBzd2l0Y2g6IHRydWUsXG4gICAgc2hvd0ltZzogdHJ1ZSxcbiAgICBtYXJrOiAnLi4vaW1hZ2Uvd2F0ZXIucG5nJyxcbiAgICBzdGFyUG9pbnQ6IFswLCAwXSxcbiAgICBjdXJQb2ludDogWzAsIDBdLFxuICAgIGJnY29sb3I6ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJyxcbiAgICBpbWFnZU5vZGU6ICd3YXRlcicsXG4gICAgdGljazogMCxcbiAgICBrZXk6IGtzU3RhcnQsXG4gICAgZGF0ZXM6ICcnLFxuICAgIGNoYW5nZVBvaW50OiAwLFxuICAgIHRpbWU6ICcnLFxuICAgIGtTdGF0dXM6IFsn5byA5aeLJywgJ+aaguWBnCcsICfnu6fnu60nLCAn57uT5p2fJ10sXG4gICAga3NTdG9wOiAzXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICB0aW1lQ2hhbmdlKHNlbGYsIGUpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFtYcG9zXSAtIHNlbGYuc3RhclBvaW50W1hwb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbWXBvc10gLSBzZWxmLnN0YXJQb2ludFtZcG9zXVxuICAgICAgbGV0IGN1cnJlbnRUaW1lXG4gICAgICBpZiAoc2VsZi5jdXJQb2ludFtYcG9zXSA+PSBzZWxmLnN0YXJQb2ludFtYcG9zXSkge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gc2VsZi5jaGFuZ2VQb2ludCArIDFcbiAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLmNoYW5nZVBvaW50KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W1lwb3NdID49IHNlbGYuc3RhclBvaW50W1lwb3NdKSB7XG4gICAgICAgICAgICBpZiAoKHNlbGYudGljayAvIHNlY29uZHNQZXJNaW4pID4gdGltZUxvd1BvaW50KSB7XG4gICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSBzZWxmLmNoYW5nZVBvaW50ICsgMVxuICAgICAgICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA9PT0gY2hhbmdlVGltZVBvaW50KSB7XG4gICAgICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrIC0gc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lID0gKHNlbGYudGljayAvIHNlY29uZHNQZXJNaW4pID49IHRpbWVUb3BQb2ludCA/ICfiiJ4nIDogKCgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pIDwgYml0c1BvaW50ID8gJzAnICsgKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikgOiAoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSkgKyAnIDogJyArICgoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikgPj0gYml0c1BvaW50ID8gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pIDogJzAnICsgKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKVxuICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgICAgICAgc2VsZi50aW1lID0gY3VycmVudFRpbWVcbiAgICAgICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgoc2VsZi50aWNrIC8gc2Vjb25kc1Blck1pbikgPCB0aW1lVG9wUG9pbnQpIHtcbiAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IHNlbGYuY2hhbmdlUG9pbnQgKyAxXG4gICAgICAgICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID09PSBjaGFuZ2VUaW1lUG9pbnQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgKyBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICAgICAgY3VycmVudFRpbWUgPSAoc2VsZi50aWNrIC8gc2Vjb25kc1Blck1pbikgPj0gdGltZVRvcFBvaW50ID8gJ+KInicgOiAoKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikgPCBiaXRzUG9pbnQgPyAnMCcgKyAoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSA6ICgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pKSArICcgOiAnICsgKChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSA+PSBiaXRzUG9pbnQgPyAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikgOiAnMCcgKyAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpXG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICAgICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICB0aW1lOiBjdXJyZW50VGltZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi50aW1lLCBjdXJyZW50VGltZSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IHNlbGYuY2hhbmdlUG9pbnQgKyAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbWXBvc10gPj0gc2VsZi5zdGFyUG9pbnRbWXBvc10pIHtcbiAgICAgICAgICAgIGlmICgoc2VsZi50aWNrIC8gc2Vjb25kc1Blck1pbikgPiB0aW1lTG93UG9pbnQpIHtcbiAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IHNlbGYuY2hhbmdlUG9pbnQgKyAxXG4gICAgICAgICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID09PSBjaGFuZ2VUaW1lUG9pbnQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgLSBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgICAgICAgY3VycmVudFRpbWUgPSAoc2VsZi50aWNrIC8gc2Vjb25kc1Blck1pbikgPj0gdGltZVRvcFBvaW50ID8gJ+KInicgOiAoKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikgPCBiaXRzUG9pbnQgPyAnMCcgKyAoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSA6ICgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pKSArICcgOiAnICsgKChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSA+PSBiaXRzUG9pbnQgPyAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikgOiAnMCcgKyAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpXG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICAgICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICB0aW1lOiBjdXJyZW50VGltZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKChzZWxmLnRpY2sgLyBzZWNvbmRzUGVyTWluKSA8IHRpbWVUb3BQb2ludCkge1xuICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gc2VsZi5jaGFuZ2VQb2ludCArIDFcbiAgICAgICAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPT09IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayArIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgICAgICBjdXJyZW50VGltZSA9IChzZWxmLnRpY2sgLyBzZWNvbmRzUGVyTWluKSA+PSB0aW1lVG9wUG9pbnQgPyAn4oieJyA6ICgoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSA8IGJpdHNQb2ludCA/ICcwJyArICgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pIDogKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikpICsgJyA6ICcgKyAoKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pID49IGJpdHNQb2ludCA/IChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSA6ICcwJyArIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSlcbiAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgICAgICAgIHNlbGYudGltZSA9IGN1cnJlbnRUaW1lXG4gICAgICAgICAgICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgIHRpbWU6IGN1cnJlbnRUaW1lXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBpbWFnZUNoYW5nZShzZWxmLCBlKSB7XG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbWHBvc10gLSBzZWxmLnN0YXJQb2ludFtYcG9zXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50W1lwb3NdIC0gc2VsZi5zdGFyUG9pbnRbWXBvc11cblxuICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbWHBvc10gPj0gc2VsZi5zdGFyUG9pbnRbWHBvc10pIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VJbWFnZVBvaW50KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgJ2dvbGQnOiBcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICd0cmVlJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZ29sZC5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnZ29sZCdcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnd2F0ZXInOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS90cmVlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9ICd0cmVlJ1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnZmlyZSc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3dhdGVyLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9ICd3YXRlcidcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdzb2lsJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZmlyZS5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnZmlyZSdcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi5jaGFuZ2VQb2ludClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbWXBvc10gPj0gc2VsZi5zdGFyUG9pbnRbWXBvc10pIHtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VJbWFnZVBvaW50KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgJ2dvbGQnOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS90cmVlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9ICd0cmVlJ1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAndHJlZSc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3dhdGVyLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9ICd3YXRlcidcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICd3YXRlcic6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJ2ZpcmUnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdmaXJlJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvc29pbC5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnc29pbCdcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnc29pbCc6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W1lwb3NdID49IHNlbGYuc3RhclBvaW50W1lwb3NdKSB7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnc3RhcicpXG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdtb3ZlJylcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICAgIGlmIChzZWxmLnN3aXRjaCkge1xuICAgICAgICBzZWxmLm1ldGhvZHMudGltZUNoYW5nZShzZWxmLCBlKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB0b3VjaGVuZChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnZW5kJylcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYgKHNlbGYuc3dpdGNoKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy5pbWFnZUNoYW5nZShzZWxmLCBlKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBmbG9vcigpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgbGV0IGN1cnJlbnRUaW1lXG4gICAgICBpZiAoc2VsZi5rZXkgPT09IGtzU3RhcnQgfHwgc2VsZi5rZXkgPT09IGtzQ29udGludWUpIHtcbiAgICAgICAgaWYgKHNlbGYudGltZSA9PT0gJ+KInicpIHtcbiAgICAgICAgICBzZWxmLmtleSA9IGtzUGF1c2VcbiAgICAgICAgICBzZWxmLnN3aXRjaCA9IGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IHRpY2tDb3VudCA9IHNlbGYudGlja1xuICAgICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGlja0NvdW50LS1cbiAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIHRpY2s6IHRpY2tDb3VudFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHNlbGYudGljayA9IHRpY2tDb3VudFxuXG4gICAgICAgICAgICBpZiAoc2VsZi50aWNrID09PSB0aW1lTG93UG9pbnQpIHtcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYudGljaylcbiAgICAgICAgICAgIGN1cnJlbnRUaW1lID0gKHNlbGYudGljayAvIHNlY29uZHNQZXJNaW4pID49IHRpbWVUb3BQb2ludCA/ICfiiJ4nIDogKCgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pIDwgYml0c1BvaW50ID8gJzAnICsgKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikgOiAoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSkgKyAnIDogJyArICgoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikgPj0gYml0c1BvaW50ID8gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pIDogJzAnICsgKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKVxuICAgICAgICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgc2VsZi5rZXkgPSBrc1BhdXNlXG4gICAgICAgICAgc2VsZi5zd2l0Y2ggPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLmtleSA9IGtzQ29udGludWVcbiAgICAgICAgY3VycmVudFRpbWUgPSAoc2VsZi50aWNrIC8gc2Vjb25kc1Blck1pbikgPj0gdGltZVRvcFBvaW50ID8gJ+KInicgOiAoKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pbikgPCBiaXRzUG9pbnQgPyAnMCcgKyAoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluKSA6ICgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW4pKSArICcgOiAnICsgKChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSA+PSBiaXRzUG9pbnQgPyAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikgOiAnMCcgKyAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpXG4gICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgICAgfSlcbiAgICAgICAgc2VsZi50aW1lID0gY3VycmVudFRpbWVcbiAgICAgICAgY29uc29sZS5sb2coc2VsZi50aW1lKVxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgfVxuICAgIH0sXG4gICAgZmxvb3JFbmQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICBzZWxmLmtleSA9IGtzU3RhcnRcbiAgICAgIHNlbGYudGljayA9IGluaXRpYWxUaW1lICogc2Vjb25kc1Blck1pblxuICAgICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgICBzZWxmLnN3aXRjaCA9IHRydWVcbiAgICB9XG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5b2S5b+DJyxcbiAgICAgIGRlc2M6ICfpg73luILllqfpl7kg5L2V5aSE5b2S5b+DJyxcbiAgICAgIHBhdGg6ICcvcGFnZS9ub2lzZSdcbiAgICB9XG4gIH1cblxuICBvbkxvYWQoKSB7XG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgY29uc3Qgd2Vla3MgPSBbJ1N1bicsICdNb24nLCAnVHVlcycsICdXZWQnLCAnVGh1cicsICdGcmknLCAnU2F0J11cbiAgICBjb25zdCB3ZWVrID0gZGF0ZS5nZXRVVENEYXkoKVxuICAgIGNvbnN0IHdlZWtkID0gd2Vla3Nbd2Vla11cbiAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICAgIGNvbnN0IG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVnJywgJ1NlcHQnLCAnT2N0JywgJ05vdicsICdEZWMnXVxuICAgIGNvbnN0IG1vbiA9IG1vbnRoc1ttb250aF1cbiAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICBzZWxmLmRhdGVzID0gbW9uICsgJyAnICsgZGF5ICsgJyAnICsgd2Vla2QgKyAnICcgKyB5ZWFyXG4gICAgc2VsZi50aWNrID0gaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluXG4gICAgc2VsZi50aW1lID0gKHNlbGYudGljayAvIHNlY29uZHNQZXJNaW4pICsgJyA6IDAnICsgKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLnNob3dJbWcgPSBmYWxzZVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgc2hvd0ltZzogZmFsc2VcbiAgICAgIH0pXG4gICAgfSwgMjAwMClcbiAgICAvLyB3ZXB5LnJlcXVlc3Qoe1xuICAgIC8vICAgdXJsOiAnaHR0cDovLzEyNy4wLjAuMTo3MDAxL3ZvaWNlL2xpc3QnLFxuICAgIC8vICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAvLyAgIH1cbiAgICAvLyB9KVxuICB9XG59XG4iXX0=