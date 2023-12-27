<script>
    import { TextField, Button, DatePicker } from "$lib";

    export let activo = {}
    let inputDate;

    const saveActivo = () => {

    }

</script>
<div class="form">
    <TextField 
        version=2
        required 
        type="text"
        label="Código de barra" 
        bind:value={activo.barcode}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="N° de serie" 
        bind:value={activo.serie}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Modelo" 
        bind:value={activo.model}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Descripción" 
        bind:value={activo.description}
    />

    <input bind:this={ inputDate } type="date" readonly style="display: none;">

    <TextField 
        version=2
        required 
        type="text"
        trailing="calendar_month"
        label="Fecha de adquisición" 
        on:click={ () => inputDate.focus() }
        bind:value={activo.purchase}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="N° registro contable" 
        bind:value={activo.numRegister}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Nombre del encargado" 
        bind:value={activo.nameInCharge}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Rut del encargado" 
        bind:value={activo.rutInCharge}
    />

    <Button 
        label="Guardar"
        on:click={ () => saveActivo }
    />

</div>