import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import Items from "./Items";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("Todo") ? JSON.parse(localStorage.getItem("Todo")) : []
  );
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodo) => {
      return prevTodo.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prevTodo) =>
      prevTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("Todo", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="Todo Icon" />
        <h1 className="text-3xl font-semibold">To Do List</h1>
      </div>
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add Task"
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-stone-900 w-32 h-14 text-white font-medium cursor-pointer"
        >
          ADD
        </button>
      </div>
      <div className="">
        {todoList.map((item, index) => {
          return (
            <Items
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
