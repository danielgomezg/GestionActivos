<script>
    import { createEventDispatcher } from "svelte";
    import { Card, IconButton, Button } from "$lib";

    export let article = {}
    let dispath = createEventDispatcher();

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    // $: console.log('article => ', article)

</script>

<Card>
    <div class="card-container">
        <div class="card-header align-start">
            <div class="flex-row gap-8 ">
                <div class="content-image">
                    <img src={ article.imageUrl } class="article-image" alt={article.name} />
                </div>
                <div class="flex-column">
                    <div class="card-title">{ article.name }</div>
                    <p> Agregado el { article.addDate }</p>
                    <p> { article.countActivos } activos</p>
                </div>
            </div>
            <IconButton icon="edit" on:click={ dispath("edit", article) } />
        </div>
        <div class="card-content">
            <!-- <div>{ article.rut }</div> -->
            <div class="contenedor">
                <p>{ article.description }</p>
            </div>
            <div>
                <!-- <img src={ '/flags/' + normalizeText(article.country) + '.png' } class="flag" alt="flag" /> -->
                <!-- { article.country } -->
            </div>
            <div class="store-info">
                <!-- <span class="material-symbols-outlined">store</span> -->
                <!-- Muestra la cantidad de sucursales -->
                <!-- <div>{ article.count_sucursal || 0 } sucursales</div> -->
            </div>
        </div>
        <div class="card-actions">
            <Button label="ver activos" type="outlined" color="" on:click={ dispath("showActivos", article) } />
            <Button label="agregar activo" on:click={ dispath("newActivo", article) } />
        </div>
    </div>
</Card>

<style>
    .store-info {
        display: flex;
        align-items: center;
    }

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