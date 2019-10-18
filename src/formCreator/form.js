import formMsg from './formMsg'
import Adaptive from './Adaptive'

const getArrKey = (str) => {
  // goods[0].id => goods.0.id
  const str1 = str.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '')
  const arr = str1.split('.') // [goods, 0, id]
  return arr
}

const GetObjectLength =  (arr) => {
  return arr.reduce((total, currentItem) => {
    const type = Object.prototype.toString.call(currentItem)
    const addVal = type === '[object Array]' ? 0 : 1
    return total + addVal
  }, 0)
}

// 为了兼容在vue文件中写jsx component 0.9.0版本前需要加H 函数，之后不需要
const renderComponent = (component, h) => {
  const type = typeof component
  // function是需要传递H函数，object可以在内部调用h
  return type === 'function' ? component(h) : component
}

const formCreator = (formCreatorConfig) => {
  const UI = Adaptive[formCreatorConfig.ui]

  const computedRules = (rules, label = '此项', tag = UI.Input) => {
    const rulesType = Object.prototype.toString.call(rules)
    const selectStrTags = [
      UI.Select, UI.RadioGroup, UI.Radio, UI.CheckboxGroup, UI.Checkbox,
    ]
    let rulesClone = rules || []
    if (rulesType !== '[object Array]' && rules) {
      rulesClone = [rules]
    }
    return rulesClone.map(rule => {
      if (rule === 'required') {
        const str = selectStrTags.indexOf(tag) > -1 ? '请选择' : '请填写'
        return {
          required: true, message: `${str + label}`
        }
      }
      return rule
    })
  }

  return {
    name: formCreatorConfig.name || 'form-creator',
    props: {
      value: {
        type: Object,
        default () {
          return {}
        }
      },
      fields: {
        type: [Object, Array],
        default () {
          return []
        }
      },
      // el-form 配置
      option: {
        type: Object,
        default: () => {}
      },
      size: {
        type: String,
        default: 'medium'
      },
    },

    data () {
      return {
        updating: false,
        formValues: this.mergeValues(),
      }
    },

    watch: {
      formValues: {
        handler (formValues) {
          this.updating = true
          this.$emit('input', formValues)
        },
        deep: true
      },
      model: {
        handler (model) {
          if (!this.updating) {
            this.formValues = this.mergeValues()
          } else {
            this.updating = false
          }
        },
        deep: true
      }
    },

    render (h) {
      const vm = this
      const { status, debug, ...rest } = vm.option
      // debug模式 表单配置优先级高于全局配置
      const isDebug = debug ? debug : formCreatorConfig.debug

      const renderFormItems = vm.renderFormItems(h) || []

      const elForm = h(
        UI.Form,
        {
          props: {
            model: vm.formValues,
            disabled: status === 'disabled',
            ...rest
          },
          ref: 'form',
        },
        [
          ...(vm.$slots.prepend || []),
          ...(renderFormItems),
          ...(vm.$slots.append || []),
        ]
      )

      return h('div', {
        style: {
          position: 'relative',
        }
      }, [
        elForm,
        // 开发环境 提供表单值查看功能
        isDebug && (h(formMsg, {
          props: {
            model: vm.formValues
          },
        })),
      ])
    },

    created () {
      this.$emit('input', this.formValues)
    },

    methods: {
      getFormRef() {
        return this.$refs.form
      },
      mergeValues () {
        return this.value
      },

      filterAttrs (detail = {}) {
        const keys = Object.keys(detail)
        const attrs = {}

        keys.forEach(key => {
          const value = detail[key]

          if (
            typeof value === 'number'
            || typeof value === 'string'
            || typeof value === 'boolean'
          ) {
            attrs[key] = value
          }
        })

        return attrs
      },

      renderFormItem (h, {
        tag,
        component,
        rules,
        previewFormItemValue,
        formItemStatus,
        label: itemLabel,
        item: label = {},
        class: detailClass = {},
        style: detailStyle = {},
        ...detail
      }) {
        // 防止表单控件 超出边界,设置 默认 maxWidth: '100%'
        if (!detailStyle.maxWidth) {
          detailStyle.maxWidth = '100%'
        }
        if (tag && component) {
          console.error('tag 与 component不可同时使用')
          return null
        }
        const vm = this
        const { formValues, size } = vm
        const { name } = detail
        let value = null
        let previewText = null // previewText一般来说是与value保持一致的，当有自定义展示值得时候，可以用preview函数来实现
        if (Object.prototype.hasOwnProperty.call(formValues, name)) {
          value = formValues[name]
        } else {
          const [key, index, childKey] = getArrKey(name)
          value = formValues[key][index][childKey]
        }
        previewText = value
        const modelEvents = {
          input (val) {
            if (Object.prototype.hasOwnProperty.call(formValues, name)) {
              formValues[name] = val
            } else {
              const [key, index, childKey] = getArrKey(name)
              formValues[key][index][childKey] = val
            }
          },
          // 表单联动可以在自定义on里处理
          ...detail.on || {}
        }
        let children = []
        // 自定义slot实现
        const scopedSlots = (detail.scopedSlots || []).map(ele => renderComponent(ele, h))
        if (component) {
          // 自定义表单控件渲染逻辑
          if (name) {
            const componentProps = {
              class: detailClass,
              style: detailStyle,
              attrs: {
                ...vm.filterAttrs(detail)
              },
              props: {
                value,
                ...detail
              },
              on: {
                ...modelEvents
              }
            }
            children = [h(component, componentProps, scopedSlots)]
          } else {
            // 无意义的表单元素 纯展示
            children = [renderComponent(component, h)]
          }
        } else {
          if (tag === UI.Select) {
            if (detail.multiple) { // 多选 数组形式 value是id数组
              previewText = ''
            }
            detail.options.forEach(ele => {
              if (detail.multiple && value.indexOf(ele.value) > -1) { // 多选 数组形式 value是id数组
                previewText += `${ele.label}、`
              } else if (previewText === ele.value) {
                previewText = ele.label
              }
            })
            const select = h(
              tag,
              {
                class: detailClass,
                style: detailStyle,
                attrs: {
                  ...vm.filterAttrs(detail)
                },
                props: {
                  value,
                  ...detail
                },
                on: {
                  ...modelEvents
                }
              },
              (detail.options || []).map(option => h(UI.Option, {
                attrs: {
                  ...vm.filterAttrs(option)
                },
                props: {
                  key: option.value,
                  ...option
                }
              }))
            )
            children = [select]
          } else if (tag === UI.CheckboxGroup) {
            detail.options.forEach(ele => {
              if (previewText === ele.value) {
                previewText = ele.label
              }
            })
            const checkbox = h(
              UI.CheckboxGroup,
              {
                class: detailClass,
                style: detailStyle,
                attrs: {
                  ...vm.filterAttrs(detail)
                },
                props: {
                  value,
                  ...detail
                },
                on: {
                  ...modelEvents
                }
              },
              (detail.options || []).map(option => h(
                UI.Checkbox,
                {
                  attrs: {
                    ...vm.filterAttrs(option)
                  },
                  props: {
                    ...option,
                    key: option.value,
                    label: option.value,
                  }
                },
                [option.label]
              ))
            )

            children = [checkbox]
          } else if (tag === UI.RadioGroup) {
            // radio 适配
            const RadioGroup = h(UI.RadioGroup, {
              class: detailClass,
              style: detailStyle,
              attrs: {
                ...vm.filterAttrs(detail)
              },
              props: {
                value,
                ...detail
              },
              on: {
                ...modelEvents
              },
            },
            (detail.options || []).map(option => h(UI.Radio, {
              attrs: {
                ...vm.filterAttrs(option)
              },
              props: {
                ...option,
                key: option.value,
                label: option.value,
              },
              on: {
                ...modelEvents
              }
            },
            [option.label]
            ))
            )
            children = [RadioGroup]
          } else {
            const input = h(tag || UI.Input, {
              class: detailClass,
              style: detailStyle,
              attrs: {
                ...vm.filterAttrs(detail)
              },
              props: {
                value,
                ...detail
              },
              on: {
                ...modelEvents
              }
            }, scopedSlots)
            children = [input]
          }
        }

        const formItemStyle = label.style || {}
        const formItemClass = label.class || {}
        const formItemScopedSlots = (label.scopedSlots || []).map(ele => ele(h))
        let formItemChildren = []
        // 表单预览态
        // 增加 formItemStatus 字段，优先级高于 option.status，便于表单部分字段特殊状态处理
        const formItemStatus1 = formItemStatus || vm.option.status || 'edit'
        if (formItemStatus1 === 'preview') {
          formItemChildren = previewText
          if (previewFormItemValue) {
            formItemChildren = previewFormItemValue(value, h)
          }
        } else {
          formItemChildren = [...children]
        }
        const { label: formItemLabel, ...labelrest } = label // 这是item字段
        const labelStr = formItemLabel || itemLabel || ''
        const { colon, autoAuffix } = vm.option
        if (autoAuffix) {
          console.warn('autoAuffix 后续版本会删除，请使用 colon 替代')
        }
        return h(
          UI.FormItem,
          {
            style: formItemStyle,
            class: formItemClass,
            props: {
              rules: computedRules(rules, labelStr, tag),
              size,
              label: labelStr + ((labelStr && (colon || autoAuffix)) ? '：' : ''),
              prop: name,
              ...labelrest
            },
            // 提升渲染准确性
            key: name,
          },
          [
            formItemChildren,
            ...formItemScopedSlots,
          ]
        )
      },
      onSubmit() {
        const Form = this.$refs.form
        this.$emit('submit', Form)
      },
      onCancel() {
        this.$emit('cancel')
      },
      // 渲染表单 取消、提交按钮
      renderButtonGroup() {
        const { status } = this.option
        const Btns = [
          (
            <UI.Button onClick={this.onCancel} style={{marginRight: '10px'}} >取消</UI.Button>
          ),
          (
            <UI.Button type="primary" onClick={this.onSubmit} disabled={ status === 'disabled' }>提交</UI.Button>
          ),
        ]
        if (status === 'preview') {
          Btns.pop()
        }
        return Btns
      },

      renderFormItems (h) {
        const vm = this
        const defaultSpan = vm.option.itemSpan
        const defaultGutter = vm.option.itemGutter || 0
        const mapFormItems = (item, i, l) => {
          // 递归调用
          if (Array.isArray(item) && item.length > 0) {
            const l1 = GetObjectLength(item)
            const arrChild = item.map((itemChild, j) => mapFormItems(itemChild, j, l1))
            return h(UI.Row, {
              // 提升渲染准确性
              key: i + l1,
            }, [...arrChild])
          }
          let formItem
          // 值为null的情况
          if (!item) return item
          if (item.name) {
            formItem = vm.renderFormItem(h, item)
          } else if (item.component) { // 不对应表单字段
            formItem = renderComponent(item.component, h)
          } else if (item.formItemComponent) { // 不对应表单字段
            formItem = h(
              UI.FormItem,
              {
                props: {
                  label: '',
                  'label-width': 0,
                },
                // 提升渲染准确性
                key: i,
              },
              [renderComponent(item.formItemComponent, h)]
            )
          }
          return h(UI.Col, {
            props: {
              span: item.span || defaultSpan || Math.floor(24 / l)
            },
            // 提升渲染准确性
            key: i + (item.name || ''),
          }, [formItem])
        }
        const fields = this.fields.map((item, index) => {
          if (item === null) return null
          if (Array.isArray(item) && item.length > 0) {
            const l = GetObjectLength(item)
            const formItem = item.map((itemChild, i) => mapFormItems(itemChild, i, l))
            return h(UI.Row, {
              props: {
                gutter: item[0].gutter || defaultGutter,
              },
              // 提升渲染准确性
              key: index,
            }, formItem)
          }
          if (!item || item.length === 0) {
            return null
          }
          // el-row el-col span
          const formItem = mapFormItems(item, index, 1)
          return h(UI.Row, {
            // 提升渲染准确性
            key: index,
          }, [formItem])
        })
        // 增加 ButtonGroup 渲染
        if (vm.option.buttonGroup) { // true false 自定义function
          const renderButtonGroup = typeof vm.option.buttonGroup === 'function' ? vm.option.buttonGroup() : vm.renderButtonGroup()
          fields.push(h(UI.Row, {
            key: fields.length + 1,
          }), [
            h(
              UI.FormItem,
              {},
              [...renderButtonGroup],
            )
          ])
        }
        return fields
      }
    },
  }
}

export default formCreator
