<script lang="ts">
	import typeSystemStore, { type TypeEntry } from '../stores/typeSystem';
	import { typefaces, type Variation } from '../lib/typefaces';
	import typefaceMetaData from '../lib/typefaceMetaData.json';
	import createCSSVariations from '../lib/createCSSVariations';
	import Select from './Select.svelte';
	import Number from './Number.svelte';
	import { onMount, onDestroy } from 'svelte';
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

	let variations: Variation[] = [];
	$: variations = getVariations(typeEntry) || [];

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

	function capitalizeFirstLetter(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
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

	let settingsIsOpen = false;
	onMount(() => {
		if (document?.body?.clientWidth > 600) {
			settingsIsOpen = true;
		}
	});
</script>

<div class="container">
	<div class="settings">
		<header class="settings-header" on:click={() => (settingsIsOpen = !settingsIsOpen)}>
			<span>{capitalizeFirstLetter(selectedEntry)}</span>
			<div class="settings-chevron" class:open={settingsIsOpen}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9" /></svg
				>
			</div>
		</header>

		<div class="settings-body" class:open={settingsIsOpen}>
			<div class="hide">
				<Select
					options={entries.map((e) => ({
						name: capitalizeFirstLetter(e),
						value: e
					}))}
					placeholder=""
					selectedValue={selectedEntry}
					onChange={(entry) => {
						setSelectedEntry(entry);
					}}
				/>
			</div>
			<Select
				options={typefaces.map((t) => ({
					name: t.name,
					value: t.name,
					style: `font-family: ${t.name};`
				}))}
				placeholder="Typeface"
				selectedValue={typeEntry.typeface}
				onChange={(name) => {
					const typeface = typefaces.find((t) => t.name === name);
					updateTypeEntry({
						typeface: name,
						variations:
							typeface?.variations.reduce((acc, val) => {
								acc[val[0]] = val[4];
								return acc;
							}, {}) || {}
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
			{#if namedVariations.length}
				<Select
					options={namedVariations.map((t) => ({
						name: t.name,
						value: t.variations.reduce((acc, val) => {
							acc[val[0]] = val[1];
							return acc;
						}, {}),
						style: `font-family: ${
							typeEntry.typeface
						}; font-variation-settings: ${createCSSVariations(t.variations)}`
					}))}
					placeholder="Preset variation"
					selectedValue={typeEntry.variations}
					onChange={(variations) => {
						updateTypeEntry({
							variations
						});
					}}
				/>
			{/if}
			<div class="variations">
				{#each Object.entries(typeEntry.variations) as variation}
					<SettingsVariation
						key={variation[0]}
						value={variation[1]}
						variation={variations.find((v) => {
							return v[0] === variation[0];
						})}
						onChange={(key, val) => {
							const newObj = { ...typeEntry.variations };
							newObj[key] = parseInt(val);
							updateTypeEntry({
								variations: newObj
							});
						}}
					/>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		position: absolute;
		z-index: 99;
		height: 100%;
		pointer-events: none;
	}

	.settings {
		position: sticky;
		top: 0px;
		pointer-events: auto;
		display: block;
		/* border: 2px solid var(--color-gold); */
		background-color: var(--color-black);
	}

	.settings-header {
		border: 2px solid var(--color-gold);
		padding: 10px 15px;
		color: var(--color-gold);
		position: relative;
		cursor: pointer;
	}

	.settings-chevron {
		position: absolute;
		top: 15px;
		right: 15px;
		width: 22px;
		height: 22px;
		pointer-events: none;
		transition: all 0.6s;
	}
	.settings-chevron.open {
		transform: rotate(180deg);
		transform-origin: center;
	}

	.settings-body {
		height: 0px;
		transition: height 0.3s;
		overflow: hidden;
	}
	.settings-body.open {
		overflow: visible;
		height: auto;
		border: 2px solid var(--color-gold);
		border-top: none;
	}

	@media (min-width: 600px) {
		.container {
			top: 80px;
			right: 0px;
		}
		.settings {
			top: 60px;
			right: 0px;
			width: 240px;
		}
	}

	.variations {
		padding: 10px 15px;
	}

	@media (min-width: 900px) {
		.container {
			right: -20px;
		}
	}

	@media (min-width: 1100px) {
		.container {
			right: -120px;
		}
	}

	@media (min-width: 1200px) {
		.container {
			right: -180px;
		}
	}

	@media (min-width: 1250px) {
		.container {
			right: -200px;
		}
	}

	@media (min-width: 1340px) {
		.container {
			right: -260px;
		}
	}
</style>
