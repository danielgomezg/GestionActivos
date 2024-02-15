<script>
  	import { onMount } from "svelte";
    import Tooltip from "./Tooltip.svelte";
    import { MDCRipple } from '@material/ripple';

    export let icon; 
    export let disabled = false;
    export let tooltipText = '';
    export let tooltipId = '';

    let iconButtonElement

    onMount(async () => {
        const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button')); 
    })

</script>

<button bind:this={iconButtonElement} type="button" class="mdc-icon-button mdc-icon-button--touch material-icons" on:click {disabled} aria-describedby={tooltipId}>
  <span class="material-symbols-rounded">{icon}</span>
</button>
{#if tooltipId != '' && tooltipText != ''}
    <Tooltip id={tooltipId} text={tooltipText} />
{/if}