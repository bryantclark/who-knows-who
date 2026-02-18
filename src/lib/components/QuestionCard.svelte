<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { browser } from '$app/environment';

	let {
		questions,
		isAnswerer,
		currentAnswererName,
		hasAnswered,
		playersCount,
		answeredPlayersCount,
		gameCode
	} = $props<{
		questions: string;
		isAnswerer: boolean;
		currentAnswererName: string;
		hasAnswered: boolean;
		playersCount: number;
		answeredPlayersCount: number;
		gameCode: string;
	}>();

	const remaining = $derived(playersCount - answeredPlayersCount);
	let copyStatus = $state('Copy Link');

	const shareUrl = $derived(browser ? `${window.location.origin}/?gameCode=${gameCode}` : '');

	function copyRoomLink() {
		if (browser) {
			navigator.clipboard.writeText(shareUrl);
			copyStatus = 'Copied!';
			setTimeout(() => (copyStatus = 'Copy Link'), 2000);
		}
	}
</script>

<div class="vibrant-card-premium p-1 md:p-2 relative overflow-hidden">
	<div class="bg-dark-bg/20 backdrop-blur-2xl rounded-[2.3rem] p-8 md:p-12 space-y-12">
		<!-- Header: Game Code & Copy Link -->
		<div class="flex flex-wrap justify-between items-center border-b border-white/5 pb-6">
			<div class="flex items-center gap-4">
				<div class="space-y-1">
					<p class="text-[8px] font-black uppercase tracking-[0.3em] text-primary">Access Key</p>
					<h3 class="text-2xl font-black font-outfit text-white tracking-[0.2em]">{gameCode}</h3>
				</div>
				<button
					onclick={copyRoomLink}
					class="mt-4 px-4 py-1.5 bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/50 transition-all rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white"
				>
					{copyStatus}
				</button>
			</div>
		</div>

		<div class="text-center space-y-4">
			<h2
				class="text-3xl md:text-5xl font-black font-outfit leading-tight text-white drop-shadow-sm"
			>
				{questions || 'Initializing uplink...'}
			</h2>
		</div>

		{#if hasAnswered}
			<div
				class="text-center py-16 px-6 border border-white/5 rounded-[2.5rem] bg-white/[0.02] space-y-6"
				in:scale={{ duration: 600 }}
			>
				<div
					class="w-16 h-16 bg-success text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-success/20 text-2xl font-black border border-white/10"
				>
					✓
				</div>
				<div class="space-y-2">
					<h3 class="text-xl font-black uppercase tracking-widest text-white">Entry Encrypted</h3>
					<p class="text-slate-500 text-sm font-medium max-w-xs mx-auto">
						Waiting for {remaining} more {remaining === 1 ? 'player' : 'players'} to finalize their response.
					</p>
				</div>
			</div>
		{:else}
			<form
				method="POST"
				action="?/submitAnswer"
				use:enhance
				class="space-y-8"
				in:fade={{ delay: 300, duration: 600 }}
			>
				<div class="space-y-6 text-center">
					<p class="text-slate-400 font-medium text-base">
						{#if isAnswerer}
							Reveal your truth. How would you answer this?
						{:else}
							Predict the outcome. How did <span class="text-primary font-black"
								>{currentAnswererName}</span
							> answer?
						{/if}
					</p>
					<input
						type="text"
						name="answer"
						required
						placeholder="Analyze and respond..."
						class="vibrant-input text-center text-xl md:text-2xl font-bold placeholder:opacity-30"
						autocomplete="off"
					/>
				</div>
				<button
					type="submit"
					class="w-full vibrant-btn-primary py-7 text-xl uppercase tracking-widest"
				>
					Confirm Selection
				</button>
			</form>
		{/if}
	</div>
</div>
