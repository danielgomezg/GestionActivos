<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    // @ts-nocheck
    import { SideSheets, BottomSheets } from "$lib";

    export let modalContent, openModal = false, modalTitle = '', props = { }, backButton = false
    let isMobile = false;

    onMount(() => {
        
        console.log('Mount sheet handler')
        isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    })

    $: if(!openModal) modalContent = null
    
</script>

{#if isMobile}

    <BottomSheets bind:open={openModal}  title={modalTitle} {backButton} >

        <svelte:component this={modalContent} {...props} />

    </BottomSheets>

{:else}

    <SideSheets bind:open={openModal} title={modalTitle} {backButton} >

        <svelte:component this={modalContent} {...props} />
        
    </SideSheets>

{/if}
