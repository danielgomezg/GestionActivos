<script>
    // @ts-nocheck
    import { TextField, Button } from "$lib";

    export let openModal
    let company = {
        name: '',
        rut: '',
        pais: ''
    }
    let showSucursalesBtn = false

    function validForm() {
        if (company.name == '') return false;
        if (company.rut == '') return false;
        if (company.pais == '') return false;
        
        return true
    }

    const saveCompany = () => {
        console.log('in save company')
        console.log(company)
        let isValid = validForm();
        console.log(isValid)
        if (!isValid) return

        // Peticion

        // Si la peticion es correcta 
        showSucursalesBtn = true
    }

    $: console.log(company)

</script>

<div class="form-company">
    <TextField 
        version=2
        id="name-company"
        required 
        type="text"
        label="Nombre" 
        bind:value={company.name}
    />
    
    <TextField 
        version=2
        required 
        type="text"
        label="Rut" 
        bind:value={company.rut}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="País" 
        bind:value={company.pais}
    />

    <br>
    <br>
    <br>
    <div class="company-actions grid-col-1">
        <Button 
            label="Guardar"
            on:click={ saveCompany }
        />
        <Button 
            type="outlined"
            label="Cancelar"
            color=""
            on:click={ () => openModal = false }
        />
    </div>

    {#if showSucursalesBtn}
    <div class="grid-col-1">
        <Button 
            label="Agregar Sucursales"
            color="#4F5DDB"
        />
    </div>

    {/if}
</div>

<style>
    .form-company {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 8px;
        padding: 0 24px 0 16px;
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