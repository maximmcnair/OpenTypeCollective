<script lang="ts">
	export let value;
	export let variation;
	export let onChange: (key: string, val: string) => void;
</script>

<label>
	<span>{variation[1]}</span>
	<input
		type="range"
		bind:value
		min={variation[2]}
		max={variation[3]}
		step={variation[5]}
		on:change={(evt) => onChange(variation[0], evt.target.value)}
	/>
</label>
