<script>
	import { onMount } from "svelte";
    import { MDCRipple } from '@material/ripple';

    export let icon, disabled = false;

    let iconButtonElement

    onMount(async () => {
        // const iconButtonRipple = new MDCRipple(iconButtonElement);
        const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
        
    })

</script>

<button bind:this={iconButtonElement} type="button" class="mdc-icon-button mdc-icon-button--touch material-icons" on:click {disabled}>
  <!-- <div class="mdc-icon-button__ripple"></div> -->
  <span class="material-symbols-outlined">{icon}</span>
  <!-- <div class="mdc-icon-button__touch"></div> -->
</button>

<!-- <script>
    import '@material/web/iconbutton/icon-button.js';

    export let icon = ''

</script>

<md-icon-button on:click>
    <md-icon class="material-symbols-outlined">{icon}</md-icon> 
</md-icon-button> -->
