import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
import tsconfigPaths from 'vite-tsconfig-paths'

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
    tsconfigPaths(),
  ],
  server: {
    proxy: {
      '^/api': { target: 'http://example.com' },
    }
  }
});
