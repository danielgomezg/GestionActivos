<script>
    import Api from "../../../helpers/ApiCall";
    import { onMount, getContext } from "svelte";
    import { snackbar } from "../../stores/store";
    import { Divider, IconButton, Snackbar } from "$lib";

    export let company = {};
    export let company_id = 0; 
    export let endSroll = false;

    let limit = 7;
    let offset = 0;
    let count = -1;
    let stores = [];
    let storeToDelete = {};
    let openSnackbar = false;
    let messageSnackbar = '';

    let editStore = getContext('editStore');
    let addSucursalCount = getContext('addSucursalCount');

    const getSucursalePorCompany = async () => {
        if (count != -1 && offset > count) return

        let response = (await Api.call(`http://127.0.0.1:9000/sucursalPorCompany/${company_id}?limit=${limit}&offset=${offset}`, 'GET'))
        console.log('RESPONSE GET Sucursales --> ', response)
        if (response.success && response.statusCode == '200') {
            count = response.data.count
            if (response.data.count > 0) {
                stores = [...stores, ...response.data.result] 
                return
            }
            // stores = response.data.result 
        } 
    }

    const deleteStore = async (store) => {
        
        let response = (await Api.call(`http://127.0.0.1:9000/sucursal/${store.id}`, 'DELETE'));
        console.log('RESPONSE DELETE SUCURSAL -> ', response)
        if (response.success && response.statusCode == '201') {

            stores = stores.filter(st => store.id !== st.id);

            addSucursalCount(company.id, -1)

            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Sucursal eliminada con éxito."
                return snk
            })

        } else {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Error al eliminar sucursal."
                return snk
            })
        }

    }

    const updateOffset = (end) => {
        if (!end) return
        offset += limit;
    }

    onMount(async () => {
        await getSucursalePorCompany()  
    })

    $: updateOffset(endSroll);
    $: if(offset != 0) getSucursalePorCompany();

</script>

<Snackbar 
    bind:open={ openSnackbar }
    type="confirm"
    message={messageSnackbar}
    on:confirm={ deleteStore(storeToDelete) }
/>

<div class="store-info__container">
    {#each stores as store}
        <div>
            <div class="store-info__title">
                <div>    
                    <strong>{ store.number }</strong>
                    { ` (${store.count_offices} oficinas)` }
                </div>
                <div>
                    <IconButton icon="edit" tooltipId="btn-edit__{store.number}" tooltipText="Editar" on:click={ editStore(store, company) } />
                    <IconButton 
                        icon="delete" 
                        tooltipId="btn-delete__{store.number}" 
                        tooltipText="Eliminar" 
                        on:click={ () => {
                            storeToDelete = store;
                            messageSnackbar = '¿Eliminar la sucursal ' + store.number + '?'
                            openSnackbar = true;
                        } }
                    />
                </div>

            </div>
            <div class="store-info__offices">
                <!-- { `${store.totalOfices} oficinas` } -->
            </div>
            <div class="store-info__address">
                { `${store.address}.` }
                <!-- Condicion para mostrar la region, ciudad y comuna cuando company es chile -->
                {#if company.country == 'Chile'}
                    <!-- Condicion si city es null -->
                    {#if store.city}
                        <strong>{ `${store.commune}, ${store.city}. ${store.region}` }</strong>
                    {:else}
                        <strong>{ `${store.commune}. ${store.region}` }</strong>
                    {/if}
                {:else}
                    <strong>{ `${store.commune}, ${store.region}` }</strong>
                {/if}
            </div>
            <div class="store-info__description">
                {store.description}
            </div>
            <!-- <div class="store-actions">
                <IconButton icon="edit" />
            </div> -->
        </div>
        <Divider />
    {:else}
        <p>La empresa no cuenta con sucursales.</p>
    {/each}
</div>

<style>
    .store-info__title {
        font-size: 16px;
        /* font-weight: bold;     */
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .store-info__description {
        font-size: 14px;
        font-weight: lighter;
    }
</style>