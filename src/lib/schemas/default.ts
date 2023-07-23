import type { Notes } from '$lib/types/calculatrice';
import { Matiere, Voies } from '$lib/types/enums';

export const generale: Notes = {
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

export const technologique: Notes = {
	continu: [
		{
			matiere: Matiere.MATHS,
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
			coefficient: 4
		},
		{
			matiere: Matiere.ORAL,
			note_premiere: false,
			note_terminale: null,
			coefficient: 14
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

export const notesDefault = {
	[Voies.GENERALE]: generale,
	[Voies.TECHNOLOGIQUE]: technologique
};
