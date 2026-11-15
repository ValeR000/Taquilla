import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const origenApi = env.VITE_API_URL ? new URL(env.VITE_API_URL).origin : ''

  return {
    plugins: [
      react(),
      {
        name: 'preconnect-api',
        transformIndexHtml: () =>
          origenApi
            ? [{ tag: 'link', attrs: { rel: 'preconnect', href: origenApi, crossorigin: true }, injectTo: 'head' }]
            : [],
      },
    ],
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-dom/client'],
      rolldownOptions: {
        output: { minify: true },
      },
    },
  }
})
