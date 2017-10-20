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
var noiseGold = 'http://localhost:5000/%E9%92%9F.mp3';
var noiseTree = 'http://localhost:5000/%E6%A3%AE.mp3';
var noiseWater = 'http://localhost:5000/%E9%9B%A8.mp3';
var noiseFire = 'http://localhost:5000/%E7%81%AB.mp3';
var noiseSoil = 'http://localhost:5000/%E6%BD%AE.mp3';

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
      showImge: true,
      tick: 0,
      time: '',
      key: ksStart,
      kStatus: ['开始', '暂停', '继续'],
      endKey: '结束',
      touchmove: true,
      changePoint: 0,
      imageNode: WATER,
      bgcolor: 'rgba(0, 255, 255, 0.12)',
      circlecolor: 'rgba(0, 0, 0, 0)',
      starPoint: [0, 0],
      curPoint: [0, 0],
      touches: [0, 0],
      noise: 'http://localhost:5000/雨.mp3',
      text: '雨水',
      shadowcolor: '#333333'
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
        self.methods.circleColorChange(self);
        self.methods.playnoise(self);
        if (min > timeLowlimit && min <= timeUplimit) {
          self.methods.timer(self);
        } else {
          _timer = setInterval(function () {
            _wepy2.default.getBackgroundAudioPlayerState({
              success: function success(res) {
                if (res.status !== 1) {
                  self.methods.playnoise(self);
                }
              }
            });
          }, 1000);
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
            _wepy2.default.getBackgroundAudioPlayerState({
              success: function success(res) {
                if (res.status !== 1) {
                  self.methods.playnoise(self);
                }
              }
            });
            if (self.tick === timeLowlimit) {
              self.setData({
                touchmove: true,
                circlecolor: 'rgba(0, 0, 0, 0)',
                key: ksStart,
                tick: initialTime * secondsPerMin,
                time: initialTimeText
              });
              _wepy2.default.stopBackgroundAudio();
              self.time = initialTimeText;
              self.tick = initialTime * secondsPerMin;
              self.touchmove = true;
              self.circlecolor = 'rgba(0, 0, 0, 0)';
              self.key = ksStart;
              clearInterval(_timer);
            }
          }, 1000);
          self.key = ksPause;
        } else {
          _wepy2.default.pauseBackgroundAudio();
          self.methods.setTime(self, self.tick);
          clearInterval(_timer);
          self.key = ksContinue;
          self.circlecolor = 'rgba(255, 255, 0, 0)';
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
        _wepy2.default.stopBackgroundAudio();
        self.key = ksStart;
        self.tick = initialTime * secondsPerMin;
        self.time = initialTimeText;
        self.touchmove = true;
        self.circlecolor = 'rgba(0, 0, 0, 0)';
        self.shadowcolor = '#333333';
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
          return min + ' : ' + sec;
        }
      },
      touchstart: function touchstart(e) {
        var self = this;
        self.starPoint = [e.touches[0].pageX, e.touches[0].pageY];
      },
      touchmove: function touchmove(e) {
        var self = this;
        self.curPoint = [e.touches[0].pageX, e.touches[0].pageY];
        self.changePoint++;
        if (self.touchmove) {
          self.methods.timeChange(self);
        }
      },
      touchend: function touchend(e) {
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
          if (self.changePoint > changeImagePoint) {
            if (self.curPoint[xPos] > self.starPoint[xPos]) {
              switch (self.imageNode) {
                case GOLD:
                  break;
                case TREE:
                  self.text = '寺钟';
                  self.imageNode = GOLD;
                  self.bgcolor = 'rgba( 255, 255, 0, 0.12)';
                  self.noise = noiseGold;
                  break;
                case WATER:
                  self.text = '森林';
                  self.imageNode = TREE;
                  self.bgcolor = 'rgba( 0, 255, 0, 0.12)';
                  self.noise = noiseTree;
                  break;
                case FIRE:
                  self.text = '雨水';
                  self.imageNode = WATER;
                  self.bgcolor = 'rgba(0, 255, 255, 0.12)';
                  self.noise = noiseWater;
                  break;
                case SOIL:
                  self.text = '篝火';
                  self.imageNode = FIRE;
                  self.bgcolor = 'rgba( 255, 0, 0, 0.12)';
                  self.noise = noiseFire;
                  break;
              }
              self.changePoint = 0;
            } else if (self.curPoint[xPos] < self.starPoint[xPos]) {
              switch (self.imageNode) {
                case GOLD:
                  self.text = '森林';
                  self.imageNode = TREE;
                  self.bgcolor = 'rgba( 0, 255, 0, 0.12)';
                  self.noise = noiseTree;
                  break;
                case TREE:
                  self.text = '雨水';
                  self.imageNode = WATER;
                  self.bgcolor = 'rgba(0, 255, 255, 0.12)';
                  self.noise = noiseWater;
                  break;
                case WATER:
                  self.text = '篝火';
                  self.imageNode = FIRE;
                  self.bgcolor = 'rgba( 255, 0, 0, 0.12)';
                  self.noise = noiseFire;
                  break;
                case FIRE:
                  self.text = '浪潮';
                  self.imageNode = SOIL;
                  self.bgcolor = 'rgba( 238, 99, 99, 0.12)';
                  self.noise = noiseSoil;
                  break;
                case SOIL:
                  break;
              }
              self.changePoint = 0;
            }
          }
        }
      },
      playnoise: function playnoise(self) {
        _wepy2.default.playBackgroundAudio({
          dataUrl: self.noise
        });
      },
      circleColorChange: function circleColorChange(self) {
        switch (self.imageNode) {
          case GOLD:
            self.circlecolor = 'rgba( 255, 255, 0, 0.1)';
            self.shadowcolor = 'rgba( 255, 255, 0, 1)';
            break;
          case TREE:
            self.circlecolor = 'rgba( 0, 255, 0, 0.1)';
            self.shadowcolor = 'rgba( 0, 255, 0, 1)';
            break;
          case WATER:
            self.circlecolor = 'rgba(0, 255, 255, 0.1)';
            self.shadowcolor = 'rgba(0, 255, 255, 1)';
            break;
          case FIRE:
            self.circlecolor = 'rgba( 255, 0, 0, 0.1)';
            self.shadowcolor = 'rgba( 255, 0, 0, 1)';
            break;
          case SOIL:
            self.circlecolor = 'rgba( 238, 99, 99, 0.1)';
            self.shadowcolor = 'rgba( 238, 99, 99, 1)';
            break;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld25vaXNlLmpzIl0sIm5hbWVzIjpbImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxUaW1lIiwic2Vjb25kc1Blck1pbiIsInRpbWVVcGxpbWl0IiwidGltZUxvd2xpbWl0Iiwia3NTdGFydCIsImtzUGF1c2UiLCJrc0NvbnRpbnVlIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwiR09MRCIsIlRSRUUiLCJXQVRFUiIsIkZJUkUiLCJTT0lMIiwibm9pc2VHb2xkIiwibm9pc2VUcmVlIiwibm9pc2VXYXRlciIsIm5vaXNlRmlyZSIsIm5vaXNlU29pbCIsInRpbWVyIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1hcmsiLCJkYXRlcyIsInNob3dJbWdlIiwidGljayIsInRpbWUiLCJrZXkiLCJrU3RhdHVzIiwiZW5kS2V5IiwidG91Y2htb3ZlIiwiY2hhbmdlUG9pbnQiLCJpbWFnZU5vZGUiLCJiZ2NvbG9yIiwiY2lyY2xlY29sb3IiLCJzdGFyUG9pbnQiLCJjdXJQb2ludCIsInRvdWNoZXMiLCJub2lzZSIsInRleHQiLCJzaGFkb3djb2xvciIsIm1ldGhvZHMiLCJkYXRlIiwic2VsZiIsIkRhdGUiLCJ3ZWVrcyIsIndlZWsiLCJnZXRVVENEYXkiLCJ3ZWVrZCIsIm1vbnRoIiwiZ2V0TW9udGgiLCJtb250aHMiLCJtb24iLCJkYXkiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibWluIiwiY2lyY2xlQ29sb3JDaGFuZ2UiLCJwbGF5bm9pc2UiLCJzZXRJbnRlcnZhbCIsImdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlIiwic3VjY2VzcyIsInJlcyIsInN0YXR1cyIsInNldFRpbWUiLCJzZXREYXRhIiwic3RvcEJhY2tncm91bmRBdWRpbyIsImNsZWFySW50ZXJ2YWwiLCJwYXVzZUJhY2tncm91bmRBdWRpbyIsImN1cnJlbnRUaW1lIiwidGltZXJFbmQiLCJzZWMiLCJ0b3VjaHN0YXJ0IiwiZSIsInBhZ2VYIiwicGFnZVkiLCJ0aW1lQ2hhbmdlIiwidG91Y2hlbmQiLCJpbWFnZUNoYW5nZSIsInhjaGFuZ2UiLCJ5Y2hhbmdlIiwiTWF0aCIsImFicyIsInBsYXlCYWNrZ3JvdW5kQXVkaW8iLCJkYXRhVXJsIiwidGl0bGUiLCJkZXNjIiwicGF0aCIsInNldFRpbWVvdXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsa0JBQWtCLFNBQXhCO0FBQ0EsSUFBTUMsY0FBYyxFQUFwQjtBQUNBLElBQU1DLGdCQUFnQixFQUF0QjtBQUNBLElBQU1DLGNBQWMsRUFBcEI7QUFDQSxJQUFNQyxlQUFlLENBQXJCO0FBQ0EsSUFBTUMsVUFBVSxDQUFoQjtBQUNBLElBQU1DLFVBQVUsQ0FBaEI7QUFDQSxJQUFNQyxhQUFhLENBQW5CO0FBQ0EsSUFBTUMsT0FBTyxDQUFiO0FBQ0EsSUFBTUMsT0FBTyxDQUFiO0FBQ0EsSUFBTUMsa0JBQWtCLENBQXhCO0FBQ0EsSUFBTUMsbUJBQW1CLENBQXpCO0FBQ0EsSUFBTUMsT0FBTyxNQUFiO0FBQ0EsSUFBTUMsT0FBTyxNQUFiO0FBQ0EsSUFBTUMsUUFBUSxPQUFkO0FBQ0EsSUFBTUMsT0FBTyxNQUFiO0FBQ0EsSUFBTUMsT0FBTyxNQUFiO0FBQ0EsSUFBTUMsWUFBWSxxQ0FBbEI7QUFDQSxJQUFNQyxZQUFZLHFDQUFsQjtBQUNBLElBQU1DLGFBQWEscUNBQW5CO0FBQ0EsSUFBTUMsWUFBWSxxQ0FBbEI7QUFDQSxJQUFNQyxZQUFZLHFDQUFsQjs7QUFFQSxJQUFJQyxlQUFKOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFlBQU0sb0JBREQ7QUFFTEMsYUFBTyxFQUZGO0FBR0xDLGdCQUFVLElBSEw7QUFJTEMsWUFBTSxDQUpEO0FBS0xDLFlBQU0sRUFMRDtBQU1MQyxXQUFLM0Is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LFdBQUwsR0FBbUIscUJBQW5CO0FBQ0E7QUFDRixlQUFLN0IsSUFBTDtBQUNFZ0MsaUJBQUtULFdBQUwsR0FBbUIseUJBQW5CO0FBQ0FTLGlCQUFLSCxXQUFMLEdBQW1CLHVCQUFuQjtBQUNBO0FBcEJKO0FBc0JEO0FBcFBPLEs7Ozs7O3dDQXNQVTtBQUNsQixhQUFPO0FBQ0w4QyxlQUFPLElBREY7QUFFTEMsY0FBTSxXQUZEO0FBR0xDLGNBQU07QUFIRCxPQUFQO0FBS0Q7Ozs2QkFDUTtBQUNQLFVBQUk3QyxPQUFPLElBQVg7QUFDQUEsV0FBS0YsT0FBTCxDQUFhQyxJQUFiLENBQWtCQyxJQUFsQjtBQUNBOEMsaUJBQVcsWUFBTTtBQUNmOUMsYUFBS25CLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQW1CLGFBQUt1QixPQUFMLENBQWE7QUFDWDFDLG9CQUFVO0FBREMsU0FBYjtBQUdELE9BTEQsRUFLRyxJQUxIO0FBTUFtQixXQUFLakIsSUFBTCxHQUFZL0IsZUFBWjtBQUNBZ0QsV0FBS2xCLElBQUwsR0FBWTdCLGNBQWNDLGFBQTFCO0FBQ0Q7Ozs7RUFqU2dDLGVBQUs2RixJOztrQkFBbkJ4RSxLIiwiZmlsZSI6Im5ld25vaXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG5jb25zdCBpbml0aWFsVGltZVRleHQgPSAnMjAgOiAwMCdcbmNvbnN0IGluaXRpYWxUaW1lID0gMjBcbmNvbnN0IHNlY29uZHNQZXJNaW4gPSA2MFxuY29uc3QgdGltZVVwbGltaXQgPSA2MFxuY29uc3QgdGltZUxvd2xpbWl0ID0gMFxuY29uc3Qga3NTdGFydCA9IDBcbmNvbnN0IGtzUGF1c2UgPSAxXG5jb25zdCBrc0NvbnRpbnVlID0gMlxuY29uc3QgeFBvcyA9IDBcbmNvbnN0IHlQb3MgPSAxXG5jb25zdCBjaGFuZ2VUaW1lUG9pbnQgPSA1XG5jb25zdCBjaGFuZ2VJbWFnZVBvaW50ID0gNVxuY29uc3QgR09MRCA9ICdnb2xkJ1xuY29uc3QgVFJFRSA9ICd0cmVlJ1xuY29uc3QgV0FURVIgPSAnd2F0ZXInXG5jb25zdCBGSVJFID0gJ2ZpcmUnXG5jb25zdCBTT0lMID0gJ3NvaWwnXG5jb25zdCBub2lzZUdvbGQgPSAnaHR0cDovL2xvY2FsaG9zdDo1MDAwLyVFOSU5MiU5Ri5tcDMnXG5jb25zdCBub2lzZVRyZWUgPSAnaHR0cDovL2xvY2FsaG9zdDo1MDAwLyVFNiVBMyVBRS5tcDMnXG5jb25zdCBub2lzZVdhdGVyID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTklOUIlQTgubXAzJ1xuY29uc3Qgbm9pc2VGaXJlID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTclODElQUIubXAzJ1xuY29uc3Qgbm9pc2VTb2lsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8lRTYlQkQlQUUubXAzJ1xuXG5sZXQgdGltZXJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W9kuW/gydcbiAgfVxuICBkYXRhID0ge1xuICAgIG1hcms6ICcuLi9pbWFnZS93YXRlci5wbmcnLFxuICAgIGRhdGVzOiAnJyxcbiAgICBzaG93SW1nZTogdHJ1ZSxcbiAgICB0aWNrOiAwLFxuICAgIHRpbWU6ICcnLFxuICAgIGtleToga3NTdGFydCxcbiAgICBrU3RhdHVzOiBbJ+W8gOWniycsICfmmoLlgZwnLCAn57un57utJ10sXG4gICAgZW5kS2V5OiAn57uT5p2fJyxcbiAgICB0b3VjaG1vdmU6IHRydWUsXG4gICAgY2hhbmdlUG9pbnQ6IDAsXG4gICAgaW1hZ2VOb2RlOiBXQVRFUixcbiAgICBiZ2NvbG9yOiAncmdiYSgwLCAyNTUsIDI1NSwgMC4xMiknLFxuICAgIGNpcmNsZWNvbG9yOiAncmdiYSgwLCAwLCAwLCAwKScsXG4gICAgc3RhclBvaW50OiBbMCwgMF0sXG4gICAgY3VyUG9pbnQ6IFswLCAwXSxcbiAgICB0b3VjaGVzOiBbMCwgMF0sXG4gICAgbm9pc2U6ICdodHRwOi8vbG9jYWxob3N0OjUwMDAv6ZuoLm1wMycsXG4gICAgdGV4dDogJ+mbqOawtCcsXG4gICAgc2hhZG93Y29sb3I6ICcjMzMzMzMzJ1xuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgZGF0ZShzZWxmKSB7XG4gICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIGNvbnN0IHdlZWtzID0gWydTdW4nLCAnTW9uJywgJ1R1ZXMnLCAnV2VkJywgJ1RodXInLCAnRnJpJywgJ1NhdCddXG4gICAgICBjb25zdCB3ZWVrID0gZGF0ZS5nZXRVVENEYXkoKVxuICAgICAgY29uc3Qgd2Vla2QgPSB3ZWVrc1t3ZWVrXVxuICAgICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKClcbiAgICAgIGNvbnN0IG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVnJywgJ1NlcHQnLCAnT2N0JywgJ05vdicsICdEZWMnXVxuICAgICAgY29uc3QgbW9uID0gbW9udGhzW21vbnRoXVxuICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKClcbiAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICAgIHNlbGYuZGF0ZXMgPSBtb24gKyAnICcgKyBkYXkgKyAnICcgKyB3ZWVrZCArICcgJyArIHllYXJcbiAgICB9LFxuICAgIC8vIOWIpOaWreaYr+WQpuW8gOWQr+iuoeaXtuWZqFxuICAgIHRpbWUoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGxldCBtaW4gPSAoc2VsZi50aWNrIC0gKHNlbGYudGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW5cbiAgICAgIHNlbGYubWV0aG9kcy5jaXJjbGVDb2xvckNoYW5nZShzZWxmKVxuICAgICAgc2VsZi5tZXRob2RzLnBsYXlub2lzZShzZWxmKVxuICAgICAgaWYgKG1pbiA+IHRpbWVMb3dsaW1pdCAmJiBtaW4gPD0gdGltZVVwbGltaXQpIHtcbiAgICAgICAgc2VsZi5tZXRob2RzLnRpbWVyKHNlbGYpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHdlcHkuZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUoe1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5tZXRob2RzLnBsYXlub2lzZShzZWxmKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSwgMTAwMClcbiAgICAgICAgc2VsZi5rZXkgPSBrc1BhdXNlXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDorqHml7blmahcbiAgICB0aW1lcihzZWxmKSB7XG4gICAgICBzZWxmLnRvdWNobW92ZSA9IGZhbHNlXG4gICAgICBpZiAoc2VsZi5rZXkgPT09IGtzU3RhcnQgfHwgc2VsZi5rZXkgPT09IGtzQ29udGludWUpIHtcbiAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnRpY2stLVxuICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICB3ZXB5LmdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLnN0YXR1cyAhPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlbGYubWV0aG9kcy5wbGF5bm9pc2Uoc2VsZilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKHNlbGYudGljayA9PT0gdGltZUxvd2xpbWl0KSB7XG4gICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgICB0b3VjaG1vdmU6IHRydWUsXG4gICAgICAgICAgICAgIGNpcmNsZWNvbG9yOiAncmdiYSgwLCAwLCAwLCAwKScsXG4gICAgICAgICAgICAgIGtleToga3NTdGFydCxcbiAgICAgICAgICAgICAgdGljazogaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluLFxuICAgICAgICAgICAgICB0aW1lOiBpbml0aWFsVGltZVRleHRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB3ZXB5LnN0b3BCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgICAgICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYudG91Y2htb3ZlID0gdHJ1ZVxuICAgICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDApJ1xuICAgICAgICAgICAgc2VsZi5rZXkgPSBrc1N0YXJ0XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMClcbiAgICAgICAgc2VsZi5rZXkgPSBrc1BhdXNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3ZXB5LnBhdXNlQmFja2dyb3VuZEF1ZGlvKClcbiAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICBzZWxmLmtleSA9IGtzQ29udGludWVcbiAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKDI1NSwgMjU1LCAwLCAwKSdcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOWIt+aWsOaXtumXtFxuICAgIHNldFRpbWUoc2VsZiwgdGljaykge1xuICAgICAgbGV0IGN1cnJlbnRUaW1lID0gc2VsZi5tZXRob2RzLmN1cnJlbnRUaW1lKHNlbGYudGljaylcbiAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgIHRpbWU6IGN1cnJlbnRUaW1lXG4gICAgICB9KVxuICAgICAgc2VsZi50aW1lID0gY3VycmVudFRpbWVcbiAgICB9LFxuICAgIHRpbWVyRW5kKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgd2VweS5zdG9wQmFja2dyb3VuZEF1ZGlvKClcbiAgICAgIHNlbGYua2V5ID0ga3NTdGFydFxuICAgICAgc2VsZi50aWNrID0gaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluXG4gICAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICAgIHNlbGYudG91Y2htb3ZlID0gdHJ1ZVxuICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDApJ1xuICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICcjMzMzMzMzJ1xuICAgIH0sXG4gICAgLy8g6K6h566X5pe26Ze05Y+K6L6T5Ye65qC85byPXG4gICAgY3VycmVudFRpbWUodGljaykge1xuICAgICAgbGV0IG1pbiA9ICh0aWNrIC0gKHRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluXG4gICAgICBsZXQgc2VjID0gdGljayAlIHNlY29uZHNQZXJNaW5cbiAgICAgIGlmIChtaW4gPiB0aW1lVXBsaW1pdCkge1xuICAgICAgICByZXR1cm4gJ+KInidcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtaW4gPCAxMCkge1xuICAgICAgICAgIG1pbiA9ICcwJyArIG1pblxuICAgICAgICB9XG4gICAgICAgIGlmIChzZWMgPCAxMCkge1xuICAgICAgICAgIHNlYyA9ICcwJyArIHNlY1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaW4gKyAnIDogJyArIHNlY1xuICAgICAgfVxuICAgIH0sXG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICAgIHNlbGYuY2hhbmdlUG9pbnQrK1xuICAgICAgaWYgKHNlbGYudG91Y2htb3ZlKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lQ2hhbmdlKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICB0b3VjaGVuZChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGlmIChzZWxmLnRvdWNobW92ZSkge1xuICAgICAgICBzZWxmLm1ldGhvZHMuaW1hZ2VDaGFuZ2Uoc2VsZilcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOS4iuS4i+a7keWKqOiwg+iKguaXtumXtFxuICAgIHRpbWVDaGFuZ2Uoc2VsZikge1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50W3hQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeFBvc11cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt5UG9zXSAtIHNlbGYuc3RhclBvaW50W3lQb3NdXG4gICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPCBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA+IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3lQb3NdID4gc2VsZi5zdGFyUG9pbnRbeVBvc10gJiYgc2VsZi50aWNrID4gMCkge1xuICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrIC0gc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeVBvc10gPCBzZWxmLnN0YXJQb2ludFt5UG9zXSkge1xuICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrICsgc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOW3puWPs+a7keWKqOiwg+iKguWbvueJh1xuICAgIGltYWdlQ2hhbmdlKHNlbGYpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt4UG9zXSAtIHNlbGYuc3RhclBvaW50W3hQb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeVBvc10gLSBzZWxmLnN0YXJQb2ludFt5UG9zXVxuICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID4gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VJbWFnZVBvaW50KSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeFBvc10gPiBzZWxmLnN0YXJQb2ludFt4UG9zXSkge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlIEdPTEQ6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBUUkVFOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICflr7rpkp8nXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBHT0xEXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VHb2xkXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBXQVRFUjpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn5qOu5p6XJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gVFJFRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZVRyZWVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIEZJUkU6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+mbqOawtCdcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFdBVEVSXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZVdhdGVyXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBTT0lMOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfnr53ngasnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBGSVJFXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlRmlyZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5jdXJQb2ludFt4UG9zXSA8IHNlbGYuc3RhclBvaW50W3hQb3NdKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYuaW1hZ2VOb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgR09MRDpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn5qOu5p6XJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gVFJFRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZVRyZWVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFRSRUU6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+mbqOawtCdcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFdBVEVSXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZVdhdGVyXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBXQVRFUjpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn56+d54GrJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gRklSRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZUZpcmVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIEZJUkU6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+a1qua9ridcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IFNPSUxcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZVNvaWxcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFNPSUw6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBwbGF5bm9pc2Uoc2VsZikge1xuICAgICAgd2VweS5wbGF5QmFja2dyb3VuZEF1ZGlvKHtcbiAgICAgICAgZGF0YVVybDogc2VsZi5ub2lzZVxuICAgICAgfSlcbiAgICB9LFxuICAgIGNpcmNsZUNvbG9yQ2hhbmdlKHNlbGYpIHtcbiAgICAgIHN3aXRjaCAoc2VsZi5pbWFnZU5vZGUpIHtcbiAgICAgICAgY2FzZSBHT0xEOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSggMjU1LCAyNTUsIDAsIDAuMSknXG4gICAgICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICdyZ2JhKCAyNTUsIDI1NSwgMCwgMSknXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBUUkVFOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjEpJ1xuICAgICAgICAgIHNlbGYuc2hhZG93Y29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAxKSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFdBVEVSOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4xKSdcbiAgICAgICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDEpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgRklSRTpcbiAgICAgICAgICBzZWxmLmNpcmNsZWNvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4xKSdcbiAgICAgICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMSknXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBTT0lMOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDAuMSknXG4gICAgICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICdyZ2JhKCAyMzgsIDk5LCA5OSwgMSknXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn5b2S5b+DJyxcbiAgICAgIGRlc2M6ICfpg73luILllqfpl7kg5L2V5aSE5b2S5b+DJyxcbiAgICAgIHBhdGg6ICcvcGFnZS9ub2lzZSdcbiAgICB9XG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIHNlbGYubWV0aG9kcy5kYXRlKHNlbGYpXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLnNob3dJbWdlID0gZmFsc2VcbiAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgIHNob3dJbWdlOiBmYWxzZVxuICAgICAgfSlcbiAgICB9LCAyMDAwKVxuICAgIHNlbGYudGltZSA9IGluaXRpYWxUaW1lVGV4dFxuICAgIHNlbGYudGljayA9IGluaXRpYWxUaW1lICogc2Vjb25kc1Blck1pblxuICB9XG59XG4iXX0=