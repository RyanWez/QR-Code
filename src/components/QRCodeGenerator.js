import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Save, QrCode, FileImage, FileCode, Sparkles, X } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';
import ColorPicker from './ColorPicker';
import HistoryPanel from './HistoryPanel';

/**
 * Premium QR Code Generator component with glassmorphism design
 * Features smooth animations, multiple download formats, and enhanced UX
 */
const QRCodeGenerator = ({
  currentQR,
  setCurrentQR,
  history,
  onSaveToHistory,
  onLoadFromHistory,
  onClearHistory
}) => {
  const qrRef = useRef(null);
  const { showNotification } = useNotification();

  /**
   * Handle text input changes with real-time QR code generation
   */
  const handleTextChange = (e) => {
    setCurrentQR(prev => ({
      ...prev,
      text: e.target.value
    }));
  };

  /**
   * Clear the input field
   */
  const handleClearText = () => {
    setCurrentQR(prev => ({
      ...prev,
      text: ''
    }));
  };

  /**
   * Handle color changes for foreground and background
   */
  const handleColorChange = (colorType, color) => {
    setCurrentQR(prev => ({
      ...prev,
      [colorType]: color
    }));
  };

  /**
   * Download QR code as PNG file
   * Converts SVG to canvas and triggers download
   */
  const downloadQRCode = (format = 'png') => {
    if (!currentQR.text.trim()) {
      showNotification('Please enter text or URL to generate QR code', 'error');
      return;
    }

    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);

    if (format === 'svg') {
      // Download as SVG
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement('a');
      link.download = `qr-code-${Date.now()}.svg`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      showNotification('QR code downloaded as SVG!');
    } else {
      // Download as PNG
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      // Set canvas size (higher resolution for better quality)
      canvas.width = 1024;
      canvas.height = 1024;

      // Convert SVG to data URL
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        // Draw image on canvas with white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 1024, 1024);
        ctx.drawImage(img, 0, 0, 1024, 1024);
        
        // Create download link
        const link = document.createElement('a');
        link.download = `qr-code-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // Cleanup
        URL.revokeObjectURL(url);
        showNotification('QR code downloaded as PNG!');
      };

      img.src = url;
    }
  };

  /**
   * Save current QR code configuration to history
   */
  const handleSaveToHistory = () => {
    if (!currentQR.text.trim()) {
      showNotification('Please enter text or URL before saving', 'error');
      return;
    }
    onSaveToHistory(currentQR);
    showNotification('QR code saved to history!');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Main QR Code Generator Panel */}
        <motion.div 
          className="xl:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card p-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gradient mb-2 flex items-center">
                <Sparkles className="h-8 w-8 mr-3 text-primary-500" />
                Generate QR Code
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Create beautiful, customizable QR codes instantly
              </p>
            </motion.div>
            
            {/* Text Input */}
            <motion.div 
              className="mb-8 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <label htmlFor="qr-text" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
                Enter Text or URL
              </label>
              <div className="flex items-center space-x-3 w-full max-w-4xl">
                <input
                  id="qr-text"
                  type="text"
                  value={currentQR.text}
                  onChange={handleTextChange}
                  placeholder="Enter any text, URL, or data to generate QR code..."
                  className="input-premium flex-1 h-12"
                />
                <motion.button
                  onClick={handleClearText}
                  className="btn-glass h-12 px-4 flex items-center justify-center min-w-[48px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Clear text"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* QR Code Display */}
            <motion.div 
              className="flex flex-col items-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="glass-card p-8 bg-white/50 dark:bg-black/20">
                <AnimatePresence mode="wait">
                  {currentQR.text ? (
                    <motion.div 
                      key="qr-code"
                      ref={qrRef}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      {/* QR Code with rounded container */}
                      <div className="p-4 bg-white rounded-3xl shadow-lg border-4 border-white/50 dark:border-gray-800/50 overflow-hidden">
                        <QRCodeSVG
                          value={currentQR.text}
                          size={280}
                          fgColor={currentQR.fgColor}
                          bgColor={currentQR.bgColor}
                          level="M"
                          includeMargin={true}
                          className="rounded-2xl"
                        />
                      </div>
                      <motion.div
                        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="text-white font-semibold bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm">Ready to download!</div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="placeholder"
                      className="w-72 h-72 flex items-center justify-center text-gray-400 dark:text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{ 
                            rotate: 360,
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                            scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                          }}
                        >
                          <QrCode className="h-20 w-20 mx-auto mb-4 opacity-30" />
                        </motion.div>
                        <p className="text-lg font-medium">Enter text above</p>
                        <p className="text-sm mt-1">to generate your QR code</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Color Customization */}
            <div className="flex justify-center mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl w-full">
                <ColorPicker
                  label="Foreground Color"
                  color={currentQR.fgColor}
                  onChange={(color) => handleColorChange('fgColor', color)}
                />
                <ColorPicker
                  label="Background Color"
                  color={currentQR.bgColor}
                  onChange={(color) => handleColorChange('bgColor', color)}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <motion.button
                onClick={() => downloadQRCode('png')}
                disabled={!currentQR.text.trim()}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileImage className="h-5 w-5" />
                <span>Download PNG</span>
              </motion.button>
              
              <motion.button
                onClick={() => downloadQRCode('svg')}
                disabled={!currentQR.text.trim()}
                className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileCode className="h-5 w-5" />
                <span>Download SVG</span>
              </motion.button>
              
              <motion.button
                onClick={handleSaveToHistory}
                disabled={!currentQR.text.trim()}
                className="btn-accent flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save className="h-5 w-5" />
                <span>Save to History</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* History Panel */}
        <div className="xl:col-span-1">
          <HistoryPanel
            history={history}
            onLoadFromHistory={onLoadFromHistory}
            onClearHistory={onClearHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;