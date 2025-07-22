import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrash2 } = FiIcons;

const TodoStats = ({ todos, filter, onFilterChange, onClearCompleted }) => {
  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  const filters = [
    { key: 'all', label: 'All', count: todos.length },
    { key: 'active', label: 'Active', count: activeCount },
    { key: 'completed', label: 'Completed', count: completedCount },
  ];

  return (
    <motion.div 
      className="flex items-center justify-between py-4 border-t border-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex space-x-1">
        {filters.map((filterOption) => (
          <motion.button
            key={filterOption.key}
            onClick={() => onFilterChange(filterOption.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === filterOption.key
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filterOption.label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              filter === filterOption.key
                ? 'bg-white bg-opacity-20 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}>
              {filterOption.count}
            </span>
          </motion.button>
        ))}
      </div>

      {completedCount > 0 && (
        <motion.button
          onClick={onClearCompleted}
          className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SafeIcon icon={FiTrash2} className="text-sm" />
          <span className="text-sm font-medium">Clear Completed</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default TodoStats;