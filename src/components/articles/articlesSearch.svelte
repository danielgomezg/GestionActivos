<script>
    import { Search } from "$lib";
    import Api from "../../../helpers/ApiCall";
    import { createEventDispatcher } from "svelte";

    export let articles = [];
    export let company_id

    let limit = 50;
    let searchText = '';
    let startSearch = false;
    let dispatch = createEventDispatcher();

    const searchArticle = async (text) => {
        if (text == '') {
            startSearch = false;
            dispatch('removeSearch')
            return;
        } 

        if (!startSearch) dispatch('startSearch')
        startSearch = true;


        let response = (await Api.call(`http://127.0.0.1:9000/articles/search/${company_id}?search=${text}&limit=${limit}`, 'GET'));
        console.log('RESPONSE SEARCH ARTICLE-> ', response)
        if (response.success && response.statusCode == '200') {
            articles = response.data.result
        }
       
    }

    $: searchArticle(searchText)

</script>
<div>
    <Search 
        bind:value={searchText} 
        on:removeSearch    
    />
</div>