<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import { typefaces } from '../../../lib/typefaces';
	// import autosize from '../../../lib/autosize';
	import pangrams from '../../../lib/pangrams';
	import typefaceMetaData from '../../../lib/typefaceMetaData.json';
	import { characterSets } from '../../../lib/character-sets';
	// import TypefaceDials from '../../../components/TypefaceDials.svelte';

	const typefacename = $page.params.slug;
	const typeface = typefaces.find((t) => t.name === typefacename);
	const metaData = typeface ? typefaceMetaData[typeface.metaDataKey] : {};

	// type tester
	let typeTesterValue = pangrams[0];
	const namedVariations = Object.entries(metaData.namedVariations || []).map((v) => {
		return {
			name: v[0],
			variations: Object.entries(v[1])
		};
	});

	const truncateLength = 15;

	const truncatedVariations = namedVariations.slice(0, truncateLength);

	let showAllVariations = truncateLength > namedVariations.length;

	// pangram
	function randomPangram() {
		const max = pangrams.length;
		const min = 0;
		const randomValue = Math.floor(Math.random() * (max - min) + min);
		typeTesterValue = pangrams[randomValue];
	}

	// Character cursor hover
	class Cursor {
		constructor(el) {
			this.DOM = { el: el };
			this.char = undefined;
			this.mouse = { x: 0, y: 0 };
			this.lastX = 0;
			this.lastY = 0;

			this.onMouseMoveEvt = (evt) => {
				this.mouse = { x: evt.clientX, y: evt.clientY };
				requestAnimationFrame(() => this.render());
			};
			window.addEventListener('mousemove', this.onMouseMoveEvt);
		}

		render() {
			if (!this.DOM.el) return;
			const style = this.DOM.el.style;

			const heightOffset = 20 / 2;
			const widthOffset = 20 / 2;

			style.transform = `translate(${this.mouse.x - widthOffset}px, ${
				this.mouse.y - heightOffset
			}px)`;

			this.DOM.el.innerHTML = this.char;

			if (this.char) {
				style.display = 'flex';
				style.transform = `translate(${this.mouse.x - widthOffset}px, ${
					this.mouse.y - heightOffset
				}px)`;
			} else {
				style.display = 'none';
				style.backgroundImage = null;
			}
		}

		setChar(char) {
			this.char = char;
		}
	}

	let cursor;
	onMount(async () => {
		cursor = new Cursor(document.querySelector('.cursor'));
	});

	function handleCharMouseEnter(char) {
		cursor?.setChar(char);
	}
	function handleCharMouseLeave() {
		cursor?.setChar(undefined);
	}

	const fontFaceImport = `<style>
/* ${typefacename}} */
@font-face {
  src: url('/typefaces/${typefacename}.woff2') format('woff2');
  font-family: '${typefacename}';
  font-style: normal;
  font-display: block;
}
</style>`;

	let value = pangrams[0];

	let variations = typeface?.variations.reduce((acc, val) => {
		acc[val[0]] = val[4];
		return acc;
	}, {});

	$: variation = Object.entries(variations)
		.map((v) => `"${v[0]}" ${variations[v[0]]}`)
		.join(', ');

  $: console.log(variations);

	function dice() {
		// randomise each variation
		for (const variation in typeface.variations) {
			const [name, , min, max] = typeface.variations[variation];
			const randomValue = Math.floor(Math.random() * (max - min) + min);
			variations[name] = randomValue;
		}
	}

	function setPreset(v) {
    variations = v?.variations.reduce((acc, val) => {
      acc[val[0]] = val[1];
      return acc;
    }, {});
	}
</script>

<svelte:head>
	<title>{typefacename} • OpenType Collective</title>
	<meta
		name="description"
		content="A collection of open source typefaces that you can use on any opensource project."
	/>

	<link
		rel="preload"
		href={`/typefaces/${typefacename}.woff2`}
		as="font"
		type="font/woff2"
		crossorigin="true"
	/>

	{@html fontFaceImport}
</svelte:head>

<div style:font-family={typeface.name} style:font-variation-settings={variation} class="cursor" />

