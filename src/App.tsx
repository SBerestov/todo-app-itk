import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./styles/main.scss";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
  setTodos(
    todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    )
  );
};


  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />

      <div className="filters">
        <button onClick={() => setFilter("all")}>Все</button>
        <button onClick={() => setFilter("active")}>Активные</button>
        <button onClick={() => setFilter("completed")}>Выполненные</button>
      </div>

      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />

      <p className="task-count">Осталось {activeCount} задач</p>
    </div>
  );
};

export default App;
