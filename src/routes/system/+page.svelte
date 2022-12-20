<script lang="ts">
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';

	import { typefaces } from '../../lib/typefaces';
	import TypeSystemEntry from '../../components/TypeSystemEntry.svelte';
	import TypeSystemCSS from '../../components/TypeSystemCSS.svelte';
	import typeSystemStore from '../../stores/typeSystem';
	import TypeSystemSettings from '../../components/TypeSystemSettings.svelte';

	let typeSystem = {};

	const unsubscribe = typeSystemStore.subscribe((x) => {
		typeSystem = x;
	});

	onMount(() => {
		const newTypeface = $page.url.searchParams.get('typeface');

		if (!newTypeface) return;

		typeSystemStore.update((current) => {
			const newTypefaceData = typefaces.find((t) => t.name === newTypeface);

			const defaultVariations = newTypefaceData?.variations
				? newTypefaceData.variations.reduce((acc, val) => {
						acc[val[0]] = val[4];
						return acc;
				  }, {})
				: {};

			if (newTypeface) {
				const entries = Object.keys(typeSystem);
				const updated = { ...current };
				// update each entry to newTypeface
				for (const entry of entries) {
					updated[entry].typeface = newTypeface;
					updated[entry].variations = { ...defaultVariations };
				}
				return updated;
			}
			return current;
		});
	});

	onDestroy(unsubscribe);

	let selectedEntry = 'h1';

	function setSelectedEntry(val: string) {
		selectedEntry = val;
	}
</script>

<svelte:head>
	<title>System Creator • OpenType Collective</title>
	<meta
		name="description"
		content="A collection of open source typefaces that you can use on any opensource project."
	/>
</svelte:head>

<section class="content-wrapper">
	<section class="content intro">
		<h2>Create a Typographic System</h2>
		<span>Config your system here <br />then download CSS and typefaces below</span>
	</section>

	<section class="content system">
		<TypeSystemSettings {selectedEntry} {setSelectedEntry} />

		<div class="system-enteries">
			{#each Object.values(typeSystem) as typeEntry}
				<TypeSystemEntry {typeEntry} {selectedEntry} {setSelectedEntry} />
			{/each}
		</div>
	</section>

	<section class="content output">
		<TypeSystemCSS {typeSystem} />
	</section>
</section>

<style>
	.intro {
		margin-top: 0px;
		text-align: center;
	}

	.system {
		position: relative;
		margin-top: 60px;
	}

	@media (min-width: 600px) {
		.system {
			margin-top: 20px;
		}
	}

	.system-enteries {
		margin-top: 80px;
	}

	.output {
		margin-top: 60px;
	}
</style>
