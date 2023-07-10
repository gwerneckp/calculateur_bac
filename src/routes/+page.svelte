<script lang="ts">
	import { notesDefault, technologique } from '../lib/schemas/default';
	import type { Note, Notes, NotesVoies } from '$lib/types/calculatrice';
	import { Mentions, Voies } from '$lib/types/enums';

	const hasPremiere = (note: Note) => note.note_premiere !== false;
	const hasTerminale = (note: Note) => note.note_terminale !== false;

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
			// if the node has a note_premiere and a note_terminale, we get the average of the two notes
			// else we get the only note available

			if (note.note_premiere && note.note_terminale) {
				const moyenne = (note.note_premiere + note.note_terminale) / 2;
				sumProduct += moyenne * note.coefficient;
				totalCoefficient += note.coefficient;
			} else if (note.note_premiere) {
				sumProduct += note.note_premiere * note.coefficient;
				totalCoefficient += note.coefficient;
			} else if (note.note_terminale) {
				sumProduct += note.note_terminale * note.coefficient;
				totalCoefficient += note.coefficient;
			}
		}

		if (totalCoefficient === 0) {
			return '-'; // No valid grades available
		}

		const moyenneGenerale = sumProduct / totalCoefficient;

		return Number(moyenneGenerale.toFixed(2));
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

	$: notes_saisies = getNotesSaisies(getAllNotes(myNotes[voie]));
	$: moyenne = getMoyenne(getAllNotes(myNotes[voie]));
	$: mention = getMention(moyenne);

	let myNotes: NotesVoies;
	let voie: Voies;
	if (typeof localStorage !== 'undefined') {
		const savedNotes = localStorage.getItem('notes');
		if (savedNotes) {
			myNotes = JSON.parse(savedNotes);
		} else {
			myNotes = notesDefault;
		}

		const savedVoie = localStorage.getItem('voie');
		if (savedVoie) {
			voie = savedVoie as Voies;
		} else {
			voie = Voies.GENERALE;
		}
	} else {
		myNotes = notesDefault;
	}
	myNotes = notesDefault;
	voie = Voies.GENERALE;
	$: {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('notes', JSON.stringify(myNotes));
		}
	}

	$: {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('voie', voie);
		}
	}

	const validateInput = (e: any) => {
		const value = parseFloat(e.target.value);
		if (value < 0 || value > 20) {
			e.target.value = '';
		}
	};
</script>

<div class="flex justify-center">
	<div class="container">
		<div class="text-center p-3">
			<h1 class="text-2xl font-bold">Calculatrice de Bac</h1>
			<p class="text-lg font-medium">
				Calculez votre moyenne et mention au bac en fonction de vos notes et coefficients.
			</p>
		</div>

		<h1 class="text-xl font-bold text-center">Voie</h1>
		<div class="p-3">
			<div class="flex justify-center gap-3">
				<input
					class="normal-case btn w-1/2 h-10"
					type="radio"
					name="options"
					bind:group={voie}
					value={Voies.GENERALE}
					aria-label={Voies.GENERALE}
					checked
				/>
				<input
					class="normal-case btn w-1/2 h-10"
					type="radio"
					name="options"
					bind:group={voie}
					value={Voies.TECHNOLOGIQUE}
					aria-label={Voies.TECHNOLOGIQUE}
				/>
			</div>
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
				{#each myNotes[voie].continu as note}
					<div class="w-full h-10 flex-col flex justify-center text-center">
						<p class="font-semibold">{note.matiere}</p>
						<p class="text-sm">Coéfficient {note.coefficient}</p>
					</div>

					<div class="flex h-10 my-1">
						<div class="w-full flex justify-center">
							{#if hasPremiere(note)}
								<input
									on:input={validateInput}
									type="number"
									bind:value={note.note_premiere}
									class="w-16 h-full text-center"
								/>
							{/if}
						</div>
						<div class="w-full flex justify-center">
							{#if hasTerminale(note)}
								<input
									on:input={validateInput}
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
						{#each myNotes[voie].optionnelles as note}
							<div class="w-full h-10 flex-col flex justify-center text-center">
								<p class="font-semibold">{note.matiere}</p>
								<p class="text-sm">Coéfficient {note.coefficient}</p>
							</div>

							<div class="flex h-10 my-1">
								<div class="w-full flex justify-center">
									{#if hasPremiere(note)}
										<input
											on:input={validateInput}
											type="number"
											bind:value={note.note_premiere}
											class="w-16 h-full text-center"
										/>
									{/if}
								</div>
								<div class="w-full flex justify-center">
									{#if hasTerminale(note)}
										<input
											on:input={validateInput}
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
				{#each myNotes[voie].epreuves as note}
					<div class="w-full h-10 flex-col flex justify-center text-center">
						<p class="font-semibold">{note.matiere}</p>
						<p class="text-sm">Coéfficient {note.coefficient}</p>
					</div>

					<div class="flex h-10 my-1">
						<div class="w-full flex justify-center">
							{#if hasPremiere(note)}
								<input
									on:input={validateInput}
									type="number"
									bind:value={note.note_premiere}
									class="w-16 h-full text-center"
								/>
							{/if}
						</div>
						<div class="w-full flex justify-center">
							{#if hasTerminale(note)}
								<input
									on:input={validateInput}
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
			<button class="btn btn-primary normal-case btn-wide" on:click={() => (myNotes = notesDefault)}
				>Réinitialiser</button
			>
		</div>

		<div class="p-6" />
	</div>
</div>
<footer class="footer footer-center p-4 bg-base-300 text-base-content">
	<div>
		<p class="font-bold">
			Les données d'utilisateur ne sont pas envoyées à un serveur. Retrouvez le code source sur <a
				target="_blank"
				class="underline"
				href="https://github.com/gwerneckp/calculateur_bac">Github.</a
			>
		</p>
	</div>
</footer>
