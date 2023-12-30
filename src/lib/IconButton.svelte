<script>
	import { onMount } from "svelte";
    import { MDCRipple } from '@material/ripple';

    export let icon, disabled = false;

    let iconButtonElement

    onMount(async () => {
        const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button')); 
    })

</script>

<button bind:this={iconButtonElement} type="button" class="mdc-icon-button mdc-icon-button--touch material-icons" on:click {disabled}>
  <span class="material-symbols-rounded">{icon}</span>
</button>
