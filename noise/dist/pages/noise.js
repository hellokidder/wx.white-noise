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
      startCount: function startCount(self) {
        return setInterval(function () {
          self.setData({
            tick: self.tick - 1
          });
          if (self.tick !== -1) {
            var minutes = Math.floor(self.tick / secondsPerMin);
            self.min = minutes < 10 ? '0' + minutes.toString() : minutes;
            self.setData({
              min: self.min
            });
            var second = self.tick % secondsPerMin;
            self.sec = second < 10 ? '0' + second.toString() : second;
            self.setData({
              sec: self.sec
            });
          } else {
            clearInterval(timer);
          }
          console.log(self.tick, self.min, self.sec);
        }, 1000);
      },
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
              self.add = self.add + 1;
              if (self.add === 5) {
                self.min--;
                self.add = 0;
                self.min = self.min < 10 ? '0' + self.min.toString() : self.min;
              }
            } else {
              self.add = self.add + 1;
              if (self.add === 5) {
                self.min++;
                self.add = 0;
                self.min = self.min < 10 ? '0' + self.min.toString() : self.min;
              }
            }
          }
        } else {
          if (Math.abs(xchange) >= Math.abs(ychange)) {} else {
            if (self.curPoint[1] >= self.starPoint[1]) {
              self.add = self.add + 1;
              if (self.add === 5) {
                self.min--;
                self.add = 0;
                self.min = self.min < 10 ? '0' + self.min.toString() : self.min;
              }
            } else {
              self.add = self.add + 1;
              if (self.add === 5) {
                self.min++;
                self.add = 0;
                self.min = self.min < 10 ? '0' + self.min.toString() : self.min;
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
          //self.tick = self.min * secondsPerMin + self.sec
          timer = _self.startCount(_self);
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
      self.week = date.getUTCDay();
      switch (self.week) {
        case 0:
          self.weekd = 'Sun';
          break;
        case 1:
          self.weekd = 'Mon';
          break;
        case 2:
          self.weekd = 'Tues';
          break;
        case 3:
          self.weekd = 'Wed';
          break;
        case 4:
          self.weekd = 'Thur';
          break;
        case 5:
          self.weekd = 'Fri';
          break;
        case 6:
          self.weekd = 'Sat';
          break;
      }
      self.month = date.getMonth();
      switch (self.month) {
        case 0:
          self.mon = 'Jan';
          break;
        case 1:
          self.mon = 'Feb';
          break;
        case 2:
          self.mon = 'Mar';
          break;
        case 3:
          self.mon = 'Apr';
          break;
        case 4:
          self.mon = 'May';
          break;
        case 5:
          self.mon = 'June';
          break;
        case 6:
          self.mon = 'July';
          break;
        case 7:
          self.mon = 'Aug';
          break;
        case 8:
          self.mon = 'Sept';
          break;
        case 9:
          self.mon = 'Oct';
          break;
        case 10:
          self.mon = 'Nov';
          break;
        case 11:
          self.mon = 'Dec';
          break;
      }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbInNlY29uZHNQZXJNaW4iLCJ0aW1lciIsIldhdGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJzaG93SW1nIiwibWFyayIsInN0YXJQb2ludCIsImN1clBvaW50IiwiYmdjb2xvciIsIm5vZGUiLCJtb250aCIsIm1vbiIsImRheSIsIndlZWsiLCJ3ZWVrZCIsInllYXIiLCJtaW4iLCJzZWMiLCJhZGQiLCJ0aWNrIiwia2V5IiwibWV0aG9kcyIsInN0YXJ0Q291bnQiLCJzZWxmIiwic2V0SW50ZXJ2YWwiLCJzZXREYXRhIiwibWludXRlcyIsIk1hdGgiLCJmbG9vciIsInRvU3RyaW5nIiwic2Vjb25kIiwiY2xlYXJJbnRlcnZhbCIsImNvbnNvbGUiLCJsb2ciLCJ0b3VjaHN0YXJ0IiwiZSIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwidG91Y2htb3ZlIiwieGNoYW5nZSIsInljaGFuZ2UiLCJhYnMiLCJ0b3VjaGVuZCIsInRpdGxlIiwiZGVzYyIsInBhdGgiLCJkYXRlIiwiRGF0ZSIsImdldFVUQ0RheSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEZ1bGxZZWFyIiwic2V0VGltZW91dCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxnQkFBZ0IsRUFBdEI7QUFDQSxJQUFJQyxRQUFRLElBQVo7O0lBRXFCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsZUFBUyxJQURKO0FBRUxDLFlBQU0sb0JBRkQ7QUFHTEMsaUJBQVcsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUhOO0FBSUxDLGdCQUFVLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FKTDtBQUtMQyxlQUFTLHdCQUxKO0FBTUxDLFlBQU0sR0FORDtBQU9MQyxhQUFPLEVBUEY7QUFRTEMsV0FBSyxFQVJB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ICd3ZXB5J1xuXG5jb25zdCBzZWNvbmRzUGVyTWluID0gNjBcbmxldCB0aW1lciA9IG51bGw7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflvZLlv4MnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBzaG93SW1nOiB0cnVlLFxuICAgIG1hcms6ICcuLi9pbWFnZS93YXRlci5wbmcnLFxuICAgIHN0YXJQb2ludDogWzAsIDBdLFxuICAgIGN1clBvaW50OiBbMCwgMF0sXG4gICAgYmdjb2xvcjogJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknLFxuICAgIG5vZGU6ICczJyxcbiAgICBtb250aDogJycsXG4gICAgbW9uOiAnJyxcbiAgICBkYXk6ICcnLFxuICAgIHdlZWs6ICcnLFxuICAgIHdlZWtkOiAnJyxcbiAgICB5ZWFyOiAnJyxcbiAgICBtaW46IDIwLFxuICAgIHNlYzogJzAwJyxcbiAgICBhZGQ6IDAsXG4gICAgdGljazogMCxcbiAgICBrZXk6ICdTdGFydCdcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHN0YXJ0Q291bnQoc2VsZil7XG4gICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICB0aWNrOiBzZWxmLnRpY2sgLSAxXG4gICAgICAgICAgfSlcbiAgICAgICAgICBpZiAoc2VsZi50aWNrICE9PSAtMSkge1xuICAgICAgICAgICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWxmLnRpY2sgLyBzZWNvbmRzUGVyTWluKSk7XG4gICAgICAgICAgICBzZWxmLm1pbiA9IG1pbnV0ZXMgPCAxMCA/ICcwJyArIG1pbnV0ZXMudG9TdHJpbmcoKSA6IG1pbnV0ZXNcbiAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIG1pbjogc2VsZi5taW5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBsZXQgc2Vjb25kID0gc2VsZi50aWNrICUgc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5zZWMgPSBzZWNvbmQgPCAxMCA/ICcwJyArIHNlY29uZC50b1N0cmluZygpIDogc2Vjb25kXG4gICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgICBzZWM6IHNlbGYuc2VjXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnRpY2ssIHNlbGYubWluLCBzZWxmLnNlYylcbiAgICAgICAgfSwgMTAwMClcbiAgICB9LFxuICAgIHRvdWNoc3RhcnQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLnN0YXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICB9LFxuICAgIHRvdWNobW92ZShlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuY3VyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMF0gLSBzZWxmLnN0YXJQb2ludFswXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50WzFdIC0gc2VsZi5zdGFyUG9pbnRbMV1cbiAgICAgIGlmIChzZWxmLmN1clBvaW50WzBdID49IHNlbGYuc3RhclBvaW50WzBdKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgICBzZWxmLmFkZCA9IHNlbGYuYWRkICsgMVxuICAgICAgICAgICAgaWYgKHNlbGYuYWRkID09PSA1KSB7XG4gICAgICAgICAgICAgIHNlbGYubWluLS1cbiAgICAgICAgICAgICAgc2VsZi5hZGQgPSAwXG4gICAgICAgICAgICAgIHNlbGYubWluID0gc2VsZi5taW4gPCAxMCA/ICcwJyArIHNlbGYubWluLnRvU3RyaW5nKCkgOiBzZWxmLm1pblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmFkZCA9IHNlbGYuYWRkICsgMVxuICAgICAgICAgICAgaWYgKHNlbGYuYWRkID09PSA1KSB7XG4gICAgICAgICAgICAgIHNlbGYubWluKytcbiAgICAgICAgICAgICAgc2VsZi5hZGQgPSAwXG4gICAgICAgICAgICAgIHNlbGYubWluID0gc2VsZi5taW4gPCAxMCA/ICcwJyArIHNlbGYubWluLnRvU3RyaW5nKCkgOiBzZWxmLm1pblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICAgIHNlbGYuYWRkID0gc2VsZi5hZGQgKyAxXG4gICAgICAgICAgICBpZiAoc2VsZi5hZGQgPT09IDUpIHtcbiAgICAgICAgICAgICAgc2VsZi5taW4tLVxuICAgICAgICAgICAgICBzZWxmLmFkZCA9IDBcbiAgICAgICAgICAgICAgc2VsZi5taW4gPSBzZWxmLm1pbiA8IDEwID8gJzAnICsgc2VsZi5taW4udG9TdHJpbmcoKSA6IHNlbGYubWluXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuYWRkID0gc2VsZi5hZGQgKyAxXG4gICAgICAgICAgICBpZiAoc2VsZi5hZGQgPT09IDUpIHtcbiAgICAgICAgICAgICAgc2VsZi5taW4rK1xuICAgICAgICAgICAgICBzZWxmLmFkZCA9IDBcbiAgICAgICAgICAgICAgc2VsZi5taW4gPSBzZWxmLm1pbiA8IDEwID8gJzAnICsgc2VsZi5taW4udG9TdHJpbmcoKSA6IHNlbGYubWluXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRvdWNoZW5kKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50WzBdIC0gc2VsZi5zdGFyUG9pbnRbMF1cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFsxXSAtIHNlbGYuc3RhclBvaW50WzFdXG5cbiAgICAgIGlmIChzZWxmLmN1clBvaW50WzBdID49IHNlbGYuc3RhclBvaW50WzBdKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICAgIHN3aXRjaCAoc2VsZi5ub2RlKSB7XG4gICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZ29sZC5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICcxJ1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMidcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzQnOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvd2F0ZXIucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMydcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICc1JzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnNCdcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgc3dpdGNoIChzZWxmLm5vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvdHJlZS5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICcyJ1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICczJ1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZmlyZS5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICc0J1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjMpJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9zb2lsLnBuZydcbiAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzUnXG4gICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyMzgsIDk5LCA5OSwgMC4zKSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGZsb29yKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBpZiAodGltZXIpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICB9XG4gICAgICBpZiAoc2VsZi5rZXkgPT09ICdTdGFydCcpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIC8vc2VsZi50aWNrID0gc2VsZi5taW4gKiBzZWNvbmRzUGVyTWluICsgc2VsZi5zZWNcbiAgICAgICAgdGltZXIgPSBzZWxmLnN0YXJ0Q291bnQoc2VsZik7XG4gICAgICAgIHNlbGYua2V5ID0gJ0VuZCdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYua2V5ID0gJ1N0YXJ0J1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5b2S5b+DJyxcbiAgICAgIGRlc2M6ICfpg73luILllqfpl7kg5L2V5aSE5b2S5b+DJyxcbiAgICAgIHBhdGg6ICcvcGFnZS9ub2lzZSdcbiAgICB9XG4gIH1cblxuICBvbkxvYWQoKSB7XG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgc2VsZi50aWNrID0gc2VsZi5taW4gKiBzZWNvbmRzUGVyTWluXG4gICAgc2VsZi53ZWVrID0gZGF0ZS5nZXRVVENEYXkoKVxuICAgIHN3aXRjaCAoc2VsZi53ZWVrKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHNlbGYud2Vla2QgPSAnU3VuJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAxOlxuICAgICAgICBzZWxmLndlZWtkID0gJ01vbidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgc2VsZi53ZWVrZCA9ICdUdWVzJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAzOlxuICAgICAgICBzZWxmLndlZWtkID0gJ1dlZCdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgc2VsZi53ZWVrZCA9ICdUaHVyJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA1OlxuICAgICAgICBzZWxmLndlZWtkID0gJ0ZyaSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgc2VsZi53ZWVrZCA9ICdTYXQnXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICAgIHNlbGYubW9udGggPSBkYXRlLmdldE1vbnRoKClcbiAgICBzd2l0Y2ggKHNlbGYubW9udGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgc2VsZi5tb24gPSAnSmFuJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAxOlxuICAgICAgICBzZWxmLm1vbiA9ICdGZWInXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDI6XG4gICAgICAgIHNlbGYubW9uID0gJ01hcidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgc2VsZi5tb24gPSAnQXByJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA0OlxuICAgICAgICBzZWxmLm1vbiA9ICdNYXknXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDU6XG4gICAgICAgIHNlbGYubW9uID0gJ0p1bmUnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDY6XG4gICAgICAgIHNlbGYubW9uID0gJ0p1bHknXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDc6XG4gICAgICAgIHNlbGYubW9uID0gJ0F1ZydcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgODpcbiAgICAgICAgc2VsZi5tb24gPSAnU2VwdCdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgOTpcbiAgICAgICAgc2VsZi5tb24gPSAnT2N0J1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAxMDpcbiAgICAgICAgc2VsZi5tb24gPSAnTm92J1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAxMTpcbiAgICAgICAgc2VsZi5tb24gPSAnRGVjJ1xuICAgICAgICBicmVha1xuICAgIH1cbiAgICBzZWxmLmRheSA9IGRhdGUuZ2V0RGF0ZSgpXG4gICAgc2VsZi55ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlbGYuc2hvd0ltZyA9IGZhbHNlXG4gICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICBzaG93SW1nOiBmYWxzZVxuICAgICAgfSlcbiAgICB9LCAyMDAwKVxuICB9XG59XG4iXX0=