import { Matiere, Voies } from "./enums";

export type Note = {
	matiere: Matiere;
	// number = note assignée
	// null = note non assignée
	// false = pas de note cette année
	note_premiere: number | null | false;
	note_terminale: number | null | false;
	coefficient: number;
};

export type Notes = {
	continu: Note[];
	optionnelles: Note[];
	epreuves: Note[];
};

export type NotesVoies = {
	[Voies.GENERALE]: Notes;
	[Voies.TECHNOLOGIQUE]: Notes;
}
