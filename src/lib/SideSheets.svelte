<script>
    // @ts-ignore
    import { IconButton } from "$lib";
    import { getContext } from "svelte";

    let backModalContent = getContext('backModalContent');
    

    // @ts-nocheck
    export let open = false, title = ''

    $: if (open) {
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "auto";
    }

</script>
<div class:container={open}>
    <div class="side-sheet" class:open={open} id="sideSheet">
        <div class="side-sheets__header">
            <div style="display: flex; align-items: center;">
                <IconButton icon="arrow_back" on:click={ () => backModalContent() }/>
                <div class="title">{title}</div>
            </div>
            <IconButton icon="close" on:click={ () => open = false }/>
        </div>
        <div class="side-sheets__content">
            <slot />
        </div>
    </div>
</div>

<style>
    .side-sheets__header {
        display: flex;
        align-items: center;
        padding: 24px 24px 0 16px;
        justify-content: space-between;
    }

    .side-sheets__content {
        margin: 24px 24px 0 16px;
        overflow-y: auto;
        flex: 1;
    }

    .container {
        position: fixed;
        background-color: rgba(0, 0, 0, 0.5);
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        z-index: 10000;
    }

    .side-sheet {
        position: fixed;
        right: -100%; /* -250px; Ancho del side sheet */
        top: 0;
        height: 100vh;
        width: 40%;
        background-color: #FFFFFF;
        border-radius: 16px 0 0 16px ;
        transition: 0.5s; /* Agrega transición para un deslizamiento suave */
        display: flex;
        flex-direction: column;
    }

    .open {
        right: 0;
    }

    
</style>