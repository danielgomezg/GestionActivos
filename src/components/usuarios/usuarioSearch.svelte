<script>
    import { Search } from "$lib";
    import Api from "../../../helpers/ApiCall";
    import { createEventDispatcher } from "svelte";

    export let usuarios = [];

    let searchText = '';
    let startSearch = false;
    let dispatch = createEventDispatcher();

    const searchUser = async (text) => {
        if (text == '') {
            startSearch = false;
            dispatch('removeSearch')
            return;
        } 

        if (!startSearch) dispatch('startSearch')
        startSearch = true;


        let response = (await Api.call(`http://127.0.0.1:9000/users/search?search=${text}`, 'GET'));
        console.log('RESPONSE SEARCH USER -> ', response)
        if (response.success && response.statusCode == '200') {
            usuarios = response.data.result
        }
       
    }

    $: searchUser(searchText)

</script>
<Search 
    bind:value={searchText} 
    on:removeSearch    
/>
