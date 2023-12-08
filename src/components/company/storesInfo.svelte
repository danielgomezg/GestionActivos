<script>
    import { setContext } from 'svelte';
    // @ts-ignore
    import { Divider, IconButton } from "$lib";
    import { onMount, getContext } from "svelte";
    import Api from "../../../helpers/ApiCall";

    let editStore = getContext('editStore');
    export let company_id = 0
    let stores = []
    
    function getTokenFromLocalStorage() {
        return localStorage.getItem('accessToken');
    }

    let token = getTokenFromLocalStorage()


    const getSucursalePorCompany = async () => {
        //loading = true;
        let response = (await Api.call(`http://127.0.0.1:9000/sucursalPorCompany/${company_id}`, 'GET', {}, token))
        console.log('RESPONSE GET Sucursales --> ', response)
        if (response.success) {
            stores = response.data.result 
        } 
        //loading = false;
    }

    onMount(async () => {

        await getSucursalePorCompany()
        console.log(stores)
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
                    <IconButton icon="edit" on:click={ editStore(store) } />
                    <IconButton icon="delete" />
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

    .store-info__offices {

    }

    .store-info__address {
        
    }

    .store-info__description {
        font-size: 14px;
        font-weight: lighter;
    }
</style>