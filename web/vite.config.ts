import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    mockDevServerPlugin(
      {
        //prefix: '^/config',
        log: 'debug',
        //include: 'mock/**/*.mock.{ts,js,cjs,mjs,json,json5}',
      }
    ),

  ],
  server: {
    proxy: {
      '^/config': { target: 'http://example.com' },
      '^/info': { target: 'http://example.com' }
    }
  }
});
