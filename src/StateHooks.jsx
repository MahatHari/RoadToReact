import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

const initialTodos = [
  {
    id: uuid(),
    task: 'Learn React',
    complete: 'true',
  },
  {
    id: uuid(),
    task: 'Learn Firebase',
    complete: 'true',
  },
  {
    id: uuid(),
    task: 'Learn GraphQL',
    complete: 'false',
  },
];

const StateHooks = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [task, setTask] = useState('');
  const handleInputChange = (event) => {
    setTask(event.target.value);
  };
  const handleSubmit = (event) => {
    if (task) {
      setTodos(todos.concat({ id: uuid(), task, complete: false }));
    }
    setTask('');
    event.preventDefault();
  };
  const handleCheckboxChange = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      })
    );
  };

  // Filtering Todos
  // Show All Todos
  // Show complete todps
  //show incomplete todos

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type='checkbox'
                name=''
                id=''
                checked={todo.complete}
                onChange={() => handleCheckboxChange(todo.id)}
              />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type='text' value={task} onChange={handleInputChange} />
        <button type='submit'>Add ToDo</button>
      </form>
    </div>
  );
};

export default StateHooks;
