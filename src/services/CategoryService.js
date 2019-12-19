const key = 'fmv2:category'

const get = () => {
  const dataList = JSON.parse(localStorage.getItem(key))

  if (!dataList) {
    localStorage.setItem(key, JSON.stringify([]))
    return []
  }

  return dataList
}

const save = dataList => {
  localStorage.setItem(key, JSON.stringify(dataList))
}

export default {
  get,
  save,
}
