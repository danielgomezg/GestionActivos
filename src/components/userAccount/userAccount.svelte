<script>
    // @ts-nocheck
    import { IconButton, Button } from "$lib"
    import { onMount, onDestroy } from "svelte";

    let openOptions = false 

    const handleAccountOptions = (event) => {
        if (openOptions && !event.target.closest('.account-container')){
            openOptions = false
        }
    }

    onMount(() => {
        window.addEventListener('click', handleAccountOptions)
    })

    onDestroy(() => {
        window.removeEventListener('click', handleAccountOptions);
    });


</script>


<div style="text-align: right;">NOMBRE DE USUARIO</div>
<div class="account-container">
    <IconButton on:click={() => { openOptions=!openOptions }} icon="account_circle" />
    {#if openOptions}
    <div class="account-options">
        <Button type="text" label="Editar" color="" />
        <Button type="text" label="Cerrar Sesión" color="" />
    </div>  
    {/if}
    
</div>

<style>
    .account-container {
        position: relative;
    }

    .account-options {
        position: absolute;
        background-color: #FFFFFF;
        color: black;
        width: 155px;
        display: flex;
        flex-direction: column;
        right: 0;
        border-radius: 12px;
        padding: 16px;
        align-items: end;
        border: 1px solid rgba(224, 224, 224, 1);
    }
</style>