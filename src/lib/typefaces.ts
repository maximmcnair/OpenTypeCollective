export type Variation = [string, string, number, number, number, number];
// value, name, min, max, default, step

export interface Typeface {
	name: string;
	// NOTE this comes from actual woff2 file
	metaDataKey: string;
	source: string;
  license: string;
  licenseLink: string;
	foundery: string;
	variations: Variation[];
}

export const typefaces: Typeface[] = [
	{
		name: 'Inter',
		metaDataKey: 'Inter',
		source: 'https://github.com/rsms/inter',
    license: 'OFT',
    licenseLink: 'https://github.com/rsms/inter/blob/master/LICENSE.txt',
		foundery: 'rsms',
		variations: [
			['wght', 'Weight', 100, 900, 400, 1],
			['slnt', 'Slant', -10, 0, 0, 1]
		]
	},
	{
		name: 'Anybody',
		metaDataKey: 'Anybody UltraCondensed Thin',
		source: 'https://github.com/Etcetera-Type-Co/Anybody',
    license: 'OFT',
    licenseLink: 'https://github.com/Etcetera-Type-Co/Anybody/blob/master/OFL.txt',
		foundery: 'ETC',
		variations: [
			['wght', 'Weight', 200, 900, 100, 1],
			['wdth', 'Width', 100, 150, 100, 1],
			['slnt', 'Slant', -10, 0, 0, 1]
		]
	},
	{
		name: 'Epilogue',
		metaDataKey: 'Epilogue Italic',
		source: 'https://github.com/Etcetera-Type-Co/Epilogue',
    license: 'OFT',
    licenseLink: 'https://github.com/Etcetera-Type-Co/Epilogue/blob/master/OFL.txt',
		foundery: 'ETC',
		variations: [['wght', 'Weight', 100, 900, 400, 10]]
	},
	{
		name: 'Trispace',
		metaDataKey: 'Trispace Thin',
		source: 'https://github.com/Etcetera-Type-Co/Trispace',
    license: 'OFT',
    licenseLink: 'https://github.com/Etcetera-Type-Co/Trispace/blob/master/OFL.txt',
		foundery: 'ETC',
		variations: [
			['wght', 'Weight', 100, 800, 100, 1],
			['wdth', 'Width', 75, 125, 100, 1]
		]
	},
	{
		name: 'Fraunces',
		metaDataKey: 'Fraunces 9pt Black',
		source: 'https://github.com/undercasetype/fraunces',
    license: 'OFT',
    licenseLink: 'https://github.com/undercasetype/Fraunces/blob/master/OFL.txt',
		foundery: 'Undercase',
		variations: [
			['opsz', 'Optical Size', 9, 144, 9, 1],
			['wght', 'Weight', 100, 900, 900, 1],
			['SOFT', 'Softness', 0, 100, 0, 1]
			// ['WONK', 'Wonky', 0, 1, 1, 1],
		]
	},
	{
		name: 'Hubot Sans',
		metaDataKey: 'Hubot-Sans ExtraLight',
		source: 'https://github.com/github/hubot-sans',
    license: 'OFT',
    licenseLink: 'https://github.com/github/hubot-sans/blob/main/LICENSE',
		foundery: 'Github + Degarism',
		variations: [
			['wght', 'Weight', 200, 900, 200, 1],
			['wdth', 'Width', 75, 125, 100, 1],
			['ital', 'Italic', 0, 10, 0, 1]
		]
	},
	{
		name: 'Mona Sans',
		metaDataKey: 'Mona Sans Thin',
		source: 'https://github.com/github/mona-sans',
    license: 'OFT',
    licenseLink: 'https://github.com/github/mona-sans/blob/main/LICENSE',
		foundery: 'Github + Degarism',
		variations: [
			['wght', 'Weight', 200, 900, 200, 1],
			['wdth', 'Width', 75, 125, 100, 1],
			['ital', 'Italic', 0, 12, 0, 1]
		]
	},
	{
		name: 'Source Code Pro',
		metaDataKey: 'Source Code Variable',
		source: 'https://github.com/adobe-fonts/source-code-pro',
    license: 'OFT',
    licenseLink: 'https://github.com/adobe-fonts/source-code-pro/blob/release/LICENSE.md',
		foundery: 'Adobe',
		variations: [['wght', 'Weight', 200, 900, 200, 1]]
	},
	{
		name: 'Source Sans',
		metaDataKey: 'Source Sans 3 VF',
		source: 'https://github.com/adobe-fonts/source-sans',
    license: 'OFT',
    licenseLink: 'https://github.com/adobe-fonts/source-sans/blob/release/LICENSE.md',
		foundery: 'Adobe',
		variations: [['wght', 'Weight', 200, 900, 200, 1]]
	},
	{
		name: 'Source Serif',
		metaDataKey: 'Source Serif 4 Variable',
		source: 'https://github.com/adobe-fonts/source-serif',
    license: 'OFT',
    licenseLink: 'https://github.com/adobe-fonts/source-serif/blob/release/LICENSE.md',
		foundery: 'Adobe',
		variations: [
			['wght', 'Weight', 200, 900, 400, 1],
			['opsz', 'Optical Size', 8, 60, 20, 1]
		]
	},
	{
		name: 'Space Grotesk',
		metaDataKey: 'Space Grotesk Light',
		source: 'https://github.com/floriankarsten/space-grotesk',
    license: 'OFT',
    licenseLink: 'https://github.com/floriankarsten/space-grotesk/blob/master/OFL.txt',
		foundery: 'Florain Karsten + Colophon',
		variations: [['wght', 'Weight', 300, 700, 300, 1]]
	}
];
