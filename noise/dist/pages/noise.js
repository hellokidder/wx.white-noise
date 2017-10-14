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
var changeImagePoint = 3;
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
      imageNode: '3',
      tick: 0,
      key: '开始',
      dates: '',
      end: '结束',
      changePoint: 0,
      time: ''
    }, _this.methods = {
      timeChange: function timeChange(self, e) {
        self.curPoint = [e.touches[0].pageX, e.touches[0].pageY];
        var xchange = self.curPoint[0] - self.starPoint[0];
        var ychange = self.curPoint[1] - self.starPoint[1];
        if (self.curPoint[0] >= self.starPoint[0]) {
          if (Math.abs(xchange) >= Math.abs(ychange)) {} else {
            if (self.curPoint[1] >= self.starPoint[1]) {
              if (self.tick / 60 > 0) {
                self.changePoint = self.changePoint + 1;
                if (self.changePoint === changeTimePoint) {
                  self.tick = self.tick - 60;
                  self.changePoint = 0;
                }
              }
            } else {
              if (self.tick / 60 < 60) {
                self.changePoint = self.changePoint + 1;
                if (self.changePoint === changeTimePoint) {
                  self.tick = self.tick + 60;
                  self.changePoint = 0;
                }
              }
            }
          }
        } else {
          if (Math.abs(xchange) >= Math.abs(ychange)) {} else {
            if (self.curPoint[1] >= self.starPoint[1]) {
              if (self.tick / 60 > 0) {
                self.changePoint = self.changePoint + 1;
                if (self.changePoint === changeTimePoint) {
                  self.tick = self.tick - 60;
                  self.changePoint = 0;
                }
              }
            } else {
              if (self.tick / 60 < 60) {
                self.changePoint = self.changePoint + 1;
                if (self.changePoint === changeTimePoint) {
                  self.tick = self.tick + 60;
                  self.changePoint = 0;
                }
              }
            }
          }
        }
      },
      imageChange: function imageChange(self, e) {
        var xchange = self.curPoint[0] - self.starPoint[0];
        var ychange = self.curPoint[1] - self.starPoint[1];

        if (self.curPoint[0] >= self.starPoint[0]) {
          if (Math.abs(xchange) >= Math.abs(ychange)) {
            self.changePoint = self.changePoint + 1;
            if (self.changePoint === changeImagePoint) {
              switch (self.imageNode) {
                case '1':
                  break;
                case '2':
                  self.mark = '../image/gold.png';
                  self.imageNode = '1';
                  self.bgcolor = 'rgba( 255, 255, 0, 0.3)';
                  break;
                case '3':
                  self.mark = '../image/tree.png';
                  self.imageNode = '2';
                  self.bgcolor = 'rgba( 0, 255, 0, 0.3)';
                  break;
                case '4':
                  self.mark = '../image/water.png';
                  self.imageNode = '3';
                  self.bgcolor = 'rgba(0, 255, 255, 0.3)';
                  break;
                case '5':
                  self.mark = '../image/fire.png';
                  self.imageNode = '4';
                  self.bgcolor = 'rgba( 255, 0, 0, 0.3)';
                  break;
              }
              self.changePoint = 0;
            }
          } else {
            if (self.curPoint[1] >= self.starPoint[1]) {} else {}
          }
        } else {
          if (Math.abs(xchange) >= Math.abs(ychange)) {
            self.changePoint = self.changePoint + 1;
            if (self.changePoint === changeImagePoint) {
              switch (self.imageNode) {
                case '1':
                  self.mark = '../image/tree.png';
                  self.imageNode = '2';
                  self.bgcolor = 'rgba( 0, 255, 0, 0.3)';
                  break;
                case '2':
                  self.mark = '../image/water.png';
                  self.imageNode = '3';
                  self.bgcolor = 'rgba(0, 255, 255, 0.3)';
                  break;
                case '3':
                  self.mark = '../image/fire.png';
                  self.imageNode = '4';
                  self.bgcolor = 'rgba( 255, 0, 0, 0.3)';
                  break;
                case '4':
                  self.mark = '../image/soil.png';
                  self.imageNode = '5';
                  self.bgcolor = 'rgba( 238, 99, 99, 0.3)';
                  break;
                case '5':
                  break;
              }
              self.changePoint = 0;
            }
          } else {
            if (self.curPoint[1] >= self.starPoint[1]) {} else {}
          }
        }
      },
      touchstart: function touchstart(e) {
        var self = this;
        self.starPoint = [e.touches[0].pageX, e.touches[0].pageY];
      },
      touchmove: function touchmove(e) {
        var self = this;
        if (self.switch) {
          self.methods.timeChange(self, e);
        }
      },
      touchend: function touchend(e) {
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

            if (self.tick === 0) {
              clearInterval(timer);
            }
            console.log(self.tick);

            currentTime = self.tick / 60 >= 60 ? '∞' : ((self.tick - self.tick % 60) / 60 < 10 ? '0' + (self.tick - self.tick % 60) / 60 : (self.tick - self.tick % 60) / 60) + ' : ' + (self.tick % 60 >= 10 ? self.tick % 60 : '0' + self.tick % 60);

            self.setData({
              time: currentTime
            });
            self.time = currentTime;
          }, 1000);
          self.key = '暂停';
          self.switch = false;
        } else {
          self.key = '继续';
          currentTime = self.tick / 60 >= 60 ? '∞' : ((self.tick - self.tick % 60) / 60 < 10 ? '0' + (self.tick - self.tick % 60) / 60 : (self.tick - self.tick % 60) / 60) + ' : ' + (self.tick % 60 >= 10 ? self.tick % 60 : '0' + self.tick % 60);
          console.log(currentTime);
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
        self.switch = true;
        self.tick = 20 * secondsPerMin;
        console.log(self.switch);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbInNlY29uZHNQZXJNaW4iLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwidGltZXIiLCJXYXRlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwic3dpdGNoIiwic2hvd0ltZyIsIm1hcmsiLCJzdGFyUG9pbnQiLCJjdXJQb2ludCIsImJnY29sb3IiLCJpbWFnZU5vZGUiLCJ0aWNrIiwia2V5IiwiZGF0ZXMiLCJlbmQiLCJjaGFuZ2VQb2ludCIsInRpbWUiLCJtZXRob2RzIiwidGltZUNoYW5nZSIsInNlbGYiLCJlIiwidG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJ4Y2hhbmdlIiwieWNoYW5nZSIsIk1hdGgiLCJhYnMiLCJpbWFnZUNoYW5nZSIsInRvdWNoc3RhcnQiLCJ0b3VjaG1vdmUiLCJ0b3VjaGVuZCIsImZsb29yIiwiY3VycmVudFRpbWUiLCJjbGVhckludGVydmFsIiwidGlja0NvdW50Iiwic2V0SW50ZXJ2YWwiLCJzZXREYXRhIiwiY29uc29sZSIsImxvZyIsImZsb29yRW5kIiwidGl0bGUiLCJkZXNjIiwicGF0aCIsImRhdGUiLCJEYXRlIiwid2Vla3MiLCJ3ZWVrIiwiZ2V0VVRDRGF5Iiwid2Vla2QiLCJtb250aCIsImdldE1vbnRoIiwibW9udGhzIiwibW9uIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsInNldFRpbWVvdXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsZ0JBQWdCLEVBQXRCO0FBQ0EsSUFBTUMsa0JBQWtCLENBQXhCO0FBQ0EsSUFBTUMsbUJBQW1CLENBQXpCO0FBQ0EsSUFBSUMsUUFBUSxJQUFaOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGNBQVEsSUFESDtB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J1xuXG5jb25zdCBzZWNvbmRzUGVyTWluID0gNjBcbmNvbnN0IGNoYW5nZVRpbWVQb2ludCA9IDVcbmNvbnN0IGNoYW5nZUltYWdlUG9pbnQgPSAzXG5sZXQgdGltZXIgPSBudWxsXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflvZLlv4MnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBzd2l0Y2g6IHRydWUsXG4gICAgc2hvd0ltZzogdHJ1ZSxcbiAgICBtYXJrOiAnLi4vaW1hZ2Uvd2F0ZXIucG5nJyxcbiAgICBzdGFyUG9pbnQ6IFswLCAwXSxcbiAgICBjdXJQb2ludDogWzAsIDBdLFxuICAgIGJnY29sb3I6ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJyxcbiAgICBpbWFnZU5vZGU6ICczJyxcbiAgICB0aWNrOiAwLFxuICAgIGtleTogJ+W8gOWniycsXG4gICAgZGF0ZXM6ICcnLFxuICAgIGVuZDogJ+e7k+adnycsXG4gICAgY2hhbmdlUG9pbnQ6IDAsXG4gICAgdGltZTogJydcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHRpbWVDaGFuZ2Uoc2VsZiwgZSkge1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFswXSAtIHNlbGYuc3RhclBvaW50WzBdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMV0gLSBzZWxmLnN0YXJQb2ludFsxXVxuICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMF0gPj0gc2VsZi5zdGFyUG9pbnRbMF0pIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICAgIGlmICgoc2VsZi50aWNrIC8gNjApID4gMCkge1xuICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gc2VsZi5jaGFuZ2VQb2ludCArIDFcbiAgICAgICAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPT09IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayAtIDYwXG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoKHNlbGYudGljayAvIDYwKSA8IDYwKSB7XG4gICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSBzZWxmLmNoYW5nZVBvaW50ICsgMVxuICAgICAgICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA9PT0gY2hhbmdlVGltZVBvaW50KSB7XG4gICAgICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrICsgNjBcbiAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgICAgaWYgKChzZWxmLnRpY2sgLyA2MCkgPiAwKSB7XG4gICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSBzZWxmLmNoYW5nZVBvaW50ICsgMVxuICAgICAgICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA9PT0gY2hhbmdlVGltZVBvaW50KSB7XG4gICAgICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrIC0gNjBcbiAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgoc2VsZi50aWNrIC8gNjApIDwgNjApIHtcbiAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IHNlbGYuY2hhbmdlUG9pbnQgKyAxXG4gICAgICAgICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID09PSBjaGFuZ2VUaW1lUG9pbnQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgKyA2MFxuICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaW1hZ2VDaGFuZ2Uoc2VsZiwgZSkge1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50WzBdIC0gc2VsZi5zdGFyUG9pbnRbMF1cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFsxXSAtIHNlbGYuc3RhclBvaW50WzFdXG5cbiAgICAgIGlmIChzZWxmLmN1clBvaW50WzBdID49IHNlbGYuc3RhclBvaW50WzBdKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSBzZWxmLmNoYW5nZVBvaW50ICsgMVxuICAgICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID09PSBjaGFuZ2VJbWFnZVBvaW50KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9nb2xkLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9ICcxJ1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvdHJlZS5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnMidcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJzQnOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnMydcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICc1JzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZmlyZS5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnNCdcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gc2VsZi5jaGFuZ2VQb2ludCArIDFcbiAgICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA9PT0gY2hhbmdlSW1hZ2VQb2ludCkge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvdHJlZS5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnMidcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnMydcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZmlyZS5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnNCdcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJzQnOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9zb2lsLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9ICc1J1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyMzgsIDk5LCA5OSwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICc1JzpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB0b3VjaHN0YXJ0KGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5zdGFyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgfSxcbiAgICB0b3VjaG1vdmUoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBpZiAoc2VsZi5zd2l0Y2gpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnRpbWVDaGFuZ2Uoc2VsZiwgZSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdG91Y2hlbmQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBpZiAoc2VsZi5zd2l0Y2gpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLmltYWdlQ2hhbmdlKHNlbGYsIGUpXG4gICAgICB9XG4gICAgfSxcblxuICAgIGZsb29yKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBsZXQgY3VycmVudFRpbWVcbiAgICAgIGlmICh0aW1lcikge1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgfVxuICAgICAgaWYgKHNlbGYua2V5ID09PSAn5byA5aeLJyB8fCBzZWxmLmtleSA9PT0gJ+e7p+e7rScpIHtcbiAgICAgICAgbGV0IHRpY2tDb3VudCA9IHNlbGYudGlja1xuICAgICAgICB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICB0aWNrQ291bnQtLVxuICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICB0aWNrOiB0aWNrQ291bnRcbiAgICAgICAgICB9KVxuICAgICAgICAgIHNlbGYudGljayA9IHRpY2tDb3VudFxuXG4gICAgICAgICAgaWYgKHNlbGYudGljayA9PT0gMCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coc2VsZi50aWNrKVxuXG4gICAgICAgICAgY3VycmVudFRpbWUgPSAoc2VsZi50aWNrIC8gNjApID49IDYwID8gJ+KInicgOiAoKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgNjApKSAvIDYwKSA8IDEwID8gJzAnICsgKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgNjApKSAvIDYwKSA6ICgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIDYwKSkgLyA2MCkpICsgJyA6ICcgKyAoKHNlbGYudGljayAlIDYwKSA+PSAxMCA/IChzZWxmLnRpY2sgJSA2MCkgOiAnMCcgKyAoc2VsZi50aWNrICUgNjApKVxuXG4gICAgICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgICAgIHRpbWU6IGN1cnJlbnRUaW1lXG4gICAgICAgICAgfSlcbiAgICAgICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgICAgICB9LCAxMDAwKVxuICAgICAgICBzZWxmLmtleSA9ICfmmoLlgZwnXG4gICAgICAgIHNlbGYuc3dpdGNoID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYua2V5ID0gJ+e7p+e7rSdcbiAgICAgICAgY3VycmVudFRpbWUgPSAoc2VsZi50aWNrIC8gNjApID49IDYwID8gJ+KInicgOiAoKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgNjApKSAvIDYwKSA8IDEwID8gJzAnICsgKChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgNjApKSAvIDYwKSA6ICgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIDYwKSkgLyA2MCkpICsgJyA6ICcgKyAoKHNlbGYudGljayAlIDYwKSA+PSAxMCA/IChzZWxmLnRpY2sgJSA2MCkgOiAnMCcgKyAoc2VsZi50aWNrICUgNjApKVxuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50VGltZSlcbiAgICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgICB0aW1lOiBjdXJyZW50VGltZVxuICAgICAgICB9KVxuICAgICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnRpbWUpXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICB9XG4gICAgfSxcbiAgICBmbG9vckVuZCgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgIHNlbGYua2V5ID0gJ+W8gOWniydcbiAgICAgIHNlbGYuc3dpdGNoID0gdHJ1ZVxuICAgICAgc2VsZi50aWNrID0gMjAgKiBzZWNvbmRzUGVyTWluXG4gICAgICBjb25zb2xlLmxvZyhzZWxmLnN3aXRjaClcbiAgICB9XG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5b2S5b+DJyxcbiAgICAgIGRlc2M6ICfpg73luILllqfpl7kg5L2V5aSE5b2S5b+DJyxcbiAgICAgIHBhdGg6ICcvcGFnZS9ub2lzZSdcbiAgICB9XG4gIH1cblxuICBvbkxvYWQoKSB7XG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgY29uc3Qgd2Vla3MgPSBbJ1N1bicsICdNb24nLCAnVHVlcycsICdXZWQnLCAnVGh1cicsICdGcmknLCAnU2F0J11cbiAgICBjb25zdCB3ZWVrID0gZGF0ZS5nZXRVVENEYXkoKVxuICAgIGNvbnN0IHdlZWtkID0gd2Vla3Nbd2Vla11cbiAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICAgIGNvbnN0IG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVnJywgJ1NlcHQnLCAnT2N0JywgJ05vdicsICdEZWMnXVxuICAgIGNvbnN0IG1vbiA9IG1vbnRoc1ttb250aF1cbiAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICBzZWxmLmRhdGVzID0gbW9uICsgJyAnICsgZGF5ICsgJyAnICsgd2Vla2QgKyAnICcgKyB5ZWFyXG4gICAgc2VsZi50aWNrID0gMjAgKiBzZWNvbmRzUGVyTWluXG4gICAgc2VsZi50aW1lID0gKHNlbGYudGljayAvIDYwKSArICcgOiAwJyArIChzZWxmLnRpY2sgJSA2MClcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlbGYuc2hvd0ltZyA9IGZhbHNlXG4gICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICBzaG93SW1nOiBmYWxzZVxuICAgICAgfSlcbiAgICB9LCAyMDAwKVxuICAgIC8vIHdlcHkucmVxdWVzdCh7XG4gICAgLy8gICB1cmw6ICdodHRwOi8vMTI3LjAuMC4xOjcwMDEvdm9pY2UvbGlzdCcsXG4gICAgLy8gICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2cocmVzKVxuICAgIC8vICAgfVxuICAgIC8vIH0pXG4gIH1cbn1cbiJdfQ==