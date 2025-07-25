import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleTodo, onDeleteTodo, onEditTodo }) => {
  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-8 text-center"
      >
        <p className="text-dark-400">No tasks to display.</p>
        <p className="text-dark-500 text-sm mt-2">Add a new task to get started!</p>
      </motion.div>
    );
  }

  return (
    <ul>
      <AnimatePresence>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
            onEdit={onEditTodo}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default TodoList;