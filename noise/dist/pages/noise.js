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
      key: '开始',
      End: '结束'
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
            if (self.add === 4) {
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
            if (self.add === 4) {
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
        if (self.key === '开始' || self.key === '继续') {
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
          _self.key = '暂停';
        } else {
          self.key = '继续';
          clearInterval(timer);
        }
      },
      floorEnd: function floorEnd() {
        var self = this;
        clearInterval(timer);
        self.min = '20';
        self.sec = '00';
        self.key = '开始';
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
      _wepy2.default.request({
        url: 'http://127.0.0.1:7001/voice/list',
        success: function success(res) {
          console.log(res);
        }
      });
    }
  }]);

  return Water;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Water , 'pages/noise'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbInNlY29uZHNQZXJNaW4iLCJ0aW1lciIsIldhdGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJzaG93SW1nIiwibWFyayIsInN0YXJQb2ludCIsImN1clBvaW50IiwiYmdjb2xvciIsIm5vZGUiLCJtb250aCIsIm1vbiIsImRheSIsIndlZWsiLCJ3ZWVrZCIsInllYXIiLCJtaW4iLCJzZWMiLCJhZGQiLCJ0aWNrIiwia2V5IiwiRW5kIiwibWV0aG9kcyIsInRvdWNoc3RhcnQiLCJlIiwic2VsZiIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwidG91Y2htb3ZlIiwieGNoYW5nZSIsInljaGFuZ2UiLCJNYXRoIiwiYWJzIiwidG9TdHJpbmciLCJ0b3VjaGVuZCIsImZsb29yIiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwiY29uc29sZSIsImxvZyIsIm1pbnV0ZXMiLCJzZXREYXRhIiwic2Vjb25kIiwiZmxvb3JFbmQiLCJ0aXRsZSIsImRlc2MiLCJwYXRoIiwiZGF0ZSIsIkRhdGUiLCJ3ZWVrcyIsImdldFVUQ0RheSIsImdldE1vbnRoIiwibW9udGhzIiwiZ2V0RGF0ZSIsImdldEZ1bGxZZWFyIiwic2V0VGltZW91dCIsInJlcXVlc3QiLCJ1cmwiLCJzdWNjZXNzIiwicmVzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGdCQUFnQixFQUF0QjtBQUNBLElBQUlDLFFBQVEsSUFBWjs7SUFFcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxlQUFTLElBREo7QUFFTEMsWUFBTSxvQkFGRDtBQUdMQyxpQkFBVyxDQUFDLENBQUQsRUFBSSxDQUFKLENBSE47QUFJTEMsZ0JBQVUsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUpMO0FBS0xDLGVBQVMs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ZXB5J1xuXG5jb25zdCBzZWNvbmRzUGVyTWluID0gNjBcbmxldCB0aW1lciA9IG51bGxcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F0ZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W9kuW/gydcbiAgfVxuICBkYXRhID0ge1xuICAgIHNob3dJbWc6IHRydWUsXG4gICAgbWFyazogJy4uL2ltYWdlL3dhdGVyLnBuZycsXG4gICAgc3RhclBvaW50OiBbMCwgMF0sXG4gICAgY3VyUG9pbnQ6IFswLCAwXSxcbiAgICBiZ2NvbG9yOiAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKScsXG4gICAgbm9kZTogJzMnLFxuICAgIG1vbnRoOiAnJyxcbiAgICBtb246ICcnLFxuICAgIGRheTogJycsXG4gICAgd2VlazogJycsXG4gICAgd2Vla2Q6ICcnLFxuICAgIHllYXI6ICcnLFxuICAgIG1pbjogMjAsXG4gICAgc2VjOiAnMDAnLFxuICAgIGFkZDogMCxcbiAgICB0aWNrOiAwLFxuICAgIGtleTogJ+W8gOWniycsXG4gICAgRW5kOiAn57uT5p2fJ1xuICB9XG4gIG1ldGhvZHMgPSB7XG5cbiAgICB0b3VjaHN0YXJ0KGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5zdGFyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgfSxcbiAgICB0b3VjaG1vdmUoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLmN1clBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50WzBdIC0gc2VsZi5zdGFyUG9pbnRbMF1cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFsxXSAtIHNlbGYuc3RhclBvaW50WzFdXG4gICAgICBpZiAoc2VsZi5jdXJQb2ludFswXSA+PSBzZWxmLnN0YXJQb2ludFswXSkge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgICAgaWYgKHNlbGYubWluID09PSAn4oieJykge1xuICAgICAgICAgICAgICBzZWxmLm1pbiA9IDYwXG4gICAgICAgICAgICAgIHNlbGYuc2VjID0gJzAwJ1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKHNlbGYubWluID4gMCkge1xuICAgICAgICAgICAgICAgIHNlbGYuYWRkID0gc2VsZi5hZGQgKyAxXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuYWRkID09PSA1KSB7XG4gICAgICAgICAgICAgICAgICBzZWxmLm1pbi0tXG4gICAgICAgICAgICAgICAgICBzZWxmLmFkZCA9IDBcbiAgICAgICAgICAgICAgICAgIHNlbGYubWluID0gc2VsZi5taW4gPCAxMCA/ICcwJyArIHNlbGYubWluLnRvU3RyaW5nKCkgOiBzZWxmLm1pblxuICAgICAgICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi5taW4gKiBzZWNvbmRzUGVyTWluICsgc2VsZi5zZWMgKiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYubWluID0gJzAwJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzZWxmLm1pbiA8IDYwKSB7XG4gICAgICAgICAgICAgIHNlbGYuYWRkID0gc2VsZi5hZGQgKyAxXG4gICAgICAgICAgICAgIGlmIChzZWxmLmFkZCA9PT0gNSkge1xuICAgICAgICAgICAgICAgIHNlbGYubWluKytcbiAgICAgICAgICAgICAgICBzZWxmLmFkZCA9IDBcbiAgICAgICAgICAgICAgICBzZWxmLm1pbiA9IHNlbGYubWluIDwgMTAgPyAnMCcgKyBzZWxmLm1pbi50b1N0cmluZygpIDogc2VsZi5taW5cbiAgICAgICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLm1pbiAqIHNlY29uZHNQZXJNaW4gKyBzZWxmLnNlYyAqIDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2VsZi5taW4gPSAn4oieJ1xuICAgICAgICAgICAgICBzZWxmLnNlYyA9ICfiiJ4nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgICAgaWYgKHNlbGYubWluID09PSAn4oieJykge1xuICAgICAgICAgICAgICBzZWxmLm1pbiA9IDYwXG4gICAgICAgICAgICAgIHNlbGYuc2VjID0gJzAwJ1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKHNlbGYubWluID4gMCkge1xuICAgICAgICAgICAgICAgIHNlbGYuYWRkID0gc2VsZi5hZGQgKyAxXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuYWRkID09PSA1KSB7XG4gICAgICAgICAgICAgICAgICBzZWxmLm1pbi0tXG4gICAgICAgICAgICAgICAgICBzZWxmLmFkZCA9IDBcbiAgICAgICAgICAgICAgICAgIHNlbGYubWluID0gc2VsZi5taW4gPCAxMCA/ICcwJyArIHNlbGYubWluLnRvU3RyaW5nKCkgOiBzZWxmLm1pblxuICAgICAgICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi5taW4gKiBzZWNvbmRzUGVyTWluICsgc2VsZi5zZWMgKiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYubWluID0gJzAwJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzZWxmLm1pbiA8IDYwKSB7XG4gICAgICAgICAgICAgIHNlbGYuYWRkID0gc2VsZi5hZGQgKyAxXG4gICAgICAgICAgICAgIGlmIChzZWxmLmFkZCA9PT0gNSkge1xuICAgICAgICAgICAgICAgIHNlbGYubWluKytcbiAgICAgICAgICAgICAgICBzZWxmLmFkZCA9IDBcbiAgICAgICAgICAgICAgICBzZWxmLm1pbiA9IHNlbGYubWluIDwgMTAgPyAnMCcgKyBzZWxmLm1pbi50b1N0cmluZygpIDogc2VsZi5taW5cbiAgICAgICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLm1pbiAqIHNlY29uZHNQZXJNaW4gKyBzZWxmLnNlYyAqIDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2VsZi5taW4gPSAn4oieJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB0b3VjaGVuZChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFswXSAtIHNlbGYuc3RhclBvaW50WzBdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMV0gLSBzZWxmLnN0YXJQb2ludFsxXVxuXG4gICAgICBpZiAoc2VsZi5jdXJQb2ludFswXSA+PSBzZWxmLnN0YXJQb2ludFswXSkge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgICBzZWxmLmFkZCA9IHNlbGYuYWRkICsgMVxuICAgICAgICAgIGlmIChzZWxmLmFkZCA9PT0gNCkge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLm5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2dvbGQucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9ICcxJ1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvdHJlZS5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzInXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvd2F0ZXIucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9ICczJ1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9maXJlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnNCdcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmFkZCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgc2VsZi5hZGQgPSBzZWxmLmFkZCArIDFcbiAgICAgICAgICBpZiAoc2VsZi5hZGQgPT09IDQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5ub2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS90cmVlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMidcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzMnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9ICc0J1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3NvaWwucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9ICc1J1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyMzgsIDk5LCA5OSwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICc1JzpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5hZGQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZmxvb3IoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGlmICh0aW1lcikge1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgfVxuICAgICAgaWYgKHNlbGYua2V5ID09PSAn5byA5aeLJyB8fCBzZWxmLmtleSA9PT0gJ+e7p+e7rScpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIHNlbGYudGljay0tXG4gICAgICAgICAgY29uc29sZS5sb2coc2VsZi5kYXRhLnRpY2spXG4gICAgICAgICAgaWYgKHNlbGYudGljayAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VsZi50aWNrIC8gc2Vjb25kc1Blck1pbikpXG4gICAgICAgICAgICBzZWxmLm1pbiA9IG1pbnV0ZXMgPCAxMCA/ICcwJyArIG1pbnV0ZXMudG9TdHJpbmcoKSA6IG1pbnV0ZXNcbiAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIG1pbjogc2VsZi5taW5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBsZXQgc2Vjb25kID0gc2VsZi50aWNrICUgc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5zZWMgPSBzZWNvbmQgPCAxMCA/ICcwJyArIHNlY29uZC50b1N0cmluZygpIDogc2Vjb25kXG4gICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgICBzZWM6IHNlbGYuc2VjXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnRpY2ssIHNlbGYubWluLCBzZWxmLnNlYylcbiAgICAgICAgfSwgMTAwMClcbiAgICAgICAgc2VsZi5rZXkgPSAn5pqC5YGcJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5rZXkgPSAn57un57utJ1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgfVxuICAgIH0sXG4gICAgZmxvb3JFbmQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICBzZWxmLm1pbiA9ICcyMCdcbiAgICAgIHNlbGYuc2VjID0gJzAwJ1xuICAgICAgc2VsZi5rZXkgPSAn5byA5aeLJ1xuICAgIH1cbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICflvZLlv4MnLFxuICAgICAgZGVzYzogJ+mDveW4guWWp+mXuSDkvZXlpITlvZLlv4MnLFxuICAgICAgcGF0aDogJy9wYWdlL25vaXNlJ1xuICAgIH1cbiAgfVxuXG4gIG9uTG9hZCgpIHtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBzZWxmLnRpY2sgPSBzZWxmLm1pbiAqIHNlY29uZHNQZXJNaW5cbiAgICBjb25zdCB3ZWVrcyA9IFsnU3VuJywgJ01vbicsICdUdWVzJywgJ1dlZCcsICdUaHVyJywgJ0ZyaScsICdTYXQnXVxuICAgIHNlbGYud2VlayA9IGRhdGUuZ2V0VVRDRGF5KClcbiAgICBzZWxmLndlZWtkID0gd2Vla3Nbc2VsZi53ZWVrXVxuICAgIHNlbGYubW9udGggPSBkYXRlLmdldE1vbnRoKClcbiAgICBjb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1ZycsICdTZXB0JywgJ09jdCcsICdOb3YnLCAnRGVjJ11cbiAgICBzZWxmLm1vbiA9IG1vbnRoc1tzZWxmLm1vbnRoXVxuICAgIHNlbGYuZGF5ID0gZGF0ZS5nZXREYXRlKClcbiAgICBzZWxmLnllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2VsZi5zaG93SW1nID0gZmFsc2VcbiAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgIHNob3dJbWc6IGZhbHNlXG4gICAgICB9KVxuICAgIH0sIDIwMDApXG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJ2h0dHA6Ly8xMjcuMC4wLjE6NzAwMS92b2ljZS9saXN0JyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==