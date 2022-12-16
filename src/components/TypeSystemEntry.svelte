<script lang="ts">
	export let typeEntry: TypeEntry;
	export let selectedEntry: string;
	export let setSelectedEntry: (e: string) => void;

	import type { TypeEntry } from '../stores/typeSystem';
	import createCSSVariations from '../lib/createCSSVariations';

	$: variation = createCSSVariations(typeEntry.variations);
</script>

<div class="type" class:active={typeEntry.key === selectedEntry}>
	<span
		on:click={() => setSelectedEntry(typeEntry.key)}
		on:keypress={() => setSelectedEntry(typeEntry.key)}
		class="type-text"
		style:font-family={typeEntry.typeface}
		style:font-size={typeEntry.fontSize}
		style:line-height={typeEntry.lineHeight}
		style:font-variation-settings={variation}
	>
		{typeEntry.example || typeEntry.name}
	</span>
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
</style>
