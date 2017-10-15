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
          // console.log(currentTime)
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbInNlY29uZHNQZXJNaW4iLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwidGltZXIiLCJXYXRlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwic3dpdGNoIiwic2hvd0ltZyIsIm1hcmsiLCJzdGFyUG9pbnQiLCJjdXJQb2ludCIsImJnY29sb3IiLCJpbWFnZU5vZGUiLCJ0aWNrIiwia2V5IiwiZGF0ZXMiLCJlbmQiLCJjaGFuZ2VQb2ludCIsInRpbWUiLCJtZXRob2RzIiwidGltZUNoYW5nZSIsInNlbGYiLCJlIiwidG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJ4Y2hhbmdlIiwieWNoYW5nZSIsIk1hdGgiLCJhYnMiLCJpbWFnZUNoYW5nZSIsInRvdWNoc3RhcnQiLCJ0b3VjaG1vdmUiLCJ0b3VjaGVuZCIsImZsb29yIiwiY3VycmVudFRpbWUiLCJjbGVhckludGVydmFsIiwidGlja0NvdW50Iiwic2V0SW50ZXJ2YWwiLCJzZXREYXRhIiwiY29uc29sZSIsImxvZyIsImZsb29yRW5kIiwidGl0bGUiLCJkZXNjIiwicGF0aCIsImRhdGUiLCJEYXRlIiwid2Vla3MiLCJ3ZWVrIiwiZ2V0VVRDRGF5Iiwid2Vla2QiLCJtb250aCIsImdldE1vbnRoIiwibW9udGhzIiwibW9uIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsInNldFRpbWVvdXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsZ0JBQWdCLEVBQXRCO0FBQ0EsSUFBTUMsa0JBQWtCLENBQXhCO0FBQ0EsSUFBTUMsbUJBQW1CLENBQXpCO0FBQ0EsSUFBSUMsUUFBUSxJQUFaOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGNBQVEsSUFESDtB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QXVCLEtBQXZCLEVBQThCLE1BQTlCLEVBQXNDLEtBQXRDLEVBQTZDLEtBQTdDLENBQWQ7QUFDQSxVQUFNQyxPQUFPSCxLQUFLSSxTQUFMLEVBQWI7QUFDQSxVQUFNQyxRQUFRSCxNQUFNQyxJQUFOLENBQWQ7QUFDQSxVQUFNRyxRQUFRTixLQUFLTyxRQUFMLEVBQWQ7QUFDQSxVQUFNQyxTQUFTLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DLE1BQXBDLEVBQTRDLE1BQTVDLEVBQW9ELEtBQXBELEVBQTJELE1BQTNELEVBQW1FLEtBQW5FLEVBQTBFLEtBQTFFLEVBQWlGLEtBQWpGLENBQWY7QUFDQSxVQUFNQyxNQUFNRCxPQUFPRixLQUFQLENBQVo7QUFDQSxVQUFNSSxNQUFNVixLQUFLVyxPQUFMLEVBQVo7QUFDQSxVQUFNQyxPQUFPWixLQUFLYSxXQUFMLEVBQWI7QUFDQXRDLFdBQUtOLEtBQUwsR0FBYXdDLE1BQU0sR0FBTixHQUFZQyxHQUFaLEdBQWtCLEdBQWxCLEdBQXdCTCxLQUF4QixHQUFnQyxHQUFoQyxHQUFzQ08sSUFBbkQ7QUFDQXJDLFdBQUtSLElBQUwsR0FBWSxLQUFLZixhQUFqQjtBQUNBdUIsV0FBS0gsSUFBTCxHQUFhRyxLQUFLUixJQUFMLEdBQVksRUFBYixHQUFtQixNQUFuQixHQUE2QlEsS0FBS1IsSUFBTCxHQUFZLEVBQXJEO0FBQ0ErQyxpQkFBVyxZQUFNO0FBQ2Z2QyxhQUFLZCxPQUFMLEdBQWUsS0FBZjtBQUNBYyxhQUFLa0IsT0FBTCxDQUFhO0FBQ1hoQyxtQkFBUztBQURFLFNBQWI7QUFHRCxPQUxELEVBS0csSUFMSDtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEOzs7O0VBeFBnQyxlQUFLc0QsSTs7a0JBQW5CM0QsSyIsImZpbGUiOiJub2lzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuY29uc3Qgc2Vjb25kc1Blck1pbiA9IDYwXG5jb25zdCBjaGFuZ2VUaW1lUG9pbnQgPSA1XG5jb25zdCBjaGFuZ2VJbWFnZVBvaW50ID0gM1xubGV0IHRpbWVyID0gbnVsbFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5b2S5b+DJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgc3dpdGNoOiB0cnVlLFxuICAgIHNob3dJbWc6IHRydWUsXG4gICAgbWFyazogJy4uL2ltYWdlL3dhdGVyLnBuZycsXG4gICAgc3RhclBvaW50OiBbMCwgMF0sXG4gICAgY3VyUG9pbnQ6IFswLCAwXSxcbiAgICBiZ2NvbG9yOiAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKScsXG4gICAgaW1hZ2VOb2RlOiAnMycsXG4gICAgdGljazogMCxcbiAgICBrZXk6ICflvIDlp4snLFxuICAgIGRhdGVzOiAnJyxcbiAgICBlbmQ6ICfnu5PmnZ8nLFxuICAgIGNoYW5nZVBvaW50OiAwLFxuICAgIHRpbWU6ICcnXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICB0aW1lQ2hhbmdlKHNlbGYsIGUpIHtcbiAgICAgIHNlbGYuY3VyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMF0gLSBzZWxmLnN0YXJQb2ludFswXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50WzFdIC0gc2VsZi5zdGFyUG9pbnRbMV1cbiAgICAgIGlmIChzZWxmLmN1clBvaW50WzBdID49IHNlbGYuc3RhclBvaW50WzBdKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgICBpZiAoKHNlbGYudGljayAvIDYwKSA+IDApIHtcbiAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IHNlbGYuY2hhbmdlUG9pbnQgKyAxXG4gICAgICAgICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID09PSBjaGFuZ2VUaW1lUG9pbnQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgLSA2MFxuICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKChzZWxmLnRpY2sgLyA2MCkgPCA2MCkge1xuICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gc2VsZi5jaGFuZ2VQb2ludCArIDFcbiAgICAgICAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPT09IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayArIDYwXG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICAgIGlmICgoc2VsZi50aWNrIC8gNjApID4gMCkge1xuICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gc2VsZi5jaGFuZ2VQb2ludCArIDFcbiAgICAgICAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPT09IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayAtIDYwXG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoKHNlbGYudGljayAvIDYwKSA8IDYwKSB7XG4gICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSBzZWxmLmNoYW5nZVBvaW50ICsgMVxuICAgICAgICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA9PT0gY2hhbmdlVGltZVBvaW50KSB7XG4gICAgICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrICsgNjBcbiAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGltYWdlQ2hhbmdlKHNlbGYsIGUpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFswXSAtIHNlbGYuc3RhclBvaW50WzBdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMV0gLSBzZWxmLnN0YXJQb2ludFsxXVxuXG4gICAgICBpZiAoc2VsZi5jdXJQb2ludFswXSA+PSBzZWxmLnN0YXJQb2ludFswXSkge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gc2VsZi5jaGFuZ2VQb2ludCArIDFcbiAgICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA9PT0gY2hhbmdlSW1hZ2VQb2ludCkge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZ29sZC5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnMSdcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJzInXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvd2F0ZXIucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJzMnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJzQnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IHNlbGYuY2hhbmdlUG9pbnQgKyAxXG4gICAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPT09IGNoYW5nZUltYWdlUG9pbnQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJzInXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvd2F0ZXIucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJzMnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJzQnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvc29pbC5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnNSdcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYgKHNlbGYuc3dpdGNoKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lQ2hhbmdlKHNlbGYsIGUpXG4gICAgICB9XG4gICAgfSxcblxuICAgIHRvdWNoZW5kKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYgKHNlbGYuc3dpdGNoKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy5pbWFnZUNoYW5nZShzZWxmLCBlKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBmbG9vcigpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgbGV0IGN1cnJlbnRUaW1lXG4gICAgICBpZiAodGltZXIpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgIH1cbiAgICAgIGlmIChzZWxmLmtleSA9PT0gJ+W8gOWniycgfHwgc2VsZi5rZXkgPT09ICfnu6fnu60nKSB7XG4gICAgICAgIGxldCB0aWNrQ291bnQgPSBzZWxmLnRpY2tcbiAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgdGlja0NvdW50LS1cbiAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgdGljazogdGlja0NvdW50XG4gICAgICAgICAgfSlcbiAgICAgICAgICBzZWxmLnRpY2sgPSB0aWNrQ291bnRcblxuICAgICAgICAgIGlmIChzZWxmLnRpY2sgPT09IDApIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYudGljaylcblxuICAgICAgICAgIGN1cnJlbnRUaW1lID0gKHNlbGYudGljayAvIDYwKSA+PSA2MCA/ICfiiJ4nIDogKCgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIDYwKSkgLyA2MCkgPCAxMCA/ICcwJyArICgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIDYwKSkgLyA2MCkgOiAoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSA2MCkpIC8gNjApKSArICcgOiAnICsgKChzZWxmLnRpY2sgJSA2MCkgPj0gMTAgPyAoc2VsZi50aWNrICUgNjApIDogJzAnICsgKHNlbGYudGljayAlIDYwKSlcblxuICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICB0aW1lOiBjdXJyZW50VGltZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgc2VsZi50aW1lID0gY3VycmVudFRpbWVcbiAgICAgICAgfSwgMTAwMClcbiAgICAgICAgc2VsZi5rZXkgPSAn5pqC5YGcJ1xuICAgICAgICBzZWxmLnN3aXRjaCA9IGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLmtleSA9ICfnu6fnu60nXG4gICAgICAgIGN1cnJlbnRUaW1lID0gKHNlbGYudGljayAvIDYwKSA+PSA2MCA/ICfiiJ4nIDogKCgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIDYwKSkgLyA2MCkgPCAxMCA/ICcwJyArICgoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIDYwKSkgLyA2MCkgOiAoKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSA2MCkpIC8gNjApKSArICcgOiAnICsgKChzZWxmLnRpY2sgJSA2MCkgPj0gMTAgPyAoc2VsZi50aWNrICUgNjApIDogJzAnICsgKHNlbGYudGljayAlIDYwKSlcbiAgICAgICAgLy8gY29uc29sZS5sb2coY3VycmVudFRpbWUpXG4gICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgICAgfSlcbiAgICAgICAgc2VsZi50aW1lID0gY3VycmVudFRpbWVcbiAgICAgICAgY29uc29sZS5sb2coc2VsZi50aW1lKVxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgfVxuICAgIH0sXG4gICAgZmxvb3JFbmQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICBzZWxmLmtleSA9ICflvIDlp4snXG4gICAgICBzZWxmLnRpY2sgPSAyMCAqIHNlY29uZHNQZXJNaW5cbiAgICAgIHNlbGYudGltZSA9ICcyMCA6IDAwJ1xuICAgICAgc2VsZi5zd2l0Y2ggPSB0cnVlXG4gICAgfVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+W9kuW/gycsXG4gICAgICBkZXNjOiAn6YO95biC5Zan6Ze5IOS9leWkhOW9kuW/gycsXG4gICAgICBwYXRoOiAnL3BhZ2Uvbm9pc2UnXG4gICAgfVxuICB9XG5cbiAgb25Mb2FkKCkge1xuICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIGNvbnN0IHdlZWtzID0gWydTdW4nLCAnTW9uJywgJ1R1ZXMnLCAnV2VkJywgJ1RodXInLCAnRnJpJywgJ1NhdCddXG4gICAgY29uc3Qgd2VlayA9IGRhdGUuZ2V0VVRDRGF5KClcbiAgICBjb25zdCB3ZWVrZCA9IHdlZWtzW3dlZWtdXG4gICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKClcbiAgICBjb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1ZycsICdTZXB0JywgJ09jdCcsICdOb3YnLCAnRGVjJ11cbiAgICBjb25zdCBtb24gPSBtb250aHNbbW9udGhdXG4gICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKClcbiAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgc2VsZi5kYXRlcyA9IG1vbiArICcgJyArIGRheSArICcgJyArIHdlZWtkICsgJyAnICsgeWVhclxuICAgIHNlbGYudGljayA9IDIwICogc2Vjb25kc1Blck1pblxuICAgIHNlbGYudGltZSA9IChzZWxmLnRpY2sgLyA2MCkgKyAnIDogMCcgKyAoc2VsZi50aWNrICUgNjApXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLnNob3dJbWcgPSBmYWxzZVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgc2hvd0ltZzogZmFsc2VcbiAgICAgIH0pXG4gICAgfSwgMjAwMClcbiAgICAvLyB3ZXB5LnJlcXVlc3Qoe1xuICAgIC8vICAgdXJsOiAnaHR0cDovLzEyNy4wLjAuMTo3MDAxL3ZvaWNlL2xpc3QnLFxuICAgIC8vICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAvLyAgIH1cbiAgICAvLyB9KVxuICB9XG59XG4iXX0=