<script>
// @ts-nocheck

    // @ts-ignore
    import { Button, IconButton, Loading } from "$lib"
    import StoresInfo from "./storesInfo.svelte";
    // import { empresas } from "../../stores/store";
    import CardCompany from "./companyCard.svelte";
    import FormCompany from "./formCompany.svelte";
    import FormSucursal from "../sucursal/formSucursal.svelte";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";

    import Api from "../../../helpers/ApiCall";

    import { onMount, setContext } from "svelte";
    

    let openModal = false, backButton = false;
    let modalTitle = ''
    let modalContent;  
    let props;
    let previusComponent, previusProps;
    let empresas = []
    let loading = false;

    setContext('backModalContent', (e) => {
        e.preventDefault();
        // if (modalContent === previusComponent) openModal = false;
        backButton = false
        modalContent = previusComponent
        props = { ...previusProps }
        // openModal = true
    })

    setContext('editStore', (store) => {
        // Esta funcion cambia el contenido del side sheets o bottom.
        // guardamos el componente que se esta mostrando
        editStore(store)
    })

    const createCompany = () => {
        modalTitle = 'Crear empresa'
        modalContent = FormCompany;
        props = { company: {
            name: '',
            rut: '',
            country: ''
        } }
        openModal = true
    }

    const editCompany = (company) => {
        modalTitle = company.name
        modalContent = FormCompany;
        props = { company }
        openModal = true
    }

    const showStores = (company) => {
        // Se guarda componente actual para boton back
        previusComponent = modalContent;
        previusProps = { ...props };

        modalTitle = `${company.name} - sucursales`
        modalContent = StoresInfo;
        props = { stores: company.sucursales }
        backButton = false
        openModal = true
    }

    const newStore = (company) => {
        modalTitle = `Nueva sucursal ${company.name}`
        modalContent = FormSucursal;
        props = { sucursal: {
            numero: '',
            direccion: '',
            descripcion: '',
            comuna: '',
            ciudad: '',
        } }
        openModal = true
    }

    const editStore = (sucursal) => {
        // Se guarda componente actual para boton back
        previusComponent = modalContent;
        previusProps = { ...props };

        modalTitle = `Sucursal ${sucursal.numero}`
        modalContent = FormSucursal;
        props = { sucursal }
        backButton = true
        openModal = true

    }

    const getCompanies = async () => {
        loading = true;
        let response = (await Api.call('http://localhost:7000/companies'))
        console.log('RESPONSE GET COMPANIES --> ', response)
        if (response.success) {
            empresas = response.data //empresas.set(response.data)
        } 
        loading = false;
    }

    onMount(async () => {
        getCompanies() 
    })

    $: console.log('open modal: ', openModal)

</script>

<div style="padding-top: 20px;">
    <div class="header-company">
        <Button label="Nueva empresa" on:click={ createCompany } />
        <IconButton icon="tune" />
        <!-- <div class="title">Empresas</div> -->
    </div>
    <br>

    <div class="companies-content">
        {#if loading}
            <Loading />
        {/if}
        {#each empresas as company }    
            <CardCompany 
                {company} 
                on:edit={ (event) => editCompany(event.detail) } 
                on:newStore={ (event) => newStore(event.detail) } 
                on:showStores={ (event) => showStores(event.detail) } 
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