<script lang="ts">
	export let value: number;
	export let postfix: string;
	export let step: number = 1;
	export let updateNumber: (val: number) => void;
</script>

<div class="number">
	<input type="number" bind:value on:change={(evt) => updateNumber(evt.target.value)} />
	<span>{postfix}</span>

	<div
		class="minus"
		on:click={() => updateNumber(value - step)}
		on:keypress={() => updateNumber(value - step)}
	>
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
			class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12" /></svg
		>
	</div>
	<div
		class="plus"
		on:click={() => updateNumber(value + step)}
		on:keypress={() => updateNumber(value + step)}
	>
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
			class="feather feather-plus"
			><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg
		>
	</div>
</div>

<style>
	.number {
		display: flex;
		position: relative;
		/* width: 370px; */
	}

	.number span {
		position: absolute;
		top: 9px;
		left: 42px;
		font-size: 19px;
	}

	.number input {
    appearance: none;
		height: 50px;
		font-size: 19px;
    padding-top: 4px;
    padding-left: 15px;
	}

	.minus,
	.plus {
		user-select: none;
		width: 50px;
		height: 50px;
		background: var(--color-black);
		color: var(--color-white);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: all 0.1s;
	}

	.minus:hover,
	.plus:hover {
		background: var(--color-white);
		color: var(--color-black);
	}
</style>
