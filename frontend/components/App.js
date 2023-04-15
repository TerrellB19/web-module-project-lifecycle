import React, { Component } from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends Component {
 state = {
      todos: [],
      error: '',
      todoNameInput: '',
      displayCompleted: true  
    }
  
  
  
  setError = err => {
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
      
      this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
      this.resetForm()
    })
    .catch(this.setError)
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
    .catch(this.setError)
  }

  toggleCompleted = id => evt => {
    axios.patch(`${URL}/${id}`, )
    .then(res => {
      this.setState({...this.state, todos: this.state.todos.map(todo => {
        if (todo.id != id){
          return todo
        } else return res.data.data
      })})
  })
  .catch(this.setError)
  } 

  componentDidMount(){
    this.fetchAllTodos()
    
  }

  toggleDisplayCompleted = () => {
    this.setState({...this.state, displayCompleted: !this.state.displayCompleted})
  }
  
  render() {
    return (
      <div>
        <div id='error'>{this.state.error}</div>
          <TodoList 
          todos={this.state.todos}
          displayCompleted={this.state.displayCompleted}
          toggleCompleted={this.toggleCompleted}/>
          <Form 
          todoFormSubmit={this.todoFormSubmit}
          todoInputChange={this.todoInputChange}
          todoNameInput={this.state.todoNameInput}
          toggleDisplayCompleted={this.toggleDisplayCompleted}
          displayCompleted={this.state.displayCompleted}
          />
      </div>
    )
  } 
}
