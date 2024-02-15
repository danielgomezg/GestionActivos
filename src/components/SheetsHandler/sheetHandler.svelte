<script>
    import { onMount, onDestroy } from "svelte";
    import { SideSheets, BottomSheets } from "$lib";

    export let modalContent, openModal = false, modalTitle = '', props = { }, backButton = false
    
    let isMobile = false;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    function handleResize() {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    }
    let endSroll = false;

    onMount(() => {
        
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

    <BottomSheets bind:open={openModal}  title={modalTitle} {backButton} 
        on:scrollEnd={ () => {
            endSroll = true;
        } }
        on:scroll={ () => {
            endSroll = false;
        } }    
    >
        <svelte:component this={modalContent} {...props} {endSroll} />

    </BottomSheets>

{:else}

    <SideSheets bind:open={openModal} title={modalTitle} {backButton} 
        on:scrollEnd={ () => {
            endSroll = true
        } }
        on:scroll={ () => {
            endSroll = false
        } }
    >

        <svelte:component this={modalContent} {...props} {endSroll} />
        
    </SideSheets>

{/if}
