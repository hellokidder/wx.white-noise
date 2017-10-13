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
      bgcolor: '',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbIldhdGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtYXJrIiwic3RhclBvaW50IiwiY3VyUG9pbnQiLCJiZ2NvbG9yIiwibm9kZSIsIm1vbnRoIiwibW9uIiwiZGF5Iiwid2VlayIsIndlZWtkIiwieWVhciIsImJnIiwibWV0aG9kcyIsInRvdWNoc3RhcnQiLCJlIiwic2VsZiIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwidG91Y2htb3ZlIiwidG91Y2hlbmQiLCJ4Y2hhbmdlIiwieWNoYW5nZSIsIk1hdGgiLCJhYnMiLCJjb25zb2xlIiwibG9nIiwiZGF0ZSIsIkRhdGUiLCJnZXRVVENEYXkiLCJnZXRNb250aCIsImdldERhdGUiLCJnZXRGdWxsWWVhciIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxZQUFNLG9CQUREO0FBRUxDLGlCQUFXLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FGTjtBQUdMQyxnQkFBVSxDQUFDLENBQUQsRUFBSSxDQUFKLENBSEw7QUFJTEMsZUFBUyxFQUpKO0FBS0xDLFlBQU0sR0FMRDtBQU1MQyxhQUFPLEVBTkY7QUFPTEMsV0FBSyxFQVBBO0FBUUxDLFdBQUssRUFSQTtBQVNMQyxZQUFNLEVBVEQ7QUFVTEMsYUFBTyxFQVZGO0FBV0xDLFlBQU0sRUFYRDtBQVlMQyxVQUFJO0FBWkMsSyxRQWNQQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0dDLENBREgsRUFDTTtBQUNaLFlBQUlDLE9BQU8sSUFBWDtBQUNBQSxhQUFLZCxTQUFMLEdBQWlCLENBQUNhLEVBQUVFLE9BQUYsQ0FBVSxDQUFWLEVBQWFDLEtBQWQsRUFBcUJILEVBQUVFLE9BQUYsQ0FBVSxDQUFWLEVBQWFFLEtBQWxDLENB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QUFYO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDRVMsZUFBS1QsR0FBTCxHQUFXLEtBQVg7QUFDQTtBQUNGLGFBQUssQ0FBTDtBQUNFUyxlQUFLVCxHQUFMLEdBQVcsTUFBWDtBQUNBO0FBQ0YsYUFBSyxDQUFMO0FBQ0VTLGVBQUtULEdBQUwsR0FBVyxLQUFYO0FBQ0E7QUFDRixhQUFLLEVBQUw7QUFDRVMsZUFBS1QsR0FBTCxHQUFXLEtBQVg7QUFDQTtBQUNGLGFBQUssRUFBTDtBQUNFUyxlQUFLVCxHQUFMLEdBQVcsS0FBWDtBQUNBO0FBcENKO0FBc0NBUyxXQUFLUixHQUFMLEdBQVdvQixLQUFLSSxPQUFMLEVBQVg7QUFDQWhCLFdBQUtMLElBQUwsR0FBWWlCLEtBQUtLLFdBQUwsRUFBWjtBQUNEOzs7O0VBdktnQyxlQUFLQyxJOztrQkFBbkJyQyxLIiwiZmlsZSI6Im5vaXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F0ZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WQvuW/g+W9kuWkhCdcbiAgfVxuICBkYXRhID0ge1xuICAgIG1hcms6ICcuLi9pbWFnZS93YXRlci5wbmcnLFxuICAgIHN0YXJQb2ludDogWzAsIDBdLFxuICAgIGN1clBvaW50OiBbMCwgMF0sXG4gICAgYmdjb2xvcjogJycsXG4gICAgbm9kZTogJzMnLFxuICAgIG1vbnRoOiAnJyxcbiAgICBtb246ICcnLFxuICAgIGRheTogJycsXG4gICAgd2VlazogJycsXG4gICAgd2Vla2Q6ICcnLFxuICAgIHllYXI6ICcnLFxuICAgIGJnOiAndXJsKGh0dHBzOi8vYi1zc2wuZHVpdGFuZy5jb20vdXBsb2Fkcy9pdGVtLzIwMTUxMS8wNy8yMDE1MTEwNzIyNTUwMF9WQmt3Uy50aHVtYi43MDBfMC5qcGVnKSdcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHRvdWNoc3RhcnQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLnN0YXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICB9LFxuICAgIHRvdWNobW92ZShlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuY3VyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgfSxcbiAgICB0b3VjaGVuZChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFswXSAtIHNlbGYuc3RhclBvaW50WzBdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMV0gLSBzZWxmLnN0YXJQb2ludFsxXVxuXG4gICAgICBpZiAoc2VsZi5jdXJQb2ludFswXSA+PSBzZWxmLnN0YXJQb2ludFswXSkge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgICBzd2l0Y2ggKHNlbGYubm9kZSkge1xuICAgICAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2dvbGQucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMSdcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMjU1LCAwLCAwLjMpJ1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS90cmVlLnBuZydcbiAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzInXG4gICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAwLCAyNTUsIDAsIDAuMyknXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3dhdGVyLnBuZydcbiAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzMnXG4gICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKDAsIDI1NSwgMjU1LCAwLjMpJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9maXJlLnBuZydcbiAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzQnXG4gICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICdyZ2JhKCAyNTUsIDAsIDAsIDAuMyknXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICAgIHN3aXRjaCAoc2VsZi5ub2RlKSB7XG4gICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMidcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDAsIDI1NSwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvd2F0ZXIucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMydcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuMyknXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnNCdcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJ3JnYmEoIDI1NSwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzQnOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvc29pbC5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICc1J1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAncmdiYSggMjM4LCA5OSwgOTksIDAuMyknXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICc1JzpcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBzZWxmLndlZWsgPSBkYXRlLmdldFVUQ0RheSgpXG4gICAgc3dpdGNoIChzZWxmLndlZWspIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgc2VsZi53ZWVrZCA9ICdTdW4nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDE6XG4gICAgICAgIHNlbGYud2Vla2QgPSAnTW9uJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzZWxmLndlZWtkID0gJ1R1ZXMnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHNlbGYud2Vla2QgPSAnV2VkJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA0OlxuICAgICAgICBzZWxmLndlZWtkID0gJ1RodXInXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDU6XG4gICAgICAgIHNlbGYud2Vla2QgPSAnRnJpJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA2OlxuICAgICAgICBzZWxmLndlZWtkID0gJ1NhdCdcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgc2VsZi5tb250aCA9IGRhdGUuZ2V0TW9udGgoKVxuICAgIHN3aXRjaCAoc2VsZi5tb250aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBzZWxmLm1vbiA9ICdKYW4nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDE6XG4gICAgICAgIHNlbGYubW9uID0gJ0ZlYidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgc2VsZi5tb24gPSAnTWFyJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAzOlxuICAgICAgICBzZWxmLm1vbiA9ICdBcHInXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHNlbGYubW9uID0gJ01heSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgc2VsZi5tb24gPSAnSnVuZSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgc2VsZi5tb24gPSAnSnVseSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNzpcbiAgICAgICAgc2VsZi5tb24gPSAnQXVnJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA4OlxuICAgICAgICBzZWxmLm1vbiA9ICdTZXB0J1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSA5OlxuICAgICAgICBzZWxmLm1vbiA9ICdPY3QnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDEwOlxuICAgICAgICBzZWxmLm1vbiA9ICdOb3YnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDExOlxuICAgICAgICBzZWxmLm1vbiA9ICdEZWMnXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICAgIHNlbGYuZGF5ID0gZGF0ZS5nZXREYXRlKClcbiAgICBzZWxmLnllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgfVxufVxuIl19