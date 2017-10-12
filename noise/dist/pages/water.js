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
      navigationBarTitleText: '吾心归处'
    }, _this.data = {
      k: '0',
      mark: '../image/water.png',
      starPoint: [0, 0],
      curPoint: [0, 0]
    }, _this.methods = {
      touchstart: function touchstart(e) {
        var self = this;
        self.starPoint = [e.touches[0].pageX, e.touches[0].pageY];
      },
      touchmove: function touchmove(e) {
        var self = this;
        self.curPoint = [e.touches[0].pageX, e.touches[0].pageY];
        var xchange = self.curPoint[0] - self.starPoint[0];
        var ychange = self.curPoint[1] - self.starPoint[1];
        if (self.curPoint[0] >= self.starPoint[0]) {
          if (Math.abs(xchange) >= Math.abs(ychange)) {
            self.k = 'you';
          } else {
            if (self.curPoint[1] >= self.starPoint[1]) {
              self.k = 'xia';
            } else {
              self.k = 'shang';
            }
          }
        } else {
          if (Math.abs(xchange) >= Math.abs(ychange)) {
            self.k = 'zuo';
          } else {
            if (self.curPoint[1] >= self.starPoint[1]) {
              self.k = 'xia';
            } else {
              self.k = 'shang';
            }
          }
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/water'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhdGVyLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJrIiwibWFyayIsInN0YXJQb2ludCIsImN1clBvaW50IiwibWV0aG9kcyIsInRvdWNoc3RhcnQiLCJlIiwic2VsZiIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwidG91Y2htb3ZlIiwieGNoYW5nZSIsInljaGFuZ2UiLCJNYXRoIiwiYWJzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFNBQUcsR0FERTtBQUVMQyxZQUFNLG9CQUZEO0FBR0xDLGlCQUFXLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FITjtBQUlMQyxnQkFBVSxDQUFDLENBQUQsRUFBSSxDQUFKO0FBSkwsSyxRQU1QQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0dDLENBREgsRUFDTTtBQUNaLFlBQUlDLE9BQU8sSUFBWDtBQUNBQSxhQUFLTCxTQUFMLEdBQWlCLENBQUNJLEVBQUVFLE9BQUYsQ0FBVSxDQUFWLEVBQWFDLEtBQWQsRUFBcUJILEVBQUVFLE9BQUYsQ0FBVSxDQUFWLEVBQWFFLEtBQWxDLENBQWpCO0FBQ0QsT0FKTztBQUtSQyxlQUxRLHFCQUtFTCxDQUxGLEVBS0s7QUFDWCxZQUFJQyxPQUFPLElBQVg7QUFDQUEsYUFBS0osUUFBTCxHQUFnQixDQUFDRyxFQUFFRSxPQUFGLENBQVUsQ0FBVixFQUFhQyxLQUFkLEVBQXFCSCxFQUFFRSxPQUFGLENBQVUsQ0FBVixFQUFhRSxLQUFsQyxDQUFoQjtBQUNBLFlBQUlFLFVBQVVMLEtBQUtKLFFBQUwsQ0FBYyxDQUFkLElBQW1CSSxLQUFLTCxTQUFMLENBQWUsQ0FBZixDQUFqQztBQUNBLFlBQUlXLFVBQVVOLEtBQUtKLFFBQUwsQ0FBYyxDQUFkLElBQW1CSSxLQUFLTCxTQUFMLENBQWUsQ0FBZixDQUFqQztBQUNBLFlBQUlLLEtBQUtKLFFBQUwsQ0FBYyxDQUFkLEtBQW9CSSxLQUFLTCxTQUFMLENBQWUsQ0FBZixDQUF4QixFQUEyQztBQUN6QyxjQUFJWSxLQUFLQyxHQUFMLENBQVNILE9BQVQsS0FBcUJFLEtBQUtDLEdBQUwsQ0FBU0YsT0FBVCxDQUF6QixFQUE0QztBQUMxQ04saUJBQUtQLENBQUwsR0FBUyxLQUFUO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsZ0JBQUlPLEtBQUtKLFFBQUwsQ0FBYyxDQUFkLEtBQW9CSSxLQUFLTCxTQUFMLENBQWUsQ0FBZixDQUF4QixFQUEyQztBQUN6Q0ssbUJBQUtQLENBQUwsR0FBUyxLQUFUO0FBQ0QsYUFGRCxNQUVPO0FBQ0xPLG1CQUFLUCxDQUFMLEdBQVMsT0FBVDtBQUNEO0FBQ0Y7QUFDRixTQVZELE1BVU87QUFDTCxjQUFJYyxLQUFLQyxHQUFMLENBQVNILE9BQVQsS0FBcUJFLEtBQUtDLEdBQUwsQ0FBU0YsT0FBVCxDQUF6QixFQUE0QztBQUMxQ04saUJBQUtQLENBQUwsR0FBUyxLQUFUO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsZ0JBQUlPLEtBQUtKLFFBQUwsQ0FBYyxDQUFkLEtBQW9CSSxLQUFLTCxTQUFMLENBQWUsQ0FBZixDQUF4QixFQUEyQztBQUN6Q0ssbUJBQUtQLENBQUwsR0FBUyxLQUFUO0FBQ0QsYUFGRCxNQUVPO0FBQ0xPLG1CQUFLUCxDQUFMLEdBQVMsT0FBVDtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBL0JPLEs7Ozs7OzZCQWlDRCxDQUNSOzs7O0VBNUNnQyxlQUFLZ0IsSTs7a0JBQW5CcEIsSyIsImZpbGUiOiJ3YXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflkL7lv4PlvZLlpIQnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBrOiAnMCcsXG4gICAgbWFyazogJy4uL2ltYWdlL3dhdGVyLnBuZycsXG4gICAgc3RhclBvaW50OiBbMCwgMF0sXG4gICAgY3VyUG9pbnQ6IFswLCAwXVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFswXSAtIHNlbGYuc3RhclBvaW50WzBdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMV0gLSBzZWxmLnN0YXJQb2ludFsxXVxuICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMF0gPj0gc2VsZi5zdGFyUG9pbnRbMF0pIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgc2VsZi5rID0gJ3lvdSdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgICAgc2VsZi5rID0gJ3hpYSdcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5rID0gJ3NoYW5nJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgc2VsZi5rID0gJ3p1bydcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgICAgc2VsZi5rID0gJ3hpYSdcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5rID0gJ3NoYW5nJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBvbkxvYWQoKSB7XG4gIH1cbn1cbiJdfQ==