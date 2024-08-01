import { useState, useEffect } from 'react'
import { TodoProvider } from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}/${month}/${year}`;
}

function App() {

  const [currentDate, setCurrentDate] = useState(getDate());

  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))

  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? {
          ...prevTodo,
          completed: !prevTodo.completed
        } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#F6F8FA] min-h-screen py-8">
        <div className=" bg-white w-full max-w-2xl mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl px-4 py-3 text-black font-PrimaryBold">
          <div className='flex justify-between mx-2 mt-2 mb-8'>
            <h1 className="text-2xl mt-2 font-bold text-left ">To-do List</h1>
            <div>
              <h1 className='text-right'>Today's Date</h1>
              <p className='text-right'>{currentDate}</p>
            </div>
          </div>

          <div className="mb-4 font-PrimaryRegular">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3 font-PrimaryRegular">
            {todos.map((todo) => (
              <div key={todo.id}
                className='w-full'
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App