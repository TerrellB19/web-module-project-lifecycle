import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      todos: [],
      error: '',
      todoNameInput: ''
      
    }
  }
  setError = (err) => {
    this.setState({...this.state, error: err.response.data.message}) 
  }

  resetForm = () => {
    this.setState({...this.state, todoNameInput: ''})
  }

  todoInputChange = evt => {
    const { value } = evt.target
    this.setState({...this.state, todoNameInput: value})
  }

  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoNameInput})
    .then(res => {
      this.fetchAllTodos()
      this.resetForm()
    })
    .catch(err => {
      this.setError(err)
    })
  }

  todoFormSubmit = (e) => {
    e.preventDefault()
    this.postNewTodo()
  }

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({...this.state,todos: res.data.data})
    })
    .catch(err => {
      this.setError(err)
    })
  }

  componentDidMount(){
    this.fetchAllTodos()
    
  }
  
  render() {
    return (
      <div>
        <div id='error'>{this.state.error}</div>
        <div id='todos'>
          <h2>Todos:</h2>
          {
          this.state.todos.map(todo => {
            return <div key={todo.id}>{todo.name}<br/></div> 
          })}
        </div>
        <form onSubmit={this.todoFormSubmit} id='todoForm'>
          <input value={this.state.todoNameInput} onChange={this.todoInputChange} type='text' placeholder='Type Todo'/>
          <input type="submit"/>
          <button >Clear Completed</button>
        </form>
      </div>
    )
  } 
}
