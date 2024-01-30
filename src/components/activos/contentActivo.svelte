<script>
    import { onMount } from "svelte";
    import Api from "../../../helpers/ApiCall";
    import { Button, Search, Table, Snackbar } from "$lib";
    import ActivoForm from "./activoForm.svelte";	
    import ReportActivo from "../reports/report.svelte";
    import CompanySelect from "../company/companySelect.svelte";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";
    import { headerTableActivos, snackbar } from "../../stores/store";
    import OfficeSucursalSelected from "../sucursal/officeSucursalSelected.svelte";

    let limit = 3;
    let offset = 0;

    let table;
    let props;
    let storeFilter; // Id de la sucursal para la peticion.
    let activos = [];
    let filters = []; // Array de filtros para mostrar en la tabla.
    let modalContent;
    let companyId = 0;
    let tableCount = 0;
    let modalTitle = '';
    let openModal = false;
    let officesFilter = []; // Array de id de oficinas para realizar la peticion.
    let backButton = false;
    let activosSelected = [];
    let messageSnackbar = '';
    let openSnackbar = false;
    let hideSelectCompany = false;
    let newArticleDisabled = true;

    const editActivo = () => {
        console.log('EDIT ACTIVO');
        console.log(activosSelected);

        if (activosSelected.length == 0) {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Debes seleccionar un activo para editar."
                return snk
            })
            return;
        }

        if (activosSelected.length > 1) {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Solo puedes editar un activo a la vez."
                return snk
            })
            return;
        }

        modalTitle = `Editar activo ${activosSelected[0].bar_code}`;
        modalContent = ActivoForm;
        props = {
            activo: activosSelected[0],
            company_id: companyId,
            article_id: activosSelected[0].article_id,
            isEdit: true
        }

        backButton = false;
        openModal = true;

    }

    const deleteActivos = async () => {

        console.log('DELETE ACTIVOS');
        console.log(activosSelected);

        if (activosSelected.length == 0) {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Debes seleccionar al menos un activo para eliminar."
                return snk
            })
            return;
        }

        let response = (await Promise.all(activosSelected.map(activo => {
            return Api.call(`http://127.0.0.1:9000/active/${activo.id}`, 'DELETE');
        })))

        console.log('RESPONSE DELETE ACTIVOS > ', response)

        let failed = response.filter(r => r.data.code != "201");

        if (failed.length > 0) {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Error al eliminar activos."
                return snk
            })
            return;
        }

        snackbar.update(snk => {
            snk.open = true;
            snk.type = 'dismiss'
            snk.message = "Activos eliminados con éxito."
            return snk
        })

        // let exito = response.filter(r => r.data.code == "201").map(r => r.data.result);
        // table.setUnselectedAll()
        // tableCount -= exito.length;
        // activos = activos.filter(activo => !exito.includes(activo.id));

        return;


    }

    const getDocument = (url) => {
        fetch(`http://127.0.0.1:9000/file_active/${url}`)
            .then(response => response.blob())
            .then(document => {
                let objectURL = URL.createObjectURL(document);
                window.open(objectURL)

            })
            .catch(error => console.error(error));
    }

    const getActivosByStore = async (store) => {
        if (store == undefined) return;
        if (officesFilter.length > 0) return;

        let response = (await Api.call(`http://127.0.0.1:9000/active/sucursal/${store.value}?limit=${limit}&offset=${offset}`, 'GET'));
        console.log('RESPONSE ACTIVOS BY STORE > ', response)
        if (response.success && response.statusCode == '200') {
            activos = response.data.result
            tableCount = response.data.count;
        }
        else {
            activos = [];
        }
    }

    const getActivosByOffice = async (officesId) => {
        if (officesId.length == 0) {
            getActivosByStore(storeFilter);
            return;
        } 

        let response = (await Api.call(`http://127.0.0.1:9000/active/offices/${officesId.join(',')}?limit=${limit}&offset=${offset}`, 'GET'));
        console.log('RESPONSE ACTIVOS BY OFFICE > ', response)
        if (response.success && response.statusCode == '200') {
            if (response.data.result.length == 0) {
                activos = [];
                return; 
            }
            activos = response.data.result
            tableCount = response.data.count;
        }
        else {
            activos = [];
        }
    }

    const newActivo = (company_id) => {
        modalTitle = `Nuevo activo `
        modalContent = ActivoForm
        props = { 
            activo: {
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
            },
            article_id: 0,
            company_id
        }

        openModal = true;
    }

    onMount(() => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        console.log(user)
        if (user.profile_id == 2) {
            companyId = user.company_id;
            hideSelectCompany = true;
            // message = "Buscando..."
        }
        else {
            hideSelectCompany = false;
            // message = "Selecciona una empresa para obtener sus articulos."
        }
    })

    $: getActivosByStore(storeFilter, offset)
    $: getActivosByOffice(officesFilter, offset)

