import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
	{
		extends: './vite.config.js',
		test: {
			name: 'componentTests',
			root: './src/tests/client/component',
			environment: 'jsdom',
			alias: [{ find: /^svelte$/, replacement: 'svelte/internal' }],
			globals: true,
			setupFiles: ['./config/components.config.js'],
		}
	}
])