<script>
    import Api from "../../../helpers/ApiCall";
    import { companySelect } from "../../stores/store";
    import { TextField, IconButton, Loading } from "$lib";
    import { createEventDispatcher, onMount } from "svelte";
    import App from "../../App.svelte";

    export let companyId = 0;

    let sucursales = [];
    let showResultStore = false;
    let searchTextStore = '';
    let notFoundStore = false;
    let offices = [];
    let showResultOffice = false;
    let searchTextOffice = '';
    let notFoundOffice = false;

    let count = 0;
    let limit = 25;
    let offset = 0;
    
    let loading = false;
    

    let dispatch = createEventDispatcher();

    const searchSucursales = async (text) => {
        sucursales = [];
        loading = true;

        let response = await Api.call(`/sucursal/search/select/${companyId}?search=${text}&limit=50&offset=0`, 'GET', {}, 'json')
        console.log('RESPONSE SEARCH SUCURSALES BY TEXT--> ', response)
        if(response.success && response.statusCode == "200"){
            sucursales = response.data.result.map(r => ({ label: `${r.number} - ${r.description}`, value: r.id }));
            count = response.data.count
            if(count == 0){
                notFoundStore = true;
            }
            else{
                notFoundStore = false;
            }
            loading = false;
        }
    }

    const getSucursales = async () => {
        console.log("SUCURSALES AUTOCOMPLETE ")
        if (companyId == 0) {
            sucursales = [];
            //sucursalLabels = [];
            return;
        }; 
        let response = await Api.call(`/sucursalPorCompany/${companyId}`, 'GET');
        console.log('RESPONSE GET SUCURSALES  AUTOCOMPLETE -> ', response);
        if (response.success && response.statusCode === '200') {
            sucursales = response.data.result.map(r => ({ label: `${r.number} - ${r.description}`, value: r.id }));
            console.log(sucursales)
            //sucursalLabels = sucursales.map(s => s.label);
        }
        else {
            sucursales = [];
            //sucursalLabels = [];
        }
    };

    const getOffices = async (sucursalId) => {
        console.log("OFICCES AUTOCOMPLETE ")
        if (searchTextStore == '') {
            offices = [];
            return;
        }; 
        let response = await Api.call(`/officePorSucursal/${sucursalId}`, 'GET', {}, 'json', companyId);
        console.log('RESPONSE GET OFFICES  AUTOCOMPLETE -> ', response);
        if (response.success && response.statusCode === '200') {
            offices = response.data.result.map(r => ({ label: `${r.floor} - ${r.description}`, value: r.id }));
            console.log(offices)
        }
        else {
            offices = [];
        }
    };

    const onScroll = async (e) => {
        if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
            offset += limit;
            if (offset >= count) return;
            await getSucursales();
        }
    }

     function handleTextFieldFocus(typeSelect) {
        console.log("---> " + typeSelect)
        if(typeSelect == 'sucursales'){
            showResultStore = true;
            if (searchTextStore.length > 0) searchTextStore = '';
            offset = 0;
           // getSucursales();
        }else{
            showResultOffice = true;
            if (searchTextOffice.length > 0) searchTextOffice = '';
            offset = 0;
        }
        
    }

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.closest('.found-container') && !target.closest('#search-sucursal')) {
            showResultStore = false;
        }
        if (!target.closest('.found-container') && !target.closest('#search-office')) {
            showResultOffice = false;
        }
    });

    function selectSucursal(value) {
        searchTextStore = value.label;
        showResultStore = false; // Oculta el contenedor de resultados
        getOffices(value.value)
        dispatch('sucursalSelected', value);
    }

    function selectOffice(value) {
        //searchTextOffice = value.label;
        //showResultOffice = false; // Oculta el contenedor de resultados
        //getOffices(value.value)
        dispatch('officeSelected', value);

    }

    onMount(async () => {
        await getSucursales()
    })

    $: console.log("showResult " + searchTextStore)

    $: searchSucursales(searchTextStore)

    $: if (companyId != 0) {
        searchTextStore = ''
        getSucursales(); 
    }

</script>

<div class="selects-container">
    <div style="position: relative;" >
        <TextField 
            version=2
            id="search-sucursal"
            type="text"
            label="Sucursales"
            bind:value={ searchTextStore }
            on:click={() => { 
                showResultStore = !showResultStore;
                if (searchTextStore.length > 0) searchTextStore = '';
                offset = 0;
                getSucursales();

            }}
            on:focus={() => handleTextFieldFocus('sucursales')}
        />
        {#if showResultStore}
            <div class="found-container" on:scroll={ onScroll }>
                {#if loading}
                    <div style="display: flex; justify-content: center; margin: 10px 0;">
                        <Loading />
                    </div>
                {/if}
                {#if notFoundStore}
                    <div style="display: flex; justify-content: center; margin: 10px 0;">
                        <span>No se encontraron sucursales</span>
                    </div>
                {/if}
                {#each sucursales as sucursal }
                    <div class="search-found" on:click={() => selectSucursal(sucursal)}>
                        <span>{ sucursal.label }</span>
                    </div>
                {/each}
            </div>
        {/if}
    </div>

    <div style="position: relative;" >
        <TextField 
            version=2
            id="search-office"
            type="text"
            label="oficinas"
            bind:value={ searchTextOffice }
            on:click={() => { 
                showResultOffice = !showResultOffice;
                if (searchTextOffice.length > 0) searchTextOffice = '';
                offset = 0;
                //getSucursales();

            }}
            on:focus={() => handleTextFieldFocus('offices')}
        />
        {#if showResultOffice}
            <div class="found-container" on:scroll={ onScroll }>
                {#if loading}
                    <div style="display: flex; justify-content: center; margin: 10px 0;">
                        <Loading />
                    </div>
                {/if}
                {#if notFoundOffice}
                    <div style="display: flex; justify-content: center; margin: 10px 0;">
                        <span>No se encontraron oficinas</span>
                    </div>
                {/if}
                {#each offices as office }
                    <div class="search-found" on:click={() => selectOffice(office)}>
                        <span>{ office.label }</span>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    .found-container {
        position: absolute;
        top: 100%; /* Ajusta esta propiedad si necesitas que el menú aparezca en una posición específica */
        left: 0;
        width: 100%;
        max-height: 200px; /* Ajusta la altura según sea necesario */
        overflow-y: auto;
        background: white;
        border: 1px solid #ccc;
        border-radius: 10px;
        z-index: 1000; /* Un índice Z alto para que aparezca por encima de otros elementos */
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .search-found {
        display: flex;
        padding: 0 10px;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .search-found:hover {
        background-color: #f0f0f0; /* Cambia a cualquier color que prefieras */
    }

    .selects-container {
          display: flex;
          gap: 20px;
        }
</style>