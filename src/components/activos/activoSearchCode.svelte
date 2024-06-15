<script>
    import Api from "../../../helpers/ApiCall";
    import { companySelect } from "../../stores/store";
    import { TextField, IconButton, Loading } from "$lib";
    import { createEventDispatcher, onMount } from "svelte";

    export let hideActives = [];

    let count = 0;
    let limit = 25;
    let offset = 0;
    let searchText = '';
    let loading = false;
    let notFound = false;
    let activesFound = [];

    let dispatch = createEventDispatcher();

    const getActivesByCode = async (code) => {
        if (code.length < 3) return;
        activesFound = [];
        loading = true;

        let response = await Api.call(`/active/search/codes?search=${code}&limit=50&offset=0`, 'GET', {}, 'json', $companySelect);
        console.log('RESPONSE GET ACTIVOS BY CODE --> ', response)
        if (response.success && response.statusCode == "200") {
            activesFound = response.data.result 
            count = response.data.count
            if (count == 0) {
                notFound = true;
            }
            else {
                notFound = false;
            }
            loading = false;
        }
    }

    const getActives = async () => {
        if (searchText.length > 0) return;
        // Obtener activos
        let response = await Api.call(`/actives/values/codes?limit=${limit}&offset=${offset}`, 'GET', {}, 'json', $companySelect);
        console.log('RESPONSE GET ACTIVOS --> ', response)
        if (response.success && response.statusCode == "200") {
            activesFound = [...activesFound, ...response.data.result] 
            count = response.data.count
        } 

    }

    const onScroll = async (e) => {
        if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
            offset += limit;
            if (offset >= count) return;
            await getActives();
        }
    }

    onMount(() => {
        getActives();
    })

    $: getActivesByCode(searchText);

</script>
<div style="position: relative;" >
    <TextField 
        version=2
        id="search-active"
        required 
        type="text"
        label="Buscador activos" 
        trailing={ searchText.length > 0 ? 'clear' : 'search' }
        bind:value={ searchText }
        on:click={() => { 
            if (searchText.length > 0) searchText = '';
            offset = 0;
            activesFound = [];
            getActives();
        }}
    />
    <div class="found-container" on:scroll={ onScroll }>
        {#if loading}
            <div style="display: flex; justify-content: center; margin: 10px 0;">
                <Loading />
            </div>
        {/if}
        {#if notFound}
            <div style="display: flex; justify-content: center; margin: 10px 0;">
                <span>No se encontraron activos</span>
            </div>
        {/if}
        {#each activesFound as active }
            {#key hideActives}
                {#if !hideActives.includes(active.id) }
                    <div class="active-found">
                        <span>{ active.bar_code || active.virtual_code }</span>
                        <IconButton 
                            icon="add" 
                            on:click={() => {
                                dispatch('addActive', active)
                                // activesFound = activesFound.filter(a => a.id !== active.id)
                                // hideActives = [...hideActives, active.id]
                            }} 
                        />
                    </div>
                {/if}
            {/key}
        {/each}
    </div>
</div>

<style>

    .found-container {
        width: 100%;
        max-width: 100%;
        border-radius: 10px;
        border: solid 1px #ccc;
        max-height: 250px;
        overflow-y: auto;
    }

    .active-found {
        display: flex;
        padding: 0 10px;
        align-items: center;
        justify-content: space-between;
    }
    
</style>