import { useState } from "react";

interface TodoFormProps {
  addTodo: (text: string) => void;
}

const TodoForm = ({ addTodo }: TodoFormProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Введите задачу..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default TodoForm;
