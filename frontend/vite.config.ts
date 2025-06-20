import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // 飞书风格主题变量示例，可根据实际调整
          'primary-color': '#2468F2', // 飞书蓝
          'border-radius-base': '8px',
          'font-family': '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
          'box-shadow-base': '0 2px 8px rgba(36,104,242,0.08)',
        },
      },
    },
  },
  server: {
    allowedHosts: [
      '5173-ip08vk9c5la2zawer0p2a-bce9f271.manusvm.computer',
      '5174-i3p0lqrz16trgezioe76b-bce9f271.manusvm.computer',
      '.manusvm.computer'
    ],
    cors: true,
    strictPort: false,
    host: true,
    proxy: {
      '/api/coze': {
        target: 'https://api.coze.cn/open_api/v2',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/coze/, ''),
      },
      // '/api/dify': {
      //   target: 'http://localhost',
      //   changeOrigin: true,
      //   rewrite: path => path.replace(/^\/api\/dify/, '/v1'),
      //   secure: false,
      // },
    },
  },
})

