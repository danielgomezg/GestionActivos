<script>
    // @ts-nocheck
    import { TextField, Button, Select } from "$lib";
    import Api from "../../../helpers/ApiCall";
    import { snackbar } from "../../stores/store";


    export let company = {}
    let showSucursalesBtn = false, disabledSave = false, loading = false, message = 'Empresa agregada'
    let paises = [
        {
            label: 'Chile',
            value: 'Chile'
        },
        {
            label: 'Perú',
            value: 'Perú'
        }
    ]

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
        if (company.country == '') return false;
        
        return true
    }

    const saveCompany = async () => {
        // Validacion formulario
        let isValid = validForm();
        if (!isValid) return
        loading = true;

        // Peticion
        console.log('SAVE')
        console.log(company)    
        let body = JSON.stringify(company)  
        let response = (await Api.call('http://localhost:7000/company', 'POST', { body }))
        console.log('RESPONSE SAVE COMPANY --> ', response)
        if (response.success) {
            if (response.data.code == 201) {
                message = "Empresa agregada"
                company.name = '',
                company.rut = ''
                company.country = ''

                snackbar.update(snk => {
                    snk.open = true;
                    snk.message = "Empresa agregada"
                    return snk
                })
            }
        }
        loading = false
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

    <Select 
        label="País"
        options={paises}
        on:change={ (event) => company.country = event.detail }
    />

    <br>
    <br>
    <br>
    <div class="company-actions grid-col-1">
        <Button 
            leading
            label="Guardar"
            {loading}
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