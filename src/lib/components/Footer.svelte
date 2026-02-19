<script lang="ts">
	import github from '$lib/images/github.svg';
</script>

<footer
	class="py-16 border-t border-white/5 bg-dark-bg/20 backdrop-blur-3xl relative overflow-hidden"
>
	<!-- Background Glow -->
	<div
		class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
	></div>
	<div
		class="absolute bottom-0 left-1/4 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full pointer-events-none"
	></div>

	<div class="container mx-auto px-6 flex flex-col items-center gap-8 relative z-10">
		<div class="flex items-center gap-3">
			<div
				class="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center border border-white/10"
			>
				<span class="text-white font-black text-sm">W</span>
			</div>
			<span class="font-outfit font-black text-lg uppercase tracking-tight text-white">
				Who Knows <span class="vibrant-gradient-text">Who?</span>
			</span>
		</div>

		<p
			class="text-slate-500 text-sm font-medium tracking-wide max-w-sm text-center leading-relaxed"
		>
			Unlock the secrets of your squad. An AI-powered social trivia experience built for the
			ultimate connection.
		</p>

		<a
			href="https://mistral.ai"
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all duration-300"
		>
			<span class="text-[10px] uppercase font-black tracking-widest text-slate-500">Powered by</span
			>
			<span class="text-[10px] uppercase font-black tracking-widest vibrant-gradient-text"
				>Mistral AI</span
			>
		</a>

		<div class="flex items-center gap-6">
			<a
				href="https://github.com/bryantclark/who-knows-who"
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all duration-300"
			>
				<img
					src={github}
					alt="GitHub"
					class="w-5 h-5 invert opacity-50 group-hover:opacity-100 transition-opacity"
				/>
				<span
					class="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors"
					>Source Code</span
				>
			</a>
		</div>

		<div class="h-px w-24 bg-white/5"></div>

		<p class="text-[10px] uppercase font-black tracking-[0.3em] text-slate-600">
			&copy; {new Date().getFullYear()} Who Knows Who. All Rights Reserved.
		</p>
	</div>
</footer>
