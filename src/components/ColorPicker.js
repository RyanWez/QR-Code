import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Pipette } from 'lucide-react';

/**
 * Premium ColorPicker component with glassmorphism design
 * Features animated color swatches and smooth transitions
 */
const ColorPicker = ({ label, color, onChange }) => {
  // Premium preset color palette for 2025
  const presetColors = [
    '#000000', '#ffffff', '#1f2937', '#374151',
    '#ef4444', '#f97316', '#eab308', '#84cc16',
    '#22c55e', '#10b981', '#06b6d4', '#0ea5e9',
    '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7',
    '#d946ef', '#ec4899', '#f43f5e', '#e11d48'
  ];

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        <Palette className="h-4 w-4 text-primary-500" />
        <span>{label}</span>
      </label>
      
      {/* Color Input Section */}
      <div className="glass-card p-4 space-y-4">
        <div className="flex items-center space-x-3">
          {/* Color Preview */}
          <motion.div 
            className="relative w-14 h-14 rounded-2xl border-2 border-white/50 dark:border-white/20 shadow-lg overflow-hidden cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <input
              type="color"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div 
              className="w-full h-full transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: color }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
              <Pipette className="h-5 w-5 text-white" />
            </div>
          </motion.div>
          
          {/* Hex Input */}
          <input
            type="text"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="input-premium flex-1 font-mono text-sm"
            placeholder="#000000"
          />
        </div>

        {/* Preset Colors Grid */}
        <div className="grid grid-cols-10 gap-2">
          {presetColors.map((presetColor, index) => (
            <motion.button
              key={presetColor}
              onClick={() => onChange(presetColor)}
              className={`relative w-8 h-8 rounded-xl border-2 transition-all duration-300 hover:scale-110 ${
                color === presetColor 
                  ? 'border-primary-500 ring-2 ring-primary-200 dark:ring-primary-800 shadow-lg' 
                  : 'border-white/50 dark:border-white/20 hover:border-primary-300 dark:hover:border-primary-600'
              }`}
              style={{ backgroundColor: presetColor }}
              title={presetColor}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              {color === presetColor && (
                <motion.div
                  layoutId={`color-selected-${label}`}
                  className="absolute inset-0 rounded-xl bg-primary-500/20 border-2 border-primary-500"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ColorPicker;