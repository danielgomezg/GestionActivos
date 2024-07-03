<script>
    import Api from "../../../helpers/ApiCall";
    import { companySelect } from "../../stores/store";
    import { TextField, IconButton } from "$lib";
    import { createEventDispatcher, onMount } from "svelte";
    import App from "../../App.svelte";

    export let companyId = 0;

    let sucursales = [];
    let showResultStore = false;
    let searchTextStore = '';
    let storeSelected = false;
    let notFoundStore = false;
    let storeId = 0;
    let offsetStore = 0;
    let countStore = 0;

    let offices = [];
    let showResultOffice = false;
    let searchTextOffice = '';
    let officeSelected = false;
    let notFoundOffice = false;
    let officeId = 0;
    let offsetOffice = 0;
    let countOffice = 0;
    
    let limit = 10;
    
    let dispatch = createEventDispatcher();

    const searchSucursales = async (text) => {
        if(companyId == 0) return;

        if(text == '') return;

        let response = await Api.call(`/sucursal/search/select/${companyId}?search=${text}&limit=${limit}&offset=${offsetStore}`, 'GET', {}, 'json')
        console.log('RESPONSE SEARCH SUCURSALES BY TEXT--> ', response)
        if(response.success && response.statusCode == "200"){
            if(offsetStore != 0){
                const newSucursales = response.data.result.map(r => ({
                    label: `${r.number} - ${r.description}`,
                    value: r.id
                }));
                sucursales = [...sucursales, ...newSucursales] 
                countStore = response.data.count;
            }else{
                sucursales = response.data.result.map(r => ({ label: `${r.number} - ${r.description}`, value: r.id }));
                countStore = response.data.count
            }
            
            if(countStore == 0){
                notFoundStore = true;
            }
            else{
                notFoundStore = false;
            }
        }
    }

    const getSucursales = async () => {
        if (companyId == 0) {
            sucursales = [];
            offices = [];
            return;
        }; 
        let response = await Api.call(`/sucursalPorCompany/${companyId}?limit=${limit}&offset=${offsetStore}`, 'GET');
        console.log('RESPONSE GET SUCURSALES  AUTOCOMPLETE -> ', response);
        if (response.success && response.statusCode === '200') {
            if(offsetStore != 0){
                const newSucursales = response.data.result.map(r => ({
                    label: `${r.number} - ${r.description}`,
                    value: r.id
                }));
                sucursales = [...sucursales, ...newSucursales] 
            }else{
                sucursales = response.data.result.map(r => ({ label: `${r.number} - ${r.description}`, value: r.id }));
                countStore = response.data.count
            }
        }
        else {
            notFoundStore = true;
            sucursales = [];
        }
        offices = [];
    };

    const getOffices = async (sucursalId) => {
        if (!storeSelected) {
            offices = [];
            return;
        }; 
        let response = await Api.call(`/officePorSucursal/${sucursalId}?limit=${limit}&offset=${offsetOffice}`, 'GET', {}, 'json', companyId);
        console.log('RESPONSE GET OFFICES  AUTOCOMPLETE -> ', response);
        if (response.success && response.statusCode === '200') {
            if(offsetOffice != 0){
                const newOffices = response.data.result.map(r => ({
                    label: `${r.floor} - ${r.description}`,
                    value: r.id
                }));
                offices = [...offices, ...newOffices];
            }else{
                offices = response.data.result.map(r => ({ label: `${r.floor} - ${r.description}`, value: r.id }));
                countOffice = response.data.count;
            }
        }
        else {
            notFoundOffice = true;
            offices = [];
        }
    };

    const searchOffices = async (text) => {
        if(companyId == 0) return;
        if(storeId == 0) return;
        if(text == '') return;

        let response = await Api.call(`/office/search/select/${storeId}?search=${text}&limit=${limit}&offset=${offsetOffice}`, 'GET', {}, 'json', companyId)
        console.log('RESPONSE SEARCH OFICINAS BY TEXT--> ', response)
        if(response.success && response.statusCode == "200"){
            if(offsetOffice != 0){
                const newOffices = response.data.result.map(r => ({
                    label: `${r.floor} - ${r.description}`,
                    value: r.id
                }));
                offices = [...offices, ...newOffices];
                countOffice = response.data.count;
            }else{
                offices = response.data.result.map(r => ({ label: `${r.floor} - ${r.description}`, value: r.id }));
                countOffice = response.data.count;
            }
            if(countOffice == 0){
                notFoundOffice = true;
            }
            else{
                notFoundOffice = false;
            }
            console.log(offices)
        }
    }

    const onScroll = async (e, typeSelect) => {
        if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
            if(typeSelect == 'sucursal'){
                offsetStore += limit;
                if (offsetStore >= countStore) return;
                if(searchTextStore == '') await getSucursales();
                else await searchSucursales(searchTextStore);
            }else{
                offsetOffice += limit;
                if (offsetOffice >= countOffice) return;
                if(searchTextOffice == '') await getOffices(storeId);
                else await searchOffices(searchTextOffice);
            }
        }
    }

     function handleTextFieldFocus(typeSelect) {
        if(typeSelect == 'sucursales'){
            showResultStore = true;
            if (searchTextStore.length > 0) searchTextStore = '';
            offsetStore = 0;
        }else{
            showResultOffice = true;
            if (searchTextOffice.length > 0) searchTextOffice = '';
            offsetOffice = 0;
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

    function selectSucursal(store) {
        searchTextStore = " "
        storeSelected = true;
        showResultStore = false; // Oculta el contenedor de resultados
        storeId = store.value
        getOffices(storeId)
        dispatch('sucursalSelected', store);
    }

    function selectOffice(value) {
        dispatch('officeSelected', value);
    }

    onMount(async () => {
        if (companyId != 0) await getSucursales();
    })

    //$: searchSucursales(searchTextStore)
    //$: searchOffices(searchTextOffice)

    $: if (searchTextStore == ''){
        offsetStore = 0;
        countStore = 0;
        notFoundStore = false
        getSucursales();
    } 

    $: if(searchTextStore){
        offsetStore = 0;
        countStore = 0;
        searchSucursales(searchTextStore);
    }

    $: if (searchTextOffice == ''){
        offsetOffice = 0;
        countOffice = 0;
        notFoundOffice = false
        getOffices(storeId);
    } 

    $: if(searchTextOffice){
        offsetOffice = 0;
        countOffice = 0;
        searchOffices(searchTextOffice);
    }

    $: if (companyId != 0) {
        searchTextStore = '';
        offsetStore = 0;
        countStore = 0;
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
                offsetStore = 0;
                getSucursales();

            }}
            on:focus={() => handleTextFieldFocus('sucursales')}
        />
        {#if showResultStore}
            <div class="found-container" on:scroll={(e) => onScroll(e, 'sucursal') }>
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
            <div class="found-container" on:scroll={(e) => onScroll(e, 'office') }>
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