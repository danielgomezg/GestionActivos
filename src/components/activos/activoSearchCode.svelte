<script>
    import Api from "../../../helpers/ApiCall";
    import { TextField, IconButton } from "$lib";
    import { createEventDispatcher } from "svelte";

    export let hideActives = [];
    export { requeueActive };

    let dispatch = createEventDispatcher();
    let searchText = '';
    let activesFound = [
        {
            id: 5,
            barcode: '55555555',
            virtualcode: ''
        },
        {
            id: 6,
            barcode: '66666666',
            virtualcode: ''
        },
        {
            id: 3,
            barcode: '33333333',
            virtualcode: ''
        },
        {
            id: 7,
            barcode: '',
            virtualcode: '77777777'
        }
    ]

    const requeueActive = (active) => {
        activesFound = [...activesFound, active]
    }   

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
    <div class="found-container">
        {#each activesFound as active }
            {#if !hideActives.includes(active.id) }
                <div class="active-found">
                    <span>{ active.barcode || active.virtualcode }</span>
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
    }

    .active-found {
        display: flex;
        padding: 0 10px;
        align-items: center;
        justify-content: space-between;
    }
</style>