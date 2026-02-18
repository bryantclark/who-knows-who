/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				outfit: ['Outfit', 'sans-serif']
			},
			colors: {
				'dark-bg': '#0b0e14',
				surface: '#161b22',
				primary: '#8b5cf6',
				secondary: '#ec4899',
				accent: '#06b6d4',
				success: '#10b981'
			},
			dropShadow: {
				'neon-primary': '0 0 8px rgba(139,92,246,0.5)',
				'neon-secondary': '0 0 8px rgba(236,72,153,0.5)'
			}
		}
	},
	plugins: []
};
