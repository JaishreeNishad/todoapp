import React, { useEffect, useState } from 'react'
import { getToDB} from "./PouchDB";

const TODOList = () => {
    const [inputlist, setInputlist] = useState("");
  //const [items, setItems] = useState([]);
  //console.log(items,"abcd")

  useEffect(()=>{
    getToDofun()
  }, [inputlist])
  
  async function getToDofun(){
     const data = await getToDB();
     console.log("I ma data ", data);
     setInputlist(data?.rows);
  }


  // const listofItems = async (e) => {
  //   console.log(e);
  //   e.preventDefault();
  //   const newTodo = {
  //     task: inputlist,
  //     isDone: false,
  //   };
  //   let responseID = await insertToDB(newTodo);
  //   newTodo.id = responseID?.id;
  //   setItems((previousData) => {
  //     return [...previousData, newTodo];
  //   });
  //   setInputlist("");
  // };

  // const completeTodo = (i) => {
  //   console.log(i,"ankit")
  //   const newTodos = [...items];
  //   newTodos[i].isDone = true;
  //   setItems(newTodos);
  // };

  // const removeTodo = (ref) => {
  //   console.log("ref === !==", ref, "intemvalue.id");
  //   const newTodo = items.filter((item) => item.id !== ref);
  //   setItems(newTodo);
  //   removeToDB(ref);
  // };
  return (
    <div><ol className="ml-5">
    {inputlist.map((itemval,i) => {
      
      return (
        <div key={i} className="mt-3">
          <li
            style={{
              color: itemval.isDone === true ? "green" : "red",
            
            }}
          >
            {itemval.task}
          </li>
          <div className=" space-x-5 space-y-2">
            {/* <button
              className=" border bg-slate-300 py-1 px-2 hover:bg-green-200"
              onClick={() => completeTodo(i)}
            >
              completeTodo
            </button> */}
            {/* <button
              className=" border bg-slate-300 py-1 px-2 hover:bg-red-500"
              onClick={() => removeTodo(itemval.id)}
            >
              delele
            </button> */}
          </div>
        </div>
      );
    })}
  </ol></div>
  )
}

export default TODOList