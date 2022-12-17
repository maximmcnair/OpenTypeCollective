<script lang="ts">
	export let value;
	export let variation;
	export let onChange: (key: string, val: string) => void;

	let weight = value;
	$: {
		if (weight !== value) onChange(variation[0], weight);
	}
</script>

<label>
	<span>{variation[1]}</span>
	<input
		type="range"
		bind:value={weight}
		min={variation[2]}
		max={variation[3]}
		step={variation[5]}
	/>
</label>
