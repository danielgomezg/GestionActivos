<script>
    import { Loading } from "$lib";
    import { onMount } from "svelte";
    import { user } from "../../stores/store";
    import Api from "../../../helpers/ApiCall";
    import CardSucursal from "./sucursalCard.svelte";
    import FormSucursal from "./formSucursal.svelte";
    import SucursalSearch from "./sucursalSearch.svelte";
    import OfficesInfo from "../offices/officesInfo.svelte";
    // import FormSucursalSave from "./formSucursalSave.svelte";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";
        
    let props;
    let company;
    let stores = [];
    let modalContent;  
    let modalTitle = '';
    let loading = false;
    let openModal = false
    let backButton = false;
    let startSearch = false;

    // const createSucursal = () => {
    //     modalTitle = 'Crear Sucursal';
    //     modalContent = FormSucursalSave;
    //     props = { 
    //         sucursal: {
    //             number: '',
    //             address: '',
    //             description: '',
    //             commune: '',
    //             region: '',
    //             company_id: 13
        
    //         },
    //         company
    //     }
    //     openModal = true
    
    // }


    const editStore = (sucursal) => {
        console.log('edit store > ', company)
        // modalTitle = `Sucursal ${sucursal.number}`
        modalTitle = 'Oficinas - Sucursal ' + sucursal.number
        // modalContent = FormSucursal;
        modalContent = OfficesInfo;
        props = { sucursal, company, readinfo: true}
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
    

    <div class="search-sucursal">
        <SucursalSearch
            bind:sucursales = {stores}
            companyId={$user.company_id}
            on:startSearch={ () => {
                startSearch = true;
                // companyBackup.set(empresas)
            } }
            on:removeSearch={ () => {
                startSearch = false;
                getStores($user.company_id)
                // empresas = [...$companyBackup]
            } }
        />
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
    
    .search-sucursal{
        display: flex;
        justify-content: end;
        align-items: center;
    }
</style>