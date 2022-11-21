import React from "react";
import CreateTodo from "../../components/Todos/CreateTodo";
import getTodos from "../../utils/todos/getTodos";
import deleteTodo from "../../utils/todos/deleteTodo";
import completeTodo from "../../utils/todos/completeTodo";

export default function Todos() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    getTodos().then((todos) => setTodos(todos));
  }, []);

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const response = await completeTodo(id, todo.completed);
    const updatedTodo = await response.json();
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  return (
    <div>
      <h1>Todos</h1>

      {/* Search bar */}
      <div>
        <input type="text" placeholder="Search" />
      </div>

      {/* Sorting dropdown */}
      <div>
        <select>
          <option value="title">Title</option>
          <option value="createdAt">Created At (Asc)</option>
          <option value="-createdAt">Created At (Desc)</option>
        </select>
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.title}
            <button onClick={() => handleComplete(todo.id)}>Complete</button>
            <button>Favorite</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <CreateTodo />
    </div>
  );
}
