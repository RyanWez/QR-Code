import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Premium Theme Toggle Component
 * Allows switching between light, dark, and system themes
 */
const ThemeToggle = () => {
    const { theme, changeTheme } = useTheme();

    const themes = [
        { key: 'light', icon: Sun, label: 'Light' },
        { key: 'dark', icon: Moon, label: 'Dark' },
        { key: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <div className="glass-card p-1 flex space-x-1">
            {themes.map(({ key, icon: Icon, label }) => (
                <motion.button
                    key={key}
                    onClick={() => changeTheme(key)}
                    className={`relative p-2 rounded-xl transition-all duration-300 ${theme === key
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-white/20 dark:hover:bg-white/10'
                        }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={`Switch to ${label} theme`}
                >
                    <Icon className="h-4 w-4" />

                    {/* Active indicator */}
                    {theme === key && (
                        <motion.div
                            layoutId="theme-indicator"
                            className="absolute inset-0 bg-primary-500 rounded-xl -z-10"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                </motion.button>
            ))}
        </div>
    );
};

export default ThemeToggle;