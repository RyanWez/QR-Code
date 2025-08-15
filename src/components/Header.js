import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

/**
 * Premium Header component with glassmorphism design
 * Features animated title, theme toggle, and modern styling
 */
const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 dark:from-primary-900/20 dark:via-secondary-900/20 dark:to-accent-900/20" />
      
      {/* Glassmorphism overlay */}
      <div className="glass border-b border-white/20 dark:border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur-lg opacity-30"
                />
                <div className="relative glass-card p-3">
                  <QrCode className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              
              <div>
                <h1 className="text-4xl font-bold text-gradient">
                  QR Generator
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Sparkles className="h-4 w-4 text-accent-500" />
                  <p className="text-gray-600 dark:text-gray-300 font-medium">
                    Premium 2025 Edition
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>
          
          {/* Subtitle */}
          <motion.p 
            className="text-center text-gray-600 dark:text-gray-300 mt-4 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Generate, customize, and download QR codes with premium design
          </motion.p>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;