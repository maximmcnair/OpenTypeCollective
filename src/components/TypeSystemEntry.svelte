<script lang="ts">
	export let typeEntry: TypeEntry;
	export let selectedEntry: string;
	export let setSelectedEntry: (e: string) => void;

	import type { TypeEntry } from '../stores/typeSystem';
	import { createCSSVariationsFromObject } from '../lib/createCSSVariations';

	$: variation = createCSSVariationsFromObject(typeEntry.variations);

	let text = typeEntry.example || typeEntry.name;
</script>

<div class="type" class:active={typeEntry.key === selectedEntry}>
	<span
		on:click={() => setSelectedEntry(typeEntry.key)}
		on:focus={() => setSelectedEntry(typeEntry.key)}
		on:keypress={() => setSelectedEntry(typeEntry.key)}
		class="type-text"
		style:font-family={typeEntry.typeface}
		style:font-size={typeEntry.fontSize}
		style:line-height={typeEntry.lineHeight}
		style:font-variation-settings={variation}
		contenteditable="true"
		bind:innerHTML={text}
	/>
</div>

<style>
	.type {
		position: relative;
		margin-bottom: 10px;
		cursor: pointer;
		margin-left: -13px;
		padding-left: 10px;
		transition: all 0.3s;
		border-left: 3px solid var(--color-black);
	}
	.type:hover {
		border-color: var(--color-grey);
	}
	.type.active {
		border-color: var(--color-gold);
	}
	.type-text {
		outline: none;
	}
</style>
