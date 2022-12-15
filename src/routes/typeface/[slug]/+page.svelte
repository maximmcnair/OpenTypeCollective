<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import { typefaces } from '../../../lib/typefaces';
	import pangrams from '../../../lib/pangrams';
	import typefaceMetaData from '../../../lib/typefaceMetaData.json';
	import { characterSets } from '../../../lib/character-sets';
	import TypefaceDials from '../../../components/TypefaceDials.svelte';

	const typefacename = $page.params.slug;
	const typeface = typefaces.find((t) => t.name === typefacename);
	const metaData = typeface ? typefaceMetaData[typeface.metaDataKey] : {};

	let typeTesterValue = pangrams[0];
	const namedVariations = Object.entries(metaData.namedVariations || []).map((v) => {
		return {
			name: v[0],
			variations: Object.entries(v[1])
		};
	});

	function handleCopyVariation(variation) {
		navigator.clipboard.writeText(`font-variation-settings: ${variation};`);
	}

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
			  style.display = "flex";
			  style.transform = `translate(${this.mouse.x - widthOffset}px, ${
			    this.mouse.y - heightOffset
			  }px)`;
			} else {
			  style.display = "none";
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
</script>

<svelte:head>
	<title>{typefacename} | OpenTypeCollective</title>
	<meta name="description" content="" />
</svelte:head>

<div style:font-family={typeface.name} class="cursor" />

<article class="content" style:font-family={typeface.name}>
	<header class="header">
		<h1 style:font-family={typeface.name} class="header-typename">{typefacename}</h1>
		<span class="header-creator"
			>by <a href={typeface.source} target="_blank">{typeface.foundery}</a></span
		>
	</header>

	<section class="tester">
		<label class="pangram">
			<span class="pangram-title" on:click={randomPangram}>Pick a Pangram</span>
			<div class="pangram-options">
				{#each pangrams as pangram}
					<div
						on:click={() => (typeTesterValue = pangram)}
						class="pangram-option"
						data-active={typeTesterValue === pangram}
					/>
				{/each}
			</div>
		</label>

		<TypefaceDials isMultiline={true} fontSize={100} {typeface} defaultText={typeTesterValue} />
	</section>

	<section class="named-variations">
		{#each namedVariations as v}
			<div class="named-variation">
				<small
					class="variation-values"
					style:font-family="Inter"
					on:click={() =>
						handleCopyVariation(v.variations.map((v) => `"${v[0]}" ${v[1]}`).join(', '))}
				>
					{v.name} : {v.variations.map((v) => `${v[0]}: ${v[1]}`).join(', ')}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-copy"
					>
						<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
						<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
					</svg>
				</small>
				<input
					class="named-variation-input"
					style:font-family="Inter"
					style:font-variation-settings={v.variations.map((v) => `"${v[0]}" ${v[1]}`).join(', ')}
					value={v.name}
				/>
			</div>
		{/each}
	</section>

	<section class="character-sets">
		{#each characterSets as set}
			<div class="character-set">
				<span class="character-set__title">{set[0]}</span>
				<div class="character-set__chars">
					{#each set[1].split('') as char}
						<span
							class="character-set__char"
							on:mouseenter={() => handleCharMouseEnter(char)}
							on:mouseleave={handleCharMouseLeave}
						>
							{char}
						</span>
					{/each}
				</div>
			</div>
		{/each}
	</section>
</article>

<style>
	.header {
		text-align: center;
		margin-top: 60px;
		margin-bottom: 30px;
	}

	.header-typename {
		margin-top: 50px;
		margin-bottom: 0px;
	}

	.header-creator {
		margin-top: 0px;
		color: var(--color-grey-light);
		margin-bottom: 0px;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.pangram {
		display: block;
		display: none;
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

	.named-variations {
		margin-top: 80px;
		width: 90%;
		max-width: var(--layout-max-width);
	}

	.named-variation {
		display: block;
	}

	.named-variation-input {
		font-size: 40px;
		margin-top: 5px;
		margin-bottom: 20px;
	}

	.variation-values {
		color: var(--color-grey);
		cursor: pointer;
		transition: all 0.3s;
	}

	.variation-values:hover {
		color: var(--color-white);
	}

	.variation-values svg {
		transform: translate(8px, 4px);
	}

	.character-sets {
		margin-top: 80px;
		width: 90%;
		max-width: var(--layout-max-width);
	}

	.character-set {
		margin-bottom: 60px;
	}

	.character-set__title {
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
</style>
