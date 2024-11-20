/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'display': ['Input Sans', 'system-ui', 'sans-serif'],
        'body': ['Input Sans', 'system-ui', 'sans-serif'],
        'mono': ['Input Sans', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      colors: {
        brand: {
          primary: {
            DEFAULT: '#000046',    // Light mode blue
            dark: '#4040ff',       // Dark mode blue - much more visible
          },
          secondary: '#810636',    // Dark red secondary
        },
        background: {
          light: '#ececee',     // Light grey background
          white: '#ececee',      // Pure white
          dark: '#1a1a1a',      // Dark mode background
          darker: '#0f0f0f',    // Dark mode darker shade
        },
        text: {
          primary: '#111827',    // Light mode primary text
          secondary: '#4b5563',  // Light mode secondary text
          light: '#6B7280',      // Light mode light text
          dark: '#F3F4F6',      // Dark mode text
          'dark-secondary': '#9CA3AF', // Dark mode secondary text
        },
        ui: {
          border: '#e4e4e8z',     // Light mode border
          'dark-border': '#2D2D2D', // Dark mode border
        },
        status: {
          success: {
            light: '#dcfce7',
            DEFAULT: '#22c55e',
            dark: '#166534'
          },
          error: {
            light: '#fee2e2',
            DEFAULT: '#ef4444',
            dark: '#991b1b'
          },
          warning: {
            light: '#fef9c3',
            DEFAULT: '#eab308',
            dark: '#854d0e'
          },
          info: {
            light: '#dbeafe',
            DEFAULT: '#3b82f6',
            dark: '#1e40af'
          }
        }
      },
    },
  },
  plugins: [],
};