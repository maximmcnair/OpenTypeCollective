<script lang="ts">
  import { browser } from '$app/environment';

  export let text;

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
  const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
  const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x));
  const range = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    a: number
  ) => lerp(x2, y2, invlerp(x1, y1, a));

  // copied from typefaces.ts for ''
  const xVariation = 
  ['opsz', 'Optical Size', 9, 144, 9, 1];
    // ['SOFT', 'Softness', 0, 100, 0, 1];
  const yVariation = 
   ['wght', 'Weight', 100, 900, 900, 1];
  // ['WONK', 'Wonky', 0, 1, 1, 1];

  let x = null;
  let y = null;

  let xValue = 0;
  let yValue = 0;

  function handleMouseMove(evt){
    x = evt.clientX;
    y = evt.clientY;
  }

  $: xValue = browser ? range(0, window.innerWidth, 40, 144, x) : null;
  $: yValue = browser ? range(0, window.innerHeight, 100, 900, y) : null;

  $: variation = `"${xVariation[0]}" ${xValue}, "${yVariation[0]}" ${yValue}, 'WONK' 1`;
  // $: console.log(variation);
</script>

<span style:font-variation-settings={variation}>{text}</span>

<svelte:window on:mousemove={handleMouseMove} />

<style>
  span {
    display: block;
    font-family: "Fraunces";
    font-variation-settings: "opsz" 144, "wght" 448, "SOFT" 0, "WONK" 0;
    transition: all 0.01s;
  }
</style>
