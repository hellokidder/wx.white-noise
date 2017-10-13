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
      bgcolor: 'rgba(0, 255, 255, 0.3)',
      node: '3',
      month: '',
      mon: '',
      day: '',
      week: '',
      weekd: '',
      year: '',
      bg: 'url(https://b-ssl.duitang.com/uploads/item/201511/07/20151107225500_VBkwS.thumb.700_0.jpeg)'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbIldhdGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtYXJrIiwic3RhclBvaW50IiwiY3VyUG9pbnQiLCJiZ2NvbG9yIiwibm9kZSIsIm1vbnRoIiwibW9uIiwiZGF5Iiwid2VlayIsIndlZWtkIiwieWVhciIsImJnIiwibWV0aG9kcyIsInRvdWNoc3RhcnQiLCJlIiwic2VsZiIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwidG91Y2htb3ZlIiwidG91Y2hlbmQiLCJ4Y2hhbmdlIiwieWNoYW5nZSIsIk1hdGgiLCJhYnMiLCJjb25zb2xlIiwibG9nIiwiZGF0ZSIsIkRhdGUiLCJnZXRVVENEYXkiLCJnZXRNb250aCIsImdldERhdGUiLCJnZXRGdWxsWWVhciIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxZQUFNLG9CQUREO0FBRUxDLGlCQUFXLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FGTjtBQUdMQyxnQkFBVSxDQUFDLENBQUQsRUFBSSxDQUFKLENBSEw7QUFJTEMsZUFBUyx3QkFKSjtBQUtMQyxZQUFNLEdBTEQ7QUFNTEMsYUFBTyxFQU5GO0FBT0xDLFdBQUssRUFQQTtBQVFMQyxXQUFLLEVBUkE7QUFTTEMsWUFBTSxFQVREO0FBVUxDLGFBQU8sRUFWRjtBQVdMQyxZQUFNLEVBWEQ7QUFZTEMsVUFBSTtBQVpDLEssUUFjUEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxDQURILEVBQ007QUFDWixZQUFJQyxPQUFPLElBQVg7QUFDQUEsYUFBS2QsU0FBTCxHQUFpQixDQUFDYSxFQUFFRSxPQUFGLENBQVUsQ0FBVixFQUFhQyxLQUFkLEVBQXFCSCxFQUFFRSxPQUFGLENBQVUsQ0FBVixFQUFhRSxLQUFsQyxD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TUFBWDtBQUNBO0FBQ0YsYUFBSyxDQUFMO0FBQ0VTLGVBQUtULEdBQUwsR0FBVyxLQUFYO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDRVMsZUFBS1QsR0FBTCxHQUFXLE1BQVg7QUFDQTtBQUNGLGFBQUssQ0FBTDtBQUNFUyxlQUFLVCxHQUFMLEdBQVcsS0FBWDtBQUNBO0FBQ0YsYUFBSyxFQUFMO0FBQ0VTLGVBQUtULEdBQUwsR0FBVyxLQUFYO0FBQ0E7QUFDRixhQUFLLEVBQUw7QUFDRVMsZUFBS1QsR0FBTCxHQUFXLEtBQVg7QUFDQTtBQXBDSjtBQXNDQVMsV0FBS1IsR0FBTCxHQUFXb0IsS0FBS0ksT0FBTCxFQUFYO0FBQ0FoQixXQUFLTCxJQUFMLEdBQVlpQixLQUFLSyxXQUFMLEVBQVo7QUFDRDs7OztFQXZLZ0MsZUFBS0MsSTs7a0JBQW5CckMsSyIsImZpbGUiOiJub2lzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflkL7lv4PlvZLlpIQnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBtYXJrOiAnLi4vaW1hZ2Uvd2F0ZXIucG5nJyxcbiAgICBzdGFyUG9pbnQ6IFswLCAwXSxcbiAgICBjdXJQb2ludDogWzAsIDBdLFxuICAgIGJnY29sb3I6ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJyxcbiAgICBub2RlOiAnMycsXG4gICAgbW9udGg6ICcnLFxuICAgIG1vbjogJycsXG4gICAgZGF5OiAnJyxcbiAgICB3ZWVrOiAnJyxcbiAgICB3ZWVrZDogJycsXG4gICAgeWVhcjogJycsXG4gICAgYmc6ICd1cmwoaHR0cHM6Ly9iLXNzbC5kdWl0YW5nLmNvbS91cGxvYWRzL2l0ZW0vMjAxNTExLzA3LzIwMTUxMTA3MjI1NTAwX1ZCa3dTLnRodW1iLjcwMF8wLmpwZWcpJ1xuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICB9LFxuICAgIHRvdWNoZW5kKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgbGV0IHhjaGFuZ2UgPSBzZWxmLmN1clBvaW50WzBdIC0gc2VsZi5zdGFyUG9pbnRbMF1cbiAgICAgIGxldCB5Y2hhbmdlID0gc2VsZi5jdXJQb2ludFsxXSAtIHNlbGYuc3RhclBvaW50WzFdXG5cbiAgICAgIGlmIChzZWxmLmN1clBvaW50WzBdID49IHNlbGYuc3RhclBvaW50WzBdKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICAgIHN3aXRjaCAoc2VsZi5ub2RlKSB7XG4gICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZ29sZC5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICcxJ1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMidcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzQnOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvd2F0ZXIucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMydcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICc1JzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnNCdcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgc3dpdGNoIChzZWxmLm5vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvdHJlZS5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICcyJ1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMCwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICczJ1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvZmlyZS5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICc0J1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjU1LCAwLCAwLCAwLjMpJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9zb2lsLnBuZydcbiAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzUnXG4gICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyMzgsIDk5LCA5OSwgMC4zKSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIHNlbGYud2VlayA9IGRhdGUuZ2V0VVRDRGF5KClcbiAgICBzd2l0Y2ggKHNlbGYud2Vlaykge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBzZWxmLndlZWtkID0gJ1N1bidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgc2VsZi53ZWVrZCA9ICdNb24nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDI6XG4gICAgICAgIHNlbGYud2Vla2QgPSAnVHVlcydcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgc2VsZi53ZWVrZCA9ICdXZWQnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHNlbGYud2Vla2QgPSAnVGh1cidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgc2VsZi53ZWVrZCA9ICdGcmknXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDY6XG4gICAgICAgIHNlbGYud2Vla2QgPSAnU2F0J1xuICAgICAgICBicmVha1xuICAgIH1cbiAgICBzZWxmLm1vbnRoID0gZGF0ZS5nZXRNb250aCgpXG4gICAgc3dpdGNoIChzZWxmLm1vbnRoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHNlbGYubW9uID0gJ0phbidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgc2VsZi5tb24gPSAnRmViJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzZWxmLm1vbiA9ICdNYXInXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHNlbGYubW9uID0gJ0FwcidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgc2VsZi5tb24gPSAnTWF5J1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA1OlxuICAgICAgICBzZWxmLm1vbiA9ICdKdW5lJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA2OlxuICAgICAgICBzZWxmLm1vbiA9ICdKdWx5J1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA3OlxuICAgICAgICBzZWxmLm1vbiA9ICdBdWcnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDg6XG4gICAgICAgIHNlbGYubW9uID0gJ1NlcHQnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDk6XG4gICAgICAgIHNlbGYubW9uID0gJ09jdCdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMTA6XG4gICAgICAgIHNlbGYubW9uID0gJ05vdidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMTE6XG4gICAgICAgIHNlbGYubW9uID0gJ0RlYydcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgc2VsZi5kYXkgPSBkYXRlLmdldERhdGUoKVxuICAgIHNlbGYueWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICB9XG59XG4iXX0=