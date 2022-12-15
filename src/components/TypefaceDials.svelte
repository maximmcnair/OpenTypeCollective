<script lang="ts">
  import type { Typeface } from '../lib/typefaces';
  import autosize from '../lib/autosize';

  export let typeface: Typeface;
  export let defaultText: string = '';
  export let fontSize: number = 80;
  export let isMultiline: boolean = false;

  let value = defaultText;

  $: value = defaultText;

  let variations = typeface.variations.reduce((acc, val) => {
    acc[val[0]] = val[4];
    return acc;
  }, {});

  $: variation = Object.entries(variations)
    .map(v => `"${v[0]}" ${variations[v[0]]}`).join(', ');

  // $: console.log(typeface);

  function dice(){
    // randomise each variation
    for (const variation in typeface.variations) {
      const [name, , min, max] = typeface.variations[variation]
      const randomValue = Math.floor(Math.random() * (max - min) + min);
      variations[name] = randomValue;
    }
  }
</script>

{#if isMultiline}
  <textarea 
    style:font-family={typeface.name}
    style:font-variation-settings={variation}
    bind:value={value}
    use:autosize
    style:font-size={fontSize}
  />
{:else}
  <input 
    style:font-family={typeface.name}
    style:font-variation-settings={variation}
    bind:value={value}
    style:font-size={fontSize}
  />
{/if}

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

<div class="info">
  <div on:click={dice} class="dice">
    <img src="/dice.svg" class="dice-icon" />
    Throw the dice
  </div>
</div>

<style>
  textarea,
  input {
    text-align: center;
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
    color: var(--color-grey-light);
    transition: all .3s;
  }
  .dice:hover {
    color: var(--color-white);
  }
  .dice-icon {
    width: 25px;
    height: 25px;
    transform-origin: center;
    transform: rotate(10deg) translate(0, 0);
    transition: all .3s;
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
</style>
