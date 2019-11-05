// form.js  升级版本
import formMsg from './formMsg'
import Adaptive from './Adaptive'

const isArray = (data) => Object.prototype.toString.call(data) === '[object Array]'

/**
 * 通过传入 fields 解析出 符合规范 只有2层结构的 fields
 * @param {array} fields
 */
const computedFields = (fields) => {
  const arr = []
  const findChildArray = (list, zIndex = 0) => {
    list.forEach(item => {
      if (isArray(item)) {
        const hasArrayChild = item.filter(ele => isArray(ele)).length > 0
        if (hasArrayChild) {
          findChildArray(item, zIndex + 1)
        } else {
          arr.push(item)
        }
      } else {
        arr.push([item])
      }
    })
  }
  findChildArray(fields)
  return arr
}

const computedKeyProps = (key, isDebug = false) => {
  return {
    key,
    attrs: isDebug ? {
      'data-debug-key': key
    } : {}
  }
}

const getArrKey = (str) => {
  // goods[0].id => goods.0.id
  const str1 = str.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '')
  const arr = str1.split('.') // [goods, 0, id]
  return arr
}

// 为了兼容在vue文件中写jsx component 0.9.0版本前需要加H 函数，之后不需要
const renderComponent = (component, h) => {
  const type = typeof component
  // function是需要传递H函数，object可以在内部调用h
  return type === 'function' ? component(h) : component
}

