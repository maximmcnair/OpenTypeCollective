<script lang="ts">
  import {typefaces} from '../lib/typefaces';
  import TypefacePreview from '../components/TypefacePreview.svelte'
  import CursorVariationType from '../components/CursorVariationType.svelte'
</script>

<svelte:head>
	<title>OpenType Collective</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="intro">
  <div class="intro-text">
    <h1>
      <CursorVariationType text="OpenType Collective" />
    </h1>
    <h3>
      A collection of open source typefaces that you can use on any opensource project.
    </h3>
  </div>
</section>

<section>
  {#each typefaces as typeface}
    <TypefacePreview typeface={typeface} />
  {/each}
</section>

<style>
  .intro{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .intro-text {
    margin-bottom: 200px;
    width: 90%;
    min-width: 800px;
    text-align: center;
  }

  h1 {
    margin: 0px;
    font-size: 140px;
  }
  h3 {
    font-size: 40px;
    font-variation-settings: "opsz" 40, "wght" 300, "SOFT" 0, "WONK" 1;
    margin: 0px;
  }
</style>
