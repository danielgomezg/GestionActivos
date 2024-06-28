<script>
    import { Search } from "$lib";
    import Api from "../../../../helpers/ApiCall";
    import { createEventDispatcher } from "svelte";

    export let actives = [];
    export let companyId = 0
    export let article_id = 0

    let limit = 300;
    let searchText = '';
    let startSearch = false;
    let dispatch = createEventDispatcher();

    const searchActive = async (text) => {
        if (text == '') {
            startSearch = false;
           // dispatch('removeSearch')
            return;
        } 

        if (!startSearch) dispatch('startSearch')
        startSearch = true;

        let response = (await Api.call(`/active/search/article/${article_id}?search=${text}&limit=${limit}`, 'GET', {}, 'json', companyId));
        console.log('RESPONSE SEARCH ACTIVE -> ', response)
        if (response.success && response.statusCode == '200') {
            actives = response.data.result
        } 
    }

    $: searchActive(searchText)

</script>

<Search 
    bind:value={searchText} 
    on:removeSearch    
/>
