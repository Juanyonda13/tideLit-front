import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Cargar variables de entorno basadas en el modo
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 5173,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'terser',
    },
    base: '/',
    // Configuración dinámica de variables de entorno
    define: {
      __APP_ENV__: JSON.stringify(mode),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    },
    // Variables de entorno disponibles en el cliente
    envPrefix: 'VITE_',
  }
})
