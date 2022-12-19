import { writable } from 'svelte/store';

export interface TypeEntry {
	key: string;
	name: string;
	typeface: string;
	variations: {
		[key: string]: number;
	};
	fontSize: string;
	lineHeight: string;
	alignment: 'left' | 'center' | 'right';
	example?: string;
}

export interface TypeSystem {
	h1: TypeEntry;
	h2: TypeEntry;
	h3: TypeEntry;
	h4: TypeEntry;
	h5: TypeEntry;
	h6: TypeEntry;
	body: TypeEntry;
	small: TypeEntry;
}

const defaultTypeface = 'Inter';
const defaultVariations = { wght: 400, slnt: 0 };

const typeSystem = writable<TypeSystem>({
	h1: {
		key: 'h1',
		name: 'Heading One',
		typeface: defaultTypeface,
		variations: defaultVariations,
		fontSize: '68px',
		lineHeight: '1.5',
		alignment: 'left'
	},
	h2: {
		key: 'h2',
		name: 'Heading Two',
		typeface: defaultTypeface,
		variations: defaultVariations,
		fontSize: '54px',
		lineHeight: '1.5',
		alignment: 'left'
	},
	h3: {
		key: 'h3',
		name: 'Heading Three',
		typeface: defaultTypeface,
		variations: defaultVariations,
		fontSize: '43px',
		lineHeight: '1.5',
		alignment: 'left'
	},
	h4: {
		key: 'h4',
		name: 'Heading Four',
		typeface: defaultTypeface,
		variations: defaultVariations,
		fontSize: '35px',
		lineHeight: '1.5',
		alignment: 'left'
	},
	h5: {
		key: 'h5',
		name: 'Heading Five',
		typeface: defaultTypeface,
		variations: defaultVariations,
		fontSize: '28px',
		lineHeight: '1.5',
		alignment: 'left'
	},
	h6: {
		key: 'h6',
		name: 'Heading Six',
		typeface: defaultTypeface,
		variations: defaultVariations,
		fontSize: '22px',
		lineHeight: '1.5',
		alignment: 'left'
	},
	body: {
		key: 'body',
		name: 'Body',
		typeface: defaultTypeface,
		variations: defaultVariations,
		fontSize: '18px',
		lineHeight: '1.5',
		alignment: 'left',
		example:
			"A mote of dust suspended in a sunbeam vanquish the impossible descended from astronomers as a patch of light Orion's sword science. Rich in mystery citizens of distant epochs inconspicuous motes of rock and gas a very small stage in a vast cosmic arena two ghostly white figures in coveralls and helmets are softly dancing decipherment? Extraordinary claims require extraordinary evidence the sky calls to us courage of our questions extraordinary claims require extraordinary evidence made in the interiors of collapsing stars how far away and billions upon."
	},
	small: {
		key: 'small',
		name: 'Small',
		typeface: defaultTypeface,
		variations: defaultVariations,
		fontSize: '16px',
		lineHeight: '1.5',
		alignment: 'left',
		example:
			"A mote of dust suspended in a sunbeam vanquish the impossible descended from astronomers as a patch of light Orion's sword science. Rich in mystery citizens of distant epochs inconspicuous motes of rock and gas a very small stage in a vast cosmic arena two ghostly white figures in coveralls and helmets are softly dancing decipherment? Extraordinary claims require extraordinary evidence the sky calls to us courage of our questions extraordinary claims require extraordinary evidence made in the interiors of collapsing stars how far away and billions upon."
	}
});

export default typeSystem;
