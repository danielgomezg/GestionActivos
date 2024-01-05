<script>
    import { setContext } from "svelte";
    import Api from "../../../helpers/ApiCall";
    import { Button, Loading, Search } from "$lib";
    import CardArticle from "./articleCard.svelte";
    import FormArticle from "./articleForm.svelte";
    import ActivoForm from "../activos/activoForm.svelte";
    import ActivoInfo from "../activos/activoInfo.svelte";
    import CompanySelect from "../company/companySelect.svelte";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";

    let props;
    let company_id = 0;
    let modalContent;
    let modalTitle = '';
    let loading = false;
    let openModal = false;
    let backButton = false;
    let newArticleDisabled = true;
    let message = "Selecciona una empresa para obtener sus articulos."

    let previusComponent, previusProps, previusModelTitle = '';

    let articles = []

    setContext('backModalContent', (e) => {
        e.preventDefault();
        // if (modalContent === previusComponent) openModal = false;
        backButton = false
        modalContent = previusComponent
        modalTitle = previusModelTitle
        props = { ...previusProps }
        // openModal = true
    })

    setContext('editActivo', (activo, article) => {
        editActivo(activo, article);
    });

    const editActivo = (activo, article) => {
        // Se guarda el contenido actual del modal.
        previusComponent = modalContent;
        previusProps = { ...props };

        modalTitle = `Activo `;
        modalContent = ActivoForm;
        props = { activo, article };
        backButton = true;
        // openModal = true;
    }

    const editArticle = (article) => {
        modalTitle = `${article.name} - editando`
        modalContent = FormArticle;
        props = { article, isEdit: true }
        openModal = true;
        backButton = false;
    }

    const newActivo = (article, company_id) => {
        modalTitle = `Nuevo activo ${article.name}`
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
            article_id: article.id,
            company_id
        }

        openModal = true;
    }

    const showActivos = (article) => {
        // Se guarda componente actual para boton back 
        previusComponent = modalContent;
        previusProps = { ...props };

        modalTitle = `${article.name} - activos`
        previusModelTitle = modalTitle;
        modalContent = ActivoInfo;
        props = { article }
        backButton = false
        openModal = true;
    }

    const createArticle = (companyId) => {
        console.log(companyId)
        modalTitle = `Nuevo articulo`
        modalContent = FormArticle;
        props = {
            article: {
                name: '',
                description: ''
            },
            companyId
        }

        openModal = true;
        backButton = false;
    }

    const findArticles = async (companyId) => {
        console.log(companyId)
        newArticleDisabled = true;
        company_id = companyId;

        let response = (await Api.call(`http://127.0.0.1:9000/articlesPorCompany/${companyId}`, 'GET'));
        console.log(response)
        if (response.success && response.statusCode == "200") {
            articles = response.data.result;
        }
        else {
            message = "La empresa no tiene articulos registrados."
            articles = []
        }

        // setTimeout(() => {

        //     articles = [
        //         {
        //             name: 'Samsung S23',
        //             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        //             creation_date: '20/12/2023',
        //             countActivos: 3,
        //             photo: "https://images.samsung.com/is/image/samsung/p6pim/cl/2302/gallery/cl-galaxy-s23-s911-sm-s911bzgjltl-thumb-534841692?imwidth=480"
        //         },
        //         {
        //             name: 'iphone 15',
        //             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        //             creation_date: '21/12/2023',
        //             countActivos: 3,
        //             photo: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-compare-iphone-15-pro-202309?wid=384&hei=512&fmt=jpeg&qlt=90&.v=1692827834790"
        //         }
        //     ]
        
        // }, 500)
        newArticleDisabled = false;

    }

</script>

<div style="padding-top: 20px;">
    <div class="header-content">
        <div class="flex-row gap-8 space-between">
            <CompanySelect 
                on:change={ (event) => findArticles(event.detail)  }
            />
            <Button label="Nuevo articulo" custom disabled={ newArticleDisabled } on:click={ () => createArticle(company_id) } />
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
        {#each articles as article }    
            <CardArticle 
                {article} 
                on:edit={ (event) => editArticle(event.detail) } 
                on:newActivo={ (event) => newActivo(event.detail, company_id) } 
                on:showActivos={ (event) => showActivos(event.detail) } 
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