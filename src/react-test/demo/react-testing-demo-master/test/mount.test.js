import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'
import App from '../app/components/App'
import AddTodo from '../app/components/AddTodo'
import TodoItem from '../app/components/TodoItem'

// describe('测试添加功能是否正确', () => {
// 	it('添加-todo-list的数组应该增加一个', () => {
// 		let app = mount(<App />)
// 		let todoLength = app.find('li').length
// 		let addInput = app.find('.add-input').get(0)
// 		addInput.value = '测试'
// 		app.find('.add-button').simulate('click')
// 		expect(app.find('li').length).to.equal(todoLength + 1)
// 	})

// 	it('添加一条数据的内容应该等于输入框输入的内容', () => {
// 		let app = mount(<App />)
// 		let value = '增加一条todo'

// 		let input = app.find('.add-input').get(0)
// 		input.value = value

// 		app.find('.add-button').simulate('click') // 模拟点击
// 		let todos = app.find('.todo-text')
// 		let lastItem = todos.last()
// 		expect(lastItem.text()).to.equal(value)
// 	})
// })

// describe('测试删除按能是否正确', () => {
// 	it('删除-todo-list的数组应该变少一个', () => {
// 		let app = mount(<App />)
// 		let todoLength = app.find('li').length
// 		app.find('button.delete')
// 			.at(0)
// 			.simulate('click')
// 		expect(app.find('li').length).to.equal(todoLength - 1)
// 	})
// })
