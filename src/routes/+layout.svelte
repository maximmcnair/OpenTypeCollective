<script>
	import { onMount } from 'svelte';
	import { typefaces } from '../lib/typefaces';
	import Header from './Header.svelte';
	import './styles.css';
	import FontFaceObserver from 'fontfaceobserver';
	import { loadTypefaces } from '../lib/loadTypefaces';

	onMount(async () => {
		var fontInter = new FontFaceObserver('Inter');
		var fontFraunces = new FontFaceObserver('Fraunces');

		Promise.all([fontInter.load(), fontFraunces.load()]).then(function () {
			// Inter & Fraunces (our UI typefaces) have loaded
			// Let's download additional ones
			const additionalTypefaces = typefaces
				.map((t) => t.name)
				.filter((t) => t !== 'Inter' && t !== 'Fraunces');
			loadTypefaces(additionalTypefaces);
		});
	});
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		A tool by <a href="https://www.maximmcnair.com" target="_blank">Maxim McNair</a>
	</footer>
</div>

<style>
	footer {
		margin: 130px 0px 130px 0px;
		text-align: center;
	}
</style>
