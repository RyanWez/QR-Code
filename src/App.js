import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import QRCodeGenerator from './components/QRCodeGenerator';
import Header from './components/Header';
import { sampleQRCodes } from './utils/sampleData';

/**
 * Main App component that manages the QR code generator application
 * Handles state management for QR codes, history, and localStorage persistence
 */
function App() {
  // State for current QR code configuration
  const [currentQR, setCurrentQR] = useState({
    text: '',
    fgColor: '#000000',
    bgColor: '#ffffff'
  });

  // State for QR code history stored in localStorage
  const [history, setHistory] = useState([]);

  /**
   * Load history from localStorage on component mount
   * Also loads sample data if no history exists
   */
  useEffect(() => {
    const savedHistory = localStorage.getItem('qr-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    } else {
      // Load sample data if no history exists
      setHistory(sampleQRCodes);
      localStorage.setItem('qr-history', JSON.stringify(sampleQRCodes));
    }
  }, []);

  /**
   * Save a new QR code to history
   * Prevents duplicates and maintains chronological order
   */
  const saveToHistory = (qrData) => {
    if (!qrData.text.trim()) return;

    const newEntry = {
      ...qrData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };

    // Check if this exact QR code already exists in history
    const isDuplicate = history.some(item =>
      item.text === qrData.text &&
      item.fgColor === qrData.fgColor &&
      item.bgColor === qrData.bgColor
    );

    if (!isDuplicate) {
      const updatedHistory = [newEntry, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('qr-history', JSON.stringify(updatedHistory));
    }
  };

  /**
   * Load a QR code from history into the current generator
   */
  const loadFromHistory = (qrData) => {
    setCurrentQR({
      text: qrData.text,
      fgColor: qrData.fgColor,
      bgColor: qrData.bgColor
    });
  };

  /**
   * Clear all history from localStorage and state
   */
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('qr-history');
  };

  return (
    <ThemeProvider>
      <NotificationProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-500">
          {/* Animated background elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-3/4 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl"
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl"
              animate={{
                x: [0, 60, 0],
                y: [0, -80, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <Header />

          <motion.main
            className="container mx-auto px-4 py-8 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <QRCodeGenerator
              currentQR={currentQR}
              setCurrentQR={setCurrentQR}
              history={history}
              onSaveToHistory={saveToHistory}
              onLoadFromHistory={loadFromHistory}
              onClearHistory={clearHistory}
            />
          </motion.main>

          {/* Footer */}
          <motion.footer
            className="relative z-10 py-6 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="container mx-auto px-4">
              <div className="glass-card p-6">
                <p className="text-center text-gray-600 dark:text-gray-300">
                  © 2025{' '}
                  <motion.a
                    href="https://ryanwez.github.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gradient font-semibold hover:underline transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    RyanWez
                  </motion.a>
                  . All rights reserved.
                </p>
              </div>
            </div>
          </motion.footer>
        </div>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;