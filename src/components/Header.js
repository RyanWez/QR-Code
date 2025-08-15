import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

/**
 * Premium Header component with glassmorphism design
 * Features animated title, theme toggle, and modern styling
 */
const Header = () => {
  useEffect(() => {
    const header = document.querySelector(".page-header");
    const toggleClass = "is-sticky";

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 150) {
        header.classList.add(toggleClass);
        document.body.classList.add('sticky-header-active');
      } else {
        header.classList.remove(toggleClass);
        document.body.classList.remove('sticky-header-active');
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove('sticky-header-active');
    };
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="page-header relative z-10 py-3 transition-all duration-500"
    >
      <div className="container mx-auto px-4">
        <div className="glass-card p-4 transition-all duration-500">
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
                <div className="relative glass-card p-2 transition-all duration-500">
                  <QrCode className="h-6 w-6 text-primary-600 dark:text-primary-400 transition-all duration-500" />
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gradient transition-all duration-500">
                  QR Generator
                </h1>
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
        </div>
      </div>
    </motion.header>
  );
};

export default Header;