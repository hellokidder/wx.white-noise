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

var calendar = require('./calendar.js');
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
var changeTimePoint = 1;
var changeImagePoint = 5;
var GOLD = 'gold';
var TREE = 'tree';
var WATER = 'water';
var FIRE = 'fire';
var SOIL = 'soil';
var noiseGold = 'http://www.smartestee.com/noise/gold.mp3';
var noiseTree = 'http://www.smartestee.com/noise/tree.mp3';
var noiseWater = 'http://www.smartestee.com/noise/water.mp3';
var noiseFire = 'http://www.smartestee.com/noise/fire.mp3';
var noiseSoil = 'http://www.smartestee.com/noise/soil.mp3';
var trueOpacity = 1;
var falseOpacity = 0.3;
var loop = '∞';

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
      lunar: '',
      lunarDay: '',
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
      noise: 'http://www.smartestee.com/noise/water.mp3',
      text: '雨水',
      shadowcolor: '#333333',
      goldPoint: falseOpacity,
      treePoint: falseOpacity,
      waterPoint: trueOpacity,
      firePoint: falseOpacity,
      soilPoint: falseOpacity,
      loops: loop,
      timer: null
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
        var lunardate = calendar.solar2lunar(year, month + 1, day);
        var lunarMonths = ['正月', '贰月', '叁月', '肆月', '伍月', '陆月', '七月', '捌月', '玖月', '拾月', '拾壹月', '腊月'];
        var lunarDays = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        if (lunardate.lDay <= 10) {
          self.lunarDay = '初' + lunarDays[lunardate.lDay - 1];
        } else if (lunardate.lDay > 10 && lunardate.lDay < 20) {
          self.lunarDay = '十' + lunarDays[lunardate.lDay - 11];
        } else if (lunardate.lDay > 20 && lunardate.lDay < 30) {
          self.lunarDay = '廿' + lunarDays[lunardate.lDay - 21];
        } else if (lunardate.lDay === 20) {
          self.lunarDay = '二十';
        } else if (lunardate.lDay === 30) {
          self.lunarDay = '三十';
        }
        self.lunar = '农历' + lunarMonths[lunardate.lMonth - 1] + self.lunarDay;
      },

      // 判断是否开启计时器
      time: function time() {
        var self = this;
        var min = (self.tick - self.tick % secondsPerMin) / secondsPerMin;
        self.methods.circleColorChange(self);
        self.methods.playnoise(self);
        if (min > timeLowlimit && min <= timeUplimit) {
          self.methods.timer(self, false);
        } else {
          self.methods.timer(self, true);
        }
      },

      // 计时器
      timer: function timer(self, loops) {
        self.touchmove = false;
        if (self.key === ksStart || self.key === ksContinue) {
          self.timer = setInterval(function () {
            if (self.tick === -1) {
              self.tick = -1;
            } else {
              self.tick--;
            }
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
                time: initialTimeText,
                shadowcolor: '#333333'
              });
              _wepy2.default.stopBackgroundAudio();
              self.time = initialTimeText;
              self.tick = initialTime * secondsPerMin;
              self.touchmove = true;
              self.circlecolor = 'rgba(0, 0, 0, 0)';
              self.shadowcolor = '#333333';
              self.key = ksStart;
              clearInterval(self.timer);
              var interval = setInterval(function () {
                console.log('interval');
                _wepy2.default.getBackgroundAudioPlayerState({
                  success: function success(res) {
                    if (res.status === 1) {
                      console.log('1');
                      _wepy2.default.pauseBackgroundAudio();
                      clearInterval(interval);
                    }
                  }
                });
              }, 100);
            }
          }, 1000);
          self.key = ksPause;
        } else {
          clearInterval(self.timer);
          var interval = setInterval(function () {
            console.log('interval');
            _wepy2.default.getBackgroundAudioPlayerState({
              success: function success(res) {
                if (res.status === 1) {
                  console.log('1');
                  _wepy2.default.pauseBackgroundAudio();
                  clearInterval(interval);
                }
              }
            });
          }, 100);
          self.methods.setTime(self, self.tick);
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
        clearInterval(self.timer);
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
        if (tick < 0) {
          return loop;
        } else {
          var min = (tick - tick % secondsPerMin) / secondsPerMin;
          var sec = tick % secondsPerMin;
          if (min > timeUplimit) {
            tick = -1;
            return loop;
          } else {
            if (min < 10) {
              min = '0' + min;
            }
            if (sec < 10) {
              sec = '0' + sec;
            }
            return min + ' : ' + sec;
          }
        }
      },
      playnoise: function playnoise(self) {
        _wepy2.default.playBackgroundAudio({
          dataUrl: self.noise
        });
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
                  self.goldPoint = trueOpacity;
                  self.treePoint = falseOpacity;
                  break;
                case WATER:
                  self.text = '森林';
                  self.imageNode = TREE;
                  self.bgcolor = 'rgba( 0, 255, 0, 0.12)';
                  self.noise = noiseTree;
                  self.treePoint = trueOpacity;
                  self.waterPoint = falseOpacity;
                  break;
                case FIRE:
                  self.text = '雨水';
                  self.imageNode = WATER;
                  self.bgcolor = 'rgba(0, 255, 255, 0.12)';
                  self.noise = noiseWater;
                  self.waterPoint = trueOpacity;
                  self.firePoint = falseOpacity;
                  break;
                case SOIL:
                  self.text = '篝火';
                  self.imageNode = FIRE;
                  self.bgcolor = 'rgba( 255, 0, 0, 0.12)';
                  self.noise = noiseFire;
                  self.firePoint = trueOpacity;
                  self.soilPoint = falseOpacity;
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
                  self.treePoint = trueOpacity;
                  self.goldPoint = falseOpacity;
                  break;
                case TREE:
                  self.text = '雨水';
                  self.imageNode = WATER;
                  self.bgcolor = 'rgba(0, 255, 255, 0.12)';
                  self.noise = noiseWater;
                  self.waterPoint = trueOpacity;
                  self.treePoint = falseOpacity;
                  break;
                case WATER:
                  self.text = '篝火';
                  self.imageNode = FIRE;
                  self.bgcolor = 'rgba( 255, 0, 0, 0.12)';
                  self.noise = noiseFire;
                  self.firePoint = trueOpacity;
                  self.waterPoint = falseOpacity;
                  break;
                case FIRE:
                  self.text = '浪潮';
                  self.imageNode = SOIL;
                  self.bgcolor = 'rgba( 238, 99, 99, 0.12)';
                  self.noise = noiseSoil;
                  self.soilPoint = trueOpacity;
                  self.firePoint = falseOpacity;
                  break;
                case SOIL:
                  break;
              }
              self.changePoint = 0;
            }
          }
        }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld25vaXNlLmpzIl0sIm5hbWVzIjpbImNhbGVuZGFyIiwicmVxdWlyZSIsImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxUaW1lIiwic2Vjb25kc1Blck1pbiIsInRpbWVVcGxpbWl0IiwidGltZUxvd2xpbWl0Iiwia3NTdGFydCIsImtzUGF1c2UiLCJrc0NvbnRpbnVlIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwiR09MRCIsIlRSRUUiLCJXQVRFUiIsIkZJUkUiLCJTT0lMIiwibm9pc2VHb2xkIiwibm9pc2VUcmVlIiwibm9pc2VXYXRlciIsIm5vaXNlRmlyZSIsIm5vaXNlU29pbCIsInRydWVPcGFjaXR5IiwiZmFsc2VPcGFjaXR5IiwibG9vcCIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtYXJrIiwiZGF0ZXMiLCJsdW5hciIsImx1bmFyRGF5Iiwic2hvd0ltZ2UiLCJ0aWNrIiwidGltZSIsImtleSIsImtTdGF0dXMiLCJlbmRLZXkiLCJ0b3VjaG1vdmUiLCJjaGFuZ2VQb2ludCIsImltYWdlTm9kZSIsImJnY29sb3IiLCJjaXJjbGVjb2xvciIsInN0YXJQb2ludCIsImN1clBvaW50IiwidG91Y2hlcyIsIm5vaXNlIiwidGV4dCIsInNoYWRvd2NvbG9yIiwiZ29sZFBvaW50IiwidHJlZVBvaW50Iiwid2F0ZXJQb2ludCIsImZpcmVQb2ludCIsInNvaWxQb2ludCIsImxvb3BzIiwidGltZXIiLCJtZXRob2RzIiwiZGF0ZSIsInNlbGYiLCJEYXRlIiwid2Vla3MiLCJ3ZWVrIiwiZ2V0VVRDRGF5Iiwid2Vla2QiLCJtb250aCIsImdldE1vbnRoIiwibW9udGhzIiwibW9uIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsImx1bmFyZGF0ZSIsInNvbGFyMmx1bmFyIiwibHVuYXJNb250aHMiLCJsdW5hckRheXMiLCJsRGF5IiwibE1vbnRoIiwibWluIiwiY2lyY2xlQ29sb3JDaGFuZ2UiLCJwbGF5bm9pc2UiLCJzZXRJbnRlcnZhbCIsInNldFRpbWUiLCJnZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSIsInN1Y2Nlc3MiLCJyZXMiLCJzdGF0dXMiLCJzZXREYXRhIiwic3RvcEJhY2tncm91bmRBdWRpbyIsImNsZWFySW50ZXJ2YWwiLCJpbnRlcnZhbCIsImNvbnNvbGUiLCJsb2ciLCJwYXVzZUJhY2tncm91bmRBdWRpbyIsImN1cnJlbnRUaW1lIiwidGltZXJFbmQiLCJzZWMiLCJwbGF5QmFja2dyb3VuZEF1ZGlvIiwiZGF0YVVybCIsInRvdWNoc3RhcnQiLCJlIiwicGFnZVgiLCJwYWdlWSIsInRpbWVDaGFuZ2UiLCJ0b3VjaGVuZCIsImltYWdlQ2hhbmdlIiwieGNoYW5nZSIsInljaGFuZ2UiLCJNYXRoIiwiYWJzIiwidGl0bGUiLCJkZXNjIiwicGF0aCIsInNldFRpbWVvdXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsV0FBV0MsUUFBUSxzQkFBUixDQUFqQjtBQUNBLElBQU1DLGtCQUFrQixTQUF4QjtBQUNBLElBQU1DLGNBQWMsRUFBcEI7QUFDQSxJQUFNQyxnQkFBZ0IsRUFBdEI7QUFDQSxJQUFNQyxjQUFjLEVBQXBCO0FBQ0EsSUFBTUMsZUFBZSxDQUFyQjtBQUNBLElBQU1DLFVBQVUsQ0FBaEI7QUFDQSxJQUFNQyxVQUFVLENBQWhCO0FBQ0EsSUFBTUMsYUFBYSxDQUFuQjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLGtCQUFrQixDQUF4QjtBQUNBLElBQU1DLG1CQUFtQixDQUF6QjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLFFBQVEsT0FBZDtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLFlBQVksMENBQWxCO0FB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ZUFBS2xDLElBQUw7QUFDRTRDLGlCQUFLaEIsV0FBTCxHQUFtQix1QkFBbkI7QUFDQWdCLGlCQUFLVixXQUFMLEdBQW1CLHFCQUFuQjtBQUNBO0FBQ0YsZUFBS2pDLElBQUw7QUFDRTJDLGlCQUFLaEIsV0FBTCxHQUFtQix5QkFBbkI7QUFDQWdCLGlCQUFLVixXQUFMLEdBQW1CLHVCQUFuQjtBQUNBO0FBcEJKO0FBc0JEO0FBNVNPLEs7Ozs7O3dDQThTVTtBQUNsQixhQUFPO0FBQ0w4RCxlQUFPLElBREY7QUFFTEMsY0FBTSxXQUZEO0FBR0xDLGNBQU07QUFIRCxPQUFQO0FBS0Q7Ozs2QkFDUTtBQUNQLFVBQUl0RCxPQUFPLElBQVg7QUFDQUEsV0FBS0YsT0FBTCxDQUFhQyxJQUFiLENBQWtCQyxJQUFsQjtBQUNBdUQsaUJBQVcsWUFBTTtBQUNmdkQsYUFBSzFCLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQTBCLGFBQUs2QixPQUFMLENBQWE7QUFDWHZELG9CQUFVO0FBREMsU0FBYjtBQUdELE9BTEQsRUFLRyxJQUxIO0FBTUEwQixXQUFLeEIsSUFBTCxHQUFZbkMsZUFBWjtBQUNBMkQsV0FBS3pCLElBQUwsR0FBWWpDLGNBQWNDLGFBQTFCO0FBQ0Q7Ozs7RUFsV2dDLGVBQUtpSCxJOztrQkFBbkIxRixLIiwiZmlsZSI6Im5ld25vaXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG5jb25zdCBjYWxlbmRhciA9IHJlcXVpcmUoJy4uL3BhZ2VzL2NhbGVuZGFyLmpzJylcbmNvbnN0IGluaXRpYWxUaW1lVGV4dCA9ICcyMCA6IDAwJ1xuY29uc3QgaW5pdGlhbFRpbWUgPSAyMFxuY29uc3Qgc2Vjb25kc1Blck1pbiA9IDYwXG5jb25zdCB0aW1lVXBsaW1pdCA9IDYwXG5jb25zdCB0aW1lTG93bGltaXQgPSAwXG5jb25zdCBrc1N0YXJ0ID0gMFxuY29uc3Qga3NQYXVzZSA9IDFcbmNvbnN0IGtzQ29udGludWUgPSAyXG5jb25zdCB4UG9zID0gMFxuY29uc3QgeVBvcyA9IDFcbmNvbnN0IGNoYW5nZVRpbWVQb2ludCA9IDFcbmNvbnN0IGNoYW5nZUltYWdlUG9pbnQgPSA1XG5jb25zdCBHT0xEID0gJ2dvbGQnXG5jb25zdCBUUkVFID0gJ3RyZWUnXG5jb25zdCBXQVRFUiA9ICd3YXRlcidcbmNvbnN0IEZJUkUgPSAnZmlyZSdcbmNvbnN0IFNPSUwgPSAnc29pbCdcbmNvbnN0IG5vaXNlR29sZCA9ICdodHRwOi8vd3d3LnNtYXJ0ZXN0ZWUuY29tL25vaXNlL2dvbGQubXAzJ1xuY29uc3Qgbm9pc2VUcmVlID0gJ2h0dHA6Ly93d3cuc21hcnRlc3RlZS5jb20vbm9pc2UvdHJlZS5tcDMnXG5jb25zdCBub2lzZVdhdGVyID0gJ2h0dHA6Ly93d3cuc21hcnRlc3RlZS5jb20vbm9pc2Uvd2F0ZXIubXAzJ1xuY29uc3Qgbm9pc2VGaXJlID0gJ2h0dHA6Ly93d3cuc21hcnRlc3RlZS5jb20vbm9pc2UvZmlyZS5tcDMnXG5jb25zdCBub2lzZVNvaWwgPSAnaHR0cDovL3d3dy5zbWFydGVzdGVlLmNvbS9ub2lzZS9zb2lsLm1wMydcbmNvbnN0IHRydWVPcGFjaXR5ID0gMVxuY29uc3QgZmFsc2VPcGFjaXR5ID0gMC4zXG5jb25zdCBsb29wID0gJ+KInidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W9kuW/gydcbiAgfVxuICBkYXRhID0ge1xuICAgIG1hcms6ICcuLi9pbWFnZS93YXRlci5wbmcnLFxuICAgIGRhdGVzOiAnJyxcbiAgICBsdW5hcjogJycsXG4gICAgbHVuYXJEYXk6ICcnLFxuICAgIHNob3dJbWdlOiB0cnVlLFxuICAgIHRpY2s6IDAsXG4gICAgdGltZTogJycsXG4gICAga2V5OiBrc1N0YXJ0LFxuICAgIGtTdGF0dXM6IFsn5byA5aeLJywgJ+aaguWBnCcsICfnu6fnu60nXSxcbiAgICBlbmRLZXk6ICfnu5PmnZ8nLFxuICAgIHRvdWNobW92ZTogdHJ1ZSxcbiAgICBjaGFuZ2VQb2ludDogMCxcbiAgICBpbWFnZU5vZGU6IFdBVEVSLFxuICAgIGJnY29sb3I6ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjEyKScsXG4gICAgY2lyY2xlY29sb3I6ICdyZ2JhKDAsIDAsIDAsIDApJyxcbiAgICBzdGFyUG9pbnQ6IFswLCAwXSxcbiAgICBjdXJQb2ludDogWzAsIDBdLFxuICAgIHRvdWNoZXM6IFswLCAwXSxcbiAgICBub2lzZTogJ2h0dHA6Ly93d3cuc21hcnRlc3RlZS5jb20vbm9pc2Uvd2F0ZXIubXAzJyxcbiAgICB0ZXh0OiAn6Zuo5rC0JyxcbiAgICBzaGFkb3djb2xvcjogJyMzMzMzMzMnLFxuICAgIGdvbGRQb2ludDogZmFsc2VPcGFjaXR5LFxuICAgIHRyZWVQb2ludDogZmFsc2VPcGFjaXR5LFxuICAgIHdhdGVyUG9pbnQ6IHRydWVPcGFjaXR5LFxuICAgIGZpcmVQb2ludDogZmFsc2VPcGFjaXR5LFxuICAgIHNvaWxQb2ludDogZmFsc2VPcGFjaXR5LFxuICAgIGxvb3BzOiBsb29wLFxuICAgIHRpbWVyOiBudWxsXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBkYXRlKHNlbGYpIHtcbiAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgY29uc3Qgd2Vla3MgPSBbJ1N1bicsICdNb24nLCAnVHVlcycsICdXZWQnLCAnVGh1cicsICdGcmknLCAnU2F0J11cbiAgICAgIGNvbnN0IHdlZWsgPSBkYXRlLmdldFVUQ0RheSgpXG4gICAgICBjb25zdCB3ZWVrZCA9IHdlZWtzW3dlZWtdXG4gICAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICAgICAgY29uc3QgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWcnLCAnU2VwdCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgICBjb25zdCBtb24gPSBtb250aHNbbW9udGhdXG4gICAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICAgICAgc2VsZi5kYXRlcyA9IG1vbiArICcgJyArIGRheSArICcgJyArIHdlZWtkICsgJyAnICsgeWVhclxuICAgICAgbGV0IGx1bmFyZGF0ZSA9IGNhbGVuZGFyLnNvbGFyMmx1bmFyKHllYXIsIG1vbnRoICsgMSwgZGF5KVxuICAgICAgY29uc3QgbHVuYXJNb250aHMgPSBbJ+ato+aciCcsICfotLDmnIgnLCAn5Y+B5pyIJywgJ+iChuaciCcsICfkvI3mnIgnLCAn6ZmG5pyIJywgJ+S4g+aciCcsICfmjYzmnIgnLCAn546W5pyIJywgJ+aLvuaciCcsICfmi77lo7nmnIgnLCAn6IWK5pyIJ11cbiAgICAgIGNvbnN0IGx1bmFyRGF5cyA9IFsn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nLCAn5LiDJywgJ+WFqycsICfkuZ0nLCAn5Y2BJ11cbiAgICAgIGlmIChsdW5hcmRhdGUubERheSA8PSAxMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+WInScgKyBsdW5hckRheXNbbHVuYXJkYXRlLmxEYXkgLSAxXVxuICAgICAgfSBlbHNlIGlmIChsdW5hcmRhdGUubERheSA+IDEwICYmIGx1bmFyZGF0ZS5sRGF5IDwgMjApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICfljYEnICsgbHVuYXJEYXlzW2x1bmFyZGF0ZS5sRGF5IC0gMTFdXG4gICAgICB9IGVsc2UgaWYgKGx1bmFyZGF0ZS5sRGF5ID4gMjAgJiYgbHVuYXJkYXRlLmxEYXkgPCAzMCkge1xuICAgICAgICBzZWxmLmx1bmFyRGF5ID0gJ+W7vycgKyBsdW5hckRheXNbbHVuYXJkYXRlLmxEYXkgLSAyMV1cbiAgICAgIH0gZWxzZSBpZiAobHVuYXJkYXRlLmxEYXkgPT09IDIwKSB7XG4gICAgICAgIHNlbGYubHVuYXJEYXkgPSAn5LqM5Y2BJ1xuICAgICAgfSBlbHNlIGlmIChsdW5hcmRhdGUubERheSA9PT0gMzApIHtcbiAgICAgICAgc2VsZi5sdW5hckRheSA9ICfkuInljYEnXG4gICAgICB9XG4gICAgICBzZWxmLmx1bmFyID0gJ+WGnOWOhicgKyBsdW5hck1vbnRoc1tsdW5hcmRhdGUubE1vbnRoIC0gMV0gKyBzZWxmLmx1bmFyRGF5XG4gICAgfSxcbiAgICAvLyDliKTmlq3mmK/lkKblvIDlkK/orqHml7blmahcbiAgICB0aW1lKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBsZXQgbWluID0gKHNlbGYudGljayAtIChzZWxmLnRpY2sgJSBzZWNvbmRzUGVyTWluKSkgLyBzZWNvbmRzUGVyTWluXG4gICAgICBzZWxmLm1ldGhvZHMuY2lyY2xlQ29sb3JDaGFuZ2Uoc2VsZilcbiAgICAgIHNlbGYubWV0aG9kcy5wbGF5bm9pc2Uoc2VsZilcbiAgICAgIGlmIChtaW4gPiB0aW1lTG93bGltaXQgJiYgbWluIDw9IHRpbWVVcGxpbWl0KSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lcihzZWxmLCBmYWxzZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lcihzZWxmLCB0cnVlKVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g6K6h5pe25ZmoXG4gICAgdGltZXIoc2VsZiwgbG9vcHMpIHtcbiAgICAgIHNlbGYudG91Y2htb3ZlID0gZmFsc2VcbiAgICAgIGlmIChzZWxmLmtleSA9PT0ga3NTdGFydCB8fCBzZWxmLmtleSA9PT0ga3NDb250aW51ZSkge1xuICAgICAgICBzZWxmLnRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHNlbGYudGljayA9PT0gLTEpIHtcbiAgICAgICAgICAgIHNlbGYudGljayA9IC0xXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYudGljay0tXG4gICAgICAgICAgfVxuICAgICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgICB3ZXB5LmdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLnN0YXR1cyAhPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlbGYubWV0aG9kcy5wbGF5bm9pc2Uoc2VsZilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKHNlbGYudGljayA9PT0gdGltZUxvd2xpbWl0KSB7XG4gICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICAgICAgICB0b3VjaG1vdmU6IHRydWUsXG4gICAgICAgICAgICAgIGNpcmNsZWNvbG9yOiAncmdiYSgwLCAwLCAwLCAwKScsXG4gICAgICAgICAgICAgIGtleToga3NTdGFydCxcbiAgICAgICAgICAgICAgdGljazogaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluLFxuICAgICAgICAgICAgICB0aW1lOiBpbml0aWFsVGltZVRleHQsXG4gICAgICAgICAgICAgIHNoYWRvd2NvbG9yOiAnIzMzMzMzMydcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB3ZXB5LnN0b3BCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgICAgICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgICAgICAgICBzZWxmLnRpY2sgPSBpbml0aWFsVGltZSAqIHNlY29uZHNQZXJNaW5cbiAgICAgICAgICAgIHNlbGYudG91Y2htb3ZlID0gdHJ1ZVxuICAgICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDApJ1xuICAgICAgICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICcjMzMzMzMzJ1xuICAgICAgICAgICAgc2VsZi5rZXkgPSBrc1N0YXJ0XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHNlbGYudGltZXIpXG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ludGVydmFsJylcbiAgICAgICAgICAgICAgd2VweS5nZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSh7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnMScpXG4gICAgICAgICAgICAgICAgICAgIHdlcHkucGF1c2VCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sIDEwMClcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDApXG4gICAgICAgIHNlbGYua2V5ID0ga3NQYXVzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLnRpbWVyKVxuICAgICAgICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnaW50ZXJ2YWwnKVxuICAgICAgICAgIHdlcHkuZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUoe1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJzEnKVxuICAgICAgICAgICAgICAgIHdlcHkucGF1c2VCYWNrZ3JvdW5kQXVkaW8oKVxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9LCAxMDApXG4gICAgICAgIHNlbGYubWV0aG9kcy5zZXRUaW1lKHNlbGYsIHNlbGYudGljaylcbiAgICAgICAgc2VsZi5rZXkgPSBrc0NvbnRpbnVlXG4gICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSgyNTUsIDI1NSwgMCwgMCknXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDliLfmlrDml7bpl7RcbiAgICBzZXRUaW1lKHNlbGYsIHRpY2spIHtcbiAgICAgIGxldCBjdXJyZW50VGltZSA9IHNlbGYubWV0aG9kcy5jdXJyZW50VGltZShzZWxmLnRpY2spXG4gICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICB0aW1lOiBjdXJyZW50VGltZVxuICAgICAgfSlcbiAgICAgIHNlbGYudGltZSA9IGN1cnJlbnRUaW1lXG4gICAgfSxcbiAgICB0aW1lckVuZCgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLnRpbWVyKVxuICAgICAgd2VweS5zdG9wQmFja2dyb3VuZEF1ZGlvKClcbiAgICAgIHNlbGYua2V5ID0ga3NTdGFydFxuICAgICAgc2VsZi50aWNrID0gaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluXG4gICAgICBzZWxmLnRpbWUgPSBpbml0aWFsVGltZVRleHRcbiAgICAgIHNlbGYudG91Y2htb3ZlID0gdHJ1ZVxuICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDApJ1xuICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICcjMzMzMzMzJ1xuICAgIH0sXG4gICAgLy8g6K6h566X5pe26Ze05Y+K6L6T5Ye65qC85byPXG4gICAgY3VycmVudFRpbWUodGljaykge1xuICAgICAgaWYgKHRpY2sgPCAwKSB7XG4gICAgICAgIHJldHVybiBsb29wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgbWluID0gKHRpY2sgLSAodGljayAlIHNlY29uZHNQZXJNaW4pKSAvIHNlY29uZHNQZXJNaW5cbiAgICAgICAgbGV0IHNlYyA9IHRpY2sgJSBzZWNvbmRzUGVyTWluXG4gICAgICAgIGlmIChtaW4gPiB0aW1lVXBsaW1pdCkge1xuICAgICAgICAgIHRpY2sgPSAtMVxuICAgICAgICAgIHJldHVybiBsb29wXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG1pbiA8IDEwKSB7XG4gICAgICAgICAgICBtaW4gPSAnMCcgKyBtaW5cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlYyA8IDEwKSB7XG4gICAgICAgICAgICBzZWMgPSAnMCcgKyBzZWNcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1pbiArICcgOiAnICsgc2VjXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHBsYXlub2lzZShzZWxmKSB7XG4gICAgICB3ZXB5LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xuICAgICAgICBkYXRhVXJsOiBzZWxmLm5vaXNlXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICAgIHNlbGYuY2hhbmdlUG9pbnQrK1xuICAgICAgaWYgKHNlbGYudG91Y2htb3ZlKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lQ2hhbmdlKHNlbGYpXG4gICAgICB9XG4gICAgfSxcbiAgICB0b3VjaGVuZChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGlmIChzZWxmLnRvdWNobW92ZSkge1xuICAgICAgICBzZWxmLm1ldGhvZHMuaW1hZ2VDaGFuZ2Uoc2VsZilcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOS4iuS4i+a7keWKqOiwg+iKguaXtumXtFxuICAgIHRpbWVDaGFuZ2Uoc2VsZikge1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50W3hQb3NdIC0gc2VsZi5zdGFyUG9pbnRbeFBvc11cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt5UG9zXSAtIHNlbGYuc3RhclBvaW50W3lQb3NdXG4gICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPCBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA+IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50W3lQb3NdID4gc2VsZi5zdGFyUG9pbnRbeVBvc10gJiYgc2VsZi50aWNrID4gMCkge1xuICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrIC0gc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeVBvc10gPCBzZWxmLnN0YXJQb2ludFt5UG9zXSkge1xuICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrICsgc2Vjb25kc1Blck1pblxuICAgICAgICAgICAgc2VsZi5tZXRob2RzLnNldFRpbWUoc2VsZiwgc2VsZi50aWNrKVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOW3puWPs+a7keWKqOiwg+iKguWbvueJh1xuICAgIGltYWdlQ2hhbmdlKHNlbGYpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFt4UG9zXSAtIHNlbGYuc3RhclBvaW50W3hQb3NdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbeVBvc10gLSBzZWxmLnN0YXJQb2ludFt5UG9zXVxuICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID4gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPiBjaGFuZ2VJbWFnZVBvaW50KSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbeFBvc10gPiBzZWxmLnN0YXJQb2ludFt4UG9zXSkge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlIEdPTEQ6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBUUkVFOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICflr7rpkp8nXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBHT0xEXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VHb2xkXG4gICAgICAgICAgICAgICAgc2VsZi5nb2xkUG9pbnQgPSB0cnVlT3BhY2l0eVxuICAgICAgICAgICAgICAgIHNlbGYudHJlZVBvaW50ID0gZmFsc2VPcGFjaXR5XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBXQVRFUjpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn5qOu5p6XJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gVFJFRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZVRyZWVcbiAgICAgICAgICAgICAgICBzZWxmLnRyZWVQb2ludCA9IHRydWVPcGFjaXR5XG4gICAgICAgICAgICAgICAgc2VsZi53YXRlclBvaW50ID0gZmFsc2VPcGFjaXR5XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBGSVJFOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfpm6jmsLQnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBXQVRFUlxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VXYXRlclxuICAgICAgICAgICAgICAgIHNlbGYud2F0ZXJQb2ludCA9IHRydWVPcGFjaXR5XG4gICAgICAgICAgICAgICAgc2VsZi5maXJlUG9pbnQgPSBmYWxzZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIFNPSUw6XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0ID0gJ+evneeBqydcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlTm9kZSA9IEZJUkVcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VGaXJlXG4gICAgICAgICAgICAgICAgc2VsZi5maXJlUG9pbnQgPSB0cnVlT3BhY2l0eVxuICAgICAgICAgICAgICAgIHNlbGYuc29pbFBvaW50ID0gZmFsc2VPcGFjaXR5XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfSBlbHNlIGlmIChzZWxmLmN1clBvaW50W3hQb3NdIDwgc2VsZi5zdGFyUG9pbnRbeFBvc10pIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBHT0xEOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfmo67mnpcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBUUkVFXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlVHJlZVxuICAgICAgICAgICAgICAgIHNlbGYudHJlZVBvaW50ID0gdHJ1ZU9wYWNpdHlcbiAgICAgICAgICAgICAgICBzZWxmLmdvbGRQb2ludCA9IGZhbHNlT3BhY2l0eVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgVFJFRTpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn6Zuo5rC0J1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gV0FURVJcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4xMiknXG4gICAgICAgICAgICAgICAgc2VsZi5ub2lzZSA9IG5vaXNlV2F0ZXJcbiAgICAgICAgICAgICAgICBzZWxmLndhdGVyUG9pbnQgPSB0cnVlT3BhY2l0eVxuICAgICAgICAgICAgICAgIHNlbGYudHJlZVBvaW50ID0gZmFsc2VPcGFjaXR5XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBXQVRFUjpcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQgPSAn56+d54GrJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gRklSRVxuICAgICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMTIpJ1xuICAgICAgICAgICAgICAgIHNlbGYubm9pc2UgPSBub2lzZUZpcmVcbiAgICAgICAgICAgICAgICBzZWxmLmZpcmVQb2ludCA9IHRydWVPcGFjaXR5XG4gICAgICAgICAgICAgICAgc2VsZi53YXRlclBvaW50ID0gZmFsc2VPcGFjaXR5XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBGSVJFOlxuICAgICAgICAgICAgICAgIHNlbGYudGV4dCA9ICfmtarmva4nXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSBTT0lMXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDIzOCwgOTksIDk5LCAwLjEyKSdcbiAgICAgICAgICAgICAgICBzZWxmLm5vaXNlID0gbm9pc2VTb2lsXG4gICAgICAgICAgICAgICAgc2VsZi5zb2lsUG9pbnQgPSB0cnVlT3BhY2l0eVxuICAgICAgICAgICAgICAgIHNlbGYuZmlyZVBvaW50ID0gZmFsc2VPcGFjaXR5XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSBTT0lMOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgY2lyY2xlQ29sb3JDaGFuZ2Uoc2VsZikge1xuICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICBjYXNlIEdPTEQ6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAyNTUsIDI1NSwgMCwgMC4xKSdcbiAgICAgICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAxKSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFRSRUU6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMSknXG4gICAgICAgICAgc2VsZi5zaGFkb3djb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDEpJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgV0FURVI6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjEpJ1xuICAgICAgICAgIHNlbGYuc2hhZG93Y29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMSknXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBGSVJFOlxuICAgICAgICAgIHNlbGYuY2lyY2xlY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjEpJ1xuICAgICAgICAgIHNlbGYuc2hhZG93Y29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAxKSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFNPSUw6XG4gICAgICAgICAgc2VsZi5jaXJjbGVjb2xvciA9ICdyZ2JhKCAyMzgsIDk5LCA5OSwgMC4xKSdcbiAgICAgICAgICBzZWxmLnNoYWRvd2NvbG9yID0gJ3JnYmEoIDIzOCwgOTksIDk5LCAxKSdcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICflvZLlv4MnLFxuICAgICAgZGVzYzogJ+mDveW4guWWp+mXuSDkvZXlpITlvZLlv4MnLFxuICAgICAgcGF0aDogJy9wYWdlL25vaXNlJ1xuICAgIH1cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgc2VsZi5tZXRob2RzLmRhdGUoc2VsZilcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlbGYuc2hvd0ltZ2UgPSBmYWxzZVxuICAgICAgc2VsZi5zZXREYXRhKHtcbiAgICAgICAgc2hvd0ltZ2U6IGZhbHNlXG4gICAgICB9KVxuICAgIH0sIDIwMDApXG4gICAgc2VsZi50aW1lID0gaW5pdGlhbFRpbWVUZXh0XG4gICAgc2VsZi50aWNrID0gaW5pdGlhbFRpbWUgKiBzZWNvbmRzUGVyTWluXG4gIH1cbn1cbiJdfQ==