
> 已内置常见校验规则

使用方式
``` js
import {
    validatorFunc,
    decimal0To100, integer, ...
} from 'q-former/lib/rules.js'

rules: [
  'required', decimal0To100
]

```

> validatorFunc 是对校验写法做一个封装，只需要传入 元祖[reg, message]即为一个校验，内部实现如下

``` js
/**
 * 校验 高阶函数
 * @param {*} regRule [reg, message]
 */
export const validatorFunc = (regRule) => {
  const [reg, message] = regRule
  return {
    validator: (rule, val, callback) => {
      // 有输入值 并且输入值不合法
      if (val && !reg.test(val)) {
        callback(new Error(message))
      }
      callback()
    }
  }
}
```

内置规则
``` js
export const regs = {
  // 1 ~ 100之间的整数
  integer1To100: [/^(([1-9]\d?)|100)$/, '请输入非零正整数且不大于100'],
  // 非负整数
  positiveInteger: [/^[0-9]*$/, '请输入整数'],
  // 整数 包含: 正 负 0
  integer: [/^-?[0-9]*$/, '请输入非负整数'],
  // 最多保留2位小数
  maxDecimal2: [
    /^-?[0-9]+(.[0-9]{1,2})?$/,
    '请输入数字，最多保留2位小数',
  ],
  // 0 ~ 100 最多2位小数 包含0
  decimal0To100: [
    /^([0-9]\d?(\.\d{1,2})?|0.\d{1,2}|100|100.0|100.00)$/,
    '100之间数字，最多保留2位小数'
  ],
  email: [
    /^([0-9]\d?(\.\d{1,2})?|0.\d{1,2}|100|100.0|100.00)$/,
    '邮箱格式有误',
  ],
  phone: [
    /^1[0-9]{10}$/,
    '手机号格式有误'
  ],
  url: [
    /^(ht|f)tps?:\/\//i,
    '网址格式有误'
  ],
}
```