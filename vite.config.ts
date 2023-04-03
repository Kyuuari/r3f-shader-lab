import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    glsl({
      exclude: 'node_modules/**',
      // change this to match the location of your shader files
      include: ['src/**/**/*.glsl', '/\.glsl$/', 'src/**/*.glsl' ],
    })],
})
