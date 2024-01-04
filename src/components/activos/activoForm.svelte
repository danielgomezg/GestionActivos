<script>
    import { TextField, Button, Select, FileInput } from "$lib";

    export let activo = {}
    let inputDate;
    let estadosActivo = [
        {
            label: 'Reparación',
            value: 'repare'
        },
        {
            label: 'Nuevo',
            value: 'new'
        },
        {
            label: 'Operativo',
            value: 'operativo'
        },
        {
            label: 'Perdida o Robo',
            value: 'lost'
        },
        {
            label: 'Dañado',
            value: 'damage'
        },
        {
            label: 'Obsoleto',
            value: 'deprecated'
        },
        {
            label: 'Otro',
            value: 'other'
        }
    ]
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

    <Select 
        label="Estado"
        options={estadosActivo}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Comentario" 
        bind:value={activo.comment}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Nombre del encargado" 
        bind:value={activo.name_in_charge}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Rut del encargado" 
        bind:value={activo.rut_in_charge}
    />

    <Select 
        label="Sucursal"
        options={ [] }
    />

    <Select 
        label="Oficina"
        options={[]}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="N° registro contable" 
        bind:value={activo.numRegister}
    />

    <FileInput 
        label="Documento contable" 
        required 
        accept={ ['pdf', 'png', 'jpg'] }
        trailing="upload_file"
        helperText="Documento con formato pdf, png o jpg"
    />

    <Button 
        label="Guardar"
        on:click={ () => saveActivo }
    />

</div>