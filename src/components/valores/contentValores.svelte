<script>
    import { onMount } from "svelte";
    import Api from "../../../helpers/ApiCall";
    import { Button, Fab } from "$lib";
    import ValueActive from "./valueActive.svelte";
    import { companySelect } from "../../stores/store";
    
    let count = 0;
    let limit = 50;
    let offset = 0;
    let activesValues = [];


    const getActivosValues = async (companyId) => {
        console.log(companyId)
        if (companyId == 0) return


        let response = await Api.call(`/actives/values?limit=${limit}&offset=${offset}`, 'GET', {}, 'json', companyId);
        console.log('RESPONSE GET ACTIVOS VALUES --> ', response)
        if (response.success && response.statusCode == "200") {
            activesValues = [...activesValues, ...response.data.result] 
            count = response.data.count
        } 
    }

    onMount(() => {
        // getActivosValues();
    });

    $: getActivosValues($companySelect)
    

</script>

<div class="mobile-only" style="position: fixed; bottom: 10px; right: 10px; z-index: 10">
    <!-- <Fab on:click={ () => console.log('fab') } /> -->
</div>
<div style="position: relative">
    <div class="header-content" style="position: sticky; top: 40px; z-index: 3; background-color: #f0f0f0; padding: 34px 0 10px">
        <div class="desktop-only">
            <h2>Valores activos</h2>
        </div>
        <!-- <Search value="" /> -->
        <div>
        <!-- <CompanySearch 
            bind:empresas={empresas} 
            on:startSearch={ () => {
                offset = 0;
            } }
            on:removeSearch={ () => {
                console.log('REMOVE SEARCH')
                offset = 0
                empresas = []
                getCompanies()
            } }
            on:notFound={ () => {
                empresas = []
            } }
        /> -->
        </div>
    </div>

    <div class="flex-column gap-8 mt-8" style="padding: 44px 0 10px;">
        {#each activesValues as activeValue }
            <ValueActive 
                active={ activeValue.active } 
                values={ activeValue.active_values == null ? { id: 0, useful_life: 0, real_value: 0, adq_value: 0 } : activeValue.active_values }  
            />
        {/each}
        
    </div>
</div>