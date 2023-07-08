<script lang="ts">
	import { onMount } from 'svelte';

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
		ORAL = 'Grand oral',

		OPTION1 = 'Enseignement optionnel 1',
		OPTION2 = 'Enseignement optionnel 2',
		ANTIQUITE1 = "Langues et cultures de l'Antiquité 1",
		ANTIQUITE2 = "Langues et cultures de l'Antiquité 2"
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
		matiere: Matiere;
		// number = note assignée
		// null = note non assignée
		// false = pas de note cette année
		note_premiere: number | null | false;
		note_terminale: number | null | false;
		coefficient: number;
	};

	const hasPremiere = (note: Note) => note.note_premiere !== false;
	const hasTerminale = (note: Note) => note.note_terminale !== false;

	type Notes = {
		continu: Note[];
		optionnelles: Note[];
		epreuves: Note[];
	};

	const generale: Notes = {
		continu: [
			{
				matiere: Matiere.ES,
				note_premiere: null,
				note_terminale: null,
				coefficient: 6
			},
			{
				matiere: Matiere.HG,
				note_premiere: null,
				note_terminale: null,
				coefficient: 6
			},
			{
				matiere: Matiere.LV1,
				note_premiere: null,
				note_terminale: null,
				coefficient: 6
			},
			{
				matiere: Matiere.LV2,
				note_premiere: null,
				note_terminale: null,
				coefficient: 6
			},
			{
				matiere: Matiere.SPE1,
				note_premiere: null,
				note_terminale: false,
				coefficient: 8
			},
			{
				matiere: Matiere.EPS,
				note_premiere: false,
				note_terminale: null,
				coefficient: 6
			},
			{
				matiere: Matiere.EMC,
				note_premiere: null,
				note_terminale: null,
				coefficient: 2
			}
		],
		optionnelles: [
			{
				matiere: Matiere.OPTION1,
				note_premiere: null,
				note_terminale: null,
				coefficient: 4
			},
			{
				matiere: Matiere.OPTION2,
				note_premiere: false,
				note_terminale: null,
				coefficient: 2
			},
			{
				matiere: Matiere.ANTIQUITE1,
				note_premiere: null,
				note_terminale: null,
				coefficient: 4
			},
			{
				matiere: Matiere.ANTIQUITE2,
				note_premiere: null,
				note_terminale: null,
				coefficient: 4
			}
		],
		epreuves: [
			{
				matiere: Matiere.FR_ECRIT,
				note_premiere: null,
				note_terminale: false,
				coefficient: 5
			},
			{
				matiere: Matiere.FR_ORAL,
				note_premiere: null,
				note_terminale: false,
				coefficient: 5
			},
			{
				matiere: Matiere.PHILOSOPHIE,
				note_premiere: false,
				note_terminale: null,
				coefficient: 8
			},
			{
				matiere: Matiere.ORAL,
				note_premiere: false,
				note_terminale: null,
				coefficient: 10
			},
			{
				matiere: Matiere.SPE2,
				note_premiere: false,
				note_terminale: null,
				coefficient: 16
			},
			{
				matiere: Matiere.SPE3,
				note_premiere: false,
				note_terminale: null,
				coefficient: 16
			}
		]
	};

	const getAllNotes = (notes: Notes): Note[] => {
		let allNotes: Note[] = [];

		allNotes = allNotes.concat(notes.continu);
		// itterate over notes.optionnelles and add them to allNotes a note is assigned
		for (const note of notes.optionnelles) {
			if (note.note_premiere || note.note_terminale) {
				allNotes.push(note);
			}
		}

		allNotes = allNotes.concat(notes.epreuves);

		return allNotes;
	};

	const getNotesSaisies = (notes: Note[]): [number, number] => {
		let notesSaisies = 0;
		let totalNotes = 0;

		for (const note of notes) {
			if (note.note_premiere) {
				notesSaisies++;
			}
			if (note.note_terminale) {
				notesSaisies++;
			}

			if (hasPremiere(note)) {
				totalNotes++;
			}

			if (hasTerminale(note)) {
				totalNotes++;
			}
		}

		return [notesSaisies, totalNotes];
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

	let showOptions = false;

	$: notes_saisies = getNotesSaisies(getAllNotes(notes));
	$: moyenne = getMoyenne(getAllNotes(notes));
	$: mention = getMention(moyenne);

	let notes: Notes;
	if (typeof localStorage !== 'undefined') {
		notes = JSON.parse(localStorage.getItem('notes') || '');
	} else {
		notes = generale;
	}

	$: {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('notes', JSON.stringify(notes));
		}
	}
</script>