</script>


<Snackbar 
    bind:open={ openSnackbar }
    type="confirm"
    message={ messageSnackbar }
    on:confirm={ deleteActivos }
/>

<div style="padding-top: 20px;">
    <div class="header-content">
        <div class="flex-row gap-8 space-between">
            {#if !hideSelectCompany}
                <CompanySelect 
                    customHeight
                    on:change={ (event) => {
                        console.log('COMPANY ID -> ', event.detail)
                        companyId = event.detail;
                        filters = [];
                        storeFilter = undefined;
                        officesFilter = [];
                        activos = [];
                        
                    }  }
                />
            {/if}
            <OfficeSucursalSelected 
                custom
                {companyId}
                show={ ['sucursal', 'office']}
                on:changeStore={ (event) => {
                    console.log('STORE -> ', event.detail.store)
                    // filters.store = event.detail.store
                    if (event.detail.store == undefined) return;
                    
                    // quitar storeFilter de filters
                    filters = filters.filter( filter => filter.label != storeFilter.label )

                    storeFilter = event.detail.store

                    filters = [ storeFilter ]
                    officesFilter = []
                } }
                on:changeOffice={ (event) => {
                    console.log('OFFICE -> ', event.detail.office)
                    // filters.office = event.detail.office
                    if (event.detail.office == undefined) return;

                    // buscar si ya existe el filtro
                    let filter = filters.find(filter => filter.label == event.detail.office.label)
                    if (filter) return;

                    filters = [ ...filters, event.detail.office ]

                    officesFilter = [ ...officesFilter, event.detail.office.value ]
                    
                } }
            />
            <Button label="Nuevo activo" custom disabled={ newArticleDisabled } on:click={ () => newActivo(companyId) } />
            <!-- <Button label="Nuevo reporte" report leading icon="download" on:click={ reportArticle } /> -->
            <ReportActivo 
                id={ companyId } 
                label="Exportar a PDF"
                disabled={ newArticleDisabled }
            />
        </div>
        
        <Search value="" />
    </div>

    <div class="flex-column gap-8 mt-8">
        <Table 
            bind:this={ table }
            headers={ $headerTableActivos }
            on:deleteFilter={ (event) => {
                console.log('deleteFilter > ', event.detail)
                filters = filters.filter( filter => filter.label != event.detail.label )
                officesFilter = officesFilter.filter( office => office != event.detail.value )

            } }
            {filters}
            data={ activos }
            on:getDocument={ (event) => {
                console.log('getDocument > ', event.detail)
                if (event.detail != '') getDocument(event.detail);
            } }
            count={ tableCount }
            {limit}
            {offset}
            on:changePage={ (event) => {
                console.log('changePage > ', event.detail)
                offset = event.detail;
                // limit = event.detail.limit;
            } }
            on:rowSelected={ (event) => {
                console.log('rowSelected > ', event.detail)
                // buscar si activo existe en el array
                let activo = activosSelected.find( activo => activo.id == event.detail.id)

                // quitar el activo del array si ya existe
                if (activo) activosSelected = activosSelected.filter( activo => activo.id != event.detail.id)
                // agregar el activo al array
                else activosSelected = [ ...activosSelected, event.detail]
                
                // newArticleDisabled = false;
            } }
            on:edit={ editActivo }
            on:delete={ () => {
                console.log('DELETE ACTIVOS');
                console.log(activosSelected);

                if (activosSelected.length == 0) {
                    snackbar.update(snk => {
                        snk.open = true;
                        snk.type = 'dismiss'
                        snk.message = "Debes seleccionar al menos un activo para eliminar."
                        return snk
                    })
                    return;
                }

                messageSnackbar = "¿Estas seguro de eliminar los activos seleccionados?"
                openSnackbar = true;

            } }
            on:selectedAll={ () => {
                activosSelected = activos;
            } }
            on:unselectedAll={ () => {
                activosSelected = [];
            } }
        />
    </div>

</div>

<SheetHandler
    {props}
    {modalTitle}
    {backButton}
    {modalContent}
    bind:openModal={openModal}
/>