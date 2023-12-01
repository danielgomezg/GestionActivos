<script>
    // @ts-nocheck
    import { TextField, Button } from "$lib";
    import { empresas } from "../../stores/store";

    export let company = {}
    // let company = {
    //     name: '',
    //     rut: '',
    //     pais: ''
    // }
    let showSucursalesBtn = false, disabledSave = false

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

    function validForm() {
        if (company.name == '') return false;
        if (company.rut == '') return false;
        if (company.pais == '') return false;
        
        return true
    }

    const saveCompany = () => {
        // Validacion formulario
        let isValid = validForm();
        if (!isValid) return
        
        // Peticion
        disabledSave =  true;
        setTimeout(() => {
            empresas.update(data => {
                data.push(company);
                return data;
            })
            disabledSave = false
            // Si la peticion es correcta 
            showSucursalesBtn = true
        }, 2000)

    }

    $: company.rut = formatRut(company.rut)
    
</script>

<div class="form">
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
            trailing
            disabled={disabledSave}
            icon="save"
            label="Guardar"
            on:click={ saveCompany }
        />
        <!-- <Button 
            type="outlined"
            label="Cancelar"
            color=""
            on:click={ () => openModal = false }
        /> -->
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
    .company-actions {
        display: flex;
        gap: 8px;
        grid-column: 1;
    }

    .grid-col-1 {
        grid-column: 1;
    }

</style>