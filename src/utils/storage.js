export const getItem = (name) => {
  var data = localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
export const setItem = (name, value) => {
  if (typeof (value) === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(name, value)
}
export const removeItem = (name) => {
  localStorage.setItem(name)
}
