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
                self.min = '60';
              }
            }
          }
        } else {
          if (Math.abs(xchange) >= Math.abs(ychange)) {} else {
            if (self.curPoint[1] >= self.starPoint[1]) {
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
                self.min = '60';
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
          } else {
            if (self.curPoint[1] >= self.starPoint[1]) {} else {}
          }
        } else {
          if (Math.abs(xchange) >= Math.abs(ychange)) {
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
          _self.key = 'End';
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbInNlY29uZHNQZXJNaW4iLCJ0aW1lciIsIldhdGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJzaG93SW1nIiwibWFyayIsInN0YXJQb2ludCIsImN1clBvaW50IiwiYmdjb2xvciIsIm5vZGUiLCJtb250aCIsIm1vbiIsImRheSIsIndlZWsiLCJ3ZWVrZCIsInllYXIiLCJtaW4iLCJzZWMiLCJhZGQiLCJ0aWNrIiwia2V5IiwibWV0aG9kcyIsInRvdWNoc3RhcnQiLCJlIiwic2VsZiIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwidG91Y2htb3ZlIiwieGNoYW5nZSIsInljaGFuZ2UiLCJNYXRoIiwiYWJzIiwidG9TdHJpbmciLCJ0b3VjaGVuZCIsImZsb29yIiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwiY29uc29sZSIsImxvZyIsIm1pbnV0ZXMiLCJzZXREYXRhIiwic2Vjb25kIiwidGl0bGUiLCJkZXNjIiwicGF0aCIsImRhdGUiLCJEYXRlIiwid2Vla3MiLCJnZXRVVENEYXkiLCJnZXRNb250aCIsIm1vbnRocyIsImdldERhdGUiLCJnZXRGdWxsWWVhciIsInNldFRpbWVvdXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsZ0JBQWdCLEVBQXRCO0FBQ0EsSUFBSUMsUUFBUSxJQUFaOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGVBQVMsSUFESjtBQUVMQyxZQUFNLG9CQUZEO0FBR0xDLGlCQUFXLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FITjtBQUlMQyxnQkFBVSxDQUFDLENBQUQsRUFBSSxDQUFKLENBSkw7QUFLTEMsZUFBUyx3QkFMSjtBQU1MQyxZQUFNLEdBTkQ7QUFPTEMsYUFBTyxFQVBGO0FBUUxDLFdBQUss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ZnJvbSAnd2VweSdcblxuY29uc3Qgc2Vjb25kc1Blck1pbiA9IDYwXG5sZXQgdGltZXIgPSBudWxsXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflvZLlv4MnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBzaG93SW1nOiB0cnVlLFxuICAgIG1hcms6ICcuLi9pbWFnZS93YXRlci5wbmcnLFxuICAgIHN0YXJQb2ludDogWzAsIDBdLFxuICAgIGN1clBvaW50OiBbMCwgMF0sXG4gICAgYmdjb2xvcjogJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknLFxuICAgIG5vZGU6ICczJyxcbiAgICBtb250aDogJycsXG4gICAgbW9uOiAnJyxcbiAgICBkYXk6ICcnLFxuICAgIHdlZWs6ICcnLFxuICAgIHdlZWtkOiAnJyxcbiAgICB5ZWFyOiAnJyxcbiAgICBtaW46IDIwLFxuICAgIHNlYzogJzAwJyxcbiAgICBhZGQ6IDAsXG4gICAgdGljazogMCxcbiAgICBrZXk6ICdTdGFydCdcbiAgfVxuICBtZXRob2RzID0ge1xuXG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFswXSAtIHNlbGYuc3RhclBvaW50WzBdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMV0gLSBzZWxmLnN0YXJQb2ludFsxXVxuICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMF0gPj0gc2VsZi5zdGFyUG9pbnRbMF0pIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICAgIGlmIChzZWxmLm1pbiA+IDApIHtcbiAgICAgICAgICAgICAgc2VsZi5hZGQgPSBzZWxmLmFkZCArIDFcbiAgICAgICAgICAgICAgaWYgKHNlbGYuYWRkID09PSA1KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5taW4tLVxuICAgICAgICAgICAgICAgIHNlbGYuYWRkID0gMFxuICAgICAgICAgICAgICAgIHNlbGYubWluID0gc2VsZi5taW4gPCAxMCA/ICcwJyArIHNlbGYubWluLnRvU3RyaW5nKCkgOiBzZWxmLm1pblxuICAgICAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYubWluICogc2Vjb25kc1Blck1pbiArIHNlbGYuc2VjICogMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzZWxmLm1pbiA9ICcwMCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNlbGYubWluIDwgNjApIHtcbiAgICAgICAgICAgICAgc2VsZi5hZGQgPSBzZWxmLmFkZCArIDFcbiAgICAgICAgICAgICAgaWYgKHNlbGYuYWRkID09PSA1KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5taW4rK1xuICAgICAgICAgICAgICAgIHNlbGYuYWRkID0gMFxuICAgICAgICAgICAgICAgIHNlbGYubWluID0gc2VsZi5taW4gPCAxMCA/ICcwJyArIHNlbGYubWluLnRvU3RyaW5nKCkgOiBzZWxmLm1pblxuICAgICAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYubWluICogc2Vjb25kc1Blck1pbiArIHNlbGYuc2VjICogMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzZWxmLm1pbiA9ICc2MCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5taW4gPiAwKSB7XG4gICAgICAgICAgICAgIHNlbGYuYWRkID0gc2VsZi5hZGQgKyAxXG4gICAgICAgICAgICAgIGlmIChzZWxmLmFkZCA9PT0gNSkge1xuICAgICAgICAgICAgICAgIHNlbGYubWluLS1cbiAgICAgICAgICAgICAgICBzZWxmLmFkZCA9IDBcbiAgICAgICAgICAgICAgICBzZWxmLm1pbiA9IHNlbGYubWluIDwgMTAgPyAnMCcgKyBzZWxmLm1pbi50b1N0cmluZygpIDogc2VsZi5taW5cbiAgICAgICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLm1pbiAqIHNlY29uZHNQZXJNaW4gKyBzZWxmLnNlYyAqIDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2VsZi5taW4gPSAnMDAnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzZWxmLm1pbiA8IDYwKSB7XG4gICAgICAgICAgICAgIHNlbGYuYWRkID0gc2VsZi5hZGQgKyAxXG4gICAgICAgICAgICAgIGlmIChzZWxmLmFkZCA9PT0gNSkge1xuICAgICAgICAgICAgICAgIHNlbGYubWluKytcbiAgICAgICAgICAgICAgICBzZWxmLmFkZCA9IDBcbiAgICAgICAgICAgICAgICBzZWxmLm1pbiA9IHNlbGYubWluIDwgMTAgPyAnMCcgKyBzZWxmLm1pbi50b1N0cmluZygpIDogc2VsZi5taW5cbiAgICAgICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLm1pbiAqIHNlY29uZHNQZXJNaW4gKyBzZWxmLnNlYyAqIDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2VsZi5taW4gPSAnNjAnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRvdWNoZW5kKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50WzBdIC0gc2VsZi5zdGFyUG9pbnRbMF1cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFsxXSAtIHNlbGYuc3RhclBvaW50WzFdXG5cbiAgICAgIGlmIChzZWxmLmN1clBvaW50WzBdID49IHNlbGYuc3RhclBvaW50WzBdKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICAgIHN3aXRjaCAoc2VsZi5ub2RlKSB7XG4gICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZ29sZC5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICcxJ1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMidcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzQnOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvd2F0ZXIucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMydcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICc1JzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnNCdcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgc3dpdGNoIChzZWxmLm5vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvdHJlZS5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICcyJ1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICczJ1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZmlyZS5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICc0J1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjMpJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9zb2lsLnBuZydcbiAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzUnXG4gICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyMzgsIDk5LCA5OSwgMC4zKSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGZsb29yKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBpZiAodGltZXIpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgIH1cbiAgICAgIGlmIChzZWxmLmtleSA9PT0gJ1N0YXJ0Jykge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgc2VsZi50aWNrIC0tXG4gICAgICAgICAgY29uc29sZS5sb2coc2VsZi5kYXRhLnRpY2spXG4gICAgICAgICAgaWYgKHNlbGYudGljayAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VsZi50aWNrIC8gc2Vjb25kc1Blck1pbikpXG4gICAgICAgICAgICBzZWxmLm1pbiA9IG1pbnV0ZXMgPCAxMCA/ICcwJyArIG1pbnV0ZXMudG9TdHJpbmcoKSA6IG1pbnV0ZXNcbiAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIG1pbjogc2VsZi5taW5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBsZXQgc2Vjb25kID0gc2VsZi50aWNrICUgc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5zZWMgPSBzZWNvbmQgPCAxMCA/ICcwJyArIHNlY29uZC50b1N0cmluZygpIDogc2Vjb25kXG4gICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgICBzZWM6IHNlbGYuc2VjXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnRpY2ssIHNlbGYubWluLCBzZWxmLnNlYylcbiAgICAgICAgfSwgMTAwMClcbiAgICAgICAgc2VsZi5rZXkgPSAnRW5kJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5rZXkgPSAnU3RhcnQnXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+W9kuW/gycsXG4gICAgICBkZXNjOiAn6YO95biC5Zan6Ze5IOS9leWkhOW9kuW/gycsXG4gICAgICBwYXRoOiAnL3BhZ2Uvbm9pc2UnXG4gICAgfVxuICB9XG5cbiAgb25Mb2FkKCkge1xuICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIHNlbGYudGljayA9IHNlbGYubWluICogc2Vjb25kc1Blck1pblxuICAgIGNvbnN0IHdlZWtzID0gWydTdW4nLCAnTW9uJywgJ1R1ZXMnLCAnV2VkJywgJ1RodXInLCAnRnJpJywgJ1NhdCddXG4gICAgc2VsZi53ZWVrID0gZGF0ZS5nZXRVVENEYXkoKVxuICAgIHNlbGYud2Vla2QgPSB3ZWVrc1tzZWxmLndlZWtdXG4gICAgc2VsZi5tb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICAgIGNvbnN0IG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVnJywgJ1NlcHQnLCAnT2N0JywgJ05vdicsICdEZWMnXVxuICAgIHNlbGYubW9uID0gbW9udGhzW3NlbGYubW9udGhdXG4gICAgc2VsZi5kYXkgPSBkYXRlLmdldERhdGUoKVxuICAgIHNlbGYueWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLnNob3dJbWcgPSBmYWxzZVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgc2hvd0ltZzogZmFsc2VcbiAgICAgIH0pXG4gICAgfSwgMjAwMClcbiAgfVxufVxuIl19