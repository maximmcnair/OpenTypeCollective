<script>
	import { onMount } from 'svelte';
	import { typefaces } from '../lib/typefaces';
	import Header from './Header.svelte';
	import './styles.css';
	import FontFaceObserver from 'fontfaceobserver';
  // import Cursor from '../components/Cursor.svelte'
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

<!-- <Cursor /> -->

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
    <div>
		  A tool by <a href="https://www.maximmcnair.com" target="_blank" rel="noreferrer">Maxim McNair</a>
    </div>
    <div> 
      This is an open source project on <a href="https://github.com/maximmcnair/OpenTypeCollective" target="_blank" rel="noreferrer">Github</a>
    </div>
	</footer>
</div>

<style>
	footer {
		margin: 130px 0px 130px 0px;
		text-align: center;
	}
</style>
