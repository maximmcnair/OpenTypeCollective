type Variation = [string, number];

export default function createCSSVariations(variations: Variation[]): string {
	return variations.map((v) => `"${v[0]}" ${v[1]}`).join(', ');
}

export function createCSSVariationsFromObject(variations: object): string {
	return Object.entries(variations)
		.map((v) => `"${v[0]}" ${v[1]}`)
		.join(', ');
}
