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
      },
      touchend: function touchend(e) {
        var xchange = self.curPoint[0] - self.starPoint[0];
        var ychange = self.curPoint[1] - self.starPoint[1];
        if (self.curPoint[0] >= self.starPoint[0]) {
          if (Math.abs(xchange) >= Math.abs(ychange)) {
            _wepy2.default.navigateTo({
              url: '../pages/fire'
            });
          } else {
            if (self.curPoint[1] >= self.starPoint[1]) {} else {}
          }
        } else {
          if (Math.abs(xchange) >= Math.abs(ychange)) {
            _wepy2.default.navigateTo({
              url: '../pages/tree'
            });
          } else {
            if (self.curPoint[1] >= self.starPoint[1]) {} else {}
          }
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Water, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Water;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Water , 'pages/water'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhdGVyLmpzIl0sIm5hbWVzIjpbIldhdGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJrIiwibWFyayIsInN0YXJQb2ludCIsImN1clBvaW50IiwibWV0aG9kcyIsInRvdWNoc3RhcnQiLCJlIiwic2VsZiIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwidG91Y2htb3ZlIiwidG91Y2hlbmQiLCJ4Y2hhbmdlIiwieWNoYW5nZSIsIk1hdGgiLCJhYnMiLCJuYXZpZ2F0ZVRvIiwidXJsIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFNBQUcsR0FERTtBQUVMQyxZQUFNLG9CQUZEO0FBR0xDLGlCQUFXLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FITjtBQUlMQyxnQkFBVSxDQUFDLENBQUQsRUFBSSxDQUFKO0FBSkwsSyxRQU1QQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0dDLENBREgsRUFDTTtBQUNaLFlBQUlDLE9BQU8sSUFBWDtBQUNBQSxhQUFLTCxTQUFMLEdBQWlCLENBQUNJLEVBQUVFLE9BQUYsQ0FBVSxDQUFWLEVBQWFDLEtBQWQsRUFBcUJILEVBQUVFLE9BQUYsQ0FBVSxDQUFWLEVBQWFFLEtBQWxDLENBQWpCO0FBQ0QsT0FKTztBQUtSQyxlQUxRLHFCQUtFTCxDQUxGLEVBS0s7QUFDWCxZQUFJQyxPQUFPLElBQVg7QUFDQUEsYUFBS0osUUFBTCxHQUFnQixDQUFDRyxFQUFFRSxPQUFGLENBQVUsQ0FBVixFQUFhQyxLQUFkLEVBQXFCSCxFQUFFRSxPQUFGLENBQVUsQ0FBVixFQUFhRSxLQUFsQyxDQUFoQjtBQUNELE9BUk87QUFTUkUsY0FUUSxvQkFTQ04sQ0FURCxFQVNJO0FBQ1YsWUFBSU8sVUFBVU4sS0FBS0osUUFBTCxDQUFjLENBQWQsSUFBbUJJLEtBQUtMLFNBQUwsQ0FBZSxDQUFmLENBQWpDO0FBQ0EsWUFBSVksVUFBVVAsS0FBS0osUUFBTCxDQUFjLENBQWQsSUFBbUJJLEtBQUtMLFNBQUwsQ0FBZSxDQUFmLENBQWpDO0FBQ0EsWUFBSUssS0FBS0osUUFBTCxDQUFjLENBQWQsS0FBb0JJLEtBQUtMLFNBQUwsQ0FBZSxDQUFmLENBQXhCLEVBQTJDO0FBQ3pDLGNBQUlhLEtBQUtDLEdBQUwsQ0FBU0gsT0FBVCxLQUFxQkUsS0FBS0MsR0FBTCxDQUFTRixPQUFULENBQXpCLEVBQTRDO0FBQzFDLDJCQUFLRyxVQUFMLENBQWdCO0FBQ2RDLG1CQUFLO0FBRFMsYUFBaEI7QUFHRCxXQUpELE1BSU87QUFDTCxnQkFBSVgsS0FBS0osUUFBTCxDQUFjLENBQWQsS0FBb0JJLEtBQUtMLFNBQUwsQ0FBZSxDQUFmLENBQXhCLEVBQTJDLENBQzFDLENBREQsTUFDTyxDQUNOO0FBQ0Y7QUFDRixTQVZELE1BVU87QUFDTCxjQUFJYSxLQUFLQyxHQUFMLENBQVNILE9BQVQsS0FBcUJFLEtBQUtDLEdBQUwsQ0FBU0YsT0FBVCxDQUF6QixFQUE0QztBQUMxQywyQkFBS0csVUFBTCxDQUFnQjtBQUNkQyxtQkFBSztBQURTLGFBQWhCO0FBR0QsV0FKRCxNQUlPO0FBQ0wsZ0JBQUlYLEtBQUtKLFFBQUwsQ0FBYyxDQUFkLEtBQW9CSSxLQUFLTCxTQUFMLENBQWUsQ0FBZixDQUF4QixFQUEyQyxDQUMxQyxDQURELE1BQ08sQ0FDTjtBQUNGO0FBQ0Y7QUFDRjtBQWpDTyxLOzs7Ozs2QkFtQ0QsQ0FDUjs7OztFQTlDZ0MsZUFBS2lCLEk7O2tCQUFuQnZCLEsiLCJmaWxlIjoid2F0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZC+5b+D5b2S5aSEJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgazogJzAnLFxuICAgIG1hcms6ICcuLi9pbWFnZS93YXRlci5wbmcnLFxuICAgIHN0YXJQb2ludDogWzAsIDBdLFxuICAgIGN1clBvaW50OiBbMCwgMF1cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHRvdWNoc3RhcnQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLnN0YXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICB9LFxuICAgIHRvdWNobW92ZShlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuY3VyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgfSxcbiAgICB0b3VjaGVuZChlKSB7XG4gICAgICBsZXQgeGNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMF0gLSBzZWxmLnN0YXJQb2ludFswXVxuICAgICAgbGV0IHljaGFuZ2UgPSBzZWxmLmN1clBvaW50WzFdIC0gc2VsZi5zdGFyUG9pbnRbMV1cbiAgICAgIGlmIChzZWxmLmN1clBvaW50WzBdID49IHNlbGYuc3RhclBvaW50WzBdKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6ICcuLi9wYWdlcy9maXJlJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHhjaGFuZ2UpID49IE1hdGguYWJzKHljaGFuZ2UpKSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4uL3BhZ2VzL3RyZWUnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5jdXJQb2ludFsxXSA+PSBzZWxmLnN0YXJQb2ludFsxXSkge1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgfVxufVxuIl19