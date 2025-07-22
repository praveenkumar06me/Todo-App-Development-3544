import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheckSquare } = FiIcons;

const TodoHeader = () => {
  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl mb-4 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <SafeIcon icon={FiCheckSquare} className="text-2xl text-white" />
      </motion.div>
      
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Todo App
      </h1>
      
      <p className="text-gray-600 text-lg">
        Stay organized and get things done
      </p>
    </motion.div>
  );
};

export default TodoHeader;