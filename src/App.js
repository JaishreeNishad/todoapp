import React, { useState } from "react";
import { insertToDB, removeToDB } from "./PouchDB";

const App = () => {
  const [inputlist, setInputlist] = useState("");
  const [items, setItems] = useState([]);

  const itemEvent = (e) => {
    setInputlist(e.target.value);
  };

  const listofItems = async (e) => {
    console.log(e);
    e.preventDefault();
    const newTodo = {
      task: inputlist,
      isDone: false,
    };
    let responseID = await insertToDB(newTodo);
    newTodo.id = responseID?.id;
    setItems((previousData) => {
      return [...previousData, newTodo];
    });
    setInputlist("");
  };

  const completeTodo = (i) => {
    console.log(i)
    const newTodos = [...items];
    newTodos[i].isDone = true;
    setItems(newTodos);
  };

  const removeTodo = (ref) => {
    console.log("ref === !==", ref, "intemvalue.id");
    const newTodo = items.filter((item) => item.id !== ref);
    setItems(newTodo);
    removeToDB(ref);
  };


  console.log(items);
  return (
    <div className="flex justify-center items-center h-auto w-auto  mt-20">
      <div>
        <h1 className=" text-center text-3xl font-bold py-4 mr-10  ">ToDo List</h1>
        <form onSubmit={listofItems} name="myForm" >
          <input
            name="myTodo"
            type="text"
            required
            placeholder="Add a Items"
            value={inputlist}
            onChange={itemEvent}
            className="border border-black py-1 px-2 rounded-md"
          />
          <button
            type="submit"
            name="myForm"
            className="ml-5 border-black bg-slate-700 px-3 py-1 hover:border text-white hover:bg-gray-500"
          >
            Add
          </button>
        </form>
        <ol className="ml-5">
          {items.map((itemval, i) => {
            
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
                  <button
                    className=" border bg-slate-300 py-1 px-2 hover:bg-green-200"
                    onClick={() => completeTodo(i)}
                  >
                    completeTodo
                  </button>
                  <button
                    className=" border bg-slate-300 py-1 px-2 hover:bg-red-500"
                    onClick={() => removeTodo(itemval.id)}
                  >
                    delele
                  </button>
                </div>
              </div>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default App;
