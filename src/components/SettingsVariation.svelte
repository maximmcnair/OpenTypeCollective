<script lang="ts">
	import type { Variation } from '../lib/typefaces';

	export let key: string;
	export let value: number;
	export let variation: Variation;
	export let onChange: (key: string, val: string) => void;

	let val = value;
	$: {
		val = value;
	}
</script>

{#if variation}
	<label>
		<span>{variation[1] || ''}</span>
		<input
			type="range"
			bind:value={val}
			min={variation[2]}
			max={variation[3]}
			step={variation[5]}
			on:change={(evt) => {
				onChange(key, evt.currentTarget.value);
			}}
		/>
	</label>
{/if}
