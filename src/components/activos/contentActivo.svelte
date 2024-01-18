<script>
    import ActivoCard from "./activoCard.svelte";
    import { Button, Loading, Search } from "$lib";
    import ReportActivo from "../reports/report.svelte";
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
                show={ ['sucursal']}
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
        <!-- <div class="">
        </div> -->
        <!-- <IconButton icon="tune" /> -->
        <!-- <div class="title">Empresas</div> -->
    </div>
    <!-- <br> -->

    <div class="flex-column gap-8 mt-8">
        {#if loading}
            <Loading />
        {/if}
        {#each activos as activo }    
            <ActivoCard 
                {activo} 
                on:edit={ (event) => editActivo(event.detail) } 
                on:history={ (event) => historyActivo(event.detail, companyId) } 
            />
        {:else}
            <p>{ message }</p>
        {/each}
    </div>

</div>

<SheetHandler
    {props}
    {modalTitle}
    {backButton}
    {modalContent}
    bind:openModal={openModal}
/>