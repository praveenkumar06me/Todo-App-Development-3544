import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiTarget, FiClock, FiCheck } = FiIcons;

const TodoStats = ({ todos, filter, onFilterChange, onClearCompleted }) => {
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filterButtons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <motion.div 
          className="bg-dark-700 rounded-xl p-3 border border-dark-600"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-900/30 flex items-center justify-center mr-2">
              <SafeIcon icon={FiTarget} className="text-blue-400" />
            </div>
            <span className="text-dark-300 text-sm">Total</span>
          </div>
          <p className="text-white text-xl font-semibold">{totalTasks}</p>
        </motion.div>
        
        <motion.div 
          className="bg-dark-700 rounded-xl p-3 border border-dark-600"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-900/30 flex items-center justify-center mr-2">
              <SafeIcon icon={FiClock} className="text-amber-400" />
            </div>
            <span className="text-dark-300 text-sm">Active</span>
          </div>
          <p className="text-white text-xl font-semibold">{activeTasks}</p>
        </motion.div>
        
        <motion.div 
          className="bg-dark-700 rounded-xl p-3 border border-dark-600"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-900/30 flex items-center justify-center mr-2">
              <SafeIcon icon={FiCheck} className="text-green-400" />
            </div>
            <span className="text-dark-300 text-sm">Done</span>
          </div>
          <p className="text-white text-xl font-semibold">{completedTasks}</p>
        </motion.div>
        
        <motion.div 
          className="bg-dark-700 rounded-xl p-3 border border-dark-600"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary-900/30 flex items-center justify-center mr-2">
              <SafeIcon icon={FiTrendingUp} className="text-primary-400" />
            </div>
            <span className="text-dark-300 text-sm">Completion</span>
          </div>
          <p className="text-white text-xl font-semibold">{completionRate}%</p>
        </motion.div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex bg-dark-700 rounded-lg p-1">
          {filterButtons.map(({ name, label }) => (
            <motion.button
              key={name}
              onClick={() => onFilterChange(name)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                filter === name
                  ? 'bg-dark-600 text-primary-400 shadow-dark-sm'
                  : 'text-dark-400 hover:text-dark-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
            </motion.button>
          ))}
        </div>
        
        <motion.button
          onClick={onClearCompleted}
          disabled={completedTasks === 0}
          className={`text-sm px-3 py-1.5 rounded-lg border ${
            completedTasks > 0
              ? 'border-dark-500 text-dark-300 hover:border-red-500 hover:text-red-400'
              : 'border-dark-600 text-dark-500 cursor-not-allowed'
          }`}
          whileHover={completedTasks > 0 ? { scale: 1.05 } : {}}
          whileTap={completedTasks > 0 ? { scale: 0.95 } : {}}
        >
          Clear completed
        </motion.button>
      </div>
    </div>
  );
};

export default TodoStats;