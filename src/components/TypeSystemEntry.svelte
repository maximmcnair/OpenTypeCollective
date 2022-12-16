<script lang="ts">
	export let typeEntry: TypeEntry;

	import Select from './Select.svelte';
	import { typefaces } from '../lib/typefaces';
	import typefaceMetaData from '../lib/typefaceMetaData.json';
	import type { TypeEntry } from '../stores/typeSystem';
	import typeSystemStore from '../stores/typeSystem';
	import createCSSVariations from '../lib/createCSSVariations';

	let showSettings = false;

	let typeface = typefaces.find((t) => t.name === typeEntry.typeface);
	$: typeface = typefaces.find((t) => t.name === typeEntry.typeface);

	let metaData = typeface ? typefaceMetaData[typeface.metaDataKey] : {};
	$: metaData = typeface ? typefaceMetaData[typeface.metaDataKey] : {};

	let namedVariations = [];
	$: namedVariations = Object.entries(metaData.namedVariations || []).map((v) => {
		return {
			name: v[0],
			variations: Object.entries(v[1])
		};
	});

	$: variation = createCSSVariations(typeEntry.variations);

	// $: console.log(variation);
	// $: console.log(typeEntry.variations);

	function updateTypeEntry(values: any) {
		typeSystemStore.update((s) => ({
			...s,
			[typeEntry.key]: {
				...s[typeEntry.key],
				...values
			}
		}));
	}

	// $: console.log('***', typeEntry.variations);
</script>

<div class="type">
	<div
		class="settings"
		on:click={() => (showSettings = true)}
		on:keypress={() => (showSettings = true)}
	>
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
			class="feather feather-settings"
			><circle cx="12" cy="12" r="3" /><path
				d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
			/></svg
		>
	</div>

	<div class="settings-config" style:display={showSettings ? 'block' : 'none'}>
		<div>
			<strong>Typeface</strong>
			<Select
				options={typefaces.map((t) => ({
					name: t.name,
					value: t.name,
					style: `font-family: ${t.name};`
				}))}
				closeOnSelection={true}
				selectedValue={typeEntry.typeface}
				onChange={(name) => {
					updateTypeEntry({
						typeface: name,
						// TODO set default variations
						variations: []
					});
				}}
			/>
		</div>
		<div>
			<strong>Preset Variations</strong>
			<Select
				options={namedVariations.map((t) => ({
					name: t.name,
					value: t.variations,
					style: `font-family: ${
						typeEntry.typeface
					}; font-variation-settings: ${createCSSVariations(t.variations)}`
				}))}
				closeOnSelection={false}
				selectedValue={typeEntry.variations}
				onChange={(variations) => {
					updateTypeEntry({
						variations
					});
				}}
			/>
		</div>
	</div>

	<span
		class="type-text"
		style:font-family={typeEntry.typeface}
		style:font-size={typeEntry.fontSize}
		style:line-height={typeEntry.lineHeight}
		style:font-variation-settings={variation}
	>
		{typeEntry.example || typeEntry.name}
	</span>
</div>

<div
	class="settings-config-bg"
	style:display={showSettings ? 'block' : 'none'}
	on:click={() => (showSettings = false)}
	on:keypress={() => (showSettings = false)}
/>

<style>
	.type {
		position: relative;
		/* background: blue; */
		margin-bottom: 10px;
	}

	.type-text {
		margin-right: 30px;
		display: block;
		/* background: red; */
	}

	.settings {
		position: absolute;
		top: 0px;
		right: 0px;
		cursor: pointer;
	}

	.settings-config {
		background-color: white;
		position: absolute;
		top: 0px;
		right: 0px;
		width: 300px;
		height: 200px;
		z-index: 3;
		display: none;

		color: var(--color-black);
		border-radius: 3px;
	}

	.settings-config-bg {
		position: absolute;
		top: 0px;
		bottom: 0px;
		z-index: 2;
		left: 0px;
		right: 0px;
	}
</style>
