<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import './styles.css';

	import { type Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="min-h-screen relative overflow-hidden bg-[#0b0e14]">
	<!-- Animated Background Elements -->
	<div class="fixed inset-0 pointer-events-none">
		<div
			class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"
		></div>
		<div
			class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full"
		></div>
		<div
			class="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-accent/5 blur-[100px] rounded-full"
		></div>

		<!-- Decorative Dots/Grid -->
		<div class="absolute inset-0 game-grid-bg opacity-40"></div>
	</div>

	<div class="relative z-10 flex flex-col min-h-screen">
		<main class="flex-grow container mx-auto px-4 py-8 md:py-16">
			{@render children()}
		</main>

		<Footer />
	</div>
</div>

<style>
	:global(.bg-primary) {
		background-color: #8b5cf6;
	}
	:global(.text-primary) {
		color: #8b5cf6;
	}
	:global(.bg-secondary) {
		background-color: #ec4899;
	}
	:global(.text-secondary) {
		color: #ec4899;
	}
	:global(.bg-accent) {
		background-color: #06b6d4;
	}
	:global(.bg-surface) {
		background-color: #161b22;
	}
</style>
