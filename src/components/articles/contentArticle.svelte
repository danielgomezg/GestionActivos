<script>
    import { user } from "../../stores/store";
    import Api from "../../../helpers/ApiCall";
    import { Button, Loading, Fab } from "$lib";
    import CardArticle from "./articleCard.svelte";
    import FormArticle from "./articleForm.svelte";
    import { articleBackup } from "../../stores/store";
    import ArticleHistory from "./articleHistory.svelte";
    import ArticlesSearch from "./articlesSearch.svelte";
    import ActivoForm from "../activos/activoForm.svelte";
    import ActivoInfo from "../activos/activoInfo.svelte";
    import { setContext, onMount, onDestroy } from "svelte";
    import CompanySelect from "../company/companySelect.svelte";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";
    import ReportArticle from "../reports/report.svelte";

    let props;
    let count = 0;
    let limit = 25;
    let offset = 0;
    let message = "";
    let modalContent;
    let companyId = 0;
    let modalTitle = '';
    let loading = false;
    let openModal = false;
    let backButton = false;
    let startSearch = false;
    let hideSelectCompany = false;
    let newArticleDisabled = true;

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

    // Contexto para aumentar el contador de activos de un articulo
    setContext('addActivoCount', (articleId, cont) => {
        let article = articles.find(art => art.id == articleId);
        article.count_actives = article.count_actives + cont;
        articles = [...articles]
    })

    setContext('editActivo', (activo, article, company_id) => {
        editActivo(activo, article, company_id);
    });

    setContext('removeArticle', (articleId) => {
        articles = articles.filter(art => articleId !== art.id);
    })

    setContext('addArticle', (article) => {
        articles = [article, ...articles]
    })

    setContext('replaceArticle', (article) => {
        let index = articles.findIndex(art => art.id == article.id);
        articles[index] = article;
        articles = [...articles]
        openModal = false;
    })

    const historyArticle = (article) => {
        // previusComponent = modalContent;
        // previusProps = { ...props };

        modalTitle = `${article.name} - Historial`
        // previusModelTitle = modalTitle;
        modalContent = ArticleHistory;
        props = { article }
        backButton = false;
        openModal = true;
    }

    const editActivo = (activo, article, company_id) => {
        // Se guarda el contenido actual del modal.
        previusComponent = modalContent;
        previusProps = { ...props };

        modalTitle = `Activo `;
        modalContent = ActivoForm;
        props = { activo, 
            article_id: article.id,
            company_id: company_id,
            isEdit: true};
        backButton = true;
        // openModal = true;
    }

    const editArticle = ({article, imageUrl}) => {
        console.log(article)
        modalTitle = `${article.name} - editando`
        modalContent = FormArticle;
        props = { article, isEdit: true, imageUrl }
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

    const showActivos = (article, company_id) => {
        // Se guarda componente actual para boton back 
        previusComponent = modalContent;
        previusProps = { ...props };

        modalTitle = `${article.name} - activos`
        previusModelTitle = modalTitle;
        modalContent = ActivoInfo;
        props = { article, company_id }
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

    const findArticles = async (company_id) => {
        newArticleDisabled = true;
        companyId = company_id;
        if (offset > count) return;

        let response = (await Api.call(`/articles/company/${company_id}?limit=${limit}&offset=${offset}`, 'GET'));
        console.log('RESPONSE GET ARTICLES --> ', response)
        if (response.success && response.statusCode == "200") {
            articles = response.data.result;
        }
        else {
            message = "La empresa no tiene articulos registrados."
            articles = []
        }

        newArticleDisabled = false;

    }

    const handleScroll = () => {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
            offset = offset + limit;
            findArticles(companyId)
        }
    }

    onMount(() => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        if (user.profile_id == 2) {
            findArticles(user.company_id);
            hideSelectCompany = true;
            message = "Buscando..."
        }
        else {
            hideSelectCompany = false;
            message = "Selecciona una empresa para obtener sus articulos."
        }

        window.addEventListener('scroll', handleScroll)
    })

    onDestroy(() => {
        window.removeEventListener('scroll', handleScroll)
    })

</script>

<div class="mobile-only" style="position: fixed; bottom: 10px; right: 10px; z-index: 10">
    <Fab disabled={ newArticleDisabled } on:click={ createArticle(companyId) } />
</div>
<div style="padding-top: 20px;">
    <div class="header-content">
        <div class="flex-row gap-8 space-between">
            {#if !hideSelectCompany}
            <CompanySelect 
                customHeight
                on:change={ (event) => {
                    console.log(event.detail)
                    offset = 0;
                    count = 0;
                    findArticles(event.detail)
                }}
            />
            {/if}
            {#if $user.profile_id != 2}
                <div class="desktop-only">
                    <Button label="Nuevo articulo" custom disabled={ newArticleDisabled } on:click={ () => createArticle(companyId) } />
                </div>
            {/if}
                <!-- <Button label="Nuevo reporte" report leading icon="download" on:click={ reportArticle } /> -->
            <ReportArticle 
                id={ companyId } 
                label="Exportar a PDF"
                disabled={ newArticleDisabled }
            />
        </div>

        <ArticlesSearch
            bind:articles={articles} 
            on:startSearch={ () => {
                startSearch = true;
                articleBackup.set(articles)
            } }
            on:removeSearch={ () => {
                startSearch = false;
                articles = [...$articleBackup]
            } }
            company_id = {companyId}
        />
        
       <!-- <Search value="" />

         <div class="">
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
                on:newActivo={ (event) => newActivo(event.detail, companyId) } 
                on:showActivos={ (event) => showActivos(event.detail, companyId) } 
                on:history={ (event) => historyArticle(event.detail) }
            />
        {:else}
            {#if startSearch}
                <p>No se encontraron articulos para tu búsqueda</p>
            {:else}
                <p>No hay articulos en esta empresa</p>
            {/if}
       <!--{:else}
            <p>{ message }</p>--> 
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