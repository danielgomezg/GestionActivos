<script>
    import Api from "../../../helpers/ApiCall";
    import { createEventDispatcher, onMount } from "svelte";
    import { Card, IconButton, Button } from "$lib";

    export let article = {}
    let imageUrl;
    let dispath = createEventDispatcher();

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

    const deleteArticle = () => {
        
    }

    onMount(async () => {
        getImage(article.photo)
    })


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
                    <p> Agregado el { article.creation_date }</p>
                    <p> { article.count_actives } activos</p>
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
            <Button label="Ver activos" custom type="outlined" color="" on:click={ dispath("showActivos", article) } />
            <Button label="Agregar activo" custom on:click={ dispath("newActivo", article) } />
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