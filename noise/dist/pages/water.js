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
        if (self.curPoint[0] > self.starPoint[0]) {
          self.mark = '../image/fire.png';
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhdGVyLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtYXJrIiwic3RhclBvaW50IiwiY3VyUG9pbnQiLCJtZXRob2RzIiwidG91Y2hzdGFydCIsImUiLCJzZWxmIiwidG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJ0b3VjaG1vdmUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsWUFBTSxvQkFERDtBQUVMQyxpQkFBVyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRk47QUFHTEMsZ0JBQVUsQ0FBQyxDQUFELEVBQUksQ0FBSjtBQUhMLEssUUFLUEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxDQURILEVBQ007QUFDWixZQUFJQyxPQUFPLElBQVg7QUFDQUEsYUFBS0wsU0FBTCxHQUFpQixDQUFDSSxFQUFFRSxPQUFGLENBQVUsQ0FBVixFQUFhQyxLQUFkLEVBQXFCSCxFQUFFRSxPQUFGLENBQVUsQ0FBVixFQUFhRSxLQUFsQyxDQUFqQjtBQUNELE9BSk87QUFLUkMsZUFMUSxxQkFLRUwsQ0FMRixFQUtLO0FBQ1gsWUFBSUMsT0FBTyxJQUFYO0FBQ0FBLGFBQUtKLFFBQUwsR0FBZ0IsQ0FBQ0csRUFBRUUsT0FBRixDQUFVLENBQVYsRUFBYUMsS0FBZCxFQUFxQkgsRUFBRUUsT0FBRixDQUFVLENBQVYsRUFBYUUsS0FBbEMsQ0FBaEI7QUFDQSxZQUFJSCxLQUFLSixRQUFMLENBQWMsQ0FBZCxJQUFtQkksS0FBS0wsU0FBTCxDQUFlLENBQWYsQ0FBdkIsRUFBMEM7QUFDeENLLGVBQUtOLElBQUwsR0FBWSxtQkFBWjtBQUNEO0FBQ0Y7QUFYTyxLOzs7Ozs2QkFhRCxDQUNSOzs7O0VBdkJnQyxlQUFLVyxJOztrQkFBbkJmLEsiLCJmaWxlIjoid2F0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZC+5b+D5b2S5aSEJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbWFyazogJy4uL2ltYWdlL3dhdGVyLnBuZycsXG4gICAgc3RhclBvaW50OiBbMCwgMF0sXG4gICAgY3VyUG9pbnQ6IFswLCAwXVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICAgIGlmIChzZWxmLmN1clBvaW50WzBdID4gc2VsZi5zdGFyUG9pbnRbMF0pIHtcbiAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBvbkxvYWQoKSB7XG4gIH1cbn1cbiJdfQ==