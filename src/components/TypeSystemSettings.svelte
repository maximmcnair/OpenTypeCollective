<script lang="ts">
	import typeSystemStore, { type TypeEntry } from '../stores/typeSystem';
	import { typefaces } from '../lib/typefaces';
	import typefaceMetaData from '../lib/typefaceMetaData.json';
	import createCSSVariations from '../lib/createCSSVariations';
	import Select from './Select.svelte';
	import Number from './Number.svelte';
	import { onDestroy } from 'svelte';
	import SettingsVariation from './SettingsVariation.svelte';

	export let setSelectedEntry: (e: string) => void;
	export let selectedEntry: string;

	let typeSystem = {};

	const unsubscribe = typeSystemStore.subscribe((x) => {
		typeSystem = x;
	});

	onDestroy(unsubscribe);

	// entries
	const entries: string[] = Object.keys(typeSystem);

	// variations
	function getVariations(typeEntry: TypeEntry) {
		const typeface = typefaces.find((t) => t.name === typeEntry.typeface);
		return typeface?.variations;
	}

	let variations = [];
	$: variations = getVariations(typeEntry);

	// Type entry
	let typeEntry = typeSystem[selectedEntry];
	$: typeEntry = typeSystem[selectedEntry];

	function updateTypeEntry(values: any): void {
		typeSystemStore.update((s) => ({
			...s,
			[typeEntry.key]: {
				...s[typeEntry.key],
				...values
			}
		}));
	}

	function getMetaData(typeEntry: TypeEntry) {
		const typeface = typefaces.find((t) => t.name === typeEntry.typeface);
		return typeface ? typefaceMetaData[typeface.metaDataKey] : {};
	}

	function getNamedVariations(metaData) {
		return Object.entries(metaData.namedVariations || []).map((v) => {
			return {
				name: v[0],
				variations: Object.entries(v[1])
			};
		});
	}

	let namedVariations: any[] = [];
	$: namedVariations = getNamedVariations(getMetaData(typeEntry));

	let variationsByKey = {};
	$: variationsByKey = typeEntry.variations.reduce((acc, val) => {
		acc[val[0]] = val[1];
		return acc;
	}, {});

	$: console.log(typeEntry);
</script>

<div class="container">
	<div class="settings">
		<Select
			options={entries.map((e) => ({
				name: e,
				value: e
			}))}
			placeholder=""
			selectedValue={selectedEntry}
			onChange={(entry) => {
				setSelectedEntry(entry);
			}}
		/>
		<Select
			options={typefaces.map((t) => ({
				name: t.name,
				value: t.name,
				style: `font-family: ${t.name};`
			}))}
			placeholder="Typeface"
			selectedValue={typeEntry.typeface}
			onChange={(name) => {
				const typeface = typefaces.find((t) => t.name === typeEntry.typeface);
				updateTypeEntry({
					typeface: name,
					// TODO set default variations
					variations: typeface?.variations.map((v) => [v[0], v[5]]) || []
				});
			}}
		/>
		<Number
			value={parseFloat(typeEntry.lineHeight)}
			postfix=""
			step={0.1}
			updateNumber={(lineHeight) => {
				updateTypeEntry({
					lineHeight: lineHeight.toFixed(1)
				});
			}}
		/>
		<Number
			value={parseFloat(typeEntry.fontSize.replace('px', ''))}
			postfix="px"
			updateNumber={(fontSize) => {
				updateTypeEntry({
					fontSize: `${fontSize}px`
				});
			}}
		/>
		<Select
			options={namedVariations.map((t) => ({
				name: t.name,
				value: t.variations,
				style: `font-family: ${typeEntry.typeface}; font-variation-settings: ${createCSSVariations(
					t.variations
				)}`
			}))}
			placeholder="Preset variation"
			selectedValue={typeEntry.variations}
			onChange={(variations) => {
				updateTypeEntry({
					variations
				});
			}}
		/>
		<div class="variations">
			{#each variations as v}
				<SettingsVariation
					variation={v}
					value={variationsByKey[v[0]]}
					onChange={(key, val) => {
						// TODO variations should be stored as an object
						const currentVariations = typeEntry.variations.reduce((acc, val) => {
							acc[val[0]] = val[1];
							return acc;
						}, {});
						currentVariations[key] = parseInt(val);
						updateTypeEntry({
							variations: Object.entries(currentVariations)
						});
					}}
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	.container {
		position: absolute;
		top: 20px;
		right: -140px;
		z-index: 99;
		height: 100%;
	}
	.settings {
		display: block;
		position: sticky;
		top: 10px;
		right: 0px;
		width: 240px;
		border: 2px solid var(--color-gold);
		background-color: var(--color-black);
	}

	.variations {
		padding: 10px 15px;
	}

	/* old */
	.settings-horizontal {
		position: sticky;
		top: 10px;
		left: 0px;
		right: 0px;
		border: 2px solid var(--color-white);
		background-color: var(--color-black);
		height: 54px;
		display: flex;
		flex-direction: row;
		z-index: 999;
	}
</style>
