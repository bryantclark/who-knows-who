<script lang="ts">
	import { fly } from 'svelte/transition';
	import { enhance } from '$app/forms';

	let { questions, currentAnswererName, correctAnswer, gameCode } = $props<{
		questions: string;
		currentAnswererName: string;
		correctAnswer: string;
		gameCode: string;
	}>();
</script>

<div class="space-y-12" in:fly={{ y: 30, duration: 1000 }}>
	<div
		class="vibrant-card-premium p-1 md:p-2 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent"
	>
		<div
			class="bg-dark-bg/40 backdrop-blur-3xl rounded-[2.3rem] p-10 md:p-16 text-center space-y-10"
		>
			<div class="space-y-4">
				<p class="text-slate-500 text-xs font-black uppercase tracking-widest text-center">
					Origin Question
				</p>
				<p class="text-2xl md:text-3xl font-black font-outfit text-white">"{questions}"</p>
			</div>
			<div
				class="py-10 px-8 bg-white/[0.02] rounded-[2.5rem] border border-white/5 space-y-4 shadow-premium-inner backdrop-blur-sm relative overflow-hidden"
			>
				<div class="absolute inset-0 bg-primary/5 -z-10 animate-pulse-slow"></div>
				<p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
					{currentAnswererName}'s Truth
				</p>
				<p
					class="text-4xl md:text-5xl font-black text-white font-outfit uppercase tracking-tighter"
				>
					{correctAnswer}
				</p>
			</div>

			<form method="POST" action="?/nextRound" use:enhance>
				<button class="vibrant-btn-primary px-16 py-6 text-xl uppercase tracking-widest">
					Initiate Next Sequence
				</button>
			</form>
		</div>
	</div>
</div>
