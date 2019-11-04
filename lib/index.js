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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
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

  var isArray = function isArray(data) {
    return Object.prototype.toString.call(data) === '[object Array]';
  };
  /**
   * 通过传入 fields 解析出 符合规范 只有2层结构的 fields
   * @param {array} fields
   */


  var computedFields = function computedFields(fields) {
    var arr = [];

    var findChildArray = function findChildArray(list) {
      list.forEach(function (item) {
        if (isArray(item)) {
          var hasArrayChild = item.filter(function (ele) {
            return isArray(ele);
          }).length > 0;

          if (hasArrayChild) {
            findChildArray(item);
          } else {
            arr.push(item);
          }
        } else {
          arr.push([item]);
        }
      });
    };

    findChildArray(fields);
    return arr;
  };

  var computedKeyProps = function computedKeyProps(key) {
    var isDebug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return {
      key: key,
      attrs: isDebug ? {
        'data-debug-key': key
      } : {}
    };
  };

  var getArrKey = function getArrKey(str, data) {
    // goods[0].id => goods.0.id
    var str1 = str.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');
    var arr = str1.split('.'); // [goods, 0, id]

    return arr;
  }; // 为了兼容在vue文件中写jsx component 0.9.0版本前需要加H 函数，之后不需要


  var renderComponent = function renderComponent(component, h) {
    var type = _typeof(component); // function是需要传递H函数，object可以在内部调用h


    return type === 'function' ? component(h) : component;
  };

  var formCreator = (function (formCreatorConfig) {
    var UI = Adaptive[formCreatorConfig.ui];

    var computedRules = function computedRules(rules) {
      var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '此项';
      var tag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : UI.Input;
      var rulesType = Object.prototype.toString.call(rules);
      var selectStrTags = [UI.Select, UI.RadioGroup, UI.Radio, UI.CheckboxGroup, UI.Checkbox];
      var rulesClone = rules || [];

      if (rulesType !== '[object Array]' && rules) {
        rulesClone = [rules];
      }

      return rulesClone.map(function (rule) {
        if (rule === 'required') {
          var str = selectStrTags.indexOf(tag) > -1 ? '请选择' : '请填写';
          return {
            required: true,
            message: "".concat(str + label)
          };
        }

        return rule;
      });
    };

    return {
      name: formCreatorConfig.name || 'q-form',
      props: {
        value: {
          type: Object,
          default: function _default() {
            return {};
          }
        },

        /**
         * form 配置
         */
        option: {
          type: Object,
          default: function _default() {
            return {
              /**
               * form 全局 labelWidth
               * element 和 iview 有配置差异 px单位
               */
              labelWidth: formCreatorConfig.ui === 'element' ? '100px' : 100,
              inline: false,
              status: 'edit',
              colon: true,
              debug: false,

              /**
               * 取消 提交按钮组合
               */
              buttonGroup: true,

              /**
               * form size
               */
              size: 'medium'
            };
          }
        },

        /**
         * 同 option.size
         */
        size: {
          type: String,
          default: 'medium'
        },

        /**
         * 字段项配置
         */
        fields: {
          type: [Object, Array],
          default: function _default() {
            return [];
          }
        }
      },
      data: function data() {
        return {
          updating: false,
          formValues: this.mergeValues(),
          uniqueKey: ''
        };
      },
      created: function created() {
        this.$emit('input', this.formValues);
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
          handler: function handler() {
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
        var FormItems = vm.renderFormItems(h) || [];
        var Form = h(UI.Form, {
          props: _objectSpread({
            model: vm.formValues,
            disabled: status === 'disabled'
          }, rest),
          ref: 'form'
        }, [FormItems]);
        return h('div', {
          style: {
            position: 'relative'
          }
        }, [Form, // 开发环境 提供表单值查看功能
        isDebug && h(formMsg, {
          props: {
            model: vm.formValues
          }
        })]);
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
          var isDebug = formCreatorConfig.debug;
          /**
           * 渲染真实数组下的item
           * @param {any} formItemCol
           * @param {number} formItemRowsLen
           */

          var renderFormItemCol = function renderFormItemCol(formItemCol) {
            var formItemRowsLen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var i = arguments.length > 2 ? arguments[2] : undefined;
            var j = arguments.length > 3 ? arguments[3] : undefined;
            var formItem;
            if (!formItemCol) return null;
            formItem = vm.renderFormItem(h, formItemCol);
            return h(UI.Col, _objectSpread({}, computedKeyProps(formItemCol.name || "".concat(i, ".").concat(j), isDebug), {
              props: {
                span: formItemCol.span || Math.floor(24 / formItemRowsLen) || vm.option.itemSpan || 24
              }
            }), Array.isArray(formItem) ? formItem : [formItem]);
          };

          var fields = computedFields(this.fields).map(function (item, index) {
            // return vm.mapFormItems(h, item, index, l)
            var gutter = item && item[0] && item[0].gutter || vm.option.itemGutter || 0;
            return h(UI.Row, _objectSpread({}, computedKeyProps(index, isDebug), {
              props: {
                gutter: gutter
              }
            }), item.map(function (itemCol, j) {
              return renderFormItemCol(itemCol, item.length, index, j);
            }));
          }); // 增加 ButtonGroup 渲染

          if (vm.option.buttonGroup) {
            var renderButtonGroup = typeof vm.option.buttonGroup === 'function' ? vm.option.buttonGroup() : vm.renderButtonGroup();
            var buttonGroupItem = h(UI.Row, {
              key: 'buttonGroupItem'
            }, [h(UI.FormItem, {
              key: 'buttonGroupItemFormItem'
            }, renderButtonGroup)]);
            fields.push(buttonGroupItem);
          }

          return fields;
        },
        renderFormItem: function renderFormItem(h, fieldItem) {
          var vm = this;

          var tag = fieldItem.tag,
              component = fieldItem.component,
              formItemComponent = fieldItem.formItemComponent,
              rules = fieldItem.rules,
              previewFormItemValue = fieldItem.previewFormItemValue,
              previewValue = fieldItem.previewValue,
              formItemStatus = fieldItem.formItemStatus,
              itemLabel = fieldItem.label,
              _fieldItem$item = fieldItem.item,
              label = _fieldItem$item === void 0 ? {} : _fieldItem$item,
              _fieldItem$class = fieldItem.class,
              detailClass = _fieldItem$class === void 0 ? {} : _fieldItem$class,
              _fieldItem$style = fieldItem.style,
              detailStyle = _fieldItem$style === void 0 ? {} : _fieldItem$style,
              detail = _objectWithoutProperties(fieldItem, ["tag", "component", "formItemComponent", "rules", "previewFormItemValue", "previewValue", "formItemStatus", "label", "item", "class", "style"]);

          var name = detail.name; // 防止表单控件 超出边界,设置 默认 maxWidth: '100%'

          if (!detailStyle.maxWidth) {
            detailStyle.maxWidth = '100%';
          } // 只有一个 component


          if (!name && component) {
            return renderComponent(component);
          }

          if (tag && component) {
            console.error('tag 与 component不可同时使用');
            return null;
          }

          var formValues = vm.formValues;
          var value = null;
          var previewText = null; // previewText一般来说是与value保持一致的，当有自定义展示值得时候，可以用preview函数来实现

          if (name) {
            if (Object.prototype.hasOwnProperty.call(formValues, name)) {
              value = formValues[name];
            } else {
              var arr123 = getArrKey(name);

              if (arr123.length === 1) {
                value = formValues[arr123[0]];
              } else if (arr123.length === 2) {
                value = formValues[arr123[0]][arr123[1]];
              } else if (arr123.length === 3) {
                value = formValues[arr123[0]][arr123[1]][arr123[2]];
              } else {
                console.error("".concat(name, "\u65E0\u6CD5\u5904\u7406"));
              }
            }
          }

          previewText = value;

          var modelEvents = _objectSpread({
            input: function input(val) {
              if (Object.prototype.hasOwnProperty.call(formValues, name)) {
                formValues[name] = val;
              } else {
                /**
                 * TODO:
                 * 未在formValues 里声明的字段 触发值不一定对
                 * 需要尝试使用 this.$set
                 */
                var _arr = getArrKey(name);

                if (_arr.length === 1) {
                  formValues[_arr[0]] = val;
                } else if (_arr.length === 2) {
                  formValues[_arr[0]][_arr[1]] = val;
                } else if (_arr.length === 3) {
                  var _arr2 = _slicedToArray(_arr, 3),
                      key1 = _arr2[0],
                      key2 = _arr2[1],
                      key3 = _arr2[2];

                  formValues[key1][key2][key3] = val;
                } else {
                  console.error("".concat(name, "\u65E0\u6CD5\u5904\u7406"));
                }
              }
            }
          }, detail.on || {});

          var formField = null; // 自定义slot实现

          var scopedSlots = (detail.scopedSlots || []).map(function (ele) {
            return renderComponent(ele, h);
          });
          var itemProps = {
            class: detailClass,
            style: detailStyle,
            attrs: _objectSpread({}, vm.filterAttrs(detail)),
            props: _objectSpread({
              value: value
            }, detail),
            on: _objectSpread({}, modelEvents)
          };

          if (component && name) {
            formField = h(component, itemProps, scopedSlots);
          } else if (name && !component) {
            if ([UI.CheckboxGroup, UI.Select].indexOf(tag) > -1) {
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
              var optionTag = UI.CheckboxGroup === tag ? UI.Checkbox : UI.Option;
              var options = (detail.options || []).map(function (option) {
                return h(optionTag, {
                  attrs: _objectSpread({}, vm.filterAttrs(option)),
                  props: _objectSpread({
                    key: option.value
                  }, option)
                });
              });
              formField = h(tag, itemProps, options);
            } else if (tag === UI.RadioGroup) {
              var Radios = (detail.options || []).map(function (option) {
                return h(UI.Radio, {
                  attrs: _objectSpread({}, vm.filterAttrs(option)),
                  props: _objectSpread({
                    key: option.value
                  }, option, {
                    label: option.value
                  }),
                  on: _objectSpread({}, modelEvents)
                }, [option.label]);
              });
              formField = h(UI.RadioGroup, itemProps, Radios);
            } else {
              formField = h(tag || UI.Input, itemProps, scopedSlots);
            }
          } else {
            formField = renderComponent(formItemComponent, h);
          }

          var formItemLabel = label.label,
              labelWidth = label.labelWidth,
              labelrest = _objectWithoutProperties(label, ["label", "labelWidth"]); // 这是item字段


          var labelStr = formItemLabel || itemLabel || '';
          var _vm$option2 = vm.option,
              colon = _vm$option2.colon,
              autoAuffix = _vm$option2.autoAuffix,
              size = _vm$option2.size;
          var realSize = size || vm.size;
          var reallabelWidth = labelWidth;

          if (formItemComponent && !labelWidth) {
            // formItemComponent 默认 labelWidth 为 0
            reallabelWidth = formCreatorConfig.ui === 'element' ? '0px' : 0;
          }

          if (autoAuffix) {
            console.warn('autoAuffix 后续版本会删除，请使用 colon 替代');
          }

          var formItemStatus1 = formItemStatus || vm.option.status || 'edit';

          if (formItemStatus1 === 'preview') {
            formField = previewText;

            if (previewValue || previewFormItemValue) {
              var fn = previewValue || previewFormItemValue;
              formField = fn(value, h);
            }
          }

          var formItemChildren = [formField]; // 插入表单项前边

          if (label.prepend) {
            formItemChildren.unshift(renderComponent(label.prepend, h));
          } // 插入表单项后边


          if (label.append) {
            formItemChildren.push(renderComponent(label.append, h));
          }

          return h(UI.FormItem, {
            style: label.style || {},
            class: label.class || {},
            props: _objectSpread({
              rules: computedRules(rules, labelStr, tag),
              size: realSize,
              prop: name,
              label: labelStr + (labelStr && (colon || autoAuffix) ? '：' : ''),
              labelWidth: reallabelWidth
            }, labelrest),
            key: label.key || name
          }, formItemChildren);
        },
        onSubmit: function onSubmit() {
          var Form = this.$refs.form;
          this.$emit('submit', Form);
        },
        onCancel: function onCancel() {
          this.$emit('cancel');
        }
      }
    };
  });

  var install = function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (install.installed) return;
    var defaultOptions = {
      // 默认使用element-ui
      ui: 'element',
      // 默认在开发模式开启表单debug
      debug: process.env.NODE_ENV === 'development',
      // 组件名默认 form-creator
      name: 'q-form'
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
