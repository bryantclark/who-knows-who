<script lang="ts">
	import { db } from '../../../firebase/firebase';
	import { ref, onValue } from 'firebase/database';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { fade, fly, scale } from 'svelte/transition';
	import GraphScore from '../../GraphScore.svelte';

	import { browser } from '$app/environment';

	let { data, form } = $props<{ data: any; form: any }>();

	let gameData = $state<any>(null);
	let players = $state<string[]>([]);
	let answeredPlayers = $state<string[]>([]);
	let copyStatus = $state('Copy Link');

	onMount(() => {
		const gameRef = ref(db, `gamecode/${data.gameCode}`);
		const unsubscribe = onValue(gameRef, (snapshot) => {
			if (snapshot.exists()) {
				gameData = snapshot.val();
				players = gameData.players ? Object.keys(gameData.players) : [];
				answeredPlayers = gameData.answeredPlayers ? Object.keys(gameData.answeredPlayers) : [];
			}
		});

		return () => unsubscribe();
	});

	const isAnswerer = $derived(gameData?.currentAnswerer?.name === data.playerName);
	const hasAnswered = $derived(answeredPlayers.includes(data.playerName));
	const isRoundComplete = $derived(gameData?.roundStatus === 'complete');
	const shareUrl = $derived(browser ? `${window.location.origin}/?gameCode=${data.gameCode}` : '');

	function copyRoomLink() {
		navigator.clipboard.writeText(shareUrl);
		copyStatus = 'Copied!';
		setTimeout(() => (copyStatus = 'Copy Link'), 2000);
	}
</script>

