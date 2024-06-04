<script>
    import { onMount } from "svelte";
    import { Button, Loading, Fab } from "$lib";
    import CardColeccion from "./cardColeccion.svelte";
    import FormColeccion from "./formColeccion.svelte";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";

    let props;
    let modalContent;
    let modalTitle = '';
    let collections = [];
    let openModal = false;
    let backButton = false;

    const getColletions = () => {
        console.log('get');
        collections = [
            {
                id: 1,
                name: 'Colección 1',
                items: 10
            },
            {
                id: 2,
                name: 'Colección 2',
                items: 20
            },
            {
                id: 3,
                name: 'Colección 3',
                items: 30
            },
            {
                id: 4,
                name: 'Colección 4',
                items: 40
            }
        ]
    }

    const editColeccion = (collection) => {
        console.log('edit')
        modalTitle = 'Editar colección';
        modalContent = FormColeccion;
        props = { collection }

        openModal = true;
    }
    
    const createColeccion = () => {
        console.log('create')
        modalTitle = 'Nueva colección';
        modalContent = FormColeccion;
        props = {
            collection: {
                name: ''
            }
        };

        openModal = true;
    }

    onMount(() => {
        getColletions()
    })

</script>

<div style="position: relative">
    <div class="header-content" style="position: sticky; top: 40px; z-index: 3; background-color: #f0f0f0; padding: 34px 0 10px">
        <div class="desktop-only">
            <Button label="Nueva colección" custom on:click={ createColeccion } />
        </div>
        <!-- <Search value="" /> -->
        <div>
        
        </div>
        <div class="mobile-only" style="position: fixed; bottom: 10px; right: 10px; z-index: 10">
            <Fab on:click={ () => createColeccion } />
        </div>
    </div>

    <div class="flex-column gap-8" style="padding: 44px 0 10px;">
       {#each collections as collection }
            <CardColeccion 
                {collection} 
                on:edit={(event) => editColeccion(event.detail) }
                on:delete={() => console.log('delete')}
            />
       {/each}
    </div>
</div>

<SheetHandler
    {props}
    {modalTitle}
    {backButton}
    {modalContent}
    bind:openModal={openModal}
/>