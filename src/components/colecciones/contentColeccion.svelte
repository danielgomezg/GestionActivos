<script>
    import { onDestroy, onMount, setContext } from "svelte";
    import { Button, Fab } from "$lib";
    import Api from "../../../helpers/ApiCall";
    import CardColeccion from "./cardColeccion.svelte";
    import FormColeccion from "./formColeccion.svelte";
    import { companySelect } from "../../stores/store";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";
  
    let props;
    let count = 0;
    let limit = 7;
    let offset = 0;
    let modalContent;
    let modalTitle = '';
    let collections = [];
    let openModal = false;
    let backButton = false;

    setContext('addCollection', (collection) => {
        collections = [collection, ...collections]
    });

    setContext('editCollection', (collection) => {
        let index = collections.findIndex(c => c.id == collection.id);
        collections[index] = collection;
        collections = [...collections]
    });

    setContext('deleteCollection', (id) => {
        collections = collections.filter(c => c.id != id)
    });

    const getColletions = async () => {
        if ($companySelect == 0) return
        // Obtener colecciones
        let response = await Api.call(`/activesGroups?limit=${limit}&offset=${offset}`, 'GET', {}, 'json', $companySelect);
        console.log('RESPONSE GET COLLECCION --> ', response)
        if (response.success && response.statusCode == "200") {
            collections = [...collections, ...response.data.result] 
            count = response.data.count
        } 
    }

    const editColeccion = (collection) => {
        console.log('edit')
        modalTitle = 'Editar colección';
        modalContent = FormColeccion;
        props = { collection, edit: true }

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

    const handleScroll = () => {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
            offset = offset + limit;
            getColletions()
        }
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll)
    })

    onDestroy(() => {
        window.removeEventListener('scroll', handleScroll)
    })

    $: getColletions($companySelect)

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