import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';
import AuthForm from './components/auth/AuthForm';
import TodoHeader from './components/TodoHeader';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  const { user, loading } = useAuth();
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load user-specific todos from localStorage
  useEffect(() => {
    if (user) {
      const userTodosKey = `todos_${user.id}`;
      const savedTodos = localStorage.getItem(userTodosKey);
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      } else {
        setTodos([]);
      }
    }
  }, [user]);

  // Save user-specific todos to localStorage
  useEffect(() => {
    if (user && todos.length >= 0) {
      const userTodosKey = `todos_${user.id}`;
      localStorage.setItem(userTodosKey, JSON.stringify(todos));
    }
  }, [todos, user]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      userId: user.id,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark-300">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <TodoHeader />
            <UserProfile />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-dark-800 rounded-2xl shadow-dark-lg border border-dark-700 overflow-hidden"
          >
            <div className="p-6 space-y-6">
              <TodoInput onAddTodo={addTodo} />
              
              <TodoStats
                todos={todos}
                filter={filter}
                onFilterChange={setFilter}
                onClearCompleted={clearCompleted}
              />
              
              <TodoList
                todos={filteredTodos}
                onToggleTodo={toggleTodo}
                onDeleteTodo={deleteTodo}
                onEditTodo={editTodo}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;