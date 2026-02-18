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

<div class="max-w-4xl mx-auto" in:fade={{ duration: 800 }}>
	<!-- Hero Section -->
	<div class="text-center mb-16 space-y-4">
		<h1
			class="text-6xl md:text-8xl font-black font-outfit uppercase tracking-tighter leading-none"
			in:fly={{ y: 20, delay: 200 }}
		>
			The Ultimate <br />
			<span class="vibrant-gradient-text">Connection</span> Test
		</h1>
		<p
			class="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed"
			in:fly={{ y: 20, delay: 300 }}
		>
			How well do you actually know your friends? Join a room, answer questions, and prove your
			bond.
		</p>
	</div>

	<!-- Main Lobby Card -->
	<div class="vibrant-card p-4 md:p-8" in:scale={{ start: 0.95, delay: 400 }}>
		<!-- Tabs -->
		<div class="flex p-2 bg-black/40 rounded-3xl mb-8 border border-white/5">
			<button
				onclick={() => setTab('join')}
				class="flex-1 py-4 rounded-2xl font-black uppercase tracking-widest transition-all duration-500 {activeTab ===
				'join'
					? 'bg-primary text-white shadow-xl shadow-primary/20'
					: 'text-slate-500 hover:text-white'}"
			>
				Join Game
			</button>
			<button
				onclick={() => setTab('create')}
				class="flex-1 py-4 rounded-2xl font-black uppercase tracking-widest transition-all duration-500 {activeTab ===
				'create'
					? 'bg-secondary text-white shadow-xl shadow-secondary/20'
					: 'text-slate-500 hover:text-white'}"
			>
				Create Game
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
				class="space-y-6"
				in:fly={{ x: -20, duration: 400 }}
			>
				<div class="space-y-4">
					<label
						for="playerName"
						class="block text-sm font-black uppercase tracking-[0.2em] text-slate-400 ml-2"
					>
						Your Name
					</label>
					<input
						type="text"
						name="playerName"
						id="playerName"
						placeholder="E.g. Captain Awesome"
						required
						class="vibrant-input"
						bind:value={playerName}
					/>
				</div>

				<div class="space-y-4">
					<label
						for="gameCode"
						class="block text-sm font-black uppercase tracking-[0.2em] text-slate-400 ml-2"
					>
						Game Code
					</label>
					<input
						type="text"
						name="gameCode"
						id="gameCode"
						maxlength="6"
						placeholder="6-character code"
						required
						class="vibrant-input text-center tracking-[0.5em] uppercase font-black"
						bind:value={gameCode}
					/>
				</div>

				<button type="submit" class="w-full vibrant-btn-primary py-6 text-xl" disabled={isJoining}>
					{isJoining ? 'Entering...' : 'Step into the Game'}
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
				class="space-y-6"
				in:fly={{ x: 20, duration: 400 }}
			>
				<div class="space-y-4">
					<label
						for="playerName"
						class="block text-sm font-black uppercase tracking-[0.2em] text-slate-400 ml-2"
					>
						Host Name
					</label>
					<input
						type="text"
						name="playerName"
						id="playerName"
						placeholder="E.g. Master of Ceremonies"
						required
						class="vibrant-input"
						bind:value={playerName}
					/>
				</div>

				<div
					class="p-8 border-2 border-dashed border-white/10 rounded-3xl bg-white/5 text-center space-y-4"
				>
					<div class="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
						<span class="text-3xl">✨</span>
					</div>
					<p class="text-slate-400 font-medium">
						We'll generate a secret code for you to share with your friends.
					</p>
				</div>

				<button
					type="submit"
					class="w-full bg-secondary hover:bg-pink-600 vibrant-btn-primary py-6 text-xl shadow-secondary/20 hover:shadow-secondary/40"
					disabled={isJoining}
				>
					{isJoining ? 'Creating Arena...' : 'Launch New Game'}
				</button>
			</form>
		{/if}

		{#if form?.error}
			<div
				class="mt-6 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-center font-bold"
				in:fly={{ y: 20 }}
			>
				{form.error}
			</div>
		{/if}
	</div>

	<!-- Features Grid -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
		<div class="vibrant-card p-8 space-y-4 border-primary/20 bg-primary/5">
			<div class="text-4xl">🤖</div>
			<h3 class="text-xl font-black uppercase">AI Powered</h3>
			<p class="text-slate-400 leading-relaxed">
				Gemini evaluates your friendship scores with semantic precision.
			</p>
		</div>
		<div class="vibrant-card p-8 space-y-4 border-secondary/20 bg-secondary/5">
			<div class="text-4xl">⚡️</div>
			<h3 class="text-xl font-black uppercase">Real Time</h3>
			<p class="text-slate-400 leading-relaxed">
				Watch the leaderboards and friendship graphs update as you play.
			</p>
		</div>
		<div class="vibrant-card p-8 space-y-4 border-accent/20 bg-accent/5">
			<div class="text-4xl">🔗</div>
			<h3 class="text-xl font-black uppercase">Instant Play</h3>
			<p class="text-slate-400 leading-relaxed">
				No downloads. No complexity. Just share a link and start.
			</p>
		</div>
	</div>
</div>
