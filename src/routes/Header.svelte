<script>
	import { page } from '$app/stores';
</script>

<div class="page-buffer" />

<header class:page-home={$page.route.id === '/'} class:page-system={$page.route.id === '/system'}>
	<div class="header-content">
		<a href="/" class="header-page-home" class:active={$page.route.id === '/'}>Typefaces</a>
		<a href="/system" class="header-page-system" class:active={$page.route.id === '/system'}>System Creator</a>
	</div>
</header>

<style>
	header {
		background: rgba(0, 0, 0, 0.11);
		backdrop-filter: blur(30px);
		position: fixed;
		bottom: 20px;
		left: 50%;
		z-index: 999;
		border-radius: 100px;
		transform: translate(-50%, 0px);
		height: 70px;
    width: 350px;
    display: none;
	}

  @media (min-width: 800px){
    header {
      position: fixed;
      background: rgba(255, 255, 255, 0.11);
      bottom: auto;
      top: 20px;
    }
    .page-buffer {
      /* padding-top: 80px; */
      padding-top: 20px;
    }
  }

	.header-content {
		margin: 10px 0px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
	}

	header a {
		font-size: 18px;
		font-family: var(--typeface-body);
    font-weight: 600;
		color: var(--color-white);
    display: block;
		transition: all 0.3s;
		padding: 10px 0px;
		z-index: 4;
    text-align: center;
    position: absolute;
    -webkit-tap-highlight-color: transparent;
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

	header.page-home::after,
  .header-page-home {
		left: 10px;
		width: 150px;
	}

	header.page-system::after,
  .header-page-system {
		width: 180px;
		left: 160px;
	}

	a.active {
		color: var(--color-black);
		border-radius: 100px;
	}
</style>
