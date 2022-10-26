/**
 * 用户名表单校验
 * @param val 输入的内容
 * @returns true 表示表单校验通过，string 表示表单校验未通过，string 为提示信息
 */
export const validateUsername = (val: string) => {
  if (!val) return '用户名必填'
  if (val.length < 3 || val.length > 12) return '用户名在 3-12 位之间'
  return true
}

/**
 * 密码表单校验
 * @param val 输入的内容
 * @returns true 表示表单校验通过，string 表示表单校验未通过，string 为提示信息
 */
export const validatePassword = (val: string) => {
  if (!val) return '密码必填'
  if (val.length < 6 || val.length > 12) return '密码在 6-12 位之间'
  return true
}

export const validateConfirmPassword = (val: string, password: string[]) => {
  if (val !== password[0]) return '两次密码输入不一致'
  return true
}