<article class="content-wrapper" style:font-family={typeface.name}>
	<header class="header">
		<h1 style:font-family={typeface.name} class="header-typename">{typefacename}</h1>
		<span class="header-creator" style:font-family="var(--typeface-body)"
			>by <a href={typeface.source} target="_blank">{typeface.foundery}</a></span
		>
		<span class="header-license" style:font-family="var(--typeface-body)">
			<a href={typeface?.licenseLink} target="_blank"> SIL Open Font License</a>
		</span>
	</header>

	<section class="content custom-variations">
		<span
			class="type-tester__text"
			style:font-family={typeface.name}
			style:font-variation-settings={variation}
		>
			{value}
		</span>

		<div class="variations">
			{#each typeface.variations as v}
				<label>
					<span style:font-family="Inter">{v[1]} <span style:color="var(--color-grey)">{variations[v[0]]}</span></span>
					<input type="range" bind:value={variations[v[0]]} min={v[2]} max={v[3]} step={v[5]} />
				</label>
			{/each}
		</div>

		<div class="info">
			<div on:click={dice} class="dice" style:font-family="Inter">
				<img src="/dice.svg" class="dice-icon" />
				Throw the dice
			</div>
		</div>
	</section>

  <div class="use-typeface-button">
    <a class="button button-gold" href={`/typefaces/${typefacename}.woff2`} target="_blank" rel="noreferrer">Download Typeface</a>
  </div>

	{#if namedVariations.length}
		<section class="content named-variations">
			<h5 class="subtitle">Preset Variations (click to use)</h5>
			{#if showAllVariations}
				{#each namedVariations as v}
					<div class="named-variation" on:click={() => setPreset(v)}>
						<small class="variation-values" style:font-family={typefacename}>
							{v.name} : {v.variations.map((v) => `${v[0]}: ${v[1]}`).join(', ')}
						</small>
						<span
							class="named-variation-input"
							style:font-family={typefacename}
							style:font-variation-settings={v.variations
								.map((v) => `"${v[0]}" ${v[1]}`)
								.join(', ')}
						>
							{v.name}
						</span>
						{#if false}
							<input
								class="named-variation-input"
								style:font-family={typefacename}
								style:font-variation-settings={v.variations
									.map((v) => `"${v[0]}" ${v[1]}`)
									.join(', ')}
								value={v.name}
							/>
						{/if}
					</div>
				{/each}
			{:else}
				{#each truncatedVariations as v}
					<div class="named-variation" on:click={() => setPreset(v)}>
						<small class="variation-values" style:font-family={typefacename}>
							{v.name} : {v.variations.map((v) => `${v[0]}: ${v[1]}`).join(', ')}
						</small>
						<span
							class="named-variation-input"
							style:font-family={typefacename}
							style:font-variation-settings={v.variations
								.map((v) => `"${v[0]}" ${v[1]}`)
								.join(', ')}
						>
							{v.name}
						</span>
						{#if false}
							<input
								class="named-variation-input"
								style:font-family={typefacename}
								style:font-variation-settings={v.variations
									.map((v) => `"${v[0]}" ${v[1]}`)
									.join(', ')}
								value={v.name}
							/>
						{/if}
					</div>
				{/each}

				<div class="center">
					<button class="button button-grey" on:click={() => (showAllVariations = true)}
						>Show all variations</button
					>
				</div>
			{/if}
		</section>
	{/if}

	<section class="content para-preview">
		<h5 class="subtitle">Paragraph</h5>
		<span
			class="para-preview__type"
			style:line-height="1.4"
			style:font-size="40px"
			style:font-family={typeface?.name}
			style:font-variation-settings={variation}
    >At consectetur lorem donec massa sapien faucibus et.</span
		>
		<span
			class="para-preview__type"
			style:line-height="1.75"
			style:font-size="18px"
			style:font-family={typeface?.name}
			style:font-variation-settings={variation}
		>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Massa vitae tortor condimentum lacinia quis vel eros donec ac.
			At tempor commodo ullamcorper a lacus vestibulum sed arcu. Feugiat pretium nibh ipsum
			consequat. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Vitae tortor
			condimentum lacinia quis vel eros donec. Tellus elementum sagittis vitae et leo. Ultrices dui
			sapien eget mi proin sed. Posuere lorem ipsum dolor sit amet. Sapien eget mi proin sed libero
			enim sed faucibus turpis. Varius vel pharetra vel turpis nunc eget lorem. Sit amet porttitor
			eget dolor morbi.
		</span>
	</section>

	<section class="content character-sets">
		<h5 class="subtitle">Character Sets</h5>
		{#each characterSets as set}
			<div class="character-set">
				<span class="character-set__title">{set[0]}</span>
				<div class="character-set__chars">
					{#each set[1].split('') as char}
						<span
							class="character-set__char"
							on:mouseenter={() => handleCharMouseEnter(char)}
							on:mouseleave={handleCharMouseLeave}
							style:font-family={typeface.name}
							style:font-variation-settings={variation}
						>
							{char}
						</span>
					{/each}
				</div>
			</div>
		{/each}
	</section>

  <div class="use-typeface-button">
    <a class="button button-gold" href={`/typefaces/${typefacename}.woff2`} target="_blank" rel="noreferrer">Download Typeface</a>
  </div>
</article>

<style>
	.header {
		text-align: center;
    margin-top: 60px;
		margin-bottom: 40px;
	}

	@media (min-width: 800px) {
		.header {
      margin-top: 40px;
			margin-bottom: 70px;
		}
	}

	.header-typename {
		margin-top: 0px;
		margin-bottom: 0px;
	}

	.header-license {
		display: block;
		color: var(--color-grey-light);
		margin-top: 10px;
		margin-bottom: 0px;
	}

	.header-license a {
		color: var(--color-grey-light);
		font-weight: 500;
	}

	.header-creator {
		margin-top: 0px;
		color: var(--color-grey-light);
		margin-bottom: 0px;
	}

	textarea {
		display: block;
		width: 100%;
		font-size: 40px;
		line-height: 1.5;
		text-align: center;
	}

	@media (min-width: 600px) {
		textarea {
			font-size: 80px;
		}
	}

	/* Tester */
	.type-tester {
		margin-bottom: 50px;
	}

	.type-tester__text {
		display: block;
		font-size: var(--typesize-h2);
		line-height: 1.3;
		text-align: center;
	}

	@media (min-width: 800px) {
		.type-tester__text {
			font-size: var(--typesize-h1);
			line-height: 1.3;
		}
	}

	.pangram {
		display: block;
		/* display: none; */
		text-align: center;
		margin-bottom: 50px;
	}

	.pangram-title {
		display: block;
		text-transform: uppercase;
		cursor: pointer;
		color: var(--color-grey);
		user-select: none;
		font-size: 18px;
		margin-bottom: 0px;
		margin-top: 35px;
		font-family: var(--typeface-body);
		font-weight: 600;
		transition: all 0.3s;
		-webkit-tap-highlight-color: transparent;
	}

	.pangram-title:hover {
		color: var(--color-white);
	}

	.pangram-options {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 5px;
		margin-top: 6px;
	}

	.pangram-option {
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background: var(--color-black);
		border: 2px solid var(--color-grey);
		transition: all 0.3s;
		cursor: pointer;
	}

	.pangram-option:hover {
		border-color: var(--color-white);
	}

	.pangram-option[data-active='true'] {
		background: var(--color-white);
		border-color: var(--color-white);
	}

	.para-preview__type {
		display: block;
		margin-bottom: 20px;
	}

	.named-variations {
		margin-top: 80px;
	}

	.named-variation {
		display: block;
	}

	.named-variation-input {
		font-size: 40px;
		margin-top: 5px;
		margin-bottom: 20px;
		display: block;
		cursor: pointer;
	}

	.variation-values {
		color: var(--color-grey);
		transition: all 0.3s;
	}

	.variation-values:hover {
		color: var(--color-white);
	}

	.variation-values svg {
		transform: translate(8px, 4px);
	}

	/* Custom Variations */
	.custom-variations {
		position: sticky;
		top: 0px;
		padding-top: 20px;
		padding-bottom: 20px;
		background-color: var(--color-black);
	}

	.custom-variations h5 {
		margin-bottom: 40px;
	}

	/* Character Sets */
	.character-sets {
		margin-top: 80px;
	}

	.character-set {
		margin-bottom: 60px;
	}

	.character-set__title {
		font-family: var(--typeface-body);
		font-size: 20px;
		font-weight: 600;
		display: block;
		margin-bottom: 10px;
	}

	.character-set__chars {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
		border-top: 2px solid var(--color-white);
		border-left: 2px solid var(--color-white);
	}

	.character-set__char {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid var(--color-white);
		border-top: none;
		border-left: none;
		aspect-ratio: 1;
		font-size: 25px;
		transition: all 0.3s;
	}

	.character-set__char:hover {
		background: var(--color-white);
		color: var(--color-black);
	}

	.cursor {
		width: 220px;
		height: 220px;
		max-width: 100vh;
		position: fixed;
		top: 0px;
		left: 0px;
		border: 1px solid var(--color-white);
		/* border-radius: 50%; */
		background-size: contain;
		background-repeat: no-repeat;
		pointer-events: none;
		background-color: var(--color-white);
		color: var(--color-black);
		font-size: 160px;
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 2;
	}

	.variations {
		display: flex;
		justify-content: center;
		text-align: center;
		gap: 20px;
		margin-top: 30px;
		margin-bottom: 40px;
	}

	.dice {
		position: relative;
		padding-left: 35px;
		cursor: pointer;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		color: var(--color-grey-light);
		transition: all 0.3s;
	}
	.dice:hover {
		color: var(--color-white);
	}
	.dice-icon {
		width: 25px;
		height: 25px;
		transform-origin: center;
		transform: rotate(10deg) translate(0, 0);
		transition: all 0.3s;
		position: absolute;
		top: 4px;
		left: 0px;
	}
	.dice:active .dice-icon {
		transform: rotate(-10deg) translate(0px, -10px);
	}

	.info {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.type-tester__text {
		cursor: default;
		display: block;
		font-size: var(--typesize-h2);
		line-height: 1.3;
		text-align: center;
	}

	@media (min-width: 800px) {
		.type-tester__text {
			font-size: var(--typesize-h1);
			line-height: 1.3;
		}
	}

	.para-preview{
    margin-top: 40px;
  }
</style>
