import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.todoFormSubmit} id='todoForm'>
          <input 
          value={this.props.todoNameInput} 
          onChange={this.props.todoInputChange} 
          type='text' placeholder='Type Todo'/>
          <input type="submit"/> 
        </form>
        <button 
        onClick={this.props.toggleDisplayCompleted} >
          {this.props.displayCompleted ? 'Hide' : 'show'} Completed
        </button>
      </div>
    )
  }
}
