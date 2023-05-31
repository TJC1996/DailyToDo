import React, { useState, useRef, useEffect } from 'react';
import Styles from './Styles.css'
import TodoList from './ToDoList'
import { v4 as uuidv4 } from 'uuid';

// const { uuid } = require('uuidv4');

const LOCAL_STORAGE_KEY = 'todoApp.todos'


function App() {
  const initialTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  const [todos, setTodos] = useState(initialTodos); // This initializes todos with stored values if available or an empty array otherwise
  const todoNameRef = useRef();

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    console.log(name)
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function clearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossOrigin="anonymous"></link>
     
      <div className='d-flex flex-column justify-content-between' style={{ minHeight: '100vh' }}>
    <div>
    <h2 className='text-center mt-4'>To Do List:</h2>
    <div className='px-4 py-5 my-5 text-center mt-auto'>
    <TodoList todos={todos} toggleTodo={toggleTodo} className="mb-5" />
    </div>
      {/* Place any content you want to keep on top */}
    </div>
    
    <div className='px-4 py-5 my-5 text-center mt-auto'>
      <div className="input">
       
        <input ref={todoNameRef} type="text" className="form-control mt-5" />
        <div class="btn-group mt-3" role="group">
          <button class="btn btn-success" onClick={handleAddTodo}>Add To Do</button>
          <button class="btn btn-danger" type="button" onClick={clearTodos}>Clear</button>
        </div>
      </div>
  
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </div>
  </div>     
     
      {/* <div className='px-4 py-5 my-5 text-center'>
        <div className="input">
          <TodoList todos={todos} toggleTodo={toggleTodo} className="mb-5" />
          <input ref={todoNameRef} type="text" className="form-control mt-5" />
          <div class="btn-group mt-3" role="group">
          <button class="btn btn-success" onClick={handleAddTodo}>Add Todos</button>
          <button class="btn btn-danger" type="button" onClick={clearTodos}>Clear</button>
          </div>
          
        </div>
  
        <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      </div> */}
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossOrigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js" integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS" crossOrigin="anonymous"></script>
    </>
  )
}

export default App;
