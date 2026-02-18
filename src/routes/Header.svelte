<script>
	import { page } from '$app/stores';
	import github from '$lib/images/github.svg';
</script>

<header class="sticky top-4 z-50 w-full px-4">
	<div
		class="max-w-7xl mx-auto h-20 bg-dark-bg/60 border border-white/5 backdrop-blur-2xl rounded-3xl px-6 md:px-10 flex justify-between items-center shadow-glass-depth"
	>
		<div class="flex items-center">
			<a href="/" class="flex items-center gap-4 group">
				<div
					class="w-11 h-11 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500 border border-white/10"
				>
					<span class="text-white font-black text-xl leading-none">W</span>
				</div>
				<span
					class="font-black text-xl tracking-tighter hidden sm:block font-outfit uppercase text-white"
					>Who Knows <span class="vibrant-gradient-text">Who?</span></span
				>
			</a>
		</div>

		<div class="flex items-center gap-6">
			<nav class="hidden md:flex items-center gap-8">
				<a
					href="/"
					class="text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300
						{$page.url.pathname === '/' ? 'text-primary' : 'text-slate-500 hover:text-white'}"
				>
					Lobby
				</a>
			</nav>
		</div>
	</div>
</header>
