/**
 * 将对象转化成url查询字符串
 *
 * @param {IObjectValue} obj
 * @returns {string}
 */
export const param = function(obj) {
	let result = []
	for (let key in obj) {
		let val = obj[key]
		result.push(`${key}=${val}`)
	}
	return encodeURIComponent(result.join('&'))
}

/**
 * 查询字符串转对象
 *
 * @param {string} url
 */
export const queryParse = function(url) {
	let queryStr = decodeURIComponent(url).split('?')[1]
	let result = {}
	let queryStrArray = queryStr.split('&')
	let queryArray = queryStrArray.map(item => item.split('='))
	queryArray.forEach(queryList => {
		let [key, value] = queryList
		result[key] = decodeURIComponent(value)
	})
	return result
}
