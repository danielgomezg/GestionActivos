<script>
    import Api from "../../../helpers/ApiCall";
    import { onMount, setContext } from "svelte";
    import StoresInfo from "./storesInfo.svelte";
    import CardCompany from "./companyCard.svelte";
    import FormCompany from "./formCompany.svelte";
    import { Button, IconButton, Loading } from "$lib";
    import FormSucursal from "../sucursal/formSucursal.svelte";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";
    import FormSucursalSave from "../sucursal/formSucursalSave.svelte";

    let openModal = false, backButton = false;
    let modalTitle = '', previusModelTitle = []
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
        modalTitle = previusModelTitle
        props = { ...previusProps }
        // openModal = true
    })

    setContext('addSucursalCount', (companyId) => {
        let empresa = empresas.find(emp => emp.id == companyId);
        empresa.count_sucursal++;
        console.log('empresa found > ', empresa)
        empresas = [...empresas]
    })

    setContext('addCompany', (company) => {
        console.log('in add company')
        empresas = [company, ...empresas]
    })

    setContext('editStore', (store, company) => {
        // Esta funcion cambia el contenido del side sheets o bottom.
        // guardamos el componente que se esta mostrando
        editStore(store, company)
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
        modalTitle = company.name + " - editando"
        modalContent = FormCompany;
        props = { company, isEdit: true }
        openModal = true
    }

    const showStores = (company) => {
        // Se guarda componente actual para boton back 
        previusComponent = modalContent;
        previusProps = { ...props };

        modalTitle = `${company.name} - sucursales`
        previusModelTitle = modalTitle
        modalContent = StoresInfo;
        props = { stores: company.sucursales, company_id:  company.id, company}
        backButton = false
        openModal = true
    }

    const newStore = (company) => {
        modalTitle = `Nueva sucursal ${company.name}`
        modalContent = FormSucursalSave;
        props = { 
            sucursal: {
                number: '',
                address: '',
                description: '',
                commune: '',
                region: '',
                company_id: company.id
        
            },
            company 
        }
        openModal = true
    }

    const editStore = (sucursal, company) => {
        // Se guarda componente actual para boton back
        previusComponent = modalContent;
        previusProps = { ...props };

        modalTitle = `Sucursal ${sucursal.number}`
        modalContent = FormSucursal;
        props = { sucursal, company }
        backButton = true
        openModal = true

    }

    const getCompanies = async () => {
        loading = true;
        let response = (await Api.call('http://127.0.0.1:9000/companies', 'GET'))
        console.log('RESPONSE GET COMPANIES --> ', response)
        if (response.success && response.statusCode == "200") {
            empresas = response.data.result //empresas.set(response.data)
        } 
        loading = false;
    }

    onMount(async () => {
        getCompanies() 
    })

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