import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus } = FiIcons;

const TodoInput = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="w-full bg-dark-700 text-white border border-dark-600 rounded-xl px-5 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
      />
      <motion.button
        type="submit"
        disabled={!text.trim()}
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center ${
          text.trim() ? 'bg-primary-600 text-white' : 'bg-dark-600 text-dark-400'
        } transition-all duration-200`}
        whileHover={text.trim() ? { scale: 1.05, backgroundColor: '#7c3aed' } : {}}
        whileTap={text.trim() ? { scale: 0.95 } : {}}
      >
        <SafeIcon icon={FiPlus} className="text-lg" />
      </motion.button>
    </form>
  );
};

export default TodoInput;