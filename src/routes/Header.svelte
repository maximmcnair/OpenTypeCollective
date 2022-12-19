<script>
	import { page } from '$app/stores';
</script>

<header class:page-home={$page.route.id === '/'} class:page-system={$page.route.id === '/system'}>
	<div class="header-content">
		<a href="/" class:active={$page.route.id === '/'}>Typefaces</a>
		<a href="/system" class:active={$page.route.id === '/system'}>System Creator</a>
	</div>
</header>

<style>
	header {
		background: rgba(255, 255, 255, 0.11);
		backdrop-filter: blur(30px);
		position: fixed;
		bottom: 20px;
		left: 50%;
		z-index: 999;
		border-radius: 100px;
		transform: translate(-50%, 0px);
		height: 70px;
    width: 301px;
	}

	.header-content {
		margin: 10px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
	}

	header a {
		font-size: 18px;
		font-family: var(--typeface-body);
		color: var(--color-white);
		transition: all 0.3s;
		padding: 10px 15px;
		z-index: 4;
	}
	header a:hover {
    text-decoration: none;
	}

	header::after {
		content: '';
		height: 50px;
		background-color: var(--color-white);
		display: block;
		position: absolute;
		top: 10px;
		z-index: 3;
		border-radius: 100px;
		transition: left 0.3s;
	}

	header.page-home::after {
		left: 10px;
		width: 121px;
	}

	header.page-system::after {
		width: 160px;
		left: 130px;
	}

	a.active {
		color: var(--color-black);
		border-radius: 100px;
	}
</style>
