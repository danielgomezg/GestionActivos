<script>
    import ActivoCard from "./activoCard.svelte";
    import { Button, Loading, Search, Table } from "$lib";
    import ReportActivo from "../reports/report.svelte";
    import { headerTableActivos } from "../../stores/store";
    import CompanySelect from "../company/companySelect.svelte";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";
    import OfficeSucursalSelected from "../sucursal/officeSucursalSelected.svelte";

    let props;
    let activos = [];
    let message = "";
    let modalContent;
    let companyId = 0;
    let modalTitle = '';
    let loading = false;
    let openModal = false;
    let backButton = false;
    let hideSelectCompany = false;
    let newArticleDisabled = true;
    // let storeSelected = {};
    // let officeSelected = {};
    let filters = {}

    let previusComponent, previusProps, previusModelTitle = '';

    const editActivo = () => {

    }

    const historyActivo = () => {

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
                        
                    }  }
                />
            {/if}
            <OfficeSucursalSelected 
                custom
                {companyId}
                show={ ['sucursal', 'office']}
                on:changeStore={ (event) => {
                    
                    // filters.store = event.detail.store
                    filters = { ...filters, store: event.detail.store }
                } }
                on:changeOffice={ (event) => {
                    
                    // filters.office = event.detail.office
                    filters = { ...filters, office: event.detail.office }
                    
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
            {filters}
            data={
                [
                    {
                        "barcode": "123456789",
                        "serie": "123456789",
                        "model": "123456789",
                        "acquisition_date": "18-01-2024",
                        "create_date": "18-01-2024",
                        "state": "Nuevo",
                        "comment": "comentario muy extenso",
                        "responsable": "Juanito Perez",
                        "register": "0511",
                        "document": "",
                        
                    }
                ]
            }
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