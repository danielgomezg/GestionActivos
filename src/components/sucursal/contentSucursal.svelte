<script>
    import Api from "../../../helpers/ApiCall";
    import { onMount, setContext } from "svelte";
    import CardSucursal from "./sucursalCard.svelte";
    import FormSucursal from "./formSucursal.svelte";
    import { Button, IconButton, Loading } from "$lib";
    import FormSucursalSave from "./formSucursalSave.svelte";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";
        
    let openModal = false, backButton = false;
    let modalTitle = '', previusModelTitle = []
    let modalContent;  
    let props;
    let previusComponent, previusProps;
    let stores = []
    let loading = false;

    setContext('backModalContent', (e) => {

    })

    setContext('editStore', (store, company) => {

    })

    const createSucursal = () => {
        modalTitle = 'Crear Sucursal';
        modalContent = FormSucursalSave;
        props = { 
            sucursal: {
                number: '',
                address: '',
                description: '',
                commune: '',
                region: '',
                company_id: 13
        
            },
            company: {
                country: 'Chile'
            }
        }
        openModal = true
    
    }

    const showStores = (company) => {
    
    }

    const newStore = (company) => {
    
    
    }

    const editStore = (sucursal, company) => {
        modalTitle = `Sucursal ${sucursal.number}`
        modalContent = FormSucursal;
        props = { sucursal, company: { country: 'Chile' } }
        openModal = true
    }

    const getStores = async () => {

        let response = (await Api.call(`http://127.0.0.1:9000/sucursalPorCompany/13`, 'GET'))
        console.log('RESPONSE GET Sucursales --> ', response)
        if (response.success) {
            stores = response.data.result 
        } 
    }

    onMount(async () => {
        getStores()
    })


</script>
    
<div style="padding-top: 20px;">
    <div class="header-company">
        <Button label="Nueva sucursal" on:click={ createSucursal } />
        <IconButton icon="tune" />
        <!-- <div class="title">Empresas</div> -->
    </div>
    <br>

    <div class="companies-content">
        {#if loading}
            <Loading />
        {/if}
        {#each stores as sucursal }    
            <CardSucursal 
                {sucursal} 
                on:edit={ (event) => editStore(event.detail) } 
                on:newStore={ (event) => editStore(event.detail) } 
                on:showStores={ (event) => editStore(event.detail) } 
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

    .companies-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
</style>