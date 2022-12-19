<script lang="ts">
	import { typefaces } from '../lib/typefaces';
	import TypefacePreview from '../components/TypefacePreview.svelte';
	import CursorVariationType from '../components/CursorVariationType.svelte';
</script>

<svelte:head>
	<title>OpenType Collective</title>
	<meta name="description" content="A collection of open source typefaces that you can use on any opensource project." />
</svelte:head>

<section class="content-wrapper">
	<div class="content intro-text">
		<h1>
			<CursorVariationType text="OpenType Collective" />
		</h1>
		<h3>A collection of open source typefaces that you can use on any opensource project.</h3>
		<h3>
			Build a typographic system from curated variable fonts then download fonts and CSS.
		</h3>
	</div>
</section>

{#each typefaces as typeface}
	<TypefacePreview {typeface} />
{/each}

<style>
	.intro-text {
		margin-top: 40px;
		margin-bottom: 200px;
		text-align: center;
	}

	h1 {
		margin: 0px;
		font-size: 140px;
	}

	h3 {
		font-size: 40px;
		font-variation-settings: 'opsz' 40, 'wght' 300, 'SOFT' 0, 'WONK' 1;
		margin: 0px 0px 20px 0px;
	}
</style>