<div class="max-w-6xl mx-auto space-y-12">
	{#if !gameData}
		<div class="h-[60vh] flex flex-col items-center justify-center text-center space-y-6" in:fade>
			<div
				class="w-24 h-24 border-4 border-primary border-t-transparent rounded-full animate-spin"
			></div>
			<p class="text-2xl font-black uppercase tracking-widest text-slate-400">
				Entering the Arena...
			</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
			<!-- Left Column: Game Status & Players -->
			<div class="lg:col-span-4 space-y-8">
				<!-- Game Code Card -->
				<div class="vibrant-card p-8 space-y-6">
					<div class="flex justify-between items-center">
						<h3 class="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Room Code</h3>
						<span
							class="px-3 py-1 bg-primary/20 text-primary text-xs font-black rounded-full uppercase"
							>Live</span
						>
					</div>
					<div
						class="text-5xl font-black font-outfit text-white tracking-widest text-center py-4 bg-white/5 rounded-2xl border border-white/5"
					>
						{data.gameCode}
					</div>
					<button onclick={copyRoomLink} class="w-full py-4 vibrant-btn-secondary text-sm">
						{copyStatus}
					</button>
				</div>

				<!-- Player List -->
				<div class="vibrant-card p-8 space-y-6 overflow-hidden relative">
					<div class="absolute top-0 right-0 p-4 opacity-10">
						<span class="text-6xl">👥</span>
					</div>
					<h3 class="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
						Squad ({players.length})
					</h3>
					<div class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
						{#each players as player}
							<div
								class="flex items-center justify-between p-4 rounded-2xl transition-all duration-300 {answeredPlayers.includes(
									player
								)
									? 'bg-green-500/10 border border-green-500/20'
									: 'bg-white/5 border border-white/5'}"
								in:fly={{ x: -20 }}
							>
								<div class="flex items-center gap-4">
									<div
										class="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-lg font-black border border-white/10"
									>
										{String(player)[0].toUpperCase()}
									</div>
									<span class="font-black text-slate-200">
										{player}
										{player === data.playerName ? '(You)' : ''}
									</span>
								</div>
								{#if answeredPlayers.includes(player)}
									<span class="text-green-500 text-xl">✓</span>
								{/if}
							</div>
						{/each}
					</div>
				</div>

				<!-- Danger Zone -->
				<div class="pt-8">
					<form method="POST" action="?/endGame" use:enhance>
						<button
							class="w-full py-4 text-red-500/60 font-black uppercase tracking-widest hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all duration-300"
						>
							Terminate Session
						</button>
					</form>
				</div>
			</div>

			<!-- Right Column: Question Area & Results -->
			<div class="lg:col-span-8 space-y-12">
				{#if isRoundComplete}
					<div class="space-y-8" in:fly={{ y: 20 }}>
						<div class="vibrant-card p-10 bg-gradient-to-br from-primary/20 to-transparent">
							<div class="space-y-8 text-center">
								<h2 class="text-sm font-black uppercase tracking-[0.3em] text-primary">
									Round Results
								</h2>
								<div class="space-y-4">
									<p class="text-slate-400 font-medium">The question was:</p>
									<p class="text-3xl font-black font-outfit">"{gameData.questions}"</p>
								</div>
								<div
									class="py-10 px-8 bg-black/40 rounded-[2rem] border border-white/5 space-y-4 shadow-inner"
								>
									<p class="text-sm font-black uppercase tracking-widest text-slate-500">
										{gameData.currentAnswerer.name}'s Answer
									</p>
									<p
										class="text-5xl font-black text-green-400 font-outfit uppercase tracking-wider"
									>
										{gameData.correctAnswer}
									</p>
								</div>

								<form method="POST" action="?/nextRound" use:enhance>
									<button class="vibrant-btn-primary px-12 py-6 text-xl"> Start Next Round </button>
								</form>
							</div>
						</div>

						<div class="vibrant-card p-10">
							<h3 class="text-xl font-black uppercase tracking-widest mb-8 text-center">
								Friendship Insights
							</h3>
							<GraphScore gameCode={data.gameCode} />
						</div>
					</div>
				{:else}
					<div class="vibrant-card p-10 md:p-16 space-y-12 relative overflow-hidden">
						<div
							class="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"
						></div>

						<div class="text-center space-y-4">
							<div
								class="inline-block px-4 py-2 bg-white/5 rounded-full border border-white/5 text-xs font-black uppercase tracking-[0.2em] text-slate-400"
							>
								Round In Progress
							</div>
							<h2 class="text-4xl md:text-5xl font-black font-outfit leading-tight">
								{gameData.questions || 'Waiting for question...'}
							</h2>
						</div>

						{#if hasAnswered}
							<div
								class="text-center py-20 px-10 border-2 border-dashed border-white/10 rounded-[2.5rem] bg-white/5 space-y-6"
								in:scale
							>
								<div
									class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/20 text-4xl"
								>
									✓
								</div>
								<h3 class="text-2xl font-black uppercase tracking-widest">Locked In!</h3>
								<p class="text-slate-400 font-medium max-w-sm mx-auto">
									Waiting for {players.length - answeredPlayers.length} more {players.length -
										answeredPlayers.length ===
									1
										? 'legend'
										: 'legends'} to answer.
								</p>
							</div>
						{:else}
							<form
								method="POST"
								action="?/submitAnswer"
								use:enhance
								class="space-y-8"
								in:fade={{ delay: 300 }}
							>
								<div class="space-y-4 text-center">
									<p class="text-slate-400 font-medium text-lg">
										{#if isAnswerer}
											Be honest! How would you answer this?
										{:else}
											How do you think <span class="text-primary font-black"
												>{gameData.currentAnswerer.name}</span
											> answered?
										{/if}
									</p>
									<input
										type="text"
										name="answer"
										required
										placeholder="Your answer here..."
										class="vibrant-input text-center text-2xl font-black"
										autocomplete="off"
									/>
								</div>
								<button type="submit" class="w-full vibrant-btn-primary py-8 text-2xl">
									Confirm Answer
								</button>
							</form>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 4px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(139, 92, 246, 0.3);
		border-radius: 10px;
	}
</style>
