<script>
    import Api from "../../../helpers/ApiCall";
    import { Button, Loading, Fab, Lists } from "$lib";
    // import StoresInfo from "./storesInfo.svelte";
    // import CardCompany from "./companyCard.svelte";
    // import FormCompany from "./formCompany.svelte";
    // import CompanySearch from "./companySearch.svelte";
    // import { companyBackup } from "../../stores/store";
    // import History from "../history/history.svelte";
    // import HistoryCompany from "./companyHistory.svelte";
    import { onMount, setContext, onDestroy } from "svelte"
    // import FormSucursal from "../sucursal/formSucursal.svelte";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";
    // import FormSucursalSave from "../sucursal/formSucursalSave.svelte";
 
    let props;
    let count = 0;
    let limit = 5;
    let offset = 0;
    let modalContent;  
    let categories = [
        {
            id: 1,
            description: "Division 1",
            parentId: 0,
        },
        {
            id: 2,
            description: "Division 2",
            parentId: 0,
        },
        {
            id: 3,
            description: "Division 3",
            parentId: 0,
            // children: [
            //     {
            //         id: 31,
            //         description: "Division 3.1",
            //         parentId: 3,
            //     },
            //     {
            //         id: 32,
            //         description: "Division 3.2",
            //         parentId: 3,
            //     },
            //     {
            //         id: 33,
            //         description: "Division 3.3",
            //         parentId: 3,
            //     },
            // ]
        },
        {
            id: 4,
            description: "Division 4",
            parentId: 0,
        },
    ]

    let loading = false;
    let startSearch = false;
    let previusComponent, previusProps;
    let openModal = false, backButton = false;
    let modalTitle = '', previusModelTitle = '';

    // setContext('backModalContent', (e) => {
    //     e.preventDefault();
    //     // if (modalContent === previusComponent) openModal = false;
    //     backButton = false
    //     modalContent = previusComponent
    //     modalTitle = previusModelTitle
    //     props = { ...previusProps }
    //     // openModal = true
    // })

    // setContext('replaceCompany', (company) => {
    //     let index = empresas.findIndex(emp => emp.id == company.id);
    //     let count = empresas[index].count_sucursal
    //     empresas[index] = company;
    //     empresas[index].count_sucursal = count
    //     empresas = [...empresas]
    //     openModal = false;
    // })

    // setContext('addSucursalCount', (companyId, cont) => {
    //     let empresa = empresas.find(emp => emp.id == companyId);
    //     empresa.count_sucursal = empresa.count_sucursal + cont;
    //     empresas = [...empresas]
    //     openModal = false;
    // })

    // setContext('addCompany', (company) => {
    //     empresas = [company, ...empresas]
    //     openModal = false;
    // })

    // setContext('editStore', (store, company) => {
    //     editStore(store, company)
    // })

    // setContext('removeCompany', (companyId) => {
    //     empresas = empresas.filter(emp => companyId !== emp.id);
    // })

    const createCategory = () => {
        modalTitle = 'Crear categoria'
        // modalContent = FormCompany;
        // props = { company: {
        //     name: '',
        //     rut: '',
        //     country: '',
        //     contact_name: '',
        //     contact_phone: '',
        //     contact_email: ''
        // } }
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

    const getCategories = async (parentId) => {
        if (offset > count) return;
        console.log('GET CATEGORIES -> ', parentId)
        console.log('CATEGORIES -> ', categories)

        categories = categories.map(cat => {
            if (cat.id == parentId) {
                cat.children = [
                    {
                        id: 31,
                        description: `Division ${parentId}.1`,
                        parentId: 3,
                    },
                    {
                        id: 32,
                        description: `Division ${parentId}.2`,
                        parentId: 3,
                    },
                    {
                        id: 33,
                        description: `Division ${parentId}.3`,
                        parentId: 3,
                    },
                ]
            } 
            // else {
            //     cat.children = []
            // }
            return cat
        })

        // loading = true;
        // let response = (await Api.call(`/categories/${parentId}?limit=${limit}&offset=${offset}`, 'GET'))
        // console.log('RESPONSE GET COMPANIES --> ', response)
        // if (response.success && response.statusCode == "200") {
        //     empresas = [...empresas, ...response.data.result] //empresas.set(response.data)
        //     count = response.data.count
        // } 
        // loading = false;
    }

    const history = (company) => {
        console.log('HISTORY COMPANY -> ', company)
        modalTitle = `${company.name} - Historial`;
        modalContent = HistoryCompany;
        props = { 
            company
        }
        openModal = true
    }

    const handleScroll = () => {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
            offset = offset + limit;
            getCompanies()
        }
    }

    onMount(async () => {
        getCategories(0) 

        window.addEventListener('scroll', handleScroll)
    })

    onDestroy(() => {
        window.removeEventListener('scroll', handleScroll)
    })

</script>

<div style="position: relative">
    <div class="header-content" style="position: sticky; top: 40px; z-index: 3; background-color: #f0f0f0; padding: 34px 0 10px">
        <div class="desktop-only">
            <Button label="Nueva categoria" custom on:click={ createCategory } />
        </div>
        <!-- <Search value="" /> -->
        <div>
        <!-- <CompanySearch 
            bind:empresas={empresas} 
            on:startSearch={ () => {
                startSearch = true;
                // companyBackup.set(empresas)
                offset = 0;
                getCompanies();
            } }
            on:removeSearch={ () => {
                startSearch = false;
                empresas = [...$companyBackup]
            } }
        /> -->
        </div>
        <div class="mobile-only" style="position: fixed; bottom: 10px; right: 10px; z-index: 10">
            <Fab on:click={ createCategory } />
        </div>
    </div>

    <div class="flex-column gap-8 mt-8" style="padding: 44px 0 10px;">
        <Lists 
            options={ categories }
            on:select={ (event) => getCategories(event.detail) }
        />
        <!-- {#if loading}
            <Loading />
        {/if}
        {#each empresas as company }    
            <CardCompany 
                {company} 
                on:edit={ (event) => editCompany(event.detail) } 
                on:newStore={ (event) => newStore(event.detail) } 
                on:showStores={ (event) => showStores(event.detail) } 
                on:history={ (event) => history(event.detail) }
            />
        {:else}
            {#if startSearch}
                <p>No se encontraron empresas para tu búsqueda</p>
            {:else}
                <p>No hay empresas registradas</p>
            {/if}
        {/each} -->
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

</style>