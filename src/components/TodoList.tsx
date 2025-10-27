import type { Todo } from "../App";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
}

const TodoList = ({ todos, toggleTodo, deleteTodo, editTodo }: TodoListProps) => {
  if (todos.length === 0) return <p>Нет задач</p>;

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
