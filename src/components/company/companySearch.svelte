<script>
    import { Search } from "$lib";
    import Api from "../../../helpers/ApiCall";
    import { createEventDispatcher } from "svelte";

    export let empresas = [];

    let limit = 50;
    let offset = 0;
    let count = 0;
    let searchText = '';
    let startSearch = false;
    let dispatch = createEventDispatcher();

    const searchCompany = async (text) => {
        if (text == '') {
            startSearch = false;
            dispatch('removeSearch')
            return;
        } 

        if (!startSearch) dispatch('startSearch')
        startSearch = true;


        let response = (await Api.call(`http://127.0.0.1:9000/company/search?search=${text}&limit=${limit}&offset=${offset}`, 'GET'));
        console.log('RESPONSE SEARCH COMPANY -> ', response)
        if (response.success && response.statusCode == '200') {
            empresas = response.data.result
        }
       
    }

    $: searchCompany(searchText)

</script>
<Search 
    bind:value={searchText} 
    on:removeSearch    
/>
