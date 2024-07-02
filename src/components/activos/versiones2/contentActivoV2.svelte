<script>
    import Api from "../../../../helpers/ApiCall";
    import { onMount, setContext } from "svelte";
    import ActivoForm from "../activoForm.svelte";	
    import ActivoSearch from "../activoSearch.svelte";
    import ActivosTeoricos from "../activosTeoricos.svelte";
    import ActivoFormUpload from "../activoFormUpload.svelte";
    import ActivoFormContent from "../activoFormContent.svelte";
    import SheetHandler from "../../SheetsHandler/sheetHandler.svelte";
    import { headerTableActivos, snackbar, user, lockStore, lockOffice, lockStoreName, lockOfficeName, companySelect, companySelectName } from "../../../stores/store";
    import { Button, Table, Snackbar, Fab, Menu, IconButton } from "$lib";
    import OfficeSucursalSelected from "../../sucursal/officeSucursalSelected.svelte";
    //import OfficeSucursalSelected from "../sucursal/v2/officeSucursalSelectedV2.svelte";
    import Autocomplete from "../../selectAutocomplete/autocomplete.svelte";

    let limit = 10;
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
    let companyName = '';
    let companyNameV2 = '';
    let nameSucursal = '';
    let openModal = false;
    let officesFilter = []; // Array de id de oficinas para realizar la peticion.
    let backButton = false;
    let openActions = false;
    let startSearch = false;
    let activosSelected = [];
    let messageSnackbar = '';
    let openSnackbar = false;
    let hideSelectCompany = false;
    let newArticleDisabled = true;

    //cuando se selecciona una sucursal y despues se quita no se quitan las opciones de las oficinas

    setContext('newActivo', (locations) => {
        console.log('newActivo')
        console.log(locations)
        

        if (officesFilter.length > 0) {
            // Si al menos una id de officesFilter existe en locations.offices, realizar peticion con officesFilter
            let exists = officesFilter.some(office => locations.offices.includes(office))
            if (exists) {
                if (offset == 0) getActivosByOffice(officesFilter, offset)
                else offset = 0;
            } 
        }
        else if (storeFilter != undefined && storeFilter.length > 0) {
            // Si al menos una id de storeFilter existe en locations.stores, realizar peticion con storeFilter
            if (locations.stores.includes(storeFilter.value)) {
                if (offset == 0) getActivosByStore(storeFilter, offset)
                else offset = 0;
            }
        }

        table.setUnselectedAll();
        if (officesFilter.length > 0) getActivosByOffice(officesFilter, offset)
        else getActivosByStore(storeFilter, offset)
    })

    setContext('reloadActivo', () => {
        console.log('reloadActivo')
        openModal = false;
        table.setUnselectedAll();
        if (officesFilter.length > 0) getActivosByOffice(officesFilter, offset)
        else getActivosByStore(storeFilter, offset)
    })

    const activosTeoricos = () => {
        modalTitle = `Activos teoricos`;
        modalContent = ActivosTeoricos;
        props = {
            companyId
        }
        openModal = true;
    }

    const uploadActivos = () => {
        modalTitle = `Cargar activos`;
        modalContent = ActivoFormUpload;

        props = {
            company_id: companyId
        }

        openModal = true;
    }

    const newActivo = (company_id) => {
        modalTitle = `Nuevo activo - ` + companyName;
        modalContent = ActivoFormContent //ActivoForm
        props = { 
            activo: {
                bar_code: '',
                serie: '',
                model: '',
                brand: '',
                comment: '',
                acquisition_date: '',
                accounting_document: '',
                accounting_record_number: '',
                name_in_charge_active: '',
                rut_in_charge_active: '',
                virtual_code: false,
                state: '',
                article_id: '',
                office_id: '',
                maintenance_days: ''
            },
            article_id: 0,
            company_id,
            showArticles: true
        }

        openModal = true;
    }

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
            return Api.call(`/active/${activo.id}`, 'DELETE', {}, 'json', companyId);
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
        // tableCount -= exito.length;
        // activos = activos.filter(activo => !exito.includes(activo.id));
        
        table.setUnselectedAll()
        if (officesFilter.length > 0) getActivosByOffice(officesFilter, offset)
        else getActivosByStore(storeFilter, offset)

        return;


    }

    const getDocument = (url) => {
        let host = '';
        if (import.meta.env.MODE == 'production') host = `https://45-33-99-148.ip.linodeusercontent.com/api`
        else host = `http://127.0.0.1:9000`	
        
        fetch(`${host}/file_active/${url}`)
            .then(response => response.blob())
            .then(document => {
                let objectURL = URL.createObjectURL(document);
                window.open(objectURL)

            })
            .catch(error => console.error(error));
    }

    const getActivosByStore = async (store) => {
        console.log('getActivosByStore > ')
        if (startSearch) return;
        if (store == undefined) return;
        if (officesFilter.length > 0) return;
        if (store.value == undefined) return;

        let response = (await Api.call(`/active/sucursal/${store.value}?limit=${limit}&offset=${offset}`, 'GET', {}, 'json', companyId));
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
        console.log('getActivosByOffice > ')
        console.log('store ' + storeFilter)
        if (startSearch) return;

        if(filters.length == 0){
            getActivosAll()
            return
        }
        if (officesId.length == 0) {
            getActivosByStore(storeFilter);
            return;
        } 

        let response = (await Api.call(`/active/offices/${officesId.join(',')}?limit=${limit}&offset=${offset}`, 'GET', {}, 'json', companyId));
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

    const getActivosAll = async () => {
        console.log('ACTIVOS ALL -> ')
        if (startSearch) return;

        if (companyId == 0) return;

        officesFilter = [];
        let response = (await Api.call(`/actives?limit=${limit}&offset=${offset}`, 'GET', {}, 'json', companyId));
        console.log('RESPONSE ACTIVOS ALL > ', response)
        if (response.success && response.statusCode == '200') {
            activos = response.data.result
            tableCount = response.data.count;
        }
        else {
            activos = [];
        }
    }

    const reportActivePdf = async (officesId) => {
        console.log('toPdf')

        if (storeFilter == undefined) return;
        console.log(companyName)

        let id, location
        if(officesId.length == 0){
            id = storeFilter.value
            location = 'sucursal'
            console.log("id ", id)
        }else{
            id = officesFilter.join(',')
            location = 'offices'
            console.log("ids: " , id)
        }

        try {

            let response = (await Api.getReport(`report/active/${location}/${id}`, { headers: { companyId }}));
            if (response != null) {
                const downloadUrl = URL.createObjectURL(response);
                console.log(downloadUrl);

                const link = document.createElement('a');
                link.href = downloadUrl;
                //link.download = `Reporte de activos de ${companyName}.pdf`;
                link.download = `Activos_${companyNameV2}_${nameSucursal}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            else {
                snackbar.update(snk => {
                    snk.open = true;
                    snk.type = 'dismiss';
                    snk.message = 'Error al descargar reporte.';
                    return snk;
                });
            }

        } catch (error) {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss';
                snk.message = 'Error al descargar reporte.';
                return snk;
            });
            console.error(error);
        }
    }

    const reportActiveExcel = async (officesId) => {
        console.log('toExcel')

        if (storeFilter == undefined) return;
        console.log(companyName)

        let id, location
        if(officesId.length == 0){
            id = storeFilter.value
            location = 'sucursal'
            console.log("id ", id)
        }else{
            id = officesFilter.join(',')
            location = 'offices'
            console.log("ids: " , id)
        }

        try {

            let response = (await Api.getReport(`report/excel/active/${location}/${id}`, { headers: { companyId }}));
            if (response != null) {
                const downloadUrl = URL.createObjectURL(response);
                console.log(downloadUrl);

                const link = document.createElement('a');
                link.href = downloadUrl;
                //link.download = `Reporte de activos de ${companyName}.xlsx`;
                link.download = `Activos_${companyNameV2}_${nameSucursal}.xlsx`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            else {
                snackbar.update(snk => {
                    snk.open = true;
                    snk.type = 'dismiss';
                    snk.message = 'Error al descargar reporte.';
                    return snk;
                });
            }

            } catch (error) {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss';
                snk.message = 'Error al descargar reporte.';
                return snk;
            });
            console.error(error);
        }
    }

    const allActivePdf = async () => {
        try {

            let response = (await Api.getReport(`report/active/company/${companyId}`));
            if (response != null) {
                const downloadUrl = URL.createObjectURL(response);
                console.log(downloadUrl);

                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = `Reporte de activos de ${companyNameV2}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            else {
                snackbar.update(snk => {
                    snk.open = true;
                    snk.type = 'dismiss';
                    snk.message = 'Error al descargar reporte.';
                    return snk;
                });
            }

            } catch (error) {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss';
                snk.message = 'Error al descargar reporte.';
                return snk;
            });
        }
    }

    const allActiveExcel = async () => {
        try {

            let response = (await Api.getReport(`report/excel/active/company/${companyId}`));
            if (response != null) {
                
                const downloadUrl = URL.createObjectURL(response);
                console.log(downloadUrl);

                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = `Reporte de activos de ${companyNameV2}.xlsx`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            else {
                snackbar.update(snk => {
                    snk.open = true;
                    snk.type = 'dismiss';
                    snk.message = 'Error al descargar reporte.';
                    return snk;
                });
            }

            } catch (error) {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss';
                snk.message = 'Error al descargar reporte.';
                return snk;
            });
            console.error(error);
        }
    }

    onMount(() => {
    })

    // $: getActivosByStore(storeFilter, offset, limit)
    $: getActivosByOffice(officesFilter, offset, limit)
    $: console.log("officesFilter " + officesFilter + " storeID ", storeFilter)
    $: if ($companySelect != 0) {
        companyId = $companySelect;
        filters = [];
        storeFilter = undefined;
        officesFilter = [];
        activos = [];
        newArticleDisabled = false;
        offset = 0;
    }

    $: companyNameV2 = $companySelectName
    $: nameSucursal = $lockStoreName

  let valueOutlined = '';

  function handleValueChange(newValue) {
    valueOutlined = newValue;
  }

