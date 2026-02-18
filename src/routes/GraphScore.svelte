<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Chart from 'chart.js/auto';
	import { db } from '../firebase/firebase';
	import { onValue, ref } from 'firebase/database';

	interface PlayerKnowledgeScores {
		[playerID: string]: {
			[otherPlayerID: string]: {
				totalGuesses: number;
				correctGuesses: number;
				accuracyPercentage: number;
			};
		};
	}

	let { gameCode } = $props<{ gameCode: string }>();
	let chartCanvas: HTMLCanvasElement;
	let chart: Chart;
	let scoreData = $state<PlayerKnowledgeScores>({});

	// Derived players for table/chart
	let players = $derived(Object.keys(scoreData));

	function updateChart() {
		if (!chartCanvas || players.length === 0) return;

		const ctx = chartCanvas.getContext('2d');
		if (!ctx) return;

		const datasets = players.map((playerID, index) => {
			const colors = [
				'#8b5cf6', // primary
				'#ec4899', // secondary
				'#06b6d4', // accent
				'#10b981', // success
				'#f59e0b', // warning
				'#6366f1'
			];
			const color = colors[index % colors.length];

			return {
				label: `${playerID}'s Accuracy`,
				data: players.map((otherID) => {
					if (playerID === otherID) return null;
					return scoreData[playerID]?.[otherID]?.accuracyPercentage || 0;
				}),
				borderColor: color,
				backgroundColor: color + '20',
				borderWidth: 4,
				tension: 0.4,
				pointBackgroundColor: color,
				pointBorderColor: '#fff',
				pointBorderWidth: 2,
				pointRadius: 6,
				pointHoverRadius: 8,
				fill: true
			};
		});

		if (chart) {
			chart.data.labels = players;
			chart.data.datasets = datasets;
			chart.update();
		} else {
			chart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: players,
					datasets
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						y: {
							beginAtZero: true,
							max: 100,
							grid: { color: 'rgba(255, 255, 255, 0.05)' },
							ticks: {
								color: '#94a3b8',
								font: { weight: 'bold' },
								callback: (val) => val + '%'
							}
						},
						x: {
							grid: { display: false },
							ticks: {
								color: '#94a3b8',
								font: { weight: 'bold' }
							}
						}
					},
					plugins: {
						legend: {
							position: 'bottom',
							labels: {
								color: '#f8fafc',
								padding: 20,
								font: {
									size: 12,
									weight: 'bold',
									family: 'Inter'
								}
							}
						}
					}
				}
			});
		}
	}

	onMount(() => {
		const scoresRef = ref(db, `gamecode/${gameCode}/scores`);
		const unsubscribe = onValue(scoresRef, (snapshot) => {
			if (snapshot.exists()) {
				scoreData = snapshot.val();
				updateChart();
			}
		});

		return () => {
			unsubscribe();
			if (chart) chart.destroy();
		};
	});
</script>

<div class="w-full h-96 relative">
	<canvas bind:this={chartCanvas}></canvas>
	{#if players.length === 0}
		<div
			class="absolute inset-0 flex flex-col items-center justify-center bg-black/20 rounded-[2rem] border-2 border-dashed border-white/5"
			transition:fade
		>
			<p class="text-slate-500 font-black uppercase tracking-widest">Awaiting Battle Data...</p>
			<p class="text-slate-600 text-sm font-medium mt-2">
				Finish a round to see your connection stats!
			</p>
		</div>
	{/if}
</div>
