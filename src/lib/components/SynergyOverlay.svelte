<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { ScoreData } from '../utils/demoData';

	let { hoveredPlayer, activePlayers, scoreData } = $props<{
		hoveredPlayer: string;
		activePlayers: string[];
		scoreData: ScoreData;
	}>();

	function interpolateColor(score: number) {
		let r, g, b;
		if (score <= 50) {
			const t = score / 50;
			r = Math.round(239 + (249 - 239) * t);
			g = Math.round(68 + (115 - 68) * t);
			b = Math.round(68 + (22 - 68) * t);
		} else {
			const t = (score - 50) / 50;
			r = Math.round(249 + (16 - 249) * t);
			g = Math.round(115 + (185 - 115) * t);
			b = Math.round(22 + (129 - 22) * t);
		}
		return `rgb(${r}, ${g}, ${b})`;
	}
</script>

<div
	class="fixed bottom-4 inset-x-4 md:absolute md:top-0 md:right-0 md:bottom-auto md:left-auto pointer-events-none flex justify-center md:block z-50"
	transition:fade={{ duration: 200 }}
>
	<div
		class="bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl min-w-[280px] w-full max-w-sm"
	>
		<div class="flex items-center gap-3 mb-4 border-b border-white/5 pb-4">
			<div
				class="w-10 h-10 rounded-xl bg-surface-lighter border border-white/10 flex items-center justify-center text-sm font-black text-white shadow-lg"
			>
				{hoveredPlayer[0].toUpperCase()}
			</div>
			<div>
				<h4 class="text-lg font-black text-white leading-none tracking-wide">
					{hoveredPlayer}
				</h4>
				<p class="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">
					Relationship Data
				</p>
			</div>
		</div>

		<div class="space-y-1.5 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
			{#each activePlayers.filter((p: string) => p !== hoveredPlayer) as target}
				{@const myGuess = Math.round(scoreData[hoveredPlayer]?.[target]?.accuracyPercentage || 0)}
				{@const theirGuess = Math.round(
					scoreData[target]?.[hoveredPlayer]?.accuracyPercentage || 0
				)}
				<div class="flex items-center justify-between py-2 px-3 rounded-xl bg-white/[0.03]">
					<span class="text-xs font-bold text-slate-300 w-20 truncate">{target}</span>

					<div class="flex items-center gap-6">
						<!-- Knows Them -->
						<div class="flex flex-col items-end">
							<span class="text-xs font-black" style="color: {interpolateColor(myGuess)}"
								>{myGuess}%</span
							>
							<span class="text-[6px] uppercase tracking-wider text-slate-600 font-bold"
								>Knows Them</span
							>
						</div>

						<!-- Divider -->
						<div class="w-px h-6 bg-white/10"></div>

						<!-- Known By -->
						<div class="flex flex-col items-start">
							<span class="text-xs font-black" style="color: {interpolateColor(theirGuess)}"
								>{theirGuess}%</span
							>
							<span class="text-[6px] uppercase tracking-wider text-slate-600 font-bold"
								>Known By</span
							>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 4px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.02);
		border-radius: 10px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
	}
</style>