<div class="flex justify-center">
	<div class="container">
		<div class="text-center p-3">
			<h1 class="text-2xl font-bold">Calculatrice de Bac</h1>
			<p class="text-lg font-medium">
				Calculez votre moyenne et mention au bac en fonction de vos notes et coefficients.
			</p>
		</div>

		<div class="bg-black p-3 sticky top-0">
			<div class="flex gap-3">
				<div class="bg-base-200 w-full h-20 text-center flex-col flex justify-center">
					<h1 class="text-2xl font-bold">{notes_saisies[0]}/{notes_saisies[1]}</h1>
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
			<div class="flex bg-base-200">
				<div class="w-full h-10 font-bold text-lg flex-col flex justify-center text-center">
					Première
				</div>
				<div class="w-full h-10 font-bold text-lg flex-col flex justify-center text-center">
					Terminale
				</div>
			</div>
			<div class="bg-base-200 pt-3">
				{#each notes.continu as note}
					<div class="w-full h-10 flex-col flex justify-center text-center">
						<p class="font-semibold">{note.matiere}</p>
						<p class="text-sm">Coéfficient {note.coefficient}</p>
					</div>

					<div class="flex h-10 my-1">
						<div class="w-full flex justify-center">
							{#if hasPremiere(note)}
								<input
									type="number"
									bind:value={note.note_premiere}
									class="w-16 h-full text-center"
								/>
							{/if}
						</div>
						<div class="w-full flex justify-center">
							{#if hasTerminale(note)}
								<input
									type="number"
									bind:value={note.note_terminale}
									class="w-16 h-full text-center"
								/>
							{/if}
						</div>
					</div>

					<div class="p-3" />
				{/each}
				{#if !showOptions}
					<!-- <div class="flex justify-center">
				<div class="form-control w-1/2">
					<label class="label cursor-pointer">
						<span class="label-text">Afficher Options</span>
						<input type="checkbox" bind:value={showOptions} class="checkbox" />
					</label>
				</div>
			</div> -->
					<button
						class="w-full btn normal-case text-lg btn-neutral"
						on:click={() => (showOptions = true)}>Afficher options</button
					>
				{/if}

				{#if showOptions}
					<div class="bg-base-300 pt-6">
						{#each notes.optionnelles as note}
							<div class="w-full h-10 flex-col flex justify-center text-center">
								<p class="font-semibold">{note.matiere}</p>
								<p class="text-sm">Coéfficient {note.coefficient}</p>
							</div>

							<div class="flex h-10 my-1">
								<div class="w-full flex justify-center">
									{#if hasPremiere(note)}
										<input
											type="number"
											bind:value={note.note_premiere}
											class="w-16 h-full text-center"
										/>
									{/if}
								</div>
								<div class="w-full flex justify-center">
									{#if hasTerminale(note)}
										<input
											type="number"
											bind:value={note.note_terminale}
											class="w-16 h-full text-center"
										/>
									{/if}
								</div>
							</div>

							<div class="p-3" />
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<div class="p-3" />
		<h1 class="text-center text-lg font-semibold">Épreuves Finales</h1>
		<div class="p-3">
			<div class="flex bg-base-200">
				<div class="w-full h-10 font-bold text-lg flex-col flex justify-center text-center">
					Première
				</div>
				<div class="w-full h-10 font-bold text-lg flex-col flex justify-center text-center">
					Terminale
				</div>
			</div>
			<div class="bg-base-200 pt-3">
				{#each notes.epreuves as note}
					<div class="w-full h-10 flex-col flex justify-center text-center">
						<p class="font-semibold">{note.matiere}</p>
						<p class="text-sm">Coéfficient {note.coefficient}</p>
					</div>

					<div class="flex h-10 my-1">
						<div class="w-full flex justify-center">
							{#if hasPremiere(note)}
								<input
									type="number"
									bind:value={note.note_premiere}
									class="w-16 h-full text-center"
								/>
							{/if}
						</div>
						<div class="w-full flex justify-center">
							{#if hasTerminale(note)}
								<input
									type="number"
									bind:value={note.note_terminale}
									class="w-16 h-full text-center"
								/>
							{/if}
						</div>
					</div>

					<div class="p-3" />
				{/each}
			</div>
		</div>

		<div class="p-3" />

		<div class="flex justify-center">
			<button class="btn btn-primary normal-case btn-wide" on:click={() => (notes = generale)}
				>Réinitialiser</button
			>
		</div>

		<div class="p-3" />
	</div>
</div>
<footer class="footer footer-center p-4 bg-base-300 text-base-content">
	<div>
		<p>Rétrouvez le code source sur <a href="">Github</a></p>
	</div>
</footer>
