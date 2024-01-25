<script>
    import Api from "../../../helpers/ApiCall";
    import { onMount, setContext } from "svelte";
    import CardSucursal from "./sucursalCard.svelte";
    import FormSucursal from "./formSucursal.svelte";
    import { Button, IconButton, Loading } from "$lib";
    import FormSucursalSave from "./formSucursalSave.svelte";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";
    import { user } from "../../stores/store";
        
    let props;
    let company;
    let stores = [];
    let modalContent;  
    let modalTitle = '';
    let loading = false;
    let openModal = false
    let backButton = false;

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
            company
        }
        openModal = true
    
    }


    const editStore = (sucursal) => {
        console.log('edit store > ', company)
        modalTitle = `Sucursal ${sucursal.number}`
        modalContent = FormSucursal;
        props = { sucursal, company }
        openModal = true
    }

    const getCompany = async (companyId) => {
        let response = (await Api.call(`http://127.0.0.1:9000/company/${companyId}`, 'GET'))
        console.log('RESPONSE GET Sucursales --> ', response)
        if (response.success) {
            company = response.data 
        } 
    }

    const getStores = async (companyId) => {

        let response = (await Api.call(`http://127.0.0.1:9000/sucursalPorCompany/${companyId}`, 'GET'))
        console.log('RESPONSE GET Sucursales --> ', response)
        if (response.success && response.statusCode == '200') {
            stores = response.data.result 
        } 
    }

    onMount(async () => {
        console.log('mount content sucursal ', $user.company_id)
        if ($user.company_id != undefined) {
            await Promise.all([getStores($user.company_id), getCompany($user.company_id)])
            
            // getStores( $user.company_id)
        } 
    })


</script>
    
<div style="padding-top: 20px;">
    <div class="header-content">
        <!-- <Button label="Nueva sucursal" custom on:click={ createSucursal } /> -->
        <!-- <IconButton icon="tune" /> -->
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
        {:else}
            <p>No hay sucursales</p>
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
    .companies-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
</style>