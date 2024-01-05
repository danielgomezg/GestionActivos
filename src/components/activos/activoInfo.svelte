<script>
    import { getContext, onMount } from "svelte";
    import { Divider, IconButton } from "$lib";
    import Api from "../../../helpers/ApiCall";

    export let article = {};

    let editActivo = getContext('editActivo')

    let activos = []


    const getActives = async () => {
        let response = (await Api.call('http://127.0.0.1:9000/actives', 'GET'))
        console.log('RESPONSE GET ACTIVES --> ', response)
        if (response.success) {
            activos = response.data.result
        } 
    }

    onMount(async () => {
        getActives()
    })

</script>
<div>
    {#each activos as activo}
        <div>
            <div class="info__title">
                <div>    
                    <strong>{ activo.bar_code }</strong>
                    <h5>{ `Adquirido el ${activo.acquisition_date} - Agregado el ${activo.creation_date}` }  </h5>
                </div>
                <div>
                    <IconButton icon="edit" on:click={ () => editActivo(activo, article) } />
                    <IconButton icon="delete" />
                </div>
            </div>
            <div>
                <li>{ `Serie: ${activo.serie}` }</li>
                <li>{ `Modelo: ${activo.model}` }</li>
                <li>{ `Responsable: ${activo.name_in_charge_active}, ${activo.rut_in_charge_active}` }</li>
                
            </div>
            <!-- <div class="info__description">
                {activo.description}
            </div> -->
        </div>  
        <Divider />  
    {:else}
        <p>El articulo no cuenta con activos.</p>
    {/each}

</div>

<style>
    .info__title {
        font-size: 16px;
        /* font-weight: bold;     */
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .info__description {
        font-size: 14px;
        font-weight: lighter;
    }

</style>