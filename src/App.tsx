import { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import './App.css';
import Header from './components/Header';
import AddInput from './components/AddInput';
import TodoList from './components/TodoList';

// Define the structure of a Todo item
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const API_URL = 'https://66db3bfbf47a05d55be77645.mockapi.io/todo';

function App() {
  //This uses the useQuery hook to fetch the list of todos from the API
  const queryClient = useQueryClient();

  const { data: todos = [] } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: () => axios.get(API_URL).then(res => res.data),
  });
// Here we define a mutation to add a new todo item
  const addTodoMutation = useMutation({
    mutationFn: (text: string) => axios.post(API_URL, { text, completed: false }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });
  // This function adds a new todo item
  const toggleTodoMutation = useMutation({
    mutationFn: (todo: Todo) => axios.put(`${API_URL}/${todo.id}`, {
      ...todo,
      completed: !todo.completed
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const addTodo = (text: string) => {
    addTodoMutation.mutate(text);
  };
// This function toggles the completed status of a todo item
  const toggleTodo = (id: string) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (todoToUpdate) {
      toggleTodoMutation.mutate(todoToUpdate);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-950">
      <div className="p-6 text-white rounded-lg w-96">
        {/* Render the header component */}
        <Header />
        {/* Render the input component for adding new todos */}
        <AddInput onAdd={addTodo} />
        {/* Render the list of todos */}
        <TodoList todos={todos} onToggle={toggleTodo} />
      </div>
    </div>
  );
}

export default App;