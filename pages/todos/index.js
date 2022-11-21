import React,{useState} from "react";
import Link from 'next/link'
// import "./index.css";

import CreateTodo from "../../components/Todos/CreateTodo";
import getTodos from "../../utils/todos/getTodos";
import deleteTodo from "../../utils/todos/deleteTodo";
import completeTodo from "../../utils/todos/completeTodo";

import Image from 'next/image'
import searchicon from "../../data/search.svg"
import complete from "../../data/complete.svg"
import favourite from "../../data/favourite.svg"
import deleteico from "../../data/delete.svg"
import todoDefault from "../../data/todoDefault.svg"

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [hover, setHover] = useState(-1);

  const showHoverHandler = (i) => {
    setHover(i);
  }

  const hideHoverHandler = () => {
    setHover(-1);
  }

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

  const HomeStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent : 'space-between',
    alignItems: "left",
    padding:"50px 100px",
    gap: "10px",
    width:"full",
    fontFamily: 'Roboto',
    fontStyle: "normal",

  }

  const searchDiv={
    display: "flex",
    alignItems: "center",
  }

  const threeButtons =(id)=> ({
    display: hover===id? "block" : "none",
    background:"white",
    border:"none",
  })

  const taskStyle = (id)=>({
    display:"flex",
    alignItems:"center", 
    marginTop:"1rem", 
    marginBottom:"1rem", 
    height:"2rem",
    paddingLeft:"4px",
    boxShadow: hover===id? "1px 3px 1px #E0E0E0" : "none",
    border: hover===id? "1px solid #E0E0E0" : "none",
    borderRadious: "50px",
  })

  return (
    <div style={HomeStyle}>
      <h1>Todo List</h1>

      {/* Search bar */}
      <div style={searchDiv}>

        <div style={{radius:"100px", width:"100%", display:"flex",alignItems: "center", border:"1px solid #E0E0E0", borderRadius:"100px", padding:"4px 15px", }}>
          <Image src={searchicon} alt="searchIco" />
          <input type="text" placeholder="Search by title" style={{radius:"100px",border:"none",outline:"none", width:"100%"}} />
        </div>

        {/* Sorting dropdown */}
        <div style={{marginLeft:"1rem"}}>
          <select style={{outline:"none", border:"none", appearance:"none"}}>
            <option value="title">Sort by</option>
            <option value="createdAt">Created At (Asc)</option>
            <option value="-createdAt">Created At (Desc)</option>
          </select>
        </div>

        {/* Activity Log */}
        <Link href="/" style={{textColor:"blue"}}>Activity_Log</Link>

      </div>

      <div>
        {todos.map((todo) => (<div onMouseEnter={()=>{showHoverHandler(todo.id)}} onMouseLeave={hideHoverHandler} style={taskStyle(todo.id)}>
          
          <Image src={todoDefault} style={{marginRight:"1rem"}} />
          <div
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              display:"flex",
              justifyContent : 'space-between',
              flex:"1",
              alignItems:"center",
            }}
          >
            {todo.title}
            <div style={{display:"flex", alignItems:"center"}}>
              <button style={threeButtons(todo.id)} onClick={() => handleComplete(todo.id)}><Image src={complete} /></button>
              <button style={threeButtons(todo.id)}><Image src={favourite} /></button>
              <button style={threeButtons(todo.id)} onClick={() => handleDelete(todo.id)}><Image src={deleteico} /></button>
            </div>
          </div>
          </div>
        ))}
      </div>
      <CreateTodo />
    </div>
  );
}
