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

/**
 * 校验 高阶函数
 * @param {*} regRule [reg, message]
 */
export const validatorFunc = (regRule) => {
  const [reg, message] = regRule
  const validator = (rule, val, callback) => {
    // 有输入值 并且输入值不合法
    if (val && !reg.test(val)) {
      callback(new Error(message))
    }
    callback()
  }
  return { validator }
}

export const required = (label) => ({
  required: true, message: `${label}必填`,
})

// 长度限制
export const limitLength = (max, min = 0) => {
  return {
    min, max, message: `请输入${min}~${max}个字符`,
  }
}

/**
 * 1 ~ 100之间的整数
 */
export const integer1To100 = validatorFunc(regs.integer1To100)

/**
 * 整数 包含: 正 负 0
 */
export const positiveInteger = validatorFunc(regs.positiveInteger)

/**
 * 非负整数
 */
export const integer = validatorFunc(regs.integer)

/**
 * 最多保留2位小数
 */
export const maxDecimal2 = validatorFunc(regs.maxDecimal2)

/**
 * 0 ~ 100 最多2位小数 包含0
 */
export const decimal0To100 = validatorFunc(regs.decimal0To100)

/**
 * 手机号格式
 */
export const phone = validatorFunc(regs.phone)

/**
 * url
 */
export const url = validatorFunc(regs.url)

/**
 * email
 */
export const email = validatorFunc(regs.email)
