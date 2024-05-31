<script>
    import { Card, Menu, IconButton } from "$lib";
    import { createEventDispatcher } from "svelte";

    export let collection = {}

    let dispatch = createEventDispatcher();
    let openActions = false;
    let messageSnackbar = '';
    let openSnackbar = false;


</script>

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
                            messageSnackbar = '¿Eliminar la empresa ' + collection.name + '?'
                            openSnackbar = true;
                        }}
                    >
                      <IconButton icon="more_vert" on:click={() => openActions = !openActions } />
                    </Menu>
                </div>
                <div class="desktop-only">    
                    <IconButton icon="edit" tooltipId="btn-edit__{collection.name}" tooltipText="Editar" on:click={ dispatch("edit", { ...collection }) } />
                    <IconButton icon="delete" tooltipId="btn-delete__{collection.name}" tooltipText="Eliminar" on:click={ dispatch("delete", collection) } />
                </div>
            </div>
            
        </div>   
        <div class="card-content">
            <div class="responsive-table">
                <table>
                    <tr>
                        <td>Activos: </td>
                        <td>{ collection.items }</td>
                    </tr>
                </table>
            </div>
        </div> 
    </div>
</Card>