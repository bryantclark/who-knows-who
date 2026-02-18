<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade, fly, scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let { data, form } = $props<{ data: any; form: any }>();

	let playerName = $state('');
	let gameCode = $state('');
	let activeTab = $state<'create' | 'join'>('join');
	let isJoining = $state(false);

	onMount(() => {
		const code = $page.url.searchParams.get('gameCode');
		if (code) {
			gameCode = code;
			activeTab = 'join';
		}
	});

	function setTab(tab: 'create' | 'join') {
		activeTab = tab;
	}
</script>

<div class="max-w-5xl mx-auto px-6 py-12 md:py-24" in:fade={{ duration: 1000 }}>
	<!-- Hero Section -->
	<div class="text-center mb-20 space-y-6 relative">
		<div
			class="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full animate-pulse-slow -z-10"
		></div>
		<h1
			class="text-6xl md:text-9xl font-black font-outfit uppercase tracking-tighter leading-[0.9] text-white"
			in:fly={{ y: 30, delay: 200, duration: 1000 }}
		>
			The Ultimate <br />
			<span class="vibrant-gradient-text drop-shadow-glow">Connection</span> Test
		</h1>
		<p
			class="text-lg md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed"
			in:fly={{ y: 20, delay: 400, duration: 1000 }}
		>
			Unlock the secrets of your squad. An AI-powered social trivia experience that proves exactly
			how well you know each other.
		</p>
	</div>

	<!-- Main Lobby Card -->
	<div
		class="vibrant-card-premium p-1 md:p-2 max-w-2xl mx-auto mb-32"
		in:scale={{ start: 0.98, delay: 600, duration: 1000 }}
	>
		<div class="bg-dark-bg/40 backdrop-blur-2xl rounded-[2.3rem] p-6 md:p-10 space-y-10">
			<!-- Tabs -->
			<div class="flex p-1.5 bg-white/5 rounded-2xl border border-white/5">
				<button
					onclick={() => setTab('join')}
					class="glass-tab flex-1 {activeTab === 'join'
						? 'bg-primary text-white shadow-lg shadow-primary/20'
						: 'text-slate-500 hover:text-slate-300'}"
				>
					Join Room
				</button>
				<button
					onclick={() => setTab('create')}
					class="glass-tab flex-1 {activeTab === 'create'
						? 'bg-secondary text-white shadow-lg shadow-secondary/20'
						: 'text-slate-500 hover:text-slate-300'}"
				>
					Host Game
				</button>
			</div>

			{#if activeTab === 'join'}
				<form
					method="POST"
					action="?/joinGame"
					use:enhance={() => {
						isJoining = true;
						return async ({ update }) => {
							isJoining = false;
							update();
						};
					}}
					class="space-y-8"
					in:fly={{ x: -10, duration: 600 }}
				>
					<div class="space-y-6">
						<div class="space-y-3">
							<label
								for="playerName"
								class="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 ml-1"
							>
								Your Handle
							</label>
							<input
								type="text"
								name="playerName"
								id="playerName"
								placeholder="E.g. GhostProtocol"
								required
								class="vibrant-input"
								bind:value={playerName}
							/>
						</div>

						<div class="space-y-3">
							<label
								for="gameCode"
								class="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 ml-1"
							>
								Access Code
							</label>
							<input
								type="text"
								name="gameCode"
								id="gameCode"
								maxlength="6"
								placeholder="••••••"
								required
								class="vibrant-input text-center tracking-[0.8em] uppercase font-black"
								bind:value={gameCode}
							/>
						</div>
					</div>

					<button
						type="submit"
						class="w-full vibrant-btn-primary py-6 text-xl"
						disabled={isJoining}
					>
						{isJoining ? 'Connecting...' : 'Enter the Arena'}
					</button>
				</form>
			{:else}
				<form
					method="POST"
					action="?/createGame"
					use:enhance={() => {
						isJoining = true;
						return async ({ update }) => {
							isJoining = false;
							update();
						};
					}}
					class="space-y-8"
					in:fly={{ x: 10, duration: 600 }}
				>
					<div class="space-y-6">
						<div class="space-y-3">
							<label
								for="playerName"
								class="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 ml-1"
							>
								Host Handle
							</label>
							<input
								type="text"
								name="playerName"
								id="playerName"
								placeholder="E.g. GameMaster"
								required
								class="vibrant-input"
								bind:value={playerName}
							/>
						</div>

						<div
							class="p-8 border border-white/5 bg-white/[0.02] rounded-3xl text-center space-y-4"
						>
							<div
								class="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto border border-secondary/20"
							>
								<span class="text-2xl">✨</span>
							</div>
							<p class="text-slate-400 text-sm font-medium">
								We'll generate a unique session code for your squad to join.
							</p>
						</div>
					</div>

					<button
						type="submit"
						class="w-full bg-secondary hover:bg-rose-600 vibrant-btn-primary py-6 text-xl shadow-secondary/20 hover:shadow-secondary/40"
						disabled={isJoining}
					>
						{isJoining ? 'Initializing...' : 'Launch Session'}
					</button>
				</form>
			{/if}

			{#if form?.error}
				<div
					class="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-center text-sm font-bold"
					in:fly={{ y: 10 }}
				>
					{form.error}
				</div>
			{/if}
		</div>
	</div>

	<!-- Features Grid -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 px-4">
		<div
			class="vibrant-card p-10 space-y-6 group hover:bg-primary/5 transition-colors duration-500"
		>
			<div
				class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl border border-primary/20 group-hover:scale-110 transition-transform duration-500"
			>
				🤖
			</div>
			<div class="space-y-2">
				<h3 class="text-lg font-black uppercase tracking-wider text-white">Neural Engine</h3>
				<p class="text-slate-400 text-sm leading-relaxed">
					Powered by Gemini 1.5 Flash for nuanced understanding of friendship bonds.
				</p>
			</div>
		</div>
		<div
			class="vibrant-card p-10 space-y-6 group hover:bg-secondary/5 transition-colors duration-500"
		>
			<div
				class="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-3xl border border-secondary/20 group-hover:scale-110 transition-transform duration-500"
			>
				⚡️
			</div>
			<div class="space-y-2">
				<h3 class="text-lg font-black uppercase tracking-wider text-white">Zero Latency</h3>
				<p class="text-slate-400 text-sm leading-relaxed">
					Real-time Firebase synchronization keeps the entire squad in perfect lockstep.
				</p>
			</div>
		</div>
		<div class="vibrant-card p-10 space-y-6 group hover:bg-accent/5 transition-colors duration-500">
			<div
				class="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-3xl border border-accent/20 group-hover:scale-110 transition-transform duration-500"
			>
				🎨
			</div>
			<div class="space-y-2">
				<h3 class="text-lg font-black uppercase tracking-wider text-white">Elite UX</h3>
				<p class="text-slate-400 text-sm leading-relaxed">
					A premium glassmorphic interface designed for deep focus and maximum fun.
				</p>
			</div>
		</div>
	</div>
</div>
