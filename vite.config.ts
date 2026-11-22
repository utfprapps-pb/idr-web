/// <reference types="vitest/config" />
import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@database': path.resolve(__dirname, 'database'),
    },
  },
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'node',
    // Datas `yyyy-MM-dd` dependem do fuso: os testes rodam no de Brasília.
    env: { TZ: 'America/Sao_Paulo' },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/test/**',
        'src/**/mocks/**',
        'src/**/*.stories.tsx',
      ],
    },
  },
})
