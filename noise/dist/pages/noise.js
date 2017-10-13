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
      sec: '00',
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
        var timer = setInterval(function () {
          self.tick--;
          if (self.tick !== -1) {
            var minutes = Number((self.tick / secondsPerMin).toString().slice(0, 2));
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbInNlY29uZHNQZXJNaW4iLCJXYXRlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwic2hvd0ltZyIsIm1hcmsiLCJzdGFyUG9pbnQiLCJjdXJQb2ludCIsImJnY29sb3IiLCJub2RlIiwibW9udGgiLCJtb24iLCJkYXkiLCJ3ZWVrIiwid2Vla2QiLCJ5ZWFyIiwibWluIiwic2VjIiwiYWRkIiwidGljayIsIm1ldGhvZHMiLCJ0b3VjaHN0YXJ0IiwiZSIsInNlbGYiLCJ0b3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsInRvdWNobW92ZSIsInhjaGFuZ2UiLCJ5Y2hhbmdlIiwiTWF0aCIsImFicyIsInRvU3RyaW5nIiwidG91Y2hlbmQiLCJjb25zb2xlIiwibG9nIiwiZmxvb3IiLCJ0aW1lciIsInNldEludGVydmFsIiwibWludXRlcyIsIk51bWJlciIsInNsaWNlIiwic2V0RGF0YSIsInNlY29uZCIsImNsZWFySW50ZXJ2YWwiLCJ0aXRsZSIsImRlc2MiLCJwYXRoIiwiZGF0ZSIsIkRhdGUiLCJnZXRVVENEYXkiLCJnZXRNb250aCIsImdldERhdGUiLCJnZXRGdWxsWWVhciIsInNldFRpbWVvdXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsZ0JBQWdCLEVBQXRCOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGVBQVMsSUFESjtBQUVMQyxZQUFNLG9CQUZEO0FBR0xDLGlCQUFXLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FITjtBQUlMQyxnQkFBVSxDQUFDLENBQUQsRUFBSSxDQUFKLENBSkw7QUFLTEMsZUFBUyx3QkFMSjtBQU1MQyxZQUFNLEdBTkQ7QUFPTEMsYUFBTyxFQVBGO0FBUUxDLFdBQUssRUFSQTtBQVNMQyxXQUFLLEVBVEE7QUFVTEMs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LGVBQUtaLEdBQUwsR0FBVyxLQUFYO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDRVksZUFBS1osR0FBTCxHQUFXLE1BQVg7QUFDQTtBQUNGLGFBQUssQ0FBTDtBQUNFWSxlQUFLWixHQUFMLEdBQVcsTUFBWDtBQUNBO0FBQ0YsYUFBSyxDQUFMO0FBQ0VZLGVBQUtaLEdBQUwsR0FBVyxLQUFYO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDRVksZUFBS1osR0FBTCxHQUFXLE1BQVg7QUFDQTtBQUNGLGFBQUssQ0FBTDtBQUNFWSxlQUFLWixHQUFMLEdBQVcsS0FBWDtBQUNBO0FBQ0YsYUFBSyxFQUFMO0FBQ0VZLGVBQUtaLEdBQUwsR0FBVyxLQUFYO0FBQ0E7QUFDRixhQUFLLEVBQUw7QUFDRVksZUFBS1osR0FBTCxHQUFXLEtBQVg7QUFDQTtBQXBDSjtBQXNDQVksV0FBS1gsR0FBTCxHQUFXb0MsS0FBS0ksT0FBTCxFQUFYO0FBQ0E3QixXQUFLUixJQUFMLEdBQVlpQyxLQUFLSyxXQUFMLEVBQVo7O0FBRUFDLGlCQUFXLFlBQU07QUFDZi9CLGFBQUtuQixPQUFMLEdBQWUsS0FBZjtBQUNBbUIsYUFBS21CLE9BQUwsQ0FBYTtBQUNYdEMsbUJBQVM7QUFERSxTQUFiO0FBR0QsT0FMRCxFQUtHLElBTEg7QUFNRDs7OztFQTNQZ0MsZUFBS21ELEk7O2tCQUFuQnZELEsiLCJmaWxlIjoibm9pc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmNvbnN0IHNlY29uZHNQZXJNaW4gPSA2MFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5b2S5b+DJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgc2hvd0ltZzogdHJ1ZSxcbiAgICBtYXJrOiAnLi4vaW1hZ2Uvd2F0ZXIucG5nJyxcbiAgICBzdGFyUG9pbnQ6IFswLCAwXSxcbiAgICBjdXJQb2ludDogWzAsIDBdLFxuICAgIGJnY29sb3I6ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJyxcbiAgICBub2RlOiAnMycsXG4gICAgbW9udGg6ICcnLFxuICAgIG1vbjogJycsXG4gICAgZGF5OiAnJyxcbiAgICB3ZWVrOiAnJyxcbiAgICB3ZWVrZDogJycsXG4gICAgeWVhcjogJycsXG4gICAgbWluOiAyMCxcbiAgICBzZWM6ICcwMCcsXG4gICAgYWRkOiAwLFxuICAgIHRpY2s6IDBcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHRvdWNoc3RhcnQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLnN0YXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICB9LFxuICAgIHRvdWNobW92ZShlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuY3VyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMF0gLSBzZWxmLnN0YXJQb2ludFswXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50WzFdIC0gc2VsZi5zdGFyUG9pbnRbMV1cbiAgICAgIGlmIChzZWxmLmN1clBvaW50WzBdID49IHNlbGYuc3RhclBvaW50WzBdKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgICBzZWxmLmFkZCA9IHNlbGYuYWRkICsgMVxuICAgICAgICAgICAgaWYgKHNlbGYuYWRkID09PSA1KSB7XG4gICAgICAgICAgICAgIHNlbGYubWluIC0tIFxuICAgICAgICAgICAgICBzZWxmLmFkZCA9IDBcbiAgICAgICAgICAgICAgc2VsZi5taW4gPSBzZWxmLm1pbiA8IDEwID8gJzAnICsgc2VsZi5taW4udG9TdHJpbmcoKSA6IHNlbGYubWluXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuYWRkID0gc2VsZi5hZGQgKyAxXG4gICAgICAgICAgICBpZiAoc2VsZi5hZGQgPT09IDUpIHtcbiAgICAgICAgICAgICAgc2VsZi5taW4gKytcbiAgICAgICAgICAgICAgc2VsZi5hZGQgPSAwXG4gICAgICAgICAgICAgIHNlbGYubWluID0gc2VsZi5taW4gPCAxMCA/ICcwJyArIHNlbGYubWluLnRvU3RyaW5nKCkgOiBzZWxmLm1pblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICAgIHNlbGYuYWRkID0gc2VsZi5hZGQgKyAxXG4gICAgICAgICAgICBpZiAoc2VsZi5hZGQgPT09IDUpIHtcbiAgICAgICAgICAgICAgc2VsZi5taW4gLS1cbiAgICAgICAgICAgICAgc2VsZi5hZGQgPSAwXG4gICAgICAgICAgICAgIHNlbGYubWluID0gc2VsZi5taW4gPCAxMCA/ICcwJyArIHNlbGYubWluLnRvU3RyaW5nKCkgOiBzZWxmLm1pblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmFkZCA9IHNlbGYuYWRkICsgMVxuICAgICAgICAgICAgaWYgKHNlbGYuYWRkID09PSA1KSB7XG4gICAgICAgICAgICAgIHNlbGYubWluICsrXG4gICAgICAgICAgICAgIHNlbGYuYWRkID0gMFxuICAgICAgICAgICAgICBzZWxmLm1pbiA9IHNlbGYubWluIDwgMTAgPyAnMCcgKyBzZWxmLm1pbi50b1N0cmluZygpIDogc2VsZi5taW5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdG91Y2hlbmQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMF0gLSBzZWxmLnN0YXJQb2ludFswXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50WzFdIC0gc2VsZi5zdGFyUG9pbnRbMV1cblxuICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMF0gPj0gc2VsZi5zdGFyUG9pbnRbMF0pIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgc3dpdGNoIChzZWxmLm5vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9nb2xkLnBuZydcbiAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzEnXG4gICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZilcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvdHJlZS5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICcyJ1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICczJ1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZmlyZS5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICc0J1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjMpJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgICBzd2l0Y2ggKHNlbGYubm9kZSkge1xuICAgICAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS90cmVlLnBuZydcbiAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzInXG4gICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3dhdGVyLnBuZydcbiAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzMnXG4gICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9maXJlLnBuZydcbiAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzQnXG4gICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMyknXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3NvaWwucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnNSdcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDIzOCwgOTksIDk5LCAwLjMpJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZmxvb3IoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYudGljayA9IHNlbGYubWluICogc2Vjb25kc1Blck1pblxuICAgICAgbGV0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBzZWxmLnRpY2sgLS1cbiAgICAgICAgaWYgKHNlbGYudGljayAhPT0gLTEpIHtcbiAgICAgICAgICBsZXQgbWludXRlcyA9IE51bWJlcigoc2VsZi50aWNrIC8gc2Vjb25kc1Blck1pbikudG9TdHJpbmcoKS5zbGljZSgwLCAyKSlcbiAgICAgICAgICBzZWxmLm1pbiA9IG1pbnV0ZXMgPCAxMCA/ICcwJyArIG1pbnV0ZXMudG9TdHJpbmcoKSA6IG1pbnV0ZXNcbiAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgbWluOiBzZWxmLm1pblxuICAgICAgICAgIH0pXG4gICAgICAgICAgbGV0IHNlY29uZCA9IHNlbGYudGljayAlIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICBzZWxmLnNlYyA9IHNlY29uZCA8IDEwID8gJzAnICsgc2Vjb25kLnRvU3RyaW5nKCkgOiBzZWNvbmRcbiAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgc2VjOiBzZWxmLnNlY1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnRpY2ssIHNlbGYubWluLCBzZWxmLnNlYylcbiAgICAgIH0sIDEwMDApXG4gICAgfVxuXG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5b2S5b+DJyxcbiAgICAgIGRlc2M6ICfpg73luILllqfpl7kg5L2V5aSE5b2S5b+DJyxcbiAgICAgIHBhdGg6ICcvcGFnZS9ub2lzZSdcbiAgICB9XG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIHNlbGYudGljayA9IHNlbGYubWluICogc2Vjb25kc1Blck1pblxuICAgIHNlbGYud2VlayA9IGRhdGUuZ2V0VVRDRGF5KClcbiAgICBzd2l0Y2ggKHNlbGYud2Vlaykge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBzZWxmLndlZWtkID0gJ1N1bidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgc2VsZi53ZWVrZCA9ICdNb24nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDI6XG4gICAgICAgIHNlbGYud2Vla2QgPSAnVHVlcydcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgc2VsZi53ZWVrZCA9ICdXZWQnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHNlbGYud2Vla2QgPSAnVGh1cidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgc2VsZi53ZWVrZCA9ICdGcmknXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDY6XG4gICAgICAgIHNlbGYud2Vla2QgPSAnU2F0J1xuICAgICAgICBicmVha1xuICAgIH1cbiAgICBzZWxmLm1vbnRoID0gZGF0ZS5nZXRNb250aCgpXG4gICAgc3dpdGNoIChzZWxmLm1vbnRoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHNlbGYubW9uID0gJ0phbidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgc2VsZi5tb24gPSAnRmViJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzZWxmLm1vbiA9ICdNYXInXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHNlbGYubW9uID0gJ0FwcidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgc2VsZi5tb24gPSAnTWF5J1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA1OlxuICAgICAgICBzZWxmLm1vbiA9ICdKdW5lJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA2OlxuICAgICAgICBzZWxmLm1vbiA9ICdKdWx5J1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA3OlxuICAgICAgICBzZWxmLm1vbiA9ICdBdWcnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDg6XG4gICAgICAgIHNlbGYubW9uID0gJ1NlcHQnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDk6XG4gICAgICAgIHNlbGYubW9uID0gJ09jdCdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMTA6XG4gICAgICAgIHNlbGYubW9uID0gJ05vdidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMTE6XG4gICAgICAgIHNlbGYubW9uID0gJ0RlYydcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgc2VsZi5kYXkgPSBkYXRlLmdldERhdGUoKVxuICAgIHNlbGYueWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLnNob3dJbWcgPSBmYWxzZVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgc2hvd0ltZzogZmFsc2VcbiAgICAgIH0pXG4gICAgfSwgMjAwMClcbiAgfVxufVxuIl19