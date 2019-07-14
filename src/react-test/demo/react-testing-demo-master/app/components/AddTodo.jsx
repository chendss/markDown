import React from 'react';
import TodoStore from '../stores/TodoStore';

export default class AddTodo extends React.Component {
    addTodo () {
        const newTodoName = this.refs.todoTitle.value;
        if (newTodoName) {
            TodoStore.addNewTodo({
                name: newTodoName
            });
            TodoStore.emitChange();
            this.refs.todoTitle.value = '';
        }
    }

    render () {
        return (
            <div className="add-todo">
                <input className="add-input" type="text" placeholder="请输入" ref="todoTitle" ></input>
                <button className="add-button" onClick={this.addTodo.bind(this)}>
                    添加一条todo
                </button>
            </div>
        );
    }
}