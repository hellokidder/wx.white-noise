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
      navigationBarTitleText: '吾心归处'
    }, _this.data = {
      mark: '../image/water.png',
      starPoint: [0, 0],
      curPoint: [0, 0],
      bgcolor: '#66ffff',
      node: '3',
      month: '',
      mon: '',
      day: '',
      week: '',
      weekd: '',
      year: ''
    }, _this.methods = {
      touchstart: function touchstart(e) {
        var self = this;
        self.starPoint = [e.touches[0].pageX, e.touches[0].pageY];
      },
      touchmove: function touchmove(e) {
        var self = this;
        self.curPoint = [e.touches[0].pageX, e.touches[0].pageY];
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
                self.bgcolor = '#ffff33';
                console.log(self);
                self.config.navigationBarBackgroundColor = '#ffff33';
                break;
              case '3':
                self.mark = '../image/tree.png';
                self.node = '2';
                self.bgcolor = '#99ff00';
                self.config.navigationBarBackgroundColor = '#99ff00';
                break;
              case '4':
                self.mark = '../image/water.png';
                self.node = '3';
                self.bgcolor = '#66ffff';
                self.config.navigationBarBackgroundColor = '#66ffff';
                break;
              case '5':
                self.mark = '../image/fire.png';
                self.node = '4';
                self.bgcolor = '#ff0000';
                self.config.navigationBarBackgroundColor = '#ff0000';
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
                self.bgcolor = '#99ff00';
                self.config.navigationBarBackgroundColor = '#ffffff';
                break;
              case '2':
                self.mark = '../image/water.png';
                self.node = '3';
                self.bgcolor = '#66ffff';
                break;
              case '3':
                self.mark = '../image/fire.png';
                self.node = '4';
                self.bgcolor = '#ff0000';
                break;
              case '4':
                self.mark = '../image/soil.png';
                self.node = '5';
                self.bgcolor = '#ff9999';
                break;
              case '5':
                break;
            }
          } else {
            if (self.curPoint[1] >= self.starPoint[1]) {} else {}
          }
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Water, [{
    key: 'onLoad',
    value: function onLoad() {
      var date = new Date();
      var self = this;
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
    }
  }]);

  return Water;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Water , 'pages/noise'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbIldhdGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtYXJrIiwic3RhclBvaW50IiwiY3VyUG9pbnQiLCJiZ2NvbG9yIiwibm9kZSIsIm1vbnRoIiwibW9uIiwiZGF5Iiwid2VlayIsIndlZWtkIiwieWVhciIsIm1ldGhvZHMiLCJ0b3VjaHN0YXJ0IiwiZSIsInNlbGYiLCJ0b3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsInRvdWNobW92ZSIsInRvdWNoZW5kIiwieGNoYW5nZSIsInljaGFuZ2UiLCJNYXRoIiwiYWJzIiwiY29uc29sZSIsImxvZyIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJkYXRlIiwiRGF0ZSIsImdldFVUQ0RheSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEZ1bGxZZWFyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFlBQU0sb0JBREQ7QUFFTEMsaUJBQVcsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUZOO0FBR0xDLGdCQUFVLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FITDtBQUlMQyxlQUFTLFNBSko7QUFLTEMsWUFBTSxHQUxEO0FBTUxDLGFBQU8sRUFORjtBQU9MQyxXQUFLLEVBUEE7QUFRTEMsV0FBSyxFQVJBO0FBU0xDLFlBQU0sRUFURDtBQVVMQyxhQUFPLEVBVkY7QUFXTEMsWUFBTTtBQVhELEssUUFhUEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxDQURILEVBQ007QUFDWixZQUFJQyxPQUFPLElBQVg7QUFDQUEsYUFBS2IsU0FBTCxHQUFpQixDQUFDWSxFQUFFRSxPQUFGLENBQVUsQ0FBVixFQUFhQyxLQUFkLEVBQXFCSCxFQUFFRSxPQUFGLENBQVUsQ0FBVixFQUFh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RixhQUFLLENBQUw7QUFDRVEsZUFBS1IsR0FBTCxHQUFXLEtBQVg7QUFDQTtBQUNGLGFBQUssQ0FBTDtBQUNFUSxlQUFLUixHQUFMLEdBQVcsS0FBWDtBQUNBO0FBQ0YsYUFBSyxDQUFMO0FBQ0VRLGVBQUtSLEdBQUwsR0FBVyxLQUFYO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDRVEsZUFBS1IsR0FBTCxHQUFXLE1BQVg7QUFDQTtBQUNGLGFBQUssQ0FBTDtBQUNFUSxlQUFLUixHQUFMLEdBQVcsTUFBWDtBQUNBO0FBQ0YsYUFBSyxDQUFMO0FBQ0VRLGVBQUtSLEdBQUwsR0FBVyxLQUFYO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDRVEsZUFBS1IsR0FBTCxHQUFXLE1BQVg7QUFDQTtBQUNGLGFBQUssQ0FBTDtBQUNFUSxlQUFLUixHQUFMLEdBQVcsS0FBWDtBQUNBO0FBQ0YsYUFBSyxFQUFMO0FBQ0VRLGVBQUtSLEdBQUwsR0FBVyxLQUFYO0FBQ0E7QUFDRixhQUFLLEVBQUw7QUFDRVEsZUFBS1IsR0FBTCxHQUFXLEtBQVg7QUFDQTtBQXBDSjtBQXNDQVEsV0FBS1AsR0FBTCxHQUFXb0IsS0FBS0ksT0FBTCxFQUFYO0FBQ0FqQixXQUFLSixJQUFMLEdBQVlpQixLQUFLSyxXQUFMLEVBQVo7QUFDRDs7OztFQTNLZ0MsZUFBS0MsSTs7a0JBQW5CckMsSyIsImZpbGUiOiJub2lzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflkL7lv4PlvZLlpIQnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBtYXJrOiAnLi4vaW1hZ2Uvd2F0ZXIucG5nJyxcbiAgICBzdGFyUG9pbnQ6IFswLCAwXSxcbiAgICBjdXJQb2ludDogWzAsIDBdLFxuICAgIGJnY29sb3I6ICcjNjZmZmZmJyxcbiAgICBub2RlOiAnMycsXG4gICAgbW9udGg6ICcnLFxuICAgIG1vbjogJycsXG4gICAgZGF5OiAnJyxcbiAgICB3ZWVrOiAnJyxcbiAgICB3ZWVrZDogJycsXG4gICAgeWVhcjogJydcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHRvdWNoc3RhcnQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLnN0YXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICB9LFxuICAgIHRvdWNobW92ZShlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuY3VyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgfSxcbiAgICB0b3VjaGVuZChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFswXSAtIHNlbGYuc3RhclBvaW50WzBdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMV0gLSBzZWxmLnN0YXJQb2ludFsxXVxuXG4gICAgICBpZiAoc2VsZi5jdXJQb2ludFswXSA+PSBzZWxmLnN0YXJQb2ludFswXSkge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgICBzd2l0Y2ggKHNlbGYubm9kZSkge1xuICAgICAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2dvbGQucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMSdcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJyNmZmZmMzMnXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYpXG4gICAgICAgICAgICAgIHNlbGYuY29uZmlnLm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZmYzMydcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvdHJlZS5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICcyJ1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAnIzk5ZmYwMCdcbiAgICAgICAgICAgICAgc2VsZi5jb25maWcubmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciA9ICcjOTlmZjAwJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICczJ1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAnIzY2ZmZmZidcbiAgICAgICAgICAgICAgc2VsZi5jb25maWcubmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciA9ICcjNjZmZmZmJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9maXJlLnBuZydcbiAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzQnXG4gICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICcjZmYwMDAwJ1xuICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5uYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yID0gJyNmZjAwMDAnXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICAgIHN3aXRjaCAoc2VsZi5ub2RlKSB7XG4gICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMidcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJyM5OWZmMDAnXG4gICAgICAgICAgICAgIHNlbGYuY29uZmlnLm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZmZmZidcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvd2F0ZXIucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMydcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJyM2NmZmZmYnXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnNCdcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJyNmZjAwMDAnXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3NvaWwucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnNSdcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJyNmZjk5OTknXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICc1JzpcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBzZWxmLndlZWsgPSBkYXRlLmdldFVUQ0RheSgpXG4gICAgc3dpdGNoIChzZWxmLndlZWspIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgc2VsZi53ZWVrZCA9ICdTdW4nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDE6XG4gICAgICAgIHNlbGYud2Vla2QgPSAnTW9uJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzZWxmLndlZWtkID0gJ1R1ZXMnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHNlbGYud2Vla2QgPSAnV2VkJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA0OlxuICAgICAgICBzZWxmLndlZWtkID0gJ1RodXInXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDU6XG4gICAgICAgIHNlbGYud2Vla2QgPSAnRnJpJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA2OlxuICAgICAgICBzZWxmLndlZWtkID0gJ1NhdCdcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgc2VsZi5tb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICAgIHN3aXRjaCAoc2VsZi5tb250aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBzZWxmLm1vbiA9ICdKYW4nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDE6XG4gICAgICAgIHNlbGYubW9uID0gJ0ZlYidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgc2VsZi5tb24gPSAnTWFyJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAzOlxuICAgICAgICBzZWxmLm1vbiA9ICdBcHInXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHNlbGYubW9uID0gJ01heSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgc2VsZi5tb24gPSAnSnVuZSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgc2VsZi5tb24gPSAnSnVseSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNzpcbiAgICAgICAgc2VsZi5tb24gPSAnQXVnJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA4OlxuICAgICAgICBzZWxmLm1vbiA9ICdTZXB0J1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA5OlxuICAgICAgICBzZWxmLm1vbiA9ICdPY3QnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDEwOlxuICAgICAgICBzZWxmLm1vbiA9ICdOb3YnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDExOlxuICAgICAgICBzZWxmLm1vbiA9ICdEZWMnXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICAgIHNlbGYuZGF5ID0gZGF0ZS5nZXREYXRlKClcbiAgICBzZWxmLnllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgfVxufVxuIl19