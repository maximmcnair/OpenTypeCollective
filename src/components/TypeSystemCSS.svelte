<script lang="ts">
	import type { TypeSystem } from '../stores/typeSystem';
	import { createCSSVariationsFromObject } from '../lib/createCSSVariations';

	export let typeSystem: TypeSystem | undefined = undefined;
	let showMsg = false;

	function copyToClipboard(str: string) {
		showMsg = true;
		navigator.clipboard.writeText(str);

		setTimeout(() => {
			showMsg = false;
		}, 1000);
	}

	function generateCSS(typeSystem: TypeSystem | undefined) {
		if (!typeSystem) return '';

		const enteries = Object.keys(typeSystem);
		const uniqueTypefaces = Array.from(new Set(Object.values(typeSystem).map((t) => t.typeface)));

		return `
/* Base font-size of 18px */

html {
  font-size: 112.5%;
}

${uniqueTypefaces
	.map((t) => {
		return `@font-face {
  font-family: "${t}";
  font-style: normal;
  src: url("/${t}.woff2") format("woff2");
}`;
	})
	.join('\n')}

:root {
${enteries
	.map((e) => {
		return `  /* ${e} */
  --typeface-${e}: '${typeSystem[e].typeface}';
  --type-size-${e}: ${typeSystem[e].fontSize};
  --type-variation-${e}: ${createCSSVariationsFromObject(typeSystem[e].variations)};
`;
	})
	.join('\n')}
}

body {
  line-height: 1.7;
}

h1, h2, h3, h4, h5, h6,
.h1, .h2, .h3, .h4, .h5, .h6 {
  margin: 1rem 0 1.38rem;
  line-height: 1.3;
}

${enteries
	.map((e) => {
		return `${e === 'body' ? 'p' : e}, .${e} {
  font-family: var(--typeface-${e});
  font-size: var(--type-size-${e});
  font-variation-settings: var(--type-variation-${e});
}
`;
	})
	.join('\n')}`;
	}

	let css = generateCSS(typeSystem);
	$: css = generateCSS(typeSystem);
</script>

<section class="css-output">
	<h3>CSS Output</h3>

	<p>This CSS has no dependencies and should work with any tech stack.</p>

	<p>
		Typesizes are set in rems with CSS variables that can be used to build additional custom styles
		easily.
	</p>

	{#each Array.from(new Set(Object.values(typeSystem).map((t) => t.typeface))) as typeface}
		<div>
			<a href={`/typefaces/${typeface}.woff2`} target="_blank" rel="noreferrer">
				Download {typeface}
			</a>
		</div>
	{/each}

	<div class="code">
		<button on:click={() => copyToClipboard(css)}>
			{showMsg ? 'Copied!' : 'Copy to clipboard'}
		</button>

		<pre>
      <code>
        {css}
      </code>
    </pre>
	</div>
</section>

<style>
	.css-output {
		display: block;
	}

	button {
		background: transparent;
		border: 2px solid var(--color-gold);
		color: var(--color-gold);
		user-select: none;
		font-size: 15px;
		font-weight: 800;
		display: block;
		padding: 8px 10px;
		border-radius: 5px;
		cursor: pointer;
	}

	button:hover {
		background-color: var(--color-gold);
		color: var(--color-black);
	}

	button:active {
		transform: translate(0px, 1px);
	}

	.code {
		position: relative;
	}

	.code button {
		position: absolute;
		top: 10px;
		right: 10px;
	}
	.code pre {
		background-color: var(--color-grey-dark);
		padding: 0px 20px;
		overflow: scroll;
	}
	.code code {
		font-size: var(--typesize-small);
		line-height: 0.8em;
	}
</style>
