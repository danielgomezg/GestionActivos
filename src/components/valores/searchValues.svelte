<script>
    import { Search } from "$lib";
    import Api from "../../../helpers/ApiCall";
    import { createEventDispatcher } from "svelte";
    import { companySelect } from "../../stores/store";

    export let activesValues = [];

    let count = 0;
    let limit = 50;
    let searchText = '';
    let dispatch = createEventDispatcher();

    const searchActivesValues = async (text) => {
        if (text == '') {
            return;
        } 

        let response = await Api.call(`/actives/values/search?search=${text}&limit=${limit}`, 'GET', {}, 'json', $companySelect);
        console.log('RESPONSE SEARCH ACTIVE VALUES -> ', response)
        if (response.success && response.statusCode == '200') {
            activesValues = response.data.result;
            count = response.data.count;
            if (count == 0) {
                dispatch('notFound')
            }
        }
       
    }

    $: searchActivesValues(searchText)

</script>

<Search 
    bind:value={searchText} 
    on:removeSearch    
/>