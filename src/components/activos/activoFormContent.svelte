<script>
    import { Tab } from "$lib";
    import ActivoForm from "./activoForm.svelte";
    import ActivoValues from "./activoValues.svelte";

    export let activo = {};
    export let article_id = 0;
    export let company_id = 0;
    export let isEdit = false;
    export let article_name = '';
    export let showArticles = false; //Es true cuando lo llama el contentActivo. Se necesita mostrar el select de articulos

    let isActivoForm = true;

</script>

{#if isEdit}
    <Tab 
        on:info={() => {
            isActivoForm = true;
        }}
        on:values={() => {
            isActivoForm = false;
        }}
    />
{/if}

{#if isActivoForm}
    <ActivoForm {activo} {article_id} {company_id} {isEdit} {article_name} {showArticles} />
{:else}
    <ActivoValues {activo} />
{/if}
