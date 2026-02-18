<script lang="ts">
	import { db } from '../../firebase/firebase';
	import { onValue, ref } from 'firebase/database';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { gameCode } = $props<{ gameCode: string }>();

	interface ScoreData {
		[playerID: string]: {
			[otherPlayerID: string]: {
				accuracyPercentage: number;
			};
		};
	}

	let scoreData = $state<ScoreData>({});
	let players = $derived(Object.keys(scoreData));

	onMount(() => {
		const scoresRef = ref(db, `gamecode/${gameCode}/scores`);
		const unsubscribe = onValue(scoresRef, (snapshot) => {
			if (snapshot.exists()) {
				scoreData = snapshot.val();
			}
		});
		return () => unsubscribe();
	});

	function getSynergyColor(score: number) {
		if (score >= 80) return 'rgba(16, 185, 129, 0.2)'; // Success
		if (score >= 50) return 'rgba(99, 102, 241, 0.2)'; // Primary
		if (score > 0) return 'rgba(244, 63, 94, 0.1)'; // Secondary
		return 'rgba(255, 255, 255, 0.02)';
	}

	function getTextColor(score: number) {
		if (score >= 80) return 'text-success';
		if (score >= 50) return 'text-primary';
		if (score > 0) return 'text-secondary';
		return 'text-white/10';
	}
</script>

<div class="vibrant-card-premium p-1 md:p-2 bg-gradient-to-br from-white/5 to-transparent">
	<div class="bg-dark-bg/80 backdrop-blur-3xl rounded-[2.3rem] p-8 md:p-12 space-y-10">
		<div class="space-y-2 text-center">
			<h2 class="text-[10px] font-black uppercase tracking-[0.5em] text-primary">
				Neural Link Analysis
			</h2>
			<p class="text-white font-outfit font-black text-2xl uppercase tracking-tighter">
				Squad Synergy Matrix
			</p>
		</div>

		{#if players.length === 0}
			<div
				class="py-20 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[2rem] bg-white/[0.01]"
			>
				<p class="text-slate-600 font-black uppercase tracking-widest text-xs">
					Awaiting connection data...
				</p>
			</div>
		{:else}
			<div class="overflow-x-auto custom-scrollbar pb-4" in:fade>
				<table class="w-full border-separate border-spacing-2">
					<thead>
						<tr>
							<th class="p-4"></th>
							{#each players as player}
								<th class="p-4 text-center">
									<div
										class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto"
									>
										<span class="text-xs font-black text-slate-400">{player[0].toUpperCase()}</span>
									</div>
									<p
										class="text-[8px] font-black uppercase tracking-widest text-slate-500 mt-2 truncate max-w-[60px]"
									>
										{player}
									</p>
								</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each players as guesser}
							<tr>
								<td class="p-4 text-right">
									<p
										class="text-[8px] font-black uppercase tracking-widest text-slate-500 truncate max-w-[80px]"
									>
										{guesser}
									</p>
								</td>
								{#each players as target}
									<td class="p-1">
										<div
											class="aspect-square w-16 md:w-20 rounded-2xl border flex flex-col items-center justify-center transition-all duration-700 relative overflow-hidden group {guesser ===
											target
												? 'border-white/5 opacity-20'
												: 'border-white/10 hover:border-white/30'}"
											style="background: {guesser === target
												? 'transparent'
												: getSynergyColor(scoreData[guesser]?.[target]?.accuracyPercentage || 0)}"
										>
											{#if guesser !== target}
												<span
													class="text-lg md:text-xl font-black font-outfit {getTextColor(
														scoreData[guesser]?.[target]?.accuracyPercentage || 0
													)}"
												>
													{Math.round(scoreData[guesser]?.[target]?.accuracyPercentage || 0)}%
												</span>
												<div
													class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
												></div>
											{:else}
												<div class="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
											{/if}
										</div>
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<div class="flex flex-wrap justify-center gap-6 pt-4 border-t border-white/5">
				<div class="flex items-center gap-2">
					<div class="w-2.5 h-2.5 rounded-full bg-success/40 border border-success/60"></div>
					<span class="text-[8px] font-black uppercase tracking-widest text-slate-500"
						>Mind Reader (80%+)</span
					>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-2.5 h-2.5 rounded-full bg-primary/40 border border-primary/60"></div>
					<span class="text-[8px] font-black uppercase tracking-widest text-slate-500"
						>True Friend (50%+)</span
					>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-2.5 h-2.5 rounded-full bg-secondary/20 border border-secondary/40"></div>
					<span class="text-[8px] font-black uppercase tracking-widest text-slate-500"
						>Stranger (0%+)</span
					>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		height: 4px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.02);
		border-radius: 10px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
	}
</style>
