<script>
    import { Tab } from "$lib";
  import { onMount } from "svelte";

    import ActivoForm from "./activoForm.svelte";
    import ActivoValues from "./activoValues.svelte";

    export let activo = {};
    export let article_id = 0;
    export let company_id = 0;
    export let isEdit = false;
    export let article_name = '';
    export let showArticles = false; //Es true cuando lo llama el contentActivo. Se necesita mostrar el select de articulos

    let component = ActivoForm;
    let props = { activo, article_id, company_id, isEdit, article_name, showArticles };

    onMount(() => {
        // component = ActivoForm;
        // props = { activo, article_id, company_id, isEdit, article_name, showArticles };
    });

</script>

<Tab 
    on:info={() => {
        props = { activo, article_id, company_id, isEdit, article_name, showArticles };
        component = ActivoForm;
    }}
    on:values={() => {
        props = { activo };
        component = ActivoValues;
    }}
/>

<svelte:component this={component} {...props} />