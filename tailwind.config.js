/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nagpur: {
          orange: "#F28C28",
          "orange-accent": "#FF9F43",
          "deep-green": "#0B5D3B",
          green: "#087F5B",
          bg: "#F5F8F6",
          text: "#1F2937",
          muted: "#6B7280",
          "card-border": "#E5E9E6",
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
        tech: ['Electrolize', 'monospace', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(11, 93, 59, 0.05)',
        'glow-orange': '0 0 25px -5px rgba(242, 140, 40, 0.3)',
        'glow-green': '0 0 25px -5px rgba(11, 93, 59, 0.25)',
      },
      borderRadius: {
        'card': '14px',
      }
    },
  },
  plugins: [],
}