export default (formCreatorConfig) => {

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
    name: formCreatorConfig.name || 'q-form',
    props: {
      value: {
        type: Object,
        default () {
          return {}
        }
      },
      /**
       * form 配置
       */
      option: {
        type: Object,
        default: () => ({
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
          size: 'medium',
        }),
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
        default () {
          return []
        }
      },
    },

    data() {
      return {
        updating: false,
        formValues: this.mergeValues(),
        uniqueKey: '',
      }
    },

    created () {
      this.$emit('input', this.formValues)
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
        handler () {
          if (!this.updating) {
            this.formValues = this.mergeValues()
          } else {
            this.updating = false
          }
        },
        deep: true
      }
    },

    render(h) {
      const vm = this
      const { status, debug, ...rest } = vm.option
      // debug模式 表单配置优先级高于全局配置
      const isDebug = debug ? debug : formCreatorConfig.debug

      const FormItems = vm.renderFormItems(h) || []

      const Form = h(
        UI.Form,
        {
          props: {
            model: vm.formValues,
            disabled: status === 'disabled',
            ...rest,
          },
          ref: 'form',
        },
        [ FormItems ],
      )

      return h('div', {
        style: {
          position: 'relative',
        }
      }, [
        Form,
        // 开发环境 提供表单值查看功能
        isDebug && (h(formMsg, {
          props: {
            model: vm.formValues
          },
        })),
      ])
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

      renderFormItems(h) {
        const vm = this

        const isDebug = formCreatorConfig.debug

        /**
         * 渲染真实数组下的item
         * @param {any} formItemCol
         * @param {number} formItemRowsLen
         */
        const renderFormItemCol = (formItemCol, formItemRowsLen = 1, i, j) => {
          let formItem = formItemCol
          if (Object.prototype.toString.call(formItemCol) === '[object Function]') {
            // 动态render函数，自执行
            formItem = formItemCol()
          }
          if (!formItem) return null
          formItem = vm.renderFormItem(h, formItem)

          return h(
            UI.Col,
            {
              ...computedKeyProps(formItemCol.name || `${i}.${j}`, isDebug),
              props: {
                span: formItemCol.span || Math.floor(24 / formItemRowsLen) || vm.option.itemSpan || 24
              },
            },
            Array.isArray(formItem) ? formItem : [formItem]
          )
        }

        const fields = computedFields(this.fields).map((item, index) => {
          // return vm.mapFormItems(h, item, index, l)
          const gutter = (item && item[0] && item[0].gutter) || vm.option.itemGutter || 0
          return h(UI.Row, {
              ...computedKeyProps(index, isDebug),
              props: {
                gutter,
              }
            },
            item.map((itemCol, j) => renderFormItemCol(itemCol, item.length, index, j))
          )
        })
        // 增加 ButtonGroup 渲染
        if (vm.option.buttonGroup) {
          const renderButtonGroup = typeof vm.option.buttonGroup === 'function' ? vm.option.buttonGroup() : vm.renderButtonGroup()
          const buttonGroupItem = h(UI.Row, {
            key: 'buttonGroupItem',
          }, [
            h(UI.FormItem, {
              key: 'buttonGroupItemFormItem',
            }, renderButtonGroup)
          ])
          fields.push(buttonGroupItem)
        }
        return fields
      },

      renderFormItem(h, fieldItem) {
        const vm = this
        const {
          tag,
          component,
          formItemComponent,
          rules,
          previewFormItemValue,
          previewValue,
          formItemStatus,
          label: itemLabel,
          item: label = {},
          class: detailClass = {},
          style: detailStyle = {},
          ...detail
        } = fieldItem
        const { name } = detail
        // 防止表单控件 超出边界,设置 默认 maxWidth: '100%'
        if (!detailStyle.maxWidth) {
          detailStyle.maxWidth = '100%'
        }
        // 只有一个 component
        if (!name && component) {
          return renderComponent(component, h)
        }
        if (tag && component) {
          console.error('tag 与 component不可同时使用')
          return null
        }
        const { formValues } = vm
        let value = null
        let previewText = null // previewText一般来说是与value保持一致的，当有自定义展示值得时候，可以用preview函数来实现
        if (name) {
          if (Object.prototype.hasOwnProperty.call(formValues, name)) {
            value = formValues[name]
          } else {
            const arr123 = getArrKey(name)
            if (arr123.length === 1) {
              value = formValues[arr123[0]]
            } else if (arr123.length === 2) {
              value = formValues[arr123[0]][arr123[1]]
            } else if (arr123.length === 3) {
              value = formValues[arr123[0]][arr123[1]][arr123[2]]
            } else {
              console.error(`${name}无法处理`)
            }
          }
        }

        previewText = value

        const modelEvents = {
          input (val) {
            if (Object.prototype.hasOwnProperty.call(formValues, name)) {
              formValues[name] = val
            } else {
              /**
               * TODO:
               * 未在formValues 里声明的字段 触发值不一定对
               * 需要尝试使用 this.$set
               */
              let arr123 = getArrKey(name)
              if (arr123.length === 1) {
                formValues[arr123[0]] = val
              } else if (arr123.length === 2) {
                formValues[arr123[0]][arr123[1]] = val
              } else if (arr123.length === 3) {
                const [key1, key2, key3] = arr123
                formValues[key1][key2][key3] = val
              } else {
                console.error(`${name}无法处理`)
              }
            }
          },
          // 表单联动可以在自定义on里处理
          ...detail.on || {}
        }

        let formField = null

        // 自定义slot实现
        const scopedSlots = (detail.scopedSlots || []).map(ele => renderComponent(ele, h))
        const itemProps = {
          class: detailClass,
          style: detailStyle,
          attrs: {
            ...vm.filterAttrs(detail)
          },
          props: {
            value,
            ...detail,
          },
          on: {
            ...modelEvents
          }
        }
        if (component && name) {
          formField = h(component, itemProps, scopedSlots)
        } else if (name && !component) {
          if ([UI.CheckboxGroup, UI.Select].indexOf(tag) > -1) {
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
            const optionTag = UI.CheckboxGroup === tag ? UI.Checkbox : UI.Option
            const options = (detail.options || []).map(option => h(optionTag, {
              attrs: {
                ...vm.filterAttrs(option)
              },
              props: {
                key: option.value,
                ...option,
              }
            }))
            formField = h(tag, itemProps, options)
          } else if (tag === UI.RadioGroup) {
            const Radios = (detail.options || []).map(option => h(UI.Radio, {
              attrs: {
                ...vm.filterAttrs(option)
              },
              props: {
                key: option.value,
                ...option,
                label: option.value,
              },
              on: {
                ...modelEvents
              },
            }, [option.label]))

            formField = h(UI.RadioGroup, itemProps, Radios)
          } else {
            formField = h(tag || UI.Input, itemProps, scopedSlots)
          }
        } else {
          formField = renderComponent(formItemComponent, h)
        }

        const { label: formItemLabel, labelWidth, ...labelrest } = label // 这是item字段
        const labelStr = formItemLabel || itemLabel || ''
        const { colon, autoAuffix, size } = vm.option
        const realSize = size || vm.size
        let reallabelWidth = labelWidth
        if (formItemComponent && !labelWidth) {
          // formItemComponent 默认 labelWidth 为 0
          reallabelWidth = formCreatorConfig.ui === 'element' ? '0px' : 0
        }
        if (autoAuffix) {
          console.warn('autoAuffix 后续版本会删除，请使用 colon 替代')
        }

        const formItemStatus1 = formItemStatus || vm.option.status || 'edit'
        if (formItemStatus1 === 'preview') {
          formField = previewText
          if (previewValue || previewFormItemValue) {
            const fn = previewValue || previewFormItemValue
            formField = fn(value, h)
          }
        }

        const formItemChildren = [formField]

        // 插入表单项前边
        if (label.prepend) {
          formItemChildren.unshift(renderComponent(label.prepend, h))
        }
        // 插入表单项后边
        if (label.append) {
          formItemChildren.push(renderComponent(label.append, h))
        }

        return h(
          UI.FormItem,
          {
            style: label.style || {},
            class: label.class || {},
            props: {
              rules: computedRules(rules, labelStr, tag),
              size: realSize,
              prop: name,
              label: labelStr + ((labelStr && (colon || autoAuffix)) ? '：' : ''),
              labelWidth: reallabelWidth,
              ...labelrest,
            },
            key: label.key || name,
          },
          formItemChildren,
        )
      },
      onSubmit() {
        const Form = this.$refs.form
        this.$emit('submit', Form)
      },
      onCancel() {
        this.$emit('cancel')
      },
    },
  }
}