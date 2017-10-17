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
var changeImagePoint = 5;
var GOLD = 'gold';
var TREE = 'tree';
var WATER = 'water';
var FIRE = 'fire';
var SOIL = 'soil';

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
      changePoint: 0,
      imageNode: WATER,
      bgcolor: 'rgba(0, 255, 255, 0.3)'
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
        } else {
          self.key = ksPause;
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
        var currentTime = self.methods.currentTime(self.tick);
        self.setData({
          time: currentTime
        });
        self.time = currentTime;
      },
      timerEnd: function timerEnd() {
        var self = this;
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
        self.changePoint++;
        if (self.touchmove) {
          self.methods.timeChange(self);
        }
      },
      touchend: function touchend(e) {
        console.log('end');
        var self = this;
        if (self.touchmove) {
          self.methods.imageChange(self);
        }
      },

      // 上下滑动调节时间
      timeChange: function timeChange(self) {
        var xchange = self.curPoint[xPos] - self.starPoint[xPos];
        var ychange = self.curPoint[yPos] - self.starPoint[yPos];
        if (Math.abs(xchange) < Math.abs(ychange)) {
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
      },
      imageChange: function imageChange(self) {
        var xchange = self.curPoint[xPos] - self.starPoint[xPos];
        var ychange = self.curPoint[yPos] - self.starPoint[yPos];
        if (Math.abs(xchange) > Math.abs(ychange)) {
          console.log(self.changePoint);
          if (self.changePoint > changeImagePoint) {
            if (self.curPoint[xPos] > self.starPoint[xPos]) {
              switch (self.imageNode) {
                case GOLD:
                  break;
                case TREE:
                  self.mark = '../image/gold.png';
                  self.imageNode = GOLD;
                  self.bgcolor = 'rgba( 255, 255, 0, 0.3)';
                  break;
                case WATER:
                  self.mark = '../image/tree.png';
                  self.imageNode = TREE;
                  self.bgcolor = 'rgba( 0, 255, 0, 0.3)';
                  break;
                case FIRE:
                  self.mark = '../image/water.png';
                  self.imageNode = WATER;
                  self.bgcolor = 'rgba(0, 255, 255, 0.3)';
                  break;
                case SOIL:
                  self.mark = '../image/fire.png';
                  self.imageNode = FIRE;
                  self.bgcolor = 'rgba( 255, 0, 0, 0.3)';
                  break;
              }
              self.changePoint = 0;
            } else if (self.curPoint[xPos] < self.starPoint[xPos]) {
              switch (self.imageNode) {
                case GOLD:
                  self.mark = '../image/tree.png';
                  self.imageNode = TREE;
                  self.bgcolor = 'rgba( 0, 255, 0, 0.3)';
                  break;
                case TREE:
                  self.mark = '../image/water.png';
                  self.imageNode = WATER;
                  self.bgcolor = 'rgba(0, 255, 255, 0.3)';
                  break;
                case WATER:
                  self.mark = '../image/fire.png';
                  self.imageNode = FIRE;
                  self.bgcolor = 'rgba( 255, 0, 0, 0.3)';
                  break;
                case FIRE:
                  self.mark = '../image/soil.png';
                  self.imageNode = SOIL;
                  self.bgcolor = 'rgba( 238, 99, 99, 0.3)';
                  break;
                case SOIL:
                  break;
              }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld25vaXNlLmpzIl0sIm5hbWVzIjpbImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxUaW1lIiwic2Vjb25kc1Blck1pbiIsInRpbWVVcGxpbWl0IiwidGltZUxvd2xpbWl0Iiwia3NTdGFydCIsImtzUGF1c2UiLCJrc0NvbnRpbnVlIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwiR09MRCIsIlRSRUUiLCJXQVRFUiIsIkZJUkUiLCJTT0lMIiwidGltZXIiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibWFyayIsImRhdGVzIiwic2hvd0ltZ2UiLCJ0aWNrIiwidGltZSIsImtleSIsImtTdGF0dXMiLCJlbmRLZXkiLCJ0b3VjaG1vdmUiLCJjaGFuZ2VQb2ludCIsImltYWdlTm9kZSIsImJnY29sb3IiLCJtZXRob2RzIiwiZGF0ZSIsInNlbGYiLCJEYXRlIiwid2Vla3MiLCJ3ZWVrIiwiZ2V0VVRDRGF5Iiwid2Vla2QiLCJtb250aCIsImdldE1vbnRoIiwibW9udGhzIiwibW9uIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1pbiIsInNldEludGVydmFsIiwic2V0VGltZSIsImNsZWFySW50ZXJ2YWwiLCJjdXJyZW50VGltZSIsInNldERhdGEiLCJ0aW1lckVuZCIsInNlYyIsInRvdWNoc3RhcnQiLCJlIiwiY29uc29sZSIsImxvZyIsInN0YXJQb2ludCIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiY3VyUG9pbnQiLCJ0aW1lQ2hhbmdlIiwidG91Y2hlbmQiLCJpbWFnZUNoYW5nZSIsInhjaGFuZ2UiLCJ5Y2hhbmdlIiwiTWF0aCIsImFicyIsInRpdGxlIiwiZGVzYyIsInBhdGgiLCJzZXRUaW1lb3V0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGtCQUFrQixTQUF4QjtBQUNB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LE9BTEQsRUFLRyxJQUxIO0FBTUFZLFdBQUtWLElBQUwsR0FBWTFCLGVBQVo7QUFDQW9DLFdBQUtYLElBQUwsR0FBWXhCLGNBQWNDLGFBQTFCO0FBQ0Q7Ozs7RUFyTmdDLGVBQUs0RSxJOztrQkFBbkI1RCxLIiwiZmlsZSI6Im5ld25vaXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG5jb25zdCBpbml0aWFsVGltZVRleHQgPSAnMjAgOiAwMCdcbmNvbnN0IGluaXRpYWxUaW1lID0gMjBcbmNvbnN0IHNlY29uZHNQZXJNaW4gPSA2MFxuY29uc3QgdGltZVVwbGltaXQgPSA2MFxuY29uc3QgdGltZUxvd2xpbWl0ID0gMFxuY29uc3Qga3NTdGFydCA9IDBcbmNvbnN0IGtzUGF1c2UgPSAxXG5jb25zdCBrc0NvbnRpbnVlID0gMlxuY29uc3QgeFBvcyA9IDBcbmNvbnN0IHlQb3MgPSAxXG5jb25zdCBjaGFuZ2VUaW1lUG9pbnQgPSA1XG5jb25zdCBjaGFuZ2VJbWFnZVBvaW50ID0gNVxuY29uc3QgR09MRCA9ICdnb2xkJ1xuY29uc3QgVFJFRSA9ICd0cmVlJ1xuY29uc3QgV0FURVIgPSAnd2F0ZXInXG5jb25zdCBGSVJFID0gJ2ZpcmUnXG5jb25zdCBTT0lMID0gJ3NvaWwnXG5cbmxldCB0aW1lclxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5b2S5b+DJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbWFyazogJy4uL2ltYWdlL3dhdGVyLnBuZycsXG4gICAgZGF0ZXM6ICcnLFxuICAgIHNob3dJbWdlOiBmYWxzZSxcbiAgICB0aWNrOiAwLFxuICAgIHRpbWU6ICcnLFxuICAgIGtleToga3NTdGFydCxcbiAgICBrU3RhdHVzOiBbJ+W8gOWniycsICfmmoLlgZwnLCAn57un57utJ10sXG4gICAgZW5kS2V5OiAn57uT5p2fJyxcbiAgICB0b3VjaG1vdmU6IHRydWUsXG4gICAgY2hhbmdlUG9pbnQ6IDAsXG4gICAgaW1hZ2VOb2RlOiBXQVRFUixcbiAgICBiZ2NvbG9yOiAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGRhdGUoc2VsZikge1xuICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICBjb25zdCB3ZWVrcyA9IFsnU3VuJywgJ01vbicsICdUdWVzJywgJ1dlZCcsICdUaHVyJywgJ0ZyaScsICdTYXQnXVxuICAgICAgY29uc3Qgd2VlayA9IGRhdGUuZ2V0VVRDRGF5KClcbiAgICAgIGNvbnN0IHdlZWtkID0gd2Vla3Nbd2Vla11cbiAgICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpXG4gICAgICBjb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1ZycsICdTZXB0JywgJ09jdCcsICdOb3YnLCAnRGVjJ11cbiAgICAgIGNvbnN0IG1vbiA9IG1vbnRoc1ttb250aF1cbiAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpXG4gICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgICBzZWxmLmRhdGVzID0gbW9uICsgJyAnICsgZGF5ICsgJyAnICsgd2Vla2QgKyAnICcgKyB5ZWFyXG4gICAgfSxcbiAgICAvLyDliKTmlq3mmK/lkKblvIDlkK/orqHml7blmahcbiAgICB0aW1lKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBsZXQgbWluID0gKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluXG4gICAgICBpZiAobWluID4gdGltZUxvd2xpbWl0ICYmIG1pbiA8PSB0aW1lVXBsaW1pdCkge1xuICAgICAgICBzZWxmLm1ldGhvZHMudGltZXIoc2VsZilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYua2V5ID0ga3NQYXVzZVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g6K6h5pe25ZmoXG4gICAgdGltZXIoc2VsZikge1xuICAgICAgc2VsZi50b3VjaG1vdmUgPSBmYWxzZVxuICAgICAgaWYgKHNlbGYua2V5ID09PSBrc1N0YXJ0IHx8IHNlbGYua2V5ID09PSBrc0NvbnRpbnVlKSB7XG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi50aWNrLS1cbiAgICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgICAgaWYgKHNlbGYudGljayA9PT0gdGltZUxvd2xpbWl0KSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMClcbiAgICAgICAgc2VsZi5rZXkgPSBrc1BhdXNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICAgIHNlbGYua2V5ID0ga3NDb250aW51ZVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5Yi35paw5pe26Ze0XG4gICAgc2V0VGltZShzZWxmLCB0aWNrKSB7XG4gICAgICBsZXQgY3VycmVudFRpbWUgPSBzZWxmLm1ldGhvZHMuY3VycmVudFRpbWUoc2VsZi50aWNrKVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgIH0pXG4gICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgIH0sXG4gICAgdGltZXJFbmQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICBzZWxmLmtleSA9IGtzU3RhcnRcbiAgICAgIHNlbGYudGljayA9IGluaXRpYWxUaW1lICogc2Vjb25kc1Blck1pblxuICAgICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgICBzZWxmLnRvdWNobW92ZSA9IHRydWVcbiAgICB9LFxuICAgIC8vIOiuoeeul+aXtumXtOWPiui+k+WHuuagvOW8j1xuICAgIGN1cnJlbnRUaW1lKHRpY2spIHtcbiAgICAgIGxldCBtaW4gPSAodGljayAtICh0aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pblxuICAgICAgbGV0IHNlYyA9IHRpY2sgJSBzZWNvbmRzUGVyTWluXG4gICAgICBpZiAobWluID4gdGltZVVwbGltaXQpIHtcbiAgICAgICAgcmV0dXJuICfiiJ4nXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobWluIDwgMTApIHtcbiAgICAgICAgICBtaW4gPSAnMCcgKyBtaW5cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VjIDwgMTApIHtcbiAgICAgICAgICBzZWMgPSAnMCcgKyBzZWNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluICsgJzonICsgc2VjXG4gICAgICB9XG4gICAgfSxcbiAgICB0b3VjaHN0YXJ0KGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzdGFyJylcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5zdGFyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgfSxcbiAgICB0b3VjaG1vdmUoZSkge1xuICAgICAgY29uc29sZS5sb2coJ21vdmUnKVxuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLmN1clBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgICAgc2VsZi5jaGFuZ2VQb2ludCsrXG4gICAgICBpZiAoc2VsZi50b3VjaG1vdmUpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnRpbWVDaGFuZ2Uoc2VsZilcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvdWNoZW5kKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdlbmQnKVxuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBpZiAoc2VsZi50b3VjaG1vdmUpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLmltYWdlQ2hhbmdlKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDkuIrkuIvmu5HliqjosIPoioLml7bpl7RcbiAgICB0aW1lQ2hhbmdlKHNlbGYpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt4UG9zXSAtIHNlbGYuc3RhclBvaW50W3hQb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeVBvc10gLSBzZWxmLnN0YXJQb2ludFt5UG9zXVxuICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpIDwgTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgY29uc29sZS5sb2coc2VsZi5jaGFuZ2VQb2ludClcbiAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VUaW1lUG9pbnQpIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt5UG9zXSA+IHNlbGYuc3RhclBvaW50W3lQb3NdICYmIHNlbGYudGljayA+IDApIHtcbiAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayAtIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3lQb3NdIDwgc2VsZi5zdGFyUG9pbnRbeVBvc10pIHtcbiAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayArIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBpbWFnZUNoYW5nZShzZWxmKSB7XG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeFBvc10gLSBzZWxmLnN0YXJQb2ludFt4UG9zXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50W3lQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeVBvc11cbiAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNlbGYuY2hhbmdlUG9pbnQpXG4gICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID4gY2hhbmdlSW1hZ2VQb2ludCkge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3hQb3NdID4gc2VsZi5zdGFyUG9pbnRbeFBvc10pIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBHT0xEOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgVFJFRTpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZ29sZC5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBHT0xEXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgV0FURVI6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gVFJFRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBGSVJFOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBXQVRFUlxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgU09JTDpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZmlyZS5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBGSVJFXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuY3VyUG9pbnRbeFBvc10gPCBzZWxmLnN0YXJQb2ludFt4UG9zXSkge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlIEdPTEQ6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gVFJFRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBUUkVFOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBXQVRFUlxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgV0FURVI6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gRklSRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBGSVJFOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9zb2lsLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFNPSUxcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBTT0lMOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICflvZLlv4MnLFxuICAgICAgZGVzYzogJ+mDveW4guWWp+mXuSDkvZXlpITlvZLlv4MnLFxuICAgICAgcGF0aDogJy9wYWdlL25vaXNlJ1xuICAgIH1cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgc2VsZi5tZXRob2RzLmRhdGUoc2VsZilcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlbGYuc2hvd0ltZ2UgPSBmYWxzZVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgc2hvd0ltZ2U6IGZhbHNlXG4gICAgICB9KVxuICAgIH0sIDIwMDApXG4gICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgc2VsZi50aWNrID0gaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluXG4gIH1cbn1cbiJdfQ==