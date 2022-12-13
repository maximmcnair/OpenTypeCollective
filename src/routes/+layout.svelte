<script>
	import Header from './Header.svelte';
	import './styles.css';
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
  footer{
    margin: 130px 0px 30px 0px;
    text-align: center;
  }
</style>
