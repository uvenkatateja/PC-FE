import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: './tailwind.config.js',
      debug: false,
    }),
  ],
  server: {
    port: 3000,
    open: true,
    // Add history API fallback for client-side routing
    historyApiFallback: true
  },
  // Set base to root path for proper asset loading
  base: '/',
  build: {
    // Output directory for production build
    outDir: 'dist',
    // Generate sourcemaps for better debugging
    sourcemap: true,
    // Configure rollup options
    rollupOptions: {
      output: {
        // Ensure assets are properly named and cached
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['antd', '@ant-design/icons'],
        }
      }
    }
  }
})
