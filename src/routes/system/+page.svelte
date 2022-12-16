<script lang="ts">
	// import { page } from '$app/stores';
	import TypeSystemEntry from '../../components/TypeSystemEntry.svelte';
	import TypeSystemCSS from '../../components/TypeSystemCSS.svelte';
	import { onDestroy } from 'svelte';
	import typeSystemStore from '../../stores/typeSystem';

	let typeSystem = {};

	const unsubscribe = typeSystemStore.subscribe((x) => {
		typeSystem = x;
	});

	onDestroy(unsubscribe);
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
		{#each Object.values(typeSystem) as typeEntry}
			<TypeSystemEntry {typeEntry} />
		{/each}
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
		margin-top: 80px;
	}

	.output {
		margin-top: 60px;
	}
</style>
