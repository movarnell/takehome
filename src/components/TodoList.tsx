import React from 'react';
import TodoItem from './TodoItem';

// Define the structure of a Todo item
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Define the props for the TodoList component
interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
}

// TodoList component to render a list of Todo items
const TodoList: React.FC<TodoListProps> = ({ todos, onToggle }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
};

export default TodoList;