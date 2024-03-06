<script>
    import Api from "../../../helpers/ApiCall";
    import { Button, Loading, Fab, Lists } from "$lib";
    import CompanySelect from "../company/companySelect.svelte";
    // import StoresInfo from "./storesInfo.svelte";
    // import CardCompany from "./companyCard.svelte";
    import FormCategory from "./categoryForm.svelte";
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
    let message = "";
    let company_id = 0;
    let categories = []

    let loading = false;
    let startSearch = false;
    let previusComponent, previusProps;
    let openModal = false, backButton = false;
    let modalTitle = '', previusModelTitle = '';
    let hideSelectCompany = false;
    let bottomShettHeight;

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

    const createCategory = (parent_id) => {
        modalTitle = 'Crear categoria'
        modalContent = FormCategory;
        props = { 
            category: {
                description: '',
                parent_id
            }, 
            company_id
        }
        bottomShettHeight = '50%'
        openModal = true
        backButton = false;
    }

    const editCategories = (category) => {
        modalTitle = category.description + " - editando"
        modalContent = FormCategory;
        props = { category, company_id }
        bottomShettHeight = '50%'
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

    function depthFirstSearch(tree, value) {
        if (tree.id === value) {
            return tree;
        }

        if (tree.children === undefined) {
            return null;
        }

        for (let child of tree.children) {
            let result = depthFirstSearch(child, value);

            if (result) {
                return result;
            }
        }

        return null;
    }

    const getCategories = async (parentId) => {
        if (offset > count) return;
        console.log('GET CATEGORIES -> ', parentId)
        console.log('CATEGORIES -> ', categories)

        loading = true;
        let response = (await Api.call(`/category/${parentId}?limit=${limit}&offset=${offset}`, 'GET', {}, 'json', company_id))
        console.log('RESPONSE GET CATEGORIES --> ', response)
        if (response.success && response.statusCode == "200") {
            count = response.data.count
            if (count == 0) return;
        
            if (parentId == 0) {
                categories = response.data.result
            } else {
                // Se necesita agregar las categorias a la categoria padre
                let parent = depthFirstSearch({ children: categories }, parentId);
                parent.children = response.data.result
                categories = [...categories]



            }
        } 
        loading = false;
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
            // getCompanies()
        }
    }

    onMount(async () => {

        let user = JSON.parse(sessionStorage.getItem('user'));
        if (user.profile_id == 2) {
            getCategories(user.company_id);
            hideSelectCompany = true;
            message = "Buscando..."
        }
        else {
            hideSelectCompany = false;
            message = "Selecciona una empresa para obtener sus articulos."
        }
        window.addEventListener('scroll', handleScroll)
    })

    onDestroy(() => {
        window.removeEventListener('scroll', handleScroll)
    })

</script>

<div class="mobile-only" style="position: fixed; bottom: 10px; right: 10px; z-index: 10">
    <Fab on:click={ () => createCategory(0) } />
</div>
<div style="position: relative">
    <div class="header-content" style="position: sticky; top: 40px; z-index: 3; background-color: #f0f0f0; padding: 34px 0 10px">
        <div class="flex-row gap-8 space-between">
            {#if !hideSelectCompany}
                <CompanySelect 
                    customHeight
                    on:change={ (event) => {
                        console.log(event.detail)
                        company_id = event.detail;
                        offset = 0;
                        count = 0;
                        getCategories(0)
                    }}
                />
            {/if}
            <div class="desktop-only">
                <Button label="Nueva categoria" custom on:click={ () => createCategory(0) } />
            </div>
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
    </div>

    <div class="flex-column gap-8 mt-8" style="padding: 44px 0 10px;">
        <Lists 
            options={ categories }
            on:select={ (event) => getCategories(event.detail) }
            on:edit={ (event) => editCategories(event.detail) }
            on:add={ (event) => createCategory(event.detail.id) }
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
    {bottomShettHeight}
    bind:openModal={openModal}
/>

<style>

</style>