<script>
    import {MDCRipple} from '@material/ripple';
    import { onMount } from 'svelte';

    export let label

    let button 

    onMount(() => {
        new MDCRipple(button);
    })

</script>

<div bind:this={button} class="mdc-touch-target-wrapper">
    <button class="mdc-button mdc-button--raised"
        on:click
    >
        <span class="mdc-button__ripple"></span>
        <span class="mdc-button__touch"></span>
        <span class="mdc-button__label">{label}</span>
    </button>
</div>

<style>
    .mdc-button {
        width: 100%;
        background-color: #39404A;
    }
</style>