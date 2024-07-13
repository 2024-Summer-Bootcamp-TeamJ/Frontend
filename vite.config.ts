import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:[
      {
        find: "@src",
        replacement: path.resolve(__dirname, "src")
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components")
      }
    ]
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // 백엔드 서버 주소로 변경
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
