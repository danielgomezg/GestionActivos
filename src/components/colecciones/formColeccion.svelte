<script>
    import { onMount } from "svelte";
    import ActivoSearchCode from "../activos/activoSearchCode.svelte";
    import { TextField, Button, FileInput, TextArea, IconButton } from "$lib";

    export let collection = {};
    
    let searchActives;
    let activesAdded = [];
    let activesColeccion = [];

    const saveCollection = () => {
        // Guardar coleccion
    }

    const removeActive = (active) => {
        
    }

    const getActivesColeccion = () => {
        // Obtener activos de la coleccion.
        activesColeccion = [
            {
                id: 1,
                barcode: '11111111',
                virtualcode: ''
            },
            {
                id: 2,
                barcode: '',
                virtualcode: '22222222'
            },
            {
                id: 3,
                barcode: '33333333',
                virtualcode: ''
            },
            {
                id: 4,
                barcode: '',
                virtualcode: '44444444'
            }
        ]
    }

    onMount(() => {
        // Obtener activos de la coleccion.
        getActivesColeccion();
    })

</script>
<div class="form">

    <TextField 
        version=2
        id="name-collection"
        required 
        type="text"
        label="Nombre" 
        bind:value={ collection.name }
    />

    <ActivoSearchCode 
        bind:this={searchActives}
        hideActives={ activesColeccion.map(a => a.id)}
        on:addActive={(e) => {
            activesAdded = [...activesAdded, e.detail]
        }}
    />

    <div>
        <p style="margin: 5px 0;"><strong>Activos</strong></p>
        <div class="active-list">
            {#each activesColeccion as active }
                <div>
                    <span>{ active.barcode || active.virtualcode }</span>
                    <IconButton 
                        icon="remove" 
                        on:click={ () => {
                            activesColeccion = activesColeccion.filter(a => a.id !== active.id)
                            // searchActives.requeueActive(active)
                        } } 
                    />
                </div>
            {/each}
            {#each activesAdded as active }
                <div>
                    <span>{ active.barcode || active.virtualcode }</span>
                    <IconButton 
                        icon="remove" 
                        on:click={ () => {
                            activesAdded = activesAdded.filter(a => a.id !== active.id)
                            searchActives.requeueActive(active)
                        } } 
                    />
                </div>
            {/each}
        </div>
    </div>

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
    }

    .active-list > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 5px;
    }
</style>