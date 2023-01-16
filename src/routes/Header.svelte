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
		background: rgba(255, 255, 255, 0.11);
		backdrop-filter: blur(30px);
		position: fixed;
		bottom: 20px;
		left: 50%;
		z-index: 999;
		border-radius: 100px;
		transform: translate(-50%, 0px);
		height: 70px;
    width: 311px;
	}

  @media (min-width: 800px){
    header {
      position: fixed;
      bottom: auto;
      top: 20px;
    }
    .page-buffer {
      padding-top: 80px;
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
		padding: 10px 15px;
		z-index: 4;
    text-align: center;
    position: absolute;
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

  .header-page-home {
		left: 10px;
		width: 130px;
  }

  .header-page-system {
		width: 180px;
		left: 130px;
  }

	header.page-home::after {
		left: 10px;
		width: 130px;
	}

	header.page-system::after {
		width: 160px;
		left: 140px;
	}

	a.active {
		color: var(--color-black);
		border-radius: 100px;
	}
</style>
