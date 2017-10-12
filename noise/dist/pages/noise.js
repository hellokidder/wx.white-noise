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
      node: '3'
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
    value: function onLoad() {}
  }]);

  return Water;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Water , 'pages/noise'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vaXNlLmpzIl0sIm5hbWVzIjpbIldhdGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtYXJrIiwic3RhclBvaW50IiwiY3VyUG9pbnQiLCJiZ2NvbG9yIiwibm9kZSIsIm1ldGhvZHMiLCJ0b3VjaHN0YXJ0IiwiZSIsInNlbGYiLCJ0b3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsInRvdWNobW92ZSIsInRvdWNoZW5kIiwieGNoYW5nZSIsInljaGFuZ2UiLCJNYXRoIiwiYWJzIiwiY29uc29sZSIsImxvZyIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsWUFBTSxvQkFERDtBQUVMQyxpQkFBVyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRk47QUFHTEMsZ0JBQVUsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUhMO0FBSUxDLGVBQVMsU0FKSjtBQUtMQyxZQUFNO0FBTEQsSyxRQU9QQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0dDLENBREgsRUFDTTtBQUNaLFlBQUlDLE9BQU8sSUFBWDtBQUNBQSxhQUFLUCxTQUFMLEdBQWlCLENBQUNNLEVBQUVFLE9BQUYsQ0FBVSxDQUFWLEVBQWFDLEtBQWQsRUFBcUJILEVBQUVFLE9BQUYsQ0FBVSxDQUFWLEVBQWFFLEtBQWxDLENBQWpCO0FBQ0QsT0FKTztBQUtSQyxlQUxRLHFCQUtFTCxDQUxGLEVBS0s7QUFDWCxZQUFJQyxPQUFPLElBQVg7QUFDQUEsYUFBS04sUUFBTCxHQUFnQixDQUFDSyxFQUFFRSxPQUFGLENBQVUsQ0FBVixFQUFhQyxLQUFkLEVBQXFCSCxFQUFFRSxPQUFGLENBQVUsQ0FBVixFQUFhRSxLQUFsQyxDQUFoQjtBQUNELE9BUk87QUFTUkUsY0FU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QUwsQ0FBZSxDQUFmLENBQXhCLEVBQTJDLENBQzFDLENBREQsTUFDTyxDQUNOO0FBQ0Y7QUFDRjtBQUNGO0FBbkZPLEs7Ozs7OzZCQXFGRCxDQUNSOzs7O0VBakdnQyxlQUFLb0IsSTs7a0JBQW5CekIsSyIsImZpbGUiOiJub2lzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflkL7lv4PlvZLlpIQnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBtYXJrOiAnLi4vaW1hZ2Uvd2F0ZXIucG5nJyxcbiAgICBzdGFyUG9pbnQ6IFswLCAwXSxcbiAgICBjdXJQb2ludDogWzAsIDBdLFxuICAgIGJnY29sb3I6ICcjNjZmZmZmJyxcbiAgICBub2RlOiAnMydcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHRvdWNoc3RhcnQoZSkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBzZWxmLnN0YXJQb2ludCA9IFtlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWV1cbiAgICB9LFxuICAgIHRvdWNobW92ZShlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHNlbGYuY3VyUG9pbnQgPSBbZS50b3VjaGVzWzBdLnBhZ2VYLCBlLnRvdWNoZXNbMF0ucGFnZVldXG4gICAgfSxcbiAgICB0b3VjaGVuZChlKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIGxldCB4Y2hhbmdlID0gc2VsZi5jdXJQb2ludFswXSAtIHNlbGYuc3RhclBvaW50WzBdXG4gICAgICBsZXQgeWNoYW5nZSA9IHNlbGYuY3VyUG9pbnRbMV0gLSBzZWxmLnN0YXJQb2ludFsxXVxuXG4gICAgICBpZiAoc2VsZi5jdXJQb2ludFswXSA+PSBzZWxmLnN0YXJQb2ludFswXSkge1xuICAgICAgICBpZiAoTWF0aC5hYnMoeGNoYW5nZSkgPj0gTWF0aC5hYnMoeWNoYW5nZSkpIHtcbiAgICAgICAgICBzd2l0Y2ggKHNlbGYubm9kZSkge1xuICAgICAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2dvbGQucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMSdcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJyNmZmZmMzMnXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYpXG4gICAgICAgICAgICAgIHNlbGYuY29uZmlnLm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZmYzMydcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2UvdHJlZS5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICcyJ1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAnIzk5ZmYwMCdcbiAgICAgICAgICAgICAgc2VsZi5jb25maWcubmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciA9ICcjOTlmZjAwJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS93YXRlci5wbmcnXG4gICAgICAgICAgICAgIHNlbGYubm9kZSA9ICczJ1xuICAgICAgICAgICAgICBzZWxmLmJnY29sb3IgPSAnIzY2ZmZmZidcbiAgICAgICAgICAgICAgc2VsZi5jb25maWcubmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciA9ICcjNjZmZmZmJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICAgIHNlbGYubWFyayA9ICcuLi9pbWFnZS9maXJlLnBuZydcbiAgICAgICAgICAgICAgc2VsZi5ub2RlID0gJzQnXG4gICAgICAgICAgICAgIHNlbGYuYmdjb2xvciA9ICcjZmYwMDAwJ1xuICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5uYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yID0gJyNmZjAwMDAnXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLmN1clBvaW50WzFdID49IHNlbGYuc3RhclBvaW50WzFdKSB7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh4Y2hhbmdlKSA+PSBNYXRoLmFicyh5Y2hhbmdlKSkge1xuICAgICAgICAgIHN3aXRjaCAoc2VsZi5ub2RlKSB7XG4gICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3RyZWUucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMidcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJyM5OWZmMDAnXG4gICAgICAgICAgICAgIHNlbGYuY29uZmlnLm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZmZmZidcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgICAgICBzZWxmLm1hcmsgPSAnLi4vaW1hZ2Uvd2F0ZXIucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnMydcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJyM2NmZmZmYnXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL2ZpcmUucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnNCdcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJyNmZjAwMDAnXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgICAgc2VsZi5tYXJrID0gJy4uL2ltYWdlL3NvaWwucG5nJ1xuICAgICAgICAgICAgICBzZWxmLm5vZGUgPSAnNSdcbiAgICAgICAgICAgICAgc2VsZi5iZ2NvbG9yID0gJyNmZjk5OTknXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICc1JzpcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuY3VyUG9pbnRbMV0gPj0gc2VsZi5zdGFyUG9pbnRbMV0pIHtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBvbkxvYWQoKSB7XG4gIH1cbn1cbiJdfQ==