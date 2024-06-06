<script>
    import Api from "../../../helpers/ApiCall";
    import { createEventDispatcher, getContext } from "svelte";
    import { Card, Menu, IconButton, Snackbar } from "$lib";
    import { snackbar, user, companySelect } from "../../stores/store";

    export let collection = {}

    let openActions = false;
    let messageSnackbar = '';
    let openSnackbar = false; 
    let dispatch = createEventDispatcher();
    let removeCollection = getContext('deleteCollection');

    const deleteCollection = async () => {

        let response = await Api.call(`/activesGroup/${collection.id}`, 'DELETE', {}, 'json', $companySelect);
        console.log('RESPONSE DELETE COLECCION -> ', response)
        if (response.success && response.statusCode == '201') {
            removeCollection(collection.id)

            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Colección eliminado."
                return snk
            })

        } else {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Error al eliminar."
                return snk
            })
        }
    }


</script>

<Snackbar 
    bind:open={ openSnackbar }
    type="confirm"
    message={messageSnackbar}
    on:confirm={ deleteCollection }
/>

<Card>
    <div class="card-container">
        <div class="card-header">
            <div style="display: flex; align-items: center; gap: 10px">
                <div class="card-title">{ collection.name }</div>
            
            </div>
            <div>
                <div class="mobile-only">
                    <Menu
                        bind:open={openActions}
                        options={
                            [
                                // { label: "Historial", dispatch: "history"},
                                { label: "Editar", dispatch: "edit"},
                                { label: "Eliminar", dispatch: "delete" }
                            ]  
                        }
                        on:edit={() => dispatch("edit", { ...collection }) }
                        on:delete={() => {
                            messageSnackbar = '¿Eliminar la colección ' + collection.name + '?'
                            openSnackbar = true;
                        }}
                    >
                      <IconButton icon="more_vert" on:click={() => openActions = !openActions } />
                    </Menu>
                </div>
                <div class="desktop-only">    
                    <IconButton icon="edit" tooltipId="btn-edit__{collection.name}" tooltipText="Editar" on:click={ dispatch("edit", { ...collection }) } />
                    {#if $user.profile_id != 2}
                        <IconButton 
                            icon="delete" 
                            tooltipId="btn-delete__{collection.name}" 
                            tooltipText="Eliminar" 
                            on:click={ () => {
                                messageSnackbar = '¿Eliminar la colección ' + collection.name + '?'
                                openSnackbar = true;
                            } } 
                        />

                    {/if}
                </div>
            </div>
            
        </div>   
        <div class="card-content">
            <div class="responsive-table">
                <table>
                    <tr>
                        <td>Activos: </td>
                        <td>{ collection.actives_count || 0 }</td>
                    </tr>
                    <tr>
                        <td>Creado el: </td>
                        <td>{ collection.creation_date.split("-").reverse().join("-") }</td>
                    </tr>
                </table>
            </div>
        </div> 
    </div>
</Card>