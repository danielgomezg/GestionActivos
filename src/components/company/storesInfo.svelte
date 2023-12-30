<script>
    import { Divider, IconButton } from "$lib";
    import Api from "../../../helpers/ApiCall";
    import { onMount, getContext } from "svelte";
    import { snackbar } from "../../stores/store";

    let editStore = getContext('editStore');
    
    export let company_id = 0, company = {}
    let stores = []

    const getSucursalePorCompany = async () => {
        //loading = true;
        let response = (await Api.call(`http://127.0.0.1:9000/sucursalPorCompany/${company_id}`, 'GET'))
        console.log('RESPONSE GET Sucursales --> ', response)
        if (response.success) {
            stores = response.data.result 
        } 
        //loading = false;
    }

    const deleteStore = async (store) => {

        let confirmacion = confirm('Esta seguro que desea eliminar la sucursal ', store.number)

        if (!confirmacion) return;
        
        let response = (await Api.call(`http://127.0.0.1:9000/sucursal/${store.id}`, 'DELETE'));
        console.log('RESPONSE DELETE SUCURSAL -> ', response)
        if (response.success && response.statusCode == '201') {

            stores = stores.filter(st => store.id !== st.id);

            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Sucursal eliminada con éxito."
                return snk
            })

        } else {
            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Error al eliminar sucursal."
                return snk
            })
        }

    }

    onMount(async () => {

        await getSucursalePorCompany()
        
    })
  
</script>

<div class="store-info__container">
    {#each stores as store}
        <div>
            <div class="store-info__title">
                <div>    
                    <strong>{ store.number }</strong>
                    { ` (${store.count_offices} oficinas)` }
                </div>
                <div>
                    <IconButton icon="edit" on:click={ editStore(store, company) } />
                    <IconButton icon="delete" on:click={ deleteStore(store) } />
                </div>

            </div>
            <div class="store-info__offices">
                <!-- { `${store.totalOfices} oficinas` } -->
            </div>
            <div class="store-info__address">
                { `${store.address}.` }
                <strong>{ `${store.commune}, ${store.region}` }</strong>
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