import { add, sort } from '../utils/math'
import { expect } from 'chai'
import { sortTableData, close, getLoading, getData } from '../utils/action'

// describe('有返回-加法函数测试', () => {
// 	it('1+1应该等于2', () => {
// 		expect(add(1, 1)).to.be.equal(2)
// 	})
// })

// describe('有返回-冒泡排序测试', () => {
// 	it('[1,5,6,8,9,0,-1]应该排序为[-1,0,1,5,6,8,9]', () => {
// 		let sortValue = sort([1, 5, 6, 8, 9, 0, -1]).join('')
// 		let expectValue = [-1, 0, 1, 5, 6, 8, 9].join('')
// 		expect(sortValue).to.be.equal(expectValue)
// 	})
// })

// describe('有返回-获得store loading状态', () => {
// 	it('应该返回ture', () => {
// 		let value = getLoading()
// 		expect(value).to.be.equal(true)
// 	})
// })

// describe('有返回-获得store tableData值', () => {
// 	it('应该返回 1234114324677', () => {
// 		let value = getData().join('')
// 		let expectValue = [1, 2, 3, 4, 0, 11, 43, 24, 67, 7].join('')
// 		expect(value).to.be.equal(expectValue)
// 	})
// })

// describe('无返回-修改loading值状态', () => {
// 	it('应该成功修改store的loading状态为false', () => {
// 		close()
// 		let expectValue = false
// 		expect(getLoading()).to.be.equal(expectValue)
// 	})
// })

// describe('无返回-修改tableData排序', () => {
// 	it('应该成功修改tableData为[0, 1, 2, 3, 4, 7, 11, 24, 43,67]', () => {
// 		sortTableData()
// 		let value = getData().join('')
// 		let expectValue = [0, 1, 2, 3, 4, 7, 11, 24, 43, 67]
// 		expect(value).to.be.equal(expectValue.join(''))
// 	})
// })
