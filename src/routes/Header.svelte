<script>
	import { page } from '$app/stores';
	import github from '$lib/images/github.svg';
</script>

<header class="sticky top-4 z-50 w-full px-4">
	<div
		class="max-w-7xl mx-auto h-20 bg-surface/60 border border-white/10 backdrop-blur-2xl rounded-3xl px-6 md:px-10 flex justify-between items-center shadow-2xl"
	>
		<div class="flex items-center">
			<a href="/" class="flex items-center gap-4 group">
				<div
					class="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500"
				>
					<span class="text-white font-black text-2xl leading-none">W</span>
				</div>
				<span class="font-black text-2xl tracking-tight hidden sm:block font-outfit uppercase"
					>Who Knows <span class="neon-text-secondary">Who?</span></span
				>
			</a>
		</div>

		<div class="flex items-center gap-6">
			<nav class="hidden md:flex items-center gap-8">
				<a
					href="/"
					class="text-sm font-black uppercase tracking-[0.2em] transition-all duration-300
						{$page.url.pathname === '/' ? 'neon-text-primary scale-110' : 'text-slate-400 hover:text-white'}"
				>
					Lobby
				</a>
			</nav>

			<div class="h-8 w-px bg-white/10 hidden md:block"></div>

			<a
				href="https://github.com/eengineerc"
				target="_blank"
				rel="noopener noreferrer"
				class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-300 border border-white/5"
			>
				<img src={github} alt="GitHub" class="w-6 h-6 invert opacity-80" />
			</a>
		</div>
	</div>
</header>
