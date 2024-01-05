<script>
    import { Divider, IconButton } from "$lib";
    import Api from "../../../helpers/ApiCall";
    import { getContext, onMount } from "svelte";
    import { estadosActivo } from "../../stores/store";
    import { snackbar } from "../../stores/store";

    export let article = {};

    let editActivo = getContext('editActivo')
    let addActivoCount = getContext('addActivoCount');

    let activos = []

    const getActives = async () => {
        let response = (await Api.call(`http://127.0.0.1:9000/activePorArticle/${article.id}`, 'GET'))
        console.log('RESPONSE GET ACTIVES --> ', response)
        if (response.success && response.statusCode == '200') {
            activos = response.data.result
        } 
    }

    const deleteActive = async (activo) => {
        let confirmacion = confirm('Esta seguro que desea eliminar el activo ', activo.bar_code)
        if(!confirmacion) return;

        let response = (await Api.call(`http://127.0.0.1:9000/active/${activo.id}`, 'DELETE'));
        console.log('RESPONSE DELETE ACTIVE -> ', response)
        if (response.success && response.statusCode == '201') {

            activos = activos.filter(act => act.id !== activo.id);

            addActivoCount(article.id, -1)

            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Activo eliminado con éxito."
                return snk
            })

        } else {
            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Error al eliminar activo."
                return snk
            })
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
                    <IconButton icon="delete" on:click={deleteActive(activo)}/>
                </div>
            </div>
            <div>
                <li>{ `Serie: ${activo.serie}` }</li>
                <li>{ `Modelo: ${activo.model}` }</li>
                <li>{ `Responsable: ${activo.name_in_charge_active}, ${activo.rut_in_charge_active}` }</li>
                <li>{ `Estado: ${ $estadosActivo.find(ea => ea.value == activo.state).label } ${ activo.comment != '' ? `(${activo.comment })` : '' }` }</li>
                
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