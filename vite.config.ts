import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    resolve: {
      alias: [
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
      port: 5173, // 포트 설정
      proxy: {
        '/api': {
          target: env.VITE_API_URL, // 환경 변수 사용
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    preview: {
      port: 5173 // 미리보기 포트 설정
    }
  };
});
