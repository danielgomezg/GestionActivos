<script>
    import { MDCRipple } from '@material/ripple';
    import { onMount } from 'svelte';

    export let label, color = '#39404A', icon = '', type = 'raised'

    let button 
    let style = `background-color: ${color}`
    onMount(() => {
        new MDCRipple(button);
    })

</script>

<div bind:this={button} class="mdc-touch-target-wrapper">
    <button 
        class="mdc-button"
        class:mdc-button--raised={type === 'raised'}
        class:mdc-button--icon-leading={icon != ''}
        class:mdc-button--outlined={type === 'outlined'}
        on:click
        {style}
    >
        <span class="mdc-button__ripple"></span>
        <span class="mdc-button__touch"></span>
        {#if icon.trim()}
            <i class="material-symbols-outlined">{icon}</i>
        {/if}
        <span class="mdc-button__label">{label}</span>
        
    </button>
</div>

<style>
    .mdc-button {
        width: 100%;
        /* background-color: #39404A; */
    }
</style>