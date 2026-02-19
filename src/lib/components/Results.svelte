<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import SynergyMatrix from './SynergyMatrix.svelte';
	import type { ScoreData } from '../utils/demoData';

	let {
		players = [],
		scoreData = {},
		playerName,
		gameCode
	}: {
		players: string[];
		scoreData: ScoreData;
		playerName: string;
		gameCode: string;
	} = $props();

	// Calculate overall average for each player (how well they know others)
	const playerPerformance = $derived(
		players
			.map((guesser: string) => {
				let totalAccuracy = 0;
				let count = 0;
				players.forEach((answerer: string) => {
					if (guesser !== answerer && scoreData[guesser]?.[answerer]) {
						totalAccuracy += scoreData[guesser][answerer].accuracyPercentage;
						count++;
					}
				});
				return {
					name: guesser,
					avg: count > 0 ? Math.round(totalAccuracy / count) : 0
				};
			})
			.sort((a: { name: string; avg: number }, b: { name: string; avg: number }) => b.avg - a.avg)
	);

	const winner = $derived(playerPerformance[0]);

	// Who knows ME best?
	const whoKnowsMeBest = $derived(
		players
			.filter((p: string) => p !== playerName)
			.map((guesser: string) => ({
				name: guesser,
				accuracy: scoreData[guesser]?.[playerName]?.accuracyPercentage || 0
			}))
			.sort(
				(a: { name: string; accuracy: number }, b: { name: string; accuracy: number }) =>
					b.accuracy - a.accuracy
			)
	);

	// Who do I know best?
	const whoIKnowBest = $derived(
		players
			.filter((p: string) => p !== playerName)
			.map((answerer: string) => ({
				name: answerer,
				accuracy: scoreData[playerName]?.[answerer]?.accuracyPercentage || 0
			}))
			.sort(
				(a: { name: string; accuracy: number }, b: { name: string; accuracy: number }) =>
					b.accuracy - a.accuracy
			)
	);
</script>

<div class="max-w-6xl mx-auto w-full space-y-16 pb-24" in:fade={{ duration: 1000 }}>
	<!-- Winner Hero -->
	<div
		class="relative py-20 text-center overflow-hidden rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-3xl"
	>
		<div
			class="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent"
		></div>

		<!-- Floating Particles (Decorative) -->
		<div class="absolute inset-0 pointer-events-none opacity-50">
			{#each Array(20) as _}
				<div
					class="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
					style="top: {Math.random() * 100}%; left: {Math.random() *
						100}%; animation-delay: {Math.random() * 5}s"
				></div>
			{/each}
		</div>

		<div class="relative z-10 space-y-6">
			<div in:fly={{ y: 20, duration: 800 }}>
				<p class="text-xs font-black uppercase tracking-[0.5em] text-primary mb-4">The Winner</p>
				<h1
					class="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-2xl"
				>
					{winner.name}
				</h1>
			</div>

			<div class="flex justify-center gap-4" in:fly={{ y: 20, duration: 800, delay: 200 }}>
				<div class="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
					<p class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
						Average Knowledge
					</p>
					<p class="text-4xl font-black text-white">
						{winner.avg}<span class="text-primary">%</span>
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Graphs Section -->
	<div class="grid lg:grid-cols-3 gap-8">
		<!-- Leaderboard Card -->
		<div
			class="bg-white/5 border border-white/10 p-8 rounded-[32px] space-y-8 backdrop-blur-xl h-fit"
		>
			<h2 class="text-xs font-black uppercase tracking-[0.4em] text-slate-500">
				Overall Standings
			</h2>
			<div class="space-y-6">
				{#each playerPerformance as player, i}
					<div class="space-y-2 group">
						<div class="flex justify-between items-end">
							<span class="text-sm font-black text-white uppercase tracking-wider"
								>{player.name}</span
							>
							<span class="text-xs font-mono text-primary font-black">{player.avg}%</span>
						</div>
						<div class="h-2 w-full bg-white/5 rounded-full overflow-hidden">
							<div
								class="h-full bg-gradient-to-r from-primary/40 to-primary transition-all duration-1000 ease-out"
								style="width: {player.avg}%"
								in:fly={{ x: -100, duration: 1000, delay: i * 100 }}
							></div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Personal Insights -->
		<div class="lg:col-span-2 grid md:grid-cols-2 gap-8">
			<!-- Who Knows Me Best -->
			<div class="bg-white/5 border border-white/10 p-8 rounded-[32px] space-y-8 backdrop-blur-xl">
				<h2 class="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
					Who Knows You Best?
				</h2>
				<div class="space-y-6">
					{#each whoKnowsMeBest as player, i}
						<div class="space-y-2">
							<div class="flex justify-between items-end">
								<span class="text-sm font-black text-white uppercase tracking-wider"
									>{player.name}</span
								>
								<span class="text-xs font-mono text-slate-400">{player.accuracy}%</span>
							</div>
							<div class="h-2 w-full bg-white/5 rounded-full overflow-hidden">
								<div
									class="h-full bg-primary/40 group-hover:bg-primary transition-all duration-1000"
									style="width: {player.accuracy}%"
									in:fly={{ x: -50, duration: 1000, delay: 500 + i * 100 }}
								></div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Who I Know Best -->
			<div class="bg-white/5 border border-white/10 p-8 rounded-[32px] space-y-8 backdrop-blur-xl">
				<h2 class="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
					Who Do You Know Best?
				</h2>
				<div class="space-y-6">
					{#each whoIKnowBest as player, i}
						<div class="space-y-2">
							<div class="flex justify-between items-end">
								<span class="text-sm font-black text-white uppercase tracking-wider"
									>{player.name}</span
								>
								<span class="text-xs font-mono text-slate-400">{player.accuracy}%</span>
							</div>
							<div class="h-2 w-full bg-white/5 rounded-full overflow-hidden">
								<div
									class="h-full bg-white/20 transition-all duration-1000"
									style="width: {player.accuracy}%"
									in:fly={{ x: -50, duration: 1000, delay: 500 + i * 100 }}
								></div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Final Matrix View -->
	<div class="space-y-8">
		<div class="text-center">
			<h2 class="text-xs font-black uppercase tracking-[0.4em] text-slate-500">
				Full Synergy Matrix
			</h2>
		</div>
		<div class="max-w-6xl mx-auto bg-white/5 p-8 rounded-[40px] border border-white/10">
			<SynergyMatrix {players} {gameCode} currentPlayerName={playerName} />
		</div>
	</div>

	<!-- Exit -->
	<div class="flex justify-center pt-8">
		<a
			href="/"
			class="px-8 py-4 bg-white/10 hover:bg-white/20 transition-all rounded-2xl text-xs font-black uppercase tracking-[0.3em] text-white border border-white/10"
		>
			Play Again
		</a>
	</div>
</div>
