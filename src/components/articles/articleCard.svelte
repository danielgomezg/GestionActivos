<script>
    import { createEventDispatcher, onMount, getContext } from "svelte";
    import { Card, IconButton, Button } from "$lib";
    import Api from "../../../helpers/ApiCall";
    import { snackbar } from "../../stores/store";

    export let article = {}
    let imageUrl;
    let dispath = createEventDispatcher();
    let removeArticle = getContext('removeArticle');

    const getImage = async (name) => {
        if (name == '') return null;
        console.log(name)

        fetch(`http://127.0.0.1:9000/image_article/${name}`)
            .then(response => response.blob())
            .then(images => {
                let objectURL = URL.createObjectURL(images);
                imageUrl = objectURL;

            })
            .catch(error => console.error(error));

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

    onMount(async () => {
        // getImage(article.photo)
    })

    $: getImage(article.photo)


</script>

<Card>
    <div class="card-container">
        <div class="card-header align-start">
            <div class="flex-row gap-8 ">
                <div class="content-image">
                    {#if article.photo == ''}
                        <img src="https://via.placeholder.com/150" class="article-image" alt={article.name} />
                    {:else}
                        <img src={ imageUrl } class="article-image" alt={article.name} />
                    {/if}
                </div>
                <div class="flex-column">
                    <div class="card-title">{ article.name }</div>
                    <table>
                        <tr>
                            <td><span class="material-symbols-rounded">event</span></td>
                            <td>{ article.creation_date }</td>
                        </tr>
                        <tr>
                            <td><span class="material-symbols-rounded">inventory_2</span></td>
                            <td>{ article.count_actives || 0 } activos</td>
                        </tr>
                        <tr>
                            <td><span class="material-symbols-rounded">notes</span></td>
                            <td>{ article.description }</td>
                        </tr>
                    </table>
                    <!-- <p> Agregado el { article.creation_date }</p>
                    <p> { article.count_actives || 0 } activos</p> -->
                </div>
            </div>
            <div>
                <IconButton icon="edit" tooltipId="btn-edit__{article.name}" tooltipText="Editar" on:click={ dispath("edit", {article, imageUrl}) } />
                <IconButton icon="delete" tooltipId="btn-delete__{article.name}" tooltipText="Eliminar" on:click={ deleteArticle } />
            </div>
        </div>
        <!-- <div class="card-content">
            <div class="contenedor">
                <p>{ article.description }</p>
            </div>
        </div> -->
        <div class="card-actions">
            <Button label="Ver activos" custom type="outlined" color="" on:click={ dispath("showActivos", article) } />
            <Button label="Nuevo activo" custom on:click={ dispath("newActivo", article) } />
        </div>
    </div>
</Card>

<style>
    .article-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        /* display: block; */
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