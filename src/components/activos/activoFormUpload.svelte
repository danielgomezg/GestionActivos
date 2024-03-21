<script>
    import Api from "../../../helpers/ApiCall";
    import { snackbar } from "../../stores/store";
    import OfficeSucursalSelected from "../sucursal/officeSucursalSelected.svelte";
    import { TextField, Button, Select, FileInput, DatePicker, Snackbar } from "$lib";

    export let company_id = 0;

    let document;
    let fileComponent;
    let selectedOffice = 0;
    let selectedSucursal = 0;

    // FUNCION QUE SUBE LA IMAGEN AL SERVIDOR
    const upload = async () => {
        let msg = '';
        if (document == null) {
            msg = 'Debe agregar un archivo';
        }
        else if (selectedOffice == 0) {
            msg = 'Debe seleccionar una oficina';
        }
        else if (selectedSucursal == 0) {
            msg = 'Debe seleccionar una sucursal';
        }
        if (msg != '') {
            snackbar.update(snk => {
                snk.type = 'dismiss'
                snk.open = true;
                snk.message = msg
                return snk
            });
            return;
        }

        let formData = new FormData();
        formData.append('file', document);
        let response = await Api.call(`/active/upload?office_id=${selectedOffice}`, 'POST', { body: formData }, 'file', company_id);
        console.log('RESPONSE UPLOAD DOCUMENT --> ', response)
        if (response != null) {

        }
        else {
            snackbar.update(snk => {
                snk.type = 'dismiss'
                snk.open = true;
                snk.message = 'Error al subir el archivo'
                return snk
            });
        }
        // if (response.success && response.statusCode == "201") {
        //     return response.data.result;
        // }
        // else {
        //     return null;
        // }
    }

</script>

<div class="form">

    <OfficeSucursalSelected  
        companyId={company_id} 
        bind:selectedOffice={selectedOffice}
        bind:selectedSucursal={selectedSucursal}
        on:changeOffice={e => {
            console.log('changeOffice')
            console.log(e.detail)	
            // nameOffice = e.detail.office.label
            selectedOffice = e.detail.selectedOffice
        }}
        on:changeStore={e => {
            console.log('changeSucursal')
            console.log(e.detail)
            // nameStore = e.detail.store.label
            selectedSucursal = e.detail.selectedSucursal
        }}
    />

    <FileInput 
        bind:this={ fileComponent }
        label="Archivo de activos" 
        required 
        accept={ ['csv'] }
        trailing="upload_file"
        helperText="Documento con formato csv."
        on:change={ (e) => {
            console.log('file selected')
            console.log(e.detail)
            document = e.detail 
        }}
    />

    <div></div>

    <div class="mobile-fixed">
        <Button 
            custom
            label="Guardar"
            on:click={ upload }
        />
    </div>


</div>