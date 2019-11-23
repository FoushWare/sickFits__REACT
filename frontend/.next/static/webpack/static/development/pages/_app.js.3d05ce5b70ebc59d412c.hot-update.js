webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./components/Cart.js":
/*!****************************!*\
  !*** ./components/Cart.js ***!
  \****************************/
/*! exports provided: default, LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOCAL_STATE_QUERY", function() { return LOCAL_STATE_QUERY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOGGLE_CART_MUTATION", function() { return TOGGLE_CART_MUTATION; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-apollo */ "./node_modules/react-apollo/react-apollo.browser.umd.js");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./User */ "./components/User.js");
/* harmony import */ var _styles_CartStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/CartStyles */ "./components/styles/CartStyles.js");
/* harmony import */ var _styles_Supreme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles/Supreme */ "./components/styles/Supreme.js");
/* harmony import */ var _styles_CloseButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles/CloseButton */ "./components/styles/CloseButton.js");
/* harmony import */ var _styles_SickButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./styles/SickButton */ "./components/styles/SickButton.js");
/* harmony import */ var _CartItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CartItem */ "./components/CartItem.js");
/* harmony import */ var _lib_calcTotalPrice__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/calcTotalPrice */ "./lib/calcTotalPrice.js");
/* harmony import */ var _lib_formatMoney__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/formatMoney */ "./lib/formatMoney.js");
var _jsxFileName = "/home/tom/Ahmed fouad/foush/Learning&work/Learning/\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25Practice\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25/Advanced-React/sick-fits/frontend/components/Cart.js";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  mutation {\n    toggleCart @client\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query {\n    cartOpen @client\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }












var LOCAL_STATE_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_2___default()(_templateObject());
var TOGGLE_CART_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_2___default()(_templateObject2());

var Cart = function Cart() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_User__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, function (_ref) {
    var me = _ref.data.me;
    if (!me) return null;
    console.log(me);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_1__["Mutation"], {
      mutation: TOGGLE_CART_MUTATION,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31
      },
      __self: this
    }, function (toggleCart) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_1__["Query"], {
        query: LOCAL_STATE_QUERY,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        },
        __self: this
      }, function (_ref2) {
        var data = _ref2.data;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_CartStyles__WEBPACK_IMPORTED_MODULE_4__["default"], {
          open: data.cartOpen,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 35
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 36
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_CloseButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
          onClick: toggleCart,
          title: "close",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 37
          },
          __self: this
        }, "\xD7"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_Supreme__WEBPACK_IMPORTED_MODULE_5__["default"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 40
          },
          __self: this
        }, me.name, "'s Cart"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 41
          },
          __self: this
        }, "You Have ", me.cart.length, " Item", me.cart.length === 1 ? '' : 's', " in your cart.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 46
          },
          __self: this
        }, me.cart.map(function (cartItem) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CartItem__WEBPACK_IMPORTED_MODULE_8__["default"], {
            key: cartItem.id,
            cartItem: cartItem,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 48
            },
            __self: this
          });
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 51
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 52
          },
          __self: this
        }, Object(_lib_formatMoney__WEBPACK_IMPORTED_MODULE_10__["default"])(Object(_lib_calcTotalPrice__WEBPACK_IMPORTED_MODULE_9__["default"])(me.cart))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_SickButton__WEBPACK_IMPORTED_MODULE_7__["default"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 53
          },
          __self: this
        }, "Checkout")));
      });
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Cart);


/***/ }),

/***/ "./components/CartItem.js":
/*!********************************!*\
  !*** ./components/CartItem.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_formatMoney__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/formatMoney */ "./lib/formatMoney.js");
var _jsxFileName = "/home/tom/Ahmed fouad/foush/Learning&work/Learning/\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25Practice\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25/Advanced-React/sick-fits/frontend/components/CartItem.js";




var CartItemStyles = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].li.withConfig({
  displayName: "CartItem__CartItemStyles",
  componentId: "sc-1rm9l7o-0"
})(["padding:1rem 0;border-bottom:1px solid ", ";display:grid;align-items:center;grid-template-columns:auto 1fr auto;img{margin-right:10px;}h3,p{margin:0;}"], function (props) {
  return props.theme.lightgrey;
});

var CartItem = function CartItem(_ref) {
  var cartItem = _ref.cartItem;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CartItemStyles, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    width: "100",
    src: cartItem.item.image,
    alt: cartItem.item.title,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cart-item-details",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, cartItem.item.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, Object(_lib_formatMoney__WEBPACK_IMPORTED_MODULE_3__["default"])(cartItem.item.price * cartItem.quantity), ' - ', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, cartItem.quantity, " \xD7 ", Object(_lib_formatMoney__WEBPACK_IMPORTED_MODULE_3__["default"])(cartItem.item.price), " each"))));
};

CartItem.propTypes = {
  cartItem: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (CartItem);

/***/ })

})
//# sourceMappingURL=_app.js.3d05ce5b70ebc59d412c.hot-update.js.map