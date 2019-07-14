import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'
import App from '../app/components/App'
import AddTodo from '../app/components/AddTodo'
import TodoItem from '../app/components/TodoItem'

describe('初始化数据为-"第一条"、"第二条"、"第三条"', function() {
	it('应该没有一条数据的状态是完成的', function() {
		let app = render(<App />)
		expect(app.find('.todo-done').length).to.equal(0)
	})
	it('应该有3条数据，并且分别为“第一条”，“第二条”，“第三条”', function() {
		let value = ['第一条', '第二条', '第三条'].join('')
		let app = render(<App />)
		let todoItems = app.find('.todo-item .todo-text')
		let expectValue = todoItems.length === 3 && value === todoItems.text()
		expect(expectValue).to.equal(true)
	})
})
