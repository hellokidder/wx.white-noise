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
      showImg: true,
      mark: '../image/water.png',
      starPoint: [0, 0],
      curPoint: [0, 0],
      bgcolor: 'rgba(0, 255, 255, 0.3)',
      node: '3',
      month: '',
      mon: '',
      day: '',
      week: '',
      weekd: '',
      year: '',
      min: 20,
      sec: '00',
      add: 0,
      tick: 0,
      key: 'Start'
    }, _this.methods = {
      touchstart: function touchstart(e) {
        var self = this;
        self.starPoint = [e.touches[0].pageX, e.touches[0].pageY];
      },
      touchmove: function touchmove(e) {
        var self = this;
        self.curPoint = [e.touches[0].pageX, e.touches[0].pageY];
        var xchange = self.curPoint[0] - self.starPoint[0];
        var ychange = self.curPoint[1] - self.starPoint[1];
        if (self.curPoint[0] >= self.starPoint[0]) {
          if (Math.abs(xchange) >= Math.abs(ychange)) {} else {
            if (self.curPoint[1] >= self.starPoint[1]) {
              if (self.min === '∞') {
                self.min = 60;
                self.sec = '00';
              } else {
                if (self.min > 0) {
                  self.add = self.add + 1;
                  if (self.add === 5) {
                    self.min--;
                    self.add = 0;
                    self.min = self.min < 10 ? '0' + self.min.toString() : self.min;
                    self.tick = self.min * secondsPerMin + self.sec * 1;
                  }
                } else {
                  self.min = '00';
                }
              }
            } else {
              if (self.min < 60) {
                self.add = self.add + 1;
                if (self.add === 5) {
                  self.min++;
                  self.add = 0;
                  self.min = self.min < 10 ? '0' + self.min.toString() : self.min;
                  self.tick = self.min * secondsPerMin + self.sec * 1;
                }
              } else {
                self.min = '∞';
                self.sec = '∞';
              }
            }
          }
        } else {
          if (Math.abs(xchange) >= Math.abs(ychange)) {} else {
            if (self.curPoint[1] >= self.starPoint[1]) {
              if (self.min === '∞') {
                self.min = 60;
                self.sec = '00';
              } else {
                if (self.min > 0) {
                  self.add = self.add + 1;
                  if (self.add === 5) {
                    self.min--;
                    self.add = 0;
                    self.min = self.min < 10 ? '0' + self.min.toString() : self.min;
                    self.tick = self.min * secondsPerMin + self.sec * 1;
                  }
                } else {
                  self.min = '00';
                }
              }
            } else {
              if (self.min < 60) {
                self.add = self.add + 1;
                if (self.add === 5) {
                  self.min++;
                  self.add = 0;
                  self.min = self.min < 10 ? '0' + self.min.toString() : self.min;
                  self.tick = self.min * secondsPerMin + self.sec * 1;
                }
              } else {
                self.min = '∞';
              }
            }
          }
        }
      },
      touchend: function touchend(e) {
        var self = this;
        var xchange = self.curPoint[0] - self.starPoint[0];
        var ychange = self.curPoint[1] - self.starPoint[1];

        if (self.curPoint[0] >= self.starPoint[0]) {
          if (Math.abs(xchange) >= Math.abs(ychange)) {
            self.add = self.add + 1;
            if (self.add === 2) {
              switch (self.node) {
                case '1':
                  break;
                case '2':
                  self.mark = '../image/gold.png';
                  self.node = '1';
                  self.bgcolor = 'rgba( 255, 255, 0, 0.3)';
                  break;
                case '3':
                  self.mark = '../image/tree.png';
                  self.node = '2';
                  self.bgcolor = 'rgba( 0, 255, 0, 0.3)';
                  break;
                case '4':
                  self.mark = '../image/water.png';
                  self.node = '3';
                  self.bgcolor = 'rgba(0, 255, 255, 0.3)';
                  break;
                case '5':
                  self.mark = '../image/fire.png';
                  self.node = '4';
                  self.bgcolor = 'rgba( 255, 0, 0, 0.3)';
                  break;
              }
              self.add = 0;
            }
          } else {
            if (self.curPoint[1] >= self.starPoint[1]) {} else {}
          }
        } else {
          if (Math.abs(xchange) >= Math.abs(ychange)) {
            self.add = self.add + 1;
            if (self.add === 2) {
              switch (self.node) {
                case '1':
                  self.mark = '../image/tree.png';
                  self.node = '2';
                  self.bgcolor = 'rgba( 0, 255, 0, 0.3)';
                  break;
                case '2':
                  self.mark = '../image/water.png';
                  self.node = '3';
                  self.bgcolor = 'rgba(0, 255, 255, 0.3)';
                  break;
                case '3':
                  self.mark = '../image/fire.png';
                  self.node = '4';
                  self.bgcolor = 'rgba( 255, 0, 0, 0.3)';
                  break;
                case '4':
                  self.mark = '../image/soil.png';
                  self.node = '5';
                  self.bgcolor = 'rgba( 238, 99, 99, 0.3)';
                  break;
                case '5':
                  break;
              }
              self.add = 0;
            }
          } else {
            if (self.curPoint[1] >= self.starPoint[1]) {} else {}
          }
        }
      },
      floor: function floor() {
        var self = this;
        if (timer) {
          clearInterval(timer);
        }
        if (self.key === 'Start') {
          var _self = this;
          timer = setInterval(function () {
            _self.tick--;
            console.log(_self.data.tick);
            if (_self.tick !== -1) {
              var minutes = Math.floor(_self.tick / secondsPerMin);
              _self.min = minutes < 10 ? '0' + minutes.toString() : minutes;
              _self.setData({
                min: _self.min
              });
              var second = _self.tick % secondsPerMin;
              _self.sec = second < 10 ? '0' + second.toString() : second;
              _self.setData({
                sec: _self.sec
              });
            } else {
              clearInterval(timer);
            }
            console.log(_self.tick, _self.min, _self.sec);
          }, 1000);
          _self.key = 'Pause';
        } else {
          self.key = 'Start';
          clearInterval(timer);
        }
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
      self.tick = self.min * secondsPerMin;
      var weeks = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
      self.week = date.getUTCDay();
      self.weekd = weeks[self.week];
      self.month = date.getMonth();
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      self.mon = months[self.month];
      self.day = date.getDate();
      self.year = date.getFullYear();

      setTimeout(function () {
        self.showImg = false;
        self.setData({
          showImg: false
        });
      }, 2000);
    }
  }]);

  return Water;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Water , 'pages/noise'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbInNlY29uZHNQZXJNaW4iLCJ0aW1lciIsIldhdGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJzaG93SW1nIiwibWFyayIsInN0YXJQb2ludCIsImN1clBvaW50IiwiYmdjb2xvciIsIm5vZGUiLCJtb250aCIsIm1vbiIsImRheSIsIndlZWsiLCJ3ZWVrZCIsInllYXIiLCJtaW4iLCJzZWMiLCJhZGQiLCJ0aWNrIiwia2V5IiwibWV0aG9kcyIsInRvdWNoc3RhcnQiLCJlIiwic2VsZiIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwidG91Y2htb3ZlIiwieGNoYW5nZSIsInljaGFuZ2UiLCJNYXRoIiwiYWJzIiwidG9TdHJpbmciLCJ0b3VjaGVuZCIsImZsb29yIiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwiY29uc29sZSIsImxvZyIsIm1pbnV0ZXMiLCJzZXREYXRhIiwic2Vjb25kIiwidGl0bGUiLCJkZXNjIiwicGF0aCIsImRhdGUiLCJEYXRlIiwid2Vla3MiLCJnZXRVVENEYXkiLCJnZXRNb250aCIsIm1vbnRocyIsImdldERhdGUiLCJnZXRGdWxsWWVhciIsInNldFRpbWVvdXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsZ0JBQWdCLEVBQXRCO0FBQ0EsSUFBSUMsUUFBUSxJQUFaOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGVBQVMsSUFESjtBQUVMQyxZQUFNLG9CQUZEO0FBR0xDLGlCQUFXLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FITjtBQUlMQyxnQkFBVSxDQUFDLENBQUQsRUFBSSxDQUFKLENBSkw7QUFLTEMsZUFBUyx3QkFMSjtBQU1MQyxZQUFNLEdBTkQ7QUFPTEMsYUFBTyxFQVBGO0FBUUxDLFdBQUss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QyxLQUFLSSxRQUFMLEVBQWI7QUFDQSxVQUFNQyxTQUFTLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DLE1BQXBDLEVBQTRDLE1BQTVDLEVBQW9ELEtBQXBELEVBQTJELE1BQTNELEVBQW1FLEtBQW5FLEVBQTBFLEtBQTFFLEVBQWlGLEtBQWpGLENBQWY7QUFDQTNCLFdBQUtiLEdBQUwsR0FBV3dDLE9BQU8zQixLQUFLZCxLQUFaLENBQVg7QUFDQWMsV0FBS1osR0FBTCxHQUFXa0MsS0FBS00sT0FBTCxFQUFYO0FBQ0E1QixXQUFLVCxJQUFMLEdBQVkrQixLQUFLTyxXQUFMLEVBQVo7O0FBRUFDLGlCQUFXLFlBQU07QUFDZjlCLGFBQUtwQixPQUFMLEdBQWUsS0FBZjtBQUNBb0IsYUFBS2lCLE9BQUwsQ0FBYTtBQUNYckMsbUJBQVM7QUFERSxTQUFiO0FBR0QsT0FMRCxFQUtHLElBTEg7QUFNRDs7OztFQXBQZ0MsZUFBS21ELEk7O2tCQUFuQnZELEsiLCJmaWxlIjoibm9pc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmNvbnN0IHNlY29uZHNQZXJNaW4gPSA2MFxubGV0IHRpbWVyID0gbnVsbFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5b2S5b+DJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgc2hvd0ltZzogdHJ1ZSxcbiAgICBtYXJrOiAnLi4vaW1hZ2Uvd2F0ZXIucG5nJyxcbiAgICBzdGFyUG9pbnQ6IFswLCAwXSxcbiAgICBjdXJQb2ludDogWzAsIDBdLFxuICAgIGJnY29sb3I6ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJyxcbiAgICBub2RlOiAnMycsXG4gICAgbW9udGg6ICcnLFxuICAgIG1vbjogJycsXG4gICAgZGF5OiAnJyxcbiAgICB3ZWVrOiAnJyxcbiAgICB3ZWVrZDogJycsXG4gICAgeWVhcjogJycsXG4gICAgbWluOiAyMCxcbiAgICBzZWM6ICcwMCcsXG4gICAgYWRkOiAwLFxuICAgIHRpY2s6IDAsXG4gICAga2V5OiAnU3RhcnQnXG4gIH1cbiAgbWV0aG9kcyA9IHtcblxuICAgIHRvdWNoc3RhcnQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLnN0YXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICB9LFxuICAgIHRvdWNobW92ZShlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuY3VyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMF0gLSBzZWxmLnN0YXJQb2ludFswXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50WzFdIC0gc2VsZi5zdGFyUG9pbnRbMV1cbiAgICAgIGlmIChzZWxmLmN1clBvaW50WzBdID49IHNlbGYuc3RhclBvaW50WzBdKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5taW4gPT09ICfiiJ4nKSB7XG4gICAgICAgICAgICAgIHNlbGYubWluID0gNjBcbiAgICAgICAgICAgICAgc2VsZi5zZWMgPSAnMDAnXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoc2VsZi5taW4gPiAwKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGQgPSBzZWxmLmFkZCArIDFcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5hZGQgPT09IDUpIHtcbiAgICAgICAgICAgICAgICAgIHNlbGYubWluLS1cbiAgICAgICAgICAgICAgICAgIHNlbGYuYWRkID0gMFxuICAgICAgICAgICAgICAgICAgc2VsZi5taW4gPSBzZWxmLm1pbiA8IDEwID8gJzAnICsgc2VsZi5taW4udG9TdHJpbmcoKSA6IHNlbGYubWluXG4gICAgICAgICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLm1pbiAqIHNlY29uZHNQZXJNaW4gKyBzZWxmLnNlYyAqIDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5taW4gPSAnMDAnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNlbGYubWluIDwgNjApIHtcbiAgICAgICAgICAgICAgc2VsZi5hZGQgPSBzZWxmLmFkZCArIDFcbiAgICAgICAgICAgICAgaWYgKHNlbGYuYWRkID09PSA1KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5taW4rK1xuICAgICAgICAgICAgICAgIHNlbGYuYWRkID0gMFxuICAgICAgICAgICAgICAgIHNlbGYubWluID0gc2VsZi5taW4gPCAxMCA/ICcwJyArIHNlbGYubWluLnRvU3RyaW5nKCkgOiBzZWxmLm1pblxuICAgICAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYubWluICogc2Vjb25kc1Blck1pbiArIHNlbGYuc2VjICogMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzZWxmLm1pbiA9ICfiiJ4nXG4gICAgICAgICAgICAgIHNlbGYuc2VjID0gJ+KInidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5taW4gPT09ICfiiJ4nKSB7XG4gICAgICAgICAgICAgIHNlbGYubWluID0gNjBcbiAgICAgICAgICAgICAgc2VsZi5zZWMgPSAnMDAnXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoc2VsZi5taW4gPiAwKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGQgPSBzZWxmLmFkZCArIDFcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5hZGQgPT09IDUpIHtcbiAgICAgICAgICAgICAgICAgIHNlbGYubWluLS1cbiAgICAgICAgICAgICAgICAgIHNlbGYuYWRkID0gMFxuICAgICAgICAgICAgICAgICAgc2VsZi5taW4gPSBzZWxmLm1pbiA8IDEwID8gJzAnICsgc2VsZi5taW4udG9TdHJpbmcoKSA6IHNlbGYubWluXG4gICAgICAgICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLm1pbiAqIHNlY29uZHNQZXJNaW4gKyBzZWxmLnNlYyAqIDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5taW4gPSAnMDAnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNlbGYubWluIDwgNjApIHtcbiAgICAgICAgICAgICAgc2VsZi5hZGQgPSBzZWxmLmFkZCArIDFcbiAgICAgICAgICAgICAgaWYgKHNlbGYuYWRkID09PSA1KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5taW4rK1xuICAgICAgICAgICAgICAgIHNlbGYuYWRkID0gMFxuICAgICAgICAgICAgICAgIHNlbGYubWluID0gc2VsZi5taW4gPCAxMCA/ICcwJyArIHNlbGYubWluLnRvU3RyaW5nKCkgOiBzZWxmLm1pblxuICAgICAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYubWluICogc2Vjb25kc1Blck1pbiArIHNlbGYuc2VjICogMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzZWxmLm1pbiA9ICfiiJ4nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRvdWNoZW5kKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50WzBdIC0gc2VsZi5zdGFyUG9pbnRbMF1cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFsxXSAtIHNlbGYuc3RhclBvaW50WzFdXG5cbiAgICAgIGlmIChzZWxmLmN1clBvaW50WzBdID49IHNlbGYuc3RhclBvaW50WzBdKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICAgIHNlbGYuYWRkID0gc2VsZi5hZGQgKyAxXG4gICAgICAgICAgaWYgKHNlbGYuYWRkID09PSAyKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYubm9kZSkge1xuICAgICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZ29sZC5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzEnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS90cmVlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMidcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJzQnOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzMnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9ICc0J1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuYWRkID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgICBzZWxmLmFkZCA9IHNlbGYuYWRkICsgMVxuICAgICAgICAgIGlmIChzZWxmLmFkZCA9PT0gMikge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLm5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9ICcyJ1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3dhdGVyLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMydcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZmlyZS5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzQnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvc29pbC5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzUnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDIzOCwgOTksIDk5LCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmFkZCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBmbG9vcigpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICB9XG4gICAgICBpZiAoc2VsZi5rZXkgPT09ICdTdGFydCcpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIHNlbGYudGljayAtLVxuICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYuZGF0YS50aWNrKVxuICAgICAgICAgIGlmIChzZWxmLnRpY2sgIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlbGYudGljayAvIHNlY29uZHNQZXJNaW4pKVxuICAgICAgICAgICAgc2VsZi5taW4gPSBtaW51dGVzIDwgMTAgPyAnMCcgKyBtaW51dGVzLnRvU3RyaW5nKCkgOiBtaW51dGVzXG4gICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgICBtaW46IHNlbGYubWluXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgbGV0IHNlY29uZCA9IHNlbGYudGljayAlIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYuc2VjID0gc2Vjb25kIDwgMTAgPyAnMCcgKyBzZWNvbmQudG9TdHJpbmcoKSA6IHNlY29uZFxuICAgICAgICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgICAgICAgc2VjOiBzZWxmLnNlY1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coc2VsZi50aWNrLCBzZWxmLm1pbiwgc2VsZi5zZWMpXG4gICAgICAgIH0sIDEwMDApXG4gICAgICAgIHNlbGYua2V5ID0gJ1BhdXNlJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5rZXkgPSAnU3RhcnQnXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+W9kuW/gycsXG4gICAgICBkZXNjOiAn6YO95biC5Zan6Ze5IOS9leWkhOW9kuW/gycsXG4gICAgICBwYXRoOiAnL3BhZ2Uvbm9pc2UnXG4gICAgfVxuICB9XG5cbiAgb25Mb2FkKCkge1xuICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIHNlbGYudGljayA9IHNlbGYubWluICogc2Vjb25kc1Blck1pblxuICAgIGNvbnN0IHdlZWtzID0gWydTdW4nLCAnTW9uJywgJ1R1ZXMnLCAnV2VkJywgJ1RodXInLCAnRnJpJywgJ1NhdCddXG4gICAgc2VsZi53ZWVrID0gZGF0ZS5nZXRVVENEYXkoKVxuICAgIHNlbGYud2Vla2QgPSB3ZWVrc1tzZWxmLndlZWtdXG4gICAgc2VsZi5tb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICAgIGNvbnN0IG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVnJywgJ1NlcHQnLCAnT2N0JywgJ05vdicsICdEZWMnXVxuICAgIHNlbGYubW9uID0gbW9udGhzW3NlbGYubW9udGhdXG4gICAgc2VsZi5kYXkgPSBkYXRlLmdldERhdGUoKVxuICAgIHNlbGYueWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLnNob3dJbWcgPSBmYWxzZVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgc2hvd0ltZzogZmFsc2VcbiAgICAgIH0pXG4gICAgfSwgMjAwMClcbiAgfVxufVxuIl19