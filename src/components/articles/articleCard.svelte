<script>
    import { createEventDispatcher, getContext } from "svelte";
    import { Card, IconButton, Button } from "$lib";
    import Api from "../../../helpers/ApiCall";
    import { snackbar } from "../../stores/store";

    export let article = {}
    let dispath = createEventDispatcher();
    let removeArticle = getContext('removeArticle');

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    const deleteArticle = async () => {
        let confirmacion = confirm('Esta seguro que desea eliminar el articulo ', article.name)
        if(!confirmacion) return;

        let response = (await Api.call(`http://127.0.0.1:9000/article/${article.id}`, 'DELETE'));
        console.log('RESPONSE DELETE ARTICLE -> ', response)
        if (response.success && response.statusCode == '201') {
            removeArticle(article.id)

            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Articulo eliminada con éxito."
                return snk
            })

        } else {
            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Error al eliminar articulo."
                return snk
            })
        }
    }

</script>

<Card>
    <div class="card-container">
        <div class="card-header align-start">
            <div class="flex-row gap-8 ">
                <div class="content-image">
                    {#if article.photo == ''}
                        <img src="https://via.placeholder.com/150" class="article-image" alt={article.name} />
                    {:else}
                        <img src={ article.photo } class="article-image" alt={article.name} />
                    {/if}
                </div>
                <div class="flex-column">
                    <div class="card-title">{ article.name }</div>
                    <p> Agregado el { article.creation_date }</p>
                    <p> { article.count_actives || 0 } activos</p>
                </div>
            </div>
            <div>
                <IconButton icon="edit" on:click={ dispath("edit", article) } />
                <IconButton icon="delete" on:click={ deleteArticle } />
            </div>
        </div>
        <div class="card-content">
            <div class="contenedor">
                <p>{ article.description }</p>
            </div>
        </div>
        <div class="card-actions">
            <Button label="ver activos" custom type="outlined" color="" on:click={ dispath("showActivos", article) } />
            <Button label="agregar activo" custom on:click={ dispath("newActivo", article) } />
        </div>
    </div>
</Card>

<style>
    .article-image {
        width: 100%;
        height: auto;
        display: block;
        /* border-radius: 3px; */
    }

    .content-image {
        width: 100px;
        height: 100px;
        overflow: hidden;
        /* border: 1px solid #ccc; */
    }

    .contenedor {
        width: 60%; /* ajusta según el tamaño deseado */
        height: 35px; /* ajusta según el tamaño deseado */
        overflow: hidden;
        /* border: 1px solid #ccc; */
        padding: 10px 0;
    }

    .contenedor p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>