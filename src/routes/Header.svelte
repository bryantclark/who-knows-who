<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
</script>

<header
	class="flex justify-between items-center px-4 py-3 bg-white border-b border-slate-200 shadow-sm"
>
	<div class="flex items-center">
		<a href="/" class="flex items-center gap-2 group">
			<img src={logo} alt="SvelteKit" class="w-8 h-8 transition-transform group-hover:scale-110" />
			<span class="font-bold text-lg text-slate-800 tracking-tight hidden sm:block"
				>Who Knows Who</span
			>
		</a>
	</div>

	<nav class="flex items-center gap-6">
		<a
			href="/"
			class="text-sm font-bold uppercase tracking-wider transition-colors
                  {$page.url.pathname === '/'
				? 'text-blue-600'
				: 'text-slate-600 hover:text-blue-600'}"
		>
			Home
		</a>
	</nav>

	<div class="flex items-center">
		<a
			href="https://github.com/eengineerc"
			class="text-slate-400 hover:text-slate-800 transition-colors"
		>
			<img src={github} alt="GitHub" class="w-6 h-6" />
		</a>
	</div>
</header>
