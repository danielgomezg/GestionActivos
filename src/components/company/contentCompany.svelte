<script>
    // @ts-ignore
    import { Button, IconButton } from "$lib"
    import StoresInfo from "./storesInfo.svelte";
    import { empresas } from "../../stores/user";
    import CardCompany from "./companyCard.svelte";
    import FormCompany from "./formCompany.svelte";
    import FormSucursal from "../sucursal/formSucursal.svelte";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";

    import { setContext } from "svelte";
    

    let openModal = false;
    let modalTitle = ''
    let modalContent;  
    let props;
    let previusComponent;

    setContext('backModalContent', (e) => {
        e.preventDefault();
        console.log('in back.......')
        console.log(previusComponent)
        
        modalContent = previusComponent
        openModal = true
    })

    setContext('editStore', (store) => {
        // Esta funcion cambia el contenido del side sheets o bottom.
        // guardamos el componente que se esta mostrando
        previusComponent = modalContent;
        editStore(store)
    })

    const createCompany = () => {
        modalTitle = 'Crear empresa'
        modalContent = FormCompany;
        props = { company: {
            name: '',
            rut: '',
            pais: ''
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
        modalTitle = `${company.name} - sucursales`
        modalContent = StoresInfo;
        props = { }
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
        modalTitle = `Tienda ${sucursal.numero}`
        modalContent = FormSucursal;
        props = { sucursal }
        openModal = true

    }

</script>

<div style="padding-top: 20px;">
    <div class="header-company">
        <Button label="Nueva empresa" on:click={ createCompany } />
        <IconButton icon="tune" />
        <!-- <div class="title">Empresas</div> -->
    </div>
    <br>

    <div class="companies-content">
        {#each $empresas as company }    
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
    {modalContent}
    bind:openModal={openModal}
    on:editStore={ (event) => editStore(event.detail) }
/>

<!-- <SideSheets bind:open={openModal} title={modalTitle} >
    
    <svelte:component this={modalContent} bind:openModal={openModal} {...props} />
    
</SideSheets> -->

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