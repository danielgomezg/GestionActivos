<script>
    import Api from "../../../helpers/ApiCall";
    import { TextField, IconButton } from "$lib";
    import { companySelect } from "../../stores/store";
    import { createEventDispatcher, onMount } from "svelte";

    export let hideActives = [];
    export { requeueActive };

    let count = 0;
    let limit = 25;
    let offset = 0;
    let searchText = '';
    let activesFound = [];

    let dispatch = createEventDispatcher();
    
    const requeueActive = (active) => {
        activesFound = [...activesFound, active]
    }   

    const getActives = async () => {
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

</script>
<div style="position: relative;" >
    <TextField 
        version=2
        id="search-active"
        required 
        type="text"
        label="Buscador activos" 
        trailing="search"
        bind:value={ searchText }
    />
    <div class="found-container" on:scroll={ onScroll }>
        {#each activesFound as active }
            {#if !hideActives.includes(active.id) }
                <div class="active-found">
                    <span>{ active.bar_code || active.virtual_code }</span>
                    <IconButton 
                        icon="add" 
                        on:click={() => {
                            dispatch('addActive', active)
                            activesFound = activesFound.filter(a => a.id !== active.id)
                        }} 
                    />
                </div>
            {/if}
        {/each}
    </div>
</div>

<style>

    .found-container {
        width: 100%;
        max-width: 100%;
        position: absolute;
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