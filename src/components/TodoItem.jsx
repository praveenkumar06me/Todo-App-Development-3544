import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiEdit2, FiTrash2, FiSave, FiX } = FiIcons;

const TodoItem = ({ todo, index, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(editText);
    }
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -300, scale: 0.95 }}
      transition={{ 
        duration: 0.3,
        delay: index * 0.05,
        layout: { duration: 0.2 }
      }}
      className={`group flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all duration-200 ${
        todo.completed ? 'opacity-75' : ''
      }`}
    >
      <motion.button
        onClick={onToggle}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          todo.completed
            ? 'bg-primary-500 border-primary-500 text-white'
            : 'border-gray-300 hover:border-primary-500'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {todo.completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <SafeIcon icon={FiCheck} className="text-xs" />
          </motion.div>
        )}
      </motion.button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleEdit}
            className="w-full px-2 py-1 text-gray-900 bg-white border border-primary-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />
        ) : (
          <span
            className={`block text-gray-900 transition-all duration-200 ${
              todo.completed 
                ? 'line-through text-gray-500' 
                : ''
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isEditing ? (
          <>
            <motion.button
              onClick={handleEdit}
              className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SafeIcon icon={FiSave} className="text-sm" />
            </motion.button>
            <motion.button
              onClick={handleCancel}
              className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SafeIcon icon={FiX} className="text-sm" />
            </motion.button>
          </>
        ) : (
          <>
            <motion.button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SafeIcon icon={FiEdit2} className="text-sm" />
            </motion.button>
            <motion.button
              onClick={onDelete}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SafeIcon icon={FiTrash2} className="text-sm" />
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default TodoItem;