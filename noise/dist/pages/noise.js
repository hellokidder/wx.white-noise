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
          var tickCount = _self.tick;
          timer = setInterval(function () {
            tickCount--;
            _self.setData({
              tick: tickCount
            });
            _self.tick = tickCount;

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbInNlY29uZHNQZXJNaW4iLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwidGltZXIiLCJXYXRlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwic3dpdGNoIiwic2hvd0ltZyIsIm1hcmsiLCJzdGFyUG9pbnQiLCJjdXJQb2ludCIsImJnY29sb3IiLCJpbWFnZU5vZGUiLCJ0aWNrIiwia2V5IiwiZGF0ZXMiLCJlbmQiLCJjaGFuZ2VQb2ludCIsIm1ldGhvZHMiLCJ0aW1lQ2hhbmdlIiwic2VsZiIsImUiLCJ0b3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsInhjaGFuZ2UiLCJ5Y2hhbmdlIiwiTWF0aCIsImFicyIsImltYWdlQ2hhbmdlIiwidG91Y2hzdGFydCIsInRvdWNobW92ZSIsInRvdWNoZW5kIiwiZmxvb3IiLCJjbGVhckludGVydmFsIiwidGlja0NvdW50Iiwic2V0SW50ZXJ2YWwiLCJzZXREYXRhIiwiY29uc29sZSIsImxvZyIsImZsb29yRW5kIiwidGl0bGUiLCJkZXNjIiwicGF0aCIsImRhdGUiLCJEYXRlIiwid2Vla3MiLCJ3ZWVrIiwiZ2V0VVRDRGF5Iiwid2Vla2QiLCJtb250aCIsImdldE1vbnRoIiwibW9udGhzIiwibW9uIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsInNldFRpbWVvdXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsZ0JBQWdCLEVBQXRCO0FBQ0EsSUFBTUMsa0JBQWtCLENBQXhCO0FBQ0EsSUFBTUMsbUJBQW1CLENBQXpCO0FBQ0EsSUFBSUMsUUFBUSxJQUFaOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGNBQVEsSUFESDtBQUVMQyxlQUFTLElBRko7QUFHTEMsWUFBTSxvQkFIRDtBQUlMQyxpQkFBVyxDQUFDLENBQUQsRUFBSSxDQUFKLENBSk47QUFLTEMsZ0JBQVUsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUxMO0FBTUxDLGVBQVMsd0JBTko7QUFPTEMsaUJBQVcsR0FQTjtBQVFMQyxZQUFNLENBUkQ7QUFTTEMsV0FBSyxJQVRBO0FBVUxDLGFBQU8sRUFWRjtBQVdMQyxXQUFLLElBWEE7QUFZTEMsbUJBQWE7QUFaUixLLFFBY1BDLE8sR0FBVTtBQUNSQyxnQkFEUSxzQkFDR0MsSUFESCxFQUNTQyxDQURULEVBQ1k7QUFDbEJELGFBQUtWLFFBQUwsR0FBZ0IsQ0FBQ1csRUFBRUMsT0FBRixDQUFVLENBQVYsRUFBYUMsS0FBZCxFQUFxQkYsRUFBRUMsT0FBRixDQUFVLENBQVYsRUFBYUUsS0FBbEMsQ0FBaEI7QUFDQSxZQUFJQyxVQUFVTCxLQUFLVixRQUFMLENBQWMsQ0FBZCxJQUFtQlUsS0FBS1gsU0FBTCxDQUFlLENBQWYsQ0FBakM7QUFDQSxZQUFJaUIsVUFBVU4sS0FBS1YsUUFBTCxDQUFjLENBQWQsSUFBbUJVLEtBQUtYLFNBQUwsQ0FBZSxDQUFmLENBQWpDO0FBQ0EsWUFBSVcsS0FBS1YsUUFBTCxDQUFjLENBQWQsS0FBb0JVLEtBQUtYLFNBQUwsQ0FBZSxDQUFmLENBQXhCLEVBQTJDO0FBQ3pDLGNBQUlrQixLQUFLQyxHQUFMLENBQVNILE9BQVQsS0FBcUJFLEtBQUtDLEdBQUwsQ0FBU0YsT0FBVCxDQUF6QixFQUE0QyxDQUMzQyxDQURELE1BQ087QUFDTCxnQkFBSU4sS0FBS1YsUUFBTCxDQUFjLENBQWQsS0FBb0JVLEtBQUtYLFNBQUwsQ0FBZSxDQUFmLENBQXhCLEVBQTJDO0FBQ3pDLGtCQUFLVyxLQUFLUCxJQUFMLEdBQVksRUFBYixHQUFtQixDQUF2QixFQUEwQjtBQUN4Qk8scUJBQUtILFdBQUwsR0FBbUJHLEtBQUtILFdBQUwsR0FBbUIsQ0FBdEM7QUFDQSxvQkFBSUcsS0FBS0gsV0FBTCxLQUFxQmxCLGVBQXpCLEVBQTBDO0FBQ3hDcUIsdUJBQUtQLElBQUwsR0FBWU8sS0FBS1AsSUFBTCxHQUFZLEVBQXhCO0FBQ0FPLHVCQUFLSCxXQUFMLEdBQW1CLENBQW5CO0FBQ0Q7QUFDRjtBQUNGLGFBUkQsTUFRTztBQUNMLGtCQUFLRyxLQUFLUCxJQUFMLEdBQVksRUFBYixHQUFtQixFQUF2QixFQUEyQjtBQUN6Qk8scUJBQUtILFdBQUwsR0FBbUJHLEtBQUtILFdBQUwsR0FBbUIsQ0FBdEM7QUFDQSxvQkFBSUcsS0FBS0gsV0FBTCxLQUFxQmxCLGVBQXpCLEVBQTBDO0FBQ3hDcUIsdUJBQUtQLElBQUwsR0FBWU8sS0FBS1AsSUFBTCxHQUFZLEVBQXhCO0FBQ0FPLHVCQUFLSCxXQUFMLEdBQW1CLENBQW5CO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUFDRixTQXJCRCxNQXFCTztBQUNMLGNBQUlVLEtBQUtDLEdBQUwsQ0FBU0gsT0FBVCxLQUFxQkUsS0FBS0MsR0FBTCxDQUFTRixPQUFULENBQXpCLEVBQTRDLENBQzNDLENBREQsTUFDTztBQUNMLGdCQUFJTixLQUFLVixRQUFMLENBQWMsQ0FBZCxLQUFvQlUsS0FBS1gsU0FBTCxDQUFlLENBQWYsQ0FBeEIsRUFBMkM7QUFDekMsa0JBQUtXLEtBQUtQLElBQUwsR0FBWSxFQUFiLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3hCTyxxQkFBS0gsV0FBTCxHQUFtQkcsS0FBS0gsV0FBTCxHQUFtQixDQUF0QztBQUNBLG9CQUFJRyxLQUFLSCxXQUFMLEtBQXFCbEIsZUFBekIsRUFBMEM7QUFDeENxQix1QkFBS1AsSUFBTCxHQUFZTyxLQUFLUCxJQUFMLEdBQVksRUFBeEI7QUFDQU8sdUJBQUtILFdBQUwsR0FBbUIsQ0FBbkI7QUFDRDtBQUNGO0FBQ0YsYUFSRCxNQVFPO0FBQ0wsa0JBQUtHLEtBQUtQLElBQUwsR0FBWSxFQUFiLEdBQW1CLEVBQXZCLEVBQTJCO0FBQ3pCTyxxQkFBS0gsV0FBTCxHQUFtQkcsS0FBS0gsV0FBTCxHQUFtQixDQUF0QztBQUNBLG9CQUFJRyxLQUFLSCxXQUFMLEtBQXFCbEIsZUFBekIsRUFBMEM7QUFDeENxQix1QkFBS1AsSUFBTCxHQUFZTyxLQUFLUCxJQUFMLEdBQVksRUFBeEI7QUFDQU8sdUJBQUtILFdBQUwsR0FBbUIsQ0FBbkI7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUNGO0FBQ0YsT0FoRE87QUFrRFJZLGlCQWxEUSx1QkFrRElULElBbERKLEVBa0RVQyxDQWxEVixFQWtEYTtBQUNuQixZQUFJSSxVQUFVTCxLQUFLVixRQUFMLENBQWMsQ0FBZCxJQUFtQlUsS0FBS1gsU0FBTCxDQUFlLENBQWYsQ0FBakM7QUFDQSxZQUFJaUIsVUFBVU4sS0FBS1YsUUFBTCxDQUFjLENBQWQsSUFBbUJVLEtBQUtYLFNBQUwsQ0FBZSxDQUFmLENBQWpDOztBQUVBLFlBQUlXLEtBQUtWLFFBQUwsQ0FBYyxDQUFkLEtBQW9CVSxLQUFLWCxTQUFMLENBQWUsQ0FBZixDQUF4QixFQUEyQztBQUN6QyxjQUFJa0IsS0FBS0MsR0FBTCxDQUFTSCxPQUFULEtBQXFCRSxLQUFLQyxHQUFMLENBQVNGLE9BQVQsQ0FBekIsRUFBNEM7QUFDMUNOLGlCQUFLSCxXQUFMLEdBQW1CRyxLQUFLSCxXQUFMLEdBQW1CLENBQXRDO0FBQ0EsZ0JBQUlHLEtBQUtILFdBQUwsS0FBcUJqQixnQkFBekIsRUFBMkM7QUFDekMsc0JBQVFvQixLQUFLUixTQUFiO0FBQ0UscUJBQUssR0FBTDtBQUNFO0FBQ0YscUJBQUssR0FBTDtBQUNFUSx1QkFBS1osSUFBTCxHQUFZLG1CQUFaO0FBQ0FZLHVCQUFLUixTQUFMLEdBQWlCLEdBQWpCO0FBQ0FRLHVCQUFLVCxPQUFMLEdBQWUseUJBQWY7QUFDQTtBQUNGLHFCQUFLLEdBQUw7QUFDRVMsdUJBQUtaLElBQUwsR0FBWSxtQkFBWjtBQUNBWSx1QkFBS1IsU0FBTCxHQUFpQixHQUFqQjtBQUNBUSx1QkFBS1QsT0FBTCxHQUFlLHVCQUFmO0FBQ0E7QUFDRixxQkFBSyxHQUFMO0FBQ0VTLHVCQUFLWixJQUFMLEdBQVksb0JBQVo7QUFDQVksdUJBQUtSLFNBQUwsR0FBaUIsR0FBakI7QUFDQVEsdUJBQUtULE9BQUwsR0FBZSx3QkFBZjtBQUNBO0FBQ0YscUJBQUssR0FBTDtBQUNFUyx1QkFBS1osSUFBTCxHQUFZLG1CQUFaO0FBQ0FZLHVCQUFLUixTQUFMLEdBQWlCLEdBQWpCO0FBQ0FRLHVCQUFLVCxPQUFMLEdBQWUsdUJBQWY7QUFDQTtBQXRCSjtBQXdCQVMsbUJBQUtILFdBQUwsR0FBbUIsQ0FBbkI7QUFDRDtBQUNGLFdBN0JELE1BNkJPO0FBQ0wsZ0JBQUlHLEtBQUtWLFFBQUwsQ0FBYyxDQUFkLEtBQW9CVSxLQUFLWCxTQUFMLENBQWUsQ0FBZixDQUF4QixFQUEyQyxDQUMxQyxDQURELE1BQ08sQ0FDTjtBQUNGO0FBQ0YsU0FuQ0QsTUFtQ087QUFDTCxjQUFJa0IsS0FBS0MsR0FBTCxDQUFTSCxPQUFULEtBQXFCRSxLQUFLQyxHQUFMLENBQVNGLE9BQVQsQ0FBekIsRUFBNEM7QUFDMUNOLGlCQUFLSCxXQUFMLEdBQW1CRyxLQUFLSCxXQUFMLEdBQW1CLENBQXRDO0FBQ0EsZ0JBQUlHLEtBQUtILFdBQUwsS0FBcUJqQixnQkFBekIsRUFBMkM7QUFDekMsc0JBQVFvQixLQUFLUixTQUFiO0FBQ0UscUJBQUssR0FBTDtBQUNFUSx1QkFBS1osSUFBTCxHQUFZLG1CQUFaO0FBQ0FZLHVCQUFLUixTQUFMLEdBQWlCLEdBQWpCO0FBQ0FRLHVCQUFLVCxPQUFMLEdBQWUsdUJBQWY7QUFDQTtBQUNGLHFCQUFLLEdBQUw7QUFDRVMsdUJBQUtaLElBQUwsR0FBWSxvQkFBWjtBQUNBWSx1QkFBS1IsU0FBTCxHQUFpQixHQUFqQjtBQUNBUSx1QkFBS1QsT0FBTCxHQUFlLHdCQUFmO0FBQ0E7QUFDRixxQkFBSyxHQUFMO0FBQ0VTLHVCQUFLWixJQUFMLEdBQVksbUJBQVo7QUFDQVksdUJBQUtSLFNBQUwsR0FBaUIsR0FBakI7QUFDQVEsdUJBQUtULE9BQUwsR0FBZSx1QkFBZjtBQUNBO0FBQ0YscUJBQUssR0FBTDtBQUNFUyx1QkFBS1osSUFBTCxHQUFZLG1CQUFaO0FBQ0FZLHVCQUFLUixTQUFMLEdBQWlCLEdBQWpCO0FBQ0FRLHVCQUFLVCxPQUFMLEdBQWUseUJBQWY7QUFDQTtBQUNGLHFCQUFLLEdBQUw7QUFDRTtBQXRCSjtBQXdCQVMsbUJBQUtILFdBQUwsR0FBbUIsQ0FBbkI7QUFDRDtBQUNGLFdBN0JELE1BNkJPO0FBQ0wsZ0JBQUlHLEtBQUtWLFFBQUwsQ0FBYyxDQUFkLEtBQW9CVSxLQUFLWCxTQUFMLENBQWUsQ0FBZixDQUF4QixFQUEyQyxDQUMxQyxDQURELE1BQ08sQ0FDTjtBQUNGO0FBQ0Y7QUFDRixPQTdITztBQStIUnFCLGdCQS9IUSxzQkErSEdULENBL0hILEVBK0hNO0FBQ1osWUFBSUQsT0FBTyxJQUFYO0FBQ0FBLGFBQUtYLFNBQUwsR0FBaUIsQ0FBQ1ksRUFBRUMsT0FBRixDQUFVLENBQVYsRUFBYUMsS0FBZCxFQUFxQkYsRUFBRUMsT0FBRixDQUFVLENBQVYsRUFBYUUsS0FBbEMsQ0FBakI7QUFDRCxPQWxJTztBQW1JUk8sZUFuSVEscUJBbUlFVixDQW5JRixFQW1JSztBQUNYLFlBQUlELE9BQU8sSUFBWDtBQUNBLFlBQUlBLEtBQUtkLE1BQVQsRUFBaUI7QUFDZmMsZUFBS0YsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxJQUF4QixFQUE4QkMsQ0FBOUI7QUFDRDtBQUNGLE9BeElPO0FBMElSVyxjQTFJUSxvQkEwSUNYLENBMUlELEVBMElJO0FBQ1YsWUFBSUQsT0FBTyxJQUFYO0FBQ0EsWUFBSUEsS0FBS2QsTUFBVCxFQUFpQjtBQUNmYyxlQUFLRixPQUFMLENBQWFXLFdBQWIsQ0FBeUJULElBQXpCLEVBQStCQyxDQUEvQjtBQUNEO0FBQ0YsT0EvSU87QUFpSlJZLFdBakpRLG1CQWlKQTtBQUNOLFlBQUliLE9BQU8sSUFBWDtBQUNBLFlBQUluQixLQUFKLEVBQVc7QUFDVGlDLHdCQUFjakMsS0FBZDtBQUNEO0FBQ0QsWUFBSW1CLEtBQUtOLEdBQUwsS0FBYSxJQUFiLElBQXFCTSxLQUFLTixHQUFMLEtBQWEsSUFBdEMsRUFBNEM7QUFDMUMsY0FBSU0sUUFBTyxJQUFYO0FBQ0EsY0FBSWUsWUFBWWYsTUFBS1AsSUFBckI7QUFDQVosa0JBQVFtQyxZQUFZLFlBQU07QUFDeEJEO0FBQ0FmLGtCQUFLaUIsT0FBTCxDQUFhO0FBQ1h4QixvQkFBTXNCO0FBREssYUFBYjtBQUdBZixrQkFBS1AsSUFBTCxHQUFZc0IsU0FBWjs7QUFFQSxnQkFBSWYsTUFBS1AsSUFBTCxLQUFjLENBQWxCLEVBQXFCO0FBQ25CcUIsNEJBQWNqQyxLQUFkO0FBQ0Q7QUFDRHFDLG9CQUFRQyxHQUFSLENBQVluQixNQUFLUCxJQUFqQjtBQUNELFdBWE8sRUFXTCxJQVhLLENBQVI7QUFZQU8sZ0JBQUtOLEdBQUwsR0FBVyxJQUFYO0FBQ0FNLGdCQUFLZCxNQUFMLEdBQWMsS0FBZDtBQUNELFNBakJELE1BaUJPO0FBQ0xjLGVBQUtOLEdBQUwsR0FBVyxJQUFYO0FBQ0FvQix3QkFBY2pDLEtBQWQ7QUFDRDtBQUNGLE9BM0tPO0FBNEtSdUMsY0E1S1Esc0JBNEtHO0FBQ1QsWUFBSXBCLE9BQU8sSUFBWDtBQUNBYyxzQkFBY2pDLEtBQWQ7QUFDQW1CLGFBQUtOLEdBQUwsR0FBVyxJQUFYO0FBQ0FNLGFBQUtkLE1BQUwsR0FBYyxJQUFkO0FBQ0FjLGFBQUtQLElBQUwsR0FBWSxLQUFLZixhQUFqQjtBQUNBd0MsZ0JBQVFDLEdBQVIsQ0FBWW5CLEtBQUtkLE1BQWpCO0FBQ0Q7QUFuTE8sSzs7Ozs7d0NBcUxVO0FBQ2xCLGFBQU87QUFDTG1DLGVBQU8sSUFERjtBQUVMQyxjQUFNLFdBRkQ7QUFHTEMsY0FBTTtBQUhELE9BQVA7QUFLRDs7OzZCQUVRO0FBQ1AsVUFBSUMsT0FBTyxJQUFJQyxJQUFKLEVBQVg7QUFDQSxVQUFJekIsT0FBTyxJQUFYO0FBQ0EsVUFBTTBCLFFBQVEsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLE1BQWYsRUFBdUIsS0FBdkIsRUFBOEIsTUFBOUIsRUFBc0MsS0FBdEMsRUFBNkMsS0FBN0MsQ0FBZDtBQUNBLFVBQU1DLE9BQU9ILEtBQUtJLFNBQUwsRUFBYjtBQUNBLFVBQU1DLFFBQVFILE1BQU1DLElBQU4sQ0FBZDtBQUNBLFVBQU1HLFFBQVFOLEtBQUtPLFFBQUwsRUFBZDtBQUNBLFVBQU1DLFNBQVMsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsTUFBcEMsRUFBNEMsTUFBNUMsRUFBb0QsS0FBcEQsRUFBMkQsTUFBM0QsRUFBbUUsS0FBbkUsRUFBMEUsS0FBMUUsRUFBaUYsS0FBakYsQ0FBZjtBQUNBLFVBQU1DLE1BQU1ELE9BQU9GLEtBQVAsQ0FBWjtBQUNBLFVBQU1JLE1BQU1WLEtBQUtXLE9BQUwsRUFBWjtBQUNBLFVBQU1DLE9BQU9aLEtBQUthLFdBQUwsRUFBYjtBQUNBckMsV0FBS0wsS0FBTCxHQUFhc0MsTUFBTSxHQUFOLEdBQVlDLEdBQVosR0FBa0IsR0FBbEIsR0FBd0JMLEtBQXhCLEdBQWdDLEdBQWhDLEdBQXNDTyxJQUFuRDtBQUNBcEMsV0FBS1AsSUFBTCxHQUFZLEtBQUtmLGFBQWpCO0FBQ0E0RCxpQkFBVyxZQUFNO0FBQ2Z0QyxhQUFLYixPQUFMLEdBQWUsS0FBZjtBQUNBYSxhQUFLaUIsT0FBTCxDQUFhO0FBQ1g5QixtQkFBUztBQURFLFNBQWI7QUFHRCxPQUxELEVBS0csSUFMSDtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEOzs7O0VBeE9nQyxlQUFLb0QsSTs7a0JBQW5CekQsSyIsImZpbGUiOiJub2lzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuY29uc3Qgc2Vjb25kc1Blck1pbiA9IDYwXG5jb25zdCBjaGFuZ2VUaW1lUG9pbnQgPSA1XG5jb25zdCBjaGFuZ2VJbWFnZVBvaW50ID0gM1xubGV0IHRpbWVyID0gbnVsbFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5b2S5b+DJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgc3dpdGNoOiB0cnVlLFxuICAgIHNob3dJbWc6IHRydWUsXG4gICAgbWFyazogJy4uL2ltYWdlL3dhdGVyLnBuZycsXG4gICAgc3RhclBvaW50OiBbMCwgMF0sXG4gICAgY3VyUG9pbnQ6IFswLCAwXSxcbiAgICBiZ2NvbG9yOiAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKScsXG4gICAgaW1hZ2VOb2RlOiAnMycsXG4gICAgdGljazogMCxcbiAgICBrZXk6ICflvIDlp4snLFxuICAgIGRhdGVzOiAnJyxcbiAgICBlbmQ6ICfnu5PmnZ8nLFxuICAgIGNoYW5nZVBvaW50OiAwXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICB0aW1lQ2hhbmdlKHNlbGYsIGUpIHtcbiAgICAgIHNlbGYuY3VyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMF0gLSBzZWxmLnN0YXJQb2ludFswXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50WzFdIC0gc2VsZi5zdGFyUG9pbnRbMV1cbiAgICAgIGlmIChzZWxmLmN1clBvaW50WzBdID49IHNlbGYuc3RhclBvaW50WzBdKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgICBpZiAoKHNlbGYudGljayAvIDYwKSA+IDApIHtcbiAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IHNlbGYuY2hhbmdlUG9pbnQgKyAxXG4gICAgICAgICAgICAgIGlmIChzZWxmLmNoYW5nZVBvaW50ID09PSBjaGFuZ2VUaW1lUG9pbnQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRpY2sgPSBzZWxmLnRpY2sgLSA2MFxuICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKChzZWxmLnRpY2sgLyA2MCkgPCA2MCkge1xuICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gc2VsZi5jaGFuZ2VQb2ludCArIDFcbiAgICAgICAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPT09IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayArIDYwXG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICAgIGlmICgoc2VsZi50aWNrIC8gNjApID4gMCkge1xuICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gc2VsZi5jaGFuZ2VQb2ludCArIDFcbiAgICAgICAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPT09IGNoYW5nZVRpbWVQb2ludCkge1xuICAgICAgICAgICAgICAgIHNlbGYudGljayA9IHNlbGYudGljayAtIDYwXG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoKHNlbGYudGljayAvIDYwKSA8IDYwKSB7XG4gICAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSBzZWxmLmNoYW5nZVBvaW50ICsgMVxuICAgICAgICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA9PT0gY2hhbmdlVGltZVBvaW50KSB7XG4gICAgICAgICAgICAgICAgc2VsZi50aWNrID0gc2VsZi50aWNrICsgNjBcbiAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGltYWdlQ2hhbmdlKHNlbGYsIGUpIHtcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFswXSAtIHNlbGYuc3RhclBvaW50WzBdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMV0gLSBzZWxmLnN0YXJQb2ludFsxXVxuXG4gICAgICBpZiAoc2VsZi5jdXJQb2ludFswXSA+PSBzZWxmLnN0YXJQb2ludFswXSkge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgICBzZWxmLmNoYW5nZVBvaW50ID0gc2VsZi5jaGFuZ2VQb2ludCArIDFcbiAgICAgICAgICBpZiAoc2VsZi5jaGFuZ2VQb2ludCA9PT0gY2hhbmdlSW1hZ2VQb2ludCkge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLmltYWdlTm9kZSkge1xuICAgICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZ29sZC5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnMSdcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJzInXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvd2F0ZXIucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJzMnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJzQnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgc2VsZi5jaGFuZ2VQb2ludCA9IHNlbGYuY2hhbmdlUG9pbnQgKyAxXG4gICAgICAgICAgaWYgKHNlbGYuY2hhbmdlUG9pbnQgPT09IGNoYW5nZUltYWdlUG9pbnQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5pbWFnZU5vZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJzInXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvd2F0ZXIucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJzMnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VOb2RlID0gJzQnXG4gICAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvc29pbC5wbmcnXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZU5vZGUgPSAnNSdcbiAgICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDAuMyknXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY2hhbmdlUG9pbnQgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYgKHNlbGYuc3dpdGNoKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy50aW1lQ2hhbmdlKHNlbGYsIGUpXG4gICAgICB9XG4gICAgfSxcblxuICAgIHRvdWNoZW5kKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYgKHNlbGYuc3dpdGNoKSB7XG4gICAgICAgIHNlbGYubWV0aG9kcy5pbWFnZUNoYW5nZShzZWxmLCBlKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBmbG9vcigpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICB9XG4gICAgICBpZiAoc2VsZi5rZXkgPT09ICflvIDlp4snIHx8IHNlbGYua2V5ID09PSAn57un57utJykge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgbGV0IHRpY2tDb3VudCA9IHNlbGYudGlja1xuICAgICAgICB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICB0aWNrQ291bnQtLVxuICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4gICAgICAgICAgICB0aWNrOiB0aWNrQ291bnRcbiAgICAgICAgICB9KVxuICAgICAgICAgIHNlbGYudGljayA9IHRpY2tDb3VudFxuXG4gICAgICAgICAgaWYgKHNlbGYudGljayA9PT0gMCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coc2VsZi50aWNrKVxuICAgICAgICB9LCAxMDAwKVxuICAgICAgICBzZWxmLmtleSA9ICfmmoLlgZwnXG4gICAgICAgIHNlbGYuc3dpdGNoID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYua2V5ID0gJ+e7p+e7rSdcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgIH1cbiAgICB9LFxuICAgIGZsb29yRW5kKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgc2VsZi5rZXkgPSAn5byA5aeLJ1xuICAgICAgc2VsZi5zd2l0Y2ggPSB0cnVlXG4gICAgICBzZWxmLnRpY2sgPSAyMCAqIHNlY29uZHNQZXJNaW5cbiAgICAgIGNvbnNvbGUubG9nKHNlbGYuc3dpdGNoKVxuICAgIH1cbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICflvZLlv4MnLFxuICAgICAgZGVzYzogJ+mDveW4guWWp+mXuSDkvZXlpITlvZLlv4MnLFxuICAgICAgcGF0aDogJy9wYWdlL25vaXNlJ1xuICAgIH1cbiAgfVxuXG4gIG9uTG9hZCgpIHtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBjb25zdCB3ZWVrcyA9IFsnU3VuJywgJ01vbicsICdUdWVzJywgJ1dlZCcsICdUaHVyJywgJ0ZyaScsICdTYXQnXVxuICAgIGNvbnN0IHdlZWsgPSBkYXRlLmdldFVUQ0RheSgpXG4gICAgY29uc3Qgd2Vla2QgPSB3ZWVrc1t3ZWVrXVxuICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpXG4gICAgY29uc3QgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWcnLCAnU2VwdCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgY29uc3QgbW9uID0gbW9udGhzW21vbnRoXVxuICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpXG4gICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICAgIHNlbGYuZGF0ZXMgPSBtb24gKyAnICcgKyBkYXkgKyAnICcgKyB3ZWVrZCArICcgJyArIHllYXJcbiAgICBzZWxmLnRpY2sgPSAyMCAqIHNlY29uZHNQZXJNaW5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlbGYuc2hvd0ltZyA9IGZhbHNlXG4gICAgICBzZWxmLnNldERhdGEoe1xuICAgICAgICBzaG93SW1nOiBmYWxzZVxuICAgICAgfSlcbiAgICB9LCAyMDAwKVxuICAgIC8vIHdlcHkucmVxdWVzdCh7XG4gICAgLy8gICB1cmw6ICdodHRwOi8vMTI3LjAuMC4xOjcwMDEvdm9pY2UvbGlzdCcsXG4gICAgLy8gICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2cocmVzKVxuICAgIC8vICAgfVxuICAgIC8vIH0pXG4gIH1cbn1cbiJdfQ==