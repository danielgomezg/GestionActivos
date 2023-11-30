<script>
    import { Card, IconButton, Divider } from "$lib"
    import { createEventDispatcher } from "svelte";

    export let usuario = {}
    let dispath = createEventDispatcher();

</script>

<Card>
    <div class="card-container">
        <div class="card-header">
            <div>
                <div class="card-title">{ usuario.nombre + ' ' + usuario.apellido }</div>
                <div>{ usuario.segundoNombre + ' ' + usuario.segundoApellido }</div>
            </div>
            <div>
                <IconButton icon="edit" on:click={ dispath("edit", usuario) } />
                <IconButton icon="delete" />
            </div>
        </div>
        <Divider />
        <div>
            <div>{usuario.correo }</div>
            <div>{usuario.ciudad }</div>
            <div>{usuario.comuna }</div>
        </div>
    </div>
</Card>