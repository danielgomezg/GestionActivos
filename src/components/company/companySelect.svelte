<script>
    import { Select } from "$lib"
    import Api from "../../../helpers/ApiCall";
    import { onMount, createEventDispatcher } from "svelte";

    export let selected = ''
    export let customHeight = false

    let count = 0;
    let offset = 0;
    let limit = 100;
    let companies = []
    let dispatch = createEventDispatcher();

    //Se obtiene las companias con el id y nombre solamente
    const getCompanyNameId = async () => {
        let response = (await Api.call(`/companiesIdName?limit=${limit}&offset=${offset}`, 'GET'))
        console.log('RESPONSE GET COMPANIES --> ', response)
        if (response.success && response.statusCode == '200') {
            companies = response.data.result.map(r => { return { label: r.name, value: r.id } })
            count = response.data.count
        } 
    }

    onMount(() => {
        getCompanyNameId();
    })

</script>

{#key companies}

<Select         
    on:change={e => {
        console.log('select cpm e.detail --> ', e.detail)
        if (e.detail == '') return;
        dispatch('name', companies.find(c => c.value == e.detail).label)
        dispatch('change', e.detail)
    }}
    {selected}
    {customHeight}
    label="Empresa"
    options={ companies }
/>

{/key}