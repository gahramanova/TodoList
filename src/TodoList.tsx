import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo: Todo = {
        id: todos.length + 1,
        text: inputText,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const handleToggleCompletion = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: number) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <>
      <div className='d-flex align-items-center justify-content-center flex-column'>
        <h1 className='mt-4'>Todo List</h1>
        <div className='col-6'>
          <div className='d-flex align-items-center justify-content-center flex-column'>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Enter a todo..." value={inputText} onChange={handleInputChange} />
              <button className='btn btn-dark' onClick={handleAddTodo}>Add Todo</button>
            </div>

            <ul className='list-group' style={{width: "100%"}}>
              {todos.map(todo => (
                <li key={todo.id} className='list-group-item d-flex justify-content-between align-items-center'>
                  <div>
                    <input
                      className='mx-2'
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleCompletion(todo.id)}
                    />
                    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                      {todo.text}
                    </span>
                  </div>
                  <button className='btn btn-danger' onClick={() => handleDeleteTodo(todo.id)}><MdDelete /></button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
