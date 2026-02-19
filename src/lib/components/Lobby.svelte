<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade, scale, fly } from 'svelte/transition';
	import SynergyMatrix from '$lib/components/SynergyMatrix.svelte';

	let {
		gameCode,
		players = [],
		playerName,
		host,
		isStarting = false
	} = $props<{
		gameCode: string;
		players: string[];
		playerName: string;
		host: string;
		isStarting?: boolean;
	}>();

	const isHost = $derived(playerName === host);
	const shareUrl = $derived(`${window.location.origin}/?gameCode=${gameCode}`);

	let copied = $state(false);

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(shareUrl);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch (err) {
			console.error('Failed to copy link', err);
		}
	}
</script>

<div class="relative min-h-[80vh] w-full py-16 px-6 overflow-hidden" in:fade={{ duration: 800 }}>
	<!-- Main Lobby Background Integration -->
	<div
		class="fixed inset-0 overflow-hidden pointer-events-none -z-50 opacity-40 flex items-center justify-center"
	>
		<div class="scale-[4] transform">
			<SynergyMatrix demoMode={true} isStatic={true} />
		</div>
		<div
			class="absolute inset-0 bg-gradient-to-b from-dark-bg/20 via-transparent to-dark-bg/40"
		></div>
	</div>

	<!-- Content Card -->
	<div
		class="vibrant-card-premium p-1 md:p-2 max-w-2xl mx-auto relative z-10"
		in:scale={{ start: 0.98, delay: 200, duration: 1000 }}
	>
		<div class="bg-dark-bg/40 backdrop-blur-2xl rounded-[2.3rem] p-6 md:p-10 space-y-12">
			<!-- Header & Code -->
			<div class="text-center space-y-8">
				<div in:fly={{ y: -20, duration: 800 }}>
					<button
						onclick={() => (window.location.href = '/')}
						class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-3 h-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="3"
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						Exit Game
					</button>
				</div>

				<div class="space-y-4" in:fly={{ y: 20, duration: 800, delay: 100 }}>
					<h1 class="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white">
						Waiting Room
					</h1>

					<div class="flex items-center justify-center gap-3">
						<div
							class="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4"
						>
							<div>
								<p class="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">
									Invite Code
								</p>
								<p class="text-2xl font-mono font-black text-primary tracking-[0.2em]">
									{gameCode}
								</p>
							</div>
							<button
								onclick={copyLink}
								class="p-2 text-slate-400 hover:text-white transition-colors relative"
							>
								{#if copied}
									<span
										class="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg"
										in:scale
									>
										Copied
									</span>
								{/if}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="w-5 h-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Main Content Area -->
			<div class="space-y-12" in:fade={{ delay: 400 }}>
				<!-- Player Column -->
				<div class="space-y-4">
					<div class="flex items-center justify-between px-2">
						<h2 class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
							Players Joined • {players.length}
						</h2>
					</div>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
						{#each players as player}
							<div
								class="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between group"
							>
								<div class="flex items-center gap-3">
									<div
										class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm font-black text-slate-400 group-hover:text-primary transition-colors"
									>
										{player[0]}
									</div>
									<span class="text-sm font-black text-white">{player}</span>
								</div>
								{#if player === host}
									<span
										class="text-[9px] font-black uppercase tracking-widest text-primary/60 px-2 py-0.5 border border-primary/20 rounded-full bg-primary/5"
										>Host</span
									>
								{/if}
							</div>
						{/each}
					</div>
				</div>

				<!-- Controls Area -->
				<div class="pt-4 border-t border-white/5">
					{#if isHost}
						<form method="POST" action="?/startGame" use:enhance class="space-y-8">
							<div class="grid grid-cols-2 gap-4">
								<label class="relative cursor-pointer">
									<input
										type="radio"
										name="gameMode"
										value="competitive"
										class="peer sr-only"
										checked
									/>
									<div
										class="p-5 rounded-2xl border border-white/5 bg-white/5 peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-white/10 transition-all text-center space-y-1"
									>
										<p class="text-sm font-black text-white uppercase">Competitive</p>
										<p
											class="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-tight"
										>
											See who can score the highest on four questions about each player.
										</p>
									</div>
								</label>
								<label class="relative cursor-pointer">
									<input type="radio" name="gameMode" value="unlimited" class="peer sr-only" />
									<div
										class="p-5 rounded-2xl border border-white/5 bg-white/5 peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-white/10 transition-all text-center space-y-1"
									>
										<p class="text-sm font-black text-white uppercase">Unlimited</p>
										<p
											class="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-tight"
										>
											Play as long as you want. What don't you know about your friends?
										</p>
									</div>
								</label>
							</div>

							<button
								disabled={players.length < 2 || isStarting}
								class="w-full py-5 bg-primary hover:bg-primary/90 disabled:opacity-20 transition-all rounded-2xl text-lg font-black uppercase tracking-[0.25em] text-white shadow-xl shadow-primary/20"
							>
								{isStarting ? 'Starting...' : 'Start Game'}
							</button>

							{#if players.length < 2}
								<p
									class="text-center text-[9px] font-black uppercase tracking-widest text-slate-600"
								>
									Waiting for more players
								</p>
							{/if}
						</form>
					{:else}
						<div class="py-12 flex flex-col items-center gap-4">
							<div class="flex gap-1.5">
								<div class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
								<div
									class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"
								></div>
								<div
									class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"
								></div>
							</div>
							<p class="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
								Awaiting Host Selection
							</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	:global(input:checked + div) {
		border-color: rgba(var(--primary-rgb), 0.5) !important;
	}
</style>
