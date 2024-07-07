import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' //추가

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{ //추가
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
  }
})
