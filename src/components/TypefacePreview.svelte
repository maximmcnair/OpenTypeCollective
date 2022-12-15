<script>
  import TypefaceDials from './TypefaceDials.svelte'
  export let typeface;
</script>

<div class="typeface-preview">
  <div class="content">
    <TypefaceDials typeface={typeface} defaultText={typeface.name} />
    <a class="specimen-link" href={`/typeface/${typeface.name}`}>View Typeface</a>
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
    margin-top: 30px;
    text-align: center;
    display: block;
  }

  @media (min-width: 800px){
    .specimen-link {
      position: absolute;
      /* top: 0px; */
      bottom: 30px;
      right: 30px;
    }
  }
</style>
