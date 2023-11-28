<script>
    // @ts-ignore
    import { Loading } from "$lib"
    import { MDCRipple } from '@material/ripple';
    import { onMount } from 'svelte';

    export let label
    export let color = '#107acc'//'#39404A'
    export let icon = ''
    export let type = 'raised'
    export let trailing = false
    export let leading = false
    export let disabled = false
    export let loading = false

    let button 
    let style = `background-color: ${color}`

    onMount(() => {
        new MDCRipple(button);
    })

    $: if (loading) disabled = true

</script>

<div bind:this={button} class="mdc-touch-target-wrapper">
    <button 
        class="mdc-button"
        class:mdc-button--raised={type === 'raised'}
        class:mdc-button--icon-leading={leading}
        class:mdc-button--icon-trailing={trailing}
        class:mdc-button--outlined={type === 'outlined'}
        class:disabled={disabled}
        on:click
        {style}
        {disabled}
    >
    
        <span class="mdc-button__ripple"></span>
        <span class="mdc-button__touch"></span>
        {#if leading}
            <i class="material-symbols-outlined">{icon}</i>
        {/if}
        <span class="mdc-button__label">
            {#if loading}
                <Loading />
            {:else}
                {label}
            {/if}
        
        </span>
        {#if trailing}
            <i class="material-symbols-outlined">{icon}</i>
        {/if}
        
    </button>
</div>

<style>
    .mdc-button {
        width: 100%;
        /* background-color: #39404A; */
    }
    .disabled {
        opacity: 0.7;
    }
</style>