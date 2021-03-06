'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _AccordionItemBody = require('../AccordionItemBody');

var _AccordionItemBody2 = _interopRequireDefault(_AccordionItemBody);

var _AccordionItemTitle = require('../AccordionItemTitle');

var _AccordionItemTitle2 = _interopRequireDefault(_AccordionItemTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccordionItem = function (_Component) {
  _inherits(AccordionItem, _Component);

  function AccordionItem(props) {
    _classCallCheck(this, AccordionItem);

    var _this = _possibleConstructorReturn(this, (AccordionItem.__proto__ || Object.getPrototypeOf(AccordionItem)).call(this, props));

    _this.state = {
      maxHeight: props.expanded ? 'none' : 0,
      overflow: props.expanded ? 'visible' : 'hidden',
      duration: 300
    };
    return _this;
  }

  _createClass(AccordionItem, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.uuid = this.props.uuid || _uuid2.default.v4();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setMaxHeight();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props = this.props,
          expanded = _props.expanded,
          disabled = _props.disabled,
          children = _props.children;


      if (prevProps.expanded !== expanded) {
        if (disabled) return;

        if (expanded) {
          this.handleExpand();
        } else {
          this.handleCollapse();
        }
      } else if (prevProps.children !== children) {
        this.setMaxHeight();
      }
    }
  }, {
    key: 'handleExpand',
    value: function handleExpand() {
      var _props2 = this.props,
          onExpand = _props2.onExpand,
          slug = _props2.slug;


      this.setMaxHeight();

      if (onExpand) {
        slug ? onExpand(slug) : onExpand();
      }
    }
  }, {
    key: 'handleCollapse',
    value: function handleCollapse() {
      var _props3 = this.props,
          onClose = _props3.onClose,
          slug = _props3.slug;


      this.setMaxHeight();

      if (onClose) {
        slug ? onClose(slug) : onClose();
      }
    }
  }, {
    key: 'setMaxHeight',
    value: function setMaxHeight() {
      var bodyNode = _reactDom2.default.findDOMNode(this.refs.body);
      var images = bodyNode.querySelectorAll('img');

      if (images.length > 0) {
        return this.preloadImages(bodyNode, images);
      }

      this.setState({
        maxHeight: this.props.expanded ? bodyNode.scrollHeight + 'px' : 0,
        overflow: 'hidden'
      });
    }

    // Wait for images to load before calculating maxHeight

  }, {
    key: 'preloadImages',
    value: function preloadImages(node) {
      var _this2 = this;

      var images = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var imagesLoaded = 0;
      var imgLoaded = function imgLoaded() {
        imagesLoaded++;

        if (imagesLoaded === images.length) {
          _this2.setState({
            maxHeight: _this2.props.expanded ? node.scrollHeight + 'px' : 0,
            overflow: 'hidden'
          });
        }
      };

      for (var i = 0; i < images.length; i += 1) {
        var img = new Image();
        img.src = images[i].src;
        img.onload = img.onerror = imgLoaded;
      }
    }
  }, {
    key: 'getProps',
    value: function getProps() {
      var props = {
        className: (0, _classnames2.default)('react-sanfona-item', this.props.className, {
          'react-sanfona-item-expanded': this.props.expanded && !this.props.disabled
        }, this.props.expandedClassName && _defineProperty({}, this.props.expandedClassName, this.props.expanded), { 'react-sanfona-item-disabled': this.props.disabled }, this.props.disabledClassName && _defineProperty({}, this.props.disabledClassName, this.props.disabled)),
        role: 'tabpanel',
        style: this.props.style
      };

      if (this.props.expanded) {
        props['aria-expanded'] = true;
      } else {
        props['aria-hidden'] = true;
      }

      return props;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        _extends({}, this.getProps(), { ref: 'item' }),
        _react2.default.createElement(_AccordionItemTitle2.default, {
          className: this.props.titleClassName,
          title: this.props.title,
          onClick: this.props.disabled ? null : this.props.onClick,
          titleColor: this.props.titleColor,
          uuid: this.uuid
        }),
        _react2.default.createElement(
          _AccordionItemBody2.default,
          {
            maxHeight: this.state.maxHeight,
            duration: this.state.duration,
            className: this.props.bodyClassName,
            overflow: this.state.overflow,
            ref: 'body',
            uuid: this.uuid
          },
          this.props.children
        )
      );
    }
  }]);

  return AccordionItem;
}(_react.Component);

exports.default = AccordionItem;


AccordionItem.propTypes = {
  bodyClassName: _propTypes2.default.string,
  className: _propTypes2.default.string,
  expanded: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  expandedClassName: _propTypes2.default.string,
  style: _propTypes2.default.object,
  titleClassName: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  disabledClassName: _propTypes2.default.string,
  uuid: _propTypes2.default.string
};