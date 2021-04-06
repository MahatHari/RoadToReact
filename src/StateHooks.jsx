import React, { useState, useReducer } from 'react';
import { v4 as uuid } from 'uuid';

const initialTodos = [
  {
    id: uuid(),
    task: 'Learn React',
    complete: true,
  },
  {
    id: uuid(),
    task: 'Learn Firebase',
    complete: true,
  },
  {
    id: uuid(),
    task: 'Learn GraphQL',
    complete: false,
  },
  {
    id: uuid(),
    task: 'Learn  Node',
    complete: false,
  },
  {
    id: uuid(),
    task: 'Learn Appolo Client',
    complete: false,
  },
];

const StateHooks = () => {
  /* const [todos, setTodos] = useState(initialTodos); */
  // Using Reducer hook in complex state objects
  // toggle todo item to complete
  // toggle todo item to incomplete
  // add todo item to the list of todo items
  const todoReducer = (state, action) => {
    switch (action.type) {
      case 'DO_TODO':
        return state.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, complete: true };
          } else {
            return todo;
          }
        });
      case 'UNDO_TODO':
        return state.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, complete: false };
          } else {
            return todo;
          }
        });
      case 'ADD_TODO':
        return state.concat({
          task: action.task,
          id: action.id,
          complete: false,
        });
      default:
        throw new Error();
    }
  };
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);
  const [task, setTask] = useState('');

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };
  const handleSubmit = (event) => {
    /* if (task) {
      setTodos(todos.concat({ id: uuid(), task, complete: false }));
    } */
    //using Reducer
    if (task) {
      dispatchTodos({
        type: 'ADD_TODO',
        task,
        id: uuid(),
      });
    }
    setTask('');
    event.preventDefault();
  };
  const handleCheckboxChange = (todo) => {
    /*  setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      })
    ); */
    // using Reducer
    dispatchTodos({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id,
    });
  };

  // Filtering Todos
  // Show All Todos
  // Show complete todps
  //show incomplete todos
  const handleShowAll = () => {
    dispatchFilter({ type: 'SHOW_ALL' });
  };
  const handleShowComplete = () => {
    dispatchFilter({ type: 'SHOW_COMPLETE' });
  };
  const handleShowIncomplete = () => {
    dispatchFilter({ type: 'SHOW_INCOMPLETE' });
  };

  // Using  Reducer function, takes state and action and modifies
  // state according to action
  const filterReducer = (state, action) => {
    switch (action.type) {
      case 'SHOW_ALL':
        return 'ALL';
      case 'SHOW_COMPLETE':
        return 'COMPLETE';
      case 'SHOW_INCOMPLETE':
        return 'INCOMPLETE';
      default:
        throw new Error();
    }
  };
  // Using Reducer function in a useReducer hook
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');

  // able to transition from state to state with reduce function
  // and the action with action type, todos can be filtered as
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'ALL') {
      return true;
    }
    if (filter === 'COMPLETE' && todo.complete) {
      return true;
    }
    if (filter === 'INCOMPLETE' && !todo.complete) {
      return true;
    }
    return false;
  });

  return (
    <div>
      <div>
        <button type='button' onClick={handleShowAll}>
          Show All
        </button>
        <button type='button' onClick={handleShowComplete}>
          Show Completed
        </button>
        <button type='button' onClick={handleShowIncomplete}>
          Show Incomplete
        </button>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type='checkbox'
                name=''
                id=''
                checked={todo.complete}
                onChange={() => handleCheckboxChange(todo)}
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
