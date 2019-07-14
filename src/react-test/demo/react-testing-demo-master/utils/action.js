import { sort } from './math' // 冒泡排序函数
class Store {
  constructor() {
    this.loading = true
    this.tableData = [1, 2, 3, 4, 0, 11, 43, 24, 67, 7]
  }
}

const store = new Store()

export const getLoading = function () {
  return store.loading
}

export const getData = function () {
  return store.tableData
}

export const close = function () {
  store.loading = false
}

export const sortTableData = function () {
  store.tableData = sort(store.tableData)
}