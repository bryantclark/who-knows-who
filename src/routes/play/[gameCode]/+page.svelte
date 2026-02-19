<script lang="ts">
	import { db } from '$lib/firebase/firebase';
	import { ref, onValue } from 'firebase/database';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { browser } from '$app/environment';
	import { fade } from 'svelte/transition';

	import QuestionCard from '$lib/components/QuestionCard.svelte';
	import RoundResults from '$lib/components/RoundResults.svelte';
	import SynergyMatrix from '$lib/components/SynergyMatrix.svelte';
	import Lobby from '$lib/components/Lobby.svelte';
	import Results from '$lib/components/Results.svelte';

	let { data, form } = $props<{ data: any; form: any }>();

	let gameData = $state<any>(null);
	let players = $state<string[]>([]);
	let answeredPlayers = $state<string[]>([]);
	let scoreData = $state<any>({});

	onMount(() => {
		const gameRef = ref(db, `gamecode/${data.gameCode}`);
		const unsubscribe = onValue(gameRef, (snapshot) => {
			if (snapshot.exists()) {
				gameData = snapshot.val();
				players = gameData.players ? Object.keys(gameData.players) : [];
				answeredPlayers = gameData.answeredPlayers ? Object.keys(gameData.answeredPlayers) : [];
				scoreData = gameData.scores || {};
			}
		});

		return () => unsubscribe();
	});

	const isAnswerer = $derived(gameData?.currentAnswerer?.name === data.playerName);
	const hasAnswered = $derived(answeredPlayers.includes(data.playerName));
	const isRoundComplete = $derived(gameData?.roundStatus === 'complete');
	const gameStatus = $derived(gameData?.status || 'waiting');
</script>

<div class="max-w-7xl mx-auto px-4 py-8 md:py-12" in:fade={{ duration: 800 }}>
	{#if !gameData}
		<div class="h-[70vh] flex flex-col items-center justify-center text-center space-y-8" in:fade>
			<div class="relative">
				<div
					class="w-20 h-20 border-2 border-primary/20 rounded-full animate-ping absolute inset-0"
				></div>
				<div
					class="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin"
				></div>
			</div>
			<div class="space-y-2">
				<p class="text-2xl font-black uppercase tracking-[0.4em] text-white">Syncing</p>
				<p class="text-slate-500 font-medium uppercase tracking-widest text-xs">Connecting...</p>
			</div>
		</div>
	{:else if gameStatus === 'waiting'}
		<Lobby gameCode={data.gameCode} {players} playerName={data.playerName} host={gameData.host} />
	{:else if gameStatus === 'finished'}
		<Results {players} {scoreData} playerName={data.playerName} gameCode={data.gameCode} />
	{:else}
		<div class="space-y-12">
			<!-- Main Action Area -->
			<div class="max-w-4xl mx-auto w-full relative">
				{#if isRoundComplete}
					<RoundResults
						questions={gameData.questions}
						currentAnswererName={gameData.currentAnswerer.name}
						correctAnswer={gameData.correctAnswer}
						gameCode={data.gameCode}
					/>
				{:else}
					<QuestionCard
						questions={gameData.questions}
						{isAnswerer}
						currentAnswererName={gameData.currentAnswerer?.name}
						{hasAnswered}
						playersCount={players.length}
						answeredPlayersCount={answeredPlayers.length}
						gameCode={data.gameCode}
					/>
				{/if}

				<div class="pt-4 max-w-5xl mx-auto w-full">
					<SynergyMatrix
						{players}
						{answeredPlayers}
						gameCode={data.gameCode}
						currentPlayerName={data.playerName}
						targetPlayerName={gameData.currentAnswerer?.name}
					/>
				</div>

				<!-- Simplified Exit -->
				<form method="POST" action="?/endGame" use:enhance class="fixed top-6 left-6 z-50">
					<button
						class="px-5 py-2 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all"
					>
						Leave
					</button>
				</form>
			</div>
		</div>
	{/if}
</div>
