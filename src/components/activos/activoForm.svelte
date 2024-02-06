<script>
    import Api from "../../../helpers/ApiCall";
    import { snackbar, estadosActivo } from "../../stores/store";
    import ArticleSelect from "../articles/articleSelect.svelte";
    import { createEventDispatcher, getContext, onDestroy, onMount } from "svelte";
    import { TextField, Button, Select, FileInput, DatePicker } from "$lib";
    import OfficeSucursalSelected from "../sucursal/officeSucursalSelected.svelte";

    export let activo = {};
    export let article_id = 0;
    export let company_id = 0;
    export let isEdit = false;
    export let showArticles = false;

    let accionBtn;
    let message= '';
    let office_id = 0;
    let document = null;
    let selectedOffice = 0;
    let selectedSucursal = 0;
    let locationsActivesNew = {
        stores: [],
        offices: []
    };

    let dispatch = createEventDispatcher();
    let addActivoCount = getContext('addActivoCount');
    let reloadActivo = getContext('reloadActivo');
    let newActivo = getContext('newActivo');
    
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

    // FUNCION QUE SUBE LA IMAGEN AL SERVIDOR
    const uploadDocument = async (image) => {
        if (image == null) return null;

        let formData = new FormData();
        formData.append('file', image);
        let response = await Api.call('http://127.0.0.1:9000/file_active', 'POST', { body: formData }, 'file');
        console.log(response)
        if (response.success && response.statusCode == "201") {
            return response.data.result;
        }
        else {
            return null;
        }
    }

    const saveActivo = async () => {
        activo.article_id = parseInt(article_id)
        activo.office_id = parseInt(office_id)
        
        //console.log(activo.office_id)
        let isValid = validForm();
        if (!isValid) {
            snackbar.update(snk => {
                snk.type = 'dismiss'
                snk.open = true;
                snk.message = message
                return snk
            })
            return console.log(message)
        }

        let documentUrl = await uploadDocument(document)
        activo.accounting_document = documentUrl == null ? '' : documentUrl;

        let body = JSON.stringify(activo);
        console.log(body)
        let response = (await Api.call('http://127.0.0.1:9000/active', 'POST', { body }))
        console.log(response)
        if (response.success && response.statusCode == "201") {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Activo agregado con éxito."
                return snk
            })

            if (!showArticles) addActivoCount(article_id, 1);

            activo = {
                bar_code: '',
                serie: '',
                model: '',
                comment: '',
                acquisition_date: '',
                accounting_document: '',
                accounting_record_number: '',
                name_in_charge_active: '',
                rut_in_charge_active: '',
                state: '',
                article_id: '',
                office_id: ''
            };
            article_id = 0;

            locationsActivesNew.offices.push(selectedOffice);
            locationsActivesNew.stores.push(selectedSucursal);
            
        }else {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Error al agregar el activo."
                return snk
            })
        }

    }

    const editActivo = async () => {
        console.log('edit active')
        activo.office_id = parseInt(office_id)

        let isValid = validForm();
        if (!isValid) {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = message
                return snk
            })
            return console.log(message)
        }

        let documentUrl = await uploadDocument(document)
        activo.accounting_document = documentUrl == null ? '' : documentUrl;

        // Peticion
        delete activo.office
        let body = JSON.stringify(activo)  
        console.log('BODY EDIT ACTIVE --> ', body)  
        let response = (await Api.call(`http://127.0.0.1:9000/active/${activo.id}`, 'PUT', { body }))
        console.log('RESPONSE EDIT ACTIVE--> ', response)
        if (response.success && response.statusCode == "201") {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Activo editado con éxito."
                return snk
            })

            //replaceArticle(response.data.result)
            // dispatch('reloadActivo')
            reloadActivo();
        }
        else {
            //aviso
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Error al editar activo."
                return snk
            })
        }
    }


    onMount(async () => {
        if(isEdit){
            office_id = activo.office_id
            accionBtn = editActivo
        }else{
            accionBtn = saveActivo
        }
    })

    onDestroy(() => {
        newActivo(locationsActivesNew)
    })
    

    $: activo.rut_in_charge_active = formatRut(activo.rut_in_charge_active)


</script>
<div class="form">

    <OfficeSucursalSelected 
        keep 
        isEdit={isEdit} 
        companyId={company_id} 
        bind:selectedOffice={office_id}
        on:changeOffice={e => selectedOffice = e.detail.selectedOffice}
        on:changeSucursal={e => selectedSucursal = e.detail.selectedSucursal}
    />

    {#if showArticles}
        <ArticleSelect 
            companyId={company_id} 
            selected={article_id}
            on:change={e => article_id = e.detail}
        />
    {/if}

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

    <Select 
        label="Estado"
        selected = {activo.state}
        options={$estadosActivo}
        on:change={ (event) => activo.state = event.detail }
    />

    <TextField 
        version=2 
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
        on:change={ (e) => document = e.detail }
    />

    {#if showArticles}
        <div></div>
    {/if}

    <div class="mobile-fixed">
        <Button 
            custom
            label="Guardar"
            on:click={ accionBtn }
        />
    </div>

</div>

