<script>
    import { onMount } from "svelte";
    import Api from "../../../helpers/ApiCall";
    import CardProfile from "./cardProfile.svelte";
    import { Button, IconButton, Loading } from "$lib";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";

    let props;
    let modalContent;  
    let modalTitle = '';
    let loading = false;
    let openModal = false; 
    let backButton = false;

    let profiles = [
        {
            id: 1,
            name: 'Admin',
            actions: [
                "create-sucursal",
                "update-sucursal",
                "delete-sucursal",
                "create-oficina",
                "create-activo",
                "update-activo",
                "delete-activo",
                "delete-articulo",
                "create-usuario",
                "update-usuario",
                "delete-usuario",
                "delete-empresa"
            ]
        },
        {
            id: 1,
            name: 'Empresa',
            actions: []
        }
    ]

    const createUser = () => {
       

    }

    const editUser = (usuario) => {

    }

    const getUsers = async () => {
        // loading = true;
        // let response = (await Api.call('http://127.0.0.1:9000/users', 'GET'))
        // console.log('RESPONSE GET USERS --> ', response)
        // if (response.success) {
        //     usuarios = response.data 
        // } 
        // loading = false;
    }

    const showStores = (company) => {

    }

    const newStore = (company) => {
        
    }

    const editStore = (sucursal) => {

    }

    onMount(async () => {

    })


</script>

<div style="padding-top: 20px;">
    <div class="header-content">
        <Button label="Nuevo perfil" on:click={ () => alert('En construcción.') } />
        <IconButton icon="tune" />
    </div>
    <br>

    <div class="body-content grid-columns-2">
        {#if loading}
            <Loading />
        {/if}
        {#each profiles as profile }    
            <CardProfile
                {profile} 
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