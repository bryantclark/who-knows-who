<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { enhance } from '$app/forms';

	let {
		questions,
		isAnswerer,
		currentAnswererName,
		hasAnswered,
		playersCount,
		answeredPlayersCount
	} = $props<{
		questions: string;
		isAnswerer: boolean;
		currentAnswererName: string;
		hasAnswered: boolean;
		playersCount: number;
		answeredPlayersCount: number;
	}>();

	const remaining = $derived(playersCount - answeredPlayersCount);
</script>

<div class="vibrant-card-premium p-1 md:p-2 relative overflow-hidden">
	<div class="bg-dark-bg/20 backdrop-blur-2xl rounded-[2.3rem] p-8 md:p-12 space-y-12">
		<div class="text-center space-y-4">
			<div
				class="inline-block px-4 py-1.5 bg-white/5 rounded-full border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500"
			>
				Transmission In Progress
			</div>
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
