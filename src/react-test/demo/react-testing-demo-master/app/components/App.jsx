import React ,{Component}from 'react'
import AddTodo from './AddTodo'
import TodoList from './TodoList'

class App extends Component{
  render(){
    return (
      <div style={{
        display:'flex',flexDirection:'column',
        alignItems:'center',justifyContent:'center'
      }}>
        <h1>todo-list</h1>
        <TodoList/>
        <AddTodo/>
      </div>
    )
  }
}

export default App