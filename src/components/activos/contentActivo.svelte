<script>
    import { onMount } from "svelte";
    import Api from "../../../helpers/ApiCall";
    import { Button, Search, Table } from "$lib";
    import ReportActivo from "../reports/report.svelte";
    import CompanySelect from "../company/companySelect.svelte";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";
    import { headerTableActivos, estadosActivo } from "../../stores/store";
    import OfficeSucursalSelected from "../sucursal/officeSucursalSelected.svelte";

    let props;
    let activos = [];
    let storeFilter; // Id de la sucursal para la peticion.
    let filters = []; // Array de filtros para mostrar en la tabla.
    let modalContent;
    let companyId = 0;
    let tableCount = 0;
    let modalTitle = '';
    let officesFilter = []; // Array de id de oficinas para realizar la peticion.
    let openModal = false;
    let backButton = false;
    let hideSelectCompany = false;
    let newArticleDisabled = true;

    const editActivo = () => {

    }

    const historyActivo = () => {

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

        console.log('STORE ID > ', store)
        let response = (await Api.call(`http://127.0.0.1:9000/active/sucursal/${store.value}`, 'GET'));
        console.log('RESPONSE > ', response)
        if (response.success && response.statusCode == '200') {
            activos = response.data.result.map( activo => {
                return {
                    barcode: activo.bar_code,
                    activo: activo.serie,   
                    model: activo.model,
                    aq_date: activo.acquisition_date,
                    create_date: activo.creation_date,
                    state: $estadosActivo.find(ea => ea.value == activo.state).label, //hacer algo
                    comment: activo.comment,
                    responsable: activo.name_in_charge_active,
                    num_register: activo.accounting_record_number,
                    document: activo.accounting_document
                }
            });
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

        console.log('OFFICES ID > ', officesId)

        let response = (await Api.call(`http://127.0.0.1:9000/active/offices/${officesId.join(',')}`, 'GET'));
        console.log('RESPONSE > ', response)
        if (response.success && response.statusCode == '200') {
            if (response.data.result.length == 0) {
                activos = [];
                return; 
            }


            activos = response.data.result.map( activo => {
                return {
                    barcode: activo.bar_code,
                    activo: activo.serie,   
                    model: activo.model,
                    aq_date: activo.acquisition_date,
                    create_date: activo.creation_date,
                    state: $estadosActivo.find(ea => ea.value == activo.state).label, //hacer algo
                    comment: activo.comment,
                    responsable: activo.name_in_charge_active,
                    num_register: activo.accounting_record_number,
                    document: activo.accounting_document
                }
            });
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

    $: getActivosByStore(storeFilter)
    $: getActivosByOffice(officesFilter)

</script>

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