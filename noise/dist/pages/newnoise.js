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
        _wepy2.default.playBackgroundAudio({
          dataUrl: '//music.163.com/outchain/player?type=3&id=907005819',
          title: '123',
          coverImgUrl: ''
        });
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

      // 左右滑动调节图片
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld25vaXNlLmpzIl0sIm5hbWVzIjpbImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxUaW1lIiwic2Vjb25kc1Blck1pbiIsInRpbWVVcGxpbWl0IiwidGltZUxvd2xpbWl0Iiwia3NTdGFydCIsImtzUGF1c2UiLCJrc0NvbnRpbnVlIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwiR09MRCIsIlRSRUUiLCJXQVRFUiIsIkZJUkUiLCJTT0lMIiwidGltZXIiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibWFyayIsImRhdGVzIiwic2hvd0ltZ2UiLCJ0aWNrIiwidGltZSIsImtleSIsImtTdGF0dXMiLCJlbmRLZXkiLCJ0b3VjaG1vdmUiLCJjaGFuZ2VQb2ludCIsImltYWdlTm9kZSIsImJnY29sb3IiLCJtZXRob2RzIiwiZGF0ZSIsInNlbGYiLCJEYXRlIiwid2Vla3MiLCJ3ZWVrIiwiZ2V0VVRDRGF5Iiwid2Vla2QiLCJtb250aCIsImdldE1vbnRoIiwibW9udGhzIiwibW9uIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsInBsYXlCYWNrZ3JvdW5kQXVkaW8iLCJkYXRhVXJsIiwidGl0bGUiLCJjb3ZlckltZ1VybCIsIm1pbiIsInNldEludGVydmFsIiwic2V0VGltZSIsImNsZWFySW50ZXJ2YWwiLCJjdXJyZW50VGltZSIsInNldERhdGEiLCJ0aW1lckVuZCIsInNlYyIsInRvdWNoc3RhcnQiLCJlIiwiY29uc29sZSIsImxvZyIsInN0YXJQb2ludCIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiY3VyUG9pbnQiLCJ0aW1lQ2hhbmdlIiwidG91Y2hlbmQiLCJpbWFnZUNoYW5nZSIsInhjaGFuZ2UiLCJ5Y2hhbmdlIiwiTWF0aCIsImFicyIsImRlc2MiLCJwYXRoIiwic2V0VGltZW91dCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7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WDtBQUNBQSxXQUFLRixPQUFMLENBQWFDLElBQWIsQ0FBa0JDLElBQWxCO0FBQ0E0QyxpQkFBVyxZQUFNO0FBQ2Y1QyxhQUFLWixRQUFMLEdBQWdCLEtBQWhCO0FBQ0FZLGFBQUt1QixPQUFMLENBQWE7QUFDWG5DLG9CQUFVO0FBREMsU0FBYjtBQUdELE9BTEQsRUFLRyxJQUxIO0FBTUFZLFdBQUtWLElBQUwsR0FBWTFCLGVBQVo7QUFDQW9DLFdBQUtYLElBQUwsR0FBWXhCLGNBQWNDLGFBQTFCO0FBQ0Q7Ozs7RUEzTmdDLGVBQUsrRSxJOztrQkFBbkIvRCxLIiwiZmlsZSI6Im5ld25vaXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG5jb25zdCBpbml0aWFsVGltZVRleHQgPSAnMjAgOiAwMCdcbmNvbnN0IGluaXRpYWxUaW1lID0gMjBcbmNvbnN0IHNlY29uZHNQZXJNaW4gPSA2MFxuY29uc3QgdGltZVVwbGltaXQgPSA2MFxuY29uc3QgdGltZUxvd2xpbWl0ID0gMFxuY29uc3Qga3NTdGFydCA9IDBcbmNvbnN0IGtzUGF1c2UgPSAxXG5jb25zdCBrc0NvbnRpbnVlID0gMlxuY29uc3QgeFBvcyA9IDBcbmNvbnN0IHlQb3MgPSAxXG5jb25zdCBjaGFuZ2VUaW1lUG9pbnQgPSA1XG5jb25zdCBjaGFuZ2VJbWFnZVBvaW50ID0gNVxuY29uc3QgR09MRCA9ICdnb2xkJ1xuY29uc3QgVFJFRSA9ICd0cmVlJ1xuY29uc3QgV0FURVIgPSAnd2F0ZXInXG5jb25zdCBGSVJFID0gJ2ZpcmUnXG5jb25zdCBTT0lMID0gJ3NvaWwnXG5cbmxldCB0aW1lclxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5b2S5b+DJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbWFyazogJy4uL2ltYWdlL3dhdGVyLnBuZycsXG4gICAgZGF0ZXM6ICcnLFxuICAgIHNob3dJbWdlOiBmYWxzZSxcbiAgICB0aWNrOiAwLFxuICAgIHRpbWU6ICcnLFxuICAgIGtleToga3NTdGFydCxcbiAgICBrU3RhdHVzOiBbJ+W8gOWniycsICfmmoLlgZwnLCAn57un57utJ10sXG4gICAgZW5kS2V5OiAn57uT5p2fJyxcbiAgICB0b3VjaG1vdmU6IHRydWUsXG4gICAgY2hhbmdlUG9pbnQ6IDAsXG4gICAgaW1hZ2VOb2RlOiBXQVRFUixcbiAgICBiZ2NvbG9yOiAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGRhdGUoc2VsZikge1xuICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICBjb25zdCB3ZWVrcyA9IFsnU3VuJywgJ01vbicsICdUdWVzJywgJ1dlZCcsICdUaHVyJywgJ0ZyaScsICdTYXQnXVxuICAgICAgY29uc3Qgd2VlayA9IGRhdGUuZ2V0VVRDRGF5KClcbiAgICAgIGNvbnN0IHdlZWtkID0gd2Vla3Nbd2Vla11cbiAgICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpXG4gICAgICBjb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1ZycsICdTZXB0JywgJ09jdCcsICdOb3YnLCAnRGVjJ11cbiAgICAgIGNvbnN0IG1vbiA9IG1vbnRoc1ttb250aF1cbiAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpXG4gICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgICBzZWxmLmRhdGVzID0gbW9uICsgJyAnICsgZGF5ICsgJyAnICsgd2Vla2QgKyAnICcgKyB5ZWFyXG4gICAgfSxcbiAgICAvLyDliKTmlq3mmK/lkKblvIDlkK/orqHml7blmahcbiAgICB0aW1lKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICB3ZXB5LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xuICAgICAgICBkYXRhVXJsOiAnLy9tdXNpYy4xNjMuY29tL291dGNoYWluL3BsYXllcj90eXBlPTMmaWQ9OTA3MDA1ODE5JyxcbiAgICAgICAgdGl0bGU6ICcxMjMnLFxuICAgICAgICBjb3ZlckltZ1VybDogJydcbiAgICAgIH0pXG4gICAgICBsZXQgbWluID0gKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluXG4gICAgICBpZiAobWluID4gdGltZUxvd2xpbWl0ICYmIG1pbiA8PSB0aW1lVXBsaW1pdCkge1xuICAgICAgICBzZWxmLm1ldGhvZHMudGltZXIoc2VsZilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYua2V5ID0ga3NQYXVzZVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g6K6h5pe25ZmoXG4gICAgdGltZXIoc2VsZikge1xuICAgICAgc2VsZi50b3VjaG1vdmUgPSBmYWxzZVxuICAgICAgaWYgKHNlbGYua2V5ID09PSBrc1N0YXJ0IHx8IHNlbGYua2V5ID09PSBrc0NvbnRpbnVlKSB7XG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi50aWNrLS1cbiAgICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgICAgaWYgKHNlbGYudGljayA9PT0gdGltZUxvd2xpbWl0KSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMClcbiAgICAgICAgc2VsZi5rZXkgPSBrc1BhdXNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLm1ldGhvZHMuc2V0VGltZShzZWxmLCBzZWxmLnRpY2spXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICAgIHNlbGYua2V5ID0ga3NDb250aW51ZVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5Yi35paw5pe26Ze0XG4gICAgc2V0VGltZShzZWxmLCB0aWNrKSB7XG4gICAgICBsZXQgY3VycmVudFRpbWUgPSBzZWxmLm1ldGhvZHMuY3VycmVudFRpbWUoc2VsZi50aWNrKVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgdGltZTogY3VycmVudFRpbWVcbiAgICAgIH0pXG4gICAgICBzZWxmLnRpbWUgPSBjdXJyZW50VGltZVxuICAgIH0sXG4gICAgdGltZXJFbmQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICBzZWxmLmtleSA9IGtzU3RhcnRcbiAgICAgIHNlbGYudGljayA9IGluaXRpYWxUaW1lICogc2Vjb25kc1Blck1pblxuICAgICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgICBzZWxmLnRvdWNobW92ZSA9IHRydWVcbiAgICB9LFxuICAgIC8vIOiuoeeul+aXtumXtOWPiui+k+WHuuagvOW8j1xuICAgIGN1cnJlbnRUaW1lKHRpY2spIHtcbiAgICAgIGxldCBtaW4gPSAodGljayAtICh0aWNrICUgc2Vjb25kc1Blck1pbikpIC8gc2Vjb25kc1Blck1pblxuICAgICAgbGV0IHNlYyA9IHRpY2sgJSBzZWNvbmRzUGVyTWluXG4gICAgICBpZiAobWluID4gdGltZVVwbGltaXQpIHtcbiAgICAgICAgcmV0dXJuICfiiJ4nXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobWluIDwgMTApIHtcbiAgICAgICAgICBtaW4gPSAnMCcgKyBtaW5cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VjIDwgMTApIHtcbiAgICAgICAgICBzZWMgPSAnMCcgKyBzZWNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluICsgJzonICsgc2VjXG4gICAgICB9XG4gICAgfSxcbiAgICB0b3VjaHN0YXJ0KGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzdGFyJylcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5zdGFyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgfSxcbiAgICB0b3VjaG1vdmUoZSkge1xuICAgICAgY29uc29sZS5sb2coJ21vdmUnKVxuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLmN1clBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgICAgc2VsZi5jaGFuZ2VQb2ludCsrXG4gICAgICBpZiAoc2VsZi50b3VjaG1vdmUpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnRpbWVDaGFuZ2Uoc2VsZilcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvdWNoZW5kKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdlbmQnKVxuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBpZiAoc2VsZi50b3VjaG1vdmUpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLmltYWdlQ2hhbmdlKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDkuIrkuIvmu5HliqjosIPoioLml7bpl7RcbiAgICB0aW1lQ2hhbmdlKHNlbGYpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt4UG9zXSAtIHNlbGYuc3RhclBvaW50W3hQb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeVBvc10gLSBzZWxmLnN0YXJQb2ludFt5UG9zXVxuICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpIDwgTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgY29uc29sZS5sb2coc2VsZi5jaGFuZ2VQb2ludClcbiAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VUaW1lUG9pbnQpIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFt5UG9zXSA+IHNlbGYuc3RhclBvaW50W3lQb3NdICYmIHNlbGYudGljayA+IDApIHtcbiAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayAtIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3lQb3NdIDwgc2VsZi5zdGFyUG9pbnRbeVBvc10pIHtcbiAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayArIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDlt6blj7Pmu5HliqjosIPoioLlm77niYdcbiAgICBpbWFnZUNoYW5nZShzZWxmKSB7XG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeFBvc10gLSBzZWxmLnN0YXJQb2ludFt4UG9zXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50W3lQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeVBvc11cbiAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNlbGYuY2hhbmdlUG9pbnQpXG4gICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID4gY2hhbmdlSW1hZ2VQb2ludCkge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3hQb3NdID4gc2VsZi5zdGFyUG9pbnRbeFBvc10pIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBHT0xEOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgVFJFRTpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZ29sZC5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBHT0xEXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgV0FURVI6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gVFJFRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBGSVJFOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBXQVRFUlxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgU09JTDpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZmlyZS5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBGSVJFXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuY3VyUG9pbnRbeFBvc10gPCBzZWxmLnN0YXJQb2ludFt4UG9zXSkge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlIEdPTEQ6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gVFJFRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBUUkVFOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBXQVRFUlxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgV0FURVI6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gRklSRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBGSVJFOlxuICAgICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9zb2lsLnBuZydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFNPSUxcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBTT0lMOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICflvZLlv4MnLFxuICAgICAgZGVzYzogJ+mDveW4guWWp+mXuSDkvZXlpITlvZLlv4MnLFxuICAgICAgcGF0aDogJy9wYWdlL25vaXNlJ1xuICAgIH1cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgc2VsZi5tZXRob2RzLmRhdGUoc2VsZilcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlbGYuc2hvd0ltZ2UgPSBmYWxzZVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgc2hvd0ltZ2U6IGZhbHNlXG4gICAgICB9KVxuICAgIH0sIDIwMDApXG4gICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgc2VsZi50aWNrID0gaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluXG4gIH1cbn1cbiJdfQ==