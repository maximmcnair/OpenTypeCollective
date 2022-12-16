<script lang="ts">
	// TODO this could be a generic
	type Value = any;

	interface Option {
		name: string;
		value: Value;
		style: string;
	}

	export let options: Option[] = [];
	export let selectedValue: Value;
	export let closeOnSelection: boolean = true;
	export let onChange: (value: Value) => void;

	function handleSelection(value: Value) {
		onChange(value);
		if (closeOnSelection) isOpen = false;
	}

	let isOpen = false;
	function toggleOptions() {
		isOpen = !isOpen;
	}

	function getSelected(selectedValue: Value): undefined | Option {
		const abc = (options || []).find((o) => {
			// TODO is there a better deep equal for this??
			return JSON.stringify(o.value) == JSON.stringify(selectedValue);
		});
		return abc;
	}
	let selected = getSelected(selectedValue);
	$: selected = getSelected(selectedValue);

	// $: console.log('selected', selectedValue, selected);
</script>

<section class="select">
	<div
		class="select-selected"
		on:click={() => toggleOptions()}
		on:keypress={() => toggleOptions()}
		style={selected?.style}
	>
		{!!selected ? selected.name : 'Select...'}
	</div>
	<div class="select-options" class:open={isOpen}>
		{#each options as option}
			<div
				class="select-option"
				on:click={() => handleSelection(option.value)}
				on:keypress={() => handleSelection(option.value)}
				style={option.style}
			>
				{option.name}
			</div>
		{/each}
	</div>
</section>

<div class="select-bg" class:open={isOpen} on:click={() => toggleOptions()} />

<style>
	.select {
		--select-background: red;
		--select-height: 50px;
		--select-max-rows: 5.5;
		--select-font-size: 24px;
		--select-padding: 6px 10px;

		width: 100%;
		position: relative;
		height: var(--select-height);
		background-color: var(--select-background);
	}
	.select-selected {
		height: var(--select-height);
		background-color: yellow;
		padding: var(--select-padding);
		cursor: pointer;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
    font-size: var(--select-font-size);
	}
	.select-options {
		background-color: blue;
		position: absolute;
		top: calc(var(--select-height) + 10px);
		max-height: calc(var(--select-height) * var(--select-max-rows));
		overflow-x: hidden;
		overflow-y: scroll;
		left: 0px;
		right: 0px;
		display: none;
		z-index: 8;
	}
	.select-options.open {
		display: block;
	}
	.select-option {
		background-color: red;
		background-color: var(--select-background);
		height: var(--select-height);
		padding: var(--select-padding);
		cursor: pointer;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
    font-size: var(--select-font-size);
	}

	.select-bg {
		position: fixed;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		z-index: 7;
		display: none;
	}
	.select-bg.open {
		display: block;
	}
</style>
