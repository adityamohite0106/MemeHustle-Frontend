
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    sourcemap: true, // Enable source maps for better debugging
  },
  define: {
    // Ensure environment variables are injected
    'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL || 'https://memehustle-backend-8kap.onrender.com'),
  },
});
