<script>
    import { Search } from "$lib";
    import Api from "../../../helpers/ApiCall";
    import { createEventDispatcher } from "svelte";

    export let sucursales = [];
    export let companyId = 0

    let searchText = '';
    let startSearch = false;
    let dispatch = createEventDispatcher();

    const searchSucursal = async (text) => {
        if (text == '') {
            startSearch = false;
            dispatch('removeSearch')
            return;
        } 

        if (!startSearch) dispatch('startSearch')
        startSearch = true;


        let response = (await Api.call(`http://127.0.0.1:9000/sucursal/search/${companyId}?search=${text}`, 'GET'));
        console.log('RESPONSE SEARCH SUCURSAL -> ', response)
        if (response.success && response.statusCode == '200') {
            sucursales = response.data.result
        }
       
    }

    $: searchSucursal(searchText)

</script>
<Search 
    bind:value={searchText} 
    on:removeSearch    
/>
