

import React, { useState } from "react";
import { insertToDB } from "./PouchDB";
import TODOList from "./TODOList";

const InsertToDo = () => {
  const [inputlist, setInputlist] = useState(""); //inputList has user input
  const [setItems] = useState([]);

  const itemEvent = (e) => {
    setInputlist(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    const newTodo = {
      // id: responseID.id,
      task: inputlist,
      isDone: false,
    };
    let responseID = await insertToDB(newTodo);
    newTodo.id = responseID?.id;
    setItems((previousData) => {
      //console.log("itemsList have ", itemsList, " =====itemsList");
      return [...previousData, newTodo]; // return [{fisrt data}] -->[{fistdata},{secon data}]
    });
    setInputlist("");
  };

  return (
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
      <TODOList/>
    </div>
  );
};

export default InsertToDo;
