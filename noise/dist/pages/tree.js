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
      mark: '../image/tree.png'
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
            _wepy2.default.navigateTo({
              url: '../pages/water'
            });
          } else {
            if (self.curPoint[1] >= self.starPoint[1]) {} else {}
          }
        } else {
          if (Math.abs(xchange) >= Math.abs(ychange)) {
            _wepy2.default.navigateTo({
              url: '../pages/gold'
            });
          } else {
            if (self.curPoint[1] >= self.starPoint[1]) {} else {}
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/tree'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyZWUuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1hcmsiLCJtZXRob2RzIiwidG91Y2hzdGFydCIsImUiLCJzZWxmIiwic3RhclBvaW50IiwidG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJ0b3VjaG1vdmUiLCJjdXJQb2ludCIsInhjaGFuZ2UiLCJ5Y2hhbmdlIiwiTWF0aCIsImFicyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsWUFBTTtBQURELEssUUFHUEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxDQURILEVBQ007QUFDWixZQUFJQyxPQUFPLElBQVg7QUFDQUEsYUFBS0MsU0FBTCxHQUFpQixDQUFDRixFQUFFRyxPQUFGLENBQVUsQ0FBVixFQUFhQyxLQUFkLEVBQXFCSixFQUFFRyxPQUFGLENBQVUsQ0FBVixFQUFhRSxLQUFsQyxDQUFqQjtBQUNELE9BSk87QUFLUkMsZUFMUSxxQkFLRU4sQ0FMRixFQUtLO0FBQ1gsWUFBSUMsT0FBTyxJQUFYO0FBQ0FBLGFBQUtNLFFBQUwsR0FBZ0IsQ0FBQ1AsRUFBRUcsT0FBRixDQUFVLENBQVYsRUFBYUMsS0FBZCxFQUFxQkosRUFBRUcsT0FBRixDQUFVLENBQVYsRUFBYUUsS0FBbEMsQ0FBaEI7QUFDQSxZQUFJRyxVQUFVUCxLQUFLTSxRQUFMLENBQWMsQ0FBZCxJQUFtQk4sS0FBS0MsU0FBTCxDQUFlLENBQWYsQ0FBakM7QUFDQSxZQUFJTyxVQUFVUixLQUFLTSxRQUFMLENBQWMsQ0FBZCxJQUFtQk4sS0FBS0MsU0FBTCxDQUFlLENBQWYsQ0FBakM7QUFDQSxZQUFJRCxLQUFLTSxRQUFMLENBQWMsQ0FBZCxLQUFvQk4sS0FBS0MsU0FBTCxDQUFlLENBQWYsQ0FBeEIsRUFBMkM7QUFDekMsY0FBSVEsS0FBS0MsR0FBTCxDQUFTSCxPQUFULEtBQXFCRSxLQUFLQyxHQUFMLENBQVNGLE9BQVQsQ0FBekIsRUFBNEM7QUFDMUMsMkJBQUtHLFVBQUwsQ0FBZ0I7QUFDZEMsbUJBQUs7QUFEUyxhQUFoQjtBQUdELFdBSkQsTUFJTztBQUNMLGdCQUFJWixLQUFLTSxRQUFMLENBQWMsQ0FBZCxLQUFvQk4sS0FBS0MsU0FBTCxDQUFlLENBQWYsQ0FBeEIsRUFBMkMsQ0FDMUMsQ0FERCxNQUNPLENBQ047QUFDRjtBQUNGLFNBVkQsTUFVTztBQUNMLGNBQUlRLEtBQUtDLEdBQUwsQ0FBU0gsT0FBVCxLQUFxQkUsS0FBS0MsR0FBTCxDQUFTRixPQUFULENBQXpCLEVBQTRDO0FBQzFDLDJCQUFLRyxVQUFMLENBQWdCO0FBQ2RDLG1CQUFLO0FBRFMsYUFBaEI7QUFHRCxXQUpELE1BSU87QUFDTCxnQkFBSVosS0FBS00sUUFBTCxDQUFjLENBQWQsS0FBb0JOLEtBQUtDLFNBQUwsQ0FBZSxDQUFmLENBQXhCLEVBQTJDLENBQzFDLENBREQsTUFDTyxDQUNOO0FBQ0Y7QUFDRjtBQUNGO0FBL0JPLEs7Ozs7OzZCQWlDRCxDQUNSOzs7O0VBekNnQyxlQUFLWSxJOztrQkFBbkJyQixLIiwiZmlsZSI6InRyZWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZC+5b+D5b2S5aSEJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbWFyazogJy4uL2ltYWdlL3RyZWUucG5nJ1xuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgdG91Y2hzdGFydChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuc3RhclBvaW50ID0gW2UudG91Y2hlc1swXS5wYWdlWCwgZS50b3VjaGVzWzBdLnBhZ2VZXVxuICAgIH0sXG4gICAgdG91Y2htb3ZlKGUpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgc2VsZi5jdXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFswXSAtIHNlbGYuc3RhclBvaW50WzBdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMV0gLSBzZWxmLnN0YXJQb2ludFsxXVxuICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMF0gPj0gc2VsZi5zdGFyUG9pbnRbMF0pIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4uL3BhZ2VzL3dhdGVyJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4uL3BhZ2VzL2dvbGQnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgfVxufVxuIl19