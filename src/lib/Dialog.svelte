<script>
    import { MDCDialog } from '@material/dialog';
    import { onMount, createEventDispatcher } from 'svelte';


    export { open };

    let dialog;
    let dialogComponent;
    let dispatch = createEventDispatcher();

    const open = () => {
        dialog.open();
    }

    const closed = () => {
        dispatch('closed')
    }

    onMount(() => {
        dialog = new MDCDialog(dialogComponent);
        dialog.listen('MDCDialog:closed', closed);
    });

</script>
<div bind:this={ dialogComponent } class="mdc-dialog">
    <div class="mdc-dialog__container">
        <div class="mdc-dialog__surface"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="my-dialog-title"
            aria-describedby="my-dialog-content">
        
            <h2 class="mdc-dialog__title" id="my-dialog-title">
                <slot name="title" />
            </h2>
            <div class="mdc-dialog__content" id="my-dialog-content">
                <slot name="content" />
            </div>
        </div>
    </div>
    <div class="mdc-dialog__scrim"></div>
</div>