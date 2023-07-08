<script lang="ts">
	enum Matiere {
		ES = 'Enseignement Scientifique',
		HG = 'Histoire-Géographie',
		EMC = 'Enseignement Moral et Civique',
		LV1 = 'Langue vivante 1',
		LV2 = 'Langue vivante 2',
		SPE1 = 'Enseignement de Spécialité 1',
		SPE2 = 'Enseignement de Spécialité 2',
		SPE3 = 'Enseignement de Spécialité 3',
		EPS = 'Education Physique et Sportive',
		FR_ECRIT = 'Français écrit',
		FR_ORAL = 'Français oral',
		PHILOSOPHIE = 'Philosophie',
		ORAL = 'Grand oral'
	}

	enum Mentions {
		RECALE = 'Recalé',
		RATTRAPAGE = 'Rattrapage',
		ADMIS = 'Admis',
		ASSEZ_BIEN = 'Assez Bien',
		BIEN = 'Bien',
		TRES_BIEN = 'Très Bien',
		FELICITATIONS = 'Félicitations du Jury'
	}

	type Note = {
		// number = note assignée
		// null = note non assignée
		// false = pas de note cette année
		note_premiere: number | null | false;
		note_terminale: number | null | false;
		coefficient: number;
		matiere: Matiere;
	};

	const hasPremiere = (note: Note) => note.note_premiere !== false;
	const hasTerminale = (note: Note) => note.note_terminale !== false;

	let controle_continu: Note[] = [
		{
			note_premiere: null,
			note_terminale: false,
			coefficient: 3,
			matiere: Matiere.ES
		},
		{
			note_premiere: null,
			note_terminale: null,

			coefficient: 5,
			matiere: Matiere.HG
		}
	];

	$: notes_saisies = getNotesSaisies(controle_continu);
	$: moyenne = getMoyenne(controle_continu);
	$: mention = getMention(moyenne);

	const getNotesSaisies = (notes: Note[]): number => {
		let notesSaisies = 0;

		for (const note of notes) {
			if (note.note_premiere) {
				notesSaisies++;
			}
			if (note.note_terminale) {
				notesSaisies++;
			}
		}

		return notesSaisies;
	};
	const getMoyenne = (notes: Note[]): number | '-' => {
		let totalCoefficient = 0;
		let sumProduct = 0;

		for (const note of notes) {
			if (note.note_premiere) {
				totalCoefficient += note.coefficient;
				sumProduct += note.note_premiere * note.coefficient;
			}
			if (note.note_terminale) {
				totalCoefficient += note.coefficient;
				sumProduct += note.note_terminale * note.coefficient;
			}
		}

		if (totalCoefficient === 0) {
			return '-'; // No valid grades available
		}

		const moyenneGenerale = sumProduct / totalCoefficient;
		return moyenneGenerale;
	};

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
</script>

<div class="text-center p-3">
	<h1 class="text-2xl font-bold">Calculatrice de Bac</h1>
	<p class="text-lg font-medium">
		Calculez votre moyenne et mention au bac en fonction de vos notes et coefficients.
	</p>
</div>

<div class="p-3">
	<div class="flex gap-3">
		<div class="bg-base-200 w-full h-20 text-center flex-col flex justify-center">
			<h1 class="text-2xl font-bold">{notes_saisies}</h1>
			<p>Notes saisies</p>
		</div>
		<div class="bg-base-200 w-full h-20 text-center flex-col flex justify-center">
			<h1 class="text-2xl font-bold">{moyenne}/20</h1>
			<p>Moyenne</p>
		</div>
	</div>
	<div class="p-1.5" />
	<div class="bg-base-200 w-full h-20 text-center flex-col flex justify-center">
		<h1 class="text-2xl font-bold">{mention}</h1>
		<p>Mention</p>
	</div>
</div>

<div class="p-3" />
<h1 class="text-center text-lg font-semibold">Contrôle continu</h1>
<div class="p-3">
	<div class="flex bg-base-300">
		<div class="w-full h-10 bg-base-200 font-medium flex-col flex justify-center text-center">
			Première
		</div>
		<div class="w-full h-10 bg-base-200 font-medium flex-col flex justify-center text-center">
			Terminale
		</div>
	</div>
	<div class="bg-base-200 pt-3">
		{#each controle_continu as note}
			<div class="w-full h-10 bg-base-200 flex-col flex justify-center text-center">
				<p>{note.matiere}</p>
				<p class="text-sm">Coéfficient {note.coefficient}</p>
			</div>

			<div class="flex h-10 my-1">
				<div class="w-full flex justify-center">
					{#if hasPremiere(note)}
						<input type="number" bind:value={note.note_premiere} class="w-16 h-full text-center" />
					{/if}
				</div>
				<div class="w-full flex justify-center">
					{#if hasTerminale(note)}
						<input type="number" bind:value={note.note_terminale} class="w-16 h-full text-center" />
					{/if}
				</div>
			</div>

			<div class="p-3" />
		{/each}
	</div>
</div>
