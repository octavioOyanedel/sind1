/*!
 * AdminLTE v3.0.5 (https://adminlte.io)
 * Copyright 2014-2020 Colorlib <http://colorlib.com>
 * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.adminlte = {}));
}(this, (function (exports) { 'use strict';

  /**
   * --------------------------------------------
   * AdminLTE ControlSidebar.js
   * License MIT
   * --------------------------------------------
   */
  var ControlSidebar = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'ControlSidebar';
    var DATA_KEY = 'lte.controlsidebar';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      COLLAPSED: "collapsed" + EVENT_KEY,
      EXPANDED: "expanded" + EVENT_KEY
    };
    var Selector = {
      CONTROL_SIDEBAR: '.control-sidebar',
      CONTROL_SIDEBAR_CONTENT: '.control-sidebar-content',
      DATA_TOGGLE: '[data-widget="control-sidebar"]',
      CONTENT: '.content-wrapper',
      HEADER: '.main-header',
      FOOTER: '.main-footer'
    };
    var ClassName = {
      CONTROL_SIDEBAR_ANIMATE: 'control-sidebar-animate',
      CONTROL_SIDEBAR_OPEN: 'control-sidebar-open',
      CONTROL_SIDEBAR_SLIDE: 'control-sidebar-slide-open',
      LAYOUT_FIXED: 'layout-fixed',
      NAVBAR_FIXED: 'layout-navbar-fixed',
      NAVBAR_SM_FIXED: 'layout-sm-navbar-fixed',
      NAVBAR_MD_FIXED: 'layout-md-navbar-fixed',
      NAVBAR_LG_FIXED: 'layout-lg-navbar-fixed',
      NAVBAR_XL_FIXED: 'layout-xl-navbar-fixed',
      FOOTER_FIXED: 'layout-footer-fixed',
      FOOTER_SM_FIXED: 'layout-sm-footer-fixed',
      FOOTER_MD_FIXED: 'layout-md-footer-fixed',
      FOOTER_LG_FIXED: 'layout-lg-footer-fixed',
      FOOTER_XL_FIXED: 'layout-xl-footer-fixed'
    };
    var Default = {
      controlsidebarSlide: true,
      scrollbarTheme: 'os-theme-light',
      scrollbarAutoHide: 'l'
    };
    /**
     * Class Definition
     * ====================================================
     */

    var ControlSidebar = /*#__PURE__*/function () {
      function ControlSidebar(element, config) {
        this._element = element;
        this._config = config;

        this._init();
      } // Public


      var _proto = ControlSidebar.prototype;

      _proto.collapse = function collapse() {
        // Show the control sidebar
        if (this._config.controlsidebarSlide) {
          $('html').addClass(ClassName.CONTROL_SIDEBAR_ANIMATE);
          $('body').removeClass(ClassName.CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
            $(Selector.CONTROL_SIDEBAR).hide();
            $('html').removeClass(ClassName.CONTROL_SIDEBAR_ANIMATE);
            $(this).dequeue();
          });
        } else {
          $('body').removeClass(ClassName.CONTROL_SIDEBAR_OPEN);
        }

        var collapsedEvent = $.Event(Event.COLLAPSED);
        $(this._element).trigger(collapsedEvent);
      };

      _proto.show = function show() {
        // Collapse the control sidebar
        if (this._config.controlsidebarSlide) {
          $('html').addClass(ClassName.CONTROL_SIDEBAR_ANIMATE);
          $(Selector.CONTROL_SIDEBAR).show().delay(10).queue(function () {
            $('body').addClass(ClassName.CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
              $('html').removeClass(ClassName.CONTROL_SIDEBAR_ANIMATE);
              $(this).dequeue();
            });
            $(this).dequeue();
          });
        } else {
          $('body').addClass(ClassName.CONTROL_SIDEBAR_OPEN);
        }

        var expandedEvent = $.Event(Event.EXPANDED);
        $(this._element).trigger(expandedEvent);
      };

      _proto.toggle = function toggle() {
        var shouldClose = $('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE);

        if (shouldClose) {
          // Close the control sidebar
          this.collapse();
        } else {
          // Open the control sidebar
          this.show();
        }
      } // Private
      ;

      _proto._init = function _init() {
        var _this = this;

        this._fixHeight();

        this._fixScrollHeight();

        $(window).resize(function () {
          _this._fixHeight();

          _this._fixScrollHeight();
        });
        $(window).scroll(function () {
          if ($('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE)) {
            _this._fixScrollHeight();
          }
        });
      };

      _proto._fixScrollHeight = function _fixScrollHeight() {
        var heights = {
          scroll: $(document).height(),
          window: $(window).height(),
          header: $(Selector.HEADER).outerHeight(),
          footer: $(Selector.FOOTER).outerHeight()
        };
        var positions = {
          bottom: Math.abs(heights.window + $(window).scrollTop() - heights.scroll),
          top: $(window).scrollTop()
        };
        var navbarFixed = false;
        var footerFixed = false;

        if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {
          if ($('body').hasClass(ClassName.NAVBAR_FIXED) || $('body').hasClass(ClassName.NAVBAR_SM_FIXED) || $('body').hasClass(ClassName.NAVBAR_MD_FIXED) || $('body').hasClass(ClassName.NAVBAR_LG_FIXED) || $('body').hasClass(ClassName.NAVBAR_XL_FIXED)) {
            if ($(Selector.HEADER).css("position") === "fixed") {
              navbarFixed = true;
            }
          }

          if ($('body').hasClass(ClassName.FOOTER_FIXED) || $('body').hasClass(ClassName.FOOTER_SM_FIXED) || $('body').hasClass(ClassName.FOOTER_MD_FIXED) || $('body').hasClass(ClassName.FOOTER_LG_FIXED) || $('body').hasClass(ClassName.FOOTER_XL_FIXED)) {
            if ($(Selector.FOOTER).css("position") === "fixed") {
              footerFixed = true;
            }
          }

          if (positions.top === 0 && positions.bottom === 0) {
            $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer);
            $(Selector.CONTROL_SIDEBAR).css('top', heights.header);
            $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.header + heights.footer));
          } else if (positions.bottom <= heights.footer) {
            if (footerFixed === false) {
              $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer - positions.bottom);
              $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.footer - positions.bottom));
            } else {
              $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer);
            }
          } else if (positions.top <= heights.header) {
            if (navbarFixed === false) {
              $(Selector.CONTROL_SIDEBAR).css('top', heights.header - positions.top);
              $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.header - positions.top));
            } else {
              $(Selector.CONTROL_SIDEBAR).css('top', heights.header);
            }
          } else {
            if (navbarFixed === false) {
              $(Selector.CONTROL_SIDEBAR).css('top', 0);
              $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window);
            } else {
              $(Selector.CONTROL_SIDEBAR).css('top', heights.header);
            }
          }
        }
      };

      _proto._fixHeight = function _fixHeight() {
        var heights = {
          window: $(window).height(),
          header: $(Selector.HEADER).outerHeight(),
          footer: $(Selector.FOOTER).outerHeight()
        };

        if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {
          var sidebarHeight = heights.window - heights.header;

          if ($('body').hasClass(ClassName.FOOTER_FIXED) || $('body').hasClass(ClassName.FOOTER_SM_FIXED) || $('body').hasClass(ClassName.FOOTER_MD_FIXED) || $('body').hasClass(ClassName.FOOTER_LG_FIXED) || $('body').hasClass(ClassName.FOOTER_XL_FIXED)) {
            if ($(Selector.FOOTER).css("position") === "fixed") {
              sidebarHeight = heights.window - heights.header - heights.footer;
            }
          }

          $(Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', sidebarHeight);

          if (typeof $.fn.overlayScrollbars !== 'undefined') {
            $(Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).overlayScrollbars({
              className: this._config.scrollbarTheme,
              sizeAutoCapable: true,
              scrollbars: {
                autoHide: this._config.scrollbarAutoHide,
                clickScrolling: true
              }
            });
          }
        }
      } // Static
      ;

      ControlSidebar._jQueryInterface = function _jQueryInterface(operation) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _options = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new ControlSidebar(this, _options);
            $(this).data(DATA_KEY, data);
          }

          if (data[operation] === 'undefined') {
            throw new Error(operation + " is not a function");
          }

          data[operation]();
        });
      };

      return ControlSidebar;
    }();
    /**
     *
     * Data Api implementation
     * ====================================================
     */


    $(document).on('click', Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      ControlSidebar._jQueryInterface.call($(this), 'toggle');
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = ControlSidebar._jQueryInterface;
    $.fn[NAME].Constructor = ControlSidebar;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return ControlSidebar._jQueryInterface;
    };

    return ControlSidebar;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE Layout.js
   * License MIT
   * --------------------------------------------
   */
  var Layout = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'Layout';
    var DATA_KEY = 'lte.layout';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Selector = {
      HEADER: '.main-header',
      MAIN_SIDEBAR: '.main-sidebar',
      SIDEBAR: '.main-sidebar .sidebar',
      CONTENT: '.content-wrapper',
      BRAND: '.brand-link',
      CONTENT_HEADER: '.content-header',
      WRAPPER: '.wrapper',
      CONTROL_SIDEBAR: '.control-sidebar',
      CONTROL_SIDEBAR_CONTENT: '.control-sidebar-content',
      CONTROL_SIDEBAR_BTN: '[data-widget="control-sidebar"]',
      LAYOUT_FIXED: '.layout-fixed',
      FOOTER: '.main-footer',
      PUSHMENU_BTN: '[data-widget="pushmenu"]',
      LOGIN_BOX: '.login-box',
      REGISTER_BOX: '.register-box'
    };
    var ClassName = {
      HOLD: 'hold-transition',
      SIDEBAR: 'main-sidebar',
      CONTENT_FIXED: 'content-fixed',
      SIDEBAR_FOCUSED: 'sidebar-focused',
      LAYOUT_FIXED: 'layout-fixed',
      NAVBAR_FIXED: 'layout-navbar-fixed',
      FOOTER_FIXED: 'layout-footer-fixed',
      LOGIN_PAGE: 'login-page',
      REGISTER_PAGE: 'register-page',
      CONTROL_SIDEBAR_SLIDE_OPEN: 'control-sidebar-slide-open',
      CONTROL_SIDEBAR_OPEN: 'control-sidebar-open'
    };
    var Default = {
      scrollbarTheme: 'os-theme-light',
      scrollbarAutoHide: 'l',
      panelAutoHeight: true,
      loginRegisterAutoHeight: true
    };
    /**
     * Class Definition
     * ====================================================
     */

    var Layout = /*#__PURE__*/function () {
      function Layout(element, config) {
        this._config = config;
        this._element = element;

        this._init();
      } // Public


      var _proto = Layout.prototype;

      _proto.fixLayoutHeight = function fixLayoutHeight(extra) {
        if (extra === void 0) {
          extra = null;
        }

        var control_sidebar = 0;

        if ($('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || extra == 'control_sidebar') {
          control_sidebar = $(Selector.CONTROL_SIDEBAR_CONTENT).height();
        }

        var heights = {
          window: $(window).height(),
          header: $(Selector.HEADER).length !== 0 ? $(Selector.HEADER).outerHeight() : 0,
          footer: $(Selector.FOOTER).length !== 0 ? $(Selector.FOOTER).outerHeight() : 0,
          sidebar: $(Selector.SIDEBAR).length !== 0 ? $(Selector.SIDEBAR).height() : 0,
          control_sidebar: control_sidebar
        };

        var max = this._max(heights);

        var offset = this._config.panelAutoHeight;

        if (offset === true) {
          offset = 0;
        }

        if (offset !== false) {
          if (max == heights.control_sidebar) {
            $(Selector.CONTENT).css('min-height', max + offset);
          } else if (max == heights.window) {
            $(Selector.CONTENT).css('min-height', max + offset - heights.header - heights.footer);
          } else {
            $(Selector.CONTENT).css('min-height', max + offset - heights.header);
          }

          if (this._isFooterFixed()) {
            $(Selector.CONTENT).css('min-height', parseFloat($(Selector.CONTENT).css('min-height')) + heights.footer);
          }
        }

        if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {
          if (offset !== false) {
            $(Selector.CONTENT).css('min-height', max + offset - heights.header - heights.footer);
          }

          if (typeof $.fn.overlayScrollbars !== 'undefined') {
            $(Selector.SIDEBAR).overlayScrollbars({
              className: this._config.scrollbarTheme,
              sizeAutoCapable: true,
              scrollbars: {
                autoHide: this._config.scrollbarAutoHide,
                clickScrolling: true
              }
            });
          }
        }
      };

      _proto.fixLoginRegisterHeight = function fixLoginRegisterHeight() {
        if ($(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).length === 0) {
          $('body, html').css('height', 'auto');
        } else if ($(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).length !== 0) {
          var box_height = $(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).height();

          if ($('body').css('min-height') !== box_height) {
            $('body').css('min-height', box_height);
          }
        }
      } // Private
      ;

      _proto._init = function _init() {
        var _this = this;

        // Activate layout height watcher
        this.fixLayoutHeight();

        if (this._config.loginRegisterAutoHeight === true) {
          this.fixLoginRegisterHeight();
        } else if (Number.isInteger(this._config.loginRegisterAutoHeight)) {
          setInterval(this.fixLoginRegisterHeight, this._config.loginRegisterAutoHeight);
        }

        $(Selector.SIDEBAR).on('collapsed.lte.treeview expanded.lte.treeview', function () {
          _this.fixLayoutHeight();
        });
        $(Selector.PUSHMENU_BTN).on('collapsed.lte.pushmenu shown.lte.pushmenu', function () {
          _this.fixLayoutHeight();
        });
        $(Selector.CONTROL_SIDEBAR_BTN).on('collapsed.lte.controlsidebar', function () {
          _this.fixLayoutHeight();
        }).on('expanded.lte.controlsidebar', function () {
          _this.fixLayoutHeight('control_sidebar');
        });
        $(window).resize(function () {
          _this.fixLayoutHeight();
        });
        setTimeout(function () {
          $('body.hold-transition').removeClass('hold-transition');
        }, 50);
      };

      _proto._max = function _max(numbers) {
        // Calculate the maximum number in a list
        var max = 0;
        Object.keys(numbers).forEach(function (key) {
          if (numbers[key] > max) {
            max = numbers[key];
          }
        });
        return max;
      };

      _proto._isFooterFixed = function _isFooterFixed() {
        return $('.main-footer').css('position') === 'fixed';
      } // Static
      ;

      Layout._jQueryInterface = function _jQueryInterface(config) {
        if (config === void 0) {
          config = '';
        }

        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _options = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new Layout($(this), _options);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'init' || config === '') {
            data['_init']();
          } else if (config === 'fixLayoutHeight' || config === 'fixLoginRegisterHeight') {
            data[config]();
          }
        });
      };

      return Layout;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(window).on('load', function () {
      Layout._jQueryInterface.call($('body'));
    });
    $(Selector.SIDEBAR + ' a').on('focusin', function () {
      $(Selector.MAIN_SIDEBAR).addClass(ClassName.SIDEBAR_FOCUSED);
    });
    $(Selector.SIDEBAR + ' a').on('focusout', function () {
      $(Selector.MAIN_SIDEBAR).removeClass(ClassName.SIDEBAR_FOCUSED);
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = Layout._jQueryInterface;
    $.fn[NAME].Constructor = Layout;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Layout._jQueryInterface;
    };

    return Layout;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE PushMenu.js
   * License MIT
   * --------------------------------------------
   */
  var PushMenu = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'PushMenu';
    var DATA_KEY = 'lte.pushmenu';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      COLLAPSED: "collapsed" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY
    };
    var Default = {
      autoCollapseSize: 992,
      enableRemember: false,
      noTransitionAfterReload: true
    };
    var Selector = {
      TOGGLE_BUTTON: '[data-widget="pushmenu"]',
      SIDEBAR_MINI: '.sidebar-mini',
      SIDEBAR_COLLAPSED: '.sidebar-collapse',
      BODY: 'body',
      OVERLAY: '#sidebar-overlay',
      WRAPPER: '.wrapper'
    };
    var ClassName = {
      COLLAPSED: 'sidebar-collapse',
      OPEN: 'sidebar-open',
      CLOSED: 'sidebar-closed'
    };
    /**
     * Class Definition
     * ====================================================
     */

    var PushMenu = /*#__PURE__*/function () {
      function PushMenu(element, options) {
        this._element = element;
        this._options = $.extend({}, Default, options);

        if (!$(Selector.OVERLAY).length) {
          this._addOverlay();
        }

        this._init();
      } // Public


      var _proto = PushMenu.prototype;

      _proto.expand = function expand() {
        if (this._options.autoCollapseSize) {
          if ($(window).width() <= this._options.autoCollapseSize) {
            $(Selector.BODY).addClass(ClassName.OPEN);
          }
        }

        $(Selector.BODY).removeClass(ClassName.COLLAPSED).removeClass(ClassName.CLOSED);

        if (this._options.enableRemember) {
          localStorage.setItem("remember" + EVENT_KEY, ClassName.OPEN);
        }

        var shownEvent = $.Event(Event.SHOWN);
        $(this._element).trigger(shownEvent);
      };

      _proto.collapse = function collapse() {
        if (this._options.autoCollapseSize) {
          if ($(window).width() <= this._options.autoCollapseSize) {
            $(Selector.BODY).removeClass(ClassName.OPEN).addClass(ClassName.CLOSED);
          }
        }

        $(Selector.BODY).addClass(ClassName.COLLAPSED);

        if (this._options.enableRemember) {
          localStorage.setItem("remember" + EVENT_KEY, ClassName.COLLAPSED);
        }

        var collapsedEvent = $.Event(Event.COLLAPSED);
        $(this._element).trigger(collapsedEvent);
      };

      _proto.toggle = function toggle() {
        if (!$(Selector.BODY).hasClass(ClassName.COLLAPSED)) {
          this.collapse();
        } else {
          this.expand();
        }
      };

      _proto.autoCollapse = function autoCollapse(resize) {
        if (resize === void 0) {
          resize = false;
        }

        if (this._options.autoCollapseSize) {
          if ($(window).width() <= this._options.autoCollapseSize) {
            if (!$(Selector.BODY).hasClass(ClassName.OPEN)) {
              this.collapse();
            }
          } else if (resize == true) {
            if ($(Selector.BODY).hasClass(ClassName.OPEN)) {
              $(Selector.BODY).removeClass(ClassName.OPEN);
            } else if ($(Selector.BODY).hasClass(ClassName.CLOSED)) {
              this.expand();
            }
          }
        }
      };

      _proto.remember = function remember() {
        if (this._options.enableRemember) {
          var toggleState = localStorage.getItem("remember" + EVENT_KEY);

          if (toggleState == ClassName.COLLAPSED) {
            if (this._options.noTransitionAfterReload) {
              $("body").addClass('hold-transition').addClass(ClassName.COLLAPSED).delay(50).queue(function () {
                $(this).removeClass('hold-transition');
                $(this).dequeue();
              });
            } else {
              $("body").addClass(ClassName.COLLAPSED);
            }
          } else {
            if (this._options.noTransitionAfterReload) {
              $("body").addClass('hold-transition').removeClass(ClassName.COLLAPSED).delay(50).queue(function () {
                $(this).removeClass('hold-transition');
                $(this).dequeue();
              });
            } else {
              $("body").removeClass(ClassName.COLLAPSED);
            }
          }
        }
      } // Private
      ;

      _proto._init = function _init() {
        var _this = this;

        this.remember();
        this.autoCollapse();
        $(window).resize(function () {
          _this.autoCollapse(true);
        });
      };

      _proto._addOverlay = function _addOverlay() {
        var _this2 = this;

        var overlay = $('<div />', {
          id: 'sidebar-overlay'
        });
        overlay.on('click', function () {
          _this2.collapse();
        });
        $(Selector.WRAPPER).append(overlay);
      } // Static
      ;

      PushMenu._jQueryInterface = function _jQueryInterface(operation) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _options = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new PushMenu(this, _options);
            $(this).data(DATA_KEY, data);
          }

          if (typeof operation === 'string' && operation.match(/collapse|expand|toggle/)) {
            data[operation]();
          }
        });
      };

      return PushMenu;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(document).on('click', Selector.TOGGLE_BUTTON, function (event) {
      event.preventDefault();
      var button = event.currentTarget;

      if ($(button).data('widget') !== 'pushmenu') {
        button = $(button).closest(Selector.TOGGLE_BUTTON);
      }

      PushMenu._jQueryInterface.call($(button), 'toggle');
    });
    $(window).on('load', function () {
      PushMenu._jQueryInterface.call($(Selector.TOGGLE_BUTTON));
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = PushMenu._jQueryInterface;
    $.fn[NAME].Constructor = PushMenu;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return PushMenu._jQueryInterface;
    };

    return PushMenu;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE Treeview.js
   * License MIT
   * --------------------------------------------
   */
  var Treeview = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'Treeview';
    var DATA_KEY = 'lte.treeview';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      SELECTED: "selected" + EVENT_KEY,
      EXPANDED: "expanded" + EVENT_KEY,
      COLLAPSED: "collapsed" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY
    };
    var Selector = {
      LI: '.nav-item',
      LINK: '.nav-link',
      TREEVIEW_MENU: '.nav-treeview',
      OPEN: '.menu-open',
      DATA_WIDGET: '[data-widget="treeview"]'
    };
    var ClassName = {
      LI: 'nav-item',
      LINK: 'nav-link',
      TREEVIEW_MENU: 'nav-treeview',
      OPEN: 'menu-open',
      SIDEBAR_COLLAPSED: 'sidebar-collapse'
    };
    var Default = {
      trigger: Selector.DATA_WIDGET + " " + Selector.LINK,
      animationSpeed: 300,
      accordion: true,
      expandSidebar: false,
      sidebarButtonSelector: '[data-widget="pushmenu"]'
    };
    /**
     * Class Definition
     * ====================================================
     */

    var Treeview = /*#__PURE__*/function () {
      function Treeview(element, config) {
        this._config = config;
        this._element = element;
      } // Public


      var _proto = Treeview.prototype;

      _proto.init = function init() {
        this._setupListeners();
      };

      _proto.expand = function expand(treeviewMenu, parentLi) {
        var _this = this;

        var expandedEvent = $.Event(Event.EXPANDED);

        if (this._config.accordion) {
          var openMenuLi = parentLi.siblings(Selector.OPEN).first();
          var openTreeview = openMenuLi.find(Selector.TREEVIEW_MENU).first();
          this.collapse(openTreeview, openMenuLi);
        }

        treeviewMenu.stop().slideDown(this._config.animationSpeed, function () {
          parentLi.addClass(ClassName.OPEN);
          $(_this._element).trigger(expandedEvent);
        });

        if (this._config.expandSidebar) {
          this._expandSidebar();
        }
      };

      _proto.collapse = function collapse(treeviewMenu, parentLi) {
        var _this2 = this;

        var collapsedEvent = $.Event(Event.COLLAPSED);
        treeviewMenu.stop().slideUp(this._config.animationSpeed, function () {
          parentLi.removeClass(ClassName.OPEN);
          $(_this2._element).trigger(collapsedEvent);
          treeviewMenu.find(Selector.OPEN + " > " + Selector.TREEVIEW_MENU).slideUp();
          treeviewMenu.find(Selector.OPEN).removeClass(ClassName.OPEN);
        });
      };

      _proto.toggle = function toggle(event) {
        var $relativeTarget = $(event.currentTarget);
        var $parent = $relativeTarget.parent();
        var treeviewMenu = $parent.find('> ' + Selector.TREEVIEW_MENU);

        if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {
          if (!$parent.is(Selector.LI)) {
            treeviewMenu = $parent.parent().find('> ' + Selector.TREEVIEW_MENU);
          }

          if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {
            return;
          }
        }

        event.preventDefault();
        var parentLi = $relativeTarget.parents(Selector.LI).first();
        var isOpen = parentLi.hasClass(ClassName.OPEN);

        if (isOpen) {
          this.collapse($(treeviewMenu), parentLi);
        } else {
          this.expand($(treeviewMenu), parentLi);
        }
      } // Private
      ;

      _proto._setupListeners = function _setupListeners() {
        var _this3 = this;

        $(document).on('click', this._config.trigger, function (event) {
          _this3.toggle(event);
        });
      };

      _proto._expandSidebar = function _expandSidebar() {
        if ($('body').hasClass(ClassName.SIDEBAR_COLLAPSED)) {
          $(this._config.sidebarButtonSelector).PushMenu('expand');
        }
      } // Static
      ;

      Treeview._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _options = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new Treeview($(this), _options);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'init') {
            data[config]();
          }
        });
      };

      return Treeview;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(window).on(Event.LOAD_DATA_API, function () {
      $(Selector.DATA_WIDGET).each(function () {
        Treeview._jQueryInterface.call($(this), 'init');
      });
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = Treeview._jQueryInterface;
    $.fn[NAME].Constructor = Treeview;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Treeview._jQueryInterface;
    };

    return Treeview;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE DirectChat.js
   * License MIT
   * --------------------------------------------
   */
  var DirectChat = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'DirectChat';
    var DATA_KEY = 'lte.directchat';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      TOGGLED: "toggled{EVENT_KEY}"
    };
    var Selector = {
      DATA_TOGGLE: '[data-widget="chat-pane-toggle"]',
      DIRECT_CHAT: '.direct-chat'
    };
    var ClassName = {
      DIRECT_CHAT_OPEN: 'direct-chat-contacts-open'
    };
    /**
     * Class Definition
     * ====================================================
     */

    var DirectChat = /*#__PURE__*/function () {
      function DirectChat(element, config) {
        this._element = element;
      }

      var _proto = DirectChat.prototype;

      _proto.toggle = function toggle() {
        $(this._element).parents(Selector.DIRECT_CHAT).first().toggleClass(ClassName.DIRECT_CHAT_OPEN);
        var toggledEvent = $.Event(Event.TOGGLED);
        $(this._element).trigger(toggledEvent);
      } // Static
      ;

      DirectChat._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new DirectChat($(this));
            $(this).data(DATA_KEY, data);
          }

          data[config]();
        });
      };

      return DirectChat;
    }();
    /**
     *
     * Data Api implementation
     * ====================================================
     */


    $(document).on('click', Selector.DATA_TOGGLE, function (event) {
      if (event) event.preventDefault();

      DirectChat._jQueryInterface.call($(this), 'toggle');
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = DirectChat._jQueryInterface;
    $.fn[NAME].Constructor = DirectChat;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return DirectChat._jQueryInterface;
    };

    return DirectChat;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE TodoList.js
   * License MIT
   * --------------------------------------------
   */
  var TodoList = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'TodoList';
    var DATA_KEY = 'lte.todolist';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Selector = {
      DATA_TOGGLE: '[data-widget="todo-list"]'
    };
    var ClassName = {
      TODO_LIST_DONE: 'done'
    };
    var Default = {
      onCheck: function onCheck(item) {
        return item;
      },
      onUnCheck: function onUnCheck(item) {
        return item;
      }
    };
    /**
     * Class Definition
     * ====================================================
     */

    var TodoList = /*#__PURE__*/function () {
      function TodoList(element, config) {
        this._config = config;
        this._element = element;

        this._init();
      } // Public


      var _proto = TodoList.prototype;

      _proto.toggle = function toggle(item) {
        item.parents('li').toggleClass(ClassName.TODO_LIST_DONE);

        if (!$(item).prop('checked')) {
          this.unCheck($(item));
          return;
        }

        this.check(item);
      };

      _proto.check = function check(item) {
        this._config.onCheck.call(item);
      };

      _proto.unCheck = function unCheck(item) {
        this._config.onUnCheck.call(item);
      } // Private
      ;

      _proto._init = function _init() {
        var that = this;
        $(Selector.DATA_TOGGLE).find('input:checkbox:checked').parents('li').toggleClass(ClassName.TODO_LIST_DONE);
        $(Selector.DATA_TOGGLE).on('change', 'input:checkbox', function (event) {
          that.toggle($(event.target));
        });
      } // Static
      ;

      TodoList._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _options = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new TodoList($(this), _options);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'init') {
            data[config]();
          }
        });
      };

      return TodoList;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(window).on('load', function () {
      TodoList._jQueryInterface.call($(Selector.DATA_TOGGLE));
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = TodoList._jQueryInterface;
    $.fn[NAME].Constructor = TodoList;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return TodoList._jQueryInterface;
    };

    return TodoList;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE CardWidget.js
   * License MIT
   * --------------------------------------------
   */
  var CardWidget = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'CardWidget';
    var DATA_KEY = 'lte.cardwidget';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      EXPANDED: "expanded" + EVENT_KEY,
      COLLAPSED: "collapsed" + EVENT_KEY,
      MAXIMIZED: "maximized" + EVENT_KEY,
      MINIMIZED: "minimized" + EVENT_KEY,
      REMOVED: "removed" + EVENT_KEY
    };
    var ClassName = {
      CARD: 'card',
      COLLAPSED: 'collapsed-card',
      COLLAPSING: 'collapsing-card',
      EXPANDING: 'expanding-card',
      WAS_COLLAPSED: 'was-collapsed',
      MAXIMIZED: 'maximized-card'
    };
    var Selector = {
      DATA_REMOVE: '[data-card-widget="remove"]',
      DATA_COLLAPSE: '[data-card-widget="collapse"]',
      DATA_MAXIMIZE: '[data-card-widget="maximize"]',
      CARD: "." + ClassName.CARD,
      CARD_HEADER: '.card-header',
      CARD_BODY: '.card-body',
      CARD_FOOTER: '.card-footer',
      COLLAPSED: "." + ClassName.COLLAPSED
    };
    var Default = {
      animationSpeed: 'normal',
      collapseTrigger: Selector.DATA_COLLAPSE,
      removeTrigger: Selector.DATA_REMOVE,
      maximizeTrigger: Selector.DATA_MAXIMIZE,
      collapseIcon: 'fa-minus',
      expandIcon: 'fa-plus',
      maximizeIcon: 'fa-expand',
      minimizeIcon: 'fa-compress'
    };

    var CardWidget = /*#__PURE__*/function () {
      function CardWidget(element, settings) {
        this._element = element;
        this._parent = element.parents(Selector.CARD).first();

        if (element.hasClass(ClassName.CARD)) {
          this._parent = element;
        }

        this._settings = $.extend({}, Default, settings);
      }

      var _proto = CardWidget.prototype;

      _proto.collapse = function collapse() {
        var _this = this;

        this._parent.addClass(ClassName.COLLAPSING).children(Selector.CARD_BODY + ", " + Selector.CARD_FOOTER).slideUp(this._settings.animationSpeed, function () {
          _this._parent.addClass(ClassName.COLLAPSED).removeClass(ClassName.COLLAPSING);
        });

        this._parent.find('> ' + Selector.CARD_HEADER + ' ' + this._settings.collapseTrigger + ' .' + this._settings.collapseIcon).addClass(this._settings.expandIcon).removeClass(this._settings.collapseIcon);

        var collapsed = $.Event(Event.COLLAPSED);

        this._element.trigger(collapsed, this._parent);
      };

      _proto.expand = function expand() {
        var _this2 = this;

        this._parent.addClass(ClassName.EXPANDING).children(Selector.CARD_BODY + ", " + Selector.CARD_FOOTER).slideDown(this._settings.animationSpeed, function () {
          _this2._parent.removeClass(ClassName.COLLAPSED).removeClass(ClassName.EXPANDING);
        });

        this._parent.find('> ' + Selector.CARD_HEADER + ' ' + this._settings.collapseTrigger + ' .' + this._settings.expandIcon).addClass(this._settings.collapseIcon).removeClass(this._settings.expandIcon);

        var expanded = $.Event(Event.EXPANDED);

        this._element.trigger(expanded, this._parent);
      };

      _proto.remove = function remove() {
        this._parent.slideUp();

        var removed = $.Event(Event.REMOVED);

        this._element.trigger(removed, this._parent);
      };

      _proto.toggle = function toggle() {
        if (this._parent.hasClass(ClassName.COLLAPSED)) {
          this.expand();
          return;
        }

        this.collapse();
      };

      _proto.maximize = function maximize() {
        this._parent.find(this._settings.maximizeTrigger + ' .' + this._settings.maximizeIcon).addClass(this._settings.minimizeIcon).removeClass(this._settings.maximizeIcon);

        this._parent.css({
          'height': this._parent.height(),
          'width': this._parent.width(),
          'transition': 'all .15s'
        }).delay(150).queue(function () {
          $(this).addClass(ClassName.MAXIMIZED);
          $('html').addClass(ClassName.MAXIMIZED);

          if ($(this).hasClass(ClassName.COLLAPSED)) {
            $(this).addClass(ClassName.WAS_COLLAPSED);
          }

          $(this).dequeue();
        });

        var maximized = $.Event(Event.MAXIMIZED);

        this._element.trigger(maximized, this._parent);
      };

      _proto.minimize = function minimize() {
        this._parent.find(this._settings.maximizeTrigger + ' .' + this._settings.minimizeIcon).addClass(this._settings.maximizeIcon).removeClass(this._settings.minimizeIcon);

        this._parent.css('cssText', 'height:' + this._parent[0].style.height + ' !important;' + 'width:' + this._parent[0].style.width + ' !important; transition: all .15s;').delay(10).queue(function () {
          $(this).removeClass(ClassName.MAXIMIZED);
          $('html').removeClass(ClassName.MAXIMIZED);
          $(this).css({
            'height': 'inherit',
            'width': 'inherit'
          });

          if ($(this).hasClass(ClassName.WAS_COLLAPSED)) {
            $(this).removeClass(ClassName.WAS_COLLAPSED);
          }

          $(this).dequeue();
        });

        var MINIMIZED = $.Event(Event.MINIMIZED);

        this._element.trigger(MINIMIZED, this._parent);
      };

      _proto.toggleMaximize = function toggleMaximize() {
        if (this._parent.hasClass(ClassName.MAXIMIZED)) {
          this.minimize();
          return;
        }

        this.maximize();
      } // Private
      ;

      _proto._init = function _init(card) {
        var _this3 = this;

        this._parent = card;
        $(this).find(this._settings.collapseTrigger).click(function () {
          _this3.toggle();
        });
        $(this).find(this._settings.maximizeTrigger).click(function () {
          _this3.toggleMaximize();
        });
        $(this).find(this._settings.removeTrigger).click(function () {
          _this3.remove();
        });
      } // Static
      ;

      CardWidget._jQueryInterface = function _jQueryInterface(config) {
        var data = $(this).data(DATA_KEY);

        var _options = $.extend({}, Default, $(this).data());

        if (!data) {
          data = new CardWidget($(this), _options);
          $(this).data(DATA_KEY, typeof config === 'string' ? data : config);
        }

        if (typeof config === 'string' && config.match(/collapse|expand|remove|toggle|maximize|minimize|toggleMaximize/)) {
          data[config]();
        } else if (typeof config === 'object') {
          data._init($(this));
        }
      };

      return CardWidget;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(document).on('click', Selector.DATA_COLLAPSE, function (event) {
      if (event) {
        event.preventDefault();
      }

      CardWidget._jQueryInterface.call($(this), 'toggle');
    });
    $(document).on('click', Selector.DATA_REMOVE, function (event) {
      if (event) {
        event.preventDefault();
      }

      CardWidget._jQueryInterface.call($(this), 'remove');
    });
    $(document).on('click', Selector.DATA_MAXIMIZE, function (event) {
      if (event) {
        event.preventDefault();
      }

      CardWidget._jQueryInterface.call($(this), 'toggleMaximize');
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = CardWidget._jQueryInterface;
    $.fn[NAME].Constructor = CardWidget;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return CardWidget._jQueryInterface;
    };

    return CardWidget;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE CardRefresh.js
   * License MIT
   * --------------------------------------------
   */
  var CardRefresh = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'CardRefresh';
    var DATA_KEY = 'lte.cardrefresh';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      LOADED: "loaded" + EVENT_KEY,
      OVERLAY_ADDED: "overlay.added" + EVENT_KEY,
      OVERLAY_REMOVED: "overlay.removed" + EVENT_KEY
    };
    var ClassName = {
      CARD: 'card'
    };
    var Selector = {
      CARD: "." + ClassName.CARD,
      DATA_REFRESH: '[data-card-widget="card-refresh"]'
    };
    var Default = {
      source: '',
      sourceSelector: '',
      params: {},
      trigger: Selector.DATA_REFRESH,
      content: '.card-body',
      loadInContent: true,
      loadOnInit: true,
      responseType: '',
      overlayTemplate: '<div class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>',
      onLoadStart: function onLoadStart() {},
      onLoadDone: function onLoadDone(response) {
        return response;
      }
    };

    var CardRefresh = /*#__PURE__*/function () {
      function CardRefresh(element, settings) {
        this._element = element;
        this._parent = element.parents(Selector.CARD).first();
        this._settings = $.extend({}, Default, settings);
        this._overlay = $(this._settings.overlayTemplate);

        if (element.hasClass(ClassName.CARD)) {
          this._parent = element;
        }

        if (this._settings.source === '') {
          throw new Error('Source url was not defined. Please specify a url in your CardRefresh source option.');
        }
      }

      var _proto = CardRefresh.prototype;

      _proto.load = function load() {
        this._addOverlay();

        this._settings.onLoadStart.call($(this));

        $.get(this._settings.source, this._settings.params, function (response) {
          if (this._settings.loadInContent) {
            if (this._settings.sourceSelector != '') {
              response = $(response).find(this._settings.sourceSelector).html();
            }

            this._parent.find(this._settings.content).html(response);
          }

          this._settings.onLoadDone.call($(this), response);

          this._removeOverlay();
        }.bind(this), this._settings.responseType !== '' && this._settings.responseType);
        var loadedEvent = $.Event(Event.LOADED);
        $(this._element).trigger(loadedEvent);
      };

      _proto._addOverlay = function _addOverlay() {
        this._parent.append(this._overlay);

        var overlayAddedEvent = $.Event(Event.OVERLAY_ADDED);
        $(this._element).trigger(overlayAddedEvent);
      };

      _proto._removeOverlay = function _removeOverlay() {
        this._parent.find(this._overlay).remove();

        var overlayRemovedEvent = $.Event(Event.OVERLAY_REMOVED);
        $(this._element).trigger(overlayRemovedEvent);
      };

      // Private
      _proto._init = function _init(card) {
        var _this = this;

        $(this).find(this._settings.trigger).on('click', function () {
          _this.load();
        });

        if (this._settings.loadOnInit) {
          this.load();
        }
      } // Static
      ;

      CardRefresh._jQueryInterface = function _jQueryInterface(config) {
        var data = $(this).data(DATA_KEY);

        var _options = $.extend({}, Default, $(this).data());

        if (!data) {
          data = new CardRefresh($(this), _options);
          $(this).data(DATA_KEY, typeof config === 'string' ? data : config);
        }

        if (typeof config === 'string' && config.match(/load/)) {
          data[config]();
        } else {
          data._init($(this));
        }
      };

      return CardRefresh;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(document).on('click', Selector.DATA_REFRESH, function (event) {
      if (event) {
        event.preventDefault();
      }

      CardRefresh._jQueryInterface.call($(this), 'load');
    });
    $(document).ready(function () {
      $(Selector.DATA_REFRESH).each(function () {
        CardRefresh._jQueryInterface.call($(this));
      });
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = CardRefresh._jQueryInterface;
    $.fn[NAME].Constructor = CardRefresh;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return CardRefresh._jQueryInterface;
    };

    return CardRefresh;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE Dropdown.js
   * License MIT
   * --------------------------------------------
   */
  var Dropdown = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'Dropdown';
    var DATA_KEY = 'lte.dropdown';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Selector = {
      NAVBAR: '.navbar',
      DROPDOWN_MENU: '.dropdown-menu',
      DROPDOWN_MENU_ACTIVE: '.dropdown-menu.show',
      DROPDOWN_TOGGLE: '[data-toggle="dropdown"]'
    };
    var ClassName = {
      DROPDOWN_HOVER: 'dropdown-hover',
      DROPDOWN_RIGHT: 'dropdown-menu-right'
    };
    var Default = {};
    /**
     * Class Definition
     * ====================================================
     */

    var Dropdown = /*#__PURE__*/function () {
      function Dropdown(element, config) {
        this._config = config;
        this._element = element;
      } // Public


      var _proto = Dropdown.prototype;

      _proto.toggleSubmenu = function toggleSubmenu() {
        this._element.siblings().show().toggleClass("show");

        if (!this._element.next().hasClass('show')) {
          this._element.parents('.dropdown-menu').first().find('.show').removeClass("show").hide();
        }

        this._element.parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
          $('.dropdown-submenu .show').removeClass("show").hide();
        });
      };

      _proto.fixPosition = function fixPosition() {
        var elm = $(Selector.DROPDOWN_MENU_ACTIVE);

        if (elm.length !== 0) {
          if (elm.hasClass(ClassName.DROPDOWN_RIGHT)) {
            elm.css('left', 'inherit');
            elm.css('right', 0);
          } else {
            elm.css('left', 0);
            elm.css('right', 'inherit');
          }

          var offset = elm.offset();
          var width = elm.width();
          var windowWidth = $(window).width();
          var visiblePart = windowWidth - offset.left;

          if (offset.left < 0) {
            elm.css('left', 'inherit');
            elm.css('right', offset.left - 5);
          } else {
            if (visiblePart < width) {
              elm.css('left', 'inherit');
              elm.css('right', 0);
            }
          }
        }
      } // Static
      ;

      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _config = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new Dropdown($(this), _config);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'toggleSubmenu' || config == 'fixPosition') {
            data[config]();
          }
        });
      };

      return Dropdown;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(Selector.DROPDOWN_MENU + ' ' + Selector.DROPDOWN_TOGGLE).on("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      Dropdown._jQueryInterface.call($(this), 'toggleSubmenu');
    });
    $(Selector.NAVBAR + ' ' + Selector.DROPDOWN_TOGGLE).on("click", function (event) {
      event.preventDefault();
      setTimeout(function () {
        Dropdown._jQueryInterface.call($(this), 'fixPosition');
      }, 1);
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = Dropdown._jQueryInterface;
    $.fn[NAME].Constructor = Dropdown;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE Toasts.js
   * License MIT
   * --------------------------------------------
   */
  var Toasts = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'Toasts';
    var DATA_KEY = 'lte.toasts';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      INIT: "init" + EVENT_KEY,
      CREATED: "created" + EVENT_KEY,
      REMOVED: "removed" + EVENT_KEY
    };
    var Selector = {
      BODY: 'toast-body',
      CONTAINER_TOP_RIGHT: '#toastsContainerTopRight',
      CONTAINER_TOP_LEFT: '#toastsContainerTopLeft',
      CONTAINER_BOTTOM_RIGHT: '#toastsContainerBottomRight',
      CONTAINER_BOTTOM_LEFT: '#toastsContainerBottomLeft'
    };
    var ClassName = {
      TOP_RIGHT: 'toasts-top-right',
      TOP_LEFT: 'toasts-top-left',
      BOTTOM_RIGHT: 'toasts-bottom-right',
      BOTTOM_LEFT: 'toasts-bottom-left',
      FADE: 'fade'
    };
    var Position = {
      TOP_RIGHT: 'topRight',
      TOP_LEFT: 'topLeft',
      BOTTOM_RIGHT: 'bottomRight',
      BOTTOM_LEFT: 'bottomLeft'
    };
    var Default = {
      position: Position.TOP_RIGHT,
      fixed: true,
      autohide: false,
      autoremove: true,
      delay: 1000,
      fade: true,
      icon: null,
      image: null,
      imageAlt: null,
      imageHeight: '25px',
      title: null,
      subtitle: null,
      close: true,
      body: null,
      class: null
    };
    /**
     * Class Definition
     * ====================================================
     */

    var Toasts = /*#__PURE__*/function () {
      function Toasts(element, config) {
        this._config = config;

        this._prepareContainer();

        var initEvent = $.Event(Event.INIT);
        $('body').trigger(initEvent);
      } // Public


      var _proto = Toasts.prototype;

      _proto.create = function create() {
        var toast = $('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"/>');
        toast.data('autohide', this._config.autohide);
        toast.data('animation', this._config.fade);

        if (this._config.class) {
          toast.addClass(this._config.class);
        }

        if (this._config.delay && this._config.delay != 500) {
          toast.data('delay', this._config.delay);
        }

        var toast_header = $('<div class="toast-header">');

        if (this._config.image != null) {
          var toast_image = $('<img />').addClass('rounded mr-2').attr('src', this._config.image).attr('alt', this._config.imageAlt);

          if (this._config.imageHeight != null) {
            toast_image.height(this._config.imageHeight).width('auto');
          }

          toast_header.append(toast_image);
        }

        if (this._config.icon != null) {
          toast_header.append($('<i />').addClass('mr-2').addClass(this._config.icon));
        }

        if (this._config.title != null) {
          toast_header.append($('<strong />').addClass('mr-auto').html(this._config.title));
        }

        if (this._config.subtitle != null) {
          toast_header.append($('<small />').html(this._config.subtitle));
        }

        if (this._config.close == true) {
          var toast_close = $('<button data-dismiss="toast" />').attr('type', 'button').addClass('ml-2 mb-1 close').attr('aria-label', 'Close').append('<span aria-hidden="true">&times;</span>');

          if (this._config.title == null) {
            toast_close.toggleClass('ml-2 ml-auto');
          }

          toast_header.append(toast_close);
        }

        toast.append(toast_header);

        if (this._config.body != null) {
          toast.append($('<div class="toast-body" />').html(this._config.body));
        }

        $(this._getContainerId()).prepend(toast);
        var createdEvent = $.Event(Event.CREATED);
        $('body').trigger(createdEvent);
        toast.toast('show');

        if (this._config.autoremove) {
          toast.on('hidden.bs.toast', function () {
            $(this).delay(200).remove();
            var removedEvent = $.Event(Event.REMOVED);
            $('body').trigger(removedEvent);
          });
        }
      } // Static
      ;

      _proto._getContainerId = function _getContainerId() {
        if (this._config.position == Position.TOP_RIGHT) {
          return Selector.CONTAINER_TOP_RIGHT;
        } else if (this._config.position == Position.TOP_LEFT) {
          return Selector.CONTAINER_TOP_LEFT;
        } else if (this._config.position == Position.BOTTOM_RIGHT) {
          return Selector.CONTAINER_BOTTOM_RIGHT;
        } else if (this._config.position == Position.BOTTOM_LEFT) {
          return Selector.CONTAINER_BOTTOM_LEFT;
        }
      };

      _proto._prepareContainer = function _prepareContainer() {
        if ($(this._getContainerId()).length === 0) {
          var container = $('<div />').attr('id', this._getContainerId().replace('#', ''));

          if (this._config.position == Position.TOP_RIGHT) {
            container.addClass(ClassName.TOP_RIGHT);
          } else if (this._config.position == Position.TOP_LEFT) {
            container.addClass(ClassName.TOP_LEFT);
          } else if (this._config.position == Position.BOTTOM_RIGHT) {
            container.addClass(ClassName.BOTTOM_RIGHT);
          } else if (this._config.position == Position.BOTTOM_LEFT) {
            container.addClass(ClassName.BOTTOM_LEFT);
          }

          $('body').append(container);
        }

        if (this._config.fixed) {
          $(this._getContainerId()).addClass('fixed');
        } else {
          $(this._getContainerId()).removeClass('fixed');
        }
      } // Static
      ;

      Toasts._jQueryInterface = function _jQueryInterface(option, config) {
        return this.each(function () {
          var _options = $.extend({}, Default, config);

          var toast = new Toasts($(this), _options);

          if (option === 'create') {
            toast[option]();
          }
        });
      };

      return Toasts;
    }();
    /**
     * jQuery API
     * ====================================================
     */


    $.fn[NAME] = Toasts._jQueryInterface;
    $.fn[NAME].Constructor = Toasts;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Toasts._jQueryInterface;
    };

    return Toasts;
  }(jQuery);

  exports.CardRefresh = CardRefresh;
  exports.CardWidget = CardWidget;
  exports.ControlSidebar = ControlSidebar;
  exports.DirectChat = DirectChat;
  exports.Dropdown = Dropdown;
  exports.Layout = Layout;
  exports.PushMenu = PushMenu;
  exports.Toasts = Toasts;
  exports.TodoList = TodoList;
  exports.Treeview = Treeview;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

/*!
 * Font Awesome Free 5.15.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).Sweetalert2=e()}(this,function(){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function s(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}function c(){return(c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n,o=arguments[e];for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t}).apply(this,arguments)}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t,e){return(l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function d(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}function i(t,e,n){return(i=d()?Reflect.construct:function(t,e,n){var o=[null];o.push.apply(o,e);o=new(Function.bind.apply(t,o));return n&&l(o,n.prototype),o}).apply(null,arguments)}function p(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function f(t,e,n){return(f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){t=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=u(t)););return t}(t,e);if(t){e=Object.getOwnPropertyDescriptor(t,e);return e.get?e.get.call(n):e.value}})(t,e,n||t)}function m(e){return Object.keys(e).map(function(t){return e[t]})}function h(t){return Array.prototype.slice.call(t)}function g(t,e){e='"'.concat(t,'" is deprecated and will be removed in the next major release. Please use "').concat(e,'" instead.'),-1===K.indexOf(e)&&(K.push(e),z(e))}function v(t){return t&&"function"==typeof t.toPromise}function y(t){return v(t)?t.toPromise():Promise.resolve(t)}function b(t){return t&&Promise.resolve(t)===t}function w(t){return t instanceof Element||"object"===r(t=t)&&t.jquery}function C(){return document.body.querySelector(".".concat($.container))}function k(t){var e=C();return e?e.querySelector(t):null}function t(t){return k(".".concat(t))}function x(){return t($.popup)}function n(){var t=x();return h(t.querySelectorAll(".".concat($.icon)))}function B(){var t=n().filter(function(t){return bt(t)});return t.length?t[0]:null}function A(){return t($.title)}function P(){return t($.content)}function E(){return t($.image)}function O(){return t($["progress-steps"])}function S(){return t($["validation-message"])}function T(){return k(".".concat($.actions," .").concat($.confirm))}function L(){return k(".".concat($.actions," .").concat($.deny))}function D(){return k(".".concat($.loader))}function I(){return k(".".concat($.actions," .").concat($.cancel))}function q(){return t($.actions)}function j(){return t($.header)}function M(){return t($.footer)}function V(){return t($["timer-progress-bar"])}function H(){return t($.close)}function R(){var t=h(x().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(function(t,e){return t=parseInt(t.getAttribute("tabindex")),(e=parseInt(e.getAttribute("tabindex")))<t?1:t<e?-1:0}),e=h(x().querySelectorAll('\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n')).filter(function(t){return"-1"!==t.getAttribute("tabindex")});return function(t){for(var e=[],n=0;n<t.length;n++)-1===e.indexOf(t[n])&&e.push(t[n]);return e}(t.concat(e)).filter(function(t){return bt(t)})}function N(){return!X()&&!document.body.classList.contains($["no-backdrop"])}function U(e,t){e.textContent="",t&&(t=(new DOMParser).parseFromString(t,"text/html"),h(t.querySelector("head").childNodes).forEach(function(t){e.appendChild(t)}),h(t.querySelector("body").childNodes).forEach(function(t){e.appendChild(t)}))}function _(t,e){if(e){for(var n=e.split(/\s+/),o=0;o<n.length;o++)if(!t.classList.contains(n[o]))return;return 1}}function F(t,e,n){var o,i;if(i=e,h((o=t).classList).forEach(function(t){-1===m($).indexOf(t)&&-1===m(J).indexOf(t)&&-1===m(i.showClass).indexOf(t)&&o.classList.remove(t)}),e.customClass&&e.customClass[n]){if("string"!=typeof e.customClass[n]&&!e.customClass[n].forEach)return z("Invalid type of customClass.".concat(n,'! Expected string or iterable object, got "').concat(r(e.customClass[n]),'"'));gt(t,e.customClass[n])}}var e="SweetAlert2:",z=function(t){console.warn("".concat(e," ").concat(t))},W=function(t){console.error("".concat(e," ").concat(t))},K=[],Y=function(t){return"function"==typeof t?t():t},Z=Object.freeze({cancel:"cancel",backdrop:"backdrop",close:"close",esc:"esc",timer:"timer"}),Q=function(t){var e,n={};for(e in t)n[t[e]]="swal2-"+t[e];return n},$=Q(["container","shown","height-auto","iosfix","popup","modal","no-backdrop","no-transition","toast","toast-shown","toast-column","show","hide","close","title","header","content","html-container","actions","confirm","deny","cancel","footer","icon","icon-content","image","input","file","range","select","radio","checkbox","label","textarea","inputerror","input-label","validation-message","progress-steps","active-progress-step","progress-step","progress-step-line","loader","loading","styled","top","top-start","top-end","top-left","top-right","center","center-start","center-end","center-left","center-right","bottom","bottom-start","bottom-end","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen","rtl","timer-progress-bar","timer-progress-bar-container","scrollbar-measure","icon-success","icon-warning","icon-info","icon-question","icon-error"]),J=Q(["success","warning","info","question","error"]),X=function(){return document.body.classList.contains($["toast-shown"])},G={previousBodyPadding:null};function tt(t,e){if(!e)return null;switch(e){case"select":case"textarea":case"file":return yt(t,$[e]);case"checkbox":return t.querySelector(".".concat($.checkbox," input"));case"radio":return t.querySelector(".".concat($.radio," input:checked"))||t.querySelector(".".concat($.radio," input:first-child"));case"range":return t.querySelector(".".concat($.range," input"));default:return yt(t,$.input)}}function et(t){var e;t.focus(),"file"!==t.type&&(e=t.value,t.value="",t.value=e)}function nt(t,e,n){t&&e&&("string"==typeof e&&(e=e.split(/\s+/).filter(Boolean)),e.forEach(function(e){t.forEach?t.forEach(function(t){n?t.classList.add(e):t.classList.remove(e)}):n?t.classList.add(e):t.classList.remove(e)}))}function ot(t,e,n){n||0===parseInt(n)?t.style[e]="number"==typeof n?"".concat(n,"px"):n:t.style.removeProperty(e)}function it(t,e){e=1<arguments.length&&void 0!==e?e:"flex",t.style.display=e}function rt(t){t.style.display="none"}function at(t,e,n,o){(e=t.querySelector(e))&&(e.style[n]=o)}function st(t,e,n){e?it(t,n):rt(t)}function ct(t){return!!(t.scrollHeight>t.clientHeight)}function ut(t){var e=window.getComputedStyle(t),t=parseFloat(e.getPropertyValue("animation-duration")||"0"),e=parseFloat(e.getPropertyValue("transition-duration")||"0");return 0<t||0<e}function lt(t,e){var e=1<arguments.length&&void 0!==e&&e,n=V();bt(n)&&(e&&(n.style.transition="none",n.style.width="100%"),setTimeout(function(){n.style.transition="width ".concat(t/1e3,"s linear"),n.style.width="0%"},10))}function dt(){return"undefined"==typeof window||"undefined"==typeof document}function pt(t){kn.isVisible()&&ht!==t.target.value&&kn.resetValidationMessage(),ht=t.target.value}function ft(t,e){t instanceof HTMLElement?e.appendChild(t):"object"===r(t)?kt(t,e):t&&U(e,t)}function mt(t,e){var n=q(),o=D(),i=T(),r=L(),a=I();e.showConfirmButton||e.showDenyButton||e.showCancelButton||rt(n),F(n,e,"actions"),At(i,"confirm",e),At(r,"deny",e),At(a,"cancel",e),function(t,e,n,o){if(!o.buttonsStyling)return vt([t,e,n],$.styled);gt([t,e,n],$.styled),o.confirmButtonColor&&(t.style.backgroundColor=o.confirmButtonColor);o.denyButtonColor&&(e.style.backgroundColor=o.denyButtonColor);o.cancelButtonColor&&(n.style.backgroundColor=o.cancelButtonColor)}(i,r,a,e),e.reverseButtons&&(n.insertBefore(a,o),n.insertBefore(r,o),n.insertBefore(i,o)),o.innerHTML=e.loaderHtml,F(o,e,"loader")}var ht,gt=function(t,e){nt(t,e,!0)},vt=function(t,e){nt(t,e,!1)},yt=function(t,e){for(var n=0;n<t.childNodes.length;n++)if(_(t.childNodes[n],e))return t.childNodes[n]},bt=function(t){return!(!t||!(t.offsetWidth||t.offsetHeight||t.getClientRects().length))},wt='\n <div aria-labelledby="'.concat($.title,'" aria-describedby="').concat($.content,'" class="').concat($.popup,'" tabindex="-1">\n   <div class="').concat($.header,'">\n     <ul class="').concat($["progress-steps"],'"></ul>\n     <div class="').concat($.icon," ").concat(J.error,'"></div>\n     <div class="').concat($.icon," ").concat(J.question,'"></div>\n     <div class="').concat($.icon," ").concat(J.warning,'"></div>\n     <div class="').concat($.icon," ").concat(J.info,'"></div>\n     <div class="').concat($.icon," ").concat(J.success,'"></div>\n     <img class="').concat($.image,'" />\n     <h2 class="').concat($.title,'" id="').concat($.title,'"></h2>\n     <button type="button" class="').concat($.close,'"></button>\n   </div>\n   <div class="').concat($.content,'">\n     <div id="').concat($.content,'" class="').concat($["html-container"],'"></div>\n     <input class="').concat($.input,'" />\n     <input type="file" class="').concat($.file,'" />\n     <div class="').concat($.range,'">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="').concat($.select,'"></select>\n     <div class="').concat($.radio,'"></div>\n     <label for="').concat($.checkbox,'" class="').concat($.checkbox,'">\n       <input type="checkbox" />\n       <span class="').concat($.label,'"></span>\n     </label>\n     <textarea class="').concat($.textarea,'"></textarea>\n     <div class="').concat($["validation-message"],'" id="').concat($["validation-message"],'"></div>\n   </div>\n   <div class="').concat($.actions,'">\n     <div class="').concat($.loader,'"></div>\n     <button type="button" class="').concat($.confirm,'"></button>\n     <button type="button" class="').concat($.deny,'"></button>\n     <button type="button" class="').concat($.cancel,'"></button>\n   </div>\n   <div class="').concat($.footer,'"></div>\n   <div class="').concat($["timer-progress-bar-container"],'">\n     <div class="').concat($["timer-progress-bar"],'"></div>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g,""),Ct=function(t){var e,n,o,i,r,a=!!(i=C())&&(i.parentNode.removeChild(i),vt([document.documentElement,document.body],[$["no-backdrop"],$["toast-shown"],$["has-column"]]),!0);dt()?W("SweetAlert2 requires document to initialize"):((r=document.createElement("div")).className=$.container,a&&gt(r,$["no-transition"]),U(r,wt),(i="string"==typeof(e=t.target)?document.querySelector(e):e).appendChild(r),a=t,(e=x()).setAttribute("role",a.toast?"alert":"dialog"),e.setAttribute("aria-live",a.toast?"polite":"assertive"),a.toast||e.setAttribute("aria-modal","true"),r=i,"rtl"===window.getComputedStyle(r).direction&&gt(C(),$.rtl),t=P(),a=yt(t,$.input),e=yt(t,$.file),n=t.querySelector(".".concat($.range," input")),o=t.querySelector(".".concat($.range," output")),i=yt(t,$.select),r=t.querySelector(".".concat($.checkbox," input")),t=yt(t,$.textarea),a.oninput=pt,e.onchange=pt,i.onchange=pt,r.onchange=pt,t.oninput=pt,n.oninput=function(t){pt(t),o.value=n.value},n.onchange=function(t){pt(t),n.nextSibling.value=n.value})},kt=function(t,e){t.jquery?xt(e,t):U(e,t.toString())},xt=function(t,e){if(t.textContent="",0 in e)for(var n=0;n in e;n++)t.appendChild(e[n].cloneNode(!0));else t.appendChild(e.cloneNode(!0))},Bt=function(){if(dt())return!1;var t,e=document.createElement("div"),n={WebkitAnimation:"webkitAnimationEnd",OAnimation:"oAnimationEnd oanimationend",animation:"animationend"};for(t in n)if(Object.prototype.hasOwnProperty.call(n,t)&&void 0!==e.style[t])return n[t];return!1}();function At(t,e,n){var o;st(t,n["show".concat((o=e).charAt(0).toUpperCase()+o.slice(1),"Button")],"inline-block"),U(t,n["".concat(e,"ButtonText")]),t.setAttribute("aria-label",n["".concat(e,"ButtonAriaLabel")]),t.className=$[e],F(t,n,"".concat(e,"Button")),gt(t,n["".concat(e,"ButtonClass")])}function Pt(t,e){var n,o,i=C();i&&(o=i,"string"==typeof(n=e.backdrop)?o.style.background=n:n||gt([document.documentElement,document.body],$["no-backdrop"]),!e.backdrop&&e.allowOutsideClick&&z('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'),o=i,(n=e.position)in $?gt(o,$[n]):(z('The "position" parameter is not valid, defaulting to "center"'),gt(o,$.center)),n=i,!(o=e.grow)||"string"!=typeof o||(o="grow-".concat(o))in $&&gt(n,$[o]),F(i,e,"container"),(e=document.body.getAttribute("data-swal2-queue-step"))&&(i.setAttribute("data-queue-step",e),document.body.removeAttribute("data-swal2-queue-step")))}function Et(t,e){t.placeholder&&!e.inputPlaceholder||(t.placeholder=e.inputPlaceholder)}function Ot(t,e,n){var o,i;n.inputLabel&&(t.id=$.input,o=document.createElement("label"),i=$["input-label"],o.setAttribute("for",t.id),o.className=i,o.innerText=n.inputLabel,e.insertAdjacentElement("beforebegin",o))}var St={promise:new WeakMap,innerParams:new WeakMap,domCache:new WeakMap},Tt=["input","file","range","select","radio","checkbox","textarea"],Lt=function(t){if(!jt[t.input])return W('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(t.input,'"'));var e=qt(t.input),n=jt[t.input](e,t);it(n),setTimeout(function(){et(n)})},Dt=function(t,e){var n=tt(P(),t);if(n)for(var o in!function(t){for(var e=0;e<t.attributes.length;e++){var n=t.attributes[e].name;-1===["type","value","style"].indexOf(n)&&t.removeAttribute(n)}}(n),e)"range"===t&&"placeholder"===o||n.setAttribute(o,e[o])},It=function(t){var e=qt(t.input);t.customClass&&gt(e,t.customClass.input)},qt=function(t){t=$[t]||$.input;return yt(P(),t)},jt={};jt.text=jt.email=jt.password=jt.number=jt.tel=jt.url=function(t,e){return"string"==typeof e.inputValue||"number"==typeof e.inputValue?t.value=e.inputValue:b(e.inputValue)||z('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(r(e.inputValue),'"')),Ot(t,t,e),Et(t,e),t.type=e.input,t},jt.file=function(t,e){return Ot(t,t,e),Et(t,e),t},jt.range=function(t,e){var n=t.querySelector("input"),o=t.querySelector("output");return n.value=e.inputValue,n.type=e.input,o.value=e.inputValue,Ot(n,t,e),t},jt.select=function(t,e){var n;return t.textContent="",e.inputPlaceholder&&(n=document.createElement("option"),U(n,e.inputPlaceholder),n.value="",n.disabled=!0,n.selected=!0,t.appendChild(n)),Ot(t,t,e),t},jt.radio=function(t){return t.textContent="",t},jt.checkbox=function(t,e){var n=tt(P(),"checkbox");n.value=1,n.id=$.checkbox,n.checked=Boolean(e.inputValue);n=t.querySelector("span");return U(n,e.inputPlaceholder),t},jt.textarea=function(e,t){var n,o;return e.value=t.inputValue,Et(e,t),Ot(e,e,t),"MutationObserver"in window&&(n=parseInt(window.getComputedStyle(x()).width),o=parseInt(window.getComputedStyle(x()).paddingLeft)+parseInt(window.getComputedStyle(x()).paddingRight),new MutationObserver(function(){var t=e.offsetWidth+o;x().style.width=n<t?"".concat(t,"px"):null}).observe(e,{attributes:!0,attributeFilter:["style"]})),e};function Mt(t,e){var o,i,r,n=P().querySelector("#".concat($.content));e.html?(ft(e.html,n),it(n,"block")):e.text?(n.textContent=e.text,it(n,"block")):rt(n),t=t,o=e,i=P(),t=St.innerParams.get(t),r=!t||o.input!==t.input,Tt.forEach(function(t){var e=$[t],n=yt(i,e);Dt(t,o.inputAttributes),n.className=e,r&&rt(n)}),o.input&&(r&&Lt(o),It(o)),F(P(),e,"content")}function Vt(){return C()&&C().getAttribute("data-queue-step")}function Ht(t,o){var i=O();if(!o.progressSteps||0===o.progressSteps.length)return rt(i),0;it(i),i.textContent="";var r=parseInt(void 0===o.currentProgressStep?Vt():o.currentProgressStep);r>=o.progressSteps.length&&z("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),o.progressSteps.forEach(function(t,e){var n,t=(n=t,t=document.createElement("li"),gt(t,$["progress-step"]),U(t,n),t);i.appendChild(t),e===r&&gt(t,$["active-progress-step"]),e!==o.progressSteps.length-1&&(t=o,e=document.createElement("li"),gt(e,$["progress-step-line"]),t.progressStepsDistance&&(e.style.width=t.progressStepsDistance),e=e,i.appendChild(e))})}function Rt(t,e){var n=j();F(n,e,"header"),Ht(0,e),function(t,e){t=St.innerParams.get(t);t&&e.icon===t.icon&&B()?Ft(B(),e):(_t(),e.icon&&(-1!==Object.keys(J).indexOf(e.icon)?(t=k(".".concat($.icon,".").concat(J[e.icon])),it(t),Wt(t,e),Ft(t,e),gt(t,e.showClass.icon)):W('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(e.icon,'"'))))}(t,e),function(t){var e=E();if(!t.imageUrl)return rt(e);it(e,""),e.setAttribute("src",t.imageUrl),e.setAttribute("alt",t.imageAlt),ot(e,"width",t.imageWidth),ot(e,"height",t.imageHeight),e.className=$.image,F(e,t,"image")}(e),n=e,t=A(),st(t,n.title||n.titleText),n.title&&ft(n.title,t),n.titleText&&(t.innerText=n.titleText),F(t,n,"title"),n=e,e=H(),U(e,n.closeButtonHtml),F(e,n,"closeButton"),st(e,n.showCloseButton),e.setAttribute("aria-label",n.closeButtonAriaLabel)}function Nt(t,e){var n,o;o=e,n=x(),ot(n,"width",o.width),ot(n,"padding",o.padding),o.background&&(n.style.background=o.background),Qt(n,o),Pt(0,e),Rt(t,e),Mt(t,e),mt(0,e),o=e,t=M(),st(t,o.footer),o.footer&&ft(o.footer,t),F(t,o,"footer"),"function"==typeof e.didRender?e.didRender(x()):"function"==typeof e.onRender&&e.onRender(x())}function Ut(){return T()&&T().click()}var _t=function(){for(var t=n(),e=0;e<t.length;e++)rt(t[e])},Ft=function(t,e){Kt(t,e),zt(),F(t,e,"icon")},zt=function(){for(var t=x(),e=window.getComputedStyle(t).getPropertyValue("background-color"),n=t.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"),o=0;o<n.length;o++)n[o].style.backgroundColor=e},Wt=function(t,e){t.textContent="",e.iconHtml?U(t,Yt(e.iconHtml)):"success"===e.icon?U(t,'\n      <div class="swal2-success-circular-line-left"></div>\n      <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n      <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n      <div class="swal2-success-circular-line-right"></div>\n    '):"error"===e.icon?U(t,'\n      <span class="swal2-x-mark">\n        <span class="swal2-x-mark-line-left"></span>\n        <span class="swal2-x-mark-line-right"></span>\n      </span>\n    '):U(t,Yt({question:"?",warning:"!",info:"i"}[e.icon]))},Kt=function(t,e){if(e.iconColor){t.style.color=e.iconColor,t.style.borderColor=e.iconColor;for(var n=0,o=[".swal2-success-line-tip",".swal2-success-line-long",".swal2-x-mark-line-left",".swal2-x-mark-line-right"];n<o.length;n++)at(t,o[n],"backgroundColor",e.iconColor);at(t,".swal2-success-ring","borderColor",e.iconColor)}},Yt=function(t){return'<div class="'.concat($["icon-content"],'">').concat(t,"</div>")},Zt=[],Qt=function(t,e){t.className="".concat($.popup," ").concat(bt(t)?e.showClass.popup:""),e.toast?(gt([document.documentElement,document.body],$["toast-shown"]),gt(t,$.toast)):gt(t,$.modal),F(t,e,"popup"),"string"==typeof e.customClass&&gt(t,e.customClass),e.icon&&gt(t,$["icon-".concat(e.icon)])};function $t(t){var e=x();e||kn.fire(),e=x();var n=q(),o=D();!t&&bt(T())&&(t=T()),it(n),t&&(rt(t),o.setAttribute("data-button-to-replace",t.className)),o.parentNode.insertBefore(o,t),gt([e,n],$.loading),it(o),e.setAttribute("data-loading",!0),e.setAttribute("aria-busy",!0),e.focus()}function Jt(){return new Promise(function(t){var e=window.scrollX,n=window.scrollY;oe.restoreFocusTimeout=setTimeout(function(){oe.previousActiveElement&&oe.previousActiveElement.focus?(oe.previousActiveElement.focus(),oe.previousActiveElement=null):document.body&&document.body.focus(),t()},100),void 0!==e&&void 0!==n&&window.scrollTo(e,n)})}function Xt(){if(oe.timeout)return function(){var t=V(),e=parseInt(window.getComputedStyle(t).width);t.style.removeProperty("transition"),t.style.width="100%";var n=parseInt(window.getComputedStyle(t).width),n=parseInt(e/n*100);t.style.removeProperty("transition"),t.style.width="".concat(n,"%")}(),oe.timeout.stop()}function Gt(){if(oe.timeout){var t=oe.timeout.start();return lt(t),t}}function te(t){return Object.prototype.hasOwnProperty.call(ie,t)}function ee(t){return ae[t]}function ne(t){for(var e in t)te(o=e)||z('Unknown parameter "'.concat(o,'"')),t.toast&&(n=e,-1!==se.indexOf(n)&&z('The parameter "'.concat(n,'" is incompatible with toasts'))),ee(n=e)&&g(n,ee(n));var n,o}var oe={},ie={title:"",titleText:"",text:"",html:"",footer:"",icon:void 0,iconColor:void 0,iconHtml:void 0,toast:!1,animation:!0,showClass:{popup:"swal2-show",backdrop:"swal2-backdrop-show",icon:"swal2-icon-show"},hideClass:{popup:"swal2-hide",backdrop:"swal2-backdrop-hide",icon:"swal2-icon-hide"},customClass:void 0,target:"body",backdrop:!0,heightAuto:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,stopKeydownPropagation:!0,keydownListenerCapture:!1,showConfirmButton:!0,showDenyButton:!1,showCancelButton:!1,preConfirm:void 0,preDeny:void 0,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:void 0,denyButtonText:"No",denyButtonAriaLabel:"",denyButtonColor:void 0,cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:void 0,buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusDeny:!1,focusCancel:!1,showCloseButton:!1,closeButtonHtml:"&times;",closeButtonAriaLabel:"Close this dialog",loaderHtml:"",showLoaderOnConfirm:!1,imageUrl:void 0,imageWidth:void 0,imageHeight:void 0,imageAlt:"",timer:void 0,timerProgressBar:!1,width:void 0,padding:void 0,background:void 0,input:void 0,inputPlaceholder:"",inputLabel:"",inputValue:"",inputOptions:{},inputAutoTrim:!0,inputAttributes:{},inputValidator:void 0,returnInputValueOnDeny:!1,validationMessage:void 0,grow:!1,position:"center",progressSteps:[],currentProgressStep:void 0,progressStepsDistance:void 0,onBeforeOpen:void 0,onOpen:void 0,willOpen:void 0,didOpen:void 0,onRender:void 0,didRender:void 0,onClose:void 0,onAfterClose:void 0,willClose:void 0,didClose:void 0,onDestroy:void 0,didDestroy:void 0,scrollbarPadding:!0},re=["allowEscapeKey","allowOutsideClick","background","buttonsStyling","cancelButtonAriaLabel","cancelButtonColor","cancelButtonText","closeButtonAriaLabel","closeButtonHtml","confirmButtonAriaLabel","confirmButtonColor","confirmButtonText","currentProgressStep","customClass","denyButtonAriaLabel","denyButtonColor","denyButtonText","didClose","didDestroy","footer","hideClass","html","icon","iconColor","imageAlt","imageHeight","imageUrl","imageWidth","onAfterClose","onClose","onDestroy","progressSteps","reverseButtons","showCancelButton","showCloseButton","showConfirmButton","showDenyButton","text","title","titleText","willClose"],ae={animation:'showClass" and "hideClass',onBeforeOpen:"willOpen",onOpen:"didOpen",onRender:"didRender",onClose:"willClose",onAfterClose:"didClose",onDestroy:"didDestroy"},se=["allowOutsideClick","allowEnterKey","backdrop","focusConfirm","focusDeny","focusCancel","heightAuto","keydownListenerCapture"],ce=Object.freeze({isValidParameter:te,isUpdatableParameter:function(t){return-1!==re.indexOf(t)},isDeprecatedParameter:ee,argsToParams:function(n){var o={};return"object"!==r(n[0])||w(n[0])?["title","html","icon"].forEach(function(t,e){e=n[e];"string"==typeof e||w(e)?o[t]=e:void 0!==e&&W("Unexpected type of ".concat(t,'! Expected "string" or "Element", got ').concat(r(e)))}):c(o,n[0]),o},isVisible:function(){return bt(x())},clickConfirm:Ut,clickDeny:function(){return L()&&L().click()},clickCancel:function(){return I()&&I().click()},getContainer:C,getPopup:x,getTitle:A,getContent:P,getHtmlContainer:function(){return t($["html-container"])},getImage:E,getIcon:B,getIcons:n,getInputLabel:function(){return t($["input-label"])},getCloseButton:H,getActions:q,getConfirmButton:T,getDenyButton:L,getCancelButton:I,getLoader:D,getHeader:j,getFooter:M,getTimerProgressBar:V,getFocusableElements:R,getValidationMessage:S,isLoading:function(){return x().hasAttribute("data-loading")},fire:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return i(this,e)},mixin:function(r){return function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}(i,t);var n,o,e=(n=i,o=d(),function(){var t,e=u(n);return p(this,o?(t=u(this).constructor,Reflect.construct(e,arguments,t)):e.apply(this,arguments))});function i(){return a(this,i),e.apply(this,arguments)}return s(i,[{key:"_main",value:function(t){return f(u(i.prototype),"_main",this).call(this,c({},r,t))}}]),i}(this)},queue:function(t){var r=this;Zt=t;function a(t,e){Zt=[],t(e)}var s=[];return new Promise(function(i){!function e(n,o){n<Zt.length?(document.body.setAttribute("data-swal2-queue-step",n),r.fire(Zt[n]).then(function(t){void 0!==t.value?(s.push(t.value),e(n+1,o)):a(i,{dismiss:t.dismiss})})):a(i,{value:s})}(0)})},getQueueStep:Vt,insertQueueStep:function(t,e){return e&&e<Zt.length?Zt.splice(e,0,t):Zt.push(t)},deleteQueueStep:function(t){void 0!==Zt[t]&&Zt.splice(t,1)},showLoading:$t,enableLoading:$t,getTimerLeft:function(){return oe.timeout&&oe.timeout.getTimerLeft()},stopTimer:Xt,resumeTimer:Gt,toggleTimer:function(){var t=oe.timeout;return t&&(t.running?Xt:Gt)()},increaseTimer:function(t){if(oe.timeout){t=oe.timeout.increase(t);return lt(t,!0),t}},isTimerRunning:function(){return oe.timeout&&oe.timeout.isRunning()}});function ue(){var t,e;St.innerParams.get(this)&&(t=St.domCache.get(this),rt(t.loader),(e=t.popup.getElementsByClassName(t.loader.getAttribute("data-button-to-replace"))).length?it(e[0],"inline-block"):bt(T())||bt(L())||bt(I())||rt(t.actions),vt([t.popup,t.actions],$.loading),t.popup.removeAttribute("aria-busy"),t.popup.removeAttribute("data-loading"),t.confirmButton.disabled=!1,t.denyButton.disabled=!1,t.cancelButton.disabled=!1)}function le(){null===G.previousBodyPadding&&document.body.scrollHeight>window.innerHeight&&(G.previousBodyPadding=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),document.body.style.paddingRight="".concat(G.previousBodyPadding+function(){var t=document.createElement("div");t.className=$["scrollbar-measure"],document.body.appendChild(t);var e=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),e}(),"px"))}function de(){return!!window.MSInputMethodContext&&!!document.documentMode}function pe(){var t=C(),e=x();t.style.removeProperty("align-items"),e.offsetTop<0&&(t.style.alignItems="flex-start")}var fe=function(){navigator.userAgent.match(/(CriOS|FxiOS|EdgiOS|YaBrowser|UCBrowser)/i)||x().scrollHeight>window.innerHeight-44&&(C().style.paddingBottom="".concat(44,"px"))},me=function(){var e,t=C();t.ontouchstart=function(t){e=he(t)},t.ontouchmove=function(t){e&&(t.preventDefault(),t.stopPropagation())}},he=function(t){var e=t.target,n=C();return!ge(t)&&!ve(t)&&(e===n||!(ct(n)||"INPUT"===e.tagName||ct(P())&&P().contains(e)))},ge=function(t){return t.touches&&t.touches.length&&"stylus"===t.touches[0].touchType},ve=function(t){return t.touches&&1<t.touches.length},ye={swalPromiseResolve:new WeakMap};function be(t,e,n,o){n?Ae(t,o):(Jt().then(function(){return Ae(t,o)}),oe.keydownTarget.removeEventListener("keydown",oe.keydownHandler,{capture:oe.keydownListenerCapture}),oe.keydownHandlerAdded=!1),e.parentNode&&!document.body.getAttribute("data-swal2-queue-step")&&e.parentNode.removeChild(e),N()&&(null!==G.previousBodyPadding&&(document.body.style.paddingRight="".concat(G.previousBodyPadding,"px"),G.previousBodyPadding=null),_(document.body,$.iosfix)&&(e=parseInt(document.body.style.top,10),vt(document.body,$.iosfix),document.body.style.top="",document.body.scrollTop=-1*e),"undefined"!=typeof window&&de()&&window.removeEventListener("resize",pe),h(document.body.children).forEach(function(t){t.hasAttribute("data-previous-aria-hidden")?(t.setAttribute("aria-hidden",t.getAttribute("data-previous-aria-hidden")),t.removeAttribute("data-previous-aria-hidden")):t.removeAttribute("aria-hidden")})),vt([document.documentElement,document.body],[$.shown,$["height-auto"],$["no-backdrop"],$["toast-shown"],$["toast-column"]])}function we(t){var e,n,o,i=x();i&&(t=Ce(t),(e=St.innerParams.get(this))&&!_(i,e.hideClass.popup)&&(n=ye.swalPromiseResolve.get(this),vt(i,e.showClass.popup),gt(i,e.hideClass.popup),o=C(),vt(o,e.showClass.backdrop),gt(o,e.hideClass.backdrop),ke(this,i,e),n(t)))}function Ce(t){return void 0===t?{isConfirmed:!1,isDenied:!1,isDismissed:!0}:c({isConfirmed:!1,isDenied:!1,isDismissed:!1},t)}function ke(t,e,n){var o=C(),i=Bt&&ut(e),r=n.onClose,a=n.onAfterClose,s=n.willClose,n=n.didClose;xe(e,s,r),i?Be(t,e,o,n||a):be(t,o,X(),n||a)}var xe=function(t,e,n){null!==e&&"function"==typeof e?e(t):null!==n&&"function"==typeof n&&n(t)},Be=function(t,e,n,o){oe.swalCloseEventFinishedCallback=be.bind(null,t,n,X(),o),e.addEventListener(Bt,function(t){t.target===e&&(oe.swalCloseEventFinishedCallback(),delete oe.swalCloseEventFinishedCallback)})},Ae=function(t,e){setTimeout(function(){"function"==typeof e&&e(),t._destroy()})};function Pe(t,e,n){var o=St.domCache.get(t);e.forEach(function(t){o[t].disabled=n})}function Ee(t,e){if(!t)return!1;if("radio"===t.type)for(var n=t.parentNode.parentNode.querySelectorAll("input"),o=0;o<n.length;o++)n[o].disabled=e;else t.disabled=e}var Oe=function(){function n(t,e){a(this,n),this.callback=t,this.remaining=e,this.running=!1,this.start()}return s(n,[{key:"start",value:function(){return this.running||(this.running=!0,this.started=new Date,this.id=setTimeout(this.callback,this.remaining)),this.remaining}},{key:"stop",value:function(){return this.running&&(this.running=!1,clearTimeout(this.id),this.remaining-=new Date-this.started),this.remaining}},{key:"increase",value:function(t){var e=this.running;return e&&this.stop(),this.remaining+=t,e&&this.start(),this.remaining}},{key:"getTimerLeft",value:function(){return this.running&&(this.stop(),this.start()),this.remaining}},{key:"isRunning",value:function(){return this.running}}]),n}(),Se={email:function(t,e){return/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(t)?Promise.resolve():Promise.resolve(e||"Invalid email address")},url:function(t,e){return/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(t)?Promise.resolve():Promise.resolve(e||"Invalid URL")}};function Te(t){var e,n;(e=t).inputValidator||Object.keys(Se).forEach(function(t){e.input===t&&(e.inputValidator=Se[t])}),t.showLoaderOnConfirm&&!t.preConfirm&&z("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"),t.animation=Y(t.animation),(n=t).target&&("string"!=typeof n.target||document.querySelector(n.target))&&("string"==typeof n.target||n.target.appendChild)||(z('Target parameter is not valid, defaulting to "body"'),n.target="body"),"string"==typeof t.title&&(t.title=t.title.split("\n").join("<br />")),Ct(t)}function Le(t){var e=C(),n=x();"function"==typeof t.willOpen?t.willOpen(n):"function"==typeof t.onBeforeOpen&&t.onBeforeOpen(n);var o=window.getComputedStyle(document.body).overflowY;He(e,n,t),setTimeout(function(){Me(e,n)},10),N()&&(Ve(e,t.scrollbarPadding,o),h(document.body.children).forEach(function(t){t===C()||function(t,e){if("function"==typeof t.contains)return t.contains(e)}(t,C())||(t.hasAttribute("aria-hidden")&&t.setAttribute("data-previous-aria-hidden",t.getAttribute("aria-hidden")),t.setAttribute("aria-hidden","true"))})),X()||oe.previousActiveElement||(oe.previousActiveElement=document.activeElement),je(n,t),vt(e,$["no-transition"])}function De(t){var e=x();t.target===e&&(t=C(),e.removeEventListener(Bt,De),t.style.overflowY="auto")}function Ie(t,e){t.closePopup({isConfirmed:!0,value:e})}function qe(t,e,n){var o=R(),i=0;if(i<o.length)return(e+=n)===o.length?e=0:-1===e&&(e=o.length-1),o[e].focus();x().focus()}var je=function(t,e){"function"==typeof e.didOpen?setTimeout(function(){return e.didOpen(t)}):"function"==typeof e.onOpen&&setTimeout(function(){return e.onOpen(t)})},Me=function(t,e){Bt&&ut(e)?(t.style.overflowY="hidden",e.addEventListener(Bt,De)):t.style.overflowY="auto"},Ve=function(t,e,n){var o;(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream||"MacIntel"===navigator.platform&&1<navigator.maxTouchPoints)&&!_(document.body,$.iosfix)&&(o=document.body.scrollTop,document.body.style.top="".concat(-1*o,"px"),gt(document.body,$.iosfix),me(),fe()),"undefined"!=typeof window&&de()&&(pe(),window.addEventListener("resize",pe)),e&&"hidden"!==n&&le(),setTimeout(function(){t.scrollTop=0})},He=function(t,e,n){gt(t,n.showClass.backdrop),e.style.setProperty("opacity","0","important"),it(e),setTimeout(function(){gt(e,n.showClass.popup),e.style.removeProperty("opacity")},10),gt([document.documentElement,document.body],$.shown),n.heightAuto&&n.backdrop&&!n.toast&&gt([document.documentElement,document.body],$["height-auto"])},Re=function(t){return t.checked?1:0},Ne=function(t){return t.checked?t.value:null},Ue=function(t){return t.files.length?null!==t.getAttribute("multiple")?t.files:t.files[0]:null},_e=function(e,n){function o(t){return ze[n.input](i,We(t),n)}var i=P();v(n.inputOptions)||b(n.inputOptions)?($t(),y(n.inputOptions).then(function(t){e.hideLoading(),o(t)})):"object"===r(n.inputOptions)?o(n.inputOptions):W("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(r(n.inputOptions)))},Fe=function(e,n){var o=e.getInput();rt(o),y(n.inputValue).then(function(t){o.value="number"===n.input?parseFloat(t)||0:"".concat(t),it(o),o.focus(),e.hideLoading()}).catch(function(t){W("Error in inputValue promise: ".concat(t)),o.value="",it(o),o.focus(),e.hideLoading()})},ze={select:function(t,e,i){function o(t,e,n){var o=document.createElement("option");o.value=n,U(o,e),i.inputValue.toString()===n.toString()&&(o.selected=!0),t.appendChild(o)}var r=yt(t,$.select);e.forEach(function(t){var e,n=t[0],t=t[1];Array.isArray(t)?((e=document.createElement("optgroup")).label=n,e.disabled=!1,r.appendChild(e),t.forEach(function(t){return o(e,t[1],t[0])})):o(r,t,n)}),r.focus()},radio:function(t,e,i){var r=yt(t,$.radio);e.forEach(function(t){var e=t[0],n=t[1],o=document.createElement("input"),t=document.createElement("label");o.type="radio",o.name=$.radio,o.value=e,i.inputValue.toString()===e.toString()&&(o.checked=!0);e=document.createElement("span");U(e,n),e.className=$.label,t.appendChild(o),t.appendChild(e),r.appendChild(t)});e=r.querySelectorAll("input");e.length&&e[0].focus()}},We=function n(o){var i=[];return"undefined"!=typeof Map&&o instanceof Map?o.forEach(function(t,e){"object"===r(t)&&(t=n(t)),i.push([e,t])}):Object.keys(o).forEach(function(t){var e=o[t];"object"===r(e)&&(e=n(e)),i.push([t,e])}),i},Ke=function(t,e,n){var o=function(t,e){t=t.getInput();if(!t)return null;switch(e.input){case"checkbox":return Re(t);case"radio":return Ne(t);case"file":return Ue(t);default:return e.inputAutoTrim?t.value.trim():t.value}}(t,e);e.inputValidator?Ye(t,e,o):t.getInput().checkValidity()?("deny"===n?Ze:Qe)(t,e,o):(t.enableButtons(),t.showValidationMessage(e.validationMessage))},Ye=function(e,n,o){e.disableInput(),Promise.resolve().then(function(){return y(n.inputValidator(o,n.validationMessage))}).then(function(t){e.enableButtons(),e.enableInput(),t?e.showValidationMessage(t):Qe(e,n,o)})},Ze=function(e,t,n){t.preDeny?Promise.resolve().then(function(){return y(t.preDeny(n,t.validationMessage))}).then(function(t){!1===t?e.hideLoading():e.closePopup({isDenied:!0,value:void 0===t?n:t})}):e.closePopup({isDenied:!0,value:n})},Qe=function(e,t,n){t.showLoaderOnConfirm&&$t(),t.preConfirm?(e.resetValidationMessage(),Promise.resolve().then(function(){return y(t.preConfirm(n,t.validationMessage))}).then(function(t){bt(S())||!1===t?e.hideLoading():Ie(e,void 0===t?n:t)})):Ie(e,n)},$e=["ArrowRight","ArrowDown","Right","Down"],Je=["ArrowLeft","ArrowUp","Left","Up"],Xe=["Escape","Esc"],Ge=function(t,e,n){var o=St.innerParams.get(t);o.stopKeydownPropagation&&e.stopPropagation(),"Enter"===e.key?tn(t,e,o):"Tab"===e.key?en(e,o):-1!==[].concat($e,Je).indexOf(e.key)?nn(e.key):-1!==Xe.indexOf(e.key)&&on(e,o,n)},tn=function(t,e,n){e.isComposing||e.target&&t.getInput()&&e.target.outerHTML===t.getInput().outerHTML&&-1===["textarea","file"].indexOf(n.input)&&(Ut(),e.preventDefault())},en=function(t){for(var e=t.target,n=R(),o=-1,i=0;i<n.length;i++)if(e===n[i]){o=i;break}t.shiftKey?qe(0,o,-1):qe(0,o,1),t.stopPropagation(),t.preventDefault()},nn=function(t){-1!==[T(),L(),I()].indexOf(document.activeElement)&&(t=-1!==$e.indexOf(t)?"nextElementSibling":"previousElementSibling",(t=document.activeElement[t])&&t.focus())},on=function(t,e,n){Y(e.allowEscapeKey)&&(t.preventDefault(),n(Z.esc))},rn=function(e,t,n){t.popup.onclick=function(){var t=St.innerParams.get(e);t.showConfirmButton||t.showDenyButton||t.showCancelButton||t.showCloseButton||t.input||n(Z.close)}},an=!1,sn=function(e){e.popup.onmousedown=function(){e.container.onmouseup=function(t){e.container.onmouseup=void 0,t.target===e.container&&(an=!0)}}},cn=function(e){e.container.onmousedown=function(){e.popup.onmouseup=function(t){e.popup.onmouseup=void 0,t.target!==e.popup&&!e.popup.contains(t.target)||(an=!0)}}},un=function(n,o,i){o.container.onclick=function(t){var e=St.innerParams.get(n);an?an=!1:t.target===o.container&&Y(e.allowOutsideClick)&&i(Z.backdrop)}};function ln(t){var e=c({},ie.showClass,t.showClass),n=c({},ie.hideClass,t.hideClass),o=c({},ie,t);return o.showClass=e,o.hideClass=n,!1===t.animation&&(o.showClass={popup:"swal2-noanimation",backdrop:"swal2-noanimation"},o.hideClass={}),o}function dn(a,s,c){return new Promise(function(t){function e(t){a.closePopup({isDismissed:!0,dismiss:t})}var n,o,i,r;ye.swalPromiseResolve.set(a,t),s.confirmButton.onclick=function(){return e=c,(t=a).disableButtons(),void(e.input?Ke(t,e,"confirm"):Qe(t,e,!0));var t,e},s.denyButton.onclick=function(){return e=c,(t=a).disableButtons(),void(e.returnInputValueOnDeny?Ke(t,e,"deny"):Ze(t,e,!1));var t,e},s.cancelButton.onclick=function(){return t=e,a.disableButtons(),void t(Z.cancel);var t},s.closeButton.onclick=function(){return e(Z.close)},n=a,r=s,t=e,St.innerParams.get(n).toast?rn(n,r,t):(sn(r),cn(r),un(n,r,t)),o=a,r=c,i=e,(t=oe).keydownTarget&&t.keydownHandlerAdded&&(t.keydownTarget.removeEventListener("keydown",t.keydownHandler,{capture:t.keydownListenerCapture}),t.keydownHandlerAdded=!1),r.toast||(t.keydownHandler=function(t){return Ge(o,t,i)},t.keydownTarget=r.keydownListenerCapture?window:x(),t.keydownListenerCapture=r.keydownListenerCapture,t.keydownTarget.addEventListener("keydown",t.keydownHandler,{capture:t.keydownListenerCapture}),t.keydownHandlerAdded=!0),(c.toast&&(c.input||c.footer||c.showCloseButton)?gt:vt)(document.body,$["toast-column"]),r=a,"select"===(t=c).input||"radio"===t.input?_e(r,t):-1!==["text","email","number","tel","textarea"].indexOf(t.input)&&(v(t.inputValue)||b(t.inputValue))&&Fe(r,t),Le(c),fn(oe,c,e),mn(s,c),setTimeout(function(){s.container.scrollTop=0})})}function pn(t){var e={popup:x(),container:C(),content:P(),actions:q(),confirmButton:T(),denyButton:L(),cancelButton:I(),loader:D(),closeButton:H(),validationMessage:S(),progressSteps:O()};return St.domCache.set(t,e),e}var fn=function(t,e,n){var o=V();rt(o),e.timer&&(t.timeout=new Oe(function(){n("timer"),delete t.timeout},e.timer),e.timerProgressBar&&(it(o),setTimeout(function(){t.timeout.running&&lt(e.timer)})))},mn=function(t,e){if(!e.toast)return Y(e.allowEnterKey)?void(hn(t,e)||qe(0,-1,1)):gn()},hn=function(t,e){return e.focusDeny&&bt(t.denyButton)?(t.denyButton.focus(),!0):e.focusCancel&&bt(t.cancelButton)?(t.cancelButton.focus(),!0):!(!e.focusConfirm||!bt(t.confirmButton))&&(t.confirmButton.focus(),!0)},gn=function(){document.activeElement&&"function"==typeof document.activeElement.blur&&document.activeElement.blur()};function vn(t){"function"==typeof t.didDestroy?t.didDestroy():"function"==typeof t.onDestroy&&t.onDestroy()}function yn(t){delete t.params,delete oe.keydownHandler,delete oe.keydownTarget,wn(St),wn(ye)}var bn,wn=function(t){for(var e in t)t[e]=new WeakMap},Q=Object.freeze({hideLoading:ue,disableLoading:ue,getInput:function(t){var e=St.innerParams.get(t||this);return(t=St.domCache.get(t||this))?tt(t.content,e.input):null},close:we,closePopup:we,closeModal:we,closeToast:we,enableButtons:function(){Pe(this,["confirmButton","denyButton","cancelButton"],!1)},disableButtons:function(){Pe(this,["confirmButton","denyButton","cancelButton"],!0)},enableInput:function(){return Ee(this.getInput(),!1)},disableInput:function(){return Ee(this.getInput(),!0)},showValidationMessage:function(t){var e=St.domCache.get(this),n=St.innerParams.get(this);U(e.validationMessage,t),e.validationMessage.className=$["validation-message"],n.customClass&&n.customClass.validationMessage&&gt(e.validationMessage,n.customClass.validationMessage),it(e.validationMessage),(e=this.getInput())&&(e.setAttribute("aria-invalid",!0),e.setAttribute("aria-describedBy",$["validation-message"]),et(e),gt(e,$.inputerror))},resetValidationMessage:function(){var t=St.domCache.get(this);t.validationMessage&&rt(t.validationMessage),(t=this.getInput())&&(t.removeAttribute("aria-invalid"),t.removeAttribute("aria-describedBy"),vt(t,$.inputerror))},getProgressSteps:function(){return St.domCache.get(this).progressSteps},_main:function(t){ne(t),oe.currentInstance&&oe.currentInstance._destroy(),oe.currentInstance=this;var e=ln(t);return Te(e),Object.freeze(e),oe.timeout&&(oe.timeout.stop(),delete oe.timeout),clearTimeout(oe.restoreFocusTimeout),t=pn(this),Nt(this,e),St.innerParams.set(this,e),dn(this,t,e)},update:function(e){var t=x(),n=St.innerParams.get(this);if(!t||_(t,n.hideClass.popup))return z("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");var o={};Object.keys(e).forEach(function(t){kn.isUpdatableParameter(t)?o[t]=e[t]:z('Invalid parameter to update: "'.concat(t,'". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js\n\nIf you think this parameter should be updatable, request it here: https://github.com/sweetalert2/sweetalert2/issues/new?template=02_feature_request.md'))}),n=c({},n,o),Nt(this,n),St.innerParams.set(this,n),Object.defineProperties(this,{params:{value:c({},this.params,e),writable:!1,enumerable:!0}})},_destroy:function(){var t=St.domCache.get(this),e=St.innerParams.get(this);e&&(t.popup&&oe.swalCloseEventFinishedCallback&&(oe.swalCloseEventFinishedCallback(),delete oe.swalCloseEventFinishedCallback),oe.deferDisposalTimer&&(clearTimeout(oe.deferDisposalTimer),delete oe.deferDisposalTimer),vn(e),yn(this))}}),Cn=function(){function i(){if(a(this,i),"undefined"!=typeof window){"undefined"==typeof Promise&&W("This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)"),bn=this;for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];var o=Object.freeze(this.constructor.argsToParams(e));Object.defineProperties(this,{params:{value:o,writable:!1,enumerable:!0,configurable:!0}});o=this._main(this.params);St.promise.set(this,o)}}return s(i,[{key:"then",value:function(t){return St.promise.get(this).then(t)}},{key:"finally",value:function(t){return St.promise.get(this).finally(t)}}]),i}();c(Cn.prototype,Q),c(Cn,ce),Object.keys(Q).forEach(function(t){Cn[t]=function(){if(bn)return bn[t].apply(bn,arguments)}}),Cn.DismissReason=Z,Cn.version="10.10.0";var kn=Cn;return kn.default=kn}),void 0!==this&&this.Sweetalert2&&(this.swal=this.sweetAlert=this.Swal=this.SweetAlert=this.Sweetalert2);
"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,".swal2-popup.swal2-toast{flex-direction:row;align-items:center;width:auto;padding:.625em;overflow-y:hidden;background:#fff;box-shadow:0 0 .625em #d9d9d9}.swal2-popup.swal2-toast .swal2-header{flex-direction:row;padding:0}.swal2-popup.swal2-toast .swal2-title{flex-grow:1;justify-content:flex-start;margin:0 .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{position:static;width:.8em;height:.8em;line-height:.8}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;padding:0;font-size:1em}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{font-size:.25em}}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{flex-basis:auto!important;width:auto;height:auto;margin:0 .3125em;padding:0}.swal2-popup.swal2-toast .swal2-styled{margin:0 .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(100,150,200,.5)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-container{display:flex;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-bottom-end>:first-child,.swal2-container.swal2-bottom-left>:first-child,.swal2-container.swal2-bottom-right>:first-child,.swal2-container.swal2-bottom-start>:first-child,.swal2-container.swal2-bottom>:first-child{margin-top:auto}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-no-transition{transition:none!important}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)>.swal2-modal{margin:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-container .swal2-modal{margin:0!important}}.swal2-popup{display:none;position:relative;box-sizing:border-box;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border:none;border-radius:5px;background:#fff;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-header{display:flex;flex-direction:column;align-items:center;padding:0 1.8em}.swal2-title{position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:100%;margin:1.25em auto 0;padding:0 1.6em}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 transparent #2778c4 transparent}.swal2-styled{margin:.3125em;padding:.625em 1.1em;box-shadow:none;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#2778c4;color:#fff;font-size:1.0625em}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#d14529;color:#fff;font-size:1.0625em}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#757575;color:#fff;font-size:1.0625em}.swal2-styled:focus{outline:0;box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1.25em 0 0;padding:1em 0 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;height:.25em;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:1.25em auto}.swal2-close{position:absolute;z-index:2;top:0;right:0;align-items:center;justify-content:center;width:1.2em;height:1.2em;padding:0;overflow:hidden;transition:color .1s ease-out;border:none;border-radius:5px;background:0 0;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close:focus{outline:0;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-content{z-index:1;justify-content:center;margin:0;padding:0 1.6em;color:#545454;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em auto}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em auto;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-input[type=number]{max-width:10em}.swal2-file{background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto}.swal2-validation-message{display:none;align-items:center;justify-content:center;margin:0 -2.7em;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;border:.25em solid transparent;border-radius:50%;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:0 0 1.25em;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{right:auto;left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{top:auto;right:auto;bottom:auto;left:auto;max-width:calc(100% - .625em * 2);background-color:transparent!important}body.swal2-no-backdrop .swal2-container>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-container.swal2-top{top:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-container.swal2-top-left,body.swal2-no-backdrop .swal2-container.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-container.swal2-top-end,body.swal2-no-backdrop .swal2-container.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-container.swal2-center{top:50%;left:50%;transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-container.swal2-center-left,body.swal2-no-backdrop .swal2-container.swal2-center-start{top:50%;left:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-container.swal2-center-end,body.swal2-no-backdrop .swal2-container.swal2-center-right{top:50%;right:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-container.swal2-bottom{bottom:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-container.swal2-bottom-left,body.swal2-no-backdrop .swal2-container.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-container.swal2-bottom-end,body.swal2-no-backdrop .swal2-container.swal2-bottom-right{right:0;bottom:0}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}body.swal2-toast-column .swal2-toast{flex-direction:column;align-items:stretch}body.swal2-toast-column .swal2-toast .swal2-actions{flex:1;align-self:stretch;height:2.2em;margin-top:.3125em}body.swal2-toast-column .swal2-toast .swal2-loading{justify-content:center}body.swal2-toast-column .swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}body.swal2-toast-column .swal2-toast .swal2-validation-message{font-size:1em}");
/*!
 * Chart.js v2.9.4
 * https://www.chartjs.org
 * (c) 2020 Chart.js Contributors
 * Released under the MIT License
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(function(){try{return require("moment")}catch(t){}}()):"function"==typeof define&&define.amd?define(["require"],(function(t){return e(function(){try{return t("moment")}catch(t){}}())})):(t=t||self).Chart=e(t.moment)}(this,(function(t){"use strict";t=t&&t.hasOwnProperty("default")?t.default:t;var e={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},n=function(t,e){return t(e={exports:{}},e.exports),e.exports}((function(t){var n={};for(var i in e)e.hasOwnProperty(i)&&(n[e[i]]=i);var a=t.exports={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};for(var r in a)if(a.hasOwnProperty(r)){if(!("channels"in a[r]))throw new Error("missing channels property: "+r);if(!("labels"in a[r]))throw new Error("missing channel labels property: "+r);if(a[r].labels.length!==a[r].channels)throw new Error("channel and label counts mismatch: "+r);var o=a[r].channels,s=a[r].labels;delete a[r].channels,delete a[r].labels,Object.defineProperty(a[r],"channels",{value:o}),Object.defineProperty(a[r],"labels",{value:s})}a.rgb.hsl=function(t){var e,n,i=t[0]/255,a=t[1]/255,r=t[2]/255,o=Math.min(i,a,r),s=Math.max(i,a,r),l=s-o;return s===o?e=0:i===s?e=(a-r)/l:a===s?e=2+(r-i)/l:r===s&&(e=4+(i-a)/l),(e=Math.min(60*e,360))<0&&(e+=360),n=(o+s)/2,[e,100*(s===o?0:n<=.5?l/(s+o):l/(2-s-o)),100*n]},a.rgb.hsv=function(t){var e,n,i,a,r,o=t[0]/255,s=t[1]/255,l=t[2]/255,u=Math.max(o,s,l),d=u-Math.min(o,s,l),h=function(t){return(u-t)/6/d+.5};return 0===d?a=r=0:(r=d/u,e=h(o),n=h(s),i=h(l),o===u?a=i-n:s===u?a=1/3+e-i:l===u&&(a=2/3+n-e),a<0?a+=1:a>1&&(a-=1)),[360*a,100*r,100*u]},a.rgb.hwb=function(t){var e=t[0],n=t[1],i=t[2];return[a.rgb.hsl(t)[0],100*(1/255*Math.min(e,Math.min(n,i))),100*(i=1-1/255*Math.max(e,Math.max(n,i)))]},a.rgb.cmyk=function(t){var e,n=t[0]/255,i=t[1]/255,a=t[2]/255;return[100*((1-n-(e=Math.min(1-n,1-i,1-a)))/(1-e)||0),100*((1-i-e)/(1-e)||0),100*((1-a-e)/(1-e)||0),100*e]},a.rgb.keyword=function(t){var i=n[t];if(i)return i;var a,r,o,s=1/0;for(var l in e)if(e.hasOwnProperty(l)){var u=e[l],d=(r=t,o=u,Math.pow(r[0]-o[0],2)+Math.pow(r[1]-o[1],2)+Math.pow(r[2]-o[2],2));d<s&&(s=d,a=l)}return a},a.keyword.rgb=function(t){return e[t]},a.rgb.xyz=function(t){var e=t[0]/255,n=t[1]/255,i=t[2]/255;return[100*(.4124*(e=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92)+.3576*(n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92)+.1805*(i=i>.04045?Math.pow((i+.055)/1.055,2.4):i/12.92)),100*(.2126*e+.7152*n+.0722*i),100*(.0193*e+.1192*n+.9505*i)]},a.rgb.lab=function(t){var e=a.rgb.xyz(t),n=e[0],i=e[1],r=e[2];return i/=100,r/=108.883,n=(n/=95.047)>.008856?Math.pow(n,1/3):7.787*n+16/116,[116*(i=i>.008856?Math.pow(i,1/3):7.787*i+16/116)-16,500*(n-i),200*(i-(r=r>.008856?Math.pow(r,1/3):7.787*r+16/116))]},a.hsl.rgb=function(t){var e,n,i,a,r,o=t[0]/360,s=t[1]/100,l=t[2]/100;if(0===s)return[r=255*l,r,r];e=2*l-(n=l<.5?l*(1+s):l+s-l*s),a=[0,0,0];for(var u=0;u<3;u++)(i=o+1/3*-(u-1))<0&&i++,i>1&&i--,r=6*i<1?e+6*(n-e)*i:2*i<1?n:3*i<2?e+(n-e)*(2/3-i)*6:e,a[u]=255*r;return a},a.hsl.hsv=function(t){var e=t[0],n=t[1]/100,i=t[2]/100,a=n,r=Math.max(i,.01);return n*=(i*=2)<=1?i:2-i,a*=r<=1?r:2-r,[e,100*(0===i?2*a/(r+a):2*n/(i+n)),100*((i+n)/2)]},a.hsv.rgb=function(t){var e=t[0]/60,n=t[1]/100,i=t[2]/100,a=Math.floor(e)%6,r=e-Math.floor(e),o=255*i*(1-n),s=255*i*(1-n*r),l=255*i*(1-n*(1-r));switch(i*=255,a){case 0:return[i,l,o];case 1:return[s,i,o];case 2:return[o,i,l];case 3:return[o,s,i];case 4:return[l,o,i];case 5:return[i,o,s]}},a.hsv.hsl=function(t){var e,n,i,a=t[0],r=t[1]/100,o=t[2]/100,s=Math.max(o,.01);return i=(2-r)*o,n=r*s,[a,100*(n=(n/=(e=(2-r)*s)<=1?e:2-e)||0),100*(i/=2)]},a.hwb.rgb=function(t){var e,n,i,a,r,o,s,l=t[0]/360,u=t[1]/100,d=t[2]/100,h=u+d;switch(h>1&&(u/=h,d/=h),i=6*l-(e=Math.floor(6*l)),0!=(1&e)&&(i=1-i),a=u+i*((n=1-d)-u),e){default:case 6:case 0:r=n,o=a,s=u;break;case 1:r=a,o=n,s=u;break;case 2:r=u,o=n,s=a;break;case 3:r=u,o=a,s=n;break;case 4:r=a,o=u,s=n;break;case 5:r=n,o=u,s=a}return[255*r,255*o,255*s]},a.cmyk.rgb=function(t){var e=t[0]/100,n=t[1]/100,i=t[2]/100,a=t[3]/100;return[255*(1-Math.min(1,e*(1-a)+a)),255*(1-Math.min(1,n*(1-a)+a)),255*(1-Math.min(1,i*(1-a)+a))]},a.xyz.rgb=function(t){var e,n,i,a=t[0]/100,r=t[1]/100,o=t[2]/100;return n=-.9689*a+1.8758*r+.0415*o,i=.0557*a+-.204*r+1.057*o,e=(e=3.2406*a+-1.5372*r+-.4986*o)>.0031308?1.055*Math.pow(e,1/2.4)-.055:12.92*e,n=n>.0031308?1.055*Math.pow(n,1/2.4)-.055:12.92*n,i=i>.0031308?1.055*Math.pow(i,1/2.4)-.055:12.92*i,[255*(e=Math.min(Math.max(0,e),1)),255*(n=Math.min(Math.max(0,n),1)),255*(i=Math.min(Math.max(0,i),1))]},a.xyz.lab=function(t){var e=t[0],n=t[1],i=t[2];return n/=100,i/=108.883,e=(e/=95.047)>.008856?Math.pow(e,1/3):7.787*e+16/116,[116*(n=n>.008856?Math.pow(n,1/3):7.787*n+16/116)-16,500*(e-n),200*(n-(i=i>.008856?Math.pow(i,1/3):7.787*i+16/116))]},a.lab.xyz=function(t){var e,n,i,a=t[0];e=t[1]/500+(n=(a+16)/116),i=n-t[2]/200;var r=Math.pow(n,3),o=Math.pow(e,3),s=Math.pow(i,3);return n=r>.008856?r:(n-16/116)/7.787,e=o>.008856?o:(e-16/116)/7.787,i=s>.008856?s:(i-16/116)/7.787,[e*=95.047,n*=100,i*=108.883]},a.lab.lch=function(t){var e,n=t[0],i=t[1],a=t[2];return(e=360*Math.atan2(a,i)/2/Math.PI)<0&&(e+=360),[n,Math.sqrt(i*i+a*a),e]},a.lch.lab=function(t){var e,n=t[0],i=t[1];return e=t[2]/360*2*Math.PI,[n,i*Math.cos(e),i*Math.sin(e)]},a.rgb.ansi16=function(t){var e=t[0],n=t[1],i=t[2],r=1 in arguments?arguments[1]:a.rgb.hsv(t)[2];if(0===(r=Math.round(r/50)))return 30;var o=30+(Math.round(i/255)<<2|Math.round(n/255)<<1|Math.round(e/255));return 2===r&&(o+=60),o},a.hsv.ansi16=function(t){return a.rgb.ansi16(a.hsv.rgb(t),t[2])},a.rgb.ansi256=function(t){var e=t[0],n=t[1],i=t[2];return e===n&&n===i?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(n/255*5)+Math.round(i/255*5)},a.ansi16.rgb=function(t){var e=t%10;if(0===e||7===e)return t>50&&(e+=3.5),[e=e/10.5*255,e,e];var n=.5*(1+~~(t>50));return[(1&e)*n*255,(e>>1&1)*n*255,(e>>2&1)*n*255]},a.ansi256.rgb=function(t){if(t>=232){var e=10*(t-232)+8;return[e,e,e]}var n;return t-=16,[Math.floor(t/36)/5*255,Math.floor((n=t%36)/6)/5*255,n%6/5*255]},a.rgb.hex=function(t){var e=(((255&Math.round(t[0]))<<16)+((255&Math.round(t[1]))<<8)+(255&Math.round(t[2]))).toString(16).toUpperCase();return"000000".substring(e.length)+e},a.hex.rgb=function(t){var e=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];var n=e[0];3===e[0].length&&(n=n.split("").map((function(t){return t+t})).join(""));var i=parseInt(n,16);return[i>>16&255,i>>8&255,255&i]},a.rgb.hcg=function(t){var e,n=t[0]/255,i=t[1]/255,a=t[2]/255,r=Math.max(Math.max(n,i),a),o=Math.min(Math.min(n,i),a),s=r-o;return e=s<=0?0:r===n?(i-a)/s%6:r===i?2+(a-n)/s:4+(n-i)/s+4,e/=6,[360*(e%=1),100*s,100*(s<1?o/(1-s):0)]},a.hsl.hcg=function(t){var e=t[1]/100,n=t[2]/100,i=1,a=0;return(i=n<.5?2*e*n:2*e*(1-n))<1&&(a=(n-.5*i)/(1-i)),[t[0],100*i,100*a]},a.hsv.hcg=function(t){var e=t[1]/100,n=t[2]/100,i=e*n,a=0;return i<1&&(a=(n-i)/(1-i)),[t[0],100*i,100*a]},a.hcg.rgb=function(t){var e=t[0]/360,n=t[1]/100,i=t[2]/100;if(0===n)return[255*i,255*i,255*i];var a,r=[0,0,0],o=e%1*6,s=o%1,l=1-s;switch(Math.floor(o)){case 0:r[0]=1,r[1]=s,r[2]=0;break;case 1:r[0]=l,r[1]=1,r[2]=0;break;case 2:r[0]=0,r[1]=1,r[2]=s;break;case 3:r[0]=0,r[1]=l,r[2]=1;break;case 4:r[0]=s,r[1]=0,r[2]=1;break;default:r[0]=1,r[1]=0,r[2]=l}return a=(1-n)*i,[255*(n*r[0]+a),255*(n*r[1]+a),255*(n*r[2]+a)]},a.hcg.hsv=function(t){var e=t[1]/100,n=e+t[2]/100*(1-e),i=0;return n>0&&(i=e/n),[t[0],100*i,100*n]},a.hcg.hsl=function(t){var e=t[1]/100,n=t[2]/100*(1-e)+.5*e,i=0;return n>0&&n<.5?i=e/(2*n):n>=.5&&n<1&&(i=e/(2*(1-n))),[t[0],100*i,100*n]},a.hcg.hwb=function(t){var e=t[1]/100,n=e+t[2]/100*(1-e);return[t[0],100*(n-e),100*(1-n)]},a.hwb.hcg=function(t){var e=t[1]/100,n=1-t[2]/100,i=n-e,a=0;return i<1&&(a=(n-i)/(1-i)),[t[0],100*i,100*a]},a.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]},a.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]},a.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]},a.gray.hsl=a.gray.hsv=function(t){return[0,0,t[0]]},a.gray.hwb=function(t){return[0,100,t[0]]},a.gray.cmyk=function(t){return[0,0,0,t[0]]},a.gray.lab=function(t){return[t[0],0,0]},a.gray.hex=function(t){var e=255&Math.round(t[0]/100*255),n=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(n.length)+n},a.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]}}));n.rgb,n.hsl,n.hsv,n.hwb,n.cmyk,n.xyz,n.lab,n.lch,n.hex,n.keyword,n.ansi16,n.ansi256,n.hcg,n.apple,n.gray;function i(t){var e=function(){for(var t={},e=Object.keys(n),i=e.length,a=0;a<i;a++)t[e[a]]={distance:-1,parent:null};return t}(),i=[t];for(e[t].distance=0;i.length;)for(var a=i.pop(),r=Object.keys(n[a]),o=r.length,s=0;s<o;s++){var l=r[s],u=e[l];-1===u.distance&&(u.distance=e[a].distance+1,u.parent=a,i.unshift(l))}return e}function a(t,e){return function(n){return e(t(n))}}function r(t,e){for(var i=[e[t].parent,t],r=n[e[t].parent][t],o=e[t].parent;e[o].parent;)i.unshift(e[o].parent),r=a(n[e[o].parent][o],r),o=e[o].parent;return r.conversion=i,r}var o={};Object.keys(n).forEach((function(t){o[t]={},Object.defineProperty(o[t],"channels",{value:n[t].channels}),Object.defineProperty(o[t],"labels",{value:n[t].labels});var e=function(t){for(var e=i(t),n={},a=Object.keys(e),o=a.length,s=0;s<o;s++){var l=a[s];null!==e[l].parent&&(n[l]=r(l,e))}return n}(t);Object.keys(e).forEach((function(n){var i=e[n];o[t][n]=function(t){var e=function(e){if(null==e)return e;arguments.length>1&&(e=Array.prototype.slice.call(arguments));var n=t(e);if("object"==typeof n)for(var i=n.length,a=0;a<i;a++)n[a]=Math.round(n[a]);return n};return"conversion"in t&&(e.conversion=t.conversion),e}(i),o[t][n].raw=function(t){var e=function(e){return null==e?e:(arguments.length>1&&(e=Array.prototype.slice.call(arguments)),t(e))};return"conversion"in t&&(e.conversion=t.conversion),e}(i)}))}));var s=o,l={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},u={getRgba:d,getHsla:h,getRgb:function(t){var e=d(t);return e&&e.slice(0,3)},getHsl:function(t){var e=h(t);return e&&e.slice(0,3)},getHwb:c,getAlpha:function(t){var e=d(t);if(e)return e[3];if(e=h(t))return e[3];if(e=c(t))return e[3]},hexString:function(t,e){e=void 0!==e&&3===t.length?e:t[3];return"#"+v(t[0])+v(t[1])+v(t[2])+(e>=0&&e<1?v(Math.round(255*e)):"")},rgbString:function(t,e){if(e<1||t[3]&&t[3]<1)return f(t,e);return"rgb("+t[0]+", "+t[1]+", "+t[2]+")"},rgbaString:f,percentString:function(t,e){if(e<1||t[3]&&t[3]<1)return g(t,e);var n=Math.round(t[0]/255*100),i=Math.round(t[1]/255*100),a=Math.round(t[2]/255*100);return"rgb("+n+"%, "+i+"%, "+a+"%)"},percentaString:g,hslString:function(t,e){if(e<1||t[3]&&t[3]<1)return p(t,e);return"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)"},hslaString:p,hwbString:function(t,e){void 0===e&&(e=void 0!==t[3]?t[3]:1);return"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+(void 0!==e&&1!==e?", "+e:"")+")"},keyword:function(t){return b[t.slice(0,3)]}};function d(t){if(t){var e=[0,0,0],n=1,i=t.match(/^#([a-fA-F0-9]{3,4})$/i),a="";if(i){a=(i=i[1])[3];for(var r=0;r<e.length;r++)e[r]=parseInt(i[r]+i[r],16);a&&(n=Math.round(parseInt(a+a,16)/255*100)/100)}else if(i=t.match(/^#([a-fA-F0-9]{6}([a-fA-F0-9]{2})?)$/i)){a=i[2],i=i[1];for(r=0;r<e.length;r++)e[r]=parseInt(i.slice(2*r,2*r+2),16);a&&(n=Math.round(parseInt(a,16)/255*100)/100)}else if(i=t.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)){for(r=0;r<e.length;r++)e[r]=parseInt(i[r+1]);n=parseFloat(i[4])}else if(i=t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)){for(r=0;r<e.length;r++)e[r]=Math.round(2.55*parseFloat(i[r+1]));n=parseFloat(i[4])}else if(i=t.match(/(\w+)/)){if("transparent"==i[1])return[0,0,0,0];if(!(e=l[i[1]]))return}for(r=0;r<e.length;r++)e[r]=m(e[r],0,255);return n=n||0==n?m(n,0,1):1,e[3]=n,e}}function h(t){if(t){var e=t.match(/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);if(e){var n=parseFloat(e[4]);return[m(parseInt(e[1]),0,360),m(parseFloat(e[2]),0,100),m(parseFloat(e[3]),0,100),m(isNaN(n)?1:n,0,1)]}}}function c(t){if(t){var e=t.match(/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);if(e){var n=parseFloat(e[4]);return[m(parseInt(e[1]),0,360),m(parseFloat(e[2]),0,100),m(parseFloat(e[3]),0,100),m(isNaN(n)?1:n,0,1)]}}}function f(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"rgba("+t[0]+", "+t[1]+", "+t[2]+", "+e+")"}function g(t,e){return"rgba("+Math.round(t[0]/255*100)+"%, "+Math.round(t[1]/255*100)+"%, "+Math.round(t[2]/255*100)+"%, "+(e||t[3]||1)+")"}function p(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+e+")"}function m(t,e,n){return Math.min(Math.max(e,t),n)}function v(t){var e=t.toString(16).toUpperCase();return e.length<2?"0"+e:e}var b={};for(var x in l)b[l[x]]=x;var y=function(t){return t instanceof y?t:this instanceof y?(this.valid=!1,this.values={rgb:[0,0,0],hsl:[0,0,0],hsv:[0,0,0],hwb:[0,0,0],cmyk:[0,0,0,0],alpha:1},void("string"==typeof t?(e=u.getRgba(t))?this.setValues("rgb",e):(e=u.getHsla(t))?this.setValues("hsl",e):(e=u.getHwb(t))&&this.setValues("hwb",e):"object"==typeof t&&(void 0!==(e=t).r||void 0!==e.red?this.setValues("rgb",e):void 0!==e.l||void 0!==e.lightness?this.setValues("hsl",e):void 0!==e.v||void 0!==e.value?this.setValues("hsv",e):void 0!==e.w||void 0!==e.whiteness?this.setValues("hwb",e):void 0===e.c&&void 0===e.cyan||this.setValues("cmyk",e)))):new y(t);var e};y.prototype={isValid:function(){return this.valid},rgb:function(){return this.setSpace("rgb",arguments)},hsl:function(){return this.setSpace("hsl",arguments)},hsv:function(){return this.setSpace("hsv",arguments)},hwb:function(){return this.setSpace("hwb",arguments)},cmyk:function(){return this.setSpace("cmyk",arguments)},rgbArray:function(){return this.values.rgb},hslArray:function(){return this.values.hsl},hsvArray:function(){return this.values.hsv},hwbArray:function(){var t=this.values;return 1!==t.alpha?t.hwb.concat([t.alpha]):t.hwb},cmykArray:function(){return this.values.cmyk},rgbaArray:function(){var t=this.values;return t.rgb.concat([t.alpha])},hslaArray:function(){var t=this.values;return t.hsl.concat([t.alpha])},alpha:function(t){return void 0===t?this.values.alpha:(this.setValues("alpha",t),this)},red:function(t){return this.setChannel("rgb",0,t)},green:function(t){return this.setChannel("rgb",1,t)},blue:function(t){return this.setChannel("rgb",2,t)},hue:function(t){return t&&(t=(t%=360)<0?360+t:t),this.setChannel("hsl",0,t)},saturation:function(t){return this.setChannel("hsl",1,t)},lightness:function(t){return this.setChannel("hsl",2,t)},saturationv:function(t){return this.setChannel("hsv",1,t)},whiteness:function(t){return this.setChannel("hwb",1,t)},blackness:function(t){return this.setChannel("hwb",2,t)},value:function(t){return this.setChannel("hsv",2,t)},cyan:function(t){return this.setChannel("cmyk",0,t)},magenta:function(t){return this.setChannel("cmyk",1,t)},yellow:function(t){return this.setChannel("cmyk",2,t)},black:function(t){return this.setChannel("cmyk",3,t)},hexString:function(){return u.hexString(this.values.rgb)},rgbString:function(){return u.rgbString(this.values.rgb,this.values.alpha)},rgbaString:function(){return u.rgbaString(this.values.rgb,this.values.alpha)},percentString:function(){return u.percentString(this.values.rgb,this.values.alpha)},hslString:function(){return u.hslString(this.values.hsl,this.values.alpha)},hslaString:function(){return u.hslaString(this.values.hsl,this.values.alpha)},hwbString:function(){return u.hwbString(this.values.hwb,this.values.alpha)},keyword:function(){return u.keyword(this.values.rgb,this.values.alpha)},rgbNumber:function(){var t=this.values.rgb;return t[0]<<16|t[1]<<8|t[2]},luminosity:function(){for(var t=this.values.rgb,e=[],n=0;n<t.length;n++){var i=t[n]/255;e[n]=i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4)}return.2126*e[0]+.7152*e[1]+.0722*e[2]},contrast:function(t){var e=this.luminosity(),n=t.luminosity();return e>n?(e+.05)/(n+.05):(n+.05)/(e+.05)},level:function(t){var e=this.contrast(t);return e>=7.1?"AAA":e>=4.5?"AA":""},dark:function(){var t=this.values.rgb;return(299*t[0]+587*t[1]+114*t[2])/1e3<128},light:function(){return!this.dark()},negate:function(){for(var t=[],e=0;e<3;e++)t[e]=255-this.values.rgb[e];return this.setValues("rgb",t),this},lighten:function(t){var e=this.values.hsl;return e[2]+=e[2]*t,this.setValues("hsl",e),this},darken:function(t){var e=this.values.hsl;return e[2]-=e[2]*t,this.setValues("hsl",e),this},saturate:function(t){var e=this.values.hsl;return e[1]+=e[1]*t,this.setValues("hsl",e),this},desaturate:function(t){var e=this.values.hsl;return e[1]-=e[1]*t,this.setValues("hsl",e),this},whiten:function(t){var e=this.values.hwb;return e[1]+=e[1]*t,this.setValues("hwb",e),this},blacken:function(t){var e=this.values.hwb;return e[2]+=e[2]*t,this.setValues("hwb",e),this},greyscale:function(){var t=this.values.rgb,e=.3*t[0]+.59*t[1]+.11*t[2];return this.setValues("rgb",[e,e,e]),this},clearer:function(t){var e=this.values.alpha;return this.setValues("alpha",e-e*t),this},opaquer:function(t){var e=this.values.alpha;return this.setValues("alpha",e+e*t),this},rotate:function(t){var e=this.values.hsl,n=(e[0]+t)%360;return e[0]=n<0?360+n:n,this.setValues("hsl",e),this},mix:function(t,e){var n=t,i=void 0===e?.5:e,a=2*i-1,r=this.alpha()-n.alpha(),o=((a*r==-1?a:(a+r)/(1+a*r))+1)/2,s=1-o;return this.rgb(o*this.red()+s*n.red(),o*this.green()+s*n.green(),o*this.blue()+s*n.blue()).alpha(this.alpha()*i+n.alpha()*(1-i))},toJSON:function(){return this.rgb()},clone:function(){var t,e,n=new y,i=this.values,a=n.values;for(var r in i)i.hasOwnProperty(r)&&(t=i[r],"[object Array]"===(e={}.toString.call(t))?a[r]=t.slice(0):"[object Number]"===e?a[r]=t:console.error("unexpected color value:",t));return n}},y.prototype.spaces={rgb:["red","green","blue"],hsl:["hue","saturation","lightness"],hsv:["hue","saturation","value"],hwb:["hue","whiteness","blackness"],cmyk:["cyan","magenta","yellow","black"]},y.prototype.maxes={rgb:[255,255,255],hsl:[360,100,100],hsv:[360,100,100],hwb:[360,100,100],cmyk:[100,100,100,100]},y.prototype.getValues=function(t){for(var e=this.values,n={},i=0;i<t.length;i++)n[t.charAt(i)]=e[t][i];return 1!==e.alpha&&(n.a=e.alpha),n},y.prototype.setValues=function(t,e){var n,i,a=this.values,r=this.spaces,o=this.maxes,l=1;if(this.valid=!0,"alpha"===t)l=e;else if(e.length)a[t]=e.slice(0,t.length),l=e[t.length];else if(void 0!==e[t.charAt(0)]){for(n=0;n<t.length;n++)a[t][n]=e[t.charAt(n)];l=e.a}else if(void 0!==e[r[t][0]]){var u=r[t];for(n=0;n<t.length;n++)a[t][n]=e[u[n]];l=e.alpha}if(a.alpha=Math.max(0,Math.min(1,void 0===l?a.alpha:l)),"alpha"===t)return!1;for(n=0;n<t.length;n++)i=Math.max(0,Math.min(o[t][n],a[t][n])),a[t][n]=Math.round(i);for(var d in r)d!==t&&(a[d]=s[t][d](a[t]));return!0},y.prototype.setSpace=function(t,e){var n=e[0];return void 0===n?this.getValues(t):("number"==typeof n&&(n=Array.prototype.slice.call(e)),this.setValues(t,n),this)},y.prototype.setChannel=function(t,e,n){var i=this.values[t];return void 0===n?i[e]:n===i[e]?this:(i[e]=n,this.setValues(t,i),this)},"undefined"!=typeof window&&(window.Color=y);var _=y;function k(t){return-1===["__proto__","prototype","constructor"].indexOf(t)}var w,M={noop:function(){},uid:(w=0,function(){return w++}),isNullOrUndef:function(t){return null==t},isArray:function(t){if(Array.isArray&&Array.isArray(t))return!0;var e=Object.prototype.toString.call(t);return"[object"===e.substr(0,7)&&"Array]"===e.substr(-6)},isObject:function(t){return null!==t&&"[object Object]"===Object.prototype.toString.call(t)},isFinite:function(t){return("number"==typeof t||t instanceof Number)&&isFinite(t)},valueOrDefault:function(t,e){return void 0===t?e:t},valueAtIndexOrDefault:function(t,e,n){return M.valueOrDefault(M.isArray(t)?t[e]:t,n)},callback:function(t,e,n){if(t&&"function"==typeof t.call)return t.apply(n,e)},each:function(t,e,n,i){var a,r,o;if(M.isArray(t))if(r=t.length,i)for(a=r-1;a>=0;a--)e.call(n,t[a],a);else for(a=0;a<r;a++)e.call(n,t[a],a);else if(M.isObject(t))for(r=(o=Object.keys(t)).length,a=0;a<r;a++)e.call(n,t[o[a]],o[a])},arrayEquals:function(t,e){var n,i,a,r;if(!t||!e||t.length!==e.length)return!1;for(n=0,i=t.length;n<i;++n)if(a=t[n],r=e[n],a instanceof Array&&r instanceof Array){if(!M.arrayEquals(a,r))return!1}else if(a!==r)return!1;return!0},clone:function(t){if(M.isArray(t))return t.map(M.clone);if(M.isObject(t)){for(var e=Object.create(t),n=Object.keys(t),i=n.length,a=0;a<i;++a)e[n[a]]=M.clone(t[n[a]]);return e}return t},_merger:function(t,e,n,i){if(k(t)){var a=e[t],r=n[t];M.isObject(a)&&M.isObject(r)?M.merge(a,r,i):e[t]=M.clone(r)}},_mergerIf:function(t,e,n){if(k(t)){var i=e[t],a=n[t];M.isObject(i)&&M.isObject(a)?M.mergeIf(i,a):e.hasOwnProperty(t)||(e[t]=M.clone(a))}},merge:function(t,e,n){var i,a,r,o,s,l=M.isArray(e)?e:[e],u=l.length;if(!M.isObject(t))return t;for(i=(n=n||{}).merger||M._merger,a=0;a<u;++a)if(e=l[a],M.isObject(e))for(s=0,o=(r=Object.keys(e)).length;s<o;++s)i(r[s],t,e,n);return t},mergeIf:function(t,e){return M.merge(t,e,{merger:M._mergerIf})},extend:Object.assign||function(t){return M.merge(t,[].slice.call(arguments,1),{merger:function(t,e,n){e[t]=n[t]}})},inherits:function(t){var e=this,n=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return e.apply(this,arguments)},i=function(){this.constructor=n};return i.prototype=e.prototype,n.prototype=new i,n.extend=M.inherits,t&&M.extend(n.prototype,t),n.__super__=e.prototype,n},_deprecated:function(t,e,n,i){void 0!==e&&console.warn(t+': "'+n+'" is deprecated. Please use "'+i+'" instead')}},S=M;M.callCallback=M.callback,M.indexOf=function(t,e,n){return Array.prototype.indexOf.call(t,e,n)},M.getValueOrDefault=M.valueOrDefault,M.getValueAtIndexOrDefault=M.valueAtIndexOrDefault;var C={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return(t-=1)*t*t+1},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-((t-=1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return t*t*t*t*t},easeOutQuint:function(t){return(t-=1)*t*t*t*t+1},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return 1-Math.cos(t*(Math.PI/2))},easeOutSine:function(t){return Math.sin(t*(Math.PI/2))},easeInOutSine:function(t){return-.5*(Math.cos(Math.PI*t)-1)},easeInExpo:function(t){return 0===t?0:Math.pow(2,10*(t-1))},easeOutExpo:function(t){return 1===t?1:1-Math.pow(2,-10*t)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*--t))},easeInCirc:function(t){return t>=1?t:-(Math.sqrt(1-t*t)-1)},easeOutCirc:function(t){return Math.sqrt(1-(t-=1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var e=1.70158,n=0,i=1;return 0===t?0:1===t?1:(n||(n=.3),i<1?(i=1,e=n/4):e=n/(2*Math.PI)*Math.asin(1/i),-i*Math.pow(2,10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/n))},easeOutElastic:function(t){var e=1.70158,n=0,i=1;return 0===t?0:1===t?1:(n||(n=.3),i<1?(i=1,e=n/4):e=n/(2*Math.PI)*Math.asin(1/i),i*Math.pow(2,-10*t)*Math.sin((t-e)*(2*Math.PI)/n)+1)},easeInOutElastic:function(t){var e=1.70158,n=0,i=1;return 0===t?0:2==(t/=.5)?1:(n||(n=.45),i<1?(i=1,e=n/4):e=n/(2*Math.PI)*Math.asin(1/i),t<1?i*Math.pow(2,10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/n)*-.5:i*Math.pow(2,-10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/n)*.5+1)},easeInBack:function(t){var e=1.70158;return t*t*((e+1)*t-e)},easeOutBack:function(t){var e=1.70158;return(t-=1)*t*((e+1)*t+e)+1},easeInOutBack:function(t){var e=1.70158;return(t/=.5)<1?t*t*((1+(e*=1.525))*t-e)*.5:.5*((t-=2)*t*((1+(e*=1.525))*t+e)+2)},easeInBounce:function(t){return 1-C.easeOutBounce(1-t)},easeOutBounce:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},easeInOutBounce:function(t){return t<.5?.5*C.easeInBounce(2*t):.5*C.easeOutBounce(2*t-1)+.5}},P={effects:C};S.easingEffects=C;var A=Math.PI,D=A/180,T=2*A,I=A/2,F=A/4,O=2*A/3,L={clear:function(t){t.ctx.clearRect(0,0,t.width,t.height)},roundedRect:function(t,e,n,i,a,r){if(r){var o=Math.min(r,a/2,i/2),s=e+o,l=n+o,u=e+i-o,d=n+a-o;t.moveTo(e,l),s<u&&l<d?(t.arc(s,l,o,-A,-I),t.arc(u,l,o,-I,0),t.arc(u,d,o,0,I),t.arc(s,d,o,I,A)):s<u?(t.moveTo(s,n),t.arc(u,l,o,-I,I),t.arc(s,l,o,I,A+I)):l<d?(t.arc(s,l,o,-A,0),t.arc(s,d,o,0,A)):t.arc(s,l,o,-A,A),t.closePath(),t.moveTo(e,n)}else t.rect(e,n,i,a)},drawPoint:function(t,e,n,i,a,r){var o,s,l,u,d,h=(r||0)*D;if(e&&"object"==typeof e&&("[object HTMLImageElement]"===(o=e.toString())||"[object HTMLCanvasElement]"===o))return t.save(),t.translate(i,a),t.rotate(h),t.drawImage(e,-e.width/2,-e.height/2,e.width,e.height),void t.restore();if(!(isNaN(n)||n<=0)){switch(t.beginPath(),e){default:t.arc(i,a,n,0,T),t.closePath();break;case"triangle":t.moveTo(i+Math.sin(h)*n,a-Math.cos(h)*n),h+=O,t.lineTo(i+Math.sin(h)*n,a-Math.cos(h)*n),h+=O,t.lineTo(i+Math.sin(h)*n,a-Math.cos(h)*n),t.closePath();break;case"rectRounded":u=n-(d=.516*n),s=Math.cos(h+F)*u,l=Math.sin(h+F)*u,t.arc(i-s,a-l,d,h-A,h-I),t.arc(i+l,a-s,d,h-I,h),t.arc(i+s,a+l,d,h,h+I),t.arc(i-l,a+s,d,h+I,h+A),t.closePath();break;case"rect":if(!r){u=Math.SQRT1_2*n,t.rect(i-u,a-u,2*u,2*u);break}h+=F;case"rectRot":s=Math.cos(h)*n,l=Math.sin(h)*n,t.moveTo(i-s,a-l),t.lineTo(i+l,a-s),t.lineTo(i+s,a+l),t.lineTo(i-l,a+s),t.closePath();break;case"crossRot":h+=F;case"cross":s=Math.cos(h)*n,l=Math.sin(h)*n,t.moveTo(i-s,a-l),t.lineTo(i+s,a+l),t.moveTo(i+l,a-s),t.lineTo(i-l,a+s);break;case"star":s=Math.cos(h)*n,l=Math.sin(h)*n,t.moveTo(i-s,a-l),t.lineTo(i+s,a+l),t.moveTo(i+l,a-s),t.lineTo(i-l,a+s),h+=F,s=Math.cos(h)*n,l=Math.sin(h)*n,t.moveTo(i-s,a-l),t.lineTo(i+s,a+l),t.moveTo(i+l,a-s),t.lineTo(i-l,a+s);break;case"line":s=Math.cos(h)*n,l=Math.sin(h)*n,t.moveTo(i-s,a-l),t.lineTo(i+s,a+l);break;case"dash":t.moveTo(i,a),t.lineTo(i+Math.cos(h)*n,a+Math.sin(h)*n)}t.fill(),t.stroke()}},_isPointInArea:function(t,e){return t.x>e.left-1e-6&&t.x<e.right+1e-6&&t.y>e.top-1e-6&&t.y<e.bottom+1e-6},clipArea:function(t,e){t.save(),t.beginPath(),t.rect(e.left,e.top,e.right-e.left,e.bottom-e.top),t.clip()},unclipArea:function(t){t.restore()},lineTo:function(t,e,n,i){var a=n.steppedLine;if(a){if("middle"===a){var r=(e.x+n.x)/2;t.lineTo(r,i?n.y:e.y),t.lineTo(r,i?e.y:n.y)}else"after"===a&&!i||"after"!==a&&i?t.lineTo(e.x,n.y):t.lineTo(n.x,e.y);t.lineTo(n.x,n.y)}else n.tension?t.bezierCurveTo(i?e.controlPointPreviousX:e.controlPointNextX,i?e.controlPointPreviousY:e.controlPointNextY,i?n.controlPointNextX:n.controlPointPreviousX,i?n.controlPointNextY:n.controlPointPreviousY,n.x,n.y):t.lineTo(n.x,n.y)}},R=L;S.clear=L.clear,S.drawRoundedRectangle=function(t){t.beginPath(),L.roundedRect.apply(L,arguments)};var z={_set:function(t,e){return S.merge(this[t]||(this[t]={}),e)}};z._set("global",{defaultColor:"rgba(0,0,0,0.1)",defaultFontColor:"#666",defaultFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",defaultFontSize:12,defaultFontStyle:"normal",defaultLineHeight:1.2,showLines:!0});var N=z,B=S.valueOrDefault;var E={toLineHeight:function(t,e){var n=(""+t).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);if(!n||"normal"===n[1])return 1.2*e;switch(t=+n[2],n[3]){case"px":return t;case"%":t/=100}return e*t},toPadding:function(t){var e,n,i,a;return S.isObject(t)?(e=+t.top||0,n=+t.right||0,i=+t.bottom||0,a=+t.left||0):e=n=i=a=+t||0,{top:e,right:n,bottom:i,left:a,height:e+i,width:a+n}},_parseFont:function(t){var e=N.global,n=B(t.fontSize,e.defaultFontSize),i={family:B(t.fontFamily,e.defaultFontFamily),lineHeight:S.options.toLineHeight(B(t.lineHeight,e.defaultLineHeight),n),size:n,style:B(t.fontStyle,e.defaultFontStyle),weight:null,string:""};return i.string=function(t){return!t||S.isNullOrUndef(t.size)||S.isNullOrUndef(t.family)?null:(t.style?t.style+" ":"")+(t.weight?t.weight+" ":"")+t.size+"px "+t.family}(i),i},resolve:function(t,e,n,i){var a,r,o,s=!0;for(a=0,r=t.length;a<r;++a)if(void 0!==(o=t[a])&&(void 0!==e&&"function"==typeof o&&(o=o(e),s=!1),void 0!==n&&S.isArray(o)&&(o=o[n],s=!1),void 0!==o))return i&&!s&&(i.cacheable=!1),o}},W={_factorize:function(t){var e,n=[],i=Math.sqrt(t);for(e=1;e<i;e++)t%e==0&&(n.push(e),n.push(t/e));return i===(0|i)&&n.push(i),n.sort((function(t,e){return t-e})).pop(),n},log10:Math.log10||function(t){var e=Math.log(t)*Math.LOG10E,n=Math.round(e);return t===Math.pow(10,n)?n:e}},V=W;S.log10=W.log10;var H=S,j=P,q=R,U=E,Y=V,G={getRtlAdapter:function(t,e,n){return t?function(t,e){return{x:function(n){return t+t+e-n},setWidth:function(t){e=t},textAlign:function(t){return"center"===t?t:"right"===t?"left":"right"},xPlus:function(t,e){return t-e},leftForLtr:function(t,e){return t-e}}}(e,n):{x:function(t){return t},setWidth:function(t){},textAlign:function(t){return t},xPlus:function(t,e){return t+e},leftForLtr:function(t,e){return t}}},overrideTextDirection:function(t,e){var n,i;"ltr"!==e&&"rtl"!==e||(i=[(n=t.canvas.style).getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",e,"important"),t.prevTextDirection=i)},restoreTextDirection:function(t){var e=t.prevTextDirection;void 0!==e&&(delete t.prevTextDirection,t.canvas.style.setProperty("direction",e[0],e[1]))}};H.easing=j,H.canvas=q,H.options=U,H.math=Y,H.rtl=G;var X=function(t){H.extend(this,t),this.initialize.apply(this,arguments)};H.extend(X.prototype,{_type:void 0,initialize:function(){this.hidden=!1},pivot:function(){var t=this;return t._view||(t._view=H.extend({},t._model)),t._start={},t},transition:function(t){var e=this,n=e._model,i=e._start,a=e._view;return n&&1!==t?(a||(a=e._view={}),i||(i=e._start={}),function(t,e,n,i){var a,r,o,s,l,u,d,h,c,f=Object.keys(n);for(a=0,r=f.length;a<r;++a)if(u=n[o=f[a]],e.hasOwnProperty(o)||(e[o]=u),(s=e[o])!==u&&"_"!==o[0]){if(t.hasOwnProperty(o)||(t[o]=s),(d=typeof u)===typeof(l=t[o]))if("string"===d){if((h=_(l)).valid&&(c=_(u)).valid){e[o]=c.mix(h,i).rgbString();continue}}else if(H.isFinite(l)&&H.isFinite(u)){e[o]=l+(u-l)*i;continue}e[o]=u}}(i,a,n,t),e):(e._view=H.extend({},n),e._start=null,e)},tooltipPosition:function(){return{x:this._model.x,y:this._model.y}},hasValue:function(){return H.isNumber(this._model.x)&&H.isNumber(this._model.y)}}),X.extend=H.inherits;var K=X,Z=K.extend({chart:null,currentStep:0,numSteps:60,easing:"",render:null,onAnimationProgress:null,onAnimationComplete:null}),$=Z;Object.defineProperty(Z.prototype,"animationObject",{get:function(){return this}}),Object.defineProperty(Z.prototype,"chartInstance",{get:function(){return this.chart},set:function(t){this.chart=t}}),N._set("global",{animation:{duration:1e3,easing:"easeOutQuart",onProgress:H.noop,onComplete:H.noop}});var J={animations:[],request:null,addAnimation:function(t,e,n,i){var a,r,o=this.animations;for(e.chart=t,e.startTime=Date.now(),e.duration=n,i||(t.animating=!0),a=0,r=o.length;a<r;++a)if(o[a].chart===t)return void(o[a]=e);o.push(e),1===o.length&&this.requestAnimationFrame()},cancelAnimation:function(t){var e=H.findIndex(this.animations,(function(e){return e.chart===t}));-1!==e&&(this.animations.splice(e,1),t.animating=!1)},requestAnimationFrame:function(){var t=this;null===t.request&&(t.request=H.requestAnimFrame.call(window,(function(){t.request=null,t.startDigest()})))},startDigest:function(){this.advance(),this.animations.length>0&&this.requestAnimationFrame()},advance:function(){for(var t,e,n,i,a=this.animations,r=0;r<a.length;)e=(t=a[r]).chart,n=t.numSteps,i=Math.floor((Date.now()-t.startTime)/t.duration*n)+1,t.currentStep=Math.min(i,n),H.callback(t.render,[e,t],e),H.callback(t.onAnimationProgress,[t],e),t.currentStep>=n?(H.callback(t.onAnimationComplete,[t],e),e.animating=!1,a.splice(r,1)):++r}},Q=H.options.resolve,tt=["push","pop","shift","splice","unshift"];function et(t,e){var n=t._chartjs;if(n){var i=n.listeners,a=i.indexOf(e);-1!==a&&i.splice(a,1),i.length>0||(tt.forEach((function(e){delete t[e]})),delete t._chartjs)}}var nt=function(t,e){this.initialize(t,e)};H.extend(nt.prototype,{datasetElementType:null,dataElementType:null,_datasetElementOptions:["backgroundColor","borderCapStyle","borderColor","borderDash","borderDashOffset","borderJoinStyle","borderWidth"],_dataElementOptions:["backgroundColor","borderColor","borderWidth","pointStyle"],initialize:function(t,e){var n=this;n.chart=t,n.index=e,n.linkScales(),n.addElements(),n._type=n.getMeta().type},updateIndex:function(t){this.index=t},linkScales:function(){var t=this.getMeta(),e=this.chart,n=e.scales,i=this.getDataset(),a=e.options.scales;null!==t.xAxisID&&t.xAxisID in n&&!i.xAxisID||(t.xAxisID=i.xAxisID||a.xAxes[0].id),null!==t.yAxisID&&t.yAxisID in n&&!i.yAxisID||(t.yAxisID=i.yAxisID||a.yAxes[0].id)},getDataset:function(){return this.chart.data.datasets[this.index]},getMeta:function(){return this.chart.getDatasetMeta(this.index)},getScaleForId:function(t){return this.chart.scales[t]},_getValueScaleId:function(){return this.getMeta().yAxisID},_getIndexScaleId:function(){return this.getMeta().xAxisID},_getValueScale:function(){return this.getScaleForId(this._getValueScaleId())},_getIndexScale:function(){return this.getScaleForId(this._getIndexScaleId())},reset:function(){this._update(!0)},destroy:function(){this._data&&et(this._data,this)},createMetaDataset:function(){var t=this.datasetElementType;return t&&new t({_chart:this.chart,_datasetIndex:this.index})},createMetaData:function(t){var e=this.dataElementType;return e&&new e({_chart:this.chart,_datasetIndex:this.index,_index:t})},addElements:function(){var t,e,n=this.getMeta(),i=this.getDataset().data||[],a=n.data;for(t=0,e=i.length;t<e;++t)a[t]=a[t]||this.createMetaData(t);n.dataset=n.dataset||this.createMetaDataset()},addElementAndReset:function(t){var e=this.createMetaData(t);this.getMeta().data.splice(t,0,e),this.updateElement(e,t,!0)},buildOrUpdateElements:function(){var t,e,n=this,i=n.getDataset(),a=i.data||(i.data=[]);n._data!==a&&(n._data&&et(n._data,n),a&&Object.isExtensible(a)&&(e=n,(t=a)._chartjs?t._chartjs.listeners.push(e):(Object.defineProperty(t,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[e]}}),tt.forEach((function(e){var n="onData"+e.charAt(0).toUpperCase()+e.slice(1),i=t[e];Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:function(){var e=Array.prototype.slice.call(arguments),a=i.apply(this,e);return H.each(t._chartjs.listeners,(function(t){"function"==typeof t[n]&&t[n].apply(t,e)})),a}})})))),n._data=a),n.resyncElements()},_configure:function(){this._config=H.merge(Object.create(null),[this.chart.options.datasets[this._type],this.getDataset()],{merger:function(t,e,n){"_meta"!==t&&"data"!==t&&H._merger(t,e,n)}})},_update:function(t){this._configure(),this._cachedDataOpts=null,this.update(t)},update:H.noop,transition:function(t){for(var e=this.getMeta(),n=e.data||[],i=n.length,a=0;a<i;++a)n[a].transition(t);e.dataset&&e.dataset.transition(t)},draw:function(){var t=this.getMeta(),e=t.data||[],n=e.length,i=0;for(t.dataset&&t.dataset.draw();i<n;++i)e[i].draw()},getStyle:function(t){var e,n=this.getMeta(),i=n.dataset;return this._configure(),i&&void 0===t?e=this._resolveDatasetElementOptions(i||{}):(t=t||0,e=this._resolveDataElementOptions(n.data[t]||{},t)),!1!==e.fill&&null!==e.fill||(e.backgroundColor=e.borderColor),e},_resolveDatasetElementOptions:function(t,e){var n,i,a,r,o=this,s=o.chart,l=o._config,u=t.custom||{},d=s.options.elements[o.datasetElementType.prototype._type]||{},h=o._datasetElementOptions,c={},f={chart:s,dataset:o.getDataset(),datasetIndex:o.index,hover:e};for(n=0,i=h.length;n<i;++n)a=h[n],r=e?"hover"+a.charAt(0).toUpperCase()+a.slice(1):a,c[a]=Q([u[r],l[r],d[r]],f);return c},_resolveDataElementOptions:function(t,e){var n=this,i=t&&t.custom,a=n._cachedDataOpts;if(a&&!i)return a;var r,o,s,l,u=n.chart,d=n._config,h=u.options.elements[n.dataElementType.prototype._type]||{},c=n._dataElementOptions,f={},g={chart:u,dataIndex:e,dataset:n.getDataset(),datasetIndex:n.index},p={cacheable:!i};if(i=i||{},H.isArray(c))for(o=0,s=c.length;o<s;++o)f[l=c[o]]=Q([i[l],d[l],h[l]],g,e,p);else for(o=0,s=(r=Object.keys(c)).length;o<s;++o)f[l=r[o]]=Q([i[l],d[c[l]],d[l],h[l]],g,e,p);return p.cacheable&&(n._cachedDataOpts=Object.freeze(f)),f},removeHoverStyle:function(t){H.merge(t._model,t.$previousStyle||{}),delete t.$previousStyle},setHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],n=t._index,i=t.custom||{},a=t._model,r=H.getHoverColor;t.$previousStyle={backgroundColor:a.backgroundColor,borderColor:a.borderColor,borderWidth:a.borderWidth},a.backgroundColor=Q([i.hoverBackgroundColor,e.hoverBackgroundColor,r(a.backgroundColor)],void 0,n),a.borderColor=Q([i.hoverBorderColor,e.hoverBorderColor,r(a.borderColor)],void 0,n),a.borderWidth=Q([i.hoverBorderWidth,e.hoverBorderWidth,a.borderWidth],void 0,n)},_removeDatasetHoverStyle:function(){var t=this.getMeta().dataset;t&&this.removeHoverStyle(t)},_setDatasetHoverStyle:function(){var t,e,n,i,a,r,o=this.getMeta().dataset,s={};if(o){for(r=o._model,a=this._resolveDatasetElementOptions(o,!0),t=0,e=(i=Object.keys(a)).length;t<e;++t)s[n=i[t]]=r[n],r[n]=a[n];o.$previousStyle=s}},resyncElements:function(){var t=this.getMeta(),e=this.getDataset().data,n=t.data.length,i=e.length;i<n?t.data.splice(i,n-i):i>n&&this.insertElements(n,i-n)},insertElements:function(t,e){for(var n=0;n<e;++n)this.addElementAndReset(t+n)},onDataPush:function(){var t=arguments.length;this.insertElements(this.getDataset().data.length-t,t)},onDataPop:function(){this.getMeta().data.pop()},onDataShift:function(){this.getMeta().data.shift()},onDataSplice:function(t,e){this.getMeta().data.splice(t,e),this.insertElements(t,arguments.length-2)},onDataUnshift:function(){this.insertElements(0,arguments.length)}}),nt.extend=H.inherits;var it=nt,at=2*Math.PI;function rt(t,e){var n=e.startAngle,i=e.endAngle,a=e.pixelMargin,r=a/e.outerRadius,o=e.x,s=e.y;t.beginPath(),t.arc(o,s,e.outerRadius,n-r,i+r),e.innerRadius>a?(r=a/e.innerRadius,t.arc(o,s,e.innerRadius-a,i+r,n-r,!0)):t.arc(o,s,a,i+Math.PI/2,n-Math.PI/2),t.closePath(),t.clip()}function ot(t,e,n){var i="inner"===e.borderAlign;i?(t.lineWidth=2*e.borderWidth,t.lineJoin="round"):(t.lineWidth=e.borderWidth,t.lineJoin="bevel"),n.fullCircles&&function(t,e,n,i){var a,r=n.endAngle;for(i&&(n.endAngle=n.startAngle+at,rt(t,n),n.endAngle=r,n.endAngle===n.startAngle&&n.fullCircles&&(n.endAngle+=at,n.fullCircles--)),t.beginPath(),t.arc(n.x,n.y,n.innerRadius,n.startAngle+at,n.startAngle,!0),a=0;a<n.fullCircles;++a)t.stroke();for(t.beginPath(),t.arc(n.x,n.y,e.outerRadius,n.startAngle,n.startAngle+at),a=0;a<n.fullCircles;++a)t.stroke()}(t,e,n,i),i&&rt(t,n),t.beginPath(),t.arc(n.x,n.y,e.outerRadius,n.startAngle,n.endAngle),t.arc(n.x,n.y,n.innerRadius,n.endAngle,n.startAngle,!0),t.closePath(),t.stroke()}N._set("global",{elements:{arc:{backgroundColor:N.global.defaultColor,borderColor:"#fff",borderWidth:2,borderAlign:"center"}}});var st=K.extend({_type:"arc",inLabelRange:function(t){var e=this._view;return!!e&&Math.pow(t-e.x,2)<Math.pow(e.radius+e.hoverRadius,2)},inRange:function(t,e){var n=this._view;if(n){for(var i=H.getAngleFromPoint(n,{x:t,y:e}),a=i.angle,r=i.distance,o=n.startAngle,s=n.endAngle;s<o;)s+=at;for(;a>s;)a-=at;for(;a<o;)a+=at;var l=a>=o&&a<=s,u=r>=n.innerRadius&&r<=n.outerRadius;return l&&u}return!1},getCenterPoint:function(){var t=this._view,e=(t.startAngle+t.endAngle)/2,n=(t.innerRadius+t.outerRadius)/2;return{x:t.x+Math.cos(e)*n,y:t.y+Math.sin(e)*n}},getArea:function(){var t=this._view;return Math.PI*((t.endAngle-t.startAngle)/(2*Math.PI))*(Math.pow(t.outerRadius,2)-Math.pow(t.innerRadius,2))},tooltipPosition:function(){var t=this._view,e=t.startAngle+(t.endAngle-t.startAngle)/2,n=(t.outerRadius-t.innerRadius)/2+t.innerRadius;return{x:t.x+Math.cos(e)*n,y:t.y+Math.sin(e)*n}},draw:function(){var t,e=this._chart.ctx,n=this._view,i="inner"===n.borderAlign?.33:0,a={x:n.x,y:n.y,innerRadius:n.innerRadius,outerRadius:Math.max(n.outerRadius-i,0),pixelMargin:i,startAngle:n.startAngle,endAngle:n.endAngle,fullCircles:Math.floor(n.circumference/at)};if(e.save(),e.fillStyle=n.backgroundColor,e.strokeStyle=n.borderColor,a.fullCircles){for(a.endAngle=a.startAngle+at,e.beginPath(),e.arc(a.x,a.y,a.outerRadius,a.startAngle,a.endAngle),e.arc(a.x,a.y,a.innerRadius,a.endAngle,a.startAngle,!0),e.closePath(),t=0;t<a.fullCircles;++t)e.fill();a.endAngle=a.startAngle+n.circumference%at}e.beginPath(),e.arc(a.x,a.y,a.outerRadius,a.startAngle,a.endAngle),e.arc(a.x,a.y,a.innerRadius,a.endAngle,a.startAngle,!0),e.closePath(),e.fill(),n.borderWidth&&ot(e,n,a),e.restore()}}),lt=H.valueOrDefault,ut=N.global.defaultColor;N._set("global",{elements:{line:{tension:.4,backgroundColor:ut,borderWidth:3,borderColor:ut,borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",capBezierPoints:!0,fill:!0}}});var dt=K.extend({_type:"line",draw:function(){var t,e,n,i=this,a=i._view,r=i._chart.ctx,o=a.spanGaps,s=i._children.slice(),l=N.global,u=l.elements.line,d=-1,h=i._loop;if(s.length){if(i._loop){for(t=0;t<s.length;++t)if(e=H.previousItem(s,t),!s[t]._view.skip&&e._view.skip){s=s.slice(t).concat(s.slice(0,t)),h=o;break}h&&s.push(s[0])}for(r.save(),r.lineCap=a.borderCapStyle||u.borderCapStyle,r.setLineDash&&r.setLineDash(a.borderDash||u.borderDash),r.lineDashOffset=lt(a.borderDashOffset,u.borderDashOffset),r.lineJoin=a.borderJoinStyle||u.borderJoinStyle,r.lineWidth=lt(a.borderWidth,u.borderWidth),r.strokeStyle=a.borderColor||l.defaultColor,r.beginPath(),(n=s[0]._view).skip||(r.moveTo(n.x,n.y),d=0),t=1;t<s.length;++t)n=s[t]._view,e=-1===d?H.previousItem(s,t):s[d],n.skip||(d!==t-1&&!o||-1===d?r.moveTo(n.x,n.y):H.canvas.lineTo(r,e._view,n),d=t);h&&r.closePath(),r.stroke(),r.restore()}}}),ht=H.valueOrDefault,ct=N.global.defaultColor;function ft(t){var e=this._view;return!!e&&Math.abs(t-e.x)<e.radius+e.hitRadius}N._set("global",{elements:{point:{radius:3,pointStyle:"circle",backgroundColor:ct,borderColor:ct,borderWidth:1,hitRadius:1,hoverRadius:4,hoverBorderWidth:1}}});var gt=K.extend({_type:"point",inRange:function(t,e){var n=this._view;return!!n&&Math.pow(t-n.x,2)+Math.pow(e-n.y,2)<Math.pow(n.hitRadius+n.radius,2)},inLabelRange:ft,inXRange:ft,inYRange:function(t){var e=this._view;return!!e&&Math.abs(t-e.y)<e.radius+e.hitRadius},getCenterPoint:function(){var t=this._view;return{x:t.x,y:t.y}},getArea:function(){return Math.PI*Math.pow(this._view.radius,2)},tooltipPosition:function(){var t=this._view;return{x:t.x,y:t.y,padding:t.radius+t.borderWidth}},draw:function(t){var e=this._view,n=this._chart.ctx,i=e.pointStyle,a=e.rotation,r=e.radius,o=e.x,s=e.y,l=N.global,u=l.defaultColor;e.skip||(void 0===t||H.canvas._isPointInArea(e,t))&&(n.strokeStyle=e.borderColor||u,n.lineWidth=ht(e.borderWidth,l.elements.point.borderWidth),n.fillStyle=e.backgroundColor||u,H.canvas.drawPoint(n,i,r,o,s,a))}}),pt=N.global.defaultColor;function mt(t){return t&&void 0!==t.width}function vt(t){var e,n,i,a,r;return mt(t)?(r=t.width/2,e=t.x-r,n=t.x+r,i=Math.min(t.y,t.base),a=Math.max(t.y,t.base)):(r=t.height/2,e=Math.min(t.x,t.base),n=Math.max(t.x,t.base),i=t.y-r,a=t.y+r),{left:e,top:i,right:n,bottom:a}}function bt(t,e,n){return t===e?n:t===n?e:t}function xt(t,e,n){var i,a,r,o,s=t.borderWidth,l=function(t){var e=t.borderSkipped,n={};return e?(t.horizontal?t.base>t.x&&(e=bt(e,"left","right")):t.base<t.y&&(e=bt(e,"bottom","top")),n[e]=!0,n):n}(t);return H.isObject(s)?(i=+s.top||0,a=+s.right||0,r=+s.bottom||0,o=+s.left||0):i=a=r=o=+s||0,{t:l.top||i<0?0:i>n?n:i,r:l.right||a<0?0:a>e?e:a,b:l.bottom||r<0?0:r>n?n:r,l:l.left||o<0?0:o>e?e:o}}function yt(t,e,n){var i=null===e,a=null===n,r=!(!t||i&&a)&&vt(t);return r&&(i||e>=r.left&&e<=r.right)&&(a||n>=r.top&&n<=r.bottom)}N._set("global",{elements:{rectangle:{backgroundColor:pt,borderColor:pt,borderSkipped:"bottom",borderWidth:0}}});var _t=K.extend({_type:"rectangle",draw:function(){var t=this._chart.ctx,e=this._view,n=function(t){var e=vt(t),n=e.right-e.left,i=e.bottom-e.top,a=xt(t,n/2,i/2);return{outer:{x:e.left,y:e.top,w:n,h:i},inner:{x:e.left+a.l,y:e.top+a.t,w:n-a.l-a.r,h:i-a.t-a.b}}}(e),i=n.outer,a=n.inner;t.fillStyle=e.backgroundColor,t.fillRect(i.x,i.y,i.w,i.h),i.w===a.w&&i.h===a.h||(t.save(),t.beginPath(),t.rect(i.x,i.y,i.w,i.h),t.clip(),t.fillStyle=e.borderColor,t.rect(a.x,a.y,a.w,a.h),t.fill("evenodd"),t.restore())},height:function(){var t=this._view;return t.base-t.y},inRange:function(t,e){return yt(this._view,t,e)},inLabelRange:function(t,e){var n=this._view;return mt(n)?yt(n,t,null):yt(n,null,e)},inXRange:function(t){return yt(this._view,t,null)},inYRange:function(t){return yt(this._view,null,t)},getCenterPoint:function(){var t,e,n=this._view;return mt(n)?(t=n.x,e=(n.y+n.base)/2):(t=(n.x+n.base)/2,e=n.y),{x:t,y:e}},getArea:function(){var t=this._view;return mt(t)?t.width*Math.abs(t.y-t.base):t.height*Math.abs(t.x-t.base)},tooltipPosition:function(){var t=this._view;return{x:t.x,y:t.y}}}),kt={},wt=st,Mt=dt,St=gt,Ct=_t;kt.Arc=wt,kt.Line=Mt,kt.Point=St,kt.Rectangle=Ct;var Pt=H._deprecated,At=H.valueOrDefault;function Dt(t,e,n){var i,a,r=n.barThickness,o=e.stackCount,s=e.pixels[t],l=H.isNullOrUndef(r)?function(t,e){var n,i,a,r,o=t._length;for(a=1,r=e.length;a<r;++a)o=Math.min(o,Math.abs(e[a]-e[a-1]));for(a=0,r=t.getTicks().length;a<r;++a)i=t.getPixelForTick(a),o=a>0?Math.min(o,Math.abs(i-n)):o,n=i;return o}(e.scale,e.pixels):-1;return H.isNullOrUndef(r)?(i=l*n.categoryPercentage,a=n.barPercentage):(i=r*o,a=1),{chunk:i/o,ratio:a,start:s-i/2}}N._set("bar",{hover:{mode:"label"},scales:{xAxes:[{type:"category",offset:!0,gridLines:{offsetGridLines:!0}}],yAxes:[{type:"linear"}]}}),N._set("global",{datasets:{bar:{categoryPercentage:.8,barPercentage:.9}}});var Tt=it.extend({dataElementType:kt.Rectangle,_dataElementOptions:["backgroundColor","borderColor","borderSkipped","borderWidth","barPercentage","barThickness","categoryPercentage","maxBarThickness","minBarLength"],initialize:function(){var t,e,n=this;it.prototype.initialize.apply(n,arguments),(t=n.getMeta()).stack=n.getDataset().stack,t.bar=!0,e=n._getIndexScale().options,Pt("bar chart",e.barPercentage,"scales.[x/y]Axes.barPercentage","dataset.barPercentage"),Pt("bar chart",e.barThickness,"scales.[x/y]Axes.barThickness","dataset.barThickness"),Pt("bar chart",e.categoryPercentage,"scales.[x/y]Axes.categoryPercentage","dataset.categoryPercentage"),Pt("bar chart",n._getValueScale().options.minBarLength,"scales.[x/y]Axes.minBarLength","dataset.minBarLength"),Pt("bar chart",e.maxBarThickness,"scales.[x/y]Axes.maxBarThickness","dataset.maxBarThickness")},update:function(t){var e,n,i=this.getMeta().data;for(this._ruler=this.getRuler(),e=0,n=i.length;e<n;++e)this.updateElement(i[e],e,t)},updateElement:function(t,e,n){var i=this,a=i.getMeta(),r=i.getDataset(),o=i._resolveDataElementOptions(t,e);t._xScale=i.getScaleForId(a.xAxisID),t._yScale=i.getScaleForId(a.yAxisID),t._datasetIndex=i.index,t._index=e,t._model={backgroundColor:o.backgroundColor,borderColor:o.borderColor,borderSkipped:o.borderSkipped,borderWidth:o.borderWidth,datasetLabel:r.label,label:i.chart.data.labels[e]},H.isArray(r.data[e])&&(t._model.borderSkipped=null),i._updateElementGeometry(t,e,n,o),t.pivot()},_updateElementGeometry:function(t,e,n,i){var a=this,r=t._model,o=a._getValueScale(),s=o.getBasePixel(),l=o.isHorizontal(),u=a._ruler||a.getRuler(),d=a.calculateBarValuePixels(a.index,e,i),h=a.calculateBarIndexPixels(a.index,e,u,i);r.horizontal=l,r.base=n?s:d.base,r.x=l?n?s:d.head:h.center,r.y=l?h.center:n?s:d.head,r.height=l?h.size:void 0,r.width=l?void 0:h.size},_getStacks:function(t){var e,n,i=this._getIndexScale(),a=i._getMatchingVisibleMetas(this._type),r=i.options.stacked,o=a.length,s=[];for(e=0;e<o&&(n=a[e],(!1===r||-1===s.indexOf(n.stack)||void 0===r&&void 0===n.stack)&&s.push(n.stack),n.index!==t);++e);return s},getStackCount:function(){return this._getStacks().length},getStackIndex:function(t,e){var n=this._getStacks(t),i=void 0!==e?n.indexOf(e):-1;return-1===i?n.length-1:i},getRuler:function(){var t,e,n=this._getIndexScale(),i=[];for(t=0,e=this.getMeta().data.length;t<e;++t)i.push(n.getPixelForValue(null,t,this.index));return{pixels:i,start:n._startPixel,end:n._endPixel,stackCount:this.getStackCount(),scale:n}},calculateBarValuePixels:function(t,e,n){var i,a,r,o,s,l,u,d=this.chart,h=this._getValueScale(),c=h.isHorizontal(),f=d.data.datasets,g=h._getMatchingVisibleMetas(this._type),p=h._parseValue(f[t].data[e]),m=n.minBarLength,v=h.options.stacked,b=this.getMeta().stack,x=void 0===p.start?0:p.max>=0&&p.min>=0?p.min:p.max,y=void 0===p.start?p.end:p.max>=0&&p.min>=0?p.max-p.min:p.min-p.max,_=g.length;if(v||void 0===v&&void 0!==b)for(i=0;i<_&&(a=g[i]).index!==t;++i)a.stack===b&&(r=void 0===(u=h._parseValue(f[a.index].data[e])).start?u.end:u.min>=0&&u.max>=0?u.max:u.min,(p.min<0&&r<0||p.max>=0&&r>0)&&(x+=r));return o=h.getPixelForValue(x),l=(s=h.getPixelForValue(x+y))-o,void 0!==m&&Math.abs(l)<m&&(l=m,s=y>=0&&!c||y<0&&c?o-m:o+m),{size:l,base:o,head:s,center:s+l/2}},calculateBarIndexPixels:function(t,e,n,i){var a="flex"===i.barThickness?function(t,e,n){var i,a=e.pixels,r=a[t],o=t>0?a[t-1]:null,s=t<a.length-1?a[t+1]:null,l=n.categoryPercentage;return null===o&&(o=r-(null===s?e.end-e.start:s-r)),null===s&&(s=r+r-o),i=r-(r-Math.min(o,s))/2*l,{chunk:Math.abs(s-o)/2*l/e.stackCount,ratio:n.barPercentage,start:i}}(e,n,i):Dt(e,n,i),r=this.getStackIndex(t,this.getMeta().stack),o=a.start+a.chunk*r+a.chunk/2,s=Math.min(At(i.maxBarThickness,1/0),a.chunk*a.ratio);return{base:o-s/2,head:o+s/2,center:o,size:s}},draw:function(){var t=this.chart,e=this._getValueScale(),n=this.getMeta().data,i=this.getDataset(),a=n.length,r=0;for(H.canvas.clipArea(t.ctx,t.chartArea);r<a;++r){var o=e._parseValue(i.data[r]);isNaN(o.min)||isNaN(o.max)||n[r].draw()}H.canvas.unclipArea(t.ctx)},_resolveDataElementOptions:function(){var t=this,e=H.extend({},it.prototype._resolveDataElementOptions.apply(t,arguments)),n=t._getIndexScale().options,i=t._getValueScale().options;return e.barPercentage=At(n.barPercentage,e.barPercentage),e.barThickness=At(n.barThickness,e.barThickness),e.categoryPercentage=At(n.categoryPercentage,e.categoryPercentage),e.maxBarThickness=At(n.maxBarThickness,e.maxBarThickness),e.minBarLength=At(i.minBarLength,e.minBarLength),e}}),It=H.valueOrDefault,Ft=H.options.resolve;N._set("bubble",{hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-0"}],yAxes:[{type:"linear",position:"left",id:"y-axis-0"}]},tooltips:{callbacks:{title:function(){return""},label:function(t,e){var n=e.datasets[t.datasetIndex].label||"",i=e.datasets[t.datasetIndex].data[t.index];return n+": ("+t.xLabel+", "+t.yLabel+", "+i.r+")"}}}});var Ot=it.extend({dataElementType:kt.Point,_dataElementOptions:["backgroundColor","borderColor","borderWidth","hoverBackgroundColor","hoverBorderColor","hoverBorderWidth","hoverRadius","hitRadius","pointStyle","rotation"],update:function(t){var e=this,n=e.getMeta().data;H.each(n,(function(n,i){e.updateElement(n,i,t)}))},updateElement:function(t,e,n){var i=this,a=i.getMeta(),r=t.custom||{},o=i.getScaleForId(a.xAxisID),s=i.getScaleForId(a.yAxisID),l=i._resolveDataElementOptions(t,e),u=i.getDataset().data[e],d=i.index,h=n?o.getPixelForDecimal(.5):o.getPixelForValue("object"==typeof u?u:NaN,e,d),c=n?s.getBasePixel():s.getPixelForValue(u,e,d);t._xScale=o,t._yScale=s,t._options=l,t._datasetIndex=d,t._index=e,t._model={backgroundColor:l.backgroundColor,borderColor:l.borderColor,borderWidth:l.borderWidth,hitRadius:l.hitRadius,pointStyle:l.pointStyle,rotation:l.rotation,radius:n?0:l.radius,skip:r.skip||isNaN(h)||isNaN(c),x:h,y:c},t.pivot()},setHoverStyle:function(t){var e=t._model,n=t._options,i=H.getHoverColor;t.$previousStyle={backgroundColor:e.backgroundColor,borderColor:e.borderColor,borderWidth:e.borderWidth,radius:e.radius},e.backgroundColor=It(n.hoverBackgroundColor,i(n.backgroundColor)),e.borderColor=It(n.hoverBorderColor,i(n.borderColor)),e.borderWidth=It(n.hoverBorderWidth,n.borderWidth),e.radius=n.radius+n.hoverRadius},_resolveDataElementOptions:function(t,e){var n=this,i=n.chart,a=n.getDataset(),r=t.custom||{},o=a.data[e]||{},s=it.prototype._resolveDataElementOptions.apply(n,arguments),l={chart:i,dataIndex:e,dataset:a,datasetIndex:n.index};return n._cachedDataOpts===s&&(s=H.extend({},s)),s.radius=Ft([r.radius,o.r,n._config.radius,i.options.elements.point.radius],l,e),s}}),Lt=H.valueOrDefault,Rt=Math.PI,zt=2*Rt,Nt=Rt/2;N._set("doughnut",{animation:{animateRotate:!0,animateScale:!1},hover:{mode:"single"},legendCallback:function(t){var e,n,i,a=document.createElement("ul"),r=t.data,o=r.datasets,s=r.labels;if(a.setAttribute("class",t.id+"-legend"),o.length)for(e=0,n=o[0].data.length;e<n;++e)(i=a.appendChild(document.createElement("li"))).appendChild(document.createElement("span")).style.backgroundColor=o[0].backgroundColor[e],s[e]&&i.appendChild(document.createTextNode(s[e]));return a.outerHTML},legend:{labels:{generateLabels:function(t){var e=t.data;return e.labels.length&&e.datasets.length?e.labels.map((function(n,i){var a=t.getDatasetMeta(0),r=a.controller.getStyle(i);return{text:n,fillStyle:r.backgroundColor,strokeStyle:r.borderColor,lineWidth:r.borderWidth,hidden:isNaN(e.datasets[0].data[i])||a.data[i].hidden,index:i}})):[]}},onClick:function(t,e){var n,i,a,r=e.index,o=this.chart;for(n=0,i=(o.data.datasets||[]).length;n<i;++n)(a=o.getDatasetMeta(n)).data[r]&&(a.data[r].hidden=!a.data[r].hidden);o.update()}},cutoutPercentage:50,rotation:-Nt,circumference:zt,tooltips:{callbacks:{title:function(){return""},label:function(t,e){var n=e.labels[t.index],i=": "+e.datasets[t.datasetIndex].data[t.index];return H.isArray(n)?(n=n.slice())[0]+=i:n+=i,n}}}});var Bt=it.extend({dataElementType:kt.Arc,linkScales:H.noop,_dataElementOptions:["backgroundColor","borderColor","borderWidth","borderAlign","hoverBackgroundColor","hoverBorderColor","hoverBorderWidth"],getRingIndex:function(t){for(var e=0,n=0;n<t;++n)this.chart.isDatasetVisible(n)&&++e;return e},update:function(t){var e,n,i,a,r=this,o=r.chart,s=o.chartArea,l=o.options,u=1,d=1,h=0,c=0,f=r.getMeta(),g=f.data,p=l.cutoutPercentage/100||0,m=l.circumference,v=r._getRingWeight(r.index);if(m<zt){var b=l.rotation%zt,x=(b+=b>=Rt?-zt:b<-Rt?zt:0)+m,y=Math.cos(b),_=Math.sin(b),k=Math.cos(x),w=Math.sin(x),M=b<=0&&x>=0||x>=zt,S=b<=Nt&&x>=Nt||x>=zt+Nt,C=b<=-Nt&&x>=-Nt||x>=Rt+Nt,P=b===-Rt||x>=Rt?-1:Math.min(y,y*p,k,k*p),A=C?-1:Math.min(_,_*p,w,w*p),D=M?1:Math.max(y,y*p,k,k*p),T=S?1:Math.max(_,_*p,w,w*p);u=(D-P)/2,d=(T-A)/2,h=-(D+P)/2,c=-(T+A)/2}for(i=0,a=g.length;i<a;++i)g[i]._options=r._resolveDataElementOptions(g[i],i);for(o.borderWidth=r.getMaxBorderWidth(),e=(s.right-s.left-o.borderWidth)/u,n=(s.bottom-s.top-o.borderWidth)/d,o.outerRadius=Math.max(Math.min(e,n)/2,0),o.innerRadius=Math.max(o.outerRadius*p,0),o.radiusLength=(o.outerRadius-o.innerRadius)/(r._getVisibleDatasetWeightTotal()||1),o.offsetX=h*o.outerRadius,o.offsetY=c*o.outerRadius,f.total=r.calculateTotal(),r.outerRadius=o.outerRadius-o.radiusLength*r._getRingWeightOffset(r.index),r.innerRadius=Math.max(r.outerRadius-o.radiusLength*v,0),i=0,a=g.length;i<a;++i)r.updateElement(g[i],i,t)},updateElement:function(t,e,n){var i=this,a=i.chart,r=a.chartArea,o=a.options,s=o.animation,l=(r.left+r.right)/2,u=(r.top+r.bottom)/2,d=o.rotation,h=o.rotation,c=i.getDataset(),f=n&&s.animateRotate?0:t.hidden?0:i.calculateCircumference(c.data[e])*(o.circumference/zt),g=n&&s.animateScale?0:i.innerRadius,p=n&&s.animateScale?0:i.outerRadius,m=t._options||{};H.extend(t,{_datasetIndex:i.index,_index:e,_model:{backgroundColor:m.backgroundColor,borderColor:m.borderColor,borderWidth:m.borderWidth,borderAlign:m.borderAlign,x:l+a.offsetX,y:u+a.offsetY,startAngle:d,endAngle:h,circumference:f,outerRadius:p,innerRadius:g,label:H.valueAtIndexOrDefault(c.label,e,a.data.labels[e])}});var v=t._model;n&&s.animateRotate||(v.startAngle=0===e?o.rotation:i.getMeta().data[e-1]._model.endAngle,v.endAngle=v.startAngle+v.circumference),t.pivot()},calculateTotal:function(){var t,e=this.getDataset(),n=this.getMeta(),i=0;return H.each(n.data,(function(n,a){t=e.data[a],isNaN(t)||n.hidden||(i+=Math.abs(t))})),i},calculateCircumference:function(t){var e=this.getMeta().total;return e>0&&!isNaN(t)?zt*(Math.abs(t)/e):0},getMaxBorderWidth:function(t){var e,n,i,a,r,o,s,l,u=0,d=this.chart;if(!t)for(e=0,n=d.data.datasets.length;e<n;++e)if(d.isDatasetVisible(e)){t=(i=d.getDatasetMeta(e)).data,e!==this.index&&(r=i.controller);break}if(!t)return 0;for(e=0,n=t.length;e<n;++e)a=t[e],r?(r._configure(),o=r._resolveDataElementOptions(a,e)):o=a._options,"inner"!==o.borderAlign&&(s=o.borderWidth,u=(l=o.hoverBorderWidth)>(u=s>u?s:u)?l:u);return u},setHoverStyle:function(t){var e=t._model,n=t._options,i=H.getHoverColor;t.$previousStyle={backgroundColor:e.backgroundColor,borderColor:e.borderColor,borderWidth:e.borderWidth},e.backgroundColor=Lt(n.hoverBackgroundColor,i(n.backgroundColor)),e.borderColor=Lt(n.hoverBorderColor,i(n.borderColor)),e.borderWidth=Lt(n.hoverBorderWidth,n.borderWidth)},_getRingWeightOffset:function(t){for(var e=0,n=0;n<t;++n)this.chart.isDatasetVisible(n)&&(e+=this._getRingWeight(n));return e},_getRingWeight:function(t){return Math.max(Lt(this.chart.data.datasets[t].weight,1),0)},_getVisibleDatasetWeightTotal:function(){return this._getRingWeightOffset(this.chart.data.datasets.length)}});N._set("horizontalBar",{hover:{mode:"index",axis:"y"},scales:{xAxes:[{type:"linear",position:"bottom"}],yAxes:[{type:"category",position:"left",offset:!0,gridLines:{offsetGridLines:!0}}]},elements:{rectangle:{borderSkipped:"left"}},tooltips:{mode:"index",axis:"y"}}),N._set("global",{datasets:{horizontalBar:{categoryPercentage:.8,barPercentage:.9}}});var Et=Tt.extend({_getValueScaleId:function(){return this.getMeta().xAxisID},_getIndexScaleId:function(){return this.getMeta().yAxisID}}),Wt=H.valueOrDefault,Vt=H.options.resolve,Ht=H.canvas._isPointInArea;function jt(t,e){var n=t&&t.options.ticks||{},i=n.reverse,a=void 0===n.min?e:0,r=void 0===n.max?e:0;return{start:i?r:a,end:i?a:r}}function qt(t,e,n){var i=n/2,a=jt(t,i),r=jt(e,i);return{top:r.end,right:a.end,bottom:r.start,left:a.start}}function Ut(t){var e,n,i,a;return H.isObject(t)?(e=t.top,n=t.right,i=t.bottom,a=t.left):e=n=i=a=t,{top:e,right:n,bottom:i,left:a}}N._set("line",{showLines:!0,spanGaps:!1,hover:{mode:"label"},scales:{xAxes:[{type:"category",id:"x-axis-0"}],yAxes:[{type:"linear",id:"y-axis-0"}]}});var Yt=it.extend({datasetElementType:kt.Line,dataElementType:kt.Point,_datasetElementOptions:["backgroundColor","borderCapStyle","borderColor","borderDash","borderDashOffset","borderJoinStyle","borderWidth","cubicInterpolationMode","fill"],_dataElementOptions:{backgroundColor:"pointBackgroundColor",borderColor:"pointBorderColor",borderWidth:"pointBorderWidth",hitRadius:"pointHitRadius",hoverBackgroundColor:"pointHoverBackgroundColor",hoverBorderColor:"pointHoverBorderColor",hoverBorderWidth:"pointHoverBorderWidth",hoverRadius:"pointHoverRadius",pointStyle:"pointStyle",radius:"pointRadius",rotation:"pointRotation"},update:function(t){var e,n,i=this,a=i.getMeta(),r=a.dataset,o=a.data||[],s=i.chart.options,l=i._config,u=i._showLine=Wt(l.showLine,s.showLines);for(i._xScale=i.getScaleForId(a.xAxisID),i._yScale=i.getScaleForId(a.yAxisID),u&&(void 0!==l.tension&&void 0===l.lineTension&&(l.lineTension=l.tension),r._scale=i._yScale,r._datasetIndex=i.index,r._children=o,r._model=i._resolveDatasetElementOptions(r),r.pivot()),e=0,n=o.length;e<n;++e)i.updateElement(o[e],e,t);for(u&&0!==r._model.tension&&i.updateBezierControlPoints(),e=0,n=o.length;e<n;++e)o[e].pivot()},updateElement:function(t,e,n){var i,a,r=this,o=r.getMeta(),s=t.custom||{},l=r.getDataset(),u=r.index,d=l.data[e],h=r._xScale,c=r._yScale,f=o.dataset._model,g=r._resolveDataElementOptions(t,e);i=h.getPixelForValue("object"==typeof d?d:NaN,e,u),a=n?c.getBasePixel():r.calculatePointY(d,e,u),t._xScale=h,t._yScale=c,t._options=g,t._datasetIndex=u,t._index=e,t._model={x:i,y:a,skip:s.skip||isNaN(i)||isNaN(a),radius:g.radius,pointStyle:g.pointStyle,rotation:g.rotation,backgroundColor:g.backgroundColor,borderColor:g.borderColor,borderWidth:g.borderWidth,tension:Wt(s.tension,f?f.tension:0),steppedLine:!!f&&f.steppedLine,hitRadius:g.hitRadius}},_resolveDatasetElementOptions:function(t){var e=this,n=e._config,i=t.custom||{},a=e.chart.options,r=a.elements.line,o=it.prototype._resolveDatasetElementOptions.apply(e,arguments);return o.spanGaps=Wt(n.spanGaps,a.spanGaps),o.tension=Wt(n.lineTension,r.tension),o.steppedLine=Vt([i.steppedLine,n.steppedLine,r.stepped]),o.clip=Ut(Wt(n.clip,qt(e._xScale,e._yScale,o.borderWidth))),o},calculatePointY:function(t,e,n){var i,a,r,o,s,l,u,d=this.chart,h=this._yScale,c=0,f=0;if(h.options.stacked){for(s=+h.getRightValue(t),u=(l=d._getSortedVisibleDatasetMetas()).length,i=0;i<u&&(r=l[i]).index!==n;++i)a=d.data.datasets[r.index],"line"===r.type&&r.yAxisID===h.id&&((o=+h.getRightValue(a.data[e]))<0?f+=o||0:c+=o||0);return s<0?h.getPixelForValue(f+s):h.getPixelForValue(c+s)}return h.getPixelForValue(t)},updateBezierControlPoints:function(){var t,e,n,i,a=this.chart,r=this.getMeta(),o=r.dataset._model,s=a.chartArea,l=r.data||[];function u(t,e,n){return Math.max(Math.min(t,n),e)}if(o.spanGaps&&(l=l.filter((function(t){return!t._model.skip}))),"monotone"===o.cubicInterpolationMode)H.splineCurveMonotone(l);else for(t=0,e=l.length;t<e;++t)n=l[t]._model,i=H.splineCurve(H.previousItem(l,t)._model,n,H.nextItem(l,t)._model,o.tension),n.controlPointPreviousX=i.previous.x,n.controlPointPreviousY=i.previous.y,n.controlPointNextX=i.next.x,n.controlPointNextY=i.next.y;if(a.options.elements.line.capBezierPoints)for(t=0,e=l.length;t<e;++t)n=l[t]._model,Ht(n,s)&&(t>0&&Ht(l[t-1]._model,s)&&(n.controlPointPreviousX=u(n.controlPointPreviousX,s.left,s.right),n.controlPointPreviousY=u(n.controlPointPreviousY,s.top,s.bottom)),t<l.length-1&&Ht(l[t+1]._model,s)&&(n.controlPointNextX=u(n.controlPointNextX,s.left,s.right),n.controlPointNextY=u(n.controlPointNextY,s.top,s.bottom)))},draw:function(){var t,e=this.chart,n=this.getMeta(),i=n.data||[],a=e.chartArea,r=e.canvas,o=0,s=i.length;for(this._showLine&&(t=n.dataset._model.clip,H.canvas.clipArea(e.ctx,{left:!1===t.left?0:a.left-t.left,right:!1===t.right?r.width:a.right+t.right,top:!1===t.top?0:a.top-t.top,bottom:!1===t.bottom?r.height:a.bottom+t.bottom}),n.dataset.draw(),H.canvas.unclipArea(e.ctx));o<s;++o)i[o].draw(a)},setHoverStyle:function(t){var e=t._model,n=t._options,i=H.getHoverColor;t.$previousStyle={backgroundColor:e.backgroundColor,borderColor:e.borderColor,borderWidth:e.borderWidth,radius:e.radius},e.backgroundColor=Wt(n.hoverBackgroundColor,i(n.backgroundColor)),e.borderColor=Wt(n.hoverBorderColor,i(n.borderColor)),e.borderWidth=Wt(n.hoverBorderWidth,n.borderWidth),e.radius=Wt(n.hoverRadius,n.radius)}}),Gt=H.options.resolve;N._set("polarArea",{scale:{type:"radialLinear",angleLines:{display:!1},gridLines:{circular:!0},pointLabels:{display:!1},ticks:{beginAtZero:!0}},animation:{animateRotate:!0,animateScale:!0},startAngle:-.5*Math.PI,legendCallback:function(t){var e,n,i,a=document.createElement("ul"),r=t.data,o=r.datasets,s=r.labels;if(a.setAttribute("class",t.id+"-legend"),o.length)for(e=0,n=o[0].data.length;e<n;++e)(i=a.appendChild(document.createElement("li"))).appendChild(document.createElement("span")).style.backgroundColor=o[0].backgroundColor[e],s[e]&&i.appendChild(document.createTextNode(s[e]));return a.outerHTML},legend:{labels:{generateLabels:function(t){var e=t.data;return e.labels.length&&e.datasets.length?e.labels.map((function(n,i){var a=t.getDatasetMeta(0),r=a.controller.getStyle(i);return{text:n,fillStyle:r.backgroundColor,strokeStyle:r.borderColor,lineWidth:r.borderWidth,hidden:isNaN(e.datasets[0].data[i])||a.data[i].hidden,index:i}})):[]}},onClick:function(t,e){var n,i,a,r=e.index,o=this.chart;for(n=0,i=(o.data.datasets||[]).length;n<i;++n)(a=o.getDatasetMeta(n)).data[r].hidden=!a.data[r].hidden;o.update()}},tooltips:{callbacks:{title:function(){return""},label:function(t,e){return e.labels[t.index]+": "+t.yLabel}}}});var Xt=it.extend({dataElementType:kt.Arc,linkScales:H.noop,_dataElementOptions:["backgroundColor","borderColor","borderWidth","borderAlign","hoverBackgroundColor","hoverBorderColor","hoverBorderWidth"],_getIndexScaleId:function(){return this.chart.scale.id},_getValueScaleId:function(){return this.chart.scale.id},update:function(t){var e,n,i,a=this,r=a.getDataset(),o=a.getMeta(),s=a.chart.options.startAngle||0,l=a._starts=[],u=a._angles=[],d=o.data;for(a._updateRadius(),o.count=a.countVisibleElements(),e=0,n=r.data.length;e<n;e++)l[e]=s,i=a._computeAngle(e),u[e]=i,s+=i;for(e=0,n=d.length;e<n;++e)d[e]._options=a._resolveDataElementOptions(d[e],e),a.updateElement(d[e],e,t)},_updateRadius:function(){var t=this,e=t.chart,n=e.chartArea,i=e.options,a=Math.min(n.right-n.left,n.bottom-n.top);e.outerRadius=Math.max(a/2,0),e.innerRadius=Math.max(i.cutoutPercentage?e.outerRadius/100*i.cutoutPercentage:1,0),e.radiusLength=(e.outerRadius-e.innerRadius)/e.getVisibleDatasetCount(),t.outerRadius=e.outerRadius-e.radiusLength*t.index,t.innerRadius=t.outerRadius-e.radiusLength},updateElement:function(t,e,n){var i=this,a=i.chart,r=i.getDataset(),o=a.options,s=o.animation,l=a.scale,u=a.data.labels,d=l.xCenter,h=l.yCenter,c=o.startAngle,f=t.hidden?0:l.getDistanceFromCenterForValue(r.data[e]),g=i._starts[e],p=g+(t.hidden?0:i._angles[e]),m=s.animateScale?0:l.getDistanceFromCenterForValue(r.data[e]),v=t._options||{};H.extend(t,{_datasetIndex:i.index,_index:e,_scale:l,_model:{backgroundColor:v.backgroundColor,borderColor:v.borderColor,borderWidth:v.borderWidth,borderAlign:v.borderAlign,x:d,y:h,innerRadius:0,outerRadius:n?m:f,startAngle:n&&s.animateRotate?c:g,endAngle:n&&s.animateRotate?c:p,label:H.valueAtIndexOrDefault(u,e,u[e])}}),t.pivot()},countVisibleElements:function(){var t=this.getDataset(),e=this.getMeta(),n=0;return H.each(e.data,(function(e,i){isNaN(t.data[i])||e.hidden||n++})),n},setHoverStyle:function(t){var e=t._model,n=t._options,i=H.getHoverColor,a=H.valueOrDefault;t.$previousStyle={backgroundColor:e.backgroundColor,borderColor:e.borderColor,borderWidth:e.borderWidth},e.backgroundColor=a(n.hoverBackgroundColor,i(n.backgroundColor)),e.borderColor=a(n.hoverBorderColor,i(n.borderColor)),e.borderWidth=a(n.hoverBorderWidth,n.borderWidth)},_computeAngle:function(t){var e=this,n=this.getMeta().count,i=e.getDataset(),a=e.getMeta();if(isNaN(i.data[t])||a.data[t].hidden)return 0;var r={chart:e.chart,dataIndex:t,dataset:i,datasetIndex:e.index};return Gt([e.chart.options.elements.arc.angle,2*Math.PI/n],r,t)}});N._set("pie",H.clone(N.doughnut)),N._set("pie",{cutoutPercentage:0});var Kt=Bt,Zt=H.valueOrDefault;N._set("radar",{spanGaps:!1,scale:{type:"radialLinear"},elements:{line:{fill:"start",tension:0}}});var $t=it.extend({datasetElementType:kt.Line,dataElementType:kt.Point,linkScales:H.noop,_datasetElementOptions:["backgroundColor","borderWidth","borderColor","borderCapStyle","borderDash","borderDashOffset","borderJoinStyle","fill"],_dataElementOptions:{backgroundColor:"pointBackgroundColor",borderColor:"pointBorderColor",borderWidth:"pointBorderWidth",hitRadius:"pointHitRadius",hoverBackgroundColor:"pointHoverBackgroundColor",hoverBorderColor:"pointHoverBorderColor",hoverBorderWidth:"pointHoverBorderWidth",hoverRadius:"pointHoverRadius",pointStyle:"pointStyle",radius:"pointRadius",rotation:"pointRotation"},_getIndexScaleId:function(){return this.chart.scale.id},_getValueScaleId:function(){return this.chart.scale.id},update:function(t){var e,n,i=this,a=i.getMeta(),r=a.dataset,o=a.data||[],s=i.chart.scale,l=i._config;for(void 0!==l.tension&&void 0===l.lineTension&&(l.lineTension=l.tension),r._scale=s,r._datasetIndex=i.index,r._children=o,r._loop=!0,r._model=i._resolveDatasetElementOptions(r),r.pivot(),e=0,n=o.length;e<n;++e)i.updateElement(o[e],e,t);for(i.updateBezierControlPoints(),e=0,n=o.length;e<n;++e)o[e].pivot()},updateElement:function(t,e,n){var i=this,a=t.custom||{},r=i.getDataset(),o=i.chart.scale,s=o.getPointPositionForValue(e,r.data[e]),l=i._resolveDataElementOptions(t,e),u=i.getMeta().dataset._model,d=n?o.xCenter:s.x,h=n?o.yCenter:s.y;t._scale=o,t._options=l,t._datasetIndex=i.index,t._index=e,t._model={x:d,y:h,skip:a.skip||isNaN(d)||isNaN(h),radius:l.radius,pointStyle:l.pointStyle,rotation:l.rotation,backgroundColor:l.backgroundColor,borderColor:l.borderColor,borderWidth:l.borderWidth,tension:Zt(a.tension,u?u.tension:0),hitRadius:l.hitRadius}},_resolveDatasetElementOptions:function(){var t=this,e=t._config,n=t.chart.options,i=it.prototype._resolveDatasetElementOptions.apply(t,arguments);return i.spanGaps=Zt(e.spanGaps,n.spanGaps),i.tension=Zt(e.lineTension,n.elements.line.tension),i},updateBezierControlPoints:function(){var t,e,n,i,a=this.getMeta(),r=this.chart.chartArea,o=a.data||[];function s(t,e,n){return Math.max(Math.min(t,n),e)}for(a.dataset._model.spanGaps&&(o=o.filter((function(t){return!t._model.skip}))),t=0,e=o.length;t<e;++t)n=o[t]._model,i=H.splineCurve(H.previousItem(o,t,!0)._model,n,H.nextItem(o,t,!0)._model,n.tension),n.controlPointPreviousX=s(i.previous.x,r.left,r.right),n.controlPointPreviousY=s(i.previous.y,r.top,r.bottom),n.controlPointNextX=s(i.next.x,r.left,r.right),n.controlPointNextY=s(i.next.y,r.top,r.bottom)},setHoverStyle:function(t){var e=t._model,n=t._options,i=H.getHoverColor;t.$previousStyle={backgroundColor:e.backgroundColor,borderColor:e.borderColor,borderWidth:e.borderWidth,radius:e.radius},e.backgroundColor=Zt(n.hoverBackgroundColor,i(n.backgroundColor)),e.borderColor=Zt(n.hoverBorderColor,i(n.borderColor)),e.borderWidth=Zt(n.hoverBorderWidth,n.borderWidth),e.radius=Zt(n.hoverRadius,n.radius)}});N._set("scatter",{hover:{mode:"single"},scales:{xAxes:[{id:"x-axis-1",type:"linear",position:"bottom"}],yAxes:[{id:"y-axis-1",type:"linear",position:"left"}]},tooltips:{callbacks:{title:function(){return""},label:function(t){return"("+t.xLabel+", "+t.yLabel+")"}}}}),N._set("global",{datasets:{scatter:{showLine:!1}}});var Jt={bar:Tt,bubble:Ot,doughnut:Bt,horizontalBar:Et,line:Yt,polarArea:Xt,pie:Kt,radar:$t,scatter:Yt};function Qt(t,e){return t.native?{x:t.x,y:t.y}:H.getRelativePosition(t,e)}function te(t,e){var n,i,a,r,o,s,l=t._getSortedVisibleDatasetMetas();for(i=0,r=l.length;i<r;++i)for(a=0,o=(n=l[i].data).length;a<o;++a)(s=n[a])._view.skip||e(s)}function ee(t,e){var n=[];return te(t,(function(t){t.inRange(e.x,e.y)&&n.push(t)})),n}function ne(t,e,n,i){var a=Number.POSITIVE_INFINITY,r=[];return te(t,(function(t){if(!n||t.inRange(e.x,e.y)){var o=t.getCenterPoint(),s=i(e,o);s<a?(r=[t],a=s):s===a&&r.push(t)}})),r}function ie(t){var e=-1!==t.indexOf("x"),n=-1!==t.indexOf("y");return function(t,i){var a=e?Math.abs(t.x-i.x):0,r=n?Math.abs(t.y-i.y):0;return Math.sqrt(Math.pow(a,2)+Math.pow(r,2))}}function ae(t,e,n){var i=Qt(e,t);n.axis=n.axis||"x";var a=ie(n.axis),r=n.intersect?ee(t,i):ne(t,i,!1,a),o=[];return r.length?(t._getSortedVisibleDatasetMetas().forEach((function(t){var e=t.data[r[0]._index];e&&!e._view.skip&&o.push(e)})),o):[]}var re={modes:{single:function(t,e){var n=Qt(e,t),i=[];return te(t,(function(t){if(t.inRange(n.x,n.y))return i.push(t),i})),i.slice(0,1)},label:ae,index:ae,dataset:function(t,e,n){var i=Qt(e,t);n.axis=n.axis||"xy";var a=ie(n.axis),r=n.intersect?ee(t,i):ne(t,i,!1,a);return r.length>0&&(r=t.getDatasetMeta(r[0]._datasetIndex).data),r},"x-axis":function(t,e){return ae(t,e,{intersect:!1})},point:function(t,e){return ee(t,Qt(e,t))},nearest:function(t,e,n){var i=Qt(e,t);n.axis=n.axis||"xy";var a=ie(n.axis);return ne(t,i,n.intersect,a)},x:function(t,e,n){var i=Qt(e,t),a=[],r=!1;return te(t,(function(t){t.inXRange(i.x)&&a.push(t),t.inRange(i.x,i.y)&&(r=!0)})),n.intersect&&!r&&(a=[]),a},y:function(t,e,n){var i=Qt(e,t),a=[],r=!1;return te(t,(function(t){t.inYRange(i.y)&&a.push(t),t.inRange(i.x,i.y)&&(r=!0)})),n.intersect&&!r&&(a=[]),a}}},oe=H.extend;function se(t,e){return H.where(t,(function(t){return t.pos===e}))}function le(t,e){return t.sort((function(t,n){var i=e?n:t,a=e?t:n;return i.weight===a.weight?i.index-a.index:i.weight-a.weight}))}function ue(t,e,n,i){return Math.max(t[n],e[n])+Math.max(t[i],e[i])}function de(t,e,n){var i,a,r=n.box,o=t.maxPadding;if(n.size&&(t[n.pos]-=n.size),n.size=n.horizontal?r.height:r.width,t[n.pos]+=n.size,r.getPadding){var s=r.getPadding();o.top=Math.max(o.top,s.top),o.left=Math.max(o.left,s.left),o.bottom=Math.max(o.bottom,s.bottom),o.right=Math.max(o.right,s.right)}if(i=e.outerWidth-ue(o,t,"left","right"),a=e.outerHeight-ue(o,t,"top","bottom"),i!==t.w||a!==t.h){t.w=i,t.h=a;var l=n.horizontal?[i,t.w]:[a,t.h];return!(l[0]===l[1]||isNaN(l[0])&&isNaN(l[1]))}}function he(t,e){var n=e.maxPadding;function i(t){var i={left:0,top:0,right:0,bottom:0};return t.forEach((function(t){i[t]=Math.max(e[t],n[t])})),i}return i(t?["left","right"]:["top","bottom"])}function ce(t,e,n){var i,a,r,o,s,l,u=[];for(i=0,a=t.length;i<a;++i)(o=(r=t[i]).box).update(r.width||e.w,r.height||e.h,he(r.horizontal,e)),de(e,n,r)&&(l=!0,u.length&&(s=!0)),o.fullWidth||u.push(r);return s&&ce(u,e,n)||l}function fe(t,e,n){var i,a,r,o,s=n.padding,l=e.x,u=e.y;for(i=0,a=t.length;i<a;++i)o=(r=t[i]).box,r.horizontal?(o.left=o.fullWidth?s.left:e.left,o.right=o.fullWidth?n.outerWidth-s.right:e.left+e.w,o.top=u,o.bottom=u+o.height,o.width=o.right-o.left,u=o.bottom):(o.left=l,o.right=l+o.width,o.top=e.top,o.bottom=e.top+e.h,o.height=o.bottom-o.top,l=o.right);e.x=l,e.y=u}N._set("global",{layout:{padding:{top:0,right:0,bottom:0,left:0}}});var ge,pe={defaults:{},addBox:function(t,e){t.boxes||(t.boxes=[]),e.fullWidth=e.fullWidth||!1,e.position=e.position||"top",e.weight=e.weight||0,e._layers=e._layers||function(){return[{z:0,draw:function(){e.draw.apply(e,arguments)}}]},t.boxes.push(e)},removeBox:function(t,e){var n=t.boxes?t.boxes.indexOf(e):-1;-1!==n&&t.boxes.splice(n,1)},configure:function(t,e,n){for(var i,a=["fullWidth","position","weight"],r=a.length,o=0;o<r;++o)i=a[o],n.hasOwnProperty(i)&&(e[i]=n[i])},update:function(t,e,n){if(t){var i=t.options.layout||{},a=H.options.toPadding(i.padding),r=e-a.width,o=n-a.height,s=function(t){var e=function(t){var e,n,i,a=[];for(e=0,n=(t||[]).length;e<n;++e)i=t[e],a.push({index:e,box:i,pos:i.position,horizontal:i.isHorizontal(),weight:i.weight});return a}(t),n=le(se(e,"left"),!0),i=le(se(e,"right")),a=le(se(e,"top"),!0),r=le(se(e,"bottom"));return{leftAndTop:n.concat(a),rightAndBottom:i.concat(r),chartArea:se(e,"chartArea"),vertical:n.concat(i),horizontal:a.concat(r)}}(t.boxes),l=s.vertical,u=s.horizontal,d=Object.freeze({outerWidth:e,outerHeight:n,padding:a,availableWidth:r,vBoxMaxWidth:r/2/l.length,hBoxMaxHeight:o/2}),h=oe({maxPadding:oe({},a),w:r,h:o,x:a.left,y:a.top},a);!function(t,e){var n,i,a;for(n=0,i=t.length;n<i;++n)(a=t[n]).width=a.horizontal?a.box.fullWidth&&e.availableWidth:e.vBoxMaxWidth,a.height=a.horizontal&&e.hBoxMaxHeight}(l.concat(u),d),ce(l,h,d),ce(u,h,d)&&ce(l,h,d),function(t){var e=t.maxPadding;function n(n){var i=Math.max(e[n]-t[n],0);return t[n]+=i,i}t.y+=n("top"),t.x+=n("left"),n("right"),n("bottom")}(h),fe(s.leftAndTop,h,d),h.x+=h.w,h.y+=h.h,fe(s.rightAndBottom,h,d),t.chartArea={left:h.left,top:h.top,right:h.left+h.w,bottom:h.top+h.h},H.each(s.chartArea,(function(e){var n=e.box;oe(n,t.chartArea),n.update(h.w,h.h)}))}}},me=(ge=Object.freeze({__proto__:null,default:"@keyframes chartjs-render-animation{from{opacity:.99}to{opacity:1}}.chartjs-render-monitor{animation:chartjs-render-animation 1ms}.chartjs-size-monitor,.chartjs-size-monitor-expand,.chartjs-size-monitor-shrink{position:absolute;direction:ltr;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1}.chartjs-size-monitor-expand>div{position:absolute;width:1000000px;height:1000000px;left:0;top:0}.chartjs-size-monitor-shrink>div{position:absolute;width:200%;height:200%;left:0;top:0}"}))&&ge.default||ge,ve="$chartjs",be="chartjs-size-monitor",xe="chartjs-render-monitor",ye="chartjs-render-animation",_e=["animationstart","webkitAnimationStart"],ke={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"};function we(t,e){var n=H.getStyle(t,e),i=n&&n.match(/^(\d+)(\.\d+)?px$/);return i?Number(i[1]):void 0}var Me=!!function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("e",null,e)}catch(t){}return t}()&&{passive:!0};function Se(t,e,n){t.addEventListener(e,n,Me)}function Ce(t,e,n){t.removeEventListener(e,n,Me)}function Pe(t,e,n,i,a){return{type:t,chart:e,native:a||null,x:void 0!==n?n:null,y:void 0!==i?i:null}}function Ae(t){var e=document.createElement("div");return e.className=t||"",e}function De(t,e,n){var i,a,r,o,s=t[ve]||(t[ve]={}),l=s.resizer=function(t){var e=Ae(be),n=Ae(be+"-expand"),i=Ae(be+"-shrink");n.appendChild(Ae()),i.appendChild(Ae()),e.appendChild(n),e.appendChild(i),e._reset=function(){n.scrollLeft=1e6,n.scrollTop=1e6,i.scrollLeft=1e6,i.scrollTop=1e6};var a=function(){e._reset(),t()};return Se(n,"scroll",a.bind(n,"expand")),Se(i,"scroll",a.bind(i,"shrink")),e}((i=function(){if(s.resizer){var i=n.options.maintainAspectRatio&&t.parentNode,a=i?i.clientWidth:0;e(Pe("resize",n)),i&&i.clientWidth<a&&n.canvas&&e(Pe("resize",n))}},r=!1,o=[],function(){o=Array.prototype.slice.call(arguments),a=a||this,r||(r=!0,H.requestAnimFrame.call(window,(function(){r=!1,i.apply(a,o)})))}));!function(t,e){var n=t[ve]||(t[ve]={}),i=n.renderProxy=function(t){t.animationName===ye&&e()};H.each(_e,(function(e){Se(t,e,i)})),n.reflow=!!t.offsetParent,t.classList.add(xe)}(t,(function(){if(s.resizer){var e=t.parentNode;e&&e!==l.parentNode&&e.insertBefore(l,e.firstChild),l._reset()}}))}function Te(t){var e=t[ve]||{},n=e.resizer;delete e.resizer,function(t){var e=t[ve]||{},n=e.renderProxy;n&&(H.each(_e,(function(e){Ce(t,e,n)})),delete e.renderProxy),t.classList.remove(xe)}(t),n&&n.parentNode&&n.parentNode.removeChild(n)}var Ie={disableCSSInjection:!1,_enabled:"undefined"!=typeof window&&"undefined"!=typeof document,_ensureLoaded:function(t){if(!this.disableCSSInjection){var e=t.getRootNode?t.getRootNode():document;!function(t,e){var n=t[ve]||(t[ve]={});if(!n.containsStyles){n.containsStyles=!0,e="/* Chart.js */\n"+e;var i=document.createElement("style");i.setAttribute("type","text/css"),i.appendChild(document.createTextNode(e)),t.appendChild(i)}}(e.host?e:document.head,me)}},acquireContext:function(t,e){"string"==typeof t?t=document.getElementById(t):t.length&&(t=t[0]),t&&t.canvas&&(t=t.canvas);var n=t&&t.getContext&&t.getContext("2d");return n&&n.canvas===t?(this._ensureLoaded(t),function(t,e){var n=t.style,i=t.getAttribute("height"),a=t.getAttribute("width");if(t[ve]={initial:{height:i,width:a,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||"block",null===a||""===a){var r=we(t,"width");void 0!==r&&(t.width=r)}if(null===i||""===i)if(""===t.style.height)t.height=t.width/(e.options.aspectRatio||2);else{var o=we(t,"height");void 0!==r&&(t.height=o)}}(t,e),n):null},releaseContext:function(t){var e=t.canvas;if(e[ve]){var n=e[ve].initial;["height","width"].forEach((function(t){var i=n[t];H.isNullOrUndef(i)?e.removeAttribute(t):e.setAttribute(t,i)})),H.each(n.style||{},(function(t,n){e.style[n]=t})),e.width=e.width,delete e[ve]}},addEventListener:function(t,e,n){var i=t.canvas;if("resize"!==e){var a=n[ve]||(n[ve]={});Se(i,e,(a.proxies||(a.proxies={}))[t.id+"_"+e]=function(e){n(function(t,e){var n=ke[t.type]||t.type,i=H.getRelativePosition(t,e);return Pe(n,e,i.x,i.y,t)}(e,t))})}else De(i,n,t)},removeEventListener:function(t,e,n){var i=t.canvas;if("resize"!==e){var a=((n[ve]||{}).proxies||{})[t.id+"_"+e];a&&Ce(i,e,a)}else Te(i)}};H.addEvent=Se,H.removeEvent=Ce;var Fe=Ie._enabled?Ie:{acquireContext:function(t){return t&&t.canvas&&(t=t.canvas),t&&t.getContext("2d")||null}},Oe=H.extend({initialize:function(){},acquireContext:function(){},releaseContext:function(){},addEventListener:function(){},removeEventListener:function(){}},Fe);N._set("global",{plugins:{}});var Le={_plugins:[],_cacheId:0,register:function(t){var e=this._plugins;[].concat(t).forEach((function(t){-1===e.indexOf(t)&&e.push(t)})),this._cacheId++},unregister:function(t){var e=this._plugins;[].concat(t).forEach((function(t){var n=e.indexOf(t);-1!==n&&e.splice(n,1)})),this._cacheId++},clear:function(){this._plugins=[],this._cacheId++},count:function(){return this._plugins.length},getAll:function(){return this._plugins},notify:function(t,e,n){var i,a,r,o,s,l=this.descriptors(t),u=l.length;for(i=0;i<u;++i)if("function"==typeof(s=(r=(a=l[i]).plugin)[e])&&((o=[t].concat(n||[])).push(a.options),!1===s.apply(r,o)))return!1;return!0},descriptors:function(t){var e=t.$plugins||(t.$plugins={});if(e.id===this._cacheId)return e.descriptors;var n=[],i=[],a=t&&t.config||{},r=a.options&&a.options.plugins||{};return this._plugins.concat(a.plugins||[]).forEach((function(t){if(-1===n.indexOf(t)){var e=t.id,a=r[e];!1!==a&&(!0===a&&(a=H.clone(N.global.plugins[e])),n.push(t),i.push({plugin:t,options:a||{}}))}})),e.descriptors=i,e.id=this._cacheId,i},_invalidate:function(t){delete t.$plugins}},Re={constructors:{},defaults:{},registerScaleType:function(t,e,n){this.constructors[t]=e,this.defaults[t]=H.clone(n)},getScaleConstructor:function(t){return this.constructors.hasOwnProperty(t)?this.constructors[t]:void 0},getScaleDefaults:function(t){return this.defaults.hasOwnProperty(t)?H.merge(Object.create(null),[N.scale,this.defaults[t]]):{}},updateScaleDefaults:function(t,e){this.defaults.hasOwnProperty(t)&&(this.defaults[t]=H.extend(this.defaults[t],e))},addScalesToLayout:function(t){H.each(t.scales,(function(e){e.fullWidth=e.options.fullWidth,e.position=e.options.position,e.weight=e.options.weight,pe.addBox(t,e)}))}},ze=H.valueOrDefault,Ne=H.rtl.getRtlAdapter;N._set("global",{tooltips:{enabled:!0,custom:null,mode:"nearest",position:"average",intersect:!0,backgroundColor:"rgba(0,0,0,0.8)",titleFontStyle:"bold",titleSpacing:2,titleMarginBottom:6,titleFontColor:"#fff",titleAlign:"left",bodySpacing:2,bodyFontColor:"#fff",bodyAlign:"left",footerFontStyle:"bold",footerSpacing:2,footerMarginTop:6,footerFontColor:"#fff",footerAlign:"left",yPadding:6,xPadding:6,caretPadding:2,caretSize:5,cornerRadius:6,multiKeyBackground:"#fff",displayColors:!0,borderColor:"rgba(0,0,0,0)",borderWidth:0,callbacks:{beforeTitle:H.noop,title:function(t,e){var n="",i=e.labels,a=i?i.length:0;if(t.length>0){var r=t[0];r.label?n=r.label:r.xLabel?n=r.xLabel:a>0&&r.index<a&&(n=i[r.index])}return n},afterTitle:H.noop,beforeBody:H.noop,beforeLabel:H.noop,label:function(t,e){var n=e.datasets[t.datasetIndex].label||"";return n&&(n+=": "),H.isNullOrUndef(t.value)?n+=t.yLabel:n+=t.value,n},labelColor:function(t,e){var n=e.getDatasetMeta(t.datasetIndex).data[t.index]._view;return{borderColor:n.borderColor,backgroundColor:n.backgroundColor}},labelTextColor:function(){return this._options.bodyFontColor},afterLabel:H.noop,afterBody:H.noop,beforeFooter:H.noop,footer:H.noop,afterFooter:H.noop}}});var Be={average:function(t){if(!t.length)return!1;var e,n,i=0,a=0,r=0;for(e=0,n=t.length;e<n;++e){var o=t[e];if(o&&o.hasValue()){var s=o.tooltipPosition();i+=s.x,a+=s.y,++r}}return{x:i/r,y:a/r}},nearest:function(t,e){var n,i,a,r=e.x,o=e.y,s=Number.POSITIVE_INFINITY;for(n=0,i=t.length;n<i;++n){var l=t[n];if(l&&l.hasValue()){var u=l.getCenterPoint(),d=H.distanceBetweenPoints(e,u);d<s&&(s=d,a=l)}}if(a){var h=a.tooltipPosition();r=h.x,o=h.y}return{x:r,y:o}}};function Ee(t,e){return e&&(H.isArray(e)?Array.prototype.push.apply(t,e):t.push(e)),t}function We(t){return("string"==typeof t||t instanceof String)&&t.indexOf("\n")>-1?t.split("\n"):t}function Ve(t){var e=N.global;return{xPadding:t.xPadding,yPadding:t.yPadding,xAlign:t.xAlign,yAlign:t.yAlign,rtl:t.rtl,textDirection:t.textDirection,bodyFontColor:t.bodyFontColor,_bodyFontFamily:ze(t.bodyFontFamily,e.defaultFontFamily),_bodyFontStyle:ze(t.bodyFontStyle,e.defaultFontStyle),_bodyAlign:t.bodyAlign,bodyFontSize:ze(t.bodyFontSize,e.defaultFontSize),bodySpacing:t.bodySpacing,titleFontColor:t.titleFontColor,_titleFontFamily:ze(t.titleFontFamily,e.defaultFontFamily),_titleFontStyle:ze(t.titleFontStyle,e.defaultFontStyle),titleFontSize:ze(t.titleFontSize,e.defaultFontSize),_titleAlign:t.titleAlign,titleSpacing:t.titleSpacing,titleMarginBottom:t.titleMarginBottom,footerFontColor:t.footerFontColor,_footerFontFamily:ze(t.footerFontFamily,e.defaultFontFamily),_footerFontStyle:ze(t.footerFontStyle,e.defaultFontStyle),footerFontSize:ze(t.footerFontSize,e.defaultFontSize),_footerAlign:t.footerAlign,footerSpacing:t.footerSpacing,footerMarginTop:t.footerMarginTop,caretSize:t.caretSize,cornerRadius:t.cornerRadius,backgroundColor:t.backgroundColor,opacity:0,legendColorBackground:t.multiKeyBackground,displayColors:t.displayColors,borderColor:t.borderColor,borderWidth:t.borderWidth}}function He(t,e){return"center"===e?t.x+t.width/2:"right"===e?t.x+t.width-t.xPadding:t.x+t.xPadding}function je(t){return Ee([],We(t))}var qe=K.extend({initialize:function(){this._model=Ve(this._options),this._lastActive=[]},getTitle:function(){var t=this,e=t._options,n=e.callbacks,i=n.beforeTitle.apply(t,arguments),a=n.title.apply(t,arguments),r=n.afterTitle.apply(t,arguments),o=[];return o=Ee(o,We(i)),o=Ee(o,We(a)),o=Ee(o,We(r))},getBeforeBody:function(){return je(this._options.callbacks.beforeBody.apply(this,arguments))},getBody:function(t,e){var n=this,i=n._options.callbacks,a=[];return H.each(t,(function(t){var r={before:[],lines:[],after:[]};Ee(r.before,We(i.beforeLabel.call(n,t,e))),Ee(r.lines,i.label.call(n,t,e)),Ee(r.after,We(i.afterLabel.call(n,t,e))),a.push(r)})),a},getAfterBody:function(){return je(this._options.callbacks.afterBody.apply(this,arguments))},getFooter:function(){var t=this,e=t._options.callbacks,n=e.beforeFooter.apply(t,arguments),i=e.footer.apply(t,arguments),a=e.afterFooter.apply(t,arguments),r=[];return r=Ee(r,We(n)),r=Ee(r,We(i)),r=Ee(r,We(a))},update:function(t){var e,n,i,a,r,o,s,l,u,d,h=this,c=h._options,f=h._model,g=h._model=Ve(c),p=h._active,m=h._data,v={xAlign:f.xAlign,yAlign:f.yAlign},b={x:f.x,y:f.y},x={width:f.width,height:f.height},y={x:f.caretX,y:f.caretY};if(p.length){g.opacity=1;var _=[],k=[];y=Be[c.position].call(h,p,h._eventPosition);var w=[];for(e=0,n=p.length;e<n;++e)w.push((i=p[e],a=void 0,r=void 0,o=void 0,s=void 0,l=void 0,u=void 0,d=void 0,a=i._xScale,r=i._yScale||i._scale,o=i._index,s=i._datasetIndex,l=i._chart.getDatasetMeta(s).controller,u=l._getIndexScale(),d=l._getValueScale(),{xLabel:a?a.getLabelForIndex(o,s):"",yLabel:r?r.getLabelForIndex(o,s):"",label:u?""+u.getLabelForIndex(o,s):"",value:d?""+d.getLabelForIndex(o,s):"",index:o,datasetIndex:s,x:i._model.x,y:i._model.y}));c.filter&&(w=w.filter((function(t){return c.filter(t,m)}))),c.itemSort&&(w=w.sort((function(t,e){return c.itemSort(t,e,m)}))),H.each(w,(function(t){_.push(c.callbacks.labelColor.call(h,t,h._chart)),k.push(c.callbacks.labelTextColor.call(h,t,h._chart))})),g.title=h.getTitle(w,m),g.beforeBody=h.getBeforeBody(w,m),g.body=h.getBody(w,m),g.afterBody=h.getAfterBody(w,m),g.footer=h.getFooter(w,m),g.x=y.x,g.y=y.y,g.caretPadding=c.caretPadding,g.labelColors=_,g.labelTextColors=k,g.dataPoints=w,x=function(t,e){var n=t._chart.ctx,i=2*e.yPadding,a=0,r=e.body,o=r.reduce((function(t,e){return t+e.before.length+e.lines.length+e.after.length}),0);o+=e.beforeBody.length+e.afterBody.length;var s=e.title.length,l=e.footer.length,u=e.titleFontSize,d=e.bodyFontSize,h=e.footerFontSize;i+=s*u,i+=s?(s-1)*e.titleSpacing:0,i+=s?e.titleMarginBottom:0,i+=o*d,i+=o?(o-1)*e.bodySpacing:0,i+=l?e.footerMarginTop:0,i+=l*h,i+=l?(l-1)*e.footerSpacing:0;var c=0,f=function(t){a=Math.max(a,n.measureText(t).width+c)};return n.font=H.fontString(u,e._titleFontStyle,e._titleFontFamily),H.each(e.title,f),n.font=H.fontString(d,e._bodyFontStyle,e._bodyFontFamily),H.each(e.beforeBody.concat(e.afterBody),f),c=e.displayColors?d+2:0,H.each(r,(function(t){H.each(t.before,f),H.each(t.lines,f),H.each(t.after,f)})),c=0,n.font=H.fontString(h,e._footerFontStyle,e._footerFontFamily),H.each(e.footer,f),{width:a+=2*e.xPadding,height:i}}(this,g),b=function(t,e,n,i){var a=t.x,r=t.y,o=t.caretSize,s=t.caretPadding,l=t.cornerRadius,u=n.xAlign,d=n.yAlign,h=o+s,c=l+s;return"right"===u?a-=e.width:"center"===u&&((a-=e.width/2)+e.width>i.width&&(a=i.width-e.width),a<0&&(a=0)),"top"===d?r+=h:r-="bottom"===d?e.height+h:e.height/2,"center"===d?"left"===u?a+=h:"right"===u&&(a-=h):"left"===u?a-=c:"right"===u&&(a+=c),{x:a,y:r}}(g,x,v=function(t,e){var n,i,a,r,o,s=t._model,l=t._chart,u=t._chart.chartArea,d="center",h="center";s.y<e.height?h="top":s.y>l.height-e.height&&(h="bottom");var c=(u.left+u.right)/2,f=(u.top+u.bottom)/2;"center"===h?(n=function(t){return t<=c},i=function(t){return t>c}):(n=function(t){return t<=e.width/2},i=function(t){return t>=l.width-e.width/2}),a=function(t){return t+e.width+s.caretSize+s.caretPadding>l.width},r=function(t){return t-e.width-s.caretSize-s.caretPadding<0},o=function(t){return t<=f?"top":"bottom"},n(s.x)?(d="left",a(s.x)&&(d="center",h=o(s.y))):i(s.x)&&(d="right",r(s.x)&&(d="center",h=o(s.y)));var g=t._options;return{xAlign:g.xAlign?g.xAlign:d,yAlign:g.yAlign?g.yAlign:h}}(this,x),h._chart)}else g.opacity=0;return g.xAlign=v.xAlign,g.yAlign=v.yAlign,g.x=b.x,g.y=b.y,g.width=x.width,g.height=x.height,g.caretX=y.x,g.caretY=y.y,h._model=g,t&&c.custom&&c.custom.call(h,g),h},drawCaret:function(t,e){var n=this._chart.ctx,i=this._view,a=this.getCaretPosition(t,e,i);n.lineTo(a.x1,a.y1),n.lineTo(a.x2,a.y2),n.lineTo(a.x3,a.y3)},getCaretPosition:function(t,e,n){var i,a,r,o,s,l,u=n.caretSize,d=n.cornerRadius,h=n.xAlign,c=n.yAlign,f=t.x,g=t.y,p=e.width,m=e.height;if("center"===c)s=g+m/2,"left"===h?(a=(i=f)-u,r=i,o=s+u,l=s-u):(a=(i=f+p)+u,r=i,o=s-u,l=s+u);else if("left"===h?(i=(a=f+d+u)-u,r=a+u):"right"===h?(i=(a=f+p-d-u)-u,r=a+u):(i=(a=n.caretX)-u,r=a+u),"top"===c)s=(o=g)-u,l=o;else{s=(o=g+m)+u,l=o;var v=r;r=i,i=v}return{x1:i,x2:a,x3:r,y1:o,y2:s,y3:l}},drawTitle:function(t,e,n){var i,a,r,o=e.title,s=o.length;if(s){var l=Ne(e.rtl,e.x,e.width);for(t.x=He(e,e._titleAlign),n.textAlign=l.textAlign(e._titleAlign),n.textBaseline="middle",i=e.titleFontSize,a=e.titleSpacing,n.fillStyle=e.titleFontColor,n.font=H.fontString(i,e._titleFontStyle,e._titleFontFamily),r=0;r<s;++r)n.fillText(o[r],l.x(t.x),t.y+i/2),t.y+=i+a,r+1===s&&(t.y+=e.titleMarginBottom-a)}},drawBody:function(t,e,n){var i,a,r,o,s,l,u,d,h=e.bodyFontSize,c=e.bodySpacing,f=e._bodyAlign,g=e.body,p=e.displayColors,m=0,v=p?He(e,"left"):0,b=Ne(e.rtl,e.x,e.width),x=function(e){n.fillText(e,b.x(t.x+m),t.y+h/2),t.y+=h+c},y=b.textAlign(f);for(n.textAlign=f,n.textBaseline="middle",n.font=H.fontString(h,e._bodyFontStyle,e._bodyFontFamily),t.x=He(e,y),n.fillStyle=e.bodyFontColor,H.each(e.beforeBody,x),m=p&&"right"!==y?"center"===f?h/2+1:h+2:0,s=0,u=g.length;s<u;++s){for(i=g[s],a=e.labelTextColors[s],r=e.labelColors[s],n.fillStyle=a,H.each(i.before,x),l=0,d=(o=i.lines).length;l<d;++l){if(p){var _=b.x(v);n.fillStyle=e.legendColorBackground,n.fillRect(b.leftForLtr(_,h),t.y,h,h),n.lineWidth=1,n.strokeStyle=r.borderColor,n.strokeRect(b.leftForLtr(_,h),t.y,h,h),n.fillStyle=r.backgroundColor,n.fillRect(b.leftForLtr(b.xPlus(_,1),h-2),t.y+1,h-2,h-2),n.fillStyle=a}x(o[l])}H.each(i.after,x)}m=0,H.each(e.afterBody,x),t.y-=c},drawFooter:function(t,e,n){var i,a,r=e.footer,o=r.length;if(o){var s=Ne(e.rtl,e.x,e.width);for(t.x=He(e,e._footerAlign),t.y+=e.footerMarginTop,n.textAlign=s.textAlign(e._footerAlign),n.textBaseline="middle",i=e.footerFontSize,n.fillStyle=e.footerFontColor,n.font=H.fontString(i,e._footerFontStyle,e._footerFontFamily),a=0;a<o;++a)n.fillText(r[a],s.x(t.x),t.y+i/2),t.y+=i+e.footerSpacing}},drawBackground:function(t,e,n,i){n.fillStyle=e.backgroundColor,n.strokeStyle=e.borderColor,n.lineWidth=e.borderWidth;var a=e.xAlign,r=e.yAlign,o=t.x,s=t.y,l=i.width,u=i.height,d=e.cornerRadius;n.beginPath(),n.moveTo(o+d,s),"top"===r&&this.drawCaret(t,i),n.lineTo(o+l-d,s),n.quadraticCurveTo(o+l,s,o+l,s+d),"center"===r&&"right"===a&&this.drawCaret(t,i),n.lineTo(o+l,s+u-d),n.quadraticCurveTo(o+l,s+u,o+l-d,s+u),"bottom"===r&&this.drawCaret(t,i),n.lineTo(o+d,s+u),n.quadraticCurveTo(o,s+u,o,s+u-d),"center"===r&&"left"===a&&this.drawCaret(t,i),n.lineTo(o,s+d),n.quadraticCurveTo(o,s,o+d,s),n.closePath(),n.fill(),e.borderWidth>0&&n.stroke()},draw:function(){var t=this._chart.ctx,e=this._view;if(0!==e.opacity){var n={width:e.width,height:e.height},i={x:e.x,y:e.y},a=Math.abs(e.opacity<.001)?0:e.opacity,r=e.title.length||e.beforeBody.length||e.body.length||e.afterBody.length||e.footer.length;this._options.enabled&&r&&(t.save(),t.globalAlpha=a,this.drawBackground(i,e,t,n),i.y+=e.yPadding,H.rtl.overrideTextDirection(t,e.textDirection),this.drawTitle(i,e,t),this.drawBody(i,e,t),this.drawFooter(i,e,t),H.rtl.restoreTextDirection(t,e.textDirection),t.restore())}},handleEvent:function(t){var e,n=this,i=n._options;return n._lastActive=n._lastActive||[],"mouseout"===t.type?n._active=[]:(n._active=n._chart.getElementsAtEventForMode(t,i.mode,i),i.reverse&&n._active.reverse()),(e=!H.arrayEquals(n._active,n._lastActive))&&(n._lastActive=n._active,(i.enabled||i.custom)&&(n._eventPosition={x:t.x,y:t.y},n.update(!0),n.pivot())),e}}),Ue=Be,Ye=qe;Ye.positioners=Ue;var Ge=H.valueOrDefault;function Xe(){return H.merge(Object.create(null),[].slice.call(arguments),{merger:function(t,e,n,i){if("xAxes"===t||"yAxes"===t){var a,r,o,s=n[t].length;for(e[t]||(e[t]=[]),a=0;a<s;++a)o=n[t][a],r=Ge(o.type,"xAxes"===t?"category":"linear"),a>=e[t].length&&e[t].push({}),!e[t][a].type||o.type&&o.type!==e[t][a].type?H.merge(e[t][a],[Re.getScaleDefaults(r),o]):H.merge(e[t][a],o)}else H._merger(t,e,n,i)}})}function Ke(){return H.merge(Object.create(null),[].slice.call(arguments),{merger:function(t,e,n,i){var a=e[t]||Object.create(null),r=n[t];"scales"===t?e[t]=Xe(a,r):"scale"===t?e[t]=H.merge(a,[Re.getScaleDefaults(r.type),r]):H._merger(t,e,n,i)}})}function Ze(t){var e=t.options;H.each(t.scales,(function(e){pe.removeBox(t,e)})),e=Ke(N.global,N[t.config.type],e),t.options=t.config.options=e,t.ensureScalesHaveIDs(),t.buildOrUpdateScales(),t.tooltip._options=e.tooltips,t.tooltip.initialize()}function $e(t,e,n){var i,a=function(t){return t.id===i};do{i=e+n++}while(H.findIndex(t,a)>=0);return i}function Je(t){return"top"===t||"bottom"===t}function Qe(t,e){return function(n,i){return n[t]===i[t]?n[e]-i[e]:n[t]-i[t]}}N._set("global",{elements:{},events:["mousemove","mouseout","click","touchstart","touchmove"],hover:{onHover:null,mode:"nearest",intersect:!0,animationDuration:400},onClick:null,maintainAspectRatio:!0,responsive:!0,responsiveAnimationDuration:0});var tn=function(t,e){return this.construct(t,e),this};H.extend(tn.prototype,{construct:function(t,e){var n=this;e=function(t){var e=(t=t||Object.create(null)).data=t.data||{};return e.datasets=e.datasets||[],e.labels=e.labels||[],t.options=Ke(N.global,N[t.type],t.options||{}),t}(e);var i=Oe.acquireContext(t,e),a=i&&i.canvas,r=a&&a.height,o=a&&a.width;n.id=H.uid(),n.ctx=i,n.canvas=a,n.config=e,n.width=o,n.height=r,n.aspectRatio=r?o/r:null,n.options=e.options,n._bufferedRender=!1,n._layers=[],n.chart=n,n.controller=n,tn.instances[n.id]=n,Object.defineProperty(n,"data",{get:function(){return n.config.data},set:function(t){n.config.data=t}}),i&&a?(n.initialize(),n.update()):console.error("Failed to create chart: can't acquire context from the given item")},initialize:function(){var t=this;return Le.notify(t,"beforeInit"),H.retinaScale(t,t.options.devicePixelRatio),t.bindEvents(),t.options.responsive&&t.resize(!0),t.initToolTip(),Le.notify(t,"afterInit"),t},clear:function(){return H.canvas.clear(this),this},stop:function(){return J.cancelAnimation(this),this},resize:function(t){var e=this,n=e.options,i=e.canvas,a=n.maintainAspectRatio&&e.aspectRatio||null,r=Math.max(0,Math.floor(H.getMaximumWidth(i))),o=Math.max(0,Math.floor(a?r/a:H.getMaximumHeight(i)));if((e.width!==r||e.height!==o)&&(i.width=e.width=r,i.height=e.height=o,i.style.width=r+"px",i.style.height=o+"px",H.retinaScale(e,n.devicePixelRatio),!t)){var s={width:r,height:o};Le.notify(e,"resize",[s]),n.onResize&&n.onResize(e,s),e.stop(),e.update({duration:n.responsiveAnimationDuration})}},ensureScalesHaveIDs:function(){var t=this.options,e=t.scales||{},n=t.scale;H.each(e.xAxes,(function(t,n){t.id||(t.id=$e(e.xAxes,"x-axis-",n))})),H.each(e.yAxes,(function(t,n){t.id||(t.id=$e(e.yAxes,"y-axis-",n))})),n&&(n.id=n.id||"scale")},buildOrUpdateScales:function(){var t=this,e=t.options,n=t.scales||{},i=[],a=Object.keys(n).reduce((function(t,e){return t[e]=!1,t}),{});e.scales&&(i=i.concat((e.scales.xAxes||[]).map((function(t){return{options:t,dtype:"category",dposition:"bottom"}})),(e.scales.yAxes||[]).map((function(t){return{options:t,dtype:"linear",dposition:"left"}})))),e.scale&&i.push({options:e.scale,dtype:"radialLinear",isDefault:!0,dposition:"chartArea"}),H.each(i,(function(e){var i=e.options,r=i.id,o=Ge(i.type,e.dtype);Je(i.position)!==Je(e.dposition)&&(i.position=e.dposition),a[r]=!0;var s=null;if(r in n&&n[r].type===o)(s=n[r]).options=i,s.ctx=t.ctx,s.chart=t;else{var l=Re.getScaleConstructor(o);if(!l)return;s=new l({id:r,type:o,options:i,ctx:t.ctx,chart:t}),n[s.id]=s}s.mergeTicksOptions(),e.isDefault&&(t.scale=s)})),H.each(a,(function(t,e){t||delete n[e]})),t.scales=n,Re.addScalesToLayout(this)},buildOrUpdateControllers:function(){var t,e,n=this,i=[],a=n.data.datasets;for(t=0,e=a.length;t<e;t++){var r=a[t],o=n.getDatasetMeta(t),s=r.type||n.config.type;if(o.type&&o.type!==s&&(n.destroyDatasetMeta(t),o=n.getDatasetMeta(t)),o.type=s,o.order=r.order||0,o.index=t,o.controller)o.controller.updateIndex(t),o.controller.linkScales();else{var l=Jt[o.type];if(void 0===l)throw new Error('"'+o.type+'" is not a chart type.');o.controller=new l(n,t),i.push(o.controller)}}return i},resetElements:function(){var t=this;H.each(t.data.datasets,(function(e,n){t.getDatasetMeta(n).controller.reset()}),t)},reset:function(){this.resetElements(),this.tooltip.initialize()},update:function(t){var e,n,i=this;if(t&&"object"==typeof t||(t={duration:t,lazy:arguments[1]}),Ze(i),Le._invalidate(i),!1!==Le.notify(i,"beforeUpdate")){i.tooltip._data=i.data;var a=i.buildOrUpdateControllers();for(e=0,n=i.data.datasets.length;e<n;e++)i.getDatasetMeta(e).controller.buildOrUpdateElements();i.updateLayout(),i.options.animation&&i.options.animation.duration&&H.each(a,(function(t){t.reset()})),i.updateDatasets(),i.tooltip.initialize(),i.lastActive=[],Le.notify(i,"afterUpdate"),i._layers.sort(Qe("z","_idx")),i._bufferedRender?i._bufferedRequest={duration:t.duration,easing:t.easing,lazy:t.lazy}:i.render(t)}},updateLayout:function(){var t=this;!1!==Le.notify(t,"beforeLayout")&&(pe.update(this,this.width,this.height),t._layers=[],H.each(t.boxes,(function(e){e._configure&&e._configure(),t._layers.push.apply(t._layers,e._layers())}),t),t._layers.forEach((function(t,e){t._idx=e})),Le.notify(t,"afterScaleUpdate"),Le.notify(t,"afterLayout"))},updateDatasets:function(){if(!1!==Le.notify(this,"beforeDatasetsUpdate")){for(var t=0,e=this.data.datasets.length;t<e;++t)this.updateDataset(t);Le.notify(this,"afterDatasetsUpdate")}},updateDataset:function(t){var e=this.getDatasetMeta(t),n={meta:e,index:t};!1!==Le.notify(this,"beforeDatasetUpdate",[n])&&(e.controller._update(),Le.notify(this,"afterDatasetUpdate",[n]))},render:function(t){var e=this;t&&"object"==typeof t||(t={duration:t,lazy:arguments[1]});var n=e.options.animation,i=Ge(t.duration,n&&n.duration),a=t.lazy;if(!1!==Le.notify(e,"beforeRender")){var r=function(t){Le.notify(e,"afterRender"),H.callback(n&&n.onComplete,[t],e)};if(n&&i){var o=new $({numSteps:i/16.66,easing:t.easing||n.easing,render:function(t,e){var n=H.easing.effects[e.easing],i=e.currentStep,a=i/e.numSteps;t.draw(n(a),a,i)},onAnimationProgress:n.onProgress,onAnimationComplete:r});J.addAnimation(e,o,i,a)}else e.draw(),r(new $({numSteps:0,chart:e}));return e}},draw:function(t){var e,n,i=this;if(i.clear(),H.isNullOrUndef(t)&&(t=1),i.transition(t),!(i.width<=0||i.height<=0)&&!1!==Le.notify(i,"beforeDraw",[t])){for(n=i._layers,e=0;e<n.length&&n[e].z<=0;++e)n[e].draw(i.chartArea);for(i.drawDatasets(t);e<n.length;++e)n[e].draw(i.chartArea);i._drawTooltip(t),Le.notify(i,"afterDraw",[t])}},transition:function(t){for(var e=0,n=(this.data.datasets||[]).length;e<n;++e)this.isDatasetVisible(e)&&this.getDatasetMeta(e).controller.transition(t);this.tooltip.transition(t)},_getSortedDatasetMetas:function(t){var e,n,i=[];for(e=0,n=(this.data.datasets||[]).length;e<n;++e)t&&!this.isDatasetVisible(e)||i.push(this.getDatasetMeta(e));return i.sort(Qe("order","index")),i},_getSortedVisibleDatasetMetas:function(){return this._getSortedDatasetMetas(!0)},drawDatasets:function(t){var e,n;if(!1!==Le.notify(this,"beforeDatasetsDraw",[t])){for(n=(e=this._getSortedVisibleDatasetMetas()).length-1;n>=0;--n)this.drawDataset(e[n],t);Le.notify(this,"afterDatasetsDraw",[t])}},drawDataset:function(t,e){var n={meta:t,index:t.index,easingValue:e};!1!==Le.notify(this,"beforeDatasetDraw",[n])&&(t.controller.draw(e),Le.notify(this,"afterDatasetDraw",[n]))},_drawTooltip:function(t){var e=this.tooltip,n={tooltip:e,easingValue:t};!1!==Le.notify(this,"beforeTooltipDraw",[n])&&(e.draw(),Le.notify(this,"afterTooltipDraw",[n]))},getElementAtEvent:function(t){return re.modes.single(this,t)},getElementsAtEvent:function(t){return re.modes.label(this,t,{intersect:!0})},getElementsAtXAxis:function(t){return re.modes["x-axis"](this,t,{intersect:!0})},getElementsAtEventForMode:function(t,e,n){var i=re.modes[e];return"function"==typeof i?i(this,t,n):[]},getDatasetAtEvent:function(t){return re.modes.dataset(this,t,{intersect:!0})},getDatasetMeta:function(t){var e=this.data.datasets[t];e._meta||(e._meta={});var n=e._meta[this.id];return n||(n=e._meta[this.id]={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e.order||0,index:t}),n},getVisibleDatasetCount:function(){for(var t=0,e=0,n=this.data.datasets.length;e<n;++e)this.isDatasetVisible(e)&&t++;return t},isDatasetVisible:function(t){var e=this.getDatasetMeta(t);return"boolean"==typeof e.hidden?!e.hidden:!this.data.datasets[t].hidden},generateLegend:function(){return this.options.legendCallback(this)},destroyDatasetMeta:function(t){var e=this.id,n=this.data.datasets[t],i=n._meta&&n._meta[e];i&&(i.controller.destroy(),delete n._meta[e])},destroy:function(){var t,e,n=this,i=n.canvas;for(n.stop(),t=0,e=n.data.datasets.length;t<e;++t)n.destroyDatasetMeta(t);i&&(n.unbindEvents(),H.canvas.clear(n),Oe.releaseContext(n.ctx),n.canvas=null,n.ctx=null),Le.notify(n,"destroy"),delete tn.instances[n.id]},toBase64Image:function(){return this.canvas.toDataURL.apply(this.canvas,arguments)},initToolTip:function(){var t=this;t.tooltip=new Ye({_chart:t,_chartInstance:t,_data:t.data,_options:t.options.tooltips},t)},bindEvents:function(){var t=this,e=t._listeners={},n=function(){t.eventHandler.apply(t,arguments)};H.each(t.options.events,(function(i){Oe.addEventListener(t,i,n),e[i]=n})),t.options.responsive&&(n=function(){t.resize()},Oe.addEventListener(t,"resize",n),e.resize=n)},unbindEvents:function(){var t=this,e=t._listeners;e&&(delete t._listeners,H.each(e,(function(e,n){Oe.removeEventListener(t,n,e)})))},updateHoverStyle:function(t,e,n){var i,a,r,o=n?"set":"remove";for(a=0,r=t.length;a<r;++a)(i=t[a])&&this.getDatasetMeta(i._datasetIndex).controller[o+"HoverStyle"](i);"dataset"===e&&this.getDatasetMeta(t[0]._datasetIndex).controller["_"+o+"DatasetHoverStyle"]()},eventHandler:function(t){var e=this,n=e.tooltip;if(!1!==Le.notify(e,"beforeEvent",[t])){e._bufferedRender=!0,e._bufferedRequest=null;var i=e.handleEvent(t);n&&(i=n._start?n.handleEvent(t):i|n.handleEvent(t)),Le.notify(e,"afterEvent",[t]);var a=e._bufferedRequest;return a?e.render(a):i&&!e.animating&&(e.stop(),e.render({duration:e.options.hover.animationDuration,lazy:!0})),e._bufferedRender=!1,e._bufferedRequest=null,e}},handleEvent:function(t){var e,n=this,i=n.options||{},a=i.hover;return n.lastActive=n.lastActive||[],"mouseout"===t.type?n.active=[]:n.active=n.getElementsAtEventForMode(t,a.mode,a),H.callback(i.onHover||i.hover.onHover,[t.native,n.active],n),"mouseup"!==t.type&&"click"!==t.type||i.onClick&&i.onClick.call(n,t.native,n.active),n.lastActive.length&&n.updateHoverStyle(n.lastActive,a.mode,!1),n.active.length&&a.mode&&n.updateHoverStyle(n.active,a.mode,!0),e=!H.arrayEquals(n.active,n.lastActive),n.lastActive=n.active,e}}),tn.instances={};var en=tn;tn.Controller=tn,tn.types={},H.configMerge=Ke,H.scaleMerge=Xe;function nn(){throw new Error("This method is not implemented: either no adapter can be found or an incomplete integration was provided.")}function an(t){this.options=t||{}}H.extend(an.prototype,{formats:nn,parse:nn,format:nn,add:nn,diff:nn,startOf:nn,endOf:nn,_create:function(t){return t}}),an.override=function(t){H.extend(an.prototype,t)};var rn={_date:an},on={formatters:{values:function(t){return H.isArray(t)?t:""+t},linear:function(t,e,n){var i=n.length>3?n[2]-n[1]:n[1]-n[0];Math.abs(i)>1&&t!==Math.floor(t)&&(i=t-Math.floor(t));var a=H.log10(Math.abs(i)),r="";if(0!==t)if(Math.max(Math.abs(n[0]),Math.abs(n[n.length-1]))<1e-4){var o=H.log10(Math.abs(t)),s=Math.floor(o)-Math.floor(a);s=Math.max(Math.min(s,20),0),r=t.toExponential(s)}else{var l=-1*Math.floor(a);l=Math.max(Math.min(l,20),0),r=t.toFixed(l)}else r="0";return r},logarithmic:function(t,e,n){var i=t/Math.pow(10,Math.floor(H.log10(t)));return 0===t?"0":1===i||2===i||5===i||0===e||e===n.length-1?t.toExponential():""}}},sn=H.isArray,ln=H.isNullOrUndef,un=H.valueOrDefault,dn=H.valueAtIndexOrDefault;function hn(t,e,n){var i,a=t.getTicks().length,r=Math.min(e,a-1),o=t.getPixelForTick(r),s=t._startPixel,l=t._endPixel;if(!(n&&(i=1===a?Math.max(o-s,l-o):0===e?(t.getPixelForTick(1)-o)/2:(o-t.getPixelForTick(r-1))/2,(o+=r<e?i:-i)<s-1e-6||o>l+1e-6)))return o}function cn(t,e,n,i){var a,r,o,s,l,u,d,h,c,f,g,p,m,v=n.length,b=[],x=[],y=[],_=0,k=0;for(a=0;a<v;++a){if(s=n[a].label,l=n[a].major?e.major:e.minor,t.font=u=l.string,d=i[u]=i[u]||{data:{},gc:[]},h=l.lineHeight,c=f=0,ln(s)||sn(s)){if(sn(s))for(r=0,o=s.length;r<o;++r)g=s[r],ln(g)||sn(g)||(c=H.measureText(t,d.data,d.gc,c,g),f+=h)}else c=H.measureText(t,d.data,d.gc,c,s),f=h;b.push(c),x.push(f),y.push(h/2),_=Math.max(c,_),k=Math.max(f,k)}function w(t){return{width:b[t]||0,height:x[t]||0,offset:y[t]||0}}return function(t,e){H.each(t,(function(t){var n,i=t.gc,a=i.length/2;if(a>e){for(n=0;n<a;++n)delete t.data[i[n]];i.splice(0,a)}}))}(i,v),p=b.indexOf(_),m=x.indexOf(k),{first:w(0),last:w(v-1),widest:w(p),highest:w(m)}}function fn(t){return t.drawTicks?t.tickMarkLength:0}function gn(t){var e,n;return t.display?(e=H.options._parseFont(t),n=H.options.toPadding(t.padding),e.lineHeight+n.height):0}function pn(t,e){return H.extend(H.options._parseFont({fontFamily:un(e.fontFamily,t.fontFamily),fontSize:un(e.fontSize,t.fontSize),fontStyle:un(e.fontStyle,t.fontStyle),lineHeight:un(e.lineHeight,t.lineHeight)}),{color:H.options.resolve([e.fontColor,t.fontColor,N.global.defaultFontColor])})}function mn(t){var e=pn(t,t.minor);return{minor:e,major:t.major.enabled?pn(t,t.major):e}}function vn(t){var e,n,i,a=[];for(n=0,i=t.length;n<i;++n)void 0!==(e=t[n])._index&&a.push(e);return a}function bn(t,e,n,i){var a,r,o,s,l=un(n,0),u=Math.min(un(i,t.length),t.length),d=0;for(e=Math.ceil(e),i&&(e=(a=i-n)/Math.floor(a/e)),s=l;s<0;)d++,s=Math.round(l+d*e);for(r=Math.max(l,0);r<u;r++)o=t[r],r===s?(o._index=r,d++,s=Math.round(l+d*e)):delete o.label}N._set("scale",{display:!0,position:"left",offset:!1,gridLines:{display:!0,color:"rgba(0,0,0,0.1)",lineWidth:1,drawBorder:!0,drawOnChartArea:!0,drawTicks:!0,tickMarkLength:10,zeroLineWidth:1,zeroLineColor:"rgba(0,0,0,0.25)",zeroLineBorderDash:[],zeroLineBorderDashOffset:0,offsetGridLines:!1,borderDash:[],borderDashOffset:0},scaleLabel:{display:!1,labelString:"",padding:{top:4,bottom:4}},ticks:{beginAtZero:!1,minRotation:0,maxRotation:50,mirror:!1,padding:0,reverse:!1,display:!0,autoSkip:!0,autoSkipPadding:0,labelOffset:0,callback:on.formatters.values,minor:{},major:{}}});var xn=K.extend({zeroLineIndex:0,getPadding:function(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}},getTicks:function(){return this._ticks},_getLabels:function(){var t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]},mergeTicksOptions:function(){},beforeUpdate:function(){H.callback(this.options.beforeUpdate,[this])},update:function(t,e,n){var i,a,r,o,s,l=this,u=l.options.ticks,d=u.sampleSize;if(l.beforeUpdate(),l.maxWidth=t,l.maxHeight=e,l.margins=H.extend({left:0,right:0,top:0,bottom:0},n),l._ticks=null,l.ticks=null,l._labelSizes=null,l._maxLabelLines=0,l.longestLabelWidth=0,l.longestTextCache=l.longestTextCache||{},l._gridLineItems=null,l._labelItems=null,l.beforeSetDimensions(),l.setDimensions(),l.afterSetDimensions(),l.beforeDataLimits(),l.determineDataLimits(),l.afterDataLimits(),l.beforeBuildTicks(),o=l.buildTicks()||[],(!(o=l.afterBuildTicks(o)||o)||!o.length)&&l.ticks)for(o=[],i=0,a=l.ticks.length;i<a;++i)o.push({value:l.ticks[i],major:!1});return l._ticks=o,s=d<o.length,r=l._convertTicksToLabels(s?function(t,e){for(var n=[],i=t.length/e,a=0,r=t.length;a<r;a+=i)n.push(t[Math.floor(a)]);return n}(o,d):o),l._configure(),l.beforeCalculateTickRotation(),l.calculateTickRotation(),l.afterCalculateTickRotation(),l.beforeFit(),l.fit(),l.afterFit(),l._ticksToDraw=u.display&&(u.autoSkip||"auto"===u.source)?l._autoSkip(o):o,s&&(r=l._convertTicksToLabels(l._ticksToDraw)),l.ticks=r,l.afterUpdate(),l.minSize},_configure:function(){var t,e,n=this,i=n.options.ticks.reverse;n.isHorizontal()?(t=n.left,e=n.right):(t=n.top,e=n.bottom,i=!i),n._startPixel=t,n._endPixel=e,n._reversePixels=i,n._length=e-t},afterUpdate:function(){H.callback(this.options.afterUpdate,[this])},beforeSetDimensions:function(){H.callback(this.options.beforeSetDimensions,[this])},setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0},afterSetDimensions:function(){H.callback(this.options.afterSetDimensions,[this])},beforeDataLimits:function(){H.callback(this.options.beforeDataLimits,[this])},determineDataLimits:H.noop,afterDataLimits:function(){H.callback(this.options.afterDataLimits,[this])},beforeBuildTicks:function(){H.callback(this.options.beforeBuildTicks,[this])},buildTicks:H.noop,afterBuildTicks:function(t){var e=this;return sn(t)&&t.length?H.callback(e.options.afterBuildTicks,[e,t]):(e.ticks=H.callback(e.options.afterBuildTicks,[e,e.ticks])||e.ticks,t)},beforeTickToLabelConversion:function(){H.callback(this.options.beforeTickToLabelConversion,[this])},convertTicksToLabels:function(){var t=this.options.ticks;this.ticks=this.ticks.map(t.userCallback||t.callback,this)},afterTickToLabelConversion:function(){H.callback(this.options.afterTickToLabelConversion,[this])},beforeCalculateTickRotation:function(){H.callback(this.options.beforeCalculateTickRotation,[this])},calculateTickRotation:function(){var t,e,n,i,a,r,o,s=this,l=s.options,u=l.ticks,d=s.getTicks().length,h=u.minRotation||0,c=u.maxRotation,f=h;!s._isVisible()||!u.display||h>=c||d<=1||!s.isHorizontal()?s.labelRotation=h:(e=(t=s._getLabelSizes()).widest.width,n=t.highest.height-t.highest.offset,i=Math.min(s.maxWidth,s.chart.width-e),e+6>(a=l.offset?s.maxWidth/d:i/(d-1))&&(a=i/(d-(l.offset?.5:1)),r=s.maxHeight-fn(l.gridLines)-u.padding-gn(l.scaleLabel),o=Math.sqrt(e*e+n*n),f=H.toDegrees(Math.min(Math.asin(Math.min((t.highest.height+6)/a,1)),Math.asin(Math.min(r/o,1))-Math.asin(n/o))),f=Math.max(h,Math.min(c,f))),s.labelRotation=f)},afterCalculateTickRotation:function(){H.callback(this.options.afterCalculateTickRotation,[this])},beforeFit:function(){H.callback(this.options.beforeFit,[this])},fit:function(){var t=this,e=t.minSize={width:0,height:0},n=t.chart,i=t.options,a=i.ticks,r=i.scaleLabel,o=i.gridLines,s=t._isVisible(),l="bottom"===i.position,u=t.isHorizontal();if(u?e.width=t.maxWidth:s&&(e.width=fn(o)+gn(r)),u?s&&(e.height=fn(o)+gn(r)):e.height=t.maxHeight,a.display&&s){var d=mn(a),h=t._getLabelSizes(),c=h.first,f=h.last,g=h.widest,p=h.highest,m=.4*d.minor.lineHeight,v=a.padding;if(u){var b=0!==t.labelRotation,x=H.toRadians(t.labelRotation),y=Math.cos(x),_=Math.sin(x),k=_*g.width+y*(p.height-(b?p.offset:0))+(b?0:m);e.height=Math.min(t.maxHeight,e.height+k+v);var w,M,S=t.getPixelForTick(0)-t.left,C=t.right-t.getPixelForTick(t.getTicks().length-1);b?(w=l?y*c.width+_*c.offset:_*(c.height-c.offset),M=l?_*(f.height-f.offset):y*f.width+_*f.offset):(w=c.width/2,M=f.width/2),t.paddingLeft=Math.max((w-S)*t.width/(t.width-S),0)+3,t.paddingRight=Math.max((M-C)*t.width/(t.width-C),0)+3}else{var P=a.mirror?0:g.width+v+m;e.width=Math.min(t.maxWidth,e.width+P),t.paddingTop=c.height/2,t.paddingBottom=f.height/2}}t.handleMargins(),u?(t.width=t._length=n.width-t.margins.left-t.margins.right,t.height=e.height):(t.width=e.width,t.height=t._length=n.height-t.margins.top-t.margins.bottom)},handleMargins:function(){var t=this;t.margins&&(t.margins.left=Math.max(t.paddingLeft,t.margins.left),t.margins.top=Math.max(t.paddingTop,t.margins.top),t.margins.right=Math.max(t.paddingRight,t.margins.right),t.margins.bottom=Math.max(t.paddingBottom,t.margins.bottom))},afterFit:function(){H.callback(this.options.afterFit,[this])},isHorizontal:function(){var t=this.options.position;return"top"===t||"bottom"===t},isFullWidth:function(){return this.options.fullWidth},getRightValue:function(t){if(ln(t))return NaN;if(("number"==typeof t||t instanceof Number)&&!isFinite(t))return NaN;if(t)if(this.isHorizontal()){if(void 0!==t.x)return this.getRightValue(t.x)}else if(void 0!==t.y)return this.getRightValue(t.y);return t},_convertTicksToLabels:function(t){var e,n,i,a=this;for(a.ticks=t.map((function(t){return t.value})),a.beforeTickToLabelConversion(),e=a.convertTicksToLabels(t)||a.ticks,a.afterTickToLabelConversion(),n=0,i=t.length;n<i;++n)t[n].label=e[n];return e},_getLabelSizes:function(){var t=this,e=t._labelSizes;return e||(t._labelSizes=e=cn(t.ctx,mn(t.options.ticks),t.getTicks(),t.longestTextCache),t.longestLabelWidth=e.widest.width),e},_parseValue:function(t){var e,n,i,a;return sn(t)?(e=+this.getRightValue(t[0]),n=+this.getRightValue(t[1]),i=Math.min(e,n),a=Math.max(e,n)):(e=void 0,n=t=+this.getRightValue(t),i=t,a=t),{min:i,max:a,start:e,end:n}},_getScaleLabel:function(t){var e=this._parseValue(t);return void 0!==e.start?"["+e.start+", "+e.end+"]":+this.getRightValue(t)},getLabelForIndex:H.noop,getPixelForValue:H.noop,getValueForPixel:H.noop,getPixelForTick:function(t){var e=this.options.offset,n=this._ticks.length,i=1/Math.max(n-(e?0:1),1);return t<0||t>n-1?null:this.getPixelForDecimal(t*i+(e?i/2:0))},getPixelForDecimal:function(t){return this._reversePixels&&(t=1-t),this._startPixel+t*this._length},getDecimalForPixel:function(t){var e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e},getBasePixel:function(){return this.getPixelForValue(this.getBaseValue())},getBaseValue:function(){var t=this.min,e=this.max;return this.beginAtZero?0:t<0&&e<0?e:t>0&&e>0?t:0},_autoSkip:function(t){var e,n,i,a,r=this.options.ticks,o=this._length,s=r.maxTicksLimit||o/this._tickSize()+1,l=r.major.enabled?function(t){var e,n,i=[];for(e=0,n=t.length;e<n;e++)t[e].major&&i.push(e);return i}(t):[],u=l.length,d=l[0],h=l[u-1];if(u>s)return function(t,e,n){var i,a,r=0,o=e[0];for(n=Math.ceil(n),i=0;i<t.length;i++)a=t[i],i===o?(a._index=i,o=e[++r*n]):delete a.label}(t,l,u/s),vn(t);if(i=function(t,e,n,i){var a,r,o,s,l=function(t){var e,n,i=t.length;if(i<2)return!1;for(n=t[0],e=1;e<i;++e)if(t[e]-t[e-1]!==n)return!1;return n}(t),u=(e.length-1)/i;if(!l)return Math.max(u,1);for(o=0,s=(a=H.math._factorize(l)).length-1;o<s;o++)if((r=a[o])>u)return r;return Math.max(u,1)}(l,t,0,s),u>0){for(e=0,n=u-1;e<n;e++)bn(t,i,l[e],l[e+1]);return a=u>1?(h-d)/(u-1):null,bn(t,i,H.isNullOrUndef(a)?0:d-a,d),bn(t,i,h,H.isNullOrUndef(a)?t.length:h+a),vn(t)}return bn(t,i),vn(t)},_tickSize:function(){var t=this.options.ticks,e=H.toRadians(this.labelRotation),n=Math.abs(Math.cos(e)),i=Math.abs(Math.sin(e)),a=this._getLabelSizes(),r=t.autoSkipPadding||0,o=a?a.widest.width+r:0,s=a?a.highest.height+r:0;return this.isHorizontal()?s*n>o*i?o/n:s/i:s*i<o*n?s/n:o/i},_isVisible:function(){var t,e,n,i=this.chart,a=this.options.display;if("auto"!==a)return!!a;for(t=0,e=i.data.datasets.length;t<e;++t)if(i.isDatasetVisible(t)&&((n=i.getDatasetMeta(t)).xAxisID===this.id||n.yAxisID===this.id))return!0;return!1},_computeGridLineItems:function(t){var e,n,i,a,r,o,s,l,u,d,h,c,f,g,p,m,v,b=this,x=b.chart,y=b.options,_=y.gridLines,k=y.position,w=_.offsetGridLines,M=b.isHorizontal(),S=b._ticksToDraw,C=S.length+(w?1:0),P=fn(_),A=[],D=_.drawBorder?dn(_.lineWidth,0,0):0,T=D/2,I=H._alignPixel,F=function(t){return I(x,t,D)};for("top"===k?(e=F(b.bottom),s=b.bottom-P,u=e-T,h=F(t.top)+T,f=t.bottom):"bottom"===k?(e=F(b.top),h=t.top,f=F(t.bottom)-T,s=e+T,u=b.top+P):"left"===k?(e=F(b.right),o=b.right-P,l=e-T,d=F(t.left)+T,c=t.right):(e=F(b.left),d=t.left,c=F(t.right)-T,o=e+T,l=b.left+P),n=0;n<C;++n)i=S[n]||{},ln(i.label)&&n<S.length||(n===b.zeroLineIndex&&y.offset===w?(g=_.zeroLineWidth,p=_.zeroLineColor,m=_.zeroLineBorderDash||[],v=_.zeroLineBorderDashOffset||0):(g=dn(_.lineWidth,n,1),p=dn(_.color,n,"rgba(0,0,0,0.1)"),m=_.borderDash||[],v=_.borderDashOffset||0),void 0!==(a=hn(b,i._index||n,w))&&(r=I(x,a,g),M?o=l=d=c=r:s=u=h=f=r,A.push({tx1:o,ty1:s,tx2:l,ty2:u,x1:d,y1:h,x2:c,y2:f,width:g,color:p,borderDash:m,borderDashOffset:v})));return A.ticksLength=C,A.borderValue=e,A},_computeLabelItems:function(){var t,e,n,i,a,r,o,s,l,u,d,h,c=this,f=c.options,g=f.ticks,p=f.position,m=g.mirror,v=c.isHorizontal(),b=c._ticksToDraw,x=mn(g),y=g.padding,_=fn(f.gridLines),k=-H.toRadians(c.labelRotation),w=[];for("top"===p?(r=c.bottom-_-y,o=k?"left":"center"):"bottom"===p?(r=c.top+_+y,o=k?"right":"center"):"left"===p?(a=c.right-(m?0:_)-y,o=m?"left":"right"):(a=c.left+(m?0:_)+y,o=m?"right":"left"),t=0,e=b.length;t<e;++t)i=(n=b[t]).label,ln(i)||(s=c.getPixelForTick(n._index||t)+g.labelOffset,u=(l=n.major?x.major:x.minor).lineHeight,d=sn(i)?i.length:1,v?(a=s,h="top"===p?((k?1:.5)-d)*u:(k?0:.5)*u):(r=s,h=(1-d)*u/2),w.push({x:a,y:r,rotation:k,label:i,font:l,textOffset:h,textAlign:o}));return w},_drawGrid:function(t){var e=this,n=e.options.gridLines;if(n.display){var i,a,r,o,s,l=e.ctx,u=e.chart,d=H._alignPixel,h=n.drawBorder?dn(n.lineWidth,0,0):0,c=e._gridLineItems||(e._gridLineItems=e._computeGridLineItems(t));for(r=0,o=c.length;r<o;++r)i=(s=c[r]).width,a=s.color,i&&a&&(l.save(),l.lineWidth=i,l.strokeStyle=a,l.setLineDash&&(l.setLineDash(s.borderDash),l.lineDashOffset=s.borderDashOffset),l.beginPath(),n.drawTicks&&(l.moveTo(s.tx1,s.ty1),l.lineTo(s.tx2,s.ty2)),n.drawOnChartArea&&(l.moveTo(s.x1,s.y1),l.lineTo(s.x2,s.y2)),l.stroke(),l.restore());if(h){var f,g,p,m,v=h,b=dn(n.lineWidth,c.ticksLength-1,1),x=c.borderValue;e.isHorizontal()?(f=d(u,e.left,v)-v/2,g=d(u,e.right,b)+b/2,p=m=x):(p=d(u,e.top,v)-v/2,m=d(u,e.bottom,b)+b/2,f=g=x),l.lineWidth=h,l.strokeStyle=dn(n.color,0),l.beginPath(),l.moveTo(f,p),l.lineTo(g,m),l.stroke()}}},_drawLabels:function(){var t=this;if(t.options.ticks.display){var e,n,i,a,r,o,s,l,u=t.ctx,d=t._labelItems||(t._labelItems=t._computeLabelItems());for(e=0,i=d.length;e<i;++e){if(o=(r=d[e]).font,u.save(),u.translate(r.x,r.y),u.rotate(r.rotation),u.font=o.string,u.fillStyle=o.color,u.textBaseline="middle",u.textAlign=r.textAlign,s=r.label,l=r.textOffset,sn(s))for(n=0,a=s.length;n<a;++n)u.fillText(""+s[n],0,l),l+=o.lineHeight;else u.fillText(s,0,l);u.restore()}}},_drawTitle:function(){var t=this,e=t.ctx,n=t.options,i=n.scaleLabel;if(i.display){var a,r,o=un(i.fontColor,N.global.defaultFontColor),s=H.options._parseFont(i),l=H.options.toPadding(i.padding),u=s.lineHeight/2,d=n.position,h=0;if(t.isHorizontal())a=t.left+t.width/2,r="bottom"===d?t.bottom-u-l.bottom:t.top+u+l.top;else{var c="left"===d;a=c?t.left+u+l.top:t.right-u-l.top,r=t.top+t.height/2,h=c?-.5*Math.PI:.5*Math.PI}e.save(),e.translate(a,r),e.rotate(h),e.textAlign="center",e.textBaseline="middle",e.fillStyle=o,e.font=s.string,e.fillText(i.labelString,0,0),e.restore()}},draw:function(t){this._isVisible()&&(this._drawGrid(t),this._drawTitle(),this._drawLabels())},_layers:function(){var t=this,e=t.options,n=e.ticks&&e.ticks.z||0,i=e.gridLines&&e.gridLines.z||0;return t._isVisible()&&n!==i&&t.draw===t._draw?[{z:i,draw:function(){t._drawGrid.apply(t,arguments),t._drawTitle.apply(t,arguments)}},{z:n,draw:function(){t._drawLabels.apply(t,arguments)}}]:[{z:n,draw:function(){t.draw.apply(t,arguments)}}]},_getMatchingVisibleMetas:function(t){var e=this,n=e.isHorizontal();return e.chart._getSortedVisibleDatasetMetas().filter((function(i){return(!t||i.type===t)&&(n?i.xAxisID===e.id:i.yAxisID===e.id)}))}});xn.prototype._draw=xn.prototype.draw;var yn=xn,_n=H.isNullOrUndef,kn=yn.extend({determineDataLimits:function(){var t,e=this,n=e._getLabels(),i=e.options.ticks,a=i.min,r=i.max,o=0,s=n.length-1;void 0!==a&&(t=n.indexOf(a))>=0&&(o=t),void 0!==r&&(t=n.indexOf(r))>=0&&(s=t),e.minIndex=o,e.maxIndex=s,e.min=n[o],e.max=n[s]},buildTicks:function(){var t=this._getLabels(),e=this.minIndex,n=this.maxIndex;this.ticks=0===e&&n===t.length-1?t:t.slice(e,n+1)},getLabelForIndex:function(t,e){var n=this.chart;return n.getDatasetMeta(e).controller._getValueScaleId()===this.id?this.getRightValue(n.data.datasets[e].data[t]):this._getLabels()[t]},_configure:function(){var t=this,e=t.options.offset,n=t.ticks;yn.prototype._configure.call(t),t.isHorizontal()||(t._reversePixels=!t._reversePixels),n&&(t._startValue=t.minIndex-(e?.5:0),t._valueRange=Math.max(n.length-(e?0:1),1))},getPixelForValue:function(t,e,n){var i,a,r,o=this;return _n(e)||_n(n)||(t=o.chart.data.datasets[n].data[e]),_n(t)||(i=o.isHorizontal()?t.x:t.y),(void 0!==i||void 0!==t&&isNaN(e))&&(a=o._getLabels(),t=H.valueOrDefault(i,t),e=-1!==(r=a.indexOf(t))?r:e,isNaN(e)&&(e=t)),o.getPixelForDecimal((e-o._startValue)/o._valueRange)},getPixelForTick:function(t){var e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t],t+this.minIndex)},getValueForPixel:function(t){var e=Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange);return Math.min(Math.max(e,0),this.ticks.length-1)},getBasePixel:function(){return this.bottom}}),wn={position:"bottom"};kn._defaults=wn;var Mn=H.noop,Sn=H.isNullOrUndef;var Cn=yn.extend({getRightValue:function(t){return"string"==typeof t?+t:yn.prototype.getRightValue.call(this,t)},handleTickRangeOptions:function(){var t=this,e=t.options.ticks;if(e.beginAtZero){var n=H.sign(t.min),i=H.sign(t.max);n<0&&i<0?t.max=0:n>0&&i>0&&(t.min=0)}var a=void 0!==e.min||void 0!==e.suggestedMin,r=void 0!==e.max||void 0!==e.suggestedMax;void 0!==e.min?t.min=e.min:void 0!==e.suggestedMin&&(null===t.min?t.min=e.suggestedMin:t.min=Math.min(t.min,e.suggestedMin)),void 0!==e.max?t.max=e.max:void 0!==e.suggestedMax&&(null===t.max?t.max=e.suggestedMax:t.max=Math.max(t.max,e.suggestedMax)),a!==r&&t.min>=t.max&&(a?t.max=t.min+1:t.min=t.max-1),t.min===t.max&&(t.max++,e.beginAtZero||t.min--)},getTickLimit:function(){var t,e=this.options.ticks,n=e.stepSize,i=e.maxTicksLimit;return n?t=Math.ceil(this.max/n)-Math.floor(this.min/n)+1:(t=this._computeTickLimit(),i=i||11),i&&(t=Math.min(i,t)),t},_computeTickLimit:function(){return Number.POSITIVE_INFINITY},handleDirectionalChanges:Mn,buildTicks:function(){var t=this,e=t.options.ticks,n=t.getTickLimit(),i={maxTicks:n=Math.max(2,n),min:e.min,max:e.max,precision:e.precision,stepSize:H.valueOrDefault(e.fixedStepSize,e.stepSize)},a=t.ticks=function(t,e){var n,i,a,r,o=[],s=t.stepSize,l=s||1,u=t.maxTicks-1,d=t.min,h=t.max,c=t.precision,f=e.min,g=e.max,p=H.niceNum((g-f)/u/l)*l;if(p<1e-14&&Sn(d)&&Sn(h))return[f,g];(r=Math.ceil(g/p)-Math.floor(f/p))>u&&(p=H.niceNum(r*p/u/l)*l),s||Sn(c)?n=Math.pow(10,H._decimalPlaces(p)):(n=Math.pow(10,c),p=Math.ceil(p*n)/n),i=Math.floor(f/p)*p,a=Math.ceil(g/p)*p,s&&(!Sn(d)&&H.almostWhole(d/p,p/1e3)&&(i=d),!Sn(h)&&H.almostWhole(h/p,p/1e3)&&(a=h)),r=(a-i)/p,r=H.almostEquals(r,Math.round(r),p/1e3)?Math.round(r):Math.ceil(r),i=Math.round(i*n)/n,a=Math.round(a*n)/n,o.push(Sn(d)?i:d);for(var m=1;m<r;++m)o.push(Math.round((i+m*p)*n)/n);return o.push(Sn(h)?a:h),o}(i,t);t.handleDirectionalChanges(),t.max=H.max(a),t.min=H.min(a),e.reverse?(a.reverse(),t.start=t.max,t.end=t.min):(t.start=t.min,t.end=t.max)},convertTicksToLabels:function(){var t=this;t.ticksAsNumbers=t.ticks.slice(),t.zeroLineIndex=t.ticks.indexOf(0),yn.prototype.convertTicksToLabels.call(t)},_configure:function(){var t,e=this,n=e.getTicks(),i=e.min,a=e.max;yn.prototype._configure.call(e),e.options.offset&&n.length&&(i-=t=(a-i)/Math.max(n.length-1,1)/2,a+=t),e._startValue=i,e._endValue=a,e._valueRange=a-i}}),Pn={position:"left",ticks:{callback:on.formatters.linear}};function An(t,e,n,i){var a,r,o=t.options,s=function(t,e,n){var i=[n.type,void 0===e&&void 0===n.stack?n.index:"",n.stack].join(".");return void 0===t[i]&&(t[i]={pos:[],neg:[]}),t[i]}(e,o.stacked,n),l=s.pos,u=s.neg,d=i.length;for(a=0;a<d;++a)r=t._parseValue(i[a]),isNaN(r.min)||isNaN(r.max)||n.data[a].hidden||(l[a]=l[a]||0,u[a]=u[a]||0,o.relativePoints?l[a]=100:r.min<0||r.max<0?u[a]+=r.min:l[a]+=r.max)}function Dn(t,e,n){var i,a,r=n.length;for(i=0;i<r;++i)a=t._parseValue(n[i]),isNaN(a.min)||isNaN(a.max)||e.data[i].hidden||(t.min=Math.min(t.min,a.min),t.max=Math.max(t.max,a.max))}var Tn=Cn.extend({determineDataLimits:function(){var t,e,n,i,a=this,r=a.options,o=a.chart.data.datasets,s=a._getMatchingVisibleMetas(),l=r.stacked,u={},d=s.length;if(a.min=Number.POSITIVE_INFINITY,a.max=Number.NEGATIVE_INFINITY,void 0===l)for(t=0;!l&&t<d;++t)l=void 0!==(e=s[t]).stack;for(t=0;t<d;++t)n=o[(e=s[t]).index].data,l?An(a,u,e,n):Dn(a,e,n);H.each(u,(function(t){i=t.pos.concat(t.neg),a.min=Math.min(a.min,H.min(i)),a.max=Math.max(a.max,H.max(i))})),a.min=H.isFinite(a.min)&&!isNaN(a.min)?a.min:0,a.max=H.isFinite(a.max)&&!isNaN(a.max)?a.max:1,a.handleTickRangeOptions()},_computeTickLimit:function(){var t;return this.isHorizontal()?Math.ceil(this.width/40):(t=H.options._parseFont(this.options.ticks),Math.ceil(this.height/t.lineHeight))},handleDirectionalChanges:function(){this.isHorizontal()||this.ticks.reverse()},getLabelForIndex:function(t,e){return this._getScaleLabel(this.chart.data.datasets[e].data[t])},getPixelForValue:function(t){return this.getPixelForDecimal((+this.getRightValue(t)-this._startValue)/this._valueRange)},getValueForPixel:function(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange},getPixelForTick:function(t){var e=this.ticksAsNumbers;return t<0||t>e.length-1?null:this.getPixelForValue(e[t])}}),In=Pn;Tn._defaults=In;var Fn=H.valueOrDefault,On=H.math.log10;var Ln={position:"left",ticks:{callback:on.formatters.logarithmic}};function Rn(t,e){return H.isFinite(t)&&t>=0?t:e}var zn=yn.extend({determineDataLimits:function(){var t,e,n,i,a,r,o=this,s=o.options,l=o.chart,u=l.data.datasets,d=o.isHorizontal();function h(t){return d?t.xAxisID===o.id:t.yAxisID===o.id}o.min=Number.POSITIVE_INFINITY,o.max=Number.NEGATIVE_INFINITY,o.minNotZero=Number.POSITIVE_INFINITY;var c=s.stacked;if(void 0===c)for(t=0;t<u.length;t++)if(e=l.getDatasetMeta(t),l.isDatasetVisible(t)&&h(e)&&void 0!==e.stack){c=!0;break}if(s.stacked||c){var f={};for(t=0;t<u.length;t++){var g=[(e=l.getDatasetMeta(t)).type,void 0===s.stacked&&void 0===e.stack?t:"",e.stack].join(".");if(l.isDatasetVisible(t)&&h(e))for(void 0===f[g]&&(f[g]=[]),a=0,r=(i=u[t].data).length;a<r;a++){var p=f[g];n=o._parseValue(i[a]),isNaN(n.min)||isNaN(n.max)||e.data[a].hidden||n.min<0||n.max<0||(p[a]=p[a]||0,p[a]+=n.max)}}H.each(f,(function(t){if(t.length>0){var e=H.min(t),n=H.max(t);o.min=Math.min(o.min,e),o.max=Math.max(o.max,n)}}))}else for(t=0;t<u.length;t++)if(e=l.getDatasetMeta(t),l.isDatasetVisible(t)&&h(e))for(a=0,r=(i=u[t].data).length;a<r;a++)n=o._parseValue(i[a]),isNaN(n.min)||isNaN(n.max)||e.data[a].hidden||n.min<0||n.max<0||(o.min=Math.min(n.min,o.min),o.max=Math.max(n.max,o.max),0!==n.min&&(o.minNotZero=Math.min(n.min,o.minNotZero)));o.min=H.isFinite(o.min)?o.min:null,o.max=H.isFinite(o.max)?o.max:null,o.minNotZero=H.isFinite(o.minNotZero)?o.minNotZero:null,this.handleTickRangeOptions()},handleTickRangeOptions:function(){var t=this,e=t.options.ticks;t.min=Rn(e.min,t.min),t.max=Rn(e.max,t.max),t.min===t.max&&(0!==t.min&&null!==t.min?(t.min=Math.pow(10,Math.floor(On(t.min))-1),t.max=Math.pow(10,Math.floor(On(t.max))+1)):(t.min=1,t.max=10)),null===t.min&&(t.min=Math.pow(10,Math.floor(On(t.max))-1)),null===t.max&&(t.max=0!==t.min?Math.pow(10,Math.floor(On(t.min))+1):10),null===t.minNotZero&&(t.min>0?t.minNotZero=t.min:t.max<1?t.minNotZero=Math.pow(10,Math.floor(On(t.max))):t.minNotZero=1)},buildTicks:function(){var t=this,e=t.options.ticks,n=!t.isHorizontal(),i={min:Rn(e.min),max:Rn(e.max)},a=t.ticks=function(t,e){var n,i,a=[],r=Fn(t.min,Math.pow(10,Math.floor(On(e.min)))),o=Math.floor(On(e.max)),s=Math.ceil(e.max/Math.pow(10,o));0===r?(n=Math.floor(On(e.minNotZero)),i=Math.floor(e.minNotZero/Math.pow(10,n)),a.push(r),r=i*Math.pow(10,n)):(n=Math.floor(On(r)),i=Math.floor(r/Math.pow(10,n)));var l=n<0?Math.pow(10,Math.abs(n)):1;do{a.push(r),10===++i&&(i=1,l=++n>=0?1:l),r=Math.round(i*Math.pow(10,n)*l)/l}while(n<o||n===o&&i<s);var u=Fn(t.max,r);return a.push(u),a}(i,t);t.max=H.max(a),t.min=H.min(a),e.reverse?(n=!n,t.start=t.max,t.end=t.min):(t.start=t.min,t.end=t.max),n&&a.reverse()},convertTicksToLabels:function(){this.tickValues=this.ticks.slice(),yn.prototype.convertTicksToLabels.call(this)},getLabelForIndex:function(t,e){return this._getScaleLabel(this.chart.data.datasets[e].data[t])},getPixelForTick:function(t){var e=this.tickValues;return t<0||t>e.length-1?null:this.getPixelForValue(e[t])},_getFirstTickValue:function(t){var e=Math.floor(On(t));return Math.floor(t/Math.pow(10,e))*Math.pow(10,e)},_configure:function(){var t=this,e=t.min,n=0;yn.prototype._configure.call(t),0===e&&(e=t._getFirstTickValue(t.minNotZero),n=Fn(t.options.ticks.fontSize,N.global.defaultFontSize)/t._length),t._startValue=On(e),t._valueOffset=n,t._valueRange=(On(t.max)-On(e))/(1-n)},getPixelForValue:function(t){var e=this,n=0;return(t=+e.getRightValue(t))>e.min&&t>0&&(n=(On(t)-e._startValue)/e._valueRange+e._valueOffset),e.getPixelForDecimal(n)},getValueForPixel:function(t){var e=this,n=e.getDecimalForPixel(t);return 0===n&&0===e.min?0:Math.pow(10,e._startValue+(n-e._valueOffset)*e._valueRange)}}),Nn=Ln;zn._defaults=Nn;var Bn=H.valueOrDefault,En=H.valueAtIndexOrDefault,Wn=H.options.resolve,Vn={display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,color:"rgba(0,0,0,0.1)",lineWidth:1,borderDash:[],borderDashOffset:0},gridLines:{circular:!1},ticks:{showLabelBackdrop:!0,backdropColor:"rgba(255,255,255,0.75)",backdropPaddingY:2,backdropPaddingX:2,callback:on.formatters.linear},pointLabels:{display:!0,fontSize:10,callback:function(t){return t}}};function Hn(t){var e=t.ticks;return e.display&&t.display?Bn(e.fontSize,N.global.defaultFontSize)+2*e.backdropPaddingY:0}function jn(t,e,n,i,a){return t===i||t===a?{start:e-n/2,end:e+n/2}:t<i||t>a?{start:e-n,end:e}:{start:e,end:e+n}}function qn(t){return 0===t||180===t?"center":t<180?"left":"right"}function Un(t,e,n,i){var a,r,o=n.y+i/2;if(H.isArray(e))for(a=0,r=e.length;a<r;++a)t.fillText(e[a],n.x,o),o+=i;else t.fillText(e,n.x,o)}function Yn(t,e,n){90===t||270===t?n.y-=e.h/2:(t>270||t<90)&&(n.y-=e.h)}function Gn(t){return H.isNumber(t)?t:0}var Xn=Cn.extend({setDimensions:function(){var t=this;t.width=t.maxWidth,t.height=t.maxHeight,t.paddingTop=Hn(t.options)/2,t.xCenter=Math.floor(t.width/2),t.yCenter=Math.floor((t.height-t.paddingTop)/2),t.drawingArea=Math.min(t.height-t.paddingTop,t.width)/2},determineDataLimits:function(){var t=this,e=t.chart,n=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;H.each(e.data.datasets,(function(a,r){if(e.isDatasetVisible(r)){var o=e.getDatasetMeta(r);H.each(a.data,(function(e,a){var r=+t.getRightValue(e);isNaN(r)||o.data[a].hidden||(n=Math.min(r,n),i=Math.max(r,i))}))}})),t.min=n===Number.POSITIVE_INFINITY?0:n,t.max=i===Number.NEGATIVE_INFINITY?0:i,t.handleTickRangeOptions()},_computeTickLimit:function(){return Math.ceil(this.drawingArea/Hn(this.options))},convertTicksToLabels:function(){var t=this;Cn.prototype.convertTicksToLabels.call(t),t.pointLabels=t.chart.data.labels.map((function(){var e=H.callback(t.options.pointLabels.callback,arguments,t);return e||0===e?e:""}))},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},fit:function(){var t=this.options;t.display&&t.pointLabels.display?function(t){var e,n,i,a=H.options._parseFont(t.options.pointLabels),r={l:0,r:t.width,t:0,b:t.height-t.paddingTop},o={};t.ctx.font=a.string,t._pointLabelSizes=[];var s,l,u,d=t.chart.data.labels.length;for(e=0;e<d;e++){i=t.getPointPosition(e,t.drawingArea+5),s=t.ctx,l=a.lineHeight,u=t.pointLabels[e],n=H.isArray(u)?{w:H.longestText(s,s.font,u),h:u.length*l}:{w:s.measureText(u).width,h:l},t._pointLabelSizes[e]=n;var h=t.getIndexAngle(e),c=H.toDegrees(h)%360,f=jn(c,i.x,n.w,0,180),g=jn(c,i.y,n.h,90,270);f.start<r.l&&(r.l=f.start,o.l=h),f.end>r.r&&(r.r=f.end,o.r=h),g.start<r.t&&(r.t=g.start,o.t=h),g.end>r.b&&(r.b=g.end,o.b=h)}t.setReductions(t.drawingArea,r,o)}(this):this.setCenterPoint(0,0,0,0)},setReductions:function(t,e,n){var i=this,a=e.l/Math.sin(n.l),r=Math.max(e.r-i.width,0)/Math.sin(n.r),o=-e.t/Math.cos(n.t),s=-Math.max(e.b-(i.height-i.paddingTop),0)/Math.cos(n.b);a=Gn(a),r=Gn(r),o=Gn(o),s=Gn(s),i.drawingArea=Math.min(Math.floor(t-(a+r)/2),Math.floor(t-(o+s)/2)),i.setCenterPoint(a,r,o,s)},setCenterPoint:function(t,e,n,i){var a=this,r=a.width-e-a.drawingArea,o=t+a.drawingArea,s=n+a.drawingArea,l=a.height-a.paddingTop-i-a.drawingArea;a.xCenter=Math.floor((o+r)/2+a.left),a.yCenter=Math.floor((s+l)/2+a.top+a.paddingTop)},getIndexAngle:function(t){var e=this.chart,n=(t*(360/e.data.labels.length)+((e.options||{}).startAngle||0))%360;return(n<0?n+360:n)*Math.PI*2/360},getDistanceFromCenterForValue:function(t){var e=this;if(H.isNullOrUndef(t))return NaN;var n=e.drawingArea/(e.max-e.min);return e.options.ticks.reverse?(e.max-t)*n:(t-e.min)*n},getPointPosition:function(t,e){var n=this.getIndexAngle(t)-Math.PI/2;return{x:Math.cos(n)*e+this.xCenter,y:Math.sin(n)*e+this.yCenter}},getPointPositionForValue:function(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))},getBasePosition:function(t){var e=this.min,n=this.max;return this.getPointPositionForValue(t||0,this.beginAtZero?0:e<0&&n<0?n:e>0&&n>0?e:0)},_drawGrid:function(){var t,e,n,i=this,a=i.ctx,r=i.options,o=r.gridLines,s=r.angleLines,l=Bn(s.lineWidth,o.lineWidth),u=Bn(s.color,o.color);if(r.pointLabels.display&&function(t){var e=t.ctx,n=t.options,i=n.pointLabels,a=Hn(n),r=t.getDistanceFromCenterForValue(n.ticks.reverse?t.min:t.max),o=H.options._parseFont(i);e.save(),e.font=o.string,e.textBaseline="middle";for(var s=t.chart.data.labels.length-1;s>=0;s--){var l=0===s?a/2:0,u=t.getPointPosition(s,r+l+5),d=En(i.fontColor,s,N.global.defaultFontColor);e.fillStyle=d;var h=t.getIndexAngle(s),c=H.toDegrees(h);e.textAlign=qn(c),Yn(c,t._pointLabelSizes[s],u),Un(e,t.pointLabels[s],u,o.lineHeight)}e.restore()}(i),o.display&&H.each(i.ticks,(function(t,n){0!==n&&(e=i.getDistanceFromCenterForValue(i.ticksAsNumbers[n]),function(t,e,n,i){var a,r=t.ctx,o=e.circular,s=t.chart.data.labels.length,l=En(e.color,i-1),u=En(e.lineWidth,i-1);if((o||s)&&l&&u){if(r.save(),r.strokeStyle=l,r.lineWidth=u,r.setLineDash&&(r.setLineDash(e.borderDash||[]),r.lineDashOffset=e.borderDashOffset||0),r.beginPath(),o)r.arc(t.xCenter,t.yCenter,n,0,2*Math.PI);else{a=t.getPointPosition(0,n),r.moveTo(a.x,a.y);for(var d=1;d<s;d++)a=t.getPointPosition(d,n),r.lineTo(a.x,a.y)}r.closePath(),r.stroke(),r.restore()}}(i,o,e,n))})),s.display&&l&&u){for(a.save(),a.lineWidth=l,a.strokeStyle=u,a.setLineDash&&(a.setLineDash(Wn([s.borderDash,o.borderDash,[]])),a.lineDashOffset=Wn([s.borderDashOffset,o.borderDashOffset,0])),t=i.chart.data.labels.length-1;t>=0;t--)e=i.getDistanceFromCenterForValue(r.ticks.reverse?i.min:i.max),n=i.getPointPosition(t,e),a.beginPath(),a.moveTo(i.xCenter,i.yCenter),a.lineTo(n.x,n.y),a.stroke();a.restore()}},_drawLabels:function(){var t=this,e=t.ctx,n=t.options.ticks;if(n.display){var i,a,r=t.getIndexAngle(0),o=H.options._parseFont(n),s=Bn(n.fontColor,N.global.defaultFontColor);e.save(),e.font=o.string,e.translate(t.xCenter,t.yCenter),e.rotate(r),e.textAlign="center",e.textBaseline="middle",H.each(t.ticks,(function(r,l){(0!==l||n.reverse)&&(i=t.getDistanceFromCenterForValue(t.ticksAsNumbers[l]),n.showLabelBackdrop&&(a=e.measureText(r).width,e.fillStyle=n.backdropColor,e.fillRect(-a/2-n.backdropPaddingX,-i-o.size/2-n.backdropPaddingY,a+2*n.backdropPaddingX,o.size+2*n.backdropPaddingY)),e.fillStyle=s,e.fillText(r,0,-i))})),e.restore()}},_drawTitle:H.noop}),Kn=Vn;Xn._defaults=Kn;var Zn=H._deprecated,$n=H.options.resolve,Jn=H.valueOrDefault,Qn=Number.MIN_SAFE_INTEGER||-9007199254740991,ti=Number.MAX_SAFE_INTEGER||9007199254740991,ei={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},ni=Object.keys(ei);function ii(t,e){return t-e}function ai(t){return H.valueOrDefault(t.time.min,t.ticks.min)}function ri(t){return H.valueOrDefault(t.time.max,t.ticks.max)}function oi(t,e,n,i){var a=function(t,e,n){for(var i,a,r,o=0,s=t.length-1;o>=0&&o<=s;){if(a=t[(i=o+s>>1)-1]||null,r=t[i],!a)return{lo:null,hi:r};if(r[e]<n)o=i+1;else{if(!(a[e]>n))return{lo:a,hi:r};s=i-1}}return{lo:r,hi:null}}(t,e,n),r=a.lo?a.hi?a.lo:t[t.length-2]:t[0],o=a.lo?a.hi?a.hi:t[t.length-1]:t[1],s=o[e]-r[e],l=s?(n-r[e])/s:0,u=(o[i]-r[i])*l;return r[i]+u}function si(t,e){var n=t._adapter,i=t.options.time,a=i.parser,r=a||i.format,o=e;return"function"==typeof a&&(o=a(o)),H.isFinite(o)||(o="string"==typeof r?n.parse(o,r):n.parse(o)),null!==o?+o:(a||"function"!=typeof r||(o=r(e),H.isFinite(o)||(o=n.parse(o))),o)}function li(t,e){if(H.isNullOrUndef(e))return null;var n=t.options.time,i=si(t,t.getRightValue(e));return null===i?i:(n.round&&(i=+t._adapter.startOf(i,n.round)),i)}function ui(t,e,n,i){var a,r,o,s=ni.length;for(a=ni.indexOf(t);a<s-1;++a)if(o=(r=ei[ni[a]]).steps?r.steps:ti,r.common&&Math.ceil((n-e)/(o*r.size))<=i)return ni[a];return ni[s-1]}function di(t,e,n){var i,a,r=[],o={},s=e.length;for(i=0;i<s;++i)o[a=e[i]]=i,r.push({value:a,major:!1});return 0!==s&&n?function(t,e,n,i){var a,r,o=t._adapter,s=+o.startOf(e[0].value,i),l=e[e.length-1].value;for(a=s;a<=l;a=+o.add(a,1,i))(r=n[a])>=0&&(e[r].major=!0);return e}(t,r,o,n):r}var hi=yn.extend({initialize:function(){this.mergeTicksOptions(),yn.prototype.initialize.call(this)},update:function(){var t=this,e=t.options,n=e.time||(e.time={}),i=t._adapter=new rn._date(e.adapters.date);return Zn("time scale",n.format,"time.format","time.parser"),Zn("time scale",n.min,"time.min","ticks.min"),Zn("time scale",n.max,"time.max","ticks.max"),H.mergeIf(n.displayFormats,i.formats()),yn.prototype.update.apply(t,arguments)},getRightValue:function(t){return t&&void 0!==t.t&&(t=t.t),yn.prototype.getRightValue.call(this,t)},determineDataLimits:function(){var t,e,n,i,a,r,o,s=this,l=s.chart,u=s._adapter,d=s.options,h=d.time.unit||"day",c=ti,f=Qn,g=[],p=[],m=[],v=s._getLabels();for(t=0,n=v.length;t<n;++t)m.push(li(s,v[t]));for(t=0,n=(l.data.datasets||[]).length;t<n;++t)if(l.isDatasetVisible(t))if(a=l.data.datasets[t].data,H.isObject(a[0]))for(p[t]=[],e=0,i=a.length;e<i;++e)r=li(s,a[e]),g.push(r),p[t][e]=r;else p[t]=m.slice(0),o||(g=g.concat(m),o=!0);else p[t]=[];m.length&&(c=Math.min(c,m[0]),f=Math.max(f,m[m.length-1])),g.length&&(g=n>1?function(t){var e,n,i,a={},r=[];for(e=0,n=t.length;e<n;++e)a[i=t[e]]||(a[i]=!0,r.push(i));return r}(g).sort(ii):g.sort(ii),c=Math.min(c,g[0]),f=Math.max(f,g[g.length-1])),c=li(s,ai(d))||c,f=li(s,ri(d))||f,c=c===ti?+u.startOf(Date.now(),h):c,f=f===Qn?+u.endOf(Date.now(),h)+1:f,s.min=Math.min(c,f),s.max=Math.max(c+1,f),s._table=[],s._timestamps={data:g,datasets:p,labels:m}},buildTicks:function(){var t,e,n,i=this,a=i.min,r=i.max,o=i.options,s=o.ticks,l=o.time,u=i._timestamps,d=[],h=i.getLabelCapacity(a),c=s.source,f=o.distribution;for(u="data"===c||"auto"===c&&"series"===f?u.data:"labels"===c?u.labels:function(t,e,n,i){var a,r=t._adapter,o=t.options,s=o.time,l=s.unit||ui(s.minUnit,e,n,i),u=$n([s.stepSize,s.unitStepSize,1]),d="week"===l&&s.isoWeekday,h=e,c=[];if(d&&(h=+r.startOf(h,"isoWeek",d)),h=+r.startOf(h,d?"day":l),r.diff(n,e,l)>1e5*u)throw e+" and "+n+" are too far apart with stepSize of "+u+" "+l;for(a=h;a<n;a=+r.add(a,u,l))c.push(a);return a!==n&&"ticks"!==o.bounds||c.push(a),c}(i,a,r,h),"ticks"===o.bounds&&u.length&&(a=u[0],r=u[u.length-1]),a=li(i,ai(o))||a,r=li(i,ri(o))||r,t=0,e=u.length;t<e;++t)(n=u[t])>=a&&n<=r&&d.push(n);return i.min=a,i.max=r,i._unit=l.unit||(s.autoSkip?ui(l.minUnit,i.min,i.max,h):function(t,e,n,i,a){var r,o;for(r=ni.length-1;r>=ni.indexOf(n);r--)if(o=ni[r],ei[o].common&&t._adapter.diff(a,i,o)>=e-1)return o;return ni[n?ni.indexOf(n):0]}(i,d.length,l.minUnit,i.min,i.max)),i._majorUnit=s.major.enabled&&"year"!==i._unit?function(t){for(var e=ni.indexOf(t)+1,n=ni.length;e<n;++e)if(ei[ni[e]].common)return ni[e]}(i._unit):void 0,i._table=function(t,e,n,i){if("linear"===i||!t.length)return[{time:e,pos:0},{time:n,pos:1}];var a,r,o,s,l,u=[],d=[e];for(a=0,r=t.length;a<r;++a)(s=t[a])>e&&s<n&&d.push(s);for(d.push(n),a=0,r=d.length;a<r;++a)l=d[a+1],o=d[a-1],s=d[a],void 0!==o&&void 0!==l&&Math.round((l+o)/2)===s||u.push({time:s,pos:a/(r-1)});return u}(i._timestamps.data,a,r,f),i._offsets=function(t,e,n,i,a){var r,o,s=0,l=0;return a.offset&&e.length&&(r=oi(t,"time",e[0],"pos"),s=1===e.length?1-r:(oi(t,"time",e[1],"pos")-r)/2,o=oi(t,"time",e[e.length-1],"pos"),l=1===e.length?o:(o-oi(t,"time",e[e.length-2],"pos"))/2),{start:s,end:l,factor:1/(s+1+l)}}(i._table,d,0,0,o),s.reverse&&d.reverse(),di(i,d,i._majorUnit)},getLabelForIndex:function(t,e){var n=this,i=n._adapter,a=n.chart.data,r=n.options.time,o=a.labels&&t<a.labels.length?a.labels[t]:"",s=a.datasets[e].data[t];return H.isObject(s)&&(o=n.getRightValue(s)),r.tooltipFormat?i.format(si(n,o),r.tooltipFormat):"string"==typeof o?o:i.format(si(n,o),r.displayFormats.datetime)},tickFormatFunction:function(t,e,n,i){var a=this._adapter,r=this.options,o=r.time.displayFormats,s=o[this._unit],l=this._majorUnit,u=o[l],d=n[e],h=r.ticks,c=l&&u&&d&&d.major,f=a.format(t,i||(c?u:s)),g=c?h.major:h.minor,p=$n([g.callback,g.userCallback,h.callback,h.userCallback]);return p?p(f,e,n):f},convertTicksToLabels:function(t){var e,n,i=[];for(e=0,n=t.length;e<n;++e)i.push(this.tickFormatFunction(t[e].value,e,t));return i},getPixelForOffset:function(t){var e=this._offsets,n=oi(this._table,"time",t,"pos");return this.getPixelForDecimal((e.start+n)*e.factor)},getPixelForValue:function(t,e,n){var i=null;if(void 0!==e&&void 0!==n&&(i=this._timestamps.datasets[n][e]),null===i&&(i=li(this,t)),null!==i)return this.getPixelForOffset(i)},getPixelForTick:function(t){var e=this.getTicks();return t>=0&&t<e.length?this.getPixelForOffset(e[t].value):null},getValueForPixel:function(t){var e=this._offsets,n=this.getDecimalForPixel(t)/e.factor-e.end,i=oi(this._table,"pos",n,"time");return this._adapter._create(i)},_getLabelSize:function(t){var e=this.options.ticks,n=this.ctx.measureText(t).width,i=H.toRadians(this.isHorizontal()?e.maxRotation:e.minRotation),a=Math.cos(i),r=Math.sin(i),o=Jn(e.fontSize,N.global.defaultFontSize);return{w:n*a+o*r,h:n*r+o*a}},getLabelWidth:function(t){return this._getLabelSize(t).w},getLabelCapacity:function(t){var e=this,n=e.options.time,i=n.displayFormats,a=i[n.unit]||i.millisecond,r=e.tickFormatFunction(t,0,di(e,[t],e._majorUnit),a),o=e._getLabelSize(r),s=Math.floor(e.isHorizontal()?e.width/o.w:e.height/o.h);return e.options.offset&&s--,s>0?s:1}}),ci={position:"bottom",distribution:"linear",bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,displayFormat:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{autoSkip:!1,source:"auto",major:{enabled:!1}}};hi._defaults=ci;var fi={category:kn,linear:Tn,logarithmic:zn,radialLinear:Xn,time:hi},gi={datetime:"MMM D, YYYY, h:mm:ss a",millisecond:"h:mm:ss.SSS a",second:"h:mm:ss a",minute:"h:mm a",hour:"hA",day:"MMM D",week:"ll",month:"MMM YYYY",quarter:"[Q]Q - YYYY",year:"YYYY"};rn._date.override("function"==typeof t?{_id:"moment",formats:function(){return gi},parse:function(e,n){return"string"==typeof e&&"string"==typeof n?e=t(e,n):e instanceof t||(e=t(e)),e.isValid()?e.valueOf():null},format:function(e,n){return t(e).format(n)},add:function(e,n,i){return t(e).add(n,i).valueOf()},diff:function(e,n,i){return t(e).diff(t(n),i)},startOf:function(e,n,i){return e=t(e),"isoWeek"===n?e.isoWeekday(i).valueOf():e.startOf(n).valueOf()},endOf:function(e,n){return t(e).endOf(n).valueOf()},_create:function(e){return t(e)}}:{}),N._set("global",{plugins:{filler:{propagate:!0}}});var pi={dataset:function(t){var e=t.fill,n=t.chart,i=n.getDatasetMeta(e),a=i&&n.isDatasetVisible(e)&&i.dataset._children||[],r=a.length||0;return r?function(t,e){return e<r&&a[e]._view||null}:null},boundary:function(t){var e=t.boundary,n=e?e.x:null,i=e?e.y:null;return H.isArray(e)?function(t,n){return e[n]}:function(t){return{x:null===n?t.x:n,y:null===i?t.y:i}}}};function mi(t,e,n){var i,a=t._model||{},r=a.fill;if(void 0===r&&(r=!!a.backgroundColor),!1===r||null===r)return!1;if(!0===r)return"origin";if(i=parseFloat(r,10),isFinite(i)&&Math.floor(i)===i)return"-"!==r[0]&&"+"!==r[0]||(i=e+i),!(i===e||i<0||i>=n)&&i;switch(r){case"bottom":return"start";case"top":return"end";case"zero":return"origin";case"origin":case"start":case"end":return r;default:return!1}}function vi(t){return(t.el._scale||{}).getPointPositionForValue?function(t){var e,n,i,a,r,o=t.el._scale,s=o.options,l=o.chart.data.labels.length,u=t.fill,d=[];if(!l)return null;for(e=s.ticks.reverse?o.max:o.min,n=s.ticks.reverse?o.min:o.max,i=o.getPointPositionForValue(0,e),a=0;a<l;++a)r="start"===u||"end"===u?o.getPointPositionForValue(a,"start"===u?e:n):o.getBasePosition(a),s.gridLines.circular&&(r.cx=i.x,r.cy=i.y,r.angle=o.getIndexAngle(a)-Math.PI/2),d.push(r);return d}(t):function(t){var e,n=t.el._model||{},i=t.el._scale||{},a=t.fill,r=null;if(isFinite(a))return null;if("start"===a?r=void 0===n.scaleBottom?i.bottom:n.scaleBottom:"end"===a?r=void 0===n.scaleTop?i.top:n.scaleTop:void 0!==n.scaleZero?r=n.scaleZero:i.getBasePixel&&(r=i.getBasePixel()),null!=r){if(void 0!==r.x&&void 0!==r.y)return r;if(H.isFinite(r))return{x:(e=i.isHorizontal())?r:null,y:e?null:r}}return null}(t)}function bi(t,e,n){var i,a=t[e].fill,r=[e];if(!n)return a;for(;!1!==a&&-1===r.indexOf(a);){if(!isFinite(a))return a;if(!(i=t[a]))return!1;if(i.visible)return a;r.push(a),a=i.fill}return!1}function xi(t){var e=t.fill,n="dataset";return!1===e?null:(isFinite(e)||(n="boundary"),pi[n](t))}function yi(t){return t&&!t.skip}function _i(t,e,n,i,a){var r,o,s,l;if(i&&a){for(t.moveTo(e[0].x,e[0].y),r=1;r<i;++r)H.canvas.lineTo(t,e[r-1],e[r]);if(void 0===n[0].angle)for(t.lineTo(n[a-1].x,n[a-1].y),r=a-1;r>0;--r)H.canvas.lineTo(t,n[r],n[r-1],!0);else for(o=n[0].cx,s=n[0].cy,l=Math.sqrt(Math.pow(n[0].x-o,2)+Math.pow(n[0].y-s,2)),r=a-1;r>0;--r)t.arc(o,s,l,n[r].angle,n[r-1].angle,!0)}}function ki(t,e,n,i,a,r){var o,s,l,u,d,h,c,f,g=e.length,p=i.spanGaps,m=[],v=[],b=0,x=0;for(t.beginPath(),o=0,s=g;o<s;++o)d=n(u=e[l=o%g]._view,l,i),h=yi(u),c=yi(d),r&&void 0===f&&h&&(s=g+(f=o+1)),h&&c?(b=m.push(u),x=v.push(d)):b&&x&&(p?(h&&m.push(u),c&&v.push(d)):(_i(t,m,v,b,x),b=x=0,m=[],v=[]));_i(t,m,v,b,x),t.closePath(),t.fillStyle=a,t.fill()}var wi={id:"filler",afterDatasetsUpdate:function(t,e){var n,i,a,r,o=(t.data.datasets||[]).length,s=e.propagate,l=[];for(i=0;i<o;++i)r=null,(a=(n=t.getDatasetMeta(i)).dataset)&&a._model&&a instanceof kt.Line&&(r={visible:t.isDatasetVisible(i),fill:mi(a,i,o),chart:t,el:a}),n.$filler=r,l.push(r);for(i=0;i<o;++i)(r=l[i])&&(r.fill=bi(l,i,s),r.boundary=vi(r),r.mapper=xi(r))},beforeDatasetsDraw:function(t){var e,n,i,a,r,o,s,l=t._getSortedVisibleDatasetMetas(),u=t.ctx;for(n=l.length-1;n>=0;--n)(e=l[n].$filler)&&e.visible&&(a=(i=e.el)._view,r=i._children||[],o=e.mapper,s=a.backgroundColor||N.global.defaultColor,o&&s&&r.length&&(H.canvas.clipArea(u,t.chartArea),ki(u,r,o,a,s,i._loop),H.canvas.unclipArea(u)))}},Mi=H.rtl.getRtlAdapter,Si=H.noop,Ci=H.valueOrDefault;function Pi(t,e){return t.usePointStyle&&t.boxWidth>e?e:t.boxWidth}N._set("global",{legend:{display:!0,position:"top",align:"center",fullWidth:!0,reverse:!1,weight:1e3,onClick:function(t,e){var n=e.datasetIndex,i=this.chart,a=i.getDatasetMeta(n);a.hidden=null===a.hidden?!i.data.datasets[n].hidden:null,i.update()},onHover:null,onLeave:null,labels:{boxWidth:40,padding:10,generateLabels:function(t){var e=t.data.datasets,n=t.options.legend||{},i=n.labels&&n.labels.usePointStyle;return t._getSortedDatasetMetas().map((function(n){var a=n.controller.getStyle(i?0:void 0);return{text:e[n.index].label,fillStyle:a.backgroundColor,hidden:!t.isDatasetVisible(n.index),lineCap:a.borderCapStyle,lineDash:a.borderDash,lineDashOffset:a.borderDashOffset,lineJoin:a.borderJoinStyle,lineWidth:a.borderWidth,strokeStyle:a.borderColor,pointStyle:a.pointStyle,rotation:a.rotation,datasetIndex:n.index}}),this)}}},legendCallback:function(t){var e,n,i,a=document.createElement("ul"),r=t.data.datasets;for(a.setAttribute("class",t.id+"-legend"),e=0,n=r.length;e<n;e++)(i=a.appendChild(document.createElement("li"))).appendChild(document.createElement("span")).style.backgroundColor=r[e].backgroundColor,r[e].label&&i.appendChild(document.createTextNode(r[e].label));return a.outerHTML}});var Ai=K.extend({initialize:function(t){H.extend(this,t),this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1},beforeUpdate:Si,update:function(t,e,n){var i=this;return i.beforeUpdate(),i.maxWidth=t,i.maxHeight=e,i.margins=n,i.beforeSetDimensions(),i.setDimensions(),i.afterSetDimensions(),i.beforeBuildLabels(),i.buildLabels(),i.afterBuildLabels(),i.beforeFit(),i.fit(),i.afterFit(),i.afterUpdate(),i.minSize},afterUpdate:Si,beforeSetDimensions:Si,setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0,t.minSize={width:0,height:0}},afterSetDimensions:Si,beforeBuildLabels:Si,buildLabels:function(){var t=this,e=t.options.labels||{},n=H.callback(e.generateLabels,[t.chart],t)||[];e.filter&&(n=n.filter((function(n){return e.filter(n,t.chart.data)}))),t.options.reverse&&n.reverse(),t.legendItems=n},afterBuildLabels:Si,beforeFit:Si,fit:function(){var t=this,e=t.options,n=e.labels,i=e.display,a=t.ctx,r=H.options._parseFont(n),o=r.size,s=t.legendHitBoxes=[],l=t.minSize,u=t.isHorizontal();if(u?(l.width=t.maxWidth,l.height=i?10:0):(l.width=i?10:0,l.height=t.maxHeight),i){if(a.font=r.string,u){var d=t.lineWidths=[0],h=0;a.textAlign="left",a.textBaseline="middle",H.each(t.legendItems,(function(t,e){var i=Pi(n,o)+o/2+a.measureText(t.text).width;(0===e||d[d.length-1]+i+2*n.padding>l.width)&&(h+=o+n.padding,d[d.length-(e>0?0:1)]=0),s[e]={left:0,top:0,width:i,height:o},d[d.length-1]+=i+n.padding})),l.height+=h}else{var c=n.padding,f=t.columnWidths=[],g=t.columnHeights=[],p=n.padding,m=0,v=0;H.each(t.legendItems,(function(t,e){var i=Pi(n,o)+o/2+a.measureText(t.text).width;e>0&&v+o+2*c>l.height&&(p+=m+n.padding,f.push(m),g.push(v),m=0,v=0),m=Math.max(m,i),v+=o+c,s[e]={left:0,top:0,width:i,height:o}})),p+=m,f.push(m),g.push(v),l.width+=p}t.width=l.width,t.height=l.height}else t.width=l.width=t.height=l.height=0},afterFit:Si,isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},draw:function(){var t=this,e=t.options,n=e.labels,i=N.global,a=i.defaultColor,r=i.elements.line,o=t.height,s=t.columnHeights,l=t.width,u=t.lineWidths;if(e.display){var d,h=Mi(e.rtl,t.left,t.minSize.width),c=t.ctx,f=Ci(n.fontColor,i.defaultFontColor),g=H.options._parseFont(n),p=g.size;c.textAlign=h.textAlign("left"),c.textBaseline="middle",c.lineWidth=.5,c.strokeStyle=f,c.fillStyle=f,c.font=g.string;var m=Pi(n,p),v=t.legendHitBoxes,b=function(t,i){switch(e.align){case"start":return n.padding;case"end":return t-i;default:return(t-i+n.padding)/2}},x=t.isHorizontal();d=x?{x:t.left+b(l,u[0]),y:t.top+n.padding,line:0}:{x:t.left+n.padding,y:t.top+b(o,s[0]),line:0},H.rtl.overrideTextDirection(t.ctx,e.textDirection);var y=p+n.padding;H.each(t.legendItems,(function(e,i){var f=c.measureText(e.text).width,g=m+p/2+f,_=d.x,k=d.y;h.setWidth(t.minSize.width),x?i>0&&_+g+n.padding>t.left+t.minSize.width&&(k=d.y+=y,d.line++,_=d.x=t.left+b(l,u[d.line])):i>0&&k+y>t.top+t.minSize.height&&(_=d.x=_+t.columnWidths[d.line]+n.padding,d.line++,k=d.y=t.top+b(o,s[d.line]));var w=h.x(_);!function(t,e,i){if(!(isNaN(m)||m<=0)){c.save();var o=Ci(i.lineWidth,r.borderWidth);if(c.fillStyle=Ci(i.fillStyle,a),c.lineCap=Ci(i.lineCap,r.borderCapStyle),c.lineDashOffset=Ci(i.lineDashOffset,r.borderDashOffset),c.lineJoin=Ci(i.lineJoin,r.borderJoinStyle),c.lineWidth=o,c.strokeStyle=Ci(i.strokeStyle,a),c.setLineDash&&c.setLineDash(Ci(i.lineDash,r.borderDash)),n&&n.usePointStyle){var s=m*Math.SQRT2/2,l=h.xPlus(t,m/2),u=e+p/2;H.canvas.drawPoint(c,i.pointStyle,s,l,u,i.rotation)}else c.fillRect(h.leftForLtr(t,m),e,m,p),0!==o&&c.strokeRect(h.leftForLtr(t,m),e,m,p);c.restore()}}(w,k,e),v[i].left=h.leftForLtr(w,v[i].width),v[i].top=k,function(t,e,n,i){var a=p/2,r=h.xPlus(t,m+a),o=e+a;c.fillText(n.text,r,o),n.hidden&&(c.beginPath(),c.lineWidth=2,c.moveTo(r,o),c.lineTo(h.xPlus(r,i),o),c.stroke())}(w,k,e,f),x?d.x+=g+n.padding:d.y+=y})),H.rtl.restoreTextDirection(t.ctx,e.textDirection)}},_getLegendItemAt:function(t,e){var n,i,a,r=this;if(t>=r.left&&t<=r.right&&e>=r.top&&e<=r.bottom)for(a=r.legendHitBoxes,n=0;n<a.length;++n)if(t>=(i=a[n]).left&&t<=i.left+i.width&&e>=i.top&&e<=i.top+i.height)return r.legendItems[n];return null},handleEvent:function(t){var e,n=this,i=n.options,a="mouseup"===t.type?"click":t.type;if("mousemove"===a){if(!i.onHover&&!i.onLeave)return}else{if("click"!==a)return;if(!i.onClick)return}e=n._getLegendItemAt(t.x,t.y),"click"===a?e&&i.onClick&&i.onClick.call(n,t.native,e):(i.onLeave&&e!==n._hoveredItem&&(n._hoveredItem&&i.onLeave.call(n,t.native,n._hoveredItem),n._hoveredItem=e),i.onHover&&e&&i.onHover.call(n,t.native,e))}});function Di(t,e){var n=new Ai({ctx:t.ctx,options:e,chart:t});pe.configure(t,n,e),pe.addBox(t,n),t.legend=n}var Ti={id:"legend",_element:Ai,beforeInit:function(t){var e=t.options.legend;e&&Di(t,e)},beforeUpdate:function(t){var e=t.options.legend,n=t.legend;e?(H.mergeIf(e,N.global.legend),n?(pe.configure(t,n,e),n.options=e):Di(t,e)):n&&(pe.removeBox(t,n),delete t.legend)},afterEvent:function(t,e){var n=t.legend;n&&n.handleEvent(e)}},Ii=H.noop;N._set("global",{title:{display:!1,fontStyle:"bold",fullWidth:!0,padding:10,position:"top",text:"",weight:2e3}});var Fi=K.extend({initialize:function(t){H.extend(this,t),this.legendHitBoxes=[]},beforeUpdate:Ii,update:function(t,e,n){var i=this;return i.beforeUpdate(),i.maxWidth=t,i.maxHeight=e,i.margins=n,i.beforeSetDimensions(),i.setDimensions(),i.afterSetDimensions(),i.beforeBuildLabels(),i.buildLabels(),i.afterBuildLabels(),i.beforeFit(),i.fit(),i.afterFit(),i.afterUpdate(),i.minSize},afterUpdate:Ii,beforeSetDimensions:Ii,setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0,t.minSize={width:0,height:0}},afterSetDimensions:Ii,beforeBuildLabels:Ii,buildLabels:Ii,afterBuildLabels:Ii,beforeFit:Ii,fit:function(){var t,e=this,n=e.options,i=e.minSize={},a=e.isHorizontal();n.display?(t=(H.isArray(n.text)?n.text.length:1)*H.options._parseFont(n).lineHeight+2*n.padding,e.width=i.width=a?e.maxWidth:t,e.height=i.height=a?t:e.maxHeight):e.width=i.width=e.height=i.height=0},afterFit:Ii,isHorizontal:function(){var t=this.options.position;return"top"===t||"bottom"===t},draw:function(){var t=this,e=t.ctx,n=t.options;if(n.display){var i,a,r,o=H.options._parseFont(n),s=o.lineHeight,l=s/2+n.padding,u=0,d=t.top,h=t.left,c=t.bottom,f=t.right;e.fillStyle=H.valueOrDefault(n.fontColor,N.global.defaultFontColor),e.font=o.string,t.isHorizontal()?(a=h+(f-h)/2,r=d+l,i=f-h):(a="left"===n.position?h+l:f-l,r=d+(c-d)/2,i=c-d,u=Math.PI*("left"===n.position?-.5:.5)),e.save(),e.translate(a,r),e.rotate(u),e.textAlign="center",e.textBaseline="middle";var g=n.text;if(H.isArray(g))for(var p=0,m=0;m<g.length;++m)e.fillText(g[m],0,p,i),p+=s;else e.fillText(g,0,0,i);e.restore()}}});function Oi(t,e){var n=new Fi({ctx:t.ctx,options:e,chart:t});pe.configure(t,n,e),pe.addBox(t,n),t.titleBlock=n}var Li={},Ri=wi,zi=Ti,Ni={id:"title",_element:Fi,beforeInit:function(t){var e=t.options.title;e&&Oi(t,e)},beforeUpdate:function(t){var e=t.options.title,n=t.titleBlock;e?(H.mergeIf(e,N.global.title),n?(pe.configure(t,n,e),n.options=e):Oi(t,e)):n&&(pe.removeBox(t,n),delete t.titleBlock)}};for(var Bi in Li.filler=Ri,Li.legend=zi,Li.title=Ni,en.helpers=H,function(){function t(t,e,n){var i;return"string"==typeof t?(i=parseInt(t,10),-1!==t.indexOf("%")&&(i=i/100*e.parentNode[n])):i=t,i}function e(t){return null!=t&&"none"!==t}function n(n,i,a){var r=document.defaultView,o=H._getParentNode(n),s=r.getComputedStyle(n)[i],l=r.getComputedStyle(o)[i],u=e(s),d=e(l),h=Number.POSITIVE_INFINITY;return u||d?Math.min(u?t(s,n,a):h,d?t(l,o,a):h):"none"}H.where=function(t,e){if(H.isArray(t)&&Array.prototype.filter)return t.filter(e);var n=[];return H.each(t,(function(t){e(t)&&n.push(t)})),n},H.findIndex=Array.prototype.findIndex?function(t,e,n){return t.findIndex(e,n)}:function(t,e,n){n=void 0===n?t:n;for(var i=0,a=t.length;i<a;++i)if(e.call(n,t[i],i,t))return i;return-1},H.findNextWhere=function(t,e,n){H.isNullOrUndef(n)&&(n=-1);for(var i=n+1;i<t.length;i++){var a=t[i];if(e(a))return a}},H.findPreviousWhere=function(t,e,n){H.isNullOrUndef(n)&&(n=t.length);for(var i=n-1;i>=0;i--){var a=t[i];if(e(a))return a}},H.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},H.almostEquals=function(t,e,n){return Math.abs(t-e)<n},H.almostWhole=function(t,e){var n=Math.round(t);return n-e<=t&&n+e>=t},H.max=function(t){return t.reduce((function(t,e){return isNaN(e)?t:Math.max(t,e)}),Number.NEGATIVE_INFINITY)},H.min=function(t){return t.reduce((function(t,e){return isNaN(e)?t:Math.min(t,e)}),Number.POSITIVE_INFINITY)},H.sign=Math.sign?function(t){return Math.sign(t)}:function(t){return 0===(t=+t)||isNaN(t)?t:t>0?1:-1},H.toRadians=function(t){return t*(Math.PI/180)},H.toDegrees=function(t){return t*(180/Math.PI)},H._decimalPlaces=function(t){if(H.isFinite(t)){for(var e=1,n=0;Math.round(t*e)/e!==t;)e*=10,n++;return n}},H.getAngleFromPoint=function(t,e){var n=e.x-t.x,i=e.y-t.y,a=Math.sqrt(n*n+i*i),r=Math.atan2(i,n);return r<-.5*Math.PI&&(r+=2*Math.PI),{angle:r,distance:a}},H.distanceBetweenPoints=function(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))},H.aliasPixel=function(t){return t%2==0?0:.5},H._alignPixel=function(t,e,n){var i=t.currentDevicePixelRatio,a=n/2;return Math.round((e-a)*i)/i+a},H.splineCurve=function(t,e,n,i){var a=t.skip?e:t,r=e,o=n.skip?e:n,s=Math.sqrt(Math.pow(r.x-a.x,2)+Math.pow(r.y-a.y,2)),l=Math.sqrt(Math.pow(o.x-r.x,2)+Math.pow(o.y-r.y,2)),u=s/(s+l),d=l/(s+l),h=i*(u=isNaN(u)?0:u),c=i*(d=isNaN(d)?0:d);return{previous:{x:r.x-h*(o.x-a.x),y:r.y-h*(o.y-a.y)},next:{x:r.x+c*(o.x-a.x),y:r.y+c*(o.y-a.y)}}},H.EPSILON=Number.EPSILON||1e-14,H.splineCurveMonotone=function(t){var e,n,i,a,r,o,s,l,u,d=(t||[]).map((function(t){return{model:t._model,deltaK:0,mK:0}})),h=d.length;for(e=0;e<h;++e)if(!(i=d[e]).model.skip){if(n=e>0?d[e-1]:null,(a=e<h-1?d[e+1]:null)&&!a.model.skip){var c=a.model.x-i.model.x;i.deltaK=0!==c?(a.model.y-i.model.y)/c:0}!n||n.model.skip?i.mK=i.deltaK:!a||a.model.skip?i.mK=n.deltaK:this.sign(n.deltaK)!==this.sign(i.deltaK)?i.mK=0:i.mK=(n.deltaK+i.deltaK)/2}for(e=0;e<h-1;++e)i=d[e],a=d[e+1],i.model.skip||a.model.skip||(H.almostEquals(i.deltaK,0,this.EPSILON)?i.mK=a.mK=0:(r=i.mK/i.deltaK,o=a.mK/i.deltaK,(l=Math.pow(r,2)+Math.pow(o,2))<=9||(s=3/Math.sqrt(l),i.mK=r*s*i.deltaK,a.mK=o*s*i.deltaK)));for(e=0;e<h;++e)(i=d[e]).model.skip||(n=e>0?d[e-1]:null,a=e<h-1?d[e+1]:null,n&&!n.model.skip&&(u=(i.model.x-n.model.x)/3,i.model.controlPointPreviousX=i.model.x-u,i.model.controlPointPreviousY=i.model.y-u*i.mK),a&&!a.model.skip&&(u=(a.model.x-i.model.x)/3,i.model.controlPointNextX=i.model.x+u,i.model.controlPointNextY=i.model.y+u*i.mK))},H.nextItem=function(t,e,n){return n?e>=t.length-1?t[0]:t[e+1]:e>=t.length-1?t[t.length-1]:t[e+1]},H.previousItem=function(t,e,n){return n?e<=0?t[t.length-1]:t[e-1]:e<=0?t[0]:t[e-1]},H.niceNum=function(t,e){var n=Math.floor(H.log10(t)),i=t/Math.pow(10,n);return(e?i<1.5?1:i<3?2:i<7?5:10:i<=1?1:i<=2?2:i<=5?5:10)*Math.pow(10,n)},H.requestAnimFrame="undefined"==typeof window?function(t){t()}:window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)},H.getRelativePosition=function(t,e){var n,i,a=t.originalEvent||t,r=t.target||t.srcElement,o=r.getBoundingClientRect(),s=a.touches;s&&s.length>0?(n=s[0].clientX,i=s[0].clientY):(n=a.clientX,i=a.clientY);var l=parseFloat(H.getStyle(r,"padding-left")),u=parseFloat(H.getStyle(r,"padding-top")),d=parseFloat(H.getStyle(r,"padding-right")),h=parseFloat(H.getStyle(r,"padding-bottom")),c=o.right-o.left-l-d,f=o.bottom-o.top-u-h;return{x:n=Math.round((n-o.left-l)/c*r.width/e.currentDevicePixelRatio),y:i=Math.round((i-o.top-u)/f*r.height/e.currentDevicePixelRatio)}},H.getConstraintWidth=function(t){return n(t,"max-width","clientWidth")},H.getConstraintHeight=function(t){return n(t,"max-height","clientHeight")},H._calculatePadding=function(t,e,n){return(e=H.getStyle(t,e)).indexOf("%")>-1?n*parseInt(e,10)/100:parseInt(e,10)},H._getParentNode=function(t){var e=t.parentNode;return e&&"[object ShadowRoot]"===e.toString()&&(e=e.host),e},H.getMaximumWidth=function(t){var e=H._getParentNode(t);if(!e)return t.clientWidth;var n=e.clientWidth,i=n-H._calculatePadding(e,"padding-left",n)-H._calculatePadding(e,"padding-right",n),a=H.getConstraintWidth(t);return isNaN(a)?i:Math.min(i,a)},H.getMaximumHeight=function(t){var e=H._getParentNode(t);if(!e)return t.clientHeight;var n=e.clientHeight,i=n-H._calculatePadding(e,"padding-top",n)-H._calculatePadding(e,"padding-bottom",n),a=H.getConstraintHeight(t);return isNaN(a)?i:Math.min(i,a)},H.getStyle=function(t,e){return t.currentStyle?t.currentStyle[e]:document.defaultView.getComputedStyle(t,null).getPropertyValue(e)},H.retinaScale=function(t,e){var n=t.currentDevicePixelRatio=e||"undefined"!=typeof window&&window.devicePixelRatio||1;if(1!==n){var i=t.canvas,a=t.height,r=t.width;i.height=a*n,i.width=r*n,t.ctx.scale(n,n),i.style.height||i.style.width||(i.style.height=a+"px",i.style.width=r+"px")}},H.fontString=function(t,e,n){return e+" "+t+"px "+n},H.longestText=function(t,e,n,i){var a=(i=i||{}).data=i.data||{},r=i.garbageCollect=i.garbageCollect||[];i.font!==e&&(a=i.data={},r=i.garbageCollect=[],i.font=e),t.font=e;var o,s,l,u,d,h=0,c=n.length;for(o=0;o<c;o++)if(null!=(u=n[o])&&!0!==H.isArray(u))h=H.measureText(t,a,r,h,u);else if(H.isArray(u))for(s=0,l=u.length;s<l;s++)null==(d=u[s])||H.isArray(d)||(h=H.measureText(t,a,r,h,d));var f=r.length/2;if(f>n.length){for(o=0;o<f;o++)delete a[r[o]];r.splice(0,f)}return h},H.measureText=function(t,e,n,i,a){var r=e[a];return r||(r=e[a]=t.measureText(a).width,n.push(a)),r>i&&(i=r),i},H.numberOfLabelLines=function(t){var e=1;return H.each(t,(function(t){H.isArray(t)&&t.length>e&&(e=t.length)})),e},H.color=_?function(t){return t instanceof CanvasGradient&&(t=N.global.defaultColor),_(t)}:function(t){return console.error("Color.js not found!"),t},H.getHoverColor=function(t){return t instanceof CanvasPattern||t instanceof CanvasGradient?t:H.color(t).saturate(.5).darken(.1).rgbString()}}(),en._adapters=rn,en.Animation=$,en.animationService=J,en.controllers=Jt,en.DatasetController=it,en.defaults=N,en.Element=K,en.elements=kt,en.Interaction=re,en.layouts=pe,en.platform=Oe,en.plugins=Le,en.Scale=yn,en.scaleService=Re,en.Ticks=on,en.Tooltip=Ye,en.helpers.each(fi,(function(t,e){en.scaleService.registerScaleType(e,t,t._defaults)})),Li)Li.hasOwnProperty(Bi)&&en.plugins.register(Li[Bi]);en.platform.initialize();var Ei=en;return"undefined"!=typeof window&&(window.Chart=en),en.Chart=en,en.Legend=Li.legend._element,en.Title=Li.title._element,en.pluginService=en.plugins,en.PluginBase=en.Element.extend({}),en.canvasHelpers=en.helpers.canvas,en.layoutService=en.layouts,en.LinearScaleBase=Cn,en.helpers.each(["Bar","Bubble","Doughnut","Line","PolarArea","Radar","Scatter"],(function(t){en[t]=function(e,n){return new en(e,en.helpers.merge(n||{},{type:t.charAt(0).toLowerCase()+t.slice(1)}))}})),Ei}));
/*! Select2 4.1.0-beta.1 | https://github.com/select2/select2/blob/master/LICENSE.md */
!function(n){"function"==typeof define&&define.amd?define(["jquery"],n):"object"==typeof module&&module.exports?module.exports=function(e,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e)),n(t),t}:n(jQuery)}(function(u){var e=function(){if(u&&u.fn&&u.fn.select2&&u.fn.select2.amd)var e=u.fn.select2.amd;var t,n,i,h,s,o,f,g,m,v,y,_,r,a,b;function w(e,t){return r.call(e,t)}function l(e,t){var n,i,r,s,o,a,l,c,u,d,p,h=t&&t.split("/"),f=y.map,g=f&&f["*"]||{};if(e){for(o=(e=e.split("/")).length-1,y.nodeIdCompat&&b.test(e[o])&&(e[o]=e[o].replace(b,"")),"."===e[0].charAt(0)&&h&&(e=h.slice(0,h.length-1).concat(e)),u=0;u<e.length;u++)if("."===(p=e[u]))e.splice(u,1),--u;else if(".."===p){if(0===u||1===u&&".."===e[2]||".."===e[u-1])continue;0<u&&(e.splice(u-1,2),u-=2)}e=e.join("/")}if((h||g)&&f){for(u=(n=e.split("/")).length;0<u;--u){if(i=n.slice(0,u).join("/"),h)for(d=h.length;0<d;--d)if(r=(r=f[h.slice(0,d).join("/")])&&r[i]){s=r,a=u;break}if(s)break;!l&&g&&g[i]&&(l=g[i],c=u)}!s&&l&&(s=l,a=c),s&&(n.splice(0,a,s),e=n.join("/"))}return e}function x(t,n){return function(){var e=a.call(arguments,0);return"string"!=typeof e[0]&&1===e.length&&e.push(null),o.apply(h,e.concat([t,n]))}}function A(t){return function(e){m[t]=e}}function D(e){if(w(v,e)){var t=v[e];delete v[e],_[e]=!0,s.apply(h,t)}if(!w(m,e)&&!w(_,e))throw new Error("No "+e);return m[e]}function c(e){var t,n=e?e.indexOf("!"):-1;return-1<n&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function S(e){return e?c(e):[]}return e&&e.requirejs||(e?n=e:e={},m={},v={},y={},_={},r=Object.prototype.hasOwnProperty,a=[].slice,b=/\.js$/,f=function(e,t){var n,i,r=c(e),s=r[0],o=t[1];return e=r[1],s&&(n=D(s=l(s,o))),s?e=n&&n.normalize?n.normalize(e,(i=o,function(e){return l(e,i)})):l(e,o):(s=(r=c(e=l(e,o)))[0],e=r[1],s&&(n=D(s))),{f:s?s+"!"+e:e,n:e,pr:s,p:n}},g={require:function(e){return x(e)},exports:function(e){var t=m[e];return void 0!==t?t:m[e]={}},module:function(e){return{id:e,uri:"",exports:m[e],config:(t=e,function(){return y&&y.config&&y.config[t]||{}})};var t}},s=function(e,t,n,i){var r,s,o,a,l,c,u,d=[],p=typeof n;if(c=S(i=i||e),"undefined"==p||"function"==p){for(t=!t.length&&n.length?["require","exports","module"]:t,l=0;l<t.length;l+=1)if("require"===(s=(a=f(t[l],c)).f))d[l]=g.require(e);else if("exports"===s)d[l]=g.exports(e),u=!0;else if("module"===s)r=d[l]=g.module(e);else if(w(m,s)||w(v,s)||w(_,s))d[l]=D(s);else{if(!a.p)throw new Error(e+" missing "+s);a.p.load(a.n,x(i,!0),A(s),{}),d[l]=m[s]}o=n?n.apply(m[e],d):void 0,e&&(r&&r.exports!==h&&r.exports!==m[e]?m[e]=r.exports:o===h&&u||(m[e]=o))}else e&&(m[e]=n)},t=n=o=function(e,t,n,i,r){if("string"==typeof e)return g[e]?g[e](t):D(f(e,S(t)).f);if(!e.splice){if((y=e).deps&&o(y.deps,y.callback),!t)return;t.splice?(e=t,t=n,n=null):e=h}return t=t||function(){},"function"==typeof n&&(n=i,i=r),i?s(h,e,t,n):setTimeout(function(){s(h,e,t,n)},4),o},o.config=function(e){return o(e)},t._defined=m,(i=function(e,t,n){if("string"!=typeof e)throw new Error("See almond README: incorrect module build, no module name");t.splice||(n=t,t=[]),w(m,e)||w(v,e)||(v[e]=[e,t,n])}).amd={jQuery:!0},e.requirejs=t,e.require=n,e.define=i),e.define("almond",function(){}),e.define("jquery",[],function(){var e=u||$;return null==e&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),e}),e.define("select2/utils",["jquery"],function(s){var r={};function u(e){var t=e.prototype,n=[];for(var i in t){"function"==typeof t[i]&&"constructor"!==i&&n.push(i)}return n}r.Extend=function(e,t){var n={}.hasOwnProperty;function i(){this.constructor=e}for(var r in t)n.call(t,r)&&(e[r]=t[r]);return i.prototype=t.prototype,e.prototype=new i,e.__super__=t.prototype,e},r.Decorate=function(i,r){var e=u(r),t=u(i);function s(){var e=Array.prototype.unshift,t=r.prototype.constructor.length,n=i.prototype.constructor;0<t&&(e.call(arguments,i.prototype.constructor),n=r.prototype.constructor),n.apply(this,arguments)}r.displayName=i.displayName,s.prototype=new function(){this.constructor=s};for(var n=0;n<t.length;n++){var o=t[n];s.prototype[o]=i.prototype[o]}function a(e){var t=function(){};e in s.prototype&&(t=s.prototype[e]);var n=r.prototype[e];return function(){return Array.prototype.unshift.call(arguments,t),n.apply(this,arguments)}}for(var l=0;l<e.length;l++){var c=e[l];s.prototype[c]=a(c)}return s};function e(){this.listeners={}}e.prototype.on=function(e,t){this.listeners=this.listeners||{},e in this.listeners?this.listeners[e].push(t):this.listeners[e]=[t]},e.prototype.trigger=function(e){var t=Array.prototype.slice,n=t.call(arguments,1);this.listeners=this.listeners||{},null==n&&(n=[]),0===n.length&&n.push({}),(n[0]._type=e)in this.listeners&&this.invoke(this.listeners[e],t.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},e.prototype.invoke=function(e,t){for(var n=0,i=e.length;n<i;n++)e[n].apply(this,t)},r.Observable=e,r.generateChars=function(e){for(var t="",n=0;n<e;n++){t+=Math.floor(36*Math.random()).toString(36)}return t},r.bind=function(e,t){return function(){e.apply(t,arguments)}},r._convertData=function(e){for(var t in e){var n=t.split("-"),i=e;if(1!==n.length){for(var r=0;r<n.length;r++){var s=n[r];(s=s.substring(0,1).toLowerCase()+s.substring(1))in i||(i[s]={}),r==n.length-1&&(i[s]=e[t]),i=i[s]}delete e[t]}}return e},r.hasScroll=function(e,t){var n=s(t),i=t.style.overflowX,r=t.style.overflowY;return(i!==r||"hidden"!==r&&"visible"!==r)&&("scroll"===i||"scroll"===r||(n.innerHeight()<t.scrollHeight||n.innerWidth()<t.scrollWidth))},r.escapeMarkup=function(e){var t={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof e?e:String(e).replace(/[&<>"'\/\\]/g,function(e){return t[e]})},r.__cache={};var n=0;return r.GetUniqueElementId=function(e){var t=e.getAttribute("data-select2-id");return null!=t||(t=e.id?"select2-data-"+e.id:"select2-data-"+(++n).toString()+"-"+r.generateChars(4),e.setAttribute("data-select2-id",t)),t},r.StoreData=function(e,t,n){var i=r.GetUniqueElementId(e);r.__cache[i]||(r.__cache[i]={}),r.__cache[i][t]=n},r.GetData=function(e,t){var n=r.GetUniqueElementId(e);return t?r.__cache[n]&&null!=r.__cache[n][t]?r.__cache[n][t]:s(e).data(t):r.__cache[n]},r.RemoveData=function(e){var t=r.GetUniqueElementId(e);null!=r.__cache[t]&&delete r.__cache[t],e.removeAttribute("data-select2-id")},r.copyNonInternalCssClasses=function(e,t){var n=e.getAttribute("class").trim().split(/\s+/);n=n.filter(function(e){return 0===e.indexOf("select2-")});var i=t.getAttribute("class").trim().split(/\s+/);i=i.filter(function(e){return 0!==e.indexOf("select2-")});var r=n.concat(i);e.setAttribute("class",r.join(" "))},r}),e.define("select2/results",["jquery","./utils"],function(h,f){function i(e,t,n){this.$element=e,this.data=n,this.options=t,i.__super__.constructor.call(this)}return f.Extend(i,f.Observable),i.prototype.render=function(){var e=h('<ul class="select2-results__options" role="listbox"></ul>');return this.options.get("multiple")&&e.attr("aria-multiselectable","true"),this.$results=e},i.prototype.clear=function(){this.$results.empty()},i.prototype.displayMessage=function(e){var t=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var n=h('<li role="alert" aria-live="assertive" class="select2-results__option"></li>'),i=this.options.get("translations").get(e.message);n.append(t(i(e.args))),n[0].className+=" select2-results__message",this.$results.append(n)},i.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()},i.prototype.append=function(e){this.hideLoading();var t=[];if(null!=e.results&&0!==e.results.length){e.results=this.sort(e.results);for(var n=0;n<e.results.length;n++){var i=e.results[n],r=this.option(i);t.push(r)}this.$results.append(t)}else 0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"})},i.prototype.position=function(e,t){t.find(".select2-results").append(e)},i.prototype.sort=function(e){return this.options.get("sorter")(e)},i.prototype.highlightFirstItem=function(){var e=this.$results.find(".select2-results__option--selectable"),t=e.filter(".select2-results__option--selected");0<t.length?t.first().trigger("mouseenter"):e.first().trigger("mouseenter"),this.ensureHighlightVisible()},i.prototype.setClasses=function(){var t=this;this.data.current(function(e){var i=e.map(function(e){return e.id.toString()});t.$results.find(".select2-results__option--selectable").each(function(){var e=h(this),t=f.GetData(this,"data"),n=""+t.id;null!=t.element&&t.element.selected||null==t.element&&-1<i.indexOf(n)?(this.classList.add("select2-results__option--selected"),e.attr("aria-selected","true")):(this.classList.remove("select2-results__option--selected"),e.attr("aria-selected","false"))})})},i.prototype.showLoading=function(e){this.hideLoading();var t={disabled:!0,loading:!0,text:this.options.get("translations").get("searching")(e)},n=this.option(t);n.className+=" loading-results",this.$results.prepend(n)},i.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},i.prototype.option=function(e){var t=document.createElement("li");t.classList.add("select2-results__option"),t.classList.add("select2-results__option--selectable");var n={role:"option"},i=window.Element.prototype.matches||window.Element.prototype.msMatchesSelector||window.Element.prototype.webkitMatchesSelector;for(var r in(null!=e.element&&i.call(e.element,":disabled")||null==e.element&&e.disabled)&&(n["aria-disabled"]="true",t.classList.remove("select2-results__option--selectable"),t.classList.add("select2-results__option--disabled")),null==e.id&&t.classList.remove("select2-results__option--selectable"),null!=e._resultId&&(t.id=e._resultId),e.title&&(t.title=e.title),e.children&&(n.role="group",n["aria-label"]=e.text,t.classList.remove("select2-results__option--selectable"),t.classList.add("select2-results__option--group")),n){var s=n[r];t.setAttribute(r,s)}if(e.children){var o=h(t),a=document.createElement("strong");a.className="select2-results__group",this.template(e,a);for(var l=[],c=0;c<e.children.length;c++){var u=e.children[c],d=this.option(u);l.push(d)}var p=h("<ul></ul>",{class:"select2-results__options select2-results__options--nested"});p.append(l),o.append(a),o.append(p)}else this.template(e,t);return f.StoreData(t,"data",e),t},i.prototype.bind=function(t,e){var l=this,n=t.id+"-results";this.$results.attr("id",n),t.on("results:all",function(e){l.clear(),l.append(e.data),t.isOpen()&&(l.setClasses(),l.highlightFirstItem())}),t.on("results:append",function(e){l.append(e.data),t.isOpen()&&l.setClasses()}),t.on("query",function(e){l.hideMessages(),l.showLoading(e)}),t.on("select",function(){t.isOpen()&&(l.setClasses(),l.options.get("scrollAfterSelect")&&l.highlightFirstItem())}),t.on("unselect",function(){t.isOpen()&&(l.setClasses(),l.options.get("scrollAfterSelect")&&l.highlightFirstItem())}),t.on("open",function(){l.$results.attr("aria-expanded","true"),l.$results.attr("aria-hidden","false"),l.setClasses(),l.ensureHighlightVisible()}),t.on("close",function(){l.$results.attr("aria-expanded","false"),l.$results.attr("aria-hidden","true"),l.$results.removeAttr("aria-activedescendant")}),t.on("results:toggle",function(){var e=l.getHighlightedResults();0!==e.length&&e.trigger("mouseup")}),t.on("results:select",function(){var e=l.getHighlightedResults();if(0!==e.length){var t=f.GetData(e[0],"data");e.hasClass("select2-results__option--selected")?l.trigger("close",{}):l.trigger("select",{data:t})}}),t.on("results:previous",function(){var e=l.getHighlightedResults(),t=l.$results.find(".select2-results__option--selectable"),n=t.index(e);if(!(n<=0)){var i=n-1;0===e.length&&(i=0);var r=t.eq(i);r.trigger("mouseenter");var s=l.$results.offset().top,o=r.offset().top,a=l.$results.scrollTop()+(o-s);0===i?l.$results.scrollTop(0):o-s<0&&l.$results.scrollTop(a)}}),t.on("results:next",function(){var e=l.getHighlightedResults(),t=l.$results.find(".select2-results__option--selectable"),n=t.index(e)+1;if(!(n>=t.length)){var i=t.eq(n);i.trigger("mouseenter");var r=l.$results.offset().top+l.$results.outerHeight(!1),s=i.offset().top+i.outerHeight(!1),o=l.$results.scrollTop()+s-r;0===n?l.$results.scrollTop(0):r<s&&l.$results.scrollTop(o)}}),t.on("results:focus",function(e){e.element[0].classList.add("select2-results__option--highlighted"),e.element[0].setAttribute("aria-selected","true")}),t.on("results:message",function(e){l.displayMessage(e)}),h.fn.mousewheel&&this.$results.on("mousewheel",function(e){var t=l.$results.scrollTop(),n=l.$results.get(0).scrollHeight-t+e.deltaY,i=0<e.deltaY&&t-e.deltaY<=0,r=e.deltaY<0&&n<=l.$results.height();i?(l.$results.scrollTop(0),e.preventDefault(),e.stopPropagation()):r&&(l.$results.scrollTop(l.$results.get(0).scrollHeight-l.$results.height()),e.preventDefault(),e.stopPropagation())}),this.$results.on("mouseup",".select2-results__option--selectable",function(e){var t=h(this),n=f.GetData(this,"data");t.hasClass("select2-results__option--selected")?l.options.get("multiple")?l.trigger("unselect",{originalEvent:e,data:n}):l.trigger("close",{}):l.trigger("select",{originalEvent:e,data:n})}),this.$results.on("mouseenter",".select2-results__option--selectable",function(e){var t=f.GetData(this,"data");l.getHighlightedResults().removeClass("select2-results__option--highlighted").attr("aria-selected","false"),l.trigger("results:focus",{data:t,element:h(this)})})},i.prototype.getHighlightedResults=function(){return this.$results.find(".select2-results__option--highlighted")},i.prototype.destroy=function(){this.$results.remove()},i.prototype.ensureHighlightVisible=function(){var e=this.getHighlightedResults();if(0!==e.length){var t=this.$results.find(".select2-results__option--selectable").index(e),n=this.$results.offset().top,i=e.offset().top,r=this.$results.scrollTop()+(i-n),s=i-n;r-=2*e.outerHeight(!1),t<=2?this.$results.scrollTop(0):(s>this.$results.outerHeight()||s<0)&&this.$results.scrollTop(r)}},i.prototype.template=function(e,t){var n=this.options.get("templateResult"),i=this.options.get("escapeMarkup"),r=n(e,t);null==r?t.style.display="none":"string"==typeof r?t.innerHTML=i(r):h(t).append(r)},i}),e.define("select2/keys",[],function(){return{BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46}}),e.define("select2/selection/base",["jquery","../utils","../keys"],function(n,i,r){function s(e,t){this.$element=e,this.options=t,s.__super__.constructor.call(this)}return i.Extend(s,i.Observable),s.prototype.render=function(){var e=n('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=i.GetData(this.$element[0],"old-tabindex")?this._tabindex=i.GetData(this.$element[0],"old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),e.attr("title",this.$element.attr("title")),e.attr("tabindex",this._tabindex),e.attr("aria-disabled","false"),this.$selection=e},s.prototype.bind=function(e,t){var n=this,i=e.id+"-results";this.container=e,this.$selection.on("focus",function(e){n.trigger("focus",e)}),this.$selection.on("blur",function(e){n._handleBlur(e)}),this.$selection.on("keydown",function(e){n.trigger("keypress",e),e.which===r.SPACE&&e.preventDefault()}),e.on("results:focus",function(e){n.$selection.attr("aria-activedescendant",e.data._resultId)}),e.on("selection:update",function(e){n.update(e.data)}),e.on("open",function(){n.$selection.attr("aria-expanded","true"),n.$selection.attr("aria-owns",i),n._attachCloseHandler(e)}),e.on("close",function(){n.$selection.attr("aria-expanded","false"),n.$selection.removeAttr("aria-activedescendant"),n.$selection.removeAttr("aria-owns"),n.$selection.trigger("focus"),n._detachCloseHandler(e)}),e.on("enable",function(){n.$selection.attr("tabindex",n._tabindex),n.$selection.attr("aria-disabled","false")}),e.on("disable",function(){n.$selection.attr("tabindex","-1"),n.$selection.attr("aria-disabled","true")})},s.prototype._handleBlur=function(e){var t=this;window.setTimeout(function(){document.activeElement==t.$selection[0]||n.contains(t.$selection[0],document.activeElement)||t.trigger("blur",e)},1)},s.prototype._attachCloseHandler=function(e){n(document.body).on("mousedown.select2."+e.id,function(e){var t=n(e.target).closest(".select2");n(".select2.select2-container--open").each(function(){this!=t[0]&&i.GetData(this,"element").select2("close")})})},s.prototype._detachCloseHandler=function(e){n(document.body).off("mousedown.select2."+e.id)},s.prototype.position=function(e,t){t.find(".selection").append(e)},s.prototype.destroy=function(){this._detachCloseHandler(this.container)},s.prototype.update=function(e){throw new Error("The `update` method must be defined in child classes.")},s.prototype.isEnabled=function(){return!this.isDisabled()},s.prototype.isDisabled=function(){return this.options.get("disabled")},s}),e.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(e,t,n,i){function r(){r.__super__.constructor.apply(this,arguments)}return n.Extend(r,t),r.prototype.render=function(){var e=r.__super__.render.call(this);return e[0].classList.add("select2-selection--single"),e.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),e},r.prototype.bind=function(t,e){var n=this;r.__super__.bind.apply(this,arguments);var i=t.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",i).attr("role","textbox").attr("aria-readonly","true"),this.$selection.attr("aria-labelledby",i),this.$selection.on("mousedown",function(e){1===e.which&&n.trigger("toggle",{originalEvent:e})}),this.$selection.on("focus",function(e){}),this.$selection.on("blur",function(e){}),t.on("focus",function(e){t.isOpen()||n.$selection.trigger("focus")})},r.prototype.clear=function(){var e=this.$selection.find(".select2-selection__rendered");e.empty(),e.removeAttr("title")},r.prototype.display=function(e,t){var n=this.options.get("templateSelection");return this.options.get("escapeMarkup")(n(e,t))},r.prototype.selectionContainer=function(){return e("<span></span>")},r.prototype.update=function(e){if(0!==e.length){var t=e[0],n=this.$selection.find(".select2-selection__rendered"),i=this.display(t,n);n.empty().append(i);var r=t.title||t.text;r?n.attr("title",r):n.removeAttr("title")}else this.clear()},r}),e.define("select2/selection/multiple",["jquery","./base","../utils"],function(r,e,d){function s(e,t){s.__super__.constructor.apply(this,arguments)}return d.Extend(s,e),s.prototype.render=function(){var e=s.__super__.render.call(this);return e[0].classList.add("select2-selection--multiple"),e.html('<ul class="select2-selection__rendered"></ul>'),e},s.prototype.bind=function(e,t){var i=this;s.__super__.bind.apply(this,arguments);var n=e.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",n),this.$selection.on("click",function(e){i.trigger("toggle",{originalEvent:e})}),this.$selection.on("click",".select2-selection__choice__remove",function(e){if(!i.isDisabled()){var t=r(this).parent(),n=d.GetData(t[0],"data");i.trigger("unselect",{originalEvent:e,data:n})}}),this.$selection.on("keydown",".select2-selection__choice__remove",function(e){i.isDisabled()||e.stopPropagation()})},s.prototype.clear=function(){var e=this.$selection.find(".select2-selection__rendered");e.empty(),e.removeAttr("title")},s.prototype.display=function(e,t){var n=this.options.get("templateSelection");return this.options.get("escapeMarkup")(n(e,t))},s.prototype.selectionContainer=function(){return r('<li class="select2-selection__choice"><button type="button" class="select2-selection__choice__remove" tabindex="-1"><span aria-hidden="true">&times;</span></button><span class="select2-selection__choice__display"></span></li>')},s.prototype.update=function(e){if(this.clear(),0!==e.length){for(var t=[],n=this.$selection.find(".select2-selection__rendered").attr("id")+"-choice-",i=0;i<e.length;i++){var r=e[i],s=this.selectionContainer(),o=this.display(r,s),a=n+d.generateChars(4)+"-";r.id?a+=r.id:a+=d.generateChars(4),s.find(".select2-selection__choice__display").append(o).attr("id",a);var l=r.title||r.text;l&&s.attr("title",l);var c=this.options.get("translations").get("removeItem"),u=s.find(".select2-selection__choice__remove");u.attr("title",c()),u.attr("aria-label",c()),u.attr("aria-describedby",a),d.StoreData(s[0],"data",r),t.push(s)}this.$selection.find(".select2-selection__rendered").append(t)}},s}),e.define("select2/selection/placeholder",[],function(){function e(e,t,n){this.placeholder=this.normalizePlaceholder(n.get("placeholder")),e.call(this,t,n)}return e.prototype.normalizePlaceholder=function(e,t){return"string"==typeof t&&(t={id:"",text:t}),t},e.prototype.createPlaceholder=function(e,t){var n=this.selectionContainer();return n.html(this.display(t)),n[0].classList.add("select2-selection__placeholder"),n[0].classList.remove("select2-selection__choice"),n},e.prototype.update=function(e,t){var n=1==t.length&&t[0].id!=this.placeholder.id;if(1<t.length||n)return e.call(this,t);this.clear();var i=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(i)},e}),e.define("select2/selection/allowClear",["jquery","../keys","../utils"],function(s,i,a){function e(){}return e.prototype.bind=function(e,t,n){var i=this;e.call(this,t,n),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".select2-selection__clear",function(e){i._handleClear(e)}),t.on("keypress",function(e){i._handleKeyboardClear(e,t)})},e.prototype._handleClear=function(e,t){if(!this.isDisabled()){var n=this.$selection.find(".select2-selection__clear");if(0!==n.length){t.stopPropagation();var i=a.GetData(n[0],"data"),r=this.$element.val();this.$element.val(this.placeholder.id);var s={data:i};if(this.trigger("clear",s),s.prevented)this.$element.val(r);else{for(var o=0;o<i.length;o++)if(s={data:i[o]},this.trigger("unselect",s),s.prevented)return void this.$element.val(r);this.$element.trigger("input").trigger("change"),this.trigger("toggle",{})}}}},e.prototype._handleKeyboardClear=function(e,t,n){n.isOpen()||t.which!=i.DELETE&&t.which!=i.BACKSPACE||this._handleClear(t)},e.prototype.update=function(e,t){if(e.call(this,t),this.$selection.find(".select2-selection__clear").remove(),!(0<this.$selection.find(".select2-selection__placeholder").length||0===t.length)){var n=this.$selection.find(".select2-selection__rendered").attr("id"),i=this.options.get("translations").get("removeAllItems"),r=s('<button type="button" class="select2-selection__clear" tabindex="-1"><span aria-hidden="true">&times;</span></button>');r.attr("title",i()),r.attr("aria-label",i()),r.attr("aria-describedby",n),a.StoreData(r[0],"data",t),this.$selection.prepend(r)}},e}),e.define("select2/selection/search",["jquery","../utils","../keys"],function(i,l,c){function e(e,t,n){e.call(this,t,n)}return e.prototype.render=function(e){var t=i('<span class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>');this.$searchContainer=t,this.$search=t.find("input"),this.$search.prop("autocomplete",this.options.get("autocomplete"));var n=e.call(this);return this._transferTabIndex(),n.append(this.$searchContainer),n},e.prototype.bind=function(e,t,n){var i=this,r=t.id+"-results",s=t.id+"-container";e.call(this,t,n),i.$search.attr("aria-describedby",s),t.on("open",function(){i.$search.attr("aria-controls",r),i.$search.trigger("focus")}),t.on("close",function(){i.$search.val(""),i.resizeSearch(),i.$search.removeAttr("aria-controls"),i.$search.removeAttr("aria-activedescendant"),i.$search.trigger("focus")}),t.on("enable",function(){i.$search.prop("disabled",!1),i._transferTabIndex()}),t.on("disable",function(){i.$search.prop("disabled",!0)}),t.on("focus",function(e){i.$search.trigger("focus")}),t.on("results:focus",function(e){e.data._resultId?i.$search.attr("aria-activedescendant",e.data._resultId):i.$search.removeAttr("aria-activedescendant")}),this.$selection.on("focusin",".select2-search--inline",function(e){i.trigger("focus",e)}),this.$selection.on("focusout",".select2-search--inline",function(e){i._handleBlur(e)}),this.$selection.on("keydown",".select2-search--inline",function(e){if(e.stopPropagation(),i.trigger("keypress",e),i._keyUpPrevented=e.isDefaultPrevented(),e.which===c.BACKSPACE&&""===i.$search.val()){var t=i.$selection.find(".select2-selection__choice").last();if(0<t.length){var n=l.GetData(t[0],"data");i.searchRemoveChoice(n),e.preventDefault()}}}),this.$selection.on("click",".select2-search--inline",function(e){i.$search.val()&&e.stopPropagation()});var o=document.documentMode,a=o&&o<=11;this.$selection.on("input.searchcheck",".select2-search--inline",function(e){a?i.$selection.off("input.search input.searchcheck"):i.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".select2-search--inline",function(e){if(a&&"input"===e.type)i.$selection.off("input.search input.searchcheck");else{var t=e.which;t!=c.SHIFT&&t!=c.CTRL&&t!=c.ALT&&t!=c.TAB&&i.handleSearch(e)}})},e.prototype._transferTabIndex=function(e){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},e.prototype.createPlaceholder=function(e,t){this.$search.attr("placeholder",t.text)},e.prototype.update=function(e,t){var n=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),e.call(this,t),this.resizeSearch(),n&&this.$search.trigger("focus")},e.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var e=this.$search.val();this.trigger("query",{term:e})}this._keyUpPrevented=!1},e.prototype.searchRemoveChoice=function(e,t){this.trigger("unselect",{data:t}),this.$search.val(t.text),this.handleSearch()},e.prototype.resizeSearch=function(){this.$search.css("width","25px");var e="100%";""===this.$search.attr("placeholder")&&(e=.75*(this.$search.val().length+1)+"em");this.$search.css("width",e)},e}),e.define("select2/selection/selectionCss",["../utils"],function(i){function e(){}return e.prototype.render=function(e){var t=e.call(this),n=this.options.get("selectionCssClass")||"";return-1!==n.indexOf(":all:")&&(n=n.replace(":all:",""),i.copyNonInternalCssClasses(t[0],this.$element[0])),t.addClass(n),t},e}),e.define("select2/selection/eventRelay",["jquery"],function(o){function e(){}return e.prototype.bind=function(e,t,n){var i=this,r=["open","opening","close","closing","select","selecting","unselect","unselecting","clear","clearing"],s=["opening","closing","selecting","unselecting","clearing"];e.call(this,t,n),t.on("*",function(e,t){if(-1!==r.indexOf(e)){t=t||{};var n=o.Event("select2:"+e,{params:t});i.$element.trigger(n),-1!==s.indexOf(e)&&(t.prevented=n.isDefaultPrevented())}})},e}),e.define("select2/translation",["jquery","require"],function(t,n){function i(e){this.dict=e||{}}return i.prototype.all=function(){return this.dict},i.prototype.get=function(e){return this.dict[e]},i.prototype.extend=function(e){this.dict=t.extend({},e.all(),this.dict)},i._cache={},i.loadPath=function(e){if(!(e in i._cache)){var t=n(e);i._cache[e]=t}return new i(i._cache[e])},i}),e.define("select2/diacritics",[],function(){return{"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Œ":"OE","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","œ":"oe","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ώ":"ω","ς":"σ","’":"'"}}),e.define("select2/data/base",["../utils"],function(i){function n(e,t){n.__super__.constructor.call(this)}return i.Extend(n,i.Observable),n.prototype.current=function(e){throw new Error("The `current` method must be defined in child classes.")},n.prototype.query=function(e,t){throw new Error("The `query` method must be defined in child classes.")},n.prototype.bind=function(e,t){},n.prototype.destroy=function(){},n.prototype.generateResultId=function(e,t){var n=e.id+"-result-";return n+=i.generateChars(4),null!=t.id?n+="-"+t.id.toString():n+="-"+i.generateChars(4),n},n}),e.define("select2/data/select",["./base","../utils","jquery"],function(e,l,c){function n(e,t){this.$element=e,this.options=t,n.__super__.constructor.call(this)}return l.Extend(n,e),n.prototype.current=function(e){var t=this;e(Array.prototype.map.call(this.$element[0].querySelectorAll(":checked"),function(e){return t.item(c(e))}))},n.prototype.select=function(r){var s=this;if(r.selected=!0,null!=r.element&&"option"===r.element.tagName.toLowerCase())return r.element.selected=!0,void this.$element.trigger("input").trigger("change");if(this.$element.prop("multiple"))this.current(function(e){var t=[];(r=[r]).push.apply(r,e);for(var n=0;n<r.length;n++){var i=r[n].id;-1===t.indexOf(i)&&t.push(i)}s.$element.val(t),s.$element.trigger("input").trigger("change")});else{var e=r.id;this.$element.val(e),this.$element.trigger("input").trigger("change")}},n.prototype.unselect=function(r){var s=this;if(this.$element.prop("multiple")){if(r.selected=!1,null!=r.element&&"option"===r.element.tagName.toLowerCase())return r.element.selected=!1,void this.$element.trigger("input").trigger("change");this.current(function(e){for(var t=[],n=0;n<e.length;n++){var i=e[n].id;i!==r.id&&-1===t.indexOf(i)&&t.push(i)}s.$element.val(t),s.$element.trigger("input").trigger("change")})}},n.prototype.bind=function(e,t){var n=this;(this.container=e).on("select",function(e){n.select(e.data)}),e.on("unselect",function(e){n.unselect(e.data)})},n.prototype.destroy=function(){this.$element.find("*").each(function(){l.RemoveData(this)})},n.prototype.query=function(i,e){var r=[],s=this;this.$element.children().each(function(){if("option"===this.tagName.toLowerCase()||"optgroup"===this.tagName.toLowerCase()){var e=c(this),t=s.item(e),n=s.matches(i,t);null!==n&&r.push(n)}}),e({results:r})},n.prototype.addOptions=function(e){this.$element.append(e)},n.prototype.option=function(e){var t;e.children?(t=document.createElement("optgroup")).label=e.text:void 0!==(t=document.createElement("option")).textContent?t.textContent=e.text:t.innerText=e.text,void 0!==e.id&&(t.value=e.id),e.disabled&&(t.disabled=!0),e.selected&&(t.selected=!0),e.title&&(t.title=e.title);var n=this._normalizeItem(e);return n.element=t,l.StoreData(t,"data",n),c(t)},n.prototype.item=function(e){var t={};if(null!=(t=l.GetData(e[0],"data")))return t;var n=e[0];if("option"===n.tagName.toLowerCase())t={id:e.val(),text:e.text(),disabled:e.prop("disabled"),selected:e.prop("selected"),title:e.prop("title")};else if("optgroup"===n.tagName.toLowerCase()){t={text:e.prop("label"),children:[],title:e.prop("title")};for(var i=e.children("option"),r=[],s=0;s<i.length;s++){var o=c(i[s]),a=this.item(o);r.push(a)}t.children=r}return(t=this._normalizeItem(t)).element=e[0],l.StoreData(e[0],"data",t),t},n.prototype._normalizeItem=function(e){e!==Object(e)&&(e={id:e,text:e});return null!=(e=c.extend({},{text:""},e)).id&&(e.id=e.id.toString()),null!=e.text&&(e.text=e.text.toString()),null==e._resultId&&e.id&&null!=this.container&&(e._resultId=this.generateResultId(this.container,e)),c.extend({},{selected:!1,disabled:!1},e)},n.prototype.matches=function(e,t){return this.options.get("matcher")(e,t)},n}),e.define("select2/data/array",["./select","../utils","jquery"],function(e,t,f){function i(e,t){this._dataToConvert=t.get("data")||[],i.__super__.constructor.call(this,e,t)}return t.Extend(i,e),i.prototype.bind=function(e,t){i.__super__.bind.call(this,e,t),this.addOptions(this.convertToOptions(this._dataToConvert))},i.prototype.select=function(n){var e=this.$element.find("option").filter(function(e,t){return t.value==n.id.toString()});0===e.length&&(e=this.option(n),this.addOptions(e)),i.__super__.select.call(this,n)},i.prototype.convertToOptions=function(e){var t=this,n=this.$element.find("option"),i=n.map(function(){return t.item(f(this)).id}).get(),r=[];function s(e){return function(){return f(this).val()==e.id}}for(var o=0;o<e.length;o++){var a=this._normalizeItem(e[o]);if(0<=i.indexOf(a.id)){var l=n.filter(s(a)),c=this.item(l),u=f.extend(!0,{},a,c),d=this.option(u);l.replaceWith(d)}else{var p=this.option(a);if(a.children){var h=this.convertToOptions(a.children);p.append(h)}r.push(p)}}return r},i}),e.define("select2/data/ajax",["./array","../utils","jquery"],function(e,t,s){function n(e,t){this.ajaxOptions=this._applyDefaults(t.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),n.__super__.constructor.call(this,e,t)}return t.Extend(n,e),n.prototype._applyDefaults=function(e){var t={data:function(e){return s.extend({},e,{q:e.term})},transport:function(e,t,n){var i=s.ajax(e);return i.then(t),i.fail(n),i}};return s.extend({},t,e,!0)},n.prototype.processResults=function(e){return e},n.prototype.query=function(n,i){var r=this;null!=this._request&&(s.isFunction(this._request.abort)&&this._request.abort(),this._request=null);var t=s.extend({type:"GET"},this.ajaxOptions);function e(){var e=t.transport(t,function(e){var t=r.processResults(e,n);r.options.get("debug")&&window.console&&console.error&&(t&&t.results&&Array.isArray(t.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),i(t)},function(){"status"in e&&(0===e.status||"0"===e.status)||r.trigger("results:message",{message:"errorLoading"})});r._request=e}"function"==typeof t.url&&(t.url=t.url.call(this.$element,n)),"function"==typeof t.data&&(t.data=t.data.call(this.$element,n)),this.ajaxOptions.delay&&null!=n.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(e,this.ajaxOptions.delay)):e()},n}),e.define("select2/data/tags",["jquery"],function(t){function e(e,t,n){var i=n.get("tags"),r=n.get("createTag");void 0!==r&&(this.createTag=r);var s=n.get("insertTag");if(void 0!==s&&(this.insertTag=s),e.call(this,t,n),Array.isArray(i))for(var o=0;o<i.length;o++){var a=i[o],l=this._normalizeItem(a),c=this.option(l);this.$element.append(c)}}return e.prototype.query=function(e,c,u){var d=this;this._removeOldTags(),null!=c.term&&null==c.page?e.call(this,c,function e(t,n){for(var i=t.results,r=0;r<i.length;r++){var s=i[r],o=null!=s.children&&!e({results:s.children},!0);if((s.text||"").toUpperCase()===(c.term||"").toUpperCase()||o)return!n&&(t.data=i,void u(t))}if(n)return!0;var a=d.createTag(c);if(null!=a){var l=d.option(a);l.attr("data-select2-tag",!0),d.addOptions([l]),d.insertTag(i,a)}t.results=i,u(t)}):e.call(this,c,u)},e.prototype.createTag=function(e,t){if(null==t.term)return null;var n=t.term.trim();return""===n?null:{id:n,text:n}},e.prototype.insertTag=function(e,t,n){t.unshift(n)},e.prototype._removeOldTags=function(e){this.$element.find("option[data-select2-tag]").each(function(){this.selected||t(this).remove()})},e}),e.define("select2/data/tokenizer",["jquery"],function(d){function e(e,t,n){var i=n.get("tokenizer");void 0!==i&&(this.tokenizer=i),e.call(this,t,n)}return e.prototype.bind=function(e,t,n){e.call(this,t,n),this.$search=t.dropdown.$search||t.selection.$search||n.find(".select2-search__field")},e.prototype.query=function(e,t,n){var r=this;t.term=t.term||"";var i=this.tokenizer(t,this.options,function(e){var t,n=r._normalizeItem(e);if(!r.$element.find("option").filter(function(){return d(this).val()===n.id}).length){var i=r.option(n);i.attr("data-select2-tag",!0),r._removeOldTags(),r.addOptions([i])}t=n,r.trigger("select",{data:t})});i.term!==t.term&&(this.$search.length&&(this.$search.val(i.term),this.$search.trigger("focus")),t.term=i.term),e.call(this,t,n)},e.prototype.tokenizer=function(e,t,n,i){for(var r=n.get("tokenSeparators")||[],s=t.term,o=0,a=this.createTag||function(e){return{id:e.term,text:e.term}};o<s.length;){var l=s[o];if(-1!==r.indexOf(l)){var c=s.substr(0,o),u=a(d.extend({},t,{term:c}));null!=u?(i(u),s=s.substr(o+1)||"",o=0):o++}else o++}return{term:s}},e}),e.define("select2/data/minimumInputLength",[],function(){function e(e,t,n){this.minimumInputLength=n.get("minimumInputLength"),e.call(this,t,n)}return e.prototype.query=function(e,t,n){t.term=t.term||"",t.term.length<this.minimumInputLength?this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:t.term,params:t}}):e.call(this,t,n)},e}),e.define("select2/data/maximumInputLength",[],function(){function e(e,t,n){this.maximumInputLength=n.get("maximumInputLength"),e.call(this,t,n)}return e.prototype.query=function(e,t,n){t.term=t.term||"",0<this.maximumInputLength&&t.term.length>this.maximumInputLength?this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:t.term,params:t}}):e.call(this,t,n)},e}),e.define("select2/data/maximumSelectionLength",[],function(){function e(e,t,n){this.maximumSelectionLength=n.get("maximumSelectionLength"),e.call(this,t,n)}return e.prototype.bind=function(e,t,n){var i=this;e.call(this,t,n),t.on("select",function(){i._checkIfMaximumSelected()})},e.prototype.query=function(e,t,n){var i=this;this._checkIfMaximumSelected(function(){e.call(i,t,n)})},e.prototype._checkIfMaximumSelected=function(e,n){var i=this;this.current(function(e){var t=null!=e?e.length:0;0<i.maximumSelectionLength&&t>=i.maximumSelectionLength?i.trigger("results:message",{message:"maximumSelected",args:{maximum:i.maximumSelectionLength}}):n&&n()})},e}),e.define("select2/dropdown",["jquery","./utils"],function(t,e){function n(e,t){this.$element=e,this.options=t,n.__super__.constructor.call(this)}return e.Extend(n,e.Observable),n.prototype.render=function(){var e=t('<span class="select2-dropdown"><span class="select2-results"></span></span>');return e.attr("dir",this.options.get("dir")),this.$dropdown=e},n.prototype.bind=function(){},n.prototype.position=function(e,t){},n.prototype.destroy=function(){this.$dropdown.remove()},n}),e.define("select2/dropdown/search",["jquery"],function(s){function e(){}return e.prototype.render=function(e){var t=e.call(this),n=s('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>');return this.$searchContainer=n,this.$search=n.find("input"),this.$search.prop("autocomplete",this.options.get("autocomplete")),t.prepend(n),t},e.prototype.bind=function(e,t,n){var i=this,r=t.id+"-results";e.call(this,t,n),this.$search.on("keydown",function(e){i.trigger("keypress",e),i._keyUpPrevented=e.isDefaultPrevented()}),this.$search.on("input",function(e){s(this).off("keyup")}),this.$search.on("keyup input",function(e){i.handleSearch(e)}),t.on("open",function(){i.$search.attr("tabindex",0),i.$search.attr("aria-controls",r),i.$search.trigger("focus"),window.setTimeout(function(){i.$search.trigger("focus")},0)}),t.on("close",function(){i.$search.attr("tabindex",-1),i.$search.removeAttr("aria-controls"),i.$search.removeAttr("aria-activedescendant"),i.$search.val(""),i.$search.trigger("blur")}),t.on("focus",function(){t.isOpen()||i.$search.trigger("focus")}),t.on("results:all",function(e){null!=e.query.term&&""!==e.query.term||(i.showSearch(e)?i.$searchContainer[0].classList.remove("select2-search--hide"):i.$searchContainer[0].classList.add("select2-search--hide"))}),t.on("results:focus",function(e){e.data._resultId?i.$search.attr("aria-activedescendant",e.data._resultId):i.$search.removeAttr("aria-activedescendant")})},e.prototype.handleSearch=function(e){if(!this._keyUpPrevented){var t=this.$search.val();this.trigger("query",{term:t})}this._keyUpPrevented=!1},e.prototype.showSearch=function(e,t){return!0},e}),e.define("select2/dropdown/hidePlaceholder",[],function(){function e(e,t,n,i){this.placeholder=this.normalizePlaceholder(n.get("placeholder")),e.call(this,t,n,i)}return e.prototype.append=function(e,t){t.results=this.removePlaceholder(t.results),e.call(this,t)},e.prototype.normalizePlaceholder=function(e,t){return"string"==typeof t&&(t={id:"",text:t}),t},e.prototype.removePlaceholder=function(e,t){for(var n=t.slice(0),i=t.length-1;0<=i;i--){var r=t[i];this.placeholder.id===r.id&&n.splice(i,1)}return n},e}),e.define("select2/dropdown/infiniteScroll",["jquery"],function(n){function e(e,t,n,i){this.lastParams={},e.call(this,t,n,i),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return e.prototype.append=function(e,t){this.$loadingMore.remove(),this.loading=!1,e.call(this,t),this.showLoadingMore(t)&&(this.$results.append(this.$loadingMore),this.loadMoreIfNeeded())},e.prototype.bind=function(e,t,n){var i=this;e.call(this,t,n),t.on("query",function(e){i.lastParams=e,i.loading=!0}),t.on("query:append",function(e){i.lastParams=e,i.loading=!0}),this.$results.on("scroll",this.loadMoreIfNeeded.bind(this))},e.prototype.loadMoreIfNeeded=function(){var e=n.contains(document.documentElement,this.$loadingMore[0]);if(!this.loading&&e){var t=this.$results.offset().top+this.$results.outerHeight(!1);this.$loadingMore.offset().top+this.$loadingMore.outerHeight(!1)<=t+50&&this.loadMore()}},e.prototype.loadMore=function(){this.loading=!0;var e=n.extend({},{page:1},this.lastParams);e.page++,this.trigger("query:append",e)},e.prototype.showLoadingMore=function(e,t){return t.pagination&&t.pagination.more},e.prototype.createLoadingMore=function(){var e=n('<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>'),t=this.options.get("translations").get("loadingMore");return e.html(t(this.lastParams)),e},e}),e.define("select2/dropdown/attachBody",["jquery","../utils"],function(f,a){function e(e,t,n){this.$dropdownParent=f(n.get("dropdownParent")||document.body),e.call(this,t,n)}return e.prototype.bind=function(e,t,n){var i=this;e.call(this,t,n),t.on("open",function(){i._showDropdown(),i._attachPositioningHandler(t),i._bindContainerResultHandlers(t)}),t.on("close",function(){i._hideDropdown(),i._detachPositioningHandler(t)}),this.$dropdownContainer.on("mousedown",function(e){e.stopPropagation()})},e.prototype.destroy=function(e){e.call(this),this.$dropdownContainer.remove()},e.prototype.position=function(e,t,n){t.attr("class",n.attr("class")),t[0].classList.remove("select2"),t[0].classList.add("select2-container--open"),t.css({position:"absolute",top:-999999}),this.$container=n},e.prototype.render=function(e){var t=f("<span></span>"),n=e.call(this);return t.append(n),this.$dropdownContainer=t},e.prototype._hideDropdown=function(e){this.$dropdownContainer.detach()},e.prototype._bindContainerResultHandlers=function(e,t){if(!this._containerResultsHandlersBound){var n=this;t.on("results:all",function(){n._positionDropdown(),n._resizeDropdown()}),t.on("results:append",function(){n._positionDropdown(),n._resizeDropdown()}),t.on("results:message",function(){n._positionDropdown(),n._resizeDropdown()}),t.on("select",function(){n._positionDropdown(),n._resizeDropdown()}),t.on("unselect",function(){n._positionDropdown(),n._resizeDropdown()}),this._containerResultsHandlersBound=!0}},e.prototype._attachPositioningHandler=function(e,t){var n=this,i="scroll.select2."+t.id,r="resize.select2."+t.id,s="orientationchange.select2."+t.id,o=this.$container.parents().filter(a.hasScroll);o.each(function(){a.StoreData(this,"select2-scroll-position",{x:f(this).scrollLeft(),y:f(this).scrollTop()})}),o.on(i,function(e){var t=a.GetData(this,"select2-scroll-position");f(this).scrollTop(t.y)}),f(window).on(i+" "+r+" "+s,function(e){n._positionDropdown(),n._resizeDropdown()})},e.prototype._detachPositioningHandler=function(e,t){var n="scroll.select2."+t.id,i="resize.select2."+t.id,r="orientationchange.select2."+t.id;this.$container.parents().filter(a.hasScroll).off(n),f(window).off(n+" "+i+" "+r)},e.prototype._positionDropdown=function(){var e=f(window),t=this.$dropdown[0].classList.contains("select2-dropdown--above"),n=this.$dropdown[0].classList.contains("select2-dropdown--below"),i=null,r=this.$container.offset();r.bottom=r.top+this.$container.outerHeight(!1);var s={height:this.$container.outerHeight(!1)};s.top=r.top,s.bottom=r.top+s.height;var o=this.$dropdown.outerHeight(!1),a=e.scrollTop(),l=e.scrollTop()+e.height(),c=a<r.top-o,u=l>r.bottom+o,d={left:r.left,top:s.bottom},p=this.$dropdownParent;"static"===p.css("position")&&(p=p.offsetParent());var h={top:0,left:0};(f.contains(document.body,p[0])||p[0].isConnected)&&(h=p.offset()),d.top-=h.top,d.left-=h.left,t||n||(i="below"),u||!c||t?!c&&u&&t&&(i="below"):i="above",("above"==i||t&&"below"!==i)&&(d.top=s.top-h.top-o),null!=i&&(this.$dropdown[0].classList.remove("select2-dropdown--below"),this.$dropdown[0].classList.remove("select2-dropdown--above"),this.$dropdown[0].classList.add("select2-dropdown--"+i),this.$container[0].classList.remove("select2-container--below"),this.$container[0].classList.remove("select2-container--above"),this.$container[0].classList.add("select2-container--"+i)),this.$dropdownContainer.css(d)},e.prototype._resizeDropdown=function(){var e={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(e.minWidth=e.width,e.position="relative",e.width="auto"),this.$dropdown.css(e)},e.prototype._showDropdown=function(e){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},e}),e.define("select2/dropdown/minimumResultsForSearch",[],function(){function e(e,t,n,i){this.minimumResultsForSearch=n.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),e.call(this,t,n,i)}return e.prototype.showSearch=function(e,t){return!(function e(t){for(var n=0,i=0;i<t.length;i++){var r=t[i];r.children?n+=e(r.children):n++}return n}(t.data.results)<this.minimumResultsForSearch)&&e.call(this,t)},e}),e.define("select2/dropdown/selectOnClose",["../utils"],function(s){function e(){}return e.prototype.bind=function(e,t,n){var i=this;e.call(this,t,n),t.on("close",function(e){i._handleSelectOnClose(e)})},e.prototype._handleSelectOnClose=function(e,t){if(t&&null!=t.originalSelect2Event){var n=t.originalSelect2Event;if("select"===n._type||"unselect"===n._type)return}var i=this.getHighlightedResults();if(!(i.length<1)){var r=s.GetData(i[0],"data");null!=r.element&&r.element.selected||null==r.element&&r.selected||this.trigger("select",{data:r})}},e}),e.define("select2/dropdown/closeOnSelect",[],function(){function e(){}return e.prototype.bind=function(e,t,n){var i=this;e.call(this,t,n),t.on("select",function(e){i._selectTriggered(e)}),t.on("unselect",function(e){i._selectTriggered(e)})},e.prototype._selectTriggered=function(e,t){var n=t.originalEvent;n&&(n.ctrlKey||n.metaKey)||this.trigger("close",{originalEvent:n,originalSelect2Event:t})},e}),e.define("select2/dropdown/dropdownCss",["../utils"],function(i){function e(){}return e.prototype.render=function(e){var t=e.call(this),n=this.options.get("dropdownCssClass")||"";return-1!==n.indexOf(":all:")&&(n=n.replace(":all:",""),i.copyNonInternalCssClasses(t[0],this.$element[0])),t.addClass(n),t},e}),e.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(e){var t=e.input.length-e.maximum,n="Please delete "+t+" character";return 1!=t&&(n+="s"),n},inputTooShort:function(e){return"Please enter "+(e.minimum-e.input.length)+" or more characters"},loadingMore:function(){return"Loading more results…"},maximumSelected:function(e){var t="You can only select "+e.maximum+" item";return 1!=e.maximum&&(t+="s"),t},noResults:function(){return"No results found"},searching:function(){return"Searching…"},removeAllItems:function(){return"Remove all items"},removeItem:function(){return"Remove item"}}}),e.define("select2/defaults",["jquery","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/selectionCss","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./dropdown/dropdownCss","./i18n/en"],function(l,s,o,a,c,u,d,p,h,f,g,t,m,v,y,_,b,$,w,x,A,D,S,E,O,C,L,T,q,e){function n(){this.reset()}return n.prototype.apply=function(e){if(null==(e=l.extend(!0,{},this.defaults,e)).dataAdapter&&(null!=e.ajax?e.dataAdapter=y:null!=e.data?e.dataAdapter=v:e.dataAdapter=m,0<e.minimumInputLength&&(e.dataAdapter=f.Decorate(e.dataAdapter,$)),0<e.maximumInputLength&&(e.dataAdapter=f.Decorate(e.dataAdapter,w)),0<e.maximumSelectionLength&&(e.dataAdapter=f.Decorate(e.dataAdapter,x)),e.tags&&(e.dataAdapter=f.Decorate(e.dataAdapter,_)),null==e.tokenSeparators&&null==e.tokenizer||(e.dataAdapter=f.Decorate(e.dataAdapter,b))),null==e.resultsAdapter&&(e.resultsAdapter=s,null!=e.ajax&&(e.resultsAdapter=f.Decorate(e.resultsAdapter,E)),null!=e.placeholder&&(e.resultsAdapter=f.Decorate(e.resultsAdapter,S)),e.selectOnClose&&(e.resultsAdapter=f.Decorate(e.resultsAdapter,L))),null==e.dropdownAdapter){if(e.multiple)e.dropdownAdapter=A;else{var t=f.Decorate(A,D);e.dropdownAdapter=t}0!==e.minimumResultsForSearch&&(e.dropdownAdapter=f.Decorate(e.dropdownAdapter,C)),e.closeOnSelect&&(e.dropdownAdapter=f.Decorate(e.dropdownAdapter,T)),null!=e.dropdownCssClass&&(e.dropdownAdapter=f.Decorate(e.dropdownAdapter,q)),e.dropdownAdapter=f.Decorate(e.dropdownAdapter,O)}null==e.selectionAdapter&&(e.multiple?e.selectionAdapter=a:e.selectionAdapter=o,null!=e.placeholder&&(e.selectionAdapter=f.Decorate(e.selectionAdapter,c)),e.allowClear&&(e.selectionAdapter=f.Decorate(e.selectionAdapter,u)),e.multiple&&(e.selectionAdapter=f.Decorate(e.selectionAdapter,d)),null!=e.selectionCssClass&&(e.selectionAdapter=f.Decorate(e.selectionAdapter,p)),e.selectionAdapter=f.Decorate(e.selectionAdapter,h)),e.language=this._resolveLanguage(e.language),e.language.push("en");for(var n=[],i=0;i<e.language.length;i++){var r=e.language[i];-1===n.indexOf(r)&&n.push(r)}return e.language=n,e.translations=this._processTranslations(e.language,e.debug),e},n.prototype.reset=function(){function a(e){return e.replace(/[^\u0000-\u007E]/g,function(e){return t[e]||e})}this.defaults={amdLanguageBase:"./i18n/",autocomplete:"off",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:f.escapeMarkup,language:{},matcher:function e(t,n){if(null==t.term||""===t.term.trim())return n;if(n.children&&0<n.children.length){for(var i=l.extend(!0,{},n),r=n.children.length-1;0<=r;r--)null==e(t,n.children[r])&&i.children.splice(r,1);return 0<i.children.length?i:e(t,i)}var s=a(n.text).toUpperCase(),o=a(t.term).toUpperCase();return-1<s.indexOf(o)?n:null},minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,scrollAfterSelect:!1,sorter:function(e){return e},templateResult:function(e){return e.text},templateSelection:function(e){return e.text},theme:"default",width:"resolve"}},n.prototype.applyFromElement=function(e,t){var n=e.language,i=this.defaults.language,r=t.prop("lang"),s=t.closest("[lang]").prop("lang"),o=Array.prototype.concat.call(this._resolveLanguage(r),this._resolveLanguage(n),this._resolveLanguage(i),this._resolveLanguage(s));return e.language=o,e},n.prototype._resolveLanguage=function(e){if(!e)return[];if(l.isEmptyObject(e))return[];if(l.isPlainObject(e))return[e];var t;t=Array.isArray(e)?e:[e];for(var n=[],i=0;i<t.length;i++)if(n.push(t[i]),"string"==typeof t[i]&&0<t[i].indexOf("-")){var r=t[i].split("-")[0];n.push(r)}return n},n.prototype._processTranslations=function(e,t){for(var n=new g,i=0;i<e.length;i++){var r=new g,s=e[i];if("string"==typeof s)try{r=g.loadPath(s)}catch(e){try{s=this.defaults.amdLanguageBase+s,r=g.loadPath(s)}catch(e){t&&window.console&&console.warn&&console.warn('Select2: The language file for "'+s+'" could not be automatically loaded. A fallback will be used instead.')}}else r=l.isPlainObject(s)?new g(s):s;n.extend(r)}return n},n.prototype.set=function(e,t){var n={};n[l.camelCase(e)]=t;var i=f._convertData(n);l.extend(!0,this.defaults,i)},new n}),e.define("select2/options",["jquery","./defaults","./utils"],function(d,n,p){function e(e,t){this.options=e,null!=t&&this.fromElement(t),null!=t&&(this.options=n.applyFromElement(this.options,t)),this.options=n.apply(this.options)}return e.prototype.fromElement=function(e){var t=["select2"];null==this.options.multiple&&(this.options.multiple=e.prop("multiple")),null==this.options.disabled&&(this.options.disabled=e.prop("disabled")),null==this.options.autocomplete&&e.prop("autocomplete")&&(this.options.autocomplete=e.prop("autocomplete")),null==this.options.dir&&(e.prop("dir")?this.options.dir=e.prop("dir"):e.closest("[dir]").prop("dir")?this.options.dir=e.closest("[dir]").prop("dir"):this.options.dir="ltr"),e.prop("disabled",this.options.disabled),e.prop("multiple",this.options.multiple),p.GetData(e[0],"select2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),p.StoreData(e[0],"data",p.GetData(e[0],"select2Tags")),p.StoreData(e[0],"tags",!0)),p.GetData(e[0],"ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),e.attr("ajax--url",p.GetData(e[0],"ajaxUrl")),p.StoreData(e[0],"ajax-Url",p.GetData(e[0],"ajaxUrl")));var n={};function i(e,t){return t.toUpperCase()}for(var r=0;r<e[0].attributes.length;r++){var s=e[0].attributes[r].name,o="data-";if(s.substr(0,o.length)==o){var a=s.substring(o.length),l=p.GetData(e[0],a);n[a.replace(/-([a-z])/g,i)]=l}}d.fn.jquery&&"1."==d.fn.jquery.substr(0,2)&&e[0].dataset&&(n=d.extend(!0,{},e[0].dataset,n));var c=d.extend(!0,{},p.GetData(e[0]),n);for(var u in c=p._convertData(c))-1<t.indexOf(u)||(d.isPlainObject(this.options[u])?d.extend(this.options[u],c[u]):this.options[u]=c[u]);return this},e.prototype.get=function(e){return this.options[e]},e.prototype.set=function(e,t){this.options[e]=t},e}),e.define("select2/core",["jquery","./options","./utils","./keys"],function(t,c,u,i){var d=function(e,t){null!=u.GetData(e[0],"select2")&&u.GetData(e[0],"select2").destroy(),this.$element=e,this.id=this._generateId(e),t=t||{},this.options=new c(t,e),d.__super__.constructor.call(this);var n=e.attr("tabindex")||0;u.StoreData(e[0],"old-tabindex",n),e.attr("tabindex","-1");var i=this.options.get("dataAdapter");this.dataAdapter=new i(e,this.options);var r=this.render();this._placeContainer(r);var s=this.options.get("selectionAdapter");this.selection=new s(e,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,r);var o=this.options.get("dropdownAdapter");this.dropdown=new o(e,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,r);var a=this.options.get("resultsAdapter");this.results=new a(e,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var l=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(e){l.trigger("selection:update",{data:e})}),e[0].classList.add("select2-hidden-accessible"),e.attr("aria-hidden","true"),this._syncAttributes(),u.StoreData(e[0],"select2",this),e.data("select2",this)};return u.Extend(d,u.Observable),d.prototype._generateId=function(e){return"select2-"+(null!=e.attr("id")?e.attr("id"):null!=e.attr("name")?e.attr("name")+"-"+u.generateChars(2):u.generateChars(4)).replace(/(:|\.|\[|\]|,)/g,"")},d.prototype._placeContainer=function(e){e.insertAfter(this.$element);var t=this._resolveWidth(this.$element,this.options.get("width"));null!=t&&e.css("width",t)},d.prototype._resolveWidth=function(e,t){var n=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==t){var i=this._resolveWidth(e,"style");return null!=i?i:this._resolveWidth(e,"element")}if("element"==t){var r=e.outerWidth(!1);return r<=0?"auto":r+"px"}if("style"!=t)return"computedstyle"!=t?t:window.getComputedStyle(e[0]).width;var s=e.attr("style");if("string"!=typeof s)return null;for(var o=s.split(";"),a=0,l=o.length;a<l;a+=1){var c=o[a].replace(/\s/g,"").match(n);if(null!==c&&1<=c.length)return c[1]}return null},d.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},d.prototype._registerDomEvents=function(){var t=this;this.$element.on("change.select2",function(){t.dataAdapter.current(function(e){t.trigger("selection:update",{data:e})})}),this.$element.on("focus.select2",function(e){t.trigger("focus",e)}),this._syncA=u.bind(this._syncAttributes,this),this._syncS=u.bind(this._syncSubtree,this),this._observer=new window.MutationObserver(function(e){t._syncA(),t._syncS(e)}),this._observer.observe(this.$element[0],{attributes:!0,childList:!0,subtree:!1})},d.prototype._registerDataEvents=function(){var n=this;this.dataAdapter.on("*",function(e,t){n.trigger(e,t)})},d.prototype._registerSelectionEvents=function(){var n=this,i=["toggle","focus"];this.selection.on("toggle",function(){n.toggleDropdown()}),this.selection.on("focus",function(e){n.focus(e)}),this.selection.on("*",function(e,t){-1===i.indexOf(e)&&n.trigger(e,t)})},d.prototype._registerDropdownEvents=function(){var n=this;this.dropdown.on("*",function(e,t){n.trigger(e,t)})},d.prototype._registerResultsEvents=function(){var n=this;this.results.on("*",function(e,t){n.trigger(e,t)})},d.prototype._registerEvents=function(){var n=this;this.on("open",function(){n.$container[0].classList.add("select2-container--open")}),this.on("close",function(){n.$container[0].classList.remove("select2-container--open")}),this.on("enable",function(){n.$container[0].classList.remove("select2-container--disabled")}),this.on("disable",function(){n.$container[0].classList.add("select2-container--disabled")}),this.on("blur",function(){n.$container[0].classList.remove("select2-container--focus")}),this.on("query",function(t){n.isOpen()||n.trigger("open",{}),this.dataAdapter.query(t,function(e){n.trigger("results:all",{data:e,query:t})})}),this.on("query:append",function(t){this.dataAdapter.query(t,function(e){n.trigger("results:append",{data:e,query:t})})}),this.on("keypress",function(e){var t=e.which;n.isOpen()?t===i.ESC||t===i.TAB||t===i.UP&&e.altKey?(n.close(e),e.preventDefault()):t===i.ENTER?(n.trigger("results:select",{}),e.preventDefault()):t===i.SPACE&&e.ctrlKey?(n.trigger("results:toggle",{}),e.preventDefault()):t===i.UP?(n.trigger("results:previous",{}),e.preventDefault()):t===i.DOWN&&(n.trigger("results:next",{}),e.preventDefault()):(t===i.ENTER||t===i.SPACE||t===i.DOWN&&e.altKey)&&(n.open(),e.preventDefault())})},d.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.isDisabled()?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},d.prototype._isChangeMutation=function(e){var t=this;if(e.addedNodes&&0<e.addedNodes.length)for(var n=0;n<e.addedNodes.length;n++){if(e.addedNodes[n].selected)return!0}else{if(e.removedNodes&&0<e.removedNodes.length)return!0;if(Array.isArray(e))return e.some(function(e){return t._isChangeMutation(e)})}return!1},d.prototype._syncSubtree=function(e){var t=this._isChangeMutation(e),n=this;t&&this.dataAdapter.current(function(e){n.trigger("selection:update",{data:e})})},d.prototype.trigger=function(e,t){var n=d.__super__.trigger,i={open:"opening",close:"closing",select:"selecting",unselect:"unselecting",clear:"clearing"};if(void 0===t&&(t={}),e in i){var r=i[e],s={prevented:!1,name:e,args:t};if(n.call(this,r,s),s.prevented)return void(t.prevented=!0)}n.call(this,e,t)},d.prototype.toggleDropdown=function(){this.isDisabled()||(this.isOpen()?this.close():this.open())},d.prototype.open=function(){this.isOpen()||this.isDisabled()||this.trigger("query",{})},d.prototype.close=function(e){this.isOpen()&&this.trigger("close",{originalEvent:e})},d.prototype.isEnabled=function(){return!this.isDisabled()},d.prototype.isDisabled=function(){return this.options.get("disabled")},d.prototype.isOpen=function(){return this.$container[0].classList.contains("select2-container--open")},d.prototype.hasFocus=function(){return this.$container[0].classList.contains("select2-container--focus")},d.prototype.focus=function(e){this.hasFocus()||(this.$container[0].classList.add("select2-container--focus"),this.trigger("focus",{}))},d.prototype.enable=function(e){this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),null!=e&&0!==e.length||(e=[!0]);var t=!e[0];this.$element.prop("disabled",t)},d.prototype.data=function(){this.options.get("debug")&&0<arguments.length&&window.console&&console.warn&&console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var t=[];return this.dataAdapter.current(function(e){t=e}),t},d.prototype.val=function(e){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),null==e||0===e.length)return this.$element.val();var t=e[0];Array.isArray(t)&&(t=t.map(function(e){return e.toString()})),this.$element.val(t).trigger("input").trigger("change")},d.prototype.destroy=function(){this.$container.remove(),this._observer.disconnect(),this._observer=null,this._syncA=null,this._syncS=null,this.$element.off(".select2"),this.$element.attr("tabindex",u.GetData(this.$element[0],"old-tabindex")),this.$element[0].classList.remove("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),u.RemoveData(this.$element[0]),this.$element.removeData("select2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null},d.prototype.render=function(){var e=t('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return e.attr("dir",this.options.get("dir")),this.$container=e,this.$container[0].classList.add("select2-container--"+this.options.get("theme")),u.StoreData(e[0],"element",this.$element),e},d}),e.define("jquery-mousewheel",["jquery"],function(e){return e}),e.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults","./select2/utils"],function(r,e,s,t,o){if(null==r.fn.select2){var a=["open","close","destroy"];r.fn.select2=function(t){if("object"==typeof(t=t||{}))return this.each(function(){var e=r.extend(!0,{},t);new s(r(this),e)}),this;if("string"!=typeof t)throw new Error("Invalid arguments for Select2: "+t);var n,i=Array.prototype.slice.call(arguments,1);return this.each(function(){var e=o.GetData(this,"select2");null==e&&window.console&&console.error&&console.error("The select2('"+t+"') method was called on an element that is not using Select2."),n=e[t].apply(e,i)}),-1<a.indexOf(t)?this:n}}return null==r.fn.select2.defaults&&(r.fn.select2.defaults=t),s}),{define:e.define,require:e.require}}(),t=e.require("jquery.select2");return u.fn.select2.amd=e,t});