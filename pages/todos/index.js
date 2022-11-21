import React,{useState} from "react";
import Link from 'next/link'
// import "./index.css";

import CreateTodo from "../../components/Todos/CreateTodo";
import getTodos from "../../utils/todos/getTodos";
import deleteTodo from "../../utils/todos/deleteTodo";
import completeTodo from "../../utils/todos/completeTodo";

import Image from 'next/image'
import searchicon from "../../data/search.svg"
import copy from "../../data/copy.svg"
import copyhover from "../../data/copyhover.svg"
import favourite from "../../data/favourite.svg"
import favouritehover from "../../data/favouritehover.svg"
import deleteico from "../../data/delete.svg"
import deleteicohover from "../../data/deletehover.svg"
import todoDefault from "../../data/todoDefault.svg"
import logo from "../../data/logo.svg"
import right from "../../data/right.svg"


export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [hover, setHover] = useState(-1);
  const [hoverCopy, setHoverCopy] = useState(-1);
  const [hoverStar, setHoverStar] = useState(-1);
  const [hoverDelete, setHoverDelete] = useState(-1);

  const [title, setTitle] = useState("");

  const [editTitle, setEditTitle] = useState(-1);

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
    border: hover===id? "1px solid #E0E0E0" : "1px solid white",
    borderRadious: "100px",
  })

  console.log(todos)

  return (
    <div style={HomeStyle}>
      <h1><Image src={logo} alt="logoImg" style={{marginRight:"1rem"}} />Todo List</h1>

      {/* Search bar */}
      <div style={searchDiv}>

        <div style={{radius:"100px", flex:"1", display:"flex",alignItems: "center", border:"1px solid #E0E0E0", borderRadius:"100px", padding:"4px 15px", }}>
          <Image src={searchicon} alt="searchIco" />
          <input type="text" placeholder="Search by title" style={{radius:"100px",border:"none",outline:"none", width:"100%"}} />
        </div>

        {/* Sorting dropdown */}
        <div style={{marginLeft:"1rem",}}>
          <select id={`todo-sort-dropdown`} style={{outline:"none", border:"none", appearance:"none"}}>
            <option style={{backgroundColor:"#646268", color:"white"}} value="title">Sort by</option>
            <option id="todo-sort-dropdown__title-ascending" style={{backgroundColor:"#646268", color:"white"}} value="title">Title (^)</option>
            <option id="todo-sort-dropdown__title-descending" style={{backgroundColor:"#646268", color:"white"}} value="title">Title (v)</option>
            <option id="todo-sort-dropdown__due-date-ascending" style={{backgroundColor:"#646268", color:"white"}} value="createdAt">Due date (^)</option>
            <option id="todo-sort-dropdown__due-date-descending" style={{backgroundColor:"#646268", color:"white"}} value="-createdAt">Due date (v)</option>
            <option id="todo-sort-dropdown__created-date-descending" style={{backgroundColor:"#646268", color:"white"}} value="-createdAt">Create Date (v)</option>
          </select>
        </div>

        {/* Activity Log */}
        <Link href="/" style={{textColor:"blue"}}>Activity Log</Link>

      </div>

      <div>
        {todos.map((todo) => (<div onMouseEnter={()=>{showHoverHandler(todo.id)}} onMouseLeave={hideHoverHandler} style={taskStyle(todo.id)}>
          
          <Image src={todoDefault} style={{marginRight:"1rem"}} />
          <div
            key={todo.id}
            id={`todo-${todo.id}`}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              display:"flex",
              justifyContent : 'space-between',
              flex:"1",
              alignItems:"center",
            }}
          >
            <div>
              {editTitle===todo.id? <div> 
                    <form>
                      <input id={`todo-edit-title-text-field__${todo.id}`} onChange={(e)=>setEditTitle(e.target.value)} value={editTitle}/>
                      <button type="submit" onClick={()=>{todo.title=editTitle}}><Image  src={right} /></button>
                    </form>  
                  </div> : 
                <div onClick={()=>{setEditTitle(todo.id)}}>
                  {todo.title}
                </div>}
            </div>
            <div style={{display:"flex", alignItems:"center"}}>

              <button 
                style={threeButtons(todo.id)}
                id={`todo-duplicate-button__${todo.id}`} 
                onMouseEnter={()=>{setHoverCopy(todo.id)}} 
                onMouseLeave={()=>{setHoverCopy(-1)}} 
                onClick={() => handleComplete(todo.id)}
              >
                {hoverCopy===-1? <Image src={copy} /> : <Image src={copyhover} />}
              </button>

              <button 
                style={threeButtons(todo.id)}
                onMouseEnter={()=>{setHoverStar(todo.id)}} 
                onMouseLeave={()=>{setHoverStar(-1)}} 
                id={`todo-star-button__${todo.id}`}
              >
                {hoverStar===-1? <Image src={favourite} /> : <Image src={favouritehover} />}
              </button>

              <button 
                style={threeButtons(todo.id)} 
                onClick={() => handleDelete(todo.id)}
                onMouseEnter={()=>{setHoverDelete(todo.id)}} 
                onMouseLeave={()=>{setHoverDelete(-1)}}                
              >
                {hoverDelete===-1? <Image src={deleteico} /> : <Image src={deleteicohover} />}
              </button>

            </div>
          </div>
          </div>
        ))}
      </div>
      <CreateTodo />
    </div>
  );
}
