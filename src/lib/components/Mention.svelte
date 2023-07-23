<script lang="ts">
	import { Mentions } from '$lib/types/enums';

	const getMention = (moyenne: number | '-') => {
		if (moyenne === '-') return '-';
		if (moyenne < 8) return Mentions.RECALE;
		if (moyenne < 10) return Mentions.RATTRAPAGE;
		if (moyenne < 12) return Mentions.ADMIS;
		if (moyenne < 14) return Mentions.ASSEZ_BIEN;
		if (moyenne < 16) return Mentions.BIEN;
		if (moyenne < 18) return Mentions.TRES_BIEN;
		return Mentions.FELICITATIONS;
	};

	const getGradient = (mention: string) => {
		switch (mention) {
			case Mentions.RECALE:
				return 'from-red-400 to-orange-200';
			case Mentions.RATTRAPAGE:
				return 'from-orange-400 to-yellow-200';
			case Mentions.ADMIS:
				return 'from-indigo-400 to-blue-200';
			case Mentions.ASSEZ_BIEN:
				return 'from-blue-400 to-cyan-200';
			case Mentions.BIEN:
				return 'from-green-400 to-lime-200';
			case Mentions.TRES_BIEN:
				return 'from-purple-400 to-pink-200';
			case Mentions.FELICITATIONS:
				return 'from-pink-400 to-rose-200';
			default:
				return 'from-gray-400 to-gray-200';
		}
	};

	export let moyenne: number | '-';
	let mentionGradient: HTMLDivElement;
	$: mention = getMention(moyenne);
	$: {
		if (mentionGradient) {
			mentionGradient.className = `bg-gradient-to-r ${getGradient(
				mention
			)} w-full h-full translate-x-1.5 translate-y-1.5`;
		}
	}
</script>

<div class="py-5">
	<div class="h-20 w-full relative">
		<div
			class="absolute bg-white w-full h-full bg-opacity-30 backdrop-blur-md text-center z-10 -translate-x-1.5 -translate-y-1.5 flex justify-center flex-col text-black"
		>
			<h1 class="text-2xl font-bold">{mention}</h1>
			<p>Mention</p>
		</div>
		<div
			class="bg-gradient-to-r w-full h-full translate-x-1.5 translate-y-1.5"
			bind:this={mentionGradient}
		/>
	</div>
</div>
