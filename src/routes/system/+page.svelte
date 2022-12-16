<script lang="ts">
	// import { page } from '$app/stores';
	import TypeSystemEntry from '../../components/TypeSystemEntry.svelte';
	import TypeSystemCSS from '../../components/TypeSystemCSS.svelte';
	import { onDestroy } from 'svelte';
	import typeSystemStore from '../../stores/typeSystem';

	let name = '';

	let typeSystem = {};

	const unsubscribe = typeSystemStore.subscribe((x) => {
		typeSystem = x;
	});

	onDestroy(unsubscribe);
</script>

<section class="content">
	<header class="header">
		<input bind:value={name} placeholder="Name your type system" />
	</header>

	<section class="system">
		{#each Object.values(typeSystem) as typeEntry}
			<TypeSystemEntry {typeEntry} />
		{/each}
	</section>

	<section class="output">
		<TypeSystemCSS {typeSystem} />
	</section>
</section>

<style>
	.header {
		margin-top: 20px;
		width: 90%;
		max-width: var(--layout-max-width);
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	/* TODO make reusable class */
	.system,
	.output {
		margin-top: 80px;
		width: 90%;
		max-width: var(--layout-max-width);
	}
</style>
