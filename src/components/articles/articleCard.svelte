<script>
    import { createEventDispatcher } from "svelte";
    import { Card, IconButton, Button } from "$lib";

    export let article = {}
    let dispath = createEventDispatcher();

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
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
                    <p> { article.count_actives } activos</p>
                </div>
            </div>
            <IconButton icon="edit" on:click={ dispath("edit", article) } />
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