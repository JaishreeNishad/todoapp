import React, { useEffect, useState } from "react";
import { getToDB, removeToDB } from "./PouchDB";

const TODOList = () => {
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    getToDBFun();
    // console.log("This is inside useEffect");
  }, [itemsList]);

  async function getToDBFun() {
    const data = await getToDB();
    setItemsList(data?.rows);
    // console.log("getToDBFun");
    // console.log("itemsList mai hain ", data.rows, "========== yee");
    // return itemsList;
  }

  const removeTodo = (id) => {
    console.log("ref === !==", id, "intemvalue.id");
    const newTodo = itemsList.filter((item) => item.id !== id);
    setItemsList(newTodo);
    removeToDB(id);
  };

  // console.log(itemsList, "iio");

  return (
    <div>
      <ul className="ml-5">
        {itemsList?.map((itemvalue) => {
          // console.log(itemvalue, "lll");
          return (
            <div className="space-y-5 flex space-x-5 items-center">
              <div className="items-center">
                <li className="mt-3">{itemvalue.doc.task}</li>
              </div>
              <div className=" space-x-5 space-y-2"></div>
              <button
                className=" border bg-slate-300 py-1 px-2 hover:bg-red-500"
                onClick={() => removeTodo(itemvalue.id)}
              >
                delele
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default TODOList;
