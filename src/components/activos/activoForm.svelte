<script>
    import { getContext } from "svelte";
    import Api from "../../../helpers/ApiCall";
    import { snackbar, estadosActivo } from "../../stores/store";
    import { TextField, Button, Select, FileInput, DatePicker } from "$lib";
    import OfficeSucursalSelected from "../sucursal/officeSucursalSelected.svelte";

    export let activo = {}, article_id = 0, company_id = 0

    let addActivoCount = getContext('addActivoCount');
    let inputDate;
    let message= ''
    let office_id = 0
    let date = ''

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
        if (activo.bar_code == ''){
            message = "Falta agregar el codigo de barra del activo."
            return false;
        }
        if (activo.acquisition_date == ''){
            message = "Falta agregar la fecha de adquisición del activo."
            return false;
        }
        if (activo.accounting_record_number == ''){
            message = "Falta agregar el número de registro contable del activo."
            return false;
        }
        if (activo.name_in_charge_active == ''){
            message = "Falta agregar el nombre del responsable del activo."
            return false;
        }
        if (activo.rut_in_charge_active == ''){
            message = "Falta agregar el rut del responsable del activo."
            return false;
        }
        if (activo.serie == ''){
            message = "Falta agregar el número de serie del activo."
            return false;
        }
        if (activo.model == ''){
            message = "Falta agregar el modelo del activo."
            return false;
        }
        if (activo.state == ''){
            message = "Falta agregar el estado del activo."
            return false;
        }
        if (activo.article_id == ''){
            message = "Falta agregar el articulo al activo."
            return false;
        }
        if (activo.office_id == ''){
            message = "Falta agregar una oficina al activo."
            return false;
        }
        
        return true
    }

    const saveActivo = async () => {
        activo.article_id = parseInt(article_id)
        activo.office_id = parseInt(office_id)
        
        //console.log(activo.office_id)
        let isValid = validForm();
        if (!isValid) {
            snackbar.update(snk => {
                snk.open = true;
                snk.message = message
                return snk
            })
            return console.log(message)
        }

        let body = JSON.stringify(activo);
        console.log(body)
        let response = (await Api.call('http://127.0.0.1:9000/active', 'POST', { body }))
        console.log(response)
        if (response.success && response.statusCode == "201") {
            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Activo agregado con éxito."
                return snk
            })
            addActivoCount(article_id, 1)
            
        }else {
            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Error al agregar el activo."
                return snk
            })
        }

    }

    

    $: activo.rut_in_charge_active = formatRut(activo.rut_in_charge_active)

</script>
<div class="form">
    <TextField 
        version=2
        required 
        type="text"
        label="Código de barra" 
        bind:value={activo.bar_code}
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

    <DatePicker 
        bind:value={activo.acquisition_date}
        label="Fecha de adquisición" 
    />

    <!-- <div style="position: relative">
        <input bind:value={activo.acquisition_date} type="date" class="custom-date" >

        <TextField 
            version=2
            required 
            type="text"
            trailing="calendar_month"
            label="Fecha de adquisición" 
            bind:value={activo.acquisition_date}
            on:click={ showDatePicker }
            on:focus={ showDatePicker }
        />
    </div> -->

    <Select 
        label="Estado"
        selected = {activo.state}
        options={$estadosActivo}
        on:change={ (event) => activo.state = event.detail }
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
        bind:value={activo.name_in_charge_active}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Rut del encargado" 
        bind:value={activo.rut_in_charge_active}
    />

    <OfficeSucursalSelected companyId={company_id} bind:selectedOffice={office_id} />

    <TextField 
        version=2
        required 
        type="text"
        label="N° registro contable" 
        bind:value={activo.accounting_record_number}
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
        on:click={ saveActivo }
    />

</div>

