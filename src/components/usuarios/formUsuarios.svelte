<script>
    // @ts-nocheck
    import { TextField, Button } from "$lib";
    
    export let usuario = {}
    let disabledSave = false

    function formatRut(code) {
        if (code == undefined) return ''
        if (code.length >= 13) return code.slice(0, -1);
        
        let rut = code.replace(/[^\dkK]/g, '')

        if (rut.length > 1) {
            rut = rut.slice(0, -1) + '-' + rut.charAt(rut.length - 1);
        }

        if (rut.length > 5) {
            rut = rut.slice(0, -5) + '.' + rut.slice(-5);
        }

        if (rut.length > 9) {
            rut = rut.slice(0, -9) + '.' + rut.slice(-9);
        }

        return rut
        
        // return code
    }

    const saveUser = () => {

    }

    $: usuario.rut = formatRut(usuario.rut)

</script>

<div class="form">

    <TextField 
        version=2
        id="name-company"
        required 
        type="text"
        label="Nombre" 
        bind:value={usuario.nombre}
    />

    <TextField 
        version=2
        id="name-company"
        required 
        type="text"
        label="Segundo nombre" 
        bind:value={usuario.segundoNombre}
    />
    
    <TextField 
        version=2
        required 
        type="text"
        label="Apellido" 
        bind:value={usuario.apellido}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Segundo apellido" 
        bind:value={usuario.segundoApellido}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Correo" 
        bind:value={usuario.correo}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Rut" 
        bind:value={usuario.rut}
    />

    <br>
    <br>
    <br>
    <div class="grid-col-span-1">
        <Button 
            trailing
            disabled={disabledSave}
            icon="save"
            label="Guardar"
            on:click={ saveUser }
        />
        <!-- <Button 
            type="outlined"
            label="Cancelar"
            color=""
            on:click={ () => openModal = false }
        /> -->
    </div>


</div>