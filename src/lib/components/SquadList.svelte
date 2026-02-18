<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { browser } from '$app/environment';

	let { players, answeredPlayers, currentPlayerName, gameCode } = $props<{
		players: string[];
		answeredPlayers: string[];
		currentPlayerName: string;
		gameCode: string;
	}>();

	let copyStatus = $state('Copy Join Link');
	const shareUrl = $derived(browser ? `${window.location.origin}/?gameCode=${gameCode}` : '');

	function copyRoomLink() {
		navigator.clipboard.writeText(shareUrl);
		copyStatus = 'Copied!';
		setTimeout(() => (copyStatus = 'Copy Join Link'), 2000);
	}
</script>

<div class="space-y-6">
	<!-- Access Key Card (Merged) -->
	<div class="vibrant-card p-6 md:p-8 space-y-4 bg-gradient-to-br from-white/[0.02] to-transparent">
		<div class="flex justify-between items-center">
			<h3 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Access Key</h3>
			<div class="flex items-center gap-2">
				<span class="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
				<span class="text-success text-[10px] font-black uppercase tracking-widest">Active</span>
			</div>
		</div>
		<div
			class="text-4xl font-black font-outfit text-white tracking-[0.3em] text-center py-4 bg-white/[0.02] rounded-2xl border border-white/5 shadow-premium-inner"
		>
			{gameCode}
		</div>
		<button
			onclick={copyRoomLink}
			class="w-full py-3.5 bg-white/[0.01] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white"
		>
			{copyStatus}
		</button>
	</div>

	<!-- Squad Members -->
	<div class="vibrant-card p-6 md:p-8 space-y-6 overflow-hidden relative">
		<div class="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
			<span class="text-6xl">👥</span>
		</div>
		<h3 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
			The Squad ({players.length})
		</h3>
		<div class="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
			{#each players as player}
				<div
					class="flex items-center justify-between p-4 rounded-2xl transition-all duration-500 {answeredPlayers.includes(
						player
					)
						? 'bg-success/10 border border-success/20'
						: 'bg-white/[0.03] border border-white/5'}"
					in:fly={{ x: -10 }}
				>
					<div class="flex items-center gap-4">
						<div
							class="w-8 h-8 rounded-lg bg-surface-lighter flex items-center justify-center text-xs font-black border border-white/10 text-white"
						>
							{String(player)[0].toUpperCase()}
						</div>
						<div class="flex flex-col">
							<span class="font-bold text-slate-200 text-xs">
								{player}
								{#if player === currentPlayerName}
									<span class="text-primary ml-1">(You)</span>
								{/if}
							</span>
							{#if answeredPlayers.includes(player)}
								<span class="text-[8px] uppercase font-black tracking-widest text-success"
									>Locked In</span
								>
							{:else}
								<span class="text-[8px] uppercase font-black tracking-widest text-slate-600"
									>Thinking...</span
								>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 3px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.02);
		border-radius: 10px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(99, 102, 241, 0.2);
		border-radius: 10px;
	}
</style>
