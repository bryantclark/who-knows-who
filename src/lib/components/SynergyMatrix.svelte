<script lang="ts">
	import { db } from '$lib/firebase/firebase';
	import { onValue, ref } from 'firebase/database';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { generateDemoScores, DEMO_PLAYERS, type ScoreData } from '../utils/demoData';
	import SynergyGraph from './SynergyGraph.svelte';
	import SynergyOverlay from './SynergyOverlay.svelte';

	let {
		players = [],
		answeredPlayers = [],
		gameCode,
		currentPlayerName,
		targetPlayerName,
		demoMode = false,
		isStatic = false
	} = $props<{
		players?: string[];
		answeredPlayers?: string[];
		gameCode?: string;
		currentPlayerName?: string;
		targetPlayerName?: string;
		demoMode?: boolean;
		isStatic?: boolean;
	}>();

	let scoreData = $state<ScoreData>({});
	let hoveredPlayer = $state<string | null>(null);
	let demoScores = $state<ScoreData>({});

	// Use real props or demo data
	const activePlayers = $derived(demoMode ? DEMO_PLAYERS : players);
	const activeScoreData = $derived(demoMode ? demoScores : scoreData);
	// Always show data in demo mode
	const hasData = $derived(demoMode || Object.keys(scoreData).length > 0);

	function setHoveredPlayer(name: string | null) {
		if (!isStatic) {
			hoveredPlayer = name;
		}
	}

	onMount(() => {
		if (demoMode) {
			demoScores = generateDemoScores(DEMO_PLAYERS);

			if (!isStatic) {
				// Auto-hover randomly for effect
				const interval = setInterval(() => {
					const randomIdx = Math.floor(Math.random() * DEMO_PLAYERS.length);
					hoveredPlayer = DEMO_PLAYERS[randomIdx];
				}, 3000);

				return () => clearInterval(interval);
			}
		} else if (gameCode) {
			const scoresRef = ref(db, `gamecode/${gameCode}/scores`);
			const unsubscribe = onValue(scoresRef, (snapshot) => {
				if (snapshot.exists()) {
					scoreData = snapshot.val();
				}
			});
			return () => unsubscribe();
		}
	});
</script>

<div class="relative w-full flex flex-col items-center">
	{#if !hasData}
		<div class="text-center space-y-4 py-12" in:fade>
			<p class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 animate-pulse">
				Waiting for data...
			</p>
			<div class="flex justify-center gap-2">
				{#each activePlayers as player}
					<div
						class="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-slate-400"
					>
						{player[0].toUpperCase()}
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<SynergyGraph
			players={activePlayers}
			scoreData={activeScoreData}
			{hoveredPlayer}
			{setHoveredPlayer}
			{currentPlayerName}
			{targetPlayerName}
			{answeredPlayers}
		/>

		<!-- Detailed Overlay (Corner Positioned) -->
		{#if hoveredPlayer && !demoMode}
			<SynergyOverlay {hoveredPlayer} {activePlayers} scoreData={activeScoreData} />
		{/if}
	{/if}
</div>
