import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { History, Trash2, Clock, ChevronDown, Search, X } from 'lucide-react';

/**
 * Premium collapsible HistoryPanel with search functionality
 * Features glassmorphism design, smooth animations, and advanced filtering
 */
const HistoryPanel = ({ history, onLoadFromHistory, onClearHistory }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHistory, setFilteredHistory] = useState(history);

  /**
   * Load collapsed state from localStorage on mount
   */
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('history-collapsed');
    if (savedCollapsed !== null) {
      setIsCollapsed(JSON.parse(savedCollapsed));
    }
  }, []);

  /**
   * Save collapsed state to localStorage
   */
  const toggleCollapsed = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    localStorage.setItem('history-collapsed', JSON.stringify(newCollapsed));
  };

  /**
   * Filter history based on search query
   */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredHistory(history);
    } else {
      const filtered = history.filter(item =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHistory(filtered);
    }
  }, [history, searchQuery]);

  /**
   * Format timestamp for display
   */
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  /**
   * Truncate long text for display
   */
  const truncateText = (text, maxLength = 40) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  /**
   * Clear search query
   */
  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <motion.div 
      className="glass-card h-fit"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={toggleCollapsed}
            className="flex items-center space-x-3 text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <History className="h-6 w-6" />
              {history.length > 0 && (
                <motion.div
                  className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                >
                  {history.length}
                </motion.div>
              )}
            </div>
            <span>History</span>
            <motion.div
              animate={{ rotate: isCollapsed ? -90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </motion.button>

          {!isCollapsed && history.length > 0 && (
            <motion.button
              onClick={onClearHistory}
              className="btn-glass p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              title="Clear all history"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Trash2 className="h-4 w-4" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Collapsible Content */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              {/* Search Bar */}
              {history.length > 0 && (
                <motion.div 
                  className="mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search QR codes..."
                      className="input-premium pl-10 pr-10 w-full text-sm"
                    />
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* History Content */}
              {filteredHistory.length === 0 ? (
                <motion.div 
                  className="text-center py-8 text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {history.length === 0 ? (
                    <>
                      <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="font-medium">No QR codes yet</p>
                      <p className="text-sm mt-1">Generated codes will appear here</p>
                    </>
                  ) : (
                    <>
                      <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="font-medium">No results found</p>
                      <p className="text-sm mt-1">Try a different search term</p>
                    </>
                  )}
                </motion.div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                  <AnimatePresence>
                    {filteredHistory.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="glass border border-white/20 dark:border-white/10 rounded-2xl p-4 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                        onClick={() => onLoadFromHistory(item)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start space-x-3">
                          {/* Mini QR Code Preview */}
                          <div className="flex-shrink-0">
                            <div className="p-2 bg-white rounded-2xl shadow-sm border-2 border-white/50 overflow-hidden">
                              <QRCodeSVG
                                value={item.text}
                                size={40}
                                fgColor={item.fgColor}
                                bgColor={item.bgColor}
                                level="M"
                                includeMargin={true}
                                className="rounded-lg"
                              />
                            </div>
                          </div>

                          {/* QR Code Details */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 break-words group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {truncateText(item.text)}
                            </p>
                            
                            {/* Color indicators */}
                            <div className="flex items-center space-x-2 mt-2">
                              <div className="flex items-center space-x-1">
                                <div
                                  className="w-3 h-3 rounded-full border border-white/50 shadow-sm"
                                  style={{ backgroundColor: item.fgColor }}
                                  title={`Foreground: ${item.fgColor}`}
                                />
                                <div
                                  className="w-3 h-3 rounded-full border border-white/50 shadow-sm"
                                  style={{ backgroundColor: item.bgColor }}
                                  title={`Background: ${item.bgColor}`}
                                />
                              </div>
                            </div>

                            {/* Timestamp */}
                            {item.timestamp && (
                              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatTimestamp(item.timestamp)}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {filteredHistory.length > 0 && (
                <motion.div 
                  className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Click any item to load it into the generator
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HistoryPanel;