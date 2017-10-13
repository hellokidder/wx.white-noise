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
      sec: 0,
      add: 0,
      tick: 0
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
              self.add = self.add + 1;
              if (self.add === 5) {
                self.min--;
                self.add = 0;
              }
            } else {
              self.add = self.add + 1;
              if (self.add === 5) {
                self.min++;
                self.add = 0;
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
              }
            } else {
              self.add = self.add + 1;
              if (self.add === 5) {
                self.min++;
                self.add = 0;
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
                console.log(self);
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
        self.tick = self.min * secondsPerMin;
        setInterval(function () {
          self.tick--;
          if (self.tick !== 0) {
            self.min = Number((self.tick / secondsPerMin).toString().slice(0, 2));
            self.setData({
              min: Number((self.tick / secondsPerMin).toString().slice(0, 2))
            });
            self.sec = self.tick % secondsPerMin;
            self.setData({
              sec: self.tick % secondsPerMin
            });
          }
          console.log(self.tick, self.min, self.sec);
        }, 1000);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbInNlY29uZHNQZXJNaW4iLCJXYXRlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwic2hvd0ltZyIsIm1hcmsiLCJzdGFyUG9pbnQiLCJjdXJQb2ludCIsImJnY29sb3IiLCJub2RlIiwibW9udGgiLCJtb24iLCJkYXkiLCJ3ZWVrIiwid2Vla2QiLCJ5ZWFyIiwibWluIiwic2VjIiwiYWRkIiwidGljayIsIm1ldGhvZHMiLCJ0b3VjaHN0YXJ0IiwiZSIsInNlbGYiLCJ0b3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsInRvdWNobW92ZSIsInhjaGFuZ2UiLCJ5Y2hhbmdlIiwiTWF0aCIsImFicyIsInRvdWNoZW5kIiwiY29uc29sZSIsImxvZyIsImZsb29yIiwic2V0SW50ZXJ2YWwiLCJOdW1iZXIiLCJ0b1N0cmluZyIsInNsaWNlIiwic2V0RGF0YSIsInRpdGxlIiwiZGVzYyIsInBhdGgiLCJkYXRlIiwiRGF0ZSIsImdldFVUQ0RheSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEZ1bGxZZWFyIiwic2V0VGltZW91dCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxnQkFBZ0IsRUFBdEI7O0lBRXFCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsZUFBUyxJQURKO0FBRUxDLFlBQU0sb0JBRkQ7QUFHTEMsaUJBQVcsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUhOO0FBSUxDLGdCQUFVLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FKTDtBQUtMQyxlQUFTLHdCQUxKO0FBTUxDLFlBQU0sR0FORDtBQU9MQyxhQUFPLEVBUEY7QUFRTEMsV0FBSyxFQVJBO0FBU0xDLFdBQUssRUFUQTtBQVVMQyxZQUFNLEVBVkQ7QUFXTEMsYUFBTyxFQVhGO0FBWUxDLFlBQU0sRUFaRDtB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blBnQyxlQUFLK0MsSTs7a0JBQW5CbkQsSyIsImZpbGUiOiJub2lzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuY29uc3Qgc2Vjb25kc1Blck1pbiA9IDYwXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflvZLlv4MnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBzaG93SW1nOiB0cnVlLFxuICAgIG1hcms6ICcuLi9pbWFnZS93YXRlci5wbmcnLFxuICAgIHN0YXJQb2ludDogWzAsIDBdLFxuICAgIGN1clBvaW50OiBbMCwgMF0sXG4gICAgYmdjb2xvcjogJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknLFxuICAgIG5vZGU6ICczJyxcbiAgICBtb250aDogJycsXG4gICAgbW9uOiAnJyxcbiAgICBkYXk6ICcnLFxuICAgIHdlZWs6ICcnLFxuICAgIHdlZWtkOiAnJyxcbiAgICB5ZWFyOiAnJyxcbiAgICBtaW46IDIwLFxuICAgIHNlYzogMCxcbiAgICBhZGQ6IDAsXG4gICAgdGljazogMFxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFswXSAtIHNlbGYuc3RhclBvaW50WzBdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMV0gLSBzZWxmLnN0YXJQb2ludFsxXVxuICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMF0gPj0gc2VsZi5zdGFyUG9pbnRbMF0pIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICAgIHNlbGYuYWRkID0gc2VsZi5hZGQgKyAxXG4gICAgICAgICAgICBpZiAoc2VsZi5hZGQgPT09IDUpIHtcbiAgICAgICAgICAgICAgc2VsZi5taW4gLS1cbiAgICAgICAgICAgICAgc2VsZi5hZGQgPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuYWRkID0gc2VsZi5hZGQgKyAxXG4gICAgICAgICAgICBpZiAoc2VsZi5hZGQgPT09IDUpIHtcbiAgICAgICAgICAgICAgc2VsZi5taW4gKytcbiAgICAgICAgICAgICAgc2VsZi5hZGQgPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgICAgc2VsZi5hZGQgPSBzZWxmLmFkZCArIDFcbiAgICAgICAgICAgIGlmIChzZWxmLmFkZCA9PT0gNSkge1xuICAgICAgICAgICAgICBzZWxmLm1pbiAtLVxuICAgICAgICAgICAgICBzZWxmLmFkZCA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5hZGQgPSBzZWxmLmFkZCArIDFcbiAgICAgICAgICAgIGlmIChzZWxmLmFkZCA9PT0gNSkge1xuICAgICAgICAgICAgICBzZWxmLm1pbiArK1xuICAgICAgICAgICAgICBzZWxmLmFkZCA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdG91Y2hlbmQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMF0gLSBzZWxmLnN0YXJQb2ludFswXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50WzFdIC0gc2VsZi5zdGFyUG9pbnRbMV1cblxuICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMF0gPj0gc2VsZi5zdGFyUG9pbnRbMF0pIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgc3dpdGNoIChzZWxmLm5vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9nb2xkLnBuZydcbiAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzEnXG4gICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZilcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvdHJlZS5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICcyJ1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICczJ1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZmlyZS5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICc0J1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjMpJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgICBzd2l0Y2ggKHNlbGYubm9kZSkge1xuICAgICAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS90cmVlLnBuZydcbiAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzInXG4gICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3dhdGVyLnBuZydcbiAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzMnXG4gICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9maXJlLnBuZydcbiAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzQnXG4gICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMyknXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3NvaWwucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnNSdcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDIzOCwgOTksIDk5LCAwLjMpJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZmxvb3IoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYudGljayA9IHNlbGYubWluICpzZWNvbmRzUGVyTWluXG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHNlbGYudGljayAtLVxuICAgICAgICBpZiAoc2VsZi50aWNrICE9PSAwKSB7XG4gICAgICAgICAgc2VsZi5taW4gPSBOdW1iZXIoKHNlbGYudGljayAvIHNlY29uZHNQZXJNaW4pLnRvU3RyaW5nKCkuc2xpY2UoMCwgMikpXG4gICAgICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgICAgIG1pbjogTnVtYmVyKChzZWxmLnRpY2sgLyBzZWNvbmRzUGVyTWluKS50b1N0cmluZygpLnNsaWNlKDAsIDIpKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgc2VsZi5zZWMgPSBzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluXG4gICAgICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgICAgIHNlYzogc2VsZi50aWNrICUgc2Vjb25kc1Blck1pblxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coc2VsZi50aWNrLCBzZWxmLm1pbiwgc2VsZi5zZWMpXG4gICAgICB9LCAxMDAwKVxuICAgIH1cblxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+W9kuW/gycsXG4gICAgICBkZXNjOiAn6YO95biC5Zan6Ze5IOS9leWkhOW9kuW/gycsXG4gICAgICBwYXRoOiAnL3BhZ2Uvbm9pc2UnXG4gICAgfVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBzZWxmLnRpY2sgPSBzZWxmLm1pbiAqIHNlY29uZHNQZXJNaW5cbiAgICBzZWxmLndlZWsgPSBkYXRlLmdldFVUQ0RheSgpXG4gICAgc3dpdGNoIChzZWxmLndlZWspIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgc2VsZi53ZWVrZCA9ICdTdW4nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDE6XG4gICAgICAgIHNlbGYud2Vla2QgPSAnTW9uJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzZWxmLndlZWtkID0gJ1R1ZXMnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHNlbGYud2Vla2QgPSAnV2VkJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA0OlxuICAgICAgICBzZWxmLndlZWtkID0gJ1RodXInXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDU6XG4gICAgICAgIHNlbGYud2Vla2QgPSAnRnJpJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA2OlxuICAgICAgICBzZWxmLndlZWtkID0gJ1NhdCdcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgc2VsZi5tb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICAgIHN3aXRjaCAoc2VsZi5tb250aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBzZWxmLm1vbiA9ICdKYW4nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDE6XG4gICAgICAgIHNlbGYubW9uID0gJ0ZlYidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgc2VsZi5tb24gPSAnTWFyJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAzOlxuICAgICAgICBzZWxmLm1vbiA9ICdBcHInXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHNlbGYubW9uID0gJ01heSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgc2VsZi5tb24gPSAnSnVuZSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgc2VsZi5tb24gPSAnSnVseSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNzpcbiAgICAgICAgc2VsZi5tb24gPSAnQXVnJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA4OlxuICAgICAgICBzZWxmLm1vbiA9ICdTZXB0J1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA5OlxuICAgICAgICBzZWxmLm1vbiA9ICdPY3QnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDEwOlxuICAgICAgICBzZWxmLm1vbiA9ICdOb3YnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDExOlxuICAgICAgICBzZWxmLm1vbiA9ICdEZWMnXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICAgIHNlbGYuZGF5ID0gZGF0ZS5nZXREYXRlKClcbiAgICBzZWxmLnllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2VsZi5zaG93SW1nID0gZmFsc2VcbiAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgIHNob3dJbWc6IGZhbHNlXG4gICAgICB9KVxuICAgIH0sIDIwMDApXG4gIH1cbn1cbiJdfQ==