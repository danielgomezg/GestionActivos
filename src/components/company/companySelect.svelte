<script>
    import { Select } from "$lib"
    import Api from "../../../helpers/ApiCall";
    import { onMount, createEventDispatcher } from "svelte";

    export let selected = ''
    export let customHeight = false

    let companies = []
    let dispatch = createEventDispatcher();

    //Se obtiene las companias con el id y nombre solamente
    const getCompanyNameId = async () => {
        let response = (await Api.call('http://127.0.0.1:9000/companiesIdName', 'GET'))
        console.log('RESPONSE GET COMPANIES --> ', response)
        if (response.success && response.statusCode == '200') {
            companies = response.data.result.map(r => { return { label: r.name, value: r.id } })
        } 
    }

    onMount(() => {
        getCompanyNameId();
    })

</script>

{#key companies}

<Select         
    on:change={e => {
        dispatch('name', companies.find(c => c.value == e.detail).label)
        dispatch('change', e.detail)
    }}
    {selected}
    {customHeight}
    label="Empresa"
    options={ companies }
/>

{/key}