export const add = function (a, b) {
  return a + b
}

export const sort = function (list) {
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (list[i] < list[j]) {
        ;[list[i], list[j]] = [list[j], list[i]]
      }
    }
  }
  return list
}