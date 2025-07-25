import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiLogOut, FiChevronDown, FiSettings, FiCalendar } = FiIcons;

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 bg-dark-700 rounded-xl px-4 py-2 shadow-dark-lg border border-dark-600 hover:border-dark-500 transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-white">{user.name}</p>
          <p className="text-xs text-dark-400">{user.email}</p>
        </div>
        
        <motion.div
          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <SafeIcon icon={FiChevronDown} className="text-dark-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isDropdownOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10"
              onClick={() => setIsDropdownOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-64 bg-dark-800 rounded-xl shadow-dark-xl border border-dark-700 py-2 z-20"
            >
              {/* User Info */}
              <div className="px-4 py-3 border-b border-dark-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-sm text-dark-400">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-2 text-xs text-dark-500">
                  <SafeIcon icon={FiCalendar} />
                  <span>Joined {formatJoinDate(user.createdAt)}</span>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <motion.button
                  className="w-full flex items-center space-x-3 px-4 py-2 text-left text-dark-300 hover:bg-dark-700 transition-colors duration-200"
                  whileHover={{ backgroundColor: 'rgba(55, 65, 81, 1)' }}
                >
                  <SafeIcon icon={FiUser} className="text-dark-400" />
                  <span>Profile Settings</span>
                </motion.button>
                
                <motion.button
                  className="w-full flex items-center space-x-3 px-4 py-2 text-left text-dark-300 hover:bg-dark-700 transition-colors duration-200"
                  whileHover={{ backgroundColor: 'rgba(55, 65, 81, 1)' }}
                >
                  <SafeIcon icon={FiSettings} className="text-dark-400" />
                  <span>Preferences</span>
                </motion.button>
              </div>

              {/* Logout */}
              <div className="border-t border-dark-700 py-2">
                <motion.button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-left text-red-400 hover:bg-dark-700 transition-colors duration-200"
                  whileHover={{ backgroundColor: 'rgba(55, 65, 81, 1)' }}
                >
                  <SafeIcon icon={FiLogOut} className="text-red-500" />
                  <span>Sign Out</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;