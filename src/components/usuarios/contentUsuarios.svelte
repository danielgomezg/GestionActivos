<script>
    // @ts-ignore
    import { Button, IconButton } from "$lib"
    import { setContext } from "svelte";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";
    import { usuarios } from "../../stores/store";
    import CardUsuario from "./cardUsuario.svelte";
    import FormUsuarios from "./formUsuarios.svelte";
    

    let openModal = false, backButton = false;
    let modalTitle = ''
    let modalContent;  
    let props;
    let previusComponent, previusProps;

    setContext('backModalContent', (e) => {
        e.preventDefault();
    
    })

    setContext('editStore', (store) => {

    })

    const createUser = () => {

    }

    const editUser = (usuario) => {
        modalTitle = 'Editar usuario'
        modalContent = FormUsuarios
        props = { usuario }
        openModal = true
    }

    const showStores = (company) => {

    }

    const newStore = (company) => {
        
    }

    const editStore = (sucursal) => {

    }

    $: console.log('open modal: ', openModal)

</script>

<div style="padding-top: 20px;">
    <div class="header-company">
        <Button label="Nuevo usuario" on:click={ createUser } />
        <IconButton icon="tune" />
        <!-- <div class="title">Empresas</div> -->
    </div>
    <br>

    <div class="usuarios-content">
        {#each $usuarios as usuario }    
            <CardUsuario 
                {usuario} 
                on:edit={ (event) => editUser(event.detail) } 
            />
        {/each}
    </div>
</div>

<SheetHandler
    {props}
    {modalTitle}
    {backButton}
    {modalContent}
    bind:openModal={openModal}
/>

<style>
    .header-company {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .usuarios-content {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
    }
</style>