</script>


<Snackbar 
    bind:open={ openSnackbar }
    type="confirm"
    message={ messageSnackbar }
    on:confirm={ deleteActivos }
/>

<div class="mobile-only" style="position: fixed; bottom: 10px; left: 10px; z-index: 10">
    {#if $user.profile_id != 2}
        <Fab disabled={ newArticleDisabled } on:click={ newActivo(companyId) } />
    {/if}
</div>

<div style="padding-top: 80px;">
    <div class="header-content mt-18">
        
        <div class="flex-row gap-8 space-between">

            <Autocomplete 
                {companyId}
                custom
                required = {true}
                bind:value={valueOutlined}
                label="Outlined"
                onInputChange={handleValueChange}
                on:sucursalSelected={ (event) => {
                    console.log('STORE -> ', event.detail)
                    // filters.store = event.detail.store
                    if (event.detail.label == undefined) return;
                    
                    lockStore.set(event.detail.value)
                    lockStoreName.set(event.detail.label)

                    // quitar storeFilter de filters
                    filters = filters.filter( filter => filter.label != storeFilter.label )

                    storeFilter = event.detail

                    filters = [ storeFilter ]
                    officesFilter = []
                }}
                on:officeSelected={ (event) => {
                    console.log('OFFICE -> ', event.detail.office)
                    // filters.office = event.detail.office
                    if (event.detail == undefined) return;

                    lockOffice.set(event.detail.value)
                    lockOfficeName.set(event.detail.label)

                    // buscar si ya existe el filtro
                    let filter = filters.find(filter => filter.label == event.detail.label)
                    if (filter) return;

                    filters = [ ...filters, event.detail ]

                    officesFilter = [ ...officesFilter, event.detail.value ]   
                }}/>
            
            
        </div>
        <div class="flex-row gap-8" style="align-items: center;">
            
            <div class="mobile-only" style="display: flex; align-items: center; justify-content: space-between;">
                <ActivoSearch 
                    {companyId}
                    bind:count={tableCount}
                    bind:limit={limit}
                    bind:offset={offset}
                    bind:activos={activos} 
                    bind:officesId={officesFilter}
                    bind:storeId={storeFilter}
                    on:startSearch={ () => {
                        startSearch = true;
                    } }
                    on:removeSearch={ () => {
                        if (!startSearch) return;
                        startSearch = false;
                        
                        if (offset == 0) {
                            console.log(storeFilter.value != undefined)
                            console.log(storeFilter.value)
                            if (officesFilter.length > 0) getActivosByOffice(officesFilter)
                            else if (storeFilter.value != undefined) getActivosByStore(storeFilter)
                            else getActivosAll()
                        }
                        else offset = 0;
                    } }
                />
            </div>
            <div class="desktop-only" style="display: flex; align-items: center; gap: 8px ">
                <!-- <IconButton icon="upload_file" tooltipId="btn-active__upload" tooltipText="Cargar activos" on:click={ uploadActivos } /> -->
                {#if $user.profile_id != 2}
                    <Button label="Nuevo activo" custom disabled={ newArticleDisabled } on:click={ () => newActivo(companyId) } />
                {/if}
                <Button label="Activos teoricos" custom disabled={ newArticleDisabled } secondary on:click={ activosTeoricos } />
            </div>
        </div>
    </div>

    <div class="flex-column gap-8 mt-8">
        <Table 
            bind:this={ table }
            headers={ $headerTableActivos }
            on:deleteFilter={ (event) => {
                console.log('deleteFilter > ', event.detail)
                console.log(storeFilter)
                console.log(storeFilter == event.detail)
                console.log(filters)
                if(storeFilter == event.detail) {
                    filters = [];
                    officesFilter = [];
                    return
                }
                filters = filters.filter( filter => filter.label != event.detail.label )
                console.log(filters)
                console.log(officesFilter)
                officesFilter = officesFilter.filter( office => office != event.detail.value )
                console.log(officesFilter)

            } }
            {filters}
            data={ activos }
            on:getDocument={ (event) => {
                console.log('getDocument > ', event.detail)
                if (event.detail != '') getDocument(event.detail);
            } }
            count={ tableCount }
            bind:limit={limit}
            {offset}
            on:changePage={ (event) => {
                console.log('changePage > ', event.detail)
                offset = event.detail;
                table.setUnselectedAll();
                // limit = event.detail.limit;
            } }
            on:rowSelected={ (event) => {
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
        >
            <!-- <div class="desktop-only">
                <Search slot="search" value="" />
            </div> -->
            <div slot="search">
                <Menu
                    bind:open={openActions}
                    options={
                        [
                            { label: "Exportar tabla PDF", dispatch: "toPdf"}, 
                            { label: "Exportar tabla Excel", dispatch: "toExcel"},
                            { label: "Exportar todos los activos a PDF", dispatch: "toAllPdf" },
                            { label: "Exportar todos los activos a Excel", dispatch: "toAllExcel" }
                        ]  
                    }
                    on:toPdf={ reportActivePdf(officesFilter) }
                    on:toExcel={ reportActiveExcel(officesFilter) }
                    on:toAllPdf={ allActivePdf }
                    on:toAllExcel={ allActiveExcel }
                >
                    <IconButton icon="download" on:click={() => openActions = !openActions } />
                </Menu>
            </div>
            
        </Table>
    </div>

</div>

<SheetHandler
    {props}
    {modalTitle}
    {backButton}
    {modalContent}
    bind:openModal={openModal}
/>