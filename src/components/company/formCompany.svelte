<script>
    import Api from "../../../helpers/ApiCall";
    import { snackbar } from "../../stores/store";
    import { getContext } from "svelte";
    import { TextField, Button, Select } from "$lib";
    
    export let company = {}, isEdit = false;
    let showSucursalesBtn = false, loading = false, message = 'Empresa agregada';
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
    let addCompany = getContext('addCompany');

    function formatRut(code) {
        if (code == undefined) return ''
        if (company.country != 'Chile') return code.replace(/[.-]/g, '');
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
        
    }

    function validForm() {
        if (company.name == ''){
            message = "Falta agregar el nombre a la empresa."
            return false;
        } 
        if (company.rut == ''){
            message = "Falta agregar un rut a la empresa."
            return false
        }
        if (company.country == ''){
            message = "Falta agregar el país a la empresa."
            return false
        }
        
        return true
    }

    const editCompany = async () => {
        console.log('edit company')
        console.log(company)
    }

    const saveCompany = async () => {
        // Validacion formulario
        let isValid = validForm();
        if (!isValid) {
            snackbar.update(snk => {
                snk.open = true;
                snk.message = message
                return snk
            })
            return console.log(message)
        }
        loading = true;

        // Peticion
        let body = JSON.stringify(company)  
        let response = (await Api.call('http://127.0.0.1:9000/company', 'POST', { body }))
        console.log('RESPONSE SAVE COMPANY --> ', response)
        if (response.success) {
            if (response.data.code == 201) {
                company.name = '',
                company.rut = ''
                company.country = ''

                snackbar.update(snk => {
                    snk.open = true;
                    snk.message = "Empresa creada con éxito."
                    return snk
                })

                addCompany(response.data.result)

            }else{
                //aviso
                snackbar.update(snk => {
                    snk.open = true;
                    snk.message = "Error al crear empresa."
                    return snk
                })
            }
        }else{
            //aviso
            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Error al crear empresa."
                return snk
            })
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

    <Select 
        label="País"
        options={paises}
        selected={company.country}
        on:change={ (event) => company.country = event.detail }
    />

    <TextField 
        version=2
        required 
        type="text"
        label={ company.country == 'Chile'? 'RUT': 'DNI' } 
        bind:value={company.rut}
    />

    <br>
    <br>
    <br>
    <div class="company-actions grid-col-1">
        {#if !isEdit}
            <Button 
                leading
                label="Guardar"
                {loading}
                on:click={ saveCompany }
            />
        {:else}

            <Button 
                leading
                label="Guardar"
                {loading}
                on:click={ editCompany }
            />

        {/if}
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