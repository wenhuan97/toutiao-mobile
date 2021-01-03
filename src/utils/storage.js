// 封装本地存储模块

export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    //   如果是JSON格式的 字符串
    return JSON.parse(data)
  } catch (error) {
    // 如果不是 JSON格式字符串 就返回原有值
    return data
  }
}
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
