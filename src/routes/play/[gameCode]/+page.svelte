<script lang="ts">
	import { db } from '../../../firebase/firebase';
	import { ref, onValue } from 'firebase/database';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';

	import SquadList from '$lib/components/SquadList.svelte';
	import QuestionCard from '$lib/components/QuestionCard.svelte';
	import RoundResults from '$lib/components/RoundResults.svelte';

	let { data, form } = $props<{ data: any; form: any }>();

	let gameData = $state<any>(null);
	let players = $state<string[]>([]);
	let answeredPlayers = $state<string[]>([]);

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
				<p class="text-2xl font-black uppercase tracking-[0.4em] text-white">Synchronizing</p>
				<p class="text-slate-500 font-medium uppercase tracking-widest text-xs">
					Connecting to Neural Network...
				</p>
			</div>
		</div>
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
			<!-- Main Area: Action & Intel (Top on mobile) -->
			<div class="lg:col-span-8 order-1 lg:order-2">
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
					/>
				{/if}
			</div>

			<!-- Side Panel: Status & Players (Bottom on mobile) -->
			<div class="lg:col-span-4 space-y-8 sticky top-8 order-2 lg:order-1">
				<SquadList
					{players}
					{answeredPlayers}
					currentPlayerName={data.playerName}
					gameCode={data.gameCode}
				/>

				<div class="pt-4">
					<form method="POST" action="?/endGame" use:enhance>
						<button
							class="w-full py-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] hover:text-red-500 hover:bg-red-500/5 rounded-2xl transition-all duration-500 border border-transparent hover:border-red-500/10"
						>
							Terminate Session
						</button>
					</form>
				</div>
			</div>
		</div>
	{/if}
</div>
