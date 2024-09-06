import React, { useState } from 'react';

// Define the props for the AddInput component
interface AddInputProps {
  onAdd: (text: string) => void;
}

// AddInput component to handle adding new todo items
const AddInput: React.FC<AddInputProps> = ({ onAdd }) => {
  const [inputText, setInputText] = useState('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onAdd(inputText.trim());
      setInputText('');
    }
  };

  return (
    <form className='w-full' onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full text-sm p-2 rounded-md bg-white text-black"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Add a new todo item here"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(e);
          }
        }}
      />
    </form>
  );
};

export default AddInput;