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
      changePoint: 0
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
        if (timer) {
          clearInterval(timer);
        }
        if (self.key === '开始' || self.key === '继续') {
          var _self = this;
          timer = setInterval(function () {
            _self.tick--;
            if (_self.tick === 0) {
              clearInterval(timer);
            }
            console.log(_self.tick);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbInNlY29uZHNQZXJNaW4iLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwidGltZXIiLCJXYXRlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwic3dpdGNoIiwic2hvd0ltZyIsIm1hcmsiLCJzdGFyUG9pbnQiLCJjdXJQb2ludCIsImJnY29sb3IiLCJpbWFnZU5vZGUiLCJ0aWNrIiwia2V5IiwiZGF0ZXMiLCJlbmQiLCJjaGFuZ2VQb2ludCIsIm1ldGhvZHMiLCJ0aW1lQ2hhbmdlIiwic2VsZiIsImUiLCJ0b3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsInhjaGFuZ2UiLCJ5Y2hhbmdlIiwiTWF0aCIsImFicyIsImltYWdlQ2hhbmdlIiwidG91Y2hzdGFydCIsInRvdWNobW92ZSIsInRvdWNoZW5kIiwiZmxvb3IiLCJjbGVhckludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjb25zb2xlIiwibG9nIiwiZmxvb3JFbmQiLCJ0aXRsZSIsImRlc2MiLCJwYXRoIiwiZGF0ZSIsIkRhdGUiLCJ3ZWVrcyIsIndlZWsiLCJnZXRVVENEYXkiLCJ3ZWVrZCIsIm1vbnRoIiwiZ2V0TW9udGgiLCJtb250aHMiLCJtb24iLCJkYXkiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwic2V0VGltZW91dCIsInNldERhdGEiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsZ0JBQWdCLEVBQXRCO0FBQ0EsSUFBTUMsa0JBQWtCLENBQXhCO0FBQ0EsSUFBTUMsbUJBQW1CLENBQXpCO0FBQ0EsSUFBSUMsUUFBUSxJQUFaOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGNBQVEsSUFESDtBQUVMQyxlQUFTLElBRko7QUFHTEMsWUFBTSxvQkFIRDtB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QW9DLE1BQXBDLEVBQTRDLE1BQTVDLEVBQW9ELEtBQXBELEVBQTJELE1BQTNELEVBQW1FLEtBQW5FLEVBQTBFLEtBQTFFLEVBQWlGLEtBQWpGLENBQWY7QUFDQSxVQUFNQyxNQUFNRCxPQUFPRixLQUFQLENBQVo7QUFDQSxVQUFNSSxNQUFNVixLQUFLVyxPQUFMLEVBQVo7QUFDQSxVQUFNQyxPQUFPWixLQUFLYSxXQUFMLEVBQWI7QUFDQW5DLFdBQUtMLEtBQUwsR0FBYW9DLE1BQU0sR0FBTixHQUFZQyxHQUFaLEdBQWtCLEdBQWxCLEdBQXdCTCxLQUF4QixHQUFnQyxHQUFoQyxHQUFzQ08sSUFBbkQ7QUFDQWxDLFdBQUtQLElBQUwsR0FBWSxLQUFLZixhQUFqQjtBQUNBMEQsaUJBQVcsWUFBTTtBQUNmcEMsYUFBS2IsT0FBTCxHQUFlLEtBQWY7QUFDQWEsYUFBS3FDLE9BQUwsQ0FBYTtBQUNYbEQsbUJBQVM7QUFERSxTQUFiO0FBR0QsT0FMRCxFQUtHLElBTEg7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7OztFQWxPZ0MsZUFBS21ELEk7O2tCQUFuQnhELEsiLCJmaWxlIjoibm9pc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmNvbnN0IHNlY29uZHNQZXJNaW4gPSA2MFxuY29uc3QgY2hhbmdlVGltZVBvaW50ID0gNVxuY29uc3QgY2hhbmdlSW1hZ2VQb2ludCA9IDNcbmxldCB0aW1lciA9IG51bGxcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F0ZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W9kuW/gydcbiAgfVxuICBkYXRhID0ge1xuICAgIHN3aXRjaDogdHJ1ZSxcbiAgICBzaG93SW1nOiB0cnVlLFxuICAgIG1hcms6ICcuLi9pbWFnZS93YXRlci5wbmcnLFxuICAgIHN0YXJQb2ludDogWzAsIDBdLFxuICAgIGN1clBvaW50OiBbMCwgMF0sXG4gICAgYmdjb2xvcjogJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknLFxuICAgIGltYWdlTm9kZTogJzMnLFxuICAgIHRpY2s6IDAsXG4gICAga2V5OiAn5byA5aeLJyxcbiAgICBkYXRlczogJycsXG4gICAgZW5kOiAn57uT5p2fJyxcbiAgICBjaGFuZ2VQb2ludDogMFxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgdGltZUNoYW5nZShzZWxmLCBlKSB7XG4gICAgICBzZWxmLmN1clBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50WzBdIC0gc2VsZi5zdGFyUG9pbnRbMF1cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFsxXSAtIHNlbGYuc3RhclBvaW50WzFdXG4gICAgICBpZiAoc2VsZi5jdXJQb2ludFswXSA+PSBzZWxmLnN0YXJQb2ludFswXSkge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgICAgaWYgKChzZWxmLnRpY2sgLyA2MCkgPiAwKSB7XG4gICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSBzZWxmLmNoYW5nZVBvaW50ICsgMVxuICAgICAgICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA9PT0gY2hhbmdlVGltZVBvaW50KSB7XG4gICAgICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrIC0gNjBcbiAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgoc2VsZi50aWNrIC8gNjApIDwgNjApIHtcbiAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IHNlbGYuY2hhbmdlUG9pbnQgKyAxXG4gICAgICAgICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID09PSBjaGFuZ2VUaW1lUG9pbnQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgKyA2MFxuICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgICBpZiAoKHNlbGYudGljayAvIDYwKSA+IDApIHtcbiAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IHNlbGYuY2hhbmdlUG9pbnQgKyAxXG4gICAgICAgICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID09PSBjaGFuZ2VUaW1lUG9pbnQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgLSA2MFxuICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKChzZWxmLnRpY2sgLyA2MCkgPCA2MCkge1xuICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gc2VsZi5jaGFuZ2VQb2ludCArIDFcbiAgICAgICAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPT09IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayArIDYwXG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBpbWFnZUNoYW5nZShzZWxmLCBlKSB7XG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMF0gLSBzZWxmLnN0YXJQb2ludFswXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50WzFdIC0gc2VsZi5zdGFyUG9pbnRbMV1cblxuICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMF0gPj0gc2VsZi5zdGFyUG9pbnRbMF0pIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IHNlbGYuY2hhbmdlUG9pbnQgKyAxXG4gICAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPT09IGNoYW5nZUltYWdlUG9pbnQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2dvbGQucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJzEnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS90cmVlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9ICcyJ1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3dhdGVyLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9ICczJ1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9maXJlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9ICc0J1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSBzZWxmLmNoYW5nZVBvaW50ICsgMVxuICAgICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID09PSBjaGFuZ2VJbWFnZVBvaW50KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS90cmVlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9ICcyJ1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3dhdGVyLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9ICczJ1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9maXJlLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9ICc0J1xuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3NvaWwucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJzUnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDIzOCwgOTksIDk5LCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRvdWNoc3RhcnQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLnN0YXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICB9LFxuICAgIHRvdWNobW92ZShlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGlmIChzZWxmLnN3aXRjaCkge1xuICAgICAgICBzZWxmLm1ldGhvZHMudGltZUNoYW5nZShzZWxmLCBlKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB0b3VjaGVuZChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGlmIChzZWxmLnN3aXRjaCkge1xuICAgICAgICBzZWxmLm1ldGhvZHMuaW1hZ2VDaGFuZ2Uoc2VsZiwgZSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZmxvb3IoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGlmICh0aW1lcikge1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgfVxuICAgICAgaWYgKHNlbGYua2V5ID09PSAn5byA5aeLJyB8fCBzZWxmLmtleSA9PT0gJ+e7p+e7rScpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIHNlbGYudGljay0tXG4gICAgICAgICAgaWYgKHNlbGYudGljayA9PT0gMCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coc2VsZi50aWNrKVxuICAgICAgICB9LCAxMDAwKVxuICAgICAgICBzZWxmLmtleSA9ICfmmoLlgZwnXG4gICAgICAgIHNlbGYuc3dpdGNoID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYua2V5ID0gJ+e7p+e7rSdcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgIH1cbiAgICB9LFxuICAgIGZsb29yRW5kKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgc2VsZi5rZXkgPSAn5byA5aeLJ1xuICAgICAgc2VsZi5zd2l0Y2ggPSB0cnVlXG4gICAgICBzZWxmLnRpY2sgPSAyMCAqIHNlY29uZHNQZXJNaW5cbiAgICAgIGNvbnNvbGUubG9nKHNlbGYuc3dpdGNoKVxuICAgIH1cbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICflvZLlv4MnLFxuICAgICAgZGVzYzogJ+mDveW4guWWp+mXuSDkvZXlpITlvZLlv4MnLFxuICAgICAgcGF0aDogJy9wYWdlL25vaXNlJ1xuICAgIH1cbiAgfVxuXG4gIG9uTG9hZCgpIHtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBjb25zdCB3ZWVrcyA9IFsnU3VuJywgJ01vbicsICdUdWVzJywgJ1dlZCcsICdUaHVyJywgJ0ZyaScsICdTYXQnXVxuICAgIGNvbnN0IHdlZWsgPSBkYXRlLmdldFVUQ0RheSgpXG4gICAgY29uc3Qgd2Vla2QgPSB3ZWVrc1t3ZWVrXVxuICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpXG4gICAgY29uc3QgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWcnLCAnU2VwdCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgY29uc3QgbW9uID0gbW9udGhzW21vbnRoXVxuICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpXG4gICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICAgIHNlbGYuZGF0ZXMgPSBtb24gKyAnICcgKyBkYXkgKyAnICcgKyB3ZWVrZCArICcgJyArIHllYXJcbiAgICBzZWxmLnRpY2sgPSAyMCAqIHNlY29uZHNQZXJNaW5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlbGYuc2hvd0ltZyA9IGZhbHNlXG4gICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICBzaG93SW1nOiBmYWxzZVxuICAgICAgfSlcbiAgICB9LCAyMDAwKVxuICAgIC8vIHdlcHkucmVxdWVzdCh7XG4gICAgLy8gICB1cmw6ICdodHRwOi8vMTI3LjAuMC4xOjcwMDEvdm9pY2UvbGlzdCcsXG4gICAgLy8gICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2cocmVzKVxuICAgIC8vICAgfVxuICAgIC8vIH0pXG4gIH1cbn1cbiJdfQ==