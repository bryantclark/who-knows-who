<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { webVitals } from '$lib/vitals';
	import Header from './Header.svelte';
	import './styles.css';

	let { data, children } = $props();

	$effect(() => {
		if (browser && data?.analyticsId) {
			webVitals({
				path: $page.url.pathname,
				params: $page.params,
				analyticsId: data.analyticsId
			});
		}
	});
</script>

<div class="app bg-slate-50 min-h-screen font-sans text-slate-900">
	<Header />

	<main class="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8">
		{@render children()}
	</main>

	<footer class="py-6 text-center text-slate-500 text-sm">
		<p>Built with <a href="https://kit.svelte.dev" class="font-bold text-slate-700 hover:text-blue-600 transition-colors">SvelteKit</a></p>
	</footer>
</div>
