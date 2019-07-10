import formMsg from './formMsg'
import Adaptive from './Adaptive'

const getArrKey = (str) => {
  // goods[0].id => goods.0.id
  const str1 = str.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '')
  const arr = str1.split('.') // [goods, 0, id]
  return arr
}

const formCreator = (formCreatorConfig) => {
  const UI = Adaptive[formCreatorConfig.ui]
  return { 
    name: 'form-creator',
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
      const elForm = h(
        UI['Form'],
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
          ...(vm.renderFormItems(h) || []),
          ...(vm.$slots.append || []),
        ]
      )

      return h('div', {}, [
        elForm,
        // 开发环境 提供表单值查看功能
        debug && (h(formMsg, {
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
        tag, component, rules, previewFormItemValue, label: itemLabel,
        item: label = {}, class: detailClass = {}, style: detailStyle = {}, 
        ...detail
      }) {
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
        const scopedSlots = (detail.scopedSlots || []).map(ele => ele(h))
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
            children = [component(h)]
          }
        } else {
          if (tag === UI['Select']) {
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
              (detail.options || []).map(option => h(UI['Option'], {
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
          } else if (tag === UI['CheckboxGroup']) {
            detail.options.forEach(ele => {
              if (previewText === ele.value) {
                previewText = ele.label
              }
            })
            const checkbox = h(
              UI['CheckboxGroup'],
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
                UI['Checkbox'],
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
          } else if (tag === UI['RadioGroup']) {
            // radio 适配
            const RadioGroup = h(UI['RadioGroup'], {
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
            (detail.options || []).map(option => {
              return h(UI['Radio'], {
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
              )
            })
            )
            children = [RadioGroup]
          } else {
            const input = h(tag || UI['Input'], {
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
        if (vm.option.status === 'preview') {
          formItemChildren = previewText
          if (previewFormItemValue) {
            formItemChildren = previewFormItemValue(value, h)
          }
        } else {
          formItemChildren = [...children]
        }
        const { label: formItemLabel, ...labelrest } = label // 这是item字段
        const labelStr = formItemLabel || itemLabel || ''
        return h(
          UI['FormItem'],
          {
            style: formItemStyle,
            class: formItemClass,
            props: {
              rules,
              size,
              label: labelStr + ((labelStr && vm.option.autoAuffix) ? '：' : ''),
              prop: name,
              ...labelrest
            }
          },
          [
            formItemChildren,
            ...formItemScopedSlots,
          ]
        )
      },

      renderFormItems (h) {
        const vm = this
        const mapFormItems = (item) => {
          const defaultSpan = vm.option.itemSpan || 24
          let formItem
          if (item.name) {
            formItem = vm.renderFormItem(h, item)
          } else { // 不对应表单字段
            formItem = item.component(h)
          }
          return h(UI.Col, {
            props: {
              span: item.span || defaultSpan
            },
          }, [formItem])
        }
        return this.fields.map((item, index) => {
          if (Array.isArray(item) && item.length > 0) {
            const formItem = item.map(itemChild => mapFormItems(itemChild))
            return h(UI.Row, {
              props: {
                gutter: item[0].gutter || 40,
              },
            }, formItem)
          }
          if (!item || item.length === 0) {
            return null
          }
          // el-row el-col span
          const formItem = mapFormItems(item)
          return h(UI.Row, [formItem])
        })
      }
    },
  }}

export default formCreator
