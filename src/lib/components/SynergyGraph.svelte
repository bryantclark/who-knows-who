<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { ScoreData } from '../utils/demoData';

	let {
		players,
		scoreData,
		hoveredPlayer,
		setHoveredPlayer,
		currentPlayerName,
		targetPlayerName,
		answeredPlayers
	} = $props<{
		players: string[];
		scoreData: ScoreData;
		hoveredPlayer: string | null;
		setHoveredPlayer: (name: string | null) => void;
		currentPlayerName?: string;
		targetPlayerName?: string;
		answeredPlayers?: string[];
	}>();

	// SVG Constants
	const size = 1000;
	const center = size / 2;
	const radius = 400;

	// Adaptive Sizing
	const isLargeGroup = $derived(players.length > 6);
	const nodeRadius = $derived(isLargeGroup ? 25 : 35);
	const labelOffset = $derived(isLargeGroup ? 45 : 60);

	const nodePositions = $derived(
		players.map((name: string, i: number) => {
			const angle = (i / players.length) * 2 * Math.PI - Math.PI / 2;
			return {
				name,
				x: center + radius * Math.cos(angle),
				y: center + radius * Math.sin(angle),
				angle
			};
		})
	);

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
		const s1 = scoreData[p1]?.[p2]?.accuracyPercentage || 0;
		const s2 = scoreData[p2]?.[p1]?.accuracyPercentage || 0;
		return (s1 + s2) / 2;
	}

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

	function getConnectionOpacity(score: number, isHighlighted: boolean) {
		if (hoveredPlayer && !isHighlighted) return 0.05;
		const baseOpacity = isLargeGroup ? 0.1 : 0.2;
		return Math.max(baseOpacity, (score / 100) * 0.5);
	}
</script>

<div class="relative w-full py-4 flex justify-center" in:fade>
	<svg
		viewBox="0 0 {size} {size}"
		class="w-full max-w-[1200px] h-auto drop-shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-visible"
	>
		<!-- Connections -->
		{#each uniquePairs as pair}
			{@const score = getAverageScore(pair.start.name, pair.end.name)}
			{@const color = interpolateColor(score)}
			{@const isHighlighted = hoveredPlayer === pair.start.name || hoveredPlayer === pair.end.name}
			{@const path = getPath(pair.start, pair.end)}

			<path
				d={path}
				fill="none"
				stroke={color}
				stroke-width={isLargeGroup ? 1.5 : 2.5}
				stroke-opacity={getConnectionOpacity(score, isHighlighted)}
				stroke-linecap="round"
				class="transition-all duration-500"
			/>

			{#if isHighlighted}
				{@const scoreAB = scoreData[pair.start.name]?.[pair.end.name]?.accuracyPercentage || 0}
				{@const scoreBA = scoreData[pair.end.name]?.[pair.start.name]?.accuracyPercentage || 0}

				<!-- Flow A -> B (Color based on A's accuracy on B) -->
				<circle
					r="3"
					fill={interpolateColor(scoreAB)}
					class="animate-particle-flow"
					style="offset-path: path('{path}');"
				/>
				<!-- Flow B -> A (Color based on B's accuracy on A) -->
				<circle
					r="3"
					fill={interpolateColor(scoreBA)}
					class="animate-particle-flow-reverse"
					style="offset-path: path('{path}');"
				/>
			{/if}
		{/each}

		<!-- Player Nodes -->
		{#each nodePositions as node}
			{@const labelRadius = labelOffset}
			{@const labelX = center + (radius + labelRadius) * Math.cos(node.angle)}
			{@const labelY = center + (radius + labelRadius) * Math.sin(node.angle)}
			{@const isTarget = node.name === targetPlayerName}
			{@const isAnswered = answeredPlayers?.includes(node.name)}

			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_mouse_events_have_key_events -->
			<g
				class="cursor-pointer group"
				onmouseover={() => setHoveredPlayer(node.name)}
				onmouseout={() => setHoveredPlayer(null)}
				role="img"
				aria-label="Player {node.name}"
				style="--node-radius: {nodeRadius}px;"
			>
				{#if isTarget}
					<circle
						cx={node.x}
						cy={node.y}
						r={nodeRadius + 15}
						fill="#f97316"
						fill-opacity="0.1"
						class="animate-target-pulse"
					/>
				{/if}

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

				<circle
					cx={node.x}
					cy={node.y}
					r={nodeRadius}
					class="transition-all duration-300 {isTarget
						? 'fill-dark-bg stroke-primary stroke-[3]'
						: 'fill-dark-bg stroke-white/20 group-hover:stroke-primary group-hover:stroke-[2]'}"
				/>

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
</div>

<style>
	@keyframes pulse-ring {
		0%,
		100% {
			r: var(--r-base);
			fill-opacity: 0.15;
		}
		50% {
			r: var(--r-expanded);
			fill-opacity: 0.05;
		}
	}

	.animate-target-pulse {
		--r-base: calc(var(--node-radius) + 12px);
		--r-expanded: calc(var(--node-radius) + 20px);
		animation: pulse-ring 2s infinite ease-in-out;
	}

	@keyframes flow {
		from {
			offset-distance: 0%;
		}
		to {
			offset-distance: 100%;
		}
	}

	@keyframes flow-reverse {
		from {
			offset-distance: 100%;
		}
		to {
			offset-distance: 0%;
		}
	}

	.animate-particle-flow {
		animation: flow 1.5s infinite linear;
	}

	.animate-particle-flow-reverse {
		animation: flow-reverse 1.5s infinite linear;
	}
</style>
