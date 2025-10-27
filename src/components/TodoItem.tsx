import { useState } from 'react';
import type { Todo } from "../App";
import CheckIcon from '../assets/check.png';
import EditIcon from '../assets/edit-text.png';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
}

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && newText.trim()) {
      editTodo(todo.id, newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />

        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            autoFocus
          />
        ) : (
          <span>{todo.text}</span>
        )}
      </label>

      <div className="actions">
        <button onClick={handleEdit}>
          <img src={isEditing ? CheckIcon : EditIcon} height={18} />
        </button>
        <button onClick={() => deleteTodo(todo.id)}>x</button>
      </div>
    </li>
  );
};

export default TodoItem;
