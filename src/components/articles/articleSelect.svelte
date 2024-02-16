<script>
    import { Select } from "$lib"
    import Api from "../../../helpers/ApiCall";
    import { onMount, createEventDispatcher } from "svelte";

    export let companyId = 0
    export let selected = ''
    export let customHeight = false

    let articles = []
    let dispatch = createEventDispatcher();

    //Se obtiene las companias con el id y nombre solamente
    const getArticleByCompanyId = async () => {
        let response = (await Api.call('/articles/company/' + companyId, 'GET'))
        console.log('RESPONSE GET ARTICLES --> ', response)
        if (response.success && response.statusCode == '200') {
            articles = response.data.result.map(r => { return { label: r.name, value: r.id } })
        } 
    }

    onMount(() => {
        getArticleByCompanyId();
    })

</script>

{#key articles}

<Select         
    on:change={e => {
        // dispatch('name', companies.find(c => c.value == e.detail).label)
        dispatch('change', e.detail)
    }}
    {selected}
    {customHeight}
    label="Articulo"
    options={ articles }
/>

{/key}