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
      switch: true,
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
        if (self.switch) {
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
        }
      },
      touchend: function touchend(e) {
        var self = this;
        if (self.switch) {
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
          _self.switch = false;
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
        self.switch = true;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbInNlY29uZHNQZXJNaW4iLCJ0aW1lciIsIldhdGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJzd2l0Y2giLCJzaG93SW1nIiwibWFyayIsInN0YXJQb2ludCIsImN1clBvaW50IiwiYmdjb2xvciIsIm5vZGUiLCJtb250aCIsIm1vbiIsImRheSIsIndlZWsiLCJ3ZWVrZCIsInllYXIiLCJtaW4iLCJzZWMiLCJhZGQiLCJ0aWNrIiwia2V5IiwiRW5kIiwibWV0aG9kcyIsInRvdWNoc3RhcnQiLCJlIiwic2VsZiIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwidG91Y2htb3ZlIiwieGNoYW5nZSIsInljaGFuZ2UiLCJNYXRoIiwiYWJzIiwidG9TdHJpbmciLCJ0b3VjaGVuZCIsImZsb29yIiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwiY29uc29sZSIsImxvZyIsIm1pbnV0ZXMiLCJzZXREYXRhIiwic2Vjb25kIiwiZmxvb3JFbmQiLCJ0aXRsZSIsImRlc2MiLCJwYXRoIiwiZGF0ZSIsIkRhdGUiLCJ3ZWVrcyIsImdldFVUQ0RheSIsImdldE1vbnRoIiwibW9udGhzIiwiZ2V0RGF0ZSIsImdldEZ1bGxZZWFyIiwic2V0VGltZW91dCIsInJlcXVlc3QiLCJ1cmwiLCJzdWNjZXNzIiwicmVzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGdCQUFnQixFQUF0QjtBQUNBLElBQUlDLFFBQVEsSUFBWjs7SUFFcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxjQUFRLElBREg7QUFFTEMsZUFBUyxJQUZKO0FBR0xDLFlBQU0sb0JBSEQ7QUFJTEMsaUJBQVcsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUpOO0FBS0xDLGdCQUFVLENBQUMsQ0FBRCxF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S3FELE9BQUwsQ0FBYTtBQUNYQyxhQUFLLGtDQURNO0FBRVhDLGlCQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEJyQixrQkFBUUMsR0FBUixDQUFZb0IsR0FBWjtBQUNEO0FBSlUsT0FBYjtBQU1EOzs7O0VBMVFnQyxlQUFLQyxJOztrQkFBbkI5RCxLIiwiZmlsZSI6Im5vaXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG5jb25zdCBzZWNvbmRzUGVyTWluID0gNjBcbmxldCB0aW1lciA9IG51bGxcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F0ZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W9kuW/gydcbiAgfVxuICBkYXRhID0ge1xuICAgIHN3aXRjaDogdHJ1ZSxcbiAgICBzaG93SW1nOiB0cnVlLFxuICAgIG1hcms6ICcuLi9pbWFnZS93YXRlci5wbmcnLFxuICAgIHN0YXJQb2ludDogWzAsIDBdLFxuICAgIGN1clBvaW50OiBbMCwgMF0sXG4gICAgYmdjb2xvcjogJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknLFxuICAgIG5vZGU6ICczJyxcbiAgICBtb250aDogJycsXG4gICAgbW9uOiAnJyxcbiAgICBkYXk6ICcnLFxuICAgIHdlZWs6ICcnLFxuICAgIHdlZWtkOiAnJyxcbiAgICB5ZWFyOiAnJyxcbiAgICBtaW46IDIwLFxuICAgIHNlYzogJzAwJyxcbiAgICBhZGQ6IDAsXG4gICAgdGljazogMCxcbiAgICBrZXk6ICflvIDlp4snLFxuICAgIEVuZDogJ+e7k+adnydcbiAgfVxuICBtZXRob2RzID0ge1xuXG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYgKHNlbGYuc3dpdGNoKSB7XG4gICAgICAgIHNlbGYuY3VyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFswXSAtIHNlbGYuc3RhclBvaW50WzBdXG4gICAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFsxXSAtIHNlbGYuc3RhclBvaW50WzFdXG4gICAgICAgIGlmIChzZWxmLmN1clBvaW50WzBdID49IHNlbGYuc3RhclBvaW50WzBdKSB7XG4gICAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgICAgIGlmIChzZWxmLm1pbiA9PT0gJ+KInicpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm1pbiA9IDYwXG4gICAgICAgICAgICAgICAgc2VsZi5zZWMgPSAnMDAnXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYubWluID4gMCkge1xuICAgICAgICAgICAgICAgICAgc2VsZi5hZGQgPSBzZWxmLmFkZCArIDFcbiAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmFkZCA9PT0gNSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm1pbi0tXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYWRkID0gMFxuICAgICAgICAgICAgICAgICAgICBzZWxmLm1pbiA9IHNlbGYubWluIDwgMTAgPyAnMCcgKyBzZWxmLm1pbi50b1N0cmluZygpIDogc2VsZi5taW5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi5taW4gKiBzZWNvbmRzUGVyTWluICsgc2VsZi5zZWMgKiAxXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHNlbGYubWluID0gJzAwJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKHNlbGYubWluIDwgNjApIHtcbiAgICAgICAgICAgICAgICBzZWxmLmFkZCA9IHNlbGYuYWRkICsgMVxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmFkZCA9PT0gNSkge1xuICAgICAgICAgICAgICAgICAgc2VsZi5taW4rK1xuICAgICAgICAgICAgICAgICAgc2VsZi5hZGQgPSAwXG4gICAgICAgICAgICAgICAgICBzZWxmLm1pbiA9IHNlbGYubWluIDwgMTAgPyAnMCcgKyBzZWxmLm1pbi50b1N0cmluZygpIDogc2VsZi5taW5cbiAgICAgICAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYubWluICogc2Vjb25kc1Blck1pbiArIHNlbGYuc2VjICogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLm1pbiA9ICfiiJ4nXG4gICAgICAgICAgICAgICAgc2VsZi5zZWMgPSAn4oieJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgICAgICBpZiAoc2VsZi5taW4gPT09ICfiiJ4nKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5taW4gPSA2MFxuICAgICAgICAgICAgICAgIHNlbGYuc2VjID0gJzAwJ1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLm1pbiA+IDApIHtcbiAgICAgICAgICAgICAgICAgIHNlbGYuYWRkID0gc2VsZi5hZGQgKyAxXG4gICAgICAgICAgICAgICAgICBpZiAoc2VsZi5hZGQgPT09IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5taW4tLVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmFkZCA9IDBcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5taW4gPSBzZWxmLm1pbiA8IDEwID8gJzAnICsgc2VsZi5taW4udG9TdHJpbmcoKSA6IHNlbGYubWluXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYubWluICogc2Vjb25kc1Blck1pbiArIHNlbGYuc2VjICogMVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBzZWxmLm1pbiA9ICcwMCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChzZWxmLm1pbiA8IDYwKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGQgPSBzZWxmLmFkZCArIDFcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5hZGQgPT09IDUpIHtcbiAgICAgICAgICAgICAgICAgIHNlbGYubWluKytcbiAgICAgICAgICAgICAgICAgIHNlbGYuYWRkID0gMFxuICAgICAgICAgICAgICAgICAgc2VsZi5taW4gPSBzZWxmLm1pbiA8IDEwID8gJzAnICsgc2VsZi5taW4udG9TdHJpbmcoKSA6IHNlbGYubWluXG4gICAgICAgICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLm1pbiAqIHNlY29uZHNQZXJNaW4gKyBzZWxmLnNlYyAqIDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5taW4gPSAn4oieJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRvdWNoZW5kKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYgKHNlbGYuc3dpdGNoKSB7XG4gICAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFswXSAtIHNlbGYuc3RhclBvaW50WzBdXG4gICAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFsxXSAtIHNlbGYuc3RhclBvaW50WzFdXG5cbiAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMF0gPj0gc2VsZi5zdGFyUG9pbnRbMF0pIHtcbiAgICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgICAgIHNlbGYuYWRkID0gc2VsZi5hZGQgKyAxXG4gICAgICAgICAgICBpZiAoc2VsZi5hZGQgPT09IDQpIHtcbiAgICAgICAgICAgICAgc3dpdGNoIChzZWxmLm5vZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZ29sZC5wbmcnXG4gICAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMSdcbiAgICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvdHJlZS5wbmcnXG4gICAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMidcbiAgICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgJzQnOlxuICAgICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3dhdGVyLnBuZydcbiAgICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9ICczJ1xuICAgICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzQnXG4gICAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZWxmLmFkZCA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICAgICAgc2VsZi5hZGQgPSBzZWxmLmFkZCArIDFcbiAgICAgICAgICAgIGlmIChzZWxmLmFkZCA9PT0gNCkge1xuICAgICAgICAgICAgICBzd2l0Y2ggKHNlbGYubm9kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzInXG4gICAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMydcbiAgICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJ1xuICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9maXJlLnBuZydcbiAgICAgICAgICAgICAgICAgIHNlbGYubm9kZSA9ICc0J1xuICAgICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvc29pbC5wbmcnXG4gICAgICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnNSdcbiAgICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyMzgsIDk5LCA5OSwgMC4zKSdcbiAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNlbGYuYWRkID0gMFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZmxvb3IoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGlmICh0aW1lcikge1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgfVxuICAgICAgaWYgKHNlbGYua2V5ID09PSAn5byA5aeLJyB8fCBzZWxmLmtleSA9PT0gJ+e7p+e7rScpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIHNlbGYudGljay0tXG4gICAgICAgICAgY29uc29sZS5sb2coc2VsZi5kYXRhLnRpY2spXG4gICAgICAgICAgaWYgKHNlbGYudGljayAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VsZi50aWNrIC8gc2Vjb25kc1Blck1pbikpXG4gICAgICAgICAgICBzZWxmLm1pbiA9IG1pbnV0ZXMgPCAxMCA/ICcwJyArIG1pbnV0ZXMudG9TdHJpbmcoKSA6IG1pbnV0ZXNcbiAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIG1pbjogc2VsZi5taW5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBsZXQgc2Vjb25kID0gc2VsZi50aWNrICUgc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5zZWMgPSBzZWNvbmQgPCAxMCA/ICcwJyArIHNlY29uZC50b1N0cmluZygpIDogc2Vjb25kXG4gICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgICBzZWM6IHNlbGYuc2VjXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnRpY2ssIHNlbGYubWluLCBzZWxmLnNlYylcbiAgICAgICAgfSwgMTAwMClcbiAgICAgICAgc2VsZi5rZXkgPSAn5pqC5YGcJ1xuICAgICAgICBzZWxmLnN3aXRjaCA9IGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLmtleSA9ICfnu6fnu60nXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICB9XG4gICAgfSxcbiAgICBmbG9vckVuZCgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgIHNlbGYubWluID0gJzIwJ1xuICAgICAgc2VsZi5zZWMgPSAnMDAnXG4gICAgICBzZWxmLmtleSA9ICflvIDlp4snXG4gICAgICBzZWxmLnN3aXRjaCA9IHRydWVcbiAgICAgIGNvbnNvbGUubG9nKHNlbGYuc3dpdGNoKVxuICAgIH1cbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICflvZLlv4MnLFxuICAgICAgZGVzYzogJ+mDveW4guWWp+mXuSDkvZXlpITlvZLlv4MnLFxuICAgICAgcGF0aDogJy9wYWdlL25vaXNlJ1xuICAgIH1cbiAgfVxuXG4gIG9uTG9hZCgpIHtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBzZWxmLnRpY2sgPSBzZWxmLm1pbiAqIHNlY29uZHNQZXJNaW5cbiAgICBjb25zdCB3ZWVrcyA9IFsnU3VuJywgJ01vbicsICdUdWVzJywgJ1dlZCcsICdUaHVyJywgJ0ZyaScsICdTYXQnXVxuICAgIHNlbGYud2VlayA9IGRhdGUuZ2V0VVRDRGF5KClcbiAgICBzZWxmLndlZWtkID0gd2Vla3Nbc2VsZi53ZWVrXVxuICAgIHNlbGYubW9udGggPSBkYXRlLmdldE1vbnRoKClcbiAgICBjb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1ZycsICdTZXB0JywgJ09jdCcsICdOb3YnLCAnRGVjJ11cbiAgICBzZWxmLm1vbiA9IG1vbnRoc1tzZWxmLm1vbnRoXVxuICAgIHNlbGYuZGF5ID0gZGF0ZS5nZXREYXRlKClcbiAgICBzZWxmLnllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2VsZi5zaG93SW1nID0gZmFsc2VcbiAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgIHNob3dJbWc6IGZhbHNlXG4gICAgICB9KVxuICAgIH0sIDIwMDApXG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJ2h0dHA6Ly8xMjcuMC4wLjE6NzAwMS92b2ljZS9saXN0JyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==