<script>
    import Api from "../../../helpers/ApiCall";
    import { getContext, onMount } from "svelte";
    import { companySelect, snackbar } from "../../stores/store";
    import { TextField, Button, IconButton } from "$lib";
    import ActivoSearchCode from "../activos/activoSearchCode.svelte";

    export let edit = false;
    export let collection = {};
    
    let searchActives;
    let hideActives = [];
    let activesAdded = [];
    let activesColeccion = [];
    let addToListCollection = getContext('addCollection');
    let updateInListCollection = getContext('editCollection');

    const saveCollection = () => {
        // Guardar coleccion
        if (edit) {
            updateCollection();
        } else {
            createColeccion();
        }
    }

    const updateCollection = async () => {
        // Actualizar coleccion
        
        let body = {
            name: collection.name,
            activesId: [...activesAdded.map(a => a.id), ...activesColeccion.map(a => a.id)]
        }

        body = JSON.stringify(body);
        console.log('BODY UPDATE COLLECTION --> ', body)
        let response = await Api.call(`/actives/collections/${collection.id}`, 'PUT', { body }, 'json', $companySelect);
        console.log('RESPONSE PUT COLLECCION --> ', response)
        if (response.success && response.statusCode == "200") {
            updateInListCollection(response.data.result)
        } 
    }

    const createColeccion = async () => {
        // Crear coleccion
        let body = {
            name: collection.name,
            activesId: activesAdded.map(a => a.id)
        }

        body = JSON.stringify(body);
        console.log('BODY CREATE COLLECTION --> ', body)
        let response = await Api.call(`/actives/collections`, 'POST', { body }, 'json', $companySelect);
        console.log('RESPONSE GET COLLECCION --> ', response)
        if (response.success && response.statusCode == "201") {
            addToListCollection(response.data.result)
            activesAdded = [];
            collection.name = '';
        } 
        else {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = response.data.message //"Error al agregar el articulo."
                return snk
            })
        }
    }

    const removeActive = (active) => {
        
    }

    const getActivesColeccion = async () => {
        // Obtener activos de la coleccion.
        let response = await Api.call(`/actives/collections/${collection.id}`, 'GET', {}, 'json', $companySelect);
        console.log('RESPONSE GET ACTIVES COLLECCION --> ', response)
        if (response.success && response.statusCode == "200") {
            activesColeccion = [...activesColeccion, ...response.data.result] 
            hideActives = activesColeccion.map(a => a.id)
            // count = response.data.count
        } 
    }

    onMount(() => {
        if (edit) {
            // Obtener activos de la coleccion.
            getActivesColeccion();
        }
    })

</script>
<div class="form">
    <div>
        <TextField 
            version=2
            id="name-collection"
            required 
            type="text"
            label="Nombre" 
            bind:value={ collection.name }
        />    

        <br>

        <div>
            <!-- <p style="margin: 5px 0;"><strong>Activos</strong></p> -->
            <div class="active-list">
                {#each activesColeccion as active }
                    <div>
                        <span>{ active.bar_code || active.virtual_code }</span>
                        <IconButton 
                            icon="remove" 
                            on:click={ () => {
                                activesColeccion = activesColeccion.filter(a => a.id !== active.id)
                                hideActives = hideActives.filter(h => h !== active.id)
                            } } 
                        />
                    </div>
                {:else}
                    {#if activesAdded.length == 0 && activesColeccion.length == 0 } 
                        <p>Agrega activos a la colección</p>
                    {/if}
                {/each}
                {#each activesAdded as active }
                    <div>
                        <span>{ active.bar_code || active.virtual_code }</span>
                        <IconButton 
                            icon="remove" 
                            on:click={ () => {
                                activesAdded = activesAdded.filter(a => a.id !== active.id)
                                hideActives = hideActives.filter(h => h !== active.id)
                            } } 
                        />
                    </div>
                {/each}
            </div>
        </div>
        
    </div>

    <ActivoSearchCode 
        bind:this={searchActives}
        {hideActives}
        on:addActive={(e) => {
            activesAdded = [...activesAdded, e.detail]
            hideActives = [...hideActives, e.detail.id]
        }}
    />

    <div class="grid-col-span-1 mobile-fixed">
        <Button 
            label="Guardar"
            custom
            on:click={ saveCollection }
        />
    </div>
    
</div>

<style>
    .active-list {
        border: solid 1px #ccc;
        border-radius: 10px;
        padding: 10px 5px;
        max-height: 250px;
        overflow-y: auto;
    }

    .active-list > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 5px;
    }
</style>