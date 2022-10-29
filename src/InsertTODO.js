import React, { useState } from 'react'
import TODOList from './TODOList'
import { insertToDB } from "./PouchDB";


const InsertTODO = () => {
    const [inputlist, setInputlist] = useState("");
    const [items, setItems] = useState([]);
    console.log(items,"12345")
    
       
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
  
  return (
    <div>
        <div><h1 className=" text-center text-3xl font-bold py-4 mr-10  ">ToDo List</h1>
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
        
        </div>
        
        <TODOList/>
    </div>
  )
}


export default InsertTODO;