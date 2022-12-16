<script>
  import { onMount } from 'svelte';
  
  class Cursor {
    constructor(el) {
      this.DOM = { el: el };
      this.img = {
        src: null,
        height: null,
        width: null,
      };
      this.mouse = { x: 0, y: 0 };
      this.lastX = 0;
      this.lastY = 0;

      this.onMouseMoveEvt = (evt) => {
        this.mouse = { x: evt.clientX, y: evt.clientY };
        requestAnimationFrame(() => this.render());
      };
      window.addEventListener("mousemove", this.onMouseMoveEvt);
    }

    render() {
      const style = this.DOM.el.style;

      const heightOffset = 20 / 2;
      const widthOffset = 20 / 2;

      style.transform = `translate(${this.mouse.x - widthOffset}px, ${
        this.mouse.y - heightOffset
      }px)`;

      console.log('render', this.mouse);

      // if (this.img.src) {
      //   style.display = "block";
      //   const heightOffset = this.img.height / 2;
      //   const widthOffset = this.img.width / 2;
      //   style.transform = `translate(${this.mouse.x - widthOffset}px, ${
      //     this.mouse.y - heightOffset
      //   }px)`;
      //   style.backgroundImage = `url(${this.img.src})`;
      //   style.width = `${this.img.width}px`;
      //   style.height = `${this.img.height}px`;
      // } else {
      //   style.display = "none";
      //   style.backgroundImage = null;
      // }
    }

    setImage(src, height, width) {
      this.img = { src, height, width };
    }
  }

  onMount(async () => {
    const cursor = new Cursor(document.querySelector(".cursor"));
  });
</script>


<div class="cursor" />

<style>
  .cursor {
    width: 20px;
    height: 20px;
    max-width: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    border: 1px solid var(--color-white);
    border-radius: 50%;
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
    z-index: 2;
  }
</style>
