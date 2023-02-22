<script lang="ts">
	import { browser } from '$app/environment';
	import { range } from '../lib/utils';

	export let text: string;

	// copied from typefaces.ts for ''
	const xVariation = ['opsz', 'Optical Size', 9, 144, 9, 1];
	const yVariation = ['wght', 'Weight', 100, 900, 900, 1];

	let x: number | undefined = undefined;
	let y: number | undefined = undefined;

	let xValue: number | undefined = 0;
	let yValue: number | undefined = 0;

	function handleMouseMove(evt: MouseEvent) {
		if (!('ontouchstart' in document.documentElement)) {
			x = evt.clientX;
			y = evt.clientY;
		}
	}

	$: xValue = browser && x ? range(0, window.innerWidth, 40, 144, x) : undefined;
	$: yValue = browser && y ? range(0, window.innerHeight, 100, 900, y) : undefined;

	$: variation = `"${xVariation[0]}" ${xValue}, "${yVariation[0]}" ${yValue}, 'WONK' 1`;
	// $: console.log(variation);
</script>

<span style:font-variation-settings={variation}>{text}</span>

<svelte:window on:mousemove={handleMouseMove} />

<style>
	span {
		display: block;
		font-family: 'Fraunces';
		font-variation-settings: 'opsz' 144, 'wght' 448, 'SOFT' 0, 'WONK' 0;
		transition: all 0.01s;
	}
</style>
