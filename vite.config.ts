/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        define: {
            'process.env': env,
        },
        server: {
            host: true,
            port: Number(env.VITE_SERVER_PORT)
        },
        base: './',
        resolve: {
            alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
          },
    };
});