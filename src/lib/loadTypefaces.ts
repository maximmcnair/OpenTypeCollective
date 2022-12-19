export function loadTypefaces(typefaces: string[]): void {
	const head = document.querySelector('head');
	const styleCSS = document.createElement('style');
	styleCSS.setAttribute('type', 'text/css');
	styleCSS.innerText = typefaces
		.map(
			(t) => `
/* ${t} */
@font-face {
  src: url('/typefaces/${t}.woff2') format('woff2');
  font-family: '${t}';
  font-style: normal;
  font-display: block;
}
`
		)
		.join('')
		.replaceAll('\n', '');
	head?.appendChild(styleCSS);
}
