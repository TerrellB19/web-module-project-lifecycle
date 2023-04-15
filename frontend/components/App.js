import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      todos: [],

    }
  }
  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({...this.state,todos: res.data.data})
    })
    .catch(err => {
      debugger
    })
  }
  componentDidMount(){
    this.fetchAllTodos()
    
  }
  render() {
    console.log(this.state.todos)
    return (
      <div>
        <div id='error'>Error: No Error Here</div>
        <div id='todos'>
          <h2>Todos:</h2>
          {
          this.state.todos.map(todo => {
            return <div key={todo.id}>{todo.name}<br/></div> 
          })}
        </div>
        <form id='todoForm'>
          <input type='text' placeholder='Type Todo'/>
          <input type="submit"/>
          <button >Clear Completed</button>
        </form>
      </div>
    )
  } 
}
