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

var initialTimeText = '20 : 00';
var initialTime = 20;
var secondsPerMin = 60;
var timeUplimit = 60;
var timeLowlimit = 0;
var ksStart = 0;
var ksPause = 1;
var ksContinue = 2;
var xPos = 0;
var yPos = 1;
var changeTimePoint = 5;

var _timer = void 0;

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '归心'
    }, _this.data = {
      mark: '../image/water.png',
      dates: '',
      showImge: false,
      tick: 0,
      time: '',
      key: ksStart,
      kStatus: ['开始', '暂停', '继续'],
      endKey: '结束',
      touchmove: true,
      changePoint: 0
    }, _this.methods = {
      date: function date(self) {
        var date = new Date();
        var weeks = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
        var week = date.getUTCDay();
        var weekd = weeks[week];
        var month = date.getMonth();
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        var mon = months[month];
        var day = date.getDate();
        var year = date.getFullYear();
        self.dates = mon + ' ' + day + ' ' + weekd + ' ' + year;
      },

      // 判断是否开启计时器
      time: function time() {
        var self = this;
        var min = (self.tick - self.tick % secondsPerMin) / secondsPerMin;
        if (min > timeLowlimit && min <= timeUplimit) {
          self.methods.timer(self);
        }
      },

      // 计时器
      timer: function timer(self) {
        self.touchmove = false;
        if (self.key === ksStart || self.key === ksContinue) {
          _timer = setInterval(function () {
            self.tick--;
            self.methods.setTime(self, self.tick);
            if (self.tick === timeLowlimit) {
              clearInterval(_timer);
            }
          }, 1000);
          self.key = ksPause;
        } else {
          self.methods.setTime(self, self.tick);
          clearInterval(_timer);
          self.key = ksContinue;
        }
      },

      // 刷新时间
      setTime: function setTime(self, tick) {
        console.log(self);
        var currentTime = self.methods.currentTime(self.tick);
        self.setData({
          time: currentTime
        });
        self.time = currentTime;
      },
      timerEnd: function timerEnd() {
        var self = this;
        console.log(self);
        clearInterval(_timer);
        self.key = ksStart;
        self.tick = initialTime * secondsPerMin;
        self.time = initialTimeText;
        self.touchmove = true;
      },

      // 计算时间及输出格式
      currentTime: function currentTime(tick) {
        var min = (tick - tick % secondsPerMin) / secondsPerMin;
        var sec = tick % secondsPerMin;
        if (min > timeUplimit) {
          return '∞';
        } else {
          if (min < 10) {
            min = '0' + min;
          }
          if (sec < 10) {
            sec = '0' + sec;
          }
          return min + ':' + sec;
        }
      },
      touchstart: function touchstart(e) {
        console.log('star');
        var self = this;
        self.starPoint = [e.touches[0].pageX, e.touches[0].pageY];
      },
      touchmove: function touchmove(e) {
        console.log('move');
        var self = this;
        self.curPoint = [e.touches[0].pageX, e.touches[0].pageY];
        if (self.touchmove) {
          self.methods.timeChange(self);
        }
      },
      touchend: function touchend(e) {
        console.log('end');
        var self = this;
        if (self.touchmove) {}
      },
      timeChange: function timeChange(self) {
        var xchange = self.curPoint[xPos] - self.starPoint[xPos];
        var ychange = self.curPoint[yPos] - self.starPoint[yPos];
        if (Math.abs(xchange) < Math.abs(ychange)) {
          self.changePoint++;
          console.log(self.changePoint);
          if (self.changePoint > changeTimePoint) {
            if (self.curPoint[yPos] > self.starPoint[yPos] && self.tick > 0) {
              self.tick = self.tick - secondsPerMin;
              self.methods.setTime(self, self.tick);
              self.changePoint = 0;
            }
            if (self.curPoint[yPos] < self.starPoint[yPos]) {
              self.tick = self.tick + secondsPerMin;
              self.methods.setTime(self, self.tick);
              self.changePoint = 0;
            }
          }
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
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
      var self = this;
      self.methods.date(self);
      setTimeout(function () {
        self.showImge = false;
        self.setData({
          showImge: false
        });
      }, 2000);
      self.time = initialTimeText;
      self.tick = initialTime * secondsPerMin;
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/newnoise'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld25vaXNlLmpzIl0sIm5hbWVzIjpbImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxUaW1lIiwic2Vjb25kc1Blck1pbiIsInRpbWVVcGxpbWl0IiwidGltZUxvd2xpbWl0Iiwia3NTdGFydCIsImtzUGF1c2UiLCJrc0NvbnRpbnVlIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJ0aW1lciIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtYXJrIiwiZGF0ZXMiLCJzaG93SW1nZSIsInRpY2siLCJ0aW1lIiwia2V5Iiwia1N0YXR1cyIsImVuZEtleSIsInRvdWNobW92ZSIsImNoYW5nZVBvaW50IiwibWV0aG9kcyIsImRhdGUiLCJzZWxmIiwiRGF0ZSIsIndlZWtzIiwid2VlayIsImdldFVUQ0RheSIsIndlZWtkIiwibW9udGgiLCJnZXRNb250aCIsIm1vbnRocyIsIm1vbiIsImRheSIsImdldERhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJtaW4iLCJzZXRJbnRlcnZhbCIsInNldFRpbWUiLCJjbGVhckludGVydmFsIiwiY29uc29sZSIsImxvZyIsImN1cnJlbnRUaW1lIiwic2V0RGF0YSIsInRpbWVyRW5kIiwic2VjIiwidG91Y2hzdGFydCIsImUiLCJzdGFyUG9pbnQiLCJ0b3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsImN1clBvaW50IiwidGltZUNoYW5nZSIsInRvdWNoZW5kIiwieGNoYW5nZSIsInljaGFuZ2UiLCJNYXRoIiwiYWJzIiwidGl0bGUiLCJkZXNjIiwicGF0aCIsInNldFRpbWVvdXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsa0JBQWtCLFNBQXhCO0FBQ0EsSUFBTUMsY0FBYyxFQUFwQjtBQUNBLElBQU1DLGdCQUFnQixFQUF0QjtBQUNBLElBQU1DLGNBQWMsRUFBcEI7QUFDQSxJQUFNQyxlQUFlLENBQXJCO0FBQ0Es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ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuY29uc3QgaW5pdGlhbFRpbWVUZXh0ID0gJzIwIDogMDAnXG5jb25zdCBpbml0aWFsVGltZSA9IDIwXG5jb25zdCBzZWNvbmRzUGVyTWluID0gNjBcbmNvbnN0IHRpbWVVcGxpbWl0ID0gNjBcbmNvbnN0IHRpbWVMb3dsaW1pdCA9IDBcbmNvbnN0IGtzU3RhcnQgPSAwXG5jb25zdCBrc1BhdXNlID0gMVxuY29uc3Qga3NDb250aW51ZSA9IDJcbmNvbnN0IHhQb3MgPSAwXG5jb25zdCB5UG9zID0gMVxuY29uc3QgY2hhbmdlVGltZVBvaW50ID0gNVxuXG5sZXQgdGltZXJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W9kuW/gydcbiAgfVxuICBkYXRhID0ge1xuICAgIG1hcms6ICcuLi9pbWFnZS93YXRlci5wbmcnLFxuICAgIGRhdGVzOiAnJyxcbiAgICBzaG93SW1nZTogZmFsc2UsXG4gICAgdGljazogMCxcbiAgICB0aW1lOiAnJyxcbiAgICBrZXk6IGtzU3RhcnQsXG4gICAga1N0YXR1czogWyflvIDlp4snLCAn5pqC5YGcJywgJ+e7p+e7rSddLFxuICAgIGVuZEtleTogJ+e7k+adnycsXG4gICAgdG91Y2htb3ZlOiB0cnVlLFxuICAgIGNoYW5nZVBvaW50OiAwXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBkYXRlKHNlbGYpIHtcbiAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgY29uc3Qgd2Vla3MgPSBbJ1N1bicsICdNb24nLCAnVHVlcycsICdXZWQnLCAnVGh1cicsICdGcmknLCAnU2F0J11cbiAgICAgIGNvbnN0IHdlZWsgPSBkYXRlLmdldFVUQ0RheSgpXG4gICAgICBjb25zdCB3ZWVrZCA9IHdlZWtzW3dlZWtdXG4gICAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICAgICAgY29uc3QgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWcnLCAnU2VwdCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgICBjb25zdCBtb24gPSBtb250aHNbbW9udGhdXG4gICAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICAgICAgc2VsZi5kYXRlcyA9IG1vbiArICcgJyArIGRheSArICcgJyArIHdlZWtkICsgJyAnICsgeWVhclxuICAgIH0sXG4gICAgLy8g5Yik5pat5piv5ZCm5byA5ZCv6K6h5pe25ZmoXG4gICAgdGltZSgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgbGV0IG1pbiA9IChzZWxmLnRpY2sgLSAoc2VsZi50aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pblxuICAgICAgaWYgKG1pbiA+IHRpbWVMb3dsaW1pdCAmJiBtaW4gPD0gdGltZVVwbGltaXQpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnRpbWVyKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDorqHml7blmahcbiAgICB0aW1lcihzZWxmKSB7XG4gICAgICBzZWxmLnRvdWNobW92ZSA9IGZhbHNlXG4gICAgICBpZiAoc2VsZi5rZXkgPT09IGtzU3RhcnQgfHwgc2VsZi5rZXkgPT09IGtzQ29udGludWUpIHtcbiAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnRpY2stLVxuICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICBpZiAoc2VsZi50aWNrID09PSB0aW1lTG93bGltaXQpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwKVxuICAgICAgICBzZWxmLmtleSA9IGtzUGF1c2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgc2VsZi5rZXkgPSBrc0NvbnRpbnVlXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDliLfmlrDml7bpl7RcbiAgICBzZXRUaW1lKHNlbGYsIHRpY2spIHtcbiAgICAgIGNvbnNvbGUubG9nKHNlbGYpXG4gICAgICBsZXQgY3VycmVudFRpbWUgPSBzZWxmLm1ldGhvZHMuY3VycmVudFRpbWUoc2VsZi50aWNrKVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgIH0pXG4gICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgIH0sXG4gICAgdGltZXJFbmQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGNvbnNvbGUubG9nKHNlbGYpXG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgc2VsZi5rZXkgPSBrc1N0YXJ0XG4gICAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgICAgc2VsZi50b3VjaG1vdmUgPSB0cnVlXG4gICAgfSxcbiAgICAvLyDorqHnrpfml7bpl7Tlj4rovpPlh7rmoLzlvI9cbiAgICBjdXJyZW50VGltZSh0aWNrKSB7XG4gICAgICBsZXQgbWluID0gKHRpY2sgLSAodGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW5cbiAgICAgIGxldCBzZWMgPSB0aWNrICUgc2Vjb25kc1Blck1pblxuICAgICAgaWYgKG1pbiA+IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgIHJldHVybiAn4oieJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1pbiA8IDEwKSB7XG4gICAgICAgICAgbWluID0gJzAnICsgbWluXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlYyA8IDEwKSB7XG4gICAgICAgICAgc2VjID0gJzAnICsgc2VjXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbiArICc6JyArIHNlY1xuICAgICAgfVxuICAgIH0sXG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnc3RhcicpXG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdtb3ZlJylcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICAgIGlmIChzZWxmLnRvdWNobW92ZSkge1xuICAgICAgICBzZWxmLm1ldGhvZHMudGltZUNoYW5nZShzZWxmKVxuICAgICAgfVxuICAgIH0sXG4gICAgdG91Y2hlbmQoZSkge1xuICAgICAgY29uc29sZS5sb2coJ2VuZCcpXG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGlmIChzZWxmLnRvdWNobW92ZSkge1xuICAgICAgfVxuICAgIH0sXG4gICAgdGltZUNoYW5nZShzZWxmKSB7XG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeFBvc10gLSBzZWxmLnN0YXJQb2ludFt4UG9zXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50W3lQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeVBvc11cbiAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA8IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIHNlbGYuY2hhbmdlUG9pbnQrK1xuICAgICAgICBjb25zb2xlLmxvZyhzZWxmLmNoYW5nZVBvaW50KVxuICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA+IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3lQb3NdID4gc2VsZi5zdGFyUG9pbnRbeVBvc10gJiYgc2VsZi50aWNrID4gMCkge1xuICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrIC0gc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeVBvc10gPCBzZWxmLnN0YXJQb2ludFt5UG9zXSkge1xuICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrICsgc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5b2S5b+DJyxcbiAgICAgIGRlc2M6ICfpg73luILllqfpl7kg5L2V5aSE5b2S5b+DJyxcbiAgICAgIHBhdGg6ICcvcGFnZS9ub2lzZSdcbiAgICB9XG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIHNlbGYubWV0aG9kcy5kYXRlKHNlbGYpXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLnNob3dJbWdlID0gZmFsc2VcbiAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgIHNob3dJbWdlOiBmYWxzZVxuICAgICAgfSlcbiAgICB9LCAyMDAwKVxuICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgIHNlbGYudGljayA9IGluaXRpYWxUaW1lICogc2Vjb25kc1Blck1pblxuICB9XG59XG4iXX0=