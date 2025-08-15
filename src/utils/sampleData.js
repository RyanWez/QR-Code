/**
 * Sample QR code data for testing and demonstration purposes
 * These will be loaded as default history items when the app first runs
 */
export const sampleQRCodes = [
  {
    id: 1,
    text: 'https://github.com',
    fgColor: '#000000',
    bgColor: '#ffffff',
    timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: 2,
    text: 'Welcome to QR Code Generator!',
    fgColor: '#3b82f6',
    bgColor: '#ffffff',
    timestamp: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  },
  {
    id: 3,
    text: 'mailto:contact@example.com',
    fgColor: '#22c55e',
    bgColor: '#f0fdf4',
    timestamp: new Date(Date.now() - 259200000).toISOString() // 3 days ago
  },
  {
    id: 4,
    text: 'tel:+1234567890',
    fgColor: '#ef4444',
    bgColor: '#ffffff',
    timestamp: new Date(Date.now() - 345600000).toISOString() // 4 days ago
  },
  {
    id: 5,
    text: 'WIFI:T:WPA;S:MyNetwork;P:password123;H:false;;',
    fgColor: '#8b5cf6',
    bgColor: '#faf5ff',
    timestamp: new Date(Date.now() - 432000000).toISOString() // 5 days ago
  }
];