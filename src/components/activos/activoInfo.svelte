<script>
    import Api from "../../../helpers/ApiCall";
    import { getContext, onMount } from "svelte";
    import { snackbar } from "../../stores/store";
    import { estadosActivo } from "../../stores/store";
    import { Divider, IconButton, Snackbar } from "$lib";

    export let article = {};
    export let company_id = 0;
    export let endSroll = false;

    let limit = 7;
    let offset = 0;
    let count = -1;
    let activos = [];
    let activeDocument;
    let activoToDelete = {};
    let openSnackbar = false;
    let messageSnackbar = '';

    let editActivo = getContext('editActivo')
    let addActivoCount = getContext('addActivoCount');

    const getActives = async () => {
        if (count != -1 && offset > count) return

        let response = (await Api.call(`http://127.0.0.1:9000/activePorArticle/${article.id}?limit=${limit}&offset=${offset}`, 'GET'))
        console.log('RESPONSE GET ACTIVES --> ', response)
        if (response.success && response.statusCode == '200') {
            count = response.data.count
            if (response.data.count > 0) {
                activos = [...activos, ...response.data.result] 
                return
            }
            // activos = response.data.result
        } 
    }

    const deleteActive = async (activo) => {

        let response = (await Api.call(`http://127.0.0.1:9000/active/${activo.id}`, 'DELETE'));
        console.log('RESPONSE DELETE ACTIVE -> ', response)
        if (response.success && response.statusCode == '201') {

            activos = activos.filter(act => act.id !== activo.id);

            addActivoCount(article.id, -1)

            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Activo eliminado con éxito."
                return snk
            })

        } else {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Error al eliminar activo."
                return snk
            })
        }
    }

    const downloadDocument = async (activo) => {
        console.log(activo)

        fetch(`http://127.0.0.1:9000/file_active/${activo.accounting_document}`)
            .then(response => response.blob())
            .then(document => {
                let objectURL = URL.createObjectURL(document);
                activeDocument = objectURL;
                window.open(objectURL)

            })
            .catch(error => console.error(error));
    }

    const updateOffset = (end) => {
        if (!end) return
        offset += limit;
    }

    onMount(async () => {
        await getActives()
    })

    $: updateOffset(endSroll);
    $: if(offset != 0) getActives();

</script>

<Snackbar 
    bind:open={ openSnackbar }
    type="confirm"
    message={ messageSnackbar }
    on:confirm={ deleteActive(activoToDelete) }
/>

<div>
    {#each activos as activo}
        <div>
            <div class="info__title">
                <div>    
                    <div class="flex-row align-center gap-8">
                        <span class="material-symbols-rounded">barcode</span>
                        <strong>{ activo.bar_code }</strong>
                    </div>
                    <h5>{ `Adquirido el ${activo.acquisition_date} - Agregado el ${activo.creation_date}` }  </h5>
                </div>
                <div>
                    {#if activo.accounting_document}
                        <IconButton icon="description" tooltipId="btn-doc__{activo.bar_code}" tooltipText="Documento contable" on:click={ () => downloadDocument(activo) } />
                    {/if}
                    <IconButton icon="edit" tooltipId="btn-edit__{activo.bar_code}" tooltipText="Editar" on:click={ () => editActivo(activo, article, company_id) } />
                    <IconButton 
                        icon="delete" 
                        tooltipId="btn-delete__{activo.bar_code}" 
                        tooltipText="Eliminar" 
                        on:click={ () => {

                            activoToDelete = activo;
                            messageSnackbar = '¿Eliminar el activo ' + activo.bar_code + '?'
                            openSnackbar = true;

                        } } />
                </div>
            </div>
            <div>
                <li>{ `Serie: ${activo.serie}` }</li>
                <li>{ `Modelo: ${activo.model}` }</li>
                <li>{ `Responsable: ${activo.name_in_charge_active}, ${activo.rut_in_charge_active}` }</li>
                <li>{ `Estado: ${ activo.state } ${ activo.comment != '' ? `(${activo.comment })` : '' }` }</li>
                
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