import React, { useState } from "react";
import { insertToDB, removeToDB } from "./PouchDB";

const Tdapp = () => {
  const [inputlist, setInputlist] = useState("");
  const [items, setItems] = useState([]);

  const itemEvent = (e) => {
    setInputlist(e.target.value);
  };

  const handleSubmit = async (e) => {
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
        <h1 className=" text-center text-3xl font-bold py-4 mr-5">ToDo List</h1>
        <form onSubmit={handleSubmit} name="myForm">
          <input
            name="myTodo"
            type="text"
            required={React}
            placeholder="Add Tasks"
            value={inputlist}
            onChange={itemEvent}
            className="border border-black py-1 px-2"
          />
          <button
            type="submit"
            name="myForm"
            className="ml-5 border-black bg-slate-700 px-3 py-1 text-white"
          >
            Add
          </button>
        </form>

        <ul className="ml-5">
          {items.map((itemvalue) => {
            return (
              <div className="space-y-5 flex space-x-5 items-center">
                <div className="items-center">
                  <li className="mt-3">{itemvalue.task}</li>
                </div>
                <div className=" space-x-5 space-y-2">
                  <div>
                    <button
                      className=" border bg-slate-300 py-1 px-2 ml-5"
                      onClick={() => removeTodo(itemvalue.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Tdapp;
