<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let isHomePage = $page.route.id === '/';
	$: isHomePage = $page.route.id === '/';
	let visible = isHomePage ? false : true;

	function getScrollPosY() {
		return window.scrollY || document.documentElement.scrollTop;
	}

	type Direction = 'up' | 'down' | 'none';

	let prevScroll = 0;
	let currentScroll = 0;

	let direction: Direction = 'none';

	function handleScroll() {
		currentScroll = getScrollPosY();

		if (currentScroll > prevScroll) {
			direction = 'down';
		} else if (currentScroll < prevScroll) {
			direction = 'up';
		}

		if (!isHomePage && currentScroll === 0) {
			visible = true;
		} else if (direction === 'up' && ((isHomePage && currentScroll > 600) || !isHomePage)) {
			visible = true;
		} else {
			visible = false;
		}

		prevScroll = currentScroll;
	}

	onMount(() => {
		prevScroll = getScrollPosY();
		currentScroll = prevScroll;
	});

	// $: console.log(visible);
</script>

<svelte:window on:scroll={handleScroll} />

<header class:header-hide={!visible}>
	<h1>OpenType Collective</h1>

	<nav>
		<a href="/">Typefaces</a>
		<!-- <a href="/pairings">Pairings</a> -->
	</nav>
</header>

<style>
	header {
		padding: 10px 30px 10px 20px;
		background: var(--color-black);
		height: 70px;
		/* border-bottom: 2px solid var(--color-white); */
		display: flex;
		justify-content: space-between;
		z-index: 99;
		transition: all 0.3s;

    display: none;

		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		transform: translate(0px, 0px);
	}

	.header-hide {
		transform: translate(0px, -70px);
	}

	h1 {
		font-size: 34px;
	}

	nav {
		text-align: right;
		display: flex;
		gap: 20px;
	}

	nav a {
		margin-top: 6px;
		font-size: 22px;
		color: var(--color-white);
	}
</style>
