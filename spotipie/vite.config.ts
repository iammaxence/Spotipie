import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
	plugins: [
		react(),
		AutoImport({
			imports: ['vitest'],
			dts: true,
		}),
	],
  
	test: {
		environment: 'jsdom',
		setupFiles: ['./tests/setup.ts'],
		testMatch: ['./tests/**/*.test.tsx'],
		globals: true,
		coverage: {
			all: true,
		}
	},

	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
	// prevent vite from obscuring rust errors
	clearScreen: false,
	// tauri expects a fixed port, fail if that port is not available
	server: {
		host: true,
		port: 1420,
		strictPort: true,
		watch: {
			usePolling: true
		}
	},
	// to make use of `TAURI_DEBUG` and other env variables
	// https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
	envPrefix: ['VITE_', 'TAURI_'],
	build: {
		// Tauri supports es2021
		target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
		// don't minify for debug builds
		minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
		// produce sourcemaps for debug builds
		sourcemap: !!process.env.TAURI_DEBUG,
	},
}));
