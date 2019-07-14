import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'
import App from '../app/components/App'
import AddTodo from '../app/components/AddTodo'
import TodoItem from '../app/components/TodoItem'

// describe('判断标题是否正确', () => {
// 	it('标题应该为 todo-list', () => {
// 		let app = shallow(<App />)
// 		expect(app.find('h1').text()).to.equal('todo-list')
// 	})
// })

// describe('添加todo按钮文本是否为 添加一条todo', () => {
// 	it('按钮文本应该为 添加一条todo', () => {
// 		let addTodo = shallow(<AddTodo />)
// 		expect(addTodo.find('.add-button').text()).to.equal('添加一条todo')
// 	})
// })

// describe('判断输入框的提示是否为 请输入', () => {
// 	it('提示文本应该为 请输入', () => {
// 		let addTodo = shallow(<AddTodo />)
// 		let input = addTodo.find('input')
// 		let placeholder = input.node.props.placeholder
// 		expect(placeholder).to.equal('请输入')
// 	})
// })

// describe('删除todo按钮文本是否为 删除', () => {
// 	it('按钮文本应该为 删除', () => {
// 		let todoItem = shallow(<TodoItem todo="测试" done={false} />)
// 		expect(
// 			todoItem
// 				.find('.delete')
// 				.text()
// 				.trim()
// 		).to.equal('删除')
// 	})
// })
