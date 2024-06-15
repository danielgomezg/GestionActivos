<script>
    import { Search } from "$lib";
    import Api from "../../../helpers/ApiCall";
    import { createEventDispatcher } from "svelte";
    import { companySelect } from "../../stores/store";

    export let collections = [];
    export { scrollSearch };

    let count = 0;
    let offset = 0;
    let limit = 50;
    let searchText = '';
    let dispatch = createEventDispatcher();

    const searchCollection = async (text) => {
        if (text == '') {
            return;
        } 
        dispatch('searching');

        let response = (await Api.call(`/actives/collections/search?search=${text}&limit=${limit}&offset=${offset}`, 'GET', {}, 'json', $companySelect));
        console.log('RESPONSE SEARCH COLLECTION-> ', response);
        if (response.success && response.statusCode == '200') {
            collections = response.data.result;
            count = response.data.count;
            if (count == 0) {
                dispatch('notFound');
            }
        }
    }

    const scrollSearch = () => {
        offset += limit;
        searchCollection(searchText);
    }

    $: searchCollection(searchText);

</script>

<Search
    bind:value={searchText} 
    on:removeSearch    
/>