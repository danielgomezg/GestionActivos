<script>
    import '@material/web/iconbutton/icon-button.js';

    export let icon = ''

</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<md-icon-button on:click>
    <md-icon class="material-symbols-outlined">{icon}</md-icon> 
</md-icon-button>
