<script lang="ts">
	import { db } from '../../firebase/firebase';
	import { onValue, ref } from 'firebase/database';
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';

	let {
		players = [],
		answeredPlayers = [],
		gameCode,
		currentPlayerName,
		targetPlayerName,
		demoMode = false
	} = $props<{
		players?: string[];
		answeredPlayers?: string[];
		gameCode?: string;
		currentPlayerName?: string;
		targetPlayerName?: string;
		demoMode?: boolean;
	}>();

	interface ScoreData {
		[playerID: string]: {
			[otherPlayerID: string]: {
				accuracyPercentage: number;
			};
		};
	}

	let scoreData = $state<ScoreData>({});
	let hoveredPlayer = $state<string | null>(null);

	// Demo Mode Data
	const demoPlayers = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z',
		'AA',
		'AB',
		'AC',
		'AD'
	];
	let demoScores = $state<ScoreData>({});

	// Use real props or demo data
	const activePlayers = $derived(demoMode ? demoPlayers : players);
	const activeScoreData = $derived(demoMode ? demoScores : scoreData);
	// Always show data in demo mode
	const hasData = $derived(demoMode || Object.keys(scoreData).length > 0);

	// SVG Constants
	// Massive scale for maximum impact
	const size = 1000;
	const center = size / 2;
	// Large radius for spacious node placement
	const radius = 400;

	// Adaptive Sizing
	const isLargeGroup = $derived(activePlayers.length > 6);
	const nodeRadius = $derived(isLargeGroup ? 25 : 35);
	const labelOffset = $derived(isLargeGroup ? 45 : 60);

	const nodePositions = $derived(
		activePlayers.map((name: string, i: number) => {
			const angle = (i / activePlayers.length) * 2 * Math.PI - Math.PI / 2;
			return {
				name,
				x: center + radius * Math.cos(angle),
				y: center + radius * Math.sin(angle),
				angle
			};
		})
	);

	// Get unique pairs for rendering average connections
	const uniquePairs = $derived.by(() => {
		const pairs = [];
		for (let i = 0; i < nodePositions.length; i++) {
			for (let j = i + 1; j < nodePositions.length; j++) {
				pairs.push({ start: nodePositions[i], end: nodePositions[j] });
			}
		}
		return pairs;
	});

	function getPath(start: { x: number; y: number }, end: { x: number; y: number }) {
		return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
	}

	function getAverageScore(p1: string, p2: string) {
		const s1 = activeScoreData[p1]?.[p2]?.accuracyPercentage || 0;
		const s2 = activeScoreData[p2]?.[p1]?.accuracyPercentage || 0;
		return (s1 + s2) / 2;
	}

	function interpolateColor(score: number) {
		let r, g, b;
		if (score <= 50) {
			// Red to Orange
			const t = score / 50;
			r = Math.round(239 + (249 - 239) * t);
			g = Math.round(68 + (115 - 68) * t);
			b = Math.round(68 + (22 - 68) * t);
		} else {
			// Orange to Green
			const t = (score - 50) / 50;
			r = Math.round(249 + (16 - 249) * t);
			g = Math.round(115 + (185 - 115) * t);
			b = Math.round(22 + (129 - 22) * t);
		}
		return `rgb(${r}, ${g}, ${b})`;
	}

	function getConnectionOpacity(score: number, isHighlighted: boolean) {
		if (hoveredPlayer && !isHighlighted) return 0.05;
		const baseOpacity = isLargeGroup ? 0.1 : 0.2;
		return Math.max(baseOpacity, (score / 100) * 0.5);
	}

	onMount(() => {
		if (demoMode) {
			// Generate random scores for demo
			const newScores: ScoreData = {};
			demoPlayers.forEach((p1) => {
				newScores[p1] = {};
				demoPlayers.forEach((p2) => {
					if (p1 !== p2) {
						// Bias towards active connections for visual interest
						newScores[p1][p2] = {
							accuracyPercentage: Math.floor(Math.random() * 100)
						};
					}
				});
			});
			demoScores = newScores;

			// Auto-hover randomly for effect
			const interval = setInterval(() => {
				const randomIdx = Math.floor(Math.random() * demoPlayers.length);
				hoveredPlayer = demoPlayers[randomIdx];
			}, 3000);

			return () => clearInterval(interval);
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
		<div class="relative w-full py-4 flex justify-center" in:fade>
			<!-- Graph: Allow full width scaling -->
			<svg
				viewBox="0 0 {size} {size}"
				class="w-full max-w-[1200px] h-auto drop-shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-visible"
			>
				<!-- Connections -->
				{#each uniquePairs as pair}
					{@const score = getAverageScore(pair.start.name, pair.end.name)}
					{@const color = interpolateColor(score)}
					{@const isHighlighted =
						hoveredPlayer === pair.start.name || hoveredPlayer === pair.end.name}
					{@const path = getPath(pair.start, pair.end)}

					<!-- Base Line -->
					<path
						d={path}
						fill="none"
						stroke={color}
						stroke-width={isLargeGroup ? 1.5 : 2.5}
						stroke-opacity={getConnectionOpacity(score, isHighlighted)}
						stroke-linecap="round"
						class="transition-all duration-500"
					/>

					<!-- Hover Particles (Bidirectional) -->
					{#if isHighlighted}
						{@const scoreAB =
							activeScoreData[pair.start.name]?.[pair.end.name]?.accuracyPercentage || 0}
						{@const scoreBA =
							activeScoreData[pair.end.name]?.[pair.start.name]?.accuracyPercentage || 0}

						<!-- Flow A -> B (Color based on A's accuracy on B) -->
						<circle r="3" fill={interpolateColor(scoreAB)}>
							<animateMotion
								dur="{1.5}s"
								repeatCount="indefinite"
								{path}
								keyPoints="0;1"
								keyTimes="0;1"
							/>
						</circle>
						<!-- Flow B -> A (Color based on B's accuracy on A) -->
						<circle r="3" fill={interpolateColor(scoreBA)}>
							<animateMotion
								dur="{1.5}s"
								repeatCount="indefinite"
								{path}
								keyPoints="1;0"
								keyTimes="0;1"
							/>
						</circle>
					{/if}
				{/each}

				<!-- Player Nodes -->
				{#each nodePositions as node}
					{@const labelRadius = labelOffset}
					{@const labelX = center + (radius + labelRadius) * Math.cos(node.angle)}
					{@const labelY = center + (radius + labelRadius) * Math.sin(node.angle)}
					{@const isTarget = node.name === targetPlayerName}
					{@const isAnswered = answeredPlayers?.includes(node.name)}

					<!-- svelte-ignore a11y_mouse_events_have_key_events -->
					<g
						class="cursor-pointer group"
						onmouseover={() => (hoveredPlayer = node.name)}
						onmouseout={() => (hoveredPlayer = null)}
					>
						<!-- Target Focus Ring -->
						{#if isTarget}
							<circle cx={node.x} cy={node.y} r={nodeRadius + 15} fill="#f97316" fill-opacity="0.1">
								<animate
									attributeName="r"
									values="{nodeRadius + 12};{nodeRadius + 20};{nodeRadius + 12}"
									dur="2s"
									repeatCount="indefinite"
								/>
								<animate
									attributeName="fill-opacity"
									values="0.15;0.05;0.15"
									dur="2s"
									repeatCount="indefinite"
								/>
							</circle>
						{/if}

						<!-- Hover Glow -->
						{#if hoveredPlayer === node.name}
							<circle
								cx={node.x}
								cy={node.y}
								r={nodeRadius + 10}
								fill="white"
								fill-opacity="0.1"
								transition:fade
							/>
						{/if}

						<!-- Node Body -->
						<circle
							cx={node.x}
							cy={node.y}
							r={nodeRadius}
							class="transition-all duration-300 {isTarget
								? 'fill-dark-bg stroke-primary stroke-[3]'
								: 'fill-dark-bg stroke-white/20 group-hover:stroke-primary group-hover:stroke-[2]'}"
						/>

						<!-- Initial -->
						<text
							x={node.x}
							y={node.y}
							dy=".32em"
							text-anchor="middle"
							class="{isTarget ? 'fill-primary' : 'fill-white'} {isLargeGroup
								? 'text-[12px]'
								: 'text-[16px]'} font-black font-outfit pointer-events-none"
						>
							{node.name[0].toUpperCase()}
						</text>

						<!-- Sync Indicator -->
						{#if isAnswered}
							<circle
								cx={node.x + nodeRadius * 0.7}
								cy={node.y - nodeRadius * 0.7}
								r={isLargeGroup ? 6 : 7}
								fill="#10b981"
								class="stroke-dark-bg"
								stroke-width="2"
							/>
							<path
								d="M {node.x + nodeRadius * 0.7 - 2} {node.y - nodeRadius * 0.7} l 1.5 1.5 l 3 -3"
								fill="none"
								stroke="white"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						{/if}

						<!-- Label -->
						<text
							x={labelX}
							y={labelY}
							text-anchor={Math.cos(node.angle) > 0 ? 'start' : 'end'}
							class="{isTarget ? 'fill-primary' : 'fill-slate-500'} {isLargeGroup
								? 'text-[8px]'
								: 'text-[10px]'} font-black uppercase tracking-widest pointer-events-none transition-all duration-300 {hoveredPlayer ===
							node.name
								? 'fill-white'
								: ''}"
						>
							{node.name}
							{#if node.name === currentPlayerName}
								<tspan fill="#f97316" dx="5">(YOU)</tspan>
							{/if}
						</text>
					</g>
				{/each}
			</svg>

			<!-- Detailed Overlay (Corner Positioned) -->
			<!-- Only show overlay if NOT in demo mode, or maybe show it for effect? Let's hide it for demo mode to keep it ambient. -->
			{#if hoveredPlayer && !demoMode}
				<div
					class="fixed bottom-4 inset-x-4 md:absolute md:top-0 md:right-0 md:bottom-auto md:left-auto pointer-events-none flex justify-center md:block z-50"
					transition:fade={{ duration: 200 }}
				>
					<div
						class="bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl min-w-[280px] w-full max-w-sm"
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
								{@const myGuess = Math.round(
									activeScoreData[hoveredPlayer]?.[target]?.accuracyPercentage || 0
								)}
								{@const theirGuess = Math.round(
									activeScoreData[target]?.[hoveredPlayer]?.accuracyPercentage || 0
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
			{/if}
		</div>
	{/if}
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
