<script lang="ts">
  import type {Typeface} from '../lib/typefaces';
  import TypefacePreview from '../components/TypefacePreview.svelte'

  export let typeface;

  let variations = typeface.variations.reduce((acc, val) => {
    acc[val[0]] = val[4];
    return acc;
  }, {});

  $: variation = Object.entries(variations)
    .map(v => `"${v[0]}" ${variations[v[0]]}`).join(', ');

  // $: console.log(variation);
</script>

<div>
  <h3 style:font-family={typeface.name} style:font-variation-settings={variation}> {typeface.name}
  </h3>

  <div class="variations">
    {#each typeface.variations as v}
      <label>
        <span>{v[1]}</span>
        <input 
          type="range"
          bind:value={variations[v[0]]} 
          min={v[2]}
          max={v[3]}
          step={v[5]}
        />
      </label>
    {/each}
  </div>
</div>

<style>
  h3 {
    text-align: center;
    /* font-size: var(--typesize-h1); */
    font-size: 100px;
    /* transition: all .1s; */
  }
  .variations {
    display: flex;
    justify-content: center;
    text-align: center;
    gap: 20px;
  }
</style>
