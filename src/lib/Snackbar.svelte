<script>
  import { onMount } from "svelte";
  import { MDCSnackbar } from "@material/snackbar";
  import { snackbar } from "../stores/store";

  export let message = "Mensaje para el snackbar";
  // export let type = "";
  let snackbarComponent, mdcSnackbar;

  onMount(() => {
    mdcSnackbar = new MDCSnackbar(snackbarComponent);
    // snackbar.open()
    // mdcSnackbar.timeoutMs = -1
  });

  $: if ($snackbar.open && mdcSnackbar != undefined) mdcSnackbar.open()

</script>

<!-- <div class="alert {type}">
    {message}
</div> -->
<aside bind:this={snackbarComponent} class="mdc-snackbar mdc-snackbar-custom">
  <div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
    <div class="mdc-snackbar__label" aria-atomic="false">
      { $snackbar.message }
    </div>
    <div class="mdc-snackbar__actions" aria-atomic="true">
      <button type="button" class="mdc-button mdc-snackbar__dismiss">
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label"></span>
        <span class="material-symbols-rounded" style="color: #FFF;">close</span>

      </button>
    </div>
  </div>
</aside>
<style>

  .mdc-snackbar {
    bottom: none;
    top: 60px;
  }

  /* .alert {
    padding: 8px;
  }

  .error {
    border: solid 1px #d32f2f;
    color: #ffffff;
    background-color: #ff6659;
    border-radius: 5px;
  }

  .default {
    width: fit-content;
    background-color: #322f35;
    color: #f5eff7;
    border-radius: 4px;
    font-size: 15px;
    padding-left: 4px;
    font-weight: 500;
    padding-right: 8px;
    width: 260px;
  } */
</style>
