import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { FiCheck, FiTrash2, FiEdit2, FiX } from 'react-icons/fi';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim() !== todo.text) {
      onEdit(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
      className="bg-dark-700 rounded-xl p-4 mb-3 border border-dark-600 shadow-dark-md"
    >
      <div className="flex items-start">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-md border flex items-center justify-center mr-3 mt-1 ${
            todo.completed
              ? 'bg-primary-600 border-primary-700 text-white'
              : 'border-dark-500 text-transparent hover:border-primary-500'
          }`}
        >
          {todo.completed && <SafeIcon icon={FiCheck} className="text-sm" />}
        </motion.button>

        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-dark-800 border border-dark-600 rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setIsEditing(false);
                    setEditText(todo.text);
                  }}
                  className="ml-2 p-1.5 text-dark-400 hover:text-dark-300 rounded-md"
                >
                  <SafeIcon icon={FiX} className="text-sm" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p
                  className={`text-md break-words ${
                    todo.completed ? 'text-dark-400 line-through' : 'text-white'
                  }`}
                >
                  {todo.text}
                </p>
                <p className="text-xs text-dark-400 mt-1">{formatDate(todo.createdAt)}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex space-x-1 ml-2">
          {!isEditing && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleEdit}
              className="p-1.5 text-dark-400 hover:text-primary-400 rounded-md"
            >
              <SafeIcon icon={FiEdit2} className="text-sm" />
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(todo.id)}
            className="p-1.5 text-dark-400 hover:text-red-500 rounded-md"
          >
            <SafeIcon icon={FiTrash2} className="text-sm" />
          </motion.button>
        </div>
      </div>
    </motion.li>
  );
};

export default TodoItem;