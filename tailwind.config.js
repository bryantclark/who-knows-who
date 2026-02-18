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
				'dark-bg': '#020617', // Slate 950
				surface: '#0f172a', // Slate 900
				'surface-lighter': '#1e293b', // Slate 800
				primary: '#f97316', // Orange 500
				secondary: '#f59e0b', // Amber 500
				accent: '#fbbf24', // Amber 400
				success: '#10b981',
				'glass-white': 'rgba(255, 255, 255, 0.03)',
				'glass-border': 'rgba(255, 255, 255, 0.08)'
			},
			dropShadow: {
				'neon-primary': '0 0 12px rgba(99, 102, 241, 0.4)',
				'neon-secondary': '0 0 12px rgba(244, 63, 94, 0.4)',
				glow: '0 0 20px rgba(99, 102, 241, 0.2)'
			},
			boxShadow: {
				'premium-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
				'glass-depth': '0 8px 32px 0 rgba(0, 0, 0, 0.8)'
			}
		}
	},
	plugins: []
};
