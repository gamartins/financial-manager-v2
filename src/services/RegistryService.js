const key = 'fmv2:registry'

const get = dateQuery => {
  const dataList = JSON.parse(localStorage.getItem(`${key}${dateQuery}`))

  if (!dataList) {
    localStorage.setItem(`${key}${dateQuery}`, JSON.stringify([]))
    return []
  }

  return dataList
}

const save = (dataList, dateQuery) => {
  localStorage.setItem(`${key}${dateQuery}`, JSON.stringify(dataList))
}

export default {
  get,
  save,
}
