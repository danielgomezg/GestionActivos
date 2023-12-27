<script>
    import CardArticle from "./articleCard.svelte";
    import FormArticle from "./articleForm.svelte";
    import { Button, IconButton, Loading } from "$lib";
    import ActivoForm from "../activos/activoForm.svelte";
    import ActivoInfo from "../activos/activoInfo.svelte";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";
    import { setContext } from "svelte";

    let props;
    let modalContent;
    let modalTitle = '';
    let loading = false;
    let openModal = false;
    let backButton = false;

    let previusComponent, previusProps, previusModelTitle = '';

    let articles = [
        {
            name: 'Samsung S23',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            addDate: '20/12/2023',
            countActivos: 3,
            imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/cl/2302/gallery/cl-galaxy-s23-s911-sm-s911bzgjltl-thumb-534841692?imwidth=480"
        },
        {
            name: 'iphone 15',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            addDate: '21/12/2023',
            countActivos: 3,
            imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-compare-iphone-15-pro-202309?wid=384&hei=512&fmt=jpeg&qlt=90&.v=1692827834790"
        }
    ]

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

    const newActivo = (activo) => {
        modalTitle = `Nuevo activo ${activo.name}`
        modalContent = ActivoForm
        props = { 
            activo: {
                barcode: '',
                serie: '',
                model: '',
                description: '',
                purchase: '',
                numRegister: '',
                nameInCharge: '',
                rutInCharge: ''
            }
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

    const createArticle = () => {
        modalTitle = `Nuevo articulo`
        modalContent = FormArticle;
        props = {
            article: {
                name: '',
                description: ''
            }
        }

        openModal = true;
        backButton = false;
    }

</script>

<div style="padding-top: 20px;">
    <div class="header-article">
        <Button label="Nuevo articulo" on:click={ createArticle } />
        <IconButton icon="tune" />
        <!-- <div class="title">Empresas</div> -->
    </div>
    <br>

    <div class="flex-column gap-8">
        {#if loading}
            <Loading />
        {/if}
        {#each articles as article }    
            <CardArticle 
                {article} 
                on:edit={ (event) => editArticle(event.detail) } 
                on:newActivo={ (event) => newActivo(event.detail) } 
                on:showActivos={ (event) => showActivos(event.detail) } 
            />
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

<style>
    .header-article {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

</style>