<script>
    import Api from "../../../helpers/ApiCall";
    import { onMount, setContext } from "svelte";
    import StoresInfo from "./storesInfo.svelte";
    import CardCompany from "./companyCard.svelte";
    import FormCompany from "./formCompany.svelte";
    import { Button, Loading, Search } from "$lib";
    import FormSucursal from "../sucursal/formSucursal.svelte";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";
    import FormSucursalSave from "../sucursal/formSucursalSave.svelte";
 
    let openModal = false, backButton = false;
    let modalTitle = '', previusModelTitle = ''
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

    setContext('replaceCompany', (company) => {
        let index = empresas.findIndex(emp => emp.id == company.id);
        empresas[index] = company;
        empresas = [...empresas]
        openModal = false;
    })

    setContext('addSucursalCount', (companyId, cont) => {
        let empresa = empresas.find(emp => emp.id == companyId);
        empresa.count_sucursal = empresa.count_sucursal + cont;
        empresas = [...empresas]
        openModal = false;
    })

    setContext('addCompany', (company) => {
        empresas = [company, ...empresas]
        openModal = false;
    })

    setContext('editStore', (store, company) => {
        editStore(store, company)
    })

    setContext('removeCompany', (companyId) => {
        empresas = empresas.filter(emp => companyId !== emp.id);
    })

    const createCompany = () => {
        modalTitle = 'Crear empresa'
        modalContent = FormCompany;
        props = { company: {
            name: '',
            rut: '',
            country: '',
            contact_name: '',
            contact_phone: '',
            contact_email: ''
        } }
        openModal = true
        backButton = false;
    }

    const editCompany = (company) => {
        modalTitle = company.name + " - editando"
        modalContent = FormCompany;
        props = { company, isEdit: true }
        openModal = true
        backButton = false;
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
    <div class="header-content">
        <Button label="Nueva empresa" custom on:click={ createCompany } />
        <Search value="" />
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

    .companies-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
</style>