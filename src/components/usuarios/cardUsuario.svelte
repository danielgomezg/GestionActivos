<script>
    import { Card, IconButton, Divider, Menu, Search } from "$lib"
    import { createEventDispatcher } from "svelte";
    import { snackbar } from "../../stores/store";
    import { getContext } from "svelte";
    import Api from "../../../helpers/ApiCall";

    export let usuario = {}

    //Contexto para actualizar users
    let openActions = false;
    let removeUsuario = getContext('removeUsuario');

    let dispath = createEventDispatcher();

    const deleteUsuario = async () => {

        let confirmacion = confirm(`Esta seguro que desea eliminar el usuario ${usuario.firstName} ${usuario.lastName}`)
        if (!confirmacion) return;

        //loading = true;
        let response = (await Api.call(`http://127.0.0.1:9000/user/${usuario.id}`, 'DELETE'))
        console.log('RESPONSE DELETE USER --> ', response)
        if (response.success) {
            console.log(response.data.message)

            //Actualizar lista de users
            removeUsuario(usuario.id)

            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Usuario eliminado con éxito."
                return snk
            })
        } else{
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Error al eliminar usuario."
                return snk
            })
        }
        //loading = false;
    }

</script>

<Card>
    <div class="card-container">
        <div class="card-header">
            <div>
                <div class="card-title">{ usuario.firstName + ' ' + usuario.lastName }</div>
                <div>{ usuario.secondName + ' ' + usuario.secondLastName }</div>
            </div>
            <div class="desktop-only">
                <IconButton icon="edit" tooltipId="btn-edit__{usuario.rut}" tooltipText="Editar" on:click={ dispath("edit", usuario) } />
                <IconButton icon="delete" tooltipId="btn-delete__{usuario.rut}" tooltipText="Eliminar" on:click={ deleteUsuario }/>
            </div>
            <div class="mobile-only">
                <!-- <IconButton icon="more_vert" /> -->
                <Menu
                    bind:open={openActions}
                    options={
                        [
                            { label: "Editar", dispatch: "edit"},
                            { label: "Eliminar", dispatch: "delete" }
                        ]  
                    }
                    on:edit={() => dispath("edit", usuario) }
                    on:delete={() => deleteUsuario }
                >
                  <IconButton icon="more_vert" on:click={() => openActions = !openActions } />
                </Menu>
            </div>
        </div>
        <Divider />
        <div>
            <div>{usuario.email }</div>
            <div>{usuario.rut }</div>
        </div>
    </div>
</Card>