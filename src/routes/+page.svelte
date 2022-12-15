<script lang="ts">
	import { typefaces } from '../lib/typefaces';
	import TypefacePreview from '../components/TypefacePreview.svelte';
	import CursorVariationType from '../components/CursorVariationType.svelte';
</script>

<svelte:head>
	<title>OpenType Collective</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="intro">
	<div class="intro-text">
		<h1>
			<CursorVariationType text="OpenType Collective" />
		</h1>
		<h3>A collection of open source typefaces that you can use on any opensource project.</h3>
	</div>
</section>

<section class="type-previews">
	{#each typefaces as typeface}
		<TypefacePreview {typeface} />
	{/each}
</section>

<style>
	.intro {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.intro-text {
		margin-top: 40px;
		margin-bottom: 200px;
		width: 90%;
		max-width: var(--layout-max-width);
		text-align: center;
	}

	h1 {
		margin: 0px;
		font-size: 140px;
	}
	h3 {
		font-size: 40px;
		font-variation-settings: 'opsz' 40, 'wght' 300, 'SOFT' 0, 'WONK' 1;
		margin: 0px;
	}
</style>
