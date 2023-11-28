<script>
    // @ts-nocheck
    import { TextField, Button } from "$lib";

    export let openModal
    export let sucursal = { }

</script>

<div class="form-company">
    <TextField 
        version=2
        required 
        type="text"
        label="Número" 
        bind:value={sucursal.numero}
    />
    
    <TextField 
        version=2
        required 
        type="text"
        label="Descripcion" 
        bind:value={sucursal.descripcion}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Dirección" 
        bind:value={sucursal.direccion}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Ciudad" 
        bind:value={sucursal.ciudad}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Comuna" 
        bind:value={sucursal.comuna}
    />

    <br>
    <br>
    <br>
    <div class="company-actions grid-col-1">
        <Button 
            label="Guardar"
        />
        <Button 
            type="outlined"
            label="Cancelar"
            color=""
            on:click={ () => openModal = false }
        />
    </div>

    <div class="grid-col-1">
        <Button 
            label="Agregar oficina"
            color="#4F5DDB"
        />
    </div>
</div>

<style>
    .form-company {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 8px;
        /* padding: 0 24px 0 16px; */
        margin-top: 30px;
    }

    .company-actions {
        display: flex;
        gap: 8px;
        grid-column: 1;
    }

    .grid-col-1 {
        grid-column: 1;
    }

</style>