<script lang="ts">
	// TODO this could be a generic
	type Value = any;

	interface Option {
		name: string;
		value: Value;
		style?: string;
	}

	export let options: Option[] = [];
	export let selectedValue: Value;
	export let placeholder: string;
	export let onChange: (value: Value) => void;

	function handleSelection(value: Value) {
		onChange(value);
		isOpen = false;
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

<section class="select" class:open={isOpen}>
	<div
		class="select-selected"
		on:click={() => toggleOptions()}
		on:keypress={() => toggleOptions()}
		style={selected?.style}
	>
		{!!selected ? selected.name : placeholder ? placeholder : 'Select...'}
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

	<div class="select-chevron" class:open={isOpen}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9" /></svg
		>
	</div>
</section>

<div
	class="select-bg"
	class:open={isOpen}
	on:click={() => toggleOptions()}
	on:keypress={() => toggleOptions()}
/>

<style>
	.select {
		--select-background: var(--color-black);
		--select-height: 50px;
		--select-max-rows: 5.5;
		--select-font-size: 19px;
		--select-padding: 10px 15px;

		width: 100%;
		position: relative;
		height: var(--select-height);
		background-color: var(--select-background);
		/* border-right: 1px solid var(--color-white); */
	}
	.select-selected {
		height: var(--select-height);
		padding: var(--select-padding);
		cursor: pointer;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: var(--select-font-size);
	}
	.select-options {
		position: absolute;
		top: calc(var(--select-height) + 10px);
		max-height: calc(var(--select-height) * var(--select-max-rows));
		overflow-x: hidden;
		overflow-y: scroll;
		left: -2px;
		right: -2px;
		display: none;
		z-index: 8;
		border: 2px solid var(--color-white);
	}
	.select-options.open {
		display: block;
	}
	.select-option {
		background-color: var(--select-background);
		color: var(--color-white);
		height: var(--select-height);
		padding: var(--select-padding);
		cursor: pointer;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: var(--select-font-size);
		user-select: none;
		transition: all 0.1s;
	}
	.select-option:hover {
		background-color: var(--color-white);
		color: var(--color-black);
	}
	.select-chevron {
		position: absolute;
		top: 15px;
		right: 15px;
    width: 22px;
    height: 22px;
    pointer-events: none;
    transition: all .6s;
	}
	.select-chevron.open {
    transform: rotate(180deg);
    transform-origin: center;
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
