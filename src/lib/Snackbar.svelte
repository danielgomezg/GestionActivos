<script>
    import { onMount } from 'svelte';
    import { MDCSnackbar } from '@material/snackbar';

    export let message = '';
    export let type = "";
    let snackbar

    onMount(() => {
        // new MDCSnackbar(snackbar);
    })
</script>

<div class="alert {type}">
    {message}
</div>

<style>
    .alert {
        padding: 8px;
    }

    .error {
        border: solid 1px #D32F2F;
        color: #FFFFFF;
        background-color: #FF6659;
        border-radius: 5px;
    }

    .default {
      width: fit-content;
      background-color: #322F35;
      color: #F5EFF7;
      border-radius: 4px;
      font-size: 15px;
      padding-left: 4px;
      font-weight: 500;
      padding-right: 8px;
      width: 260px;

    }
</style>

<!-- <div bind:this={snackbar} class="mdc-snackbar mdc-snackbar--stacked">
    <div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
      <div class="mdc-snackbar__label" aria-atomic="false">
        Can't send photo. Retry in 5 seconds.
      </div>
      <div class="mdc-snackbar__actions" aria-atomic="true">
        <button type="button" class="mdc-button mdc-snackbar__action">
          <div class="mdc-button__ripple"></div>
          <span class="mdc-button__label">Retry</span>
        </button>
      </div>
    </div>
</div> -->