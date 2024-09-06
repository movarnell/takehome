import React from 'react';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggle }) => {
  return (
    <li key={id} className="flex items-center justify-between p-2 my-2 text-2xl text-black bg-white rounded ">
              <div className="flex items-center">
      <input type="checkbox" checked={completed} onChange={() => onToggle(id)} />
      <span className="ms-4">{text}</span>
      </div>
    </li>
  );
};

export default TodoItem;