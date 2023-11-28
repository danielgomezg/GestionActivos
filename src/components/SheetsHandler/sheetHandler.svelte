<script>
    // @ts-nocheck
    import { SideSheets, BottomSheets } from "$lib";
    import { onMount } from "svelte";

    export let modalContent, openModal = false, modalTitle = '', props = { }
    let isMobile = false;
    let previusComponent;

    onMount(() => {
        
        console.log('Mount sheet handler')
        isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    })
    
</script>

{#if isMobile}

    <BottomSheets 
        title={modalTitle}
        bind:open={openModal} 
    >

        <svelte:component this={modalContent} bind:openModal={openModal} {...props} />

    </BottomSheets>

{:else}

    <SideSheets bind:open={openModal} title={modalTitle} >
        
        <svelte:component this={modalContent} bind:openModal={openModal} {...props} />
        
    </SideSheets>

{/if}
