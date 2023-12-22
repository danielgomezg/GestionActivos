<script>
    // @ts-nocheck
    import { afterUpdate, beforeUpdate, onMount, onDestroy } from "svelte";
    import { fly } from "svelte/transition";
    // @ts-nocheck
    import { SideSheets, BottomSheets } from "$lib";

    export let modalContent, openModal = false, modalTitle = '', props = { }, backButton = false
    let isMobile = false;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    function handleResize() {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    }

    onMount(() => {
        
        console.log('Mount sheet handler')
        isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        window.addEventListener('resize', handleResize);

    })

    onDestroy(() => {
        window.removeEventListener('resize', handleResize);
    });

    $: if(!openModal) modalContent = null
    
    $: isMobile = windowWidth < 500    
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
