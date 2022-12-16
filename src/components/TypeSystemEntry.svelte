<script lang="ts">
	export let typeEntry: TypeEntry;

	import type { TypeEntry } from '../stores/typeSystem';
	import createCSSVariations from '../lib/createCSSVariations';

	$: variation = createCSSVariations(typeEntry.variations);
</script>

<div class="type">
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

<style>
	.type {
		position: relative;
		margin-bottom: 10px;
	}
</style>
