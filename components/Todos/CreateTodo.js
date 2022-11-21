import React,{useState} from "react";
import addicon from "../../data/add.svg"

import Image from "next/image";

import enterdodo from "../../data/entertodo.svg"
import right from "../../data/right.svg"
import wrong from "../../data/wrong.svg"

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [createItem, setCreateItem] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateItem(false);
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });
    const todo = await response.json();
    setTitle("");
  };

  return (
    <div>
      {!createItem ? <div onClick={()=>{setCreateItem(true)}} style={{display:"flex", alignItems:"center", color:"#3D82EB", marginLeft:"0.3rem"}}><Image src={addicon} alt="addIco" style={{marginRight:"1rem"}} />
          Create New Item
        </div> : 

      <form onSubmit={handleSubmit} style={{border:"1px solid #E0E0E0", padding:"5px"}}>
        <Image src={enterdodo} />
        <input
          type="text"
          value={title}
          placeholder="Enter todo title"
          style={{border:"none", outline:"none", }}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div style={{display:"flex", alignItems:"center", justifyContent : 'space-between',}}>
          <p>Date selector </p>
          <div>
            <button style={{ background:"white", border:"none"}} onClick={()=>{setCreateItem(false)}} ><Image src={wrong} /></button>
            <button style={{background:"white", border:"none"}} type="submit"><Image src={right} /></button>
          </div>
        </div>
      </form>}
    </div>
  );
};

export default CreateTodo;