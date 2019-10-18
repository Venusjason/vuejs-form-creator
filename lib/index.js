(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.formCreator = {}));
}(this, function (exports) { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  // import {jsonView} from 'jsonview-vue'
  var _require = require('jsonview-vue'),
      jsonView = _require.jsonView;

  var zIndex = 999999;
  var formMsg = {
    name: 'form-msg-helper',
    props: {
      model: {
        type: [Object, Array],
        default: function _default() {}
      }
    },
    // components: {
    //   JsonView
    // },
    data: function data() {
      return {
        showVal: false
      };
    },
    render: function render(h) {
      var _this = this;

      var dialogStyle = {
        position: 'fixed',
        'z-index': zIndex++,
        top: 0,
        right: 0,
        maxWidth: '300px',
        maxHeight: '300px',
        background: 'rgb(236, 251, 240)',
        overflow: 'scroll',
        opacity: 0.9,
        padding: '20px',
        color: 'rgb(0, 0, 0)'
      };
      var bottonStyle = {
        // padding: '2px 4px',
        // position: 'fixed',
        // 'z-index': zIndex++,
        // top: '10px',
        // right: '10px',
        cursor: 'pointer',
        background: '#2d8cf0',
        color: '#fff'
      };
      return h("div", {
        "style": {
          position: 'absolute',
          top: 0,
          right: 0
        }
      }, [h("button", {
        "style": bottonStyle,
        "on": {
          "click": function click() {
            _this.showVal = !_this.showVal;
          }
        }
      }, [this.showVal ? '关闭' : '表单值']), this.showVal && h("div", {
        "style": dialogStyle
      }, [h(jsonView, {
        "attrs": {
          "json": this.model
        }
      })])]);
    }
  };

  var element = {
    Row: 'el-row',
    Col: 'el-col',
    Form: 'el-form',
    FormItem: 'el-form-item',
    Input: 'el-input',
    Select: 'el-select',
    Option: 'el-option',
    RadioGroup: 'el-radio-group',
    Radio: 'el-radio',
    CheckboxGroup: 'el-checkbox-group',
    Checkbox: 'el-checkbox',
    Button: 'el-button'
  };
  var iview = {
    Row: 'Row',
    Col: 'i-col',
    Form: 'Form',
    FormItem: 'FormItem',
    Input: 'Input',
    Select: 'Select',
    Option: 'Option',
    RadioGroup: 'RadioGroup',
    Radio: 'Radio',
    CheckboxGroup: 'CheckboxGroup',
    Checkbox: 'Checkbox',
    Button: 'i-button'
  };
  var Adaptive = {
    element: element,
    iview: iview
  };

  var computedRules = function computedRules(rules) {
    var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '此项';
    var rulesType = Object.prototype.toString.call(rules);
    if (rulesType !== '[object Array]') return [];
    return rules.map(function (rule) {
      if (rule === 'required') {
        return {
          required: true,
          message: "".concat(label, "\u5FC5\u586B")
        };
      }

      return rule;
    });
  };

  var getArrKey = function getArrKey(str) {
    // goods[0].id => goods.0.id
    var str1 = str.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');
    var arr = str1.split('.'); // [goods, 0, id]

    return arr;
  };

  var GetObjectLength = function GetObjectLength(arr) {
    return arr.reduce(function (total, currentItem) {
      var type = Object.prototype.toString.call(currentItem);
      var addVal = type === '[object Array]' ? 0 : 1;
      return total + addVal;
    }, 0);
  }; // 为了兼容在vue文件中写jsx component 0.9.0版本前需要加H 函数，之后不需要


  var renderComponent = function renderComponent(component, h) {
    var type = _typeof(component); // function是需要传递H函数，object可以在内部调用h


    return type === 'function' ? component(h) : component;
  };

  var formCreator = function formCreator(formCreatorConfig) {
    var UI = Adaptive[formCreatorConfig.ui];
    return {
      name: formCreatorConfig.name || 'form-creator',
      props: {
        value: {
          type: Object,
          default: function _default() {
            return {};
          }
        },
        fields: {
          type: [Object, Array],
          default: function _default() {
            return [];
          }
        },
        // el-form 配置
        option: {
          type: Object,
          default: function _default() {}
        },
        size: {
          type: String,
          default: 'medium'
        }
      },
      data: function data() {
        return {
          updating: false,
          formValues: this.mergeValues()
        };
      },
      watch: {
        formValues: {
          handler: function handler(formValues) {
            this.updating = true;
            this.$emit('input', formValues);
          },
          deep: true
        },
        model: {
          handler: function handler(model) {
            if (!this.updating) {
              this.formValues = this.mergeValues();
            } else {
              this.updating = false;
            }
          },
          deep: true
        }
      },
      render: function render(h) {
        var vm = this;

        var _vm$option = vm.option,
            status = _vm$option.status,
            debug = _vm$option.debug,
            rest = _objectWithoutProperties(_vm$option, ["status", "debug"]); // debug模式 表单配置优先级高于全局配置


        var isDebug = debug ? debug : formCreatorConfig.debug;
        var renderFormItems = vm.renderFormItems(h) || [];
        var elForm = h(UI.Form, {
          props: _objectSpread({
            model: vm.formValues,
            disabled: status === 'disabled'
          }, rest),
          ref: 'form'
        }, [].concat(_toConsumableArray(vm.$slots.prepend || []), _toConsumableArray(renderFormItems), _toConsumableArray(vm.$slots.append || [])));
        return h('div', {
          style: {
            position: 'relative'
          }
        }, [elForm, // 开发环境 提供表单值查看功能
        isDebug && h(formMsg, {
          props: {
            model: vm.formValues
          }
        })]);
      },
      created: function created() {
        this.$emit('input', this.formValues);
      },
      methods: {
        getFormRef: function getFormRef() {
          return this.$refs.form;
        },
        mergeValues: function mergeValues() {
          return this.value;
        },
        filterAttrs: function filterAttrs() {
          var detail = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var keys = Object.keys(detail);
          var attrs = {};
          keys.forEach(function (key) {
            var value = detail[key];

            if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
              attrs[key] = value;
            }
          });
          return attrs;
        },
        renderFormItem: function renderFormItem(h, _ref) {
          var tag = _ref.tag,
              component = _ref.component,
              rules = _ref.rules,
              previewFormItemValue = _ref.previewFormItemValue,
              formItemStatus = _ref.formItemStatus,
              itemLabel = _ref.label,
              _ref$item = _ref.item,
              label = _ref$item === void 0 ? {} : _ref$item,
              _ref$class = _ref.class,
              detailClass = _ref$class === void 0 ? {} : _ref$class,
              _ref$style = _ref.style,
              detailStyle = _ref$style === void 0 ? {} : _ref$style,
              detail = _objectWithoutProperties(_ref, ["tag", "component", "rules", "previewFormItemValue", "formItemStatus", "label", "item", "class", "style"]);

          // 防止表单控件 超出边界,设置 默认 maxWidth: '100%'
          if (!detailStyle.maxWidth) {
            detailStyle.maxWidth = '100%';
          }

          if (tag && component) {
            console.error('tag 与 component不可同时使用');
            return null;
          }

          var vm = this;
          var formValues = vm.formValues,
              size = vm.size;
          var name = detail.name;
          var value = null;
          var previewText = null; // previewText一般来说是与value保持一致的，当有自定义展示值得时候，可以用preview函数来实现

          if (Object.prototype.hasOwnProperty.call(formValues, name)) {
            value = formValues[name];
          } else {
            var _getArrKey = getArrKey(name),
                _getArrKey2 = _slicedToArray(_getArrKey, 3),
                key = _getArrKey2[0],
                index = _getArrKey2[1],
                childKey = _getArrKey2[2];

            value = formValues[key][index][childKey];
          }

          previewText = value;

          var modelEvents = _objectSpread({
            input: function input(val) {
              if (Object.prototype.hasOwnProperty.call(formValues, name)) {
                formValues[name] = val;
              } else {
                var _getArrKey3 = getArrKey(name),
                    _getArrKey4 = _slicedToArray(_getArrKey3, 3),
                    _key = _getArrKey4[0],
                    _index = _getArrKey4[1],
                    _childKey = _getArrKey4[2];

                formValues[_key][_index][_childKey] = val;
              }
            }
          }, detail.on || {});

          var children = []; // 自定义slot实现

          var scopedSlots = (detail.scopedSlots || []).map(function (ele) {
            return renderComponent(ele, h);
          });

          if (component) {
            // 自定义表单控件渲染逻辑
            if (name) {
              var componentProps = {
                class: detailClass,
                style: detailStyle,
                attrs: _objectSpread({}, vm.filterAttrs(detail)),
                props: _objectSpread({
                  value: value
                }, detail),
                on: _objectSpread({}, modelEvents)
              };
              children = [h(component, componentProps, scopedSlots)];
            } else {
              // 无意义的表单元素 纯展示
              children = [renderComponent(component, h)];
            }
          } else {
            if (tag === UI.Select) {
              if (detail.multiple) {
                // 多选 数组形式 value是id数组
                previewText = '';
              }

              detail.options.forEach(function (ele) {
                if (detail.multiple && value.indexOf(ele.value) > -1) {
                  // 多选 数组形式 value是id数组
                  previewText += "".concat(ele.label, "\u3001");
                } else if (previewText === ele.value) {
                  previewText = ele.label;
                }
              });
              var select = h(tag, {
                class: detailClass,
                style: detailStyle,
                attrs: _objectSpread({}, vm.filterAttrs(detail)),
                props: _objectSpread({
                  value: value
                }, detail),
                on: _objectSpread({}, modelEvents)
              }, (detail.options || []).map(function (option) {
                return h(UI.Option, {
                  attrs: _objectSpread({}, vm.filterAttrs(option)),
                  props: _objectSpread({
                    key: option.value
                  }, option)
                });
              }));
              children = [select];
            } else if (tag === UI.CheckboxGroup) {
              detail.options.forEach(function (ele) {
                if (previewText === ele.value) {
                  previewText = ele.label;
                }
              });
              var checkbox = h(UI.CheckboxGroup, {
                class: detailClass,
                style: detailStyle,
                attrs: _objectSpread({}, vm.filterAttrs(detail)),
                props: _objectSpread({
                  value: value
                }, detail),
                on: _objectSpread({}, modelEvents)
              }, (detail.options || []).map(function (option) {
                return h(UI.Checkbox, {
                  attrs: _objectSpread({}, vm.filterAttrs(option)),
                  props: _objectSpread({}, option, {
                    key: option.value,
                    label: option.value
                  })
                }, [option.label]);
              }));
              children = [checkbox];
            } else if (tag === UI.RadioGroup) {
              // radio 适配
              var RadioGroup = h(UI.RadioGroup, {
                class: detailClass,
                style: detailStyle,
                attrs: _objectSpread({}, vm.filterAttrs(detail)),
                props: _objectSpread({
                  value: value
                }, detail),
                on: _objectSpread({}, modelEvents)
              }, (detail.options || []).map(function (option) {
                return h(UI.Radio, {
                  attrs: _objectSpread({}, vm.filterAttrs(option)),
                  props: _objectSpread({}, option, {
                    key: option.value,
                    label: option.value
                  }),
                  on: _objectSpread({}, modelEvents)
                }, [option.label]);
              }));
              children = [RadioGroup];
            } else {
              var input = h(tag || UI.Input, {
                class: detailClass,
                style: detailStyle,
                attrs: _objectSpread({}, vm.filterAttrs(detail)),
                props: _objectSpread({
                  value: value
                }, detail),
                on: _objectSpread({}, modelEvents)
              }, scopedSlots);
              children = [input];
            }
          }

          var formItemStyle = label.style || {};
          var formItemClass = label.class || {};
          var formItemScopedSlots = (label.scopedSlots || []).map(function (ele) {
            return ele(h);
          });
          var formItemChildren = []; // 表单预览态
          // 增加 formItemStatus 字段，优先级高于 option.status，便于表单部分字段特殊状态处理

          var formItemStatus1 = formItemStatus || vm.option.status || 'edit';

          if (formItemStatus1 === 'preview') {
            formItemChildren = previewText;

            if (previewFormItemValue) {
              formItemChildren = previewFormItemValue(value, h);
            }
          } else {
            formItemChildren = _toConsumableArray(children);
          }

          var formItemLabel = label.label,
              labelrest = _objectWithoutProperties(label, ["label"]); // 这是item字段


          var labelStr = formItemLabel || itemLabel || '';
          var _vm$option2 = vm.option,
              colon = _vm$option2.colon,
              autoAuffix = _vm$option2.autoAuffix;

          if (autoAuffix) {
            console.warn('autoAuffix 后续版本会删除，请使用 colon 替代');
          }

          return h(UI.FormItem, {
            style: formItemStyle,
            class: formItemClass,
            props: _objectSpread({
              rules: computedRules(rules, labelStr),
              size: size,
              label: labelStr + (labelStr && (colon || autoAuffix) ? '：' : ''),
              prop: name
            }, labelrest),
            // 提升渲染准确性
            key: name
          }, [formItemChildren].concat(_toConsumableArray(formItemScopedSlots)));
        },
        onSubmit: function onSubmit() {
          var Form = this.$refs.form;
          this.$emit('submit', Form);
        },
        onCancel: function onCancel() {
          this.$emit('cancel');
        },
        // 渲染表单 取消、提交按钮
        renderButtonGroup: function renderButtonGroup() {
          var h = this.$createElement;
          var status = this.option.status;
          var Btns = [h(UI.Button, {
            "on": {
              "click": this.onCancel
            },
            "style": {
              marginRight: '10px'
            }
          }, ["\u53D6\u6D88"]), h(UI.Button, {
            "attrs": {
              "type": "primary",
              "disabled": status === 'disabled'
            },
            "on": {
              "click": this.onSubmit
            }
          }, ["\u63D0\u4EA4"])];

          if (status === 'preview') {
            Btns.pop();
          }

          return Btns;
        },
        renderFormItems: function renderFormItems(h) {
          var vm = this;
          var defaultSpan = vm.option.itemSpan;
          var defaultGutter = vm.option.itemGutter || 0;

          var mapFormItems = function mapFormItems(item, i, l) {
            // 递归调用
            if (Array.isArray(item) && item.length > 0) {
              var l1 = GetObjectLength(item);
              var arrChild = item.map(function (itemChild, j) {
                return mapFormItems(itemChild, j, l1);
              });
              return h(UI.Row, {
                // 提升渲染准确性
                key: i + l1
              }, _toConsumableArray(arrChild));
            }

            var formItem; // 值为null的情况

            if (!item) return item;

            if (item.name) {
              formItem = vm.renderFormItem(h, item);
            } else if (item.component) {
              // 不对应表单字段
              formItem = renderComponent(item.component, h);
            } else if (item.formItemComponent) {
              // 不对应表单字段
              formItem = h(UI.FormItem, {
                props: {
                  label: '',
                  'label-width': 0
                },
                // 提升渲染准确性
                key: i
              }, [renderComponent(item.formItemComponent, h)]);
            }

            return h(UI.Col, {
              props: {
                span: item.span || defaultSpan || Math.floor(24 / l)
              },
              // 提升渲染准确性
              key: i + (item.name || '')
            }, [formItem]);
          };

          var fields = this.fields.map(function (item, index) {
            if (item === null) return null;

            if (Array.isArray(item) && item.length > 0) {
              var l = GetObjectLength(item);

              var _formItem = item.map(function (itemChild, i) {
                return mapFormItems(itemChild, i, l);
              });

              return h(UI.Row, {
                props: {
                  gutter: item[0].gutter || defaultGutter
                },
                // 提升渲染准确性
                key: index
              }, _formItem);
            }

            if (!item || item.length === 0) {
              return null;
            } // el-row el-col span


            var formItem = mapFormItems(item, index, 1);
            return h(UI.Row, {
              // 提升渲染准确性
              key: index
            }, [formItem]);
          }); // 增加 ButtonGroup 渲染

          if (vm.option.buttonGroup) {
            // true false 自定义function
            var renderButtonGroup = typeof vm.option.buttonGroup === 'function' ? vm.option.buttonGroup() : vm.renderButtonGroup();
            fields.push(h(UI.Row, {
              key: fields.length + 1
            }), [h(UI.FormItem, {}, _toConsumableArray(renderButtonGroup))]);
          }

          return fields;
        }
      }
    };
  };

  var install = function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (install.installed) return;
    var defaultOptions = {
      // 默认使用element-ui
      ui: 'element',
      // 默认在开发模式开启表单debug
      debug: process.env.NODE_ENV === 'development',
      // 组件名默认 form-creator
      name: 'form-creator'
    };

    if (typeof options === 'string') {
      options = {
        ui: options
      };
    }

    var newOptions = Object.assign({}, defaultOptions, options);
    var Form = formCreator(newOptions);
    Vue.component(Form.name, Form);
  };

  var formCreatorFunc = formCreator;
  var index = {
    install: install
  };

  exports.default = index;
  exports.formCreatorFunc = formCreatorFunc;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
