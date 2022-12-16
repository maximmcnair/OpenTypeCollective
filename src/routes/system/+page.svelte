<script lang="ts">
	// import { page } from '$app/stores';
	import TypeSystemEntry from '../../components/TypeSystemEntry.svelte';
	import TypeSystemCSS from '../../components/TypeSystemCSS.svelte';
	import typeSystemStore from '../../stores/typeSystem';
	import TypeSystemSettings from '../../components/TypeSystemSettings.svelte';

	import { onDestroy } from 'svelte';

	let typeSystem = {};

	const unsubscribe = typeSystemStore.subscribe((x) => {
		typeSystem = x;
	});

	onDestroy(unsubscribe);

	let selectedEntry = 'h1';

	function setSelectedEntry(val: string) {
		selectedEntry = val;
	}
</script>

<svelte:head>
	<title>System Creator • OpenType Collective</title>
	<meta name="description" content="" />
</svelte:head>

<section class="content-wrapper">
	<section class="content intro">
		<h2>Create a Typographic System</h2>
		<span>Download CSS and typefaces below</span>
	</section>

	<section class="content system">
		<TypeSystemSettings {selectedEntry} {setSelectedEntry} />

		<div class="content system-enteries">
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
		margin-top: 60px;
		text-align: center;
	}

	.system {
		margin-top: 60px;
	}

	.system-enteries {
		margin-top: 20px;
	}

	.output {
		margin-top: 60px;
	}
</style>
