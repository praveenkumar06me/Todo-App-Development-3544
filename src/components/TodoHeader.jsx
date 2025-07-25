import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { FiCheckCircle, FiClock, FiTarget } from 'react-icons/fi';

const TodoHeader = ({ todos, user }) => {
  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <h1 className="text-3xl font-bold text-red-500 mb-2">Welcome to Todo App</h1>
      <p className="text-dark-300 mb-6">
        {user ? `Hello, ${user.email}! ` : ''}Stay organized and productive with your personal task manager.
      </p>
      
      <div className="flex justify-center space-x-8 mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 bg-dark-700 px-4 py-2 rounded-lg border border-dark-600"
        >
          <SafeIcon icon={FiTarget} className="text-primary-400" />
          <span className="text-dark-300">Total: {todos.length}</span>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 bg-dark-700 px-4 py-2 rounded-lg border border-dark-600"
        >
          <SafeIcon icon={FiCheckCircle} className="text-green-400" />
          <span className="text-dark-300">Done: {completedCount}</span>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 bg-dark-700 px-4 py-2 rounded-lg border border-dark-600"
        >
          <SafeIcon icon={FiClock} className="text-yellow-400" />
          <span className="text-dark-300">Pending: {pendingCount}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TodoHeader;