import React, { useState } from 'react'
import {useTodo} from '../contexts/TodoContext';

function TodoForm() {

  const [todo, setTodo] = useState("")
  const {addTodo} =  useTodo()
    
  const add = (e) => {
    e.preventDefault()

    if (!todo) return
    
    addTodo({ todo, completed: false})
    setTodo("")
  }

  const newTask = <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 448 512"><path fill="#000000" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>

  return (
      <form onSubmit={add}  className="flex gap-1">
          <input
              type="text"
              placeholder="Add a new task"
              className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" className=" bg-[#F0F0F0] rounded-r-lg border border-black/10 hover:opacity-70 px-3 py-1 shrink-0">
              {newTask}
          </button>
      </form>
  );
}

export default TodoForm;

