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
      navigationBarTitleText: ''
    }, _this.data = {
      water: '../image/water.png',
      tree: '../image/tree.png',
      soil: '../image/soil.png',
      fire: '../image/fire.png',
      gold: '../image/gold.png',
      treexy: 'left: 26%; top: 25%;',
      soilxy: 'left: 70%; top: 17%;',
      firexy: 'left: 60%; top: 25%;',
      goldxy: 'left: 8%; top: 16%;'
      //  waterxy: 'left: 50%; top: 20px;'
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/new'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ldy5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwid2F0ZXIiLCJ0cmVlIiwic29pbCIsImZpcmUiLCJnb2xkIiwidHJlZXh5Iiwic29pbHh5IiwiZmlyZXh5IiwiZ29sZHh5IiwibWV0aG9kcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxhQUFPLG9CQURGO0FBRUxDLFlBQU0sbUJBRkQ7QUFHTEMsWUFBTSxtQkFIRDtBQUlMQyxZQUFNLG1CQUpEO0FBS0xDLFlBQU0sbUJBTEQ7QUFNTEMsY0FBUSxzQkFOSDtBQU9MQyxjQUFRLHNCQVBIO0FBUUxDLGNBQVEsc0JBUkg7QUFTTEMsY0FBUTtBQUNWO0FBVk8sSyxRQVlQQyxPLEdBQVUsRTs7Ozs7NkJBRUQsQ0FDUjs7OztFQW5CZ0MsZUFBS0MsSTs7a0JBQW5CZCxLIiwiZmlsZSI6Im5ldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICcnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICB3YXRlcjogJy4uL2ltYWdlL3dhdGVyLnBuZycsXG4gICAgdHJlZTogJy4uL2ltYWdlL3RyZWUucG5nJyxcbiAgICBzb2lsOiAnLi4vaW1hZ2Uvc29pbC5wbmcnLFxuICAgIGZpcmU6ICcuLi9pbWFnZS9maXJlLnBuZycsXG4gICAgZ29sZDogJy4uL2ltYWdlL2dvbGQucG5nJyxcbiAgICB0cmVleHk6ICdsZWZ0OiAyNiU7IHRvcDogMjUlOycsXG4gICAgc29pbHh5OiAnbGVmdDogNzAlOyB0b3A6IDE3JTsnLFxuICAgIGZpcmV4eTogJ2xlZnQ6IDYwJTsgdG9wOiAyNSU7JyxcbiAgICBnb2xkeHk6ICdsZWZ0OiA4JTsgdG9wOiAxNiU7JyxcbiAgLy8gIHdhdGVyeHk6ICdsZWZ0OiA1MCU7IHRvcDogMjBweDsnXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgfVxuICBvbkxvYWQoKSB7XG4gIH1cbn1cbiJdfQ==