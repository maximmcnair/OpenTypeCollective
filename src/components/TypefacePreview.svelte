<script>
	import TypefaceDials from './TypefaceDials.svelte';
	export let typeface;
</script>

<div class="typeface-preview">
	<div class="content">
		<TypefaceDials {typeface} defaultText={typeface.name} />
		<div class="specimen-link">
			<a class="button button-gold" href={`/typeface/${typeface.name}`}>View Typeface Specimen</a>
		</div>
	</div>
</div>

<style>
	.typeface-preview {
		padding-top: 30px;
		border-bottom: 2px solid var(--color-grey-dark);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.content {
		width: 90%;
		max-width: 1200px;
		padding: 30px 0px 70px 0px;
		position: relative;
	}

	.specimen-link {
		margin-top: 60px;
		text-align: center;
		display: block;
	}
</style>
