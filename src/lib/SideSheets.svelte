<script>
    // @ts-ignore
    import { IconButton } from "$lib";

    // @ts-nocheck
    export let open = false, title = ''



</script>
<div class:container={open}>
    <div class="side-sheet" class:open={open} id="sideSheet">
        <div class="side-sheets__header">
            <div class="title">{title}</div>
            <IconButton icon="close" on:click={ () => open = false }/>
        </div>
        <slot />
    </div>
</div>

<style>
    .side-sheets__header {
        display: flex;
        align-items: center;
        margin: 24px 24px 0 16px;
        justify-content: space-between;
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
        height: 100%;
        width: 40%;
        background-color: #F7F2FA;
        border-radius: 16px 0 0 16px ;
        /* padding: 20px; */
        /* color: white; */
        transition: 0.5s; /* Agrega transición para un deslizamiento suave */
    }

    .open {
        right: 0;
    }

    .title {
        font-size: 28px;
    }
</style>